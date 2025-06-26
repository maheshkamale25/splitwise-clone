from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.dependencies import get_db
from app.schemas import expense as expense_schema
from app.crud import expense as expense_crud
from app.utils.balance import calculate_balances

router = APIRouter(prefix="/expenses", tags=["Expenses"])

@router.post("/equal", response_model=expense_schema.Expense)
def create_expense_equal(data: expense_schema.ExpenseCreateEqual, db: Session = Depends(get_db)):
    return expense_crud.create_expense_equal(db, data)

@router.post("/percentage", response_model=expense_schema.Expense)
def create_expense_percentage(data: expense_schema.ExpenseCreatePercentage, db: Session = Depends(get_db)):
    return expense_crud.create_expense_percentage(db, data)

@router.get("/group/{group_id}/balances")
def get_balances(group_id: int, db: Session = Depends(get_db)):
    balances = calculate_balances(db, group_id)
    result = []

    for (debtor_id, creditor_id), amount in balances.items():
        result.append({
            "from_user_id": debtor_id,
            "to_user_id": creditor_id,
            "amount": round(amount, 2)
        })

    return result