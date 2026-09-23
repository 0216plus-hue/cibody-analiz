import re

with open("frontend/index.html", "r") as f:
    html = f.read()

# Egzersiz Reçetesi UI for Scoliosis
exercise_ui = """                <!-- Egzersiz Reçetesi -->
                <div class="bg-slate-50 rounded-2xl shadow-sm border border-slate-200 p-6">
                    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-slate-200 pb-4">
                        <div>
                            <h3 class="font-bold text-slate-800 text-lg flex items-center">
                                <i class="fa-solid fa-person-running text-indigo-600 mr-2"></i>Egzersiz Reçetesi
                                <span class="ml-2 text-[10px] font-bold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded uppercase tracking-wider">Kişiselleştirilmiş</span>
                            </h3>
                            <p class="text-xs text-slate-500 mt-1">Bu analize özel egzersizleri planlayın. QR kod ile hasta kolayca izleyebilecektir.</p>
                        </div>
                        <button onclick="suggestScoliosisExercises()" id="btnSuggestScoliosisExercises" class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-5 rounded-xl transition-all shadow-md text-sm flex items-center shrink-0">
                            <i class="fa-solid fa-wand-magic-sparkles mr-2"></i>AI Egzersiz Öner
                        </button>
                    </div>

                    <!-- Egzersiz Tablosu -->
                    <div class="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                        <div class="overflow-x-auto">
                            <table class="w-full text-sm text-left">
                                <thead class="bg-slate-50 text-slate-500 text-xs uppercase font-bold">
                                    <tr>
                                        <th class="px-4 py-3 w-16">GÖRSEL</th>
                                        <th class="px-4 py-3">EGZERSİZ ADI & KATEGORİ</th>
                                        <th class="px-4 py-3 w-24">SET</th>
                                        <th class="px-4 py-3 w-24">TEKRAR</th>
                                        <th class="px-4 py-3 w-16 text-center">İŞLEM</th>
                                    </tr>
                                </thead>
                                <tbody id="scoliosisAssignedExercisesList" class="divide-y divide-slate-100">
                                    <tr><td colspan="5" class="text-center py-8 text-slate-400">Henüz egzersiz atanmamış.</td></tr>
                                </tbody>
                            </table>
                        </div>
                        
                        <div class="bg-slate-50 border-t border-slate-200 p-3 flex justify-between items-center">
                            <button onclick="openExerciseModal()" class="text-indigo-600 hover:text-indigo-800 font-bold text-sm px-3 py-1.5 rounded-lg hover:bg-indigo-50 transition-colors flex items-center">
                                <i class="fa-solid fa-plus mr-1"></i> Kütüphaneden Manuel Ekle
                            </button>
                        </div>
                    </div>
                </div>"""

# Find the old "AI Egzersiz Öner" box and replace it with the new table UI
old_exercise_box_regex = r'<!-- Egzersiz Öner -->\s*<div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">.*?</div>\s*</div>'
html = re.sub(old_exercise_box_regex, exercise_ui, html, flags=re.DOTALL)

with open("frontend/index.html", "w") as f:
    f.write(html)
