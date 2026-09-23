import re

with open("frontend/app.js", "r") as f:
    js = f.read()

# Introduce currentExerciseContext
if "let currentExerciseContext = 'posture';" not in js:
    js = "let currentExerciseContext = 'posture';\n" + js

# Patch openExerciseModal
old_open = """async function openExerciseModal() {
    if(!currentAnalysisId) {
        alert("Önce bir analiz seçmelisiniz."); return;
    }
    document.getElementById('exerciseModal').classList.remove('hidden');
    await loadLibrary();
    activeCategory = null;
    document.getElementById('exerciseSearch').value = '';
    renderCategories();
}"""

new_open = """async function openExerciseModal(context = 'posture') {
    currentExerciseContext = context;
    if(context === 'posture' && !currentAnalysisId) {
        alert("Önce bir analiz seçmelisiniz."); return;
    }
    if(context === 'scoliosis' && typeof currentScoliosisId !== 'undefined' && !currentScoliosisId) {
        alert("Önce resmi kaydetmelisiniz."); return;
    }
    document.getElementById('exerciseModal').classList.remove('hidden');
    await loadLibrary();
    activeCategory = null;
    document.getElementById('exerciseSearch').value = '';
    renderCategories();
}"""
js = js.replace(old_open, new_open)

# Patch addPrescribed
old_add = """async function addPrescribed(exerciseId) {
    try {
        const res = await authFetch(`/api/posture/${currentAnalysisId}/exercises`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ exercise_id: exerciseId, sets: "3", reps: "10-12" })
        });
        if(res.ok) {
            // Animasyon veya toast gösterilebilir
            loadPrescribedExercises();
        }
    } catch(e) {
        console.error("Add error", e);
    }
}"""

new_add = """async function addPrescribed(exerciseId) {
    try {
        let url = "";
        if (currentExerciseContext === 'posture') {
            url = `/api/posture/${currentAnalysisId}/exercises`;
        } else if (currentExerciseContext === 'scoliosis') {
            url = `/api/scoliosis/${currentScoliosisId}/exercises`;
        }
        
        const res = await authFetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ exercise_id: exerciseId, sets: "3", reps: "10" })
        });
        if(res.ok) {
            if (currentExerciseContext === 'posture') {
                loadPrescribedExercises();
            } else if (currentExerciseContext === 'scoliosis') {
                if (typeof loadScoliosisAssignedExercises === 'function') loadScoliosisAssignedExercises();
            }
            showToast("Egzersiz başarıyla eklendi.");
        }
    } catch(e) {
        console.error("Add error", e);
    }
}"""
js = js.replace(old_add, new_add)

with open("frontend/app.js", "w") as f:
    f.write(js)
