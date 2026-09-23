import sys
sys.path.insert(0, 'backend')
from main import verify_password
print(verify_password("123456", "not-a-hash"))
