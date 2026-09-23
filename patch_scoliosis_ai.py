with open("backend/main.py", "r") as f:
    content = f.read()

new_endpoint = """
@app.post("/api/scoliosis/{analysis_id}/generate-exercises")
def generate_scoliosis_exercises(analysis_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    analysis = db.query(models.ScoliosisAnalysis).filter(models.ScoliosisAnalysis.id == analysis_id).first()
    if not analysis: raise HTTPException(status_code=404)
    
    cobb = analysis.cobb_angle or 0
    
    prompt = f\"\"\"
    Sen uzman bir fizyoterapistsin. Hastanın omurga röntgeninde Cobb açısı {cobb} derece ölçüldü.
    Lütfen sadece bu hastanın yapabileceği Schroth egzersizleri ve genel postür düzeltici esneme/güçlendirme egzersizlerinden oluşan 4-5 maddelik detaylı bir egzersiz listesi ver.
    Raporu Markdown formatında ve motive edici bir dille yaz.
    \"\"\"
    
    try:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key={API_KEY}"
        payload = {"contents": [{"parts": [{"text": prompt}]}]}
        rr = requests.post(url, json=payload, timeout=60)
        rr.raise_for_status()
        text = rr.json()["candidates"][0]["content"]["parts"][0]["text"]
        
        # Append to existing ai_report_text
        if analysis.ai_report_text:
            analysis.ai_report_text += "\n\n### 🏃‍♂️ Önerilen Egzersiz Programı\n" + text
        else:
            analysis.ai_report_text = "### 🏃‍♂️ Önerilen Egzersiz Programı\n" + text
            
        db.commit()
        return {"status": "success", "report": analysis.ai_report_text}
    except Exception as e:
        print("Gemini Scoliosis Exercise Error:", e)
        raise HTTPException(status_code=500, detail="Yapay zeka servisi yanıt vermedi.")
"""

content = content.replace('@app.get("/api/public/scoliosis_report/{analysis_id}")', new_endpoint + '\n@app.get("/api/public/scoliosis_report/{analysis_id}")')

with open("backend/main.py", "w") as f:
    f.write(content)
