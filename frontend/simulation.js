let simScene, simCamera, simRenderer, simControls;
let vertebrae = [];
const TOTAL_VERTEBRAE = 25;
const vertLabels = [];
for(let i=1; i<=7; i++) vertLabels.push('C'+i);
for(let i=1; i<=12; i++) vertLabels.push('T'+i);
for(let i=1; i<=5; i++) vertLabels.push('L'+i);
vertLabels.push('S1');

function initSimulation() {
    const container = document.getElementById('simCanvas');
    if(!container) return;
    
    simScene = new THREE.Scene();
    simScene.background = new THREE.Color(0x0f172a); 
    
    simCamera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    simCamera.position.set(0, 5, 55);
    
    simRenderer = new THREE.WebGLRenderer({ canvas: container, antialias: true });
    simRenderer.setSize(container.clientWidth, container.clientHeight);
    simRenderer.shadowMap.enabled = true;
    
    simControls = new THREE.OrbitControls(simCamera, simRenderer.domElement);
    simControls.enableDamping = true;
    simControls.dampingFactor = 0.05;
    simControls.target.set(0, 0, 0);
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    simScene.add(ambientLight);
    
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(10, 20, 15);
    dirLight.castShadow = true;
    simScene.add(dirLight);

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.4);
    dirLight2.position.set(-15, -10, -15);
    simScene.add(dirLight2);
    
    // Populate Selects
    const startSel = document.getElementById('sim_start');
    const endSel = document.getElementById('sim_end');
    if(startSel && startSel.options.length === 0) {
        vertLabels.forEach((lbl, idx) => {
            startSel.add(new Option(lbl, idx));
            endSel.add(new Option(lbl, idx));
        });
        startSel.value = 5; // C6
        endSel.value = 15; // T9
    }
    
    createSpine();
    animateSimulation();
    
    document.getElementById('sim_cobb').addEventListener('input', updateSpineForm);
    document.getElementById('sim_rot').addEventListener('input', updateSpineForm);
    document.getElementById('sim_shift').addEventListener('input', updateSpineForm);
    document.getElementById('sim_torsion').addEventListener('input', updateSpineForm);
    document.getElementById('sim_start').addEventListener('change', updateSpineForm);
    document.getElementById('sim_end').addEventListener('change', updateSpineForm);
}

function createSpine() {
    vertebrae.forEach(v => simScene.remove(v.mesh));
    vertebrae = [];
    
    const spacing = 1.8;
    const startY = (TOTAL_VERTEBRAE * spacing) / 2 - spacing;
    
    // Materials
    const matCervical = new THREE.MeshLambertMaterial({ color: 0xf8fafc });
    const matThoracic = new THREE.MeshLambertMaterial({ color: 0xfef08a });
    const matLumbar = new THREE.MeshLambertMaterial({ color: 0xcbd5e1 });
    const matDisc = new THREE.MeshLambertMaterial({ color: 0x94a3b8 }); // intervertebral disc
    
    for(let i = 0; i < TOTAL_VERTEBRAE; i++) {
        const scale = 1 + (i / TOTAL_VERTEBRAE) * 0.4;
        
        let vertMat = matCervical;
        if(i >= 7 && i < 19) vertMat = matThoracic;
        if(i >= 19) vertMat = matLumbar;
        
        const group = new THREE.Group();
        
        // 1. Vertebral Body (Cylinder)
        const bodyGeo = new THREE.CylinderGeometry(1.4 * scale, 1.5 * scale, 1.1, 16);
        const bodyMesh = new THREE.Mesh(bodyGeo, vertMat);
        bodyMesh.castShadow = true;
        bodyMesh.receiveShadow = true;
        group.add(bodyMesh);
        
        // 2. Spinous Process (sticking out back)
        // In Three.js, let's say Z is forward (towards camera), -Z is back.
        const spinousGeo = new THREE.BoxGeometry(0.6 * scale, 0.8, 1.8 * scale);
        const spinousMesh = new THREE.Mesh(spinousGeo, vertMat);
        spinousMesh.position.set(0, 0, -1.8 * scale); // back
        spinousMesh.castShadow = true;
        spinousMesh.receiveShadow = true;
        group.add(spinousMesh);
        
        // 3. Transverse processes (sides)
        const transGeo = new THREE.BoxGeometry(3.5 * scale, 0.6, 0.6 * scale);
        const transMesh = new THREE.Mesh(transGeo, vertMat);
        transMesh.position.set(0, 0, -0.8 * scale);
        transMesh.castShadow = true;
        group.add(transMesh);
        
        // 4. Intervertebral Disc (bottom)
        if(i < TOTAL_VERTEBRAE - 1) {
            const discGeo = new THREE.CylinderGeometry(1.3 * scale, 1.4 * scale, 0.5, 16);
            const discMesh = new THREE.Mesh(discGeo, matDisc);
            discMesh.position.set(0, -0.8, 0);
            group.add(discMesh);
        }

        group.position.y = startY - (i * spacing);
        
        vertebrae.push({
            mesh: group,
            baseY: group.position.y,
            index: i,
            label: vertLabels[i]
        });
        
        simScene.add(group);
    }
}

function updateSpineForm() {
    const cobb = parseFloat(document.getElementById('sim_cobb').value);
    const rot = parseFloat(document.getElementById('sim_rot').value);
    const torsion = parseFloat(document.getElementById('sim_torsion').value);
    const shift = parseFloat(document.getElementById('sim_shift').value);
    const startIdx = parseInt(document.getElementById('sim_start').value);
    const endIdx = parseInt(document.getElementById('sim_end').value);
    
    document.getElementById('val_cobb').innerText = cobb + '°';
    document.getElementById('val_rot').innerText = rot + '°';
    document.getElementById('val_torsion').innerText = torsion + '°';
    document.getElementById('val_shift').innerText = shift + ' mm';
    
    // Reset
    vertebrae.forEach(v => {
        v.mesh.position.x = 0;
        v.mesh.rotation.z = 0;
        v.mesh.rotation.y = 0;
        v.mesh.rotation.x = 0;
    });
    
    if(startIdx >= endIdx) return;
    
    const range = endIdx - startIdx;
    
    for(let i = 0; i < TOTAL_VERTEBRAE; i++) {
        const v = vertebrae[i];
        
        if(i >= startIdx && i <= endIdx) {
            const progress = (i - startIdx) / range;
            const factor = Math.sin(progress * Math.PI); 
            
            // Lateral Shift + Cobb displacement
            const maxDeviation = (cobb / 100) * 12 + (shift / 100) * 8;
            v.mesh.position.x = maxDeviation * factor;
            
            // Rotation Z (Lateral Tilt for Cobb curve)
            const maxTiltRad = (cobb / 2) * (Math.PI / 180);
            v.mesh.rotation.z = -maxTiltRad * Math.cos(progress * Math.PI);
            
            // Axial Rotation Y
            const maxRotRad = rot * (Math.PI / 180);
            v.mesh.rotation.y = maxRotRad * factor;
            
            // Torsion X (Forward/Backward tilt)
            const maxTorsRad = torsion * (Math.PI / 180);
            v.mesh.rotation.x = maxTorsRad * factor;
        }
    }
}

function resetSimulation() {
    document.getElementById('sim_cobb').value = 0;
    document.getElementById('sim_rot').value = 0;
    document.getElementById('sim_torsion').value = 0;
    document.getElementById('sim_shift').value = 0;
    document.getElementById('sim_start').value = 5;
    document.getElementById('sim_end').value = 15;
    updateSpineForm();
}

function animateSimulation() {
    requestAnimationFrame(animateSimulation);
    if(simControls) simControls.update();
    if(simRenderer && simScene && simCamera) {
        simRenderer.render(simScene, simCamera);
    }
}

window.resizeSimulation = function() {
    const container = document.getElementById('threeJsContainer');
    if(!container || !simCamera || !simRenderer) return;
    simCamera.aspect = container.clientWidth / container.clientHeight;
    simCamera.updateProjectionMatrix();
    simRenderer.setSize(container.clientWidth, container.clientHeight);
};

window.addEventListener('resize', window.resizeSimulation);

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if(document.getElementById('simCanvas')) {
            initSimulation();
        }
    }, 500);
});

async function saveSimulationRecord() {
    if (!currentPatientId) {
        showToast("Lütfen bir hasta seçin.");
        return;
    }
    
    const cobb = parseFloat(document.getElementById('sim_cobb').value);
    const rot = parseFloat(document.getElementById('sim_rot').value);
    const torsion = parseFloat(document.getElementById('sim_torsion').value);
    const shift = parseFloat(document.getElementById('sim_shift').value);
    
    const startSel = document.getElementById('sim_start');
    const endSel = document.getElementById('sim_end');
    const startVertebra = startSel.options[startSel.selectedIndex].text;
    const endVertebra = endSel.options[endSel.selectedIndex].text;
    
    const methodSel = document.getElementById('sim_method');
    const method = methodSel.options[methodSel.selectedIndex].value;
    
    const payload = {
        patient_id: currentPatientId,
        cobb_angle: cobb,
        rotation_angle: rot,
        torsion_angle: torsion,
        lateral_shift: shift,
        start_vertebra: startVertebra,
        end_vertebra: endVertebra,
        measurement_method: method
    };
    
    try {
        const res = await authFetch('/api/simulation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        
        if (res.ok) {
            showToast("Simülasyon analizi kaydedildi!");
            loadSimulationHistory();
        } else {
            const errData = await res.json().catch(() => ({}));
            console.error("Save simulation error:", errData);
            showToast(errData.detail || "Kaydedilirken hata oluştu.");
        }
    } catch (e) {
        console.error(e);
        showToast("Sunucu hatası: " + e.message);
    }
}

async function loadSimulationHistory() {
    if (!currentPatientId) return;
    
    try {
        const res = await authFetch(`/api/simulation/patient/${currentPatientId}`);
        if (res.ok) {
            const data = await res.json();
            const tbody = document.getElementById('simHistoryList');
            tbody.innerHTML = '';
            
            if (data.history.length === 0) {
                tbody.innerHTML = '<tr><td colspan="7" class="text-center py-8 text-slate-400">Henüz kayıt bulunmuyor.</td></tr>';
                return;
            }
            
            data.history.forEach(item => {
                const dateStr = new Date(item.created_at + 'Z').toLocaleString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td class="px-4 py-3 whitespace-nowrap"><div class="font-medium text-slate-700">${dateStr}</div></td>
                    <td class="px-4 py-3"><span class="bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md text-xs font-bold">${item.start_vertebra} - ${item.end_vertebra}</span></td>
                    <td class="px-4 py-3 font-bold text-slate-700">${item.cobb_angle}°</td>
                    <td class="px-4 py-3 text-slate-600">${item.rotation_angle}°</td>
                    <td class="px-4 py-3 text-slate-600">${item.torsion_angle}°</td>
                    <td class="px-4 py-3 text-slate-600">${item.lateral_shift} mm</td>
                    <td class="px-4 py-3 text-xs text-slate-500">${item.measurement_method}</td>
                `;
                tbody.appendChild(tr);
            });
        }
    } catch (e) {
        console.error(e);
    }
}
