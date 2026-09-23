import re
with open("frontend/app.js", "r") as f:
    js = f.read()

m = re.search(r'async function generateExercisesAi.*?\n}', js, re.DOTALL)
if m:
    print(m.group(0)[:1000])
