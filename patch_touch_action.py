import re

with open("frontend/app.js", "r") as f:
    content = f.read()

# Add touchAction = 'none' to newCanvas during setupDragEvents
content = content.replace("canvas.parentNode.replaceChild(newCanvas, canvas);", "canvas.parentNode.replaceChild(newCanvas, canvas);\\n    newCanvas.style.touchAction = 'none';")

with open("frontend/app.js", "w") as f:
    f.write(content)
