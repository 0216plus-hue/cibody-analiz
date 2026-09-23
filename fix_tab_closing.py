with open("frontend/index.html", "r") as f:
    lines = f.readlines()

# 1. Find the `</div>` right before `<!-- ALT BÖLÜM: Tam Sayfa -->`
alt_bolum_idx = -1
for i, line in enumerate(lines):
    if "<!-- ALT BÖLÜM: Tam Sayfa -->" in line:
        alt_bolum_idx = i
        break

# The lines before alt_bolum_idx look like:
#             </div>
#             
#         </div>
#         
#         
#         <!-- ALT BÖLÜM: Tam Sayfa -->
#
# We need to remove the `</div>` that closes scoliosisTab.
# Let's count divs from <div id="scoliosisTab" class="hidden">
# Instead of doing that, we can simply remove the `</div>` that is at `alt_bolum_idx - 3` (or similar)
# and put a `</div>` right before `<!-- SKOLYOMETRE TAB -->`.

skol_tab_idx = -1
for i, line in enumerate(lines):
    if "<!-- SKOLYOMETRE TAB -->" in line:
        skol_tab_idx = i
        break

# Remove one </div> before ALT BÖLÜM
# Let's find the first `</div>` scanning backwards from alt_bolum_idx
for i in range(alt_bolum_idx - 1, -1, -1):
    if "</div>" in lines[i]:
        print(f"Removing </div> at line {i+1}")
        lines[i] = "\n"  # removed
        break

# Insert one </div> before SKOLYOMETRE TAB
lines.insert(skol_tab_idx, "        </div> <!-- End of scoliosisTab -->\n")

with open("frontend/index.html", "w") as f:
    f.writelines(lines)
    
print("Fixed tab closing!")
