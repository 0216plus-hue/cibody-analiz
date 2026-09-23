import re

with open("frontend/index.html", "r") as f:
    content = f.read()

find_str = '''                        <!-- İşlem Butonları -->
                        <div class="flex justify-start">
                            <button onclick="openExerciseModal()" class="text-indigo-600 hover:text-indigo-800 font-bold text-sm flex items-center gap-2 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-lg transition-colors">
                                <i class="fa-solid fa-plus"></i> Kütüphaneden Manuel Ekle
                            </button>
                        </div>'''

repl_str = '''                        <!-- İşlem Butonları -->
                        <div class="flex justify-between items-center" data-html2canvas-ignore="true">
                            <button onclick="openExerciseModal()" class="text-indigo-600 hover:text-indigo-800 font-bold text-sm flex items-center gap-2 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-lg transition-colors">
                                <i class="fa-solid fa-plus"></i> Kütüphaneden Manuel Ekle
                            </button>
                            <button onclick="downloadPdf()" class="bg-indigo-900 text-white hover:bg-indigo-800 px-4 py-2 rounded-lg font-bold transition-colors shadow-sm flex items-center gap-2 text-sm whitespace-nowrap">
                                <i class="fa-solid fa-file-pdf"></i> PDF İndir
                            </button>
                        </div>'''

content = content.replace(find_str, repl_str)

with open("frontend/index.html", "w") as f:
    f.write(content)
