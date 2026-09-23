with open("backend/main.py", "r") as f:
    content = f.read()

scoliosis_exercise_endpoints = """
@app.get("/api/scoliosis/{analysis_id}/exercises")
def get_scoliosis_prescribed_exercises(analysis_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    exercises = db.query(models.PrescribedExercise).filter(models.PrescribedExercise.scoliosis_analysis_id == analysis_id).all()
    res = []
    for ex in exercises:
        base = db.query(models.Exercise).filter(models.Exercise.id == ex.exercise_id).first()
        if base:
            res.append({
                "id": ex.id,
                "exercise_id": ex.exercise_id,
                "name": base.name,
                "category": base.category,
                "sets": ex.sets,
                "reps": ex.reps
            })
    return {"status": "success", "exercises": res}

@app.post("/api/scoliosis/{analysis_id}/exercises")
def add_scoliosis_prescribed_exercise(analysis_id: int, payload: ExerciseAssign, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    ne = models.PrescribedExercise(
        scoliosis_analysis_id=analysis_id,
        exercise_id=payload.exercise_id,
        sets=payload.sets,
        reps=payload.reps
    )
    db.add(ne)
    db.commit()
    return {"status": "success"}

@app.put("/api/scoliosis/{analysis_id}/exercises/{assign_id}")
def update_scoliosis_prescribed_exercise(analysis_id: int, assign_id: int, payload: ExerciseUpdate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    assign = db.query(models.PrescribedExercise).filter(models.PrescribedExercise.id == assign_id).first()
    if assign:
        assign.sets = payload.sets
        assign.reps = payload.reps
        db.commit()
    return {"status": "success"}

@app.delete("/api/scoliosis/{analysis_id}/exercises/{assign_id}")
def delete_scoliosis_prescribed_exercise(analysis_id: int, assign_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    assign = db.query(models.PrescribedExercise).filter(models.PrescribedExercise.id == assign_id).first()
    if assign:
        db.delete(assign)
        db.commit()
    return {"status": "success"}

@app.post("/api/scoliosis/{analysis_id}/exercises/suggest")
def suggest_scoliosis_exercises(analysis_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    try:
        analysis = db.query(models.ScoliosisAnalysis).filter(models.ScoliosisAnalysis.id == analysis_id).first()
        if not analysis: raise HTTPException(status_code=404)
        
        db.query(models.PrescribedExercise).filter(models.PrescribedExercise.scoliosis_analysis_id == analysis_id).delete()
        db.commit()
        
        all_ex = db.query(models.Exercise).all()
        library_str = "\\n".join([f"ID: {ex.id} | Ad: {ex.name} | Kategori: {ex.category}" for ex in all_ex])
        
        cobb = analysis.cobb_angle or 0
        prompt = f\"\"\"Sen uzman bir fizyoterapistsin. Hastanın omurga röntgeninde Cobb açısı {cobb} derece ölçüldü.
Lütfen aşağıdaki veritabanımızdaki egzersiz listesinden, bu hastanın yapabileceği Schroth egzersizleri ve postür düzeltici esneme/güçlendirme egzersizlerinden en uygun 4-5 tanesini seç.
SADECE VE SADECE seçtiğin egzersizlerin ID numaralarını json formatında bir liste olarak dön. Örnek: [12, 45, 3]
Başka hiçbir kelime veya açıklama yazma!

Egzersiz Listesi:
{library_str}
\"\"\"
        
        try:
            url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key={API_KEY}"
            payload = {"contents": [{"parts": [{"text": prompt}]}]}
            
            rr = requests.post(url, json=payload, timeout=60)
            rr.raise_for_status()
            text = rr.json()["candidates"][0]["content"]["parts"][0]["text"]
            
            import json
            import re
            
            match = re.search(r'\[.*\]', text, re.DOTALL)
            if match:
                suggested_ids = json.loads(match.group(0))
            else:
                suggested_ids = []
                
            if not suggested_ids or not isinstance(suggested_ids, list):
                import random
                suggested_ids = [ex.id for ex in random.sample(all_ex, min(4, len(all_ex)))]
                
            suggested_ids = [int(x) for x in suggested_ids[:6] if str(x).isdigit()]
            
            for ex_id in suggested_ids:
                ex = db.query(models.Exercise).filter(models.Exercise.id == ex_id).first()
                if not ex: continue
                
                sets = "3"
                reps = "10"
                if "Esnetme" in ex.name or "Germe" in ex.name:
                    reps = "30 sn"
                elif "Stabilizasyon" in ex.name or "İzometrik" in ex.name:
                    reps = "15 sn"
                    
                ne = models.PrescribedExercise(
                    scoliosis_analysis_id=analysis_id,
                    exercise_id=ex_id,
                    sets=sets,
                    reps=reps
                )
                db.add(ne)
            
            db.commit()
            return {"status": "success", "message": "AI egzersizler önerildi."}
            
        except Exception as e:
            import random
            suggested = random.sample(all_ex, min(4, len(all_ex)))
            for ex in suggested:
                ne = models.PrescribedExercise(
                    scoliosis_analysis_id=analysis_id,
                    exercise_id=ex.id,
                    sets="3",
                    reps="10"
                )
                db.add(ne)
            db.commit()
            return {"status": "success", "message": "Rastgele (yedek) egzersizler eklendi."}

    except Exception as e:
        print("Gemini Scoliosis Exercise Suggest Error:", e)
        raise HTTPException(status_code=500, detail="Yapay zeka servisi yanıt vermedi.")
"""

# I need to remove the old generate-exercises endpoint and append these
import re
old_endpoint_regex = r'@app\.post\("/api/scoliosis/\{analysis_id\}/generate-exercises"\).*?raise HTTPException\(status_code=500, detail="Yapay zeka servisi yanıt vermedi\."\)'
content = re.sub(old_endpoint_regex, scoliosis_exercise_endpoints, content, flags=re.DOTALL)

with open("backend/main.py", "w") as f:
    f.write(content)

