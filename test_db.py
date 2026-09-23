import sqlite3
conn = sqlite3.connect('backend/posture_data.db')
c = conn.cursor()
c.execute("PRAGMA table_info(users)")
print(c.fetchall())
