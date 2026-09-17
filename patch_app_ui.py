import re

with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/app.js', 'r') as f:
    js = f.read()

# 1. Add let resFront, resBack...
if 'let resFront=null;' not in js:
    js = js.replace('function refreshAllCanvases() {', 'function refreshAllCanvases() {\n    let resFront=null, resBack=null, resLeft=null, resRight=null;')
    
    js = js.replace('const res = drawCanvas(\'canvas_front\'', 'const res = drawCanvas(\'canvas_front\'')
    js = js.replace("document.getElementById('table_front').innerHTML = html;", "document.getElementById('table_front').innerHTML = html;\n        resFront = res;")
    
    js = js.replace("document.getElementById('table_back').innerHTML = html;", "document.getElementById('table_back').innerHTML = html;\n        resBack = res;")
    
    js = js.replace("document.getElementById('table_left').innerHTML = html;", "document.getElementById('table_left').innerHTML = html;\n        resLeft = res;")
    
    js = js.replace("document.getElementById('table_right').innerHTML = html;", "document.getElementById('table_right').innerHTML = html;\n        resRight = res;")

score_logic = """
    // Skor ve Bulgu Hesaplamaları
    let findings = new Set();
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
}
"""

if '// Skor ve Bulgu Hesaplamaları' not in js:
    js = js.replace("document.getElementById('table_right').innerHTML = html;\n        resRight = res;\n    }\n}", "document.getElementById('table_right').innerHTML = html;\n        resRight = res;\n    }\n" + score_logic)

with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/app.js', 'w') as f:
    f.write(js)

print("app.js logic patched.")
