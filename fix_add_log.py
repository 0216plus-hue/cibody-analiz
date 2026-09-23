with open("backend/main.py", "r") as f:
    js = f.read()

old_add = """@app.post("/api/scoliosis/{analysis_id}/exercises")
def add_scoliosis_prescribed_exercise(analysis_id: int, payload: ExerciseAssign, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    ne = models.PrescribedExercise(
        scoliosis_analysis_id=analysis_id,
        exercise_id=payload.exercise_id,
        sets=payload.sets,
        reps=payload.reps
    )
    db.add(ne)
    db.commit()
    return {"status": "success"}"""

new_add = """@app.post("/api/scoliosis/{analysis_id}/exercises")
def add_scoliosis_prescribed_exercise(analysis_id: int, payload: ExerciseAssign, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    try:
        ne = models.PrescribedExercise(
            scoliosis_analysis_id=analysis_id,
            exercise_id=payload.exercise_id,
            sets=payload.sets,
            reps=payload.reps
        )
        db.add(ne)
        db.commit()
        return {"status": "success"}
    except Exception as e:
        import traceback
        print("ADD EXERCISE ERROR:", e)
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))"""

js = js.replace(old_add, new_add)

with open("backend/main.py", "w") as f:
    f.write(js)
