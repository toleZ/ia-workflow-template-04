import logging
from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.session import Session as ChatSession
from app.repositories import session as repo
from app.schemas.session import SessionCreate, SessionRead

logger = logging.getLogger("api.services.session")


def _get_or_404(db: Session, session_id: int) -> ChatSession:
    db_session = repo.get(db, session_id)
    if not db_session:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Session with id {session_id} not found",
        )
    return db_session


def get_session(db: Session, session_id: int) -> SessionRead:
    logger.debug("get_session id=%d", session_id)
    return SessionRead.model_validate(_get_or_404(db, session_id))


def list_sessions(db: Session, skip: int = 0, limit: int = 100) -> list[SessionRead]:
    logger.debug("list_sessions skip=%d limit=%d", skip, limit)
    return [SessionRead.model_validate(s) for s in repo.list_all(db, skip, limit)]


def create_session(db: Session, data: SessionCreate) -> SessionRead:
    logger.info("create_session title=%s", data.title)
    return SessionRead.model_validate(repo.create(db, data))
