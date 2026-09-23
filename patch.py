with open("backend/main.py", "r") as f:
    content = f.read()

content = content.replace("from passlib.context import CryptContext", "import bcrypt")

code_to_replace = """pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login", auto_error=False)

def verify_password(plain, hashed): return pwd_context.verify(plain, hashed)
def hash_password(password): return pwd_context.hash(password)"""

new_code = """oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login", auto_error=False)

def verify_password(plain, hashed):
    try:
        if isinstance(hashed, str):
            hashed = hashed.encode('utf-8')
        if isinstance(plain, str):
            plain = plain.encode('utf-8')
        return bcrypt.checkpw(plain, hashed)
    except Exception:
        return False

def hash_password(password):
    if isinstance(password, str):
        password = password.encode('utf-8')
    return bcrypt.hashpw(password, bcrypt.gensalt()).decode('utf-8')"""

content = content.replace(code_to_replace, new_code)

content = content.replace("from passlib.context import CryptContext", "")
content = content.replace("pwd_context = CryptContext(schemes=[\"bcrypt\"], deprecated=\"auto\")", "")
content = content.replace("superadmin.hashed_password = pwd_context.hash(SUPERADMIN_PASS)", "superadmin.hashed_password = hash_password(SUPERADMIN_PASS)")

with open("backend/main.py", "w") as f:
    f.write(content)
