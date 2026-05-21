from sqlalchemy.orm import Session
from sqlalchemy import desc

from app.models.session import Session as ChatSession
from app.schemas.session import SessionCreate


def get(db: Session, session_id: int) -> ChatSession | None:
    return db.get(ChatSession, session_id)


def list_all(db: Session, skip: int = 0, limit: int = 100) -> list[ChatSession]:
    return db.query(ChatSession).order_by(desc(ChatSession.created_at)).offset(skip).limit(limit).all()


def create(db: Session, data: SessionCreate) -> ChatSession:
    db_session = ChatSession(**data.model_dump())
    db.add(db_session)
    db.commit()
    db.refresh(db_session)
    return db_session
