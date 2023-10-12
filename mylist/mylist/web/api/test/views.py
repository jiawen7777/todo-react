from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import text
from sqlalchemy.orm import Session

from mylist.db.dependencies import get_db_session
from mylist.db.models.todo_item import TodoItem
from mylist.protocol import ResultEntity
from mylist.web.api.test.schema import TodoItemResponse, TodoItemCreate

router = APIRouter()


@router.get("/todos")
async def select_all(db: Session = Depends(get_db_session)):
    sql = "select * from todo_items where parent_task_id is NULL"
    result = await db.execute(text(sql))
    records = result.fetchall()
    # Map the records to your TodoItem model
    todo_items = [TodoItemResponse(**record._asdict()) for record in records]

    return ResultEntity(statusCode=200, data=todo_items, message="Success")


@router.get("/todos/{id}")
async def select_subtasks(id:int, db: Session = Depends(get_db_session)):
    sql = "select * from todo_items where parent_task_id = " + str(id)
    result = await db.execute(text(sql))
    records = result.fetchall()
    todo_items = [TodoItemResponse(**record._asdict()) for record in records]
    return ResultEntity(statusCode=200, data=todo_items, message="Success")


@router.post("/todos", response_model=TodoItemResponse)
async def create_todo_item(item_data: TodoItemCreate,
                           db: Session = Depends(get_db_session)):
    new_item = TodoItem(**item_data.dict())  # Create a new TodoItem instance
    db.add(new_item)
    await db.commit()
    await db.refresh(new_item)
    # Return the JSON response with the updated data
    return TodoItemResponse(**new_item.__dict__)


@router.post("/todos/{id}", response_model=TodoItemResponse)
async def create_todo_item(id:int,
                            item_data: TodoItemCreate,
                           db: Session = Depends(get_db_session)):
    new_item = TodoItem(**item_data.dict())  # Create a new TodoItem instance
    new_item.parent_task_id = id
    db.add(new_item)
    await db.commit()
    await db.refresh(new_item)
    # Return the JSON response with the updated data
    return TodoItemResponse(**new_item.__dict__)


@router.put("/todos/{id}", response_model=TodoItemResponse)
async def edit_todo_item(id: int, item_data: TodoItemCreate,
                         db: Session = Depends(get_db_session)):
    item = await db.get(TodoItem, id)
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    for key, value in item_data:
        setattr(item, key, value)
    return TodoItemResponse(**item.__dict__)


@router.delete("/todos/{id}")
async def toggle_todo_item(id: int,
                           db: Session = Depends(get_db_session)):
    item = await db.get(TodoItem, id)
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    await db.delete(item)
    return {"message": f"Item with ID {id} deleted successfully"}
