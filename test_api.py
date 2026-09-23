from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import sys
sys.path.append('backend')
import models

engine = create_engine('sqlite:///backend/posture_data.db')
Session = sessionmaker(bind=engine)
db = Session()

analysis = db.query(models.FootAnalysis).filter(models.FootAnalysis.id == 4).first()
if analysis:
    patient = db.query(models.Patient).filter(models.Patient.id == analysis.patient_id).first()
    print("Found! Patient:", patient.name if patient else "NONE")
else:
    print("Not found")
