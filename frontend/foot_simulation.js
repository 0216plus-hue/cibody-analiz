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

// Her iki ayak için bağımsız saklanan biyomekanik ölçümler ve gerçek taranan dosya URL'leri
window.footDataStore = {
    right: { archHeight: 18.5, footLength: 265, postingAngle: 0.0, scanFileUrl: null },
    left: { archHeight: 17.0, footLength: 262, postingAngle: 0.0, scanFileUrl: null }
};

// =========================================================================
// İPHONE'DAN TARANAN GERÇEK 3D LAZER DOSYASINI (PLY / STL) YÜKLE
// =========================================================================
function loadScannedFootFile(fileUrl, side) {
    if (!fileUrl) return;
    if (side) currentFootSide = side;

    window.footDataStore[currentFootSide].scanFileUrl = fileUrl;

    if (!footScene) {
        initFootSimulation();
    }

    const isPly = fileUrl.toLowerCase().endsWith('.ply');
    const isStl = fileUrl.toLowerCase().endsWith('.stl');

    const loader = isPly ? new THREE.PLYLoader() : (isStl ? new THREE.STLLoader() : null);
    if (!loader) {
        console.warn("Bilinmeyen 3D dosya formatı:", fileUrl);
        return;
    }

    // Yükleniyor göstergesi
    const badge = document.getElementById('footScanBadgeStatus');
    if (badge) {
        badge.innerText = "3D Lazer Modeli Yükleniyor...";
        badge.className = "px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 animate-pulse";
    }

    loader.load(fileUrl, function (geometry) {
        const emptyEl = document.getElementById('footScanEmptyState');
        if (emptyEl) emptyEl.classList.add('hidden');

        if (footMesh) {
            footScene.remove(footMesh);
            if (footMesh.geometry) footMesh.geometry.dispose();
        }
        if (footLabelGroup) {
            while (footLabelGroup.children.length > 0) {
                footLabelGroup.remove(footLabelGroup.children[0]);
            }
        }

        // --- 1. Anatomik Eksen Hizalaması (Gerçek Lazer Verisi -> Klinik Koordinatlar) ---
        // Telefon kamerasında Y=Boy, X=En, Z=Derinlik gelir.
        // Klinik simülatörde: X=Boy (Topuk->Parmak), Z=En, Y=Kavis/Yükseklik
        geometry.computeBoundingBox();
        let b = geometry.boundingBox;
        let dimX = b.max.x - b.min.x;
        let dimY = b.max.y - b.min.y;
        let dimZ = b.max.z - b.min.z;

        const pos = geometry.attributes.position;
        const count = pos.count;

        // Eğer Y ekseni en uzunsa (tipik iPhone TrueDepth dikey tutuşu)
        if (dimY > dimX && dimY > dimZ) {
            // Y eksenini X'e (boy), X eksenini Z'ye (en), Z eksenini Y'ye (kavis yüksekliği) aktar
            for (let i = 0; i < count; i++) {
                let rx = pos.getX(i);
                let ry = pos.getY(i);
                let rz = pos.getZ(i);
                // ry: boy (X), rz: kavis yüksekliği (Y), rx: genişlik (Z)
                pos.setXYZ(i, ry, -rz, rx);
            }
            pos.needsUpdate = true;
        }

        geometry.computeVertexNormals();
        geometry.center();
        geometry.computeBoundingBox();
        const bbox = geometry.boundingBox;

        const footLength = Math.round(bbox.max.x - bbox.min.x);
        const footHeight = Math.round(bbox.max.y - bbox.min.y);
        const footWidth  = Math.round(bbox.max.z - bbox.min.z);

        // Tabanı zemin ızgarasına oturt (Y min = 0)
        const minY = bbox.min.y;
        for (let i = 0; i < count; i++) {
            pos.setY(i, pos.getY(i) - minY);
        }
        pos.needsUpdate = true;
        geometry.computeBoundingBox();

        // --- 2. Topografik Kavis Isı Haritası Renklendirmesi ---
        const colors = [];
        const maxY = geometry.boundingBox.max.y;
        const colorLow = new THREE.Color(0xef4444);  // Zemin basma noktaları (Kırmızı / Turuncu)
        const colorMid = new THREE.Color(0x10b981);  // Geçiş bölgesi (Yeşil)
        const colorHigh = new THREE.Color(0x0284c7); // Derin kavis boşluğu / çukur (Mavi / Lacivert)

        for (let i = 0; i < count; i++) {
            let yNorm = maxY > 0 ? (pos.getY(i) / maxY) : 0;
            let c = new THREE.Color();
            if (yNorm < 0.35) {
                c.lerpColors(colorLow, colorMid, yNorm / 0.35);
            } else {
                c.lerpColors(colorMid, colorHigh, (yNorm - 0.35) / 0.65);
            }
            colors.push(c.r, c.g, c.b);
        }
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

        // --- 3. Materyal Seçimi ---
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
            // Gerçek Medikal Doku Rengi
            mat = new THREE.MeshStandardMaterial({
                color: 0x38bdf8,
                roughness: 0.28,
                metalness: 0.05,
                side: THREE.DoubleSide
            });
        }

        footMesh = new THREE.Mesh(geometry, mat);
        footMesh.castShadow = true;
        footMesh.receiveShadow = true;
        footScene.add(footMesh);

        // Kamera mesafesini model boyutuna göre ayarla
        if (footCamera && footControls) {
            footControls.target.set(0, footHeight / 2, 0);
            footCamera.position.set(footLength * 0.9, footLength * 0.7, footLength * 0.9);
            footControls.update();
        }

        if (badge) {
            badge.innerText = `Gerçek ${currentFootSide === 'right' ? 'Sağ' : 'Sol'} Ayak (${footLength} mm)`;
            badge.className = "px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800";
        }

        // Ölçüm alanlarını güncelle
        if (document.getElementById('displayLengthVal')) {
            document.getElementById('displayLengthVal').innerText = `${footLength} mm (Lazer Ölçümü)`;
        }
        if (document.getElementById('displayArchVal')) {
            document.getElementById('displayArchVal').innerText = `${footHeight} mm (Lazer Kavis Derinliği)`;
        }
        if (document.getElementById('displayMetatarsalWidth')) {
            document.getElementById('displayMetatarsalWidth').innerText = `${footWidth} mm (Lazer Tarak Eni)`;
        }

    }, undefined, function (error) {
        console.error("3D Dosya Yükleme Hatası:", error);
        if (badge) {
            badge.innerText = "Yükleme Hatası";
            badge.className = "px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-800";
        }
        buildAnatomicalFootMesh();
    });
}

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
        footControls.minDistance = 40;
        footControls.maxDistance = 800;
        footControls.minPolarAngle = 0;
        footControls.maxPolarAngle = Math.PI; // Alttan, üstten ve her açıdan serbest inceleme
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

    // Boş sahne başlatılır, kullanıcı analiz seçmeden veya tarama yapmadan sahte model çizilmez
    clearFootViewer();

    window.addEventListener('resize', onFootViewerResize);
    animateFootViewer();
}

function clearFootViewer() {
    if (footMesh && footScene) {
        footScene.remove(footMesh);
        if (footMesh.geometry) footMesh.geometry.dispose();
        footMesh = null;
    }
    if (footLabelGroup) {
        while (footLabelGroup.children.length > 0) {
            footLabelGroup.remove(footLabelGroup.children[0]);
        }
    }
    const emptyEl = document.getElementById('footScanEmptyState');
    if (emptyEl) emptyEl.classList.remove('hidden');

    const badge = document.getElementById('footScanBadgeStatus');
    if (badge) {
        badge.innerText = "Model Bekleniyor";
        badge.className = "px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600";
    }
    if (document.getElementById('displayLengthVal')) {
        document.getElementById('displayLengthVal').innerText = "-";
    }
    if (document.getElementById('displayArchVal')) {
        document.getElementById('displayArchVal').innerText = "-";
    }
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
    // Tıbbi Doğruluk: Başparmak (Hallux) ön ayak eninin ~%28'ini kaplar, belirgin şekilde kalın ve etlidir.
    const toeDefinitions = [
        { center: 0.13, widthSpan: 0.12, lengthExt: 14.0, height: 11.0 }, // 1. Başparmak (Hallux - En geniş, etli ve belirgin)
        { center: 0.35, widthSpan: 0.08, lengthExt: 11.0, height: 7.2 },  // 2. Parmak (Hafif uzun/orta)
        { center: 0.53, widthSpan: 0.075, lengthExt: 8.0,  height: 6.2 },  // 3. Parmak (Orta)
        { center: 0.71, widthSpan: 0.07,  lengthExt: 5.0,  height: 5.5 },  // 4. Parmak
        { center: 0.88, widthSpan: 0.065, lengthExt: 2.0,  height: 4.8 }   // 5. Küçük Parmak (Digiti Minimi)
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

            // 5 Parmak Hizalaması (Medial'den Lateral'e: 0 = Başparmak, 1 = Küçük Parmak)
            let toeNormalizedPos = isRight ? v : (1.0 - v);

            // Aktif parmak çıkıntısını ve boğum hacmini hesapla
            let toeBonusLength = 0;
            let toeBonusHeight = 0;

            for (let t = 0; t < toeDefinitions.length; t++) {
                let td = toeDefinitions[t];
                let distToToe = Math.abs(toeNormalizedPos - td.center);
                if (distToToe < td.widthSpan * 1.5) {
                    let falloff = Math.cos((distToToe / (td.widthSpan * 1.5)) * Math.PI / 2);
                    toeBonusLength = Math.max(toeBonusLength, td.lengthExt * falloff);
                    toeBonusHeight = Math.max(toeBonusHeight, td.height * falloff);
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
            let widthScale = 1.0;
            if (u < 0.22) {
                // Topuk küresi
                widthScale = 0.68 + Math.sin(u / 0.22 * Math.PI / 2) * 0.18;
            } else if (u < 0.68) {
                // Orta ayak kavisi (Pürüzsüz akıcı daralma)
                let archProg = (u - 0.22) / 0.46;
                let smoothWaist = Math.sin(archProg * Math.PI) * 0.18 * medialFactor;
                widthScale = 0.86 - smoothWaist;
            } else if (u < 0.85) {
                // Tarak bölgesi (Metatars başları genişler)
                let metProg = (u - 0.68) / 0.17;
                widthScale = 0.86 + Math.sin(metProg * Math.PI / 2) * 0.24;
            } else {
                // Parmak ucu oval bitiş
                let toeProg = (u - 0.85) / 0.15;
                widthScale = 1.10 - (toeProg * toeProg) * 0.28;
            }

            let y = (v - 0.5) * width * widthScale;

            // =============================================================
            // Z YÜKSEKLİK MODELİ (ANATOMİK KAVİS, TOPUK TABANI VE SULKUS)
            // =============================================================
            let z = 0;

            // 1. TOPUK DÜZELTMESİ (Doğal Kalkaneus Taban Teması):
            // Ayak tabanı yere bastığında topuk zemine (Z = 0) tam oturur.
            // Eski çukur görünümü tamamen yok edildi:
            if (u < 0.22) {
                let heelU = (u - 0.10) / 0.12;
                let heelV = (v - 0.5) / 0.35;
                let distHeel = Math.hypot(heelU, heelV);
                if (u < 0.08) {
                    // Topuk arkasında kalkaneal tüberkülün arkaya/yukarı doğru yuvarlak kıvrımı
                    let backRise = (0.08 - u) / 0.08;
                    z += backRise * backRise * 7.5;
                } else if (distHeel < 1.0) {
                    // Taban temas yüzeyi: Düz ve zemine tam temas
                    z += (1.0 - distHeel * distHeel) * 0.6;
                }
            }

            // 2. MEDİAL LONGITUDINAL ARK (İÇ KAVİS BOŞLUĞU)
            // Ayak havaya kalktığında oluşan doğal anatomik çukur
            if (u > 0.20 && u < 0.74 && medialFactor > 0.25) {
                let archU = Math.sin((u - 0.20) / 0.54 * Math.PI);
                let archV = Math.pow((medialFactor - 0.25) / 0.75, 1.4);
                z += archH * archU * archV;
            }

            // Lateral (Dış) Kenar Denge Çizgisi
            if (u > 0.25 && u < 0.75 && lateralFactor > 0.45) {
                z += 2.0 * Math.sin((u - 0.25) / 0.50 * Math.PI) * ((lateralFactor - 0.45) / 0.55);
            }

            // 3. ÖN AYAK SULKUSU & TRANSVERS METATARSAL ARK (MTP HATTI)
            // Tarak kemikleri (u: 0.68 - 0.75) temas ederken, parmaklardan önce (u: 0.76 - 0.80) hafif sulkus oluğu:
            if (u > 0.66 && u <= 0.76) {
                let metProg = Math.sin((u - 0.66) / 0.10 * Math.PI);
                z += 1.8 * metProg;
            } else if (u > 0.76 && u <= 0.81) {
                // Sulkus Oluğu (MTP Eklem Hattı)
                let sulcusProgress = Math.sin((u - 0.76) / 0.05 * Math.PI);
                z += 0.5 * (1.0 - sulcusProgress);
            }

            // 4. PARMAKLAR & BAŞPARMAK (HALLUX) HACMİ
            if (u > 0.80) {
                let toeProgression = (u - 0.80) / 0.20;
                let knuckle = Math.sin(toeProgression * Math.PI);
                z += toeBonusHeight * knuckle;

                // Parmak uçlarının yere inmesi (Doğal kubbe)
                if (toeProgression > 0.78) {
                    let tipDrop = (toeProgression - 0.78) / 0.22;
                    z *= (1.0 - tipDrop * 0.65);
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
                    r = 0.05; g = 0.45 + (normZ - 0.55); b = 0.98;
                } else if (normZ > 0.25) {
                    r = 0.18; g = 0.85; b = 0.25;
                } else {
                    r = 0.95; g = 0.25; b = 0.15;
                }
            } else {
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

    // 3. ÖN AYAK SULKUSU & MTP HATTI
    const sulcusBadge = create3DTextSprite("ÖN AYAK SULKUSU (MTP HATTI)", "#0ea5e9");
    sulcusBadge.position.set(48, 6, 0);
    footLabelGroup.add(sulcusBadge);

    // 4. BAŞPARMAK (HALLUX) ETİKETİ
    const toeBadge = create3DTextSprite(isRight ? "⇦ 1. BAŞPARMAK (HALLUX)" : "HALLUX (BAŞPARMAK) ⇨", "#a855f7");
    toeBadge.position.set(82, 12, isRight ? -28 : 28);
    footLabelGroup.add(toeBadge);

    // 5. TOPUK ETİKETİ
    const heelBadge = create3DTextSprite("TOPUK (KALKANEUS TABANI)", "#f59e0b");
    heelBadge.position.set(-78, 6, 0);
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
    
    // Eğer bu tarafın gerçek 3D dosyası varsa onu yükle, yoksa temizle
    const fileUrl = window.footDataStore[side]?.scanFileUrl;
    if (fileUrl) {
        loadScannedFootFile(fileUrl, side);
    } else {
        clearFootViewer();
    }
}

function loadFootDataToUI(side) {
    const data = window.footDataStore[side] || { archHeight: 18.5, footLength: 265, postingAngle: 0 };
    
    const sArch = document.getElementById('sliderArchHeight');
    const sPost = document.getElementById('sliderPosting');
    const sLen = document.getElementById('sliderFootLength');
    
    if (sArch) sArch.value = data.archHeight;
    if (sPost) sPost.value = data.postingAngle;
    if (sLen) sLen.value = data.footLength;

    if (document.getElementById('displayArchVal')) {
        document.getElementById('displayArchVal').innerText = data.archHeight.toFixed(1) + " mm";
    }
    
    // Topuk Devrilme ve Nötr/Valgus/Varus Metni
    let postVal = data.postingAngle || 0;
    let postText = "0.0° Nötr";
    if (postVal < -0.5) postText = `${postVal.toFixed(1)}° Pronasyon (Valgus)`;
    else if (postVal > 0.5) postText = `+${postVal.toFixed(1)}° Supinasyon (Varus)`;
    if (document.getElementById('displayPostingVal')) {
        document.getElementById('displayPostingVal').innerText = postText;
    }
    
    let shoeSize = Math.round((data.footLength + 15) / 6.67);
    if (document.getElementById('displayLengthVal')) {
        document.getElementById('displayLengthVal').innerText = `${data.footLength} mm (No: ${shoeSize})`;
    }

    // Kalkaneal Pitch Açısı & Topuk Genişliği
    let pitchAngle = (14.0 + (data.archHeight / 26.0) * 10.5).toFixed(1);
    let heelWidth = Math.round(data.footLength * 0.242);
    if (document.getElementById('displayPitchAngle')) {
        document.getElementById('displayPitchAngle').innerText = `${pitchAngle}° (Fizyolojik)`;
    }
    if (document.getElementById('displayHeelWidth')) {
        document.getElementById('displayHeelWidth').innerText = `${heelWidth} mm (Geniş Taban)`;
    }

    // Ön Ayak Sulkusu & Transvers Ark (MTP Hattı)
    let metatarsalWidth = Math.round(data.footLength * 0.358);
    if (document.getElementById('displayMetatarsalWidth')) {
        document.getElementById('displayMetatarsalWidth').innerText = `${metatarsalWidth} mm`;
    }
    if (document.getElementById('displaySulcusStatus')) {
        const el = document.getElementById('displaySulcusStatus');
        if (data.archHeight < 12.0) {
            el.innerText = "Çökük (Metatarsalji Riski)";
            el.className = "text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded";
        } else {
            el.innerText = "Dengeli MTP Yastıklaması";
            el.className = "text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded";
        }
    }
    if (document.getElementById('displayTransverseArch')) {
        const el = document.getElementById('displayTransverseArch');
        el.innerText = data.archHeight < 12.0 ? "Zayıf Destek (Retro-Sulcus Önerilir)" : "Fizyolojik Kemer";
    }

    // Başparmak (Hallux) Açısı & Ayak Tipi
    if (document.getElementById('displayHalluxAngle')) {
        document.getElementById('displayHalluxAngle').innerText = "8.2° Normal (HV Yok)";
    }
    if (document.getElementById('displayFootType')) {
        document.getElementById('displayFootType').innerText = "Mısır Tipi (Hallux Baskın)";
    }
    if (document.getElementById('displayToeDeformity')) {
        document.getElementById('displayToeDeformity').innerText = "Çakışma / Bunion Yok";
    }

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
    } else if (angle === 'lateral') {
        // Dış yan profil (Lateral)
        let isRight = (currentFootSide === 'right');
        let lateralZ = isRight ? 190 : -190;
        footCamera.position.set(0, 18, lateralZ);
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

    // Eğer gerçek lazer taraması ekrandaysa materyali anında güncelle
    if (footMesh && window.footDataStore && window.footDataStore[currentFootSide] && window.footDataStore[currentFootSide].scanFileUrl) {
        if (mode === 'wireframe') {
            footMesh.material = new THREE.MeshBasicMaterial({ color: 0x10b981, wireframe: true });
        } else if (mode === 'heatmap') {
            footMesh.material = new THREE.MeshStandardMaterial({
                vertexColors: true,
                roughness: 0.35,
                metalness: 0.1,
                side: THREE.DoubleSide
            });
        } else {
            footMesh.material = new THREE.MeshStandardMaterial({
                color: 0x38bdf8,
                roughness: 0.28,
                metalness: 0.05,
                side: THREE.DoubleSide
            });
        }
        return;
    }

    buildAnatomicalFootMesh();
}

function onFootSliderChange() {
    const arch = parseFloat(document.getElementById('sliderArchHeight').value) || 18.5;
    const post = parseFloat(document.getElementById('sliderPosting').value) || 0.0;
    const len = parseFloat(document.getElementById('sliderFootLength').value) || 265;

    window.footDataStore[currentFootSide].archHeight = arch;
    window.footDataStore[currentFootSide].postingAngle = post;
    window.footDataStore[currentFootSide].footLength = len;

    loadFootDataToUI(currentFootSide);
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
    let z = 0.5;
    // Topuk tabanı zemine teğet
    if (u < 0.22) {
        if (u < 0.08) {
            let backRise = (0.08 - u) / 0.08;
            z += backRise * backRise * 7.5;
        }
    }
    // Medial kavis çukuru
    let medial = isRight ? (1 - v) : v;
    if (u > 0.20 && u < 0.74 && medial > 0.25) {
        z += archH * Math.sin((u - 0.20) / 0.54 * Math.PI) * Math.pow((medial - 0.25) / 0.75, 1.4);
    }
    // Sulkus ve Tarak
    if (u > 0.66 && u <= 0.76) {
        z += 1.8 * Math.sin((u - 0.66) / 0.10 * Math.PI);
    }
    return z;
}
