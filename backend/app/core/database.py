from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker

from app.core.config import settings

engine = create_engine(
    settings.database_url,
    connect_args={"check_same_thread": False},  # required for SQLite
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Analytics Database (PostgreSQL placeholder)
# We only create the engine if a real analytics URL is provided.
# Otherwise, we use a NullPool to avoid driver requirements on startup.
if settings.analytics_database_url:
    analytics_engine = create_engine(settings.analytics_database_url)
else:
    # Use a dummy sqlite memory DB as a safe placeholder that requires no external drivers
    analytics_engine = create_engine("sqlite:///:memory:")

AnalyticsSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=analytics_engine)


class Base(DeclarativeBase):
    pass


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_analytics_db():
    yield analytics_engine
