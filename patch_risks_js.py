import re

with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/app.js', 'r') as f:
    js = f.read()

risk_logic = """
    // Riskler Bölümü
    const RISK_DATA = {
        "Omuz Asimetrisi": {
            title: "Omuz Simetri Sapması",
            risks: ["Tek tarafta omuz ve boyun ağrısı", "Kürek kemiği çevresinde çabuk yorulma", "Zamanla omuz sıkışma sorunları"]
        },
        "Pelvik Asimetri": {
            title: "Pelvik Simetri Sapması",
            risks: ["Bel ağrısı ve tek tarafın sürekli zorlanması", "Kalça ve dize dengesiz yük binmesi", "Zamanla bir bacağı kısa hissetme / hafif topallama eğilimi"]
        },
        "Baş Öne Eğikliği": {
            title: "Öne Baş Postürü (Forward Head) Bulgusu",
            risks: ["Kronik boyun ve üst sırt ağrısı", "Gerilim tipi baş ağrıları", "Zamanla üst sırtta kamburlaşma (dowager hump)", "Omuz sıkışması ve kolu yukarı kaldırmada zorlanma"]
        },
        "Torakal Eğiklik": {
            title: "Torakal Kifoz (Sırt Kamburluğu) Artışı",
            risks: ["Sırt ağrısı ve kas gerginliği", "Nefes kapasitesinde azalma", "Omuz hareketlerinde kısıtlılık"]
        },
        "Diz Asimetrisi": {
            title: "Dizilim Asimetrisi",
            risks: ["Menisküs ve bağlarda asimetrik yıpranma", "Erken diz kireçlenmesi (gonartroz)", "Ayak bileği ve kalçaya yansıyan ağrılar"]
        },
        "Pelvik Eğim": {
            title: "Pelvik Tilt (Gövde Salınımı)",
            risks: ["Kronik bel ağrısı", "Bel fıtığı riski artışı", "Yürüyüş biyomekaniğinin bozulması"]
        }
    };

    const risksSection = document.getElementById('risksSection');
    const risksContainer = document.getElementById('risksContainer');
    
    if (risksSection && risksContainer) {
        risksContainer.innerHTML = '';
        if (findings.size > 0) {
            risksSection.classList.remove('hidden');
            findings.forEach(f => {
                const data = RISK_DATA[f];
                if (data) {
                    let liHtml = data.risks.map(r => `<li class="mb-2 text-slate-700">${r}</li>`).join('');
                    let cardHtml = `
                        <div class="bg-slate-50 border border-slate-200 rounded-2xl flex flex-col md:flex-row overflow-hidden shadow-sm">
                            <div class="md:w-1/3 bg-slate-100 border-r border-slate-200 flex flex-col items-center justify-center p-6 min-h-[200px]">
                                <!-- Placeholder for Graphic -->
                                <i class="fa-solid fa-image text-slate-300 text-4xl mb-2"></i>
                                <span class="text-xs text-slate-400 font-medium">Grafik Buraya Gelecek</span>
                                <span class="text-[10px] text-slate-400">(${f})</span>
                            </div>
                            <div class="md:w-2/3 p-6 md:p-8">
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
"""

if '// Riskler Bölümü' not in js:
    # Insert right before the last brace of refreshAllCanvases
    # It currently ends with:
    #     if(elScore) elScore.innerText = generalScore;
    #     if(elFind) elFind.innerText = findings.size;
    #     if(elStab) elStab.innerText = "%" + stability;
    # }
    js = js.replace(
        'if(elStab) elStab.innerText = "%" + stability;\n}',
        'if(elStab) elStab.innerText = "%" + stability;\n\n' + risk_logic + '\n}'
    )
    with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/app.js', 'w') as f:
        f.write(js)
    print("JS patched for risks.")
else:
    print("JS already patched.")
