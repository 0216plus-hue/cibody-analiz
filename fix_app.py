with open("frontend/app.js", "r") as f:
    content = f.read()

old_js = """    // PDF için: tüm kart li'leri avoid-break class'ı al, PDF sonrası geri al
    const footLis = element.querySelectorAll('#footReportContent > ul > li, #footReportContent > ul > li > ul > li');
    footLis.forEach(li => li.classList.add('avoid-break'));"""

new_js = """    // PDF için: uzun text bloklarında avoid-break kullanmıyoruz (boşluk yapmaması için)
    const footLis = []; // Disabled explicitly"""

if old_js in content:
    content = content.replace(old_js, new_js)

old_js2 = """}).save().then(() => { footLis.forEach(li => li.classList.remove("avoid-break")); });"""
new_js2 = """}).save().then(() => { /* nothing */ });"""

if old_js2 in content:
    content = content.replace(old_js2, new_js2)

with open("frontend/app.js", "w") as f:
    f.write(content)
