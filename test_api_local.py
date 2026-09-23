import sys
sys.path.append("backend")
from database import SessionLocal
import models
from sqlalchemy import text
db = SessionLocal()
try:
    cols = db.execute(text("PRAGMA table_info(prescribed_exercises)")).fetchall()
    col_names = [c[1] for c in cols]
    if 'scoliosis_analysis_id' in col_names:
        print("SUCCESS: Column exists!")
    else:
        print("FAIL: Column missing!", col_names)
except Exception as e:
    print("ERROR:", e)
