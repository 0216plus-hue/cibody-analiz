with open("frontend/index.html", "r") as f:
    html = f.read()

if 'src="scoliosis.js"' not in html:
    html = html.replace('</body>', '    <script src="scoliosis.js?v=1"></script>\n</body>')
    with open("frontend/index.html", "w") as f:
        f.write(html)
