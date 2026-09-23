with open("frontend/skolyoz_rapor.html", "r") as f:
    html = f.read()

# Add marked.js
if "marked.min.js" not in html:
    html = html.replace('<script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js', '<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>\n    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js')

# Parse AI report
old_content = """<div class="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">${data.ai_report_text || 'Rapor oluşturulmamış.'}</div>"""
new_content = """<div class="text-sm text-slate-700 leading-relaxed prose prose-sm max-w-none prose-h3:text-indigo-800 prose-ul:text-slate-700">${typeof marked !== 'undefined' && data.ai_report_text ? marked.parse(data.ai_report_text) : (data.ai_report_text || 'Rapor oluşturulmamış.')}</div>"""
html = html.replace(old_content, new_content)

with open("frontend/skolyoz_rapor.html", "w") as f:
    f.write(html)
