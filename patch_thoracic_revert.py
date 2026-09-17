import re

with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/app.js', 'r') as f:
    js = f.read()

replacement = """        if(shoulder && hip) {
            results.thoracic = calcVerticalAngle(shoulder, hip);
        }"""

original = """        if(shoulder && hip) {
            drawExtrapolatedLine(shoulder, hip, "#f59e0b", 2); // Orange
            results.thoracic = calcVerticalAngle(shoulder, hip);
        }"""

if original in js:
    js = js.replace(original, replacement)
    with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/app.js', 'w') as f:
        f.write(js)
    print("Thoracic line reverted (hidden).")
