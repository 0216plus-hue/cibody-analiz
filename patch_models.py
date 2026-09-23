with open("backend/models.py", "r") as f:
    content = f.read()

content = content.replace(
    'posture_analysis_id = Column(Integer, ForeignKey("posture_analyses.id"))',
    'posture_analysis_id = Column(Integer, ForeignKey("posture_analyses.id"), nullable=True)\n    scoliosis_analysis_id = Column(Integer, ForeignKey("scoliosis_analyses.id"), nullable=True)'
)

with open("backend/models.py", "w") as f:
    f.write(content)
