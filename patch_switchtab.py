with open("frontend/app.js", "r") as f:
    js = f.read()

import re

old_switch = re.search(r'function switchTab\(tabId\) \{.*?document.getElementById\(tabId\)\.classList\.remove\(\'hidden\'\);\n.*?\}', js, re.DOTALL)

if old_switch:
    old_switch = old_switch.group(0)
    
    new_switch = """function switchTab(tabId) {
    // Hide all tabs
    document.getElementById('postureTab').classList.add('hidden');
    document.getElementById('footTab').classList.add('hidden');
    const spineTab = document.getElementById('spineTab');
    if (spineTab) spineTab.classList.add('hidden');
    const scoliosisTab = document.getElementById('scoliosisTab');
    if (scoliosisTab) scoliosisTab.classList.add('hidden');
    const scoliometerTab = document.getElementById('scoliometerTab');
    if (scoliometerTab) scoliometerTab.classList.add('hidden');
    
    // Remove active class from all buttons
    document.getElementById('btn_postureTab').classList.remove('active', 'border-b-2', 'border-indigo-600', 'text-indigo-600');
    document.getElementById('btn_footTab').classList.remove('active', 'border-b-2', 'border-indigo-600', 'text-indigo-600');
    const btnSpine = document.getElementById('btn_spineTab');
    if (btnSpine) btnSpine.classList.remove('active', 'border-b-2', 'border-indigo-600', 'text-indigo-600');
    const btnScoliosis = document.getElementById('btn_scoliosisTab');
    if (btnScoliosis) btnScoliosis.classList.remove('active', 'border-b-2', 'border-indigo-600', 'text-indigo-600');
    const btnScoliometer = document.getElementById('btn_scoliometerTab');
    if (btnScoliometer) btnScoliometer.classList.remove('active', 'border-b-2', 'border-indigo-600', 'text-indigo-600');
    
    // Show selected tab and set button active
    document.getElementById(tabId).classList.remove('hidden');
    document.getElementById('btn_' + tabId).classList.add('active', 'border-b-2', 'border-indigo-600', 'text-indigo-600');
}"""
    
    js = js.replace(old_switch, new_switch)
    with open("frontend/app.js", "w") as f:
        f.write(js)
    print("Patched switchTab")
else:
    print("Could not find switchTab")
