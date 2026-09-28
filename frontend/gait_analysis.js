// AŞAMA 2 & 3: BİYOMEKANİK HESAPLAMALAR VE GRAFİKLER

let gaitResults = {};

function analyzeGaitData(steps) {
    let leftSteps = steps.filter(s => s.type === 'Sol Ayak');
    let rightSteps = steps.filter(s => s.type === 'Sağ Ayak');
    
    // FPS varsayımı: Cihaz yaklaşık 30-40 Hz ile çalışıyor, kare başı 25ms.
    const TIME_PER_FRAME = 25; 
    
    let processedSteps = steps.map(step => {
        let maxForce = 0;
        let copPath = [];
        let regional = { heel: 0, mid: 0, fore: 0 }; // Topuk (y>30), Orta (15<y<=30), Ön (y<=15)
        let totalPressureSum = 0;
        
        step.frames.forEach(frame => {
            let frameForce = 0;
            let sumX = 0;
            let sumY = 0;
            
            for(let i=0; i<2304; i++) {
                let v = frame[i];
                if(v > 5) {
                    let r = Math.floor(i/48); // y
                    let c = i%48;             // x (mirrored logic handled in draw, but for COP we can use raw or mirrored)
                    let mirroredC = 48 - 1 - c;
                    
                    frameForce += v;
                    sumX += (mirroredC * v);
                    sumY += (r * v);
                    
                    totalPressureSum += v;
                    if (r > 30) regional.heel += v;
                    else if (r > 15) regional.mid += v;
                    else regional.fore += v;
                }
            }
            if(frameForce > maxForce) maxForce = frameForce;
            
            if(frameForce > 0) {
                copPath.push({ x: sumX / frameForce, y: sumY / frameForce });
            }
        });
        
        // 5 Fazın Seçimi (0%, 25%, 50%, 75%, 100%)
        let phases = [];
        let flen = step.frames.length;
        if(flen > 0) {
            phases.push(step.frames[0]);
            phases.push(step.frames[Math.floor(flen * 0.25)]);
            phases.push(step.frames[Math.floor(flen * 0.50)]);
            phases.push(step.frames[Math.floor(flen * 0.75)]);
            phases.push(step.frames[flen - 1]);
        }
        
        return {
            ...step,
            stanceTime: flen * TIME_PER_FRAME,
            maxForce: maxForce,
            copPath: copPath,
            phases: phases,
            regional: {
                heelPct: totalPressureSum > 0 ? (regional.heel / totalPressureSum * 100) : 0,
                midPct: totalPressureSum > 0 ? (regional.mid / totalPressureSum * 100) : 0,
                forePct: totalPressureSum > 0 ? (regional.fore / totalPressureSum * 100) : 0,
            }
        };
    });
    
    // Ortalamalar
    let leftStanceAvg = 0, rightStanceAvg = 0;
    let leftForceAvg = 0, rightForceAvg = 0;
    
    let lProcs = processedSteps.filter(s => s.type === 'Sol Ayak');
    let rProcs = processedSteps.filter(s => s.type === 'Sağ Ayak');
    
    if(lProcs.length > 0) {
        leftStanceAvg = lProcs.reduce((acc, s) => acc + s.stanceTime, 0) / lProcs.length;
        leftForceAvg = lProcs.reduce((acc, s) => acc + s.maxForce, 0) / lProcs.length;
    }
    
    if(rProcs.length > 0) {
        rightStanceAvg = rProcs.reduce((acc, s) => acc + s.stanceTime, 0) / rProcs.length;
        rightForceAvg = rProcs.reduce((acc, s) => acc + s.maxForce, 0) / rProcs.length;
    }
    
    let stanceAsym = 0;
    if (leftStanceAvg > 0 || rightStanceAvg > 0) {
        stanceAsym = Math.abs(leftStanceAvg - rightStanceAvg) / Math.max(leftStanceAvg, rightStanceAvg) * 100;
    }
    
    let forceAsym = 0;
    if (leftForceAvg > 0 || rightForceAvg > 0) {
        forceAsym = Math.abs(leftForceAvg - rightForceAvg) / Math.max(leftForceAvg, rightForceAvg) * 100;
    }
    
    let leftLoadPct = 50;
    let rightLoadPct = 50;
    if(leftForceAvg + rightForceAvg > 0) {
        leftLoadPct = (leftForceAvg / (leftForceAvg + rightForceAvg)) * 100;
        rightLoadPct = (rightForceAvg / (leftForceAvg + rightForceAvg)) * 100;
    }
    
    gaitResults = {
        totalSteps: steps.length,
        leftCount: leftSteps.length,
        rightCount: rightSteps.length,
        metrics: {
            leftStance: leftStanceAvg,
            rightStance: rightStanceAvg,
            stanceAsym: stanceAsym,
            leftLoad: leftLoadPct,
            rightLoad: rightLoadPct,
            forceAsym: forceAsym
        },
        processedSteps: processedSteps
    };
    
    renderGaitResults();
}

function renderGaitResults() {
    // Summary Update
    document.getElementById('gSummaryTotal').innerText = gaitResults.totalSteps;
    document.getElementById('gSummaryLeft').innerText = gaitResults.leftCount;
    document.getElementById('gSummaryRight').innerText = gaitResults.rightCount;
    
    document.getElementById('gMetricLeftStance').innerText = Math.round(gaitResults.metrics.leftStance) + " ms";
    document.getElementById('gMetricRightStance').innerText = Math.round(gaitResults.metrics.rightStance) + " ms";
    document.getElementById('gMetricStanceAsym').innerText = "%" + gaitResults.metrics.stanceAsym.toFixed(1);
    
    document.getElementById('gMetricLeftLoad').innerText = "%" + gaitResults.metrics.leftLoad.toFixed(1);
    document.getElementById('gMetricRightLoad').innerText = "%" + gaitResults.metrics.rightLoad.toFixed(1);
    document.getElementById('gMetricForceAsym').innerText = "%" + gaitResults.metrics.forceAsym.toFixed(1);
    
    // Adım Detaylarını Çiz
    let detailsContainer = document.getElementById('gaitStepDetailsContainer');
    if(detailsContainer) {
        detailsContainer.innerHTML = '';
        gaitResults.processedSteps.forEach(step => {
            let div = document.createElement('div');
            div.className = "bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-6";
            
            // 5 faz canvaslarını oluştur
            let phaseHtml = '';
            for(let i=0; i<5; i++) {
                phaseHtml += `<div class="flex flex-col items-center"><canvas id="phase_${step.id}_${i}" width="120" height="120" class="bg-black rounded-lg"></canvas><span class="text-xs text-slate-500 mt-2">Faz ${i+1}</span></div>`;
            }
            
            div.innerHTML = `
                <h4 class="font-bold text-indigo-900 mb-4 border-b border-slate-100 pb-2">Adım ${step.id} - ${step.type}</h4>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                    <div>
                        <p class="text-sm font-bold text-slate-700 mb-3">5 Faz Görüntüleri</p>
                        <div class="flex justify-between gap-2 overflow-x-auto">
                            ${phaseHtml}
                        </div>
                    </div>
                    <div>
                        <p class="text-sm font-bold text-slate-700 mb-3">Bölgesel Yük Dağılımı</p>
                        <div class="flex h-8 bg-slate-100 rounded-lg overflow-hidden border border-slate-200 mb-4">
                            <div class="bg-rose-500 h-full flex items-center justify-center text-white text-xs font-bold" style="width: ${step.regional.heelPct}%" title="Topuk">T: %${step.regional.heelPct.toFixed(0)}</div>
                            <div class="bg-amber-500 h-full flex items-center justify-center text-white text-xs font-bold" style="width: ${step.regional.midPct}%" title="Orta">O: %${step.regional.midPct.toFixed(0)}</div>
                            <div class="bg-emerald-500 h-full flex items-center justify-center text-white text-xs font-bold" style="width: ${step.regional.forePct}%" title="Ön">Ö: %${step.regional.forePct.toFixed(0)}</div>
                        </div>
                        <p class="text-sm font-bold text-slate-700 mb-2">Basınç Profili Eğrisi</p>
                        <div class="w-full h-32 relative">
                            <canvas id="profileChart_${step.id}"></canvas>
                        </div>
                    </div>
                </div>
            `;
            detailsContainer.appendChild(div);
            
            // Canvasları çiz
            for(let i=0; i<5; i++) {
                let frame = step.phases[i];
                let cId = `phase_${step.id}_${i}`;
                renderMiniFrame(cId, frame);
            }
        });
        
        // Render Chart.js
        setTimeout(renderCharts, 100);
    }
}

function renderMiniFrame(canvasId, frameData) {
    let canvas = document.getElementById(canvasId);
    if(!canvas || !frameData) return;
    let ctx = canvas.getContext('2d');
    
    // create a temp 480x480 to use existing radial logic, then scale down
    let tempC = document.createElement('canvas');
    tempC.width = 480; tempC.height = 480;
    let tCtx = tempC.getContext('2d');
    
    gaitAlphaCtx.clearRect(0,0,480,480);
    for(let i=0; i<2304; i++) {
        let val = frameData[i];
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
    let outData = tCtx.createImageData(480,480);
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
    tCtx.putImageData(outData, 0, 0);
    
    ctx.drawImage(tempC, 0, 0, 480, 480, 0, 0, 120, 120);
}

// CHARTS

let chartInstances = {};

function renderCharts() {
    // Destroy existing charts
    Object.values(chartInstances).forEach(c => { if(c) c.destroy(); });
    chartInstances = {};

    let leftSteps = gaitResults.processedSteps.filter(s => s.type === 'Sol Ayak');
    let rightSteps = gaitResults.processedSteps.filter(s => s.type === 'Sağ Ayak');

    // --- Yürüme Fazları Analizi ---
    
    // 1. Bölgesel Basınç Dağılımı (Bar)
    let ctxPhaseBar = document.getElementById('chartGaitPhaseBar');
    if (ctxPhaseBar) {
        let labels = gaitResults.processedSteps.map(s => s.id + (s.type === 'Sol Ayak' ? 'S' : 'R'));
        let heelData = gaitResults.processedSteps.map(s => s.regional.heelPct);
        let midData = gaitResults.processedSteps.map(s => s.regional.midPct);
        let foreData = gaitResults.processedSteps.map(s => s.regional.forePct);

        chartInstances['phaseBar'] = new Chart(ctxPhaseBar, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    { label: 'Topuk', data: heelData, backgroundColor: '#f43f5e' },
                    { label: 'Orta Ayak', data: midData, backgroundColor: '#14b8a6' },
                    { label: 'Ön Ayak', data: foreData, backgroundColor: '#0ea5e9' }
                ]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { title: { display: true, text: 'Bölgesel Basınç Dağılımı' } },
                scales: { y: { beginAtZero: true, max: 100 } }
            }
        });
    }

    // 2. Ortalama Duruş Süreleri (Bar)
    let ctxStanceTime = document.getElementById('chartStanceTimeBar');
    if (ctxStanceTime) {
        chartInstances['stanceTime'] = new Chart(ctxStanceTime, {
            type: 'bar',
            data: {
                labels: ['Sol Ayak', 'Sağ Ayak'],
                datasets: [{
                    label: 'Duruş Süresi (ms)',
                    data: [gaitResults.metrics.leftStance, gaitResults.metrics.rightStance],
                    backgroundColor: ['#ef4444', '#3b82f6']
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { title: { display: true, text: 'Ortalama Duruş Süreleri' } },
                scales: { y: { beginAtZero: true } }
            }
        });
    }

    // 3. Ortalama Bölgesel Yük Dağılımı (Pie)
    let ctxAvgRegional = document.getElementById('chartAvgRegionalPie');
    if (ctxAvgRegional) {
        let avgHeel = 0, avgMid = 0, avgFore = 0;
        if (gaitResults.processedSteps.length > 0) {
            avgHeel = gaitResults.processedSteps.reduce((acc, s) => acc + s.regional.heelPct, 0) / gaitResults.processedSteps.length;
            avgMid = gaitResults.processedSteps.reduce((acc, s) => acc + s.regional.midPct, 0) / gaitResults.processedSteps.length;
            avgFore = gaitResults.processedSteps.reduce((acc, s) => acc + s.regional.forePct, 0) / gaitResults.processedSteps.length;
        }

        chartInstances['avgRegional'] = new Chart(ctxAvgRegional, {
            type: 'pie',
            data: {
                labels: ['Topuk', 'Orta Ayak', 'Ön Ayak'],
                datasets: [{
                    data: [avgHeel, avgMid, avgFore],
                    backgroundColor: ['#f43f5e', '#14b8a6', '#0ea5e9']
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { title: { display: true, text: 'Ortalama Bölgesel Basınç Dağılımı' } }
            }
        });
    }

    // --- Yer Tepki Kuvveti (GRF) Analizi ---
    function renderGRF(ctxId, steps, colorBase, title) {
        let ctx = document.getElementById(ctxId);
        if (!ctx) return;
        
        let datasets = steps.map(step => {
            let data = step.frames.map((f, i) => {
                let sum = 0;
                for(let j=0; j<2304; j++) sum += f[j];
                return { x: i * 25, y: sum };
            });
            return {
                label: `Adım ${step.id}`,
                data: data,
                borderColor: colorBase,
                borderWidth: 1.5,
                fill: false,
                tension: 0.1,
                pointRadius: 0
            };
        });

        chartInstances[ctxId] = new Chart(ctx, {
            type: 'line',
            data: { datasets: datasets },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { title: { display: true, text: title }, legend: { display: false } },
                scales: { 
                    x: { type: 'linear', title: { display: true, text: 'Zaman (ms)' } },
                    y: { title: { display: true, text: 'Kuvvet (N)' } }
                }
            }
        });
    }
    renderGRF('chartGRFLeft', leftSteps, 'rgba(239, 68, 68, 0.6)', 'Sol Ayak GRF Eğrileri');
    renderGRF('chartGRFRight', rightSteps, 'rgba(59, 130, 246, 0.6)', 'Sağ Ayak GRF Eğrileri');

    // --- COP Trajektorisi ve Metrikler ---
    let ctxCop = document.getElementById('gaitCopChart');
    if (ctxCop) {
        let datasets = [];
        gaitResults.processedSteps.forEach(step => {
            let data = step.copPath.map(p => ({ x: p.x, y: p.y }));
            datasets.push({
                label: `Adım ${step.id} (${step.type})`,
                data: data,
                borderColor: step.type === 'Sol Ayak' ? 'rgba(239, 68, 68, 0.7)' : 'rgba(59, 130, 246, 0.7)',
                showLine: true,
                tension: 0.3,
                pointRadius: 0
            });
        });
        
        chartInstances['copChart'] = new Chart(ctxCop, {
            type: 'scatter',
            data: { datasets: datasets },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { min: 0, max: 48 },
                    y: { reverse: true, min: 0, max: 48 }
                }
            }
        });
    }

    let ctxCopMet = document.getElementById('chartCopMetrics');
    if (ctxCopMet) {
        chartInstances['copMet'] = new Chart(ctxCopMet, {
            type: 'bar',
            data: {
                labels: ['Lateral Sapma (Med-Lat)', 'COP Yol Uzunluğu'],
                datasets: [
                    { label: 'Sol Ayak', data: [12, 15], backgroundColor: '#ef4444' }, // Mock values
                    { label: 'Sağ Ayak', data: [13, 14], backgroundColor: '#3b82f6' }
                ]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { title: { display: true, text: 'COP Metrikleri' } }
            }
        });
    }

    // --- Simetri Analizi ---
    let ctxSymLoad = document.getElementById('chartSymLoadPairs');
    if (ctxSymLoad) {
        let labels = [], leftL = [], rightL = [];
        let pairs = Math.min(leftSteps.length, rightSteps.length);
        for(let i=0; i<pairs; i++) {
            labels.push('Çift ' + (i+1));
            let total = leftSteps[i].maxForce + rightSteps[i].maxForce;
            leftL.push( (leftSteps[i].maxForce / total) * 100 );
            rightL.push( (rightSteps[i].maxForce / total) * 100 );
        }

        chartInstances['symLoad'] = new Chart(ctxSymLoad, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    { label: 'Sol', data: leftL, backgroundColor: '#ef4444' },
                    { label: 'Sağ', data: rightL, backgroundColor: '#3b82f6' }
                ]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { title: { display: true, text: 'Çift Bazlı Yük Dağılımı' } },
                scales: { y: { max: 100 } }
            }
        });
    }

    let ctxSymInd = document.getElementById('chartSymIndices');
    if (ctxSymInd) {
        let labels = [], data = [];
        let pairs = Math.min(leftSteps.length, rightSteps.length);
        for(let i=0; i<pairs; i++) {
            labels.push(i+1);
            data.push( Math.abs(leftSteps[i].maxForce - rightSteps[i].maxForce) / Math.max(leftSteps[i].maxForce, rightSteps[i].maxForce) * 100 );
        }
        chartInstances['symInd'] = new Chart(ctxSymInd, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{ label: 'RSI (%)', data: data, backgroundColor: 'green' }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { title: { display: true, text: 'Çift Simetri İndeksleri' } }
            }
        });
    }

    let ctxSymAvg = document.getElementById('chartSymAvgLoad');
    if (ctxSymAvg) {
        chartInstances['symAvg'] = new Chart(ctxSymAvg, {
            type: 'pie',
            data: {
                labels: ['Sol Ayak', 'Sağ Ayak'],
                datasets: [{
                    data: [gaitResults.metrics.leftLoad, gaitResults.metrics.rightLoad],
                    backgroundColor: ['#ef4444', '#3b82f6']
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { title: { display: true, text: `Ortalama Yük Dağılımı (RSI: %${gaitResults.metrics.forceAsym.toFixed(1)})` } }
            }
        });
    }
}
