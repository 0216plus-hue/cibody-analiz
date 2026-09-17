import re

# 1. Fix index.html logo and re-inject risks section
with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/index.html', 'r') as f:
    html = f.read()

# Fix logo
html = re.sub(
    r'<i class="fa-solid fa-robot mr-2"></i>\s*BiyoMekanik AI\s*<span class="text-sm text-slate-400 font-normal">v2\.0 CRM</span>',
    r'<img src="/assets/logo.png" class="h-6 md:h-8 mr-2" alt="CIBODY"><span class="text-sm text-slate-400 font-normal">v2.1 CRM</span>',
    html
)

# Fix any remaining BiyoMekanik AI texts in header
html = html.replace('BiyoMekanik AI', 'CIBODY AI')

# Inject risks section if missing
if 'id="risksSection"' not in html:
    risks_html = """
                    <!-- Olası Riskler Bölümü -->
                    <div id="risksSection" class="mt-12 hidden">
                        <h2 class="text-2xl font-bold text-slate-800 mb-2">Bu Postür Zamanla Neye Yol Açabilir? <span class="text-sm font-normal text-slate-500">— önlem alınmazsa oluşabilecek olası riskler</span></h2>
                        <p class="text-sm text-slate-600 mb-6 leading-relaxed max-w-4xl">Aşağıdaki görseller, tespit edilen duruşun bugünkü hâlini ve önlem alınmadığında zamanla nasıl belirginleşebileceğini temsilî olarak gösterir. Kesin bir öngörü değildir; erken önlem ve egzersizle bu risklerin çoğu azaltılabilir.</p>
                        
                        <div id="risksContainer" class="flex flex-col gap-6">
                            <!-- Risk Kartları JS ile buraya basılacak -->
                        </div>
                    </div>
"""
    # Insert right before SEKME 2
    html = html.replace('            <!-- SEKME 2: AYAK ANALİZİ -->', risks_html + '\n            <!-- SEKME 2: AYAK ANALİZİ -->')

with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/index.html', 'w') as f:
    f.write(html)
    print("index.html fixed.")

# 2. Fix app.js CSS alignment
with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/app.js', 'r') as f:
    js = f.read()

def replacer(match):
    full = match.group(0)
    # add gap-4 and items-center to container
    full = full.replace('flex justify-between py-1', 'flex justify-between items-center py-2 gap-4')
    # add whitespace-nowrap to the label span (e.g. <span>Omuz Simetrisi</span>)
    full = re.sub(r'<span>(.*?)</span>', r'<span class="whitespace-nowrap text-slate-500">\1</span>', full)
    # add text-right and text-xs or text-sm to the value span
    full = full.replace('font-bold', 'font-bold text-right text-sm leading-tight')
    return full

# Find all lines with html += `<div class="flex justify-between
js = re.sub(r'html \+= `<div class="flex justify-between.*?</div>`;', replacer, js)

with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/app.js', 'w') as f:
    f.write(js)
    print("app.js CSS aligned.")

