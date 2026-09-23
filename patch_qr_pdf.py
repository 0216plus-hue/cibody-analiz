with open("frontend/rapor.html", "r") as f:
    html = f.read()

old_pdf = """                for (let i = 1; i <= totalPages; i++) {
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
                }"""

new_pdf = """                for (let i = 1; i <= totalPages; i++) {
                    pdf.setPage(i);
                    
                    // --- HEADER ---
                    pdf.setFillColor(30, 27, 75); // indigo-950
                    pdf.rect(0, 0, pageWidth, 0.55, 'F');
                    
                    pdf.setTextColor(255, 255, 255);
                    pdf.setFontSize(16);
                    pdf.setFont('helvetica', 'bold');
                    pdf.text("CIBODY AI", 0.3, 0.35);
                    
                    pdf.setFontSize(10);
                    pdf.setFont('helvetica', 'normal');
                    pdf.text("Biyomekanik Postür Analizi", 1.8, 0.35);
                    
                    // Patient Info in Header
                    pdf.setFontSize(9);
                    pdf.setFont('helvetica', 'bold');
                    let pInfo = "Hasta Bilgisi Yok";
                    if(data && data.patient) {
                        pInfo = `Yaş: ${data.patient.age || '-'} | Kilo: ${data.patient.weight || '-'} | Cinsiyet: ${data.patient.gender || '-'}`;
                    }
                    pdf.text(pInfo, pageWidth - 0.3, 0.35, { align: 'right' });
                    
                    // --- FOOTER ---
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
                }"""

html = html.replace(old_pdf, new_pdf)
with open("frontend/rapor.html", "w") as f:
    f.write(html)
