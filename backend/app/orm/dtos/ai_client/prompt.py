"""
This module contains the DTO for the prompt template
"""

from typing import Optional
from pydantic import BaseModel, Field


class PromptDto(BaseModel):
    """
    This class contains the DTO for the prompt
    """

    user_content: str = Field(..., min_length=50, description="User content")
    tone: str = Field(..., min_length=4, description="Expected tone")
    audience: str = Field(..., min_length=5, description="Target audience")
    content_type: str = Field(..., min_length=5, description="Expected content type")
    length: str = Field(..., description="Expected length")
    seo_keywords: Optional[str] = Field(None, description="SEO keywords")
    focus_areas: Optional[str] = Field(None, description="Focus areas")