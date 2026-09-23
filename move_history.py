import re

with open("frontend/index.html", "r") as f:
    html = f.read()

# Extract the history block
history_regex = r'(\s*<!-- Geçmiş Analizler -->\s*<div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">\s*<h2 class="text-xl font-bold text-slate-800 mb-4 border-b pb-2">Geçmiş Cobb Analizleri</h2>\s*<div id="scoliosisHistoryList".*?</div>\s*</div>)'
match = re.search(history_regex, html, re.DOTALL)

if match:
    history_block = match.group(1)
    # Remove it from the left panel
    html = html.replace(history_block, "")
    
    # We want to insert it under the blue box in the right panel.
    # The blue box is:
    blue_box_regex = r'(<div class="bg-white/20 px-4 py-2 rounded-xl inline-block backdrop-blur-sm self-start">\s*<span id="scoliosisSeverity" class="font-bold text-lg">Bekleniyor\.\.\.</span>\s*</div>\s*</div>)'
    match2 = re.search(blue_box_regex, html, re.DOTALL)
    
    if match2:
        html = html.replace(match2.group(1), match2.group(1) + history_block)
        with open("frontend/index.html", "w") as f:
            f.write(html)
        print("Success")
    else:
        print("Could not find the blue box.")
else:
    print("Could not find the history block.")
