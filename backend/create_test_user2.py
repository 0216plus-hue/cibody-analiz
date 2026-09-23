import sys
from database import SessionLocal
import models
import bcrypt

def get_password_hash(password: str) -> str:
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed.decode('utf-8')

db = SessionLocal()
user = db.query(models.User).filter(models.User.email == "test@test.com").first()
if not user:
    user = models.User(
        email="test@test.com",
        name="Dr. Test",
        hashed_password=get_password_hash("123456"),
        role="doctor"
    )
    db.add(user)
    db.commit()
    print("Created test user!")
else:
    # force set password to 123456
    user.hashed_password = get_password_hash("123456")
    db.commit()
    print("Test user password reset to 123456")
