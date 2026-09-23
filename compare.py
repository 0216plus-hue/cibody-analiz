with open("backend/main.py", "r") as f:
    js = f.read()

import re
m1 = re.search(r'def suggest_scoliosis_exercises.*?(?=\n@app)', js, re.DOTALL)
m2 = re.search(r'def add_scoliosis_prescribed_exercise.*?(?=\n@app)', js, re.DOTALL)
print("--- SUGGEST ---")
print(m1.group(0)[:500] if m1 else "NOT FOUND")
print("--- ADD ---")
print(m2.group(0)[:500] if m2 else "NOT FOUND")
