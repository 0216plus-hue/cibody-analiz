import re

with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/app.js', 'r') as f:
    js = f.read()

# 1. Replace Set with Map and update conditions
old_findings_logic = """    let findings = new Set();
    let totalDev = 0;
    
    // Front and Back
    [resFront, resBack].forEach(res => {
        if(res) {
            if(res.shoulderSym && Math.abs(res.shoulderSym.val) > 2.0) { findings.add("Omuz Asimetrisi"); totalDev += Math.abs(res.shoulderSym.val); }
            if(res.hipSym && Math.abs(res.hipSym.val) > 2.0) { findings.add("Pelvik Asimetri"); totalDev += Math.abs(res.hipSym.val); }
            if(res.kneeSym && Math.abs(res.kneeSym.val) > 2.0) { findings.add("Diz Asimetrisi"); totalDev += Math.abs(res.kneeSym.val); }
        }
    });

    // Left and Right
    [resLeft, resRight].forEach(res => {
        if(res) {
            if(res.cervical && Math.abs(res.cervical) > 5.0) { findings.add("Baş Öne Eğikliği"); totalDev += Math.abs(res.cervical); }
            if(res.thoracic && Math.abs(res.thoracic) > 5.0) { findings.add("Torakal Eğiklik"); totalDev += Math.abs(res.thoracic); }
            if(res.pelvic && Math.abs(res.pelvic) > 5.0) { findings.add("Pelvik Eğim"); totalDev += Math.abs(res.pelvic); }
        }
    });"""

new_findings_logic = """    let findings = new Map();
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
    });"""
js = js.replace(old_findings_logic, new_findings_logic)

# 2. Add CLINICAL_DATA
clinical_data_str = """
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
"""

# Insert CLINICAL_DATA before RISK_DATA
js = js.replace('const RISK_DATA = {', clinical_data_str + '\n    const RISK_DATA = {')

# 3. Update the risks loop to use Map properly (val, key) and add Clinical Details rendering
old_risks_loop = """            findings.forEach(f => {
                const data = RISK_DATA[f];"""

new_risks_loop = """            findings.forEach((measureValue, f) => {
                const data = RISK_DATA[f];"""
js = js.replace(old_risks_loop, new_risks_loop)

# 4. Render Clinical Details
render_clinical = """
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
                        <div class="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 md:p-8">
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
"""

js = js.replace('// Başlangıç', render_clinical + '\n\n// Başlangıç')

with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/app.js', 'w') as f:
    f.write(js)
print("app.js clinical logic patched.")
