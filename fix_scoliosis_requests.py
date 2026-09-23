import re

# 1. Fix CSS Width in index.html
with open("frontend/index.html", "r") as f:
    html = f.read()

# Extract scoliosisTab
match = re.search(r'(<!-- SKOLYOZ ANALİZİ TAB\'I -->\s*<div id="scoliosisTab".*?<!-- ─── Profil Düzenleme Modal ─── -->)', html, re.DOTALL)
if match:
    scoliosis_block = match.group(1).replace('<!-- ─── Profil Düzenleme Modal ─── -->', '').strip()
    
    # Remove it from its current bad location
    html = html.replace(match.group(1), '<!-- ─── Profil Düzenleme Modal ─── -->\n')
    
    # Insert it right after footTab closing
    # footTab ends with:
    #                 </div>
    #             </div>
    #         </div>
    #     </div>
    # </div>
    # Wait, footTab is just:
    foot_end = """                    <!-- Ayak Riskler Bölümü -->
                    <div id="footRisksSection" class="mt-8 hidden avoid-break">
                        <h2 class="text-2xl font-bold text-slate-800 mb-2">Bu Durum Zamanla Neye Yol Açabilir? <span class="text-sm font-normal text-slate-500">— önlem alınmazsa oluşabilecek olası riskler</span></h2>
                        <p class="text-sm text-slate-600 mb-6 leading-relaxed max-w-4xl">Aşağıdaki tablolar, tespit edilen taban basış bozukluklarının kinetik zincir (bacak ve omurga) üzerindeki potansiyel uzun vadeli etkilerini gösterir. Kişiye özel tabanlık (ortez) ve egzersizlerle bu riskler yönetilebilir.</p>
                        
                        <div id="footRisksContainer" class="flex flex-col gap-6">
                            <!-- Ayak Risk Kartları JS ile buraya basılacak -->
                        </div>
                    </div>
                    </div>
                </div>
            </div>"""
    
    # Let's use a simpler marker:
    if 'id="footTab"' in html:
        # Just put it before the zoomPanel which is safely outside
        html = html.replace('<!-- Zoom Paneli -->', scoliosis_block + '\n\n    <!-- Zoom Paneli -->')

with open("frontend/index.html", "w") as f:
    f.write(html)


# 2. Add time to history list in scoliosis.js
with open("frontend/scoliosis.js", "r") as f:
    js = f.read()

old_date = "const dateStr = new Date(item.created_at).toLocaleDateString('tr-TR');"
new_date = "const dateStr = new Date(item.created_at + 'Z').toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute:'2-digit' });"
js = js.replace(old_date, new_date)

# 3. Add auto-download to downloadScoliosisPdf
old_dl = """function downloadScoliosisPdf() {
    if(!currentScoliosisId) { alert("Lütfen bir analiz seçin."); return; }
    // En kolay yol, public sayfayı yeni sekmede açmak veya oradan otomatik indirtmek.
    // Şimdilik Raporu Aç gibi public linke yönlendiriyoruz, oradan PDF indirebilirler.
    const publicUrl = window.location.origin + '/skolyoz_rapor.html?id=' + currentScoliosisId;
    window.open(publicUrl, '_blank');
}"""

new_dl = """function downloadScoliosisPdf() {
    if(!currentScoliosisId) { alert("Lütfen bir analiz seçin."); return; }
    const publicUrl = window.location.origin + '/skolyoz_rapor.html?id=' + currentScoliosisId + '&download=1';
    window.open(publicUrl, '_blank');
}"""
js = js.replace(old_dl, new_dl)

with open("frontend/scoliosis.js", "w") as f:
    f.write(js)

# 4. Add auto-download trigger in skolyoz_rapor.html
with open("frontend/skolyoz_rapor.html", "r") as f:
    rhtml = f.read()

if "if (urlParams.get('download') === '1')" not in rhtml:
    old_onload = "imgEl.src = \"/\" + data.image_path;"
    new_onload = """imgEl.src = "/" + data.image_path;
            
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.get('download') === '1') {
                document.getElementById('content').insertAdjacentHTML('afterbegin', '<div class="bg-indigo-100 text-indigo-800 p-4 rounded-xl mb-4 text-center font-bold">PDF İndiriliyor, lütfen bekleyin...</div>');
                setTimeout(() => {
                    downloadPdf();
                    setTimeout(() => window.close(), 3000);
                }, 1500);
            }"""
    rhtml = rhtml.replace(old_onload, new_onload)

with open("frontend/skolyoz_rapor.html", "w") as f:
    f.write(rhtml)
