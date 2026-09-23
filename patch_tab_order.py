with open("frontend/index.html", "r") as f:
    html = f.read()

old_buttons = """                <button onclick="switchTab('scoliosisTab')" id="btn_scoliosisTab" class="tab-btn pb-3 text-slate-600 font-medium px-2 whitespace-nowrap">
                    <i class="fa-solid fa-bone text-lg"></i> Cobb Analizi (AI)
                </button>
                <button onclick="switchTab('footTab')" id="btn_footTab" class="tab-btn pb-3 text-slate-600 font-medium px-2 whitespace-nowrap">
                    <i class="fa-solid fa-shoe-prints mr-2 text-red-500"></i> Ayak Basınç Analizi (AI)
                </button>
                <button onclick="switchTab('scoliometerTab')" id="btn_scoliometerTab" class="tab-btn pb-3 text-slate-600 font-medium px-2 whitespace-nowrap">
                    <i class="fa-solid fa-mobile-screen text-indigo-500 mr-2"></i> Skolyometre
                </button>"""

new_buttons = """                <button onclick="switchTab('scoliosisTab')" id="btn_scoliosisTab" class="tab-btn pb-3 text-slate-600 font-medium px-2 whitespace-nowrap">
                    <i class="fa-solid fa-bone text-lg"></i> Cobb Analizi (AI)
                </button>
                <button onclick="switchTab('scoliometerTab')" id="btn_scoliometerTab" class="tab-btn pb-3 text-slate-600 font-medium px-2 whitespace-nowrap">
                    <i class="fa-solid fa-mobile-screen text-indigo-500 mr-2"></i> Skolyometre
                </button>
                <button onclick="switchTab('footTab')" id="btn_footTab" class="tab-btn pb-3 text-slate-600 font-medium px-2 whitespace-nowrap">
                    <i class="fa-solid fa-shoe-prints mr-2 text-red-500"></i> Ayak Basınç Analizi (AI)
                </button>"""

if old_buttons in html:
    html = html.replace(old_buttons, new_buttons)
    with open("frontend/index.html", "w") as f:
        f.write(html)
    print("Tab order updated successfully.")
else:
    print("Could not find the exact old_buttons string.")
