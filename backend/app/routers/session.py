import logging
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.session import SessionCreate, SessionRead
from app.schemas.message import MessageCreate, MessageRead
from app.services import session as session_svc
from app.services import message as message_svc

logger = logging.getLogger("api.routers.session")

router = APIRouter(prefix="/sessions", tags=["sessions"])


@router.get("/", response_model=list[SessionRead])
def list_sessions(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    logger.info("GET /sessions skip=%d limit=%d", skip, limit)
    return session_svc.list_sessions(db, skip, limit)


@router.post("/", response_model=SessionRead, status_code=status.HTTP_201_CREATED)
def create_session(data: SessionCreate, db: Session = Depends(get_db)):
    logger.info("POST /sessions title=%s", data.title)
    return session_svc.create_session(db, data)


@router.get("/{session_id}/messages/", response_model=list[MessageRead])
def list_messages(session_id: int, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    logger.info("GET /sessions/%d/messages skip=%d limit=%d", session_id, skip, limit)
    return message_svc.list_messages(db, session_id, skip, limit)


@router.post("/{session_id}/messages/", response_model=MessageRead, status_code=status.HTTP_201_CREATED)
def create_message(session_id: int, data: MessageCreate, db: Session = Depends(get_db)):
    logger.info("POST /sessions/%d/messages role=%s", session_id, data.role)
    return message_svc.create_message(db, session_id, data)
