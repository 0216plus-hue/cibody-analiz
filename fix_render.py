import re

with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/app.js', 'r') as f:
    js = f.read()

# Locate the end of renderHistoricalAnalysis and link it properly
old_block = """    setupDragEvents('canvas_right', 'right');
            let imagesToLoad = 0;
            let loadedCount = 0;
            const loadImg = (viewName, path) => {
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
            };

            if(latest.front_image_path) loadImg('front', latest.front_image_path);
            if(latest.back_image_path) loadImg('back', latest.back_image_path);
            if(latest.left_image_path) loadImg('left', latest.left_image_path);
            if(latest.right_image_path) loadImg('right', latest.right_image_path);

            if(imagesToLoad === 0) refreshAllCanvases(); // Hic resim yoksa direkt ciz (bunun olmamasi lazim ama onlem)
        }"""

new_block = """
    let imagesToLoad = 0;
    let loadedCount = 0;
    const loadImg = (viewName, path) => {
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
    };

    if(targetAnalysis.front_image_path) loadImg('front', targetAnalysis.front_image_path);
    if(targetAnalysis.back_image_path) loadImg('back', targetAnalysis.back_image_path);
    if(targetAnalysis.left_image_path) loadImg('left', targetAnalysis.left_image_path);
    if(targetAnalysis.right_image_path) loadImg('right', targetAnalysis.right_image_path);

    if(imagesToLoad === 0) refreshAllCanvases(); 
}"""

if old_block in js:
    js = js.replace(old_block, new_block)
    with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/app.js', 'w') as f:
        f.write(js)
    print("JS logic for historical analysis completed.")
else:
    print("Could not find block. Trying regex.")
    match = re.search(r'    setupDragEvents\(\'canvas_right\', \'right\'\);[\s\S]*?if\(imagesToLoad === 0\) refreshAllCanvases\(\); \/\/ Hic resim yoksa direkt ciz \(bunun olmamasi lazim ama onlem\)\n        \}', js)
    if match:
        js = js.replace(match.group(0), new_block)
        with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/app.js', 'w') as f:
            f.write(js)
        print("JS regex replace succeeded.")
