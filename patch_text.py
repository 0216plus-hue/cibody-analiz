import re

# Update app.js
with open("frontend/app.js", "r") as f:
    app_content = f.read()
    
app_content = app_content.replace('Profili Aç <i class="fa-solid fa-arrow-right ml-2"></i>', 'Hasta Kartını Aç <i class="fa-solid fa-arrow-right ml-2"></i>')

with open("frontend/app.js", "w") as f:
    f.write(app_content)


# Update index.html
with open("frontend/index.html", "r") as f:
    index_content = f.read()

index_content = index_content.replace('Kaydet ve Profili Aç <i class="fa-solid fa-arrow-right"></i>', 'Kaydet ve Hasta Kartını Aç <i class="fa-solid fa-arrow-right"></i>')

with open("frontend/index.html", "w") as f:
    f.write(index_content)
