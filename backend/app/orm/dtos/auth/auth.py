"""This module contains the dto for auth classes"""

from pydantic import BaseModel, Field, EmailStr


class LoginDto(BaseModel):
    """Login body"""

    email: EmailStr = Field(..., description="User email")
    password: str = Field(
        ..., min_length=7, description="User password (minimum 7 characters)"
    )
