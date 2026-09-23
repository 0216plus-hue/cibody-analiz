with open("frontend/index.html", "r") as f:
    html = f.read()

# Add script tag
if "qrcode.min.js" not in html:
    html = html.replace("</head>", "    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js\"></script>\n</head>")

# Add Tab Button
old_tab_btn = """<button onclick="switchTab('scoliosisTab')" id="btn_scoliosisTab" class="tab-btn pb-3 text-slate-600 font-medium px-2 whitespace-nowrap">
                    <i class="fa-solid fa-bone text-lg"></i> Cobb Analizi (AI)
                </button>"""
new_tab_btn = old_tab_btn + """
                <button onclick="switchTab('scoliometerTab')" id="btn_scoliometerTab" class="tab-btn pb-3 text-slate-600 font-medium px-2 whitespace-nowrap">
                    <i class="fa-solid fa-mobile-screen text-indigo-500 mr-2"></i> Skolyometre
                </button>"""
html = html.replace(old_tab_btn, new_tab_btn)

# Add Tab Content
scoliometer_html = """
                <!-- SKOLYOMETRE TAB -->
                <div id="scoliometerTab" class="hidden">
                    <div class="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mb-8">
                        <div class="p-8 flex flex-col md:flex-row gap-8 items-center">
                            
                            <div class="flex-1 text-center md:text-left">
                                <h2 class="text-2xl font-black text-slate-800 mb-3 flex items-center justify-center md:justify-start gap-3">
                                    <i class="fa-solid fa-mobile-screen text-indigo-600"></i> Dijital Skolyometre
                                </h2>
                                <p class="text-slate-600 mb-6 leading-relaxed">Fizyoterapist olarak telefonunuzun sensörlerini kullanarak hassas <b>Angle of Trunk Rotation (ATR)</b> ölçümü yapabilirsiniz. Eşleşmek için yandaki QR kodu telefonunuzun kamerasına okutun.</p>
                                
                                <button onclick="generateScoliometerQR()" id="btnGenerateQR" class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-indigo-200">
                                    <i class="fa-solid fa-qrcode mr-2"></i> QR Kod Oluştur ve Bağlan
                                </button>
                                
                                <div id="scoliometerStatus" class="hidden mt-6 p-4 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-200 text-sm font-medium flex items-center">
                                    <i class="fa-solid fa-circle-notch fa-spin mr-3 text-lg"></i> Telefonla eşleşme bekleniyor veya ölçüm yapılıyor...
                                </div>
                            </div>
                            
                            <div class="shrink-0 bg-slate-50 p-6 rounded-3xl border border-slate-200 flex flex-col items-center justify-center w-64 h-64 relative">
                                <div id="scoliometerQR" class="w-48 h-48 flex items-center justify-center">
                                    <i class="fa-solid fa-qrcode text-6xl text-slate-300"></i>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                        <div class="bg-slate-50 border-b border-slate-200 p-4">
                            <h3 class="font-black text-slate-800 flex items-center gap-2">
                                <i class="fa-solid fa-clock-rotate-left text-slate-400"></i> Ölçüm Geçmişi
                            </h3>
                        </div>
                        <div class="p-4">
                            <table class="w-full text-sm text-left">
                                <thead class="bg-slate-50 text-slate-500 text-xs uppercase font-bold">
                                    <tr>
                                        <th class="px-4 py-3">Tarih</th>
                                        <th class="px-4 py-3 text-center">Torakal Açı (ATR)</th>
                                        <th class="px-4 py-3 text-center">Lumbar Açı (ATR)</th>
                                    </tr>
                                </thead>
                                <tbody id="scoliometerHistoryList" class="divide-y divide-slate-100">
                                    <tr><td colspan="3" class="text-center py-8 text-slate-400">Henüz ölçüm bulunmuyor.</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
"""
html = html.replace('<!-- ALT BÖLÜM: Tam Sayfa -->', scoliometer_html + '\n        <!-- ALT BÖLÜM: Tam Sayfa -->')

with open("frontend/index.html", "w") as f:
    f.write(html)
