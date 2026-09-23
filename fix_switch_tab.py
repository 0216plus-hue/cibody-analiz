with open("frontend/app.js", "r") as f:
    js = f.read()

old_hide = """    // Hide all tabs
    document.getElementById('postureTab').classList.add('hidden');
    document.getElementById('footTab').classList.add('hidden');
    const spineTab = document.getElementById('spineTab');
    if (spineTab) spineTab.classList.add('hidden');"""

new_hide = """    // Hide all tabs
    document.getElementById('postureTab').classList.add('hidden');
    document.getElementById('footTab').classList.add('hidden');
    const spineTab = document.getElementById('spineTab');
    if (spineTab) spineTab.classList.add('hidden');
    const scoliosisTab = document.getElementById('scoliosisTab');
    if (scoliosisTab) scoliosisTab.classList.add('hidden');"""

js = js.replace(old_hide, new_hide)

old_btn = """    // Remove active class from all buttons
    document.getElementById('btn_postureTab').classList.remove('active', 'border-b-2', 'border-indigo-600', 'text-indigo-600');
    document.getElementById('btn_footTab').classList.remove('active', 'border-b-2', 'border-indigo-600', 'text-indigo-600');
    const btnSpine = document.getElementById('btn_spineTab');
    if (btnSpine) btnSpine.classList.remove('active', 'border-b-2', 'border-indigo-600', 'text-indigo-600');"""

new_btn = """    // Remove active class from all buttons
    document.getElementById('btn_postureTab').classList.remove('active', 'border-b-2', 'border-indigo-600', 'text-indigo-600');
    document.getElementById('btn_footTab').classList.remove('active', 'border-b-2', 'border-indigo-600', 'text-indigo-600');
    const btnSpine = document.getElementById('btn_spineTab');
    if (btnSpine) btnSpine.classList.remove('active', 'border-b-2', 'border-indigo-600', 'text-indigo-600');
    const btnScoliosis = document.getElementById('btn_scoliosisTab');
    if (btnScoliosis) btnScoliosis.classList.remove('active', 'border-b-2', 'border-indigo-600', 'text-indigo-600');"""

js = js.replace(old_btn, new_btn)

with open("frontend/app.js", "w") as f:
    f.write(js)
