import re

with open("backend/main.py", "r") as f:
    content = f.read()

content = re.sub(
    r'img_path = os\.path\.join\(UPLOAD_DIR, filename\)',
    r'os.makedirs("uploads/scoliosis", exist_ok=True)\n    img_path = f"uploads/scoliosis/{filename}"',
    content
)

content = re.sub(
    r'db_path = f"uploads/\{filename\}"',
    r'db_path = f"uploads/scoliosis/{filename}"',
    content
)

with open("backend/main.py", "w") as f:
    f.write(content)
