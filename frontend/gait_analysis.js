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
        
        let minY = 48, maxY = 0, minX = 48, maxX = 0;
        for(let i=0; i<2304; i++) {
            if (step.aggregate[i] > 5) {
                let r = Math.floor(i/48);
                let c = i%48;
                if (r < minY) minY = r;
                if (r > maxY) maxY = r;
            }
        }
        let footLen = maxY - minY;
        if (footLen < 5) footLen = 5;

        let toeY = minY + footLen * 0.15;
        let foreY = minY + footLen * 0.45;
        let midY = minY + footLen * 0.70;

        for(let i=0; i<2304; i++) {
            if (step.aggregate[i] > 5 && Math.floor(i/48) <= toeY) {
                let c = i%48;
                if (c < minX) minX = c;
                if (c > maxX) maxX = c;
            }
        }
        let centerToeX = (minX + maxX) / 2;

        let regional = { heel: 0, mid: 0, fore: 0 }; 
        let regions5 = { toe1: 0, toes25: 0, fore: 0, mid: 0, heel: 0 };

        step.frames.forEach(frame => {
            let frameForce = 0;
            let sumX = 0;
            let sumY = 0;
            
            for(let i=0; i<2304; i++) {
                let v = frame[i];
                if(v > 5) {
                    let r = Math.floor(i/48); 
                    let c = i%48;             
                    
                    frameForce += v;
                    sumX += (c * v);
                    sumY += (r * v);
                    
                    totalPressureSum += v;
                    
                    // Legacy 3 regions (for backwards compatibility in UI)
                    if (r > midY) regional.heel += v;
                    else if (r > foreY) regional.mid += v;
                    else regional.fore += v;
                    
                    // New 5 regions
                    if (r > midY) {
                        regions5.heel += v;
                    } else if (r > foreY) {
                        regions5.mid += v;
                    } else if (r > toeY) {
                        regions5.fore += v;
                    } else {
                        // Toes
                        if (step.type === 'Sol Ayak') {
                            if (c > centerToeX) regions5.toe1 += v; // Big toe inside (right)
                            else regions5.toes25 += v;
                        } else {
                            if (c < centerToeX) regions5.toe1 += v; // Big toe inside (left)
                            else regions5.toes25 += v;
                        }
                    }
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
            },
            regions5: {
                toe1: totalPressureSum > 0 ? (regions5.toe1 / totalPressureSum * 100) : 0,
                toes25: totalPressureSum > 0 ? (regions5.toes25 / totalPressureSum * 100) : 0,
                fore: totalPressureSum > 0 ? (regions5.fore / totalPressureSum * 100) : 0,
                mid: totalPressureSum > 0 ? (regions5.mid / totalPressureSum * 100) : 0,
                heel: totalPressureSum > 0 ? (regions5.heel / totalPressureSum * 100) : 0,
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
            
            let phaseHtml = '';
            for(let i=0; i<5; i++) {
                phaseHtml += `<div class="flex flex-col items-center">
                    <canvas id="phase_${step.id}_${i}" width="100" height="100" class="bg-black rounded-lg border border-slate-800"></canvas>
                    <span class="text-xs text-slate-500 mt-2 font-medium">Faz ${i+1}</span>
                </div>`;
            }
            
            let titleColor = step.type === 'Sol Ayak' ? 'text-red-600' : 'text-blue-600';
            
            div.innerHTML = `
                <h4 class="text-xl font-bold ${titleColor} mb-4 border-b border-slate-100 pb-2">Adım ${step.id} - ${step.type}</h4>
                
                <p class="text-sm font-bold text-slate-700 mb-3">5 Faz Görüntüleri</p>
                <div class="flex gap-4 overflow-x-auto mb-8">
                    ${phaseHtml}
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="flex flex-col items-center">
                        <canvas id="agg_${step.id}" width="200" height="200" class="bg-black rounded-xl border-2 border-slate-800 shadow-inner"></canvas>
                    </div>
                    
                    <div class="flex flex-col">
                        <div class="w-full h-48 relative border border-slate-200 rounded-lg p-2 bg-slate-50">
                            <canvas id="profileChart_${step.id}"></canvas>
                        </div>
                    </div>
                    
                    <div class="flex flex-col">
                        <div class="w-full h-48 relative border border-slate-200 rounded-lg p-2 bg-slate-50">
                            <canvas id="copPath_${step.id}"></canvas>
                        </div>
                    </div>
                </div>
            `;
            detailsContainer.appendChild(div);
            
            for(let i=0; i<5; i++) {
                renderMiniFrame(`phase_${step.id}_${i}`, step.phases[i], 100);
            }
            // Draw aggregate frame
            renderMiniFrame(`agg_${step.id}`, step.aggregate, 200);
        });
        
        // Render Chart.js
        setTimeout(renderCharts, 100);
    }
}

function renderMiniFrame(canvasId, frameData, outSize=120) {
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
            let cx = col * 10 + 5;
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
    
    ctx.drawImage(tempC, 0, 0, 480, 480, 0, 0, outSize, outSize);
}

// CHARTS

Chart.register({
    id: 'barLabels',
    afterDatasetsDraw: function(chart) {
        if (chart.config.type !== 'bar') return;
        const ctx = chart.ctx;
        chart.data.datasets.forEach((dataset, i) => {
            let meta = chart.getDatasetMeta(i);
            meta.data.forEach((element, index) => {
                let value = dataset.data[index];
                if(value <= 0) return;
                ctx.fillStyle = '#475569';
                ctx.font = 'bold 11px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';
                let text = Math.round(value) + '%';
                ctx.fillText(text, element.x, element.y - 5);
            });
        });
    }
});

Chart.register({
    id: 'pieLabels',
    afterDraw: function(chart) {
        if (chart.config.type !== 'pie') return;
        const ctx = chart.ctx;
        chart.data.datasets.forEach((dataset, i) => {
            let meta = chart.getDatasetMeta(i);
            meta.data.forEach((element, index) => {
                let value = dataset.data[index];
                if(value <= 0) return;
                let center = element.tooltipPosition();
                ctx.fillStyle = 'white';
                ctx.font = 'bold 12px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                let text = value.toFixed(1) + '%';
                ctx.fillText(text, center.x, center.y);
            });
        });
    }
});

Chart.register({
    id: 'horizontalLines',
    afterDraw: function(chart) {
        if (chart.config.options.horizontalLines) {
            const ctx = chart.ctx;
            const xAxis = chart.scales.x;
            const yAxis = chart.scales.y;
            chart.config.options.horizontalLines.forEach(line => {
                let y = yAxis.getPixelForValue(line.y);
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(xAxis.left, y);
                ctx.lineTo(xAxis.right, y);
                ctx.lineWidth = line.width || 1;
                ctx.strokeStyle = line.color || 'black';
                if (line.dash) ctx.setLineDash(line.dash);
                ctx.stroke();
                ctx.restore();
            });
        }
    }
});


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
                // Scale raw sum down to approximate Newtons for visualization (e.g. max ~150)
                return { x: i * 25, y: sum / 300 }; 
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
                plugins: { title: { display: true, text: title + ` (${steps.length} Adım)` }, legend: { display: false } },
                scales: { 
                    x: { type: 'linear', title: { display: true, text: 'Zaman (ms)' } },
                    y: { title: { display: true, text: 'Kuvvet (N)' }, min: 0 }
                }
            }
        });
    }
    
    renderGRF('chartGRFLeft', leftSteps, 'rgba(239, 68, 68, 0.6)', 'Sol Ayak GRF Eğrileri');
    renderGRF('chartGRFRight', rightSteps, 'rgba(59, 130, 246, 0.6)', 'Sağ Ayak GRF Eğrileri');

    // Calculate FTI and Loading Rate
    let leftFTI = 0, rightFTI = 0;
    let leftLR = 0, rightLR = 0;
    
    leftSteps.forEach(step => {
        let forces = step.frames.map(f => f.reduce((a,b)=>a+b, 0) / 300);
        leftFTI += forces.reduce((a,b)=>a+b, 0) * 25; // Force * Time (ms)
        
        // Max loading rate in first 30% of stance
        let lr = 0;
        let limit = Math.floor(forces.length * 0.3);
        for(let i=1; i<limit; i++) {
            let rate = (forces[i] - forces[i-1]) / 25; // N/ms
            if(rate > lr) lr = rate;
        }
        leftLR += lr;
    });
    
    rightSteps.forEach(step => {
        let forces = step.frames.map(f => f.reduce((a,b)=>a+b, 0) / 300);
        rightFTI += forces.reduce((a,b)=>a+b, 0) * 25;
        
        let lr = 0;
        let limit = Math.floor(forces.length * 0.3);
        for(let i=1; i<limit; i++) {
            let rate = (forces[i] - forces[i-1]) / 25;
            if(rate > lr) lr = rate;
        }
        rightLR += lr;
    });
    
    let totalFTI = leftFTI + rightFTI || 1;
    let totalLR = leftLR + rightLR || 1;
    
    let ftiLeftPct = (leftFTI / totalFTI * 100).toFixed(1);
    let ftiRightPct = (rightFTI / totalFTI * 100).toFixed(1);
    
    let lrLeftPct = (leftLR / totalLR * 100).toFixed(1);
    let lrRightPct = (rightLR / totalLR * 100).toFixed(1);
    
    const elFTI = document.getElementById('grfFTI');
    if(elFTI) elFTI.innerText = `FTI: Sol %${ftiLeftPct} / Sağ %${ftiRightPct}`;
    
    const elLR = document.getElementById('grfLoadingRate');
    if(elLR) elLR.innerText = `Yüklenme Hızı: Sol %${lrLeftPct} / Sağ %${lrRightPct}`;

    // --- COP Trajektorisi ve Metrikler ---
    let ctxCop = document.getElementById('gaitCopChart');
    if (ctxCop) {
        let datasets = [];
        gaitResults.processedSteps.forEach(step => {
            let data = step.copPath.map(p => ({ x: p.x, y: p.y }));
            if (data.length === 0) return;
            
            let color = step.type === 'Sol Ayak' ? 'rgba(239, 68, 68, 0.7)' : 'rgba(59, 130, 246, 0.7)';
            
            datasets.push({
                label: `Adım ${step.id}`,
                data: data,
                borderColor: color,
                borderWidth: 2,
                showLine: true,
                tension: 0.4,
                pointRadius: 0
            });
            
            // Start point (circle)
            datasets.push({
                label: `Adım ${step.id} Başlangıç`,
                data: [data[0]],
                backgroundColor: color,
                pointRadius: 5
            });
            
            // End point (cross)
            datasets.push({
                label: `Adım ${step.id} Bitiş`,
                data: [data[data.length-1]],
                backgroundColor: color,
                pointStyle: 'crossRot',
                pointRadius: 6,
                borderWidth: 2
            });
        });
        
        chartInstances['copChart'] = new Chart(ctxCop, {
            type: 'scatter',
            data: { datasets: datasets },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { 
                    title: { display: true, text: 'COP Trajektorileri (Kırmızı: Sol, Mavi: Sağ)' },
                    legend: { display: false } 
                },
                scales: {
                    x: { title: { display: true, text: 'X (piksel)' } },
                    y: { reverse: true, title: { display: true, text: 'Y (piksel)' } }
                }
            }
        });
    }

    let ctxCopMet = document.getElementById('chartCopMetrics');
    if (ctxCopMet) {
        // Calculate Metrics
        let leftLat = [], leftLen = [];
        let rightLat = [], rightLen = [];
        
        gaitResults.processedSteps.forEach(step => {
            if (step.copPath.length < 2) return;
            let minX = Math.min(...step.copPath.map(p => p.x));
            let maxX = Math.max(...step.copPath.map(p => p.x));
            let lat = maxX - minX;
            
            let len = 0;
            for(let i=1; i<step.copPath.length; i++) {
                let dx = step.copPath[i].x - step.copPath[i-1].x;
                let dy = step.copPath[i].y - step.copPath[i-1].y;
                len += Math.sqrt(dx*dx + dy*dy);
            }
            
            if (step.type === 'Sol Ayak') {
                leftLat.push(lat); leftLen.push(len);
            } else {
                rightLat.push(lat); rightLen.push(len);
            }
        });
        
        let avgLeftLat = leftLat.length ? leftLat.reduce((a,b)=>a+b)/leftLat.length : 0;
        let avgRightLat = rightLat.length ? rightLat.reduce((a,b)=>a+b)/rightLat.length : 0;
        let avgLeftLen = leftLen.length ? leftLen.reduce((a,b)=>a+b)/leftLen.length : 0;
        let avgRightLen = rightLen.length ? rightLen.reduce((a,b)=>a+b)/rightLen.length : 0;

        chartInstances['copMet'] = new Chart(ctxCopMet, {
            type: 'bar',
            data: {
                labels: ['Lateral Sapma (Med-Lat)', 'COP Yol Uzunluğu (Toplam)'],
                datasets: [
                    { label: 'Sol Ayak', data: [avgLeftLat, avgLeftLen], backgroundColor: '#ef4444' },
                    { label: 'Sağ Ayak', data: [avgRightLat, avgRightLen], backgroundColor: '#3b82f6' }
                ]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { title: { display: true, text: 'COP Metrikleri (Basınç Merkezi Analizi)' } },
                scales: { y: { title: { display: true, text: 'piksel' } } }
            }
        });
    }

    // --- Sol - Sağ Ayak Karşılaştırması ---
    let compLeftTitle = document.getElementById('compLeftTitle');
    let compRightTitle = document.getElementById('compRightTitle');
    if (compLeftTitle) compLeftTitle.innerText = `Sol Ayak (n=${leftSteps.length})`;
    if (compRightTitle) compRightTitle.innerText = `Sağ Ayak (n=${rightSteps.length})`;

    // Composite aggregates
    let leftComposite = new Uint8Array(2304);
    let rightComposite = new Uint8Array(2304);
    
    leftSteps.forEach(s => {
        for(let i=0; i<2304; i++) {
            if(s.aggregate[i] > leftComposite[i]) leftComposite[i] = s.aggregate[i];
        }
    });
    rightSteps.forEach(s => {
        for(let i=0; i<2304; i++) {
            if(s.aggregate[i] > rightComposite[i]) rightComposite[i] = s.aggregate[i];
        }
    });
    
    renderMiniFrame('compLeftCanvas', leftComposite, 240);
    renderMiniFrame('compRightCanvas', rightComposite, 240);

    // Tables
    let tbodyPairs = document.getElementById('compPairsTableBody');
    if (tbodyPairs) {
        tbodyPairs.innerHTML = '';
        let pairs = Math.min(leftSteps.length, rightSteps.length);
        for(let i=0; i<pairs; i++) {
            let total = leftSteps[i].maxForce + rightSteps[i].maxForce;
            let lPct = ((leftSteps[i].maxForce / total) * 100).toFixed(1);
            let rPct = ((rightSteps[i].maxForce / total) * 100).toFixed(1);
            let rsi = (Math.abs(leftSteps[i].maxForce - rightSteps[i].maxForce) / Math.max(leftSteps[i].maxForce, rightSteps[i].maxForce) * 100).toFixed(1);
            
            // Simetri renklendirme
            let bgClass = rsi < 10 ? 'bg-green-100' : (rsi < 20 ? 'bg-orange-100' : 'bg-red-100');
            
            let tr = document.createElement('tr');
            tr.className = 'border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors';
            tr.innerHTML = `
                <td class="px-4 py-2.5 font-medium text-slate-700">Çift ${i+1}</td>
                <td class="px-4 py-2.5">Adım ${leftSteps[i].id}</td>
                <td class="px-4 py-2.5">Adım ${rightSteps[i].id}</td>
                <td class="px-4 py-2.5">%${lPct} / %${rPct}</td>
                <td class="px-4 py-2.5 ${bgClass} font-bold text-slate-700 text-center">%${rsi}</td>
            `;
            tbodyPairs.appendChild(tr);
        }
    }

    let tbodyAvg = document.getElementById('compAvgTableBody');
    if (tbodyAvg) {
        tbodyAvg.innerHTML = `
            <tr class="border-b border-slate-100">
                <td class="px-4 py-2.5 font-medium text-slate-700">Çift Sayısı</td>
                <td class="px-4 py-2.5">${leftSteps.length}</td>
                <td class="px-4 py-2.5">${rightSteps.length}</td>
            </tr>
            <tr>
                <td class="px-4 py-2.5 font-medium text-slate-700">Yük Dağılımı (%)</td>
                <td class="px-4 py-2.5 font-bold">${gaitResults.metrics.leftLoad.toFixed(1)}%</td>
                <td class="px-4 py-2.5 font-bold">${gaitResults.metrics.rightLoad.toFixed(1)}%</td>
            </tr>
        `;
    }

    let tbodyEval = document.getElementById('compEvalTableBody');
    if (tbodyEval) {
        let rsi = gaitResults.metrics.forceAsym;
        let severity = rsi < 10 ? 'Simetrik' : (rsi < 20 ? 'Hafif Asimetri' : 'Belirgin Asimetri');
        let bgClass = rsi < 10 ? 'bg-green-100' : (rsi < 20 ? 'bg-amber-100' : 'bg-red-100');
        
        tbodyEval.innerHTML = `
            <tr>
                <td class="px-4 py-3 font-medium text-slate-700">Ortalama Çift Simetrisi</td>
                <td class="px-4 py-3 ${bgClass} font-bold text-slate-800 text-center">%${rsi.toFixed(1)} - ${severity}</td>
            </tr>
        `;
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
                scales: { y: { max: 100, title: { display: true, text: 'Yük Dağılımı (%)' } } },
                horizontalLines: [{ y: 50, color: 'green', dash: [5, 5], width: 2 }]
            }
        });
    }

    let ctxSymInd = document.getElementById('chartSymIndices');
    if (ctxSymInd) {
        let labels = [], data = [];
        let pairs = Math.min(leftSteps.length, rightSteps.length);
        for(let i=0; i<pairs; i++) {
            labels.push(i+1);
            let lF = leftSteps[i].maxForce;
            let rF = rightSteps[i].maxForce;
            data.push( Math.abs(lF - rF) / Math.max(lF, rF) * 100 );
        }
        chartInstances['symInd'] = new Chart(ctxSymInd, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    { label: 'RSI (%)', data: data, backgroundColor: 'green' },
                    { label: 'Simetrik (<10%)', data: [], borderColor: 'green', borderDash: [5,5], type: 'line' },
                    { label: 'Hafif (<20%)', data: [], borderColor: 'orange', borderDash: [5,5], type: 'line' }
                ]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { title: { display: true, text: 'Çift Simetri İndeksleri' } },
                scales: { 
                    x: { title: { display: true, text: 'Adım Çifti' } },
                    y: { max: 25, title: { display: true, text: 'RSI (%)' } } 
                },
                horizontalLines: [
                    { y: 10, color: 'green', dash: [5, 5], width: 2 },
                    { y: 20, color: 'orange', dash: [5, 5], width: 2 }
                ]
            }
        });
    }

    let ctxSymAvg = document.getElementById('chartSymAvgLoad');
    if (ctxSymAvg) {
        let rsi = gaitResults.metrics.forceAsym;
        let severity = rsi < 10 ? 'Simetrik' : (rsi < 20 ? 'Hafif Asimetri' : 'Belirgin Asimetri');
        
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
                plugins: { 
                    title: { 
                        display: true, 
                        text: ['Ortalama Yük Dağılımı', `RSI: %${rsi.toFixed(1)} (${severity})`]
                    },
                    legend: { position: 'right' }
                }
            }
        });
    }

    
    // --- 5 Bölge Yük Dağılımı Analizi ---
    let fiveRegionSection = document.getElementById('fiveRegionSection');
    let fiveRegionGrid = document.getElementById('fiveRegionGrid');
    if (fiveRegionSection && fiveRegionGrid) {
        fiveRegionSection.classList.remove('hidden');
        fiveRegionGrid.innerHTML = '';
        
        gaitResults.processedSteps.forEach(step => {
            let container = document.createElement('div');
            container.className = "w-full h-64 relative border border-slate-200 rounded-lg p-2 bg-slate-50";
            container.innerHTML = `<canvas id="chart5reg_${step.id}"></canvas>`;
            fiveRegionGrid.appendChild(container);
            
            setTimeout(() => {
                let ctx = document.getElementById(`chart5reg_${step.id}`);
                if (ctx) {
                    chartInstances[`chart5reg_${step.id}`] = new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: ['Başparmak', 'Parmaklar', 'Ön Ayak', 'Orta Ayak', 'Topuk'],
                            datasets: [{
                                data: [step.regions5.toe1, step.regions5.toes25, step.regions5.fore, step.regions5.mid, step.regions5.heel],
                                backgroundColor: ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'] // Purple, Blue, Green, Orange, Red
                            }]
                        },
                        options: {
                            responsive: true, maintainAspectRatio: false,
                            plugins: { 
                                title: { display: true, text: `Adım ${step.id} - ${step.type.replace(' Ayak','')}` },
                                legend: { display: false },
                                datalabels: {
                                    display: true,
                                    anchor: 'end',
                                    align: 'top',
                                    formatter: (val) => Math.round(val) + '%',
                                    font: { weight: 'bold', size: 10 }
                                }
                            },
                            scales: { 
                                x: { ticks: { font: { size: 10 } } },
                                y: { min: 0, max: 100, title: { display: true, text: '%' } } 
                            }
                        }
                    });
                }
            }, 150);
        });
    }

    // --- Per-Step Detail Charts (Basınç/Alan Profili ve COP Yolu) ---
    gaitResults.processedSteps.forEach(step => {
        let ctxProfile = document.getElementById(`profileChart_${step.id}`);
        if (ctxProfile) {
            let labels = Array.from({length: step.frames.length}, (_, i) => i+1);
            let pressureData = step.frames.map(f => {
                let sum = 0;
                for(let i=0; i<2304; i++) sum += f[i];
                return sum;
            });
            let maxP = Math.max(...pressureData) || 1;
            let normPressure = pressureData.map(v => (v / maxP) * 100);

            let areaData = step.frames.map(f => {
                let count = 0;
                for(let i=0; i<2304; i++) if(f[i] > 5) count++;
                return count;
            });
            let maxA = Math.max(...areaData) || 1;
            let normArea = areaData.map(v => (v / maxA) * 100);

            chartInstances[`profile_${step.id}`] = new Chart(ctxProfile, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Basınç',
                            data: normPressure,
                            borderColor: 'blue',
                            backgroundColor: 'rgba(59, 130, 246, 0.2)',
                            borderWidth: 2, fill: true, tension: 0.4, pointRadius: 0
                        },
                        {
                            label: 'Alan',
                            data: normArea,
                            borderColor: 'green',
                            borderDash: [5, 5],
                            borderWidth: 2, fill: false, tension: 0.4, pointRadius: 0
                        }
                    ]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    plugins: { title: { display: true, text: 'Yürüme Fazları Analizi' }, legend: { display: true, position: 'top', align: 'center' } },
                    scales: { y: { min: 0, max: 100, title: { display: true, text: 'Normalize Değer (%)' } } }
                }
            });
        }

        let ctxRegional = document.getElementById(`regionalChart_${step.id}`);
        if (ctxRegional) {
            chartInstances[`regionalChart_${step.id}`] = new Chart(ctxRegional, {
                type: 'bar',
                data: {
                    labels: ['Topuk', 'Orta Ayak', 'Ön Ayak'],
                    datasets: [{
                        data: [step.regional.heelPct, step.regional.midPct, step.regional.forePct],
                        backgroundColor: ['#ef4444', '#10b981', '#f59e0b'] // Red, Green, Orange
                    }]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    plugins: { 
                        title: { display: true, text: 'Bölgesel Dağılım' },
                        legend: { display: false },
                        datalabels: {
                            display: true,
                            anchor: 'end',
                            align: 'top',
                            formatter: Math.round,
                            font: { weight: 'bold' }
                        }
                    },
                    scales: { y: { min: 0, max: 100, title: { display: true, text: '%' } } }
                }
            });
        }
        
        let ctxCopPath = document.getElementById(`copPath_${step.id}`);
        if (ctxCopPath) {
            let data = step.copPath.map(p => ({ x: p.x, y: p.y }));
            chartInstances[`copPath_${step.id}`] = new Chart(ctxCopPath, {
                type: 'scatter',
                data: {
                    datasets: [
                        {
                            label: 'Yol',
                            data: data,
                            borderColor: 'rgba(156, 163, 175, 0.5)', // gray
                            borderWidth: 2, showLine: true, tension: 0.4, pointRadius: 3, pointBackgroundColor: 'rgba(239, 68, 68, 0.5)'
                        },
                        {
                            label: 'Başlangıç',
                            data: data.length > 0 ? [data[0]] : [],
                            backgroundColor: 'green',
                            pointRadius: 6
                        },
                        {
                            label: 'Bitiş',
                            data: data.length > 0 ? [data[data.length-1]] : [],
                            backgroundColor: 'red',
                            pointStyle: 'crossRot',
                            pointRadius: 8,
                            borderWidth: 3
                        }
                    ]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    plugins: { title: { display: true, text: 'COP Yolu' }, legend: { display: true, position: 'right' } },
                    scales: { 
                        x: { reverse: false, title: { display: true, text: 'X' } },
                        y: { reverse: true, title: { display: true, text: 'Y' } }
                    }
                }
            });
        }
    });

}
