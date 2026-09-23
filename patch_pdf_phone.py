with open("frontend/app.js", "r") as f:
    content = f.read()

import re

# For downloadPdf
content = re.sub(
    r'(currentUserName = parsed\.name \|\| "Uzman";\s+currentUserEmail = parsed\.email \|\| "";)',
    r'\1\n            currentUserPhone = parsed.phone || "";',
    content
)
content = re.sub(
    r'(let currentUserEmail = "";)',
    r'\1\n    let currentUserPhone = "";',
    content
)

content = content.replace(
    "`Uzman: ${currentUserName}` + (currentUserEmail ? ` | Iletisim: ${currentUserEmail}` : '')",
    "`Uzman: ${currentUserName}` + (currentUserEmail ? ` | Mail: ${currentUserEmail}` : '') + (currentUserPhone ? ` | Tel: ${currentUserPhone}` : '')"
)

with open("frontend/app.js", "w") as f:
    f.write(content)
