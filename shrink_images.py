import re

with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/app.js', 'r') as f:
    js = f.read()

# Replace the layout classes for the risk cards
old_card_html = """                        <div class="bg-slate-50 border border-slate-200 rounded-2xl flex flex-col md:flex-row overflow-hidden shadow-sm">
                            <div class="md:w-1/3 bg-slate-100 border-r border-slate-200 flex flex-col items-center justify-center p-6 min-h-[200px]">
                                <img src="/${data.img}" alt="${f}" class="w-full h-full object-contain rounded-xl mix-blend-multiply">
                                <div class="w-full flex justify-between px-8 text-xs font-bold text-slate-400 mt-2">
                                    <span>Şimdi</span>
                                    <span class="text-amber-600">Önlem Alınmazsa</span>
                                </div>
                            </div>
                            <div class="md:w-2/3 p-6 md:p-8">"""

new_card_html = """                        <div class="bg-slate-50 border border-slate-200 rounded-2xl flex flex-col md:flex-row overflow-hidden shadow-sm items-center">
                            <div class="md:w-1/4 lg:w-1/5 bg-slate-100/50 border-r border-slate-200 flex flex-col items-center justify-center p-4">
                                <img src="/${data.img}" alt="${f}" class="w-full max-h-40 object-contain rounded-xl mix-blend-multiply">
                                <div class="w-full flex justify-between px-4 text-[10px] font-bold text-slate-400 mt-2">
                                    <span>Şimdi</span>
                                    <span class="text-amber-600">Önlem Alınmazsa</span>
                                </div>
                            </div>
                            <div class="md:w-3/4 lg:w-4/5 p-5 md:p-6">"""

if old_card_html in js:
    js = js.replace(old_card_html, new_card_html)
    with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/app.js', 'w') as f:
        f.write(js)
    print("app.js updated successfully.")
else:
    print("Old html not found. Trying regex.")
    
