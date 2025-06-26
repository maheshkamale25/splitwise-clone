from sqlalchemy.orm import Session
from app import models

def calculate_balances(db: Session, group_id: int):
    expenses = db.query(models.Expense).filter(models.Expense.group_id == group_id).all()
    balances = {}

    for expense in expenses:
        payer_id = expense.paid_by
        amount = expense.amount

        if expense.split_type == "equal":
            splits = db.query(models.ExpenseSplit).filter_by(expense_id=expense.id).all()
            per_user_share = amount / len(splits)

            for split in splits:
                user_id = split.user_id
                if user_id == payer_id:
                    continue
                balances[(user_id, payer_id)] = balances.get((user_id, payer_id), 0) + per_user_share

        elif expense.split_type == "percentage":
            splits = db.query(models.ExpenseSplit).filter_by(expense_id=expense.id).all()

            for split in splits:
                user_id = split.user_id
                user_share = amount * (split.percentage / 100.0)

                if user_id == payer_id:
                    continue
                balances[(user_id, payer_id)] = balances.get((user_id, payer_id), 0) + user_share

    return balances
