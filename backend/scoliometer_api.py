import models
from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from database import get_db
from main import get_current_user
import uuid
from datetime import datetime, timedelta
from pydantic import BaseModel

router = APIRouter()

class ScoliometerSaveRequest(BaseModel):
    thoracic_angle: float = None
    lumbar_angle: float = None

@router.post("/api/scoliometer/token/{patient_id}")
def generate_scoliometer_token(patient_id: int, request: Request, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    patient = db.query(models.Patient).filter(models.Patient.id == patient_id).first()
    if not patient: raise HTTPException(status_code=404, detail="Patient not found")
    
    token_str = str(uuid.uuid4())
    token = models.ScoliometerToken(
        token=token_str,
        patient_id=patient.id,
        expires_at=datetime.utcnow() + timedelta(hours=1)
    )
    db.add(token)
    db.commit()
    
    # Generate the URL that the QR code will point to
    # request.base_url gives e.g. "http://localhost:8080/"
    url = f"{request.base_url}scoliometer?token={token_str}"
    return {"url": url}

@router.get("/api/scoliometer/auth/{token}")
def get_scoliometer_patient(token: str, db: Session = Depends(get_db)):
    t = db.query(models.ScoliometerToken).filter(models.ScoliometerToken.token == token, models.ScoliometerToken.is_used == False).first()
    if not t or t.expires_at < datetime.utcnow():
        raise HTTPException(status_code=401, detail="Geçersiz veya süresi dolmuş bağlantı.")
    
    patient = db.query(models.Patient).filter(models.Patient.id == t.patient_id).first()
    return {"patient_id": patient.id, "patient_name": patient.name}

@router.post("/api/scoliometer/save/{token}")
def save_scoliometer_data(token: str, req: ScoliometerSaveRequest, db: Session = Depends(get_db)):
    t = db.query(models.ScoliometerToken).filter(models.ScoliometerToken.token == token, models.ScoliometerToken.is_used == False).first()
    if not t or t.expires_at < datetime.utcnow():
        raise HTTPException(status_code=401, detail="Geçersiz veya süresi dolmuş bağlantı.")
    
    m = models.ScoliometerMeasurement(
        patient_id=t.patient_id,
        thoracic_angle=req.thoracic_angle,
        lumbar_angle=req.lumbar_angle
    )
    db.add(m)
    t.is_used = True
    db.commit()
    return {"status": "success"}

@router.get("/api/scoliometer/patient/{patient_id}")
def get_scoliometer_history(patient_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    history = db.query(models.ScoliometerMeasurement).filter(models.ScoliometerMeasurement.patient_id == patient_id).order_by(models.ScoliometerMeasurement.created_at.desc()).all()
    return {"history": [{"id": h.id, "thoracic": h.thoracic_angle, "lumbar": h.lumbar_angle, "date": h.created_at.isoformat()} for h in history]}
