with open("frontend/app.js", "r") as f:
    html = f.read()

# Update Posture PDF
old_posture_footer = """                    pdf.setTextColor(100, 100, 100);
                    pdf.setFontSize(8);
                    pdf.setFont('helvetica', 'normal');
                    pdf.text("Uzman: " + document.getElementById('navUserName').innerText + " | " + document.getElementById('navUserEmail').innerText, 0.3, pageHeight - 0.18);"""

new_posture_footer = """                    pdf.setTextColor(100, 100, 100);
                    pdf.setFontSize(8);
                    pdf.setFont('helvetica', 'normal');
                    const u = getUser();
                    let docText = "Uzman: " + document.getElementById('navUserName').innerText + " | " + document.getElementById('navUserEmail').innerText;
                    if(u && u.phone) docText += " | Tel: " + u.phone;
                    pdf.text(docText, 0.3, pageHeight - 0.18);"""
html = html.replace(old_posture_footer, new_posture_footer)

# Update Foot PDF
old_foot_footer = """                    pdf.setTextColor(100, 100, 100);
                    pdf.setFontSize(8);
                    pdf.setFont('helvetica', 'normal');
                    pdf.text("Uzman: " + document.getElementById('navUserName').innerText + " | " + document.getElementById('navUserEmail').innerText, 0.3, pageHeight - 0.18);"""

new_foot_footer = """                    pdf.setTextColor(100, 100, 100);
                    pdf.setFontSize(8);
                    pdf.setFont('helvetica', 'normal');
                    const u2 = getUser();
                    let docText2 = "Uzman: " + document.getElementById('navUserName').innerText + " | " + document.getElementById('navUserEmail').innerText;
                    if(u2 && u2.phone) docText2 += " | Tel: " + u2.phone;
                    pdf.text(docText2, 0.3, pageHeight - 0.18);"""
html = html.replace(old_foot_footer, new_foot_footer)

with open("frontend/app.js", "w") as f:
    f.write(html)
