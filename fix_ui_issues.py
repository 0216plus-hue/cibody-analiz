import re

with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/index.html', 'r') as f:
    html = f.read()

# 1. Add "Analizi Başlat" button to Navbar
old_nav = """            <div id="navPatientName" class="hidden font-semibold text-indigo-800 bg-indigo-100 px-4 py-1 rounded-full"></div>
        </div>
    </nav>"""
    
new_nav = """            <div class="flex items-center gap-4">
                <div id="navPatientName" class="hidden font-semibold text-indigo-800 bg-indigo-100 px-4 py-1 rounded-full"></div>
                <button onclick="document.getElementById('newPatientModal').classList.remove('hidden')" class="bg-indigo-900 hover:bg-indigo-800 text-white px-5 py-2 rounded-xl font-medium transition-colors shadow-sm flex items-center gap-2 text-sm">
                    <i class="fa-solid fa-user-plus"></i> <span class="hidden md:inline">Yeni Kayıt (Analizi Başlat)</span>
                </button>
            </div>
        </div>
    </nav>"""

if old_nav in html:
    html = html.replace(old_nav, new_nav)
    print("Navbar fixed.")
else:
    print("Navbar NOT fixed, strings didn't match.")

# 2. Update Table Headers in HTML
old_thead = """                        <thead>
                            <tr class="border-b border-slate-200 text-xs font-bold text-slate-400 uppercase tracking-wider">
                                <th class="pb-4 font-semibold px-2">ID</th>
                                <th class="pb-4 font-semibold px-2">Hasta Adı</th>
                                <th class="pb-4 font-semibold px-2">Profil</th>
                                <th class="pb-4 font-semibold px-2">İletişim</th>
                                <th class="pb-4 font-semibold px-2 text-right">İşlem</th>
                            </tr>
                        </thead>"""

new_thead = """                        <thead>
                            <tr class="border-b border-slate-200 text-xs font-bold text-slate-400 uppercase tracking-wider">
                                <th class="pb-4 font-semibold px-2 w-10 text-center">Sil</th>
                                <th class="pb-4 font-semibold px-2">ID</th>
                                <th class="pb-4 font-semibold px-2">Hasta Adı</th>
                                <th class="pb-4 font-semibold px-2">Profil</th>
                                <th class="pb-4 font-semibold px-2">İletişim</th>
                                <th class="pb-4 font-semibold px-2 text-right">İşlem</th>
                            </tr>
                        </thead>"""

if old_thead in html:
    html = html.replace(old_thead, new_thead)
    print("Table headers fixed.")
else:
    print("Table headers NOT fixed.")

with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/index.html', 'w') as f:
    f.write(html)


# 3. Update app.js renderPatients
with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/app.js', 'r') as f:
    js = f.read()

old_tr = """        <tr class="hover:bg-slate-50 transition-colors border-b border-slate-50">
            <td class="py-4 text-slate-500 px-2 align-middle">#${p.id}</td>
            <td class="py-4 font-bold text-slate-800 px-2 align-middle">${p.name}</td>
            <td class="py-4 text-slate-600 px-2 align-middle">${p.age} Yaş, ${p.weight} kg</td>
            <td class="py-4 text-slate-600 px-2 align-middle font-medium">${p.phone || '-'}</td>
            <td class="py-4 text-right px-2 align-middle flex justify-end gap-2">
                <button onclick="deletePatient(${p.id})" class="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors flex items-center justify-center" title="Hastayı Sil">
                    <i class="fa-solid fa-trash"></i>
                </button>
                <button onclick="showPatient(${p.id}, '${p.name}', ${p.age}, ${p.weight}, '${p.gender}', '${p.phone || ''}')" class="bg-indigo-50 hover:bg-indigo-100 text-indigo-900 px-4 py-2 rounded-lg font-semibold transition-colors text-xs flex items-center justify-center">
                    Profili Aç
                </button>
            </td>
        </tr>"""

new_tr = """        <tr class="hover:bg-slate-50 transition-colors border-b border-slate-50">
            <td class="py-4 px-2 align-middle text-center">
                <button onclick="deletePatient(${p.id})" class="text-slate-300 hover:text-red-600 hover:bg-red-50 w-8 h-8 rounded-lg transition-colors flex items-center justify-center mx-auto" title="Hastayı Sil">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
            <td class="py-4 text-slate-500 px-2 align-middle font-medium">#${p.id}</td>
            <td class="py-4 font-bold text-slate-800 px-2 align-middle">${p.name}</td>
            <td class="py-4 text-slate-600 px-2 align-middle">${p.age} Yaş, ${p.weight} kg</td>
            <td class="py-4 text-slate-600 px-2 align-middle font-medium">${p.phone || '-'}</td>
            <td class="py-4 text-right px-2 align-middle">
                <button onclick="showPatient(${p.id}, '${p.name}', ${p.age}, ${p.weight}, '${p.gender}', '${p.phone || ''}')" class="bg-indigo-900 hover:bg-indigo-800 text-white px-5 py-2 rounded-lg font-bold transition-colors text-sm inline-flex items-center justify-center shadow-sm">
                    Profili Aç <i class="fa-solid fa-arrow-right ml-2"></i>
                </button>
            </td>
        </tr>"""

if old_tr in js:
    js = js.replace(old_tr, new_tr)
    # also fix the colspan from 5 to 6
    js = js.replace('colspan="5"', 'colspan="6"')
    print("app.js renderPatients fixed.")
else:
    print("app.js renderPatients NOT fixed.")

with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/app.js', 'w') as f:
    f.write(js)

