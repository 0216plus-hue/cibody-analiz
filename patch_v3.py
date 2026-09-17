import re

# 1. Update models.py
with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/backend/models.py', 'r') as f:
    models_content = f.read()
if 'phone = Column(String' not in models_content:
    models_content = models_content.replace('gender = Column(String)', 'gender = Column(String)\n    phone = Column(String, nullable=True)')
    with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/backend/models.py', 'w') as f:
        f.write(models_content)
    print("models.py updated with phone column.")

# 2. Update main.py
with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/backend/main.py', 'r') as f:
    main_content = f.read()

# Add phone to create_patient
if 'phone: str = Form(None)' not in main_content:
    main_content = main_content.replace(
        'gender: str = Form("Erkek"),',
        'gender: str = Form("Erkek"),\n    phone: str = Form(None),'
    ).replace(
        'gender=gender)',
        'gender=gender, phone=phone)'
    )

# Add DELETE route
delete_route = """
@app.delete("/api/patients/{patient_id}")
async def delete_patient(patient_id: int, db: Session = Depends(get_db)):
    patient = db.query(models.Patient).filter(models.Patient.id == patient_id).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Hasta bulunamadı")
    
    # İlgili analizleri de sil (Cascade yoksa manuel)
    db.query(models.PostureAnalysis).filter(models.PostureAnalysis.patient_id == patient_id).delete()
    db.query(models.FootAnalysis).filter(models.FootAnalysis.patient_id == patient_id).delete()
    
    db.delete(patient)
    db.commit()
    return {"status": "success"}
"""

if '@app.delete("/api/patients/{patient_id}")' not in main_content:
    main_content = main_content.replace(
        '@app.post("/api/analyze")',
        delete_route + '\n@app.post("/api/analyze")'
    )
    with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/backend/main.py', 'w') as f:
        f.write(main_content)
    print("main.py updated with DELETE route and phone parameter.")

