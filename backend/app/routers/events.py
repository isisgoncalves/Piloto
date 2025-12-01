from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.schemas import event as event_schema
from app.models import event as event_model
from app.auth import get_current_active_user
from app.models.user import User

router = APIRouter()

@router.post("/events/", response_model=event_schema.Event)
def create_event(
    event: event_schema.EventCreate, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    db_event = event_model.Event(**event.dict())
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    return db_event

@router.get("/events/", response_model=List[event_schema.Event])
def read_events(
    skip: int = 0, 
    limit: int = 100, 
    title: str = None,
    start_date: str = None,
    end_date: str = None,
    location: str = None,
    db: Session = Depends(get_db)
):
    query = db.query(event_model.Event)
    
    if title:
        query = query.filter(event_model.Event.title.ilike(f"%{title}%"))
    
    if start_date:
        query = query.filter(event_model.Event.start_date >= start_date)
    
    if end_date:
        query = query.filter(event_model.Event.end_date <= end_date)
    
    if location:
        query = query.filter(event_model.Event.location.ilike(f"%{location}%"))
    
    events = query.order_by(event_model.Event.created_at.desc()).offset(skip).limit(limit).all()
    return events

@router.get("/events/{event_id}", response_model=event_schema.Event)
def read_event(event_id: int, db: Session = Depends(get_db)):
    event = db.query(event_model.Event).filter(event_model.Event.id == event_id).first()
    if event is None:
        raise HTTPException(status_code=404, detail="Event not found")
    return event

@router.put("/events/{event_id}", response_model=event_schema.Event)
def update_event(
    event_id: int, 
    event_update: event_schema.EventCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    event = db.query(event_model.Event).filter(event_model.Event.id == event_id).first()
    if event is None:
        raise HTTPException(status_code=404, detail="Event not found")
    
    for key, value in event_update.dict().items():
        setattr(event, key, value)
    
    db.commit()
    db.refresh(event)
    return event

@router.delete("/events/{event_id}")
def delete_event(
    event_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    event = db.query(event_model.Event).filter(event_model.Event.id == event_id).first()
    if event is None:
        raise HTTPException(status_code=404, detail="Event not found")
    
    db.delete(event)
    db.commit()
    return {"message": "Event deleted successfully"}