import re

with open("frontend/index.html", "r") as f:
    html = f.read()

new_scoliosis_tab = """    <!-- SKOLYOZ ANALİZİ TAB'I -->
    <div id="scoliosisTab" class="hidden">
        
        <!-- Üst Kısım: Yükleme ve Çizim -->
        <div id="scoliosisUploadSection" class="mb-8">
            <div class="mb-4 p-4 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl text-sm">
                <p class="font-bold mb-1"><i class="fa-solid fa-triangle-exclamation mr-1 text-amber-500"></i>Önemli: Ölçüm Nasıl Yapılır?</p>
                <p class="mb-2">Röntgeni yükledikten sonra sistemin açıyı hesaplayabilmesi için <strong>görüntü üzerine 4 adet nokta tıklamanız</strong> gerekmektedir:</p>
                <ol class="list-decimal pl-5 space-y-1 font-medium">
                    <li>Eğriliğin en <strong>üstündeki</strong> omurun sınırına (başına ve sonuna) 2 nokta tıklayın.</li>
                    <li>Eğriliğin en <strong>altındaki</strong> omurun sınırına (başına ve sonuna) 2 nokta tıklayın.</li>
                </ol>
                <div class="mt-2 text-indigo-700 font-bold bg-indigo-50 p-2 rounded-lg border border-indigo-100 inline-block">
                    <i class="fa-solid fa-circle-info mr-1"></i> Not: 4 noktayı tamamladığınızda sistem Cobb açısını otomatik hesaplar!
                </div>
            </div>

            <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-xl font-bold text-slate-800"><i class="fa-solid fa-x-ray text-indigo-600 mr-2"></i>Omurga Röntgeni (X-Ray)</h2>
                    <input type="file" id="scoliosisImg" accept="image/*" class="hidden" onchange="previewScoliosis(event)">
                    <button onclick="document.getElementById('scoliosisImg').click()" class="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-medium py-2 px-4 rounded-xl transition-colors">
                        <i class="fa-solid fa-upload mr-2"></i>Görüntü Seç
                    </button>
                </div>
                
                <div class="relative digital-skeleton-bg rounded-xl flex items-center justify-center min-h-[400px] max-h-[700px] border-2 border-dashed border-slate-300 overflow-hidden" id="scoliosisContainer">
                    <div id="scoliosisPlaceholder" class="text-slate-400 text-center pointer-events-none p-10">
                        <i class="fa-solid fa-image text-5xl mb-3 opacity-50"></i>
                        <p>Röntgen görüntüsü yükleyin</p>
                    </div>
                    <canvas id="scoliosisCanvas" class="absolute top-0 left-0 w-full h-full object-contain cursor-crosshair hidden" style="z-index: 10;"></canvas>
                    <img id="scoliosisPreview" class="absolute top-0 left-0 w-full h-full object-contain hidden" />
                </div>
            </div>
            
            <!-- İşlem Butonları -->
            <div class="flex flex-wrap gap-3 justify-center mb-8">
                <button onclick="uploadScoliosisImage()" id="btnSaveScoliosis" class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-xl transition-all hidden shadow-md text-lg w-full md:w-auto">
                    <i class="fa-solid fa-cloud-arrow-up mr-2"></i>Kaydet & Analizi Başlat
                </button>
                <button onclick="resetScoliosisCanvas()" id="btnResetScoliosis" class="bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium py-3 px-8 rounded-xl transition-all hidden text-lg w-full md:w-auto">
                    <i class="fa-solid fa-rotate-left mr-2"></i>Çizimi Sıfırla
                </button>
            </div>
        </div>

        <!-- Alt Kısım: Sonuçlar (Aşağıya Doğru Sünen Tasarım) -->
        <div id="scoliosisResultsSection" class="avoid-break bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-8">
            <h2 class="text-2xl font-black text-slate-800 mb-6 border-b border-slate-200 pb-4"><i class="fa-solid fa-chart-line text-indigo-600 mr-2"></i>Cobb Analiz Sonuçları</h2>
            
            <!-- Skor Kartı (Tam Genişlik) -->
            <div class="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-2xl shadow-md p-6 text-white relative overflow-hidden mb-8">
                <i class="fa-solid fa-angle-right absolute -right-4 -bottom-4 text-white/10 text-8xl"></i>
                <h3 class="text-indigo-100 font-bold uppercase tracking-wider text-sm mb-2">Hesaplanan Cobb Açısı</h3>
                <div class="flex items-baseline gap-2">
                    <span id="scoliosisCobbAngle" class="text-6xl font-black">0</span>
                    <span class="text-3xl font-medium text-indigo-200">Derece</span>
                </div>
                <div class="mt-4 bg-white/20 px-4 py-2 rounded-xl inline-block backdrop-blur-sm">
                    <span id="scoliosisSeverity" class="font-bold text-lg">Bekleniyor...</span>
                </div>
            </div>

            <!-- AI Rapor Alanı -->
            <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8">
                <div class="bg-indigo-50 px-6 py-4 border-b border-indigo-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h3 class="font-bold text-indigo-900 text-lg"><i class="fa-solid fa-robot mr-2"></i>Yapay Zeka Klinik Yorumu</h3>
                    <div class="flex flex-wrap gap-2 w-full sm:w-auto">
                        <button onclick="generateScoliosisAi()" id="btnGenerateScoliosisAi" class="flex-1 sm:flex-none bg-white border border-indigo-200 hover:bg-indigo-100 text-indigo-700 font-bold py-2 px-4 rounded-xl transition-colors text-sm shadow-sm whitespace-nowrap">
                            <i class="fa-solid fa-wand-magic-sparkles mr-1"></i>Klinik Rapor Üret
                        </button>
                        <button onclick="generateScoliosisExerciseAi()" id="btnGenerateScoliosisExerciseAi" class="flex-1 sm:flex-none bg-emerald-500 hover:bg-emerald-600 border border-emerald-600 text-white font-bold py-2 px-4 rounded-xl transition-colors text-sm shadow-sm whitespace-nowrap">
                            <i class="fa-solid fa-person-running mr-1"></i>Egzersiz Öner
                        </button>
                    </div>
                </div>
                <div class="p-6">
                    <div id="scoliosisAiReport" class="text-base text-slate-700 leading-relaxed whitespace-pre-wrap">Analiz yapıldığında AI raporu burada görüntülenecektir. Lütfen resmi yükleyip ölçümü tamamlayın.</div>
                </div>
            </div>
            
            <!-- Geçmiş ve Notlar Yan Yana (Büyük Ekranda) -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <!-- Geçmiş Analizler -->
                <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 h-full flex flex-col">
                    <h2 class="text-xl font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">Geçmiş Cobb Analizleri</h2>
                    <div id="scoliosisHistoryList" class="space-y-3 flex-1 overflow-y-auto max-h-60">
                        <div class="text-center text-slate-400 py-4">Kayıt bulunamadı.</div>
                    </div>
                </div>
                
                <!-- Notlar -->
                <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 h-full flex flex-col">
                    <h3 class="font-bold text-slate-800 text-lg mb-3"><i class="fa-solid fa-clipboard-user text-slate-400 mr-2"></i>Klinik Notlar</h3>
                    <textarea id="scoliosisNotes" class="flex-1 w-full border-slate-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[120px]" placeholder="Tedavi planı ve notlarınızı buraya girebilirsiniz..."></textarea>
                    <div class="flex justify-end mt-3">
                        <button onclick="saveScoliosisNotes()" class="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2 px-6 rounded-xl transition-colors text-sm">
                            Notları Kaydet
                        </button>
                    </div>
                </div>
            </div>

            <!-- Aksiyon Butonları -->
            <div class="flex flex-col sm:flex-row gap-4">
                <button onclick="downloadScoliosisPdf()" class="flex-1 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-sm text-lg">
                    <i class="fa-solid fa-file-pdf text-red-500"></i> PDF Rapor İndir
                </button>
                <button onclick="showScoliosisQr()" class="flex-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-sm text-lg">
                    <i class="fa-solid fa-qrcode"></i> Hastayla Karekod Paylaş
                </button>
            </div>
        </div>
    </div>"""

# Remove old scoliosis tab
match = re.search(r'(<!-- SKOLYOZ ANALİZİ TAB\'I -->\s*<div id="scoliosisTab".*?)\s*(?:<!-- Zoom Paneli -->|</div>\s*</div>\s*<!-- Zoom Paneli -->|</div>\s*<!-- Zoom Paneli -->)', html, re.DOTALL)
if match:
    old_tab = match.group(1)
    html = html.replace(old_tab, new_scoliosis_tab + '\n')
else:
    # Try another regex
    match2 = re.search(r'(<div id="scoliosisTab".*?)\s*(?:<!-- Zoom Paneli -->)', html, re.DOTALL)
    if match2:
        html = html.replace(match2.group(1), new_scoliosis_tab + '\n')

with open("frontend/index.html", "w") as f:
    f.write(html)
