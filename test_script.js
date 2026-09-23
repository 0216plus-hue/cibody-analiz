    
        const urlParams = new URLSearchParams(window.location.search);
        const reportId = urlParams.get('id');

        if(!reportId) {
            document.getElementById('content').innerHTML = '<div class="p-4 bg-red-100 text-red-700 rounded-xl">Geçersiz veya eksik rapor linki.</div>';
        } else {
            fetch('/api/public/report/' + reportId)
            .then(res => res.json())
            .then(data => {
                if(data.detail) {
                    document.getElementById('content').innerHTML = '<div class="p-4 bg-red-100 text-red-700 rounded-xl">Rapor bulunamadı.</div>';
                    return;
                }
                renderFullReport(data);
            })
            .catch(err => {
                document.getElementById('content').innerHTML = '<div class="p-4 bg-red-100 text-red-700 rounded-xl">Sunucu bağlantı hatası.</div>';
            });
        }

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

        function generateTableHtml(res, viewType) {
            let html = '';
            if(viewType === 'front' || viewType === 'back') {
                if(res.shoulderSym) html += `<div class="flex flex-col py-2 gap-1 border-b border-slate-100"><span class="whitespace-nowrap text-slate-500">Omuz Simetrisi</span> <span class="font-bold text-sm leading-tight ${Math.abs(res.shoulderSym.val)<2 ? 'text-green-600' : 'text-red-600'}">${res.shoulderSym.val}° ${Math.abs(res.shoulderSym.val)<2 ? '(Normal - '+res.shoulderSym.higher+' Yüksek)' : '(Skolyoz Riski - '+res.shoulderSym.higher+' Yüksek)'}</span></div>`;
                if(res.hipSym) html += `<div class="flex flex-col py-2 gap-1 border-b border-slate-100"><span class="whitespace-nowrap text-slate-500">Kalça Simetrisi</span> <span class="font-bold text-sm leading-tight ${Math.abs(res.hipSym.val)<2 ? 'text-green-600' : 'text-red-600'}">${res.hipSym.val}° ${Math.abs(res.hipSym.val)<2 ? '(Normal - '+res.hipSym.higher+' Yüksek)' : '(Pelvik Asimetri - '+res.hipSym.higher+' Yüksek)'}</span></div>`;
                if(res.kneeSym) html += `<div class="flex flex-col py-2 gap-1 border-b border-slate-100"><span class="whitespace-nowrap text-slate-500">Diz Simetrisi</span> <span class="font-bold text-sm leading-tight ${Math.abs(res.kneeSym.val)<2 ? 'text-green-600' : 'text-red-600'}">${res.kneeSym.val}° ${Math.abs(res.kneeSym.val)<2 ? '(Normal - '+res.kneeSym.higher+' Yüksek)' : '('+res.kneeSym.higher+' Yüksek)'}</span></div>`;
            } else {
                if(res.cervical) html += `<div class="flex flex-col py-2 gap-1 border-b border-slate-100"><span class="whitespace-nowrap text-slate-500">Servikal Açı</span> <span class="font-bold text-sm leading-tight ${res.cervical<45 ? 'text-red-600' : 'text-green-600'}">${res.cervical}° ${res.cervical<45 ? '(Boyun Düzleşmesi/FHP Riski)' : '(Normal)'}</span></div>`;
                if(res.thoracic) html += `<div class="flex flex-col py-2 gap-1 border-b border-slate-100"><span class="whitespace-nowrap text-slate-500">Torakal Açı</span> <span class="font-bold text-sm leading-tight ${res.thoracic>50 ? 'text-red-600' : 'text-green-600'}">${res.thoracic}° ${res.thoracic>50 ? '(Artmış Kifoz - Kamburluk)' : '(Normal)'}</span></div>`;
                if(res.pelvic) html += `<div class="flex flex-col py-2 gap-1 border-b border-slate-100"><span class="whitespace-nowrap text-slate-500">Pelvik Tilt</span> <span class="font-bold text-sm leading-tight ${res.pelvic>15 ? 'text-red-600' : 'text-green-600'}">${res.pelvic}° ${res.pelvic>15 ? '(Anterior Tilt Şüphesi)' : '(Normal)'}</span></div>`;
            }
            if(!html) html = '<div class="text-slate-400 italic">Yeterli referans noktası tespit edilemedi.</div>';
            return html;
        }

        function drawCanvas(canvas, tableId, imgUrl, analysisData, viewType) {
            if(!canvas || !analysisData) return {};
            const ctx = canvas.getContext('2d');
            
            return new Promise((resolve) => {
                const img = new Image();
                img.crossOrigin = "Anonymous";
                img.onload = () => {
                    const scale = 400 / analysisData.height; 
                    canvas.width = analysisData.width * scale;
                    canvas.height = 400;
                    
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    
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
                        ctx.shadowBlur = 10; ctx.shadowColor = color;
                        ctx.stroke(); ctx.shadowBlur = 0;
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
                        ctx.stroke(); ctx.shadowBlur = 0;
                    }

                    drawLine(kpts.left_shoulder, kpts.left_hip, "rgba(0,0,0,0.3)", 1);
                    drawLine(kpts.right_shoulder, kpts.right_hip, "rgba(0,0,0,0.3)", 1);
                    drawLine(kpts.left_hip, kpts.left_knee, "rgba(0,0,0,0.3)", 1);
                    drawLine(kpts.right_hip, kpts.right_knee, "rgba(0,0,0,0.3)", 1);
                    drawLine(kpts.left_knee, kpts.left_ankle, "rgba(0,0,0,0.3)", 1);
                    drawLine(kpts.right_knee, kpts.right_ankle, "rgba(0,0,0,0.3)", 1);

                    let verticalRefPoint = null;
                    if(viewType === 'front' || viewType === 'back') {
                        verticalRefPoint = getMid(kpts.left_ankle, kpts.right_ankle);
                    } else {
                        verticalRefPoint = kpts.left_ankle || kpts.right_ankle;
                    }

                    if(verticalRefPoint) {
                        ctx.beginPath(); ctx.moveTo(verticalRefPoint.x * scale, 0); ctx.lineTo(verticalRefPoint.x * scale, canvas.height);
                        ctx.strokeStyle = "#ef4444"; ctx.lineWidth = 1.5; ctx.shadowBlur = 5; ctx.shadowColor = "#ef4444"; ctx.stroke(); ctx.shadowBlur = 0;
                    }

                    if(viewType === 'front' || viewType === 'back') {
                        const midHip = getMid(kpts.left_hip, kpts.right_hip);
                        const midHead = getMid(kpts.left_ear, kpts.right_ear) || kpts.nose;

                        drawLine(kpts.left_shoulder, kpts.right_shoulder, "#3b82f6", 2.5);
                        drawLine(kpts.left_hip, kpts.right_hip, "#3b82f6", 2.5);
                        drawLine(kpts.left_elbow, kpts.right_elbow, "#3b82f6", 1.5); 
                        drawLine(kpts.left_knee, kpts.right_knee, "#3b82f6", 2.5);   
                        drawLine(kpts.left_ankle, kpts.right_ankle, "#3b82f6", 1.5); 
                        
                        results.shoulderSym = calcHorizontalAngle(kpts.left_shoulder, kpts.right_shoulder);
                        results.hipSym = calcHorizontalAngle(kpts.left_hip, kpts.right_hip);
                        results.kneeSym = calcHorizontalAngle(kpts.left_knee, kpts.right_knee);
                        if(midHip && midHead) drawExtrapolatedLine(midHip, midHead, "#06b6d4", 2);
                    } 
                    else if (viewType === 'left' || viewType === 'right') {
                        const ear = kpts.left_ear || kpts.right_ear;
                        const shoulder = kpts.left_shoulder || kpts.right_shoulder;
                        const hip = kpts.left_hip || kpts.right_hip;

                        if(shoulder && ear) { drawExtrapolatedLine(shoulder, ear, "#22c55e", 2); results.cervical = calcVerticalAngle(shoulder, ear); }
                        if(shoulder && hip) results.thoracic = calcVerticalAngle(shoulder, hip);
                        if(hip && ear) { drawExtrapolatedLine(hip, ear, "#06b6d4", 2); results.pelvic = calcVerticalAngle(hip, ear); }
                    }

                    for(let key in kpts) {
                        const point = kpts[key];
                        if(point && point.confidence > 0.3) {
                            ctx.beginPath(); ctx.arc(point.x * scale, point.y * scale, 3, 0, 2 * Math.PI);
                            ctx.fillStyle = "#fef08a"; ctx.fill();
                        }
                    }
                    
                    document.getElementById(tableId).innerHTML = generateTableHtml(results, viewType);
                    resolve(results);
                };
                img.src = "/" + imgUrl;
            });
        }

        async function renderFullReport(data) {
            let parsed = null;
        let doctorInfo = null;
            try { parsed = JSON.parse(data.analysis_data);
            doctorInfo = data.doctor; } catch(e) {}
            
            let html = `
                <div class="flex justify-between items-start mb-6">
                    <div>
                        <h3 class="text-2xl font-black text-slate-800"><i class="fa-solid fa-file-medical mr-2 text-indigo-900"></i>Biyomekanik Postür Analiz Raporu</h3>
                    </div>
                </div>

                <div class="bg-indigo-50 rounded-2xl shadow-sm p-6 mb-8 border border-indigo-100 avoid-break">
                    <h2 class="text-xl font-bold text-indigo-900 mb-4 border-b border-indigo-200 pb-2"><i class="fa-solid fa-robot mr-2"></i>Yapay Zeka Analiz Raporu</h2>
                    <div class="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">${data.ai_report_text || 'Rapor oluşturulmamış.'}</div>
                </div>

                <h3 class="text-xl font-bold text-slate-800 mb-4"><i class="fa-solid fa-ruler-combined text-indigo-600 mr-2"></i>Açısal Bozukluklar ve Simetri Analizi</h3>
                
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <!-- ÖN KART -->
                    <div class="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col sm:flex-row avoid-break">
                        <div class="w-full sm:w-5/12 digital-skeleton-bg relative flex justify-center items-center p-4 min-h-[250px]">
                            <canvas id="qr_canvas_front" class="max-w-full h-auto"></canvas>
                            <div class="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">ÖN CEPHE</div>
                        </div>
                        <div class="w-full sm:w-7/12 p-5 bg-white">
                            <h4 class="font-bold text-slate-700 border-b pb-2 mb-4">Klinik Bulgular</h4>
                            <div id="table_front" class="space-y-3 text-sm"></div>
                        </div>
                    </div>

                    <!-- ARKA KART -->
                    <div class="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col sm:flex-row avoid-break">
                        <div class="w-full sm:w-5/12 digital-skeleton-bg relative flex justify-center items-center p-4 min-h-[250px]">
                            <canvas id="qr_canvas_back" class="max-w-full h-auto"></canvas>
                            <div class="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">ARKA CEPHE</div>
                        </div>
                        <div class="w-full sm:w-7/12 p-5 bg-white">
                            <h4 class="font-bold text-slate-700 border-b pb-2 mb-4">Klinik Bulgular</h4>
                            <div id="table_back" class="space-y-3 text-sm"></div>
                        </div>
                    </div>

                    <!-- SOL KART -->
                    <div class="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col sm:flex-row avoid-break">
                        <div class="w-full sm:w-5/12 digital-skeleton-bg relative flex justify-center items-center p-4 min-h-[250px]">
                            <canvas id="qr_canvas_left" class="max-w-full h-auto"></canvas>
                            <div class="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">SOL YAN</div>
                        </div>
                        <div class="w-full sm:w-7/12 p-5 bg-white">
                            <h4 class="font-bold text-slate-700 border-b pb-2 mb-4">Klinik Bulgular</h4>
                            <div id="table_left" class="space-y-3 text-sm"></div>
                        </div>
                    </div>

                    <!-- SAĞ KART -->
                    <div class="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col sm:flex-row avoid-break">
                        <div class="w-full sm:w-5/12 digital-skeleton-bg relative flex justify-center items-center p-4 min-h-[250px]">
                            <canvas id="qr_canvas_right" class="max-w-full h-auto"></canvas>
                            <div class="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">SAĞ YAN</div>
                        </div>
                        <div class="w-full sm:w-7/12 p-5 bg-white">
                            <h4 class="font-bold text-slate-700 border-b pb-2 mb-4">Klinik Bulgular</h4>
                            <div id="table_right" class="space-y-3 text-sm"></div>
                        </div>
                    </div>
                </div>

                <div class="bg-indigo-50 rounded-2xl shadow-sm p-6 mb-8 border border-indigo-100 avoid-break">
                    <h2 class="text-xl font-bold text-indigo-900 mb-4 border-b border-indigo-200 pb-2"><i class="fa-solid fa-robot mr-2"></i>Yapay Zeka Postür Analiz Raporu</h2>
                    <div class="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap" id="aiReportText">${data.ai_report_text || 'Rapor oluşturulmamış.'}</div>
                </div>
                
                <div class="bg-white rounded-2xl shadow-sm p-6 mb-8 border border-slate-200 avoid-break">
                    <h2 class="text-lg font-bold text-slate-800 mb-4 border-b pb-2">Klinik Notlar</h2>
                    <p class="text-sm text-slate-600 whitespace-pre-wrap">${data.clinical_notes || 'Not girilmemiş.'}</p>
                </div>
                
                <div class="avoid-break page-break mt-8" id="exercisesSectionQr">
                    <h2 class="text-xl font-bold text-slate-800 mb-4"><i class="fa-solid fa-dumbbell text-indigo-600 mr-2"></i>Kişiselleştirilmiş Egzersizleriniz</h2>
                    <div class="grid grid-cols-1 gap-4">
            `;

            if(data.exercises && data.exercises.length > 0) {
                data.exercises.forEach(ex => {
                    html += `
                        <div class="bg-white rounded-2xl shadow-sm p-4 border border-slate-200 flex flex-col sm:flex-row gap-4 avoid-break">
                            <div class="w-full sm:w-1/3 flex-shrink-0 flex items-center justify-center bg-slate-50 rounded-xl p-2">
                                <img src="/${ex.image_path}" onerror="this.src='https://via.placeholder.com/150'" class="max-h-32 object-contain mix-blend-multiply">
                            </div>
                            <div class="flex-1 flex flex-col justify-between">
                                <div>
                                    <span class="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded mb-2">${ex.category}</span>
                                    <h3 class="font-bold text-lg text-slate-800 leading-tight mb-1">${ex.name}</h3>
                                    <p class="text-sm text-slate-500 mb-3">${ex.description}</p>
                                </div>
                                <div class="flex flex-wrap gap-2 items-center justify-between border-t border-slate-100 pt-3">
                                    <div class="text-sm font-semibold text-slate-700">
                                        <i class="fa-solid fa-rotate-right text-indigo-400 mr-1"></i> Set: ${ex.sets} | Tekrar: ${ex.reps}
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                });
            } else {
                html += `<div class="p-4 bg-slate-100 text-slate-500 rounded-xl text-center">Bu analiz için henüz egzersiz atanmamış.</div>`;
            }
            
            html += `</div></div>`;
            document.getElementById('content').innerHTML = html;
document.getElementById('mobileDownloadBar').classList.remove('hidden');

            if (parsed) {
                const pFront = data.front_image ? drawCanvas(document.getElementById('qr_canvas_front'), 'table_front', data.front_image, parsed.front, 'front') : Promise.resolve({});
                const pBack = data.back_image ? drawCanvas(document.getElementById('qr_canvas_back'), 'table_back', data.back_image, parsed.back, 'back') : Promise.resolve({});
                const pLeft = data.left_image ? drawCanvas(document.getElementById('qr_canvas_left'), 'table_left', data.left_image, parsed.left, 'left') : Promise.resolve({});
                const pRight = data.right_image ? drawCanvas(document.getElementById('qr_canvas_right'), 'table_right', data.right_image, parsed.right, 'right') : Promise.resolve({});
                

                Promise.all([pFront, pBack, pLeft, pRight]).then((resArray) => {
                    const [resFront, resBack, resLeft, resRight] = resArray;
                    let findings = new Map();
                    let totalDev = 0;
                    
                    [resFront, resBack].forEach(res => {
                        if(res && Object.keys(res).length > 0) {
                            if(res.shoulderSym && Math.abs(res.shoulderSym.val) > 2.0) { findings.set("Omuz Asimetrisi", res.shoulderSym.val); }
                            if(res.hipSym && Math.abs(res.hipSym.val) > 2.0) { findings.set("Pelvik Asimetri", res.hipSym.val); }
                            if(res.kneeSym && Math.abs(res.kneeSym.val) > 2.0) { findings.set("Diz Asimetrisi", res.kneeSym.val); }
                        }
                    });

                    [resLeft, resRight].forEach(res => {
                        if(res && Object.keys(res).length > 0) {
                            if(res.cervical && Math.abs(res.cervical) > 5.0) { findings.set("Baş Öne Eğikliği", res.cervical); }
                            if(res.thoracic && Math.abs(res.thoracic) > 5.0) { findings.set("Torakal Eğiklik", res.thoracic); }
                            if(res.pelvic && Math.abs(res.pelvic) > 5.0) { findings.set("Pelvik Eğim", res.pelvic); }
                        }
                    });

                    

                    let risksHtml = "";
                    if(findings.size > 0 && typeof RISK_DATA !== 'undefined') {
                        risksHtml += `<div class="avoid-break page-break mt-8 mb-8" id="qrRisksSection">
                            <h2 class="text-xl font-bold text-slate-800 mb-4"><i class="fa-solid fa-triangle-exclamation text-rose-500 mr-2"></i>Zamanla Oluşabilecek Olası Riskler</h2>
                            <div class="grid grid-cols-1 gap-4">`;
                            
                        findings.forEach((val, f) => {
                            const data = RISK_DATA[f];
                            if(data) {
                                let liHtml = data.risks.map(r => `<li class="mb-2 text-slate-700">${r}</li>`).join('');
                                risksHtml += `
                                    <div class="bg-white border border-slate-200 rounded-2xl flex flex-col md:flex-row overflow-hidden shadow-sm items-stretch avoid-break">
                                        <div class="md:w-1/4 lg:w-1/5 bg-slate-50 border-r border-slate-100 flex flex-col items-center justify-center p-6">
                                            <img src="/${data.img}" alt="${f}" class="w-full max-h-40 object-contain rounded-xl mix-blend-multiply opacity-80">
                                            <div class="w-full text-center text-[10px] font-bold mt-3 bg-white px-2 py-1.5 rounded-lg shadow-sm border border-slate-200">
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
                                    </div>`;
                            }
                        });
                        risksHtml += `</div></div>`;
                    }
                    
                    if (risksHtml) {
                        const exercisesSection = document.getElementById('exercisesSectionQr');
                        if (exercisesSection) {
                            exercisesSection.insertAdjacentHTML('beforebegin', risksHtml);
                        } else {
                            document.getElementById('content').innerHTML += risksHtml;
                        }
                    }

                    setTimeout(() => downloadPublicPosturePdf(), 1000);
                });

            } else {
                setTimeout(() => downloadPublicPosturePdf(), 1000);
            }
        }

        function downloadPublicPosturePdf() {
            const element = document.getElementById('content');
            html2pdf().set({
                margin: [0.5, 0.4, 0.5, 0.4],
                filename: 'postur-analiz-raporum.pdf',
                image: { type: 'jpeg', quality: 0.95 },
                html2canvas: { scale: 1.5, useCORS: true, scrollY: 0 },
                jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
                pagebreak: { mode: ['css', 'legacy'], avoid: ['.avoid-break', 'canvas'] }
            }).from(element).toPdf().get('pdf').then(function(pdf) {
                const totalPages = pdf.internal.getNumberOfPages();
                const pageWidth = pdf.internal.pageSize.width;
                const pageHeight = pdf.internal.pageSize.height;
                
                let docText = "";
                if(doctorInfo) {
                    docText = `Uzman: ${doctorInfo.name || '-'} | Mail: ${doctorInfo.email || '-'}`;
                    if(doctorInfo.phone) docText += ` | Tel: ${doctorInfo.phone}`;
                }
                
                for (let i = 1; i <= totalPages; i++) {
                    pdf.setPage(i);
                    pdf.setDrawColor(200, 200, 200);
                    pdf.setLineWidth(0.01);
                    pdf.line(0.3, pageHeight - 0.3, pageWidth - 0.3, pageHeight - 0.3);
                    
                    pdf.setTextColor(100, 100, 100);
                    pdf.setFontSize(8);
                    pdf.setFont('helvetica', 'normal');
                    
                    // Left footer: Doctor Info
                    if(docText) {
                        pdf.text(docText, 0.3, pageHeight - 0.18);
                    }
                    
                    // Right footer: Page numbers
                    pdf.text(`Sayfa ${i} / ${totalPages}`, pageWidth - 0.3, pageHeight - 0.18, { align: 'right' });
                }
            }).save();
        }
    
