const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');

let currentAngle = 0;
let thoracicSaved = null;
let lumbarSaved = null;
let patientId = null;

async function checkAuth() {
    if(!token) {
        document.getElementById('authStatus').innerText = "Geçersiz bağlantı. QR kodu tekrar okutun.";
        document.getElementById('authStatus').className = "text-red-400 text-sm mb-6";
        return;
    }
    
    try {
        const res = await fetch(`/api/scoliometer/auth/${token}`);
        if(res.ok) {
            const data = await res.json();
            patientId = data.patient_id;
            document.getElementById('patientName').innerText = data.patient_name;
            
            document.getElementById('authStatus').innerText = "Bağlantı başarılı! Sensörü başlatmak için butona basınız.";
            document.getElementById('authStatus').className = "text-emerald-400 text-sm mb-6 font-medium";
            document.getElementById('btnStart').classList.remove('hidden');
        } else {
            const err = await res.json().catch(() => ({}));
            document.getElementById('authStatus').innerText = err.detail || "Bağlantı süresi dolmuş.";
            document.getElementById('authStatus').className = "text-red-400 text-sm mb-6";
        }
    } catch(e) {
        document.getElementById('authStatus').innerText = "Sunucuya ulaşılamıyor.";
    }
}

document.getElementById('btnStart').addEventListener('click', async () => {
    // Attempt screen orientation lock to landscape if supported
    try {
        if (screen.orientation && screen.orientation.lock) {
            await screen.orientation.lock('landscape').catch(() => {});
        }
    } catch(e) {}

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
    // Determine screen orientation angle
    const orientation = window.orientation ?? (screen.orientation ? screen.orientation.angle : 0);
    let angle = 0;
    
    // In landscape mode (phone held horizontally across the patient's spine):
    // Tilting across the long edge corresponds to rotation around the phone's X-axis (beta)
    if (orientation === 90) {
        angle = -event.beta;
    } else if (orientation === -90 || orientation === 270) {
        angle = event.beta;
    } else if (orientation === 180) {
        angle = -event.gamma;
    } else {
        // In portrait mode: tilt across the short edge is gamma
        angle = event.gamma;
    }
    
    if (isNaN(angle)) angle = 0;
    currentAngle = Math.round(angle);
    
    // Update numerical display
    const sign = currentAngle > 0 ? '+' : '';
    document.getElementById('angleDisplay').innerHTML = `${sign}${currentAngle}°`;
    
    // Clinical Risk classification badge
    const absAngle = Math.abs(currentAngle);
    const badge = document.getElementById('riskBadge');
    if (absAngle < 5) {
        badge.innerText = "Normal (< 5°)";
        badge.className = "text-[11px] font-bold text-emerald-400 mb-3";
    } else if (absAngle <= 7) {
        badge.innerText = "Sınırda / Takip (5° - 7°)";
        badge.className = "text-[11px] font-bold text-amber-400 mb-3";
    } else {
        badge.innerText = "Belirgin Rotasyon / Pozitif (> 7°)";
        badge.className = "text-[11px] font-bold text-red-400 mb-3 animate-pulse";
    }
    
    // Clamp to -30 to 30 for the visual bubble
    let clamped = currentAngle;
    if(clamped > 30) clamped = 30;
    if(clamped < -30) clamped = -30;
    
    // Map -30..30 to 6%..94% of track width
    let percentage = ((clamped + 30) / 60) * 88 + 6; 
    document.getElementById('bubble').style.left = `${percentage}%`;
}

function saveAngle(region) {
    const sign = currentAngle > 0 ? '+' : '';
    const angleText = `${sign}${currentAngle}°`;
    
    if(region === 'thoracic') {
        thoracicSaved = currentAngle;
        document.getElementById('thoracicValue').innerText = `Kaydedildi: ${angleText}`;
        document.getElementById('thoracicValue').className = "text-[11px] text-white font-bold";
        document.getElementById('btnTorakal').classList.remove('bg-slate-800', 'border-slate-700');
        document.getElementById('btnTorakal').classList.add('bg-orange-600', 'border-orange-500');
    } else {
        lumbarSaved = currentAngle;
        document.getElementById('lumbarValue').innerText = `Kaydedildi: ${angleText}`;
        document.getElementById('lumbarValue').className = "text-[11px] text-white font-bold";
        document.getElementById('btnLumbar').classList.remove('bg-slate-800', 'border-slate-700');
        document.getElementById('btnLumbar').classList.add('bg-emerald-600', 'border-emerald-500');
    }
    
    checkSubmitReady();
}

function checkSubmitReady() {
    if(thoracicSaved !== null || lumbarSaved !== null) {
        const btn = document.getElementById('btnSubmit');
        btn.disabled = false;
        btn.classList.remove('opacity-40', 'cursor-not-allowed');
        btn.classList.add('bg-indigo-600', 'hover:bg-indigo-500', 'active:scale-95');
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
                    <div class="text-center my-auto p-6">
                        <i class="fa-solid fa-circle-check text-emerald-400 fa-4x mb-4 animate-bounce"></i>
                        <h2 class="text-xl font-bold text-white mb-2">Ölçüm Tamamlandı!</h2>
                        <p class="text-slate-400 text-sm max-w-xs mx-auto mb-4">
                            Veriler masaüstü sisteminize aktarıldı ve hasta kartına işlendi.
                        </p>
                        <span class="inline-block bg-slate-800 border border-slate-700 text-slate-300 text-xs px-4 py-2 rounded-xl">
                            Bu pencereyi kapatabilirsiniz.
                        </span>
                    </div>
                `;
            }, 1200);
        } else {
            alert("Gönderim başarısız oldu.");
            btn.innerHTML = '<i class="fa-solid fa-paper-plane mr-2"></i> Masaüstüne Gönder';
            btn.disabled = false;
        }
    } catch(e) {
        alert("Bağlantı hatası.");
        btn.innerHTML = '<i class="fa-solid fa-paper-plane mr-2"></i> Masaüstüne Gönder';
        btn.disabled = false;
    }
}

// Init
checkAuth();
