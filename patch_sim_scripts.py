with open("frontend/index.html", "r") as f:
    html = f.read()

scripts = """
    <!-- Three.js ve OrbitControls -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>
    <script src="simulation.js"></script>
"""

old_body_end = "</body>"

if old_body_end in html:
    html = html.replace(old_body_end, scripts + "\n" + old_body_end)
    with open("frontend/index.html", "w") as f:
        f.write(html)
    print("Inserted Three.js scripts.")
else:
    print("Could not find </body>.")
