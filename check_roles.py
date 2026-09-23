import sqlite3
conn = sqlite3.connect('backend/posture_data.db')
cursor = conn.cursor()
cursor.execute('SELECT email, role FROM users')
print(cursor.fetchall())
