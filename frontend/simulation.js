let simScene, simCamera, simRenderer, simControls;
let vertebrae = [];
const TOTAL_VERTEBRAE = 24;
// Labels: C1-C7, T1-T12, L1-L5
const vertLabels = [];
for(let i=1; i<=7; i++) vertLabels.push('C'+i);
for(let i=1; i<=12; i++) vertLabels.push('T'+i);
for(let i=1; i<=5; i++) vertLabels.push('L'+i);

function initSimulation() {
    const container = document.getElementById('simCanvas');
    if(!container) return;
    
    simScene = new THREE.Scene();
    simScene.background = new THREE.Color(0x0f172a); // slate-900
    
    simCamera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    simCamera.position.set(0, 0, 50);
    
    simRenderer = new THREE.WebGLRenderer({ canvas: container, antialias: true });
    simRenderer.setSize(container.clientWidth, container.clientHeight);
    simRenderer.shadowMap.enabled = true;
    
    // Controls
    simControls = new THREE.OrbitControls(simCamera, simRenderer.domElement);
    simControls.enableDamping = true;
    simControls.dampingFactor = 0.05;
    simControls.target.set(0, 0, 0);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    simScene.add(ambientLight);
    
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(10, 20, 10);
    dirLight.castShadow = true;
    simScene.add(dirLight);

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.3);
    dirLight2.position.set(-10, 0, -10);
    simScene.add(dirLight2);
    
    // Create Spine
    createSpine();
    
    // Start loop
    animateSimulation();
    
    // Attach event listeners
    document.getElementById('sim_cobb').addEventListener('input', updateSpineForm);
    document.getElementById('sim_rot').addEventListener('input', updateSpineForm);
    document.getElementById('sim_shift').addEventListener('input', updateSpineForm);
    document.getElementById('sim_start').addEventListener('change', updateSpineForm);
    document.getElementById('sim_end').addEventListener('change', updateSpineForm);
}

function createSpine() {
    // Clear old
    vertebrae.forEach(v => simScene.remove(v.mesh));
    vertebrae = [];
    
    const spacing = 1.6;
    const startY = (TOTAL_VERTEBRAE * spacing) / 2 - spacing;
    
    for(let i = 0; i < TOTAL_VERTEBRAE; i++) {
        // Size gets slightly bigger going down
        const scale = 1 + (i / TOTAL_VERTEBRAE) * 0.5;
        
        const geometry = new THREE.BoxGeometry(2.5 * scale, 1.2, 3 * scale);
        // Slightly round corners by using cylinder or custom, but box is fine for sim
        
        let color = 0xe2e8f0; // default slate-200
        if(i < 7) color = 0xf8fafc; // Cervical
        else if(i < 19) color = 0xfef08a; // Thoracic yellow-ish
        else color = 0xcbd5e1; // Lumbar
        
        const material = new THREE.MeshLambertMaterial({ color: color });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        
        mesh.position.y = startY - (i * spacing);
        
        // Save initial state
        vertebrae.push({
            mesh: mesh,
            baseY: mesh.position.y,
            index: i,
            label: vertLabels[i]
        });
        
        simScene.add(mesh);
    }
}

function updateSpineForm() {
    const cobb = parseFloat(document.getElementById('sim_cobb').value);
    const rot = parseFloat(document.getElementById('sim_rot').value);
    const shift = parseFloat(document.getElementById('sim_shift').value);
    const startIdx = parseInt(document.getElementById('sim_start').value);
    const endIdx = parseInt(document.getElementById('sim_end').value);
    
    document.getElementById('val_cobb').innerText = cobb + '°';
    document.getElementById('val_rot').innerText = rot + '°';
    document.getElementById('val_shift').innerText = shift + ' mm';
    
    // Reset all first
    vertebrae.forEach(v => {
        v.mesh.position.x = 0;
        v.mesh.rotation.z = 0;
        v.mesh.rotation.y = 0;
    });
    
    if(startIdx >= endIdx) return; // Invalid range
    
    const range = endIdx - startIdx;
    
    // We create a curve (sine wave) between startIdx and endIdx
    for(let i = 0; i < TOTAL_VERTEBRAE; i++) {
        const v = vertebrae[i];
        
        if(i >= startIdx && i <= endIdx) {
            const progress = (i - startIdx) / range; // 0 to 1
            const factor = Math.sin(progress * Math.PI); // 0 -> 1 -> 0
            
            // X displacement (Lateral Shift + Cobb effect)
            // A cobb angle of 50 deg means significant lateral deviation. Let's map 100 deg to 15 units.
            const maxDeviation = (cobb / 100) * 15 + (shift / 100) * 5;
            v.mesh.position.x = maxDeviation * factor;
            
            // Rotation Z (Tilt)
            // The tilt is the derivative of the sine wave (cosine)
            // max tilt at ends, 0 at apex
            const maxTiltRad = (cobb / 2) * (Math.PI / 180);
            v.mesh.rotation.z = -maxTiltRad * Math.cos(progress * Math.PI);
            
            // Axial Rotation Y
            // Max rotation at apex (sine wave)
            const maxRotRad = rot * (Math.PI / 180);
            v.mesh.rotation.y = maxRotRad * factor;
        }
    }
}

function resetSimulation() {
    document.getElementById('sim_cobb').value = 0;
    document.getElementById('sim_rot').value = 0;
    document.getElementById('sim_shift').value = 0;
    document.getElementById('sim_start').value = 11;
    document.getElementById('sim_end').value = 19;
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

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // wait a bit for container to have dimensions
    setTimeout(() => {
        if(document.getElementById('simCanvas')) {
            initSimulation();
        }
    }, 500);
});
