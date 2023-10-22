from pydantic import BaseModel


class TodoItemResponse(BaseModel):
    id: int
    title: str
    is_completed: bool
    is_important: bool
    is_today_task: bool


class TodoItemCreate(BaseModel):
    title: str
    is_completed: bool
    is_important: bool
    is_today_task: bool


class TodoItemEdit(BaseModel):
    title: str

class TodoAddToMyDay(BaseModel):
    is_today_task: bool

