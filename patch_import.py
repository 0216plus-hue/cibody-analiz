with open("backend/main.py", "r") as f:
    content = f.read()

import_code = """
        if db.query(models.Exercise).count() == 0:
            import pandas as pd
            try:
                df = pd.read_excel('../xlsx_egzersizler_temizlenmis.xlsx')
                df = df.fillna('')
                df.columns = ['id', 'name', 'category', 'description', 'video_url', 'category_id']
                for _, row in df.iterrows():
                    img_path = f"egzersiz-gorsel/{row['id']}.png"
                    ex = models.Exercise(
                        id=int(row['id']),
                        name=str(row['name']),
                        category=str(row['category']),
                        description=str(row['description']),
                        video_url=str(row['video_url']),
                        category_id=int(row['category_id']),
                        image_path=img_path
                    )
                    db.add(ex)
                db.commit()
                print("Egzersizler başarıyla içeri aktarıldı.")
            except Exception as e:
                print("Egzersiz içe aktarma hatası:", e)
"""

content = content.replace("db.add(dijimo)\n            db.commit()", "db.add(dijimo)\n            db.commit()\n" + import_code)

with open("backend/main.py", "w") as f:
    f.write(content)
