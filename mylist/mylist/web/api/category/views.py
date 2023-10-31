import logging
from http.client import HTTPException

from fastapi import APIRouter, Depends
from sqlalchemy import select, text
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from mylist.db.dependencies import get_db_session
from mylist.db.models.todo_category import TodoCategory
from mylist.protocol import ResultEntity
from mylist.web.api.category.schema import CategoryItemCreate, CategoryItemResponse

router = APIRouter()


@router.get("/category")
async def select_all_categories(db: Session = Depends(get_db_session)):
    """
    select categories
    """
    raw_sql = f"""
        SELECT
            id,
            category_name
        FROM
            todo_categories
        WHERE id > 4
        """
    result = await db.execute(text(raw_sql))
    # Fetch all the results
    records = result.fetchall()
    category_items = [
        {
            "id": record.id,
            "category_name": record.category_name,
        } for record in records
    ]
    return ResultEntity(statusCode=200, data=category_items, message="Success")


@router.post("/category")
async def create_new_category(category_add_request: CategoryItemCreate,
                              db: Session = Depends(get_db_session)):
    item = TodoCategory(category_name=category_add_request.category_name)
    try:
        db.add(item)
        await db.commit()
        await db.refresh(item)

    except SQLAlchemyError as e:
        await db.rollback()
        # Log the error for debugging purposes
        logging.error(str(e))
        # Provide a meaningful error message to the client
        raise HTTPException(detail="Unable to create todo item")

    return ResultEntity(statusCode=200,
                        data=CategoryItemResponse(id=item.id,
                                                  category_name=item.category_name),
                        message="Success")


@router.put("/category/{id}")
async def edit_todo_item(id: int, item_data: CategoryItemCreate,
                         db: Session = Depends(get_db_session)):
    item = await db.get(TodoCategory, id)
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    for key, value in item_data:
        setattr(item, key, value)
    return ResultEntity(statusCode=200,
                        data=CategoryItemResponse(id=item.id,
                                                  category_name=item.category_name),
                        message="success")


async def get_or_create_category(category_name: str,
                                 db: Session = Depends(get_db_session)):
    # search the category
    result = await db.execute(
        select(TodoCategory).where(TodoCategory.category_name == category_name))
    category = result.scalars().first()

    # If the category doesn't exist, create it
    if category is None:
        category = TodoCategory(category_name=category_name)
        db.add(category)
        await db.flush()  # This will send the INSERT statement to the database
        await db.refresh(category)  # This will load the generated ID

    return category.id
