with open("frontend/index.html", "r") as f:
    content = f.read()

# Let's replace the #footReportContent CSS rules
old_css = """        /* AI Detaylı Analiz Metni - Ekran Görünümü (Kart Tasarımı) */
        #footReportContent { font-size: 0.95rem; line-height: 1.7; color: #475569; }
        #footReportContent h3 { color: #1e1b4b; font-weight: 900; font-size: 1.2rem; border-bottom: 2px solid #e0e7ff; padding-bottom: 0.4rem; margin-top: 2rem; margin-bottom: 1rem; text-transform: uppercase; letter-spacing: 0.04em; }
        #footReportContent > p { background-color: #f8fafc; border-left: 4px solid #6366f1; padding: 1rem; border-radius: 0 0.5rem 0.5rem 0; margin-bottom: 1.5rem; color: #334155; }
        #footReportContent ul { list-style: none; padding-left: 0; margin: 0; }
        #footReportContent > ul > li { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 1rem; padding: 1.5rem; margin-bottom: 1.25rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
        #footReportContent > ul > li > p > strong, #footReportContent > ul > li > strong { display: inline-block; font-size: 1rem; color: #0f172a; border-bottom: 2px solid #f1f5f9; padding-bottom: 0.4rem; margin-bottom: 0.6rem; width: 100%; }
        #footReportContent > ul > li > ul { margin-top: 0.75rem; display: flex; flex-direction: column; gap: 0.6rem; }
        #footReportContent > ul > li > ul > li { background: #f8fafc; border-radius: 0.5rem; padding: 0.75rem 1rem; border-left: 3px solid #818cf8; font-size: 0.9rem; }
        #footReportContent > ul > li > ul > li strong { color: #4338ca; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.02em; margin-right: 0.3rem; }"""

new_css = """        /* AI Detaylı Analiz Metni - Ekran Görünümü (Sade PDF Uyumu) */
        #footReportContent { font-size: 0.95rem; line-height: 1.7; color: #334155; padding: 1rem; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 1rem; }
        #footReportContent h3 { color: #1e1b4b; font-weight: 900; font-size: 1.2rem; border-bottom: 2px solid #e0e7ff; padding-bottom: 0.4rem; margin-top: 2rem; margin-bottom: 1rem; text-transform: uppercase; letter-spacing: 0.04em; }
        #footReportContent > p { margin-bottom: 1.5rem; }
        #footReportContent ul { margin: 0 0 1.5rem 1.5rem; list-style-type: disc; }
        #footReportContent li { margin-bottom: 0.5rem; }
        #footReportContent strong { color: #0f172a; }"""

if old_css in content:
    content = content.replace(old_css, new_css)
else:
    print("CSS block not found!")

with open("frontend/index.html", "w") as f:
    f.write(content)
