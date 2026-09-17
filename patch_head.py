import re

with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/index.html', 'r') as f:
    html = f.read()

# 1. Replace the entire <head>
old_head = re.search(r'<head>.*?</head>', html, re.DOTALL).group(0)

new_head = """<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CIBODY AI v2.1 Postür Analizi</title>
    <meta name="description" content="CIBODY AI Klinik Biyomekanik Postür ve Ayak Basınç Analiz Sistemi">
    <meta name="robots" content="noindex, nofollow">
    <link rel="icon" href="/assets/logo.png" type="image/png">
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        .tab-btn.active { border-bottom: 4px solid #312e81; color: #312e81; font-weight: bold; } /* indigo-900 */
        .digital-skeleton-bg { background-color: #f8fafc; }
    </style>
</head>"""

html = html.replace(old_head, new_head)

# 2. Fix the Navbar Logo (Lines 19-25)
old_nav_logo_match = re.search(r'<div class="flex items-center space-x-3 cursor-pointer" onclick="showDashboard\(\)">.*?</h1>', html, re.DOTALL)
if old_nav_logo_match:
    new_nav_logo = """<div class="flex items-center space-x-3 cursor-pointer" onclick="showDashboard()">
                <img src="/assets/logo.png" class="h-10 w-auto object-contain" alt="CIBODY Logo">
                <h1 class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-900 to-indigo-600">
                    CIBODY AI <span class="text-sm text-slate-400 font-normal">v2.1 CRM</span>
                </h1>"""
    html = html.replace(old_nav_logo_match.group(0), new_nav_logo)

with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/index.html', 'w') as f:
    f.write(html)
print("Head, meta, favicon and logo patched successfully.")
