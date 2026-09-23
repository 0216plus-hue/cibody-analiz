with open("frontend/ayak_rapor.html", "r") as f:
    html = f.read()

# Replace the broken regex lines
old_broken_regex = "const patientInfoRegex = /👤?\\s*\\**HASTA BİLGİLERİ\\**\\n([\\s\\S]*?)(?=1\\.\\s*KLİNİK ÖZET|### 1\\. KLİNİK ÖZET)/i;"
# Let's just find the exact text using regex since there's a literal newline
import re
html = re.sub(r'const patientInfoRegex = /👤\?\\s\*\\\*\*(.*?)HASTA BİLGİLERİ\\\*\*.*?KLİNİK ÖZET\)/i;', 
              r'const patientInfoRegex = /👤?\\s*\\**HASTA BİLGİLERİ\\**\\n([\\s\\S]*?)(?=1\\.\\s*KLİNİK ÖZET|### 1\\. KLİNİK ÖZET)/i;', 
              html, flags=re.DOTALL)

with open("frontend/ayak_rapor.html", "w") as f:
    f.write(html)
