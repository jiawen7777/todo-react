from fastapi.routing import APIRouter

from mylist.web.api import todos, category

api_router = APIRouter()
api_router.include_router(todos.router, tags=["todos"])
api_router.include_router(category.router, tags=["todo categories"])
