from sqlalchemy import Column, Integer, String, DateTime, Boolean, func

from mylist.db.base import Base


class TodoCategory(Base):
    __tablename__ = 'todo_categories'
    id = Column(Integer, primary_key=True, index=True)
    category_name = Column(String, nullable=False)
