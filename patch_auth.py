with open("backend/main.py", "r") as f:
    content = f.read()

# Update /api/me PUT
old_put = """@app.put("/api/me")
def update_me(req: dict, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    if "name" in req and req["name"]:
        current_user.name = req["name"]
    if "email" in req and req["email"]:
        current_user.email = req["email"]
    if "password" in req and req["password"]:
        import bcrypt
        
        current_user.hashed_password = hash_password(req["password"])
    db.commit()
    db.refresh(current_user)
    return {"name": current_user.name, "email": current_user.email}"""

new_put = """@app.put("/api/me")
def update_me(req: dict, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    if "name" in req and req["name"]:
        current_user.name = req["name"]
    if "email" in req and req["email"]:
        current_user.email = req["email"]
    if "phone" in req:
        current_user.phone = req["phone"]
    if "password" in req and req["password"]:
        import bcrypt
        current_user.hashed_password = hash_password(req["password"])
    db.commit()
    db.refresh(current_user)
    return {"name": current_user.name, "email": current_user.email, "phone": current_user.phone}"""
content = content.replace(old_put, new_put)

# Update /api/auth/login to return phone
import re
content = re.sub(r'("user": \{.*?)"email": user\.email', r'\1"email": user.email, "phone": user.phone', content, flags=re.DOTALL)

with open("backend/main.py", "w") as f:
    f.write(content)
