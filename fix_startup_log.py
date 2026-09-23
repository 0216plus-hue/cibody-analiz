with open("backend/main.py", "r") as f:
    js = f.read()

old_startup = """        try:
            from sqlalchemy import text
            db.execute(text("ALTER TABLE prescribed_exercises ADD COLUMN scoliosis_analysis_id INTEGER"))
            db.commit()
        except Exception as e:
            pass # Column already exists or other error"""

new_startup = """        try:
            from sqlalchemy import text
            db.execute(text("ALTER TABLE prescribed_exercises ADD COLUMN scoliosis_analysis_id INTEGER"))
            db.commit()
        except Exception as e:
            print("SQLite Alter Table Error:", e)"""

js = js.replace(old_startup, new_startup)

with open("backend/main.py", "w") as f:
    f.write(js)
