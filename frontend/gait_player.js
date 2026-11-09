/**
 * CIBODY Biyomekanik Dinamik Yürüyüş Video Oynatıcı & Replay Motoru (v1.0)
 * Ortez ve tabanlık uzmanları için yavaş çekim (Slow-Motion) kare kare inceleme
 */

(function() {
    let gaitSteps = [];
    let activeStepIdx = -1; // -1: Tüm Yürüyüş Sıralı, >=0: Belirli adım
    let isPlaying = false;
    let playbackSpeed = 1.0;
    let isLooping = true;
    let playTimer = null;
    
    // Zaman serisi kare listesi
    // Her eleman: { frameData, cop, type, stepId, stepNum, localFrameIdx, totalLocalFrames, phaseName }
    let timelineFrames = [];
    let currentTimelineIdx = 0;

    const TIME_PER_FRAME_MS = 28; // ~35 Hz donanım hızı

    function _t(s) {
        return (window.translateText ? window.translateText(s) : s);
    }

    /**
     * Oynatıcıyı adımlarla başlatır
     */
    window.initGaitPlayer = function(steps) {
        if (!steps || !steps.length) {
            let card = document.getElementById('gaitVideoPlayerCard');
            if (card) card.classList.add('hidden');
            return;
        }

        let card = document.getElementById('gaitVideoPlayerCard');
        if (card) card.classList.remove('hidden');

        gaitSteps = steps;
        buildStepSelector();
        selectStepMode(-1); // Başlangıçta Tüm Yürüyüş modu
    };

    /**
     * Adım Seçici Butonlarını (Pills) Oluşturur
     */
    function buildStepSelector() {
        let container = document.getElementById('gaitPlayerStepSelector');
        if (!container) return;
        container.innerHTML = '';

        // "Tüm Yürüyüş (Sıralı)" butonu
        let btnAll = document.createElement('button');
        btnAll.className = 'gait-player-pill px-3 py-1.5 rounded-xl text-xs font-bold transition-all ' + 
                           (activeStepIdx === -1 ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-800 text-slate-300 hover:bg-slate-700');
        btnAll.innerHTML = `<i class="fa-solid fa-film mr-1.5"></i>${_t('Tüm Yürüyüş')}`;
        btnAll.onclick = () => selectStepMode(-1);
        container.appendChild(btnAll);

        // Her adım için hap
        gaitSteps.forEach((s, idx) => {
            let isLeft = (s.type === 'Sol Ayak');
            let btn = document.createElement('button');
            let isActive = (activeStepIdx === idx);
            let colorClasses = isLeft 
                ? (isActive ? 'bg-red-600 text-white shadow-md' : 'bg-slate-800 text-red-400 hover:bg-slate-700')
                : (isActive ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-800 text-blue-400 hover:bg-slate-700');
            
            btn.className = `gait-player-pill px-3 py-1.5 rounded-xl text-xs font-bold transition-all border border-slate-700/60 ${colorClasses}`;
            btn.innerHTML = `<i class="fa-solid fa-shoe-prints mr-1.5"></i>${_t('Adım')} ${s.id || (idx + 1)} (${isLeft ? _t('Sol') : _t('Sağ')})`;
            btn.onclick = () => selectStepMode(idx);
            container.appendChild(btn);
        });
    }

    /**
     * Oynatma Modunu Değiştirir (-1: Tüm yürüyüş, >=0: Tek adım)
     */
    window.selectStepMode = function(stepIdx) {
        pause();
        activeStepIdx = stepIdx;
        buildStepSelector(); // Butonların aktiflik durumunu güncelle

        // Timeline karelerini oluştur
        timelineFrames = [];

        let targetSteps = (stepIdx === -1) ? gaitSteps : [gaitSteps[stepIdx]];
        
        targetSteps.forEach((step, sIdx) => {
            let frames = step.frames || [];
            let totalF = frames.length;
            if (totalF === 0) return;

            // Bu adım için COP yolu hesapla
            let copHistory = [];
            let stepCopPath = [];
            for (let f = 0; f < totalF; f++) {
                let frame = frames[f];
                let fForce = 0, sumX = 0, sumY = 0;
                for (let i = 0; i < 2304; i++) {
                    let v = frame[i];
                    if (v > 4) {
                        fForce += v;
                        sumX += (i % 48) * v;
                        sumY += Math.floor(i / 48) * v;
                    }
                }
                if (fForce > 0) {
                    stepCopPath.push({ x: sumX / fForce, y: sumY / fForce });
                } else {
                    stepCopPath.push(null);
                }
            }

            // Bounding box (Adımın sınırları)
            let minR = 48, maxR = 0, minC = 48, maxC = 0, stepMax = 0;
            if (step.aggregate) {
                for (let i = 0; i < 2304; i++) {
                    let v = step.aggregate[i];
                    if (v > 4) {
                        let r = Math.floor(i / 48);
                        let c = i % 48;
                        if (r < minR) minR = r;
                        if (r > maxR) maxR = r;
                        if (c < minC) minC = c;
                        if (c > maxC) maxC = c;
                        if (v > stepMax) stepMax = v;
                    }
                }
            }
            if (stepMax === 0) stepMax = 100;

            for (let f = 0; f < totalF; f++) {
                let progress = f / Math.max(1, totalF - 1);
                let phaseName = _t('Topuk Vuruşu (Initial Contact)');
                if (progress > 0.20 && progress <= 0.60) {
                    phaseName = _t('Tam Basış & Duruş (Midstance)');
                } else if (progress > 0.60 && progress <= 0.85) {
                    phaseName = _t('Topuk Kalkışı (Heel Off)');
                } else if (progress > 0.85) {
                    phaseName = _t('Parmak İtme (Toe Off)');
                }

                timelineFrames.push({
                    frameData: frames[f],
                    stepId: step.id || (stepIdx === -1 ? (sIdx + 1) : (stepIdx + 1)),
                    type: step.type,
                    stepMax: stepMax,
                    bbox: { minR, maxR, minC, maxC },
                    localFrameIdx: f + 1,
                    totalLocalFrames: totalF,
                    progressPct: Math.round(progress * 100),
                    phaseName: phaseName,
                    copPoint: stepCopPath[f],
                    copHistory: stepCopPath.slice(0, f + 1).filter(Boolean)
                });
            }
        });

        // Timeline slider sınırlarını güncelle
        let scrubber = document.getElementById('gaitPlayerScrubber');
        if (scrubber) {
            scrubber.min = 0;
            scrubber.max = Math.max(0, timelineFrames.length - 1);
            scrubber.value = 0;
        }

        currentTimelineIdx = 0;
        renderCurrentTimelineFrame();
    };

    /**
     * Dışarıdan belirli bir adımı oynatmak için fonksiyon (Adım kartlarındaki butondan tetiklenir)
     */
    window.playSpecificGaitStep = function(stepId) {
        let idx = gaitSteps.findIndex(s => s.id === stepId);
        if (idx === -1) idx = 0;
        
        let card = document.getElementById('gaitVideoPlayerCard');
        if (card) {
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        selectStepMode(idx);
        setTimeout(play, 300);
    };

    /**
     * O anki zaman çizelgesi karesini render eder ve HUD'ı günceller
     */
    function renderCurrentTimelineFrame() {
        if (!timelineFrames.length) return;
        if (currentTimelineIdx < 0) currentTimelineIdx = 0;
        if (currentTimelineIdx >= timelineFrames.length) currentTimelineIdx = timelineFrames.length - 1;

        let cur = timelineFrames[currentTimelineIdx];
        let canvas = document.getElementById('gaitReplayCanvas');
        if (!canvas) return;

        // 1. Ayak Basınç Haritasını Bever Medikal Kalitesinde Çiz
        drawReplayFoot(canvas, cur);

        // 2. HUD ve Metrikleri Güncelle
        updateHUD(cur);

        // 3. Scrubber'ı senkronize et
        let scrubber = document.getElementById('gaitPlayerScrubber');
        if (scrubber && document.activeElement !== scrubber) {
            scrubber.value = currentTimelineIdx;
        }
    }

    /**
     * Bever Medikal pürüzsüzlüğünde ayak karesini ve üzerine COP çizgisini çizer
     */
    function drawReplayFoot(canvas, item) {
        const outSize = 320;
        canvas.width = outSize;
        canvas.height = outSize;
        const ctx = canvas.getContext('2d');

        // Tam siyah zemin
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, outSize, outSize);

        let frameData = item.frameData;
        let bbox = item.bbox;
        let minR = bbox.minR, maxR = bbox.maxR, minC = bbox.minC, maxC = bbox.maxC;

        if (maxR <= minR || maxC <= minC) {
            minR = 0; maxR = 47; minC = 0; maxC = 47;
        }

        let footH = Math.max(1, maxR - minR + 1);
        let footW = Math.max(1, maxC - minC + 1);

        // 1. 2D Bilinear Enterpolasyon & Komşuluk Filtresi
        let smoothFoot = new Float32Array(footH * footW);
        let maxValInFrame = 0;

        for (let r = minR; r <= maxR; r++) {
            for (let c = minC; c <= maxC; c++) {
                let v = frameData[r * 48 + c];
                let lr = r - minR;
                let lc = c - minC;

                if (v > 3) {
                    if (v > maxValInFrame) maxValInFrame = v;
                    let sum = v * 2.8;
                    let wSum = 2.8;
                    if (r > 0 && frameData[(r - 1) * 48 + c] > 2) { sum += frameData[(r - 1) * 48 + c]; wSum += 1.0; }
                    if (r < 47 && frameData[(r + 1) * 48 + c] > 2) { sum += frameData[(r + 1) * 48 + c]; wSum += 1.0; }
                    if (c > 0 && frameData[r * 48 + (c - 1)] > 2) { sum += frameData[r * 48 + (c - 1)]; wSum += 1.0; }
                    if (c < 47 && frameData[r * 48 + (c + 1)] > 2) { sum += frameData[r * 48 + (c + 1)]; wSum += 1.0; }
                    smoothFoot[lr * footW + lc] = sum / wSum;
                } else {
                    smoothFoot[lr * footW + lc] = 0;
                }
            }
        }

        // 2. Küçük Kaynak Katmanına Aynalayarak (X-Flip Tıbbi Bakış) Çiz
        let cropCanvas = document.createElement('canvas');
        cropCanvas.width = footW;
        cropCanvas.height = footH;
        let cropCtx = cropCanvas.getContext('2d');
        let cropImg = cropCtx.createImageData(footW, footH);
        let cd = cropImg.data;

        for (let lr = 0; lr < footH; lr++) {
            for (let lc = 0; lc < footW; lc++) {
                let val = smoothFoot[lr * footW + lc];
                let mirroredLc = footW - 1 - lc;
                let targetIdx = (lr * footW + mirroredLc) * 4;
                let intensity = Math.min(255, Math.round(val));
                cd[targetIdx]     = intensity;
                cd[targetIdx + 1] = intensity;
                cd[targetIdx + 2] = intensity;
                cd[targetIdx + 3] = intensity > 3 ? 255 : 0;
            }
        }
        cropCtx.putImageData(cropImg, 0, 0);

        // 3. Hedef Boyutta Anatomik En-Boy Oranını Koruyarak Büyüt (Bicubic Smoothing)
        let targetH = Math.round(outSize * 0.86);
        let scale = targetH / Math.max(footH, 20);
        let targetW = Math.round(footW * scale);

        if (targetW > Math.round(outSize * 0.76)) {
            scale = (outSize * 0.76) / footW;
            targetW = Math.round(footW * scale);
            targetH = Math.round(footH * scale);
        }

        let offX = Math.round((outSize - targetW) / 2);
        let offY = Math.round((outSize - targetH) / 2);

        let upscaleCanvas = document.createElement('canvas');
        upscaleCanvas.width = outSize;
        upscaleCanvas.height = outSize;
        let upCtx = upscaleCanvas.getContext('2d');
        upCtx.imageSmoothingEnabled = true;
        upCtx.imageSmoothingQuality = 'high';
        upCtx.drawImage(cropCanvas, 0, 0, footW, footH, offX, offY, targetW, targetH);

        // 4. Renklendirme ve Kırmızı Tepe Odaklar
        let upData = upCtx.getImageData(0, 0, outSize, outSize);
        let upPixels = upData.data;
        let finalImg = ctx.createImageData(outSize, outSize);
        let fd = finalImg.data;

        let getColorFn = typeof window.getGaitColor === 'function' ? window.getGaitColor : (v) => [255, 0, 0];
        let refMax = Math.max(item.stepMax, 30);

        for (let i = 0; i < upPixels.length; i += 4) {
            let alpha = upPixels[i + 3];
            let val = upPixels[i];

            if (alpha > 10 && val > 3) {
                let col = getColorFn(val, refMax);
                fd[i]     = col[0];
                fd[i + 1] = col[1];
                fd[i + 2] = col[2];
                fd[i + 3] = 255;
            } else {
                fd[i]     = 0;
                fd[i + 1] = 0;
                fd[i + 2] = 0;
                fd[i + 3] = 255;
            }
        }
        ctx.putImageData(finalImg, 0, 0);

        // 5. COP (Basınç Merkezi) Yolu ve Anlık Hedef Noktasını Çiz
        if (item.copHistory && item.copHistory.length > 0) {
            ctx.save();
            ctx.lineWidth = 3;
            ctx.strokeStyle = "#FBBF24"; // Altın sarısı iz
            ctx.shadowColor = "#F59E0B";
            ctx.shadowBlur = 6;
            ctx.beginPath();

            let firstCop = true;
            item.copHistory.forEach(pt => {
                if (!pt) return;
                // Sensör koordinatını canvas koordinatına dönüştür (aynı X-flip ve scale ile)
                let normC = (pt.x - minC);
                let mirroredNormC = footW - 1 - normC;
                let normR = (pt.y - minR);

                let canvasX = offX + (mirroredNormC * scale);
                let canvasY = offY + (normR * scale);

                if (firstCop) {
                    ctx.moveTo(canvasX, canvasY);
                    firstCop = false;
                } else {
                    ctx.lineTo(canvasX, canvasY);
                }
            });
            ctx.stroke();

            // Anlık COP Hedef Noktası (Parıldayan Crosshair)
            let lastPt = item.copPoint;
            if (lastPt) {
                let normC = (lastPt.x - minC);
                let mirroredNormC = footW - 1 - normC;
                let normR = (lastPt.y - minR);
                let cx = offX + (mirroredNormC * scale);
                let cy = offY + (normR * scale);

                // Dış halka
                ctx.beginPath();
                ctx.arc(cx, cy, 7, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(239, 68, 68, 0.4)";
                ctx.fill();
                ctx.lineWidth = 2;
                ctx.strokeStyle = "#FFFFFF";
                ctx.stroke();

                // Merkez nokta
                ctx.beginPath();
                ctx.arc(cx, cy, 3, 0, Math.PI * 2);
                ctx.fillStyle = "#EF4444";
                ctx.fill();
            }
            ctx.restore();
        }
    }

    /**
     * HUD ve Metrik Panellerini Günceller
     */
    function updateHUD(item) {
        let isLeft = (item.type === 'Sol Ayak');

        let stepBadge = document.getElementById('gaitPlayerStepBadge');
        if (stepBadge) {
            stepBadge.innerText = `${_t('Adım')} ${item.stepId}`;
            stepBadge.className = isLeft ? 'text-xs font-bold text-white px-2 py-0.5 rounded bg-red-600' : 'text-xs font-bold text-white px-2 py-0.5 rounded bg-blue-600';
        }

        let typeBadge = document.getElementById('gaitPlayerTypeBadge');
        if (typeBadge) {
            typeBadge.innerText = isLeft ? _t('Sol Ayak') : _t('Sağ Ayak');
            typeBadge.className = isLeft ? 'text-xs font-bold text-red-400' : 'text-xs font-bold text-blue-400';
        }

        let phaseBadge = document.getElementById('gaitPlayerPhaseBadge');
        if (phaseBadge) {
            phaseBadge.innerText = item.phaseName;
        }

        // Zaman ve Kare
        let timeInSec = (currentTimelineIdx * TIME_PER_FRAME_MS / 1000).toFixed(2);
        let totalSec = (timelineFrames.length * TIME_PER_FRAME_MS / 1000).toFixed(2);

        let timeBadge = document.getElementById('gaitPlayerTimeBadge');
        if (timeBadge) timeBadge.innerText = `${timeInSec}s / ${totalSec}s`;

        let timeCurrent = document.getElementById('gaitPlayerTimeCurrent');
        if (timeCurrent) timeCurrent.innerText = `${timeInSec}s`;

        let timeTotal = document.getElementById('gaitPlayerTimeTotal');
        if (timeTotal) timeTotal.innerText = `${totalSec}s`;

        // Anlık Kuvvet ve Basınç
        let frameForce = 0;
        let activeSensors = 0;
        let peakP = 0;
        for (let i = 0; i < 2304; i++) {
            let v = item.frameData[i];
            if (v > 4) {
                frameForce += v;
                activeSensors++;
                if (v > peakP) peakP = v;
            }
        }

        let forceBadge = document.getElementById('gaitPlayerForceBadge');
        if (forceBadge) forceBadge.innerText = `${Math.round(frameForce)} N`;

        let frameTxt = document.getElementById('gaitPlayerCurrentFrameTxt');
        if (frameTxt) frameTxt.innerText = `${item.localFrameIdx} / ${item.totalLocalFrames}`;

        // Her sensör yaklaşık 1 cm²
        let areaTxt = document.getElementById('gaitPlayerAreaTxt');
        if (areaTxt) areaTxt.innerText = `${activeSensors} cm²`;

        let peakTxt = document.getElementById('gaitPlayerPeakTxt');
        if (peakTxt) peakTxt.innerText = `${peakP}`;

        // Faz İlerleme Çubuğu
        let pct = item.progressPct;
        let pBar = document.getElementById('gaitPlayerPhaseBar');
        if (pBar) pBar.style.width = `${pct}%`;

        let pPct = document.getElementById('gaitPlayerProgressPct');
        if (pPct) pPct.innerText = `%${pct}`;
    }

    /**
     * Oynatma / Duraklatma Döngüsü
     */
    function play() {
        if (isPlaying) return;
        isPlaying = true;
        updatePlayButtonUI();

        function stepPlayback() {
            if (!isPlaying) return;

            if (currentTimelineIdx >= timelineFrames.length - 1) {
                if (isLooping) {
                    currentTimelineIdx = 0;
                } else {
                    pause();
                    return;
                }
            } else {
                currentTimelineIdx++;
            }

            renderCurrentTimelineFrame();

            let delay = TIME_PER_FRAME_MS / playbackSpeed;
            playTimer = setTimeout(stepPlayback, delay);
        }

        stepPlayback();
    }

    function pause() {
        isPlaying = false;
        if (playTimer) {
            clearTimeout(playTimer);
            playTimer = null;
        }
        updatePlayButtonUI();
    }

    function togglePlay() {
        if (isPlaying) pause();
        else play();
    }

    function updatePlayButtonUI() {
        let icon = document.getElementById('gaitPlayerPlayIcon');
        let text = document.getElementById('gaitPlayerPlayText');
        let btn = document.getElementById('gaitPlayerBtnPlay');

        if (!icon || !text) return;

        if (isPlaying) {
            icon.className = 'fa-solid fa-pause';
            text.innerText = _t('Duraklat');
            if (btn) btn.className = 'px-5 h-10 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold transition-all flex items-center gap-2 shadow-lg shadow-amber-600/30';
        } else {
            icon.className = 'fa-solid fa-play';
            text.innerText = _t('Oynat');
            if (btn) btn.className = 'px-5 h-10 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all flex items-center gap-2 shadow-lg shadow-indigo-600/30';
        }
    }

    /**
     * DOM Olaylarını Bağla
     */
    document.addEventListener('DOMContentLoaded', () => {
        let btnPlay = document.getElementById('gaitPlayerBtnPlay');
        if (btnPlay) btnPlay.onclick = togglePlay;

        let btnPrev = document.getElementById('gaitPlayerBtnPrev');
        if (btnPrev) {
            btnPrev.onclick = () => {
                pause();
                currentTimelineIdx = Math.max(0, currentTimelineIdx - 1);
                renderCurrentTimelineFrame();
            };
        }

        let btnNext = document.getElementById('gaitPlayerBtnNext');
        if (btnNext) {
            btnNext.onclick = () => {
                pause();
                currentTimelineIdx = Math.min(timelineFrames.length - 1, currentTimelineIdx + 1);
                renderCurrentTimelineFrame();
            };
        }

        let scrubber = document.getElementById('gaitPlayerScrubber');
        if (scrubber) {
            scrubber.oninput = () => {
                pause();
                currentTimelineIdx = parseInt(scrubber.value) || 0;
                renderCurrentTimelineFrame();
            };
        }

        let btnLoop = document.getElementById('gaitPlayerBtnLoop');
        if (btnLoop) {
            btnLoop.onclick = () => {
                isLooping = !isLooping;
                btnLoop.className = isLooping
                    ? 'px-3 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-400 border border-indigo-500/50 transition-all flex items-center gap-1.5 text-xs font-bold'
                    : 'px-3 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-500 border border-slate-700 transition-all flex items-center gap-1.5 text-xs font-bold opacity-60';
            };
        }

        // Hız Butonları
        let speedBtns = document.querySelectorAll('.gait-speed-btn');
        speedBtns.forEach(btn => {
            btn.onclick = () => {
                playbackSpeed = parseFloat(btn.dataset.speed) || 1.0;
                speedBtns.forEach(b => {
                    b.className = 'gait-speed-btn px-2.5 py-1 rounded-lg font-bold transition-all text-slate-300 hover:text-white';
                });
                btn.className = 'gait-speed-btn px-2.5 py-1 rounded-lg font-bold transition-all bg-indigo-600 text-white shadow';
            };
        });

        // Mevcut Kareyi PNG Olarak İndir (Snapshot)
        let btnSnap = document.getElementById('gaitPlayerBtnSnapshot');
        if (btnSnap) {
            btnSnap.onclick = () => {
                let canvas = document.getElementById('gaitReplayCanvas');
                if (!canvas) return;
                let cur = timelineFrames[currentTimelineIdx];
                let link = document.createElement('a');
                link.download = `cibody_adim_${cur ? cur.stepId : 'replay'}_kare_${currentTimelineIdx + 1}.png`;
                link.href = canvas.toDataURL('image/png');
                link.click();
            };
        }
    });

})();
