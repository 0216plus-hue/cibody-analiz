import sys
sys.path.append("backend")
from database import SessionLocal
import models
import requests

db = SessionLocal()
try:
    # insert a dummy patient
    patient = models.Patient(name="Test Patient")
    db.add(patient)
    db.commit()
    db.refresh(patient)
    
    # insert a dummy analysis
    analysis = models.ScoliosisAnalysis(
        patient_id=patient.id,
        image_path="dummy.jpg",
        cobb_angle=15,
        curve_type="Thoracic"
    )
    db.add(analysis)
    db.commit()
    db.refresh(analysis)
    
    print(f"Created analysis ID {analysis.id}")
    
    # Make API call locally
    res = requests.post(f"http://127.0.0.1:8080/api/scoliosis/{analysis.id}/generate-report")
    print("STATUS CODE:", res.status_code)
    print("RESPONSE:", res.text)
except Exception as e:
    print("Error:", e)
