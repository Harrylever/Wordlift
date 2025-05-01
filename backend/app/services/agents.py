"""
This module contains the service for the agents.
"""

from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.services.ai_client import AiClientService
from app.orm.dtos.ai_client.prompt import PromptDto
from app.orm.repositories.user.user_repository import UserRepository
from app.orm.repositories.user.dtos.update_user_dto import UpdateUserDto


class AgentsService:
    """
    This class contains the service for the agents.
    """

    def __init__(self, session: AsyncSession):
        self.session = session
        self.ai_client = AiClientService()
        self.user_repository = UserRepository(session)

    async def generate_analysis(self, user_email: str, prompt_data: PromptDto):
        """
        Generate a summary.
        """
        user = await self.user_repository.find_by_email(user_email)

        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        if user.has_sufficient_credit is False:
            raise HTTPException(status_code=403, detail="Insufficient credits")

        prompt_response = await self.ai_client.generate_anaylsis(prompt_data)

        new_balance = user.credit_balance - 8

        update_user_dto = UpdateUserDto(credit_balance=new_balance)
        await self.user_repository.update(user.id, update_user_dto)

        return prompt_response
