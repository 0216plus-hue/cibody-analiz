with open("backend/main.py", "r") as f:
    content = f.read()

old_res = """            res.append({
                "id": ex.id,
                "exercise_id": ex.exercise_id,
                "name": base.name,
                "category": base.category,
                "sets": ex.sets,
                "reps": ex.reps
            })"""

new_res = """            res.append({
                "id": ex.id,
                "exercise_id": ex.exercise_id,
                "name": base.name,
                "category": base.category,
                "sets": ex.sets,
                "reps": ex.reps,
                "image_path": base.image_path,
                "video_url": base.video_url
            })"""

content = content.replace(old_res, new_res)

with open("backend/main.py", "w") as f:
    f.write(content)
