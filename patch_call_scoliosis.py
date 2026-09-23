with open("frontend/app.js", "r") as f:
    js = f.read()

js = js.replace("loadPatientData(patientId);", "loadPatientData(patientId);\n    if (typeof loadScoliosisHistory === 'function') loadScoliosisHistory();")

with open("frontend/app.js", "w") as f:
    f.write(js)
