"""
This module contains the data transfer objects for the user repository.
"""

from typing import Optional
from pydantic import BaseModel, Field, EmailStr
from app.orm.models.user import UserRole


class CreateUserDto(BaseModel):
    """
    Create User DTO
    """

    email: EmailStr = Field(..., description="User email")
    first_name: str
    last_name: str
    password: str = Field(
        ..., min_length=7, description="User password (minimum 7 characters)"
    )
    company_name: str
    role: Optional[UserRole] = UserRole.STANDARD
