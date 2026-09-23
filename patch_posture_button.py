with open("frontend/rapor.html", "r") as f:
    html = f.read()

# Replace the body tag to add a sticky download button container
old_body = '<body class="bg-slate-50 min-h-screen font-sans">'
new_body = """<body class="bg-slate-50 min-h-screen font-sans pb-24">
    <!-- Mobil İndirme Butonu (Sabit Alt Bar) -->
    <div id="mobileDownloadBar" class="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50 hidden flex justify-center">
        <button onclick="downloadPublicPosturePdf()" class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full shadow-lg flex items-center gap-3 text-lg w-full max-w-sm justify-center transition-colors">
            <i class="fa-solid fa-file-pdf"></i> PDF Olarak İndir
        </button>
    </div>
"""
if old_body in html:
    html = html.replace(old_body, new_body)

old_js1 = "document.getElementById('content').innerHTML = html;"
new_js1 = "document.getElementById('content').innerHTML = html;\ndocument.getElementById('mobileDownloadBar').classList.remove('hidden');"
if old_js1 in html:
    html = html.replace(old_js1, new_js1)

with open("frontend/rapor.html", "w") as f:
    f.write(html)
