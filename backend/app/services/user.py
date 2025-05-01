"""
This module contains the service layer for user operations.
It acts as an abstraction layer between the API routes and the repository.
"""

from uuid import UUID
from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.orm.repositories.user.user_repository import UserRepository
from app.orm.repositories.user.dtos.update_user_dto import UpdateUserDto


class UserService:
    """
    Service class for user operations.
    """

    def __init__(self, session: AsyncSession):
        """
        Initialize the user service with a database session.

        Args:
            session: The database session to use for operations.
        """
        self.session = session
        self.user_repository = UserRepository(session)

    async def get_all_users(self):
        """
        Get all users.

        Returns:
            A list of all users.
        """
        return await self.user_repository.find_all()

    async def get_user_by_id(self, user_id: UUID):
        """
        Get a user by ID.

        Args:
            user_id: The ID of the user to retrieve.

        Returns:
            The user if found, None otherwise.
        """
        user = await self.user_repository.find_by_id(user_id)

        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        return user

    async def update_user(self, user_id: UUID, payload: UpdateUserDto):
        """
        Update a user by ID.
        """
        return await self.user_repository.update(user_id, payload)
