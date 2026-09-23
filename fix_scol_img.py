with open("frontend/scoliosis.js", "r") as f:
    js = f.read()

old_img = """<img src="/${ex.image_path}" onerror="this.outerHTML='<i class=\\'fa-solid fa-person-running text-slate-300\\'></i>'" class="w-full h-full object-cover">"""
new_img = """<img src="/${ex.image_path}" onerror="this.src='https://via.placeholder.com/150?text=Gorsel+Yok'" class="w-full h-full object-cover">"""

js = js.replace(old_img, new_img)

with open("frontend/scoliosis.js", "w") as f:
    f.write(js)
