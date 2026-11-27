// clinic.js — Aşama 1: güven göstergeli ölçümler, standart testler, seans kaydı ve rapor.
// Tüm açılar tek kameranın 2 boyutlu iz düşümüdür. Klinik gonyometrenin yerini tutmaz.

const IDX = {
  L: {sh:11, el:13, wr:15, hip:23, kn:25, an:27, he:29, to:31, ear:7},
  R: {sh:12, el:14, wr:16, hip:24, kn:26, an:28, he:30, to:32, ear:8},
};
const OK = 0.7, MID = 0.45;            // güven eşikleri: yeşil / sarı
const SIDE_TR = {L:'Sol', R:'Sağ', '-':'—'};

const deg = r => r * 180 / Math.PI;
const sub = (a,b) => ({x:a.x-b.x, y:a.y-b.y}), dot = (a,b) => a.x*b.x + a.y*b.y, len = a => Math.hypot(a.x, a.y);
const norm = a => { const l = len(a) || 1; return {x:a.x/l, y:a.y/l}; };
const lerp = (a,b,t) => ({x:a.x+(b.x-a.x)*t, y:a.y+(b.y-a.y)*t});
const ang = (a,b,c) => { const u = norm(sub(a,b)), w = norm(sub(c,b)); return deg(Math.acos(Math.max(-1, Math.min(1, dot(u,w))))); };
const sstep = (a,b,x) => { const t = Math.min(1, Math.max(0, (x-a)/(b-a))); return t*t*(3-2*t); };
const median = arr => { const s = [...arr].sort((a,b) => a-b); return s[s.length >> 1]; };
const mean = arr => arr.reduce((a,b) => a+b, 0) / (arr.length || 1);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const confColor = c => c >= OK ? '#3ddc84' : c >= MID ? '#f5c542' : '#ff5c5c';
const confWord = c => c >= OK ? 'Yüksek' : c >= MID ? 'Orta' : 'Düşük';
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch { return false; } },
};

// Referans değerler: AAOS ortalama normal eklem hareket açıklıkları (kişiye ve yaşa göre değişir)
const TESTS = {
  free:        {name:'Serbest ölçüm (test yok)'},
  postureFront:{name:'Duruş analizi – önden', view:'front', posture:'front', dur:4000,
                how:'Kameraya ÖNDEN dönün. Rahat ve dik durun, kollar yanda; 4 sn kıpırdamayın.'},
  postureSide: {name:'Duruş analizi – yandan', view:'side', posture:'side', dur:4000,
                how:'Kameraya YAN dönün. Rahat ve dik durun; 4 sn kıpırdamayın.'},
  shoulderFlex:{name:'Omuz fleksiyonu', view:'side', sides:'each', m:'shoulder', agg:'max', ref:180,
                how:'Kameraya YAN dönün. Kolunuz dirsek düz, önden yukarı kaldırın; en üstte 1 sn bekleyin.'},
  shoulderAbd: {name:'Omuz abdüksiyonu', view:'front', sides:'both', m:'shoulder', agg:'max', ref:180,
                how:'Kameraya ÖNDEN dönün. İki kolunuzu yandan, dirsek düz yukarı kaldırın.'},
  elbowFlex:   {name:'Dirsek fleksiyonu', view:'side', sides:'each', m:'elbow', agg:'max', ref:150,
                how:'Kameraya YAN dönün. Kol gövdenin yanında, dirseğinizi sonuna kadar bükün.'},
  hipFlex:     {name:'Kalça fleksiyonu', view:'side', sides:'each', m:'hip', agg:'max', ref:120,
                how:'Kameraya YAN dönün, bir yere tutunun. Dizinizi bükerek göğsünüze doğru kaldırın.'},
  kneeFlex:    {name:'Diz fleksiyonu', view:'side', sides:'each', m:'knee', agg:'max', ref:135,
                how:'Kameraya YAN dönün, bir yere tutunun. Topuğunuzu kalçanıza doğru getirin.'},
  ankleDF:     {name:'Ayak bileği dorsifleksiyonu', view:'side', sides:'each', m:'ankle', agg:'max', ref:20,
                how:'Kameraya YAN dönün. Topuk yerde kalarak dizinizi öne doğru itin.'},
  squat:       {name:'Squat – diz hizası (FPPA)', view:'front', sides:'both', m:'fppa', agg:'maxabs', refText:'Valgus > 10° ise dikkat',
                how:'Kameraya ÖNDEN dönün. Kollar önde, 5 kez yavaşça çömelip kalkın.'},
  slSquat:     {name:'Tek bacak squat (FPPA)', view:'front', sides:'each', m:'fppa', agg:'maxabs', refText:'Valgus > 10° ise dikkat',
                how:'Kameraya ÖNDEN dönün. Test edilen bacağın üstünde durup 5 kez yarım çömelin.'},
};
const POSTURE_NAMES = {
  shoulderTilt:'Omuz yükseklik farkı', pelvisTilt:'Pelvis yükseklik farkı', trunkLean:'Gövde yana eğim',
  fppaL:'Sol diz hizası (ayakta)', fppaR:'Sağ diz hizası (ayakta)',
  cva:'Baş–omuz açısı (yaklaşık CVA)', trunkIncl:'Gövde öne eğim', knee:'Diz (yandan)',
};

export function createClinic(api){
  injectUI();
  const $ = s => document.querySelector(s);
  let selected = 'free', run = null, lastLive = 0;
  let session = newSession();
  let viewing = null, dirty = false;                 // viewing: geçmişten açılan analiz (salt okunur)
  const shown = () => viewing ? viewing.results : session.results;

  // ---------------- ölçüm çekirdeği ----------------
  const pose = () => api.pose();
  const vis = i => { const L = pose(); return L ? (L[i].v ?? 1) : 0; };
  const pt = i => api.P(pose()[i]);
  // 1 = segmentler görüntü düzleminde, 0 = kameraya doğru uzanıyor (2B açı güvenilmez)
  function planeQ(chain){
    const W = api.world(); if (!W) return 1;
    let worst = 0;
    for (let k = 0; k < chain.length - 1; k++) {
      const a = W[chain[k]], b = W[chain[k+1]];
      const d = Math.hypot(a.x-b.x, a.y-b.y, a.z-b.z) || 1;
      worst = Math.max(worst, Math.abs(a.z - b.z) / d);
    }
    return 1 - sstep(0.4, 0.8, worst);
  }
  const conf = ids => Math.min(...ids.map(vis)) * planeQ(ids);
  const F = () => api.metrics().F ?? 1;
  const isFront = () => F() > 0.6, isSide = () => F() < 0.4;

  const M = {
    // kol ile gövde arasındaki açı: 0 = kol yanda, 180 = tam yukarıda (fleksiyon / abdüksiyon)
    shoulder: s => { const j = IDX[s], ids = [j.hip, j.sh, j.el];
      return {v: ang(pt(j.hip), pt(j.sh), pt(j.el)), c: conf(ids), ids, kind:'between'}; },
    elbow: s => { const j = IDX[s], ids = [j.sh, j.el, j.wr];
      return {v: 180 - ang(pt(j.sh), pt(j.el), pt(j.wr)), c: conf(ids), ids, kind:'flex'}; },
    hip: s => { const j = IDX[s], ids = [j.sh, j.hip, j.kn];
      return {v: 180 - ang(pt(j.sh), pt(j.hip), pt(j.kn)), c: conf(ids), ids, kind:'flex'}; },
    knee: s => { const j = IDX[s], ids = [j.hip, j.kn, j.an];
      return {v: 180 - ang(pt(j.hip), pt(j.kn), pt(j.an)), c: conf(ids), ids, kind:'flex'}; },
    // dorsifleksiyon: bacak ile ayak (topuk→parmak) arasındaki açının 90°'den farkı
    ankle: s => { const j = IDX[s], ids = [j.kn, j.an, j.he, j.to];
      const shank = sub(pt(j.kn), pt(j.an)), foot = sub(pt(j.to), pt(j.he));
      const a = deg(Math.acos(Math.max(-1, Math.min(1, dot(norm(shank), norm(foot))))));
      return {v: 90 - a, c: conf([j.kn, j.an]) * Math.min(vis(j.he), vis(j.to)) * (1 - sstep(0.5, 0.8, F())), ids, kind:'text'}; },
    // FPPA: önden diz açısı; + = valgus (diz içe), − = varus (diz dışa)
    fppa: s => { const j = IDX[s], ids = [j.hip, j.kn, j.an];
      const H = pt(j.hip), K = pt(j.kn), A = pt(j.an), a = 180 - ang(H, K, A);
      const u = api.metrics().u || {x:1, y:0}, medial = s === 'L' ? {x:-u.x, y:-u.y} : u;
      const HA = sub(A, H), proj = lerp(H, A, dot(sub(K, H), HA) / (dot(HA, HA) || 1));
      const off = dot(sub(K, proj), medial);
      return {v: off >= 0 ? a : -a, c: conf(ids) * sstep(0.45, 0.75, F()), ids, kind:'text'}; },
  };

  function tiltOf(l, r){   // + = sol taraf daha aşağıda
    const Lp = pt(l), Rp = pt(r);
    return deg(Math.atan2(Lp.y - Rp.y, Math.abs(Lp.x - Rp.x) || 1));
  }
  function postureValues(kind){
    const m = api.metrics(); if (!pose() || !m.T) return null;
    if (kind === 'front') {
      const neck = lerp(pt(11), pt(12), .5), pel = lerp(pt(23), pt(24), .5), d = sub(neck, pel), u = m.u;
      const c = Math.min(vis(11), vis(12), vis(23), vis(24)) * sstep(0.55, 0.85, F());
      const fL = M.fppa('L'), fR = M.fppa('R');
      return {c, vals:{shoulderTilt: tiltOf(11, 12), pelvisTilt: tiltOf(23, 24),
        trunkLean: deg(Math.atan2(dot(d, u), -d.y)), fppaL: fL.v, fppaR: fR.v}};
    }
    const s = vis(7) + vis(11) >= vis(8) + vis(12) ? 'L' : 'R', j = IDX[s];
    const fwd = Math.sign(m.fd?.x || 1);
    const E = pt(j.ear), Sh = pt(j.sh), H = pt(j.hip), K = pt(j.kn), A = pt(j.an);
    const kneeOff = (K.x - lerp(H, A, 0.5).x) * fwd;                    // dizin kalça–ayak bileği çizgisine göre yeri
    const kneeAng = 180 - ang(H, K, A);
    const c = Math.min(vis(j.ear), vis(j.sh), vis(j.hip), vis(j.kn), vis(j.an)) * (1 - sstep(0.3, 0.6, F()));
    return {c, side:s, vals:{
      cva: deg(Math.atan2(-(E.y - Sh.y), (E.x - Sh.x) * fwd)),
      trunkIncl: deg(Math.atan2((Sh.x - H.x) * fwd, -(Sh.y - H.y))),
      knee: kneeOff < 0 ? -kneeAng : kneeAng}};
  }
  const fmtPosture = (k, v) => {
    const a = Math.abs(v).toFixed(1);
    switch (k) {
      case 'shoulderTilt': case 'pelvisTilt': return Math.abs(v) < 1 ? 'eşit' : `${v > 0 ? 'Sol' : 'Sağ'} ${a}° aşağıda`;
      case 'trunkLean': return Math.abs(v) < 1 ? 'dik' : `${a}° ${v > 0 ? 'sola' : 'sağa'}`;
      case 'fppaL': case 'fppaR': return `${a}° ${v >= 0 ? 'valgus (içe)' : 'varus (dışa)'}`;
      case 'cva': return `~${Math.round(v)}°${v < 50 ? ' (baş önde olabilir)' : ''}`;
      case 'trunkIncl': return Math.abs(v) < 1 ? 'dik' : `${a}° ${v > 0 ? 'öne' : 'geriye'}`;
      case 'knee': return v < 0 ? `${a}° hiperekstansiyon` : `${a}° bükük`;
    }
    return a;
  };
  const fmtVal = (m, v) => m === 'fppa' ? `${Math.abs(Math.round(v))}° ${v >= 0 ? 'valgus' : 'varus'}` : `${Math.round(v)}°`;

  // ---------------- canlı tablo ----------------
  const LIVE = [['shoulder','Omuz (kol–gövde)'],['elbow','Dirsek fleksiyon'],['hip','Kalça fleksiyon'],
                ['knee','Diz fleksiyon'],['ankle','Ayak bileği DF'],['fppa','Diz hizası (FPPA)']];
  function renderLive(now){
    if (now - lastLive < 200) return; lastLive = now;
    const tb = $('#cl-live'), pl = $('#cl-posture');
    if (!pose()) { tb.innerHTML = '<tr><td class="muted">Vücut bekleniyor…</td></tr>'; pl.textContent = ''; return; }
    let h = '<tr><th></th><th>Sol</th><th>Sağ</th><th>Fark</th></tr>';
    for (const [k, name] of LIVE) {
      const r = {L: M[k]('L'), R: M[k]('R')};
      const cell = x => x.c < MID ? `<td class="muted"><i style="background:${confColor(x.c)}"></i>—</td>`
                                  : `<td><i style="background:${confColor(x.c)}"></i>${fmtVal(k, x.v)}</td>`;
      let diff = '<td class="muted">—</td>';
      if (r.L.c >= MID && r.R.c >= MID) { const d = Math.round(Math.abs(r.L.v - r.R.v)); diff = `<td class="${d >= 10 ? 'warn' : ''}">${d}°</td>`; }
      h += `<tr><td>${name}</td>${cell(r.L)}${cell(r.R)}${diff}</tr>`;
    }
    tb.innerHTML = h;
    const kind = isFront() ? 'front' : isSide() ? 'side' : null;
    const p = kind && postureValues(kind);
    if (!p || p.c < MID) { pl.innerHTML = '<span class="muted">Duruş için tam önden veya tam yandan durun.</span>'; return; }
    const keys = kind === 'front' ? ['shoulderTilt','pelvisTilt','trunkLean'] : ['cva','trunkIncl','knee'];
    pl.innerHTML = `<b>Duruş (${kind === 'front' ? 'önden' : 'yandan'})</b><br>` +
      keys.map(k => `${POSTURE_NAMES[k]}: <span>${fmtPosture(k, p.vals[k])}</span>`).join('<br>');
  }

  // ---------------- testler ----------------
  // Test kartları: her test için simge, pozisyon, referans ve tamamlanma durumu
  const ICON = {shoulderFlex:'🙋', shoulderAbd:'🙆', elbowFlex:'💪', hipFlex:'🦵', kneeFlex:'🦿', ankleDF:'🦶',
                squat:'🏋️', slSquat:'🧘', postureFront:'🧍', postureSide:'🚶'};
  function lastResult(key, side){
    const list = shown();
    for (let i = list.length - 1; i >= 0; i--) { const r = list[i]; if (r.test === key && (side == null || r.side === side)) return r; }
    return null;
  }
  function resultShort(r){
    if (!r) return '';
    if (r.value == null && !r.values) return '✕';
    if (r.values) return '✓';
    return fmtVal(r.m, r.value);
  }
  function renderTest(){
    const grid = $('#cl-grid'), how = $('#cl-how'), b = $('#cl-btns');
    const keys = Object.keys(TESTS).filter(k => k !== 'free');
    grid.innerHTML = keys.map(k => {
      const d = TESTS[k], active = run && run.key === k;
      const view = d.view === 'front' ? 'ÖNDEN' : 'YANDAN';
      const ref = d.ref ? `ref ${d.ref}°` : d.refText ? 'valgus > 10° dikkat' : d.posture ? '4 sn' : '';
      let actions;
      if (d.sides === 'each') {
        actions = ['L','R'].map(sd => { const r = lastResult(k, sd);
          return `<button class="cl-side ${r ? (r.value == null ? 'bad' : 'done') : ''}" data-k="${k}" data-run="${sd}" ${run || viewing ? 'disabled' : ''}>
            ${SIDE_TR[sd]}${r ? ` <b>${esc(resultShort(r))}</b>` : ''}</button>`; }).join('');
      } else {
        const r = lastResult(k, null), res = r ? (r.values ? 'ölçüldü' : (d.sides === 'both' ? ['L','R'].map(sd => { const x = lastResult(k, sd); return x ? SIDE_TR[sd] + ' ' + resultShort(x) : ''; }).filter(Boolean).join(' · ') : resultShort(r))) : '';
        actions = `<button class="cl-side wide ${r ? (r.value == null && !r.values ? 'bad' : 'done') : ''}" data-k="${k}" data-run="both" ${run || viewing ? 'disabled' : ''}>
          ${r ? `✓ ${esc(res)} · tekrar` : '▶ Başlat'}</button>`;
      }
      return `<div class="cl-tcard ${active ? 'active' : ''}">
        <div class="cl-thead"><span class="cl-ico">${ICON[k] || '•'}</span>
          <div style="flex:1"><div class="cl-tname">${esc(d.name)}</div><div class="cl-tmeta"><span class="cl-view">${view}</span>${ref ? ' · ' + esc(ref) : ''}</div></div>
          <button class="cl-info" data-info="${k}" title="Bilgi" aria-label="${esc(d.name)} hakkında bilgi">i</button></div>
        <div class="cl-tact">${actions}</div></div>`;
    }).join('');
    grid.querySelectorAll('[data-run]').forEach(el => el.onclick = () => { selected = el.dataset.k; start(el.dataset.run); });
    grid.querySelectorAll('[data-info]').forEach(el => el.onclick = () => showInfo(el.dataset.info));
    if (run) {
      how.innerHTML = `<b>${esc(run.def.name)}${run.sides.length === 1 ? ' – ' + SIDE_TR[run.sides[0]] : ''}:</b> ${esc(run.def.how)}`;
      b.innerHTML = `<button data-ctl="finish">■ Bitir ve kaydet</button><button data-ctl="cancel" class="ghost">✕ İptal</button>`;
      b.querySelector('[data-ctl=finish]').onclick = () => stop(false);
      b.querySelector('[data-ctl=cancel]').onclick = () => stop(true);
    } else {
      how.textContent = viewing ? 'Geçmiş bir analiz görüntüleniyor (salt okunur). Yeni ölçüm için yukarıdan “✨ + Yeni Analiz” seçin.'
                                : 'Bir teste dokunun: 3 sn geri sayımdan sonra ölçüm başlar, en iyi değer otomatik alınır.';
      b.innerHTML = '';
    }
  }
  function start(which){
    const def = TESTS[selected];
    const sides = which === 'both' ? ['L','R'] : [which];
    run = {key:selected, def, sides, phase:'count', t0:performance.now(), tr:0,
      buf:{L:[],R:[]}, peak:{L:null,R:null}, n:{L:0,R:0}, confs:{L:[],R:[]},
      pAcc:{}, pN:0, pC:[], pSide:null, snap:null, snapT:0, live:{}};
    renderTest();
  }
  function stop(cancel){
    if (!run) return;
    if (cancel) { run = null; renderTest(); return; }
    finish();
  }
  const better = (v, best, agg) => best == null || (agg === 'maxabs' ? Math.abs(v) > Math.abs(best) : v > best);

  function update(now){
    const def = run.def;
    run.viewOK = def.view === 'front' ? isFront() : isSide();
    if (run.phase === 'count') { if (now - run.t0 > 3000) { run.phase = 'rec'; run.tr = now; } return; }
    if (now - run.tr > (def.dur || 7000)) { finish(); return; }
    if (!pose() || !run.viewOK) return;
    if (def.posture) {
      const p = postureValues(def.posture);
      if (!p || p.c < MID) return;
      for (const k in p.vals) run.pAcc[k] = (run.pAcc[k] || 0) + p.vals[k];
      run.pN++; run.pC.push(p.c); run.pSide = p.side || '-';
      if (!run.snap && now - run.tr > (def.dur || 4000) / 2) run.snap = api.snapshot();
      return;
    }
    for (const s of run.sides) {
      const r = M[def.m](s); run.live[s] = r;
      if (r.c < MID) continue;
      const b = run.buf[s]; b.push(r.v); if (b.length > 5) b.shift();
      if (b.length < 3) continue;
      const md = median(b);                       // tek karelik sıçramaları yok say
      run.n[s]++; run.confs[s].push(r.c);
      if (better(md, run.peak[s], def.agg)) {
        run.peak[s] = md;
        if (now - run.snapT > 400) { run.snap = api.snapshot(); run.snapT = now; }
      }
    }
  }
  function finish(){
    const r = run; run = null;
    const base = {ts: Date.now(), test: r.key, name: r.def.name, snapshot: r.snap};
    if (r.def.posture) {
      if (r.pN < 10) session.results.push({...base, side:'-', value:null, note:'Yetersiz veri – pozisyonu ve ışığı kontrol edin'});
      else {
        const values = {}; for (const k in r.pAcc) values[k] = r.pAcc[k] / r.pN;
        session.results.push({...base, side: r.pSide || '-', values, conf: mean(r.pC)});
      }
    } else for (const s of r.sides) {
      if (r.n[s] < 5) session.results.push({...base, side:s, value:null, note:'Yetersiz veri – doğru yöne dönün, eklem görünsün'});
      else session.results.push({...base, side:s, m:r.def.m, value: Math.round(r.peak[s]), conf: mean(r.confs[s]), ref: r.def.ref, refText: r.def.refText});
    }
    dirty = true;
    renderResults(); renderTest(); refreshHistory();
  }

  // ---------------- ekrana çizim ----------------
  function arc(ctx, r, sc){
    const [a, b, c] = r.ids.map(pt);
    const d1 = r.kind === 'between' ? norm(sub(a, b)) : norm(sub(b, a)), d2 = norm(sub(c, b));
    const a1 = Math.atan2(d1.y, d1.x), a2 = Math.atan2(d2.y, d2.x);
    let da = a2 - a1; while (da > Math.PI) da -= 2*Math.PI; while (da < -Math.PI) da += 2*Math.PI;
    const R = 46 * sc;
    ctx.save();
    ctx.strokeStyle = confColor(r.c); ctx.lineWidth = 3*sc;
    ctx.beginPath(); ctx.arc(b.x, b.y, R, a1, a1 + da, da < 0); ctx.stroke();
    ctx.setLineDash([4*sc, 4*sc]); ctx.lineWidth = 1.5*sc;
    for (const d of [d1, d2]) { ctx.beginPath(); ctx.moveTo(b.x, b.y); ctx.lineTo(b.x + d.x*R*1.6, b.y + d.y*R*1.6); ctx.stroke(); }
    ctx.restore();
    const mid = a1 + da/2;
    bigText(ctx, `${Math.round(r.v)}°`, b.x + Math.cos(mid)*R*1.9, b.y + Math.sin(mid)*R*1.9, sc, confColor(r.c));
  }
  function bigText(ctx, t, x, y, sc, color, size = 28){
    ctx.save(); ctx.font = `700 ${size*sc}px -apple-system,Inter,sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.lineWidth = 5*sc; ctx.strokeStyle = 'rgba(0,0,0,0.75)'; ctx.strokeText(t, x, y);
    ctx.fillStyle = color || '#fff'; ctx.fillText(t, x, y); ctx.restore();
  }
  function banner(ctx, now, w, h, sc){
    const def = run.def;
    ctx.save();
    ctx.fillStyle = 'rgba(4,10,18,0.78)'; ctx.fillRect(0, 0, w, 64*sc);
    ctx.fillStyle = '#cfe8ff'; ctx.font = `600 ${18*sc}px -apple-system,Inter,sans-serif`; ctx.textBaseline = 'middle';
    const sideTxt = run.sides.length === 1 ? ` – ${SIDE_TR[run.sides[0]]}` : '';
    ctx.fillText(`${def.name}${sideTxt}`, 16*sc, 22*sc);
    ctx.font = `${13*sc}px -apple-system,Inter,sans-serif`; ctx.fillStyle = '#9fb3c8';
    ctx.fillText(def.how, 16*sc, 46*sc);
    if (run.phase === 'rec') {
      const t = Math.min(1, (now - run.tr) / (def.dur || 7000));
      ctx.fillStyle = '#7cc4ff'; ctx.fillRect(0, 62*sc, w*t, 3*sc);
    }
    ctx.restore();
    if (run.phase === 'count') bigText(ctx, String(3 - Math.floor((now - run.t0) / 1000)), w/2, h/2, sc, '#fff', 110);
    if (!run.viewOK) bigText(ctx, def.view === 'front' ? 'Kameraya ÖNDEN dönün' : 'Kameraya YAN dönün', w/2, h - 70*sc, sc, '#f5c542', 26);
    if (run.phase === 'rec' && !def.posture) {
      run.sides.forEach((s, i) => {
        const best = run.peak[s];
        if (best != null) bigText(ctx, `${SIDE_TR[s]} en iyi: ${fmtVal(def.m, best)}`, w - 150*sc, 100*sc + i*34*sc, sc, '#3ddc84', 20);
        const r = run.live[s];
        if (r && r.c >= MID && run.viewOK) {
          if (r.kind === 'text') bigText(ctx, fmtVal(def.m, r.v), pt(r.ids[1]).x + 60*sc, pt(r.ids[1]).y, sc, confColor(r.c));
          else arc(ctx, r, sc);
        }
      });
    }
  }
  function disclaimer(ctx, w, h, sc){
    ctx.save(); ctx.font = `${11*sc}px -apple-system,Inter,sans-serif`; ctx.textBaseline = 'bottom';
    const t = 'Şematik görüntü · ölçümler 2B kamera tahminidir · tanı amaçlı değildir';
    const tw = ctx.measureText(t).width;
    ctx.fillStyle = 'rgba(0,0,0,0.55)'; ctx.fillRect(8*sc, h - 26*sc, tw + 16*sc, 20*sc);
    ctx.fillStyle = '#c9d6e3'; ctx.fillText(t, 16*sc, h - 10*sc); ctx.restore();
  }
  function draw(ctx, now){
    const w = ctx.canvas.width, h = ctx.canvas.height, sc = w / 1280;
    if (run) update(now);
    if (run) banner(ctx, now, w, h, sc);
    disclaimer(ctx, w, h, sc);
    renderLive(now);
  }

  // ---------------- seans ----------------
  function newSession(){
    const last = store.get('xray-clinic', {});
    return {code: last.code || '', height: last.height || null, date: Date.now(), notes:'', results:[]};
  }
  function resultText(r){
    if (r.value == null && !r.values) return `<span class="muted">${esc(r.note)}</span>`;
    if (r.values) return Object.entries(r.values).map(([k, v]) => `${POSTURE_NAMES[k]}: ${fmtPosture(k, v)}`).join('<br>');
    return `<b>${fmtVal(r.m, r.value)}</b>${r.ref ? ` <span class="muted">/ ref ${r.ref}°</span>` : ''}`;
  }
  // Sunucu saatleri UTC tutar ve saat dilimi eklemez → yerel saate doğru çevir
  const parseServerDate = v => Date.parse(/[zZ]$|[+-]\d\d:?\d\d$/.test(v || '') ? v : (v || '') + 'Z');
  const fmtDate = d => new Date(d).toLocaleString('tr-TR', {day:'numeric', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit'});
  function renderResults(){
    updateButtons();
    const el = $('#cl-results'), list = shown();
    const banner = viewing ? `<div class="cl-banner">📜 Geçmiş analiz · <b>${esc(fmtDate(viewing.date))}</b> (salt okunur)</div>` : '';
    if (!list.length) { el.innerHTML = banner + '<p class="muted">Henüz test sonucu yok.</p>'; return; }
    el.innerHTML = banner + list.map((r, i) => `<div class="cl-res">
      <div><b>${esc(r.name)}</b> · ${SIDE_TR[r.side] || '—'} ${r.conf != null ? `<i style="background:${confColor(r.conf)}" title="Güven: ${confWord(r.conf)}"></i>` : ''}<br>${resultText(r)}</div>
      ${viewing ? '' : `<button data-del="${i}" title="Sil">✕</button>`}</div>`).join('');
    el.querySelectorAll('[data-del]').forEach(b => b.onclick = () => { session.results.splice(+b.dataset.del, 1); dirty = true; renderResults(); renderTest(); });
  }
  function saveMeta(){ store.set('xray-clinic', {code: session.code, height: session.height}); }
  function history(){ return store.get('xray-history', {}); }
  const slimResults = () => session.results.map(({snapshot, ...r}) => r);   // görüntüler saklanmaz
  let records = [];                                                        // kayıtlı analizler (yeniden eskiye)
  async function loadRecords(){
    if (api.remote) {
      try { records = (await api.remote.list()).map(x => ({id: x.id, date: parseServerDate(x.created_at), results: x.results || [], notes: x.notes || '', height: x.height})); }
      catch (e) { flash('Geçmiş analizler alınamadı.', true); }
    } else {
      records = (history()[session.code] || []).map(x => ({...x, id: 'L' + x.date})).sort((a, b) => b.date - a.date);
    }
    return records;
  }
  async function refreshHistory(){
    await loadRecords();
    const sel = $('#cl-histsel'); if (!sel) return;
    const cur = viewing ? String(viewing.id) : '';
    let opts = `<option value="">📜 Geçmiş Analizler${records.length ? ' (' + records.length + ')' : ''}</option>`;
    if (viewing || session.results.length) opts += `<option value="__new">✨ + Yeni Analiz</option>`;
    if (viewing && dirty && session.results.length) opts += `<option value="__live">↩ Kaydedilmemiş ölçüme dön</option>`;
    opts += records.map(r => `<option value="${esc(String(r.id))}">${esc(fmtDate(r.date))} · ${r.results.length} sonuç</option>`).join('');
    sel.innerHTML = opts; sel.value = cur;
    renderHist();
  }
  async function onHistoryChange(v){
    if (v === '__new') {
      if (!viewing && dirty && session.results.length && !confirm('Kaydedilmemiş ölçümler silinecek. Devam edilsin mi?')) { $('#cl-histsel').value = ''; return; }
      viewing = null; session = newSession(); dirty = false; $('#cl-notes').value = '';
      flash('Yeni analiz başladı.');
    } else if (v === '__live' || v === '') {
      viewing = null; $('#cl-notes').value = session.notes || '';
    } else {
      const rec = records.find(r => String(r.id) === v); if (!rec) return;
      viewing = rec; $('#cl-notes').value = rec.notes || '';
    }
    $('#cl-notes').readOnly = !!viewing;
    renderResults(); renderTest(); refreshHistory();
  }
  async function saveSession(){
    if (viewing) return;
    if (!session.results.length) { flash('Kaydedilecek sonuç yok. Önce bir test yapın.', true); return; }
    const payload = {results: slimResults(), notes: session.notes, height: session.height};
    if (api.remote) {
      try {
        const r = session.savedId ? await api.remote.update(session.savedId, payload) : await api.remote.save(payload);
        session.savedId = r.id;
        flash(`✓ Analiz kaydedildi (${fmtDate(parseServerDate(r.created_at))}).`);
      } catch (e) { flash('Kaydedilemedi: ' + (e.message || 'bağlantı hatası'), true); return; }
    } else {
      if (!session.code) { flash('Önce hasta kodu girin.', true); return; }
      const hst = history(), list = hst[session.code] || [];
      const slim = {date: session.date, ...payload};
      const i = list.findIndex(x => x.date === session.date);
      if (i >= 0) list[i] = slim; else list.push(slim);
      hst[session.code] = list.slice(-30);
      if (!store.set('xray-history', hst)) { flash('Kaydedilemedi (tarayıcı depolaması kapalı).', true); return; }
      session.savedId = 'L' + session.date;
      flash('✓ Analiz bu cihaza kaydedildi.');
    }
    dirty = false; updateButtons(); refreshHistory();
  }
  function renderHist(){
    const el = $('#cl-hist'); if (!el) return;
    el.textContent = records.length ? `Bu hastanın kayıtlı X-Ray analizi: ${records.length} · son: ${fmtDate(records[0].date)}` : 'Bu hasta için henüz kayıtlı X-Ray analizi yok.';
  }
  function updateButtons(){
    const save = $('#cl-save'), pdf = $('#cl-pdf');
    if (save) save.hidden = !(!viewing && session.results.length && dirty);
    if (pdf) pdf.hidden = !shown().length;
  }
  function showInfo(k){
    try { if (window.parent !== window && typeof window.parent.showInfoPopup === 'function') { window.parent.showInfoPopup('xray_' + k); return; } } catch (e) {}
    const d = TESTS[k]; alert(d.name + '\n\n' + (d.how || ''));
  }
  function flash(t, bad){ const el = $('#cl-flash'); el.textContent = t; el.className = bad ? 'bad' : 'ok'; clearTimeout(flash.t); flash.t = setTimeout(() => { el.textContent = ''; }, 6000); }

  // ---------------- rapor ----------------
  async function report(){
    const src = viewing ? viewing : {results: src.results, notes: src.notes, date: src.date, height: src.height, id: session.savedId};
    if (!src.results.length) { flash('Rapora girecek sonuç yok. Önce bir test yapın.', true); return; }
    await loadRecords();
    const prev = records.filter(x => String(x.id) !== String(src.id) && x.date < src.date).sort((a, b) => a.date - b.date).slice(-5);
    const dt = d => new Date(d).toLocaleString('tr-TR', {dateStyle:'medium', timeStyle:'short'});
    const rom = src.results.filter(r => r.m && r.value != null);
    const rows = rom.map(r => `<tr><td>${esc(r.name)}</td><td>${SIDE_TR[r.side]}</td><td><b>${fmtVal(r.m, r.value)}</b></td>
      <td>${r.ref ? r.ref + '°' : esc(r.refText || '—')}</td><td>${r.ref ? Math.round(r.value / r.ref * 100) + '%' : '—'}</td><td>${confWord(r.conf)}</td></tr>`).join('');
    // sağ–sol karşılaştırma: her test için son sol ve son sağ değer
    const byTest = {};
    for (const r of rom) (byTest[r.test] ||= {name:r.name, m:r.m})[r.side] = r.value;
    const lr = Object.values(byTest).filter(t => t.L != null && t.R != null).map(t => {
      const d = Math.abs(t.L - t.R);
      return `<tr><td>${esc(t.name)}</td><td>${fmtVal(t.m, t.L)}</td><td>${fmtVal(t.m, t.R)}</td><td class="${d >= 10 ? 'flag' : ''}">${d}°${d >= 10 ? ' – belirgin fark' : ''}</td></tr>`;
    }).join('');
    const post = src.results.filter(r => r.values).map(r => `<h3>${esc(r.name)} <small>(${dt(r.ts)}, güven: ${confWord(r.conf)})</small></h3>
      <table>${Object.entries(r.values).map(([k, v]) => `<tr><td>${POSTURE_NAMES[k]}</td><td>${fmtPosture(k, v)}</td></tr>`).join('')}</table>`).join('');
    const failed = src.results.filter(r => r.value == null && !r.values).map(r => `<li>${esc(r.name)} (${SIDE_TR[r.side]}): ${esc(r.note)}</li>`).join('');
    const prevRows = prev.flatMap(s => s.results.filter(r => r.value != null).map(r =>
      `<tr><td>${dt(s.date)}</td><td>${esc(r.name)}</td><td>${SIDE_TR[r.side]}</td><td>${fmtVal(r.m, r.value)}</td></tr>`)).join('');
    const imgs = src.results.filter(r => r.snapshot).map(r =>
      `<figure><img src="${r.snapshot}"><figcaption>${esc(r.name)} · ${SIDE_TR[r.side]} · ${r.value != null ? fmtVal(r.m, r.value) : 'duruş'}</figcaption></figure>`).join('');

    const css = `
.rp{font:12.5px/1.5 -apple-system,Segoe UI,Inter,Arial,sans-serif;color:#111;background:#fff;padding:4px 6px}
.rp h1{font-size:20px;margin:0 0 4px}.rp h2{font-size:14.5px;margin:18px 0 8px;border-bottom:1px solid #ccc;padding-bottom:4px}.rp h3{font-size:13px;margin:12px 0 6px}
.rp small{color:#666;font-weight:400}.rp .meta{color:#444}.rp .warn{background:#fff6e0;border:1px solid #f0c36d;padding:9px 11px;border-radius:6px;margin:12px 0}
.rp table{border-collapse:collapse;width:100%}.rp td,.rp th{border:1px solid #ddd;padding:5px 7px;text-align:left}.rp th{background:#f3f5f8}
.rp .flag{color:#b3261e;font-weight:600}.rp figure{display:inline-block;width:48%;margin:0 1% 10px;vertical-align:top}.rp img{width:100%;border-radius:4px}
.rp figcaption{font-size:11px;color:#555}.rp .sign{margin-top:34px;display:flex;gap:40px}.rp .sign div{flex:1;border-top:1px solid #999;padding-top:4px;color:#555}
.rp ul{margin:6px 0;padding-left:18px}`;
    const body = `<h1>Hareket ve Duruş Ölçüm Raporu</h1>
<div class="meta">${window.__cbPatientName ? `Hasta: <b>${esc(window.__cbPatientName)}</b> (${esc(session.code)}) ·` : `Hasta kodu: <b>${esc(session.code) || '—'}</b>`} · Seans: ${dt(src.date)} · Boy: ${src.height ? esc(src.height) + ' cm' : '—'}<br>
Yöntem: tek kamera, MediaPipe Pose (33 nokta), 2 boyutlu iz düşüm açıları; her değer 5 karelik medyan filtreden geçen en iyi değerdir.</div>
<div class="warn"><b>Önemli:</b> Bu rapor deneysel bir yazılımın ürettiği tahmini değerlerdir. Doğrulanmış bir ölçüm cihazı değildir,
tanı veya tedavi kararı için tek başına kullanılmamalıdır. İskelet görüntüsü şematiktir, hastanın gerçek kemik yapısını göstermez.
Açılar, hareket kameraya paralel düzlemde yapıldığında en doğrudur; kıyafet, ışık ve kamera açısı sonucu etkiler.</div>
${rows ? `<h2>Eklem hareket açıklığı</h2><table><tr><th>Test</th><th>Taraf</th><th>Ölçülen</th><th>Referans*</th><th>Referansa göre</th><th>Güven</th></tr>${rows}</table>
<p><small>* AAOS ortalama normal değerleri; yaşa, cinsiyete ve kişiye göre değişir. FPPA: önden diz açısı, + valgus (diz içe).</small></p>` : ''}
${lr ? `<h2>Sağ – sol karşılaştırma</h2><table><tr><th>Test</th><th>Sol</th><th>Sağ</th><th>Fark</th></tr>${lr}</table>` : ''}
${post ? `<h2>Duruş analizi</h2>${post}<p><small>CVA burada kulak ile omuz noktası arasından yaklaşık hesaplanır; klinik CVA tragus–C7 ile ölçülür.</small></p>` : ''}
${failed ? `<h2>Ölçülemeyen testler</h2><ul>${failed}</ul>` : ''}
${prevRows ? `<h2>Önceki seanslar (son ${prev.length})</h2><table><tr><th>Tarih</th><th>Test</th><th>Taraf</th><th>Değer</th></tr>${prevRows}</table>` : ''}
${src.notes ? `<h2>Klinik notlar</h2><p>${esc(src.notes).replace(/\n/g, '<br>')}</p>` : ''}
${imgs ? `<h2>Görüntüler (en iyi değer anı)</h2>${imgs}` : ''}
<div class="sign"><div>Değerlendiren</div><div>İmza / Tarih</div></div>
`;
    const fname = `xray-rapor-${(session.code || 'hasta').replace(/[^A-Za-z0-9_-]+/g, '_')}-${new Date().toISOString().slice(0, 10)}.pdf`;
    if (typeof html2pdf === 'undefined') { flash('PDF kütüphanesi yüklenemedi; internet bağlantısını kontrol edin.', true); return; }
    flash('PDF hazırlanıyor…');
    const host = document.createElement('div');
    host.style.cssText = 'position:fixed;left:-10000px;top:0;width:794px;background:#fff';
    host.innerHTML = `<style>${css}</style><div class="rp">${body}</div>`;
    document.body.appendChild(host);
    try {
      await html2pdf().set({margin:[10, 10, 12, 10], filename: fname, image:{type:'jpeg', quality:0.95},
        html2canvas:{scale:2, backgroundColor:'#ffffff'}, jsPDF:{unit:'mm', format:'a4', orientation:'portrait'},
        pagebreak:{mode:['css', 'legacy'], avoid:['tr', 'figure', '.warn', 'h2']}}).from(host.querySelector('.rp')).save();
      flash('✓ PDF rapor indirildi: ' + fname);
    } catch (e) { console.error(e); flash('PDF oluşturulamadı.', true); }
    finally { host.remove(); }
  }

  // ---------------- arayüz bağlantıları ----------------
  $('#cl-code').value = session.code; $('#cl-height').value = session.height || '';
  $('#cl-code').oninput = e => { session.code = e.target.value.trim(); saveMeta(); renderHist(); };
  $('#cl-height').oninput = e => { const v = parseFloat(e.target.value); session.height = v >= 100 && v <= 230 ? v : null; saveMeta(); };
  $('#cl-notes').oninput = e => { if (viewing) return; session.notes = e.target.value; if (session.results.length) { dirty = true; updateButtons(); } };
  $('#cl-pdf').onclick = report;
  $('#cl-save').onclick = saveSession;
  $('#cl-histsel').onchange = e => onHistoryChange(e.target.value);
  addEventListener('keydown', e => { if (e.key === 'Escape' && run) { stop(true); flash('Test iptal edildi.'); } });
  if (api.remote) $('#cl-store-hint').textContent = 'Seanslar hastanın CIBODY kaydına kaydedilir (yalnızca ölçüm değerleri; görüntüler saklanmaz).';
  renderTest(); renderResults(); refreshHistory();

  return { draw, height: () => session.height, running: () => !!run };
}

function injectUI(){
  const css = document.createElement('style');
  css.textContent = `
  .cl-badge{font-size:9px;background:#3a2c0b;color:#f5c542;border-radius:4px;padding:1px 5px;margin-left:6px;letter-spacing:.06em}
  .cl-in{display:grid;grid-template-columns:1fr 90px;gap:8px;margin-bottom:10px}
  .cl-in label{font-size:11.5px;color:var(--muted);display:flex;flex-direction:column;gap:3px}
  .cl-in input,#cl-notes{font:inherit;font-size:13px;color:var(--text);background:#070b11;border:1px solid var(--line);border-radius:7px;padding:6px 8px;width:100%}
  #cl-live{width:100%;border-collapse:collapse;font-size:12.5px}
  #cl-live td,#cl-live th{padding:4px 3px;text-align:left;border-bottom:1px solid var(--line);white-space:nowrap}
  #cl-live th{color:var(--muted);font-weight:500;font-size:11px}
  #cl-live i,.cl-res i{display:inline-block;width:7px;height:7px;border-radius:50%;margin-right:5px;vertical-align:middle}
  .muted{color:var(--muted)} td.warn{color:#ff8a65;font-weight:600}
  #cl-posture{font-size:12.5px;margin-top:8px;line-height:1.6} #cl-posture span{color:#cfe8ff}
  #cl-how{font-size:12.5px;color:#bcd0e4;margin:10px 0 8px;line-height:1.5}
  .cl-grid{display:grid;grid-template-columns:1fr;gap:8px}
  .cl-tcard{border:1px solid var(--line);border-radius:12px;padding:9px 10px;background:rgba(255,255,255,.02);transition:border-color .15s}
  .cl-tcard:hover{border-color:color-mix(in srgb,var(--accent) 45%,var(--line))}
  .cl-tcard.active{border-color:var(--accent);box-shadow:0 0 0 1px var(--accent) inset}
  .cl-thead{display:flex;gap:9px;align-items:center}
  .cl-ico{font-size:20px;width:30px;height:30px;display:flex;align-items:center;justify-content:center;border-radius:9px;background:rgba(255,255,255,.05);flex:none}
  .cl-tname{font-weight:600;font-size:13px;line-height:1.2}
  .cl-tmeta{font-size:11px;color:var(--muted);margin-top:2px}
  .cl-view{font-weight:700;letter-spacing:.06em;color:var(--accent)}
  .cl-tact{display:flex;gap:6px;margin-top:8px}
  .cl-side{flex:1;padding:6px 8px;font-size:12.5px;border-radius:8px;border:1px solid var(--line);background:transparent;color:var(--text);cursor:pointer}
  .cl-side:hover:not(:disabled){border-color:var(--accent);color:var(--accent)}
  .cl-side:disabled{opacity:.45;cursor:not-allowed}
  .cl-side.done{border-color:color-mix(in srgb,#3ddc84 55%,transparent);color:#3ddc84}
  .cl-side.bad{border-color:color-mix(in srgb,#ff8a65 55%,transparent);color:#ff8a65}
  .cl-side b{font-weight:700}
  .cl-info{flex:none;width:22px;height:22px;border-radius:50%;border:1px solid var(--line);background:transparent;color:var(--muted);font:700 12px/1 Georgia,serif;font-style:italic;cursor:pointer;padding:0;display:flex;align-items:center;justify-content:center}
  .cl-info:hover{color:var(--accent);border-color:var(--accent)}
  .cl-histsel{width:auto;min-width:220px;font-weight:700;padding:8px 10px;border-radius:9px}
  header .btns{align-items:center;flex-wrap:wrap}
  .cl-savebtn{background:#f59e0b!important;color:#1f1300!important;border:0!important;font-weight:700}
  .cl-pdfbtn{font-weight:700}
  .cl-banner{background:rgba(124,196,255,.08);border:1px solid var(--line);border-radius:9px;padding:7px 9px;font-size:12px;margin-bottom:6px}
  #cl-notes[readonly]{opacity:.7}
  .cl-btns{display:flex;gap:6px;flex-wrap:wrap}
  .cl-btns button{flex:1;min-width:90px}
  #cl-btns button{background:var(--accent);color:var(--accent-ink);border:0;font-weight:600}
  #cl-btns button.ghost{background:#111a26;color:var(--text);border:1px solid var(--line)}
  .cl-res{display:flex;justify-content:space-between;gap:8px;padding:7px 0;border-bottom:1px solid var(--line);font-size:12.5px}
  .cl-res button{padding:2px 7px;font-size:11px;align-self:flex-start}
  #cl-notes{min-height:54px;margin:10px 0 8px;resize:vertical}
  #cl-flash{font-size:12.5px;min-height:16px;margin:8px 0 0;font-weight:600}#cl-flash.ok{color:#3ddc84}#cl-flash.bad{color:#ff8a65}
  .cl-btns button:disabled{opacity:.45;cursor:not-allowed}`;
  document.head.appendChild(css);
  const html = `
  <div class="card" id="cl-card-live">
    <h3>Klinik ölçümler<span class="cl-badge">DENEYSEL</span></h3>
    <div class="cl-in">
      <label>Hasta kodu (isim yazmayın)<input id="cl-code" placeholder="örn. H-0123" autocomplete="off"></label>
      <label>Boy (cm)<input id="cl-height" type="number" min="100" max="230" placeholder="175"></label>
    </div>
    <table id="cl-live"></table>
    <div id="cl-posture"></div>
    <p class="hint">● yeşil güvenilir · ● sarı dikkatli yorumla · — ölçülemiyor. Değerler 2B kamera tahminidir, gonyometrenin yerini tutmaz.</p>
  </div>
  <div class="card">
    <h3>Standart testler</h3>
    <div id="cl-grid" class="cl-grid"></div>
    <p id="cl-how"></p>
    <div class="cl-btns" id="cl-btns"></div>
    <p class="hint">YANDAN / ÖNDEN: hastanın kameraya nasıl duracağı. Yeşil = ölçüldü, turuncu = ölçülemedi (tekrar deneyin). Esc: iptal.</p>
  </div>
  <div class="card">
    <h3>Bu analizin sonuçları</h3>
    <div id="cl-results"></div>
    <textarea id="cl-notes" placeholder="Klinik notlar (rapora eklenir)"></textarea>
    <p id="cl-flash"></p>
    <p class="hint" id="cl-hist"></p>
    <p class="hint" id="cl-store-hint">Kayıtlar yalnızca bu bilgisayarın tarayıcısında tutulur, hiçbir yere gönderilmez.</p>
  </div>`;
  document.querySelector('.side').insertAdjacentHTML('afterbegin', html);
  const head = document.querySelector('header .btns');
  if (head) head.insertAdjacentHTML('afterbegin', `
    <select id="cl-histsel" class="cl-histsel" title="Kayıtlı X-Ray analizleri"><option value="">📜 Geçmiş Analizler</option></select>
    <button id="cl-save" class="cl-savebtn" hidden>💾 Kaydet</button>
    <button id="cl-pdf" class="cl-pdfbtn" hidden>📄 İndir</button>`);
}
