import re

with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/index.html', 'r') as f:
    html = f.read()

exercise_section_html = """
                    <!-- Egzersiz Planlaması Bölümü -->
                    <div id="exercisePlanSection" class="mt-12 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
                        <div class="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                            <div>
                                <h2 class="text-xl font-bold text-slate-800"><i class="fa-solid fa-person-running text-indigo-600 mr-2"></i>Egzersiz Reçetesi <span class="text-xs font-normal text-slate-400 bg-slate-100 px-2 py-1 rounded ml-2">Kişiselleştirilmiş</span></h2>
                                <p class="text-sm text-slate-500 mt-2">Bu analize özel egzersizleri planlayın. PDF çıktısında her egzersiz için otomatik QR kod oluşturulacaktır.</p>
                            </div>
                            <button onclick="alert('Yapay Zeka veritabanındaki 1155 egzersiz arasından postür analizinize (örneğin Omuz Asimetrisi) uygun olanları otomatik seçecek. Bu özellik veri yüklemesinden sonra aktifleşecek.')" class="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-2.5 px-5 rounded-xl text-sm flex items-center gap-2 shadow-md transition-all transform hover:scale-105">
                                <i class="fa-solid fa-wand-magic-sparkles"></i> AI ile Egzersiz Öner
                            </button>
                        </div>
                        
                        <!-- Egzersiz Listesi -->
                        <div class="overflow-x-auto border border-slate-200 rounded-xl mb-6">
                            <table class="w-full text-left border-collapse">
                                <thead class="bg-slate-50 border-b border-slate-200 text-xs text-slate-500 uppercase font-bold">
                                    <tr>
                                        <th class="p-3 w-16 text-center">Görsel</th>
                                        <th class="p-3">Egzersiz Adı & Kategori</th>
                                        <th class="p-3 w-24 text-center">Set</th>
                                        <th class="p-3 w-24 text-center">Tekrar</th>
                                        <th class="p-3 w-16 text-center">İşlem</th>
                                    </tr>
                                </thead>
                                <tbody id="exerciseTableBody">
                                    <!-- Placeholder (Daha sonra JS ile dolacak) -->
                                    <tr class="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                        <td class="p-3 text-center">
                                            <div class="w-12 h-12 bg-slate-200 rounded flex items-center justify-center text-slate-400 mx-auto">
                                                <i class="fa-regular fa-image"></i>
                                            </div>
                                        </td>
                                        <td class="p-3">
                                            <div class="font-bold text-slate-700 text-sm">Örnek: Duvar Çömelme</div>
                                            <div class="text-xs text-slate-400 mt-0.5">Kategori: DİZ</div>
                                        </td>
                                        <td class="p-3 text-center">
                                            <input type="number" value="3" class="w-16 p-2 border border-slate-200 rounded-lg text-center text-sm focus:outline-none focus:ring-2 focus:ring-indigo-900 bg-white">
                                        </td>
                                        <td class="p-3 text-center">
                                            <input type="number" value="10" class="w-16 p-2 border border-slate-200 rounded-lg text-center text-sm focus:outline-none focus:ring-2 focus:ring-indigo-900 bg-white">
                                        </td>
                                        <td class="p-3 text-center">
                                            <button class="text-slate-300 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors">
                                                <i class="fa-solid fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr class="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                        <td class="p-3 text-center">
                                            <div class="w-12 h-12 bg-slate-200 rounded flex items-center justify-center text-slate-400 mx-auto">
                                                <i class="fa-regular fa-image"></i>
                                            </div>
                                        </td>
                                        <td class="p-3">
                                            <div class="font-bold text-slate-700 text-sm">Örnek: Skapular Retraksiyon</div>
                                            <div class="text-xs text-slate-400 mt-0.5">Kategori: OMUZ</div>
                                        </td>
                                        <td class="p-3 text-center">
                                            <input type="number" value="5" class="w-16 p-2 border border-slate-200 rounded-lg text-center text-sm focus:outline-none focus:ring-2 focus:ring-indigo-900 bg-white">
                                        </td>
                                        <td class="p-3 text-center">
                                            <input type="number" value="15" class="w-16 p-2 border border-slate-200 rounded-lg text-center text-sm focus:outline-none focus:ring-2 focus:ring-indigo-900 bg-white">
                                        </td>
                                        <td class="p-3 text-center">
                                            <button class="text-slate-300 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors">
                                                <i class="fa-solid fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <!-- İşlem Butonları -->
                        <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
                            <button class="text-indigo-600 hover:text-indigo-800 font-bold text-sm flex items-center gap-2 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-lg transition-colors w-full sm:w-auto justify-center">
                                <i class="fa-solid fa-plus"></i> Kütüphaneden Manuel Ekle
                            </button>
                            <button class="bg-slate-800 hover:bg-slate-900 text-white font-bold py-2.5 px-8 rounded-xl text-sm shadow-md transition-all flex items-center gap-2 w-full sm:w-auto justify-center">
                                <i class="fa-solid fa-check"></i> Egzersiz Programını Kaydet
                            </button>
                        </div>
                    </div>
"""

if "exercisePlanSection" not in html:
    # Insert right after clinicalNotesSection
    html = html.replace('                </div> <!-- End of postureResultsSection -->', exercise_section_html + '\n                </div> <!-- End of postureResultsSection -->')
    with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/index.html', 'w') as f:
        f.write(html)
    print("Exercise UI injected.")
else:
    print("Exercise UI already exists.")
