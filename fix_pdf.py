with open("frontend/app.js", "r") as f:
    content = f.read()
content = content.replace("html2canvas:  { scale: 2, useCORS: true, allowTaint: true }", "html2canvas:  { scale: 2, useCORS: true, allowTaint: true, scrollY: 0 }")
with open("frontend/app.js", "w") as f:
    f.write(content)
