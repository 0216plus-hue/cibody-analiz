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
    
    if(typeof window.updatePatientInfoBanner === 'function') {
        window.updatePatientInfoBanner('gaitPatientBanner', new Date());
    }

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
    const banner = document.getElementById('gaitPatientBanner');
    if(!recordId) {
        if(banner) banner.classList.add('hidden');
        const vCard = document.getElementById('gaitVideoPlayerCard');
        if(vCard) vCard.classList.add('hidden');
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
        if(typeof window.updatePatientInfoBanner === 'function') {
            window.updatePatientInfoBanner('gaitPatientBanner', record.timestamp || record.date);
        }
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
    if(!currentPatientId) return;

    // Yükleniyor placeholder
    sel.innerHTML = '<option value="">⏳ Yükleniyor...</option>';
    
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

// Tıbbi Standart Baropodometrik Renk Haritası (Bever Medikal Hassasiyetinde)
const colorMapGait = [
    [0, 0, 0],         // Siyah (Zemin)
    [120, 0, 180],     // Koyu Mor (En dış temas hattı)
    [0, 80, 255],      // Canlı Mavi (Düşük basınç)
    [0, 220, 240],     // Turkuaz / Cyan (Hafif-orta)
    [0, 230, 40],      // Parlak Yeşil (Orta basınç / kavis)
    [255, 235, 0],     // Parlak Limon Sarısı (Orta-yüksek basınç)
    [255, 110, 0],     // Sıcak Turuncu (Yüksek basınç)
    [255, 0, 0],       // Parlak Kırmızı (Tepe Basınç Odakları)
    [220, 0, 0]        // Derin Ateş Kırmızısı (Maksimum Metatars & Topuk)
];

function getGaitColor(value, maxVal = 255) {
    if (value <= 3) return [0, 0, 0];
    // Tepe noktalara dinamik kontrast vererek kırmızı basınç alanlarını netleştir
    let norm = Math.min(1.0, Math.max(0, (value - 3) / Math.max(15, maxVal - 3)));
    
    // Non-linear gamma eğrisi: Tepe basınçları (metatars & topuk) kırmızıya hızla ulaştırır
    let gammaNorm = Math.pow(norm, 0.88);
    let idx = gammaNorm * (colorMapGait.length - 1);
    let i = Math.floor(idx);
    let f = idx - i;
    if (i >= colorMapGait.length - 1) return colorMapGait[colorMapGait.length - 1];
    return [
        Math.round(colorMapGait[i][0] + f * (colorMapGait[i+1][0] - colorMapGait[i][0])),
        Math.round(colorMapGait[i][1] + f * (colorMapGait[i+1][1] - colorMapGait[i][1])),
        Math.round(colorMapGait[i][2] + f * (colorMapGait[i+1][2] - colorMapGait[i][2]))
    ];
}
window.getGaitColor = getGaitColor;

const gaitAlphaCanvas = document.createElement('canvas');
gaitAlphaCanvas.width = 480; gaitAlphaCanvas.height = 480;
const gaitAlphaCtx = gaitAlphaCanvas.getContext('2d');

function drawGaitFrame(data) {
    const canvas = document.getElementById("gaitLiveCanvas");
    if(!canvas) return;
    const ctx = canvas.getContext("2d");
    
    // Maksimum değeri bul (dinamik kontrast için)
    let maxVal = 0;
    for(let i=0; i<2304; i++) {
        if(data[i] > maxVal) maxVal = data[i];
    }
    if (maxVal < 20) maxVal = 20;

    gaitAlphaCtx.clearRect(0,0,480,480);
    for(let i=0; i<2304; i++) {
        let val = data[i];
        if(val > 4) {
            let r = Math.floor(i/48);
            let c = i%48;
            let cx = (48 - 1 - c) * 10 + 5;
            let cy = r * 10 + 5;
            let normVal = Math.min(1.0, val / maxVal);
            let grad = gaitAlphaCtx.createRadialGradient(cx, cy, 0, cx, cy, 18);
            grad.addColorStop(0, `rgba(255,255,255,${normVal * 0.95})`);
            grad.addColorStop(0.5, `rgba(255,255,255,${normVal * 0.5})`);
            grad.addColorStop(1, "rgba(255,255,255,0)");
            gaitAlphaCtx.fillStyle = grad;
            gaitAlphaCtx.fillRect(cx-18, cy-18, 36, 36);
        }
    }
    
    const imgData = gaitAlphaCtx.getImageData(0,0,480,480);
    const pd = imgData.data;
    const outData = ctx.createImageData(480,480);
    const od = outData.data;
    
    for(let i=0; i<pd.length; i+=4) {
        let alpha = pd[i+3];
        if(alpha > 6) {
            let col = getGaitColor(alpha, 255);
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
    
    const _t = (window.translateText || (s => s));
    if(badgeEl) badgeEl.innerText = _t(`${recordedSteps.length} Adım`);
    
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
        c.width = 160; c.height = 160;
        c.id = `thumb_step_${s.id}_${Date.now()}_${index}`;
        
        let card = document.createElement('div');
        card.className = "bg-white border border-slate-200 p-3 rounded-xl shadow-sm flex gap-4 items-center shrink-0";
        const _stepLabel = _t(`Adım ${s.id}`);
        const _typeLabel = _t(s.type);
        const _frameLabel = _t(`${s.frameCount} Kare`);
        
        // Canvas'ı doğrudan DOM'a yerleştir
        c.className = "w-16 h-16 bg-black rounded-lg object-contain border border-slate-800 shadow-xs";
        
        card.innerHTML = `
            <div id="thumb_container_${s.id}_${index}" class="w-16 h-16 flex items-center justify-center bg-black rounded-lg border border-slate-800 overflow-hidden"></div>
            <div class="flex-1">
                <h4 class="font-bold text-sm text-slate-800">${_stepLabel}</h4>
                <p class="text-xs font-semibold ${s.type === 'Sağ Ayak' ? 'text-blue-500' : 'text-red-500'} mb-1">${_typeLabel}</p>
                <p class="text-[10px] text-slate-500">${_frameLabel}</p>
            </div>
            <div class="flex flex-col gap-1">
                <button onclick="toggleStepSide(${index})" class="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-600 px-2 py-1 rounded transition border border-slate-200"><i class="fa-solid fa-right-left"></i></button>
                <button onclick="removeStep(${index})" class="text-[10px] bg-rose-50 hover:bg-rose-100 text-rose-600 px-2 py-1 rounded transition border border-rose-100"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
        listEl.appendChild(card);

        const thumbContainer = document.getElementById(`thumb_container_${s.id}_${index}`);
        if (thumbContainer) {
            thumbContainer.appendChild(c);
            if (typeof renderMiniFrame === 'function') {
                renderMiniFrame(c.id, s.aggregate, 160);
            }
        }
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

window.downloadGaitPdf = async function() {
    if (!currentPatientId) {
        if(typeof showToast === 'function') showToast("Lütfen bir hasta seçin.");
        return;
    }
    
    const element = document.getElementById('gaitResultsSection');
    if (!element || element.classList.contains('hidden')) {
        if(typeof showToast === 'function') showToast("Lütfen önce analizi tamamlayınız.");
        return;
    }

    // PDF üretilmeden önce tüm data-i18n ve metinleri aktif dile göre güncelle
    if (window.applyTranslations) {
        window.applyTranslations(element);
    }

    const lang = (window.getCurrentLanguage ? window.getCurrentLanguage() : 'tr');
    const filenamePrefixes = {
        tr: 'dinamik_yurume_analizi',
        en: 'dynamic_gait_analysis',
        ru: 'dynamic_gait_analysis',
        ar: 'dynamic_gait_analysis',
        de: 'dynamische_ganganalyse',
        fr: 'analyse_dynamique_marche',
        es: 'analisis_dinamico_marcha',
        it: 'analisi_dinamica_deambulazione',
        pt: 'analise_dinamica_marcha'
    };
    const prefix = filenamePrefixes[lang] || 'dinamik_yurume_analizi';
    const pdfFilename = `${prefix}_${currentPatientId}.pdf`;

    const _trans = (window.translateText || (s => s));
    const transSubtitle = _trans("Dinamik Yürüme Analizi Raporu");

    // A4 Dikey genişliğine (700px) tam sığması için PDF modunu aktif et
    element.classList.add('gait-pdf-mode');

    // 5 bölge analizi kapalı/boş olduğunda ardışık sayfa sonu oluşturup orta sayfayı boş bırakmasını engelle
    const fiveRegionEl = document.getElementById('fiveRegionSection');
    const isFiveHidden = !fiveRegionEl || fiveRegionEl.classList.contains('hidden') || fiveRegionEl.style.display === 'none';
    const breaks = element.querySelectorAll('.gait-pdf-break');
    let suppressedBreak = null;
    if (isFiveHidden && breaks.length >= 2) {
        suppressedBreak = breaks[1];
        suppressedBreak.classList.add('hidden');
    }

    // Chart.js grafiklerini 700px genişliğe göre hemen yeniden boyutlandır
    if (typeof window.resizeGaitCharts === 'function') {
        window.resizeGaitCharts();
    }

    // PDF çıktısında fare imleci veya açık kalmış hover/tooltip kutucuklarını temizle
    Object.values(window.gaitChartInstances || {}).forEach(c => {
        try {
            if (c) {
                if (c.tooltip) {
                    c.tooltip.setActiveElements([], { x: 0, y: 0 });
                    c.tooltip.opacity = 0;
                }
                if (c.options && c.options.plugins && c.options.plugins.tooltip) {
                    c.options.plugins.tooltip.enabled = false;
                }
                c.update('none');
            }
        } catch(e) {}
    });

    // DOM reflow ve canvas çiziminin tamamlanması için kısa bir bekleme
    await new Promise(r => setTimeout(r, 200));

    const opt = {
        margin:       [0.75, 0.35, 0.5, 0.35],
        filename:     pdfFilename,
        image:        { type: 'jpeg', quality: 1.0 },
        html2canvas:  { scale: 2, useCORS: true, scrollY: 0, logging: false },
        jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' },
        pagebreak:    { mode: ['css'] }
    };

    const cleanup = () => {
        element.classList.remove('gait-pdf-mode');
        Object.values(window.gaitChartInstances || {}).forEach(c => {
            try {
                if (c) {
                    if (c.options && c.options.plugins && c.options.plugins.tooltip) {
                        c.options.plugins.tooltip.enabled = true;
                    }
                }
            } catch(e) {}
        });
        if (typeof window.resizeGaitCharts === 'function') {
            window.resizeGaitCharts();
        }
        if (suppressedBreak) {
            suppressedBreak.classList.remove('hidden');
        }
    };

    const instance = html2pdf().set(opt).from(element);
    if(typeof runPdf === 'function') {
        runPdf(instance, pdfFilename, transSubtitle).then(() => {
            cleanup();
            if(typeof showToast === 'function') showToast(_trans("Yürüme Analizi PDF raporu indirildi."));
        }).catch(err => {
            cleanup();
            console.error("Gait PDF generation error:", err);
            if(typeof showToast === 'function') showToast("PDF indirilirken hata oluştu.");
        });
    } else {
        instance.toPdf().get('pdf').then(function(pdf) {
            if (typeof applyCibodyPdfHeaderFooter === 'function') {
                applyCibodyPdfHeaderFooter(pdf, transSubtitle);
            }
        }).save().then(() => {
            cleanup();
            if(typeof showToast === 'function') showToast(_trans("Yürüme Analizi PDF raporu indirildi."));
        }).catch(err => {
            cleanup();
            console.error("Gait PDF fallback error:", err);
            if(typeof showToast === 'function') showToast("PDF indirilirken hata oluştu.");
        });
    }
};
