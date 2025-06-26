from sqlalchemy import Column, Integer, String, Float, ForeignKey, Enum
from sqlalchemy.orm import relationship
from app.database import Base
import enum

# Enum for split types
class SplitType(str, enum.Enum):
    equal = "equal"
    percentage = "percentage"

# User model
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)

    # Relationships
    expenses_paid = relationship("Expense", backref="payer")
    splits = relationship("ExpenseSplit", backref="split_user")

# Group model
class Group(Base):
    __tablename__ = "groups"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)

    users = relationship("GroupUser", back_populates="group")
    expenses = relationship("Expense", back_populates="group")

# GroupUser model
class GroupUser(Base):
    __tablename__ = "group_users"

    id = Column(Integer, primary_key=True)
    group_id = Column(Integer, ForeignKey("groups.id"))
    user_id = Column(Integer, ForeignKey("users.id"))

    group = relationship("Group", back_populates="users")
    user = relationship("User")

# Expense model
class Expense(Base):
    __tablename__ = "expenses"

    id = Column(Integer, primary_key=True, index=True)
    description = Column(String)
    amount = Column(Float)
    paid_by = Column(Integer, ForeignKey("users.id"))
    split_type = Column(Enum(SplitType))
    group_id = Column(Integer, ForeignKey("groups.id"))

    group = relationship("Group", back_populates="expenses")
    splits = relationship("ExpenseSplit", back_populates="expense")

# ExpenseSplit model
class ExpenseSplit(Base):
    __tablename__ = "expense_splits"

    id = Column(Integer, primary_key=True)
    expense_id = Column(Integer, ForeignKey("expenses.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    percentage = Column(Float, nullable=True)  # Only needed if split_type is percentage

    expense = relationship("Expense", back_populates="splits")
