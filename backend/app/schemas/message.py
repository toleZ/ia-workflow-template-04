from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field, field_validator


class MessageBase(BaseModel):
    role: str
    content: str

    @field_validator("role")
    @classmethod
    def validate_role(cls, v: str) -> str:
        v = v.lower()
        if v not in ["user", "assistant"]:
            raise ValueError("role must be 'user' or 'assistant'")
        return v


class MessageCreate(MessageBase):
    pass


class MessageUpdate(BaseModel):
    role: str | None = None
    content: str | None = None

    @field_validator("role")
    @classmethod
    def validate_role(cls, v: str | None) -> str | None:
        if v is None:
            return v
        v = v.lower()
        if v not in ["user", "assistant"]:
            raise ValueError("role must be 'user' or 'assistant'")
        return v


class MessageRead(MessageBase):
    id: int
    session_id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
