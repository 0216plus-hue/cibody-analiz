with open("backend/main.py", "r") as f:
    content = f.read()

import re

# For Posture report
posture_old = """    patient = db.query(models.Patient).filter(models.Patient.id == analysis.patient_id).first()
    
    # Egzersizleri de çek"""
posture_new = """    patient = db.query(models.Patient).filter(models.Patient.id == analysis.patient_id).first()
    doctor = db.query(models.User).filter(models.User.id == patient.user_id).first() if patient else None
    
    # Egzersizleri de çek"""
content = content.replace(posture_old, posture_new)

# Find the return block of Posture
posture_ret_old = """        "patient": {
            "age": patient.age,
            "gender": patient.gender,
            "weight": patient.weight
        },"""
posture_ret_new = """        "patient": {
            "age": patient.age,
            "gender": patient.gender,
            "weight": patient.weight
        },
        "doctor": {
            "name": doctor.name if doctor else "",
            "email": doctor.email if doctor else "",
            "phone": doctor.phone if doctor else ""
        },"""
content = content.replace(posture_ret_old, posture_ret_new)


# For Foot report
foot_old = """    patient = db.query(models.Patient).filter(models.Patient.id == analysis.patient_id).first()
    
    return {"""
foot_new = """    patient = db.query(models.Patient).filter(models.Patient.id == analysis.patient_id).first()
    doctor = db.query(models.User).filter(models.User.id == patient.user_id).first() if patient else None
    
    return {"""
content = content.replace(foot_old, foot_new)

foot_ret_old = """        "patient": {
            "name": patient.name,
            "age": patient.age,
            "weight": patient.weight,
            "gender": patient.gender
        },"""
foot_ret_new = """        "patient": {
            "name": patient.name,
            "age": patient.age,
            "weight": patient.weight,
            "gender": patient.gender
        },
        "doctor": {
            "name": doctor.name if doctor else "",
            "email": doctor.email if doctor else "",
            "phone": doctor.phone if doctor else ""
        },"""
content = content.replace(foot_ret_old, foot_ret_new)

with open("backend/main.py", "w") as f:
    f.write(content)
