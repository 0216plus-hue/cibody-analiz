with open("frontend/app.js", "r") as f:
    content = f.read()

old_func = """function showRefGuide(view) {
    const panel = document.getElementById('refGuidePanel');
    const svgEl = document.getElementById('refGuideSvg');
    const label = document.getElementById('refGuideLabel');
    const camPanel = document.getElementById('cameraFeedPanel');

    if (POSTURE_REF_SVG[view]) {
        svgEl.innerHTML = POSTURE_REF_SVG[view];
        if (view === 'front') label.textContent = 'Kollar ve bacaklar hafif açık, kameraya bakın';
        else if (view === 'back') label.textContent = 'Kollar ve bacaklar hafif açık, kameraya sırtınızı dönün';
        else if (view === 'right') label.textContent = 'Kollar öne doğru uzatılmış, sağ yanınız kameraya dönük';
        else if (view === 'left') label.textContent = 'Kollar öne doğru uzatılmış, sol yanınız kameraya dönük';
        
        panel.classList.remove('hidden');"""

new_func = """function showRefGuide(view) {
    const panel = document.getElementById('refGuidePanel');
    const svgEl = document.getElementById('refGuideSvg');
    const label = document.getElementById('refGuideLabel');
    const camPanel = document.getElementById('cameraFeedPanel');
    const title = panel.querySelector('p');

    if (POSTURE_REF_SVG[view]) {
        svgEl.innerHTML = POSTURE_REF_SVG[view];
        if (view === 'front') { label.innerHTML = 'Kollar ve bacaklar hafif açık<br>Kameraya bakın'; title.innerHTML = '<i class="fa-solid fa-circle-check text-emerald-400"></i> ÖN CEPHE'; }
        else if (view === 'back') { label.innerHTML = 'Kollar ve bacaklar hafif açık<br>Kameraya sırtınızı dönün'; title.innerHTML = '<i class="fa-solid fa-circle-check text-emerald-400"></i> ARKA CEPHE'; }
        else if (view === 'right') { label.innerHTML = 'Kollar öne doğru uzatılmış<br>Sağ profiliniz kameraya dönük olsun'; title.innerHTML = '<i class="fa-solid fa-circle-check text-emerald-400"></i> SAĞ YAN CEPHE'; }
        else if (view === 'left') { label.innerHTML = 'Kollar öne doğru uzatılmış<br>Sol profiliniz kameraya dönük olsun'; title.innerHTML = '<i class="fa-solid fa-circle-check text-emerald-400"></i> SOL YAN CEPHE'; }
        
        panel.classList.remove('hidden');"""

content = content.replace(old_func, new_func)

with open("frontend/app.js", "w") as f:
    f.write(content)
