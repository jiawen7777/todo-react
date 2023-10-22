from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import text
from sqlalchemy.orm import Session

from datetime import datetime, timedelta
from sqlalchemy import select
from mylist.db.dependencies import get_db_session
from mylist.db.models.todo_item import TodoItem
from mylist.protocol import ResultEntity
from mylist.web.api.test.schema import TodoItemResponse, TodoItemCreate, TodoAddToMyDay

router = APIRouter()


@router.get("/todos")
async def select_all_todos(category: str, db: Session = Depends(get_db_session)):
    stmt = select(TodoItem).where(TodoItem.parent_task_id.is_(None))

    if category == "important":
        stmt = stmt.where(TodoItem.is_important)
    if category == "myday":
        # 获取今天的开始和结束时间
        today_start = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
        today_end = today_start + timedelta(days=1)
        stmt = stmt.where(TodoItem.marked_my_day_time.between(today_start, today_end))

    result = await db.execute(stmt)
    records = result.scalars().all()
    # Map the records to your TodoItem model
    todo_items = [TodoItemResponse(id=record.id, title=record.title,
                                   is_completed=record.is_completed,
                                   is_important=record.is_important,
                                   is_today_task=is_today(record.marked_my_day_time))
                  for record in
                  records]

    return ResultEntity(statusCode=200, data=todo_items, message="Success")


@router.get("/todos/{id}")
async def select_sub_tasks(id: int, db: Session = Depends(get_db_session)):
    sql = "select * from todo_items where parent_task_id = " + str(id)
    result = await db.execute(text(sql))
    records = result.fetchall()
    todo_items = [TodoItemResponse(id=record.id,
                                   title=record.title,
                                   is_completed=record.is_completed,
                                   is_important=record.is_important,
                                   is_today_task=False) for record in
                  records]
    return ResultEntity(statusCode=200, data=todo_items, message="Success")


@router.post("/todos", response_model=TodoItemResponse)
async def create_todo_item(item_data: TodoItemCreate,
                           db: Session = Depends(get_db_session)):
    if item_data.is_today_task:
        current_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        item = TodoItem(title=item_data.title,
                        is_completed=item_data.is_completed,
                        is_important=item_data.is_important,
                        marked_my_day_time=current_time)
    else:
        item = TodoItem(title=item_data.title,
                        is_completed=item_data.is_completed,
                        is_important=item_data.is_important)
    db.add(item)
    await db.commit()
    await db.refresh(item)
    # Return the JSON response with the updated data
    return TodoItemResponse(id=item.id, title=item.title,
                            is_completed=item.is_completed,
                            is_important=item.is_important,
                            is_today_task=item_data.is_today_task)


@router.post("/todos/{id}", response_model=TodoItemResponse)
async def create_sub_task_item(id: int,
                               item_data: TodoItemCreate,
                               db: Session = Depends(get_db_session)):
    item = TodoItem(title=item_data.title,
                    is_completed=item_data.is_completed,
                    is_important=item_data.is_important)  # Create a new TodoItem instance
    item.parent_task_id = id
    db.add(item)
    await db.commit()
    await db.refresh(item)
    # Return the JSON response with the updated data
    return TodoItemResponse(id=item.id,
                            title=item.title,
                            is_completed=item.is_completed,
                            is_important=False,
                            is_today_task=False)


@router.put("/todos/{id}", response_model=TodoItemResponse)
async def edit_todo_item(id: int, item_data: TodoItemCreate,
                         db: Session = Depends(get_db_session)):
    item = await db.get(TodoItem, id)
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    for key, value in item_data:
        setattr(item, key, value)
    return TodoItemResponse(id=item.id,
                            title=item.title,
                            is_completed=item.is_completed,
                            is_important=item.is_important,
                            is_today_task=is_today(item.marked_my_day_time))


@router.delete("/todos/{id}")
async def toggle_todo_item(id: int,
                           db: Session = Depends(get_db_session)):
    item = await db.get(TodoItem, id)
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    await db.delete(item)
    return {"message": f"Item with ID {id} deleted successfully"}


@router.put("/todos/myday/{id}")
async def toggle_my_day(id: int, item_data: TodoAddToMyDay,
                        db: Session = Depends(get_db_session)):
    item = await db.get(TodoItem, id)
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    if item_data.is_today_task:
        # update time to current time.
        current_time = datetime.now().strftime(
            '%Y-%m-%d %H:%M:%S')
        setattr(item, "marked_my_day_time", current_time)
    else:
        # clear timestamp
        setattr(item, "marked_my_day_time", None)

    return TodoItemResponse(id=item.id,
                            title=item.title,
                            is_completed=item.is_completed,
                            is_important=item.is_important,
                            is_today_task=is_today(item.marked_my_day_time))


def is_today(time_value) -> bool:
    # 如果time_value已经是datetime对象，直接使用它
    if isinstance(time_value, datetime):
        given_time = time_value
    # 否则，尝试将其解析为datetime对象
    elif isinstance(time_value, str):
        try:
            given_time = datetime.strptime(time_value, '%Y-%m-%d %H:%M:%S')
        except ValueError:
            return False
    else:
        return False

    # 获取当前时间
    now = datetime.now()
    # 判断给定的时间是否与当前时间在同一天
    return given_time.date() == now.date()
