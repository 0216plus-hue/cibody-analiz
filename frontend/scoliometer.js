const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');

let currentAngle = 0;
let thoracicSaved = null;
let lumbarSaved = null;
let patientId = null;

async function checkAuth() {
    if(!token) {
        document.getElementById('authStatus').innerText = "Geçersiz bağlantı. QR kodu tekrar okutun.";
        document.getElementById('authStatus').className = "text-red-400 text-sm mb-8";
        return;
    }
    
    try {
        const res = await fetch(`/api/scoliometer/auth/${token}`);
        if(res.ok) {
            const data = await res.json();
            patientId = data.patient_id;
            document.getElementById('patientName').innerText = data.patient_name;
            
            document.getElementById('authStatus').innerText = "Bağlantı başarılı! Cihaz sensörleri için izin gerekiyor.";
            document.getElementById('authStatus').className = "text-emerald-400 text-sm mb-8";
            document.getElementById('btnStart').classList.remove('hidden');
        } else {
            const err = await res.json();
            document.getElementById('authStatus').innerText = err.detail || "Bağlantı süresi dolmuş.";
            document.getElementById('authStatus').className = "text-red-400 text-sm mb-8";
        }
    } catch(e) {
        document.getElementById('authStatus').innerText = "Sunucuya ulaşılamıyor.";
    }
}

document.getElementById('btnStart').addEventListener('click', async () => {
    // iOS 13+ requires explicit permission
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        try {
            const permissionState = await DeviceOrientationEvent.requestPermission();
            if (permissionState === 'granted') {
                startSensors();
            } else {
                alert("Sensör izni reddedildi.");
            }
        } catch (error) {
            console.error(error);
            alert("Sensör izni alınamadı.");
        }
    } else {
        // Non iOS 13+ devices
        startSensors();
    }
});

function startSensors() {
    document.getElementById('authScreen').classList.add('hidden');
    document.getElementById('measureScreen').classList.remove('hidden');
    document.getElementById('measureScreen').classList.add('flex');
    
    window.addEventListener('deviceorientation', handleOrientation);
}

function handleOrientation(event) {
    // gamma is the left-to-right tilt in degrees, where right is positive
    let gamma = event.gamma;
    
    // Clamp to -30 to 30 for the UI bubble
    if(gamma > 30) gamma = 30;
    if(gamma < -30) gamma = -30;
    
    currentAngle = Math.round(event.gamma || 0);
    
    // Update display
    document.getElementById('angleDisplay').innerHTML = `${currentAngle}&deg;`;
    
    // Update bubble position
    // Map -30..30 to 10%..90%
    let percentage = ((gamma + 30) / 60) * 80 + 10; 
    document.getElementById('bubble').style.left = `${percentage}%`;
    
    // Rotate background slightly for effect
    document.getElementById('bubbleBg').style.transform = `rotate(${gamma}deg)`;
}

function saveAngle(region) {
    if(region === 'thoracic') {
        thoracicSaved = currentAngle;
        document.getElementById('thoracicValue').innerText = `${currentAngle}° kaydedildi`;
        document.getElementById('thoracicValue').className = "text-xs text-white font-bold";
        document.getElementById('btnTorakal').classList.replace('bg-slate-700', 'bg-orange-600');
    } else {
        lumbarSaved = currentAngle;
        document.getElementById('lumbarValue').innerText = `${currentAngle}° kaydedildi`;
        document.getElementById('lumbarValue').className = "text-xs text-white font-bold";
        document.getElementById('btnLumbar').classList.replace('bg-slate-700', 'bg-emerald-600');
    }
    
    checkSubmitReady();
}

function checkSubmitReady() {
    if(thoracicSaved !== null || lumbarSaved !== null) {
        const btn = document.getElementById('btnSubmit');
        btn.disabled = false;
        btn.classList.remove('opacity-50', 'cursor-not-allowed');
        btn.classList.add('hover:bg-indigo-500', 'active:scale-95');
    }
}

async function submitMeasurement() {
    const btn = document.getElementById('btnSubmit');
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i> Gönderiliyor...';
    
    try {
        const res = await fetch(`/api/scoliometer/save/${token}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                thoracic_angle: thoracicSaved,
                lumbar_angle: lumbarSaved
            })
        });
        
        if(res.ok) {
            btn.classList.replace('bg-indigo-600', 'bg-emerald-500');
            btn.innerHTML = '<i class="fa-solid fa-check mr-2"></i> Başarıyla Gönderildi!';
            window.removeEventListener('deviceorientation', handleOrientation);
            setTimeout(() => {
                document.getElementById('measureScreen').innerHTML = `
                    <div class="text-center mt-20">
                        <i class="fa-solid fa-circle-check text-emerald-500 fa-5x mb-6"></i>
                        <h2 class="text-2xl font-bold text-white mb-2">İşlem Tamamlandı</h2>
                        <p class="text-slate-400">Ölçümler masaüstü ekranına aktarıldı. Bu sekmeyi kapatabilirsiniz.</p>
                    </div>
                `;
            }, 1500);
        } else {
            alert("Gönderim başarısız oldu.");
            btn.innerHTML = '<i class="fa-solid fa-check-circle mr-2"></i> Masaüstüne Gönder';
            btn.disabled = false;
        }
    } catch(e) {
        alert("Bağlantı hatası.");
        btn.innerHTML = '<i class="fa-solid fa-check-circle mr-2"></i> Masaüstüne Gönder';
        btn.disabled = false;
    }
}

// Init
checkAuth();
