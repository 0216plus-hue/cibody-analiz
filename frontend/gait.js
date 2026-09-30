let gaitWs = null;
let isGaitRecording = false;
let currentStepFrames = [];
let recordedSteps = [];
let isFootDown = false;
const PRESSURE_THRESHOLD = 200; // sum of pressure to consider as "foot down"

function startGaitAnalysis() {
    if(gaitWs) gaitWs.close();
    
    recordedSteps = [];
    currentStepFrames = [];
    isFootDown = false;
    updateGaitUI();
    
    document.getElementById('gaitResultsSection').classList.add('hidden');
    document.getElementById('gaitRecordingSection').classList.remove('hidden');
    
    const historySelect = document.getElementById('gaitHistorySelect');
    if(historySelect) historySelect.value = "";
    
    const listEl = document.getElementById('gaitStepsList');
    if(listEl) {
        Array.from(listEl.children).forEach(child => {
            if (child.id !== 'gaitEmptyState') child.remove();
        });
    }
    const emptyState = document.getElementById('gaitEmptyState');
    if(emptyState) emptyState.classList.remove('hidden');
    document.getElementById('gaitStepCountBadge').innerText = "0";
    
    document.getElementById('gaitInstructionOverlay').classList.add('hidden');
    document.getElementById('btnStartGaitAnalysis').classList.add('hidden');
    const btnPdf = document.getElementById('btnDownloadGaitPdf');
    if(btnPdf) btnPdf.classList.add('hidden');
    document.getElementById('btnCompleteGaitAnalysis').classList.remove('hidden');
    
    let statusBadge = document.getElementById('gaitLiveStatus');
    statusBadge.innerHTML = '<i class="fa-solid fa-circle text-red-500 animate-pulse"></i> CANLI';
    
    gaitWs = new WebSocket('ws://localhost:8765');
    
    gaitWs.onopen = () => { isGaitRecording = true; };
    
    let gaitBuffer = new Uint8Array(2304 * 3);
    let gaitWriteIdx = 0;
    let gaitLastDrawIdx = 0;
    
    gaitWs.binaryType = "arraybuffer";
    gaitWs.onmessage = (event) => {
        if (!isGaitRecording) return;
        let data = new Uint8Array(event.data);
        for (let i = 0; i < data.length; i++) {
            gaitBuffer[gaitWriteIdx % gaitBuffer.length] = data[i];
            gaitWriteIdx++;
        }
        
        if (gaitWriteIdx - gaitLastDrawIdx >= 2304) {
            let tempFrame = new Uint8Array(2304 * 2);
            let start = (gaitWriteIdx - (2304 * 2) + gaitBuffer.length) % gaitBuffer.length;
            for (let i = 0; i < 2304 * 2; i++) {
                tempFrame[i] = gaitBuffer[(start + i) % gaitBuffer.length];
            }

            let rowSums = new Array(96).fill(0);
            for(let r = 0; r < 96; r++) {
                let sum = 0;
                for(let c = 0; c < 48; c++) { sum += tempFrame[r * 48 + c]; }
                rowSums[r] = sum;
            }
            let bestStartRow = 0;
            let maxSum = -1;
            for(let r = 0; r < 48; r++) {
                let centerSum = 0;
                for(let i = 14; i < 34; i++) { centerSum += rowSums[r + i]; }
                if(centerSum > maxSum) { maxSum = centerSum; bestStartRow = r; }
            }
            
            if (typeof window.gaitLastStableRow === 'undefined') window.gaitLastStableRow = bestStartRow;
            if (Math.abs(bestStartRow - window.gaitLastStableRow) > 3 && Math.abs(bestStartRow - window.gaitLastStableRow) < 45) {
                window.gaitLastStableRow = bestStartRow;
            }

            let readStart = window.gaitLastStableRow * 48;
            let alignedFrame = new Uint8Array(2304);
            for (let i = 0; i < 2304; i++) {
                alignedFrame[i] = tempFrame[readStart + i];
            }
            
            processGaitFrame(alignedFrame);
            gaitLastDrawIdx = gaitWriteIdx;
        }
    };
    
    gaitWs.onerror = () => {
        if(typeof showToast === 'function') showToast("Sensöre bağlanılamadı. Python köprüsü çalışıyor mu?", "error");
        stopGaitAnalysis();
    };
}

function stopGaitAnalysis() {
    isGaitRecording = false;
    if(gaitWs) gaitWs.close();
    
    document.getElementById('btnStartGaitAnalysis').classList.remove('hidden');
    document.getElementById('btnCompleteGaitAnalysis').classList.add('hidden');
    
    let statusBadge = document.getElementById('gaitLiveStatus');
    statusBadge.innerHTML = '<i class="fa-solid fa-bed text-slate-400"></i> Bekleniyor...';
}

function completeGaitAnalysis() {
    stopGaitAnalysis();
    if(typeof showToast === 'function') showToast(`${recordedSteps.length} adım analize gönderildi.`);
    document.getElementById('gaitRecordingSection').classList.add('hidden');
    document.getElementById('gaitResultsSection').classList.remove('hidden');
    const btnPdf = document.getElementById('btnDownloadGaitPdf');
    if(btnPdf) btnPdf.classList.remove('hidden');
    
    // Yürüme Analizi AŞAMA 2 ve 3'ü tetikle
    if(typeof analyzeGaitData === 'function') {
        analyzeGaitData(recordedSteps);
    }
    
    // Otomatik Kaydet (Tarih bazlı)
    saveGaitAnalysis();
}

window.cachedGaitHistory = [];

async function saveGaitAnalysis() {
    if(!currentPatientId) {
        if(typeof showToast === 'function') showToast("Hasta seçilmediği için kaydedilemedi.");
        return;
    }
    if(recordedSteps.length === 0) return;

    const stepsToSave = recordedSteps.map(step => {
        return {
            id: step.id,
            type: step.type,
            frameCount: step.frameCount,
            aggregate: Array.from(step.aggregate),
            frames: step.frames.map(f => Array.from(f))
        };
    });

    const record = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        steps: stepsToSave
    };

    try {
        const res = await authFetch(`/api/gait/${currentPatientId}`, {
            method: 'POST',
            body: JSON.stringify({ session_data: JSON.stringify(record) }),
            headers: { 'Content-Type': 'application/json' }
        });
        if(res.ok) {
            // Hemen local cache'e ekle — GET isteği tamamlanmadan dropdown güncellensin
            if(!Array.isArray(window.cachedGaitHistory)) window.cachedGaitHistory = [];
            window.cachedGaitHistory.unshift(record);
            if(typeof showToast === 'function') showToast("Yürüme analizi başarıyla kaydedildi.");
        } else {
            const err = await res.text();
            alert("Sunucu hatası (Gait): " + res.status + " - " + err);
        }
    } catch(e) {
        if(typeof showToast === 'function') showToast("Kaydedilirken hata oluştu.");
        console.error(e);
        alert("Bağlantı hatası: " + e.message);
    }
    
    await refreshGaitHistoryDropdown();
}

window.loadGaitHistory = function(recordId) {
    if(!recordId) {
        document.getElementById('gaitResultsSection').classList.add('hidden');
        document.getElementById('gaitRecordingSection').classList.remove('hidden');
        recordedSteps = [];
        document.getElementById('gaitStepCountBadge').innerText = "0";
        const btnPdf2 = document.getElementById('btnDownloadGaitPdf');
        if(btnPdf2) btnPdf2.classList.add('hidden');
        const listEl = document.getElementById('gaitStepsList');
        if(listEl) {
            Array.from(listEl.children).forEach(child => {
                if (child.id !== 'gaitEmptyState') child.remove();
            });
        }
        const emptyState = document.getElementById('gaitEmptyState');
        if(emptyState) emptyState.classList.remove('hidden');
        return;
    }

    let record = window.cachedGaitHistory.find(r => r.id === recordId);
    if(record) {
        recordedSteps = record.steps;
        document.getElementById('gaitRecordingSection').classList.add('hidden');
        document.getElementById('gaitResultsSection').classList.remove('hidden');
        const btnPdf3 = document.getElementById('btnDownloadGaitPdf');
        if(btnPdf3) btnPdf3.classList.remove('hidden');
        if(typeof analyzeGaitData === 'function') {
            analyzeGaitData(recordedSteps);
        }
    }
};

window.refreshGaitHistoryDropdown = async function() {
    const sel = document.getElementById('gaitHistorySelect');
    if(!sel) return;
    
    try {
        const res = await authFetch(`/api/gait/patient/${currentPatientId}`);
        if(res.ok) {
            const data = await res.json();
            window.cachedGaitHistory = data.map(d => d.session_data);
        }
    } catch(e) { console.error(e); }
    
    sel.innerHTML = '<option value="">-- Yeni Analiz --</option>';
    
    window.cachedGaitHistory.forEach(r => {
        let opt = document.createElement('option');
        opt.value = r.id;
        let date = new Date(r.timestamp);
        opt.text = date.toLocaleDateString('tr-TR') + " " + date.toLocaleTimeString('tr-TR');
        sel.appendChild(opt);
    });
};

document.addEventListener('DOMContentLoaded', () => {
    const tabBtn = document.getElementById('btn_gaitTab');
    if(tabBtn) {
        tabBtn.addEventListener('click', () => {
            setTimeout(refreshGaitHistoryDropdown, 200);
        });
    }
});

function processGaitFrame(rawData) {
    // Hardware mat in gait mode is rotated 90 degrees.
    // We rotate the 48x48 matrix 90 degrees counter-clockwise (or clockwise) to make feet upright.
    let data = new Uint8Array(2304);
    for(let r=0; r<48; r++) {
        for(let c=0; c<48; c++) {
            // Apply X-mirror (as in static) and 90 deg rotation.
            let orig_c = 48 - 1 - c; // hardware mirror
            let orig_r = r;
            
            // 90 deg CCW rotation of the (orig_r, orig_c) matrix
            // new_r = 48 - 1 - orig_c
            // new_c = orig_r
            let new_r = 48 - 1 - orig_c;
            let new_c = orig_r;
            
            data[new_r * 48 + new_c] = rawData[r * 48 + c];
        }
    }

    drawGaitFrame(data);
    let totalPressure = 0;
    for(let i=0; i<data.length; i++) totalPressure += data[i];
    
    if (totalPressure > PRESSURE_THRESHOLD) {
        if (!isFootDown) {
            isFootDown = true;
            currentStepFrames = [];
        }
        currentStepFrames.push(new Uint8Array(data));
    } else {
        if (isFootDown) {
            isFootDown = false;
            if (currentStepFrames.length > 5) {
                processFinishedStep(currentStepFrames);
            }
            currentStepFrames = [];
        }
    }
}

const colorMapGait = [
    [0,0,0],       // Black
    [128,0,128],   // Purple
    [0,0,255],     // Blue
    [0,255,255],   // Cyan
    [0,255,0],     // Lime
    [255,255,0],   // Yellow
    [255,0,0]      // Red
];
function getGaitColor(value) {
    if (value < 5) return [0, 0, 0];
    let v = Math.min(255, value * 1.1);
    let idx = (v / 255) * (colorMapGait.length - 1);
    let i = Math.floor(idx);
    let f = idx - i;
    if (i >= colorMapGait.length - 1) return colorMapGait[colorMapGait.length - 1];
    return [
        Math.round(colorMapGait[i][0] + f * (colorMapGait[i+1][0] - colorMapGait[i][0])),
        Math.round(colorMapGait[i][1] + f * (colorMapGait[i+1][1] - colorMapGait[i][1])),
        Math.round(colorMapGait[i][2] + f * (colorMapGait[i+1][2] - colorMapGait[i][2]))
    ];
}

const gaitAlphaCanvas = document.createElement('canvas');
gaitAlphaCanvas.width = 480; gaitAlphaCanvas.height = 480;
const gaitAlphaCtx = gaitAlphaCanvas.getContext('2d');

function drawGaitFrame(data) {
    const canvas = document.getElementById("gaitLiveCanvas");
    if(!canvas) return;
    const ctx = canvas.getContext("2d");
    
    gaitAlphaCtx.clearRect(0,0,480,480);
    for(let i=0; i<2304; i++) {
        let val = data[i];
        if(val > 5) {
            let r = Math.floor(i/48);
            let c = i%48;
            let cx = (48 - 1 - c) * 10 + 5;
            let cy = r * 10 + 5;
            let grad = gaitAlphaCtx.createRadialGradient(cx, cy, 0, cx, cy, 12);
            grad.addColorStop(0, `rgba(255,255,255,${val/255 * 0.7})`);
            grad.addColorStop(1, "rgba(255,255,255,0)");
            gaitAlphaCtx.fillStyle = grad;
            gaitAlphaCtx.fillRect(cx-12, cy-12, 24, 24);
        }
    }
    
    const imgData = gaitAlphaCtx.getImageData(0,0,480,480);
    const pd = imgData.data;
    const outData = ctx.createImageData(480,480);
    const od = outData.data;
    
    for(let i=0; i<pd.length; i+=4) {
        let alpha = pd[i+3];
        if(alpha > 5) {
            let col = getGaitColor(alpha);
            od[i] = col[0]; od[i+1] = col[1]; od[i+2] = col[2]; od[i+3] = 255;
        } else {
            od[i] = 0; od[i+1] = 0; od[i+2] = 0; od[i+3] = 255;
        }
    }
    ctx.putImageData(outData, 0, 0);
}

function processFinishedStep(frames) {
    let aggregate = new Uint8Array(2304);
    for(let i=0; i<2304; i++) {
        let maxVal = 0;
        for(let f=0; f<frames.length; f++) {
            if (frames[f][i] > maxVal) maxVal = frames[f][i];
        }
        aggregate[i] = maxVal;
    }
    
    let footType = (recordedSteps.length % 2 === 0) ? "Sağ Ayak" : "Sol Ayak";
    recordedSteps.push({
        id: recordedSteps.length + 1,
        type: footType,
        frameCount: frames.length,
        frames: frames,
        aggregate: aggregate
    });
    updateGaitUI();
}

function updateGaitUI() {
    const listEl = document.getElementById('gaitStepsList');
    const badgeEl = document.getElementById('gaitStepCountBadge');
    const emptyState = document.getElementById('gaitEmptyState');
    
    if(badgeEl) badgeEl.innerText = `${recordedSteps.length} Adım`;
    
    if (recordedSteps.length === 0) {
        if(emptyState) emptyState.classList.remove('hidden');
        if(listEl) {
            Array.from(listEl.children).forEach(child => {
                if (child.id !== 'gaitEmptyState') child.remove();
            });
        }
        return;
    }
    
    if(emptyState) emptyState.classList.add('hidden');
    if(listEl) {
        Array.from(listEl.children).forEach(child => {
            if (child.id !== 'gaitEmptyState') child.remove();
        });
    }
    
    recordedSteps.forEach((s, index) => {
        let c = document.createElement('canvas');
        c.width = 480; c.height = 480;
        let ctx = c.getContext('2d');
        gaitAlphaCtx.clearRect(0,0,480,480);
        for(let i=0; i<2304; i++) {
            let val = s.aggregate[i];
            if(val > 5) {
                let r = Math.floor(i/48);
                let col = i%48;
                let cx = (48 - 1 - col) * 10 + 5;
                let cy = r * 10 + 5;
                let grad = gaitAlphaCtx.createRadialGradient(cx, cy, 0, cx, cy, 12);
                grad.addColorStop(0, `rgba(255,255,255,${val/255 * 0.7})`);
                grad.addColorStop(1, "rgba(255,255,255,0)");
                gaitAlphaCtx.fillStyle = grad;
                gaitAlphaCtx.fillRect(cx-12, cy-12, 24, 24);
            }
        }
        let imgData = gaitAlphaCtx.getImageData(0,0,480,480);
        let pd = imgData.data;
        let outData = ctx.createImageData(480,480);
        let od = outData.data;
        for(let i=0; i<pd.length; i+=4) {
            let alpha = pd[i+3];
            if(alpha > 5) {
                let colR = getGaitColor(alpha);
                od[i] = colR[0]; od[i+1] = colR[1]; od[i+2] = colR[2]; od[i+3] = 255;
            } else {
                od[i] = 0; od[i+1] = 0; od[i+2] = 0; od[i+3] = 255;
            }
        }
        ctx.putImageData(outData, 0, 0);
        
        let card = document.createElement('div');
        card.className = "bg-white border border-slate-200 p-3 rounded-xl shadow-sm flex gap-4 items-center shrink-0";
        card.innerHTML = `
            <img src="${c.toDataURL()}" class="w-16 h-16 bg-black rounded-lg object-cover border border-slate-800">
            <div class="flex-1">
                <h4 class="font-bold text-sm text-slate-800">Adım ${s.id}</h4>
                <p class="text-xs font-semibold ${s.type === 'Sağ Ayak' ? 'text-blue-500' : 'text-red-500'} mb-1">${s.type}</p>
                <p class="text-[10px] text-slate-500">${s.frameCount} Kare</p>
            </div>
            <div class="flex flex-col gap-1">
                <button onclick="toggleStepSide(${index})" class="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-600 px-2 py-1 rounded transition border border-slate-200"><i class="fa-solid fa-right-left"></i></button>
                <button onclick="removeStep(${index})" class="text-[10px] bg-rose-50 hover:bg-rose-100 text-rose-600 px-2 py-1 rounded transition border border-rose-100"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
        listEl.appendChild(card);
    });
}

function toggleStepSide(idx) {
    let s = recordedSteps[idx];
    s.type = (s.type === "Sağ Ayak") ? "Sol Ayak" : "Sağ Ayak";
    updateGaitUI();
}

function removeStep(idx) {
    recordedSteps.splice(idx, 1);
    updateGaitUI();
}

window.downloadGaitPdf = function() {
    if (!currentPatientId) {
        if(typeof showToast === 'function') showToast("Lütfen bir hasta seçin.");
        return;
    }
    
    const element = document.getElementById('gaitTab');
    const opt = {
        margin:       [0.75, 0.3, 0.5, 0.3],
        filename:     `dinamik_yurume_analizi_${currentPatientId}.pdf`,
        image:        { type: 'jpeg', quality: 1.0 },
        html2canvas:  { scale: 2, useCORS: true, scrollY: 0 },
        jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' },
        pagebreak:    { mode: ['css', 'legacy'], avoid: ['.avoid-break', 'tr'] }
    };

    // Force a fixed width so charts don't squash/overlap in PDF
    

    const topBar = document.getElementById('gaitTopBar');
    if(topBar) topBar.style.display = 'none';
    
    html2pdf().set(opt).from(element).toPdf().get('pdf').then(function(pdf) {
        if (typeof applyCibodyPdfHeaderFooter === 'function') {
            applyCibodyPdfHeaderFooter(pdf, "Dinamik Yürüme Analizi Raporu");
        }
    }).save().then(() => {
        if(topBar) topBar.style.display = 'flex';
        if(typeof showToast === 'function') showToast("Yürüme Analizi PDF raporu indirildi.");
    }).catch(err => {
        console.error(err);
        if(topBar) topBar.style.display = 'flex';
        if(typeof showToast === 'function') showToast("PDF indirilirken hata oluştu.");
    });
};
