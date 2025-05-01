"""
This module contains the API for the agents.
"""

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from app.core.security import get_current_user, UserObject
from app.services.agents import AgentsService
from app.services.ai_client import AiClientService
from app.orm.dtos.ai_client.prompt import PromptDto


router = APIRouter(prefix="/agents")


class AgentAPI:
    """
    API class for agent operations.
    """

    def __init__(self, session: AsyncSession, current_user: UserObject):
        self.session = session
        self.current_user = current_user
        self.ai_client = AiClientService()
        self.agents_service = AgentsService(session)

    async def generate_analysis(self, prompt_data: PromptDto):
        """
        Generate a summary.
        """
        user_email = self.current_user.email
        return await self.agents_service.generate_analysis(user_email, prompt_data)


async def get_agent_api(
    session: AsyncSession = Depends(get_db),
    current_user: UserObject = Depends(get_current_user),
):
    """
    Get the agent API.

    Args:
        session: The database session.

    Returns:
        The agent API.
    """
    return AgentAPI(session, current_user)


@router.post("/analysize")
async def generate_summary(
    summary_prompt_data: PromptDto, agent_api: AgentAPI = Depends(get_agent_api)
):
    """
    Generate a summary.
    """
    return await agent_api.generate_analysis(summary_prompt_data)
