import re

with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/index.html', 'r') as f:
    html = f.read()

# Make gap-8 consistent for all containers
html = html.replace('id="risksContainer" class="flex flex-col gap-6"', 'id="risksContainer" class="flex flex-col gap-8"')
with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/index.html', 'w') as f:
    f.write(html)
print("index.html gaps updated.")

with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/app.js', 'r') as f:
    js = f.read()

# Change risk card background to white
old_risk_card = '<div class="bg-slate-50 border border-slate-200 rounded-2xl flex flex-col md:flex-row overflow-hidden shadow-sm items-center">'
new_risk_card = '<div class="bg-white border border-slate-200 rounded-2xl flex flex-col md:flex-row overflow-hidden shadow-sm items-stretch">'

if old_risk_card in js:
    js = js.replace(old_risk_card, new_risk_card)
    
    # Also fix the image container to have a better distinct background and centering since we changed to items-stretch
    old_img_container = '<div class="md:w-1/4 lg:w-1/5 bg-slate-100/50 border-r border-slate-200 flex flex-col items-center justify-center p-4">'
    new_img_container = '<div class="md:w-1/4 lg:w-1/5 bg-slate-50 border-r border-slate-100 flex flex-col items-center justify-center p-6">'
    js = js.replace(old_img_container, new_img_container)
    
    with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/app.js', 'w') as f:
        f.write(js)
    print("app.js risk card styles updated.")
else:
    print("Could not find risk card HTML in app.js")

