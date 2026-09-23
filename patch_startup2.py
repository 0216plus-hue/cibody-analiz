with open("backend/main.py", "r") as f:
    content = f.read()

startup_code = """
@app.on_event("startup")
def startup_event():
    db = SessionLocal()
    if db.query(models.User).count() == 0:
        hashed = hash_password("cibody2024!")
        superadmin = models.User(
            name="CIBODY Admin",
            email="admin@cibody.tr",
            hashed_password=hashed,
            role="superadmin",
            is_active=True,
            monthly_limit=9999
        )
        db.add(superadmin)
        
        dijimo_hashed = hash_password("dijimo2024!")
        dijimo = models.User(
            name="Dijimo",
            email="info@dijimo.com.tr",
            hashed_password=dijimo_hashed,
            role="therapist",
            is_active=True,
            monthly_limit=9999
        )
        db.add(dijimo)
        
        db.commit()
    db.close()
"""

if "@app.on_event(\"startup\")" not in content:
    content = content.replace('app = FastAPI(title="CIBODY AI API v2.1")', 'app = FastAPI(title="CIBODY AI API v2.1")\n' + startup_code)
    with open("backend/main.py", "w") as f:
        f.write(content)
    print("Startup event added.")
