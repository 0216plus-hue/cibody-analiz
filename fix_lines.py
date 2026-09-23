with open("backend/main.py", "r") as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if "ALTER TABLE to add scoliosis" in line:
        # found it. let's rewrite the next 10 lines manually.
        idx = i
        lines[idx]   = "        # ALTER TABLE to add scoliosis_analysis_id if not exists\n"
        lines[idx+1] = "        try:\n"
        lines[idx+2] = "            db.execute('ALTER TABLE prescribed_exercises ADD COLUMN scoliosis_analysis_id INTEGER REFERENCES scoliosis_analyses(id)')\n"
        lines[idx+3] = "            db.commit()\n"
        lines[idx+4] = "        except Exception as e:\n"
        lines[idx+5] = "            pass # Column already exists or other error\n"
        # delete any extra blank lines until "if db.query"
        j = idx + 6
        while "if db.query" not in lines[j] and j < idx + 10:
            lines[j] = "\n"
            j += 1
        break

with open("backend/main.py", "w") as f:
    f.writelines(lines)
