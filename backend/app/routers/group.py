from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas import group as group_schema
from app.crud import group as group_crud
from app.dependencies import get_db
from typing import List  # ✅ Make sure this is imported

router = APIRouter(prefix="/groups", tags=["Groups"])

@router.post("/", response_model=group_schema.Group)
def create_group(group_data: group_schema.GroupCreate, db: Session = Depends(get_db)):
    return group_crud.create_group(db=db, group_data=group_data)


@router.get("/", response_model=List[group_schema.Group])  # ✅ Corrected here
def read_groups(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return group_crud.get_groups(db, skip=skip, limit=limit)
