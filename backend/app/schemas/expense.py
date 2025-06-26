from pydantic import BaseModel
from typing import List, Optional
from enum import Enum

class SplitType(str, Enum):
    equal = "equal"
    percentage = "percentage"

class ExpenseBase(BaseModel):
    description: str
    amount: float
    paid_by: int
    group_id: int
    split_type: SplitType

class ExpenseCreateEqual(ExpenseBase):
    user_ids: List[int]

class SplitDetail(BaseModel):
    user_id: int
    percentage: float

class ExpenseCreatePercentage(ExpenseBase):
    splits: List[SplitDetail]

class Expense(BaseModel):
    id: int
    description: str
    amount: float
    paid_by: int
    group_id: int
    split_type: SplitType

    class Config:
        from_attributes = True
