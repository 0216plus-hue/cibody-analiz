import re

with open("frontend/app.js", "r") as f:
    content = f.read()

# Replace <text ...>...</text> with empty string in POSTURE_REF_SVG definitions
content = re.sub(r'<text\b[^>]*>.*?</text>', '', content, flags=re.DOTALL)

with open("frontend/app.js", "w") as f:
    f.write(content)
