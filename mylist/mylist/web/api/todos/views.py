from datetime import datetime, timedelta
import logging
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session
from mylist.db.dependencies import get_db_session
from mylist.db.models.todo_item import TodoItem
from mylist.protocol import ResultEntity
from mylist.web.api.todos.schema import (TodoItemResponse, TodoItemCreate,
                                         TodoAddToMyDay)
from mylist.web.api.todos.time_utils import is_today

router = APIRouter()


@router.get("/todos")
async def select_all_todos(category_id: int, db: Session = Depends(get_db_session)):
    if category_id == 1:
        where_condition = " 1=1 "
    elif category_id == 2:
        today_start = datetime.now().replace(hour=0, minute=0, second=0,
                                             microsecond=0)
        today_end = today_start + timedelta(days=1)
        where_condition = (f"marked_my_day_time >= \"{today_start}\" and "
                           f"marked_my_day_time <= \"{today_end}\" ")
    elif category_id == 3:
        where_condition = "is_important = 1"
    else:
        where_condition = f"category_id = {category_id}"
    # Raw SQL query
    raw_sql = f"""
    SELECT
        id,
        category_id,
        title,
        is_completed,
        is_important,
        marked_my_day_time
    FROM
        todo_items
    WHERE parent_task_id is null and  {where_condition}
    """
    result = await db.execute(text(raw_sql))
    # Fetch all the results
    records = result.fetchall()
    todo_items = [
        {
            "id": record.id,
            "category_id": record.category_id,
            "title": record.title,
            "is_completed": record.is_completed,
            "is_important": record.is_important,
            "is_today_task": is_today(record.marked_my_day_time)
        } for record in records
    ]

    return ResultEntity(statusCode=200, data=todo_items, message="Success")


@router.get("/todos/{id}")
async def select_sub_tasks(id: int,
                           db: Session = Depends(get_db_session)):
    raw_sql = f"""
    select *
    from
    todo_items
    where
    parent_task_id =
    {id}
    """
    result = await db.execute(text(raw_sql))
    records = result.fetchall()
    todo_items = [
        {
            "id": record.id,
            "title": record.title,
            "category_id": None,
            "is_completed": record.is_completed,
            "is_important": False,
            "is_today_task": False
        } for record in records
    ]
    return ResultEntity(statusCode=200, data=todo_items, message="Success")


@router.post("/todos", response_model=ResultEntity)
async def create_todo(item_data: TodoItemCreate,
                      category_id: int,
                      db: Session = Depends(get_db_session)):

    # add todo_item to database
    item = TodoItem(title=item_data.title,
                    is_completed=item_data.is_completed,
                    category_id=category_id,
                    is_important=item_data.is_important,
                    marked_my_day_time=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
                    if item_data.is_today_task else None)
    try:
        db.add(item)
        await db.commit()
        await db.refresh(item)
    except SQLAlchemyError as e:
        await db.rollback()
        # Log the error for debugging purposes
        logging.error(str(e))
        # Provide a meaningful error message to the client
        raise HTTPException(status_code=400, detail="Unable to create todo item")

    # Return the JSON response with the updated data
    return ResultEntity(statusCode=200,
                        data=TodoItemResponse(id=item.id,
                                              title=item.title,
                                              category_id=item.category_id,
                                              is_completed=item.is_completed,
                                              is_important=item.is_important,
                                              is_today_task=item_data.is_today_task),
                        message="Success")


@router.post("/todos/{id}")
async def create_sub_task(id: int,
                          item_data: TodoItemCreate,
                          db: Session = Depends(get_db_session)):
    """
    create a subtask
    """
    item = TodoItem(title=item_data.title,
                    is_completed=item_data.is_completed,
                    is_important=item_data.is_important)
    item.parent_task_id = id
    db.add(item)
    await db.commit()
    await db.refresh(item)
    # Return the JSON response with the updated data
    return ResultEntity(statusCode=200,
                        data=TodoItemResponse(id=item.id,
                                              title=item.title,
                                              category_id=4,
                                              is_completed=item.is_completed,
                                              is_important=False,
                                              is_today_task=False),
                        message="success")


@router.delete("/todos/{id}")
async def delete_todo(id: int,
                      db: Session = Depends(get_db_session)):
    item = await db.get(TodoItem, id)
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    await db.delete(item)
    return ResultEntity(statusCode=200,
                        data=None,
                        message=f"Item with ID {id} deleted successfully")


@router.put("/todos/{id}")
async def edit_todo_item(id: int, item_data: TodoItemCreate,
                         db: Session = Depends(get_db_session)):
    item = await db.get(TodoItem, id)
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    for key, value in item_data:
        setattr(item, key, value)
    return ResultEntity(statusCode=200,
                        data=TodoItemResponse(id=item.id,
                                              title=item.title,
                                              category_id=item.category_id,
                                              is_completed=item.is_completed,
                                              is_important=item.is_important,
                                              is_today_task=is_today(
                                                  item.marked_my_day_time)),
                        message="success")


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
    return ResultEntity(statusCode=200,
                        data=TodoItemResponse(id=item.id,
                                              title=item.title,
                                              category_id=item.category_id,
                                              is_completed=item.is_completed,
                                              is_important=item.is_important,
                                              is_today_task=is_today(
                                                  item.marked_my_day_time)),
                        message="success")
