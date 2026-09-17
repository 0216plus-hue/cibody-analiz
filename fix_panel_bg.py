with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/index.html', 'r') as f:
    html = f.read()

# Replace bg-slate-50 with bg-white for the 4 report panels
html = html.replace('<div class="w-full sm:w-7/12 p-5 bg-slate-50" id="report_front">', '<div class="w-full sm:w-7/12 p-5 bg-white" id="report_front">')
html = html.replace('<div class="w-full sm:w-7/12 p-5 bg-slate-50" id="report_back">', '<div class="w-full sm:w-7/12 p-5 bg-white" id="report_back">')
html = html.replace('<div class="w-full sm:w-7/12 p-5 bg-slate-50" id="report_left">', '<div class="w-full sm:w-7/12 p-5 bg-white" id="report_left">')
html = html.replace('<div class="w-full sm:w-7/12 p-5 bg-slate-50" id="report_right">', '<div class="w-full sm:w-7/12 p-5 bg-white" id="report_right">')

with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/index.html', 'w') as f:
    f.write(html)
print("Panel backgrounds fixed.")
