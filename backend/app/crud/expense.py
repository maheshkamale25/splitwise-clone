from sqlalchemy.orm import Session
from app import models
from app.schemas import expense as schemas 

def create_expense_equal(db: Session, data: schemas.ExpenseCreateEqual):
    expense = models.Expense(
        description=data.description,
        amount=data.amount,
        paid_by=data.paid_by,
        group_id=data.group_id,
        split_type=data.split_type
    )
    db.add(expense)
    db.commit()
    db.refresh(expense)

    split_amount = data.amount / len(data.user_ids)
    for uid in data.user_ids:
        split = models.ExpenseSplit(
            expense_id=expense.id,
            user_id=uid,
            percentage=None  # Not used for equal
        )
        db.add(split)

    db.commit()
    return expense

def create_expense_percentage(db: Session, data: schemas.ExpenseCreatePercentage):
    expense = models.Expense(
        description=data.description,
        amount=data.amount,
        paid_by=data.paid_by,
        group_id=data.group_id,
        split_type=data.split_type
    )
    db.add(expense)
    db.commit()
    db.refresh(expense)

    for s in data.splits:
        split = models.ExpenseSplit(
            expense_id=expense.id,
            user_id=s.user_id,
            percentage=s.percentage
        )
        db.add(split)

    db.commit()
    return expense
