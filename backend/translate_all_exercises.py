"""
Batch translation script to translate all 1,155 exercises in the database into 8 languages:
['en', 'de', 'ru', 'ar', 'fr', 'es', 'it', 'pt'].
Stores the translated name, category, and description into exercise_translations table.
"""
import sqlite3
import urllib.request
import urllib.parse
import json
import time
import unicodedata
from concurrent.futures import ThreadPoolExecutor, as_completed

DB_PATHS = ['backend/data/posture_data.db', 'backend/posture_data.db']
LANGUAGES = ['en', 'de', 'ru', 'ar', 'fr', 'es', 'it', 'pt']

CATEGORY_TRANSLATIONS = {
    "tr": {
        "BİLEK": "Bilek", "BOYUN": "Boyun", "DİRSEK": "Dirsek", "DİZ": "Diz", "DURUŞ": "Duruş",
        "NEFES": "Nefes", "OMURGA": "Omurga", "OMUZ": "Omuz", "PELVİK": "Pelvik", "SKOLYOZ": "Skolyoz"
    },
    "en": {
        "BİLEK": "Wrist", "BOYUN": "Neck", "DİRSEK": "Elbow", "DİZ": "Knee", "DURUŞ": "Posture",
        "NEFES": "Breathing", "OMURGA": "Spine", "OMUZ": "Shoulder", "PELVİK": "Pelvic", "SKOLYOZ": "Scoliosis"
    },
    "de": {
        "BİLEK": "Handgelenk", "BOYUN": "Nacken", "DİRSEK": "Ellbogen", "DİZ": "Knie", "DURUŞ": "Haltung",
        "NEFES": "Atmung", "OMURGA": "Wirbelsäule", "OMUZ": "Schulter", "PELVİK": "Becken", "SKOLYOZ": "Skoliose"
    },
    "fr": {
        "BİLEK": "Poignet", "BOYUN": "Cou", "DİRSEK": "Coude", "DİZ": "Genou", "DURUŞ": "Posture",
        "NEFES": "Respiration", "OMURGA": "Colonne vertébrale", "OMUZ": "Épaule", "PELVİK": "Pelvien", "SKOLYOZ": "Scoliose"
    },
    "es": {
        "BİLEK": "Muñeca", "BOYUN": "Cuello", "DİRSEK": "Codo", "DİZ": "Rodilla", "DURUŞ": "Postura",
        "NEFES": "Respiración", "OMURGA": "Columna", "OMUZ": "Hombro", "PELVİK": "Pélvico", "SKOLYOZ": "Escoliosis"
    },
    "it": {
        "BİLEK": "Polso", "BOYUN": "Collo", "DİRSEK": "Gomito", "DİZ": "Ginocchio", "DURUŞ": "Postura",
        "NEFES": "Respirazione", "OMURGA": "Colonna vertebrale", "OMUZ": "Spalla", "PELVİK": "Pelvico", "SKOLYOZ": "Scoliosi"
    },
    "pt": {
        "BİLEK": "Pulso", "BOYUN": "Pescoço", "DİRSEK": "Cotovelo", "DİZ": "Joelho", "DURUŞ": "Postura",
        "NEFES": "Respiração", "OMURGA": "Coluna vertebral", "OMUZ": "Ombro", "PELVİK": "Pélvico", "SKOLYOZ": "Escoliose"
    },
    "ru": {
        "BİLEK": "Запястье", "BOYUN": "Шея", "DİRSEK": "Локоть", "DİZ": "Колено", "DURUŞ": "Осанка",
        "NEFES": "Дыхание", "OMURGA": "Позвоночник", "OMUZ": "Плечо", "PELVİK": "Тазовый", "SKOLYOZ": "Сколиоз"
    },
    "ar": {
        "BİLEK": "المعصم", "BOYUN": "الرقبة", "DİRSEK": "المرفق", "DİZ": "الركبة", "DURUŞ": "وضعية الجسم",
        "NEFES": "التنفس", "OMURGA": "العمود الفقري", "OMUZ": "الكتف", "PELVİK": "الحوض", "SKOLYOZ": "الجنف"
    }
}


def translate_text(text, target_lang, max_retries=3):
    if not text or not text.strip():
        return ""
    url = f"https://translate.googleapis.com/translate_a/single?client=gtx&sl=tr&tl={target_lang}&dt=t&q=" + urllib.parse.quote(text)
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    
    for attempt in range(max_retries):
        try:
            with urllib.request.urlopen(req, timeout=10) as resp:
                data = json.loads(resp.read().decode('utf-8'))
                translated = ''.join([part[0] for part in data[0] if part[0]])
                return translated.strip()
        except Exception as e:
            if attempt == max_retries - 1:
                print(f"Failed to translate ({target_lang}): {text[:30]}... Error: {e}")
                return text
            time.sleep(1 + attempt)
    return text


def translate_batch(batch, target_lang):
    """
    batch is list of tuples: (exercise_id, name, raw_category, description)
    Translates names and descriptions.
    """
    results = []
    # Build text block with delimiters
    items_to_translate = []
    for ex_id, name, cat, desc in batch:
        items_to_translate.append(f"{name} ||| {desc}")
    
    joined = " \n###\n ".join(items_to_translate)
    url = f"https://translate.googleapis.com/translate_a/single?client=gtx&sl=tr&tl={target_lang}&dt=t&q=" + urllib.parse.quote(joined)
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})

    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            full_res = ''.join([part[0] for part in data[0] if part[0]])
            parts = [p.strip() for p in full_res.split('###')]

            if len(parts) == len(batch):
                for i, (ex_id, name, cat, desc) in enumerate(batch):
                    chunk = parts[i]
                    if '|||' in chunk:
                        t_name, t_desc = chunk.split('|||', 1)
                        results.append((ex_id, target_lang, t_name.strip(), cat, t_desc.strip()))
                    else:
                        results.append((ex_id, target_lang, chunk.strip(), cat, desc))
                return results
    except Exception as e:
        pass

    # Fallback: translate item by item
    for ex_id, name, cat, desc in batch:
        t_name = translate_text(name, target_lang)
        t_desc = translate_text(desc, target_lang) if desc else ""
        results.append((ex_id, target_lang, t_name, cat, t_desc))
    return results


def process_language(lang, exercises_to_do, batch_size=10):
    print(f"[{lang.upper()}] Starting translation for {len(exercises_to_do)} exercises...")
    all_translated = []
    
    # Process in chunks
    for i in range(0, len(exercises_to_do), batch_size):
        chunk = exercises_to_do[i:i+batch_size]
        res = translate_batch(chunk, lang)
        all_translated.extend(res)
        if (i // batch_size) % 5 == 0 or i + batch_size >= len(exercises_to_do):
            print(f"[{lang.upper()}] Processed {min(i+batch_size, len(exercises_to_do))}/{len(exercises_to_do)}")
        time.sleep(0.3)

    return all_translated


def process_and_save_language(lang, all_exercises):
    conn = sqlite3.connect('backend/data/posture_data.db')
    c = conn.cursor()
    c.execute("SELECT exercise_id FROM exercise_translations WHERE lang = ?", (lang,))
    done_ids = set([r[0] for r in c.fetchall()])
    conn.close()

    needed = [e for e in all_exercises if e[0] not in done_ids]
    print(f"Language [{lang.upper()}]: Already done {len(done_ids)}, needing {len(needed)}")

    if not needed:
        return lang, 0

    batch_size = 10
    total_saved = 0

    for i in range(0, len(needed), batch_size):
        chunk = needed[i:i+batch_size]
        res = translate_batch(chunk, lang)

        # Write chunk immediately to DB
        for db_path in DB_PATHS:
            try:
                db_conn = sqlite3.connect(db_path, timeout=30)
                db_c = db_conn.cursor()
                for ex_id, l, name, cat, desc in res:
                    norm_cat = unicodedata.normalize('NFC', cat).strip().upper() if cat else "DURUŞ"
                    cat_trans = CATEGORY_TRANSLATIONS.get(l, {}).get(norm_cat, norm_cat)
                    db_c.execute('''
                        INSERT OR REPLACE INTO exercise_translations (exercise_id, lang, name, category, description)
                        VALUES (?, ?, ?, ?, ?)
                    ''', (ex_id, l, name, cat_trans, desc))
                db_conn.commit()
                db_conn.close()
            except Exception as e:
                print(f"[{lang.upper()}] Save error on {db_path}: {e}")

        total_saved += len(res)
        if (i // batch_size) % 10 == 0 or (i + batch_size) >= len(needed):
            print(f"[{lang.upper()}] Progress: {min(i+batch_size, len(needed))}/{len(needed)}")
        time.sleep(0.15)

    return lang, total_saved


def main():
    conn = sqlite3.connect('backend/data/posture_data.db')
    c = conn.cursor()
    c.execute("SELECT id, name, category, description FROM exercises ORDER BY id")
    all_exercises = c.fetchall()
    conn.close()

    print(f"Total exercises in DB: {len(all_exercises)}")

    # Run languages in parallel (4 concurrent threads to be gentle with rate limits)
    with ThreadPoolExecutor(max_workers=4) as executor:
        futures = {executor.submit(process_and_save_language, lang, all_exercises): lang for lang in LANGUAGES}
        for future in as_completed(futures):
            lang = futures[future]
            try:
                l, saved = future.result()
                print(f"--> [{lang.upper()}] Finished! Saved {saved} new translations.")
            except Exception as e:
                print(f"--> [{lang.upper()}] Error: {e}")

    # Final summary
    conn = sqlite3.connect('backend/data/posture_data.db')
    c = conn.cursor()
    c.execute("SELECT lang, count(*) FROM exercise_translations GROUP BY lang")
    print("\n=== FINAL TRANSLATION COUNTS ===")
    for row in c.fetchall():
        print(f"  {row[0]}: {row[1]} / {len(all_exercises)}")
    conn.close()


if __name__ == "__main__":
    main()
