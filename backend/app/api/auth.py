"""
This module contains the API routes for the auth operations
"""

from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from app.orm.dtos.auth.auth import LoginDto
from app.core.security import authenticate_user, create_access_token
from app.services.auth import AuthService
from app.orm.repositories.user.dtos.create_user_dto import CreateUserDto

router = APIRouter(
    prefix="/auth",
)


class AuthAPI:
    """
    API class for auth operations
    """

    def __init__(self, session: AsyncSession):
        """
        Initialize the auth API with a database session

        Args:
          session: The database session to use for operations.\
        """

        self.session = session
        self.auth_service = AuthService(session)

    async def login_for_access_token(self, form_data: LoginDto):
        """Login for access token"""
        user = await authenticate_user(
            form_data.email, form_data.password, self.session
        )
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect username or password",
                headers={"WWW-Authenticate": "Bearer"},
            )

        access_token = await create_access_token(data={"sub": user.email})
        return {"access_token": access_token, "token_type": "bearer"}

    async def create_account(self, form_data: CreateUserDto):
        """Create account"""
        await self.auth_service.create_user(form_data)
        return {"status": True}


async def get_auth_api(
    session: AsyncSession = Depends(get_db),
):
    """Get an AuthAPI instance"""
    return AuthAPI(session)


@router.post("/token")
async def login_for_access_token(
    form_data: LoginDto, auth_api: AuthAPI = Depends(get_auth_api)
):
    """Login user"""
    return await auth_api.login_for_access_token(form_data)


@router.post("/create-account", status_code=201)
async def create_account(
    form_data: CreateUserDto, auth_api: AuthAPI = Depends(get_auth_api)
):
    """Create account"""
    return await auth_api.create_account(form_data)