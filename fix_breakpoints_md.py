import re

with open("frontend/index.html", "r") as f:
    html = f.read()

match = re.search(r'(<div id="scoliosisTab".*?)(?=\s*<!-- Zoom Paneli -->)', html, re.DOTALL)
if match:
    tab_html = match.group(1)
    tab_html = tab_html.replace('lg:flex-row', 'md:flex-row')
    tab_html = tab_html.replace('lg:w-7/12', 'md:w-7/12')
    tab_html = tab_html.replace('lg:w-5/12', 'md:w-5/12')
    # Leave grid cols as lg because grids can get too squished
    
    html = html.replace(match.group(1), tab_html)
    
    with open("frontend/index.html", "w") as f:
        f.write(html)
        print("Breakpoints updated to md.")
