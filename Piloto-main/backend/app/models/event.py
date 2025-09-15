from sqlalchemy import Column, Integer, String, DateTime, Boolean, VARCHAR
from datetime import datetime
from app.database import Base

class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(VARCHAR(200), index=True)
    description = Column(VARCHAR(1000))
    date = Column(DateTime)
    location = Column(VARCHAR(200))
    created_at = Column(DateTime, default=datetime.utcnow)
    is_active = Column(Boolean, default=True)