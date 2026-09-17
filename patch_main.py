import re

with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/backend/main.py', 'r') as f:
    content = f.read()

# Eklenecek importlar
if 'import uuid' not in content:
    content = content.replace('import os\n', 'import os\nimport uuid\n')

# Değiştirilecek Kısım (line 77'den sonrası)
split_marker = '@app.post("/api/analyze")'
if split_marker in content:
    top_part = content.split(split_marker)[0]
    
    new_bottom = """
@app.post("/api/patients")
async def create_patient(
    name: str = Form(...),
    age: int = Form(0),
    weight: float = Form(0.0),
    gender: str = Form("Erkek"),
    db: Session = Depends(get_db)
):
    new_patient = models.Patient(name=name, age=age, weight=weight, gender=gender)
    db.add(new_patient)
    db.commit()
    db.refresh(new_patient)
    return {"status": "success", "patient_id": new_patient.id}

@app.get("/api/patients")
async def get_patients(db: Session = Depends(get_db)):
    patients = db.query(models.Patient).order_by(models.Patient.created_at.desc()).all()
    return patients

@app.get("/api/patients/{patient_id}")
async def get_patient_details(patient_id: int, db: Session = Depends(get_db)):
    patient = db.query(models.Patient).filter(models.Patient.id == patient_id).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Hasta bulunamadı")
    
    posture_analyses = db.query(models.PostureAnalysis).filter(models.PostureAnalysis.patient_id == patient_id).order_by(models.PostureAnalysis.created_at.desc()).all()
    foot_analyses = db.query(models.FootAnalysis).filter(models.FootAnalysis.patient_id == patient_id).order_by(models.FootAnalysis.created_at.desc()).all()
    
    return {
        "patient": patient,
        "posture_analyses": posture_analyses,
        "foot_analyses": foot_analyses
    }

@app.post("/api/analyze")
async def analyze_pdf(patient_id: int = Form(...), file: UploadFile = File(...), db: Session = Depends(get_db)):
    if not API_KEY or API_KEY == "buraya_api_anahtarinizi_yapisitiracaksiniz":
        raise HTTPException(status_code=500, detail="Gemini API Anahtarı eksik.")
    
    if not file.filename.lower().endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Lütfen PDF dosyası yükleyin.")

    patient = db.query(models.Patient).filter(models.Patient.id == patient_id).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Hasta bulunamadı")

    # PDF'i diske kaydet
    os.makedirs("uploads/pdfs", exist_ok=True)
    pdf_filename = f"{uuid.uuid4()}_{file.filename}"
    pdf_path = os.path.join("uploads", "pdfs", pdf_filename)
    
    try:
        file_bytes = await file.read()
        with open(pdf_path, "wb") as f:
            f.write(file_bytes)
            
        encoded_pdf = base64.b64encode(file_bytes).decode('utf-8')

        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={API_KEY}"
        headers = {"Content-Type": "application/json"}
        payload = {
            "system_instruction": {"parts": [{"text": SYSTEM_PROMPT}]},
            "contents": [
                {
                    "parts": [
                        {"inline_data": {"mime_type": "application/pdf", "data": encoded_pdf}},
                        {"text": "Raporu tıbbi literatür standartlarına göre analiz et."}
                    ]
                }
            ]
        }

        response = requests.post(url, headers=headers, json=payload, timeout=120)
        if response.status_code != 200:
            raise Exception(f"API Hatası ({response.status_code}): {response.text}")

        result = response.json()
        report_text = result["candidates"][0]["content"]["parts"][0]["text"]
        
        # Veritabanına kaydet (Varsa eskisini bulup sil veya üstüne yaz)
        existing_foot = db.query(models.FootAnalysis).filter(models.FootAnalysis.patient_id == patient_id).first()
        if existing_foot:
            existing_foot.original_pdf_path = pdf_path
            existing_foot.ai_report_text = report_text
            db.commit()
        else:
            new_foot = models.FootAnalysis(
                patient_id=patient_id,
                original_pdf_path=pdf_path,
                ai_report_text=report_text
            )
            db.add(new_foot)
            db.commit()

        return {"status": "success", "report": report_text}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/posture/analyze")
async def analyze_posture(
    patient_id: int = Form(...),
    front_image: UploadFile = File(None),
    back_image: UploadFile = File(None),
    left_image: UploadFile = File(None),
    right_image: UploadFile = File(None),
    db: Session = Depends(get_db)
):
    patient = db.query(models.Patient).filter(models.Patient.id == patient_id).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Hasta bulunamadı")

    results = {}
    
    async def process_img(img_file, view_name):
        if img_file and img_file.filename:
            bytes_data = await img_file.read()
            analysis_result = analyze_image(bytes_data)
            results[view_name] = analysis_result

    await process_img(front_image, "front")
    await process_img(back_image, "back")
    await process_img(left_image, "left")
    await process_img(right_image, "right")

    analysis_record = models.PostureAnalysis(
        patient_id=patient_id,
        analysis_data=json.dumps(results)
    )
    db.add(analysis_record)
    db.commit()

    return {
        "status": "success",
        "patient_id": patient_id,
        "analysis": results
    }

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")
app.mount("/", StaticFiles(directory="../frontend", html=True), name="frontend")
"""
    
    with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/backend/main.py', 'w') as f:
        f.write(top_part + new_bottom)

print("Backend API successfully updated.")
