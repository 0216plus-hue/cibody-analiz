import re

with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/app.js', 'r') as f:
    js = f.read()

# Replace loadPatientData logic
old_load = """        if(data.posture_analyses && data.posture_analyses.length > 0) {
            const latest = data.posture_analyses[0];
            const parsed = JSON.parse(latest.analysis_data);
            globalPostureState = {
                front: parsed.front || null,
                back: parsed.back || null,
                left: parsed.left || null,
                right: parsed.right || null
            };
            document.getElementById('postureResultsSection').classList.remove('hidden');
            document.getElementById('postureUploadSection').classList.add('hidden');
            
            setupDragEvents('canvas_front', 'front');
            setupDragEvents('canvas_back', 'back');
            setupDragEvents('canvas_left', 'left');
            setupDragEvents('canvas_right', 'right');
            refreshAllCanvases();
        }"""

new_load = """        if(data.posture_analyses && data.posture_analyses.length > 0) {
            const latest = data.posture_analyses[0];
            const parsed = JSON.parse(latest.analysis_data);
            globalPostureState = {
                front: parsed.front || null,
                back: parsed.back || null,
                left: parsed.left || null,
                right: parsed.right || null
            };
            document.getElementById('postureResultsSection').classList.remove('hidden');
            document.getElementById('postureUploadSection').classList.add('hidden');
            
            setupDragEvents('canvas_front', 'front');
            setupDragEvents('canvas_back', 'back');
            setupDragEvents('canvas_left', 'left');
            setupDragEvents('canvas_right', 'right');
            
            // Fotoğrafları sunucudan çekip img etiketlerine yükle
            let loadedCount = 0;
            let imagesToLoad = 0;
            
            const loadImg = (viewName, path) => {
                if(!path) return;
                imagesToLoad++;
                const imgEl = document.getElementById('orig_img_' + viewName);
                imgEl.onload = () => {
                    loadedCount++;
                    if(loadedCount === imagesToLoad) refreshAllCanvases();
                };
                // path formati windows vs degisikliklerine karsi duzelt
                imgEl.src = "/" + path.replace(/\\\\\\\\/g, '/');
            };

            if(latest.front_image_path) loadImg('front', latest.front_image_path);
            if(latest.back_image_path) loadImg('back', latest.back_image_path);
            if(latest.left_image_path) loadImg('left', latest.left_image_path);
            if(latest.right_image_path) loadImg('right', latest.right_image_path);

            if(imagesToLoad === 0) refreshAllCanvases(); // Hic resim yoksa direkt ciz (bunun olmamasi lazim ama onlem)
        }"""

if old_load in js:
    js = js.replace(old_load, new_load)
    with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/app.js', 'w') as f:
        f.write(js)
    print("Frontend loadPatientData patched.")
else:
    print("Old loadPatientData not found in app.js")

