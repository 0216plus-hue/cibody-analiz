        let patientInfo = {};
        
        async function loadReport() {
            const urlParams = new URLSearchParams(window.location.search);
            const id = urlParams.get('id');
            if(!id) {
                document.getElementById('loadingState').innerHTML = "<p class='text-red-500 font-bold'>Geçersiz rapor bağlantısı.</p>";
                return;
            }

            try {
                const res = await fetch('/api/public/foot_report/' + id);
                if(res.ok) {
                    const data = await res.json();
                    patientInfo = data.patient;
                    
                    let aiText = data.analysis.ai_report_text;
                    const patientInfoRegex = /👤?\s*\**HASTA BİLGİLERİ\**\n([\s\S]*?)(?=1\.\s*KLİNİK ÖZET|### 1\. KLİNİK ÖZET)/i;
                    const match = aiText.match(patientInfoRegex);
                    if(match) {
                        let infoText = match[1];
                        infoText = infoText.replace(/\n+/g, ' <span class="text-indigo-300 mx-2">|</span> ').replace(/\*\*/g, '').replace(/\|\s*\|/g, '|').trim();
                        if(infoText.endsWith('|</span>')) infoText = infoText.substring(0, infoText.lastIndexOf('<span')).trim();
                        
                        const htmlReplacement = `<div class="bg-indigo-50 border border-indigo-100 text-indigo-900 px-4 py-3 rounded-xl flex flex-wrap items-center text-sm font-semibold mb-4 shadow-sm"><i class="fa-solid fa-user-injured mr-3 text-indigo-500"></i> ${infoText}</div>\n\n`;
                        aiText = aiText.replace(patientInfoRegex, htmlReplacement);
                    }
                    
                    aiText = aiText.replace(/fizyoterapist için/gi, 'Uzman İçin');
                    aiText = aiText.replace(/FİZYOTERAPİST İÇİN/g, 'UZMAN İÇİN');
                    aiText = aiText.replace(/Fizyoterapist İçin/g, 'Uzman İçin');
                    
                    document.getElementById('footReportContent').innerHTML = marked.parse(aiText);
                    
                    // Riskleri Oluştur (app.js'den kopyalandı)
                    generateFootRisks(data.analysis.ai_report_text);
                    
                    document.getElementById('loadingState').classList.add('hidden');
                    document.getElementById('footResultsSection').classList.remove('hidden');
                    document.getElementById('mobileDownloadBar').classList.remove('hidden');
                    
                    setTimeout(() => downloadPublicFootPdf(), 1500);
                } else {
                    document.getElementById('loadingState').innerHTML = "<p class='text-red-500 font-bold'>Rapor bulunamadı veya silinmiş.</p>";
                }
            } catch(e) {
                document.getElementById('loadingState').innerHTML = "<p class='text-red-500 font-bold'>Sunucu hatası oluştu.</p>";
            }
        }
        
        function generateFootRisks(aiText) {
            const CLINICAL_DATA = {
                "Pes Planus": {
                    risk: "Yüksek",
                    title: "Düz Tabanlık (Pes Planus)",
                    sonuclar: [
                        "<strong>Ayak Bileği:</strong> İçeriye çökme (pronasyon) kaynaklı iç bağlarda (deltoid) kronik gerilme ve posterior tibial tendon yetmezliği.",
                        "<strong>Diz:</strong> Valgus stresi (X bacak görünümü) nedeniyle iç yan bağlarda (MCL) gerilme ve medial menisküs hasarı riski.",
                        "<strong>Kalça ve Pelvis:</strong> İçe rotasyon artışı, anterior pelvik tilt ve buna bağlı bel çukurluğunda (lordoz) artış.",
                        "<strong>Omurga:</strong> Bel bölgesinde (L4-L5-S1) faset eklem sıkışması, bel ağrısı ve asimetrik yüklenme varsa skolyotik eğilim."
                    ]
                },
                "Pes Cavus": {
                    risk: "Yüksek",
                    title: "Yüksek Kavis (Pes Cavus)",
                    sonuclar: [
                        "<strong>Ayak:</strong> Yükün topuk ve ön ayağa aşırı binmesi sonucu topuk dikeni (plantar fasiit) ve metatarsalji (tarak kemiği ağrısı).",
                        "<strong>Ayak Bileği:</strong> Dışa basma (supinasyon) kaynaklı sık ayak bileği burkulmaları ve dış bağ (ATFL) zedelenmeleri.",
                        "<strong>Diz:</strong> Şok emiliminin azalması nedeniyle diz eklem kıkırdağına (patellofemoral) doğrudan binen stres ve ağrı.",
                        "<strong>Omurga:</strong> Yürüyüş sırasındaki sert darbelerin omurgaya doğrudan iletilmesi sonucu bel ve boyun fıtığı riskinde artış."
                    ]
                },
                "Düşmekte": {
                    risk: "Orta",
                    title: "Kavis Düşüklüğü Eğilimi (Orta Ayak Basınç Artışı)",
                    sonuclar: [
                        "<strong>Ayak İçi:</strong> Medial longitudinal arkın çökmeye başlamasıyla plantar fasyada gerilme ve sabahları topuk ağrısı (başlangıç).",
                        "<strong>Diz:</strong> Diz kapağının (patella) dışa doğru kayma eğilimi (lateral tracking) ve merdiven inip çıkarken diz ağrısı.",
                        "<strong>Kaslar:</strong> Tibialis posterior kasının ayak kavisini korumaya çalışırken aşırı yorulması (shin splints / kaval kemiği ağrısı)."
                    ]
                },
                "Topuk Ağırlıklı": {
                    risk: "Orta",
                    title: "Posterior (Topuk) Yüklenmesi",
                    sonuclar: [
                        "<strong>Ayak:</strong> Topuk yağ yastıkçığında dejenerasyon, topuk dikeni oluşumu ve kalkaneal bölgede şiddetli baskı ağrısı.",
                        "<strong>Diz:</strong> Dizlerin geriye doğru kilitlenmesi (genu recurvatum) ve arka çapraz bağlarda (PCL) gerilme stresi.",
                        "<strong>Omurga:</strong> Ağırlık merkezinin geriye kaymasını dengelemek için üst gövdenin öne eğilmesi (kifoz / kamburluk) ve boyun düzleşmesi."
                    ]
                },
                "Ön Ayak": {
                    risk: "Orta",
                    title: "Anterior (Ön Ayak) Yüklenmesi",
                    sonuclar: [
                        "<strong>Ayak:</strong> Metatars (tarak) başlarına aşırı yük binmesi, nasır oluşumu, çekiç parmak deformiteleri ve Morton nöroması.",
                        "<strong>Aşil ve Baldır:</strong> Aşil tendonunda ve gastrosoleus kas kompleksinde kronik kısalma/gerginlik ve buna bağlı kramplar.",
                        "<strong>Omurga:</strong> Ağırlık merkezinin öne kayması nedeniyle bel kaslarının vücudu dik tutmak için sürekli kasılması ve kronik bel yorgunluğu (spazm)."
                    ]
                },
                "Asimetri": {
                    risk: "Yüksek",
                    title: "Sağ / Sol Bacak Basınç Asimetrisi",
                    sonuclar: [
                        "<strong>Leğen Kemiği (Pelvis):</strong> Pelvik tilt veya rotasyon oluşumu, bacak boyu eşitsizliği illüzyonu (fonksiyonel kısa bacak).",
                        "<strong>Kalça:</strong> Çok basan taraftaki kalça ekleminde (femoroasetabuler) erken kireçlenme (osteoartrit) ve trokanterik bursit.",
                        "<strong>Omurga:</strong> Omurganın yana doğru eğilmesi (fonksiyonel skolyoz) ve disklerde tek taraflı fıtıklaşma (herni) riski.",
                        "<strong>Genel:</strong> Tüm kinetik zincirde kompansatuar asimetrik kas hipertrofisi ve yürüyüş ritminde bozulma."
                    ]
                }
            };

            const foundRisks = [];
            const upperText = aiText.toUpperCase();
            
            if(upperText.includes("PES PLANUS") || upperText.includes("DÜZ TABAN") || upperText.includes("PRONASYON")) foundRisks.push("Pes Planus");
            if(upperText.includes("PES CAVUS") || upperText.includes("YÜKSEK KAVİS") || upperText.includes("SUPİNASYON")) foundRisks.push("Pes Cavus");
            if(upperText.includes("DÜŞMEKTE") || upperText.includes("ORTA AYAK")) foundRisks.push("Düşmekte");
            if(upperText.includes("TOPUK AĞIRLIKLI") || upperText.includes("POSTERİOR")) foundRisks.push("Topuk Ağırlıklı");
            if(upperText.includes("ÖN AYAK") || upperText.includes("ANTERİOR")) foundRisks.push("Ön Ayak");
            if(upperText.includes("ASİMETR") || upperText.includes("EŞİTSİZ")) foundRisks.push("Asimetri");
            
            const uniqueRisks = [...new Set(foundRisks)];
            const container = document.getElementById('footRisksContainer');
            
            if(uniqueRisks.length === 0) {
                document.getElementById('footRisksSection').classList.add('hidden');
                return;
            }
            
            document.getElementById('footRisksSection').classList.remove('hidden');
            let html = "";
            
            uniqueRisks.forEach(riskKey => {
                const rData = CLINICAL_DATA[riskKey];
                if(!rData) return;
                
                let liHtml = "";
                rData.sonuclar.forEach(s => { liHtml += `<li>${s}</li>`; });
                
                let colorClass = rData.risk === "Yüksek" ? "bg-rose-50 text-rose-700" : "bg-amber-50 text-amber-700";
                
                html += `
                    <div class="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col md:flex-row">
                        <div class="md:w-1/4 ${colorClass} p-5 flex flex-col justify-center items-center text-center border-b md:border-b-0 md:border-r border-slate-200">
                            <i class="fa-solid fa-triangle-exclamation text-3xl mb-2 opacity-80"></i>
                            <span class="font-black uppercase tracking-wider text-sm mb-1">RİSK</span>
                            <span class="text-xs opacity-70">${rData.risk} Düzey</span>
                            <div class="mt-4 text-xs font-medium px-3 py-1 bg-white/50 rounded-full flex items-center">
                                <span class="text-slate-400">Şimdi</span> <i class="fa-solid fa-arrow-right text-slate-300 mx-1"></i> <span class="text-amber-600">Sonra</span>
                            </div>
                        </div>
                        <div class="md:w-3/4 p-5">
                            <h4 class="text-lg font-bold text-slate-800 mb-1">${rData.title}</h4>
                            <p class="text-xs font-bold text-rose-500 tracking-wider uppercase mb-3">Zamanla Oluşabilecek Olası Riskler</p>
                            <ul class="list-disc pl-5 text-sm">
                                ${liHtml}
                            </ul>
                        </div>
                    </div>
                `;
            });
            container.innerHTML = html;
        }

        function downloadPublicFootPdf() {
            const element = document.getElementById('footResultsSection');
            const pName = (patientInfo.name || 'hasta').replace(/[ığşçöüİĞŞÇÖÜ]/g, m => ({'ı':'i','ğ':'g','ş':'s','ç':'c','ö':'o','ü':'u','İ':'I','Ğ':'G','Ş':'S','Ç':'C','Ö':'O','Ü':'U'})[m]);
            const pAge = patientInfo.age || '-';
            const pWeight = patientInfo.weight || '-';
            const dateStr = new Date().toLocaleDateString('tr-TR');
            
            html2pdf().set({
                margin: [0.75, 0.3, 0.5, 0.3],
                filename: `ayak_raporu_${pName}.pdf`,
                image: { type: 'jpeg', quality: 1.0 },
                html2canvas: { scale: 2, useCORS: true, allowTaint: true, scrollY: 0 },
                jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
                pagebreak: { mode: ['css', 'legacy'] }
            }).from(element).toPdf().get('pdf').then(function(pdf) {
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
                    pdf.text(`Yas: ${pAge} | Kilo: ${pWeight} kg | Tarih: ${dateStr}`, pageWidth - 0.3, 0.40, { align: 'right' });
                    
                    // --- FOOTER ---
                    pdf.setDrawColor(200, 200, 200);
                    pdf.setLineWidth(0.01);
                    pdf.line(0.3, pageHeight - 0.3, pageWidth - 0.3, pageHeight - 0.3);
                    
                    pdf.setTextColor(100, 100, 100);
                    pdf.setFontSize(8);
                    pdf.setFont('helvetica', 'normal');
                    pdf.text(`Sayfa ${i} / ${totalPages}`, pageWidth - 0.3, pageHeight - 0.18, { align: 'right' });
                }
            }).save();
        }
