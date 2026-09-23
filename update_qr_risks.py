import re

with open("frontend/app.js", "r") as f:
    app_js = f.read()

# Extract RISK_DATA
risk_data_match = re.search(r'(const RISK_DATA = \{.*?img: "assets/risks/kalca\.jpg"\s*\n\s*\};\s*)\n', app_js, re.DOTALL)
risk_data = risk_data_match.group(1) if risk_data_match else ""

with open("frontend/rapor.html", "r") as f:
    rapor_html = f.read()

# Replace the Promise.all logic to render risks
old_promise = """                Promise.all([pFront, pBack, pLeft, pRight]).then(() => {
                    setTimeout(() => downloadPublicPosturePdf(), 1000);
                });"""

new_promise = f"""
                Promise.all([pFront, pBack, pLeft, pRight]).then((resArray) => {{
                    const [resFront, resBack, resLeft, resRight] = resArray;
                    let findings = new Map();
                    let totalDev = 0;
                    
                    [resFront, resBack].forEach(res => {{
                        if(res && Object.keys(res).length > 0) {{
                            if(res.shoulderSym && Math.abs(res.shoulderSym.val) > 2.0) {{ findings.set("Omuz Asimetrisi", res.shoulderSym.val); }}
                            if(res.hipSym && Math.abs(res.hipSym.val) > 2.0) {{ findings.set("Pelvik Asimetri", res.hipSym.val); }}
                            if(res.kneeSym && Math.abs(res.kneeSym.val) > 2.0) {{ findings.set("Diz Asimetrisi", res.kneeSym.val); }}
                        }}
                    }});

                    [resLeft, resRight].forEach(res => {{
                        if(res && Object.keys(res).length > 0) {{
                            if(res.cervical && Math.abs(res.cervical) > 5.0) {{ findings.set("Baş Öne Eğikliği", res.cervical); }}
                            if(res.thoracic && Math.abs(res.thoracic) > 5.0) {{ findings.set("Torakal Eğiklik", res.thoracic); }}
                            if(res.pelvic && Math.abs(res.pelvic) > 5.0) {{ findings.set("Pelvik Eğim", res.pelvic); }}
                        }}
                    }});

                    {risk_data}

                    let risksHtml = "";
                    if(findings.size > 0 && typeof RISK_DATA !== 'undefined') {{
                        risksHtml += `<div class="avoid-break page-break mt-8 mb-8" id="qrRisksSection">
                            <h2 class="text-xl font-bold text-slate-800 mb-4"><i class="fa-solid fa-triangle-exclamation text-rose-500 mr-2"></i>Zamanla Oluşabilecek Olası Riskler</h2>
                            <div class="grid grid-cols-1 gap-4">`;
                            
                        findings.forEach((val, f) => {{
                            const data = RISK_DATA[f];
                            if(data) {{
                                let liHtml = data.risks.map(r => `<li class="mb-2 text-slate-700">${{r}}</li>`).join('');
                                risksHtml += `
                                    <div class="bg-white border border-slate-200 rounded-2xl flex flex-col md:flex-row overflow-hidden shadow-sm items-stretch avoid-break">
                                        <div class="md:w-1/4 lg:w-1/5 bg-slate-50 border-r border-slate-100 flex flex-col items-center justify-center p-6">
                                            <img src="/${{data.img}}" alt="${{f}}" class="w-full max-h-40 object-contain rounded-xl mix-blend-multiply opacity-80">
                                            <div class="w-full text-center text-[10px] font-bold mt-3 bg-white px-2 py-1.5 rounded-lg shadow-sm border border-slate-200">
                                                <span class="text-slate-400">Şimdi</span> <i class="fa-solid fa-arrow-right text-slate-300 mx-1"></i> <span class="text-amber-600">Sonra</span>
                                            </div>
                                        </div>
                                        <div class="md:w-3/4 lg:w-4/5 p-5 md:p-6">
                                            <h4 class="text-lg font-bold text-slate-800 mb-1">${{data.title}}</h4>
                                            <p class="text-xs font-bold text-rose-500 tracking-wider uppercase mb-4">Zamanla Oluşabilecek Olası Riskler</p>
                                            <ul class="list-disc pl-5 text-sm">
                                                ${{liHtml}}
                                            </ul>
                                        </div>
                                    </div>`;
                            }}
                        }});
                        risksHtml += `</div></div>`;
                    }}
                    
                    if (risksHtml) {{
                        const exercisesSection = document.getElementById('exercisesSectionQr');
                        if (exercisesSection) {{
                            exercisesSection.insertAdjacentHTML('beforebegin', risksHtml);
                        }} else {{
                            document.getElementById('content').innerHTML += risksHtml;
                        }}
                    }}

                    setTimeout(() => downloadPublicPosturePdf(), 1000);
                }});
"""

# I need to add id="exercisesSectionQr" to the exercises div so I can insert risks right before it.
rapor_html = rapor_html.replace(
    '<div class="avoid-break page-break mt-8">',
    '<div class="avoid-break page-break mt-8" id="exercisesSectionQr">'
)

rapor_html = rapor_html.replace(old_promise, new_promise)

with open("frontend/rapor.html", "w") as f:
    f.write(rapor_html)

print("Risks added to rapor.html")
