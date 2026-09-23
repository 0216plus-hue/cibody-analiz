import sys
sys.path.append("backend")
from database import engine, Base
import models
Base.metadata.create_all(bind=engine)
print("Tables created!")
