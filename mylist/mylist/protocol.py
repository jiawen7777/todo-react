import typing

from pydantic import BaseModel


class ResultEntity(BaseModel):
    statusCode: int
    data: typing.Any
    message: str
