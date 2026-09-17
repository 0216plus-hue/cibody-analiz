import sqlite3

db_path = 'posture_data.db'
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

cursor.execute('''
CREATE TABLE IF NOT EXISTS prescribed_exercises (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    posture_analysis_id INTEGER REFERENCES posture_analyses(id) ON DELETE CASCADE,
    exercise_id INTEGER REFERENCES exercises(id),
    sets TEXT DEFAULT '3',
    reps TEXT DEFAULT '12'
)
''')
conn.commit()
conn.close()
print("prescribed_exercises table created.")
