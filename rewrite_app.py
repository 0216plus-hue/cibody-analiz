import re

new_app_js = """
let globalPostureState = { front: null, back: null, left: null, right: null };
let currentPatientId = null;
let isDragging = false;
let draggedPointKey = null;
let currentDragView = null;

// GÖRÜNÜM KONTROLLERİ
function showDashboard() {
    document.getElementById('dashboardView').classList.remove('hidden');
    document.getElementById('patientView').classList.add('hidden');
    document.getElementById('navPatientName').classList.add('hidden');
    fetchPatients();
}

function showPatient(patientId, patientName, patientAge, patientWeight, patientGender) {
    currentPatientId = patientId;
    document.getElementById('dashboardView').classList.add('hidden');
    document.getElementById('patientView').classList.remove('hidden');
    document.getElementById('navPatientName').classList.remove('hidden');
    document.getElementById('navPatientName').innerText = patientName;
    
    document.getElementById('detailName').innerText = patientName;
    document.getElementById('detailInfo').innerText = `Yaş: ${patientAge} | Kilo: ${patientWeight}kg | Cinsiyet: ${patientGender}`;
    
    switchTab('postureTab');
    loadPatientData(patientId);
}

function switchTab(tabId) {
    document.getElementById('postureTab').classList.add('hidden');
    document.getElementById('footTab').classList.add('hidden');
    document.getElementById('btn_postureTab').classList.remove('active');
    document.getElementById('btn_footTab').classList.remove('active');
    
    document.getElementById(tabId).classList.remove('hidden');
    document.getElementById('btn_' + tabId).classList.add('active');
}

function showToast(msg) {
    const toast = document.getElementById('toastNotification');
    document.getElementById('toastMessage').innerText = msg;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 3000);
}

// API İŞLEMLERİ (HASTA)
async function fetchPatients() {
    try {
        const res = await fetch('/api/patients');
        const patients = await res.json();
        const tbody = document.getElementById('patientTableBody');
        tbody.innerHTML = '';
        if(patients.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4" class="text-center py-4 text-slate-500">Kayıtlı hasta bulunamadı.</td></tr>';
            return;
        }
        patients.forEach(p => {
            tbody.innerHTML += `
                <tr class="hover:bg-slate-50">
                    <td class="px-4 py-3 whitespace-nowrap text-sm text-slate-500">#${p.id}</td>
                    <td class="px-4 py-3 whitespace-nowrap text-sm font-bold text-slate-800">${p.name}</td>
                    <td class="px-4 py-3 whitespace-nowrap text-sm text-slate-500">${p.age} Yaş, ${p.weight} kg</td>
                    <td class="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                        <button onclick="showPatient(${p.id}, '${p.name}', ${p.age}, ${p.weight}, '${p.gender}')" class="text-purple-600 hover:text-purple-900 bg-purple-100 px-3 py-1 rounded-md">Profili Aç</button>
                    </td>
                </tr>
            `;
        });
    } catch(err) { showToast("Hastalar yüklenemedi!"); }
}

async function createPatient(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', document.getElementById('p_name').value);
    formData.append('age', document.getElementById('p_age').value || 0);
    formData.append('weight', document.getElementById('p_weight').value || 0);
    formData.append('gender', document.getElementById('p_gender').value || 'Erkek');

    try {
        const res = await fetch('/api/patients', { method: 'POST', body: formData });
        const data = await res.json();
        if(res.ok) {
            showPatient(data.patient_id, document.getElementById('p_name').value, document.getElementById('p_age').value, document.getElementById('p_weight').value, document.getElementById('p_gender').value);
            document.getElementById('newPatientForm').reset();
        } else showToast(data.detail || "Kayıt hatası");
    } catch(err) { showToast("Kayıt hatası!"); }
}

async function loadPatientData(id) {
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
            const latest = data.posture_analyses[0];
            const parsed = JSON.parse(latest.analysis_data);
            globalPostureState = {
                front: parsed.front || null,
                back: parsed.back || null,
                left: parsed.left || null,
                right: parsed.right || null
            };
            document.getElementById('postureResultsSection').classList.remove('hidden');
            document.getElementById('postureUploadSection').classList.add('hidden');
            
            setupDragEvents('canvas_front', 'front');
            setupDragEvents('canvas_back', 'back');
            setupDragEvents('canvas_left', 'left');
            setupDragEvents('canvas_right', 'right');
            refreshAllCanvases();
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

// POSTÜR VE FOTOĞRAF İŞLEMLERİ
function previewImage(input, previewId) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.getElementById(previewId);
            img.src = e.target.result;
            img.classList.remove('hidden');
            document.getElementById('placeholder_' + previewId.replace('preview_', '')).classList.add('hidden');
            
            // Orig img'ye de yükle
            const orig = document.getElementById('orig_img_' + previewId.replace('preview_', ''));
            if(orig) orig.src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
}

async function runPostureAnalysis() {
    const formData = new FormData();
    formData.append('patient_id', currentPatientId);

    const f = document.getElementById('img_front').files[0];
    const b = document.getElementById('img_back').files[0];
    const l = document.getElementById('img_left').files[0];
    const r = document.getElementById('img_right').files[0];

    if(!f && !b && !l && !r) return showToast("En az 1 fotoğraf yükleyin.");
    
    if(f) formData.append('front_image', f);
    if(b) formData.append('back_image', b);
    if(l) formData.append('left_image', l);
    if(r) formData.append('right_image', r);

    document.getElementById('postureLoadingState').classList.remove('hidden');
    
    try {
        const res = await fetch('/api/posture/analyze', { method: 'POST', body: formData });
        const data = await res.json();
        if(!res.ok) throw new Error(data.detail);
        
        loadPatientData(currentPatientId); // Yeniden yükle
    } catch(err) { showToast(err.message); }
    finally { document.getElementById('postureLoadingState').classList.add('hidden'); }
}

// AYAK ANALİZİ İŞLEMİ
async function runFootAnalysis(e) {
    e.preventDefault();
    const file = document.getElementById('pdf_file').files[0];
    if(!file) return showToast("Lütfen bir PDF seçin.");

    const formData = new FormData();
    formData.append('patient_id', currentPatientId);
    formData.append('file', file);

    document.getElementById('footLoadingState').classList.remove('hidden');
    
    try {
        const res = await fetch('/api/analyze', { method: 'POST', body: formData });
        const data = await res.json();
        if(!res.ok) throw new Error(data.detail);
        
        loadPatientData(currentPatientId); // Refresh patient data to show new foot analysis
        document.getElementById('footAnalysisForm').reset();
    } catch(err) { showToast(err.message); }
    finally { document.getElementById('footLoadingState').classList.add('hidden'); }
}


// --- MATEMATİK VE ÇİZİM (DİJİTAL İSKELET) KISMI ---

function calcVerticalAngle(p1, p2) {
    if(!p1 || !p2) return null;
    const dx = Math.abs(p2.x - p1.x);
    const dy = Math.abs(p2.y - p1.y);
    const theta = Math.atan2(dx, dy) * (180 / Math.PI);
    return theta.toFixed(1);
}

function calcHorizontalAngle(pLeft, pRight) {
    if(!pLeft || !pRight) return null;
    const dy = Math.abs(pRight.y - pLeft.y);
    const dx = Math.abs(pRight.x - pLeft.x);
    const theta = Math.atan2(dy, dx) * (180 / Math.PI);
    const higher = pLeft.y < pRight.y ? "Sol" : "Sağ";
    return { val: theta.toFixed(1), higher: higher };
}

function refreshAllCanvases() {
    if(globalPostureState.front && !globalPostureState.front.error) {
        const res = drawCanvas('canvas_front', 'preview_front', globalPostureState.front, 'front');
        let html = '';
        if(res.shoulderSym) html += `<div class="flex justify-between py-1 border-b border-slate-100"><span>Omuz Simetrisi</span> <span class="font-bold ${Math.abs(res.shoulderSym.val)<2 ? 'text-green-600' : 'text-red-600'}">${res.shoulderSym.val}° ${Math.abs(res.shoulderSym.val)<2 ? '(Normal)' : '('+res.shoulderSym.higher+' Yüksek)'}</span></div>`;
        if(res.hipSym) html += `<div class="flex justify-between py-1 border-b border-slate-100"><span>Kalça Simetrisi</span> <span class="font-bold ${Math.abs(res.hipSym.val)<2 ? 'text-green-600' : 'text-red-600'}">${res.hipSym.val}° ${Math.abs(res.hipSym.val)<2 ? '(Normal)' : '('+res.hipSym.higher+' Yüksek)'}</span></div>`;
        if(res.kneeSym) html += `<div class="flex justify-between py-1 border-b border-slate-100"><span>Diz Simetrisi</span> <span class="font-bold ${Math.abs(res.kneeSym.val)<2 ? 'text-green-600' : 'text-red-600'}">${res.kneeSym.val}° ${Math.abs(res.kneeSym.val)<2 ? '(Normal)' : '('+res.kneeSym.higher+' Yüksek)'}</span></div>`;
        document.getElementById('table_front').innerHTML = html;
    }
    
    if(globalPostureState.back && !globalPostureState.back.error) {
        const res = drawCanvas('canvas_back', 'preview_back', globalPostureState.back, 'back');
        let html = '';
        if(res.shoulderSym) html += `<div class="flex justify-between py-1 border-b border-slate-100"><span>Omuz Simetrisi</span> <span class="font-bold ${Math.abs(res.shoulderSym.val)<2 ? 'text-green-600' : 'text-red-600'}">${res.shoulderSym.val}° ${Math.abs(res.shoulderSym.val)<2 ? '(Normal)' : '(Skolyoz Riski - '+res.shoulderSym.higher+' Yüksek)'}</span></div>`;
        if(res.hipSym) html += `<div class="flex justify-between py-1 border-b border-slate-100"><span>Kalça Simetrisi</span> <span class="font-bold ${Math.abs(res.hipSym.val)<2 ? 'text-green-600' : 'text-red-600'}">${res.hipSym.val}° ${Math.abs(res.hipSym.val)<2 ? '(Normal)' : '(Pelvik Asimetri - '+res.hipSym.higher+' Yüksek)'}</span></div>`;
        if(res.kneeSym) html += `<div class="flex justify-between py-1 border-b border-slate-100"><span>Diz Simetrisi</span> <span class="font-bold ${Math.abs(res.kneeSym.val)<2 ? 'text-green-600' : 'text-red-600'}">${res.kneeSym.val}° ${Math.abs(res.kneeSym.val)<2 ? '(Normal)' : '('+res.kneeSym.higher+' Yüksek)'}</span></div>`;
        document.getElementById('table_back').innerHTML = html;
    }
    
    if(globalPostureState.left && !globalPostureState.left.error) {
        const res = drawCanvas('canvas_left', 'preview_left', globalPostureState.left, 'left');
        let html = '';
        if(res.cervical) html += `<div class="flex justify-between py-1 border-b border-slate-100"><span>Baş Öne Eğikliği</span> <span class="font-bold ${Math.abs(res.cervical)<5 ? 'text-green-600' : 'text-red-600'}">${res.cervical}° ${Math.abs(res.cervical)<5 ? '(Normal)' : '(Forward Head)'}</span></div>`;
        if(res.thoracic) html += `<div class="flex justify-between py-1 border-b border-slate-100"><span>Torakal Eğiklik</span> <span class="font-bold ${Math.abs(res.thoracic)<5 ? 'text-green-600' : 'text-red-600'}">${res.thoracic}°</span></div>`;
        if(res.pelvic) html += `<div class="flex justify-between py-1 border-b border-slate-100"><span>Pelvik Eğim</span> <span class="font-bold ${Math.abs(res.pelvic)<5 ? 'text-green-600' : 'text-red-600'}">${res.pelvic}° ${Math.abs(res.pelvic)<5 ? '(Nötr)' : '(Anterior/Posterior Tilt)'}</span></div>`;
        document.getElementById('table_left').innerHTML = html;
    }
    
    if(globalPostureState.right && !globalPostureState.right.error) {
        const res = drawCanvas('canvas_right', 'preview_right', globalPostureState.right, 'right');
        let html = '';
        if(res.cervical) html += `<div class="flex justify-between py-1 border-b border-slate-100"><span>Baş Öne Eğikliği</span> <span class="font-bold ${Math.abs(res.cervical)<5 ? 'text-green-600' : 'text-red-600'}">${res.cervical}° ${Math.abs(res.cervical)<5 ? '(Normal)' : '(Forward Head)'}</span></div>`;
        if(res.thoracic) html += `<div class="flex justify-between py-1 border-b border-slate-100"><span>Torakal Eğiklik</span> <span class="font-bold ${Math.abs(res.thoracic)<5 ? 'text-green-600' : 'text-red-600'}">${res.thoracic}°</span></div>`;
        if(res.pelvic) html += `<div class="flex justify-between py-1 border-b border-slate-100"><span>Pelvik Eğim</span> <span class="font-bold ${Math.abs(res.pelvic)<5 ? 'text-green-600' : 'text-red-600'}">${res.pelvic}° ${Math.abs(res.pelvic)<5 ? '(Nötr)' : '(Anterior/Posterior Tilt)'}</span></div>`;
        document.getElementById('table_right').innerHTML = html;
    }
}

function setupDragEvents(canvasId, viewType) {
    const canvas = document.getElementById(canvasId);
    if(!canvas) return;

    const newCanvas = canvas.cloneNode(true);
    canvas.parentNode.replaceChild(newCanvas, canvas);

    newCanvas.addEventListener('mousedown', (e) => {
        const state = globalPostureState[viewType];
        if(!state || state.error) return;
        
        const rect = newCanvas.getBoundingClientRect();
        const scale = 400 / state.height;
        const mouseX = (e.clientX - rect.left) * (newCanvas.width / rect.width);
        const mouseY = (e.clientY - rect.top) * (newCanvas.height / rect.height);

        let closestKey = null;
        let minDist = 20; 
        
        for(let key in state.keypoints) {
            const pt = state.keypoints[key];
            if(pt && pt.confidence > 0.3) {
                const px = pt.x * scale;
                const py = pt.y * scale;
                const dist = Math.sqrt(Math.pow(mouseX - px, 2) + Math.pow(mouseY - py, 2));
                if(dist < minDist) {
                    minDist = dist;
                    closestKey = key;
                }
            }
        }

        if(closestKey) {
            isDragging = true;
            draggedPointKey = closestKey;
            currentDragView = viewType;
            newCanvas.style.cursor = 'crosshair';
        }
    });

    newCanvas.addEventListener('mousemove', (e) => {
        if(!isDragging || currentDragView !== viewType) return;
        
        const state = globalPostureState[viewType];
        const rect = newCanvas.getBoundingClientRect();
        const scale = 400 / state.height;
        const mouseX = (e.clientX - rect.left) * (newCanvas.width / rect.width);
        const mouseY = (e.clientY - rect.top) * (newCanvas.height / rect.height);

        const origX = mouseX / scale;
        const origY = mouseY / scale;
        state.keypoints[draggedPointKey].x = origX;
        state.keypoints[draggedPointKey].y = origY;

        const zPanel = document.getElementById('zoomPanel');
        const zCanvas = document.getElementById('zoomCanvas');
        if(zPanel && zCanvas) {
            zPanel.classList.remove('hidden');
            const zCtx = zCanvas.getContext('2d');
            
            // Zoom panelinde gercek fotografi goster
            let img = document.getElementById('preview_' + viewType);
            if(!img || !img.src) img = document.getElementById('orig_img_' + viewType);

            if(img && img.src) {
                zCtx.clearRect(0, 0, 256, 256);
                zCtx.save();
                // Koyu arka plan
                zCtx.fillStyle = '#0f172a';
                zCtx.fillRect(0,0,256,256);
                
                zCtx.translate(128, 128); 
                zCtx.scale(3, 3); 
                zCtx.drawImage(img, -origX, -origY); 
                zCtx.restore();
            }
        }

        refreshAllCanvases();
    });

    const stopDrag = () => { 
        isDragging = false; 
        draggedPointKey = null; 
        currentDragView = null; 
        newCanvas.style.cursor = 'default';
        const zPanel = document.getElementById('zoomPanel');
        if(zPanel) zPanel.classList.add('hidden'); 
    };

    newCanvas.addEventListener('mouseup', stopDrag);
    newCanvas.addEventListener('mouseleave', stopDrag);
}

function drawCanvas(canvasId, imgId, analysisData, viewType) {
    const canvas = document.getElementById(canvasId);
    if(!canvas) return {};
    const ctx = canvas.getContext('2d');
    
    // Yükleme formundaki imaj veya önbellekteki (DB'den gelen) gizli imaj
    let img = document.getElementById(imgId);
    if(!img || !img.src) img = document.getElementById('orig_img_' + viewType);

    const scale = 400 / analysisData.height; 
    canvas.width = analysisData.width * scale;
    canvas.height = 400;
    
    // Dijital İskelet Teması (Siyah/Koyu Lacivert Arkaplan)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.fillStyle = "#0f172a"; 
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Fotoğrafı çok hafif (Ghost) olarak arkaya çiz
    if(img && img.src) {
        ctx.globalAlpha = 0.15;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1.0;
    }

    const kpts = analysisData.keypoints;
    let results = {};

    if (viewType === 'left') {
        for (let key in kpts) if (key.startsWith('right_')) kpts[key] = null;
        kpts.left_eye = null; kpts.nose = null; kpts.left_elbow = null; kpts.left_wrist = null;
    } else if (viewType === 'right') {
        for (let key in kpts) if (key.startsWith('left_')) kpts[key] = null;
        kpts.right_eye = null; kpts.nose = null; kpts.right_elbow = null; kpts.right_wrist = null;
    }

    function drawLine(p1, p2, color="cyan", lineWidth=2) {
        if(!p1 || !p2) return;
        ctx.beginPath(); ctx.moveTo(p1.x * scale, p1.y * scale); ctx.lineTo(p2.x * scale, p2.y * scale);
        ctx.strokeStyle = color; ctx.lineWidth = lineWidth; 
        ctx.shadowBlur = 10; ctx.shadowColor = color; // Neon efekti
        ctx.stroke();
        ctx.shadowBlur = 0; // Efekti sifirla
    }

    function getMid(p1, p2) {
        if(p1 && p2) return { x: (p1.x + p2.x)/2, y: (p1.y + p2.y)/2 };
        return p1 || p2 || null;
    }

    function drawExtrapolatedLine(p1, p2, color="#22c55e", lineWidth=2) {
        if(!p1 || !p2) return;
        const dx = p2.x - p1.x; const dy = p2.y - p1.y;
        if (dy === 0) return;
        const t = (0 - (p1.y * scale)) / (dy * scale);
        const ext_x = (p1.x * scale) + t * (dx * scale);
        ctx.beginPath(); ctx.moveTo(p1.x * scale, p1.y * scale); ctx.lineTo(ext_x, 0);
        ctx.strokeStyle = color; ctx.lineWidth = lineWidth; 
        ctx.shadowBlur = 10; ctx.shadowColor = color;
        ctx.stroke();
        ctx.shadowBlur = 0;
    }

    // --- İskelet Bağlantılarını Çiz (Skeleton Bones) ---
    // Sadece görsel amaçlı omuz, dirsek, kalça, diz bağlantıları
    drawLine(kpts.left_shoulder, kpts.left_hip, "rgba(255,255,255,0.2)", 1);
    drawLine(kpts.right_shoulder, kpts.right_hip, "rgba(255,255,255,0.2)", 1);
    drawLine(kpts.left_hip, kpts.left_knee, "rgba(255,255,255,0.2)", 1);
    drawLine(kpts.right_hip, kpts.right_knee, "rgba(255,255,255,0.2)", 1);
    drawLine(kpts.left_knee, kpts.left_ankle, "rgba(255,255,255,0.2)", 1);
    drawLine(kpts.right_knee, kpts.right_ankle, "rgba(255,255,255,0.2)", 1);

    // Kırmızı Şakül Çizgisi
    let verticalRefPoint = null;
    if(viewType === 'front' || viewType === 'back') {
        verticalRefPoint = getMid(kpts.left_ankle, kpts.right_ankle);
    } else {
        verticalRefPoint = kpts.left_ankle || kpts.right_ankle;
    }

    if(verticalRefPoint) {
        ctx.beginPath();
        ctx.moveTo(verticalRefPoint.x * scale, 0);
        ctx.lineTo(verticalRefPoint.x * scale, canvas.height);
        ctx.strokeStyle = "#ef4444"; // Red
        ctx.lineWidth = 1.5;
        ctx.shadowBlur = 5; ctx.shadowColor = "#ef4444";
        ctx.stroke();
        ctx.shadowBlur = 0;
    }

    if(viewType === 'front' || viewType === 'back') {
        const midHip = getMid(kpts.left_hip, kpts.right_hip);
        const midHead = getMid(kpts.left_ear, kpts.right_ear) || kpts.nose;

        drawLine(kpts.left_shoulder, kpts.right_shoulder, "#3b82f6", 2.5); // Blue neon
        drawLine(kpts.left_hip, kpts.right_hip, "#3b82f6", 2.5);
        drawLine(kpts.left_elbow, kpts.right_elbow, "#3b82f6", 1.5); 
        drawLine(kpts.left_knee, kpts.right_knee, "#3b82f6", 2.5);   
        drawLine(kpts.left_ankle, kpts.right_ankle, "#3b82f6", 1.5); 
        
        results.shoulderSym = calcHorizontalAngle(kpts.left_shoulder, kpts.right_shoulder);
        results.hipSym = calcHorizontalAngle(kpts.left_hip, kpts.right_hip);
        results.kneeSym = calcHorizontalAngle(kpts.left_knee, kpts.right_knee);

        if(midHip && midHead) drawExtrapolatedLine(midHip, midHead, "#06b6d4", 2); // Cyan neon
    } 
    else if (viewType === 'left' || viewType === 'right') {
        const ear = kpts.left_ear || kpts.right_ear;
        const shoulder = kpts.left_shoulder || kpts.right_shoulder;
        const hip = kpts.left_hip || kpts.right_hip;

        if(shoulder && ear) {
            drawExtrapolatedLine(shoulder, ear, "#22c55e", 2); // Lime
            results.cervical = calcVerticalAngle(shoulder, ear);
        }
        if(shoulder && hip) {
            results.thoracic = calcVerticalAngle(shoulder, hip);
        }
        if(hip && ear) {
            drawExtrapolatedLine(hip, ear, "#06b6d4", 2); // Cyan
            results.pelvic = calcVerticalAngle(hip, ear);
        }
    }

    // NOKTALAR
    for(let key in kpts) {
        const point = kpts[key];
        if(point && point.confidence > 0.3) {
            ctx.beginPath();
            const isThisDragged = (isDragging && currentDragView === viewType && draggedPointKey === key);
            ctx.arc(point.x * scale, point.y * scale, isThisDragged ? 6 : 3, 0, 2 * Math.PI);
            ctx.fillStyle = isThisDragged ? "#fbbf24" : "#fef08a"; // Yellow neon
            ctx.fill();
            if(isThisDragged) {
                ctx.shadowBlur = 10; ctx.shadowColor = "#fbbf24"; ctx.fill(); ctx.shadowBlur = 0;
            }
        }
    }
    return results;
}

// Başlangıç
showDashboard();
"""
with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/app.js', 'w') as f:
    f.write(new_app_js)
    
print("app.js updated.")
