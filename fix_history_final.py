import re

with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/app.js', 'r') as f:
    js = f.read()

# I will replace EVERYTHING from 'async function loadPatientData(id)' down to the end of '// POSTÜR VE FOTOĞRAF İŞLEMLERİ'
match = re.search(r'async function loadPatientData\(id\) \{[\s\S]*?(?=// POSTÜR VE FOTOĞRAF İŞLEMLERİ)', js)
if not match:
    print("Could not find the block to replace!")
    exit(1)

new_code = """async function loadPatientData(id) {
    // Reset Views
    document.getElementById('postureResultsSection').classList.add('hidden');
    document.getElementById('postureUploadSection').classList.remove('hidden');
    document.getElementById('footResultsSection').classList.add('hidden');
    globalPostureState = { front: null, back: null, left: null, right: null };

    try {
        const res = await fetch(`/api/patients/${id}`);
        const data = await res.json();
        
        // Load Posture (Latest & History)
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
        
        // Load Foot (Latest)
        if(data.foot_analyses && data.foot_analyses.length > 0) {
            const latestFoot = data.foot_analyses[0];
            document.getElementById('footResultsSection').classList.remove('hidden');
            document.getElementById('footReportContent').innerHTML = marked.parse(latestFoot.ai_report_text);
            document.getElementById('btnDownloadPdf').href = "/" + latestFoot.original_pdf_path.replace(/\\\\/g, '/');
        }
    } catch(err) { console.error("Data load err:", err); }
}

function loadHistoricalAnalysis(indexStr) {
    const index = parseInt(indexStr);
    renderHistoricalAnalysis(index);
}

function renderHistoricalAnalysis(index) {
    if(!currentPatientAnalyses || currentPatientAnalyses.length <= index) return;
    
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

    let imagesToLoad = 0;
    let loadedCount = 0;
    const loadImg = (viewName, path) => {
        if(!path) return;
        imagesToLoad++;
        let imgEl = document.getElementById('orig_img_' + viewName);
        if(!imgEl) {
            imgEl = new Image();
            imgEl.id = 'orig_img_' + viewName;
            imgEl.className = 'hidden';
            document.body.appendChild(imgEl);
        }
        imgEl.onload = () => {
            loadedCount++;
            if(loadedCount === imagesToLoad) refreshAllCanvases();
        };
        imgEl.onerror = () => {
            console.error("Resim yuklenemedi: " + path);
            loadedCount++;
            if(loadedCount === imagesToLoad) refreshAllCanvases();
        };
        imgEl.src = "/" + path.replace(/\\\\/g, '/');
    };

    if(targetAnalysis.front_image_path) loadImg('front', targetAnalysis.front_image_path);
    if(targetAnalysis.back_image_path) loadImg('back', targetAnalysis.back_image_path);
    if(targetAnalysis.left_image_path) loadImg('left', targetAnalysis.left_image_path);
    if(targetAnalysis.right_image_path) loadImg('right', targetAnalysis.right_image_path);

    if(imagesToLoad === 0) refreshAllCanvases(); 
}

"""

js = js.replace(match.group(0), new_code)
with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/app.js', 'w') as f:
    f.write(js)
print("Complete fix applied.")
