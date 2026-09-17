import re

with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/app.js', 'r') as f:
    js = f.read()

# Add extrapolated line for thoracic
replacement = """        if(shoulder && hip) {
            drawExtrapolatedLine(shoulder, hip, "#f59e0b", 2); // Orange
            results.thoracic = calcVerticalAngle(shoulder, hip);
        }"""

if 'results.thoracic = calcVerticalAngle(shoulder, hip);' in js and 'drawExtrapolatedLine(shoulder, hip' not in js:
    js = js.replace("""        if(shoulder && hip) {
            results.thoracic = calcVerticalAngle(shoulder, hip);
        }""", replacement)
    
    with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/app.js', 'w') as f:
        f.write(js)
    print("Thoracic line added.")
else:
    print("Already added or string not found.")
