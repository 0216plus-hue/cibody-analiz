"""
CIBODY AI — Süper Admin Oluşturma Scripti
Tek seferlik çalıştırın: python3 init_superadmin.py
"""
import sys
sys.path.insert(0, '.')

from database import engine, get_db, SessionLocal
import models
from passlib.context import CryptContext

models.Base.metadata.create_all(bind=engine)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

db = SessionLocal()

EMAIL = "admin@cibody.tr"
PASSWORD = "cibody2024!"  # İlk girişten sonra değiştirin

existing = db.query(models.User).filter(models.User.email == EMAIL).first()
if existing:
    print(f"Süper Admin zaten mevcut: {EMAIL}")
else:
    superadmin = models.User(
        name="CIBODY Admin",
        email=EMAIL,
        hashed_password=pwd_context.hash(PASSWORD),
        role="superadmin",
        is_active=True,
        monthly_limit=9999
    )
    db.add(superadmin)
    db.commit()
    print(f"✅ Süper Admin oluşturuldu!")
    print(f"   E-posta : {EMAIL}")
    print(f"   Şifre   : {PASSWORD}")
    print(f"   ⚠️  Lütfen ilk girişten sonra şifrenizi değiştirin!")

db.close()
