with open("frontend/index.html", "r") as f:
    lines = f.readlines()

new_lines = []
skip = False
for line in lines:
    if "<!-- AI Klinik Rapor -->" in line:
        skip = True
    if skip and "<!-- Klinik Notlar -->" in line:
        skip = False
    
    if not skip:
        new_lines.append(line)

with open("frontend/index.html", "w") as f:
    f.writelines(new_lines)
