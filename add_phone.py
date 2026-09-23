import sqlite3
conn = sqlite3.connect('backend/posture_data.db')
c = conn.cursor()
try:
    c.execute("ALTER TABLE users ADD COLUMN phone VARCHAR")
    conn.commit()
    print("Column added")
except Exception as e:
    print("Error:", e)
