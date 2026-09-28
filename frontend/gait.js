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
    
    document.getElementById('gaitInstructionOverlay').classList.add('hidden');
    document.getElementById('btnStartGaitAnalysis').classList.add('hidden');
    document.getElementById('btnCompleteGaitAnalysis').classList.remove('hidden');
    
    let statusBadge = document.getElementById('gaitLiveStatus');
    statusBadge.innerHTML = '<i class="fa-solid fa-circle text-red-500 animate-pulse"></i> CANLI';
    
    gaitWs = new WebSocket('ws://localhost:8765');
    
    gaitWs.onopen = () => { isGaitRecording = true; };
    
    gaitWs.onmessage = (event) => {
        if (!isGaitRecording) return;
        event.data.arrayBuffer().then(buffer => {
            const data = new Uint8Array(buffer);
            if (data.length === 2304) processGaitFrame(data);
        });
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
    
    // Yürüme Analizi AŞAMA 2 ve 3'ü tetikle
    if(typeof analyzeGaitData === 'function') {
        analyzeGaitData(recordedSteps);
    }
}

function processGaitFrame(data) {
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

const colorMapGait = [[0,0,0], [0,0,255], [0,255,255], [0,255,0], [255,255,0], [255,0,0]];
function getGaitColor(value) {
    if (value < 5) return [0, 0, 0];
    let v = Math.min(255, value * 1.6);
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
            let grad = gaitAlphaCtx.createRadialGradient(cx, cy, 0, cx, cy, 15);
            grad.addColorStop(0, `rgba(255,255,255,${val/255})`);
            grad.addColorStop(1, "rgba(255,255,255,0)");
            gaitAlphaCtx.fillStyle = grad;
            gaitAlphaCtx.fillRect(cx-15, cy-15, 30, 30);
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
    
    badgeEl.innerText = `${recordedSteps.length} Adım`;
    
    if (recordedSteps.length === 0) {
        document.getElementById('gaitEmptyState').classList.remove('hidden');
        listEl.innerHTML = '';
        listEl.appendChild(document.getElementById('gaitEmptyState'));
        return;
    }
    
    document.getElementById('gaitEmptyState').classList.add('hidden');
    listEl.innerHTML = '';
    
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
                let grad = gaitAlphaCtx.createRadialGradient(cx, cy, 0, cx, cy, 15);
                grad.addColorStop(0, `rgba(255,255,255,${val/255})`);
                grad.addColorStop(1, "rgba(255,255,255,0)");
                gaitAlphaCtx.fillStyle = grad;
                gaitAlphaCtx.fillRect(cx-15, cy-15, 30, 30);
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
