from sqlalchemy.orm import Session
from app import models, schemas

def create_group(db: Session, group_data: schemas.GroupCreate):
    # Create the group
    group = models.Group(name=group_data.name)
    db.add(group)
    db.commit()
    db.refresh(group)

    # Add users to group
    for user_id in group_data.user_ids:
        group_user = models.GroupUser(group_id=group.id, user_id=user_id)
        db.add(group_user)
    db.commit()

    return group

def get_groups(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Group).offset(skip).limit(limit).all()
