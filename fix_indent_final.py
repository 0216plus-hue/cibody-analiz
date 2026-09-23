with open("backend/main.py", "r") as f:
    lines = f.readlines()

new_lines = []
for line in lines:
    if line.startswith('        db.execute(text("ALTER TABLE prescribed_exercises'):
        new_lines.append('            ' + line.lstrip())
    elif line.startswith('        db.execute(text("ALTER TABLE scoliosis_analyses'):
        new_lines.append('            ' + line.lstrip())
    else:
        new_lines.append(line)

with open("backend/main.py", "w") as f:
    f.writelines(new_lines)
