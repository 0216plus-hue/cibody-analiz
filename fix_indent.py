with open("backend/main.py", "r") as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if line.strip() == "# ALTER TABLE to add scoliosis_analysis_id if not exists":
        lines[i] = "        " + line.strip() + "\n"
        lines[i+1] = "        try:\n"
        lines[i+2] = '            db.execute("ALTER TABLE prescribed_exercises ADD COLUMN scoliosis_analysis_id INTEGER REFERENCES scoliosis_analyses(id)")\n'
        lines[i+3] = "            db.commit()\n"
        lines[i+4] = "        except Exception as e:\n"
        lines[i+5] = "            pass # Column already exists or other error\n"
        break

with open("backend/main.py", "w") as f:
    f.writelines(lines)
