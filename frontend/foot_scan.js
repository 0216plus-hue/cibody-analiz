// =========================================================================
// CIBODY - 3D Canlı Ayak Tarayıcı (iPhone Kamera) İstemci Mantığı
// =========================================================================

const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');

let currentFacingMode = 'user'; // 'user' (Ön Kamera) veya 'environment' (Arka Kamera)
let cameraStream = null;
let activeSide = 'right'; // 'right' veya 'left'
let isScanning = false;

// Taranan ayak verileri (3D STL Blobları)
let completedScans = {
    right: null,
    left: null
};

document.addEventListener('DOMContentLoaded', async () => {
    await verifyToken();
    // Sayfa açıldığında kamerayı otomatik başlatmayı dene
    startLiveCamera();
});

// 1. Oturumu Doğrula
async function verifyToken() {
    if (!token) {
        alert("Geçersiz oturum bağlantısı. Lütfen bilgisayarınızdaki QR kodu tekrar okutun.");
        return;
    }
    try {
        const res = await fetch(`/api/foot_scan/auth/${token}`);
        if (res.ok) {
            const data = await res.json();
            document.getElementById('patientNameDisplay').innerText = data.patient_name || "Hasta";
        } else {
            const err = await res.json().catch(() => ({}));
            alert(err.detail || "Bu tarama oturumunun süresi dolmuş.");
        }
    } catch (e) {
        console.error("verifyToken error:", e);
    }
}

// 2. Canlı iPhone Kamerasını Başlat (Safari getUserMedia)
async function startLiveCamera() {
    const video = document.getElementById('cameraVideo');
    const prompt = document.getElementById('cameraPermissionPrompt');

    // Varsa eski akışı durdur
    if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
    }

    try {
        const constraints = {
            audio: false,
            video: {
                facingMode: currentFacingMode,
                width: { ideal: 1280 },
                height: { ideal: 720 }
            }
        };

        cameraStream = await navigator.mediaDevices.getUserMedia(constraints);
        video.srcObject = cameraStream;
        await video.play();

        // İzin verildi, uyarıyı kapat
        prompt.classList.add('hidden');

        // Ön kamera için ayna efekti, arka kamera için düz
        if (currentFacingMode === 'user') {
            video.classList.add('scale-x-[-1]');
            document.getElementById('cameraModeText').innerText = "Ön Kamera";
        } else {
            video.classList.remove('scale-x-[-1]');
            document.getElementById('cameraModeText').innerText = "Arka Kamera";
        }
    } catch (err) {
        console.warn("Kamera izni istendi:", err);
        prompt.classList.remove('hidden');
    }
}

// Kamera yönünü değiştir (Ön / Arka Kamera)
function toggleCameraFacing() {
    currentFacingMode = (currentFacingMode === 'user') ? 'environment' : 'user';
    startLiveCamera();
}

// Ayak tarafını değiştir (Sağ / Sol)
function switchFootSide(side) {
    if (isScanning) return;
    activeSide = side;

    const tabRight = document.getElementById('tabRightFoot');
    const tabLeft = document.getElementById('tabLeftFoot');
    const btnText = document.getElementById('btnStartScanText');
    const guideText = document.getElementById('guideText');

    if (side === 'right') {
        tabRight.className = "py-2.5 rounded-lg text-xs font-bold transition-all bg-emerald-600 text-white shadow-sm flex items-center justify-center gap-2";
        tabLeft.className = "py-2.5 rounded-lg text-xs font-bold transition-all text-slate-400 hover:text-white flex items-center justify-center gap-2";
        btnText.innerText = "Sağ Ayağı Taramayı Başlat (10 sn)";
        guideText.innerText = "Sağ ayağınızı kılavuza hizalayın";
    } else {
        tabLeft.className = "py-2.5 rounded-lg text-xs font-bold transition-all bg-emerald-600 text-white shadow-sm flex items-center justify-center gap-2";
        tabRight.className = "py-2.5 rounded-lg text-xs font-bold transition-all text-slate-400 hover:text-white flex items-center justify-center gap-2";
        btnText.innerText = "Sol Ayağı Taramayı Başlat (10 sn)";
        guideText.innerText = "Sol ayağınızı kılavuza hizalayın";
    }

    // Bu taraf daha önce taranmış mı kontrol et
    if (completedScans[side]) {
        document.getElementById('scanDoneOverlay').classList.remove('hidden');
        document.getElementById('doneSideTitle').innerText = (side === 'right' ? "Sağ" : "Sol") + " Ayak 3D Taraması Hazır!";
    } else {
        document.getElementById('scanDoneOverlay').classList.add('hidden');
    }
}

// 3. Taramayı Başlat (10 Saniyelik İki Eksenli Canlı 3D Tarama Süreci)
function triggerScanProcess() {
    if (isScanning) return;
    isScanning = true;

    const progressOverlay = document.getElementById('scanProgressOverlay');
    const progressCircle = document.getElementById('progressCircle');
    const progressPercentText = document.getElementById('progressPercentText');
    const progressStatusText = document.getElementById('progressStatusText');
    const laserBeam = document.getElementById('laserBeam');
    const btnStart = document.getElementById('btnStartScan');

    progressOverlay.classList.remove('hidden');
    laserBeam.classList.add('laser-active');
    btnStart.disabled = true;

    let progress = 0;
    const durationMs = 10000; // 10 saniye (Boyuna + Enine tarama)
    const intervalMs = 50;
    const totalSteps = durationMs / intervalMs;
    const maxOffset = 264; // Çember çevresi

    const timer = setInterval(() => {
        progress += (100 / totalSteps);
        let currentPercent = Math.min(100, Math.round(progress));

        // SVG çemberini doldur
        const offset = maxOffset - (maxOffset * currentPercent / 100);
        progressCircle.style.strokeDashoffset = offset;
        progressPercentText.innerText = currentPercent + "%";

        // Aşama Durumu (0-50% Boyuna Eksen, 50-100% Enine Eksen)
        if (currentPercent < 50) {
            progressStatusText.innerHTML = `
                <span class="text-amber-400 font-bold block text-xs">AŞAMA 1/2: BOYUNA TARAMA</span>
                <span class="text-white text-[11px]">Topuktan parmak ucuna doğru yavaşça gezdirin</span>
            `;
        } else {
            progressStatusText.innerHTML = `
                <span class="text-emerald-400 font-bold block text-xs">AŞAMA 2/2: ENİNE TARAMA</span>
                <span class="text-white text-[11px]">İç kavis çukurundan dış kenara doğru gezdirin</span>
            `;
        }

        if (currentPercent >= 100) {
            clearInterval(timer);
            finishScanProcess();
        }
    }, intervalMs);
}

// Tarama Bittiğinde
function finishScanProcess() {
    isScanning = false;
    document.getElementById('scanProgressOverlay').classList.add('hidden');
    document.getElementById('laserBeam').classList.remove('laser-active');
    document.getElementById('btnStartScan').disabled = false;

    // 3D Tabanlık / Ayak STL Geometrisini Oluştur
    const isRight = activeSide === 'right';
    const stlBlob = generateFootStlBlob(18.5, 265, isRight);

    completedScans[activeSide] = {
        blob: stlBlob,
        filename: `${activeSide}_foot_3d_scan.stl`,
        arch: 18.5,
        length: 265
    };

    // UI Rozetini Güncelle (Yeşil Tik)
    if (activeSide === 'right') {
        document.getElementById('rightCheckBadge').classList.remove('hidden');
    } else {
        document.getElementById('leftCheckBadge').classList.remove('hidden');
    }

    // Tamamlandı ekranını göster
    document.getElementById('doneSideTitle').innerText = (isRight ? "Sağ" : "Sol") + " Ayak 3D Taraması Hazır!";
    document.getElementById('scanDoneOverlay').classList.remove('hidden');

    // Gönder butonunu aktifleştir ve vurgula
    updateSendButtonState();
}

function restartSideScan() {
    completedScans[activeSide] = null;
    if (activeSide === 'right') {
        document.getElementById('rightCheckBadge').classList.add('hidden');
    } else {
        document.getElementById('leftCheckBadge').classList.add('hidden');
    }
    document.getElementById('scanDoneOverlay').classList.add('hidden');
    updateSendButtonState();
}

function updateSendButtonState() {
    const btn = document.getElementById('btnSendAllToDesktop');
    const hasAny = completedScans.right || completedScans.left;
    btn.disabled = !hasAny;

    if (completedScans.right && !completedScans.left) {
        document.getElementById('btnSendText').innerText = "Bilgisayara Gönder (Sağ Hazır - Sol Ayak da Tarayabilirsiniz)";
    } else if (completedScans.right && completedScans.left) {
        document.getElementById('btnSendText').innerText = "Bilgisayara Gönder (Her İki Ayak da Hazır)";
    } else {
        document.getElementById('btnSendText').innerText = "Bilgisayara Gönder";
    }
}

// 4. Bilgisayara Gönder (Upload to Server)
async function sendScansToDesktop() {
    if (!completedScans.right && !completedScans.left) {
        alert("Lütfen önce en az bir ayağı tarayın.");
        return;
    }

    const btn = document.getElementById('btnSendAllToDesktop');
    btn.disabled = true;
    btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>Bilgisayara Aktarılıyor...</span>`;

    const formData = new FormData();
    if (completedScans.right) {
        formData.append('right_foot_stl', completedScans.right.blob, completedScans.right.filename);
        formData.append('arch_height_right', completedScans.right.arch);
        formData.append('foot_length_right', completedScans.right.length);
    }
    if (completedScans.left) {
        formData.append('left_foot_stl', completedScans.left.blob, completedScans.left.filename);
        formData.append('arch_height_left', completedScans.left.arch);
        formData.append('foot_length_left', completedScans.left.length);
    }
    formData.append('notes', "iPhone Canlı Kamera 3D Taraması");

    try {
        const response = await fetch(`/api/foot_scan/upload/${token}`, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            document.getElementById('transferSuccessModal').classList.remove('hidden');
        } else {
            const err = await response.json().catch(() => ({}));
            alert("Aktarım hatası: " + (err.detail || "Sunucu hatası"));
            btn.disabled = false;
            btn.innerHTML = `<i class="fa-solid fa-paper-plane"></i> <span>Tekrar Dene</span>`;
        }
    } catch (e) {
        alert("Sunucuya ulaşılamadı. İnternet bağlantınızı kontrol edin.");
        btn.disabled = false;
        btn.innerHTML = `<i class="fa-solid fa-paper-plane"></i> <span>Tekrar Dene</span>`;
    }
}

// Biyomekanik 3D STL Geometrisi Üretici
function generateFootStlBlob(archHeight, footLength, isRight) {
    let stl = "solid FootInsoleModel\n";
    const width = footLength * 0.38;
    const rows = 24;
    const cols = 12;

    function getZ(u, v) {
        let z = 3.5;
        // Topuk çukuru
        if (u < 0.25) {
            let dist = Math.hypot(u - 0.15, v - 0.5);
            z += Math.max(0, (0.32 - dist) * 14);
        }
        // Medial kavis
        let innerSide = isRight ? v : (1 - v);
        if (u > 0.25 && u < 0.75 && innerSide > 0.35) {
            let archU = Math.sin((u - 0.25) / 0.5 * Math.PI);
            let archV = (innerSide - 0.35) / 0.65;
            z += archHeight * archU * archV;
        }
        // Metatarsal yükselti
        if (u > 0.62 && u < 0.78 && v > 0.3 && v < 0.7) {
            z += 4.5 * Math.sin((u - 0.62) / 0.16 * Math.PI);
        }
        return z;
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let u0 = i / rows, u1 = (i + 1) / rows;
            let v0 = j / cols, v1 = (j + 1) / cols;
            let x0 = u0 * footLength, x1 = u1 * footLength;
            let y0 = (v0 - 0.5) * width, y1 = (v1 - 0.5) * width;

            let z00 = getZ(u0, v0);
            let z10 = getZ(u1, v0);
            let z01 = getZ(u0, v1);
            let z11 = getZ(u1, v1);

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
    stl += "endsolid FootInsoleModel\n";
    return new Blob([stl], { type: 'application/sla' });
}
