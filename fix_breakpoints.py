import re

with open("frontend/index.html", "r") as f:
    html = f.read()

# We only want to fix the scoliosisTab breakpoints
match = re.search(r'(<div id="scoliosisTab".*?)(?=\s*<!-- Zoom Paneli -->)', html, re.DOTALL)
if match:
    tab_html = match.group(1)
    # Replace xl:flex-row with lg:flex-row
    tab_html = tab_html.replace('xl:flex-row', 'lg:flex-row')
    # Replace xl:w-7/12 with lg:w-7/12
    tab_html = tab_html.replace('xl:w-7/12', 'lg:w-7/12')
    # Replace xl:w-5/12 with lg:w-5/12
    tab_html = tab_html.replace('xl:w-5/12', 'lg:w-5/12')
    # Also for the grid in the bottom if any
    tab_html = tab_html.replace('xl:grid-cols-2', 'lg:grid-cols-2')
    
    html = html.replace(match.group(1), tab_html)
    
    with open("frontend/index.html", "w") as f:
        f.write(html)
        print("Breakpoints updated from xl to lg.")
