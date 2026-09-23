import re

clean_html = """    <!-- SKOLYOZ ANALİZİ TAB'I -->
    <div id="scoliosisTab" class="hidden">
        
        <!-- ÜST BÖLÜM: Sol - Sağ -->
        <div class="flex flex-col md:flex-row gap-6 mb-6">
            
            <!-- SOL PANEL: Röntgen Yükleme -->
            <div class="w-full md:w-7/12 flex flex-col">
                <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 h-full flex flex-col">
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-xl font-bold text-slate-800"><i class="fa-solid fa-x-ray text-indigo-600 mr-2"></i>Röntgen (X-Ray) Yükleme</h2>
                        <input type="file" id="scoliosisImg" accept="image/*" class="hidden" onchange="previewScoliosis(event)">
                        <button onclick="document.getElementById('scoliosisImg').click()" class="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-medium py-2 px-4 rounded-xl transition-colors">
                            <i class="fa-solid fa-upload mr-2"></i>Görüntü Seç
                        </button>
                    </div>
                    
                    <div class="relative digital-skeleton-bg rounded-xl flex items-center justify-center min-h-[500px] border-2 border-dashed border-slate-300 overflow-hidden flex-1" id="scoliosisContainer">
                        <div id="scoliosisPlaceholder" class="text-slate-400 text-center pointer-events-none p-4">
                            <i class="fa-solid fa-image text-5xl mb-3 opacity-50"></i>
                            <p>Röntgen görüntüsü yükleyin</p>
                        </div>
                        <canvas id="scoliosisCanvas" class="absolute top-0 left-0 w-full h-full object-contain cursor-crosshair hidden" style="z-index: 10;"></canvas>
                        <img id="scoliosisPreview" class="absolute top-0 left-0 w-full h-full object-contain hidden" />
                    </div>
                    
                    <div class="mt-6 flex flex-wrap gap-3 justify-center">
                        <button onclick="uploadScoliosisImage()" id="btnSaveScoliosis" class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-xl transition-all hidden shadow-md text-lg w-full sm:w-auto">
                            <i class="fa-solid fa-cloud-arrow-up mr-2"></i>Kaydet & Analizi Başlat
                        </button>
                        <button onclick="resetScoliosisCanvas()" id="btnResetScoliosis" class="bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium py-3 px-8 rounded-xl transition-all hidden text-lg w-full sm:w-auto">
                            <i class="fa-solid fa-rotate-left mr-2"></i>Çizimi Sıfırla
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- SAĞ PANEL: Not, Skor, Geçmiş -->
            <div class="w-full md:w-5/12 flex flex-col gap-6">
                <!-- Uyarı Notu -->
                <div class="p-5 bg-amber-50 border border-amber-200 text-amber-900 rounded-2xl shadow-sm">
                    <p class="font-bold mb-2 text-base"><i class="fa-solid fa-triangle-exclamation mr-2 text-amber-500"></i>Önemli: Ölçüm Nasıl Yapılır?</p>
                    <p class="mb-3 text-sm">Röntgeni yükledikten sonra sistemin açıyı hesaplayabilmesi için <strong>görüntü üzerine 4 adet nokta tıklamanız</strong> gerekmektedir:</p>
                    <ol class="list-decimal pl-5 space-y-1.5 font-medium text-sm mb-3">
                        <li>Eğriliğin en <strong>üstündeki</strong> omurun sınırına (başına ve sonuna) 2 nokta tıklayın.</li>
                        <li>Eğriliğin en <strong>altındaki</strong> omurun sınırına (başına ve sonuna) 2 nokta tıklayın.</li>
                    </ol>
                    <div class="text-indigo-700 font-bold bg-indigo-50/50 p-2.5 rounded-lg border border-indigo-100 text-xs">
                        <i class="fa-solid fa-circle-info mr-1"></i> Not: 4 noktayı tamamladığınızda sistem Cobb açısını otomatik hesaplar!
                    </div>
                </div>

                <!-- Hesaplanan Değer -->
                <div class="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-2xl shadow-md p-6 text-white relative overflow-hidden flex flex-col justify-center">
                    <i class="fa-solid fa-angle-right absolute -right-4 -bottom-4 text-white/10 text-8xl"></i>
                    <h3 class="text-indigo-100 font-bold uppercase tracking-wider text-sm mb-3">Hesaplanan Cobb Açısı</h3>
                    <div class="flex items-baseline gap-2 mb-4">
                        <span id="scoliosisCobbAngle" class="text-6xl font-black">0</span>
                        <span class="text-3xl font-medium text-indigo-200">Derece</span>
                    </div>
                    <div class="bg-white/20 px-4 py-2 rounded-xl inline-block backdrop-blur-sm self-start">
                        <span id="scoliosisSeverity" class="font-bold text-lg">Bekleniyor...</span>
                    </div>
                </div>

                <!-- Geçmiş Analizler -->
                <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex-1 flex flex-col">
                    <h2 class="text-base font-bold text-slate-800 mb-4 border-b pb-2">Geçmiş Cobb Analizleri</h2>
                    <div id="scoliosisHistoryList" class="space-y-3 flex-1 overflow-y-auto pr-2" style="max-height: 250px;">
                        <div class="text-center text-slate-400 py-4">Kayıt bulunamadı.</div>
                    </div>
                </div>
            </div>
            
        </div>
        
        <!-- ALT BÖLÜM: Tam Sayfa -->
        <div class="w-full flex flex-col gap-6 mb-8">
            
            <!-- AI Klinik Rapor -->
            <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col w-full">
                <div class="bg-indigo-50 px-6 py-4 border-b border-indigo-100 flex justify-between items-center">
                    <h3 class="font-bold text-indigo-900"><i class="fa-solid fa-user-doctor mr-2"></i>AI Klinik Rapor</h3>
                    <button onclick="generateScoliosisAi()" id="btnGenerateScoliosisAi" class="bg-white border border-indigo-200 hover:bg-indigo-100 text-indigo-700 text-xs font-bold py-2 px-4 rounded-lg transition-colors shadow-sm">
                        <i class="fa-solid fa-wand-magic-sparkles mr-1"></i>Rapor Üret
                    </button>
                </div>
                <div class="p-6">
                    <div id="scoliosisAiReport" class="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">Analiz yapıldığında klinik rapor burada görüntülenecektir.</div>
                </div>
            </div>
            
            <!-- Egzersiz Reçetesi Tablosu -->
            <div class="bg-slate-50 rounded-2xl shadow-sm border border-slate-200 p-6 w-full">
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
                        <button onclick="openExerciseModal('scoliosis')" class="text-indigo-600 hover:text-indigo-800 font-bold text-sm px-3 py-1.5 rounded-lg hover:bg-indigo-50 transition-colors flex items-center">
                            <i class="fa-solid fa-plus mr-1"></i> Kütüphaneden Manuel Ekle
                        </button>
                    </div>
                </div>
            </div>

            <!-- Klinik Notlar -->
            <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 w-full">
                <h3 class="font-bold text-slate-800 text-base mb-3"><i class="fa-solid fa-clipboard-user text-slate-400 mr-2"></i>Klinik Notlar</h3>
                <textarea id="scoliosisNotes" class="w-full border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[100px]" placeholder="Tedavi planı ve notlarınızı buraya girebilirsiniz..."></textarea>
                <div class="flex justify-end mt-3">
                    <button onclick="saveScoliosisNotes()" class="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 px-6 rounded-xl text-sm transition-colors">
                        Notları Kaydet
                    </button>
                </div>
            </div>

            <!-- Aksiyon Butonları -->
            <div class="flex flex-col sm:flex-row gap-4 w-full">
                <button onclick="downloadScoliosisPdf()" class="flex-1 bg-indigo-50 border border-indigo-200 text-indigo-700 hover:bg-indigo-100 font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm text-base">
                    <i class="fa-solid fa-file-pdf text-red-500"></i> PDF İndir
                </button>
                <button onclick="showScoliosisQr()" class="flex-1 bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm text-base">
                    <i class="fa-solid fa-qrcode"></i> Karekod Paylaş
                </button>
            </div>
            
        </div>
    </div>"""

with open("frontend/index.html", "r") as f:
    html = f.read()

match = re.search(r'(<!-- SKOLYOZ ANALİZİ TAB\'I -->.*?)(?=\s*<!-- Zoom Paneli -->)', html, re.DOTALL)
if match:
    html = html.replace(match.group(1), clean_html + "\n")
else:
    match2 = re.search(r'(<div id="scoliosisTab".*?)(?=\s*<!-- Zoom Paneli -->)', html, re.DOTALL)
    if match2:
        html = html.replace(match2.group(1), clean_html + "\n")

with open("frontend/index.html", "w") as f:
    f.write(html)
