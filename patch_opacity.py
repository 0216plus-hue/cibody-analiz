import re

# 1. Update app.js
with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/app.js', 'r') as f:
    js = f.read()

# Remove the ghost opacity effect
js = js.replace('ctx.globalAlpha = 0.15;', 'ctx.globalAlpha = 1.0;')

# Make the connecting skeleton lines darker/more visible since background is bright now
js = js.replace('"rgba(255,255,255,0.2)"', '"rgba(0,0,0,0.3)"')

with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/app.js', 'w') as f:
    f.write(js)

# 2. Update index.html to remove the dark background CSS class
with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/index.html', 'r') as f:
    html = f.read()

html = html.replace('.digital-skeleton-bg { background-color: #0f172a; }', '.digital-skeleton-bg { background-color: #f8fafc; }')

with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/index.html', 'w') as f:
    f.write(html)

print("Opacity and background patched.")
