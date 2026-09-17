import re

with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/backend/main.py', 'r') as f:
    content = f.read()

# Extract the new route block
route_block = """
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

# Remove it from the bottom
content = content.replace(route_block, "")

# Insert it BEFORE app.mount("/uploads", ...)
mounts = """app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")"""
if mounts in content:
    content = content.replace(mounts, route_block.strip() + "\n\n" + mounts)
    with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/backend/main.py', 'w') as f:
        f.write(content)
    print("Route order fixed.")
else:
    print("Could not find mounts.")
