with open("frontend/app.js", "r") as f:
    js = f.read()

import re

old_func = re.search(r'function showDashboard\(\) \{.*?fetchPatients\(\);\n\}', js, re.DOTALL).group(0)

new_func = old_func.replace(
    "document.getElementById('patientView').classList.add('hidden');",
    "document.getElementById('patientView').classList.add('hidden');\n    // Hide all extra tabs\n    ['postureTab', 'footTab', 'spineTab', 'scoliosisTab', 'scoliometerTab'].forEach(t => { const el = document.getElementById(t); if(el) el.classList.add('hidden'); });"
)

js = js.replace(old_func, new_func)

with open("frontend/app.js", "w") as f:
    f.write(js)
print("Updated showDashboard")
