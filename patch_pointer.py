import re

with open("frontend/app.js", "r") as f:
    content = f.read()

# Replace mousedown, mousemove, mouseup, mouseleave with pointer equivalents in setupDragEvents
content = content.replace("newCanvas.addEventListener('mousedown', (e) => {", "newCanvas.addEventListener('pointerdown', (e) => {\\n        e.preventDefault(); // prevent scroll")
content = content.replace("newCanvas.addEventListener('mousemove', (e) => {", "newCanvas.addEventListener('pointermove', (e) => {\\n        e.preventDefault(); // prevent scroll")
content = content.replace("newCanvas.addEventListener('mouseup', stopDrag);", "newCanvas.addEventListener('pointerup', stopDrag);")
content = content.replace("newCanvas.addEventListener('mouseleave', stopDrag);", "newCanvas.addEventListener('pointerleave', stopDrag);\\n    newCanvas.addEventListener('pointercancel', stopDrag);")

# Also add touch-action: none to canvas class to prevent browser handling drag/scroll natively
content = content.replace("newCanvas.style.cursor = 'crosshair';", "newCanvas.style.cursor = 'crosshair';\\n            newCanvas.style.touchAction = 'none';")

with open("frontend/app.js", "w") as f:
    f.write(content)
