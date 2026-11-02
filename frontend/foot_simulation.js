// =========================================================================
// CIBODY - 3D İnteraktif Ayak Simülasyonu & Görsel İnceleme Motoru
// Tıpkı 3D Omurga Simülasyonu gibi Three.js & OrbitControls ile çalışır
// =========================================================================

let footScene, footCamera, footRenderer, footControls;
let footMesh = null;
let currentFootSide = 'right'; // 'right' veya 'left'
let currentRenderMode = 'anatomical'; // 'anatomical', 'heatmap', 'wireframe'

let footParams = {
    archHeight: 18.5, // Medial ark yüksekliği (mm)
    postingAngle: 0.0, // Pronasyon / Supinasyon eğimi (derece)
    footLength: 265 // Ayak boyu (mm)
};

// Sayfa hazır olduğunda veya sekme açıldığında başlat
function initFootSimulation() {
    const canvas = document.getElementById('footScanCanvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const container = canvas.parentElement;
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 550;

    // 1. Sahne
    footScene = new THREE.Scene();
    footScene.background = new THREE.Color(0x0b1120); // Derin Slate-950 arka plan

    // Izgara Taban (Medikal Zemin)
    const gridHelper = new THREE.GridHelper(350, 20, 0x1e293b, 0x0f172a);
    gridHelper.position.y = -8;
    footScene.add(gridHelper);

    // 2. Kamera
    footCamera = new THREE.PerspectiveCamera(40, width / height, 1, 2000);
    setFootCameraAngle('perspective');

    // 3. Renderer
    footRenderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, preserveDrawingBuffer: true });
    footRenderer.setSize(width, height);
    footRenderer.setPixelRatio(window.devicePixelRatio);
    footRenderer.shadowMap.enabled = true;

    // 4. OrbitControls (Mouse ile 360° Çevirme ve Yakınlaştırma)
    if (typeof THREE.OrbitControls !== 'undefined') {
        footControls = new THREE.OrbitControls(footCamera, footRenderer.domElement);
        footControls.enableDamping = true;
        footControls.dampingFactor = 0.06;
        footControls.target.set(0, 15, 0);
        footControls.minDistance = 60;
        footControls.maxDistance = 600;
    }

    // 5. Profesyonel Işıklandırma (Taban Çukurunu ve Üst Kıvrımları Vurgular)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    footScene.add(ambientLight);

    // Üst Ana Işık
    const topLight = new THREE.DirectionalLight(0xffffff, 0.9);
    topLight.position.set(50, 150, 100);
    topLight.castShadow = true;
    footScene.add(topLight);

    // Taban Altı Kavis Işığı (Çukuru aydınlatır)
    const bottomLight = new THREE.DirectionalLight(0x10b981, 0.7);
    bottomLight.position.set(-40, -100, -30);
    footScene.add(bottomLight);

    // İç Yan (Medial) Vurgu Işığı
    const medialLight = new THREE.DirectionalLight(0x38bdf8, 0.6);
    medialLight.position.set(80, 20, -60);
    footScene.add(medialLight);

    // 3D Ayak Modelini Oluştur
    buildAnatomicalFootMesh();

    // Resize Dinleyicisi
    window.addEventListener('resize', onFootViewerResize);

    // Animasyon Döngüsü
    animateFootViewer();
}

function onFootViewerResize() {
    const canvas = document.getElementById('footScanCanvas');
    if (!canvas || !footRenderer || !footCamera) return;
    const container = canvas.parentElement;
    const width = container.clientWidth;
    const height = container.clientHeight;
    footCamera.aspect = width / height;
    footCamera.updateProjectionMatrix();
    footRenderer.setSize(width, height);
}

function animateFootViewer() {
    requestAnimationFrame(animateFootViewer);
    if (footControls) footControls.update();
    if (footRenderer && footScene && footCamera) {
        footRenderer.render(footScene, footCamera);
    }
}

// 3D Anatomik Ayak Yüzey Geometrisi Oluşturucu
function buildAnatomicalFootMesh() {
    if (footMesh) {
        footScene.remove(footMesh);
        if (footMesh.geometry) footMesh.geometry.dispose();
    }

    const length = footParams.footLength * 0.7; // Ölçekleme
    const width = length * 0.38;
    const archH = footParams.archHeight * 1.3;
    const isRight = (currentFootSide === 'right');

    const uSegments = 40;
    const vSegments = 24;
    const geom = new THREE.BufferGeometry();

    const positions = [];
    const colors = [];
    const indices = [];

    // Parametrik Anatomik Ayak Tabanı & Gövdesi
    for (let i = 0; i <= uSegments; i++) {
        let u = i / uSegments; // 0 = Topuk, 1 = Parmaklar
        let x = (u - 0.45) * length;

        for (let j = 0; j <= vSegments; j++) {
            let v = j / vSegments; // 0 = Dış Kenar, 1 = İç Kenar
            let y = (v - 0.5) * width;

            // Ayak hatlarının genişleme/daralma kavisleri
            let widthFactor = 1.0;
            if (u < 0.25) {
                // Topuk yuvarlağı
                widthFactor = 0.65 + Math.sin(u / 0.25 * Math.PI / 2) * 0.25;
            } else if (u < 0.6) {
                // Orta kavis daralması
                widthFactor = 0.75 + (u - 0.25) * 0.3;
            } else if (u < 0.85) {
                // Tarak kemiği genişlemesi
                widthFactor = 1.05;
            } else {
                // Parmak ucu kavisli daralma
                widthFactor = 1.05 - (u - 0.85) * 1.8;
            }

            let adjY = y * widthFactor;

            // Z YÜKSEKLİK MODELİ (Anatomik Kavis ve Topuk)
            let z = 0;

            // 1. Topuk Çukuru & Yastığı
            if (u < 0.22) {
                let distHeel = Math.hypot(u - 0.12, v - 0.5);
                z += Math.max(0, 14 - distHeel * 40);
            }

            // 2. Medial Ark (İç Kavis Çukuru)
            let innerSide = isRight ? v : (1 - v);
            if (u > 0.22 && u < 0.72 && innerSide > 0.3) {
                let archU = Math.sin((u - 0.22) / 0.5 * Math.PI);
                let archV = (innerSide - 0.3) / 0.7;
                z += archH * archU * archV;
            }

            // 3. Tarak Yastığı (Transvers Ark)
            if (u > 0.65 && u < 0.85 && v > 0.25 && v < 0.75) {
                z += 5.5 * Math.sin((u - 0.65) / 0.2 * Math.PI);
            }

            // 4. Parmak Kıvrımları
            if (u > 0.85) {
                let toePhase = Math.sin(v * Math.PI * 4.5);
                z += Math.max(0, 3.5 * toePhase * (u - 0.85) / 0.15);
            }

            // Pronasyon / Supinasyon Açısı
            let postRad = (footParams.postingAngle * Math.PI) / 180;
            let tiltedZ = z + (adjY * Math.sin(postRad));

            positions.push(x, tiltedZ, adjY);

            // Isı Haritası Renklendirmesi (Vertex Colors)
            // Kavis derinliği arttıkça Koyu Mavi -> Yeşil -> Sarı -> Kırmızı
            let normZ = Math.min(1.0, Math.max(0.0, z / 28.0));
            let r = 0, g = 0, b = 0;

            if (currentRenderMode === 'heatmap') {
                if (normZ > 0.6) {
                    r = 0.1; g = 0.5 + (normZ - 0.6); b = 1.0; // Yüksek kavis (Cyan/Mavi)
                } else if (normZ > 0.3) {
                    r = 0.2; g = 0.9; b = 0.3; // Orta kavis (Yeşil)
                } else {
                    r = 0.95; g = 0.3; b = 0.2; // Temas noktaları (Kırmızı/Turuncu)
                }
            } else {
                // Anatomik medikal doku
                r = 0.88; g = 0.82; b = 0.75;
            }
            colors.push(r, g, b);
        }
    }

    // Yüzey üçgenlerini bağla
    for (let i = 0; i < uSegments; i++) {
        for (let j = 0; j < vSegments; j++) {
            let a = i * (vSegments + 1) + j;
            let b = (i + 1) * (vSegments + 1) + j;
            let c = (i + 1) * (vSegments + 1) + (j + 1);
            let d = i * (vSegments + 1) + (j + 1);

            indices.push(a, b, d);
            indices.push(b, c, d);
        }
    }

    geom.setIndex(indices);
    geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geom.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geom.computeVertexNormals();

    // Materyal Seçimi
    let mat;
    if (currentRenderMode === 'wireframe') {
        mat = new THREE.MeshBasicMaterial({ color: 0x10b981, wireframe: true });
    } else if (currentRenderMode === 'heatmap') {
        mat = new THREE.MeshStandardMaterial({
            vertexColors: true,
            roughness: 0.35,
            metalness: 0.1,
            side: THREE.DoubleSide
        });
    } else {
        mat = new THREE.MeshStandardMaterial({
            color: 0xddcabb,
            roughness: 0.45,
            metalness: 0.05,
            side: THREE.DoubleSide
        });
    }

    footMesh = new THREE.Mesh(geom, mat);
    footMesh.castShadow = true;
    footMesh.receiveShadow = true;
    footScene.add(footMesh);
}

// Ayak Değiştir (Sağ / Sol)
function setFootViewerSide(side) {
    currentFootSide = side;
    const btnRight = document.getElementById('btnViewRightFoot');
    const btnLeft = document.getElementById('btnViewLeftFoot');

    if (side === 'right') {
        btnRight.className = "px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 text-white shadow-sm flex items-center gap-1.5 transition-all";
        btnLeft.className = "px-3 py-1.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1.5 transition-all";
    } else {
        btnLeft.className = "px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 text-white shadow-sm flex items-center gap-1.5 transition-all";
        btnRight.className = "px-3 py-1.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1.5 transition-all";
    }

    buildAnatomicalFootMesh();
}

// Kamera Açılarını Değiştir
function setFootCameraAngle(angle) {
    if (!footCamera || !footControls) return;

    if (angle === 'plantar') {
        // Doğrudan taban altından kavis çukuruna bakış
        footCamera.position.set(0, -180, 0);
        footControls.target.set(0, 5, 0);
    } else if (angle === 'medial') {
        // İç yan kavis profili
        let sideMultiplier = (currentFootSide === 'right') ? 1 : -1;
        footCamera.position.set(0, 15, 180 * sideMultiplier);
        footControls.target.set(0, 10, 0);
    } else if (angle === 'dorsal') {
        // Üstten bakış
        footCamera.position.set(0, 200, 0);
        footControls.target.set(0, 5, 0);
    } else {
        // 3D Serbest Perspektif
        footCamera.position.set(130, 90, 140);
        footControls.target.set(0, 12, 0);
    }
    footCamera.lookAt(footControls.target);
    footControls.update();
}

// Görünüm Modu Değiştir (Anatomik, Isı Haritası, Tel Kafes)
function setFootRenderMode(mode) {
    currentRenderMode = mode;

    const btnA = document.getElementById('btnRenderAnatomic');
    const btnH = document.getElementById('btnRenderHeatmap');
    const btnW = document.getElementById('btnRenderWireframe');

    [btnA, btnH, btnW].forEach(b => {
        if (b) b.className = "px-2.5 py-1.5 rounded-xl font-bold text-slate-400 hover:text-white";
    });

    if (mode === 'anatomical' && btnA) btnA.className = "px-2.5 py-1.5 rounded-xl font-bold bg-slate-800 text-white";
    if (mode === 'heatmap' && btnH) btnH.className = "px-2.5 py-1.5 rounded-xl font-bold bg-slate-800 text-white";
    if (mode === 'wireframe' && btnW) btnW.className = "px-2.5 py-1.5 rounded-xl font-bold bg-slate-800 text-white";

    buildAnatomicalFootMesh();
}

// Slider Değiştiğinde Modeli Canlı Güncelle
function onFootSliderChange() {
    const arch = parseFloat(document.getElementById('sliderArchHeight').value) || 18.5;
    const post = parseFloat(document.getElementById('sliderPosting').value) || 0.0;
    const len = parseFloat(document.getElementById('sliderFootLength').value) || 265;

    footParams.archHeight = arch;
    footParams.postingAngle = post;
    footParams.footLength = len;

    // Etiketleri güncelle
    document.getElementById('displayArchVal').innerText = arch.toFixed(1) + " mm";
    document.getElementById('displayPostingVal').innerText = (post > 0 ? "+" : "") + post.toFixed(1) + "°";
    
    // Numara hesabı (Paris Point standardı)
    let shoeSize = Math.round((len + 15) / 6.67);
    document.getElementById('displayLengthVal').innerText = `${len} mm (No: ${shoeSize})`;

    // Modeli canlı olarak yeniden ör
    buildAnatomicalFootMesh();
}

// STL İndir (İstenirse)
function exportCurrentFootStl(side) {
    const isRight = (side === 'right');
    const stlData = createStlFromCurrentParams(footParams.archHeight, footParams.footLength, isRight);
    const blob = new Blob([stlData], { type: 'application/sla' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Hasta_3D_${side.toUpperCase()}_Ayak_${footParams.archHeight}mm.stl`;
    a.click();
    URL.revokeObjectURL(url);
}

function createStlFromCurrentParams(archH, len, isRight) {
    let stl = "solid AnatomicalFootModel\n";
    const width = len * 0.38;
    const rows = 24;
    const cols = 12;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let u0 = i / rows, u1 = (i + 1) / rows;
            let v0 = j / cols, v1 = (j + 1) / cols;
            let x0 = (u0 - 0.45) * len, x1 = (u1 - 0.45) * len;
            let y0 = (v0 - 0.5) * width, y1 = (v1 - 0.5) * width;

            let z00 = calculateZ(u0, v0, archH, isRight);
            let z10 = calculateZ(u1, v0, archH, isRight);
            let z01 = calculateZ(u0, v1, archH, isRight);
            let z11 = calculateZ(u1, v1, archH, isRight);

            stl += `  facet normal 0 0 1\n    outer loop\n`;
            stl += `      vertex ${x0.toFixed(2)} ${y0.toFixed(2)} ${z00.toFixed(2)}\n`;
            stl += `      vertex ${x1.toFixed(2)} ${y0.toFixed(2)} ${z10.toFixed(2)}\n`;
            stl += `      vertex ${x1.toFixed(2)} ${y1.toFixed(2)} ${z11.toFixed(2)}\n`;
            stl += `    endloop\n  endfacet\n`;

            stl += `  facet normal 0 0 1\n    outer loop\n`;
            stl += `      vertex ${x0.toFixed(2)} ${y0.toFixed(2)} ${z00.toFixed(2)}\n`;
            stl += `      vertex ${x1.toFixed(2)} ${y1.toFixed(2)} ${z11.toFixed(2)}\n`;
            stl += `      vertex ${x0.toFixed(2)} ${y1.toFixed(2)} ${z01.toFixed(2)}\n`;
            stl += `    endloop\n  endfacet\n`;
        }
    }
    stl += "endsolid AnatomicalFootModel\n";
    return stl;
}

function calculateZ(u, v, archH, isRight) {
    let z = 3.0;
    if (u < 0.22) z += Math.max(0, 12 - Math.hypot(u - 0.12, v - 0.5) * 35);
    let inner = isRight ? v : (1 - v);
    if (u > 0.22 && u < 0.72 && inner > 0.3) {
        z += archH * Math.sin((u - 0.22) / 0.5 * Math.PI) * ((inner - 0.3) / 0.7);
    }
    return z;
}
