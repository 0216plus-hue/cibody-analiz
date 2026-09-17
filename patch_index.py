import re

with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/index.html', 'r') as f:
    html = f.read()

# 1. Update Title and Meta
html = re.sub(r'<title>.*?</title>', '<title>CIBODY AI v2.1 - Biyomekanik Postür Analizi</title>', html)
html = html.replace('<meta name="description" content="Klinik Yönetim Sistemi">', '<meta name="description" content="CIBODY AI Biyomekanik Postür ve Ayak Basınç Analiz CRM Sistemi">\n    <meta name="robots" content="noindex, nofollow">')
html = html.replace('href="/favicon.ico"', 'href="/assets/logo.png"')

# 2. Update Header Logo
old_header_logo = """<i class="fa-solid fa-robot mr-2"></i> BiyoMekanik AI <span class="text-slate-400 font-normal text-sm ml-2">v2.0 CRM</span>"""
new_header_logo = """<img src="/assets/logo.png" class="h-6 md:h-8 mr-2" alt="CIBODY"><span class="text-slate-400 font-normal text-sm ml-2">v2.1 CRM</span>"""
html = html.replace(old_header_logo, new_header_logo)

# 3. Replace all purple-600 with indigo-900 for branding
html = html.replace('purple-600', 'indigo-900')
html = html.replace('purple-700', 'indigo-800')
html = html.replace('purple-50', 'indigo-50')
html = html.replace('purple-100', 'indigo-100')

# 4. Redesign Dashboard View
old_dashboard = re.search(r'<!-- DASHBOARD EKRANI -->.*?<!-- HASTA DETAY EKRANI -->', html, re.DOTALL).group(0)

new_dashboard = """<!-- DASHBOARD EKRANI -->
        <div id="dashboardView" class="block animate-fade-in">
            
            <div class="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 mb-8">
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <div class="flex items-center gap-3">
                        <i class="fa-solid fa-users text-indigo-900 text-xl"></i>
                        <h2 class="text-2xl font-bold text-slate-800">Kayıtlı Hastalar</h2>
                    </div>
                    
                    <div class="flex w-full md:w-auto items-center gap-3">
                        <div class="relative w-full md:w-64">
                            <i class="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                            <input type="text" id="patientSearch" placeholder="Hasta Ara..." class="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-900 focus:ring-1 focus:ring-indigo-900 transition-all text-sm">
                        </div>
                        <button onclick="document.getElementById('newPatientModal').classList.remove('hidden')" class="shrink-0 bg-indigo-900 hover:bg-indigo-800 text-white px-5 py-2 rounded-xl font-medium transition-colors shadow-sm flex items-center gap-2 text-sm">
                            <i class="fa-solid fa-user-plus"></i> <span class="hidden md:inline">Yeni Kayıt</span>
                        </button>
                    </div>
                </div>

                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="border-b border-slate-200 text-xs font-bold text-slate-400 uppercase tracking-wider">
                                <th class="pb-4 font-semibold">ID</th>
                                <th class="pb-4 font-semibold">Hasta Adı</th>
                                <th class="pb-4 font-semibold">Profil</th>
                                <th class="pb-4 font-semibold">İletişim</th>
                                <th class="pb-4 font-semibold text-right">İşlem</th>
                            </tr>
                        </thead>
                        <tbody id="patientsList" class="text-sm">
                            <!-- JS ile doldurulacak -->
                        </tbody>
                    </table>
                </div>
                
                <div class="mt-6 flex justify-center">
                    <button id="loadMoreBtn" onclick="loadMorePatients()" class="hidden bg-slate-100 hover:bg-slate-200 text-slate-600 px-6 py-2 rounded-xl text-sm font-medium transition-colors">
                        Daha Fazla Yükle
                    </button>
                </div>
            </div>
            
            <!-- Yeni Hasta Modal -->
            <div id="newPatientModal" class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm hidden z-50 flex items-center justify-center p-4">
                <div class="bg-white rounded-3xl w-full max-w-md p-6 shadow-xl relative animate-fade-in">
                    <button onclick="document.getElementById('newPatientModal').classList.add('hidden')" class="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors">
                        <i class="fa-solid fa-times text-xl"></i>
                    </button>
                    
                    <h3 class="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <i class="fa-solid fa-user-plus text-indigo-900"></i> Yeni Hasta Kaydı
                    </h3>
                    
                    <form id="newPatientForm" onsubmit="createPatient(event)" class="flex flex-col gap-4">
                        <div>
                            <label class="block text-xs font-bold text-slate-500 mb-1">Ad Soyad</label>
                            <input type="text" id="p_name" required class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-900 focus:ring-1 focus:ring-indigo-900 transition-all" placeholder="Örn: Ahmet Yılmaz">
                        </div>
                        <div class="flex gap-4">
                            <div class="w-1/2">
                                <label class="block text-xs font-bold text-slate-500 mb-1">Yaş</label>
                                <input type="number" id="p_age" required class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-900 focus:ring-1 focus:ring-indigo-900 transition-all">
                            </div>
                            <div class="w-1/2">
                                <label class="block text-xs font-bold text-slate-500 mb-1">Kilo (kg)</label>
                                <input type="number" id="p_weight" required class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-900 focus:ring-1 focus:ring-indigo-900 transition-all">
                            </div>
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-slate-500 mb-1">Cinsiyet</label>
                            <select id="p_gender" class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-900 focus:ring-1 focus:ring-indigo-900 transition-all appearance-none">
                                <option>Erkek</option>
                                <option>Kadın</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-slate-500 mb-1">İletişim (Telefon)</label>
                            <input type="text" id="p_phone" class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-900 focus:ring-1 focus:ring-indigo-900 transition-all" placeholder="05XX XXX XX XX">
                        </div>
                        <button type="submit" class="mt-2 w-full bg-indigo-900 hover:bg-indigo-800 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                            Kaydet ve Profili Aç <i class="fa-solid fa-arrow-right"></i>
                        </button>
                    </form>
                </div>
            </div>

        </div>

        <!-- HASTA DETAY EKRANI -->"""

html = html.replace(old_dashboard, new_dashboard)

with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/index.html', 'w') as f:
    f.write(html)
print("index.html successfully updated.")
