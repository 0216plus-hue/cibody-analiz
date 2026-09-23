import re
with open("frontend/app.js", "r") as f:
    js = f.read()

m = re.search(r'async function suggestExercises.*?\n}', js, re.DOTALL)
if m:
    print(m.group(0))
