import re

with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/app.js', 'r') as f:
    js = f.read()

# Update RISK_DATA to include image paths
risk_data_new = """    const RISK_DATA = {
        "Omuz Asimetrisi": {
            title: "Omuz Simetri Sapması",
            risks: ["Tek tarafta omuz ve boyun ağrısı", "Kürek kemiği çevresinde çabuk yorulma", "Zamanla omuz sıkışma sorunları"],
            img: "assets/risks/omuz.jpg"
        },
        "Pelvik Asimetri": {
            title: "Pelvik Simetri Sapması",
            risks: ["Bel ağrısı ve tek tarafın sürekli zorlanması", "Kalça ve dize dengesiz yük binmesi", "Zamanla bir bacağı kısa hissetme / hafif topallama eğilimi"],
            img: "assets/risks/kalca.jpg"
        },
        "Baş Öne Eğikliği": {
            title: "Öne Baş Postürü (Forward Head) Bulgusu",
            risks: ["Kronik boyun ve üst sırt ağrısı", "Gerilim tipi baş ağrıları", "Zamanla üst sırtta kamburlaşma (dowager hump)", "Omuz sıkışması ve kolu yukarı kaldırmada zorlanma"],
            img: "assets/risks/bas.jpg"
        },
        "Torakal Eğiklik": {
            title: "Torakal Kifoz (Sırt Kamburluğu) Artışı",
            risks: ["Sırt ağrısı ve kas gerginliği", "Nefes kapasitesinde azalma", "Omuz hareketlerinde kısıtlılık"],
            img: "assets/risks/bas.jpg"
        },
        "Diz Asimetrisi": {
            title: "Dizilim Asimetrisi",
            risks: ["Menisküs ve bağlarda asimetrik yıpranma", "Erken diz kireçlenmesi (gonartroz)", "Ayak bileği ve kalçaya yansıyan ağrılar"],
            img: "assets/risks/kalca.jpg"
        },
        "Pelvik Eğim": {
            title: "Pelvik Tilt (Gövde Salınımı)",
            risks: ["Kronik bel ağrısı", "Bel fıtığı riski artışı", "Yürüyüş biyomekaniğinin bozulması"],
            img: "assets/risks/kalca.jpg"
        }
    };"""

# Replace the RISK_DATA object
# Use regex or simple replace
js = re.sub(r'const RISK_DATA = \{.*?\n    \};', risk_data_new, js, flags=re.DOTALL)

# Replace the placeholder HTML
old_html = """                                <!-- Placeholder for Graphic -->
                                <i class="fa-solid fa-image text-slate-300 text-4xl mb-2"></i>
                                <span class="text-xs text-slate-400 font-medium">Grafik Buraya Gelecek</span>
                                <span class="text-[10px] text-slate-400">(${f})</span>"""

new_html = """                                <img src="/${data.img}" alt="${f}" class="w-full h-full object-contain rounded-xl mix-blend-multiply">
                                <div class="w-full flex justify-between px-8 text-xs font-bold text-slate-400 mt-2">
                                    <span>Şimdi</span>
                                    <span class="text-amber-600">Önlem Alınmazsa</span>
                                </div>"""

js = js.replace(old_html, new_html)

with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/app.js', 'w') as f:
    f.write(js)
print("Images patched into JS.")
