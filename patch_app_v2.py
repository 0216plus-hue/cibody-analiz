import re

with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/app.js', 'r') as f:
    js = f.read()

# 1. Update fetchPatients to include delete button and mask phone
if 'deletePatient' not in js:
    js = js.replace(
        '<td class="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">\n                        <button onclick="showPatient(${p.id}',
        '<td class="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">\n                        <button onclick="deletePatient(${p.id})" class="text-red-500 hover:text-red-700 bg-red-50 px-3 py-1 rounded-md mr-2" title="Sil"><i class="fa-solid fa-trash"></i></button>\n                        <button onclick="showPatient(${p.id}'
    )

    # 2. Add phone to showPatient arguments (it's getting long, let's just use the patient object, or just add phone to the end)
    # The current signature is showPatient(patientId, patientName, patientAge, patientWeight, patientGender)
    js = js.replace(
        '${p.gender}\')"',
        '${p.gender}\', \'${p.phone || \'\'}\')"'
    )
    js = js.replace(
        'function showPatient(patientId, patientName, patientAge, patientWeight, patientGender) {',
        'function showPatient(patientId, patientName, patientAge, patientWeight, patientGender, patientPhone) {'
    )
    js = js.replace(
        'document.getElementById(\'detailInfo\').innerText = `Yaş: ${patientAge} | Kilo: ${patientWeight}kg | Cinsiyet: ${patientGender}`;',
        'const maskedPhone = patientPhone ? patientPhone.replace(/(\\d{4})\\d{3}(\\d{2})/, "$1***$2") : "Yok";\n    document.getElementById(\'detailInfo\').innerText = `Yaş: ${patientAge} | Kilo: ${patientWeight}kg | Cinsiyet: ${patientGender} | Tel: ${maskedPhone}`;'
    )
    
    # 3. Add deletePatient function
    delete_func = """
async function deletePatient(id) {
    if(!confirm("Bu hastayı ve tüm analizlerini tamamen silmek istediğinize emin misiniz? Bu işlem geri alınamaz!")) return;
    try {
        const res = await fetch(`/api/patients/${id}`, { method: 'DELETE' });
        if(res.ok) {
            showToast("Hasta başarıyla silindi.");
            fetchPatients();
        } else {
            const data = await res.json();
            showToast(data.detail || "Silme hatası");
        }
    } catch(err) {
        showToast("Sunucu ile iletişim kurulamadı.");
    }
}
"""
    js = js.replace('async function fetchPatients() {', delete_func + '\nasync function fetchPatients() {')

    # 4. Add phone to createPatient
    js = js.replace(
        "formData.append('gender', document.getElementById('p_gender').value || 'Erkek');",
        "formData.append('gender', document.getElementById('p_gender').value || 'Erkek');\n    formData.append('phone', document.getElementById('p_phone').value || '');"
    )
    
    js = js.replace(
        "document.getElementById('p_gender').value);",
        "document.getElementById('p_gender').value, document.getElementById('p_phone').value);"
    )

with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/app.js', 'w') as f:
    f.write(js)
print("app.js patched for delete and phone.")
