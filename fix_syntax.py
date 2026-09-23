with open("backend/main.py", "r") as f:
    content = f.read()

content = content.replace('library_str = "\n".join([f"ID: {ex.id} | Ad: {ex.name} | Kategori: {ex.category}" for ex in all_ex])', 'library_str = "\\n".join([f"ID: {ex.id} | Ad: {ex.name} | Kategori: {ex.category}" for ex in all_ex])')

with open("backend/main.py", "w") as f:
    f.write(content)
