import re

with open("frontend/index.html", "r") as f:
    content = f.read()

# Replace Quality label
q_find = '<span class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Genel Ölçüm Kalitesi</span>'
q_repl = '<span class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-center gap-1">Genel Ölçüm Kalitesi <i class="fa-solid fa-circle-info cursor-pointer text-indigo-400 hover:text-indigo-600 transition-colors" data-html2canvas-ignore="true" onclick="showInfoPopup(\'quality\')"></i></span>'
content = content.replace(q_find, q_repl)

# Replace Stability label
s_find = '<span class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Postür Stabilize Endeksi</span>'
s_repl = '<span class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-center gap-1">Postür Stabilize Endeksi <i class="fa-solid fa-circle-info cursor-pointer text-emerald-400 hover:text-emerald-600 transition-colors" data-html2canvas-ignore="true" onclick="showInfoPopup(\'stability\')"></i></span>'
content = content.replace(s_find, s_repl)

# Add Modal at the end, right before </body>
modal_html = """
<!-- Bilgilendirme Modalı -->
<div id="infoModal" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm" data-html2canvas-ignore="true">
    <div class="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden transform transition-all">
        <div class="p-4 border-b border-slate-100 flex justify-between items-center bg-indigo-50/50">
            <h3 id="infoModalTitle" class="font-bold text-lg text-indigo-900">Bilgilendirme</h3>
            <button onclick="document.getElementById('infoModal').classList.add('hidden')" class="text-slate-400 hover:text-rose-500 transition-colors">
                <i class="fa-solid fa-xmark text-xl"></i>
            </button>
        </div>
        <div class="p-6">
            <p id="infoModalContent" class="text-sm text-slate-700 leading-relaxed"></p>
        </div>
        <div class="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
            <button onclick="document.getElementById('infoModal').classList.add('hidden')" class="bg-slate-200 hover:bg-slate-300 text-slate-800 px-4 py-2 rounded-lg font-medium transition-colors text-sm">
                Kapat
            </button>
        </div>
    </div>
</div>
</body>"""
content = content.replace("</body>", modal_html)

with open("frontend/index.html", "w") as f:
    f.write(content)
