with open("frontend/ayak_rapor.html", "r") as f:
    html = f.read()

import re

# We will replace the entire generateFootRisks function
new_function = """        function generateFootRisks(aiText) {
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

            aiText = aiText.toLowerCase();
            const foundFootRisks = [];
            if (aiText.includes('pes planus') || aiText.includes('düz taban') || aiText.includes('flat foot') || aiText.includes('çökmüş ark')) foundFootRisks.push('Pes Planus');
            if (aiText.includes('pes cavus') || aiText.includes('çukur taban') || aiText.includes('yüksek ark')) foundFootRisks.push('Pes Cavus');
            if (aiText.includes('asimetri') || aiText.includes('dengesizliği') || aiText.includes('tek taraflı')) foundFootRisks.push('Yük Asimetrisi');
            if (aiText.includes('posterior') || aiText.includes('geriye') || aiText.includes('topuklara') || aiText.includes('arka ayak') || aiText.includes('topuk yük')) foundFootRisks.push('Posterior Yüklenme');
            if (aiText.includes('anterior') || aiText.includes('öne') || aiText.includes('metatars') || aiText.includes('ön ayak') || aiText.includes('parmaklara')) foundFootRisks.push('Anterior Yüklenme');

            const uniqueRisks = [...new Set(foundFootRisks)];
            const fRisksSection = document.getElementById('footRisksSection');
            const fRisksContainer = document.getElementById('footRisksContainer');
            
            if (fRisksSection && fRisksContainer) {
                fRisksContainer.innerHTML = '';
                if (uniqueRisks.length > 0) {
                    fRisksSection.classList.remove('hidden');
                    
                    uniqueRisks.forEach(f => {
                        const rData = FOOT_RISK_DATA[f];
                        if(rData) {
                            let liHtml = rData.risks.map(r => `<li class="mb-2 text-slate-700">${r}</li>`).join('');
                            let cardHtml = `
                                <div class="bg-white border border-slate-200 rounded-2xl flex flex-col md:flex-row overflow-hidden shadow-sm items-stretch">
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
        }"""

match = re.search(r'function generateFootRisks\(aiText\).*?function downloadPublicFootPdf', html, re.DOTALL)
if match:
    old_func = match.group(0).replace('function downloadPublicFootPdf', '')
    html = html.replace(old_func, new_function + "\n\n        ")
    with open("frontend/ayak_rapor.html", "w") as f:
        f.write(html)
    print("Replaced generateFootRisks")
else:
    print("Regex failed")
