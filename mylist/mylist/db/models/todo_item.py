from sqlalchemy import Column, Integer, String, DateTime, Boolean, func

from mylist.db.base import Base


class TodoItem(Base):
    __tablename__ = 'todo_items'
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True, nullable=False)
    description = Column(String, nullable=True)
    is_completed = Column(Boolean, default=False)
    is_important = Column(Boolean, default=False)
    parent_task_id = Column(Integer, nullable=True)
    marked_my_day_time = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now())
