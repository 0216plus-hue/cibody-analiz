import re

with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/index.html', 'r') as f:
    html = f.read()

# Locate the phone input and submit button in the newPatientForm
old_phone_to_button = """                        <div>
                            <label class="block text-xs font-bold text-slate-500 mb-1">İletişim (Telefon)</label>
                            <input type="text" id="p_phone" class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-900 focus:ring-1 focus:ring-indigo-900 transition-all text-sm" placeholder="05XX XXX XX XX">
                        </div>
                        <button type="submit" class="mt-4 w-full bg-indigo-900 hover:bg-indigo-800 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2">"""

new_phone_to_button = """                        <div>
                            <label class="block text-xs font-bold text-slate-500 mb-1">İletişim (Telefon)</label>
                            <input type="text" id="p_phone" class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-900 focus:ring-1 focus:ring-indigo-900 transition-all text-sm" placeholder="05XX XXX XX XX">
                        </div>
                        
                        <div class="flex items-start gap-3 mt-1 bg-slate-50 p-3 rounded-lg border border-slate-100">
                            <input type="checkbox" id="kvkk_consent" required class="mt-0.5 w-4 h-4 text-indigo-900 bg-white border-slate-300 rounded focus:ring-indigo-900 cursor-pointer">
                            <label for="kvkk_consent" class="text-[10px] text-slate-500 leading-tight cursor-pointer">
                                Hastanın <strong>KVKK</strong> kapsamında aydınlatıldığı ve biyometrik postür/ayak verilerinin işlenmesine yönelik <span class="text-indigo-600 font-bold">Açık Rıza Beyanı'nın</span> alındığını onaylıyorum.
                            </label>
                        </div>

                        <button type="submit" class="mt-2 w-full bg-indigo-900 hover:bg-indigo-800 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2">"""

if old_phone_to_button in html:
    html = html.replace(old_phone_to_button, new_phone_to_button)
    with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/index.html', 'w') as f:
        f.write(html)
    print("KVKK Checkbox injected successfully.")
else:
    print("Could not find the target string. The form structure might be different.")
