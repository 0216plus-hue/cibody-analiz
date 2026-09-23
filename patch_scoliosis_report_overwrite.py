import re

with open("backend/main.py", "r") as f:
    content = f.read()

old_str = """        text = rr.json()["candidates"][0]["content"]["parts"][0]["text"]
        
        analysis.ai_report_text = text
        db.commit()
        return {"status": "success", "report": text}"""

new_str = """        text = rr.json()["candidates"][0]["content"]["parts"][0]["text"]
        
        marker = "### 🏃‍♂️ Önerilen Egzersiz Programı"
        egzersiz_kismi = ""
        if analysis.ai_report_text and marker in analysis.ai_report_text:
            parts = analysis.ai_report_text.split(marker)
            if len(parts) > 1:
                egzersiz_kismi = "\\n\\n" + marker + parts[1]
                
        analysis.ai_report_text = text + egzersiz_kismi
        db.commit()
        return {"status": "success", "report": analysis.ai_report_text}"""

if old_str in content:
    content = content.replace(old_str, new_str)
    with open("backend/main.py", "w") as f:
        f.write(content)
        print("Success")
else:
    print("Not found")
