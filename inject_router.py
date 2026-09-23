with open("backend/main.py", "r") as f:
    js = f.read()

if "import scoliometer_api" not in js:
    js = js.replace("app = FastAPI(", "import scoliometer_api\napp = FastAPI(")
    js = js.replace("app.mount(\"/\",", "app.include_router(scoliometer_api.router)\n\napp.mount(\"/\",")
    
    with open("backend/main.py", "w") as f:
        f.write(js)
    print("Injected")
