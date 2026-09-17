"""
Veritabanı migration — users tablosu ve user_id sütunu ekle
"""
import sqlite3

DB = './posture_data.db'
conn = sqlite3.connect(DB)
cur = conn.cursor()

# users tablosu
cur.execute("""
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    hashed_password TEXT NOT NULL,
    role TEXT DEFAULT 'therapist',
    is_active INTEGER DEFAULT 1,
    monthly_limit INTEGER DEFAULT 100,
    created_at TEXT DEFAULT (datetime('now'))
)
""")

# patients tablosuna user_id ekle
try:
    cur.execute("ALTER TABLE patients ADD COLUMN user_id INTEGER REFERENCES users(id)")
    print("user_id sütunu patients tablosuna eklendi.")
except Exception as e:
    print(f"(Zaten var veya hata: {e})")

conn.commit()
conn.close()
print("✅ Migration tamamlandı.")
