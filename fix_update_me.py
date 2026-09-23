with open("backend/main.py", "r") as f:
    content = f.read()
content = content.replace("current_user.hashed_password = pwd_context.hash(req[\"password\"])", "current_user.hashed_password = hash_password(req[\"password\"])")
with open("backend/main.py", "w") as f:
    f.write(content)
