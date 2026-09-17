import sqlite3
import os

DB_PATH = '/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/backend/posture.db'

def alter_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    try:
        cursor.execute("ALTER TABLE posture_analyses ADD COLUMN clinical_notes TEXT")
        conn.commit()
        print("Column clinical_notes added successfully.")
    except sqlite3.OperationalError as e:
        if "duplicate column name" in str(e):
            print("Column already exists.")
        else:
            print("DB Error:", e)
    finally:
        conn.close()

alter_db()

# Update models.py
with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/backend/models.py', 'r') as f:
    models_content = f.read()

if "clinical_notes =" not in models_content:
    old_line = "analysis_data = Column(Text, nullable=True)"
    new_line = "analysis_data = Column(Text, nullable=True)\n    clinical_notes = Column(Text, nullable=True)"
    models_content = models_content.replace(old_line, new_line)
    with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/backend/models.py', 'w') as f:
        f.write(models_content)
    print("models.py updated.")

# Update main.py
with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/backend/main.py', 'r') as f:
    main_content = f.read()

if "def update_analysis_notes" not in main_content:
    api_endpoint = """
from pydantic import BaseModel

class NoteUpdate(BaseModel):
    notes: str

@app.put("/api/posture/{analysis_id}/notes")
def update_analysis_notes(analysis_id: int, payload: NoteUpdate, db: Session = Depends(get_db)):
    analysis = db.query(models.PostureAnalysis).filter(models.PostureAnalysis.id == analysis_id).first()
    if not analysis:
        raise HTTPException(status_code=404, detail="Analiz bulunamadı")
    analysis.clinical_notes = payload.notes
    db.commit()
    return {"status": "success"}
"""
    # Just append it before the end of the file
    main_content += "\n" + api_endpoint
    with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/backend/main.py', 'w') as f:
        f.write(main_content)
    print("main.py updated.")

