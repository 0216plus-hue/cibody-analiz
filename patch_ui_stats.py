import re

# 1. PATCH INDEX.HTML
with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/index.html', 'r') as f:
    html = f.read()

# Modify the postureResultsSection header
old_header = """<div class="flex justify-between items-center mb-6">
                        <h3 class="text-xl font-bold text-slate-800"><i class="fa-solid fa-vr-cardboard mr-2 text-purple-600"></i>Dijital İskelet Raporları</h3>
                        <button onclick="document.getElementById('postureUploadSection').classList.toggle('hidden')" class="text-sm bg-slate-200 hover:bg-slate-300 px-4 py-2 rounded-lg font-medium">Yeni Analiz Yükle</button>
                    </div>"""

new_header = """
                    <!-- Rapor Başlığı ve Uyarı -->
                    <div class="flex justify-between items-start mb-2">
                        <div>
                            <h3 class="text-2xl font-black text-slate-800"><i class="fa-solid fa-file-medical mr-2 text-purple-600"></i>Biyomekanik Postür Analiz Raporu</h3>
                            <p class="text-sm text-slate-500 mt-1 font-medium" id="reportDate">Oluşturma Tarihi: Yükleniyor...</p>
                        </div>
                        <button onclick="document.getElementById('postureUploadSection').classList.toggle('hidden')" class="text-sm bg-slate-200 hover:bg-slate-300 px-4 py-2 rounded-lg font-bold text-slate-700 shadow-sm transition">Yeni Analiz Yükle</button>
                    </div>
                    
                    <div class="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                        <div class="flex items-start">
                            <i class="fa-solid fa-triangle-exclamation text-amber-500 mt-1 mr-3 text-lg"></i>
                            <p class="text-xs text-amber-800 leading-relaxed font-medium">
                                <strong>Önemli:</strong> Bu rapor bir tıbbi teşhis değildir. Sistem, yüklenen fotoğraflardaki anatomik referans noktalarını ölçerek biyomekanik bir ön değerlendirme sunar. Ölçümler fotoğraf kalitesine bağlı tahminlerdir ve bağımsız klinik doğrulama sürecinden geçmemiştir. Nihai değerlendirme ve tedavi kararı için lütfen bir fizyoterapist veya hekime başvurun.
                            </p>
                        </div>
                    </div>

                    <!-- Özet Skor Kartları -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <div class="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-center items-center text-center">
                            <span class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Genel Postür Skoru</span>
                            <div class="flex items-baseline">
                                <span class="text-4xl font-black text-purple-600" id="stat_generalScore">0</span>
                                <span class="text-sm text-slate-400 font-bold ml-1">/100</span>
                            </div>
                        </div>
                        <div class="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-center items-center text-center">
                            <span class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Tespit Edilen Bulgu</span>
                            <div class="flex items-baseline">
                                <span class="text-4xl font-black text-rose-500" id="stat_findingsCount">0</span>
                                <span class="text-sm text-slate-400 font-bold ml-1">Adet</span>
                            </div>
                        </div>
                        <div class="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-center items-center text-center">
                            <span class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Postür Stabilize Endeksi</span>
                            <div class="flex items-baseline">
                                <span class="text-4xl font-black text-emerald-500" id="stat_stabilityIndex">%0</span>
                            </div>
                        </div>
                    </div>
"""

html = html.replace(old_header, new_header)

with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/index.html', 'w') as f:
    f.write(html)


# 2. PATCH APP.JS
with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/app.js', 'r') as f:
    js = f.read()

# Add the calculation function logic to the end of refreshAllCanvases
score_logic = """
    // Skor ve Bulgu Hesaplamaları
    let findings = new Set();
    let totalDev = 0;
    
    // Front and Back
    [resFront, resBack].forEach(res => {
        if(res) {
            if(res.shoulderSym && Math.abs(res.shoulderSym.val) > 2) { findings.add("Omuz Asimetrisi"); totalDev += Math.abs(res.shoulderSym.val); }
            if(res.hipSym && Math.abs(res.hipSym.val) > 2) { findings.add("Pelvik Asimetri"); totalDev += Math.abs(res.hipSym.val); }
            if(res.kneeSym && Math.abs(res.kneeSym.val) > 2) { findings.add("Diz Asimetrisi"); totalDev += Math.abs(res.kneeSym.val); }
        }
    });

    // Left and Right
    [resLeft, resRight].forEach(res => {
        if(res) {
            if(res.cervical && Math.abs(res.cervical) > 5) { findings.add("Baş Öne Eğikliği"); totalDev += Math.abs(res.cervical); }
            if(res.thoracic && Math.abs(res.thoracic) > 5) { findings.add("Torakal Eğiklik"); totalDev += Math.abs(res.thoracic); }
            if(res.pelvic && Math.abs(res.pelvic) > 5) { findings.add("Pelvik Eğim"); totalDev += Math.abs(res.pelvic); }
        }
    });

    // Skoru Hesapla (100 üzerinden, toplam sapma açısının 0.7 katını düşürür)
    let generalScore = Math.max(0, Math.round(100 - (totalDev * 0.7)));
    
    // Stabilize Endeksi (Bulgu sayısına göre yüzde, bulgu başı %6 düşer)
    let stability = Math.max(0, Math.round(100 - (findings.size * 6)));

    // Ekrana Yazdır
    const dateStr = new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute:'2-digit' });
    const reportDateEl = document.getElementById('reportDate');
    if(reportDateEl) reportDateEl.innerText = "Oluşturma Tarihi: " + dateStr;

    const elScore = document.getElementById('stat_generalScore');
    const elFind = document.getElementById('stat_findingsCount');
    const elStab = document.getElementById('stat_stabilityIndex');

    if(elScore) elScore.innerText = generalScore;
    if(elFind) elFind.innerText = findings.size;
    if(elStab) elStab.innerText = "%" + stability;
}
"""

# Find the end of refreshAllCanvases
# It ends with:
#         document.getElementById('table_right').innerHTML = html;
#     }
# }
if 'document.getElementById(\'table_right\').innerHTML = html;' in js:
    # We will declare resFront, resBack, etc. at the top of refreshAllCanvases
    js = js.replace(
        'function refreshAllCanvases() {',
        'function refreshAllCanvases() {\n    let resFront=null, resBack=null, resLeft=null, resRight=null;'
    )
    js = js.replace(
        'const res = drawCanvas(\'canvas_front\'',
        'resFront = drawCanvas(\'canvas_front\''
    )
    js = js.replace(
        'const res = drawCanvas(\'canvas_back\'',
        'resBack = drawCanvas(\'canvas_back\''
    )
    js = js.replace(
        'const res = drawCanvas(\'canvas_left\'',
        'resLeft = drawCanvas(\'canvas_left\''
    )
    js = js.replace(
        'const res = drawCanvas(\'canvas_right\'',
        'resRight = drawCanvas(\'canvas_right\''
    )
    
    # Replace the exact variable usages in html += lines inside refreshAllCanvases
    js = js.replace('res.shoulderSym', 'resFront.shoulderSym', 10) # Roughly replace 'res.' with correct ones?
    # Actually, a better approach is to just assign resFront etc. and keep 'res' locally
    
    # Let's revert that and just use global/local appropriately
    pass

# Better approach for app.js patching:
# Just find the end of refreshAllCanvases and insert the gathering logic
patch_js = """
    // ...
"""

