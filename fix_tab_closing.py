import re

with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/index.html', 'r') as f:
    html = f.read()

# Remove the premature closing divs
html = html.replace("""                    </div>
                </div>
            </div>



                    <!-- Klinik Bulgu Detayları Bölümü -->""", """                    </div>



                    <!-- Klinik Bulgu Detayları Bölümü -->""")


# Add the closing divs right before Foot Tab
old_foot = """            <!-- SEKME 2: AYAK ANALİZİ -->"""
new_foot = """                </div> <!-- End of postureResultsSection -->
            </div> <!-- End of postureTab -->

            <!-- SEKME 2: AYAK ANALİZİ -->"""

if old_foot in html:
    html = html.replace(old_foot, new_foot)
    with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/index.html', 'w') as f:
        f.write(html)
    print("HTML Tab structure fixed.")
else:
    print("Could not find SEKME 2 marker.")
