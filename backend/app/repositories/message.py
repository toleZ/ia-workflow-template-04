from sqlalchemy.orm import Session
from sqlalchemy import asc

from app.models.message import Message
from app.schemas.message import MessageCreate


def list_by_session(db: Session, session_id: int, skip: int = 0, limit: int = 100) -> list[Message]:
    return (
        db.query(Message)
        .filter(Message.session_id == session_id)
        .order_by(asc(Message.created_at))
        .offset(skip)
        .limit(limit)
        .all()
    )


def create(db: Session, session_id: int, data: MessageCreate) -> Message:
    db_message = Message(**data.model_dump(), session_id=session_id)
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message
