import re
with open("frontend/index.html", "r") as f:
    html = f.read()

html = re.sub(r'app\.js\?v=[\d\.]+', 'app.js?v=9.6', html)
html = re.sub(r'scoliosis\.js\?v=[\d\.]+', 'scoliosis.js?v=9.6', html)

with open("frontend/index.html", "w") as f:
    f.write(html)
