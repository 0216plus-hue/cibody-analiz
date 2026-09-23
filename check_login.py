with open("backend/main.py", "r") as f:
    js = f.read()

import re
m = re.search(r'@app.post\("/api/auth/login"\).*?def login', js, re.DOTALL)
if m:
    start = m.start()
    end = start + 500
    print(js[start:end])
else:
    print("Login endpoint not found.")
