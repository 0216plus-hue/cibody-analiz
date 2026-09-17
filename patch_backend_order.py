import re

with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/backend/main.py', 'r') as f:
    code = f.read()

old_query = "patients = db.query(models.Patient).all()"
new_query = "patients = db.query(models.Patient).order_by(models.Patient.id.desc()).all()"

if old_query in code:
    code = code.replace(old_query, new_query)
    with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/backend/main.py', 'w') as f:
        f.write(code)
    print("Backend patched for sorting.")
else:
    print("Already sorted or query not found.")
