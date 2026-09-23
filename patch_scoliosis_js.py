with open("frontend/scoliosis.js", "r") as f:
    js = f.read()

new_js = """
async function generateScoliosisExerciseAi() {
    if (!currentScoliosisId) { alert("Önce resmi kaydedin."); return; }
    if (currentCobbAngle === 0) { alert("Lütfen önce resme 4 nokta koyarak Cobb açısını hesaplayın."); return; }
    
    const btn = document.getElementById('btnGenerateScoliosisExerciseAi');
    const reportArea = document.getElementById('scoliosisAiReport');
    
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-1"></i> Üretiliyor...';
    btn.disabled = true;
    reportArea.innerHTML = '<div class="text-center py-4"><i class="fa-solid fa-person-running fa-bounce text-emerald-500 text-3xl mb-2"></i><p class="font-medium text-emerald-700">Yapay Zeka bu dereceye uygun egzersizleri planlıyor...</p></div>';
    
    try {
        const res = await authFetch(`/api/scoliosis/${currentScoliosisId}/generate-exercises`, { method: 'POST' });
        if (res.ok) {
            const data = await res.json();
            reportArea.innerHTML = typeof marked !== 'undefined' ? marked.parse(data.report) : data.report;
            showToast("AI Egzersiz Programı başarıyla eklendi.");
            loadScoliosisHistory();
        } else {
            reportArea.innerText = "Yapay zeka servisi yanıt vermedi.";
        }
    } catch(e) {
        reportArea.innerText = "Bağlantı hatası.";
    } finally {
        btn.innerHTML = '<i class="fa-solid fa-person-running mr-1"></i>AI Egzersiz Öner';
        btn.disabled = false;
    }
}
"""

js += "\n" + new_js

# Also fix marked in normal report
old_ai = "reportArea.innerText = data.report;"
new_ai = "reportArea.innerHTML = typeof marked !== 'undefined' ? marked.parse(data.report) : data.report;"
js = js.replace(old_ai, new_ai)

with open("frontend/scoliosis.js", "w") as f:
    f.write(js)
