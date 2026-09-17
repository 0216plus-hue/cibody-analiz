import re

with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/index.html', 'r') as f:
    html = f.read()

# Inject clinical details section right after risks section
clinical_html = """
                    <!-- Klinik Bulgu Detayları Bölümü -->
                    <div id="clinicalDetailsSection" class="mt-12 hidden">
                        <h2 class="text-2xl font-bold text-slate-800 mb-6 border-b pb-2">Bulgu Detayları <span class="text-sm font-normal text-slate-500">— Klinik Analiz ve Biyomekanik Rapor</span></h2>
                        
                        <div id="clinicalDetailsContainer" class="flex flex-col gap-8">
                            <!-- Klinik Kartlar JS ile buraya basılacak -->
                        </div>
                    </div>
"""

if 'id="clinicalDetailsSection"' not in html:
    html = html.replace('                    <!-- Olası Riskler Bölümü -->', clinical_html + '\n                    <!-- Olası Riskler Bölümü -->')
    with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/index.html', 'w') as f:
        f.write(html)
    print("Clinical section added to HTML.")
else:
    print("Clinical section already exists.")
