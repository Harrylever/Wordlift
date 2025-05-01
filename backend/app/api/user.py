"""
This module contains the API routes for the user model.
"""

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from app.core.security import UserObject
from app.services.user import UserService
from app.orm.repositories.user.dtos.update_user_dto import UpdateUserDto
from app.core.security import get_current_user

router = APIRouter(prefix="/users")


class UserAPI:
    """
    API class for user operations.
    """

    def __init__(self, session: AsyncSession, current_user: UserObject):
        """
        Initialize the user API with a database session.

        Args:
            session: The database session to use for operations.
        """
        self.session = session
        self.current_user = current_user
        self.user_service = UserService(session)

    async def list_users(self):
        """
        Get all users.

        Returns:
            A list of all users.
        """
        return await self.user_service.get_all_users()

    async def find_user_by_id(self):
        """
        Get a user by id.

        Args:
            user_id: The ID of the user to retrieve.

        Returns:
            The user if found.

        Raises:
            HTTPException: If the user is not found.
        """
        user = {
            "id": self.current_user.id,
            "email": self.current_user.email,
            "first_name": self.current_user.first_name,
            "last_name": self.current_user.last_name,
            "company_name": self.current_user.company_name,
            "credit_balance": self.current_user.credit_balance,
        }
        return user

    async def update_user_by_id(self, payload: UpdateUserDto):
        """
        Update a user by id.

        Args:
            user_id: The ID of the user to update.
            payload: The user data to update.

        Returns:
            The updated user.
        """
        user_id = self.current_user.id
        return await self.user_service.update_user(user_id, payload)

    async def get_credits(self):
        """Get user credits"""
        return {"credits": self.current_user.credit_balance}


# Dependency to get the UserAPI instance
async def get_user_api(
    session: AsyncSession = Depends(get_db),
    current_user: UserObject = Depends(get_current_user),
):
    """
    Get a UserAPI instance.

    Args:
        session: The database session to use for operations.

    Returns:
        A UserAPI instance.
    """
    return UserAPI(session, current_user)


@router.get("/")
async def list_users(user_api: UserAPI = Depends(get_user_api)):
    """
    Get all users
    """
    return await user_api.list_users()


@router.get("/me")
async def find_user_by_id(user_api: UserAPI = Depends(get_user_api)):
    """
    Get a user by id
    """
    return await user_api.find_user_by_id()


@router.put("/me")
async def update_user_by_id(
    payload: UpdateUserDto, user_api: UserAPI = Depends(get_user_api)
):
    """
    Update a user by id
    """
    return await user_api.update_user_by_id(payload)


@router.get("/credits/me")
async def get_user_credits(user_api: UserAPI = Depends(get_user_api)):
    """
    Get a user by id
    """
    return await user_api.get_credits()
