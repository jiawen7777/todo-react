from pydantic import BaseModel


class TodoItemResponse(BaseModel):
    id: int
    title: str
    is_completed: bool


class TodoItemCreate(BaseModel):
    title: str
    is_completed: bool


class TodoItemEdit(BaseModel):
    title: str

