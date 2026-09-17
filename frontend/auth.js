// ─────────────────────────────────────────────
//  CIBODY AI v2.1 — Auth & Token Yönetimi
// ─────────────────────────────────────────────

const TOKEN_KEY = 'cibody_token';
const USER_KEY  = 'cibody_user';

function saveAuth(token, user) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function getToken() { return localStorage.getItem(TOKEN_KEY); }
function getUser()  { const u = localStorage.getItem(USER_KEY); return u ? JSON.parse(u) : null; }

function clearAuth() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
}

function authHeaders() {
    const token = getToken();
    return token ? { 'Authorization': `Bearer ${token}` } : {};
}

async function authFetch(url, options = {}) {
    options.headers = { ...authHeaders(), ...(options.headers || {}) };
    const res = await fetch(url, options);
    if (res.status === 401) {
        clearAuth();
        showLoginView();
        throw new Error('Oturum süresi doldu');
    }
    return res;
}

// ─────────────────────────────────────────────
//  Login / Logout
// ─────────────────────────────────────────────
async function login(e) {
    e && e.preventDefault();
    const email    = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const btn      = document.getElementById('loginBtn');
    const errEl    = document.getElementById('loginError');
    errEl.classList.add('hidden');

    if (!email || !password) {
        errEl.textContent = 'E-posta ve şifre zorunludur.';
        errEl.classList.remove('hidden');
        return;
    }

    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i>Giriş yapılıyor...';

    try {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (!res.ok) {
            errEl.textContent = data.detail || 'Giriş başarısız.';
            errEl.classList.remove('hidden');
            return;
        }
        saveAuth(data.access_token, { id: data.user_id, name: data.name, role: data.role, email: email, phone: data.phone || '', address: data.address || '' });
        afterLogin(data.role, data.name);
    } catch (err) {
        errEl.textContent = 'Sunucuya bağlanılamadı.';
        errEl.classList.remove('hidden');
    } finally {
        btn.disabled = false;
        btn.innerHTML = '<i class="fa-solid fa-right-to-bracket mr-2"></i>Giriş Yap';
    }
}

function logout() {
    clearAuth();
    showLoginView();
}

function afterLogin(role, name) {
    if (role === 'superadmin') {
        showAdminView(name);
    } else {
        showDashboard();
    }
}

// ─────────────────────────────────────────────
//  View Controller
// ─────────────────────────────────────────────
function showLoginView() {
    document.getElementById('loginView').classList.remove('hidden');
    document.getElementById('appView').classList.add('hidden');
    document.getElementById('adminView').classList.add('hidden');
}

function showAppView() {
    document.getElementById('loginView').classList.add('hidden');
    document.getElementById('appView').classList.remove('hidden');
    document.getElementById('adminView').classList.add('hidden');
}

function showAdminView(name) {
    document.getElementById('loginView').classList.add('hidden');
    document.getElementById('appView').classList.add('hidden');
    document.getElementById('adminView').classList.remove('hidden');
    const el = document.getElementById('adminWelcomeName');
    if (el) el.textContent = name;
    loadAdminDashboard();
}

// ─────────────────────────────────────────────
//  Admin Panel
// ─────────────────────────────────────────────
let editingUserId = null;

async function loadAdminDashboard() {
    try {
        const [statsRes, usersRes] = await Promise.all([
            authFetch('/api/admin/stats'),
            authFetch('/api/admin/users')
        ]);
        const stats = await statsRes.json();
        const users = await usersRes.json();

        document.getElementById('adminStatTherapists').textContent = stats.total_therapists || 0;
        document.getElementById('adminStatPatients').textContent   = stats.total_patients   || 0;
        document.getElementById('adminStatMonthly').textContent    = stats.monthly_analyses || 0;
        document.getElementById('adminStatYearly').textContent     = stats.yearly_analyses  || 0;

        renderTherapistTable(users);
    } catch (err) {
        console.error('Admin dashboard yüklenemedi:', err);
    }
}

function renderTherapistTable(users) {
    const tbody = document.getElementById('therapistTableBody');
    if (!tbody) return;
    if (users.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center py-8 text-slate-400">Henüz terapist eklenmemiş.</td></tr>';
        return;
    }
    tbody.innerHTML = users.map(u => `
        <tr class="border-b border-slate-100 hover:bg-slate-50 transition-colors">
            <td class="py-3 px-3 text-sm font-bold text-slate-800">${u.name}</td>
            <td class="py-3 px-3 text-sm text-slate-500">${u.email}</td>
            <td class="py-3 px-3 text-center">
                <span class="px-2 py-1 rounded-full text-xs font-bold ${u.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}">
                    ${u.is_active ? 'Aktif' : 'Pasif'}
                </span>
            </td>
            <td class="py-3 px-3 text-center text-sm text-slate-600">${u.patient_count}</td>
            <td class="py-3 px-3 text-center text-sm">
                <span class="${u.monthly_analyses >= u.monthly_limit ? 'text-red-600 font-bold' : 'text-slate-600'}">
                    ${u.monthly_analyses} / ${u.monthly_limit}
                </span>
            </td>
            <td class="py-3 px-3 text-sm text-slate-400">${new Date(u.created_at).toLocaleDateString('tr-TR')}</td>
            <td class="py-3 px-3 text-right flex justify-end gap-2">
                <button onclick="viewTherapistDetail(${u.id})" class="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1 rounded-lg text-xs font-bold transition">Detay</button>
                <button onclick="openEditTherapist(${u.id}, '${u.name}', '${u.email}', ${u.monthly_limit}, ${u.is_active})" class="bg-indigo-50 hover:bg-indigo-100 text-indigo-900 px-3 py-1 rounded-lg text-xs font-bold transition">Düzenle</button>
                <button onclick="deleteTherapist(${u.id})" class="text-slate-300 hover:text-red-500 hover:bg-red-50 w-7 h-7 rounded-lg flex items-center justify-center transition">
                    <i class="fa-solid fa-trash text-xs"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

async function viewTherapistDetail(userId) {
    try {
        const res = await authFetch(`/api/admin/users/${userId}`);
        const data = await res.json();
        const modal = document.getElementById('therapistDetailModal');
        document.getElementById('detailModalName').textContent = data.name;
        document.getElementById('detailModalEmail').textContent = data.email;
        const tbody = document.getElementById('detailPatientTableBody');
        tbody.innerHTML = data.patients.length === 0
            ? '<tr><td colspan="4" class="text-center py-6 text-slate-400">Kayıtlı hasta yok.</td></tr>'
            : data.patients.map(p => `
                <tr class="border-b border-slate-100 hover:bg-slate-50">
                    <td class="py-2 px-3 text-sm font-bold">${p.name}</td>
                    <td class="py-2 px-3 text-sm text-slate-500">${p.age} Yaş, ${p.weight} kg</td>
                    <td class="py-2 px-3 text-sm text-slate-500">${p.phone || '-'}</td>
                    <td class="py-2 px-3 text-sm text-center">${p.posture_count} analiz</td>
                </tr>
            `).join('');
        modal.classList.remove('hidden');
    } catch (err) {
        alert('Detay yüklenemedi.');
    }
}

function openEditTherapist(id, name, email, limit, isActive) {
    editingUserId = id;
    document.getElementById('editTherapistName').value   = name;
    document.getElementById('editTherapistEmail').value  = email;
    document.getElementById('editTherapistLimit').value  = limit;
    document.getElementById('editTherapistActive').checked = isActive;
    document.getElementById('editTherapistPassword').value = '';
    document.getElementById('editTherapistModal').classList.remove('hidden');
}

async function saveTherapist() {
    const body = {
        name: document.getElementById('editTherapistName').value,
        email: document.getElementById('editTherapistEmail').value,
        monthly_limit: parseInt(document.getElementById('editTherapistLimit').value),
        is_active: document.getElementById('editTherapistActive').checked,
    };
    const pass = document.getElementById('editTherapistPassword').value;
    if (pass) body.password = pass;

    try {
        const res = await authFetch(`/api/admin/users/${editingUserId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        if (res.ok) {
            document.getElementById('editTherapistModal').classList.add('hidden');
            loadAdminDashboard();
        }
    } catch (err) { alert('Kayıt hatası.'); }
}

async function createTherapist() {
    const name  = document.getElementById('newTherapistName').value.trim();
    const email = document.getElementById('newTherapistEmail').value.trim();
    const pass  = document.getElementById('newTherapistPassword').value;
    const limit = parseInt(document.getElementById('newTherapistLimit').value) || 100;
    if (!name || !email || !pass) { alert('Tüm alanlar zorunludur.'); return; }

    try {
        const res = await authFetch('/api/admin/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password: pass, monthly_limit: limit })
        });
        const data = await res.json();
        if (res.ok) {
            document.getElementById('newTherapistModal').classList.add('hidden');
            document.getElementById('newTherapistName').value = '';
            document.getElementById('newTherapistEmail').value = '';
            document.getElementById('newTherapistPassword').value = '';
            document.getElementById('newTherapistLimit').value = '100';
            loadAdminDashboard();
        } else { alert(data.detail || 'Hata.'); }
    } catch (err) { alert('Sunucu hatası.'); }
}

async function deleteTherapist(id) {
    if (!confirm('Bu terapisti silmek istediğinize emin misiniz? Terapistin TÜM hastaları da silinecektir!')) return;
    try {
        const res = await authFetch(`/api/admin/users/${id}`, { method: 'DELETE' });
        if (res.ok) loadAdminDashboard();
    } catch (err) { alert('Silme hatası.'); }
}

// ─────────────────────────────────────────────
//  Uygulama Başlangıcı
// ─────────────────────────────────────────────
function initApp() {
    const token = getToken();
    const user  = getUser();
    if (!token || !user) {
        showLoginView();
        return;
    }
    // Token var — direkt role göre yönlendir
    if (user.role === 'superadmin') {
        showAdminView(user.name);
    } else {
        showDashboard();
    }
}
