with open("frontend/scoliosis.js", "r") as f:
    js = f.read()

import re

old_func = re.search(r'async function loadScoliosisHistory\(\) \{.*?catch\(e\) \{ console.error\(e\); \}\n\}', js, re.DOTALL).group(0)

new_func = """async function loadScoliosisHistory() {
    if(!currentPatientId) return;
    try {
        const res = await authFetch(`/api/scoliosis/patient/${currentPatientId}`);
        if(res.ok) {
            const data = await res.json();
            const list = document.getElementById('scoliosisHistoryList');
            if(data.length === 0) {
                list.innerHTML = '<div class="text-center text-slate-400 py-4 w-full">Kayıt bulunamadı.</div>';
                return;
            }
            
            // To show oldest to newest (Before -> After), we can reverse the array
            // since backend returns desc (newest first). Let's keep it desc or asc?
            // "ilk tarihten itibaren yan yana listelensin" -> Ascending!
            data.reverse();

            let html = '';
            data.forEach((item, index) => {
                const dateStr = new Date(item.created_at + 'Z').toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' });
                const imgUrl = item.image_path ? `/${item.image_path}` : 'https://via.placeholder.com/150?text=Gorsel+Yok';
                let badge = index === 0 ? '<span class="absolute top-1 left-1 bg-indigo-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow">İLK (BEFORE)</span>' : 
                            (index === data.length - 1 && data.length > 1 ? '<span class="absolute top-1 left-1 bg-emerald-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow">SON (AFTER)</span>' : '');
                html += `
                    <div class="flex-shrink-0 w-36 relative bg-white border border-slate-200 rounded-xl overflow-hidden hover:ring-2 ring-indigo-500 cursor-pointer snap-start transition-all group" onclick="loadScoliosisAnalysis(${item.id})">
                        ${badge}
                        <img src="${imgUrl}" class="w-full h-36 object-cover object-top" onerror="this.src='https://via.placeholder.com/150?text=Gorsel+Yok'"/>
                        <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-2 pt-6">
                            <p class="font-black text-white text-sm leading-tight flex items-center justify-between">
                                <span>${item.cobb_angle || '0'}°</span>
                                <span class="text-[10px] text-white/70 font-normal">${dateStr}</span>
                            </p>
                        </div>
                        <button onclick="event.stopPropagation(); deleteScoliosis(${item.id})" class="absolute top-1 right-1 bg-black/50 text-white rounded-full w-6 h-6 flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 hover:bg-rose-600 transition-all backdrop-blur-sm"><i class="fa-solid fa-trash"></i></button>
                    </div>
                `;
            });
            list.innerHTML = html;
        }
    } catch(e) { console.error(e); }
}"""

js = js.replace(old_func, new_func)

with open("frontend/scoliosis.js", "w") as f:
    f.write(js)
print("Updated loadScoliosisHistory")
