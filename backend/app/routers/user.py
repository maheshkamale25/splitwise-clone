from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List  # ✅ Fix for Python <3.9

from app.schemas import user as user_schema
from app.crud import user as user_crud
from app.dependencies import get_db

router = APIRouter(prefix="/users", tags=["Users"])

@router.post("/", response_model=user_schema.User)
def create_user(user: user_schema.UserCreate, db: Session = Depends(get_db)):
    return user_crud.create_user(db=db, user=user)

@router.get("/", response_model=List[user_schema.User])  # ✅ Fixed this line
def read_users(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return user_crud.get_users(db, skip=skip, limit=limit)

@router.get("/{user_id}/balances")
def get_user_balances(user_id: int, db: Session = Depends(get_db)):
    return user_crud.get_user_balances(db, user_id)