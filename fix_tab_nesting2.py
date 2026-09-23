with open("frontend/index.html", "r") as f:
    html = f.read()

start_marker = "                <!-- SKOLYOMETRE TAB -->"
end_marker = "        <!-- ALT BÖLÜM: Tam Sayfa -->"

start_idx = html.find(start_marker)
end_idx = html.find(end_marker)

if start_idx != -1 and end_idx != -1:
    scoliometer_html = html[start_idx:end_idx]
    
    # Remove it from there
    html = html[:start_idx] + html[end_idx:]
    
    # Now find Zoom Paneli
    target_marker = "    <!-- Zoom Paneli -->"
    t_idx = html.find(target_marker)
    
    if t_idx != -1:
        html = html[:t_idx] + scoliometer_html + "\n    " + html[t_idx:]
        with open("frontend/index.html", "w") as f:
            f.write(html)
        print("Fixed tab nesting!")
    else:
        print("Could not find Zoom Paneli")
else:
    print("Could not find scoliometerTab boundaries")

