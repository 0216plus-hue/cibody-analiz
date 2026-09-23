with open("backend/main.py", "r") as f:
    content = f.read()

import re

old_posture = """    patient = db.query(models.Patient).filter(models.Patient.id == analysis.patient_id).first()
    
    exercises = db.query(models.PrescribedExercise).filter(models.PrescribedExercise.posture_analysis_id == analysis_id).all()"""

new_posture = """    patient = db.query(models.Patient).filter(models.Patient.id == analysis.patient_id).first()
    doctor = db.query(models.User).filter(models.User.id == patient.user_id).first() if patient else None
    
    exercises = db.query(models.PrescribedExercise).filter(models.PrescribedExercise.posture_analysis_id == analysis_id).all()"""

content = content.replace(old_posture, new_posture)

with open("backend/main.py", "w") as f:
    f.write(content)
