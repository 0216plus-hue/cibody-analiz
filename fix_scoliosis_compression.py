with open("frontend/scoliosis.js", "r") as f:
    js = f.read()

old_upload = "formData.append('image', scoliosisFile);"
new_upload = "formData.append('image', await compressImage(scoliosisFile));"

js = js.replace(old_upload, new_upload)

with open("frontend/scoliosis.js", "w") as f:
    f.write(js)
