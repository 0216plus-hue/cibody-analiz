with open("frontend/index.html", "r") as f:
    html = f.read()

import re

# Find scoliometerTab block
# It starts at <!-- SKOLYOMETRE TAB -->
# It ends right before <!-- ALT BÖLÜM: Tam Sayfa -->

start_marker = "                <!-- SKOLYOMETRE TAB -->"
end_marker = "        <!-- ALT BÖLÜM: Tam Sayfa -->"

start_idx = html.find(start_marker)
end_idx = html.find(end_marker)

if start_idx != -1 and end_idx != -1:
    scoliometer_html = html[start_idx:end_idx]
    
    # Remove it from there
    html = html[:start_idx] + html[end_idx:]
    
    # Now find the end of scoliosisTab.
    # The end of scoliosisTab is the </div> after the Aksiyon Butonları div block.
    # Let's search for "Karekod Paylaş" and find the closing divs.
    # The structure at the end is:
    #             <button onclick="showScoliosisQr()" ...>
    #                 <i class="fa-solid fa-qrcode"></i> Karekod Paylaş
    #             </button>
    #         </div>
    #         
    #     </div>
    # </div>
    
    # We can just search for `<div id="scoliometerTab" class="hidden">` which we already extracted.
    # Let's just insert scoliometer_html right before <!-- ─── Profil Düzenleme Modalı ─── -->
    target_marker = "<!-- ─── Profil Düzenleme Modalı ─── -->"
    t_idx = html.find(target_marker)
    
    if t_idx != -1:
        html = html[:t_idx] + scoliometer_html + "\n    " + html[t_idx:]
        with open("frontend/index.html", "w") as f:
            f.write(html)
        print("Fixed tab nesting!")
    else:
        print("Could not find Profil Düzenleme Modalı")
else:
    print("Could not find scoliometerTab boundaries")

