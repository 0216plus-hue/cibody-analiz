with open("backend/main.py", "r") as f:
    content = f.read()

scoliosis_api = """

# ==========================================
# SCOLIOSIS ANALYSIS ENDPOINTS
# ==========================================

@app.post("/api/scoliosis")
async def create_scoliosis_analysis(
    patient_id: int = Form(...),
    image: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    import uuid
    import os
    
    # Save Image
    ext = image.filename.split(".")[-1]
    filename = f"{uuid.uuid4().hex}.{ext}"
    img_path = os.path.join(UPLOAD_DIR, filename)
    with open(img_path, "wb") as f:
        f.write(await image.read())
        
    db_path = f"uploads/{filename}"
    
    new_analysis = models.ScoliosisAnalysis(
        patient_id=patient_id,
        image_path=db_path
    )
    db.add(new_analysis)
    db.commit()
    db.refresh(new_analysis)
    
    return {"status": "success", "analysis_id": new_analysis.id}

@app.get("/api/scoliosis/patient/{patient_id}")
def get_patient_scoliosis(patient_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    analyses = db.query(models.ScoliosisAnalysis).filter(models.ScoliosisAnalysis.patient_id == patient_id).order_by(models.ScoliosisAnalysis.created_at.desc()).all()
    return analyses

@app.put("/api/scoliosis/{analysis_id}")
def update_scoliosis(
    analysis_id: int, 
    data: dict,
    db: Session = Depends(get_db), 
    current_user: models.User = Depends(get_current_user)
):
    analysis = db.query(models.ScoliosisAnalysis).filter(models.ScoliosisAnalysis.id == analysis_id).first()
    if not analysis:
        raise HTTPException(status_code=404, detail="Scoliosis analysis not found")
        
    if "cobb_angle" in data:
        analysis.cobb_angle = data["cobb_angle"]
    if "curve_type" in data:
        analysis.curve_type = data["curve_type"]
    if "points_data" in data:
        analysis.points_data = data["points_data"]
    if "clinical_notes" in data:
        analysis.clinical_notes = data["clinical_notes"]
        
    db.commit()
    return {"status": "success"}

@app.delete("/api/scoliosis/{analysis_id}")
def delete_scoliosis(analysis_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    analysis = db.query(models.ScoliosisAnalysis).filter(models.ScoliosisAnalysis.id == analysis_id).first()
    if analysis:
        db.delete(analysis)
        db.commit()
    return {"status": "success"}

@app.post("/api/scoliosis/{analysis_id}/generate-report")
def generate_scoliosis_report(analysis_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    analysis = db.query(models.ScoliosisAnalysis).filter(models.ScoliosisAnalysis.id == analysis_id).first()
    if not analysis: raise HTTPException(status_code=404)
    
    cobb = analysis.cobb_angle or 0
    curve = analysis.curve_type or "Belirtilmemiş"
    
    prompt = f\"\"\"
    Sen uzman bir fizyoterapist ve ortopedistsin. Hastanın çekilen omurga röntgeninde (X-Ray) Cobb açısı ölçümü yapıldı.
    Sonuçlar:
    - Cobb Açısı: {cobb} derece
    - Eğrilik Tipi: {curve}
    
    Lütfen bu durumu klinik olarak değerlendir. 
    1) Skolyoz derecesinin şiddetini yorumla (hafif, orta, şiddetli).
    2) Bu hastaya Schroth egzersizleri gibi bilimsel ve kanıta dayalı fizyoterapi önerileri sun.
    3) Günlük yaşam aktiviteleri (oturma, yatma, çanta taşıma) için tavsiyelerde bulun.
    
    Raporu Markdown formatında ve sadece hastaya/uzmana okunabilir, şık bir dille yaz. Çok kısa olmasın, kapsamlı ve doyurucu olsun.
    \"\"\"
    
    try:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key={API_KEY}"
        payload = {"contents": [{"parts": [{"text": prompt}]}]}
        rr = requests.post(url, json=payload, timeout=60)
        rr.raise_for_status()
        text = rr.json()["candidates"][0]["content"]["parts"][0]["text"]
        
        analysis.ai_report_text = text
        db.commit()
        return {"status": "success", "report": text}
    except Exception as e:
        print("Gemini Scoliosis Error:", e)
        raise HTTPException(status_code=500, detail="Yapay zeka servisi yanıt vermedi.")

@app.get("/api/public/scoliosis_report/{analysis_id}")
def get_public_scoliosis_report(analysis_id: int, db: Session = Depends(get_db)):
    analysis = db.query(models.ScoliosisAnalysis).filter(models.ScoliosisAnalysis.id == analysis_id).first()
    if not analysis: raise HTTPException(status_code=404)
    patient = db.query(models.Patient).filter(models.Patient.id == analysis.patient_id).first()
    doctor = db.query(models.User).filter(models.User.id == patient.user_id).first() if patient else None
    
    return {
        "image_path": analysis.image_path,
        "cobb_angle": analysis.cobb_angle,
        "curve_type": analysis.curve_type,
        "points_data": analysis.points_data,
        "clinical_notes": analysis.clinical_notes,
        "ai_report_text": analysis.ai_report_text,
        "created_at": analysis.created_at,
        "patient": {
            "age": patient.age,
            "gender": patient.gender,
            "weight": patient.weight
        } if patient else {},
        "doctor": {
            "name": doctor.name if doctor else "",
            "email": doctor.email if doctor else "",
            "phone": doctor.phone if doctor else ""
        } if doctor else {}
    }

"""

if "SCOLIOSIS ANALYSIS ENDPOINTS" not in content:
    content = content.replace("app.mount(\"/\", StaticFiles(directory=\"../frontend\", html=True), name=\"frontend\")", scoliosis_api + "\napp.mount(\"/\", StaticFiles(directory=\"../frontend\", html=True), name=\"frontend\")")
    with open("backend/main.py", "w") as f:
        f.write(content)
    print("Scoliosis API added.")
else:
    print("Scoliosis API already exists.")
