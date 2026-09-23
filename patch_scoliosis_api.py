with open("backend/main.py", "r") as f:
    content = f.read()

import re
old_endpoint = re.search(r'@app\.post\("/api/scoliosis/\{analysis_id\}/generate-exercises"\).*?except Exception as e:.*?raise HTTPException\(status_code=500, detail="Yapay zeka servisi yanıt vermedi\."\)', content, re.DOTALL)

new_endpoint = """@app.post("/api/scoliosis/{analysis_id}/generate-exercises")
def generate_scoliosis_exercises(analysis_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    analysis = db.query(models.ScoliosisAnalysis).filter(models.ScoliosisAnalysis.id == analysis_id).first()
    if not analysis: raise HTTPException(status_code=404)
    
    cobb = analysis.cobb_angle or 0
    all_ex = db.query(models.Exercise).all()
    library_str = "\\n".join([f"ID: {ex.id} | Ad: {ex.name} | Kategori: {ex.category}" for ex in all_ex])
    
    prompt = f\"\"\"
    Sen uzman bir fizyoterapistsin. Hastanın omurga röntgeninde Cobb açısı {cobb} derece ölçüldü.
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
        
        report_html = "### 🏃‍♂️ Önerilen Egzersiz Programı\\n\\n"
        report_html += "<div class='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>\\n"
        
        for ex_id in suggested_ids:
            ex = db.query(models.Exercise).filter(models.Exercise.id == ex_id).first()
            if not ex: continue
            
            sets = "3"
            reps = "10"
            if "Esnetme" in ex.name or "Germe" in ex.name:
                reps = "30 sn"
            elif "Stabilizasyon" in ex.name or "İzometrik" in ex.name:
                reps = "15 sn"
                
            report_html += f\"\"\"
            <div class='bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex gap-4 items-center'>
                <div class='w-16 h-16 bg-slate-100 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden'>
                    <img src='/api/exercises/{ex.id}/image' onerror="this.outerHTML='<i class=\\'fa-solid fa-person-running text-2xl text-slate-400\\'></i>'" class='w-full h-full object-cover'/>
                </div>
                <div class='flex-1'>
                    <h4 class='font-bold text-slate-800 text-sm mb-1'>{ex.name}</h4>
                    <p class='text-xs text-slate-500 mb-2'>{ex.category}</p>
                    <div class='flex gap-2'>
                        <span class='bg-indigo-50 text-indigo-700 text-xs font-bold px-2 py-1 rounded'>Set: {sets}</span>
                        <span class='bg-emerald-50 text-emerald-700 text-xs font-bold px-2 py-1 rounded'>Tekrar: {reps}</span>
                    </div>
                </div>
            </div>
            \"\"\"
            
        report_html += "</div>"
        
        # We append using the marker so frontend can split it
        # Wait, if we want to separate them in frontend, we need the exact marker.
        marker = "### 🏃‍♂️ Önerilen Egzersiz Programı"
        
        # Remove any existing exercise program from the text to avoid duplicates
        if analysis.ai_report_text and marker in analysis.ai_report_text:
            parts = analysis.ai_report_text.split(marker)
            analysis.ai_report_text = parts[0].strip()
            
        if analysis.ai_report_text:
            analysis.ai_report_text += "\\n\\n" + report_html
        else:
            analysis.ai_report_text = report_html
            
        db.commit()
        return {"status": "success", "report": analysis.ai_report_text}
    except Exception as e:
        print("Gemini Scoliosis Exercise Error:", e)
        raise HTTPException(status_code=500, detail="Yapay zeka servisi yanıt vermedi.")"""

if old_endpoint:
    content = content.replace(old_endpoint.group(0), new_endpoint)
    with open("backend/main.py", "w") as f:
        f.write(content)
else:
    print("Could not find old endpoint to replace.")
