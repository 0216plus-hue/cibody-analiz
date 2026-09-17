import re

# 1. Update index.html
with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/index.html', 'r') as f:
    html = f.read()

notes_html = """                    <!-- Terapist / Doktor Notları -->
                    <div id="clinicalNotesSection" class="mt-12 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
                        <div class="flex justify-between items-center mb-4 border-b border-slate-100 pb-4">
                            <h2 class="text-xl font-bold text-slate-800"><i class="fa-solid fa-user-doctor text-indigo-600 mr-2"></i>Uzman Klinik Notları</h2>
                            <span class="text-xs font-semibold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">Sadece bu analize özel</span>
                        </div>
                        <p class="text-sm text-slate-500 mb-4">Bu alana gireceğiniz notlar hastanın bu tarihli analiz raporuna eklenecektir ve PDF çıktısında görünecektir.</p>
                        <textarea id="clinicalNotesInput" rows="5" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-900 focus:border-indigo-900 transition-all resize-y" placeholder="Hasta şikayetleri, manuel test bulguları, uygulanacak protokol veya tavsiyelerinizi buraya yazabilirsiniz..."></textarea>
                        <div class="mt-4 flex justify-end">
                            <button onclick="saveClinicalNotes()" class="bg-indigo-900 hover:bg-indigo-800 text-white font-bold py-2 px-6 rounded-lg shadow-sm transition-all flex items-center gap-2">
                                <i class="fa-solid fa-save"></i> Notları Kaydet
                            </button>
                        </div>
                    </div>

                </div> <!-- End of postureResultsSection -->"""

if "clinicalNotesSection" not in html:
    html = html.replace('                </div> <!-- End of postureResultsSection -->', notes_html)
    with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/index.html', 'w') as f:
        f.write(html)
    print("index.html updated with Notes UI.")
else:
    print("Notes UI already exists in HTML.")

# 2. Update app.js
with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/app.js', 'r') as f:
    js = f.read()

# Add currentAnalysisId global
if "let currentAnalysisId = null;" not in js:
    js = js.replace('let currentPatientAnalyses = [];', 'let currentPatientAnalyses = [];\nlet currentAnalysisId = null;')

# Update renderHistoricalAnalysis to set currentAnalysisId and text value
old_render_start = """function renderHistoricalAnalysis(index) {
    if(!currentPatientAnalyses || currentPatientAnalyses.length <= index) return;
    
    const targetAnalysis = currentPatientAnalyses[index];
    const parsed = JSON.parse(targetAnalysis.analysis_data);
    
    globalPostureState = {"""

new_render_start = """function renderHistoricalAnalysis(index) {
    if(!currentPatientAnalyses || currentPatientAnalyses.length <= index) return;
    
    const targetAnalysis = currentPatientAnalyses[index];
    currentAnalysisId = targetAnalysis.id;
    
    // Notları Textarea'ya yükle
    const notesInput = document.getElementById('clinicalNotesInput');
    if(notesInput) {
        notesInput.value = targetAnalysis.clinical_notes || '';
    }
    
    const parsed = JSON.parse(targetAnalysis.analysis_data);
    
    globalPostureState = {"""

if "currentAnalysisId = targetAnalysis.id;" not in js:
    js = js.replace(old_render_start, new_render_start)

# Add saveClinicalNotes function
save_fn = """
async function saveClinicalNotes() {
    if(!currentAnalysisId) return;
    const btn = event.currentTarget;
    const originalText = btn.innerHTML;
    const notes = document.getElementById('clinicalNotesInput').value;
    
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Kaydediliyor...';
    btn.disabled = true;
    
    try {
        const res = await fetch(`/api/posture/${currentAnalysisId}/notes`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ notes: notes })
        });
        
        if(res.ok) {
            showToast("Klinik notlar başarıyla kaydedildi!");
            // Güncel veriyi hafızada da güncelle ki menüden değiştirince gitmesin
            const currentAnalysis = currentPatientAnalyses.find(a => a.id === currentAnalysisId);
            if(currentAnalysis) currentAnalysis.clinical_notes = notes;
        } else {
            showToast("Notlar kaydedilirken hata oluştu.");
        }
    } catch(err) {
        showToast("Sunucu bağlantı hatası!");
    } finally {
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
}
"""

if "async function saveClinicalNotes()" not in js:
    # Append at the bottom
    js += "\n" + save_fn
    
with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/app.js', 'w') as f:
    f.write(js)
print("app.js updated with Notes logic.")

