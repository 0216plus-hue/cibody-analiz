import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# İleride projeyi internete (sunucuya) kuracağınız zaman, buradaki URL'yi 
# PostgreSQL URL'si ile (örneğin: postgresql://user:password@localhost/dbname) 
# değiştirmeniz yeterli olacaktır. Şimdilik lokal geliştirme için SQLite kullanıyoruz.
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./posture_data.db")

# SQLite kullanırken thread uyarısını kapatmak için connect_args ekliyoruz.
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
