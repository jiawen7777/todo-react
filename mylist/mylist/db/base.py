from sqlalchemy.orm import DeclarativeBase

from mylist.db.meta import meta


class Base(DeclarativeBase):
    """Base for all models."""

    metadata = meta
