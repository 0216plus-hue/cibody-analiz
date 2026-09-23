with open("frontend/rapor.html", "r") as f:
    html = f.read()

# Insert the AI report section
import re
new_html = re.sub(
    r'<div class="bg-white rounded-2xl shadow-sm p-6 mb-8 border border-slate-200 avoid-break">\s*<h2.*?Klinik Notlar.*?</div>',
    r'''<div class="bg-indigo-50 rounded-2xl shadow-sm p-6 mb-8 border border-indigo-100 avoid-break">
                    <h2 class="text-xl font-bold text-indigo-900 mb-4 border-b border-indigo-200 pb-2"><i class="fa-solid fa-robot mr-2"></i>Yapay Zeka Postür Analiz Raporu</h2>
                    <div class="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap" id="aiReportText">${data.ai_report_text || 'Rapor oluşturulmamış.'}</div>
                </div>
                
                <div class="bg-white rounded-2xl shadow-sm p-6 mb-8 border border-slate-200 avoid-break">
                    <h2 class="text-lg font-bold text-slate-800 mb-4 border-b pb-2">Klinik Notlar</h2>
                    <p class="text-sm text-slate-600 whitespace-pre-wrap">${data.clinical_notes || 'Not girilmemiş.'}</p>
                </div>''', html, flags=re.DOTALL
)

# Insert the doctor's info globally in HTML so the download function can use it
new_html = new_html.replace(
    "let parsed = null;",
    "let parsed = null;\n        let doctorInfo = null;"
)

new_html = new_html.replace(
    "parsed = JSON.parse(data.analysis_data);",
    "parsed = JSON.parse(data.analysis_data);\n            doctorInfo = data.doctor;"
)

# Update downloadPublicPosturePdf function
old_pdf = """        function downloadPublicPosturePdf() {
            const element = document.getElementById('content');
            html2pdf().set({
                margin: [0.5, 0.4, 0.5, 0.4],
                filename: 'postur-analiz-raporum.pdf',
                image: { type: 'jpeg', quality: 0.95 },
                html2canvas: { scale: 1.5, useCORS: true, scrollY: 0 },
                jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
                pagebreak: { mode: ['css', 'legacy'], avoid: ['.avoid-break', 'canvas'] }
            }).from(element).save();
        }"""

new_pdf = """        function downloadPublicPosturePdf() {
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
        }"""

new_html = new_html.replace(old_pdf, new_pdf)

with open("frontend/rapor.html", "w") as f:
    f.write(new_html)
