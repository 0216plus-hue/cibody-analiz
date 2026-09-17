import re

with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/app.js', 'r') as f:
    js = f.read()

old_load_img = """            const loadImg = (viewName, path) => {
                if(!path) return;
                imagesToLoad++;
                const imgEl = document.getElementById('orig_img_' + viewName);
                imgEl.onload = () => {
                    loadedCount++;
                    if(loadedCount === imagesToLoad) refreshAllCanvases();
                };
                // path formati windows vs degisikliklerine karsi duzelt
                imgEl.src = "/" + path.replace(/\\\\\\\\/g, '/');
            };"""

new_load_img = """            const loadImg = (viewName, path) => {
                if(!path) return;
                imagesToLoad++;
                let imgEl = document.getElementById('orig_img_' + viewName);
                if(!imgEl) {
                    imgEl = new Image();
                    imgEl.id = 'orig_img_' + viewName;
                    imgEl.className = 'hidden';
                    document.body.appendChild(imgEl);
                }
                imgEl.onload = () => {
                    loadedCount++;
                    if(loadedCount === imagesToLoad) refreshAllCanvases();
                };
                imgEl.onerror = () => {
                    console.error("Resim yuklenemedi: " + path);
                    loadedCount++;
                    if(loadedCount === imagesToLoad) refreshAllCanvases();
                };
                imgEl.src = "/" + path.replace(/\\\\\\\\/g, '/');
            };"""

if old_load_img in js:
    js = js.replace(old_load_img, new_load_img)
    with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/app.js', 'w') as f:
        f.write(js)
    print("JS loadImg logic patched successfully.")
else:
    print("Old loadImg logic not found. Trying regex or manual fix.")
