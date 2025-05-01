"""
This module contains the DTO for the prompt template
"""

from typing import Optional
from pydantic import BaseModel, Field


class PromptDto(BaseModel):
    """
    This class contains the DTO for the prompt
    """

    idea: str = Field(..., min_length=20, description="Idea description")
    industry: str = Field(..., min_length=5, description="Idea industry")
    audience: str = Field(..., min_length=4, description="Idea audience")
    geography: str = Field(..., min_length=10, description="Geography of execution")
    competition: str = Field(..., min_length=20, description="Existing competition")
    additional_info: Optional[str] = None
