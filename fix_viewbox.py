with open("frontend/app.js", "r") as f:
    content = f.read()

content = content.replace('viewBox="0 0 220 340"', 'viewBox="0 -30 220 380"')

with open("frontend/app.js", "w") as f:
    f.write(content)
