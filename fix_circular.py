with open("backend/main.py", "r") as f:
    js = f.read()

js = js.replace("import scoliometer_api\n", "")
js = js.replace("app.include_router(scoliometer_api.router)\n\n", "")

with open("backend/scoliometer_api.py", "r") as f:
    api = f.read()

# Remove imports from api
api = api.replace("import models", "")
api = api.replace("from fastapi import APIRouter, Depends, HTTPException, Request", "")
api = api.replace("from sqlalchemy.orm import Session", "")
api = api.replace("from database import get_db", "")
api = api.replace("from main import get_current_user", "")
api = api.replace("import uuid", "")
api = api.replace("from datetime import datetime, timedelta", "")
api = api.replace("from pydantic import BaseModel", "")
api = api.replace("router = APIRouter()", "")
api = api.replace("@router.", "@app.")

# inject imports into main.py
js = "import uuid\nfrom datetime import timedelta\n" + js

# append api to main.py
js += "\n\n" + api

with open("backend/main.py", "w") as f:
    f.write(js)
    
print("Fixed circular import!")
