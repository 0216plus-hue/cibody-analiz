with open("frontend/app.js", "r") as f:
    js = f.read()

js = js.replace("typeof loadScoliosisAssignedExercises === 'function'", "typeof window.loadScoliosisAssignedExercises === 'function'")
js = js.replace("loadScoliosisAssignedExercises();", "window.loadScoliosisAssignedExercises();")

with open("frontend/app.js", "w") as f:
    f.write(js)
