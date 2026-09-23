with open("frontend/scoliosis.js", "r") as f:
    js = f.read()

funcs = """
async function loadScoliosisAssignedExercises() {
    if(!currentScoliosisId) return;
    const tbody = document.getElementById('scoliosisAssignedExercisesList');
    tbody.innerHTML = '<tr><td colspan="5" class="text-center py-4"><i class="fa-solid fa-spinner fa-spin text-indigo-500"></i></td></tr>';
    
    try {
        const res = await authFetch(`/api/scoliosis/${currentScoliosisId}/exercises`);
        const data = await res.json();
        
        if(!data.exercises || data.exercises.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" class="text-center py-8 text-slate-400">Henüz egzersiz atanmamış.</td></tr>';
            return;
        }
        
        let html = '';
        data.exercises.forEach(ex => {
            html += `
            <tr class="hover:bg-slate-50 transition-colors">
                <td class="px-4 py-3">
                    <div class="w-12 h-12 bg-white rounded-lg border border-slate-200 overflow-hidden flex items-center justify-center shadow-sm">
                        <img src="/api/exercises/${ex.exercise_id}/image" onerror="this.outerHTML='<i class=\\'fa-solid fa-person-running text-slate-300\\'></i>'" class="w-full h-full object-cover">
                    </div>
                </td>
                <td class="px-4 py-3">
                    <div class="font-bold text-slate-800 text-sm">${ex.name}</div>
                    <div class="text-xs text-slate-500">${ex.category}</div>
                </td>
                <td class="px-4 py-3">
                    <input type="text" value="${ex.sets}" onchange="updateScoliosisExercise(${ex.id}, this, 'sets')" class="w-16 p-1 text-sm border-slate-200 rounded focus:ring-indigo-500 focus:border-indigo-500 text-center bg-white shadow-inner">
                </td>
                <td class="px-4 py-3">
                    <input type="text" value="${ex.reps}" onchange="updateScoliosisExercise(${ex.id}, this, 'reps')" class="w-20 p-1 text-sm border-slate-200 rounded focus:ring-indigo-500 focus:border-indigo-500 text-center bg-white shadow-inner">
                </td>
                <td class="px-4 py-3 text-center">
                    <button onclick="deleteScoliosisExercise(${ex.id})" class="text-red-400 hover:text-red-600 bg-red-50 hover:bg-red-100 p-2 rounded-lg transition-colors">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </td>
            </tr>`;
        });
        tbody.innerHTML = html;
        
    } catch(e) {
        console.error(e);
        tbody.innerHTML = '<tr><td colspan="5" class="text-center py-4 text-red-500">Yüklenemedi</td></tr>';
    }
}

async function updateScoliosisExercise(assignId, inputEl, field) {
    const val = inputEl.value;
    // We fetch current to send both sets and reps
    const tr = inputEl.closest('tr');
    const sets = field === 'sets' ? val : tr.querySelector('input[onchange*="\\'sets\\'"]').value;
    const reps = field === 'reps' ? val : tr.querySelector('input[onchange*="\\'reps\\'"]').value;
    
    try {
        await authFetch(`/api/scoliosis/${currentScoliosisId}/exercises/${assignId}`, {
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({ sets: sets, reps: reps })
        });
        showToast("Güncellendi.");
    } catch(e) {
        console.error(e);
    }
}

async function deleteScoliosisExercise(assignId) {
    if(!confirm("Silmek istediğinize emin misiniz?")) return;
    try {
        await authFetch(`/api/scoliosis/${currentScoliosisId}/exercises/${assignId}`, { method: 'DELETE' });
        loadScoliosisAssignedExercises();
    } catch(e) {
        console.error(e);
    }
}

async function suggestScoliosisExercises() {
    if(!currentScoliosisId) { alert("Önce resmi kaydedin."); return; }
    if(currentCobbAngle === 0) { alert("Açıyı hesaplayın."); return; }
    
    const btn = document.getElementById('btnSuggestScoliosisExercises');
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i>Öneriliyor...';
    btn.disabled = true;
    
    try {
        const res = await authFetch(`/api/scoliosis/${currentScoliosisId}/exercises/suggest`, { method: 'POST' });
        if(res.ok) {
            showToast("Yapay zeka egzersizleri başarıyla atandı!");
            loadScoliosisAssignedExercises();
        } else {
            alert("Hata oluştu.");
        }
    } catch(e) {
        console.error(e);
    } finally {
        btn.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles mr-2"></i>AI Egzersiz Öner';
        btn.disabled = false;
    }
}
"""

if "function loadScoliosisAssignedExercises" not in js:
    js += "\n" + funcs
    
    # Also we need to call loadScoliosisAssignedExercises inside loadScoliosisHistory item click
    old_click = "document.getElementById('scoliosisNotes').value = item.clinical_notes || '';"
    new_click = old_click + "\n        loadScoliosisAssignedExercises();"
    js = js.replace(old_click, new_click)
    
    with open("frontend/scoliosis.js", "w") as f:
        f.write(js)
