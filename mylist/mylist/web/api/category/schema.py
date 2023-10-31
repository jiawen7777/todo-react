from pydantic import BaseModel


class CategoryItemCreate(BaseModel):
    category_name: str


class CategoryItemResponse(BaseModel):
    id: int
    category_name: str
