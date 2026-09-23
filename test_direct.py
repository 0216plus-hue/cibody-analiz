import sys
sys.path.append("backend")
from database import SessionLocal
import models
from main import generate_scoliosis_report

db = SessionLocal()
try:
    res = generate_scoliosis_report(analysis_id=1, db=db, current_user=models.User(id=1, email="test"))
    print("SUCCESS:", res)
except Exception as e:
    print("FAILED:", e)
