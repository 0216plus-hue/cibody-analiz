import sqlite3

# 1. Update SQLite DB
try:
    conn = sqlite3.connect('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/backend/posture_data.db')
    cursor = conn.cursor()
    cursor.execute("ALTER TABLE posture_analyses ADD COLUMN front_image_path VARCHAR;")
    cursor.execute("ALTER TABLE posture_analyses ADD COLUMN back_image_path VARCHAR;")
    cursor.execute("ALTER TABLE posture_analyses ADD COLUMN left_image_path VARCHAR;")
    cursor.execute("ALTER TABLE posture_analyses ADD COLUMN right_image_path VARCHAR;")
    conn.commit()
    conn.close()
    print("SQLite DB altered successfully.")
except Exception as e:
    print(f"DB Alter Error (might already exist): {e}")

# 2. Update models.py
with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/backend/models.py', 'r') as f:
    models_content = f.read()

if 'front_image_path = Column(String, nullable=True)' not in models_content:
    models_content = models_content.replace(
        'analysis_data = Column(Text)',
        'front_image_path = Column(String, nullable=True)\n    back_image_path = Column(String, nullable=True)\n    left_image_path = Column(String, nullable=True)\n    right_image_path = Column(String, nullable=True)\n    analysis_data = Column(Text)'
    )
    with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/backend/models.py', 'w') as f:
        f.write(models_content)
    print("models.py patched.")
else:
    print("models.py already patched.")
