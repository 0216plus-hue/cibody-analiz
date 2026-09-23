with open("frontend/rapor.html", "r") as f:
    html = f.read()

stats_html = """
                <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6 avoid-break" id="qrStats">
                    <div class="bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-2xl p-4 text-white shadow-md relative overflow-hidden">
                        <i class="fa-solid fa-ranking-star absolute -right-4 -bottom-4 text-white/20 text-6xl"></i>
                        <p class="text-indigo-100 text-xs font-bold uppercase tracking-wider mb-1">Genel Postür Skoru</p>
                        <div class="flex items-baseline gap-1"><span class="text-4xl font-black" id="qr_score">100</span><span class="text-indigo-200 text-sm">/100</span></div>
                    </div>
                    <div class="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm relative overflow-hidden">
                        <i class="fa-solid fa-magnifying-glass-chart absolute -right-2 -bottom-2 text-slate-100 text-5xl"></i>
                        <p class="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Tespit Edilen Bulgu</p>
                        <div class="flex items-baseline gap-1"><span class="text-3xl font-black text-slate-800" id="qr_findings">0</span><span class="text-slate-400 text-sm">adet sapma</span></div>
                    </div>
                    <div class="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-4 text-white shadow-md relative overflow-hidden md:col-span-1 col-span-2">
                        <i class="fa-solid fa-child-reaching absolute -right-2 -bottom-2 text-white/20 text-6xl"></i>
                        <p class="text-emerald-100 text-xs font-bold uppercase tracking-wider mb-1">Stabilite Endeksi</p>
                        <div class="flex items-baseline gap-1"><span class="text-4xl font-black" id="qr_stability">%100</span></div>
                    </div>
                </div>
"""

html = html.replace(
    '<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">',
    stats_html + '\n                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">'
)

# Now calculate them in the JS
calc_js = """
                    let generalScore = Math.max(0, Math.round(100 - (totalDev * 0.7)));
                    let stability = Math.max(0, Math.round(100 - (findings.size * 6)));
                    
                    const elScore = document.getElementById('qr_score');
                    const elFind = document.getElementById('qr_findings');
                    const elStab = document.getElementById('qr_stability');
                    
                    if(elScore) elScore.innerText = generalScore;
                    if(elFind) elFind.innerText = findings.size;
                    if(elStab) elStab.innerText = "%" + stability;
"""

html = html.replace(
    "let risksHtml = \"\";",
    calc_js + "\n                    let risksHtml = \"\";"
)

with open("frontend/rapor.html", "w") as f:
    f.write(html)
