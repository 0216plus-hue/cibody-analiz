let balanceWs = null;
let isBalanceRecording = false;
let balanceCopData = [];
let balanceTimerInterval = null;
let balanceTimeLeft = 30;
let balanceChartInstances = {};

function startBalanceTest() {
    if (balanceWs) balanceWs.close();
    
    balanceCopData = [];
    balanceTimeLeft = 30;
    
    document.getElementById('balanceResultsSection').classList.add('hidden');
    document.getElementById('balanceRecordingSection').classList.remove('hidden');
    
    document.getElementById('btnStartBalance').classList.add('hidden');
    document.getElementById('btnSaveBalance').classList.add('hidden');
    document.getElementById('btnDownloadBalancePdf').classList.add('hidden');
    document.getElementById('btnStopBalance').classList.remove('hidden');
    
    const historySelect = document.getElementById('balanceHistorySelect');
    if(historySelect) historySelect.value = "";

    const statusBadge = document.getElementById('balanceLiveStatus');
    statusBadge.innerHTML = '<i class="fa-solid fa-circle text-red-500 animate-pulse"></i> CANLI';
    statusBadge.className = 'absolute top-4 left-4 bg-slate-800/80 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-2 border border-slate-600 z-10';
    
    const timerDisplay = document.getElementById('balanceTimerDisplay');
    timerDisplay.classList.remove('hidden');
    timerDisplay.innerText = balanceTimeLeft;
    
    let isConnected = false;
    balanceWs = new WebSocket('ws://localhost:8765');
    
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
            // grab middle frame
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
    document.getElementById('balanceTimerDisplay').classList.add('hidden');
    
    const statusBadge = document.getElementById('balanceLiveStatus');
    statusBadge.innerHTML = '<i class="fa-solid fa-bed text-slate-400"></i> Bekleniyor...';
    
    // Clear canvas
    let canvas = document.getElementById('balance_live_canvas');
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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
            let mirroredX = 47 - x; // Ayna
            
            wX += mirroredX * val;
            wY += y * val;
            totalP += val;
            
            let cx = mirroredX * 10;
            let cy = y * 10;
            
            // Draw heat
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
        
        // 1 grid cell = 10mm mapping
        let realX = copX * 10;
        let realY = copY * 10;
        
        balanceCopData.push({ x: realX, y: realY, t: 30 - balanceTimeLeft });
        
        // Draw COP
        ctx.beginPath();
        ctx.arc(copX * 10 + 5, copY * 10 + 5, 4, 0, 2*Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'black';
        ctx.stroke();
    }
}

function completeBalanceTest() {
    stopBalanceTest();
    if(balanceCopData.length < 50) {
        showToast("Yeterli veri toplanamadı.");
        return;
    }
    
    document.getElementById('balanceRecordingSection').classList.add('hidden');
    document.getElementById('balanceResultsSection').classList.remove('hidden');
    
    document.getElementById('btnSaveBalance').classList.remove('hidden');
    document.getElementById('btnDownloadBalancePdf').classList.remove('hidden');
    
    analyzeBalanceData(balanceCopData);
}

function analyzeBalanceData(data) {
    if(!data || data.length === 0) return;
    
    let pathLength = 0;
    let sumX = 0, sumY = 0;
    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;
    
    for(let i = 0; i < data.length; i++) {
        sumX += data[i].x;
        sumY += data[i].y;
        if(data[i].x < minX) minX = data[i].x;
        if(data[i].x > maxX) maxX = data[i].x;
        if(data[i].y < minY) minY = data[i].y;
        if(data[i].y > maxY) maxY = data[i].y;
        
        if(i > 0) {
            let dx = data[i].x - data[i-1].x;
            let dy = data[i].y - data[i-1].y;
            pathLength += Math.sqrt(dx*dx + dy*dy);
        }
    }
    
    let n = data.length;
    let meanX = sumX / n;
    let meanY = sumY / n;
    
    // Covariance matrix for Ellipse
    let c11 = 0, c22 = 0, c12 = 0;
    let xData = [], yData = [];
    
    for(let i=0; i<n; i++) {
        let dx = data[i].x - meanX;
        let dy = data[i].y - meanY;
        c11 += dx*dx;
        c22 += dy*dy;
        c12 += dx*dy;
        
        xData.push({x: i, y: dx}); // center at 0 for charts
        yData.push({x: i, y: dy});
    }
    c11 /= (n-1);
    c22 /= (n-1);
    c12 /= (n-1);
    
    // Eigenvalues
    let trace = c11 + c22;
    let det = c11*c22 - c12*c12;
    let root = Math.sqrt(Math.max(0, trace*trace - 4*det));
    let lambda1 = (trace + root) / 2;
    let lambda2 = (trace - root) / 2;
    
    // 95% confidence ellipse area (Chi-square = 5.991 for 2 DOF)
    let ellipseArea = Math.PI * 5.991 * Math.sqrt(Math.max(0, lambda1 * lambda2));
    let meanVel = pathLength / 30.0;
    
    document.getElementById('balMetricPath').innerText = pathLength.toFixed(1) + " mm";
    document.getElementById('balMetricVel').innerText = meanVel.toFixed(1) + " mm/sn";
    document.getElementById('balMetricArea').innerText = ellipseArea.toFixed(1) + " mm²";
    
    // Build Romberg if history exists? For now N/A
    
    // Draw Charts
    drawBalanceCharts(data, meanX, meanY, xData, yData);
}

function drawBalanceCharts(data, meanX, meanY, xData, yData) {
    if(balanceChartInstances['scatter']) balanceChartInstances['scatter'].destroy();
    if(balanceChartInstances['xLine']) balanceChartInstances['xLine'].destroy();
    if(balanceChartInstances['yLine']) balanceChartInstances['yLine'].destroy();
    
    let scatterData = data.map(d => ({x: d.x - meanX, y: d.y - meanY}));
    
    balanceChartInstances['scatter'] = new Chart(document.getElementById('balChartScatter'), {
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
                x: { title: { display: true, text: 'Medio-Lateral (mm)' } },
                y: { title: { display: true, text: 'Antero-Posterior (mm)' } }
            }
        }
    });
    
    let labels = xData.map(d => '');
    
    balanceChartInstances['xLine'] = new Chart(document.getElementById('balChartX'), {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'X (ML)',
                data: xData.map(d => d.y),
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
    
    balanceChartInstances['yLine'] = new Chart(document.getElementById('balChartY'), {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Y (AP)',
                data: yData.map(d => d.y),
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

function saveBalanceTest() {
    if(!currentPatientId) return showToast("Hasta seçili değil");
    let testType = document.getElementById('balanceTestType').value;
    
    let record = {
        id: Date.now().toString(),
        date: new Date().toLocaleString('tr-TR'),
        type: testType,
        path: document.getElementById('balMetricPath').innerText,
        vel: document.getElementById('balMetricVel').innerText,
        area: document.getElementById('balMetricArea').innerText,
        data: balanceCopData
    };
    
    let history = JSON.parse(localStorage.getItem(`balance_history_${currentPatientId}`)) || [];
    history.push(record);
    localStorage.setItem(`balance_history_${currentPatientId}`, JSON.stringify(history));
    
    showToast("Denge testi kaydedildi.");
    refreshBalanceHistoryDropdown();
}

function loadBalanceHistory(recordId) {
    if(!recordId) {
        document.getElementById('balanceResultsSection').classList.add('hidden');
        document.getElementById('balanceRecordingSection').classList.remove('hidden');
        document.getElementById('btnDownloadBalancePdf').classList.add('hidden');
        return;
    }
    
    let history = JSON.parse(localStorage.getItem(`balance_history_${currentPatientId}`)) || [];
    let record = history.find(r => r.id === recordId);
    if(record) {
        document.getElementById('balanceRecordingSection').classList.add('hidden');
        document.getElementById('balanceResultsSection').classList.remove('hidden');
        document.getElementById('btnSaveBalance').classList.add('hidden');
        document.getElementById('btnDownloadBalancePdf').classList.remove('hidden');
        
        balanceCopData = record.data;
        analyzeBalanceData(record.data);
    }
}

function refreshBalanceHistoryDropdown() {
    const historySelect = document.getElementById('balanceHistorySelect');
    if(!historySelect) return;
    
    historySelect.innerHTML = '<option value="">-- Yeni Test --</option>';
    if(!currentPatientId) return;
    
    let history = JSON.parse(localStorage.getItem(`balance_history_${currentPatientId}`)) || [];
    history.reverse().forEach(record => {
        let opt = document.createElement('option');
        opt.value = record.id;
        opt.innerText = `${record.date} - ${record.type === 'eyes_open' ? 'Gözler Açık' : 'Gözler Kapalı'}`;
        historySelect.appendChild(opt);
    });
}


window.downloadBalancePdf = function() {
    if (!currentPatientId) return showToast("Hasta seçin.");
    const element = document.getElementById('balanceTab');
    
    // Add pdf mode to ensure charts don't overlap
    element.classList.add('pdf-export-mode-static');
    const topBar = document.getElementById('balanceTopBar');
    if(topBar) topBar.style.display = 'none';
    
    let pName = sessionStorage.getItem('cibody_active_patient_name') || currentPatientId;
    
    const opt = {
        margin:       [0.75, 0.3, 0.5, 0.3],
        filename:     `denge_testi_${pName.replace(/\s+/g, '_')}.pdf`,
        image:        { type: 'jpeg', quality: 1.0 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    
    html2pdf().set(opt).from(element).toPdf().get('pdf').then(function(pdf) {
        if (typeof applyCibodyPdfHeaderFooter === 'function') {
            applyCibodyPdfHeaderFooter(pdf, "Denge ve Postürografi Analizi");
        }
    }).save().then(() => {
        element.classList.remove('pdf-export-mode-static');
        if(topBar) topBar.style.display = 'flex';
        showToast("Denge PDF raporu indirildi.");
    });
};
