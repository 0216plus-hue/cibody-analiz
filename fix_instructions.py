with open("frontend/index.html", "r") as f:
    html = f.read()

old_inst = """                    <div id="scoliosisInstructions" class="mt-4 p-4 bg-blue-50 text-blue-800 rounded-xl text-sm hidden">
                        <p class="font-bold mb-1"><i class="fa-solid fa-circle-info mr-1"></i>Nasıl Ölçüm Yapılır?</p>
                        <ol class="list-decimal pl-5 space-y-1">
                            <li>Eğriliğin en <strong>üstündeki</strong> omurun üst sınırına 2 nokta tıklayarak çizgi çekin.</li>
                            <li>Eğriliğin en <strong>altındaki</strong> omurun alt sınırına 2 nokta tıklayarak çizgi çekin.</li>
                            <li>Sistem 4 noktayı aldığında Cobb açısını otomatik hesaplayacaktır.</li>
                        </ol>
                    </div>"""

new_inst = """                    <div class="mb-4 p-4 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl text-sm">
                        <p class="font-bold mb-1"><i class="fa-solid fa-triangle-exclamation mr-1 text-amber-500"></i>Önemli: Ölçüm Nasıl Yapılır?</p>
                        <p class="mb-2">Röntgeni yükledikten sonra sistemin açıyı hesaplayabilmesi için <strong>görüntü üzerine 4 adet nokta tıklamanız</strong> gerekmektedir:</p>
                        <ol class="list-decimal pl-5 space-y-1 font-medium">
                            <li>Eğriliğin en <strong>üstündeki</strong> omurun sınırına (başına ve sonuna) 2 nokta tıklayın.</li>
                            <li>Eğriliğin en <strong>altındaki</strong> omurun sınırına (başına ve sonuna) 2 nokta tıklayın.</li>
                            <li class="text-indigo-700 font-bold">4 noktayı tamamladığınızda sistem Cobb açısını otomatik hesaplar!</li>
                        </ol>
                    </div>"""

html = html.replace(old_inst, "") # remove old
html = html.replace('<div class="relative digital-skeleton-bg', new_inst + '\n                    <div class="relative digital-skeleton-bg')

# Also fix the "hidden" class in js that tries to remove it
with open("frontend/scoliosis.js", "r") as f:
    js = f.read()
js = js.replace("document.getElementById('scoliosisInstructions').classList.remove('hidden');", "")

with open("frontend/index.html", "w") as f:
    f.write(html)
with open("frontend/scoliosis.js", "w") as f:
    f.write(js)
