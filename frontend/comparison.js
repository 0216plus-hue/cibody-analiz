/**
 * CIBODY - Dijital Analiz Karşılaştırma & Gelişim Takip Modülü
 * İki farklı analiz tarihini e-ticaret karşılaştırma mantığıyla
 * sayısal farklar, gelişim rozetleri ve grafiklerle kıyaslar.
 */

window.comparisonChartInstance = null;
window.comparisonModuleDataCache = {};

window.initComparisonTab = function() {
    if (!currentPatientId) {
        showToast("Lütfen önce bir hasta seçin.");
        return;
    }
    onComparisonModuleChange();
};

window.onComparisonModuleChange = function() {
    const module = document.getElementById('compModuleSelect').value;
    const date1 = document.getElementById('compSelectDate1');
    const date2 = document.getElementById('compSelectDate2');
    const emptyState = document.getElementById('compEmptyState');
    const resultsContainer = document.getElementById('compResultsContainer');

    if (resultsContainer) resultsContainer.classList.add('hidden');
    if (emptyState) emptyState.classList.remove('hidden');

    if (date1) date1.innerHTML = '<option value="">⏳ Yükleniyor...</option>';
    if (date2) date2.innerHTML = '<option value="">⏳ Yükleniyor...</option>';

    loadComparisonDates(module);
};

async function loadComparisonDates(module) {
    const date1 = document.getElementById('compSelectDate1');
    const date2 = document.getElementById('compSelectDate2');
    if (!currentPatientId || !date1 || !date2) return;

    let records = [];

    try {
        if (module === 'posture') {
            if (window.currentPatientAnalyses && window.currentPatientAnalyses.length > 0) {
                records = window.currentPatientAnalyses;
            } else {
                const res = await authFetch(`/api/patients/${currentPatientId}`);
                if (res.ok) {
                    const data = await res.json();
                    records = data.posture_analyses || [];
                }
            }
        } else if (module === 'static_foot') {
            const res = await authFetch(`/api/static-foot/patient/${currentPatientId}`);
            if (res.ok) {
                const data = await res.json();
                records = data.map(d => ({
                    id: d.id,
                    created_at: d.created_at || (d.session_data ? d.session_data.date : null),
                    session_data: (typeof d.session_data === 'string') ? JSON.parse(d.session_data) : d.session_data
                }));
            }
        } else if (module === 'gait') {
            const res = await authFetch(`/api/gait/patient/${currentPatientId}`);
            if (res.ok) {
                const data = await res.json();
                records = data.map(d => ({
                    id: d.id,
                    created_at: d.created_at || (d.session_data ? d.session_data.timestamp : null),
                    session_data: (typeof d.session_data === 'string') ? JSON.parse(d.session_data) : d.session_data
                }));
            }
        } else if (module === 'balance') {
            const res = await authFetch(`/api/balance/patient/${currentPatientId}`);
            if (res.ok) {
                const data = await res.json();
                records = data.map(d => ({
                    id: d.id,
                    created_at: d.created_at || (d.session_data ? d.session_data.date : null),
                    session_data: (typeof d.session_data === 'string') ? JSON.parse(d.session_data) : d.session_data
                }));
            }
        } else if (module === 'scoliosis') {
            const res = await authFetch(`/api/scoliosis/patient/${currentPatientId}`);
            if (res.ok) {
                records = await res.json();
            }
        }
    } catch (e) {
        console.error("loadComparisonDates error:", e);
    }

    // Tarihe göre sırala (en güncel en üstte)
    records.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
    window.comparisonModuleDataCache[module] = records;

    if (records.length === 0) {
        date1.innerHTML = '<option value="">-- Kayıt Bulunamadı --</option>';
        date2.innerHTML = '<option value="">-- Kayıt Bulunamadı --</option>';
        return;
    }

    const _t = window.translateText || (s => s);
    let options1 = '<option value="">-- 1. Analizi Seçin --</option>';
    let options2 = '<option value="">-- 2. Analizi Seçin --</option>';

    records.forEach((r, idx) => {
        const dStr = formatAppDate ? formatAppDate(r.created_at, { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : new Date(r.created_at).toLocaleString();
        const tag = (idx === 0) ? ` (${_t('En Güncel')})` : (idx === records.length - 1 && records.length > 1 ? ` (${_t('İlk Kayıt')})` : '');
        options1 += `<option value="${idx}">${dStr}${tag}</option>`;
        options2 += `<option value="${idx}">${dStr}${tag}</option>`;
    });

    date1.innerHTML = options1;
    date2.innerHTML = options2;

    // Otomatik ön seçim: Date 1 = En eski kayıt veya 2. kayıt, Date 2 = En güncel kayıt (0)
    if (records.length >= 2) {
        date1.value = String(records.length - 1); // Başlangıç analizi
        date2.value = "0"; // En güncel takip analizi
    } else if (records.length === 1) {
        date1.value = "0";
        date2.value = "0";
    }
}

window.runComparison = function() {
    const module = document.getElementById('compModuleSelect').value;
    const val1 = document.getElementById('compSelectDate1').value;
    const val2 = document.getElementById('compSelectDate2').value;

    if (val1 === "" || val2 === "") {
        showToast("Lütfen karşılaştırmak için iki analiz tarihi seçin.");
        return;
    }

    const records = window.comparisonModuleDataCache[module] || [];
    const r1 = records[parseInt(val1)];
    const r2 = records[parseInt(val2)];

    if (!r1 || !r2) {
        showToast("Seçilen analiz verilerine ulaşılamadı.");
        return;
    }

    const emptyState = document.getElementById('compEmptyState');
    const resultsContainer = document.getElementById('compResultsContainer');
    if (emptyState) emptyState.classList.add('hidden');
    if (resultsContainer) resultsContainer.classList.remove('hidden');

    // Başlık etiketleri
    const d1Str = formatAppDate ? formatAppDate(r1.created_at, { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : new Date(r1.created_at).toLocaleString();
    const d2Str = formatAppDate ? formatAppDate(r2.created_at, { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : new Date(r2.created_at).toLocaleString();

    const th1 = document.getElementById('thCompDate1');
    const th2 = document.getElementById('thCompDate2');
    if (th1) th1.innerHTML = `<span class="text-indigo-600 block text-xs">1. Analiz (Önceki)</span><span class="text-slate-800 font-bold">${d1Str}</span>`;
    if (th2) th2.innerHTML = `<span class="text-emerald-600 block text-xs">2. Analiz (Sonraki)</span><span class="text-slate-800 font-bold">${d2Str}</span>`;

    if (module === 'posture') {
        comparePosture(r1, r2, d1Str, d2Str);
    } else if (module === 'static_foot') {
        compareStaticFoot(r1, r2, d1Str, d2Str);
    } else if (module === 'gait') {
        compareGait(r1, r2, d1Str, d2Str);
    } else if (module === 'balance') {
        compareBalance(r1, r2, d1Str, d2Str);
    } else if (module === 'scoliosis') {
        compareScoliosis(r1, r2, d1Str, d2Str);
    }
};

// ─── 1. POSTÜR KARŞILAŞTIRMA ────────────────────────────────────────────────
function comparePosture(r1, r2, d1Str, d2Str) {
    let p1 = {}, p2 = {};
    try { p1 = typeof r1.analysis_data === 'string' ? JSON.parse(r1.analysis_data) : (r1.analysis_data || {}); } catch(e){}
    try { p2 = typeof r2.analysis_data === 'string' ? JSON.parse(r2.analysis_data) : (r2.analysis_data || {}); } catch(e){}

    // Açı hesaplayıcı
    const extractSym = (state) => {
        if (!state || !state.front || !state.front.keypoints) return { shoulder: 0, hip: 0, knee: 0 };
        const kp = state.front.keypoints;
        const angle = (l, r) => {
            if (!kp[l] || !kp[r]) return 0;
            const dy = Math.abs(kp[r].y - kp[l].y);
            const dx = Math.abs(kp[r].x - kp[l].x);
            return parseFloat((Math.atan2(dy, dx) * 180 / Math.PI).toFixed(1));
        };
        return {
            shoulder: angle('left_shoulder', 'right_shoulder'),
            hip: angle('left_hip', 'right_hip'),
            knee: angle('left_knee', 'right_knee')
        };
    };

    const s1 = extractSym(p1);
    const s2 = extractSym(p2);

    const specs = [
        { name: "Omuz Asimetrisi (°)", val1: s1.shoulder, val2: s2.shoulder, unit: "°", lowerIsBetter: true },
        { name: "Kalça / Pelvis Asimetrisi (°)", val1: s1.hip, val2: s2.hip, unit: "°", lowerIsBetter: true },
        { name: "Diz Açı Sapması (°)", val1: s1.knee, val2: s2.knee, unit: "°", lowerIsBetter: true }
    ];

    renderComparisonHeader(d1Str, d2Str, "Postür İlerlemesi", calculateImprovementScore(specs));
    renderComparisonTable(specs);

    // Fotoğraf Kıyaslaması (Ön Görünüm)
    const img1 = r1.front_image_path ? `/${r1.front_image_path.replace(/\\/g, '/')}` : '';
    const img2 = r2.front_image_path ? `/${r2.front_image_path.replace(/\\/g, '/')}` : '';
    renderComparisonVisuals(`
        <h4 class="font-bold text-slate-800 mb-3 text-sm flex items-center gap-2"><i class="fa-solid fa-camera text-indigo-500"></i> Ön Postür Fotoğraf Karşılaştırması</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center justify-items-center">
            <div class="flex flex-col items-center">
                <span class="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full mb-2">1. Analiz (${d1Str})</span>
                ${img1 ? `<img src="${img1}" class="max-h-72 object-contain rounded-xl border border-slate-200 shadow-sm" />` : '<div class="h-48 w-48 bg-slate-100 flex items-center justify-center text-slate-400 rounded-xl">Fotoğraf Yok</div>'}
            </div>
            <div class="flex flex-col items-center">
                <span class="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full mb-2">2. Analiz (${d2Str})</span>
                ${img2 ? `<img src="${img2}" class="max-h-72 object-contain rounded-xl border border-slate-200 shadow-sm" />` : '<div class="h-48 w-48 bg-slate-100 flex items-center justify-center text-slate-400 rounded-xl">Fotoğraf Yok</div>'}
            </div>
        </div>
    `);

    // Çift Bar Grafiği
    renderComparisonChart(
        ["Omuz Asimetrisi", "Kalça Asimetrisi", "Diz Asimetrisi"],
        [s1.shoulder, s1.hip, s1.knee],
        [s2.shoulder, s2.hip, s2.knee],
        `1. Analiz (${d1Str})`,
        `2. Analiz (${d2Str})`,
        "Sapma Derecesi (°)"
    );
}

// ─── 2. STATİK AYAK KARŞILAŞTIRMA ───────────────────────────────────────────
function compareStaticFoot(r1, r2, d1Str, d2Str) {
    const d1 = (r1.session_data && r1.session_data.data) ? r1.session_data.data : {};
    const d2 = (r2.session_data && r2.session_data.data) ? r2.session_data.data : {};

    const l1 = parseFloat(d1.lPct || 50);
    const r1_val = parseFloat(d1.rPct || 50);
    const l2 = parseFloat(d2.lPct || 50);
    const r2_val = parseFloat(d2.rPct || 50);

    const sym1 = Math.abs(l1 - 50); // 50'den ne kadar uzaksa o kadar asimetri
    const sym2 = Math.abs(l2 - 50);

    const cL1 = parseFloat(d1.leftClarke) || 0;
    const cL2 = parseFloat(d2.leftClarke) || 0;
    const cR1 = parseFloat(d1.rightClarke) || 0;
    const cR2 = parseFloat(d2.rightClarke) || 0;

    const specs = [
        { name: "Sol Ayak Yükü (%)", val1: l1, val2: l2, unit: "%", target: 50 },
        { name: "Sağ Ayak Yükü (%)", val1: r1_val, val2: r2_val, unit: "%", target: 50 },
        { name: "Sol/Sağ Yük Dengesizliği (Sapma)", val1: sym1, val2: sym2, unit: "%", lowerIsBetter: true },
        { name: "Ön Ayak Yük Dağılımı (%)", val1: parseFloat(d1.tPct || 40), val2: parseFloat(d2.tPct || 40), unit: "%", target: 40 },
        { name: "Arka (Topuk) Yük Dağılımı (%)", val1: parseFloat(d1.bPct || 60), val2: parseFloat(d2.bPct || 60), unit: "%", target: 60 },
        { name: "Sol Ayak Clarke Açısı (°)", val1: cL1, val2: cL2, unit: "°", note1: d1.leftArch, note2: d2.leftArch },
        { name: "Sağ Ayak Clarke Açısı (°)", val1: cR1, val2: cR2, unit: "°", note1: d1.rightArch, note2: d2.rightArch }
    ];

    renderComparisonHeader(d1Str, d2Str, "Basınç Simetri İlerlemesi", calculateImprovementScore(specs));
    renderComparisonTable(specs);

    // Isı Haritaları Kıyaslaması
    renderComparisonVisuals(`
        <h4 class="font-bold text-slate-800 mb-3 text-sm flex items-center gap-2"><i class="fa-solid fa-shoe-prints text-red-500"></i> Ayak Basınç Isı Haritası Kıyaslaması</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center justify-items-center">
            <div class="flex flex-col items-center">
                <span class="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full mb-2">1. Analiz (${d1Str})</span>
                ${d1.image ? `<img src="${d1.image}" class="w-64 h-64 object-contain rounded-2xl border-4 border-slate-800 bg-black shadow-md" />` : '<div class="w-64 h-64 bg-slate-900 flex items-center justify-center text-slate-500 rounded-2xl">Görsel Yok</div>'}
            </div>
            <div class="flex flex-col items-center">
                <span class="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full mb-2">2. Analiz (${d2Str})</span>
                ${d2.image ? `<img src="${d2.image}" class="w-64 h-64 object-contain rounded-2xl border-4 border-slate-800 bg-black shadow-md" />` : '<div class="w-64 h-64 bg-slate-900 flex items-center justify-center text-slate-500 rounded-2xl">Görsel Yok</div>'}
            </div>
        </div>
    `);

    renderComparisonChart(
        ["Sol Ayak %", "Sağ Ayak %", "Ön Ayak %", "Arka Ayak %"],
        [l1, r1_val, parseFloat(d1.tPct || 40), parseFloat(d1.bPct || 60)],
        [l2, r2_val, parseFloat(d2.tPct || 40), parseFloat(d2.bPct || 60)],
        `1. Analiz (${d1Str})`,
        `2. Analiz (${d2Str})`,
        "Yük Dağılım Oranı (%)"
    );
}

// ─── 3. DİNAMİK YÜRÜME KARŞILAŞTIRMA ─────────────────────────────────────────
function compareGait(r1, r2, d1Str, d2Str) {
    const s1 = (r1.session_data && r1.session_data.steps) ? r1.session_data.steps : [];
    const s2 = (r2.session_data && r2.session_data.steps) ? r2.session_data.steps : [];

    const lSteps1 = s1.filter(x => x.type === 'left').length;
    const rSteps1 = s1.filter(x => x.type === 'right').length;
    const lSteps2 = s2.filter(x => x.type === 'left').length;
    const rSteps2 = s2.filter(x => x.type === 'right').length;

    // Ortalama maxForce hesapla
    const avgForce = (steps, type) => {
        const filtered = steps.filter(x => x.type === type);
        if (filtered.length === 0) return 0;
        return parseFloat((filtered.reduce((acc, c) => acc + (c.maxForce || 0), 0) / filtered.length).toFixed(1));
    };

    const lf1 = avgForce(s1, 'left');
    const rf1 = avgForce(s1, 'right');
    const lf2 = avgForce(s2, 'left');
    const rf2 = avgForce(s2, 'right');

    const asym1 = (Math.max(lf1, rf1) > 0) ? parseFloat((Math.abs(lf1 - rf1) / Math.max(lf1, rf1) * 100).toFixed(1)) : 0;
    const asym2 = (Math.max(lf2, rf2) > 0) ? parseFloat((Math.abs(lf2 - rf2) / Math.max(lf2, rf2) * 100).toFixed(1)) : 0;

    const specs = [
        { name: "Toplam Kaydedilen Adım", val1: s1.length, val2: s2.length, unit: " adım" },
        { name: "Sol Adım Sayısı", val1: lSteps1, val2: lSteps2, unit: "" },
        { name: "Sağ Adım Sayısı", val1: rSteps1, val2: rSteps2, unit: "" },
        { name: "Ortalama Sol Tepe Kuvvet", val1: lf1, val2: lf2, unit: "" },
        { name: "Ortalama Sağ Tepe Kuvvet", val1: rf1, val2: rf2, unit: "" },
        { name: "Kuvvet Asimetrisi (RSI %)", val1: asym1, val2: asym2, unit: "%", lowerIsBetter: true }
    ];

    renderComparisonHeader(d1Str, d2Str, "Yürüme Simetri Gelişimi", calculateImprovementScore(specs));
    renderComparisonTable(specs);

    const vCard = document.getElementById('compVisualCard');
    if (vCard) vCard.classList.add('hidden'); // Gait için özel görsel alanı gizle

    renderComparisonChart(
        ["Sol Tepe Kuvvet", "Sağ Tepe Kuvvet", "Kuvvet Asimetrisi (%)"],
        [lf1, rf1, asym1],
        [lf2, rf2, asym2],
        `1. Analiz (${d1Str})`,
        `2. Analiz (${d2Str})`,
        "Değer"
    );
}

// ─── 4. DENGE TESTİ KARŞILAŞTIRMA ───────────────────────────────────────────
function compareBalance(r1, r2, d1Str, d2Str) {
    const s1 = (r1.session_data && r1.session_data.session) ? r1.session_data.session : {};
    const s2 = (r2.session_data && r2.session_data.session) ? r2.session_data.session : {};

    const open1 = s1.cift_acik || {};
    const close1 = s1.cift_kapali || {};
    const open2 = s2.cift_acik || {};
    const close2 = s2.cift_kapali || {};

    const vOpen1 = parseFloat(open1.meanVelocity || 0);
    const vOpen2 = parseFloat(open2.meanVelocity || 0);
    const vClose1 = parseFloat(close1.meanVelocity || 0);
    const vClose2 = parseFloat(close2.meanVelocity || 0);

    const aOpen1 = parseFloat(open1.area || 0);
    const aOpen2 = parseFloat(open2.area || 0);
    const aClose1 = parseFloat(close1.area || 0);
    const aClose2 = parseFloat(close2.area || 0);

    // Romberg İndeksi (Göz Kapalı / Göz Açık)
    const romb1 = (aOpen1 > 0) ? parseFloat((aClose1 / aOpen1).toFixed(2)) : 0;
    const romb2 = (aOpen2 > 0) ? parseFloat((aClose2 / aOpen2).toFixed(2)) : 0;

    const specs = [
        { name: "Göz Açık Ortalama Hız (mm/s)", val1: vOpen1, val2: vOpen2, unit: " mm/s", lowerIsBetter: true },
        { name: "Göz Kapalı Ortalama Hız (mm/s)", val1: vClose1, val2: vClose2, unit: " mm/s", lowerIsBetter: true },
        { name: "Göz Açık COP Alanı (mm²)", val1: aOpen1, val2: aOpen2, unit: " mm²", lowerIsBetter: true },
        { name: "Göz Kapalı COP Alanı (mm²)", val1: aClose1, val2: aClose2, unit: " mm²", lowerIsBetter: true },
        { name: "Romberg İndeksi (Stabilite Oranı)", val1: romb1, val2: romb2, unit: "", lowerIsBetter: true }
    ];

    renderComparisonHeader(d1Str, d2Str, "Denge & Stabilite İlerlemesi", calculateImprovementScore(specs));
    renderComparisonTable(specs);

    const vCard = document.getElementById('compVisualCard');
    if (vCard) vCard.classList.add('hidden');

    renderComparisonChart(
        ["Göz Açık Hız", "Göz Kapalı Hız", "Romberg İndeksi"],
        [vOpen1, vClose1, romb1],
        [vOpen2, vClose2, romb2],
        `1. Analiz (${d1Str})`,
        `2. Analiz (${d2Str})`,
        "Denge Parametresi"
    );
}

// ─── 5. SKOLYOZ (COBB) KARŞILAŞTIRMA ────────────────────────────────────────
function compareScoliosis(r1, r2, d1Str, d2Str) {
    const c1 = parseFloat(r1.cobb_angle || 0);
    const c2 = parseFloat(r2.cobb_angle || 0);

    const specs = [
        { name: "Hesaplanan Cobb Açısı (°)", val1: c1, val2: c2, unit: "°", lowerIsBetter: true },
        { name: "Eğrilik Şiddet Değerlendirmesi", val1: r1.curve_type || "Belirtilmemiş", val2: r2.curve_type || "Belirtilmemiş", isText: true }
    ];

    renderComparisonHeader(d1Str, d2Str, "Omurga Eğriliği İlerlemesi", calculateImprovementScore(specs));
    renderComparisonTable(specs);

    const img1 = r1.image_path ? `/${r1.image_path.replace(/\\/g, '/')}` : '';
    const img2 = r2.image_path ? `/${r2.image_path.replace(/\\/g, '/')}` : '';

    renderComparisonVisuals(`
        <h4 class="font-bold text-slate-800 mb-3 text-sm flex items-center gap-2"><i class="fa-solid fa-x-ray text-indigo-600"></i> Röntgen (X-Ray) Yan Yana Karşılaştırma</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center justify-items-center">
            <div class="flex flex-col items-center">
                <span class="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full mb-2">1. Analiz (${d1Str}) — Cobb: ${c1}°</span>
                ${img1 ? `<img src="${img1}" class="max-h-80 object-contain rounded-xl border border-slate-200 shadow-sm" />` : '<div class="h-48 w-48 bg-slate-100 flex items-center justify-center text-slate-400 rounded-xl">Röntgen Yok</div>'}
            </div>
            <div class="flex flex-col items-center">
                <span class="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full mb-2">2. Analiz (${d2Str}) — Cobb: ${c2}°</span>
                ${img2 ? `<img src="${img2}" class="max-h-80 object-contain rounded-xl border border-slate-200 shadow-sm" />` : '<div class="h-48 w-48 bg-slate-100 flex items-center justify-center text-slate-400 rounded-xl">Röntgen Yok</div>'}
            </div>
        </div>
    `);

    renderComparisonChart(
        ["Cobb Açısı (Derece)"],
        [c1],
        [c2],
        `1. Analiz (${d1Str})`,
        `2. Analiz (${d2Str})`,
        "Cobb Açısı (°)"
    );
}

// ─── YARDIMCI GÖRSEL & TABLO BİLEŞENLERİ ─────────────────────────────────────

function calculateImprovementScore(specs) {
    let totalImprovement = 0;
    let count = 0;
    specs.forEach(s => {
        if (s.isText) return;
        if (typeof s.val1 === 'number' && typeof s.val2 === 'number' && s.val1 !== 0) {
            let diff = s.val2 - s.val1;
            if (s.lowerIsBetter) {
                // Azalması iyi ise (örn. Cobb açısı veya asimetri)
                totalImprovement += (-diff / s.val1) * 100;
            } else if (s.target !== undefined) {
                // Hedefe (örn 50%) yakınlaşma
                const d1 = Math.abs(s.val1 - s.target);
                const d2 = Math.abs(s.val2 - s.target);
                totalImprovement += ((d1 - d2) / (d1 || 1)) * 100;
            } else {
                totalImprovement += (diff / s.val1) * 100;
            }
            count++;
        }
    });
    if (count === 0) return 0;
    return parseFloat((totalImprovement / count).toFixed(1));
}

function renderComparisonHeader(d1Str, d2Str, title, score) {
    const banner = document.getElementById('compHeaderBanner');
    if (!banner) return;

    const isPositive = score >= 0;
    const scoreColor = isPositive ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : 'text-amber-700 bg-amber-50 border-amber-200';
    const scoreIcon = isPositive ? 'fa-arrow-trend-up text-emerald-600' : 'fa-arrow-trend-down text-amber-600';

    banner.innerHTML = `
        <div class="bg-white border-2 border-indigo-100 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
            <span class="text-xs font-bold text-indigo-600 uppercase tracking-wider">1. Analiz (Başlangıç)</span>
            <div class="text-lg font-black text-slate-800 mt-2">${d1Str}</div>
            <div class="text-xs text-slate-500 mt-1">Önceki referans ölçüm kaydı</div>
        </div>

        <div class="bg-gradient-to-tr from-slate-900 to-indigo-950 text-white rounded-2xl p-5 shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden">
            <span class="text-[11px] font-bold text-indigo-300 uppercase tracking-wider mb-1">${title}</span>
            <div class="text-3xl font-black flex items-center gap-2 text-white">
                <i class="fa-solid ${scoreIcon}"></i>
                <span>${score > 0 ? '+' : ''}${score}%</span>
            </div>
            <span class="text-[11px] text-indigo-200 mt-1">${isPositive ? 'Genel Biyomekanik İyileşme' : 'Dikkat Edilmesi Gereken Sapma'}</span>
        </div>

        <div class="bg-white border-2 border-emerald-100 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
            <span class="text-xs font-bold text-emerald-600 uppercase tracking-wider">2. Analiz (Güncel Takip)</span>
            <div class="text-lg font-black text-slate-800 mt-2">${d2Str}</div>
            <div class="text-xs text-slate-500 mt-1">Sonraki kontrol ve takip ölçümü</div>
        </div>
    `;
}

function renderComparisonVisuals(html) {
    const card = document.getElementById('compVisualCard');
    if (!card) return;
    card.innerHTML = html;
    card.classList.remove('hidden');
}

function renderComparisonTable(specs) {
    const tbody = document.getElementById('compTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';

    specs.forEach(s => {
        let diffBadge = '';
        if (s.isText) {
            diffBadge = `<span class="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">Durum Bilgisi</span>`;
        } else if (typeof s.val1 === 'number' && typeof s.val2 === 'number') {
            const diff = parseFloat((s.val2 - s.val1).toFixed(1));
            let badgeClass = 'bg-slate-100 text-slate-700';
            let icon = 'fa-minus';
            let label = 'Fark Yok';

            if (diff !== 0) {
                let isGood = false;
                if (s.lowerIsBetter) {
                    isGood = (diff < 0); // azalması iyi
                } else if (s.target !== undefined) {
                    isGood = Math.abs(s.val2 - s.target) < Math.abs(s.val1 - s.target);
                } else {
                    isGood = (diff > 0);
                }

                if (isGood) {
                    badgeClass = 'bg-emerald-100 text-emerald-800 border border-emerald-200';
                    icon = diff > 0 ? 'fa-arrow-up' : 'fa-arrow-down';
                    label = `${diff > 0 ? '+' : ''}${diff}${s.unit || ''} İyileşme`;
                } else {
                    badgeClass = 'bg-amber-100 text-amber-800 border border-amber-200';
                    icon = diff > 0 ? 'fa-arrow-up' : 'fa-arrow-down';
                    label = `${diff > 0 ? '+' : ''}${diff}${s.unit || ''} Fark`;
                }
            }

            diffBadge = `<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${badgeClass}">
                <i class="fa-solid ${icon} text-[10px]"></i> ${label}
            </span>`;
        }

        const tr = document.createElement('tr');
        tr.className = 'hover:bg-slate-50/70 transition-colors';
        tr.innerHTML = `
            <td class="py-3.5 px-4 font-bold text-slate-800">${s.name}</td>
            <td class="py-3.5 px-4 text-center font-mono font-bold text-slate-700">
                ${s.val1}${s.unit || ''}
                ${s.note1 ? `<span class="block text-[11px] font-normal text-slate-500">${s.note1}</span>` : ''}
            </td>
            <td class="py-3.5 px-4 text-center font-mono font-bold text-slate-900 bg-emerald-50/20">
                ${s.val2}${s.unit || ''}
                ${s.note2 ? `<span class="block text-[11px] font-normal text-slate-500">${s.note2}</span>` : ''}
            </td>
            <td class="py-3.5 px-4 text-center">${diffBadge}</td>
        `;
        tbody.appendChild(tr);
    });
}

function renderComparisonChart(labels, data1, data2, label1, label2, yTitle) {
    const canvas = document.getElementById('comparisonChartCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    if (window.comparisonChartInstance) {
        window.comparisonChartInstance.destroy();
    }

    window.comparisonChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: label1,
                    data: data1,
                    backgroundColor: 'rgba(99, 102, 241, 0.85)', // indigo-500
                    borderColor: 'rgb(79, 70, 229)',
                    borderWidth: 1.5,
                    borderRadius: 6
                },
                {
                    label: label2,
                    data: data2,
                    backgroundColor: 'rgba(16, 185, 129, 0.85)', // emerald-500
                    borderColor: 'rgb(5, 150, 105)',
                    borderWidth: 1.5,
                    borderRadius: 6
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: { font: { weight: 'bold', size: 12 } }
                },
                tooltip: {
                    padding: 10,
                    cornerRadius: 8
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: { display: !!yTitle, text: yTitle, font: { weight: 'bold', size: 11 } },
                    grid: { color: 'rgba(226, 232, 240, 0.6)' }
                },
                x: {
                    grid: { display: false },
                    ticks: { font: { weight: 'bold', size: 11 } }
                }
            }
        }
    });
}
