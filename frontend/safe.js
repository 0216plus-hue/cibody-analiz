// ─────────────────────────────────────────────
//  CIBODY — güvenlik yardımcıları (ön yüz)
//  - escapeHtml / jsAttr: kullanıcı verisini sayfaya güvenle yazmak için
//  - safeMarkdown: yapay zekâ raporlarını ve notları zararlı koddan temizleyerek göstermek için
//  - qrDataUrl: karekodu tarayıcıda üretir (dış servise veri gitmez)
//  - qrDeliverPdf: PDF'i tarayıcıda şifreler, karekodla hastanın telefonuna tek seferlik teslim eder
// ─────────────────────────────────────────────
(function () {
    function escapeHtml(v) {
        return String(v == null ? '' : v)
            .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    }
    // onclick="fn('${jsAttr(x)}')" içinde güvenli kullanım (önce JS, sonra HTML kaçışı)
    function jsAttr(v) {
        return escapeHtml(String(v == null ? '' : v)
            .replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '\\"')
            .replace(/\r?\n/g, '\\n').replace(/<\/script/gi, '<\\/script'));
    }
    function safeMarkdown(md) {
        const text = md == null ? '' : String(md);
        if (typeof marked === 'undefined') return escapeHtml(text).replace(/\n/g, '<br>');
        const html = marked.parse(text);
        if (typeof DOMPurify === 'undefined') return escapeHtml(text).replace(/\n/g, '<br>');
        return DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });
    }
    function qrDataUrl(text, size) {
        if (typeof QRCode === 'undefined') return '';
        const box = document.createElement('div');
        new QRCode(box, { text: String(text), width: size || 150, height: size || 150, correctLevel: QRCode.CorrectLevel.M });
        const c = box.querySelector('canvas');
        return c ? c.toDataURL('image/png') : (box.querySelector('img') || {}).src || '';
    }

    const b64u = bytes => btoa(String.fromCharCode.apply(null, Array.from(bytes)))
        .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

    function showQrModal(url, filename) {
        let modal = document.getElementById('qrModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'qrModal';
            modal.className = 'fixed inset-0 bg-black/60 z-50 flex items-center justify-center hidden';
            document.body.appendChild(modal);
        }
        const _t = (window.translateText || (s => s));
        modal.innerHTML = `
            <div class="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 text-center shadow-2xl relative">
                <button onclick="document.getElementById('qrModal').classList.add('hidden')" class="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
                    <i class="fa-solid fa-xmark text-xl"></i>
                </button>
                <h3 class="text-xl font-bold text-indigo-900 mb-2">${escapeHtml(_t('Hasta Karekodu'))}</h3>
                <p class="text-sm text-slate-500 mb-5">${escapeHtml(_t('Hastanız bu karekodu telefonuna okutunca PDF raporu telefonuna indirilir.'))}</p>
                <div class="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-4 inline-block">
                    <img src="${qrDataUrl(url, 240)}" alt="QR" class="w-56 h-56 object-contain mx-auto">
                </div>
                <p class="text-xs text-slate-500 leading-relaxed"><i class="fa-solid fa-lock text-emerald-500"></i>
                    ${escapeHtml(_t('Tek kullanımlıktır ve 15 dakika geçerlidir. Rapor şifreli gönderilir, indirildikten sonra sistemde tutulmaz.'))}</p>
                <p class="text-[11px] text-slate-400 mt-2">${escapeHtml(filename)}</p>
            </div>`;
        modal.classList.remove('hidden');
    }

    async function qrDeliverPdf(pdfBlob, filename) {
        if (!window.crypto || !crypto.subtle) throw new Error('Tarayıcı şifrelemeyi desteklemiyor (HTTPS gerekli).');
        const key = crypto.getRandomValues(new Uint8Array(32));
        const iv = crypto.getRandomValues(new Uint8Array(12));
        const ck = await crypto.subtle.importKey('raw', key, 'AES-GCM', false, ['encrypt']);
        const enc = new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, ck, await pdfBlob.arrayBuffer()));
        const payload = new Uint8Array(iv.length + enc.length);
        payload.set(iv, 0); payload.set(enc, iv.length);
        const fd = new FormData();
        fd.append('file', new Blob([payload], { type: 'application/octet-stream' }), 'r.bin');
        const res = await authFetch('/api/handoff', { method: 'POST', body: fd });
        if (!res.ok) throw new Error('Karekod oluşturulamadı (' + res.status + ')');
        const { id } = await res.json();
        const safeName = String(filename || 'rapor.pdf').replace(/[^A-Za-z0-9._-]+/g, '_').slice(0, 60);
        // Anahtar "#" sonrasında: sunucuya hiç gönderilmez, sadece hastanın telefonunda kullanılır
        const url = `${location.origin}/indir.html#${id}.${b64u(key)}.${b64u(new TextEncoder().encode(safeName))}`;
        showQrModal(url, safeName);
        return url;
    }

    // Hasta görsellerinin (<img>) yüklenebilmesi için oturum çerezini tazele
    function refreshFileCookie() {
        try {
            const t = (typeof getToken === 'function') ? getToken() : null;
            if (!t) return;
            fetch('/api/auth/session-cookie', { method: 'POST', headers: { Authorization: 'Bearer ' + t }, credentials: 'same-origin' }).catch(() => {});
        } catch (e) {}
    }

    Object.assign(window, { escapeHtml, jsAttr, safeMarkdown, qrDataUrl, qrDeliverPdf, refreshFileCookie });
    refreshFileCookie();
})();
