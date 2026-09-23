import sys
sys.path.append("backend")
from database import SessionLocal
import models

db = SessionLocal()
try:
    ex = models.PrescribedExercise(
        scoliosis_analysis_id=1,
        exercise_id=1,
        sets="3",
        reps="10"
    )
    db.add(ex)
    db.commit()
    print("SUCCESS: Inserted into prescribed_exercises with scoliosis_analysis_id")
    db.delete(ex)
    db.commit()
except Exception as e:
    print("FAILED:", e)
