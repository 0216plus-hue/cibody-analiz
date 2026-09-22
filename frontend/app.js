
let globalPostureState = { front: null, back: null, left: null, right: null };
let globalPatientInfo = null;
const FOOT_RISK_DATA = {
    "Pes Planus": {
        title: "Pes Planus (Düz Taban / Çökmüş Ark)",
        risks: ["Plantar fasiit (topuk ve taban ağrısı)", "Aşil tendiniti (topuk arkasında gerginlik)", "Dizlerde içeri dönme (Genu Valgum) ve iç bağ zorlanması", "Bel ağrısı ve kalça biyomekaniğinin bozulması"],
        img: "assets/risks/kalca.jpg"
    },
    "Pes Cavus": {
        title: "Pes Cavus (Çukur Taban / Yüksek Ark)",
        risks: ["Metatarsalji (ayak önü tarak kemiklerinde ağrı)", "Ayak bileği dış yan bağ burkulmalarına yatkınlık", "Bacak şok emiliminin azalması, diz ve kalça eklemine darbe yansıması", "Pençe veya çekiç parmak deformiteleri"],
        img: "assets/risks/kalca.jpg"
    },
    "Yük Asimetrisi": {
        title: "Sağ/Sol Yük Dengesi Asimetrisi",
        risks: ["Fonksiyonel bacak boyu eşitsizliği (bir bacağı kısa hissetme)", "Tek taraflı diz veya kalça kireçlenmesi (osteoartrit) hızlanması", "Omurgada telafi edici asimetrik gerginlik, potansiyel fonksiyonel skolyoz", "Tek taraflı yorgunluk ve kas krampları"],
        img: "assets/risks/kalca.jpg"
    },
    "Posterior Yüklenme": {
        title: "Posterior Shift (Topuklara Geriye Yığılma)",
        risks: ["Topuk dikeni (Kalkaneal Spur) ve topuk bölgesinde kalınlaşma", "Pelvik tiltin bozulması (omurga kavisinin düzleşmesi veya artması)", "Bel fıtığı riskinin artması (sakral kompresyon)", "Dizlerin arkaya doğru aşırı gerilmesi (Genu Rekurvatum)"],
        img: "assets/risks/kalca.jpg"
    },
    "Anterior Yüklenme": {
        title: "Anterior Shift (Öne / Parmak Ucuna Yığılma)",
        risks: ["Ayak önünde (metatars) ciddi nasırlaşma (hiperkeratoz)", "Morton Nöroması (sinir sıkışması)", "Baldır (gastroknemius) ve aşil tendonunda kronik gerginlik / kısalma", "Öne doğru kamburlaşma postürü"],
        img: "assets/risks/bas.jpg"
    }
};

let currentPatientId = null;
let isDragging = false;
let draggedPointKey = null;
let currentDragView = null;

// GÖRÜNÜM KONTROLLERİ
function showDashboard() {
    showAppView();
    const user = getUser();
    // Update nav username
    const navUserName = document.getElementById('navUserName');
    if(navUserName && user && user.name) navUserName.textContent = user.name;
    if(user) {
        const nameEl = document.getElementById('navCurrentUser');
        if(nameEl) nameEl.textContent = user.name;
    }
    document.getElementById('dashboardView').classList.remove('hidden');
    document.getElementById('patientView').classList.add('hidden');
    document.getElementById('navPatientName').classList.add('hidden');
    fetchPatients();
}

function showPatient(patientId, patientName, patientAge, patientWeight, patientGender, patientPhone) {
    currentPatientId = patientId;
    document.getElementById('dashboardView').classList.add('hidden');
    document.getElementById('patientView').classList.remove('hidden');
    document.getElementById('navPatientName').classList.remove('hidden');
    document.getElementById('navPatientName').innerText = patientName;
    globalPatientInfo = { name: patientName, age: patientAge, weight: patientWeight, gender: patientGender, phone: patientPhone };
    
    document.getElementById('detailName').innerText = patientName;
    const maskedPhone = patientPhone ? patientPhone.replace(/(\d{4})\d{3}(\d{2})/, "$1***$2") : "Yok";
    document.getElementById('detailInfo').innerText = `Yaş: ${patientAge} | Kilo: ${patientWeight}kg | Cinsiyet: ${patientGender} | Tel: ${maskedPhone}`;
    
    switchTab('postureTab');
    loadPatientData(patientId);
}

function switchTab(tabId) {
    // Hide all tabs
    document.getElementById('postureTab').classList.add('hidden');
    document.getElementById('footTab').classList.add('hidden');
    const spineTab = document.getElementById('spineTab');
    if (spineTab) spineTab.classList.add('hidden');
    
    // Remove active class from all buttons
    document.getElementById('btn_postureTab').classList.remove('active', 'border-b-2', 'border-indigo-600', 'text-indigo-600');
    document.getElementById('btn_footTab').classList.remove('active', 'border-b-2', 'border-indigo-600', 'text-indigo-600');
    const btnSpine = document.getElementById('btn_spineTab');
    if (btnSpine) btnSpine.classList.remove('active', 'border-b-2', 'border-indigo-600', 'text-indigo-600');
    
    // Show selected tab and set button active
    document.getElementById(tabId).classList.remove('hidden');
    document.getElementById('btn_' + tabId).classList.add('active', 'border-b-2', 'border-indigo-600', 'text-indigo-600');
}

function showToast(msg) {
    const toast = document.getElementById('toastNotification');
    document.getElementById('toastMessage').innerText = msg;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 3000);
}

// API İŞLEMLERİ (HASTA)

async function deletePatient(id) {
    if(!confirm("Bu hastayı ve tüm analizlerini tamamen silmek istediğinize emin misiniz? Bu işlem geri alınamaz!")) return;
    try {
        const res = await authFetch(`/api/patients/${id}`, { method: 'DELETE' });
        if(res.ok) {
            showToast("Hasta başarıyla silindi.");
            fetchPatients();
        } else {
            const data = await res.json();
            showToast(data.detail || "Silme hatası");
        }
    } catch(err) {
        showToast("Sunucu ile iletişim kurulamadı.");
    }
}

let allPatients = [];
let visiblePatientCount = 20;

async function fetchPatients() {
    try {
        const res = await authFetch('/api/patients');
        const data = await res.json();
        // Backend id desc olarak yolluyor, yine de garanti olsun.
        allPatients = data;
        renderPatients();
    } catch(err) { showToast("Hastalar yüklenemedi: " + err.message); }
}

function renderPatients() {
    const tbody = document.getElementById('patientTableBody');
    const searchInput = document.getElementById('patientSearch');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    if (!tbody) return;

    let filtered = allPatients;
    
    if (searchInput && searchInput.value.trim() !== '') {
        const q = searchInput.value.trim().toLowerCase();
        filtered = allPatients.filter(p => 
            p.name.toLowerCase().includes(q) || 
            (p.phone && p.phone.includes(q))
        );
    }
    
    const toShow = filtered.slice(0, visiblePatientCount);
    
    if (filtered.length > visiblePatientCount) {
        if (loadMoreBtn) loadMoreBtn.classList.remove('hidden');
    } else {
        if (loadMoreBtn) loadMoreBtn.classList.add('hidden');
    }

    if(toShow.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center py-8 text-slate-500">Kayıtlı hasta bulunamadı.</td></tr>';
        return;
    }

    tbody.innerHTML = toShow.map(p => `
        <tr class="hover:bg-slate-50 transition-colors border-b border-slate-50">
            <td class="py-4 px-2 align-middle text-center">
                <button onclick="deletePatient(${p.id})" class="text-slate-300 hover:text-red-600 hover:bg-red-50 w-8 h-8 rounded-lg transition-colors flex items-center justify-center mx-auto" title="Hastayı Sil">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
            <td class="py-4 text-slate-500 px-2 align-middle font-medium">#${p.id}</td>
            <td class="py-4 font-bold text-slate-800 px-2 align-middle">${p.name}</td>
            <td class="py-4 text-slate-600 px-2 align-middle">${p.age} Yaş, ${p.weight} kg</td>
            <td class="py-4 text-slate-600 px-2 align-middle font-medium">${p.phone || '-'}</td>
            <td class="py-4 text-right px-2 align-middle">
                <button onclick="showPatient(${p.id}, '${p.name}', ${p.age}, ${p.weight}, '${p.gender}', '${p.phone || ''}')" class="bg-indigo-900 hover:bg-indigo-800 text-white px-5 py-2 rounded-lg font-bold transition-colors text-sm inline-flex items-center justify-center shadow-sm">
                    Hasta Kartını Aç <i class="fa-solid fa-arrow-right ml-2"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function loadMorePatients() {
    visiblePatientCount += 20;
    renderPatients();
}

async function createPatient(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', document.getElementById('p_name').value);
    formData.append('age', document.getElementById('p_age').value || 0);
    formData.append('weight', document.getElementById('p_weight').value || 0);
    formData.append('gender', document.getElementById('p_gender').value || 'Erkek');
    formData.append('phone', document.getElementById('p_phone').value || '');

    try {
        const res = await authFetch('/api/patients', { method: 'POST', body: formData });
        const data = await res.json();
        if(res.ok) {
            const modal = document.getElementById('newPatientModal');
            if(modal) modal.classList.add('hidden');
            visiblePatientCount = 20;
            await fetchPatients();
            showPatient(data.patient_id, document.getElementById('p_name').value, document.getElementById('p_age').value, document.getElementById('p_weight').value, document.getElementById('p_gender').value, document.getElementById('p_phone').value);
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
    
    // Clear old preview images
    ['front', 'back', 'left', 'right'].forEach(view => {
        const p = document.getElementById('preview_' + view);
        if(p) { p.removeAttribute('src'); p.classList.add('hidden'); }
        const p_h = document.getElementById('placeholder_' + view);
        if(p_h) { p_h.classList.remove('hidden'); }
        
        // Remove old orig_imgs from DOM
        const o = document.getElementById('orig_img_' + view);
        if(o) o.remove();
        
        // Clear canvas context
        const c = document.getElementById('canvas_' + view);
        if(c) {
            const ctx = c.getContext('2d');
            ctx.clearRect(0, 0, c.width, c.height);
        }
        
        // Clear tables
        const t = document.getElementById('table_' + view);
        if(t) t.innerHTML = '';
    });

    try {
        const res = await authFetch(`/api/patients/${id}`);
        const data = await res.json();
        
        // Load Posture (Latest & History)
        if(data.posture_analyses && data.posture_analyses.length > 0) {
            currentPatientAnalyses = data.posture_analyses;
            
            // Tarih Dropdown'unu doldur
            const selectEl = document.getElementById('analysisHistorySelect');
            if(selectEl) {
                selectEl.innerHTML = '';
                currentPatientAnalyses.forEach((analysis, index) => {
                    const dateObj = new Date(analysis.created_at + 'Z');
                    const dateStr = dateObj.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute:'2-digit' });
                    const label = index === 0 ? `En Güncel (${dateStr})` : `Geçmiş: ${dateStr}`;
                    selectEl.innerHTML += `<option value="${index}">${label}</option>`;
                });
                selectEl.value = "0"; // En günceli seç
            }
            
            // İlk (en güncel) analizi ekrana bas
            renderHistoricalAnalysis(0);
        }
        
        // Load Foot (Latest)
        if(data.foot_analyses && data.foot_analyses.length > 0) {
            const latestFoot = data.foot_analyses[0];
            window.currentFootAnalysisId = latestFoot.id;
            document.getElementById('footResultsSection').classList.remove('hidden');
            
            // Rapor Tarihini Güncelle
            const footDateObj = new Date(latestFoot.created_at + 'Z');
            const footDateStr = footDateObj.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute:'2-digit' });
            const footReportDateEl = document.getElementById('footReportDate');
            if(footReportDateEl) footReportDateEl.innerText = "Oluşturma Tarihi: " + footDateStr;

            // Markdown render
            let aiText = latestFoot.ai_report_text;
            
            // HASTA BİLGİLERİ kısmını yan yana (flex) olacak şekilde formatla
            const patientInfoRegex = /👤?\s*\**HASTA BİLGİLERİ\**\n([\s\S]*?)(?=1\.\s*KLİNİK ÖZET|### 1\. KLİNİK ÖZET)/i;
            const match = aiText.match(patientInfoRegex);
            if(match) {
                let infoText = match[1];
                infoText = infoText.replace(/\n+/g, ' <span class="text-indigo-300 mx-2">|</span> ').replace(/\*\*/g, '').replace(/\|\s*\|/g, '|').trim();
                if(infoText.endsWith('|</span>')) infoText = infoText.substring(0, infoText.lastIndexOf('<span')).trim();
                
                const htmlReplacement = `<div class="bg-indigo-50 border border-indigo-100 text-indigo-900 px-4 py-3 rounded-xl flex flex-wrap items-center text-sm font-semibold mb-4 shadow-sm"><i class="fa-solid fa-user-injured mr-3 text-indigo-500"></i> ${infoText}</div>\n\n`;
                aiText = aiText.replace(patientInfoRegex, htmlReplacement);
            }
            
            // Replace "fizyoterapist için" with "uzman için" in AI text
aiText = aiText.replace(/fizyoterapist için/gi, 'Uzman İçin');
aiText = aiText.replace(/FİZYOTERAPİST İÇİN/g, 'UZMAN İÇİN');
aiText = aiText.replace(/Fizyoterapist İçin/g, 'Uzman İçin');
document.getElementById('footReportContent').innerHTML = marked.parse(aiText);
            
            // Show action buttons
            const actionBtns = document.getElementById('footActionButtons');
            if(actionBtns) actionBtns.classList.remove('hidden');
            document.getElementById('btnDownloadPdf').href = "/" + latestFoot.original_pdf_path.replace(/\\/g, '/');
            
            // Extract Risk keywords from AI report
            aiText = aiText.toLowerCase();
            const foundFootRisks = [];
            if (aiText.includes('pes planus') || aiText.includes('düz taban') || aiText.includes('flat foot') || aiText.includes('çökmüş ark')) foundFootRisks.push('Pes Planus');
            if (aiText.includes('pes cavus') || aiText.includes('çukur taban') || aiText.includes('yüksek ark')) foundFootRisks.push('Pes Cavus');
            if (aiText.includes('asimetri') || aiText.includes('dengesizliği') || aiText.includes('tek taraflı')) foundFootRisks.push('Yük Asimetrisi');
            if (aiText.includes('posterior') || aiText.includes('geriye') || aiText.includes('topuklara') || aiText.includes('arka ayak') || aiText.includes('topuk yük')) foundFootRisks.push('Posterior Yüklenme');
            if (aiText.includes('anterior') || aiText.includes('öne') || aiText.includes('metatars') || aiText.includes('ön ayak') || aiText.includes('parmaklara')) foundFootRisks.push('Anterior Yüklenme');
            
            const fRisksSection = document.getElementById('footRisksSection');
            const fRisksContainer = document.getElementById('footRisksContainer');
            
            if (fRisksSection && fRisksContainer) {
                fRisksContainer.innerHTML = '';
                if (foundFootRisks.length > 0) {
                    fRisksSection.classList.remove('hidden');
                    
                    foundFootRisks.forEach(f => {
                        const rData = FOOT_RISK_DATA[f];
                        if(rData) {
                            let liHtml = rData.risks.map(r => `<li class="mb-2 text-slate-700">${r}</li>`).join('');
                            let cardHtml = `
                                <div class="bg-white border border-slate-200 rounded-2xl flex flex-col md:flex-row overflow-hidden shadow-sm items-stretch avoid-break">
                                    <div class="md:w-1/4 lg:w-1/5 bg-slate-50 border-r border-slate-100 flex flex-col items-center justify-center p-6">
                                        <img src="/${rData.img}" alt="${f}" class="w-full max-h-40 object-contain rounded-xl mix-blend-multiply opacity-80">
                                        <div class="w-full text-center text-[10px] font-bold mt-3 bg-white px-2 py-1.5 rounded-lg shadow-sm border border-slate-200">
                                            <span class="text-slate-400">Şimdi</span> <i class="fa-solid fa-arrow-right text-slate-300 mx-1"></i> <span class="text-amber-600">Sonra</span>
                                        </div>
                                    </div>
                                    <div class="md:w-3/4 lg:w-4/5 p-5 md:p-6">
                                        <h4 class="text-lg font-bold text-slate-800 mb-1">${rData.title}</h4>
                                        <p class="text-xs font-bold text-rose-500 tracking-wider uppercase mb-4">Zamanla Oluşabilecek Olası Riskler</p>
                                        <ul class="list-disc pl-5 text-sm">
                                            ${liHtml}
                                        </ul>
                                    </div>
                                </div>
                            `;
                            fRisksContainer.innerHTML += cardHtml;
                        }
                    });
                } else {
                    fRisksSection.classList.add('hidden');
                }
            }
        }
    } catch(err) { console.error("Data load err:", err); }
}

function loadHistoricalAnalysis(indexStr) {
    const index = parseInt(indexStr);
    renderHistoricalAnalysis(index);
}

function renderHistoricalAnalysis(index) {
    if(!currentPatientAnalyses || currentPatientAnalyses.length <= index) return;
    
    const targetAnalysis = currentPatientAnalyses[index];
    currentAnalysisId = targetAnalysis.id;
    
    // Notları Textarea'ya yükle
    const notesInput = document.getElementById('clinicalNotesInput');
    if(notesInput) {
        notesInput.value = targetAnalysis.clinical_notes || '';
    }

    // Egzersizleri Yükle
    if (typeof loadPrescribedExercises === 'function') {
        loadPrescribedExercises();
    }

    
    const parsed = JSON.parse(targetAnalysis.analysis_data);
    
    globalPostureState = {
        front: parsed.front || null,
        back: parsed.back || null,
        left: parsed.left || null,
        right: parsed.right || null
    };
    
    document.getElementById('postureResultsSection').classList.remove('hidden');
    document.getElementById('postureUploadSection').classList.add('hidden');
    
    // Rapor Tarihini Güncelle
    const dateObj = new Date(targetAnalysis.created_at + 'Z');
    const dateStr = dateObj.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute:'2-digit' });
    const reportDateEl = document.getElementById('reportDate');
    if(reportDateEl) reportDateEl.innerText = "Oluşturma Tarihi: " + dateStr;
    
    setupDragEvents('canvas_front', 'front');
    setupDragEvents('canvas_back', 'back');
    setupDragEvents('canvas_left', 'left');
    setupDragEvents('canvas_right', 'right');

    let imagesToLoad = 0;
    let loadedCount = 0;
    const loadImg = (viewName, path) => {
        if(!path) return;
        imagesToLoad++;
        let imgEl = document.getElementById('orig_img_' + viewName);
        if(!imgEl) {
            imgEl = new Image();
            imgEl.id = 'orig_img_' + viewName;
            imgEl.className = 'hidden';
            document.body.appendChild(imgEl);
        }
        imgEl.onload = () => {
            loadedCount++;
            if(loadedCount === imagesToLoad) refreshAllCanvases();
        };
        imgEl.onerror = () => {
            console.error("Resim yuklenemedi: " + path);
            loadedCount++;
            if(loadedCount === imagesToLoad) refreshAllCanvases();
        };
        imgEl.src = "/" + path.replace(/\\/g, '/');
    };

    if(targetAnalysis.front_image_path) loadImg('front', targetAnalysis.front_image_path);
    if(targetAnalysis.back_image_path) loadImg('back', targetAnalysis.back_image_path);
    if(targetAnalysis.left_image_path) loadImg('left', targetAnalysis.left_image_path);
    if(targetAnalysis.right_image_path) loadImg('right', targetAnalysis.right_image_path);

    if(imagesToLoad === 0) refreshAllCanvases(); 
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

async function compressImage(file, maxWidth = 1080) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const canvas = document.createElement("canvas");
                let width = img.width;
                let height = img.height;
                if (width > maxWidth) {
                    height = Math.round((height * maxWidth) / width);
                    width = maxWidth;
                }
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, width, height);
                canvas.toBlob((blob) => {
                    resolve(new File([blob], file.name, { type: "image/jpeg", lastModified: Date.now() }));
                }, "image/jpeg", 0.8);
            };
        };
    });
}

async function runPostureAnalysis() {
    const formData = new FormData();
    formData.append('patient_id', currentPatientId);

    const f = document.getElementById('img_front').files[0];
    const b = document.getElementById('img_back').files[0];
    const l = document.getElementById('img_left').files[0];
    const r = document.getElementById('img_right').files[0];

    if(!f && !b && !l && !r) return showToast("En az 1 fotoğraf yükleyin.");
    
    if(f) formData.append('front_image', await compressImage(f));
    if(b) formData.append('back_image', await compressImage(b));
    if(l) formData.append('left_image', await compressImage(l));
    if(r) formData.append('right_image', await compressImage(r));

    document.getElementById('postureLoadingState').classList.remove('hidden');
    
    try {
        const res = await authFetch('/api/posture/analyze', { method: 'POST', body: formData });
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
        const res = await authFetch('/api/analyze', { method: 'POST', body: formData });
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
    let resFront=null, resBack=null, resLeft=null, resRight=null;
    if(globalPostureState.front && !globalPostureState.front.error) {
        const res = drawCanvas('canvas_front', 'preview_front', globalPostureState.front, 'front');
        let html = '';
        if(res.shoulderSym) html += `<div class="flex flex-col py-2 gap-1 border-b border-slate-100"><span class="whitespace-nowrap text-slate-500">Omuz Simetrisi</span> <span class="font-bold text-sm leading-tight ${Math.abs(res.shoulderSym.val)<2 ? 'text-green-600' : 'text-red-600'}">${res.shoulderSym.val}° ${Math.abs(res.shoulderSym.val)<2 ? '(Normal - '+res.shoulderSym.higher+' Yüksek)' : '('+res.shoulderSym.higher+' Yüksek)'}</span></div>`;
        if(res.hipSym) html += `<div class="flex flex-col py-2 gap-1 border-b border-slate-100"><span class="whitespace-nowrap text-slate-500">Kalça Simetrisi</span> <span class="font-bold text-sm leading-tight ${Math.abs(res.hipSym.val)<2 ? 'text-green-600' : 'text-red-600'}">${res.hipSym.val}° ${Math.abs(res.hipSym.val)<2 ? '(Normal - '+res.hipSym.higher+' Yüksek)' : '('+res.hipSym.higher+' Yüksek)'}</span></div>`;
        if(res.kneeSym) html += `<div class="flex flex-col py-2 gap-1 border-b border-slate-100"><span class="whitespace-nowrap text-slate-500">Diz Simetrisi</span> <span class="font-bold text-sm leading-tight ${Math.abs(res.kneeSym.val)<2 ? 'text-green-600' : 'text-red-600'}">${res.kneeSym.val}° ${Math.abs(res.kneeSym.val)<2 ? '(Normal - '+res.kneeSym.higher+' Yüksek)' : '('+res.kneeSym.higher+' Yüksek)'}</span></div>`;
        document.getElementById('table_front').innerHTML = html;
        resFront = res;
    }
    
    if(globalPostureState.back && !globalPostureState.back.error) {
        const res = drawCanvas('canvas_back', 'preview_back', globalPostureState.back, 'back');
        let html = '';
        if(res.shoulderSym) html += `<div class="flex flex-col py-2 gap-1 border-b border-slate-100"><span class="whitespace-nowrap text-slate-500">Omuz Simetrisi</span> <span class="font-bold text-sm leading-tight ${Math.abs(res.shoulderSym.val)<2 ? 'text-green-600' : 'text-red-600'}">${res.shoulderSym.val}° ${Math.abs(res.shoulderSym.val)<2 ? '(Normal - '+res.shoulderSym.higher+' Yüksek)' : '(Skolyoz Riski - '+res.shoulderSym.higher+' Yüksek)'}</span></div>`;
        if(res.hipSym) html += `<div class="flex flex-col py-2 gap-1 border-b border-slate-100"><span class="whitespace-nowrap text-slate-500">Kalça Simetrisi</span> <span class="font-bold text-sm leading-tight ${Math.abs(res.hipSym.val)<2 ? 'text-green-600' : 'text-red-600'}">${res.hipSym.val}° ${Math.abs(res.hipSym.val)<2 ? '(Normal - '+res.hipSym.higher+' Yüksek)' : '(Pelvik Asimetri - '+res.hipSym.higher+' Yüksek)'}</span></div>`;
        if(res.kneeSym) html += `<div class="flex flex-col py-2 gap-1 border-b border-slate-100"><span class="whitespace-nowrap text-slate-500">Diz Simetrisi</span> <span class="font-bold text-sm leading-tight ${Math.abs(res.kneeSym.val)<2 ? 'text-green-600' : 'text-red-600'}">${res.kneeSym.val}° ${Math.abs(res.kneeSym.val)<2 ? '(Normal - '+res.kneeSym.higher+' Yüksek)' : '('+res.kneeSym.higher+' Yüksek)'}</span></div>`;
        document.getElementById('table_back').innerHTML = html;
        resBack = res;
    }
    
    if(globalPostureState.left && !globalPostureState.left.error) {
        const res = drawCanvas('canvas_left', 'preview_left', globalPostureState.left, 'left');
        let html = '';
        if(res.cervical) html += `<div class="flex flex-col py-2 gap-1 border-b border-slate-100"><span class="whitespace-nowrap text-slate-500">Baş Öne Eğikliği</span> <span class="font-bold text-sm leading-tight ${Math.abs(res.cervical)<5 ? 'text-green-600' : 'text-red-600'}">${res.cervical}° ${Math.abs(res.cervical)<5 ? '(Normal)' : '(Forward Head)'}</span></div>`;
        if(res.thoracic) html += `<div class="flex flex-col py-2 gap-1 border-b border-slate-100"><span class="whitespace-nowrap text-slate-500">Torakal Eğiklik</span> <span class="font-bold text-sm leading-tight ${Math.abs(res.thoracic)<5 ? 'text-green-600' : 'text-red-600'}">${res.thoracic}°</span></div>`;
        if(res.pelvic) html += `<div class="flex flex-col py-2 gap-1 border-b border-slate-100"><span class="whitespace-nowrap text-slate-500">Pelvik Eğim</span> <span class="font-bold text-sm leading-tight ${Math.abs(res.pelvic)<5 ? 'text-green-600' : 'text-red-600'}">${res.pelvic}° ${Math.abs(res.pelvic)<5 ? '(Nötr)' : '(Anterior/Posterior Tilt)'}</span></div>`;
        document.getElementById('table_left').innerHTML = html;
        resLeft = res;
    }
    
    if(globalPostureState.right && !globalPostureState.right.error) {
        const res = drawCanvas('canvas_right', 'preview_right', globalPostureState.right, 'right');
        let html = '';
        if(res.cervical) html += `<div class="flex flex-col py-2 gap-1 border-b border-slate-100"><span class="whitespace-nowrap text-slate-500">Baş Öne Eğikliği</span> <span class="font-bold text-sm leading-tight ${Math.abs(res.cervical)<5 ? 'text-green-600' : 'text-red-600'}">${res.cervical}° ${Math.abs(res.cervical)<5 ? '(Normal)' : '(Forward Head)'}</span></div>`;
        if(res.thoracic) html += `<div class="flex flex-col py-2 gap-1 border-b border-slate-100"><span class="whitespace-nowrap text-slate-500">Torakal Eğiklik</span> <span class="font-bold text-sm leading-tight ${Math.abs(res.thoracic)<5 ? 'text-green-600' : 'text-red-600'}">${res.thoracic}°</span></div>`;
        if(res.pelvic) html += `<div class="flex flex-col py-2 gap-1 border-b border-slate-100"><span class="whitespace-nowrap text-slate-500">Pelvik Eğim</span> <span class="font-bold text-sm leading-tight ${Math.abs(res.pelvic)<5 ? 'text-green-600' : 'text-red-600'}">${res.pelvic}° ${Math.abs(res.pelvic)<5 ? '(Nötr)' : '(Anterior/Posterior Tilt)'}</span></div>`;
        document.getElementById('table_right').innerHTML = html;
        resRight = res;
    }

    // Skor ve Bulgu Hesaplamaları
    let findings = new Map();
    let totalDev = 0;
    
    // Front and Back
    [resFront, resBack].forEach(res => {
        if(res) {
            if(res.shoulderSym && Math.abs(res.shoulderSym.val) > 2.0) { 
                findings.set("Omuz Asimetrisi", res.shoulderSym.val + "° (" + res.shoulderSym.higher + " Yüksek)"); 
                totalDev += Math.abs(res.shoulderSym.val); 
            }
            if(res.hipSym && Math.abs(res.hipSym.val) > 2.0) { 
                findings.set("Pelvik Asimetri", res.hipSym.val + "° (" + res.hipSym.higher + " Yüksek)"); 
                totalDev += Math.abs(res.hipSym.val); 
            }
            if(res.kneeSym && Math.abs(res.kneeSym.val) > 2.0) { 
                findings.set("Diz Asimetrisi", res.kneeSym.val + "° (" + res.kneeSym.higher + " Yüksek)"); 
                totalDev += Math.abs(res.kneeSym.val); 
            }
        }
    });

    // Left and Right
    [resLeft, resRight].forEach(res => {
        if(res) {
            if(res.cervical && Math.abs(res.cervical) > 5.0) { 
                findings.set("Baş Öne Eğikliği", res.cervical + "° (Forward Head)"); 
                totalDev += Math.abs(res.cervical); 
            }
            if(res.thoracic && Math.abs(res.thoracic) > 5.0) { 
                findings.set("Torakal Eğiklik", res.thoracic + "° (Torakal Kifoz Artışı)"); 
                totalDev += Math.abs(res.thoracic); 
            }
            if(res.pelvic && Math.abs(res.pelvic) > 5.0) { 
                findings.set("Pelvik Eğim", res.pelvic + "° (Anterior/Posterior Tilt)"); 
                totalDev += Math.abs(res.pelvic); 
            }
        }
    });

    // Skoru Hesapla (100 üzerinden, toplam sapma açısının 0.7 katını düşürür)
    let generalScore = Math.max(0, Math.round(100 - (totalDev * 0.7)));
    
    // Stabilize Endeksi (Bulgu sayısına göre yüzde, bulgu başı %6 düşer)
    let stability = Math.max(0, Math.round(100 - (findings.size * 6)));

    // Ekrana Yazdır
    const dateStr = new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute:'2-digit' });
    const reportDateEl = document.getElementById('reportDate');
    if(reportDateEl) reportDateEl.innerText = "Oluşturma Tarihi: " + dateStr;

    const elScore = document.getElementById('stat_generalScore');
    const elFind = document.getElementById('stat_findingsCount');
    const elStab = document.getElementById('stat_stabilityIndex');

    if(elScore) elScore.innerText = generalScore;
    if(elFind) elFind.innerText = findings.size;
    if(elStab) elStab.innerText = "%" + stability;


    // Riskler Bölümü
        
    const CLINICAL_DATA = {
        "Omuz Asimetrisi": {
            risk: "Yüksek",
            klinik_anlam: "Omuz hattındaki yükseklik farkı; skapular kas dengesizliği, kısa/uzun ekstremite farkı veya postüral alışkanlıkla ilişkili olabilir.",
            biyomekanik: ["Skapulotorasik ritimde asimetri", "Rotator manşet kaslarında tek taraflı yük artışı", "Servikal bölge asimetrik yüklenmesi"],
            kaslar: { kisa: "Üst trapez (yüksek taraf), Levator skapula", zayif: "Alt trapez, Serratus anterior" },
            oneriler: ["Skapular retraksiyon (band pull-apart)", "Wall angel", "Tek taraflı üst trapez germe"],
            halk_dili: "Bir omzunuz diğerinden biraz daha yukarıda, yani omuzlar tam terazide değil. Genelde hep aynı omuza çanta asmak, tek yana yaslanarak oturmak gibi alışkanlıklardan olur."
        },
        "Pelvik Asimetri": {
            risk: "Yüksek",
            klinik_anlam: "Pelvisin (leğen kemiği) bir tarafının diğerine göre daha yüksekte konumlanmasıdır. Bacak boyu farkı veya kas dengesizliğine işaret edebilir.",
            biyomekanik: ["Lomber omurgada (bel) asimetrik yüklenme", "Yürüyüş biyomekaniğinde bozulma", "Kalça ve diz ekleminde asimetrik basınç"],
            kaslar: { kisa: "Quadratus lumborum (yüksek taraf), TFL", zayif: "Gluteus medius (düşük taraf), Adduktörler" },
            oneriler: ["Kalça abduktör güçlendirme (Clamshell)", "Tek bacak köprü (Single leg bridge)", "QL germe egzersizleri"],
            halk_dili: "Leğen kemiğinizin bir tarafı diğerinden daha yukarıda duruyor. Vücut ağırlığınızı sürekli tek bacağınıza vererek ayakta durmaktan veya bacak boyu farkından kaynaklanabilir."
        },
        "Baş Öne Eğikliği": {
            risk: "Yüksek",
            klinik_anlam: "Servikal omurganın normal eğriliğini kaybederek başın omuz hizasından öne doğru yer değiştirmesidir.",
            biyomekanik: ["Boyun kaslarına binen yükün her 2.5 cm sapmada 4.5 kg artması", "Faset eklem kompresyonu", "Temporomandibular (çene) eklem gerginliği"],
            kaslar: { kisa: "Suboksipital kaslar, SCM, Pektoralis", zayif: "Derin servikal fleksörler, Rhomboidler" },
            oneriler: ["Chin tuck (Çene çekme) egzersizi", "Pektoral germe (kapı arası)", "Servikal ekstansör güçlendirme"],
            halk_dili: "Başınız gövdenize göre öne doğru kaymış. Telefona veya bilgisayara uzun süre eğilerek bakmaktan olur; boynunuz kafanızı taşımakta zorlanıp ağrı yapar."
        },
        "Torakal Eğiklik": {
            risk: "Orta",
            klinik_anlam: "Sırt bölgesindeki omurga eğriliğinin (kifoz) normal sınırların üzerine çıkmasıdır.",
            biyomekanik: ["Omuz eklemi hareket açıklığında azalma", "Solunum kapasitesinde kısıtlanma", "Anterior ağırlık merkezine kayma"],
            kaslar: { kisa: "Pektoralis majör/minör, Anterior deltoid", zayif: "Torakal erektör spina, Orta/Alt trapez" },
            oneriler: ["Torakal ekstansiyon (köpük rulo ile)", "Prone Cobra egzersizi", "Scapular squeeze"],
            halk_dili: "Sırtınızda normalden fazla bir yuvarlaklık (kamburumsu duruş) var. Masa başında çok fazla öne eğilerek çalışmaktan kaynaklanır ve sırt ağrısı yapar."
        },
        "Diz Asimetrisi": {
            risk: "Orta",
            klinik_anlam: "Diz eklemiiliminin (Q açısı) bozulması; genu valgum (içe) veya genu varum (dışa) eğilimidir.",
            biyomekanik: ["Menisküs ve bağlarda asimetrik yıpranma", "Patellofemoral eklemde basınç artışı", "Ayak bileği biyomekaniğinde kompanzasyon"],
            kaslar: { kisa: "TFL, Kalça adduktörleri", zayif: "Gluteus medius/maximus, VMO" },
            oneriler: ["Kalça dış rotator güçlendirme", "IT Band ve adduktör esnetme", "Propriyosepsiyon (denge) çalışmaları"],
            halk_dili: "Dizlerinizin duruş açısında içe veya dışa doğru bir asimetri var. Ayak basış bozuklukları veya zayıf kalça kaslarından kaynaklanır."
        },
        "Pelvik Eğim": {
            risk: "Yüksek",
            klinik_anlam: "Leğen kemiğinin öne (anterior) veya arkaya (posterior) doğru aşırı dönmesi durumudur.",
            biyomekanik: ["Lomber lordozda artış/azalış (bel çukuru değişimi)", "Alt bel disklerinde kronik kompresyon", "Diz ekstansiyon mekanizmasında bozulma"],
            kaslar: { kisa: "Kalça fleksörleri (İliopsoas), Lomber ekstansörler", zayif: "Abdominal kaslar, Gluteus maximus, Hamstringler" },
            oneriler: ["Pelvik tilt egzersizleri", "Glute bridge (köprü kurma)", "Psoas (kalça önü) germe"],
            halk_dili: "Leğen kemiğiniz öne (veya arkaya) doğru fazla devrilmiş. Bel çukurunuzun çok artmasına veya düzleşmesine sebep olur. Çok fazla oturmaktan kalça kaslarının zayıflamasıyla oluşur."
        }
    };

    const RISK_DATA = {
        "Omuz Asimetrisi": {
            title: "Omuz Simetri Sapması",
            risks: ["Tek tarafta omuz ve boyun ağrısı", "Kürek kemiği çevresinde çabuk yorulma", "Zamanla omuz sıkışma sorunları"],
            img: "assets/risks/omuz.jpg"
        },
        "Pelvik Asimetri": {
            title: "Pelvik Simetri Sapması",
            risks: ["Bel ağrısı ve tek tarafın sürekli zorlanması", "Kalça ve dize dengesiz yük binmesi", "Zamanla bir bacağı kısa hissetme / hafif topallama eğilimi"],
            img: "assets/risks/kalca.jpg"
        },
        "Baş Öne Eğikliği": {
            title: "Öne Baş Postürü (Forward Head) Bulgusu",
            risks: ["Kronik boyun ve üst sırt ağrısı", "Gerilim tipi baş ağrıları", "Zamanla üst sırtta kamburlaşma (dowager hump)", "Omuz sıkışması ve kolu yukarı kaldırmada zorlanma"],
            img: "assets/risks/bas.jpg"
        },
        "Torakal Eğiklik": {
            title: "Torakal Kifoz (Sırt Kamburluğu) Artışı",
            risks: ["Sırt ağrısı ve kas gerginliği", "Nefes kapasitesinde azalma", "Omuz hareketlerinde kısıtlılık"],
            img: "assets/risks/bas.jpg"
        },
        "Diz Asimetrisi": {
            title: "Dizilim Asimetrisi",
            risks: ["Menisküs ve bağlarda asimetrik yıpranma", "Erken diz kireçlenmesi (gonartroz)", "Ayak bileği ve kalçaya yansıyan ağrılar"],
            img: "assets/risks/kalca.jpg"
        },
        "Pelvik Eğim": {
            title: "Pelvik Tilt (Gövde Salınımı)",
            risks: ["Kronik bel ağrısı", "Bel fıtığı riski artışı", "Yürüyüş biyomekaniğinin bozulması"],
            img: "assets/risks/kalca.jpg"
        }
    };



    const risksSection = document.getElementById('risksSection');
    const risksContainer = document.getElementById('risksContainer');
    
    if (risksSection && risksContainer) {
        risksContainer.innerHTML = '';
        if (findings.size > 0) {
            risksSection.classList.remove('hidden');
            findings.forEach((measureValue, f) => {
                const data = RISK_DATA[f];
                if (data) {
                    let liHtml = data.risks.map(r => `<li class="mb-2 text-slate-700">${r}</li>`).join('');
                    let cardHtml = `
                        <div class="bg-white border border-slate-200 rounded-2xl flex flex-col md:flex-row overflow-hidden shadow-sm items-stretch">
                            <div class="md:w-1/4 lg:w-1/5 bg-slate-50 border-r border-slate-100 flex flex-col items-center justify-center p-6">
                                <img src="/${data.img}" alt="${f}" class="w-full max-h-40 object-contain rounded-xl mix-blend-multiply">
                                <div class="w-full text-center text-[10px] font-bold mt-2 bg-white px-2 py-1 rounded shadow-sm border border-slate-100">
                                    <span class="text-slate-400">Şimdi</span> <i class="fa-solid fa-arrow-right text-slate-300 mx-1"></i> <span class="text-amber-600">Sonra</span>
                                </div>
                            </div>
                            <div class="md:w-3/4 lg:w-4/5 p-5 md:p-6">
                                <h4 class="text-lg font-bold text-slate-800 mb-1">${data.title}</h4>
                                <p class="text-xs font-bold text-rose-500 tracking-wider uppercase mb-4">Zamanla Oluşabilecek Olası Riskler</p>
                                <ul class="list-disc pl-5 text-sm">
                                    ${liHtml}
                                </ul>
                            </div>
                        </div>
                    `;
                    risksContainer.innerHTML += cardHtml;
                }
            });
        } else {
            risksSection.classList.add('hidden');
        }
    }

    const clinicalSection = document.getElementById('clinicalDetailsSection');
    const clinicalContainer = document.getElementById('clinicalDetailsContainer');
    
    if (clinicalSection && clinicalContainer) {
        clinicalContainer.innerHTML = '';
        if (findings.size > 0) {
            clinicalSection.classList.remove('hidden');
            findings.forEach((measureValue, f) => {
                const cData = CLINICAL_DATA[f];
                if (cData) {
                    const riskColor = cData.risk === 'Yüksek' ? 'bg-red-100 text-red-600 border-red-200' : 'bg-orange-100 text-orange-600 border-orange-200';
                    const riskDot = cData.risk === 'Yüksek' ? 'text-red-500' : 'text-orange-500';
                    
                    let biyoHtml = cData.biyomekanik.map(r => `<li class="mb-1">${r}</li>`).join('');
                    let onerilerHtml = cData.oneriler.map(r => `<li class="mb-1">${r}</li>`).join('');
                    
                    let card = `
                        <div class="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 md:p-8 avoid-break">
                            <!-- Header -->
                            <div class="flex justify-between items-start mb-4 border-b border-slate-100 pb-4">
                                <div>
                                    <h3 class="text-xl font-bold text-slate-800">${f} Sapması</h3>
                                    <p class="text-sm text-slate-500 mt-1">Postür analizinde <strong>${f.toLowerCase()}</strong> yönünde biyomekanik sapma gözlenmiştir. Bulgular, kas dengesizliği örüntüleriyle uyumlu olabilir. Bu bulgu bir hastalık tanısı değildir.</p>
                                </div>
                                <span class="${riskColor} border px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap shadow-sm flex items-center gap-2">
                                    <i class="fa-solid fa-circle text-[8px] ${riskDot}"></i> Risk: ${cData.risk}
                                </span>
                            </div>
                            
                            <!-- Measurement Box -->
                            <div class="bg-slate-50 rounded-xl p-4 border border-slate-100 mb-6 flex items-center justify-between">
                                <span class="text-xs font-bold text-slate-500 tracking-wider">TESPİT EDİLEN ÖLÇÜM</span>
                                <span class="text-lg font-black text-indigo-900">${measureValue}</span>
                            </div>

                            <!-- 2 Column Details -->
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                                <div>
                                    <h4 class="text-xs font-bold text-slate-400 tracking-wider uppercase mb-2">KLİNİK ANLAMI</h4>
                                    <p class="text-sm text-slate-700 mb-6">${cData.klinik_anlam}</p>
                                    
                                    <h4 class="text-xs font-bold text-slate-400 tracking-wider uppercase mb-2">MUHTEMEL BİYOMEKANİK ETKİLER</h4>
                                    <ul class="list-disc pl-5 text-sm text-slate-700 space-y-1">
                                        ${biyoHtml}
                                    </ul>
                                </div>
                                <div>
                                    <h4 class="text-xs font-bold text-slate-400 tracking-wider uppercase mb-2">MUHTEMEL KISA / ZAYIF KASLAR <span class="lowercase normal-case">(Janda yaklaşımı - kesin tanı değildir)</span></h4>
                                    <div class="text-sm text-slate-700 mb-6 space-y-2">
                                        <p><strong class="text-slate-800">Kısa/gergin olabilir:</strong> ${cData.kaslar.kisa}</p>
                                        <p><strong class="text-slate-800">Zayıf/inhabe olabilir:</strong> ${cData.kaslar.zayif}</p>
                                    </div>
                                    
                                    <h4 class="text-xs font-bold text-slate-400 tracking-wider uppercase mb-2">DÜZELTİCİ ÖNERİLER</h4>
                                    <ul class="list-disc pl-5 text-sm text-slate-700 space-y-1">
                                        ${onerilerHtml}
                                    </ul>
                                </div>
                            </div>
                            
                            <!-- Layman's Terms Box -->
                            <div class="bg-emerald-50 border border-emerald-200 rounded-xl p-5 flex items-start gap-4">
                                <i class="fa-regular fa-comments text-emerald-600 text-2xl mt-1"></i>
                                <div>
                                    <h4 class="text-sm font-bold text-emerald-800 mb-1">Halk diliyle ne demek?</h4>
                                    <p class="text-sm text-emerald-700">${cData.halk_dili}</p>
                                </div>
                            </div>
                            
                        </div>
                    `;
                    clinicalContainer.innerHTML += card;
                }
            });
        } else {
            clinicalSection.classList.add('hidden');
        }
    }



}


function setupDragEvents(canvasId, viewType) {
    const canvas = document.getElementById(canvasId);
    if(!canvas) return;

    const newCanvas = canvas.cloneNode(true);
    canvas.parentNode.replaceChild(newCanvas, canvas);\n    newCanvas.style.touchAction = 'none';

    newCanvas.addEventListener('pointerdown', (e) => {\n        e.preventDefault(); // prevent scroll
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
            newCanvas.style.cursor = 'crosshair';\n            newCanvas.style.touchAction = 'none';
        }
    });

    newCanvas.addEventListener('pointermove', (e) => {\n        e.preventDefault(); // prevent scroll
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

    newCanvas.addEventListener('pointerup', stopDrag);
    newCanvas.addEventListener('pointerleave', stopDrag);\n    newCanvas.addEventListener('pointercancel', stopDrag);
}

function drawCanvas(canvasId, imgId, analysisData, viewType) {
    const canvas = document.getElementById(canvasId);
    if(!canvas) return {};
    const ctx = canvas.getContext('2d');
    
    // Yükleme formundaki imaj veya önbellekteki (DB'den gelen) gizli imaj
    let img = document.getElementById(imgId);
    // If preview image doesn't have a valid src (e.g. empty or same as url), fallback to orig_img
    if(!img || !img.getAttribute('src') || img.getAttribute('src') === '') {
        img = document.getElementById('orig_img_' + viewType);
    }

    const scale = 400 / analysisData.height; 
    canvas.width = analysisData.width * scale;
    canvas.height = 400;
    
    // Dijital İskelet Teması (Siyah/Koyu Lacivert Arkaplan)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.fillStyle = "#0f172a"; 
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Fotoğrafı çok hafif (Ghost) olarak arkaya çiz
    if(img && img.src) {
        ctx.globalAlpha = 1.0;
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
    drawLine(kpts.left_shoulder, kpts.left_hip, "rgba(0,0,0,0.3)", 1);
    drawLine(kpts.right_shoulder, kpts.right_hip, "rgba(0,0,0,0.3)", 1);
    drawLine(kpts.left_hip, kpts.left_knee, "rgba(0,0,0,0.3)", 1);
    drawLine(kpts.right_hip, kpts.right_knee, "rgba(0,0,0,0.3)", 1);
    drawLine(kpts.left_knee, kpts.left_ankle, "rgba(0,0,0,0.3)", 1);
    drawLine(kpts.right_knee, kpts.right_ankle, "rgba(0,0,0,0.3)", 1);

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


async function saveClinicalNotes() {
    if(!currentAnalysisId) return;
    const btn = event.currentTarget;
    const originalText = btn.innerHTML;
    const notes = document.getElementById('clinicalNotesInput').value;
    
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Kaydediliyor...';
    btn.disabled = true;
    
    try {
        const res = await authFetch(`/api/posture/${currentAnalysisId}/notes`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ notes: notes })
        });
        
        if(res.ok) {
            showToast("Klinik notlar başarıyla kaydedildi!");
            // Güncel veriyi hafızada da güncelle ki menüden değiştirince gitmesin
            const currentAnalysis = currentPatientAnalyses.find(a => a.id === currentAnalysisId);
            if(currentAnalysis) currentAnalysis.clinical_notes = notes;
        } else {
            showToast("Notlar kaydedilirken hata oluştu.");
        }
    } catch(err) {
        showToast("Sunucu bağlantı hatası!");
    } finally {
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
}

// ═══════════════════════════════════════════════
//  KLİNİK OMURGA & SKOLYOZ ANALİZİ
// ═══════════════════════════════════════════════

function spinePreview(input, previewId, placeholderId) {
    if (!input.files || !input.files[0]) return;
    const reader = new FileReader();
    reader.onload = e => {
        const preview = document.getElementById(previewId);
        const placeholder = document.getElementById(placeholderId);
        preview.src = e.target.result;
        preview.classList.remove('hidden');
        placeholder.classList.add('hidden');
    };
    reader.readAsDataURL(input.files[0]);
}

async function runSpineAnalysis() {
    const backFile = document.getElementById('file_spine_back').files[0];
    const sideFile = document.getElementById('file_spine_side').files[0];

    if (!backFile && !sideFile) {
        alert('Lütfen en az bir fotoğraf yükleyin (Arka veya Yan profil).');
        return;
    }

    const btn = document.getElementById('btnSpineAnalyze');
    const loading = document.getElementById('spineLoadingState');
    const results = document.getElementById('spineResultsSection');

    btn.classList.add('opacity-50', 'pointer-events-none');
    loading.classList.remove('hidden');
    results.classList.add('hidden');

    const formData = new FormData();
    formData.append('patient_id', currentPatientId);
    if (backFile) formData.append('back_image', backFile);
    if (sideFile) formData.append('side_image', sideFile);

    try {
        const res = await authFetch('/api/spine/analyze', {
            method: 'POST',
            body: formData
        });
        const data = await res.json();

        if (!res.ok) {
            alert('Analiz hatası: ' + (data.detail || 'Bilinmeyen hata'));
            return;
        }

        renderSpineResults(data);

    } catch (err) {
        alert('Sunucu hatası: ' + err.message);
    } finally {
        btn.classList.remove('opacity-50', 'pointer-events-none');
        loading.classList.add('hidden');
    }
}

function statusColor(status) {
    if (!status) return 'text-slate-400';
    const s = status.toLowerCase();
    if (s === 'normal') return 'text-emerald-600';
    if (s === 'hafif') return 'text-amber-500';
    if (s.includes('artmış') || s.includes('belirgin')) return 'text-orange-600';
    if (s.includes('ciddi') || s === 'high') return 'text-red-600';
    if (s === 'low') return 'text-emerald-600';
    if (s === 'moderate') return 'text-amber-500';
    return 'text-slate-600';
}

function scoliosisLabel(risk) {
    const map = { 'low': '🟢 Düşük', 'moderate': '🟡 Orta', 'high': '🔴 Yüksek' };
    return map[risk] || risk || '—';
}

function deviationBar(mm) {
    const abs = Math.abs(mm || 0);
    const width = Math.min(abs * 3, 100);
    const color = abs < 5 ? 'bg-emerald-400' : abs < 15 ? 'bg-amber-400' : 'bg-red-500';
    return `<div class="flex items-center gap-1 justify-center">
        <div class="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div class="${color} h-full rounded-full" style="width:${width}%"></div>
        </div>
    </div>`;
}

function renderSpineResults(data) {
    const results = document.getElementById('spineResultsSection');
    const coronal = data.coronal;
    const sagittal = data.sagittal;

    // Tarih
    document.getElementById('spineAnalysisDate').textContent =
        'Oluşturuldu: ' + new Date().toLocaleString('tr-TR');

    // ── Metrik Kartlar ──
    if (sagittal) {
        const ky = sagittal.kyphosis_angle_deg;
        const lo = sagittal.lordosis_angle_deg;
        const fhp = sagittal.forward_head_mm;

        document.getElementById('metricKyphosis').textContent = ky ? ky + '°' : '—';
        document.getElementById('metricLordosis').textContent = lo ? lo + '°' : '—';
        document.getElementById('metricFHP').textContent = fhp != null ? fhp + ' mm' : '—';

        const kyEl = document.getElementById('metricKyphosisStatus');
        kyEl.textContent = sagittal.kyphosis_status || '';
        kyEl.className = 'text-xs font-bold mt-1 ' + statusColor(sagittal.kyphosis_status);

        const loEl = document.getElementById('metricLordosisStatus');
        loEl.textContent = sagittal.lordosis_status || '';
        loEl.className = 'text-xs font-bold mt-1 ' + statusColor(sagittal.lordosis_status);

        const fhpEl = document.getElementById('metricFHPStatus');
        fhpEl.textContent = sagittal.fhp_status || '';
        fhpEl.className = 'text-xs font-bold mt-1 ' + statusColor(sagittal.fhp_status);
    }

    if (coronal) {
        const scEl = document.getElementById('metricScoliosis');
        scEl.textContent = scoliosisLabel(coronal.scoliosis_risk);
        scEl.className = 'text-xl font-black ' + statusColor(coronal.scoliosis_risk);
    }

    // ── Koronal Tablo ──
    if (coronal && coronal.markers) {
        document.getElementById('coronalSection').classList.remove('hidden');
        const tbody = document.getElementById('coronalTableBody');
        const markerLabels = { 'C7': 'C7 Vertebra', 'T7': 'T7/T8 Bölgesi', 'L3': 'L3/L4 Bölgesi', 'S1': 'S1 Vertebra' };
        tbody.innerHTML = Object.entries(coronal.markers).map(([key, m]) => {
            const dev = m.dev_mm || 0;
            const dir = m.direction === 'right' ? '→ Sağa' : m.direction === 'left' ? '← Sola' : 'Merkez';
            const status = Math.abs(dev) < 5 ? '<span class="text-emerald-600 font-bold">Normal</span>'
                         : Math.abs(dev) < 15 ? '<span class="text-amber-500 font-bold">Hafif Sapma</span>'
                         : '<span class="text-red-600 font-bold">Belirgin Sapma</span>';
            return `<tr class="hover:bg-slate-50">
                <td class="py-2.5 px-2 font-bold text-slate-700">${markerLabels[key] || key}</td>
                <td class="py-2.5 px-2 text-center font-black text-slate-800">${dev} mm</td>
                <td class="py-2.5 px-2 text-center text-slate-500">${dir}</td>
                <td class="py-2.5 px-2 text-center">${status}</td>
                <td class="py-2.5 px-2 text-center">${deviationBar(dev)}</td>
            </tr>`;
        }).join('');

        document.getElementById('shoulderDiff').textContent =
            (coronal.shoulder_level_diff_mm || 0) + ' mm ' + ((coronal.shoulder_level_diff_mm || 0) > 5 ? '⚠️' : '✅');
        document.getElementById('pelvisTilt').textContent =
            (coronal.pelvis_tilt_mm || 0) + ' mm ' + ((coronal.pelvis_tilt_mm || 0) > 8 ? '⚠️' : '✅');
    }

    // ── Sagital Özet ──
    if (sagittal) {
        document.getElementById('sagittalSection').classList.remove('hidden');
        document.getElementById('sagKyphosis').textContent =
            sagittal.kyphosis_angle_deg ? sagittal.kyphosis_angle_deg + '°' : '—';
        document.getElementById('sagLordosis').textContent =
            sagittal.lordosis_angle_deg ? sagittal.lordosis_angle_deg + '°' : '—';
        document.getElementById('sagFHP').textContent =
            sagittal.forward_head_mm != null ? sagittal.forward_head_mm + ' mm' : '—';
        document.getElementById('sagittalSummaryText').textContent =
            sagittal.sagittal_summary || '';
    }

    // ── AI Raporu ──
    if (data.report) {
        const reportEl = document.getElementById('spineAiReport');
        if (typeof marked !== 'undefined') {
            reportEl.innerHTML = marked.parse(data.report);
        } else {
            reportEl.innerHTML = '<pre class="whitespace-pre-wrap text-sm">' + data.report + '</pre>';
        }
    }

    results.classList.remove('hidden');
    results.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ═══════════════════════════════════════════════
//  EGZERSİZ YÖNETİMİ
// ═══════════════════════════════════════════════

let exerciseLibrary = [];

async function loadLibrary() {
    if (exerciseLibrary.length > 0) return;
    try {
        const res = await authFetch('/api/exercises');
        exerciseLibrary = await res.json();
    } catch (e) {
        console.error("Library load error", e);
    }
}

async function loadPrescribedExercises() {
    if (!currentAnalysisId) return;
    try {
        const res = await authFetch(`/api/posture/${currentAnalysisId}/exercises`);
        if(res.ok) {
            const data = await res.json();
            renderPrescribedTable(data);
        }
    } catch (e) {
        console.error("Prescribed fetch error", e);
    }
}

function renderPrescribedTable(data) {
    const tbody = document.getElementById('exerciseTableBody');
    if (data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="p-6 text-center text-slate-400">Henüz egzersiz reçetesi oluşturulmadı.</td></tr>`;
        return;
    }
    
    tbody.innerHTML = data.map(item => `
        <tr class="border-b border-slate-100 hover:bg-slate-50 transition-colors">
            <td class="p-3 text-center">
                <img src="/${item.image_path}" class="w-16 h-16 object-contain bg-white p-1 rounded-lg border border-slate-200 shadow-sm mx-auto cursor-pointer hover:scale-150 transition-transform origin-left z-10 relative" onerror="this.src='https://via.placeholder.com/150?text=Gorsel+Yok'">
            </td>
            <td class="p-3">
                <div class="font-bold text-slate-700 text-sm">${item.name}</div>
                <div class="text-xs text-slate-400 mt-0.5"><span class="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded">${item.category}</span></div>
                <div class="text-xs text-slate-500 mt-1" title="${item.description.replace(/"/g, '&quot;')}">${item.description}</div>
            </td>
            <td class="p-3 text-center">
                <input type="text" value="${item.sets}" onchange="updatePrescribed(${item.id}, this.value, this.parentElement.nextElementSibling.querySelector('input').value)" class="w-16 p-2 border border-slate-200 rounded-lg text-center text-sm focus:outline-none focus:ring-2 focus:ring-indigo-900 bg-white">
            </td>
            <td class="p-3 text-center">
                <input type="text" value="${item.reps}" onchange="updatePrescribed(${item.id}, this.parentElement.previousElementSibling.querySelector('input').value, this.value)" class="w-20 p-2 border border-slate-200 rounded-lg text-center text-sm focus:outline-none focus:ring-2 focus:ring-indigo-900 bg-white">
            </td>
            <td class="p-3 text-center">
                ${item.video_url ? `
                <div class="flex flex-col items-center justify-center gap-1">
                    <div class="w-16 h-16 bg-white p-1 border border-slate-200 rounded-lg shrink-0">
                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(item.video_url)}" alt="QR" class="w-full h-full object-contain">
                    </div>
                    <a href="${item.video_url}" target="_blank" class="text-[10px] text-red-500 hover:text-red-600 font-medium whitespace-nowrap"><i class="fa-brands fa-youtube"></i> Video İzle</a>
                </div>` : '<span class="text-xs text-slate-400">Video Yok</span>'}
            </td>
            <td class="p-3 text-center" data-html2canvas-ignore="true">
                <button onclick="deletePrescribed(${item.id})" class="text-slate-300 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

async function updatePrescribed(assignId, sets, reps) {
    try {
        await authFetch(`/api/posture/${currentAnalysisId}/exercises/${assignId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sets: sets.toString(), reps: reps.toString() })
        });
    } catch(e) {
        console.error("Update error", e);
    }
}

async function deletePrescribed(assignId) {
    if(!confirm('Bu egzersizi silmek istediğinize emin misiniz?')) return;
    try {
        await authFetch(`/api/posture/${currentAnalysisId}/exercises/${assignId}`, {
            method: 'DELETE'
        });
        loadPrescribedExercises();
    } catch(e) {
        console.error("Delete error", e);
    }
}

async function suggestExercises() {
    if(!currentAnalysisId) {
        alert("Lütfen önce bir analiz seçin veya yeni hasta analizi yapın.");
        return;
    }
    const btn = document.getElementById('btnSuggest');
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Öneriliyor...';
    btn.classList.add('opacity-50', 'pointer-events-none');
    
    try {
        const res = await authFetch(`/api/posture/${currentAnalysisId}/exercises/suggest`, { method: 'POST' });
        if(res.ok) {
            await loadPrescribedExercises();
        } else {
            const err = await res.text(); alert('Hata oluştu: ' + res.status + ' - ' + err);
        }
    } catch(e) {
        console.error(e);
    } finally {
        btn.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i> AI ile Egzersiz Öner';
        btn.classList.remove('opacity-50', 'pointer-events-none');
    }
}

let activeCategory = null;

async function openExerciseModal() {
    if(!currentAnalysisId) {
        alert("Önce bir analiz seçmelisiniz."); return;
    }
    document.getElementById('exerciseModal').classList.remove('hidden');
    await loadLibrary();
    activeCategory = null;
    document.getElementById('exerciseSearch').value = '';
    renderCategories();
}

function closeExerciseModal() {
    document.getElementById('exerciseModal').classList.add('hidden');
    document.getElementById('exerciseSearch').value = '';
    activeCategory = null;
}

function renderCategories() {
    activeCategory = null;
    const container = document.getElementById('libraryList');
    const categories = [...new Set(exerciseLibrary.map(e => e.category).filter(Boolean))].sort();
    
    container.innerHTML = categories.map(cat => `
        <div onclick="selectCategory('${cat}')" class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between hover:border-indigo-500 hover:shadow-md cursor-pointer transition-all group">
            <div class="font-bold text-slate-700 group-hover:text-indigo-700 text-lg flex items-center gap-3">
                <div class="w-10 h-10 bg-indigo-50 text-indigo-500 rounded-lg flex items-center justify-center">
                    <i class="fa-solid fa-folder-open"></i>
                </div>
                ${cat}
            </div>
            <div class="text-slate-400 group-hover:text-indigo-600 transition-colors">
                <i class="fa-solid fa-chevron-right"></i>
            </div>
        </div>
    `).join('');
}

function selectCategory(cat) {
    activeCategory = cat;
    document.getElementById('exerciseSearch').value = '';
    const filtered = exerciseLibrary.filter(x => x.category === cat);
    renderExerciseList(filtered, true);
}

function renderExerciseList(list, showBack = false) {
    const container = document.getElementById('libraryList');
    
    let html = '';
    if (showBack) {
        html += `
        <div class="col-span-full mb-2">
            <button onclick="renderCategories()" class="text-sm font-bold text-slate-500 hover:text-indigo-600 flex items-center gap-2 transition-colors px-2 py-1 bg-white border border-slate-200 rounded-lg inline-flex shadow-sm">
                <i class="fa-solid fa-arrow-left"></i> Kategorilere Dön
            </button>
        </div>
        `;
    }

    if (list.length === 0) {
        html += '<div class="col-span-full text-center text-slate-500 py-10">Sonuç bulunamadı.</div>';
    } else {
        html += list.map(item => `
            <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4 hover:border-indigo-300 transition-colors">
                <div class="w-20 h-20 shrink-0 bg-white border border-slate-200 rounded-lg p-1 flex items-center justify-center">
                    <img src="/${item.image_path}" class="w-full h-full object-contain" onerror="this.src='https://via.placeholder.com/150?text=Gorsel+Yok'">
                </div>
                <div class="flex-1 min-w-0">
                    <h4 class="font-bold text-slate-800 text-sm truncate" title="${item.name}">${item.name}</h4>
                    <div class="text-xs text-indigo-600 font-bold mb-1">${item.category}</div>
                    <div class="text-xs text-slate-400 line-clamp-1" title="${item.description.replace(/"/g, '&quot;')}">${item.description}</div>
                </div>
                <button onclick="addPrescribed(${item.id})" class="bg-indigo-50 hover:bg-indigo-600 hover:text-white text-indigo-600 w-10 h-10 rounded-lg flex items-center justify-center transition-colors shrink-0 shadow-sm">
                    <i class="fa-solid fa-plus"></i>
                </button>
            </div>
        `).join('');
    }
    container.innerHTML = html;
}

function filterExercises() {
    const q = document.getElementById('exerciseSearch').value.toLowerCase();
    
    // Eğer arama kutusu boşaldıysa kategorilere veya seçili kategoriye dön
    if (q.length < 2) {
        if (activeCategory) {
            selectCategory(activeCategory);
        } else {
            renderCategories();
        }
        return;
    }
    
    // Arama yapılıyorsa global ara ve listele
    const filtered = exerciseLibrary.filter(x => 
        (x.name && x.name.toLowerCase().includes(q)) || 
        (x.category && x.category.toLowerCase().includes(q))
    ).slice(0, 50);
    
    renderExerciseList(filtered, false);
}

async function addPrescribed(exerciseId) {
    try {
        const res = await authFetch(`/api/posture/${currentAnalysisId}/exercises`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ exercise_id: exerciseId, sets: "3", reps: "10-12" })
        });
        if(res.ok) {
            // Animasyon veya toast gösterilebilir
            loadPrescribedExercises();
        }
    } catch(e) {
        console.error("Add error", e);
    }
}

// PDF & QR FUNCTIONS
function downloadPdf() {
    const element = document.getElementById('postureTab');
    
    // 1. Handle clinical notes textarea
    const notesEl = document.getElementById('clinicalNotesInput');
    let notesText = '';
    let oldNotesDisplay = '';
    let notesDiv = null;
    if(notesEl) {
        notesText = notesEl.value.trim();
        oldNotesDisplay = notesEl.style.display;
        notesEl.style.display = 'none'; 
        
        notesDiv = document.createElement('div');
        notesDiv.className = 'text-sm text-slate-700 whitespace-pre-wrap p-4 bg-slate-50 rounded-xl border border-slate-200 mt-2 avoid-break';
        notesDiv.innerText = notesText || 'Klinik not girilmemiş.';
        notesEl.parentNode.insertBefore(notesDiv, notesEl.nextSibling);
    }
    
    // 2. Hide buttons & Inputs
    const buttonsToHide = element.querySelectorAll('button, [data-html2canvas-ignore]');
    const bStyles = [];
    buttonsToHide.forEach(el => {
        bStyles.push({ el, display: el.style.display });
        el.style.display = 'none';
    });

    const opt = {
      margin:       [0.60, 0.3, 0.5, 0.3],
      filename:     `postur_raporu_${currentPatientId}.pdf`,
      image:        { type: 'jpeg', quality: 1.0 },
      html2canvas:  { scale: 2, useCORS: true, allowTaint: true },
      jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' },
      pagebreak:    { mode: ['css', 'legacy'], avoid: ['.avoid-break', 'tr'] }
    };

    // User Data for Header/Footer
    let pName = (typeof globalPatientInfo !== 'undefined' && globalPatientInfo) ? globalPatientInfo.name : (document.getElementById('navPatientName').innerText || 'Hasta');
    const trMap = {'ı':'i','ğ':'g','ş':'s','ç':'c','ö':'o','ü':'u','İ':'I','Ğ':'G','Ş':'S','Ç':'C','Ö':'O','Ü':'U'};
    if (pName) pName = pName.replace(/[ığşçöüİĞŞÇÖÜ]/g, m => trMap[m]);
    const patientAge = (typeof globalPatientInfo !== 'undefined' && globalPatientInfo && globalPatientInfo.age) ? globalPatientInfo.age : '-';
    const patientWeight = (typeof globalPatientInfo !== 'undefined' && globalPatientInfo && globalPatientInfo.weight) ? globalPatientInfo.weight : '-';
    const dateStr = new Date().toLocaleDateString('tr-TR');
    
    let currentUserName = "Uzman";
    let currentUserEmail = "";
    try {
        const storedUser = localStorage.getItem('cibody_user');
        if(storedUser) {
            const parsed = JSON.parse(storedUser);
            currentUserName = parsed.name || "Uzman";
            currentUserEmail = parsed.email || "";
            if(currentUserName) currentUserName = currentUserName.replace(/[ığşçöüİĞŞÇÖÜ]/g, m => trMap[m]);
        }
    } catch(e) {}

    html2pdf().set(opt).from(element).toPdf().get('pdf').then(function(pdf) {
        const totalPages = pdf.internal.getNumberOfPages();
        const pageWidth = pdf.internal.pageSize.width;
        const pageHeight = pdf.internal.pageSize.height;
        
        for (let i = 1; i <= totalPages; i++) {
            pdf.setPage(i);
            
            // --- HEADER ---
            pdf.setFillColor(30, 27, 75); // indigo-950
            pdf.rect(0, 0, pageWidth, 0.55, 'F');
            
            pdf.setTextColor(255, 255, 255);
            pdf.setFontSize(14);
            pdf.setFont('helvetica', 'bold');
            pdf.text("CIBODY AI", 0.3, 0.25);
            
            pdf.setFontSize(9);
            pdf.setFont('helvetica', 'normal');
            pdf.setTextColor(199, 210, 254); // indigo-200
            pdf.text("Klinik Biyomekanik Analiz Raporu", 0.3, 0.42);
            
            // Right Side Header (Patient)
            pdf.setTextColor(255, 255, 255);
            pdf.setFontSize(12);
            pdf.setFont('helvetica', 'bold');
            pdf.text(pName, pageWidth - 0.3, 0.25, { align: 'right' });
            
            pdf.setFontSize(9);
            pdf.setFont('helvetica', 'normal');
            pdf.setTextColor(199, 210, 254); // indigo-200
            pdf.text(`Yas: ${patientAge}  |  Kilo: ${patientWeight} kg  |  Tarih: ${dateStr}`, pageWidth - 0.3, 0.42, { align: 'right' });
            
            // --- FOOTER ---
            pdf.setFillColor(248, 250, 252); // slate-50
            pdf.rect(0, pageHeight - 0.4, pageWidth, 0.4, 'F');
            
            pdf.setDrawColor(203, 213, 225); // slate-300
            pdf.setLineWidth(0.01);
            pdf.line(0, pageHeight - 0.4, pageWidth, pageHeight - 0.4);
            
            pdf.setTextColor(100, 116, 139); // slate-500
            pdf.setFontSize(9);
            pdf.setFont('helvetica', 'bold');
            pdf.text(`Uzman: ${currentUserName}` + (currentUserEmail ? ` | Iletisim: ${currentUserEmail}` : ''), 0.3, pageHeight - 0.18);
            
            pdf.setFont('helvetica', 'normal');
            pdf.text(`Sayfa ${i} / ${totalPages}`, pageWidth - 0.3, pageHeight - 0.18, { align: 'right' });
        }
    }).save().then(() => {
        // Restore DOM
        bStyles.forEach(item => item.el.style.display = item.display);
        if(notesEl) {
            notesEl.style.display = oldNotesDisplay;
            if(notesDiv) notesDiv.remove();
        }
    });
}

function showPatientQr() {
    // Generate a public URL pointing to a new public report page
    const publicUrl = window.location.origin + '/rapor.html?id=' + currentAnalysisId;
    
    let modal = document.getElementById('qrModal');
    if(!modal) {
        modal = document.createElement('div');
        modal.id = 'qrModal';
        modal.className = 'fixed inset-0 bg-black/60 z-50 flex items-center justify-center hidden';
        modal.innerHTML = `
            <div class="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 text-center shadow-2xl relative">
                <button onclick="document.getElementById('qrModal').classList.add('hidden')" class="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
                    <i class="fa-solid fa-xmark text-xl"></i>
                </button>
                <h3 class="text-xl font-bold text-indigo-900 mb-2">Hasta Karekodu</h3>
                <p class="text-sm text-slate-500 mb-6">Hastanız bu karekodu telefonuna okutunca PDF raporu otomatik olarak indirilir.</p>
                <div class="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-4 inline-block">
                    <img id="patientQrImg" src="" alt="Hasta QR" class="w-48 h-48 object-contain mx-auto">
                </div>
                <p class="text-xs text-slate-400 flex items-center justify-center gap-1"><i class="fa-solid fa-file-pdf text-red-400"></i> PDF otomatik indirilir</p>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    const qrUrl = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" + encodeURIComponent(publicUrl);
    document.getElementById('patientQrImg').src = qrUrl;
    modal.classList.remove('hidden');
}


function downloadFootPdf() {
    const element = document.getElementById('footResultsSection');
    if(!element) return;
    
    // PDF için: tüm kart li'leri avoid-break class'ı al, PDF sonrası geri al
    const footLis = element.querySelectorAll('#footReportContent > ul > li, #footReportContent > ul > li > ul > li');
    footLis.forEach(li => li.classList.add('avoid-break'));
    
    const opt = {
      margin:       [0.75, 0.3, 0.5, 0.3],
      filename:     `ayak_raporu_${currentPatientId}.pdf`,
      image:        { type: 'jpeg', quality: 1.0 },
      html2canvas:  { scale: 2, useCORS: true, allowTaint: true },
      jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' },
      pagebreak:    { mode: ['css', 'legacy'], avoid: ['.avoid-break', 'tr'] }
    };

    let pName = (typeof globalPatientInfo !== 'undefined' && globalPatientInfo) ? globalPatientInfo.name : (document.getElementById('navPatientName').innerText || 'Hasta');
    const trMap = {'ı':'i','ğ':'g','ş':'s','ç':'c','ö':'o','ü':'u','İ':'I','Ğ':'G','Ş':'S','Ç':'C','Ö':'O','Ü':'U'};
    if (pName) pName = pName.replace(/[ığşçöüİĞŞÇÖÜ]/g, m => trMap[m]);
    const patientAge = (typeof globalPatientInfo !== 'undefined' && globalPatientInfo && globalPatientInfo.age) ? globalPatientInfo.age : '-';
    const patientWeight = (typeof globalPatientInfo !== 'undefined' && globalPatientInfo && globalPatientInfo.weight) ? globalPatientInfo.weight : '-';
    const dateStr = new Date().toLocaleDateString('tr-TR');
    
    let currentUserName = "Uzman";
    let currentUserEmail = "";
    try {
        const storedUser = localStorage.getItem('cibody_user');
        if(storedUser) {
            const parsed = JSON.parse(storedUser);
            currentUserName = parsed.name || "Uzman";
            currentUserEmail = parsed.email || "";
            if(currentUserName) currentUserName = currentUserName.replace(/[ığşçöüİĞŞÇÖÜ]/g, m => trMap[m]);
        }
    } catch(e) {}

    html2pdf().set(opt).from(element).toPdf().get('pdf').then(function(pdf) {
        const totalPages = pdf.internal.getNumberOfPages();
        const pageWidth = pdf.internal.pageSize.width;
        const pageHeight = pdf.internal.pageSize.height;
        
        for (let i = 1; i <= totalPages; i++) {
            pdf.setPage(i);
            
            // --- HEADER ---
            pdf.setFillColor(30, 27, 75); // indigo-950
            pdf.rect(0, 0, pageWidth, 0.55, 'F');
            
            pdf.setTextColor(255, 255, 255);
            pdf.setFontSize(14);
            pdf.setFont('helvetica', 'bold');
            pdf.text("CIBODY AI", 0.3, 0.25);
            
            pdf.setFontSize(9);
            pdf.setFont('helvetica', 'normal');
            pdf.text("Klinik Ayak Basinc & Biyomekanik Raporu", 0.3, 0.40);

            // Sağ üstte hasta bilgileri
            pdf.setFontSize(12);
            pdf.setFont('helvetica', 'bold');
            pdf.text(pName, pageWidth - 0.3, 0.25, { align: 'right' });
            
            pdf.setFontSize(8);
            pdf.setFont('helvetica', 'normal');
            pdf.text(`Yas: ${patientAge} | Kilo: ${patientWeight} kg | Tarih: ${dateStr}`, pageWidth - 0.3, 0.40, { align: 'right' });
            
            // --- FOOTER ---
            pdf.setDrawColor(200, 200, 200);
            pdf.setLineWidth(0.01);
            pdf.line(0.3, pageHeight - 0.3, pageWidth - 0.3, pageHeight - 0.3);
            
            pdf.setTextColor(100, 100, 100);
            pdf.setFontSize(8);
            pdf.setFont('helvetica', 'bold');
            pdf.text(`Uzman: ${currentUserName}` + (currentUserEmail ? ` | Iletisim: ${currentUserEmail}` : ''), 0.3, pageHeight - 0.18);
            
            pdf.setFont('helvetica', 'normal');
            pdf.text(`Sayfa ${i} / ${totalPages}`, pageWidth - 0.3, pageHeight - 0.18, { align: 'right' });
        }
    }).save().then(() => { footLis.forEach(li => li.classList.remove("avoid-break")); });
}

function showFootQr() {
    let latestFootId = window.currentFootAnalysisId;
    if (!latestFootId) {
         showToast("QR oluşturulacak bir ayak analizi bulunamadı.");
         return;
    }
    
    const publicUrl = window.location.origin + "/ayak_rapor.html?id=" + latestFootId;
    
    // Reuse qrModal if exists, or create new
    let modal = document.getElementById('qrModal');
    if(!modal) {
        modal = document.createElement('div');
        modal.id = 'qrModal';
        modal.className = 'fixed inset-0 bg-black/60 z-50 flex items-center justify-center hidden';
        modal.innerHTML = `
            <div class="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 text-center shadow-2xl relative">
                <button onclick="document.getElementById('qrModal').classList.add('hidden')" class="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
                    <i class="fa-solid fa-xmark text-xl"></i>
                </button>
                <h3 class="text-xl font-bold text-indigo-900 mb-2">Hasta Karekodu</h3>
                <p class="text-sm text-slate-500 mb-6">Hastanız bu karekodu telefonuna okutunca PDF raporu otomatik olarak indirilir.</p>
                <div class="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-4 inline-block">
                    <img id="patientQrImg" src="" alt="Hasta QR" class="w-48 h-48 object-contain mx-auto">
                </div>
                <p class="text-xs text-slate-400 flex items-center justify-center gap-1"><i class="fa-solid fa-file-pdf text-red-400"></i> PDF otomatik indirilir</p>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    const qrUrl = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" + encodeURIComponent(publicUrl);
    document.getElementById('patientQrImg').src = qrUrl;
    modal.classList.remove('hidden');
}


function openProfileModal() {
    const user = getUser();
    if(user) {
        document.getElementById('profileName').value = user.name || '';
        document.getElementById('profileEmail').value = user.email || '';
        document.getElementById('profilePhone').value = user.phone || '';
        document.getElementById('profileAddress').value = user.address || '';
    }
    document.getElementById('profilePassword').value = '';
    document.getElementById('profileSaveMsg').classList.add('hidden');
    document.getElementById('profileModal').classList.remove('hidden');
}

async function saveProfile(e) {
    e.preventDefault();
    const name = document.getElementById('profileName').value.trim();
    const email = document.getElementById('profileEmail').value.trim();
    const phone = document.getElementById('profilePhone').value.trim();
    const address = document.getElementById('profileAddress').value.trim();
    const password = document.getElementById('profilePassword').value;
    
    const body = { name, email, phone, address };
    if(password) body.password = password;
    
    try {
        const res = await authFetch('/api/me', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        if(!res.ok) {
            const d = await res.json();
            throw new Error(d.detail || 'Güncelleme başarısız');
        }
        const updated = await res.json();
        // Update stored user
        const user = getUser();
        if(user) {
            user.name = updated.name || name;
            user.email = updated.email || email;
            user.phone = phone;
            user.address = address;
            localStorage.setItem('cibody_user', JSON.stringify(user));
        }
        const navUserName = document.getElementById('navUserName');
        if(navUserName) navUserName.textContent = name;
        const msgEl = document.getElementById('profileSaveMsg');
        msgEl.textContent = 'Bilgileriniz başarıyla güncellendi!';
        msgEl.classList.remove('hidden');
        setTimeout(() => document.getElementById('profileModal').classList.add('hidden'), 1500);
    } catch(err) {
        showToast(err.message);
    }
}

// ═══════════════════════════════════════════════════
//  KAMERA TARAMA MOD FOTOS
// ═══════════════════════════════════════════════════

let _scannerCurrentView = null;    // 'front' | 'right' | 'back' | 'left'
let _webcamStream       = null;
let _scannerRotation    = 0;

const VIEW_LABELS = { front: 'Ön', right: 'Sağ Yan', back: 'Arka', left: 'Sol Yan' };
const ROTATION_PREF_KEY = 'cibody_cam_rotation';
const CAMERA_PREF_KEY   = 'cibody_cam_id';

async function openScanner(view) {
    _scannerCurrentView = view;
    document.getElementById('scannerModal').classList.remove('hidden');
    document.getElementById('scannerViewName').textContent = VIEW_LABELS[view] || view;

    // Restore saved rotation preference
    const savedRot = localStorage.getItem(ROTATION_PREF_KEY) || '90';
    document.getElementById('cameraRotation').value = savedRot;
    _scannerRotation = parseInt(savedRot);

    // Show reference guide for front/back
    if(typeof showRefGuide === 'function') showRefGuide(view);

    await populateCameraList();
    await startCamera();
}

async function populateCameraList() {
    const sel = document.getElementById('cameraSelect');
    sel.innerHTML = '';
    try {
        // Request permission first so labels appear
        const tmp = await navigator.mediaDevices.getUserMedia({ video: true });
        tmp.getTracks().forEach(t => t.stop());

        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(d => d.kind === 'videoinput');
        const savedId = localStorage.getItem(CAMERA_PREF_KEY);

        videoDevices.forEach((d, i) => {
            const opt = document.createElement('option');
            opt.value = d.deviceId;
            opt.text  = d.label || `Kamera ${i + 1}`;
            if (d.deviceId === savedId) opt.selected = true;
            sel.appendChild(opt);
        });
    } catch(e) {
        const opt = document.createElement('option');
        opt.text = 'Kameraya erişilemiyor';
        sel.appendChild(opt);
    }
}

async function startCamera() {
    if (_webcamStream) {
        _webcamStream.getTracks().forEach(t => t.stop());
        _webcamStream = null;
    }
    const loading = document.getElementById('scannerLoading');
    loading.classList.remove('hidden');

    const deviceId = document.getElementById('cameraSelect').value;
    const constraints = {
        video: deviceId
            ? { deviceId: { exact: deviceId }, width: { ideal: 1920 }, height: { ideal: 1080 } }
            : { facingMode: 'environment', width: { ideal: 1920 }, height: { ideal: 1080 } }
    };

    try {
        _webcamStream = await navigator.mediaDevices.getUserMedia(constraints);
        localStorage.setItem(CAMERA_PREF_KEY, document.getElementById('cameraSelect').value);
        const video = document.getElementById('webcamVideo');
        video.srcObject = _webcamStream;
        video.onloadedmetadata = () => {
            loading.classList.add('hidden');
            applyCameraRotation();
            // Kamera hazır → otomatik geri sayımı başlat
            const statusEl = document.getElementById('scanStatusText');
            if(statusEl) statusEl.classList.add('hidden');
            startScanCountdown();
        };
    } catch(e) {
        loading.innerHTML = '<i class="fa-solid fa-triangle-exclamation text-red-400 text-2xl"></i><span class="text-sm text-red-300 mt-2">Kamera açılamadı: ' + e.message + '</span>';
    }
}

function applyCameraRotation() {
    _scannerRotation = parseInt(document.getElementById('cameraRotation').value);
    localStorage.setItem(ROTATION_PREF_KEY, String(_scannerRotation));

    const video = document.getElementById('webcamVideo');
    video.className = "absolute top-1/2 left-1/2 object-contain transition-transform duration-300";

    const container = video.parentElement;

    if (_scannerRotation === 90 || _scannerRotation === 270) {
        // Tam ebatları konteynerin tersine göre ayarlayalım
        // Böylece 90 derece dönünce kutuya tam oturur, devasa zoom (150vw) yapmaz.
        video.style.width = container.clientHeight + 'px';
        video.style.height = container.clientWidth + 'px';
        video.style.transform = `translate(-50%, -50%) rotate(${_scannerRotation}deg)`;
    } else {
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.transform = `translate(-50%, -50%) rotate(${_scannerRotation}deg)`;
    }
}

// Pencere boyutu değiştiğinde rotasyonu tekrar uygula ki piksel hesapları güncellensin
window.addEventListener('resize', () => {
    if(!document.getElementById('scannerModal').classList.contains('hidden')) {
        applyCameraRotation();
    }
});


function capturePhoto() {
    const video  = document.getElementById('webcamVideo');
    const canvas = document.getElementById('webcamCanvas');

    const vw = video.videoWidth;
    const vh = video.videoHeight;

    // Apply rotation on canvas
    const rotated = (_scannerRotation === 90 || _scannerRotation === 270);
    canvas.width  = rotated ? vh : vw;
    canvas.height = rotated ? vw : vh;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((_scannerRotation * Math.PI) / 180);
    ctx.drawImage(video, -vw / 2, -vh / 2, vw, vh);
    ctx.restore();

    canvas.toBlob(blob => {
        const view  = _scannerCurrentView;
        const inputMap = { front: 'img_front', right: 'img_right', back: 'img_back', left: 'img_left' };
        const prevMap  = { front: 'preview_front', right: 'preview_right', back: 'preview_back', left: 'preview_left' };
        const phMap    = { front: 'placeholder_front', right: 'placeholder_right', back: 'placeholder_back', left: 'placeholder_left' };

        const file   = new File([blob], `${view}_scan.jpg`, { type: 'image/jpeg' });
        const input  = document.getElementById(inputMap[view]);
        const preview = document.getElementById(prevMap[view]);
        const ph      = document.getElementById(phMap[view]);

        // Assign file to input via DataTransfer
        const dt = new DataTransfer();
        dt.items.add(file);
        input.files = dt.files;

        // Show preview
        const url = URL.createObjectURL(blob);
        preview.src = url;
        preview.classList.remove('hidden');
        if(ph) ph.classList.add('hidden');

        // Store in globalPostureState
        const stateKey = view === 'front' ? 'front' : view === 'right' ? 'right' : view === 'back' ? 'back' : 'left';
        globalPostureState[stateKey] = file;

        closeScanner();
        showToast('✅ ' + VIEW_LABELS[view] + ' fotoğrafı kaydedildi!');
    }, 'image/jpeg', 0.95);
}

function closeScanner() {
    if (_webcamStream) {
        _webcamStream.getTracks().forEach(t => t.stop());
        _webcamStream = null;
    }
    document.getElementById('webcamVideo').srcObject = null;
    document.getElementById('scannerLoading').classList.remove('hidden');
    document.getElementById('scannerLoading').innerHTML = '<i class="fa-solid fa-spinner fa-spin text-3xl"></i><span class="text-sm">Kamera başlatılıyor...</span>';
    document.getElementById('scannerModal').classList.add('hidden');
    _scannerCurrentView = null;
}

// ═══════════════════════════════════════════════════
//  KAMERA TARAMA — GERİ SAYIM + SES
// ═══════════════════════════════════════════════════

function speakTR(text) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel(); // önceki varsa iptal et
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = 'tr-TR';
    utt.rate = 0.95;
    utt.pitch = 1.05;
    // Türkçe ses varsa kullan, yoksa varsayılan
    const voices = window.speechSynthesis.getVoices();
    const trVoice = voices.find(v => v.lang.startsWith('tr'));
    if (trVoice) utt.voice = trVoice;
    window.speechSynthesis.speak(utt);
}

function startScanCountdown() {
    const overlay = document.getElementById('countdownOverlay');
    const numEl   = document.getElementById('countdownNum');
    
    if (!overlay || !numEl) { capturePhoto(); return; }

    // Sesi hemen çal
    speakTR('Tarama başlandı. Lütfen hareketsiz durun.');

    overlay.classList.remove('hidden');

    let count = 5;
    numEl.textContent = count;
    numEl.style.transform = 'scale(1)';

    const interval = setInterval(() => {
        count--;
        if (count > 0) {
            numEl.textContent = count;
            numEl.style.transform = 'scale(1.3)';
            setTimeout(() => { numEl.style.transform = 'scale(1)'; }, 200);
        } else {
            clearInterval(interval);
            numEl.style.fontSize = '2rem';
            numEl.textContent = 'Tarama\nTamamlandı';
            numEl.style.whiteSpace = 'pre';
            numEl.style.lineHeight = '1.3';
            setTimeout(() => {
                overlay.classList.add('hidden');
                numEl.style.fontSize = '8rem';
                numEl.style.whiteSpace = 'normal';
                capturePhoto();
            }, 700);
        }
    }, 1000);
}

// ═══════════════════════════════════════════════════
//  REFERANS GÖRSELLER — Ön ve Arka Pozisyon SVG
// ═══════════════════════════════════════════════════

const POSTURE_REF_SVG = {
  right: `
    <svg viewBox="0 0 220 340" xmlns="http://www.w3.org/2000/svg" style="max-height:250px;width:auto">
      <text x="110" y="16" text-anchor="middle" fill="#94a3b8" font-size="11" font-family="sans-serif" font-weight="bold" letter-spacing="2">SAĞ YAN CEPHE</text>
      <circle cx="110" cy="46" r="22" fill="none" stroke="#0ea5e9" stroke-width="3"/>
      <line x1="110" y1="68" x2="110" y2="290" stroke="#0ea5e9" stroke-width="3" stroke-linecap="round"/>
      <line x1="110" y1="100" x2="170" y2="100" stroke="#38bdf8" stroke-width="3" stroke-linecap="round"/>
      <text x="110" y="318" text-anchor="middle" fill="#34d399" font-size="9.5" font-family="sans-serif" font-weight="bold">Kollar öne doğru uzatılmış</text>
      <text x="110" y="332" text-anchor="middle" fill="#94a3b8" font-size="9" font-family="sans-serif">Sağ profiliniz kameraya dönük olsun</text>
    </svg>`,
  left: `
    <svg viewBox="0 0 220 340" xmlns="http://www.w3.org/2000/svg" style="max-height:250px;width:auto">
      <text x="110" y="16" text-anchor="middle" fill="#94a3b8" font-size="11" font-family="sans-serif" font-weight="bold" letter-spacing="2">SOL YAN CEPHE</text>
      <circle cx="110" cy="46" r="22" fill="none" stroke="#a855f7" stroke-width="3"/>
      <line x1="110" y1="68" x2="110" y2="290" stroke="#a855f7" stroke-width="3" stroke-linecap="round"/>
      <line x1="110" y1="100" x2="50" y2="100" stroke="#c084fc" stroke-width="3" stroke-linecap="round"/>
      <text x="110" y="318" text-anchor="middle" fill="#34d399" font-size="9.5" font-family="sans-serif" font-weight="bold">Kollar öne doğru uzatılmış</text>
      <text x="110" y="332" text-anchor="middle" fill="#94a3b8" font-size="9" font-family="sans-serif">Sol profiliniz kameraya dönük olsun</text>
    </svg>`,
  front: `
    <svg viewBox="0 0 220 340" xmlns="http://www.w3.org/2000/svg" style="max-height:250px;width:auto">
      <text x="110" y="16" text-anchor="middle" fill="#94a3b8" font-size="11" font-family="sans-serif" font-weight="bold" letter-spacing="2">ÖN CEPHE</text>
      <circle cx="110" cy="46" r="22" fill="none" stroke="#6366f1" stroke-width="3"/>
      <line x1="110" y1="68" x2="110" y2="180" stroke="#6366f1" stroke-width="3" stroke-linecap="round"/>
      <line x1="110" y1="90" x2="50" y2="140" stroke="#6366f1" stroke-width="3" stroke-linecap="round"/>
      <line x1="110" y1="90" x2="170" y2="140" stroke="#6366f1" stroke-width="3" stroke-linecap="round"/>
      <line x1="110" y1="180" x2="70" y2="290" stroke="#6366f1" stroke-width="3" stroke-linecap="round"/>
      <line x1="110" y1="180" x2="150" y2="290" stroke="#6366f1" stroke-width="3" stroke-linecap="round"/>
      <text x="110" y="318" text-anchor="middle" fill="#34d399" font-size="9.5" font-family="sans-serif" font-weight="bold">Kollar ve bacaklar hafif açık</text>
      <text x="110" y="332" text-anchor="middle" fill="#94a3b8" font-size="9" font-family="sans-serif">Kameraya düz bakın</text>
    </svg>`,
  back: `
    <svg viewBox="0 0 220 340" xmlns="http://www.w3.org/2000/svg" style="max-height:250px;width:auto">
      <text x="110" y="16" text-anchor="middle" fill="#94a3b8" font-size="11" font-family="sans-serif" font-weight="bold" letter-spacing="2">ARKA CEPHE</text>
      <circle cx="110" cy="46" r="22" fill="none" stroke="#f59e0b" stroke-width="3"/>
      <line x1="110" y1="68" x2="110" y2="180" stroke="#f59e0b" stroke-width="3" stroke-linecap="round"/>
      <line x1="110" y1="90" x2="50" y2="140" stroke="#f59e0b" stroke-width="3" stroke-linecap="round"/>
      <line x1="110" y1="90" x2="170" y2="140" stroke="#f59e0b" stroke-width="3" stroke-linecap="round"/>
      <line x1="110" y1="180" x2="70" y2="290" stroke="#f59e0b" stroke-width="3" stroke-linecap="round"/>
      <line x1="110" y1="180" x2="150" y2="290" stroke="#f59e0b" stroke-width="3" stroke-linecap="round"/>
      <text x="110" y="318" text-anchor="middle" fill="#34d399" font-size="9.5" font-family="sans-serif" font-weight="bold">Kollar ve bacaklar hafif açık</text>
      <text x="110" y="332" text-anchor="middle" fill="#94a3b8" font-size="9" font-family="sans-serif">Kameraya sırtınızı dönün</text>
    </svg>`
};

// Override openScanner to show reference panel for front/back
const _originalOpenScanner = openScanner;
// We'll patch by modifying the startCamera flow instead — update showRefGuide call
function showRefGuide(view) {
    const panel = document.getElementById('refGuidePanel');
    const svgEl = document.getElementById('refGuideSvg');
    const label = document.getElementById('refGuideLabel');
    const camPanel = document.getElementById('cameraFeedPanel');

    if (POSTURE_REF_SVG[view]) {
        svgEl.innerHTML = POSTURE_REF_SVG[view];
        if (view === 'front') label.textContent = 'Kollar ve bacaklar hafif açık, kameraya bakın';
        else if (view === 'back') label.textContent = 'Kollar ve bacaklar hafif açık, kameraya sırtınızı dönün';
        else if (view === 'right') label.textContent = 'Kollar öne doğru uzatılmış, sağ yanınız kameraya dönük';
        else if (view === 'left') label.textContent = 'Kollar öne doğru uzatılmış, sol yanınız kameraya dönük';
        
        panel.classList.remove('hidden');
    } else {
        panel.classList.add('hidden');
    }
}

// --- INFO POPUP LOGIC ---
function showInfoPopup(type) {
    const modal = document.getElementById('infoModal');
    const title = document.getElementById('infoModalTitle');
    const content = document.getElementById('infoModalContent');
    
    if(!modal) return;

    if (type === 'quality') {
        title.textContent = 'Genel Ölçüm Kalitesi Nasıl Hesaplanır?';
        content.innerHTML = `Sistemimiz her bir referans noktasındaki (omuz, kalça, diz, boyun vb.) sapma açılarını milimetrik olarak toplar.<br><br>Bulunan toplam sapma değeri, 100 tam puan üzerinden matematiksel bir formülle düşülerek hesaplanır. Yani vücuttaki asimetri ve postural sapmalar ne kadar azsa, puan 100'e o kadar yakın olur.<br><br>Bu skor, hastanın duruşunun ideal anatomik hizalamaya ne kadar yakın olduğu hakkında genel bir fikir vermek için tasarlanmıştır.`;
    } else if (type === 'stability') {
        title.textContent = 'Postür Stabilize Endeksi Nedir?';
        content.innerHTML = `Bu endeks, vücudun genel denge ve duruş stabilizasyonunu gösterir.<br><br>Sistem tarafından tespit edilen majör bulgu (anomali) sayısı üzerinden hesaplanır. Bulunan her bir belirgin duruş bozukluğu (örneğin; başın öne eğikliği, pelvik asimetri, omuz düşüklüğü vb.) stabilite oranını belirli bir yüzdede düşürür.<br><br>Yüksek oran, vücut ağırlık merkezinin dengeli dağıldığını; düşük oran ise telafi edici (kompansatuar) kas yüklenmelerinin fazla olduğunu işaret eder.`;
    }
    
    modal.classList.remove('hidden');
}
