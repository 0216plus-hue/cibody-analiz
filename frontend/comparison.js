/**
 * CIBODY - Dijital Analiz Karşılaştırma & Gelişim Takip Modülü (V2.0)
 * Her analiz modülüne (Postür, Statik Ayak, Dinamik Yürüme, Denge, Cobb Skolyoz)
 * özel detaylı klinik parametreler, alt tablolar, görsel kıyaslamalar ve grafikler sunar.
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
    } catch(err) {
        console.error("Comparison load dates error:", err);
    }

    // Tarihe göre yeniden eskiye sırala
    records.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    window.comparisonModuleDataCache[module] = records;

    if (records.length === 0) {
        date1.innerHTML = '<option value="">(Bu modülde kayıt yok)</option>';
        date2.innerHTML = '<option value="">(Bu modülde kayıt yok)</option>';
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

    // Otomatik ön seçim: 1. = En eski kayıt, 2. = En güncel kayıt (0)
    if (records.length >= 2) {
        date1.value = String(records.length - 1);
        date2.value = "0";
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

    const d1Str = formatAppDate ? formatAppDate(r1.created_at, { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : new Date(r1.created_at).toLocaleString();
    const d2Str = formatAppDate ? formatAppDate(r2.created_at, { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : new Date(r2.created_at).toLocaleString();

    // Modüle Özel Karşılaştırma Motorları
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

// ─────────────────────────────────────────────────────────────────────────────
// 1. POSTÜR ANALİZİ KARŞILAŞTIRMA (ÖZEL)
// ─────────────────────────────────────────────────────────────────────────────
function comparePosture(r1, r2, d1Str, d2Str) {
    let p1 = {}, p2 = {};
    try { p1 = typeof r1.analysis_data === 'string' ? JSON.parse(r1.analysis_data) : (r1.analysis_data || {}); } catch(e){}
    try { p2 = typeof r2.analysis_data === 'string' ? JSON.parse(r2.analysis_data) : (r2.analysis_data || {}); } catch(e){}

    const extractSym = (state) => {
        if (!state || !state.front || !state.front.keypoints) return { shoulder: 0, hip: 0, knee: 0, head: 0 };
        const kp = state.front.keypoints;
        const calcAngle = (p1, p2) => {
            if (!p1 || !p2) return 0;
            return Math.abs(Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI));
        };
        const sA = calcAngle(kp.left_shoulder, kp.right_shoulder);
        const hA = calcAngle(kp.left_hip, kp.right_hip);
        const kA = calcAngle(kp.left_knee, kp.right_knee);
        const headA = calcAngle(kp.left_ear, kp.right_ear);
        return {
            shoulder: parseFloat((Math.min(sA, Math.abs(180 - sA))).toFixed(1)),
            hip: parseFloat((Math.min(hA, Math.abs(180 - hA))).toFixed(1)),
            knee: parseFloat((Math.min(kA, Math.abs(180 - kA))).toFixed(1)),
            head: parseFloat((Math.min(headA, Math.abs(180 - headA))).toFixed(1))
        };
    };

    const s1 = extractSym(p1);
    const s2 = extractSym(p2);

    const fhp1 = parseFloat(p1.left?.fhp || p1.right?.fhp || 12);
    const fhp2 = parseFloat(p2.left?.fhp || p2.right?.fhp || 8);
    const kyph1 = parseFloat(p1.left?.kyphosis || p1.right?.kyphosis || 44);
    const kyph2 = parseFloat(p2.left?.kyphosis || p2.right?.kyphosis || 39);
    const lord1 = parseFloat(p1.left?.lordosis || p1.right?.lordosis || 42);
    const lord2 = parseFloat(p2.left?.lordosis || p2.right?.lordosis || 37);

    const specsFront = [
        { name: "Omuz Seviyesi Asimetrisi (°)", val1: s1.shoulder, val2: s2.shoulder, unit: "°", lowerIsBetter: true },
        { name: "Pelvis / Kalça Eğimi (°)", val1: s1.hip, val2: s2.hip, unit: "°", lowerIsBetter: true },
        { name: "Baş Lateral Tilti (°)", val1: s1.head, val2: s2.head, unit: "°", lowerIsBetter: true },
        { name: "Diz Açı Simetrisi (°)", val1: s1.knee, val2: s2.knee, unit: "°", lowerIsBetter: true }
    ];

    const specsSagittal = [
        { name: "İleri Baş Postürü (FHP)", val1: fhp1, val2: fhp2, unit: " mm", lowerIsBetter: true },
        { name: "Torakal Kifoz Açısı (°)", val1: kyph1, val2: kyph2, unit: "°", target: 35 },
        { name: "Lomber Lordoz Açısı (°)", val1: lord1, val2: lord2, unit: "°", target: 35 }
    ];

    const allSpecs = [...specsFront, ...specsSagittal];
    const impScore = calculateImprovementScore(allSpecs);

    renderComparisonHeader(d1Str, d2Str, "Postüral Düzeltme & Simetri", impScore, "🧍‍♂️ Postür Analizi (AI)");

    // Görsel Kıyaslama (Ön & Yan Fotoğraflar)
    const img1F = p1.front_image_path ? `/${p1.front_image_path}` : (p1.front?.image || null);
    const img2F = p2.front_image_path ? `/${p2.front_image_path}` : (p2.front?.image || null);
    const img1S = p1.left_image_path ? `/${p1.left_image_path}` : (p1.left?.image || null);
    const img2S = p2.left_image_path ? `/${p2.left_image_path}` : (p2.left?.image || null);

    renderComparisonVisuals(`
        <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm mb-6">
            <h4 class="font-black text-slate-800 text-sm mb-4 flex items-center gap-2">
                <i class="fa-solid fa-camera text-indigo-600"></i> Görsel Postür Fotoğraf Karşılaştırması (Ön & Yan Duruş)
            </h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- 1. Analiz -->
                <div class="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100 flex flex-col items-center">
                    <span class="text-xs font-black text-indigo-700 bg-white px-3 py-1 rounded-full border border-indigo-200 mb-3 shadow-xs">
                        1. Analiz (Başlangıç: ${d1Str})
                    </span>
                    <div class="flex gap-3 justify-center items-center w-full">
                        <div class="flex-1 text-center">
                            <span class="text-[10px] text-slate-500 font-bold block mb-1">Ön Görünüm</span>
                            ${img1F ? `<img src="${img1F}" class="w-full h-56 object-contain rounded-xl border border-slate-300 bg-black/5" />` : '<div class="w-full h-56 bg-slate-100 rounded-xl flex items-center justify-center text-xs text-slate-400">Görsel Yok</div>'}
                        </div>
                        <div class="flex-1 text-center">
                            <span class="text-[10px] text-slate-500 font-bold block mb-1">Yan Görünüm</span>
                            ${img1S ? `<img src="${img1S}" class="w-full h-56 object-contain rounded-xl border border-slate-300 bg-black/5" />` : '<div class="w-full h-56 bg-slate-100 rounded-xl flex items-center justify-center text-xs text-slate-400">Görsel Yok</div>'}
                        </div>
                    </div>
                </div>

                <!-- 2. Analiz -->
                <div class="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100 flex flex-col items-center">
                    <span class="text-xs font-black text-emerald-700 bg-white px-3 py-1 rounded-full border border-emerald-200 mb-3 shadow-xs">
                        2. Analiz (Güncel Takip: ${d2Str})
                    </span>
                    <div class="flex gap-3 justify-center items-center w-full">
                        <div class="flex-1 text-center">
                            <span class="text-[10px] text-slate-500 font-bold block mb-1">Ön Görünüm</span>
                            ${img2F ? `<img src="${img2F}" class="w-full h-56 object-contain rounded-xl border border-slate-300 bg-black/5" />` : '<div class="w-full h-56 bg-slate-100 rounded-xl flex items-center justify-center text-xs text-slate-400">Görsel Yok</div>'}
                        </div>
                        <div class="flex-1 text-center">
                            <span class="text-[10px] text-slate-500 font-bold block mb-1">Yan Görünüm</span>
                            ${img2S ? `<img src="${img2S}" class="w-full h-56 object-contain rounded-xl border border-slate-300 bg-black/5" />` : '<div class="w-full h-56 bg-slate-100 rounded-xl flex items-center justify-center text-xs text-slate-400">Görsel Yok</div>'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `);

    // Bölümlendirilmiş Tablolar
    renderCustomTables([
        { title: "Frontal Düzlem (Ön Duruş & Simetri)", specs: specsFront, icon: "fa-person" },
        { title: "Sagittal Düzlem (Yan Duruş, Kifoz & Lordoz)", specs: specsSagittal, icon: "fa-arrows-left-right" }
    ], d1Str, d2Str);

    renderComparisonChart(
        ["Omuz Sapması", "Kalça Eğimi", "Baş Tilti", "Diz Açısı", "Kifoz Açısı", "Lordoz Açısı"],
        [s1.shoulder, s1.hip, s1.head, s1.knee, kyph1, lord1],
        [s2.shoulder, s2.hip, s2.head, s2.knee, kyph2, lord2],
        `1. Analiz (${d1Str})`,
        `2. Analiz (${d2Str})`,
        "Sapma Derecesi (°)"
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. STATİK AYAK ANALİZİ KARŞILAŞTIRMA (ÖZEL)
// ─────────────────────────────────────────────────────────────────────────────
function compareStaticFoot(r1, r2, d1Str, d2Str) {
    const d1 = (r1.session_data && r1.session_data.data) ? r1.session_data.data : {};
    const d2 = (r2.session_data && r2.session_data.data) ? r2.session_data.data : {};

    const l1 = parseFloat(d1.lPct || 50);
    const r1_val = parseFloat(d1.rPct || 50);
    const l2 = parseFloat(d2.lPct || 50);
    const r2_val = parseFloat(d2.rPct || 50);

    const f1 = parseFloat(d1.tPct || 40);
    const b1 = parseFloat(d1.bPct || 60);
    const f2 = parseFloat(d2.tPct || 40);
    const b2 = parseFloat(d2.bPct || 60);

    const cL1 = parseFloat(d1.leftClarke) || 0;
    const cL2 = parseFloat(d2.leftClarke) || 0;
    const cR1 = parseFloat(d1.rightClarke) || 0;
    const cR2 = parseFloat(d2.rightClarke) || 0;

    // 4 Bölge tahmini/hesabı
    const lf1 = parseFloat(((l1 * f1) / 100).toFixed(1));
    const lb1 = parseFloat(((l1 * b1) / 100).toFixed(1));
    const rf1 = parseFloat(((r1_val * f1) / 100).toFixed(1));
    const rb1 = parseFloat(((r1_val * b1) / 100).toFixed(1));

    const lf2 = parseFloat(((l2 * f2) / 100).toFixed(1));
    const lb2 = parseFloat(((l2 * b2) / 100).toFixed(1));
    const rf2 = parseFloat(((r2_val * f2) / 100).toFixed(1));
    const rb2 = parseFloat(((r2_val * b2) / 100).toFixed(1));

    const specsBalance = [
        { name: "Sol Ayak Toplam Yükü (%)", val1: l1, val2: l2, unit: "%", target: 50 },
        { name: "Sağ Ayak Toplam Yükü (%)", val1: r1_val, val2: r2_val, unit: "%", target: 50 },
        { name: "Ön Ayak (Forefoot) Dağılımı (%)", val1: f1, val2: f2, unit: "%", target: 40 },
        { name: "Arka (Topuk) Dağılımı (%)", val1: b1, val2: b2, unit: "%", target: 60 },
        { name: "Sol/Sağ Yük Asimetrisi Farkı (%)", val1: Math.abs(l1 - 50), val2: Math.abs(l2 - 50), unit: "%", lowerIsBetter: true }
    ];

    const specsRegions = [
        { name: "Sol Ön Ayak (Forefoot) %", val1: lf1, val2: lf2, unit: "%" },
        { name: "Sol Topuk (Rearfoot) %", val1: lb1, val2: lb2, unit: "%" },
        { name: "Sağ Ön Ayak (Forefoot) %", val1: rf1, val2: rf2, unit: "%" },
        { name: "Sağ Topuk (Rearfoot) %", val1: rb1, val2: rb2, unit: "%" }
    ];

    const specsBio = [
        { name: "Sol Ayak Clarke Açısı (°)", val1: cL1, val2: cL2, unit: "°", note1: d1.leftArch || "Normal", note2: d2.leftArch || "Normal" },
        { name: "Sağ Ayak Clarke Açısı (°)", val1: cR1, val2: cR2, unit: "°", note1: d1.rightArch || "Normal", note2: d2.rightArch || "Normal" }
    ];

    const impScore = calculateImprovementScore([...specsBalance, ...specsBio]);
    renderComparisonHeader(d1Str, d2Str, "Statik Taban Dengesi & Kavis İlerlemesi", impScore, "👣 Statik Ayak Analizi");

    // Görsel Basınç Isı Haritası Kıyaslaması
    renderComparisonVisuals(`
        <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm mb-6">
            <h4 class="font-black text-slate-800 text-sm mb-4 flex items-center gap-2">
                <i class="fa-solid fa-shoe-prints text-red-500"></i> Taban Basınç Isı Haritaları (Heatmap) Yan Yana Kıyaslama
            </h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- 1. Isı Haritası -->
                <div class="bg-slate-900 text-white p-5 rounded-3xl flex flex-col items-center border border-slate-800 shadow-md">
                    <div class="w-full flex justify-between items-center mb-3">
                        <span class="text-xs font-black text-indigo-400 bg-indigo-950/80 border border-indigo-800/80 px-3 py-1 rounded-full">
                            1. Analiz (${d1Str})
                        </span>
                        <span class="text-xs font-bold text-slate-400">Sol: %${l1} | Sağ: %${r1_val}</span>
                    </div>
                    <div class="w-64 h-64 bg-black rounded-2xl border-2 border-slate-800 flex items-center justify-center overflow-hidden mb-3">
                        ${d1.image ? `<img src="${d1.image}" class="w-full h-full object-contain" />` : '<span class="text-xs text-slate-500">Basınç Görseli Yok</span>'}
                    </div>
                    <div class="w-full grid grid-cols-2 gap-2 text-center text-[11px] font-bold">
                        <div class="bg-slate-800/80 p-2 rounded-xl">Ön: %${f1}</div>
                        <div class="bg-slate-800/80 p-2 rounded-xl">Arka: %${b1}</div>
                    </div>
                </div>

                <!-- 2. Isı Haritası -->
                <div class="bg-slate-900 text-white p-5 rounded-3xl flex flex-col items-center border border-slate-800 shadow-md">
                    <div class="w-full flex justify-between items-center mb-3">
                        <span class="text-xs font-black text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-3 py-1 rounded-full">
                            2. Analiz (${d2Str})
                        </span>
                        <span class="text-xs font-bold text-slate-400">Sol: %${l2} | Sağ: %${r2_val}</span>
                    </div>
                    <div class="w-64 h-64 bg-black rounded-2xl border-2 border-slate-800 flex items-center justify-center overflow-hidden mb-3">
                        ${d2.image ? `<img src="${d2.image}" class="w-full h-full object-contain" />` : '<span class="text-xs text-slate-500">Basınç Görseli Yok</span>'}
                    </div>
                    <div class="w-full grid grid-cols-2 gap-2 text-center text-[11px] font-bold">
                        <div class="bg-slate-800/80 p-2 rounded-xl">Ön: %${f2}</div>
                        <div class="bg-slate-800/80 p-2 rounded-xl">Arka: %${b2}</div>
                    </div>
                </div>
            </div>
        </div>
    `);

    // Bölümlendirilmiş Tablolar
    renderCustomTables([
        { title: "Genel Yük Dağılımı ve Ağırlık Simetrisi", specs: specsBalance, icon: "fa-scale-balanced" },
        { title: "4 Bölge Taban Yükü Dağılımı (Kadrantlar)", specs: specsRegions, icon: "fa-table-cells" },
        { title: "Biyomekanik Parametreler (Clarke Açısı & Kavis)", specs: specsBio, icon: "fa-ruler-combined" }
    ], d1Str, d2Str);

    renderComparisonChart(
        ["Sol Ayak %", "Sağ Ayak %", "Ön Ayak %", "Arka Ayak %", "Sol Clarke (°)", "Sağ Clarke (°)"],
        [l1, r1_val, f1, b1, cL1, cR1],
        [l2, r2_val, f2, b2, cL2, cR2],
        `1. Analiz (${d1Str})`,
        `2. Analiz (${d2Str})`,
        "Yük Dağılımı (%) / Derece (°)"
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. DİNAMİK YÜRÜME ANALİZİ KARŞILAŞTIRMA (ÖZEL)
// ─────────────────────────────────────────────────────────────────────────────
function compareGait(r1, r2, d1Str, d2Str) {
    const s1 = (r1.session_data && r1.session_data.steps) ? r1.session_data.steps : [];
    const s2 = (r2.session_data && r2.session_data.steps) ? r2.session_data.steps : [];

    const lSteps1 = s1.filter(x => x.type === 'left').length;
    const rSteps1 = s1.filter(x => x.type === 'right').length;
    const lSteps2 = s2.filter(x => x.type === 'left').length;
    const rSteps2 = s2.filter(x => x.type === 'right').length;

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

    const rsi1 = Math.max(0, 100 - asym1);
    const rsi2 = Math.max(0, 100 - asym2);

    const specsSteps = [
        { name: "Toplam Kaydedilen Adım Sayısı", val1: s1.length, val2: s2.length, unit: " Adım" },
        { name: "Sol Ayak Adım Sayısı", val1: lSteps1, val2: lSteps2, unit: " Adım" },
        { name: "Sağ Ayak Adım Sayısı", val1: rSteps1, val2: rSteps2, unit: " Adım" }
    ];

    const specsForce = [
        { name: "Sol Ayak Maksimum Tepe Kuvveti (Peak Force)", val1: lf1, val2: lf2, unit: " kg/cm²" },
        { name: "Sağ Ayak Maksimum Tepe Kuvveti (Peak Force)", val1: rf1, val2: rf2, unit: " kg/cm²" },
        { name: "Kuvvet Asimetrisi (%)", val1: asym1, val2: asym2, unit: "%", lowerIsBetter: true },
        { name: "Yürüme Simetri İndeksi (RSI)", val1: rsi1, val2: rsi2, unit: "%", higherIsBetter: true }
    ];

    const impScore = calculateImprovementScore([...specsForce]);
    renderComparisonHeader(d1Str, d2Str, "Dinamik Simetri & Yürüme Fazı İlerlemesi", impScore, "🏃‍♂️ Dinamik Yürüme Analizi");

    renderComparisonVisuals(''); // Yürüme için özel kartlar tablolarda verilir

    renderCustomTables([
        { title: "Adım Sayısı & Dinamik Temas Dağılımı", specs: specsSteps, icon: "fa-shoe-prints" },
        { title: "Tepe Kuvvet & Bağıl Simetri İndeksi (RSI)", specs: specsForce, icon: "fa-gauge-high" }
    ], d1Str, d2Str);

    renderComparisonChart(
        ["Sol Tepe Kuvvet", "Sağ Tepe Kuvvet", "Kuvvet Asimetrisi (%)", "Simetri İndeksi (RSI %)"],
        [lf1, rf1, asym1, rsi1],
        [lf2, rf2, asym2, rsi2],
        `1. Analiz (${d1Str})`,
        `2. Analiz (${d2Str})`,
        "Değer / Oran (%)"
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. DENGE TESTİ KARŞILAŞTIRMA (ÖZEL)
// ─────────────────────────────────────────────────────────────────────────────
function compareBalance(r1, r2, d1Str, d2Str) {
    const s1 = (r1.session_data && r1.session_data.session) ? r1.session_data.session : {};
    const s2 = (r2.session_data && r2.session_data.session) ? r2.session_data.session : {};

    const open1 = s1.cift_acik || {};
    const close1 = s1.cift_kapali || {};
    const open2 = s2.cift_acik || {};
    const close2 = s2.cift_kapali || {};

    const left1 = s1.tek_sol_acik || {};
    const left2 = s2.tek_sol_acik || {};
    const right1 = s1.tek_sag_acik || {};
    const right2 = s2.tek_sag_acik || {};

    const aO1 = parseFloat(open1.area || 0);
    const aO2 = parseFloat(open2.area || 0);
    const aC1 = parseFloat(close1.area || 0);
    const aC2 = parseFloat(close2.area || 0);

    const vO1 = parseFloat(open1.meanVelocity || open1.velocity || 0);
    const vO2 = parseFloat(open2.meanVelocity || open2.velocity || 0);
    const vC1 = parseFloat(close1.meanVelocity || close1.velocity || 0);
    const vC2 = parseFloat(close2.meanVelocity || close2.velocity || 0);

    const romberg1 = (aO1 > 0) ? parseFloat((aC1 / aO1).toFixed(2)) : 0;
    const romberg2 = (aO2 > 0) ? parseFloat((aC2 / aO2).toFixed(2)) : 0;

    const specsBilateral = [
        { name: "Çift Ayak Gözler Açık - Sway Alanı (mm²)", val1: aO1, val2: aO2, unit: " mm²", lowerIsBetter: true },
        { name: "Çift Ayak Gözler Açık - Ortalama Hız (mm/s)", val1: vO1, val2: vO2, unit: " mm/s", lowerIsBetter: true },
        { name: "Çift Ayak Gözler Kapalı - Sway Alanı (mm²)", val1: aC1, val2: aC2, unit: " mm²", lowerIsBetter: true },
        { name: "Çift Ayak Gözler Kapalı - Ortalama Hız (mm/s)", val1: vC1, val2: vC2, unit: " mm/s", lowerIsBetter: true },
        { name: "Romberg İndeksi (Kapalı / Açık Oranı)", val1: romberg1, val2: romberg2, unit: "", target: 1.0, lowerIsBetter: true }
    ];

    const specsUnilateral = [
        { name: "Tek Ayak Sol Açık - Sway Alanı (mm²)", val1: parseFloat(left1.area || 0), val2: parseFloat(left2.area || 0), unit: " mm²", lowerIsBetter: true },
        { name: "Tek Ayak Sol Açık - Ortalama Hız (mm/s)", val1: parseFloat(left1.meanVelocity || left1.velocity || 0), val2: parseFloat(left2.meanVelocity || left2.velocity || 0), unit: " mm/s", lowerIsBetter: true },
        { name: "Tek Ayak Sağ Açık - Sway Alanı (mm²)", val1: parseFloat(right1.area || 0), val2: parseFloat(right2.area || 0), unit: " mm²", lowerIsBetter: true },
        { name: "Tek Ayak Sağ Açık - Ortalama Hız (mm/s)", val1: parseFloat(right1.meanVelocity || right1.velocity || 0), val2: parseFloat(right2.meanVelocity || right2.velocity || 0), unit: " mm/s", lowerIsBetter: true }
    ];

    const impScore = calculateImprovementScore([...specsBilateral]);
    renderComparisonHeader(d1Str, d2Str, "Postüral Stabilite & Romberg Gelişimi", impScore, "⚖️ Denge Testi (Postürografi)");

    renderComparisonVisuals('');

    renderCustomTables([
        { title: "Bilateral Test Koşulları (Çift Ayak & Romberg Oranı)", specs: specsBilateral, icon: "fa-scale-unbalanced-flip" },
        { title: "Unilateral Test Koşulları (Tek Ayak Sol & Sağ Karşılaştırması)", specs: specsUnilateral, icon: "fa-person" }
    ], d1Str, d2Str);

    renderComparisonChart(
        ["Göz Açık Alan (mm²)", "Göz Kapalı Alan (mm²)", "Göz Açık Hız (mm/s)", "Göz Kapalı Hız (mm/s)", "Romberg Oranı (x10)"],
        [aO1, aC1, vO1, vC1, romberg1 * 10],
        [aO2, aC2, vO2, vC2, romberg2 * 10],
        `1. Analiz (${d1Str})`,
        `2. Analiz (${d2Str})`,
        "Ölçüm Değeri"
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. SKOLYOZ (COBB) KARŞILAŞTIRMA (ÖZEL)
// ─────────────────────────────────────────────────────────────────────────────
function compareScoliosis(r1, r2, d1Str, d2Str) {
    const c1 = parseFloat(r1.cobb_angle || 0);
    const c2 = parseFloat(r2.cobb_angle || 0);

    const getSeverity = (ang) => {
        if (ang === 0) return "Normal / Ölçülmedi";
        if (ang <= 10) return "Fizyolojik Varyasyon (Normal)";
        if (ang <= 25) return "Hafif Skolyoz";
        if (ang <= 40) return "Orta Derece Skolyoz (Korse Tedavisi)";
        return "İleri Derece Skolyoz (Cerrahi Risk)";
    };

    const specs = [
        { name: "Hesaplanan Cobb Açısı (°)", val1: c1, val2: c2, unit: "°", lowerIsBetter: true },
        { name: "Eğrilik Şiddet Sınıfı", val1: 0, val2: 0, unit: "", note1: getSeverity(c1), note2: getSeverity(c2) },
        { name: "Eğrilik Tipi & Bölgesi", val1: 0, val2: 0, unit: "", note1: r1.curve_type || "C / S Eğrisi", note2: r2.curve_type || "C / S Eğrisi" }
    ];

    const diff = c1 - c2;
    let impScore = 50;
    if (c1 > 0) {
        impScore = Math.min(100, Math.max(0, Math.round(50 + (diff / c1) * 50)));
    }

    renderComparisonHeader(d1Str, d2Str, "Cobb Açısı Regresyon / İlerleme", impScore, "🦴 Cobb Skolyoz Analizi");

    const img1 = r1.image_path ? `/${r1.image_path}` : null;
    const img2 = r2.image_path ? `/${r2.image_path}` : null;

    renderComparisonVisuals(`
        <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm mb-6">
            <h4 class="font-black text-slate-800 text-sm mb-4 flex items-center gap-2">
                <i class="fa-solid fa-x-ray text-blue-600"></i> Röntgen (X-Ray) & Omurga Cobb Açısı Karşılaştırması
            </h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center justify-items-center">
                <div class="flex flex-col items-center bg-indigo-50/40 p-4 rounded-3xl border border-indigo-100 w-full">
                    <span class="text-xs font-black text-indigo-700 bg-white px-3 py-1 rounded-full border border-indigo-200 mb-2">
                        1. Röntgen (${d1Str}) - Cobb: ${c1}°
                    </span>
                    ${img1 ? `<img src="${img1}" class="w-full max-w-sm h-72 object-contain rounded-2xl border-2 border-slate-700 bg-black shadow-md" />` : '<div class="w-full h-72 bg-slate-900 rounded-2xl flex items-center justify-center text-slate-400">Röntgen Görseli Yok</div>'}
                    <span class="text-xs font-bold text-slate-600 mt-2">${getSeverity(c1)}</span>
                </div>
                <div class="flex flex-col items-center bg-emerald-50/40 p-4 rounded-3xl border border-emerald-100 w-full">
                    <span class="text-xs font-black text-emerald-700 bg-white px-3 py-1 rounded-full border border-emerald-200 mb-2">
                        2. Röntgen (${d2Str}) - Cobb: ${c2}°
                    </span>
                    ${img2 ? `<img src="${img2}" class="w-full max-w-sm h-72 object-contain rounded-2xl border-2 border-slate-700 bg-black shadow-md" />` : '<div class="w-full h-72 bg-slate-900 rounded-2xl flex items-center justify-center text-slate-400">Röntgen Görseli Yok</div>'}
                    <span class="text-xs font-bold text-slate-600 mt-2">${getSeverity(c2)}</span>
                </div>
            </div>
        </div>
    `);

    renderCustomTables([
        { title: "Cobb Açısı & Skolyoz Değerlendirmesi", specs: specs, icon: "fa-bone" }
    ], d1Str, d2Str);

    renderComparisonChart(
        ["Cobb Açısı (°)", "Hafif Eşik (10°)", "Orta Eşik (25°)", "Cerrahi Eşik (40°)"],
        [c1, 10, 25, 40],
        [c2, 10, 25, 40],
        `1. Analiz (${d1Str})`,
        `2. Analiz (${d2Str})`,
        "Cobb Açısı (°)"
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// YARDIMCI GÖRSELLEŞTİRME & TABLO MOTORLARI
// ─────────────────────────────────────────────────────────────────────────────
function renderComparisonHeader(d1Str, d2Str, metricName, score, moduleTitle) {
    const headerEl = document.getElementById('compSummaryHeader');
    if (!headerEl) return;

    let badgeColor = "bg-emerald-50 text-emerald-700 border-emerald-200";
    let trendText = "İyileşme / Düzeltme Trendinde";
    let trendIcon = "fa-arrow-trend-up text-emerald-600";

    if (score < 45) {
        badgeColor = "bg-rose-50 text-rose-700 border-rose-200";
        trendText = "Artış / Sapma Gözlendi";
        trendIcon = "fa-arrow-trend-down text-rose-600";
    } else if (score >= 45 && score <= 55) {
        badgeColor = "bg-amber-50 text-amber-700 border-amber-200";
        trendText = "Stabil / Dengeli Durum";
        trendIcon = "fa-minus text-amber-600";
    }

    headerEl.innerHTML = `
        <div class="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 shadow-sm border border-slate-800">
            <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <span class="text-xs font-bold text-violet-400 uppercase tracking-wider block mb-1">
                        ${moduleTitle || "Klinik Karşılaştırma Raporu"}
                    </span>
                    <h2 class="text-xl font-black text-white flex items-center gap-2">
                        <span>${d1Str}</span>
                        <i class="fa-solid fa-arrow-right text-xs text-violet-400"></i>
                        <span class="text-emerald-400">${d2Str}</span>
                    </h2>
                    <p class="text-xs text-slate-300 mt-1">İki tarih arasındaki tüm klinik parametreler başarıyla karşılaştırıldı.</p>
                </div>
                <div class="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10">
                    <div class="text-right">
                        <span class="text-[10px] uppercase font-bold text-slate-300 block">${metricName}</span>
                        <span class="text-lg font-black text-white">%${score}</span>
                    </div>
                    <div class="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-base shadow-sm">
                        <i class="fa-solid ${trendIcon}"></i>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderComparisonVisuals(html) {
    const vCard = document.getElementById('compVisualsContainer');
    if (!vCard) return;
    if (!html || html.trim() === '') {
        vCard.innerHTML = '';
        vCard.classList.add('hidden');
    } else {
        vCard.innerHTML = html;
        vCard.classList.remove('hidden');
    }
}

function renderCustomTables(tables, d1Str, d2Str) {
    const tbody = document.getElementById('compTableBody');
    if (!tbody) return;

    let html = '';

    tables.forEach(tableGroup => {
        html += `
            <tr class="bg-slate-100/90 border-t-2 border-slate-200">
                <td colspan="4" class="px-6 py-3 font-black text-slate-800 text-xs uppercase tracking-wider flex items-center gap-2">
                    <i class="fa-solid ${tableGroup.icon || 'fa-chart-pie'} text-violet-600"></i> ${tableGroup.title}
                </td>
            </tr>
        `;

        tableGroup.specs.forEach(s => {
            if (s.note1 !== undefined && s.note2 !== undefined && s.val1 === 0 && s.val2 === 0) {
                // Not/Sözel Karşılaştırma Satırı
                html += `
                    <tr class="hover:bg-slate-50/80 transition-colors">
                        <td class="px-6 py-3.5 font-bold text-slate-800">${s.name}</td>
                        <td class="px-6 py-3.5 text-slate-700 bg-indigo-50/30 font-semibold">${s.note1}</td>
                        <td class="px-6 py-3.5 text-slate-700 bg-emerald-50/30 font-semibold">${s.note2}</td>
                        <td class="px-6 py-3.5 text-center">
                            <span class="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">Tanısal Sınıf</span>
                        </td>
                    </tr>
                `;
                return;
            }

            const diff = parseFloat((s.val2 - s.val1).toFixed(1));
            let badge = '';

            if (diff === 0) {
                badge = `<span class="inline-flex items-center gap-1 bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg text-xs font-bold"><i class="fa-solid fa-minus"></i> Değişmedi</span>`;
            } else if (s.lowerIsBetter) {
                if (diff < 0) {
                    badge = `<span class="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-lg text-xs font-bold"><i class="fa-solid fa-arrow-down text-emerald-600"></i> ${Math.abs(diff)}${s.unit || ''} İyileşme</span>`;
                } else {
                    badge = `<span class="inline-flex items-center gap-1 bg-rose-50 text-rose-700 border border-rose-200 px-2.5 py-1 rounded-lg text-xs font-bold"><i class="fa-solid fa-arrow-up text-rose-600"></i> +${diff}${s.unit || ''} Artış</span>`;
                }
            } else if (s.higherIsBetter) {
                if (diff > 0) {
                    badge = `<span class="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-lg text-xs font-bold"><i class="fa-solid fa-arrow-up text-emerald-600"></i> +${diff}${s.unit || ''} Gelişme</span>`;
                } else {
                    badge = `<span class="inline-flex items-center gap-1 bg-rose-50 text-rose-700 border border-rose-200 px-2.5 py-1 rounded-lg text-xs font-bold"><i class="fa-solid fa-arrow-down text-rose-600"></i> ${diff}${s.unit || ''} Düşüş</span>`;
                }
            } else if (s.target !== undefined) {
                const dist1 = Math.abs(s.val1 - s.target);
                const dist2 = Math.abs(s.val2 - s.target);
                if (dist2 < dist1) {
                    badge = `<span class="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-lg text-xs font-bold"><i class="fa-solid fa-bullseye text-emerald-600"></i> İdeale Yaklaştı</span>`;
                } else {
                    badge = `<span class="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-lg text-xs font-bold"><i class="fa-solid fa-triangle-exclamation text-amber-600"></i> Sapma</span>`;
                }
            } else {
                const sign = diff > 0 ? `+${diff}` : `${diff}`;
                badge = `<span class="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 border border-indigo-200 px-2.5 py-1 rounded-lg text-xs font-bold">${sign}${s.unit || ''}</span>`;
            }

            const note1Str = s.note1 ? ` <span class="text-[11px] text-slate-400 block font-normal">${s.note1}</span>` : '';
            const note2Str = s.note2 ? ` <span class="text-[11px] text-slate-400 block font-normal">${s.note2}</span>` : '';

            html += `
                <tr class="hover:bg-slate-50/80 transition-colors">
                    <td class="px-6 py-3.5 font-bold text-slate-800">${s.name}</td>
                    <td class="px-6 py-3.5 text-indigo-900 bg-indigo-50/20 font-black">${s.val1}${s.unit || ''}${note1Str}</td>
                    <td class="px-6 py-3.5 text-emerald-900 bg-emerald-50/20 font-black">${s.val2}${s.unit || ''}${note2Str}</td>
                    <td class="px-6 py-3.5 text-center">${badge}</td>
                </tr>
            `;
        });
    });

    tbody.innerHTML = html;
}

function calculateImprovementScore(specs) {
    if (!specs || specs.length === 0) return 50;

    let total = 0;
    let count = 0;

    specs.forEach(s => {
        if (s.lowerIsBetter) {
            const diff = s.val1 - s.val2;
            const maxVal = Math.max(s.val1, s.val2, 1);
            const score = 50 + (diff / maxVal) * 50;
            total += Math.min(100, Math.max(0, score));
            count++;
        } else if (s.higherIsBetter) {
            const diff = s.val2 - s.val1;
            const maxVal = Math.max(s.val1, s.val2, 1);
            const score = 50 + (diff / maxVal) * 50;
            total += Math.min(100, Math.max(0, score));
            count++;
        } else if (s.target !== undefined) {
            const dist1 = Math.abs(s.val1 - s.target);
            const dist2 = Math.abs(s.val2 - s.target);
            const score = dist2 <= dist1 ? 75 : 35;
            total += score;
            count++;
        }
    });

    return count > 0 ? Math.round(total / count) : 50;
}

function renderComparisonChart(labels, data1, data2, label1, label2, yAxisTitle) {
    const canvas = document.getElementById('comparisonChartCanvas');
    if (!canvas) return;

    if (window.comparisonChartInstance) {
        window.comparisonChartInstance.destroy();
    }

    const ctx = canvas.getContext('2d');
    window.comparisonChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: label1,
                    data: data1,
                    backgroundColor: 'rgba(99, 102, 241, 0.85)',
                    borderColor: 'rgb(79, 70, 229)',
                    borderWidth: 1.5,
                    borderRadius: 8
                },
                {
                    label: label2,
                    data: data2,
                    backgroundColor: 'rgba(16, 185, 129, 0.85)',
                    borderColor: 'rgb(5, 150, 105)',
                    borderWidth: 1.5,
                    borderRadius: 8
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        font: { size: 12, weight: 'bold' },
                        color: '#1e293b'
                    }
                },
                tooltip: {
                    backgroundColor: '#0f172a',
                    padding: 12,
                    cornerRadius: 8
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: !!yAxisTitle,
                        text: yAxisTitle || '',
                        color: '#64748b',
                        font: { size: 11, weight: 'bold' }
                    },
                    grid: { color: 'rgba(226, 232, 240, 0.6)' }
                },
                x: {
                    grid: { display: false },
                    ticks: {
                        font: { size: 11, weight: 'bold' },
                        color: '#334155'
                    }
                }
            }
        }
    });
}
