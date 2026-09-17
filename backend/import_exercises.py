import sqlite3
import pandas as pd
import os

# Connect to database
db_path = 'backend/posture_data.db'
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

# Create table if not exists
cursor.execute('''
CREATE TABLE IF NOT EXISTS exercises (
    id INTEGER PRIMARY KEY,
    name TEXT,
    category TEXT,
    description TEXT,
    video_url TEXT,
    category_id INTEGER,
    image_path TEXT
)
''')
conn.commit()

# Read Excel
df = pd.read_excel('xlsx_egzersizler_temizlenmis.xlsx')

# Clean columns and rename for convenience
df = df.fillna('')
df.columns = ['id', 'name', 'category', 'description', 'video_url', 'category_id']

# Insert data
count = 0
for _, row in df.iterrows():
    # check image exists
    img_path = f"egzersiz-gorsel/{row['id']}.png"
    
    cursor.execute('''
    INSERT OR REPLACE INTO exercises (id, name, category, description, video_url, category_id, image_path)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    ''', (
        row['id'], 
        row['name'], 
        row['category'], 
        row['description'], 
        row['video_url'], 
        row['category_id'],
        img_path
    ))
    count += 1

conn.commit()
conn.close()

print(f"Başarıyla {count} egzersiz içeri aktarıldı.")
