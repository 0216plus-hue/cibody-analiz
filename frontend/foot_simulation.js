// =========================================================================
// CIBODY - 3D İnteraktif Ayak Simülasyonu & Biyomekanik Anatomik Motor
// Tam Anatomik Doğruluk: Medial (İç) ve Lateral (Dış) Hatlar
// =========================================================================

let footScene, footCamera, footRenderer, footControls;
let footMesh = null;
let footLabelGroup = null;
let currentFootSide = 'right'; // 'right' veya 'left'
let currentRenderMode = 'anatomical'; // 'anatomical', 'heatmap', 'wireframe'

// Her iki ayak için bağımsız saklanan biyomekanik veriler
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

    // Izgara Taban (Medikal Zemin)
    const gridHelper = new THREE.GridHelper(380, 24, 0x1e293b, 0x0f172a);
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

    // 4. OrbitControls
    if (typeof THREE.OrbitControls !== 'undefined') {
        footControls = new THREE.OrbitControls(footCamera, footRenderer.domElement);
        footControls.enableDamping = true;
        footControls.dampingFactor = 0.06;
        footControls.target.set(0, 10, 0);
        footControls.minDistance = 50;
        footControls.maxDistance = 650;
    }

    // 5. Profesyonel 4 Yönlü Stüdyo Işıklandırması
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    footScene.add(ambientLight);

    const topLight = new THREE.DirectionalLight(0xffffff, 0.9);
    topLight.position.set(60, 160, 80);
    topLight.castShadow = true;
    footScene.add(topLight);

    // Taban Altı Kavis Aydınlatması (Çukuru aydınlatır)
    const bottomLight = new THREE.DirectionalLight(0x10b981, 0.75);
    bottomLight.position.set(0, -120, 0);
    footScene.add(bottomLight);

    // İç Yan (Medial) Vurgu Işığı
    const medialLight = new THREE.DirectionalLight(0x38bdf8, 0.65);
    medialLight.position.set(-80, 20, -80);
    footScene.add(medialLight);

    // Dış Yan (Lateral) Vurgu Işığı
    const lateralLight = new THREE.DirectionalLight(0xf59e0b, 0.45);
    lateralLight.position.set(80, 20, 80);
    footScene.add(lateralLight);

    // Etiket grubu
    footLabelGroup = new THREE.Group();
    footScene.add(footLabelGroup);

    // Modeli Oluştur
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

// =========================================================================
// 3D ANATOMİK VE BİYOMEKANİK AYAK MODELLEYİCİ
// =========================================================================
// ANATOMİK KURAL:
// Ayakta dururken öne (parmaklara) bakıldığında:
// - SAĞ AYAK: İç (Medial) = SOL taraf, Dış (Lateral) = SAĞ taraf.
// - SOL AYAK: İç (Medial) = SAĞ taraf, Dış (Lateral) = SOL taraf.
// =========================================================================

function buildAnatomicalFootMesh() {
    if (footMesh) {
        footScene.remove(footMesh);
        if (footMesh.geometry) footMesh.geometry.dispose();
    }
    if (footLabelGroup) {
        while(footLabelGroup.children.length > 0) {
            footLabelGroup.remove(footLabelGroup.children[0]);
        }
    }

    const currentData = window.footDataStore[currentFootSide] || { archHeight: 18.5, footLength: 265, postingAngle: 0 };
    const length = currentData.footLength * 0.72; // Görüntüleme ölçeği
    const width = length * 0.38;
    const archH = currentData.archHeight * 1.35;
    const isRight = (currentFootSide === 'right');

    const uSegments = 44; // Boyuna çözünürlük
    const vSegments = 26; // Enine çözünürlük
    const geom = new THREE.BufferGeometry();

    const positions = [];
    const colors = [];
    const indices = [];

    // Parametrik Anatomik Ayak Tabanı & Gövdesi
    for (let i = 0; i <= uSegments; i++) {
        let u = i / uSegments; // 0 = Topuk, 1 = Parmaklar
        
        // Parmak bölgesinde asimetrik ayak ucu eğrisi (Başparmak önde, küçük parmak geride)
        // u = 1 noktası parmaklara karşılık gelir
        let baseLengthOffset = (u - 0.45) * length;

        for (let j = 0; j <= vSegments; j++) {
            let v = j / vSegments; // 0 = Sol (Negatif Z), 1 = Sağ (Pozitif Z)

            // =============================================================
            // KESİN ANATOMİK EŞLEŞTİRME (KULAKTAN DOLMA DEĞİL TIP REFERANSI)
            // =============================================================
            // SAĞ AYAKTA:  v = 0 (Sol) -> İÇ (MEDİAL)
            //              v = 1 (Sağ) -> DIŞ (LATERAL)
            // SOL AYAKTA:  v = 1 (Sağ) -> İÇ (MEDİAL)
            //              v = 0 (Sol) -> DIŞ (LATERAL)
            // =============================================================
            let medialFactor = isRight ? (1.0 - v) : v; // 1 = Tam Medial (İç), 0 = Tam Lateral (Dış)
            let lateralFactor = 1.0 - medialFactor;

            // Parmak boyu asimetrisi: Başparmak (Medial) daha uzun, küçük parmak (Lateral) daha geride
            let toeLengthBias = 0;
            if (u > 0.75) {
                let toeProg = (u - 0.75) / 0.25;
                toeLengthBias = (medialFactor * 10 - lateralFactor * 12) * toeProg;
            }
            let x = baseLengthOffset + toeLengthBias;

            // Enine genişlik profili (Tarak geniş, orta ayak dar, topuk oval)
            let widthScale = 1.0;
            if (u < 0.25) {
                // Topuk küresi
                widthScale = 0.65 + Math.sin(u / 0.25 * Math.PI / 2) * 0.25;
            } else if (u < 0.62) {
                // İstmus / Orta ayak kavisi (İçten içeriye doğru kavisli daralma)
                let archNarrowing = Math.sin((u - 0.25) / 0.37 * Math.PI) * 0.22 * medialFactor;
                widthScale = 0.82 - archNarrowing;
            } else if (u < 0.84) {
                // Tarak kemikleri (1. ve 5. metatars başı en geniş bölgedir)
                widthScale = 1.08;
            } else {
                // Parmak ucu kavisli toparlanma
                widthScale = 1.06 - (u - 0.84) * 1.5;
            }

            let y = (v - 0.5) * width * widthScale;

            // =============================================================
            // Z YÜKSEKLİK MODELİ (KAVİS ÇUKURU VE ANATOMİK TOPOLOJİ)
            // =============================================================
            let z = 0;

            // 1. Topuk Çukuru ve Doğal Yağ Yastıkçığı (Calcaneal Cup)
            if (u < 0.22) {
                let distHeel = Math.hypot(u - 0.12, v - 0.5);
                z += Math.max(0, 14.5 - distHeel * 44);
            }

            // 2. Medial Longitudinal Ark (İÇ KAVİS ÇUKURU - ASIL DÜZELTİLEN YER)
            // SADECE VE SADECE medialFactor'ün yüksek olduğu tarafta kabarmalıdır!
            if (u > 0.20 && u < 0.76 && medialFactor > 0.25) {
                let archU = Math.sin((u - 0.20) / 0.56 * Math.PI); // Boyuna kavis
                let archV = Math.pow((medialFactor - 0.25) / 0.75, 1.3); // Enine içe doğru yükseliş
                z += archH * archU * archV;
            }

            // 3. Lateral Ark (Dış Kenar / Küboid)
            // Dış kenar asla havaya kalkmaz; yere yakın, hafif stabil 3-5mm kalır
            if (u > 0.25 && u < 0.75 && lateralFactor > 0.5) {
                z += 3.5 * Math.sin((u - 0.25) / 0.5 * Math.PI) * ((lateralFactor - 0.5) / 0.5);
            }

            // 4. Metatarsal Yastık (Ön Ayak Kubbesi)
            if (u > 0.65 && u < 0.84 && v > 0.25 && v < 0.75) {
                z += 5.0 * Math.sin((u - 0.65) / 0.19 * Math.PI);
            }

            // 5. Parmak Ayrımı ve Bombe
            if (u > 0.85) {
                let toeWave = Math.sin(v * Math.PI * 4.5);
                z += Math.max(0, 4.0 * toeWave * (u - 0.85) / 0.15);
            }

            // Pronasyon / Supinasyon Eğim Açısı
            let postRad = (currentData.postingAngle * Math.PI) / 180;
            let tiltedZ = z + (y * Math.sin(postRad));

            // Three.js Koordinatları: X = Boy, Y = Yükseklik (Kavis), Z = En
            positions.push(x, tiltedZ, y);

            // Renklendirme (Isı Haritası vs Anatomik)
            let r = 0, g = 0, b = 0;
            if (currentRenderMode === 'heatmap') {
                let normZ = Math.min(1.0, Math.max(0.0, z / 26.0));
                if (normZ > 0.6) {
                    // İç Kavis Çukuru (Yüksek / Boşta olan yer): Koyu Mavi / Cyan
                    r = 0.05; g = 0.45 + (normZ - 0.6); b = 0.98;
                } else if (normZ > 0.3) {
                    // Orta geçiş: Yeşil / Sarı
                    r = 0.2; g = 0.88; b = 0.3;
                } else {
                    // Yere basan temas odakları (Topuk ve Tarak): Kırmızı / Turuncu
                    r = 0.95; g = 0.28; b = 0.18;
                }
            } else {
                // Doğal Anatomik Medikal Ton
                r = 0.89; g = 0.83; b = 0.76;
            }
            colors.push(r, g, b);
        }
    }

    // Üçgen Yüzeyleri Oluştur
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

    // Materyal
    let mat;
    if (currentRenderMode === 'wireframe') {
        mat = new THREE.MeshBasicMaterial({ color: 0x10b981, wireframe: true });
    } else if (currentRenderMode === 'heatmap') {
        mat = new THREE.MeshStandardMaterial({
            vertexColors: true,
            roughness: 0.38,
            metalness: 0.1,
            side: THREE.DoubleSide
        });
    } else {
        mat = new THREE.MeshStandardMaterial({
            color: 0xe2d4c7,
            roughness: 0.42,
            metalness: 0.05,
            side: THREE.DoubleSide
        });
    }

    footMesh = new THREE.Mesh(geom, mat);
    footMesh.castShadow = true;
    footMesh.receiveShadow = true;
    footScene.add(footMesh);

    // Anatomik Yön Etiketleri (3D Sahne İçi Göstergeler)
    createAnatomicalMarkers(isRight, width, archH);
}

// Sahneye "İÇ (MEDİAL) ARK" ve "DIŞ (LATERAL) KENAR" 3D Etiketleri Koy
function createAnatomicalMarkers(isRight, width, archH) {
    if (!footLabelGroup) return;

    // Medial kavis Z pozisyonu: Sağ ayakta negatif Z, Sol ayakta pozitif Z
    let medialZ = isRight ? -(width * 0.6) : (width * 0.6);
    let lateralZ = -medialZ;

    // 1. Medial Kavis Etiketi (Yeşil / Cyan Rozet)
    const medialBadge = create3DTextSprite("◀ İÇ (MEDİAL) KAVİS ÇUKURU", "#10b981");
    medialBadge.position.set(-10, archH + 6, medialZ);
    footLabelGroup.add(medialBadge);

    // 2. Lateral Dış Kenar Etiketi (Mavi Rozet)
    const lateralBadge = create3DTextSprite("DIŞ (LATERAL) KENAR ▶", "#64748b");
    lateralBadge.position.set(-10, 4, lateralZ);
    footLabelGroup.add(lateralBadge);

    // 3. Başparmak Yönü
    const toeBadge = create3DTextSprite(isRight ? "⇦ BAŞPARMAK (İÇ)" : "BAŞPARMAK (İÇ) ⇨", "#38bdf8");
    toeBadge.position.set(70, 8, isRight ? -25 : 25);
    footLabelGroup.add(toeBadge);
}

// 3D Canvas Üzerinde Yüzen Metin Sprite'ı Oluşturucu
function create3DTextSprite(text, colorHex) {
    const canvas = document.createElement('canvas');
    canvas.width = 360;
    canvas.height = 70;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
    ctx.roundRect(5, 5, 350, 60, 14);
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = colorHex;
    ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 20px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, 180, 35);

    const texture = new THREE.CanvasTexture(canvas);
    const spriteMat = new THREE.SpriteMaterial({ map: texture, transparent: true });
    const sprite = new THREE.Sprite(spriteMat);
    sprite.scale.set(45, 9, 1);
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

    // Seçilen ayağın kendi bağımsız verilerini slider'lara ve panele yükle
    loadFootDataToUI(side);

    // 3D Modeli yeniden çiz
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
        // İç yan kavis profili (Medial arkın altındaki boşluğu gösterir)
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

// Slider Değiştiğinde Modeli Canlı Güncelle
function onFootSliderChange() {
    const arch = parseFloat(document.getElementById('sliderArchHeight').value) || 18.5;
    const post = parseFloat(document.getElementById('sliderPosting').value) || 0.0;
    const len = parseFloat(document.getElementById('sliderFootLength').value) || 265;

    // Aktif ayağın verisini güncelle
    window.footDataStore[currentFootSide].archHeight = arch;
    window.footDataStore[currentFootSide].postingAngle = post;
    window.footDataStore[currentFootSide].footLength = len;

    document.getElementById('displayArchVal').innerText = arch.toFixed(1) + " mm";
    document.getElementById('displayPostingVal').innerText = (post > 0 ? "+" : "") + post.toFixed(1) + "°";
    
    let shoeSize = Math.round((len + 15) / 6.67);
    document.getElementById('displayLengthVal').innerText = `${len} mm (No: ${shoeSize})`;

    buildAnatomicalFootMesh();
}

// STL İndir (CNC için)
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
    // SAĞ AYAKTA Medial = v = 0 (1 - v), SOL AYAKTA Medial = v = 1 (v)
    let medial = isRight ? (1 - v) : v;
    if (u > 0.20 && u < 0.76 && medial > 0.25) {
        z += archH * Math.sin((u - 0.20) / 0.56 * Math.PI) * ((medial - 0.25) / 0.75);
    }
    return z;
}
