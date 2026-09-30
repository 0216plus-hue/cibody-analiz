
let balanceWs = null;
let isBalanceRecording = false;
let balanceTimerInterval = null;
let balanceTimeLeft = 30;
let balanceChartInstances = {};

let activeTestType = 'cift_acik';
let currentBalanceSession = {
    cift_acik: null,
    cift_kapali: null,
    tek_sol_acik: null,
    tek_sag_acik: null
};

// Temp array during live recording
let balanceCopData = [];

function selectBalanceTest(type) {
    if (isBalanceRecording) return;
    activeTestType = type;
    
    // UI update for cards
    const types = ['cift_acik', 'cift_kapali', 'tek_sol_acik', 'tek_sag_acik'];
    types.forEach(t => {
        const card = document.getElementById('card_' + t);
        if(!card) return;
        if(t === activeTestType) {
            card.className = "test-card cursor-pointer border-2 border-indigo-500 bg-indigo-50 rounded-xl p-3 flex justify-between items-center transition-all";
            // if completed, keep the checkmark, else show arrow
            let icon = document.getElementById('icon_' + t);
            if(currentBalanceSession[t]) {
                icon.className = "fa-solid fa-circle-check text-emerald-500 text-lg";
            } else {
                icon.className = "fa-solid fa-chevron-right text-indigo-500";
            }
        } else {
            card.className = "test-card cursor-pointer border border-slate-200 hover:border-indigo-300 rounded-xl p-3 flex justify-between items-center transition-all";
            let icon = document.getElementById('icon_' + t);
            if(currentBalanceSession[t]) {
                icon.className = "fa-solid fa-circle-check text-emerald-500 text-lg";
            } else {
                icon.className = "fa-solid fa-circle border-2 border-slate-300 rounded-full w-4 h-4";
            }
        }
    });
}

function startBalanceTest() {
    if (balanceWs) balanceWs.close();
    
    balanceCopData = [];
    balanceTimeLeft = activeTestType.includes('tek') ? 15 : 30;
    
    document.getElementById('btnStartBalance').classList.add('hidden');
    document.getElementById('btnStopBalance').classList.remove('hidden');
    
    const statusBadge = document.getElementById('balanceLiveStatus');
    statusBadge.innerHTML = '<i class="fa-solid fa-circle text-red-500 animate-pulse"></i> CANLI';
    statusBadge.className = 'absolute top-4 left-4 bg-slate-800/80 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-2 border border-slate-600 z-10';
    
    const indicator = document.getElementById('balanceRecordingIndicator');
    if(indicator) indicator.classList.remove('hidden');
    
    const timerDisplay = document.getElementById('balanceTimerDisplay');
    timerDisplay.innerText = balanceTimeLeft;
    
    let isConnected = false;
    balanceWs = new WebSocket('ws://localhost:8765');
    balanceWs.binaryType = 'arraybuffer';
    
    balanceWs.onopen = () => { 
        isConnected = true;
        isBalanceRecording = true; 
        balanceTimerInterval = setInterval(() => {
            balanceTimeLeft--;
            timerDisplay.innerText = balanceTimeLeft;
            if(balanceTimeLeft <= 0) {
                completeBalanceTest();
            }
        }, 1000);
    };
    
    balanceWs.onmessage = (event) => {
        if (!isBalanceRecording) return;
        let data = new Uint8Array(event.data);
        if (data.length === 2304) {
            processBalanceFrame(data);
        } else if (data.length === 6912) {
            let frame = data.slice(2304, 4608);
            processBalanceFrame(frame);
        }
    };
    
    balanceWs.onclose = () => {
        if(!isConnected) {
            showToast("Sensör bağlantısı kurulamadı!");
            stopBalanceTest();
        }
    };
}

function stopBalanceTest() {
    isBalanceRecording = false;
    if(balanceWs) balanceWs.close();
    if(balanceTimerInterval) clearInterval(balanceTimerInterval);
    
    document.getElementById('btnStopBalance').classList.add('hidden');
    document.getElementById('btnStartBalance').classList.remove('hidden');
    
    document.getElementById('balanceTimerDisplay').innerText = '--';
    const indicator = document.getElementById('balanceRecordingIndicator');
    if(indicator) indicator.classList.add('hidden');
    
    const statusBadge = document.getElementById('balanceLiveStatus');
    statusBadge.innerHTML = '<i class="fa-solid fa-bed text-slate-400"></i> Bekleniyor...';
    statusBadge.className = 'absolute top-4 left-4 bg-slate-800/80 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-2 border border-slate-600 z-10';
    
    // Clear canvas
    let canvas = document.getElementById('balance_live_canvas');
    if(canvas) {
        let ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

function processBalanceFrame(frameData) {
    let canvas = document.getElementById('balance_live_canvas');
    if(!canvas) return;
    let ctx = canvas.getContext('2d');
    
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    let wX = 0, wY = 0, totalP = 0;
    
    for (let i = 0; i < 2304; i++) {
        let val = frameData[i];
        if (val > 5) {
            let y = Math.floor(i / 48);
            let x = i % 48;
            let mirroredX = 47 - x;
            
            wX += mirroredX * val;
            wY += y * val;
            totalP += val;
            
            let cx = mirroredX * 10;
            let cy = y * 10;
            
            let grad = ctx.createRadialGradient(cx + 5, cy + 5, 1, cx + 5, cy + 5, 8);
            grad.addColorStop(0, `hsla(${(255 - val)}, 100%, 50%, 0.8)`);
            grad.addColorStop(1, 'transparent');
            ctx.fillStyle = grad;
            ctx.fillRect(cx, cy, 10, 10);
        }
    }
    
    if (totalP > 200) {
        let copX = wX / totalP;
        let copY = wY / totalP;
        
        let realX = copX * 10;
        let realY = copY * 10;
        
        let totalTime = activeTestType.includes('tek') ? 15 : 30;
        balanceCopData.push({ x: realX, y: realY, t: totalTime - balanceTimeLeft });
        
        // Draw COP
        ctx.beginPath();
        ctx.arc(copX * 10 + 5, copY * 10 + 5, 4, 0, 2*Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'black';
        ctx.stroke();
        
        // Update DOM
        const lx = document.getElementById('liveCopX');
        const ly = document.getElementById('liveCopY');
        if(lx) lx.innerText = realX.toFixed(1);
        if(ly) ly.innerText = realY.toFixed(1);
    }
}

function completeBalanceTest() {
    stopBalanceTest();
    if(balanceCopData.length < 50) {
        showToast("Yeterli veri toplanamadı.");
        return;
    }
    
    // Save to session
    let metrics = calculateBalanceMetrics(balanceCopData, activeTestType);
    metrics.data = balanceCopData;
    currentBalanceSession[activeTestType] = metrics;
    
    // Update UI Card
    let icon = document.getElementById('icon_' + activeTestType);
    if(icon) {
        icon.className = "fa-solid fa-circle-check text-emerald-500 text-lg";
    }
    
    showToast("Test başarıyla kaydedildi. Diğer aşamalara geçebilirsiniz.");
    
    // Enable View Report button
    let btnRep = document.getElementById('btnViewBalanceReport');
    if(btnRep) {
        btnRep.classList.remove('opacity-50', 'cursor-not-allowed');
    }
    
    // Auto-advance
    if(activeTestType === 'cift_acik') selectBalanceTest('cift_kapali');
    else if(activeTestType === 'cift_kapali') selectBalanceTest('tek_sol_acik');
    else if(activeTestType === 'tek_sol_acik') selectBalanceTest('tek_sag_acik');
}

function calculateBalanceMetrics(data, testType) {
    if (data.length < 5) return null;
    
    // 1. Bilimsel Filtreleme (Moving Average / Noise Reduction)
    // Sensördeki mikro titreşimler (ADC gürültüsü) path uzunluğunu suni olarak artırır.
    // Düzeltmek için 5-frame moving average (Hareketli Ortalama) uyguluyoruz.
    let smoothedData = [];
    let window = 5;
    for(let i = 0; i < data.length; i++) {
        let start = Math.max(0, i - Math.floor(window/2));
        let end = Math.min(data.length - 1, i + Math.floor(window/2));
        let sumX = 0, sumY = 0;
        let count = end - start + 1;
        for(let j = start; j <= end; j++) {
            sumX += data[j].x;
            sumY += data[j].y;
        }
        smoothedData.push({
            x: sumX / count,
            y: sumY / count,
            t: data[i].t
        });
    }
    
    // 2. Metriklerin Hesaplanması (Sway Path)
    let pathLength = 0;
    let sumX = 0, sumY = 0;
    for(let i = 0; i < smoothedData.length; i++) {
        sumX += smoothedData[i].x;
        sumY += smoothedData[i].y;
        if(i > 0) {
            let dx = smoothedData[i].x - smoothedData[i-1].x;
            let dy = smoothedData[i].y - smoothedData[i-1].y;
            pathLength += Math.sqrt(dx*dx + dy*dy);
        }
    }
    
    let n = smoothedData.length;
    let meanX = sumX / n;
    let meanY = sumY / n;
    
    // 3. PCA (Principal Component Analysis) ile %95 Güven Elipsi (Confidence Ellipse)
    let c11 = 0, c22 = 0, c12 = 0;
    for(let i=0; i<n; i++) {
        let dx = smoothedData[i].x - meanX;
        let dy = smoothedData[i].y - meanY;
        c11 += dx*dx;
        c22 += dy*dy;
        c12 += dx*dy;
    }
    // Kovaryans Matrisi
    c11 /= (n-1);
    c22 /= (n-1);
    c12 /= (n-1);
    
    // Özdeğerler (Eigenvalues)
    let trace = c11 + c22;
    let det = c11*c22 - c12*c12;
    let root = Math.sqrt(Math.max(0, trace*trace - 4*det));
    let lambda1 = (trace + root) / 2;
    let lambda2 = (trace - root) / 2;
    
    // Chi-square değeri = 5.991 (2 Serbestlik Derecesi için %95 Güven Aralığı)
    let ellipseAreaMm = Math.PI * 5.991 * Math.sqrt(Math.max(0, lambda1 * lambda2));
    
    // Gerçek test süresine göre Hız (Speed)
    let duration = testType.includes('tek') ? 15.0 : 30.0;
    let meanVelMm = pathLength / duration;
    
    return {
        pathCm: pathLength / 10.0,
        velCm: meanVelMm / 10.0,
        areaCm: ellipseAreaMm / 100.0,
        duration: duration,
        nFrames: n,
        meanX: meanX,
        meanY: meanY,
        // Düzeltilmiş veriyi grafikler için saklıyoruz
        smoothedData: smoothedData
    };
}

function viewBalanceReport() {
    let hasAnyData = Object.values(currentBalanceSession).some(x => x !== null);
    if(!hasAnyData) {
        showToast("Lütfen önce en az bir test aşamasını tamamlayın.");
        return;
    }
    
    document.getElementById('balanceRecordingSection').classList.add('hidden');
    document.getElementById('balanceResultsSection').classList.remove('hidden');
    
    document.getElementById('btnSaveBalance').classList.remove('hidden');
    document.getElementById('btnDownloadBalancePdf').classList.remove('hidden');
    
    renderMasterTable();
    
    // Render detailed charts and reference tables for all completed tests
    renderAllTestDetails();
}

function renderMasterTable() {
    let tbody = document.getElementById('masterResultsTableBody');
    if(!tbody) return;
    tbody.innerHTML = '';
    
    const types = [
        {k: 'cift_acik', l: 'Çift Ayak (Açık)'},
        {k: 'cift_kapali', l: 'Çift Ayak (Kapalı)'},
        {k: 'tek_sol_acik', l: 'Tek Ayak Sol'},
        {k: 'tek_sag_acik', l: 'Tek Ayak Sağ'}
    ];
    
    types.forEach(t => {
        let m = currentBalanceSession[t.k];
        if(!m) return;
        
        let pathS = getStatusColor(m.pathCm, t.k.includes('tek') ? 100 : 40, t.k.includes('tek') ? 180 : 70);
        let areaS = getStatusColor(m.areaCm, t.k.includes('tek') ? 20 : 4, t.k.includes('tek') ? 40 : 8);
        let velS = getStatusColor(m.velCm, t.k.includes('tek') ? 5.0 : 1.2, t.k.includes('tek') ? 8.0 : 2.0);
        
        // For Double Leg Closed, we don't have hard reference limits in UI but we'll leave it neutral or use open ones.
        if(t.k === 'cift_kapali') { pathS = 'text-slate-700'; areaS = 'text-slate-700'; velS = 'text-slate-700'; }
        
        tbody.innerHTML += `
            <tr class="hover:bg-slate-50">
                <td class="px-4 py-3 font-bold text-slate-800">${t.l}</td>
                <td class="px-4 py-3">${m.duration.toFixed(1)}</td>
                <td class="px-4 py-3 font-mono ${pathS}">${m.pathCm.toFixed(2)}</td>
                <td class="px-4 py-3 font-mono ${areaS}">${m.areaCm.toFixed(2)}</td>
                <td class="px-4 py-3 font-mono ${velS}">${m.velCm.toFixed(2)}</td>
                <td class="px-4 py-3 text-emerald-600 font-bold">Optimal</td>
            </tr>
        `;
        
        // Unhide tab button for charts
        let tb = document.getElementById('tab_btn_' + t.k);
        if(tb) tb.classList.remove('hidden');
    });
}

function getStatusColor(val, good, med) {
    if(val < good) return "text-emerald-600";
    if(val <= med) return "text-amber-500";
    return "text-rose-600";
}

function renderAllTestDetails() {
    let container = document.getElementById('balanceAllTestsDetails');
    if(!container) return;
    container.innerHTML = ''; // clear
    
    const types = [
        {k: 'cift_acik', l: 'Çift Ayak (Göz Açık)'},
        {k: 'cift_kapali', l: 'Çift Ayak (Göz Kapalı)'},
        {k: 'tek_sol_acik', l: 'Tek Ayak Sol (Göz Açık)'},
        {k: 'tek_sag_acik', l: 'Tek Ayak Sağ (Göz Açık)'}
    ];
    
    types.forEach(t => {
        let m = currentBalanceSession[t.k];
        if(!m) return;
        
        let section = document.createElement('div');
        section.className = "flex flex-col gap-6 avoid-break bg-slate-50 p-6 rounded-2xl border-2 border-slate-200 mb-8";
        
        // Header
        let header = document.createElement('h2');
        header.className = "text-xl font-black text-indigo-700 border-b-2 border-indigo-200 pb-2 mb-2";
        header.innerHTML = `<i class="fa-solid fa-shoe-prints mr-2"></i>${t.l} - Detaylı Analiz`;
        section.appendChild(header);
        
        // Reference Table
        if(t.k !== 'cift_kapali') {
            let isSingle = t.k.includes('tek');
            let pathGood = isSingle ? 100 : 40;
            let pathMed = isSingle ? 180 : 70;
            let areaGood = isSingle ? 20 : 4;
            let areaMed = isSingle ? 40 : 8;
            let velGood = isSingle ? 5.0 : 1.2;
            let velMed = isSingle ? 8.0 : 2.0;
            
            const getStatus = (val, good, med) => {
                if(val < good) return { text: "İyi", color: "bg-emerald-100 text-emerald-800" };
                if(val <= med) return { text: "Orta", color: "bg-amber-100 text-amber-800" };
                return { text: "Yüksek", color: "bg-rose-100 text-rose-800" };
            };
            
            let pathS = getStatus(m.pathCm, pathGood, pathMed);
            let areaS = getStatus(m.areaCm, areaGood, areaMed);
            let velS = getStatus(m.velCm, velGood, velMed);
            
            let refHTML = `
            <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <h3 class="text-sm font-bold text-slate-700 mb-3 border-b pb-2"><i class="fa-solid fa-table-list mr-2 text-indigo-500"></i>Referans Aralıkları ile Karşılaştırma</h3>
                <div class="overflow-x-auto">
                    <table class="w-full text-sm text-left text-slate-600">
                        <thead class="bg-slate-50 text-slate-700 uppercase text-xs font-bold border-b">
                            <tr>
                                <th class="px-4 py-2">Metrik</th>
                                <th class="px-4 py-2 text-emerald-600">İyi</th>
                                <th class="px-4 py-2 text-amber-500">Orta</th>
                                <th class="px-4 py-2 text-rose-500">Yüksek (Risk)</th>
                                <th class="px-4 py-2 bg-indigo-50 text-indigo-900 border-l">Sizin Değeriniz</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100">
                            <tr class="hover:bg-slate-50">
                                <td class="px-4 py-2 font-medium">Yol Uzunluğu (cm)</td>
                                <td class="px-4 py-2"><${pathGood}</td>
                                <td class="px-4 py-2">${pathGood}-${pathMed}</td>
                                <td class="px-4 py-2">>${pathMed}</td>
                                <td class="px-4 py-2 border-l font-bold ${pathS.color}">${m.pathCm.toFixed(2)} (${pathS.text})</td>
                            </tr>
                            <tr class="hover:bg-slate-50">
                                <td class="px-4 py-2 font-medium">Sallantı Alanı (cm²)</td>
                                <td class="px-4 py-2"><${areaGood}</td>
                                <td class="px-4 py-2">${areaGood}-${areaMed}</td>
                                <td class="px-4 py-2">>${areaMed}</td>
                                <td class="px-4 py-2 border-l font-bold ${areaS.color}">${m.areaCm.toFixed(2)} (${areaS.text})</td>
                            </tr>
                            <tr class="hover:bg-slate-50">
                                <td class="px-4 py-2 font-medium">COP Hızı (cm/s)</td>
                                <td class="px-4 py-2"><${velGood.toFixed(1)}</td>
                                <td class="px-4 py-2">${velGood.toFixed(1)}-${velMed.toFixed(1)}</td>
                                <td class="px-4 py-2">>${velMed.toFixed(1)}</td>
                                <td class="px-4 py-2 border-l font-bold ${velS.color}">${m.velCm.toFixed(2)} (${velS.text})</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>`;
            section.innerHTML += refHTML;
        } else {
            // For cift kapali, we don't have hard references, just a note.
            section.innerHTML += `
            <div class="bg-amber-50 p-4 rounded-xl border border-amber-200 text-amber-800 text-sm">
                <i class="fa-solid fa-circle-info mr-2"></i> Göz Kapalı testlerde Romberg Endeksi hesabı için Göz Açık test verileriyle kıyaslama yapılır. Sabit referans değerleri bulunmamaktadır.
            </div>`;
        }
        
        // Canvas Container
        let chartHTML = `
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full mt-2">
            <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm w-full">
                <h3 class="text-sm font-bold text-slate-700 mb-4 border-b pb-2">Statokinezigram (COP Yörüngesi)</h3>
                <div style="position: relative; height:300px;">
                    <canvas id="scatter_${t.k}"></canvas>
                </div>
            </div>
            <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm w-full flex flex-col gap-4">
                <div>
                    <h3 class="text-sm font-bold text-slate-700 mb-2 border-b pb-2">Stabilogram X (ML)</h3>
                    <div style="position: relative; height:120px;">
                        <canvas id="xline_${t.k}"></canvas>
                    </div>
                </div>
                <div>
                    <h3 class="text-sm font-bold text-slate-700 mb-2 border-b pb-2">Stabilogram Y (AP)</h3>
                    <div style="position: relative; height:120px;">
                        <canvas id="yline_${t.k}"></canvas>
                    </div>
                </div>
            </div>
        </div>`;
        section.innerHTML += chartHTML;
        container.appendChild(section);
        
        // Now draw charts
        drawChartsForSection(t.k, m);
    });
}

function drawChartsForSection(k, m) {
    let data = m.smoothedData || m.data;
    let meanX = m.meanX;
    let meanY = m.meanY;
    
    let scatterData = [];
    let xData = [];
    let yData = [];
    let labels = [];
    
    for(let i=0; i<data.length; i++) {
        let sx = data[i].x - meanX;
        let sy = data[i].y - meanY;
        scatterData.push({x: sx, y: sy});
        xData.push(sx);
        yData.push(sy);
        labels.push('');
    }
    
    new Chart(document.getElementById('scatter_' + k), {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'COP Path',
                data: scatterData,
                backgroundColor: 'rgba(79, 70, 229, 0.5)',
                borderColor: 'rgba(79, 70, 229, 0.8)',
                showLine: true,
                borderWidth: 1.5,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { title: { display: true, text: 'ML (mm)' } },
                y: { title: { display: true, text: 'AP (mm)' } }
            }
        }
    });
    
    new Chart(document.getElementById('xline_' + k), {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'X (ML)',
                data: xData,
                borderColor: '#10b981',
                borderWidth: 1.5,
                pointRadius: 0,
                tension: 0.1
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { x: { display: false } }
        }
    });
    
    new Chart(document.getElementById('yline_' + k), {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Y (AP)',
                data: yData,
                borderColor: '#f59e0b',
                borderWidth: 1.5,
                pointRadius: 0,
                tension: 0.1
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { x: { display: false } }
        }
    });
}
window.cachedBalanceHistory = [];

async function saveBalanceSession() {
    if(!currentPatientId) return showToast("Hasta seçili değil");
    
    let record = {
        id: Date.now().toString(),
        date: new Date().toLocaleString('tr-TR'),
        session: currentBalanceSession
    };
    
    try {
        const res = await authFetch(`/api/balance/${currentPatientId}`, {
            method: 'POST',
            body: JSON.stringify({ session_data: JSON.stringify(record) }),
            headers: { 'Content-Type': 'application/json' }
        });
        if(res.ok) {
            showToast("Denge testi oturumu kaydedildi.");
        } else {
            const err = await res.text();
            alert("Sunucu hatası (Balance): " + res.status + " - " + err);
        }
    } catch(e) {
        showToast("Kaydedilirken hata oluştu.");
        console.error(e);
        alert("Bağlantı hatası: " + e.message);
    }
    
    await refreshBalanceSessionDropdown();
}

function loadBalanceSessionHistory(recordId) {
    if(!recordId) {
        // Reset to new session
        currentBalanceSession = {cift_acik: null, cift_kapali: null, tek_sol_acik: null, tek_sag_acik: null};
        document.getElementById('balanceResultsSection').classList.add('hidden');
        document.getElementById('balanceRecordingSection').classList.remove('hidden');
        
        let btnStart = document.getElementById('btnStartBalance');
        if(btnStart) btnStart.classList.remove('hidden');
        
        document.getElementById('btnDownloadBalancePdf').classList.add('hidden');
        let btnSave = document.getElementById('btnSaveBalance');
        if(btnSave) btnSave.classList.add('hidden');
        
        // reset UI
        const types = ['cift_acik', 'cift_kapali', 'tek_sol_acik', 'tek_sag_acik'];
        types.forEach(t => {
            let icon = document.getElementById('icon_' + t);
            if(icon) {
                icon.className = "fa-solid fa-circle border-2 border-slate-300 rounded-full w-4 h-4 text-transparent";
            }
        });
        selectBalanceTest('cift_acik');
        checkBalanceReportReady();
        
        let cvs = document.getElementById('balance_live_canvas');
        if(cvs) {
            let ctx = cvs.getContext('2d');
            ctx.clearRect(0,0,480,480);
        }
        return;
    }
    
    // Load from history
    let record = window.cachedBalanceHistory.find(r => r.id === recordId);
    if(record) {
        // Support old history records
        if(record.data) {
            currentBalanceSession = {cift_acik: null, cift_kapali: null, tek_sol_acik: null, tek_sag_acik: null};
            let fakeMetrics = calculateBalanceMetrics(record.data, record.type);
            fakeMetrics.data = record.data;
            currentBalanceSession[record.type === 'eyes_open' ? 'cift_acik' : 'cift_kapali'] = fakeMetrics;
        } else {
            currentBalanceSession = record.session;
        }

        document.getElementById('balanceRecordingSection').classList.add('hidden');
        document.getElementById('balanceResultsSection').classList.remove('hidden');
        
        let btnStart = document.getElementById('btnStartBalance');
        if(btnStart) btnStart.classList.add('hidden');
        
        document.getElementById('btnDownloadBalancePdf').classList.remove('hidden');
        let btnSave = document.getElementById('btnSaveBalance');
        if(btnSave) btnSave.classList.add('hidden');
        
        renderMasterTable();
        renderAllTestDetails();
    }
}
async function refreshBalanceSessionDropdown() {
    const historySelect = document.getElementById('balanceHistorySelect');
    if(!historySelect) return;
    
    historySelect.innerHTML = '<option value="">-- Yeni Test Oturumu --</option>';
    if(!currentPatientId) return;
    
    try {
        const res = await authFetch(`/api/balance/patient/${currentPatientId}`);
        if(res.ok) {
            const data = await res.json();
            window.cachedBalanceHistory = data.map(d => d.session_data);
        }
    } catch(e) { console.error(e); }
    
    window.cachedBalanceHistory.forEach(record => {
        let opt = document.createElement('option');
        opt.value = record.id;
        opt.innerText = `${record.date} Oturumu`;
        historySelect.appendChild(opt);
    });
}

// PDF export override
window.downloadBalancePdf = function() {
    if (!currentPatientId) return showToast("Hasta seçin.");
    const element = document.getElementById('balanceResultsSection');
    
    const opt = {
        margin:       [0.75, 0.3, 0.5, 0.3],
        filename:     `denge_testi_${currentPatientId}.pdf`,
        image:        { type: 'jpeg', quality: 1.0 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    
    html2pdf().set(opt).from(element).toPdf().get('pdf').then(function(pdf) {
        if (typeof applyCibodyPdfHeaderFooter === 'function') {
            applyCibodyPdfHeaderFooter(pdf, "Klinik Denge ve Postürografi Raporu");
        }
    }).save().then(() => {
        showToast("Denge PDF raporu indirildi.");
    }).catch(err => {
        console.error(err);
        showToast("PDF indirilirken hata oluştu.");
    });
};
