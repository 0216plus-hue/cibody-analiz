import re

with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/app.js', 'r') as f:
    js = f.read()

# Replace the HTML generation in refreshAllCanvases to ALWAYS include higher/lower for Normal values
# FRONT
js = js.replace(
    '${Math.abs(res.shoulderSym.val)<2 ? \'(Normal)\' : \'(\'+res.shoulderSym.higher+\' Yüksek)\'}',
    '${Math.abs(res.shoulderSym.val)<2 ? \'(Normal - \'+res.shoulderSym.higher+\' Yüksek)\' : \'(\'+res.shoulderSym.higher+\' Yüksek)\'}'
)
js = js.replace(
    '${Math.abs(res.hipSym.val)<2 ? \'(Normal)\' : \'(\'+res.hipSym.higher+\' Yüksek)\'}',
    '${Math.abs(res.hipSym.val)<2 ? \'(Normal - \'+res.hipSym.higher+\' Yüksek)\' : \'(\'+res.hipSym.higher+\' Yüksek)\'}'
)
js = js.replace(
    '${Math.abs(res.kneeSym.val)<2 ? \'(Normal)\' : \'(\'+res.kneeSym.higher+\' Yüksek)\'}',
    '${Math.abs(res.kneeSym.val)<2 ? \'(Normal - \'+res.kneeSym.higher+\' Yüksek)\' : \'(\'+res.kneeSym.higher+\' Yüksek)\'}'
)

# BACK
js = js.replace(
    '${Math.abs(res.shoulderSym.val)<2 ? \'(Normal)\' : \'(Skolyoz Riski - \'+res.shoulderSym.higher+\' Yüksek)\'}',
    '${Math.abs(res.shoulderSym.val)<2 ? \'(Normal - \'+res.shoulderSym.higher+\' Yüksek)\' : \'(Skolyoz Riski - \'+res.shoulderSym.higher+\' Yüksek)\'}'
)
js = js.replace(
    '${Math.abs(res.hipSym.val)<2 ? \'(Normal)\' : \'(Pelvik Asimetri - \'+res.hipSym.higher+\' Yüksek)\'}',
    '${Math.abs(res.hipSym.val)<2 ? \'(Normal - \'+res.hipSym.higher+\' Yüksek)\' : \'(Pelvik Asimetri - \'+res.hipSym.higher+\' Yüksek)\'}'
)

with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/app.js', 'w') as f:
    f.write(js)

print("Labels patched.")
