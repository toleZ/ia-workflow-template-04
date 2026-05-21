from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field


class SessionBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=255)


class SessionCreate(SessionBase):
    pass


class SessionUpdate(BaseModel):
    title: str | None = Field(None, min_length=1, max_length=255)


class SessionRead(SessionBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
