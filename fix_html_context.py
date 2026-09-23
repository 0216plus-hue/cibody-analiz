import re

with open("frontend/index.html", "r") as f:
    html = f.read()

# We need to find the specific one inside scoliosisTab
match = re.search(r'(<div id="scoliosisTab".*?)onclick="openExerciseModal\(\)"', html, re.DOTALL)
if match:
    html = html.replace(match.group(0), match.group(1) + 'onclick="openExerciseModal(\'scoliosis\')"')

with open("frontend/index.html", "w") as f:
    f.write(html)
