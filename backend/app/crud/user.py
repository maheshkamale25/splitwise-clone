from sqlalchemy.orm import Session
from app import models
from app.schemas import user as user_schema

def create_user(db: Session, user: user_schema.UserCreate):
    db_user = models.User(name=user.name)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_users(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.User).offset(skip).limit(limit).all()


def get_user_balances(db: Session, user_id: int):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise Exception("User not found")

    # Find all groups where user is a member
    group_ids = db.query(models.GroupUser.group_id).filter(
        models.GroupUser.user_id == user_id
    ).all()

    balances = []

    for (group_id,) in group_ids:
        # Get all expenses in that group
        expenses = db.query(models.Expense).filter(
            models.Expense.group_id == group_id
        ).all()

        total_paid = 0
        total_owed = 0

        for expense in expenses:
            if expense.paid_by == user_id:
                total_paid += expense.amount

            for split in expense.splits:
                if split.user_id == user_id:
                    if expense.split_type == "equal":
                        total_owed += expense.amount / len(expense.splits)
                    elif expense.split_type == "percentage":
                        total_owed += (expense.amount * split.percentage) / 100

        balance = round(total_paid - total_owed, 2)
        balances.append({
            "group_id": group_id,
            "balance": balance,
            "status": "owes" if balance < 0 else "gets" if balance > 0 else "settled"
        })

    return balances
