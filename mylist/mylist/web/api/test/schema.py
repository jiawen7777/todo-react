from pydantic import BaseModel


class TodoItemResponse(BaseModel):
    id: int
    title: str
    is_completed: bool
    is_important: bool


class TodoItemCreate(BaseModel):
    title: str
    is_completed: bool
    is_important: bool


class TodoItemEdit(BaseModel):
    title: str

