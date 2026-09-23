with open("frontend/scoliosis.js", "r") as f:
    js = f.read()

# Replace any assignment to currentScoliosisId with window.currentScoliosisId
js = js.replace("let currentScoliosisId = null;", "window.currentScoliosisId = null;")
js = js.replace("currentScoliosisId =", "window.currentScoliosisId =")
js = js.replace("if(!currentScoliosisId)", "if(!window.currentScoliosisId)")
js = js.replace("if (currentScoliosisId === id)", "if (window.currentScoliosisId === id)")
js = js.replace("currentScoliosisId)", "window.currentScoliosisId)")
js = js.replace("currentScoliosisId,", "window.currentScoliosisId,")
js = js.replace("${currentScoliosisId}", "${window.currentScoliosisId}")

with open("frontend/scoliosis.js", "w") as f:
    f.write(js)

with open("frontend/app.js", "r") as f:
    js2 = f.read()
    
js2 = js2.replace("currentScoliosisId", "window.currentScoliosisId")

with open("frontend/app.js", "w") as f:
    f.write(js2)
