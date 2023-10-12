from fastapi.routing import APIRouter

from mylist.web.api import echo, monitoring, test

api_router = APIRouter()
api_router.include_router(monitoring.router)
api_router.include_router(echo.router, prefix="/echo", tags=["echo"])
api_router.include_router(test.router, tags=["test db"])
