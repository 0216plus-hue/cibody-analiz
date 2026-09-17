import re

with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/index.html', 'r') as f:
    html = f.read()

# 1. Add Phone Input
phone_html = """
                            <div>
                                <label class="block text-sm font-medium text-slate-600 mb-1">İletişim (Telefon)</label>
                                <input type="text" id="p_phone" class="w-full border-slate-300 rounded-md shadow-sm border p-2 focus:ring-purple-500 focus:border-purple-500" placeholder="05XX XXX XX XX">
                            </div>
"""
if 'id="p_phone"' not in html:
    html = html.replace(
        '</select>\n                            </div>',
        '</select>\n                            </div>' + phone_html
    )

# 2. Update Detail Info
if 'Yaş: 0 | Kilo: 0kg | Cinsiyet: -' in html:
    html = html.replace(
        '<p class="text-slate-500 text-sm mt-1" id="detailInfo">Yaş: 0 | Kilo: 0kg | Cinsiyet: -</p>',
        '<p class="text-slate-500 text-sm mt-1" id="detailInfo">Yaş: 0 | Kilo: 0kg | Cinsiyet: - | Tel: -</p>'
    )

with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/index.html', 'w') as f:
    f.write(html)
print("index.html patched.")
