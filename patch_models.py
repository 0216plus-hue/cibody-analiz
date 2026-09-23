with open("backend/models.py", "r") as f:
    content = f.read()

scoliosis_model = """
class ScoliosisAnalysis(Base):
    __tablename__ = "scoliosis_analyses"

    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"))
    image_path = Column(String, nullable=True)
    cobb_angle = Column(Float, nullable=True)
    curve_type = Column(String, nullable=True) # e.g. "C-Eğrisi", "S-Eğrisi"
    points_data = Column(String, nullable=True) # JSON string of marked points
    clinical_notes = Column(String, nullable=True)
    ai_report_text = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
"""

if "class ScoliosisAnalysis" not in content:
    content = content + "\n" + scoliosis_model
    with open("backend/models.py", "w") as f:
        f.write(content)
    print("ScoliosisAnalysis model added.")
else:
    print("ScoliosisAnalysis model already exists.")
