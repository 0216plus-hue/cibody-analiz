// =========================================================================
// CIBODY - 3D Ayak Tarayıcı (iPhone TrueDepth) Mobil İstemci Mantığı
// =========================================================================

const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');

let activeSide = 'right'; // 'right' veya 'left'
let scanData = {
    right: { file: null, name: null, size: null, arch: 18.5, length: 265 },
    left: { file: null, name: null, size: null, arch: 18.5, length: 265 }
};
let patientId = null;

// Sayfa yüklendiğinde oturumu doğrula
document.addEventListener('DOMContentLoaded', () => {
    checkTokenAuth();
});

async function checkTokenAuth() {
    const loadingSpinner = document.getElementById('loadingSpinner');
    const patientInfoBox = document.getElementById('patientInfoBox');
    const authErrorBox = document.getElementById('authErrorBox');
    const scanPanel = document.getElementById('scanPanel');

    if (!token) {
        loadingSpinner.classList.add('hidden');
        authErrorBox.classList.remove('hidden');
        document.getElementById('authErrorMsg').innerText = "Geçersiz bağlantı. Lütfen bilgisayar ekranındaki QR kodu tekrar okutun.";
        return;
    }

    try {
        const response = await fetch(`/api/foot_scan/auth/${token}`);
        loadingSpinner.classList.add('hidden');

        if (response.ok) {
            const data = await response.json();
            patientId = data.patient_id;
            document.getElementById('patientNameDisplay').innerText = data.patient_name || "Hasta";
            patientInfoBox.classList.remove('hidden');
            scanPanel.classList.remove('hidden');
        } else {
            const err = await response.json().catch(() => ({}));
            authErrorBox.classList.remove('hidden');
            document.getElementById('authErrorMsg').innerText = err.detail || "Bağlantının süresi dolmuş veya zaten kullanılmış.";
        }
    } catch (e) {
        loadingSpinner.classList.add('hidden');
        authErrorBox.classList.remove('hidden');
        document.getElementById('authErrorMsg').innerText = "Sunucuya bağlanılamadı. İnternet bağlantınızı kontrol edin.";
    }
}

// Ayak tarafı değiştir (Sağ / Sol)
function selectFootSide(side) {
    // Önceki girdileri kaydet
    saveCurrentInputs();

    activeSide = side;
    const tabRight = document.getElementById('tabRightFoot');
    const tabLeft = document.getElementById('tabLeftFoot');
    const currentFootTitle = document.getElementById('currentFootTitle');

    if (side === 'right') {
        tabRight.className = "py-2.5 rounded-lg text-xs font-bold transition-all bg-emerald-600 text-white shadow-sm flex items-center justify-center gap-1.5";
        tabLeft.className = "py-2.5 rounded-lg text-xs font-bold transition-all text-slate-400 hover:text-white flex items-center justify-center gap-1.5";
        currentFootTitle.innerText = "Sağ Ayak 3D Modeli";
    } else {
        tabLeft.className = "py-2.5 rounded-lg text-xs font-bold transition-all bg-emerald-600 text-white shadow-sm flex items-center justify-center gap-1.5";
        tabRight.className = "py-2.5 rounded-lg text-xs font-bold transition-all text-slate-400 hover:text-white flex items-center justify-center gap-1.5";
        currentFootTitle.innerText = "Sol Ayak 3D Modeli";
    }

    // Seçilen tarafın verilerini UI'a yükle
    updateFootCardUI();
}

function saveCurrentInputs() {
    const archVal = parseFloat(document.getElementById('archHeightInput').value) || 18.5;
    const lengthVal = parseFloat(document.getElementById('footLengthInput').value) || 265;
    scanData[activeSide].arch = archVal;
    scanData[activeSide].length = lengthVal;
}

function updateFootCardUI() {
    const current = scanData[activeSide];
    const footStatusBadge = document.getElementById('footStatusBadge');
    const scanPreviewText = document.getElementById('scanPreviewText');
    const modelFileInfo = document.getElementById('modelFileInfo');
    const fileNameDisplay = document.getElementById('fileNameDisplay');
    const fileSizeDisplay = document.getElementById('fileSizeDisplay');

    document.getElementById('archHeightInput').value = current.arch;
    document.getElementById('footLengthInput').value = current.length;

    if (current.file) {
        footStatusBadge.className = "text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40";
        footStatusBadge.innerText = "3D STL Hazır";
        scanPreviewText.classList.add('hidden');
        modelFileInfo.classList.remove('hidden');
        fileNameDisplay.innerText = current.name;
        fileSizeDisplay.innerText = (current.size / 1024).toFixed(1) + " KB";
    } else {
        footStatusBadge.className = "text-[10px] px-2 py-0.5 rounded-full font-bold bg-slate-800 text-slate-400 border border-slate-700";
        footStatusBadge.innerText = "Hazır Değil";
        scanPreviewText.classList.remove('hidden');
        modelFileInfo.classList.add('hidden');
    }
}

// iPhone dosya seçici ile STL/OBJ yükleme
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    scanData[activeSide].file = file;
    scanData[activeSide].name = file.name;
    scanData[activeSide].size = file.size;

    updateFootCardUI();
}

// Hızlı Test İçin Örnek Parametrik 3D STL Modeli Üret
function generateDemoModel() {
    const arch = parseFloat(document.getElementById('archHeightInput').value) || 18.5;
    const length = parseFloat(document.getElementById('footLengthInput').value) || 265;
    const isRight = activeSide === 'right';

    // Biyomekanik anatomik kavisli örnek 3D STL yüzeyi üretimi (ASCII STL)
    const stlContent = createParametricInsoleSTL(arch, length, isRight);
    const blob = new Blob([stlContent], { type: 'application/sla' });
    const fileName = `demo_${activeSide}_foot_insole_${arch}mm.stl`;

    scanData[activeSide].file = blob;
    scanData[activeSide].name = fileName;
    scanData[activeSide].size = blob.size;

    updateFootCardUI();
}

// Parametrik 3D Tabanlık / Ayak STL Geometrisi Üretici (Matematiksel Mesh)
function createParametricInsoleSTL(archHeight, footLength, isRight) {
    let stl = "solid InsoleModel\n";
    const width = footLength * 0.38; // Ortalama ayak genişliği
    const rows = 20;
    const cols = 10;

    // Yükseklik fonksiyonu (Topuk çanağı + Medial ark kubbesi + Metatars pedi)
    function getZ(u, v) {
        // u: 0 (topuk) -> 1 (parmak ucu)
        // v: 0 (dış kenar) -> 1 (iç kenar)
        let z = 3.0; // Taban kalınlığı

        // 1. Topuk Çukuru (u: 0.05 -> 0.25)
        if (u < 0.25) {
            let distFromHeelCenter = Math.hypot(u - 0.15, v - 0.5);
            z += Math.max(0, (0.35 - distFromHeelCenter) * 12);
        }

        // 2. Medial Ark (İç Kavis)
        let innerSide = isRight ? v : (1 - v); // Sağ veya Sol ayak iç kenarı
        if (u > 0.25 && u < 0.75 && innerSide > 0.4) {
            let archU = Math.sin((u - 0.25) / 0.5 * Math.PI);
            let archV = (innerSide - 0.4) / 0.6;
            z += archHeight * archU * archV;
        }

        // 3. Metatarsal Hafif Yükselti
        if (u > 0.6 && u < 0.8 && v > 0.3 && v < 0.7) {
            z += 4.5 * Math.sin((u - 0.6) / 0.2 * Math.PI);
        }

        return z;
    }

    // Üçgen yüzeyleri ör
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

            // 1. Üçgen
            stl += `  facet normal 0 0 1\n    outer loop\n`;
            stl += `      vertex ${x0.toFixed(2)} ${y0.toFixed(2)} ${z00.toFixed(2)}\n`;
            stl += `      vertex ${x1.toFixed(2)} ${y0.toFixed(2)} ${z10.toFixed(2)}\n`;
            stl += `      vertex ${x1.toFixed(2)} ${y1.toFixed(2)} ${z11.toFixed(2)}\n`;
            stl += `    endloop\n  endfacet\n`;

            // 2. Üçgen
            stl += `  facet normal 0 0 1\n    outer loop\n`;
            stl += `      vertex ${x0.toFixed(2)} ${y0.toFixed(2)} ${z00.toFixed(2)}\n`;
            stl += `      vertex ${x1.toFixed(2)} ${y1.toFixed(2)} ${z11.toFixed(2)}\n`;
            stl += `      vertex ${x0.toFixed(2)} ${y1.toFixed(2)} ${z01.toFixed(2)}\n`;
            stl += `    endloop\n  endfacet\n`;
        }
    }
    stl += "endsolid InsoleModel\n";
    return stl;
}

// Verileri Masaüstü Bilgisayara Gönder (Upload)
async function submitScanToDesktop() {
    saveCurrentInputs();

    if (!scanData.right.file && !scanData.left.file) {
        alert("Lütfen en az bir ayak için 3D STL taraması yapın veya örnek model oluşturun.");
        return;
    }

    const btn = document.getElementById('btnSubmitAll');
    btn.disabled = true;
    btn.innerHTML = `<i class="fa-solid fa-spinner animate-spin"></i> <span>Gönderiliyor...</span>`;

    const formData = new FormData();
    if (scanData.right.file) {
        formData.append('right_foot_stl', scanData.right.file, scanData.right.name || "right_foot.stl");
        formData.append('arch_height_right', scanData.right.arch);
        formData.append('foot_length_right', scanData.right.length);
    }
    if (scanData.left.file) {
        formData.append('left_foot_stl', scanData.left.file, scanData.left.name || "left_foot.stl");
        formData.append('arch_height_left', scanData.left.arch);
        formData.append('foot_length_left', scanData.left.length);
    }
    formData.append('notes', "iPhone TrueDepth 3D Tarama");

    try {
        const response = await fetch(`/api/foot_scan/upload/${token}`, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            document.getElementById('scanPanel').classList.add('hidden');
            document.getElementById('patientInfoBox').classList.add('hidden');
            document.getElementById('successPanel').classList.remove('hidden');
        } else {
            const err = await response.json().catch(() => ({}));
            alert("Gönderim başarısız: " + (err.detail || "Bilinmeyen hata"));
            btn.disabled = false;
            btn.innerHTML = `<i class="fa-solid fa-paper-plane"></i> <span>Tekrar Dene</span>`;
        }
    } catch (e) {
        alert("Sunucuya ulaşılamadı. Lütfen internetinizi kontrol edin.");
        btn.disabled = false;
        btn.innerHTML = `<i class="fa-solid fa-paper-plane"></i> <span>Tekrar Dene</span>`;
    }
}
