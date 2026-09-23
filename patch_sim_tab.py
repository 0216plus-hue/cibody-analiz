with open("frontend/index.html", "r") as f:
    html = f.read()

sim_tab_html = """
                <!-- 3D SİMÜLASYON TAB -->
                <div id="simulationTab" class="hidden">
                    <div class="bg-slate-900 rounded-3xl shadow-xl border border-slate-800 overflow-hidden mb-8 text-white relative">
                        <div class="flex flex-col lg:flex-row h-[700px]">
                            <!-- 3D Canvas Area -->
                            <div class="w-full lg:w-2/3 h-full relative" id="threeJsContainer">
                                <div class="absolute top-6 left-6 z-10">
                                    <h2 class="text-2xl font-black text-white/90 drop-shadow-md">
                                        <i class="fa-solid fa-cube text-emerald-400 mr-2"></i> 3D Skolyoz Simülasyonu
                                    </h2>
                                    <p class="text-slate-400 text-sm mt-1">Hastaya Cobb ve Rotasyon etkisini görsel olarak gösterin.</p>
                                    <p class="text-emerald-400/80 text-xs mt-1"><i class="fa-solid fa-arrows-rotate mr-1"></i>Mouse ile çevirebilirsiniz</p>
                                </div>
                                <canvas id="simCanvas" class="w-full h-full cursor-move"></canvas>
                            </div>
                            
                            <!-- Controls Panel -->
                            <div class="w-full lg:w-1/3 bg-slate-800/80 border-l border-slate-700 p-6 flex flex-col h-full overflow-y-auto" style="scrollbar-width: thin;">
                                <div class="flex items-center justify-between mb-8">
                                    <h3 class="text-lg font-bold text-slate-200"><i class="fa-solid fa-sliders text-emerald-400 mr-2"></i> Parametreler</h3>
                                    <button onclick="resetSimulation()" class="bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs px-3 py-1.5 rounded-lg transition">Sıfırla</button>
                                </div>
                                
                                <div class="space-y-6">
                                    <!-- Cobb Angle -->
                                    <div>
                                        <div class="flex justify-between mb-1">
                                            <label class="text-sm font-semibold text-slate-300">Cobb Açısı (Yanal Bükülme)</label>
                                            <span id="val_cobb" class="text-emerald-400 font-bold text-sm">0°</span>
                                        </div>
                                        <input type="range" id="sim_cobb" min="-100" max="100" value="0" class="w-full accent-emerald-500">
                                        <div class="flex justify-between text-[10px] text-slate-500 mt-1">
                                            <span>Sola</span>
                                            <span>Normal</span>
                                            <span>Sağa</span>
                                        </div>
                                    </div>
                                    
                                    <!-- Axial Rotation -->
                                    <div>
                                        <div class="flex justify-between mb-1">
                                            <label class="text-sm font-semibold text-slate-300">Aksiyal Rotasyon</label>
                                            <span id="val_rot" class="text-emerald-400 font-bold text-sm">0°</span>
                                        </div>
                                        <input type="range" id="sim_rot" min="-50" max="50" value="0" class="w-full accent-emerald-500">
                                        <div class="flex justify-between text-[10px] text-slate-500 mt-1">
                                            <span>Sola Rotasyon</span>
                                            <span>Normal</span>
                                            <span>Sağa Rotasyon</span>
                                        </div>
                                    </div>

                                    <!-- Lateral Shift -->
                                    <div>
                                        <div class="flex justify-between mb-1">
                                            <label class="text-sm font-semibold text-slate-300">Yana Kayma (Torsiyon)</label>
                                            <span id="val_shift" class="text-emerald-400 font-bold text-sm">0 mm</span>
                                        </div>
                                        <input type="range" id="sim_shift" min="-100" max="100" value="0" class="w-full accent-emerald-500">
                                    </div>
                                    
                                    <hr class="border-slate-700">
                                    
                                    <!-- Region Selectors -->
                                    <div class="grid grid-cols-2 gap-4">
                                        <div>
                                            <label class="block text-xs font-semibold text-slate-400 mb-2">Başlangıç Omuru</label>
                                            <select id="sim_start" class="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm text-slate-300 focus:border-emerald-500 outline-none">
                                                <option value="4">C5</option>
                                                <option value="5">C6</option>
                                                <option value="6">C7</option>
                                                <option value="7">T1</option>
                                                <option value="8">T2</option>
                                                <option value="9">T3</option>
                                                <option value="10">T4</option>
                                                <option value="11" selected>T5</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label class="block text-xs font-semibold text-slate-400 mb-2">Bitiş Omuru</label>
                                            <select id="sim_end" class="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm text-slate-300 focus:border-emerald-500 outline-none">
                                                <option value="13">T7</option>
                                                <option value="14">T8</option>
                                                <option value="15">T9</option>
                                                <option value="16">T10</option>
                                                <option value="17">T11</option>
                                                <option value="18">T12</option>
                                                <option value="19" selected>L1</option>
                                                <option value="20">L2</option>
                                                <option value="21">L3</option>
                                                <option value="22">L4</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
"""

old_foot = '                <div id="footTab" class="hidden">'

if old_foot in html:
    html = html.replace(old_foot, sim_tab_html + "\n" + old_foot)
    with open("frontend/index.html", "w") as f:
        f.write(html)
    print("Inserted simulationTab.")
else:
    print("Could not find footTab.")
