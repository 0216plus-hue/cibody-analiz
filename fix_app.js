with open("frontend/app.js", "r") as f:
    content = f.read()
content = content.replace("newCanvas.style.cursor = 'crosshair';\\n            newCanvas.style.touchAction = 'none';", "newCanvas.style.cursor = 'crosshair';\n            newCanvas.style.touchAction = 'none';")
content = content.replace("newCanvas.addEventListener('pointerleave', stopDrag);\\n    newCanvas.addEventListener('pointercancel', stopDrag);", "newCanvas.addEventListener('pointerleave', stopDrag);\n    newCanvas.addEventListener('pointercancel', stopDrag);")
with open("frontend/app.js", "w") as f:
    f.write(content)
