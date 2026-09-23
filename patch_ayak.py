with open("frontend/ayak_rapor.html", "r") as f:
    html = f.read()

# Add doctorInfo variable
html = html.replace("let patientInfo = {};", "let patientInfo = {};\n        let doctorInfo = null;")
html = html.replace("patientInfo = data.patient;", "patientInfo = data.patient;\n                    doctorInfo = data.doctor;")

# Update the footer logic
old_footer = """                    // --- FOOTER ---
                    pdf.setDrawColor(200, 200, 200);
                    pdf.setLineWidth(0.01);
                    pdf.line(0.3, pageHeight - 0.3, pageWidth - 0.3, pageHeight - 0.3);
                    
                    pdf.setTextColor(100, 100, 100);
                    pdf.setFontSize(8);
                    pdf.setFont('helvetica', 'normal');
                    pdf.text(`Sayfa ${i} / ${totalPages}`, pageWidth - 0.3, pageHeight - 0.18, { align: 'right' });"""

new_footer = """                    // --- FOOTER ---
                    pdf.setDrawColor(200, 200, 200);
                    pdf.setLineWidth(0.01);
                    pdf.line(0.3, pageHeight - 0.3, pageWidth - 0.3, pageHeight - 0.3);
                    
                    pdf.setTextColor(100, 100, 100);
                    pdf.setFontSize(8);
                    pdf.setFont('helvetica', 'normal');
                    
                    let docText = "";
                    if(doctorInfo) {
                        docText = `Uzman: ${doctorInfo.name || '-'} | Mail: ${doctorInfo.email || '-'}`;
                        if(doctorInfo.phone) docText += ` | Tel: ${doctorInfo.phone}`;
                    }
                    if(docText) {
                        pdf.text(docText, 0.3, pageHeight - 0.18);
                    }
                    
                    pdf.text(`Sayfa ${i} / ${totalPages}`, pageWidth - 0.3, pageHeight - 0.18, { align: 'right' });"""

html = html.replace(old_footer, new_footer)

with open("frontend/ayak_rapor.html", "w") as f:
    f.write(html)
