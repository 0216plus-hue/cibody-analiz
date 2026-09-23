with open("frontend/app.js", "r") as f:
    js = f.read()

old_add = """            if (currentExerciseContext === 'posture') {
                loadPrescribedExercises();
            } else if (currentExerciseContext === 'scoliosis') {
                if (typeof loadScoliosisAssignedExercises === 'function') loadScoliosisAssignedExercises();
            }
            showToast("Egzersiz başarıyla eklendi.");
        }"""

new_add = """            if (currentExerciseContext === 'posture') {
                loadPrescribedExercises();
            } else if (currentExerciseContext === 'scoliosis') {
                if (typeof loadScoliosisAssignedExercises === 'function') loadScoliosisAssignedExercises();
            }
            showToast("Egzersiz başarıyla eklendi.");
            closeExerciseModal();
        }"""

js = js.replace(old_add, new_add)

with open("frontend/app.js", "w") as f:
    f.write(js)
