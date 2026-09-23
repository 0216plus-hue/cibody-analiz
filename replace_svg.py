import re

with open("frontend/app.js", "r") as f:
    content = f.read()

pattern = re.compile(r"const POSTURE_REF_SVG = \{.*?\n\};\n", re.DOTALL)

replacement = """const POSTURE_REF_SVG = {
  right: `
    <svg viewBox="0 0 220 340" xmlns="http://www.w3.org/2000/svg" style="max-height:250px;width:auto">
      <text x="110" y="16" text-anchor="middle" fill="#94a3b8" font-size="11" font-family="sans-serif" font-weight="bold" letter-spacing="2">SAĞ YAN CEPHE</text>
      <circle cx="110" cy="46" r="22" fill="none" stroke="#0ea5e9" stroke-width="3"/>
      <line x1="110" y1="68" x2="110" y2="290" stroke="#0ea5e9" stroke-width="3" stroke-linecap="round"/>
      <line x1="110" y1="100" x2="170" y2="100" stroke="#38bdf8" stroke-width="3" stroke-linecap="round"/>
      <text x="110" y="318" text-anchor="middle" fill="#34d399" font-size="9.5" font-family="sans-serif" font-weight="bold">Kollar öne doğru uzatılmış</text>
      <text x="110" y="332" text-anchor="middle" fill="#94a3b8" font-size="9" font-family="sans-serif">Sağ profiliniz kameraya dönük olsun</text>
    </svg>`,
  left: `
    <svg viewBox="0 0 220 340" xmlns="http://www.w3.org/2000/svg" style="max-height:250px;width:auto">
      <text x="110" y="16" text-anchor="middle" fill="#94a3b8" font-size="11" font-family="sans-serif" font-weight="bold" letter-spacing="2">SOL YAN CEPHE</text>
      <circle cx="110" cy="46" r="22" fill="none" stroke="#a855f7" stroke-width="3"/>
      <line x1="110" y1="68" x2="110" y2="290" stroke="#a855f7" stroke-width="3" stroke-linecap="round"/>
      <line x1="110" y1="100" x2="50" y2="100" stroke="#c084fc" stroke-width="3" stroke-linecap="round"/>
      <text x="110" y="318" text-anchor="middle" fill="#34d399" font-size="9.5" font-family="sans-serif" font-weight="bold">Kollar öne doğru uzatılmış</text>
      <text x="110" y="332" text-anchor="middle" fill="#94a3b8" font-size="9" font-family="sans-serif">Sol profiliniz kameraya dönük olsun</text>
    </svg>`,
  front: `
    <svg viewBox="0 0 220 340" xmlns="http://www.w3.org/2000/svg" style="max-height:250px;width:auto">
      <text x="110" y="16" text-anchor="middle" fill="#94a3b8" font-size="11" font-family="sans-serif" font-weight="bold" letter-spacing="2">ÖN CEPHE</text>
      <circle cx="110" cy="46" r="22" fill="none" stroke="#6366f1" stroke-width="3"/>
      <line x1="110" y1="68" x2="110" y2="180" stroke="#6366f1" stroke-width="3" stroke-linecap="round"/>
      <line x1="110" y1="90" x2="50" y2="140" stroke="#6366f1" stroke-width="3" stroke-linecap="round"/>
      <line x1="110" y1="90" x2="170" y2="140" stroke="#6366f1" stroke-width="3" stroke-linecap="round"/>
      <line x1="110" y1="180" x2="70" y2="290" stroke="#6366f1" stroke-width="3" stroke-linecap="round"/>
      <line x1="110" y1="180" x2="150" y2="290" stroke="#6366f1" stroke-width="3" stroke-linecap="round"/>
      <text x="110" y="318" text-anchor="middle" fill="#34d399" font-size="9.5" font-family="sans-serif" font-weight="bold">Kollar ve bacaklar hafif açık</text>
      <text x="110" y="332" text-anchor="middle" fill="#94a3b8" font-size="9" font-family="sans-serif">Kameraya düz bakın</text>
    </svg>`,
  back: `
    <svg viewBox="0 0 220 340" xmlns="http://www.w3.org/2000/svg" style="max-height:250px;width:auto">
      <text x="110" y="16" text-anchor="middle" fill="#94a3b8" font-size="11" font-family="sans-serif" font-weight="bold" letter-spacing="2">ARKA CEPHE</text>
      <circle cx="110" cy="46" r="22" fill="none" stroke="#f59e0b" stroke-width="3"/>
      <line x1="110" y1="68" x2="110" y2="180" stroke="#f59e0b" stroke-width="3" stroke-linecap="round"/>
      <line x1="110" y1="90" x2="50" y2="140" stroke="#f59e0b" stroke-width="3" stroke-linecap="round"/>
      <line x1="110" y1="90" x2="170" y2="140" stroke="#f59e0b" stroke-width="3" stroke-linecap="round"/>
      <line x1="110" y1="180" x2="70" y2="290" stroke="#f59e0b" stroke-width="3" stroke-linecap="round"/>
      <line x1="110" y1="180" x2="150" y2="290" stroke="#f59e0b" stroke-width="3" stroke-linecap="round"/>
      <text x="110" y="318" text-anchor="middle" fill="#34d399" font-size="9.5" font-family="sans-serif" font-weight="bold">Kollar ve bacaklar hafif açık</text>
      <text x="110" y="332" text-anchor="middle" fill="#94a3b8" font-size="9" font-family="sans-serif">Kameraya sırtınızı dönün</text>
    </svg>`
};
"""

new_content = pattern.sub(replacement, content)

with open("frontend/app.js", "w") as f:
    f.write(new_content)
