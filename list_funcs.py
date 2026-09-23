import re
with open("frontend/app.js", "r") as f:
    js = f.read()

funcs = re.findall(r'function\s+([a-zA-Z0-9_]+)', js)
for fn in funcs:
    print(fn)
