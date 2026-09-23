with open("frontend/scoliosis.js", "r") as f:
    js = f.read()

import re

# We need to replace the specific line in generateScoliosisAi
def fix_ai_report(match):
    return match.group(0).replace("'scoliosisExerciseReport'", "'scoliosisAiReport'")

js = re.sub(r'async function generateScoliosisAi\(\) \{.*?reportArea = document\.getElementById\([^)]+\);', fix_ai_report, js, flags=re.DOTALL)

with open("frontend/scoliosis.js", "w") as f:
    f.write(js)
