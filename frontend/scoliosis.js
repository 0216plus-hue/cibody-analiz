// Scoliosis Module Logic

let scoliosisFile = null;
let scoliosisPoints = [];
window.currentScoliosisId = null;
let currentCobbAngle = 0;
let currentCurveType = "";

function previewScoliosis(event) {
    if (!currentPatientId) {
        alert("Lütfen önce bir hasta seçin veya yeni hasta ekleyin.");
        return;
    }
    const file = event.target.files[0];
    if (!file) return;
    
    scoliosisFile = file;
    scoliosisPoints = [];
    window.currentScoliosisId = null;
    currentCobbAngle = 0;
    currentCurveType = "";
    
    document.getElementById('scoliosisPlaceholder').classList.add('hidden');
    const preview = document.getElementById('scoliosisPreview');
    const canvas = document.getElementById('scoliosisCanvas');
    
    const url = URL.createObjectURL(file);
    preview.src = url;
    preview.classList.remove('hidden');
    
    preview.onload = () => {
        canvas.width = preview.clientWidth;
        canvas.height = preview.clientHeight;
        canvas.classList.remove('hidden');
        document.getElementById('btnResetScoliosis').classList.remove('hidden');
        document.getElementById('btnSaveScoliosis').classList.remove('hidden');
        
        drawScoliosisCanvas();
    }
}

const _scCanvas = document.getElementById('scoliosisCanvas');
if (_scCanvas) {
    _scCanvas.addEventListener('click', function(e) {
        if (scoliosisPoints.length >= 4) return; // Zaten 4 nokta seçildi
        
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        scoliosisPoints.push({x, y});
        drawScoliosisCanvas();
        
        if (scoliosisPoints.length === 4) {
            calculateCobbAngle();
        }
    });
}

function drawScoliosisCanvas() {
    const canvas = document.getElementById('scoliosisCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#f43f5e'; // rose-500
    ctx.strokeStyle = '#f43f5e';
    ctx.lineWidth = 2;
    
    // Draw points
    scoliosisPoints.forEach((p, i) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = "white";
        ctx.font = "10px Arial";
        ctx.fillText(i+1, p.x + 6, p.y - 6);
        ctx.fillStyle = '#f43f5e';
    });
    
    // Draw first line (Upper vertebra)
    if (scoliosisPoints.length >= 2) {
        drawLineWithExtrapolation(ctx, scoliosisPoints[0], scoliosisPoints[1], canvas.width, canvas.height, '#3b82f6'); // blue
    }
    
    // Draw second line (Lower vertebra)
    if (scoliosisPoints.length >= 4) {
        drawLineWithExtrapolation(ctx, scoliosisPoints[2], scoliosisPoints[3], canvas.width, canvas.height, '#10b981'); // emerald
    }
}

function drawLineWithExtrapolation(ctx, p1, p2, w, h, color) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]); // kesik çizgi
    
    // Extrapolate line across canvas
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    
    // Y=mx+b
    if (dx === 0) {
        ctx.moveTo(p1.x, 0);
        ctx.lineTo(p1.x, h);
    } else {
        const m = dy / dx;
        const b = p1.y - m * p1.x;
        ctx.moveTo(0, b);
        ctx.lineTo(w, m * w + b);
    }
    ctx.stroke();
    ctx.setLineDash([]); // reset
    
    // Draw solid line between the two points
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
}

function calculateCobbAngle() {
    // p1, p2 (Line 1) and p3, p4 (Line 2)
    const p1 = scoliosisPoints[0];
    const p2 = scoliosisPoints[1];
    const p3 = scoliosisPoints[2];
    const p4 = scoliosisPoints[3];
    
    let dx1 = p2.x - p1.x;
    let dy1 = p2.y - p1.y;
    let m1 = dx1 === 0 ? 1000000 : dy1 / dx1; // avoid Infinity
    
    let dx2 = p4.x - p3.x;
    let dy2 = p4.y - p3.y;
    let m2 = dx2 === 0 ? 1000000 : dy2 / dx2;
    
    let angleRad = Math.atan(Math.abs((m2 - m1) / (1 + m1 * m2)));
    let angleDeg = angleRad * (180 / Math.PI);
    
    // If lines are drawn horizontally, the Cobb angle is usually the acute angle of intersection of perpendiculars.
    // The angle between two lines is equal to the angle between their perpendiculars.
    
    currentCobbAngle = parseFloat(angleDeg.toFixed(1));
    document.getElementById('scoliosisCobbAngle').innerText = currentCobbAngle;
    
    let severity = "Normal";
    if (currentCobbAngle > 10 && currentCobbAngle <= 25) severity = "Hafif Skolyoz";
    else if (currentCobbAngle > 25 && currentCobbAngle <= 40) severity = "Orta Şiddetli Skolyoz";
    else if (currentCobbAngle > 40) severity = "İleri Derece Skolyoz (Cerrahi Risk)";
    
    currentCurveType = "S veya C Eğrisi";
    document.getElementById('scoliosisSeverity').innerText = severity;
    
    if(window.currentScoliosisId) {
        saveScoliosisData(); // Auto save if already uploaded
    }
}

function resetScoliosisCanvas() {
    scoliosisPoints = [];
    currentCobbAngle = 0;
    document.getElementById('scoliosisCobbAngle').innerText = "0";
    document.getElementById('scoliosisSeverity').innerText = "Bekleniyor...";
    drawScoliosisCanvas();
}

async function uploadScoliosisImage() {
    if (!scoliosisFile) return;
    
    const btn = document.getElementById('btnSaveScoliosis');
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i> Yükleniyor...';
    btn.disabled = true;
    
    const formData = new FormData();
    formData.append('patient_id', currentPatientId);
    formData.append('image', await compressImage(scoliosisFile));
    
    try {
        const token = localStorage.getItem('cibody_token');
        const res = await fetch('/api/scoliosis', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` },
            body: formData
        });
        
        if (res.ok) {
            const data = await res.json();
            window.currentScoliosisId = data.analysis_id;
            
            // Yükleme başarılı, şimdi noktalar ve derece hesaplanmışsa kaydet
            if (scoliosisPoints.length === 4) {
                await saveScoliosisData();
            }
            
            showToast("Röntgen başarıyla yüklendi ve analiz başlatıldı.");
            loadScoliosisHistory();
        } else {
            alert("Yükleme hatası.");
        }
    } catch(e) {
        console.error(e);
        alert("Bağlantı hatası.");
    } finally {
        btn.innerHTML = '<i class="fa-solid fa-cloud-arrow-up mr-2"></i>Kaydet & Analize Başla';
        btn.disabled = false;
    }
}

async function saveScoliosisData() {
    if (!window.currentScoliosisId) return;
    
    try {
        await authFetch(`/api/scoliosis/${window.currentScoliosisId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                cobb_angle: currentCobbAngle,
                curve_type: currentCurveType,
                points_data: JSON.stringify(scoliosisPoints)
            })
        });
        loadScoliosisHistory();
    } catch(e) {
        console.error("Save scoliosis data error", e);
    }
}

async function saveScoliosisNotes() {
    if (!window.currentScoliosisId) { alert("Lütfen önce bir röntgen yükleyip analiz yapın."); return; }
    const notes = document.getElementById('scoliosisNotes').value;
    try {
        await authFetch(`/api/scoliosis/${window.currentScoliosisId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ clinical_notes: notes })
        });
        showToast("Notlar kaydedildi.");
        loadScoliosisHistory();
    } catch(e) { console.error(e); }
}

async function generateScoliosisAi() {
    if (!window.currentScoliosisId) { alert("Önce resmi kaydedin."); return; }
    if (currentCobbAngle === 0) { alert("Lütfen önce resme 4 nokta koyarak Cobb açısını hesaplayın."); return; }
    
    const btn = document.getElementById('btnGenerateScoliosisAi');
    const reportArea = document.getElementById('scoliosisAiReport');
    
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-1"></i> Üretiliyor...';
    btn.disabled = true;
    reportArea.innerHTML = '<div class="text-center py-4"><i class="fa-solid fa-circle-notch fa-spin text-indigo-500 text-2xl mb-2"></i><p>Yapay zeka analiz raporu yazıyor...</p></div>';
    
    try {
        const res = await authFetch(`/api/scoliosis/${window.currentScoliosisId}/generate-report`, { method: 'POST' });
        if (res.ok) {
            const data = await res.json();
            renderAiReports(data.report);
            showToast("AI Raporu başarıyla oluşturuldu.");
            loadScoliosisHistory();
        } else {
            reportArea.innerText = "Yapay zeka servisi yanıt vermedi.";
        }
    } catch(e) {
        reportArea.innerText = "Bağlantı hatası.";
    } finally {
        btn.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles mr-1"></i>AI Rapor';
        btn.disabled = false;
    }
}

async function loadScoliosisHistory() {
    if(!currentPatientId) return;
    try {
        const res = await authFetch(`/api/scoliosis/patient/${currentPatientId}`);
        if(res.ok) {
            const data = await res.json();
            const list = document.getElementById('scoliosisHistoryList');
            if(data.length === 0) {
                list.innerHTML = '<div class="text-center text-slate-400 py-4 w-full">Kayıt bulunamadı.</div>';
                return;
            }
            
            // To show oldest to newest (Before -> After), we can reverse the array
            // since backend returns desc (newest first). Let's keep it desc or asc?
            // "ilk tarihten itibaren yan yana listelensin" -> Ascending!
            data.reverse();

            let html = '';
            data.forEach((item, index) => {
                const dateStr = new Date(item.created_at + 'Z').toLocaleString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
                const imgUrl = item.image_path ? `/${item.image_path}` : 'https://via.placeholder.com/150?text=Gorsel+Yok';
                let badge = index === 0 ? '<span class="absolute top-1 left-1 bg-indigo-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow">İLK (BEFORE)</span>' : 
                            (index === data.length - 1 && data.length > 1 ? '<span class="absolute top-1 left-1 bg-emerald-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow">SON (AFTER)</span>' : '');
                html += `
                    <div class="flex-shrink-0 w-36 relative bg-white border border-slate-200 rounded-xl overflow-hidden hover:ring-2 ring-indigo-500 cursor-pointer snap-start transition-all group" onclick="loadScoliosisAnalysis(${item.id})">
                        ${badge}
                        <img src="${imgUrl}" class="w-full h-36 object-cover object-top" onerror="this.src='https://via.placeholder.com/150?text=Gorsel+Yok'"/>
                        <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-2 pt-6">
                            <p class="font-black text-white text-sm leading-tight flex items-center justify-between">
                                <span>${item.cobb_angle || '0'}°</span>
                                <span class="text-[10px] text-white/70 font-normal">${dateStr}</span>
                            </p>
                        </div>
                        <button onclick="event.stopPropagation(); deleteScoliosis(${item.id})" class="absolute top-1 right-1 bg-black/50 text-white rounded-full w-6 h-6 flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 hover:bg-rose-600 transition-all backdrop-blur-sm"><i class="fa-solid fa-trash"></i></button>
                    </div>
                `;
            });
            list.innerHTML = html;
        }
    } catch(e) { console.error(e); }
}

async function loadScoliosisAnalysis(id) {
    try {
        const res = await authFetch(`/api/public/scoliosis_report/${id}`);
        if(res.ok) {
            const data = await res.json();
            window.currentScoliosisId = id;
            currentCobbAngle = data.cobb_angle || 0;
            currentCurveType = data.curve_type || "";
            
            document.getElementById('scoliosisPlaceholder').classList.add('hidden');
            const preview = document.getElementById('scoliosisPreview');
            const canvas = document.getElementById('scoliosisCanvas');
            
            preview.src = "/" + data.image_path;
            preview.classList.remove('hidden');
            
            document.getElementById('btnResetScoliosis').classList.remove('hidden');
            
            
            preview.onload = () => {
                canvas.width = preview.clientWidth;
                canvas.height = preview.clientHeight;
                canvas.classList.remove('hidden');
                
                try {
                    scoliosisPoints = JSON.parse(data.points_data || "[]");
                } catch(e) { scoliosisPoints = []; }
                
                drawScoliosisCanvas();
            };
            
            document.getElementById('scoliosisCobbAngle').innerText = currentCobbAngle;
            let severity = "Normal";
            if (currentCobbAngle > 10 && currentCobbAngle <= 25) severity = "Hafif Skolyoz";
            else if (currentCobbAngle > 25 && currentCobbAngle <= 40) severity = "Orta Şiddetli Skolyoz";
            else if (currentCobbAngle > 40) severity = "İleri Derece Skolyoz (Cerrahi Risk)";
            document.getElementById('scoliosisSeverity').innerText = currentCobbAngle === 0 ? "Bekleniyor..." : severity;
            
            document.getElementById('scoliosisNotes').value = data.clinical_notes || "";
            document.getElementById('scoliosisAiReport').innerText = data.ai_report_text || "AI Raporu henüz oluşturulmamış.";
        }
    } catch(e) { console.error(e); }
}

async function deleteScoliosis(id) {
    if(!confirm('Analizi silmek istediğinize emin misiniz?')) return;
    try {
        await authFetch(`/api/scoliosis/${id}`, { method: 'DELETE' });
        loadScoliosisHistory();
        if(window.currentScoliosisId === id) {
            // reset form
            document.getElementById('scoliosisPreview').classList.add('hidden');
            document.getElementById('scoliosisCanvas').classList.add('hidden');
            document.getElementById('scoliosisPlaceholder').classList.remove('hidden');
            scoliosisPoints = [];
            window.currentScoliosisId = null;
        }
    } catch(e) { console.error(e); }
}

function showScoliosisQr() {
    if(!window.currentScoliosisId) { alert("Lütfen geçerli bir analiz seçin."); return; }
    const publicUrl = window.location.origin + '/skolyoz_rapor.html?id=' + currentScoliosisId;
    
    let modal = document.getElementById('qrModal');
    if(!modal) {
        modal = document.createElement('div');
        modal.id = 'qrModal';
        modal.className = 'fixed inset-0 bg-black/60 z-50 flex items-center justify-center hidden';
        document.body.appendChild(modal);
    }
    
    modal.innerHTML = `
        <div class="bg-white rounded-2xl p-6 shadow-xl w-full max-w-sm mx-4 transform transition-all scale-100 opacity-100">
            <div class="flex justify-between items-center mb-4 border-b border-slate-100 pb-3">
                <h3 class="font-bold text-slate-800"><i class="fa-solid fa-qrcode text-indigo-600 mr-2"></i>Skolyoz Raporu Paylaş</h3>
                <button onclick="document.getElementById('qrModal').classList.add('hidden')" class="text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-full w-8 h-8 flex items-center justify-center transition-colors">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
            
            <div class="flex justify-center mb-4 bg-white p-2 rounded-xl border border-slate-200 shadow-sm" id="qrcode_scoliosis"></div>
            
            <p class="text-xs text-center text-slate-500 mb-4">Hastanız telefonunun kamerasıyla bu karekodu okutarak tüm raporu (resim, açı, yapay zeka yorumu) ve tavsiyeleri indirebilir.</p>
            
            <div class="flex gap-2">
                <button onclick="copyToClipboard('${publicUrl}')" class="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl text-sm transition-colors">
                    <i class="fa-solid fa-link mr-1"></i> Link Kopyala
                </button>
                <button onclick="window.open('${publicUrl}', '_blank')" class="flex-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold py-2.5 rounded-xl text-sm transition-colors border border-indigo-200">
                    <i class="fa-solid fa-eye mr-1"></i> Raporu Aç
                </button>
            </div>
        </div>
    `;
    
    modal.classList.remove('hidden');
    
    // Generate QR
    setTimeout(() => {
        document.getElementById('qrcode_scoliosis').innerHTML = "";
        new QRCode(document.getElementById('qrcode_scoliosis'), {
            text: publicUrl,
            width: 200,
            height: 200,
            colorDark : "#1e1b4b",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });
    }, 100);
}

function downloadScoliosisPdf() {
    const preview = document.getElementById('scoliosisPreview');
    const canvas = document.getElementById('scoliosisCanvas');
    const hasImage = preview && preview.src && !preview.classList.contains('hidden');

    if (!window.currentScoliosisId && !hasImage) {
        if (typeof showToast === 'function') {
            showToast("Lütfen bir skolyoz analizi seçin veya röntgen yükleyin.");
        } else {
            alert("Lütfen bir skolyoz analizi seçin veya röntgen yükleyin.");
        }
        return;
    }

    // Build composite X-ray image with Cobb lines
    let compositeImgData = null;
    if (hasImage) {
        try {
            const compCanvas = document.createElement('canvas');
            const naturalW = preview.naturalWidth || canvas.width || 800;
            const naturalH = preview.naturalHeight || canvas.height || 1000;
            compCanvas.width = naturalW;
            compCanvas.height = naturalH;
            const ctx = compCanvas.getContext('2d');
            
            ctx.drawImage(preview, 0, 0, naturalW, naturalH);
            if (canvas && !canvas.classList.contains('hidden') && canvas.width > 0 && canvas.height > 0) {
                ctx.drawImage(canvas, 0, 0, naturalW, naturalH);
            }
            compositeImgData = compCanvas.toDataURL('image/jpeg', 0.95);
        } catch(e) {
            console.warn("Composite canvas error, fallback to preview:", e);
            compositeImgData = preview.src;
        }
    }

    const cobb = document.getElementById('scoliosisCobbAngle')?.innerText || '0';
    const severity = document.getElementById('scoliosisSeverity')?.innerText || 'Bekleniyor...';
    const notes = document.getElementById('scoliosisNotes')?.value.trim() || 'Klinik not girilmemiş.';
    
    const aiReportEl = document.getElementById('scoliosisAiReport');
    const exerciseReportEl = document.getElementById('scoliosisExerciseReport');
    let aiText = '';
    if (aiReportEl && aiReportEl.innerText && !aiReportEl.innerText.includes('Analiz yapıldığında')) {
        aiText += aiReportEl.innerText + '\n\n';
    }
    if (exerciseReportEl && exerciseReportEl.innerText && !exerciseReportEl.innerText.includes('Hastaya özel egzersizler')) {
        aiText += exerciseReportEl.innerText;
    }

    const printContainer = document.createElement('div');
    printContainer.className = 'p-6 bg-white rounded-2xl text-slate-800 font-sans';
    printContainer.style.maxWidth = '800px';

    printContainer.innerHTML = `
        <div class="mb-6 border-b border-slate-200 pb-4">
            <h2 class="text-xl font-black text-indigo-950 flex items-center gap-2">
                <i class="fa-solid fa-x-ray text-indigo-600"></i> Skolyoz Cobb Açısı Analiz Raporu
            </h2>
            <p class="text-xs text-slate-500 mt-1">Spinal Eğrilik & Radyolojik Cobb Açısı Ölçüm Değerlendirmesi</p>
        </div>

        <!-- Cobb Değerlendirme Kartı & Röntgen Görseli -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6 avoid-break">
            <!-- Röntgen ve Çizimler -->
            <div class="bg-black/95 rounded-2xl p-3 flex flex-col items-center justify-center border border-slate-800 text-center min-h-[360px]">
                <span class="text-xs font-bold text-slate-300 mb-2 block uppercase tracking-wider"><i class="fa-solid fa-x-ray mr-1"></i> İşaretli Röntgen (X-Ray)</span>
                ${compositeImgData ? `<img src="${compositeImgData}" class="max-h-80 object-contain rounded-xl mx-auto shadow-md">` : '<div class="text-slate-400 text-sm py-12">Röntgen görüntüsü yüklenemedi</div>'}
                <span class="text-[10px] text-slate-400 mt-2 block">4 Noktalı Dijital Cobb Açı Çizimi</span>
            </div>

            <!-- Cobb Metrikleri & Klinik Sınıflandırma -->
            <div class="flex flex-col justify-between space-y-4">
                <div class="bg-gradient-to-br from-indigo-900 to-indigo-700 text-white rounded-2xl p-6 text-center shadow-sm">
                    <span class="text-xs font-bold text-indigo-200 uppercase tracking-wider block mb-1">Hesaplanan Cobb Açısı</span>
                    <span class="text-5xl font-black block my-2">${cobb}°</span>
                    <span class="inline-block bg-white/20 text-white font-bold text-sm px-4 py-1.5 rounded-full backdrop-blur-sm mt-1">${severity}</span>
                </div>

                <!-- Klinik Standartlar -->
                <div class="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs">
                    <span class="font-bold text-slate-700 block mb-2 uppercase tracking-wider"><i class="fa-solid fa-ruler mr-1 text-indigo-500"></i> Cobb Skolyoz Derecelendirme Skalası:</span>
                    <ul class="space-y-1.5 text-slate-600">
                        <li><b class="text-emerald-700">0° - 10°:</b> Normal / Spinal Asimetri (Skolyoz kabul edilmez)</li>
                        <li><b class="text-indigo-700">10° - 25°:</b> Hafif Skolyoz (Fizyoterapi & Schroth egzersizleri)</li>
                        <li><b class="text-amber-700">25° - 40°:</b> Orta Şiddetli Skolyoz (Korse & yoğun egzersiz)</li>
                        <li><b class="text-rose-700">≥ 40°+:</b> İleri Skolyoz (Ortopedik & cerrahi konsültasyon)</li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Uzman Klinik Notları -->
        <div class="bg-white border border-slate-200 rounded-2xl p-4 mb-6 avoid-break">
            <h4 class="text-xs font-black text-slate-700 uppercase mb-2 flex items-center gap-1.5">
                <i class="fa-solid fa-clipboard-user text-indigo-600"></i> Uzman Klinik Notları ve Tedavi Planı
            </h4>
            <p class="text-xs text-slate-600 whitespace-pre-wrap bg-slate-50 p-3 rounded-xl border border-slate-100">${notes}</p>
        </div>

        <!-- AI Klinik & Egzersiz Değerlendirmesi (Varsa) -->
        ${aiText.trim() ? `
        <div class="bg-white border border-slate-200 rounded-2xl p-5 mb-6 avoid-break">
            <h4 class="text-xs font-black text-slate-700 uppercase mb-3 flex items-center gap-1.5">
                <i class="fa-solid fa-person-running text-emerald-600"></i> CIBODY AI Skolyoz Klinik Değerlendirmesi & Egzersiz Önerileri
            </h4>
            <div class="text-xs text-slate-700 leading-relaxed space-y-2">
                ${typeof marked !== 'undefined' ? marked.parse(aiText) : '<pre class="whitespace-pre-wrap">' + aiText + '</pre>'}
            </div>
        </div>
        ` : ''}

        <!-- İmza Alanı -->
        <div class="border border-slate-200 rounded-2xl p-4 bg-slate-50/50 avoid-break flex justify-between items-end">
            <div class="text-xs text-slate-500">
                <p class="font-bold text-slate-700 mb-1">Radyolojik Cobb Ölçüm Raporu</p>
                <p>Standart Cobb açısı hesaplama algoritmasına göre dijital ortamda üretilmiştir.</p>
            </div>
            <div class="text-right text-xs text-slate-400">
                <p class="font-bold text-slate-700">Uzman Kaşe / İmza</p>
                <div class="w-32 h-10 border-b border-dashed border-slate-300"></div>
            </div>
        </div>
    `;

    document.body.appendChild(printContainer);

    const currentPid = (typeof currentPatientId !== 'undefined' && currentPatientId) ? currentPatientId : 'hasta';
    const opt = {
      margin:       [0.65, 0.3, 0.5, 0.3],
      filename:     `skolyoz_cobb_raporu_${currentPid}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true, allowTaint: true, scrollY: 0 },
      jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' },
      pagebreak:    { mode: ['css', 'legacy'], avoid: ['.avoid-break', 'tr'] }
    };

    html2pdf().set(opt).from(printContainer).toPdf().get('pdf').then(function(pdf) {
        if (typeof applyCibodyPdfHeaderFooter === 'function') {
            applyCibodyPdfHeaderFooter(pdf, "Skolyoz Cobb Açısı Analiz Raporu");
        }
    }).save().then(() => {
        printContainer.remove();
        if (typeof showToast === 'function') showToast("Skolyoz Cobb PDF raporu indirildi.");
    }).catch(err => {
        console.error("Scoliosis PDF error:", err);
        printContainer.remove();
        if (typeof showToast === 'function') showToast("PDF oluşturulurken hata oluştu.");
    });
}


async function generateScoliosisExerciseAi() {
    if (!window.currentScoliosisId) { alert("Önce resmi kaydedin."); return; }
    if (currentCobbAngle === 0) { alert("Lütfen önce resme 4 nokta koyarak Cobb açısını hesaplayın."); return; }
    
    const btn = document.getElementById('btnGenerateScoliosisExerciseAi');
    const reportArea = document.getElementById('scoliosisExerciseReport');
    
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-1"></i> Üretiliyor...';
    btn.disabled = true;
    reportArea.innerHTML = '<div class="text-center py-4"><i class="fa-solid fa-person-running fa-bounce text-emerald-500 text-3xl mb-2"></i><p class="font-medium text-emerald-700">Yapay Zeka bu dereceye uygun egzersizleri planlıyor...</p></div>';
    
    try {
        const res = await authFetch(`/api/scoliosis/${window.currentScoliosisId}/generate-exercises`, { method: 'POST' });
        if (res.ok) {
            const data = await res.json();
            renderAiReports(data.report);
            showToast("AI Egzersiz Programı başarıyla eklendi.");
            loadScoliosisHistory();
        } else {
            reportArea.innerText = "Yapay zeka servisi yanıt vermedi.";
        }
    } catch(e) {
        reportArea.innerText = "Bağlantı hatası.";
    } finally {
        btn.innerHTML = '<i class="fa-solid fa-person-running mr-1"></i>AI Egzersiz Öner';
        btn.disabled = false;
    }
}


function renderAiReports(fullText) {
    const aiReportDiv = document.getElementById('scoliosisAiReport');
    const exerciseReportDiv = document.getElementById('scoliosisExerciseReport');
    
    if (!fullText) {
        aiReportDiv.innerHTML = "Analiz yapıldığında klinik rapor burada görüntülenecektir.";
        exerciseReportDiv.innerHTML = "Hastaya özel egzersizler üretmek için yukarıdaki butona tıklayın.";
        return;
    }
    
    const marker = "### 🏃‍♂️ Önerilen Egzersiz Programı";
    let klinik = fullText;
    let egzersiz = "";
    
    if (fullText.includes(marker)) {
        const parts = fullText.split(marker);
        klinik = parts[0].trim();
        egzersiz = marker + "\n" + (parts[1] ? parts[1].trim() : "");
    }
    
    aiReportDiv.innerHTML = typeof marked !== 'undefined' && klinik ? marked.parse(klinik) : (klinik || "Henüz klinik rapor üretilmedi.");
    exerciseReportDiv.innerHTML = typeof marked !== 'undefined' && egzersiz ? marked.parse(egzersiz) : (egzersiz || "Henüz egzersiz programı üretilmedi.");
}


async function loadScoliosisAssignedExercises() {
    if(!window.currentScoliosisId) return;
    const tbody = document.getElementById('scoliosisAssignedExercisesList');
    tbody.innerHTML = '<tr><td colspan="5" class="text-center py-4"><i class="fa-solid fa-spinner fa-spin text-indigo-500"></i></td></tr>';
    
    try {
        const res = await authFetch(`/api/scoliosis/${window.currentScoliosisId}/exercises`);
        const data = await res.json();
        
        if(!data.exercises || data.exercises.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" class="text-center py-8 text-slate-400">Henüz egzersiz atanmamış.</td></tr>';
            return;
        }
        
        let html = '';
        data.exercises.forEach(ex => {
            html += `
            <tr class="hover:bg-slate-50 transition-colors">
                <td class="px-4 py-3">
                    <div class="w-12 h-12 bg-white rounded-lg border border-slate-200 overflow-hidden flex items-center justify-center shadow-sm">
                        <img src="/${ex.image_path}" onerror="this.src='https://via.placeholder.com/150?text=Gorsel+Yok'" class="w-full h-full object-cover">
                    </div>
                </td>
                <td class="px-4 py-3">
                    <div class="font-bold text-slate-800 text-sm">${ex.name}</div>
                    <div class="text-xs text-slate-500">${ex.category}</div>
                </td>
                <td class="px-4 py-3">
                    <input type="text" value="${ex.sets}" onchange="updateScoliosisExercise(${ex.id}, this, 'sets')" class="w-16 p-1 text-sm border-slate-200 rounded focus:ring-indigo-500 focus:border-indigo-500 text-center bg-white shadow-inner">
                </td>
                <td class="px-4 py-3">
                    <input type="text" value="${ex.reps}" onchange="updateScoliosisExercise(${ex.id}, this, 'reps')" class="w-20 p-1 text-sm border-slate-200 rounded focus:ring-indigo-500 focus:border-indigo-500 text-center bg-white shadow-inner">
                </td>
                <td class="px-4 py-3 text-center">
                    <button onclick="deleteScoliosisExercise(${ex.id})" class="text-red-400 hover:text-red-600 bg-red-50 hover:bg-red-100 p-2 rounded-lg transition-colors">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </td>
            </tr>`;
        });
        tbody.innerHTML = html;
        
    } catch(e) {
        console.error(e);
        tbody.innerHTML = '<tr><td colspan="5" class="text-center py-4 text-red-500">Yüklenemedi</td></tr>';
    }
}

async function updateScoliosisExercise(assignId, inputEl, field) {
    const val = inputEl.value;
    // We fetch current to send both sets and reps
    const tr = inputEl.closest('tr');
    const sets = field === 'sets' ? val : tr.querySelector('input[onchange*="\'sets\'"]').value;
    const reps = field === 'reps' ? val : tr.querySelector('input[onchange*="\'reps\'"]').value;
    
    try {
        await authFetch(`/api/scoliosis/${window.currentScoliosisId}/exercises/${assignId}`, {
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({ sets: sets, reps: reps })
        });
        showToast("Güncellendi.");
    } catch(e) {
        console.error(e);
    }
}

async function deleteScoliosisExercise(assignId) {
    if(!confirm("Silmek istediğinize emin misiniz?")) return;
    try {
        await authFetch(`/api/scoliosis/${window.currentScoliosisId}/exercises/${assignId}`, { method: 'DELETE' });
        loadScoliosisAssignedExercises();
    } catch(e) {
        console.error(e);
    }
}

async function suggestScoliosisExercises() {
    if(!window.currentScoliosisId) { alert("Önce resmi kaydedin."); return; }
    if(currentCobbAngle === 0) { alert("Açıyı hesaplayın."); return; }
    
    const btn = document.getElementById('btnSuggestScoliosisExercises');
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i>Öneriliyor...';
    btn.disabled = true;
    
    try {
        const res = await authFetch(`/api/scoliosis/${window.currentScoliosisId}/exercises/suggest`, { method: 'POST' });
        if(res.ok) {
            showToast("Yapay zeka egzersizleri başarıyla atandı!");
            loadScoliosisAssignedExercises();
        } else {
            alert("Hata oluştu.");
        }
    } catch(e) {
        console.error(e);
    } finally {
        btn.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles mr-2"></i>AI Egzersiz Öner';
        btn.disabled = false;
    }
}
