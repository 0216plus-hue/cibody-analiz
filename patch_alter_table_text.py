import re

with open("backend/main.py", "r") as f:
    content = f.read()

# We need to add `from sqlalchemy import text` if it's missing, but we can just use `sqlalchemy.text`
old_code = 'db.execute("ALTER TABLE prescribed_exercises ADD COLUMN scoliosis_analysis_id INTEGER REFERENCES scoliosis_analyses(id)")'
new_code = 'from sqlalchemy import text\n        db.execute(text("ALTER TABLE prescribed_exercises ADD COLUMN scoliosis_analysis_id INTEGER REFERENCES scoliosis_analyses(id)"))'

content = content.replace(old_code, new_code)

# We also need to fix ANY OTHER db.execute that might be using raw strings in startup
old_code_2 = 'db.execute("ALTER TABLE scoliosis_analyses ADD COLUMN ai_report_text TEXT")'
new_code_2 = 'from sqlalchemy import text\n        db.execute(text("ALTER TABLE scoliosis_analyses ADD COLUMN ai_report_text TEXT"))'
content = content.replace(old_code_2, new_code_2)

with open("backend/main.py", "w") as f:
    f.write(content)
