import re
with open("frontend/app.js", "r") as f:
    js = f.read()

js = js.replace("loadFootHistory();", "loadFootHistory();\n    if(typeof loadScoliosisHistory === 'function') loadScoliosisHistory();")

with open("frontend/app.js", "w") as f:
    f.write(js)
