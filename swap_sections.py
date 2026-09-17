import re

with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/index.html', 'r') as f:
    html = f.read()

# Extract Clinical Details Section
clinical_match = re.search(r'                    <!-- Klinik Bulgu Detayları Bölümü -->.*?</div>\s*</div>', html, re.DOTALL)
# Extract Risks Section
risks_match = re.search(r'                    <!-- Olası Riskler Bölümü -->.*?</div>\s*</div>', html, re.DOTALL)

if clinical_match and risks_match:
    clinical_html = clinical_match.group(0)
    risks_html = risks_match.group(0)
    
    # We want to replace the combined area with the swapped area
    # Let's just find exactly where they are
    combined = clinical_html + "\n\n" + risks_html
    if combined in html:
        html = html.replace(combined, risks_html + "\n\n" + clinical_html)
        with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/index.html', 'w') as f:
            f.write(html)
        print("Swapped using exact block match.")
    else:
        # Maybe there's some whitespace between them
        print("Could not find combined string. Trying regex.")
        # We can just remove both and insert them in order
        html = html.replace(clinical_html, '')
        html = html.replace(risks_html, risks_html + '\n\n' + clinical_html)
        with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/index.html', 'w') as f:
            f.write(html)
        print("Swapped via remove and reinsert.")
else:
    print("Could not find one or both sections.")
