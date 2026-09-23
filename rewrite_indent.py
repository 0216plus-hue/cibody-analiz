with open("backend/main.py", "r") as f:
    content = f.read()

import re
# We want to find the exact block and replace it
old_block = """            db.add(dijimo)
            db.commit()

    # ALTER TABLE to add scoliosis_analysis_id if not exists
    try:
        db.execute("ALTER TABLE prescribed_exercises ADD COLUMN scoliosis_analysis_id INTEGER REFERENCES scoliosis_analyses(id)")
        db.commit()
    except Exception as e:
        pass # Column already exists or other error


        if db.query(models.Exercise).count() == 0:"""

new_block = """            db.add(dijimo)
            db.commit()

        # ALTER TABLE to add scoliosis_analysis_id if not exists
        try:
            db.execute("ALTER TABLE prescribed_exercises ADD COLUMN scoliosis_analysis_id INTEGER REFERENCES scoliosis_analyses(id)")
            db.commit()
        except Exception as e:
            pass # Column already exists or other error

        if db.query(models.Exercise).count() == 0:"""

content = content.replace(old_block, new_block)

with open("backend/main.py", "w") as f:
    f.write(content)
