"""This module contains the service layer for auth operations"""

import requests
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import HTTPException
from passlib.context import CryptContext
from app.orm.repositories.user.user_repository import UserRepository
from app.orm.repositories.user.dtos.create_user_dto import CreateUserDto
from app.orm.repositories.user.dtos.update_user_dto import UpdateUserDto
from app.core.config import settings


class AuthService:
    """Service for Auth Operations"""

    def __init__(self, session: AsyncSession):
        """
        Initialize class for auth service

        Args:
            session: The database session to use for operations.
        """
        self.session = session
        self.user_repository = UserRepository(session)
        self.pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

    def _hash_password(self, password: str) -> str:
        """
        Hash the password using bcrypt
        """
        return self.pwd_context.hash(password)

    async def _register_with_payment_provider(self, user):
        """
        Register the user with the payment provider (Paystack).

        Args:
            user: The user object to register.

        Returns:
            The customer code from the payment provider.

        Raises:
            HTTPException: If registration with payment provider fails.
        """
        # First check if customer already exists
        try:
            existing_customer_response = requests.get(
                f"{settings.PAYSTACK_BACKEND_URL}/customer/{user.email}",
                headers={"Authorization": f"Bearer {settings.PAYSTACK_SECRET_KEY}"},
                timeout=20,
            )

            if existing_customer_response.status_code == 200:
                paystack_customer = existing_customer_response.json()
                return paystack_customer["data"]["customer_code"]

            # If customer doesn't exist, create new one
            new_customer_response = requests.post(
                f"{settings.PAYSTACK_BACKEND_URL}/customer",
                headers={"Authorization": f"Bearer {settings.PAYSTACK_SECRET_KEY}"},
                json={
                    "email": user.email,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                },
                timeout=25,
            )

            if new_customer_response.status_code != 200:
                raise HTTPException(
                    status_code=400, detail="Failed to register with payment provider"
                )

            paystack_customer = new_customer_response.json()
            return paystack_customer["data"]["customer_code"]

        except requests.RequestException as e:
            raise HTTPException(
                status_code=500,
                detail=f"Payment provider communication error: {str(e)}",
            ) from e

    async def create_user(self, payload: CreateUserDto):
        """
        Create a new user with hashed password and register with payment provider.

        Args:
            payload: The user data to create.

        Returns:
            The created user.

        Raises:
            HTTPException: If user creation fails.
        """
        # Check if user already exists
        existing_user = await self.user_repository.find_by_email(payload.email)
        if existing_user:
            return

        # Hash the password before storing
        hashed_password = self._hash_password(payload.password)

        # Create a copy of the payload with the hashed password
        user_data = payload.model_dump()
        user_data["password"] = hashed_password

        # Create the user in the database
        user = await self.user_repository.create(CreateUserDto(**user_data))
        if not user:
            raise HTTPException(status_code=400, detail="Failed to create user")

        try:
            # Register user with payment provider
            paystack_customer_code = await self._register_with_payment_provider(user)

            # Update user with payment provider customer ID
            update_customer = UpdateUserDto(paystack_customer_id=paystack_customer_code)
            await self.user_repository.update(user.id, update_customer)

            return user

        except HTTPException as e:
            # Clean up: delete user if payment provider registration fails
            await self.user_repository.delete(user.id)
            raise e
