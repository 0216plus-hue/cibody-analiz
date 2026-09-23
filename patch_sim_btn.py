with open("frontend/index.html", "r") as f:
    html = f.read()

old_btn = """                <button onclick="switchTab('footTab')" id="btn_footTab" class="tab-btn pb-3 text-slate-600 font-medium px-2 whitespace-nowrap">
                    <i class="fa-solid fa-shoe-prints mr-2 text-red-500"></i> Ayak Basınç Analizi (AI)
                </button>"""

new_btn = """                <button onclick="switchTab('simulationTab')" id="btn_simulationTab" class="tab-btn pb-3 text-slate-600 font-medium px-2 whitespace-nowrap">
                    <i class="fa-solid fa-cube text-emerald-500 mr-2"></i> 3D Simülasyon
                </button>
                <button onclick="switchTab('footTab')" id="btn_footTab" class="tab-btn pb-3 text-slate-600 font-medium px-2 whitespace-nowrap">
                    <i class="fa-solid fa-shoe-prints mr-2 text-red-500"></i> Ayak Basınç Analizi (AI)
                </button>"""

if old_btn in html:
    html = html.replace(old_btn, new_btn)
    with open("frontend/index.html", "w") as f:
        f.write(html)
    print("Added 3D Sim tab button.")
else:
    print("Could not find footTab button.")
