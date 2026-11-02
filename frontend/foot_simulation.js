// =========================================================================
// CIBODY - 3D İnteraktif Anatomik İnsan Ayağı Simülatörü
// Kusursuz 5 Parmak Anatomisi, Yuvarlak Doğal Topuk ve Akıcı Medial Kavis
// =========================================================================

let footScene, footCamera, footRenderer, footControls;
let footMesh = null;
let footLabelGroup = null;
let currentFootSide = 'right'; // 'right' veya 'left'
let currentRenderMode = 'anatomical'; // 'anatomical', 'heatmap', 'wireframe'
let currentModelType = 'humanFoot'; // 'humanFoot' (5 Parmaklı Gerçek Ayak) veya 'insole' (CNC Tabanlık)

// Her iki ayak için bağımsız saklanan biyomekanik ölçümler
window.footDataStore = {
    right: { archHeight: 18.5, footLength: 265, postingAngle: 0.0 },
    left: { archHeight: 17.0, footLength: 262, postingAngle: 0.0 }
};

function initFootSimulation() {
    const canvas = document.getElementById('footScanCanvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const container = canvas.parentElement;
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 550;

    // 1. Sahne
    footScene = new THREE.Scene();
    footScene.background = new THREE.Color(0x0b1120); // Slate-950

    // Izgara Zemin
    const gridHelper = new THREE.GridHelper(380, 24, 0x1e293b, 0x0f172a);
    gridHelper.position.y = -6;
    footScene.add(gridHelper);

    // 2. Kamera
    footCamera = new THREE.PerspectiveCamera(38, width / height, 1, 2500);
    setFootCameraAngle('perspective');

    // 3. WebGL Renderer
    footRenderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, preserveDrawingBuffer: true });
    footRenderer.setSize(width, height);
    footRenderer.setPixelRatio(window.devicePixelRatio);
    footRenderer.shadowMap.enabled = true;

    // 4. OrbitControls
    if (typeof THREE.OrbitControls !== 'undefined') {
        footControls = new THREE.OrbitControls(footCamera, footRenderer.domElement);
        footControls.enableDamping = true;
        footControls.dampingFactor = 0.06;
        footControls.target.set(0, 10, 0);
        footControls.minDistance = 60;
        footControls.maxDistance = 650;
    }

    // 5. Stüdyo Işıklandırması
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    footScene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 0.9);
    mainLight.position.set(80, 180, 90);
    mainLight.castShadow = true;
    footScene.add(mainLight);

    // Kavis Aydınlatması (Alttan çukuru gösterir)
    const bottomLight = new THREE.DirectionalLight(0x10b981, 0.8);
    bottomLight.position.set(0, -140, 0);
    footScene.add(bottomLight);

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 0.6);
    fillLight.position.set(-90, 40, -90);
    footScene.add(fillLight);

    footLabelGroup = new THREE.Group();
    footScene.add(footLabelGroup);

    // Modeli Oluştur
    buildAnatomicalFootMesh();

    window.addEventListener('resize', onFootViewerResize);
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

// =========================================================================
// KUSURSUZ 5 PARMAKLI GERÇEK İNSAN AYAĞI 3D YÜZEY GEOMETRİSİ
// =========================================================================
function buildAnatomicalFootMesh() {
    if (footMesh) {
        footScene.remove(footMesh);
        if (footMesh.geometry) footMesh.geometry.dispose();
    }
    if (footLabelGroup) {
        while (footLabelGroup.children.length > 0) {
            footLabelGroup.remove(footLabelGroup.children[0]);
        }
    }

    const currentData = window.footDataStore[currentFootSide] || { archHeight: 18.5, footLength: 265, postingAngle: 0 };
    const length = currentData.footLength * 0.72;
    const width = length * 0.38;
    const archH = currentData.archHeight * 1.35;
    const isRight = (currentFootSide === 'right');

    const uSegments = 54; // Yüksek boyuna çözünürlük
    const vSegments = 36; // Yüksek enine çözünürlük (5 parmak kıvrımı için)
    const geom = new THREE.BufferGeometry();

    const positions = [];
    const colors = [];
    const indices = [];

    // 5 PARMAK ANATOMİK VERİLERİ (Medial'den Lateral'e: Başparmak -> Küçük Parmak)
    // Her parmağın bağıl konumu, uzunluğu ve kalınlığı
    const toeDefinitions = [
        { center: 0.10, lengthExt: 12.0, radius: 0.08, height: 7.0 },  // 1. Parmak (Başparmak / Hallux - En kalın & uzun)
        { center: 0.30, lengthExt: 9.5,  radius: 0.065, height: 5.5 }, // 2. Parmak
        { center: 0.50, lengthExt: 6.5,  radius: 0.06, height: 5.0 },  // 3. Parmak
        { center: 0.70, lengthExt: 3.5,  radius: 0.055, height: 4.5 }, // 4. Parmak
        { center: 0.88, lengthExt: 0.0,  radius: 0.05, height: 4.0 }   // 5. Parmak (Küçük Parmak - En kısa)
    ];

    for (let i = 0; i <= uSegments; i++) {
        let u = i / uSegments; // 0 = Topuk Arkası, 1 = Parmak Uçları

        for (let j = 0; j <= vSegments; j++) {
            let v = j / vSegments; // 0 = Sol Kenar, 1 = Sağ Kenar

            // =============================================================
            // KESİN TIP ANATOMİSİ:
            // SAĞ AYAK: İç (Medial/Başparmak) = SOLDA (v = 0)
            // SOL AYAK: İç (Medial/Başparmak) = SAĞDA (v = 1)
            // =============================================================
            let medialFactor = isRight ? (1.0 - v) : v;
            let lateralFactor = 1.0 - medialFactor;

            // 5 Parmak Hizalaması (Medial'den Lateral'e)
            let toeNormalizedPos = isRight ? v : (1.0 - v); // 0 = Başparmak, 1 = Küçük Parmak

            // Aktif parmak çıkıntısını hesapla
            let toeBonusLength = 0;
            let toeBonusHeight = 0;
            let activeToeIndex = -1;

            for (let t = 0; t < toeDefinitions.length; t++) {
                let td = toeDefinitions[t];
                let distToToe = Math.abs(toeNormalizedPos - td.center);
                if (distToToe < td.radius * 1.6) {
                    let falloff = Math.cos((distToToe / (td.radius * 1.6)) * Math.PI / 2);
                    toeBonusLength = Math.max(toeBonusLength, td.lengthExt * falloff);
                    toeBonusHeight = Math.max(toeBonusHeight, td.height * falloff);
                    activeToeIndex = t;
                }
            }

            // BOYUNA X KOORDİNATI (Topuktan Parmak Ucuna)
            let baseX = (u - 0.44) * length;
            if (u > 0.78) {
                let toeProgression = (u - 0.78) / 0.22;
                baseX += toeBonusLength * Math.sin(toeProgression * Math.PI / 2);
            }
            let x = baseX;

            // ENİNE GENİŞLİK KONTURÜ (Pürüzsüz & Akıcı Organik Geçiş)
            // Basamak veya ani atlama olmaksızın sürekli türevlenebilir kemik profili
            let widthScale = 1.0;
            if (u < 0.24) {
                // Topuk küresi
                widthScale = 0.68 + Math.sin(u / 0.24 * Math.PI / 2) * 0.18;
            } else if (u < 0.68) {
                // Orta ayak kavisi (Pürüzsüz akıcı daralma)
                let archProg = (u - 0.24) / 0.44;
                let smoothWaist = Math.sin(archProg * Math.PI) * 0.18 * medialFactor;
                widthScale = 0.86 - smoothWaist;
            } else if (u < 0.85) {
                // Tarak bölgesi (Metatars başları genişler)
                let metProg = (u - 0.68) / 0.17;
                widthScale = 0.86 + Math.sin(metProg * Math.PI / 2) * 0.22;
            } else {
                // Parmak ucu oval bitiş
                let toeProg = (u - 0.85) / 0.15;
                widthScale = 1.08 - (toeProg * toeProg) * 0.25;
            }

            let y = (v - 0.5) * width * widthScale;

            // =============================================================
            // Z YÜKSEKLİK MODELİ (ANATOMİK KAVİS VE YUVARLAK DOĞAL TOPUK)
            // =============================================================
            let z = 0;

            // 1. SORUNUN ÇÖZÜMÜ: YUVARLAK DOĞAL TOPUK (Convex Heel)
            // Topuk içeri doğru çukur değil, doğal insan ayağındaki gibi dışa doğru yuvarlak kubbedir!
            if (u < 0.26) {
                let heelU = (u - 0.12) / 0.14;
                let heelV = (v - 0.5) / 0.35;
                let distHeel = Math.hypot(heelU, heelV);
                if (distHeel < 1.0) {
                    // Dışa doğru yuvarlak anatomik kalkaneus kemiği kubbesi
                    z += (1.0 - distHeel * distHeel) * 11.5;
                }
            }

            // 2. SORUNUN ÇÖZÜMÜ: PÜRÜZSÜZ MEDİAL LONGITUDINAL ARK (İÇ KAVİS ÇUKURU)
            // 2. noktadaki basamağı tamamen yok eden akıcı Gauss/Sinüs geçişi:
            if (u > 0.20 && u < 0.74 && medialFactor > 0.25) {
                let archU = Math.sin((u - 0.20) / 0.54 * Math.PI); // Boyuna tepe noktası
                let archV = Math.pow((medialFactor - 0.25) / 0.75, 1.4); // Enine tepe noktası
                z += archH * archU * archV;
            }

            // Lateral (Dış) Kenar Denge Çizgisi
            if (u > 0.25 && u < 0.75 && lateralFactor > 0.45) {
                z += 3.0 * Math.sin((u - 0.25) / 0.50 * Math.PI) * ((lateralFactor - 0.45) / 0.55);
            }

            // Metatarsal Kubbe (Tarak Yastığı)
            if (u > 0.65 && u < 0.82 && v > 0.2 && v < 0.8) {
                z += 4.5 * Math.sin((u - 0.65) / 0.17 * Math.PI);
            }

            // 3. SORUNUN ÇÖZÜMÜ: GERÇEK 5 PARMAK KIVRIMI VE UÇLARI
            if (u > 0.78) {
                let toeProgression = (u - 0.78) / 0.22;
                // Parmak boğumları ve kemikleri
                let knuckle = Math.sin(toeProgression * Math.PI);
                z += toeBonusHeight * knuckle;

                // Parmak uçlarının yuvarlaklaşarak yere inmesi
                if (toeProgression > 0.8) {
                    let tipDrop = (toeProgression - 0.8) / 0.2;
                    z *= (1.0 - tipDrop * 0.6);
                }
            }

            // Pronasyon / Supinasyon Eğim Açısı
            let postRad = (currentData.postingAngle * Math.PI) / 180;
            let tiltedZ = z + (y * Math.sin(postRad));

            // Three.js Koordinatları: X = Boy, Y = Yükseklik (Kavis), Z = En
            positions.push(x, tiltedZ, y);

            // Renklendirme (Isı Haritası vs Anatomik Doku)
            let r = 0, g = 0, b = 0;
            if (currentRenderMode === 'heatmap') {
                let normZ = Math.min(1.0, Math.max(0.0, z / 26.0));
                if (normZ > 0.55) {
                    // Yüksek Kavis Çukuru: Koyu Mavi / Cyan
                    r = 0.05; g = 0.45 + (normZ - 0.55); b = 0.98;
                } else if (normZ > 0.25) {
                    // Orta Ayak Düzlemi: Yeşil / Sarı
                    r = 0.18; g = 0.85; b = 0.25;
                } else {
                    // Yere temas odakları: Turuncu / Kırmızı
                    r = 0.95; g = 0.25; b = 0.15;
                }
            } else {
                // Doğal Anatomik Medikal Cilt Dokusu
                r = 0.88; g = 0.82; b = 0.75;
            }
            colors.push(r, g, b);
        }
    }

    // Yüzey Üçgenlerini Ör
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
            metalness: 0.08,
            side: THREE.DoubleSide
        });
    } else {
        mat = new THREE.MeshStandardMaterial({
            color: 0xe0d2c4,
            roughness: 0.40,
            metalness: 0.05,
            side: THREE.DoubleSide
        });
    }

    footMesh = new THREE.Mesh(geom, mat);
    footMesh.castShadow = true;
    footMesh.receiveShadow = true;
    footScene.add(footMesh);

    // Anatomik Rozetler ve Etiketler
    createAnatomicalMarkers(isRight, width, archH);
}

// 3D Sahne İçi Net Yön Rozetleri
function createAnatomicalMarkers(isRight, width, archH) {
    if (!footLabelGroup) return;

    let medialZ = isRight ? -(width * 0.6) : (width * 0.6);
    let lateralZ = -medialZ;

    // 1. İÇ (MEDİAL) KAVİS ÇUKURU
    const medialBadge = create3DTextSprite("◀ İÇ (MEDİAL) KAVİS ÇUKURU", "#10b981");
    medialBadge.position.set(-10, archH + 6, medialZ);
    footLabelGroup.add(medialBadge);

    // 2. DIŞ (LATERAL) KENAR
    const lateralBadge = create3DTextSprite("DIŞ (LATERAL) KENAR ▶", "#64748b");
    lateralBadge.position.set(-10, 4, lateralZ);
    footLabelGroup.add(lateralBadge);

    // 3. 5 PARMAK ETİKETİ (BAŞPARMAK)
    const toeBadge = create3DTextSprite(isRight ? "⇦ 1. BAŞPARMAK (5 PARMAK)" : "(5 PARMAK) BAŞPARMAK ⇨", "#38bdf8");
    toeBadge.position.set(78, 10, isRight ? -26 : 26);
    footLabelGroup.add(toeBadge);

    // 4. TOPUK ETİKETİ
    const heelBadge = create3DTextSprite("TOPUK (KALKANEUS)", "#f59e0b");
    heelBadge.position.set(-80, 12, 0);
    footLabelGroup.add(heelBadge);
}

function create3DTextSprite(text, colorHex) {
    const canvas = document.createElement('canvas');
    canvas.width = 380;
    canvas.height = 70;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = "rgba(15, 23, 42, 0.88)";
    ctx.roundRect(5, 5, 370, 60, 14);
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = colorHex;
    ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 19px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, 190, 35);

    const texture = new THREE.CanvasTexture(canvas);
    const spriteMat = new THREE.SpriteMaterial({ map: texture, transparent: true });
    const sprite = new THREE.Sprite(spriteMat);
    sprite.scale.set(45, 8.5, 1);
    return sprite;
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

    loadFootDataToUI(side);
    buildAnatomicalFootMesh();
}

function loadFootDataToUI(side) {
    const data = window.footDataStore[side] || { archHeight: 18.5, footLength: 265, postingAngle: 0 };
    
    const sArch = document.getElementById('sliderArchHeight');
    const sPost = document.getElementById('sliderPosting');
    const sLen = document.getElementById('sliderFootLength');
    
    if (sArch) sArch.value = data.archHeight;
    if (sPost) sPost.value = data.postingAngle;
    if (sLen) sLen.value = data.footLength;

    document.getElementById('displayArchVal').innerText = data.archHeight.toFixed(1) + " mm";
    document.getElementById('displayPostingVal').innerText = (data.postingAngle > 0 ? "+" : "") + data.postingAngle.toFixed(1) + "°";
    
    let shoeSize = Math.round((data.footLength + 15) / 6.67);
    document.getElementById('displayLengthVal').innerText = `${data.footLength} mm (No: ${shoeSize})`;

    const sideBadge = document.getElementById('footScanBadgeStatus');
    if (sideBadge) {
        sideBadge.innerText = (side === 'right' ? "Sağ Ayak" : "Sol Ayak") + ` (${data.archHeight} mm)`;
    }
}

// Kamera Açılarını Değiştir
function setFootCameraAngle(angle) {
    if (!footCamera || !footControls) return;

    if (angle === 'plantar') {
        // Doğrudan taban altından kavis çukuruna bakış
        footCamera.position.set(0, -210, 0);
        footControls.target.set(0, 8, 0);
    } else if (angle === 'medial') {
        // İç yan kavis profili
        let isRight = (currentFootSide === 'right');
        let medialZ = isRight ? -190 : 190;
        footCamera.position.set(0, 18, medialZ);
        footControls.target.set(0, 10, 0);
    } else if (angle === 'dorsal') {
        // Üstten bakış
        footCamera.position.set(0, 220, 0);
        footControls.target.set(0, 8, 0);
    } else {
        // 3D Serbest Perspektif
        footCamera.position.set(130, 95, 140);
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

function onFootSliderChange() {
    const arch = parseFloat(document.getElementById('sliderArchHeight').value) || 18.5;
    const post = parseFloat(document.getElementById('sliderPosting').value) || 0.0;
    const len = parseFloat(document.getElementById('sliderFootLength').value) || 265;

    window.footDataStore[currentFootSide].archHeight = arch;
    window.footDataStore[currentFootSide].postingAngle = post;
    window.footDataStore[currentFootSide].footLength = len;

    document.getElementById('displayArchVal').innerText = arch.toFixed(1) + " mm";
    document.getElementById('displayPostingVal').innerText = (post > 0 ? "+" : "") + post.toFixed(1) + "°";
    
    let shoeSize = Math.round((len + 15) / 6.67);
    document.getElementById('displayLengthVal').innerText = `${len} mm (No: ${shoeSize})`;

    buildAnatomicalFootMesh();
}

function exportCurrentFootStl(side) {
    const data = window.footDataStore[side] || { archHeight: 18.5, footLength: 265 };
    const isRight = (side === 'right');
    const stlData = createStlFromCurrentParams(data.archHeight, data.footLength, isRight);
    const blob = new Blob([stlData], { type: 'application/sla' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Hasta_3D_${side.toUpperCase()}_Ayak_${data.archHeight}mm.stl`;
    a.click();
    URL.revokeObjectURL(url);
}

function createStlFromCurrentParams(archH, len, isRight) {
    let stl = "solid AnatomicalFootModel\n";
    const width = len * 0.38;
    const rows = 28;
    const cols = 14;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let u0 = i / rows, u1 = (i + 1) / rows;
            let v0 = j / cols, v1 = (j + 1) / cols;
            let x0 = (u0 - 0.44) * len, x1 = (u1 - 0.44) * len;
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
    // Yuvarlak doğal topuk
    if (u < 0.25) {
        let dist = Math.hypot((u - 0.12)/0.13, (v - 0.5)/0.35);
        if (dist < 1.0) z += (1.0 - dist * dist) * 10;
    }
    // Medial kavis çukuru
    let medial = isRight ? (1 - v) : v;
    if (u > 0.20 && u < 0.74 && medial > 0.25) {
        z += archH * Math.sin((u - 0.20) / 0.54 * Math.PI) * Math.pow((medial - 0.25) / 0.75, 1.3);
    }
    return z;
}
