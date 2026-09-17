import re

with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/index.html', 'r') as f:
    html = f.read()

# 3 & 4: Move "Yeni Kayıt" button to Navbar, change to "Analizi Başlat", increase search bar width.
old_nav = """        <div class="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
            <div class="flex items-center space-x-3 cursor-pointer" onclick="showDashboard()">
                <img src="/assets/logo.png" class="h-10 w-auto object-contain" alt="CIBODY Logo">
                <h1 class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-900 to-indigo-600">
                    CIBODY AI <span class="text-sm text-slate-400 font-normal">v2.1 CRM</span>
                </h1>
            </div>
            <div id="navPatientName" class="hidden text-sm font-bold text-indigo-900 bg-indigo-50 px-4 py-2 rounded-full shadow-sm border border-indigo-100"></div>
        </div>"""

new_nav = """        <div class="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
            <div class="flex items-center space-x-3 cursor-pointer" onclick="showDashboard()">
                <img src="/assets/logo.png" class="h-10 w-auto object-contain" alt="CIBODY Logo">
                <h1 class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-900 to-indigo-600">
                    CIBODY AI <span class="text-sm text-slate-400 font-normal">v2.1 CRM</span>
                </h1>
            </div>
            <div class="flex items-center gap-4">
                <div id="navPatientName" class="hidden text-sm font-bold text-indigo-900 bg-indigo-50 px-4 py-2 rounded-full shadow-sm border border-indigo-100"></div>
                <button onclick="document.getElementById('newPatientModal').classList.remove('hidden')" class="bg-indigo-900 hover:bg-indigo-800 text-white px-5 py-2 rounded-xl font-medium transition-colors shadow-sm flex items-center gap-2 text-sm">
                    <i class="fa-solid fa-play"></i> <span class="hidden md:inline">Analizi Başlat</span>
                </button>
            </div>
        </div>"""
html = html.replace(old_nav, new_nav)

# Remove the old "Yeni Kayıt" button from the Dashboard header and widen search bar
old_search = """                    <div class="flex w-full md:w-auto items-center gap-3">
                        <div class="relative w-full md:w-64">
                            <i class="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                            <input type="text" id="patientSearch" oninput="renderPatients()" placeholder="Hasta Ara (İsim veya Tel)..." class="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-900 focus:ring-1 focus:ring-indigo-900 transition-all text-sm">
                        </div>
                        <button onclick="document.getElementById('newPatientModal').classList.remove('hidden')" class="shrink-0 bg-indigo-900 hover:bg-indigo-800 text-white px-5 py-2 rounded-xl font-medium transition-colors shadow-sm flex items-center gap-2 text-sm">
                            <i class="fa-solid fa-user-plus"></i> <span class="hidden md:inline">Yeni Kayıt</span>
                        </button>
                    </div>"""

new_search = """                    <div class="flex w-full md:w-auto items-center gap-3">
                        <div class="relative w-full md:w-96">
                            <i class="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                            <input type="text" id="patientSearch" oninput="renderPatients()" placeholder="Hasta Ara (İsim veya Tel)..." class="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-900 focus:ring-1 focus:ring-indigo-900 transition-all text-sm">
                        </div>
                    </div>"""
html = html.replace(old_search, new_search)

with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/index.html', 'w') as f:
    f.write(html)
print("index.html fixed.")


with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/app.js', 'r') as f:
    js = f.read()

# 1 & 2: Fix JS fetchPatients and add renderPatients
old_fetch = re.search(r'async function fetchPatients\(\) \{[\s\S]*?async function createPatient', js).group(0)

new_fetch = """let allPatients = [];
let visiblePatientCount = 20;

async function fetchPatients() {
    try {
        const res = await fetch('/api/patients');
        const data = await res.json();
        // Backend id desc olarak yolluyor, yine de garanti olsun.
        allPatients = data;
        renderPatients();
    } catch(err) { showToast("Hastalar yüklenemedi: " + err.message); }
}

function renderPatients() {
    const tbody = document.getElementById('patientTableBody');
    const searchInput = document.getElementById('patientSearch');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    if (!tbody) return;

    let filtered = allPatients;
    
    if (searchInput && searchInput.value.trim() !== '') {
        const q = searchInput.value.trim().toLowerCase();
        filtered = allPatients.filter(p => 
            p.name.toLowerCase().includes(q) || 
            (p.phone && p.phone.includes(q))
        );
    }
    
    const toShow = filtered.slice(0, visiblePatientCount);
    
    if (filtered.length > visiblePatientCount) {
        if (loadMoreBtn) loadMoreBtn.classList.remove('hidden');
    } else {
        if (loadMoreBtn) loadMoreBtn.classList.add('hidden');
    }

    if(toShow.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center py-8 text-slate-500">Kayıtlı hasta bulunamadı.</td></tr>';
        return;
    }

    tbody.innerHTML = toShow.map(p => `
        <tr class="hover:bg-slate-50 transition-colors border-b border-slate-50">
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
        </tr>
    `).join('');
}

function loadMorePatients() {
    visiblePatientCount += 20;
    renderPatients();
}

async function createPatient"""

js = js.replace(old_fetch, new_fetch)

# Fix createPatient to close modal and refresh
old_create_end = """        if(res.ok) {
            showPatient(data.patient_id, document.getElementById('p_name').value, document.getElementById('p_age').value, document.getElementById('p_weight').value, document.getElementById('p_gender').value, document.getElementById('p_phone').value);
            document.getElementById('newPatientForm').reset();
        } else showToast(data.detail || "Kayıt hatası");"""

new_create_end = """        if(res.ok) {
            const modal = document.getElementById('newPatientModal');
            if(modal) modal.classList.add('hidden');
            visiblePatientCount = 20;
            await fetchPatients();
            showPatient(data.patient_id, document.getElementById('p_name').value, document.getElementById('p_age').value, document.getElementById('p_weight').value, document.getElementById('p_gender').value, document.getElementById('p_phone').value);
            document.getElementById('newPatientForm').reset();
        } else showToast(data.detail || "Kayıt hatası");"""

js = js.replace(old_create_end, new_create_end)

with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/app.js', 'w') as f:
    f.write(js)
print("app.js fixed.")
