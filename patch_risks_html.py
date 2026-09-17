import re

with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/index.html', 'r') as f:
    html = f.read()

# Add the risks section below the 4 cards
risk_section_html = """
                    <!-- Olası Riskler Bölümü -->
                    <div id="risksSection" class="mt-12 hidden">
                        <h2 class="text-2xl font-bold text-slate-800 mb-2">Bu Postür Zamanla Neye Yol Açabilir? <span class="text-sm font-normal text-slate-500">— önlem alınmazsa oluşabilecek olası riskler</span></h2>
                        <p class="text-sm text-slate-600 mb-6 leading-relaxed max-w-4xl">Aşağıdaki görseller, tespit edilen duruşun bugünkü hâlini ve önlem alınmadığında zamanla nasıl belirginleşebileceğini temsilî olarak gösterir. Kesin bir öngörü değildir; erken önlem ve egzersizle bu risklerin çoğu azaltılabilir.</p>
                        
                        <div id="risksContainer" class="flex flex-col gap-6">
                            <!-- Risk Kartları JS ile buraya basılacak -->
                        </div>
                    </div>
"""

# Insert right before the closing div of postureResultsSection
if 'id="risksSection"' not in html:
    html = html.replace('<!-- Ayak Analizi İçeriği -->', risk_section_html + '\n                </div>\n\n                <!-- Ayak Analizi İçeriği -->')
    with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/index.html', 'w') as f:
        f.write(html)
    print("HTML patched for risks.")
else:
    print("Risks section already exists in HTML.")
