from pydantic import BaseModel
from datetime import datetime

class EventBase(BaseModel):
    title: str
    description: str
    start_date: datetime
    end_date: datetime
    location: str

class EventCreate(EventBase):
    pass

class Event(EventBase):
    id: int
    created_at: datetime
    is_active: bool

    class Config:
        from_attributes = True