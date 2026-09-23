with open("frontend/index.html", "r") as f:
    html = f.read()

# 1. Extract Geçmiş block
gecmis_start = """                <!-- Geçmiş Analizler -->"""
gecmis_end = """                </div>
            </div>
            
        </div>"""

# Wait, finding it precisely:
import re
gecmis_match = re.search(r'<!-- Geçmiş Analizler -->\s*<div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 flex-1 flex flex-col overflow-hidden">.*?<div id="scoliosisHistoryList".*?</div>\s*</div>', html, re.DOTALL)
if gecmis_match:
    gecmis_html = gecmis_match.group(0)
    html = html.replace(gecmis_html, "<!-- GECMIS_PLACEHOLDER -->")

# 2. Extract Klinik Notlar block
notlar_match = re.search(r'<!-- Klinik Notlar -->\s*<div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 w-full">.*?Notları Kaydet\s*</button>\s*</div>\s*</div>', html, re.DOTALL)
if notlar_match:
    notlar_html = notlar_match.group(0)
    html = html.replace(notlar_html, "<!-- NOTLAR_PLACEHOLDER -->")


# Now, format them
# In Gecmis, remove "Yana Kaydırın", change scrolling to wrapping
new_gecmis_html = gecmis_html.replace(
    """<span class="text-[10px] font-normal text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">Yana Kaydırın ➡️</span>""",
    ""
)
new_gecmis_html = new_gecmis_html.replace(
    """<div id="scoliosisHistoryList" class="flex overflow-x-auto gap-3 pb-3 snap-x" style="scrollbar-width: thin;">""",
    """<div id="scoliosisHistoryList" class="flex flex-wrap gap-4 pb-3">"""
)

# For Notlar, we need to make it flex-1 flex flex-col to fill the remaining height in the right panel.
new_notlar_html = notlar_html.replace(
    """<div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 w-full">""",
    """<div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex-1 flex flex-col w-full">"""
)
new_notlar_html = new_notlar_html.replace(
    """<textarea id="scoliosisNotes" class="w-full border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[100px]" placeholder="Tedavi planı ve notlarınızı buraya girebilirsiniz..."></textarea>""",
    """<textarea id="scoliosisNotes" class="w-full border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 flex-1 resize-none" placeholder="Tedavi planı ve notlarınızı buraya girebilirsiniz..."></textarea>"""
)


# Now swap placeholders
html = html.replace("<!-- GECMIS_PLACEHOLDER -->", new_notlar_html)
html = html.replace("<!-- NOTLAR_PLACEHOLDER -->", new_gecmis_html)


with open("frontend/index.html", "w") as f:
    f.write(html)
print("Layout swapped")
