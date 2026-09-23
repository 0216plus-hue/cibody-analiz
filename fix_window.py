with open("frontend/scoliosis.js", "r") as f:
    js = f.read()

js = js.replace("window.window.", "window.")

with open("frontend/scoliosis.js", "w") as f:
    f.write(js)
