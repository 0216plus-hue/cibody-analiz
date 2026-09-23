import re

with open("frontend/app.js", "r") as f:
    content = f.read()

content = content.replace("Kollarınızı T şeklinde açın, kameraya bakın", "Kollar ve bacaklar hafif açık, kameraya bakın")
content = content.replace("Kollarınızı T şeklinde açın, kameraya sırtınızı dönün", "Kollar ve bacaklar hafif açık, kameraya sırtınızı dönün")
content = content.replace("Kollar serbest, sağ yanınız kameraya dönük", "Kollar öne doğru uzatılmış, sağ yanınız kameraya dönük")
content = content.replace("Kollar serbest, sol yanınız kameraya dönük", "Kollar öne doğru uzatılmış, sol yanınız kameraya dönük")

with open("frontend/app.js", "w") as f:
    f.write(content)
