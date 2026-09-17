import re

with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/index.html', 'r') as f:
    html = f.read()

# Add a select dropdown next to "Yeni Analiz Yükle"
old_buttons = """                        <button onclick="document.getElementById('postureUploadSection').classList.toggle('hidden')" class="text-sm bg-slate-200 hover:bg-slate-300 px-4 py-2 rounded-lg font-bold text-slate-700 shadow-sm transition">Yeni Analiz Yükle</button>"""

new_buttons = """                        <div class="flex items-center gap-3">
                            <select id="analysisHistorySelect" onchange="loadHistoricalAnalysis(this.value)" class="text-sm bg-white border border-slate-200 px-4 py-2 rounded-lg font-bold text-indigo-900 shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-900 cursor-pointer">
                                <!-- Seçenekler JS ile dolacak -->
                            </select>
                            <button onclick="document.getElementById('postureUploadSection').classList.toggle('hidden')" class="text-sm bg-slate-200 hover:bg-slate-300 px-4 py-2 rounded-lg font-bold text-slate-700 shadow-sm transition">Yeni Analiz Yükle</button>
                        </div>"""

if old_buttons in html:
    html = html.replace(old_buttons, new_buttons)
    with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/index.html', 'w') as f:
        f.write(html)
    print("HTML History select added.")
else:
    print("HTML replace failed.")

# Update app.js
with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/app.js', 'r') as f:
    js = f.read()

# Add global array for analyses
js = js.replace('let currentPatientId = null;', 'let currentPatientId = null;\nlet currentPatientAnalyses = [];')

# Rewrite loadPatientData
old_load = re.search(r'async function loadPatientData.*?setupDragEvents\(\'canvas_right\', \'right\'\);', js, re.DOTALL).group(0)

new_load = """async function loadPatientData(id) {
    // Reset Views
    document.getElementById('postureResultsSection').classList.add('hidden');
    document.getElementById('postureUploadSection').classList.remove('hidden');
    document.getElementById('footResultsSection').classList.add('hidden');
    globalPostureState = { front: null, back: null, left: null, right: null };

    try {
        const res = await fetch(`/api/patients/${id}`);
        const data = await res.json();
        
        // Load Posture (Latest)
        if(data.posture_analyses && data.posture_analyses.length > 0) {
            currentPatientAnalyses = data.posture_analyses;
            
            // Tarih Dropdown'unu doldur
            const selectEl = document.getElementById('analysisHistorySelect');
            if(selectEl) {
                selectEl.innerHTML = '';
                currentPatientAnalyses.forEach((analysis, index) => {
                    const dateObj = new Date(analysis.created_at + 'Z');
                    const dateStr = dateObj.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute:'2-digit' });
                    const label = index === 0 ? `En Güncel (${dateStr})` : `Geçmiş: ${dateStr}`;
                    selectEl.innerHTML += `<option value="${index}">${label}</option>`;
                });
                selectEl.value = "0"; // En günceli seç
            }
            
            // İlk (en güncel) analizi ekrana bas
            renderHistoricalAnalysis(0);
        }
    } catch(err) {
        showToast("Hasta verileri alınamadı!");
    }
}

function loadHistoricalAnalysis(indexStr) {
    const index = parseInt(indexStr);
    renderHistoricalAnalysis(index);
}

function renderHistoricalAnalysis(index) {
    if(currentPatientAnalyses.length <= index) return;
    
    const targetAnalysis = currentPatientAnalyses[index];
    const parsed = JSON.parse(targetAnalysis.analysis_data);
    
    globalPostureState = {
        front: parsed.front || null,
        back: parsed.back || null,
        left: parsed.left || null,
        right: parsed.right || null
    };
    
    document.getElementById('postureResultsSection').classList.remove('hidden');
    document.getElementById('postureUploadSection').classList.add('hidden');
    
    // Rapor Tarihini Güncelle
    const dateObj = new Date(targetAnalysis.created_at + 'Z');
    const dateStr = dateObj.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute:'2-digit' });
    const reportDateEl = document.getElementById('reportDate');
    if(reportDateEl) reportDateEl.innerText = "Oluşturma Tarihi: " + dateStr;
    
    setupDragEvents('canvas_front', 'front');
    setupDragEvents('canvas_back', 'back');
    setupDragEvents('canvas_left', 'left');
    setupDragEvents('canvas_right', 'right');
"""

js = js.replace(old_load, new_load)

# We need to make sure images load with the targetAnalysis images!
# Oh wait, loadImg in app.js relies on targetAnalysis.front_image_path!
# I need to update the loadImg block which is right under setupDragEvents

# Wait, let's find the loadImg block in loadPatientData!
# Actually, the original loadPatientData had:
#             let imagesToLoad = 0;
#             let loadedCount = 0;
#             const loadImg = (viewName, path) => { ... }
#             loadImg('front', latest.front_image_path);
#             loadImg('back', latest.back_image_path);
#             loadImg('left', latest.left_image_path);
#             loadImg('right', latest.right_image_path);
#             if(imagesToLoad === 0) refreshAllCanvases();
