import re

with open("frontend/index.html", "r") as f:
    html = f.read()

# Extract scoliosisTab entirely
match = re.search(r'(<!-- SKOLYOZ ANALİZİ TAB\'I -->.*?)<!-- Zoom Paneli -->', html, re.DOTALL)
if match:
    scoliosis_block = match.group(1).strip()
    
    # Remove from current location
    html = html.replace(match.group(1), '')
    
    # We want to insert it after the 4th closing div of footTab.
    # The footTab ends like this:
    foot_end_snippet = """                        <div id="footRisksContainer" class="flex flex-col gap-6">
                            <!-- Ayak Risk Kartları JS ile buraya basılacak -->
                        </div>
                    </div>
                    </div>
                </div>
            </div>"""
    
    # Ensure we replace ONLY the exact place
    target = foot_end_snippet
    replacement = foot_end_snippet + "\n\n" + scoliosis_block
    
    html = html.replace(target, replacement)
    
    # Note: we need to also remove `pt-4` and match the tab style.
    html = html.replace('<div id="scoliosisTab" class="tab-content hidden pt-4">', '<div id="scoliosisTab" class="hidden">')

with open("frontend/index.html", "w") as f:
    f.write(html)
