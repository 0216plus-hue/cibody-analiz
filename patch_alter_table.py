with open("backend/main.py", "r") as f:
    content = f.read()

alter_code = """
    # ALTER TABLE to add scoliosis_analysis_id if not exists
    try:
        db.execute("ALTER TABLE prescribed_exercises ADD COLUMN scoliosis_analysis_id INTEGER REFERENCES scoliosis_analyses(id)")
        db.commit()
    except Exception as e:
        pass # Column already exists or other error
"""
if "ALTER TABLE prescribed_exercises ADD COLUMN scoliosis_analysis_id" not in content:
    content = content.replace("db.commit()", "db.commit()\n" + alter_code, 1)

with open("backend/main.py", "w") as f:
    f.write(content)
