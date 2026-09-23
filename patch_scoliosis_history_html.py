with open("frontend/index.html", "r") as f:
    html = f.read()

old_div = """<div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex-1 flex flex-col">
                    <h2 class="text-base font-bold text-slate-800 mb-4 border-b pb-2">Geçmiş Cobb Analizleri</h2>
                    <div id="scoliosisHistoryList" class="space-y-3 flex-1 overflow-y-auto pr-2" style="max-height: 250px;">
                        <div class="text-center text-slate-400 py-4">Kayıt bulunamadı.</div>
                    </div>
                </div>"""

new_div = """<div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 flex-1 flex flex-col overflow-hidden">
                    <h2 class="text-sm font-bold text-slate-800 mb-3 flex items-center justify-between">
                        <span><i class="fa-solid fa-clock-rotate-left mr-2 text-indigo-500"></i>Geçmiş (Before/After)</span>
                        <span class="text-[10px] font-normal text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">Yana Kaydırın ➡️</span>
                    </h2>
                    <div id="scoliosisHistoryList" class="flex overflow-x-auto gap-3 pb-3 snap-x" style="scrollbar-width: thin;">
                        <div class="text-center text-slate-400 py-4 w-full">Kayıt bulunamadı.</div>
                    </div>
                </div>"""

html = html.replace(old_div, new_div)

with open("frontend/index.html", "w") as f:
    f.write(html)
print("Updated HTML for history list")
