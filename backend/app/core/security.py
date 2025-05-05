"""
This module contains the security functions for the application.
It is responsible for validating the JWT token and the user's credentials.
"""

from uuid import UUID
from datetime import datetime, timedelta, timezone
from typing import Annotated, Optional, Any, Dict
from pydantic import BaseModel
from passlib.context import CryptContext
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from app.orm.repositories.user.user_repository import UserRepository

ALGORITHM = "HS256"
SECRET_KEY = "sumsecretkeyamiright300"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


class Token(BaseModel):
    """Token class"""

    access_token: str
    token_type: str


class TokenData(BaseModel):
    """Token data"""

    email: str


class UserObject(BaseModel):
    """User class"""

    id: UUID
    email: str
    first_name: str
    last_name: str
    credit_balance: float
    company_name: str


class UserInDB(UserObject):
    """User class with password"""

    password: str


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify inputted password match hashed"""
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    """Hash user password"""
    return pwd_context.hash(password)


async def get_user(
    email: str, db: AsyncSession = Depends(get_db)
) -> Optional[UserInDB]:
    """Get user from db"""
    user_repository = UserRepository(db)

    try:
        user = await user_repository.find_by_email(email)
        if user:
            return user
        return None
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Failed to authorize user"
        ) from exc


async def authenticate_user(
    email: str, password: str, db: AsyncSession = Depends(get_db)
) -> Optional[UserObject]:
    """Authenticate user"""
    user = await get_user(email, db)
    if not user:
        return None
    if not verify_password(password, user.password):
        return None
    return user


async def get_current_user(
    token: Annotated[str, Depends(oauth2_scheme)],
    db: AsyncSession = Depends(get_db),
) -> UserObject:
    """
    This function is used to get the current user from the JWT token.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        expire_at: datetime = payload.get("exp")

        if expire_at is None:
            raise credentials_exception

        if email is None:
            raise credentials_exception

        if datetime.now() > datetime.fromtimestamp(expire_at):
            raise credentials_exception

        token_data = TokenData(email=email)
    except JWTError as exc:
        raise credentials_exception from exc

    user = await get_user(token_data.email, db)

    if user is None:
        raise credentials_exception
    return user


async def create_access_token(
    data: Dict[str, Any], expires_delta: Optional[timedelta] = None
) -> str:
    """Create access token"""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)

    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
