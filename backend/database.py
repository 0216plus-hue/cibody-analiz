import os
import shutil
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Kalici veri klasoru (Docker volume buraya baglanacak)
DATA_DIR = "./data"
if not os.path.exists(DATA_DIR):
    os.makedirs(DATA_DIR, exist_ok=True)

# Veritabaninin kalici konumu
DB_PATH = os.path.join(DATA_DIR, "posture_data.db")

# Eger kalici konumda DB yoksa ama kaynak kodun icinde varsa (GitHub'dan gelen), kopyala
if not os.path.exists(DB_PATH) and os.path.exists("posture_data.db"):
    shutil.copy2("posture_data.db", DB_PATH)

SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", f"sqlite:///{DB_PATH}")

connect_args = {"check_same_thread": False} if SQLALCHEMY_DATABASE_URL.startswith("sqlite") else {}
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args=connect_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
