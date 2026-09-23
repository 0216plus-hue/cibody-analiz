import re

with open("frontend/index.html", "r") as f:
    html = f.read()

new_scoliosis_tab = """    <!-- SKOLYOZ ANALİZİ TAB'I -->
    <div id="scoliosisTab" class="hidden">
        <div class="flex flex-col lg:flex-row gap-6 mb-8">
            <!-- Sol Panel: Röntgen Yükleme ve Canvas -->
            <div class="w-full lg:w-7/12">
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

                <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-xl font-bold text-slate-800"><i class="fa-solid fa-x-ray text-indigo-600 mr-2"></i>Röntgen (X-Ray) Yükleme</h2>
                        <input type="file" id="scoliosisImg" accept="image/*" class="hidden" onchange="previewScoliosis(event)">
                        <button onclick="document.getElementById('scoliosisImg').click()" class="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-medium py-2 px-4 rounded-xl transition-colors">
                            <i class="fa-solid fa-upload mr-2"></i>Görüntü Seç
                        </button>
                    </div>
                    
                    <div class="relative digital-skeleton-bg rounded-xl flex items-center justify-center min-h-[400px] border-2 border-dashed border-slate-300 overflow-hidden" id="scoliosisContainer">
                        <div id="scoliosisPlaceholder" class="text-slate-400 text-center pointer-events-none p-4">
                            <i class="fa-solid fa-image text-5xl mb-3 opacity-50"></i>
                            <p>Röntgen görüntüsü yükleyin</p>
                        </div>
                        <canvas id="scoliosisCanvas" class="absolute top-0 left-0 w-full h-full object-contain cursor-crosshair hidden" style="z-index: 10;"></canvas>
                        <img id="scoliosisPreview" class="absolute top-0 left-0 w-full h-full object-contain hidden" />
                    </div>
                    
                    <div class="mt-4 flex flex-wrap gap-3">
                        <button onclick="uploadScoliosisImage()" id="btnSaveScoliosis" class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-6 rounded-xl transition-all hidden shadow-md">
                            <i class="fa-solid fa-cloud-arrow-up mr-2"></i>Kaydet & Analize Başla
                        </button>
                        <button onclick="resetScoliosisCanvas()" id="btnResetScoliosis" class="bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium py-2.5 px-6 rounded-xl transition-all hidden">
                            <i class="fa-solid fa-rotate-left mr-2"></i>Çizimi Sıfırla
                        </button>
                    </div>
                </div>
                
                <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mt-6">
                    <h2 class="text-xl font-bold text-slate-800 mb-4 border-b pb-2">Geçmiş Cobb Analizleri</h2>
                    <div id="scoliosisHistoryList" class="space-y-3 max-h-60 overflow-y-auto">
                        <div class="text-center text-slate-400 py-4">Kayıt bulunamadı.</div>
                    </div>
                </div>
            </div>
            
            <!-- Sağ Panel: Sonuçlar ve AI -->
            <div class="w-full lg:w-5/12 space-y-6">
                <!-- Hesaplanan Değer -->
                <div class="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-2xl shadow-md p-6 text-white relative overflow-hidden">
                    <i class="fa-solid fa-angle-right absolute -right-4 -bottom-4 text-white/10 text-8xl"></i>
                    <h3 class="text-indigo-100 font-bold uppercase tracking-wider text-xs mb-2">Hesaplanan Cobb Açısı</h3>
                    <div class="flex items-baseline gap-2">
                        <span id="scoliosisCobbAngle" class="text-5xl font-black">0</span>
                        <span class="text-2xl font-medium text-indigo-200">Derece</span>
                    </div>
                    <div class="mt-3 bg-white/20 px-3 py-1.5 rounded-lg inline-block backdrop-blur-sm">
                        <span id="scoliosisSeverity" class="font-medium text-sm">Bekleniyor...</span>
                    </div>
                </div>

                <!-- AI Rapor Alanı -->
                <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div class="bg-indigo-50 px-6 py-4 border-b border-indigo-100 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-3">
                        <h3 class="font-bold text-indigo-900"><i class="fa-solid fa-robot mr-2"></i>Yapay Zeka Klinik Yorumu</h3>
                        <div class="flex flex-col sm:flex-row gap-2 w-full xl:w-auto">
                            <button onclick="generateScoliosisAi()" id="btnGenerateScoliosisAi" class="flex-1 bg-white border border-indigo-200 hover:bg-indigo-100 text-indigo-700 text-xs font-bold py-2 px-3 rounded-lg transition-colors whitespace-nowrap shadow-sm">
                                <i class="fa-solid fa-wand-magic-sparkles mr-1"></i>Rapor Üret
                            </button>
                            <button onclick="generateScoliosisExerciseAi()" id="btnGenerateScoliosisExerciseAi" class="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold py-2 px-3 rounded-lg transition-colors whitespace-nowrap shadow-sm">
                                <i class="fa-solid fa-person-running mr-1"></i>Egzersiz Öner
                            </button>
                        </div>
                    </div>
                    <div class="p-6">
                        <div id="scoliosisAiReport" class="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap max-h-80 overflow-y-auto">Analiz yapıldığında AI raporu burada görüntülenecektir. Lütfen resmi yükleyip ölçümü tamamlayın.</div>
                    </div>
                </div>
                
                <!-- Notlar -->
                <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                    <h3 class="font-bold text-slate-800 mb-3"><i class="fa-solid fa-clipboard-user text-slate-400 mr-2"></i>Klinik Notlar</h3>
                    <textarea id="scoliosisNotes" class="w-full border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[100px]" placeholder="Tedavi planı ve notlarınızı buraya girebilirsiniz..."></textarea>
                    <button onclick="saveScoliosisNotes()" class="mt-3 w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2 rounded-xl text-sm transition-colors">
                        Notları Kaydet
                    </button>
                </div>
                
                <!-- Aksiyon Butonları -->
                <div class="grid grid-cols-2 gap-3">
                    <button onclick="downloadScoliosisPdf()" class="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-sm shadow-sm">
                        <i class="fa-solid fa-file-pdf"></i> PDF İndir
                    </button>
                    <button onclick="showScoliosisQr()" class="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-sm shadow-sm">
                        <i class="fa-solid fa-qrcode"></i> Karekod Paylaş
                    </button>
                </div>
            </div>
        </div>
    </div>"""

# Remove old scoliosis tab (which goes until <!-- Zoom Paneli -->)
match = re.search(r'(<!-- SKOLYOZ ANALİZİ TAB\'I -->.*?)(?=\s*<!-- Zoom Paneli -->)', html, re.DOTALL)
if match:
    old_tab = match.group(1)
    html = html.replace(old_tab, new_scoliosis_tab)
else:
    match2 = re.search(r'(<div id="scoliosisTab".*?)(?=\s*<!-- Zoom Paneli -->)', html, re.DOTALL)
    if match2:
        html = html.replace(match2.group(1), new_scoliosis_tab)

with open("frontend/index.html", "w") as f:
    f.write(html)
