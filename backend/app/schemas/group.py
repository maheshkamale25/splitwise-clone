from pydantic import BaseModel
from typing import List

class GroupCreate(BaseModel):
    name: str
    user_ids: List[int]

class Group(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True
