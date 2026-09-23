with open("frontend/scoliosis.js", "r") as f:
    js = f.read()

render_func = """
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
        egzersiz = marker + "\\n" + (parts[1] ? parts[1].trim() : "");
    }
    
    aiReportDiv.innerHTML = typeof marked !== 'undefined' && klinik ? marked.parse(klinik) : (klinik || "Henüz klinik rapor üretilmedi.");
    exerciseReportDiv.innerHTML = typeof marked !== 'undefined' && egzersiz ? marked.parse(egzersiz) : (egzersiz || "Henüz egzersiz programı üretilmedi.");
}
"""

if "function renderAiReports" not in js:
    js += "\n" + render_func

# Replace in loadScoliosisHistory
old_history_render = "document.getElementById('scoliosisAiReport').innerHTML = typeof marked !== 'undefined' && item.ai_report_text ? marked.parse(item.ai_report_text) : (item.ai_report_text || 'Henüz rapor üretilmedi.');"
new_history_render = "renderAiReports(item.ai_report_text);"
js = js.replace(old_history_render, new_history_render)

old_history_render2 = "document.getElementById('scoliosisAiReport').innerText = item.ai_report_text || 'Henüz rapor üretilmedi.';"
js = js.replace(old_history_render2, new_history_render)

# Replace in generateScoliosisAi
import re
js = re.sub(
    r'reportArea\.innerHTML = typeof marked !== \'undefined\' \? marked\.parse\(data\.report\) : data\.report;',
    r'renderAiReports(data.report);',
    js
)
js = re.sub(
    r'reportArea\.innerText = data\.report;',
    r'renderAiReports(data.report);',
    js
)

# Replace in generateScoliosisExerciseAi
# wait, generateScoliosisExerciseAi also uses reportArea.
js = js.replace("const reportArea = document.getElementById('scoliosisAiReport');", "const reportArea = document.getElementById('scoliosisExerciseReport');")

with open("frontend/scoliosis.js", "w") as f:
    f.write(js)
