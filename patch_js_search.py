import re

with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/app.js', 'r') as f:
    js = f.read()

# Replace purple with indigo
js = js.replace('purple-600', 'indigo-900')
js = js.replace('purple-500', 'indigo-700')
js = js.replace('purple-100', 'indigo-100')

# Rewrite fetchPatients, renderPatients, loadMorePatients
old_patients_logic_match = re.search(r'async function fetchPatients\(\) \{.*?\}\n\n// HASTA KAYIT İŞLEMİ', js, re.DOTALL)
if old_patients_logic_match:
    old_patients_logic = old_patients_logic_match.group(0)
    
    new_patients_logic = """let allPatients = [];
let visiblePatientCount = 20;

async function fetchPatients() {
    try {
        const res = await fetch('/api/patients');
        const data = await res.json();
        // Varsayilan olarak id'ye gore azalan sirala (en yeni en ustte)
        allPatients = data.sort((a,b) => b.id - a.id);
        renderPatients();
    } catch(err) {
        showToast("Hastalar yüklenemedi: " + err.message);
    }
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
        <tr class="hover:bg-slate-50 transition-colors">
            <td class="py-4 text-slate-500 px-2">#${p.id}</td>
            <td class="py-4 font-bold text-slate-800 px-2">${p.name}</td>
            <td class="py-4 text-slate-600 px-2">${p.age} Yaş, ${p.weight} kg</td>
            <td class="py-4 text-slate-600 px-2">${p.phone || '-'}</td>
            <td class="py-4 text-right px-2">
                <button onclick="deletePatient(${p.id})" class="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors" title="Hastayı Sil">
                    <i class="fa-solid fa-trash"></i>
                </button>
                <button onclick="loadPatientData(${p.id})" class="ml-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-900 px-4 py-2 rounded-lg font-semibold transition-colors text-xs">
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

// HASTA KAYIT İŞLEMİ"""
    
    js = js.replace(old_patients_logic, new_patients_logic)

# In createPatient, we need to hide the modal and reset visible count
old_create_patient_end = """        loadPatientData(data.patient_id);
    } catch(err) {"""
    
new_create_patient_end = """        
        const modal = document.getElementById('newPatientModal');
        if(modal) modal.classList.add('hidden');
        
        visiblePatientCount = 20;
        await fetchPatients();
        loadPatientData(data.patient_id);
    } catch(err) {"""

js = js.replace(old_create_patient_end, new_create_patient_end)

with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/app.js', 'w') as f:
    f.write(js)
print("app.js logic updated.")
