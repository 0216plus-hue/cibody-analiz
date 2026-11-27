"""
CIBODY – güvenlik yardımcıları.

- read_limited(): yüklenen dosyayı boyut sınırıyla okur (disk/bellek doldurma saldırılarına karşı)
- safe_ext(): yüklenen dosya uzantısını beyaz listeyle kontrol eder
- RateLimiter: IP bazlı basit istek sınırlayıcı (bellek içi)
- AuditMiddleware: oturum açmış kullanıcıların API erişimlerini audit_logs tablosuna yazar (KVKK erişim kaydı)
- upload erişim kontrolü: /uploads altındaki hasta dosyaları yalnızca oturum açmış kullanıcıya verilir
- handoff_*: QR ile PDF teslimi – şifreli, tek kullanımlık, 15 dakikalık geçici depo
"""
import os, time, secrets, logging, threading
from datetime import datetime, timedelta
from typing import Optional

from fastapi import HTTPException, UploadFile, Request
from jose import jwt, JWTError

log = logging.getLogger("cibody")

MB = 1024 * 1024
LIMIT_IMAGE = 15 * MB
LIMIT_PDF = 25 * MB
LIMIT_SCAN = 60 * MB
SCAN_EXTS = {".stl", ".obj", ".ply", ".usdz"}


async def read_limited(upload: UploadFile, max_bytes: int) -> bytes:
    """Dosyayı parça parça okur; sınır aşılırsa 413 döner."""
    chunks, total = [], 0
    while True:
        chunk = await upload.read(1024 * 1024)
        if not chunk:
            break
        total += len(chunk)
        if total > max_bytes:
            raise HTTPException(status_code=413, detail=f"Dosya çok büyük (en fazla {max_bytes // MB} MB).")
        chunks.append(chunk)
    return b"".join(chunks)


def safe_ext(filename: Optional[str], allowed: set, default: Optional[str] = None) -> str:
    ext = os.path.splitext((filename or "").lower())[1] or (default or "")
    if ext not in allowed:
        raise HTTPException(status_code=400, detail=f"Desteklenmeyen dosya türü: {ext or '-'}")
    return ext


class RateLimiter:
    """Pencere içinde anahtar başına en fazla `limit` istek."""
    def __init__(self, limit: int, window_sec: int):
        self.limit, self.window, self.hits, self.lock = limit, window_sec, {}, threading.Lock()

    def check(self, key: str):
        now = time.time()
        with self.lock:
            arr = [t for t in self.hits.get(key, []) if t > now - self.window]
            if len(arr) >= self.limit:
                self.hits[key] = arr
                raise HTTPException(status_code=429, detail="Çok fazla istek. Lütfen biraz sonra tekrar deneyin.")
            arr.append(now)
            self.hits[key] = arr
            if len(self.hits) > 20000:                      # bellek koruması
                for k in [k for k, v in self.hits.items() if not v or v[-1] < now - self.window]:
                    self.hits.pop(k, None)


def client_ip(request: Request) -> str:
    # Cloudflare / ters vekil arkasında gerçek istemci adresi
    return (request.headers.get("cf-connecting-ip")
            or (request.headers.get("x-forwarded-for") or "").split(",")[0].strip()
            or (request.client.host if request.client else "-"))


def user_id_from_request(request: Request, secret: str, algorithm: str) -> Optional[int]:
    """Authorization başlığından veya oturum çerezinden kullanıcı kimliğini çıkarır (doğrulanmış)."""
    token = None
    auth = request.headers.get("authorization", "")
    if auth.lower().startswith("bearer "):
        token = auth[7:].strip()
    if not token:
        token = request.cookies.get("cb_session")
    if not token:
        return None
    try:
        sub = jwt.decode(token, secret, algorithms=[algorithm]).get("sub")
        return int(sub) if sub is not None else None
    except (JWTError, ValueError):
        return None


# ───────────── Erişim kaydı (audit log) ─────────────
AUDIT_SKIP = ("/api/exercises", "/api/auth/me")

def make_audit_middleware(SessionLocal, AuditLog, secret, algorithm):
    async def audit_middleware(request: Request, call_next):
        response = await call_next(request)
        path = request.url.path
        try:
            if (path.startswith("/api/") or path.startswith("/uploads/")) and not path.startswith(AUDIT_SKIP) \
                    and request.method in ("GET", "POST", "PUT", "PATCH", "DELETE"):
                uid = user_id_from_request(request, secret, algorithm)
                if uid is not None or request.method != "GET":
                    db = SessionLocal()
                    try:
                        db.add(AuditLog(user_id=uid, method=request.method, path=path[:300],
                                        status=response.status_code, ip=client_ip(request)[:64]))
                        db.commit()
                    finally:
                        db.close()
        except Exception:
            log.exception("audit log yazılamadı")
        return response
    return audit_middleware


# ───────────── QR ile PDF teslimi (geçici, şifreli, tek kullanımlık) ─────────────
HANDOFF_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data", "handoff")
HANDOFF_TTL = timedelta(minutes=15)


def handoff_cleanup():
    if not os.path.isdir(HANDOFF_DIR):
        return
    cutoff = time.time() - HANDOFF_TTL.total_seconds()
    for f in os.listdir(HANDOFF_DIR):
        p = os.path.join(HANDOFF_DIR, f)
        try:
            if os.path.getmtime(p) < cutoff:
                os.remove(p)
        except OSError:
            pass


def handoff_store(data: bytes) -> str:
    """Tarayıcıda şifrelenmiş PDF'i geçici olarak saklar; sunucu içeriği okuyamaz (anahtar QR'daki # kısmında)."""
    os.makedirs(HANDOFF_DIR, exist_ok=True)
    handoff_cleanup()
    hid = secrets.token_urlsafe(24)
    with open(os.path.join(HANDOFF_DIR, hid + ".bin"), "wb") as f:
        f.write(data)
    return hid


def handoff_take(hid: str) -> bytes:
    """Dosyayı bir kez verir ve hemen siler."""
    if not hid or len(hid) > 64 or not all(c.isalnum() or c in "-_" for c in hid):
        raise HTTPException(status_code=404, detail="Bağlantı geçersiz.")
    handoff_cleanup()
    p = os.path.join(HANDOFF_DIR, hid + ".bin")
    if not os.path.isfile(p):
        raise HTTPException(status_code=410, detail="Bu karekodun süresi dolmuş veya daha önce kullanılmış. Hekiminizden yeni karekod isteyin.")
    with open(p, "rb") as f:
        data = f.read()
    try:
        os.remove(p)
    except OSError:
        pass
    return data
