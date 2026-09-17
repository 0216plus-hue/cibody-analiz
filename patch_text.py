import re

with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/index.html', 'r') as f:
    html = f.read()

# Replace texts
html = html.replace("yüklenen fotoğraflardaki", "taranan fotoğraflardaki")
html = html.replace("Ölçümler fotoğraf kalitesine", "Ölçümler tarama kalitesine")
html = html.replace("fizyoterapist veya hekime", "hekime")

with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/index.html', 'w') as f:
    f.write(html)
print("Disclaimer text updated.")
