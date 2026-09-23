import re
with open("backend/main.py", "r") as f:
    js = f.read()

m = re.search(r'def get_prescribed_exercises.*?return \{"status": "success"', js, re.DOTALL)
if m:
    print(m.group(0))
