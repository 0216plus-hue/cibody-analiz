with open("backend/main.py", "r") as f:
    js = f.read()

old_sql = 'db.execute(text("ALTER TABLE prescribed_exercises ADD COLUMN scoliosis_analysis_id INTEGER REFERENCES scoliosis_analyses(id)"))'
new_sql = 'db.execute(text("ALTER TABLE prescribed_exercises ADD COLUMN scoliosis_analysis_id INTEGER"))'
js = js.replace(old_sql, new_sql)

with open("backend/main.py", "w") as f:
    f.write(js)
