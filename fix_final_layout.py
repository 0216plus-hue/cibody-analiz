import re

with open("frontend/index.html", "r") as f:
    html = f.read()

# I will write the exact new HTML structure using placeholders, and then extract the contents of each box to fill them in.
# This avoids missing closing tags and guarantees the structure.

new_structure = """    <!-- SKOLYOZ ANALİZİ TAB'I -->
    <div id="scoliosisTab" class="hidden">
        
        <!-- ÜST BÖLÜM: 2 Sütun -->
        <div class="flex flex-col lg:flex-row gap-6 mb-6">
            
            <!-- SOL PANEL: Röntgen -->
            <div class="w-full lg:w-7/12 flex flex-col">
                <!-- RONTGEN_PLACEHOLDER -->
            </div>
            
            <!-- SAĞ PANEL: Not, Skor, Geçmiş -->
            <div class="w-full lg:w-5/12 flex flex-col gap-6">
                <!-- NOT_PLACEHOLDER -->
                <!-- SKOR_PLACEHOLDER -->
                <!-- GECMIS_PLACEHOLDER -->
            </div>
            
        </div>
        
        <!-- ALT BÖLÜM: Tam Sayfa -->
        <div class="w-full flex flex-col gap-6 mb-8">
            
            <!-- KLINIK_RAPOR_PLACEHOLDER -->
            
            <!-- EGZERSIZ_PLACEHOLDER -->
            
            <!-- NOTLAR_PLACEHOLDER -->
            
            <!-- BUTONLAR_PLACEHOLDER -->
            
        </div>
        
    </div>"""

def extract_block(pattern, text):
    m = re.search(pattern, text, re.DOTALL)
    if m:
        return m.group(1)
    return ""

# RONTGEN
rontgen = extract_block(r'(<div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-6">.*?)(?=<!-- SAĞ PANEL)', html)
if not rontgen:
    rontgen = extract_block(r'(<div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6.*?<button onclick="resetScoliosisCanvas\(\)".*?</button>\s*</div>\s*</div>)', html)

# Remove the sticky class so it just flows normally
rontgen = rontgen.replace('sticky top-6', 'h-full flex flex-col')

# NOT
uyari = extract_block(r'(<!-- Uyarı Notu -->\s*<div class="p-5 bg-amber-50.*?)<!-- Hesaplanan Değer -->', html)

# SKOR
skor = extract_block(r'(<!-- Hesaplanan Değer -->\s*<div class="bg-gradient-to-br.*?)<!-- AI Klinik Rapor -->', html)
if not skor: skor = extract_block(r'(<!-- Hesaplanan Değer -->\s*<div class="bg-gradient-to-br.*?)<!-- Geçmiş Analizler -->', html)
if not skor: skor = extract_block(r'(<!-- Hesaplanan Değer -->\s*<div class="bg-gradient-to-br.*?)<!--', html)

# GECMIS
gecmis = extract_block(r'(<!-- Geçmiş Analizler -->\s*<div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">\s*<h2 class="text-base font-bold.*?</div>\s*</div>)', html)
if not gecmis: gecmis = extract_block(r'(<!-- Geçmiş Analizler -->.*?</div>\s*</div>)', html)

# KLINIK RAPOR
rapor = extract_block(r'(<!-- AI Klinik Rapor -->\s*<div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">.*?</div>\s*</div>)', html)
if not rapor: rapor = extract_block(r'(<!-- AI Klinik Rapor -->.*?</div>\s*</div>)', html)

# EGZERSIZ
egzersiz = extract_block(r'(<!-- Egzersiz Reçetesi -->\s*<div class="bg-slate-50 rounded-2xl shadow-sm border border-slate-200 p-6">.*?</div>\s*</div>)', html)
if not egzersiz: egzersiz = extract_block(r'(<!-- Egzersiz Reçetesi -->.*?</div>\s*</div>)', html)

# NOTLAR
notlar = extract_block(r'(<!-- Klinik Notlar -->\s*<div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">\s*<h3 class="font-bold text-slate-800.*?</div>)', html)
if not notlar: notlar = extract_block(r'(<!-- Klinik Notlar -->.*?</div>)', html)

# BUTONLAR
butonlar = extract_block(r'(<!-- Aksiyon Butonları -->\s*<div class="grid grid-cols-2 gap-3">.*?</div>)', html)
if not butonlar: butonlar = extract_block(r'(<!-- Aksiyon Butonları -->.*?</div>)', html)

new_structure = new_structure.replace("<!-- RONTGEN_PLACEHOLDER -->", rontgen)
new_structure = new_structure.replace("<!-- NOT_PLACEHOLDER -->", uyari)
new_structure = new_structure.replace("<!-- SKOR_PLACEHOLDER -->", skor)
new_structure = new_structure.replace("<!-- GECMIS_PLACEHOLDER -->", gecmis)
new_structure = new_structure.replace("<!-- KLINIK_RAPOR_PLACEHOLDER -->", rapor)
new_structure = new_structure.replace("<!-- EGZERSIZ_PLACEHOLDER -->", egzersiz)
new_structure = new_structure.replace("<!-- NOTLAR_PLACEHOLDER -->", notlar)
new_structure = new_structure.replace("<!-- BUTONLAR_PLACEHOLDER -->", butonlar)

# Replace the whole scoliosis tab
match = re.search(r'(<!-- SKOLYOZ ANALİZİ TAB\'I -->.*?)(?=\s*<!-- Zoom Paneli -->)', html, re.DOTALL)
if match:
    html = html.replace(match.group(1), new_structure + "\n")
else:
    match2 = re.search(r'(<div id="scoliosisTab".*?)(?=\s*<!-- Zoom Paneli -->)', html, re.DOTALL)
    if match2:
        html = html.replace(match2.group(1), new_structure + "\n")

with open("frontend/index.html", "w") as f:
    f.write(html)
