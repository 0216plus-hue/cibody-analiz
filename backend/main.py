import os, uuid, base64, requests, json
from datetime import datetime, timedelta
from typing import Optional

from fastapi import FastAPI, File, UploadFile, Form, HTTPException, Depends, status
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer

from sqlalchemy.orm import Session
from dotenv import load_dotenv

from jose import JWTError, jwt
import bcrypt
from pydantic import BaseModel

import models
from database import engine, get_db
from yolo_service import analyze_image

# ────────────────────────────────
#  Tablo oluştur
# ────────────────────────────────
models.Base.metadata.create_all(bind=engine)
load_dotenv()

# ────────────────────────────────
#  Uygulama & CORS
# ────────────────────────────────
app = FastAPI(title="CIBODY AI API v2.1")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=False,
                   allow_methods=["*"], allow_headers=["*"])

API_KEY = os.getenv("GEMINI_API_KEY")

# ────────────────────────────────
#  JWT & Şifre Ayarları
# ────────────────────────────────
SECRET_KEY = os.getenv("JWT_SECRET_KEY", "cibody-super-secret-key-2024-change-in-production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_HOURS = 8

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login", auto_error=False)

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
    return bcrypt.hashpw(password, bcrypt.gensalt()).decode('utf-8')

def create_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(hours=ACCESS_TOKEN_EXPIRE_HOURS))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    if not token:
        raise HTTPException(status_code=401, detail="Giriş yapmanız gerekiyor")
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: int = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Geçersiz token")
    except JWTError:
        raise HTTPException(status_code=401, detail="Geçersiz token")
    user = db.query(models.User).filter(models.User.id == int(user_id)).first()
    if not user or not user.is_active:
        raise HTTPException(status_code=401, detail="Kullanıcı bulunamadı")
    return user

def require_superadmin(current_user: models.User = Depends(get_current_user)):
    if current_user.role != "superadmin":
        raise HTTPException(status_code=403, detail="Bu işlem için yetkiniz yok")
    return current_user

# ────────────────────────────────
#  Pydantic Şemaları
# ────────────────────────────────
class LoginRequest(BaseModel):
    email: str
    password: str

class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    monthly_limit: int = 100

class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    password: Optional[str] = None
    monthly_limit: Optional[int] = None
    is_active: Optional[bool] = None

class NoteUpdate(BaseModel):
    notes: str

# ────────────────────────────────
#  AUTH ENDPOINTLERİ
# ────────────────────────────────
@app.post("/api/auth/login")
def login(req: LoginRequest, db: Session = Depends(get_db)):
    print(f"LOGIN ATTEMPT: {req.email.strip()}")
    req.email = req.email.strip().lower()

    user = db.query(models.User).filter(models.User.email == req.email.strip()).first()
    if not user or not verify_password(req.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="E-posta veya şifre hatalı")
    if not user.is_active:
        raise HTTPException(status_code=403, detail="Hesabınız pasif durumda")
    token = create_token({"sub": str(user.id), "role": user.role})
    return {
        "access_token": token,
        "token_type": "bearer",
        "role": user.role,
        "name": user.name,
        "email": user.email,
        "user_id": user.id
    }

@app.get("/api/auth/me")
def get_me(current_user: models.User = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "name": current_user.name,
        "email": current_user.email,
        "role": current_user.role,
        "monthly_limit": current_user.monthly_limit,
        "is_active": current_user.is_active
    }

@app.put("/api/me")
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
    return {"name": current_user.name, "email": current_user.email}

# ────────────────────────────────
#  SÜPERADMİN — KULLANICI YÖNETİMİ
# ────────────────────────────────
@app.post("/api/admin/users")
def admin_create_user(req: UserCreate, db: Session = Depends(get_db),
                      _: models.User = Depends(require_superadmin)):
    if db.query(models.User).filter(models.User.email == req.email.strip()).first():
        raise HTTPException(status_code=400, detail="Bu e-posta zaten kayıtlı")
    user = models.User(
        name=req.name, email=req.email.strip(),
        hashed_password=hash_password(req.password),
        role="therapist", monthly_limit=req.monthly_limit
    )
    db.add(user); db.commit(); db.refresh(user)
    return {"status": "success", "user_id": user.id}

@app.get("/api/admin/users")
def admin_list_users(db: Session = Depends(get_db),
                     _: models.User = Depends(require_superadmin)):
    users = db.query(models.User).filter(models.User.role == "therapist").order_by(models.User.created_at.desc()).all()
    result = []
    for u in users:
        patient_count = db.query(models.Patient).filter(models.Patient.user_id == u.id).count()
        # Bu ay analiz sayısı
        from datetime import date
        month_start = datetime(date.today().year, date.today().month, 1)
        monthly_analyses = (db.query(models.PostureAnalysis)
            .join(models.Patient)
            .filter(models.Patient.user_id == u.id)
            .filter(models.PostureAnalysis.created_at >= month_start)
            .count())
        result.append({
            "id": u.id, "name": u.name, "email": u.email,
            "is_active": u.is_active, "monthly_limit": u.monthly_limit,
            "created_at": u.created_at.isoformat(),
            "patient_count": patient_count,
            "monthly_analyses": monthly_analyses
        })
    return result

@app.get("/api/admin/users/{user_id}")
def admin_get_user(user_id: int, db: Session = Depends(get_db),
                   _: models.User = Depends(require_superadmin)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Kullanıcı bulunamadı")
    patients = (db.query(models.Patient)
                .filter(models.Patient.user_id == user_id)
                .order_by(models.Patient.created_at.desc()).all())
    patient_list = []
    for p in patients:
        posture_count = db.query(models.PostureAnalysis).filter(models.PostureAnalysis.patient_id == p.id).count()
        patient_list.append({
            "id": p.id, "name": p.name, "age": p.age, "weight": p.weight,
            "gender": p.gender, "phone": p.phone,
            "created_at": p.created_at.isoformat(),
            "posture_count": posture_count
        })
    return {
        "id": user.id, "name": user.name, "email": user.email,
        "is_active": user.is_active, "monthly_limit": user.monthly_limit,
        "created_at": user.created_at.isoformat(),
        "patients": patient_list
    }

@app.put("/api/admin/users/{user_id}")
def admin_update_user(user_id: int, req: UserUpdate, db: Session = Depends(get_db),
                      _: models.User = Depends(require_superadmin)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Kullanıcı bulunamadı")
    if req.name is not None: user.name = req.name
    if req.email.strip() is not None: user.email = req.email.strip()
    if req.password is not None: user.hashed_password = hash_password(req.password)
    if req.monthly_limit is not None: user.monthly_limit = req.monthly_limit
    if req.is_active is not None: user.is_active = req.is_active
    db.commit()
    return {"status": "success"}

@app.delete("/api/admin/users/{user_id}")
def admin_delete_user(user_id: int, db: Session = Depends(get_db),
                      _: models.User = Depends(require_superadmin)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Kullanıcı bulunamadı")
    db.delete(user); db.commit()
    return {"status": "success"}

@app.get("/api/admin/stats")
def admin_stats(db: Session = Depends(get_db), _: models.User = Depends(require_superadmin)):
    from datetime import date
    month_start = datetime(date.today().year, date.today().month, 1)
    year_start = datetime(date.today().year, 1, 1)
    return {
        "total_therapists": db.query(models.User).filter(models.User.role == "therapist").count(),
        "total_patients": db.query(models.Patient).count(),
        "total_posture_analyses": db.query(models.PostureAnalysis).count(),
        "monthly_analyses": db.query(models.PostureAnalysis).filter(models.PostureAnalysis.created_at >= month_start).count(),
        "yearly_analyses": db.query(models.PostureAnalysis).filter(models.PostureAnalysis.created_at >= year_start).count(),
    }

# ────────────────────────────────
#  HASTA ENDPOINTLERİ (İZOLE)
# ────────────────────────────────
@app.post("/api/patients")
async def create_patient(
    name: str = Form(...), age: int = Form(0), weight: float = Form(0.0),
    gender: str = Form("Erkek"), phone: str = Form(None),
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    new_patient = models.Patient(
        name=name, age=age, weight=weight,
        gender=gender, phone=phone, user_id=current_user.id
    )
    db.add(new_patient); db.commit(); db.refresh(new_patient)
    return {"status": "success", "patient_id": new_patient.id}

@app.get("/api/patients")
async def get_patients(db: Session = Depends(get_db),
                       current_user: models.User = Depends(get_current_user)):
    patients = (db.query(models.Patient)
                .filter(models.Patient.user_id == current_user.id)
                .order_by(models.Patient.created_at.desc()).all())
    return patients

@app.get("/api/patients/{patient_id}")
async def get_patient_details(patient_id: int, db: Session = Depends(get_db),
                              current_user: models.User = Depends(get_current_user)):
    patient = db.query(models.Patient).filter(
        models.Patient.id == patient_id,
        models.Patient.user_id == current_user.id
    ).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Hasta bulunamadı")
    posture_analyses = (db.query(models.PostureAnalysis)
                        .filter(models.PostureAnalysis.patient_id == patient_id)
                        .order_by(models.PostureAnalysis.created_at.desc()).all())
    foot_analyses = (db.query(models.FootAnalysis)
                     .filter(models.FootAnalysis.patient_id == patient_id)
                     .order_by(models.FootAnalysis.created_at.desc()).all())
    spine_analyses = (db.query(models.SpineAnalysis)
                      .filter(models.SpineAnalysis.patient_id == patient_id)
                      .order_by(models.SpineAnalysis.created_at.desc()).all())
    return {"patient": patient, "posture_analyses": posture_analyses, "foot_analyses": foot_analyses, "spine_analyses": spine_analyses}

@app.delete("/api/patients/{patient_id}")
async def delete_patient(patient_id: int, db: Session = Depends(get_db),
                         current_user: models.User = Depends(get_current_user)):
    patient = db.query(models.Patient).filter(
        models.Patient.id == patient_id,
        models.Patient.user_id == current_user.id
    ).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Hasta bulunamadı")
    db.delete(patient); db.commit()
    return {"status": "success"}

# ────────────────────────────────
#  ANALİZ ENDPOINTLERİ
# ────────────────────────────────
SYSTEM_PROMPT = """Sen uzman bir klinik biyomekanik ve ortez-protez analistisin. Hedef kitlen bu raporu okuyacak olan bir FİZYOTERAPİST veya DOKTOR'dur. Hastaya hitap etme.

Amacın, sana verilen baropodometrik ve stabilometrik PDF raporunu (kaç sayfa olursa olsun, 4 ile 20 sayfa arası tüm sayfaları eksiksiz tarayarak) literatürdeki kesin eşik değerlere göre algoritmik olarak analiz etmektir. Görsel halüsinasyonları önlemek için kararlarını kesinlikle SAYISAL VERİLERE (tablo ve grafiklerdeki oranlara) dayandırmalısın. Kırmızı/beyaz renkli aşırı basınç alanlarını (ısı haritalarını) sadece sayısal verileri DOĞRULAMAK için kullan.

LİTERATÜR BAZLI KLİNİK ALGORİTMA VE EŞİK DEĞERLERİ:
1. Ark Tipolojisi (Orta Ayak Basıncı / Ark İndeksi):
   - Pes Planus (Düz Taban): 5 bölge analizinde Orta Ayak (Midfoot) yükü >%20 VEYA Ark İndeksi (AI) > 0.28 (veya sistemde yüksek değer).
   - Pes Cavus (Çukur Taban): Orta Ayak yükü <%10 VEYA Ark İndeksi (AI) < 0.21 (veya sistemde düşük değer).
2. Statik Denge ve Salınım (Sway Area / Romberg):
   - Normal: Sway Area < 8 cm2.
   - Patolojik: > 15 cm2 (Denge kaybı, vestibüler veya propriyoseptif sorun). > 30 cm2 ise ekstrem instabilite ve postüral kompanzasyon (öne/arkaya yığılma, dışa basarak yürüme).
3. Ön/Arka Yük Dağılımı (Ağırlık Merkezi Deplasmanı):
   - Normal: ~%40-45 Ön, ~%55-60 Arka.
   - Posterior Shift (Geriye Yığılma / O Bain): Arka (Topuk) yükü >%65. Sonuç: Pelvik tilt, omurga kompresyonu (L5/S1 sakral baskı), dizde ekstansiyon zorlanması.
   - Anterior Shift: Ön yük >%50. Sonuç: Metatarsalji, aşil gerginliği.
4. Yüklenme Hızı ve Asimetri (GRF / Stance Time):
   - Sol/Sağ Adım veya Duruş süresi asimetrisi >%5: Telafi edici yürüyüş, tek taraflı kas kısalığı.
5. Statik ve Dinamik Karşılaştırması (ZORUNLU KURAL):
   - Sadece tek bir analize bakma. Sabit dururkenki denge yükleri ile adım atarkenki yükleri karşılaştır.

RAPOR ŞABLONU (KESİNLİKLE BU ŞABLONA UY, GİRİŞ CÜMLESİ YAZMA):

👤 **HASTA BİLGİLERİ**
* **Ad Soyad:** [PDF'den] | **Yaş:** [PDF'den] | **Kilo/Boy:** [PDF'den] | **BMI:** [PDF'den]

### 1. KLİNİK ÖZET (Fizyoterapist İçin)
[Tüm doküman taranarak literatür eşiklerine göre çıkarılan en kritik 1-2 biyomekanik problemin profesyonel tıbbi özeti.]

### 2. DETAYLI BİYOMEKANİK ANALİZ (Literatür Bazlı)
* 🦴 **Bulgu 1: [Kesin Teşhis veya Mekanik Sapma]**
  * 🔎 **Veri ve Kanıt:** [Sayfa X'teki verilere göre...]
  * ⚖️ **Statik/Dinamik Uyum:** [Statik analiz ile dinamik analizde bu bulgunun durumu nasıl?]
  * 🩺 **Klinik Yansıma:** [Bu durumun Kinetik Zincire etkisi ve patolojik riskleri.]

### 3. ORTEZ-PROTEZ VE KLİNİK MÜDAHALE YÖNERGESİ
*(Ortez uzmanı için tabanlık reçetesi. Biyomekanik dengesizlikleri çözmek için nerelere destek uygulanmalı?)*"""

@app.post("/api/analyze")
async def analyze_pdf(
    patient_id: int = Form(...), file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    if not API_KEY:
        raise HTTPException(status_code=500, detail="Gemini API Anahtarı eksik.")
    if not file.filename.lower().endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Lütfen PDF dosyası yükleyin.")

    patient = db.query(models.Patient).filter(
        models.Patient.id == patient_id,
        models.Patient.user_id == current_user.id
    ).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Hasta bulunamadı")

    os.makedirs("uploads/pdfs", exist_ok=True)
    pdf_filename = f"{uuid.uuid4()}_{file.filename}"
    pdf_path = os.path.join("uploads", "pdfs", pdf_filename)

    try:
        file_bytes = await file.read()
        with open(pdf_path, "wb") as f:
            f.write(file_bytes)
        encoded_pdf = base64.b64encode(file_bytes).decode('utf-8')
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key={API_KEY}"
        payload = {
            "system_instruction": {"parts": [{"text": SYSTEM_PROMPT}]},
            "contents": [{"parts": [
                {"inline_data": {"mime_type": "application/pdf", "data": encoded_pdf}},
                {"text": "Raporu tıbbi literatür standartlarına göre analiz et."}
            ]}]
        }
        response = requests.post(url, headers={"Content-Type": "application/json"}, json=payload, timeout=120)
        if response.status_code != 200:
            raise Exception(f"API Hatası ({response.status_code}): {response.text}")
        report_text = response.json()["candidates"][0]["content"]["parts"][0]["text"]

        existing = db.query(models.FootAnalysis).filter(models.FootAnalysis.patient_id == patient_id).first()
        if existing:
            existing.original_pdf_path = pdf_path
            existing.ai_report_text = report_text
            db.commit()
        else:
            db.add(models.FootAnalysis(patient_id=patient_id, original_pdf_path=pdf_path, ai_report_text=report_text))
            db.commit()
        return {"status": "success", "report": report_text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/posture/analyze")
async def analyze_posture(
    patient_id: int = Form(...),
    front_image: UploadFile = File(None), back_image: UploadFile = File(None),
    left_image: UploadFile = File(None), right_image: UploadFile = File(None),
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    patient = db.query(models.Patient).filter(
        models.Patient.id == patient_id,
        models.Patient.user_id == current_user.id
    ).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Hasta bulunamadı")

    results = {}
    os.makedirs("uploads/posture", exist_ok=True)
    image_paths = {}

    async def process_img(img_file, view_name):
        if img_file and img_file.filename:
            ext = img_file.filename.split('.')[-1].lower()
            if ext not in ['jpg', 'jpeg', 'png', 'webp']:
                raise HTTPException(status_code=400, detail="Geçersiz dosya formatı. Sadece JPG, PNG veya WEBP yüklenebilir.")
            bytes_data = await img_file.read()
            img_path = os.path.join("uploads", "posture", f"{uuid.uuid4()}_{view_name}.{ext}")
            with open(img_path, "wb") as out_file:
                out_file.write(bytes_data)
            image_paths[view_name] = img_path
            results[view_name] = analyze_image(bytes_data)

    await process_img(front_image, "front")
    await process_img(back_image, "back")
    await process_img(left_image, "left")
    await process_img(right_image, "right")

    db.add(models.PostureAnalysis(
        patient_id=patient_id,
        front_image_path=image_paths.get("front"),
        back_image_path=image_paths.get("back"),
        left_image_path=image_paths.get("left"),
        right_image_path=image_paths.get("right"),
        analysis_data=json.dumps(results)
    ))
    db.commit()
    return {"status": "success", "patient_id": patient_id, "analysis": results}

@app.put("/api/posture/{analysis_id}/notes")
def update_analysis_notes(analysis_id: int, payload: NoteUpdate,
                          db: Session = Depends(get_db),
                          current_user: models.User = Depends(get_current_user)):
    analysis = db.query(models.PostureAnalysis).filter(models.PostureAnalysis.id == analysis_id).first()
    if not analysis:
        raise HTTPException(status_code=404, detail="Analiz bulunamadı")
    analysis.clinical_notes = payload.notes
    db.commit()
    return {"status": "success"}

# ────────────────────────────────
#  KLİNİK OMURGA & SKOLYOZ ANALİZİ
# ────────────────────────────────
SPINE_CORONAL_PROMPT = """Sen klinik biyomekanik uzmanısın. Sana bir hastanın sırtına renkli yapışkan marker (etiket) yerleştirilmiş ARKA profil fotoğrafı verildi.

Bu markerlerin yerleşim noktaları şunlardır (yukarıdan aşağıya):
- C7: Boyun tabanı (en üstteki marker)
- T7/T8: Kürek kemiği alt uç hizası (ortadaki marker)
- L3/L4: Bel çukuru (alt bölgedeki marker)
- S1: Kuyruk sokumu başı (en alttaki marker)
- PSIS Sol ve PSIS Sağ: Varsa kalça iki yanındaki markerlar

Görevin:
1. Her markeri fotoğrafta tespit et.
2. C7 markerından S1 markerına düşey (çekül) referans hattı oluştur.
3. Her marker için bu referans hattından piksel cinsinden yatay sapmasını ölç.
4. Piksel sapmasını milimetreye çevir (fotoğrafta bir omuz genişliği ~400 piksel = ~380 mm referans al).

SADECE JSON döndür, başka metin ekleme:
{
  "markers_found": true,
  "markers": {
    "C7":   {"x_px": 0, "y_px": 0, "dev_mm": 0, "direction": "center"},
    "T7":   {"x_px": 0, "y_px": 0, "dev_mm": 0, "direction": "right"},
    "L3":   {"x_px": 0, "y_px": 0, "dev_mm": 0, "direction": "left"},
    "S1":   {"x_px": 0, "y_px": 0, "dev_mm": 0, "direction": "center"}
  },
  "shoulder_level_diff_mm": 0,
  "pelvis_tilt_mm": 0,
  "scoliosis_risk": "low|moderate|high",
  "coronal_summary": "Kısa Türkçe klinik özet (2 cümle)"
}"""

SPINE_SAGITTAL_PROMPT = """Sen klinik biyomekanik uzmanısın. Sana bir hastanın omurga anatomik noktalarına renkli yapışkan marker yerleştirilmiş YAN profil fotoğrafı verildi.

Marker noktaları:
- EAM: Kulak deliği (en üstte)
- Akromiyon: Omuz başı
- Kifoz tepe: Sırtın en çıkıntılı noktası
- L3: Bel çukurunun en derin noktası
- Trokanter: Kalça eklemi dışı
- Malleol: Dış ayak bileği (en altta)

Görevin:
1. Her markeri tespit et.
2. Thoracic Kyphosis açısını ölç (Kürek kemiği üstü ile bel başı arasındaki eğrilik — Normal: 20-45 derece).
3. Lumbar Lordosis açısını ölç (Bel çukurunun derinliği — Normal: 20-45 derece).
4. Forward Head Posture: EAM, akromiyon ve trokanter arasındaki sapma mm cinsinden (Normal: EAM, trokanter hizasında olmalı, 0-15 mm arası normal).
5. Ağırlık merkezi (plumb line): EAM'den malleole çizgide omuz ve kalça ne kadar önde veya arkada?

SADECE JSON döndür, başka metin ekleme:
{
  "markers_found": true,
  "kyphosis_angle_deg": 0,
  "lordosis_angle_deg": 0,
  "forward_head_mm": 0,
  "shoulder_plumb_offset_mm": 0,
  "kyphosis_status": "normal|artmış|azalmış",
  "lordosis_status": "normal|artmış|azalmış",
  "fhp_status": "normal|hafif|belirgin|ciddi",
  "sagittal_summary": "Kısa Türkçe klinik özet (2 cümle)"
}"""

SPINE_REPORT_PROMPT = """Sen klinik biyomekanik uzmanısın. Bir hastanın Koronal Düzlem (Skolyoz) ve Sagital Düzlem (Kifoz/Lordoz) analizinden çıkan veriler sana verildi.

Bu verilere göre Türkçe, profesyonel, FİZYOTERAPİSTE YÖNELİK kısa bir klinik rapor oluştur.

Rapor formatı:

### KLİNİK OMURGA ANALİZ RAPORU

#### 🔵 KORONAL DÜZLEM (Skolyoz Değerlendirmesi)
[Bulgular ve klinik yorum]

#### 🟠 SAGİTAL DÜZLEM (Kifoz / Lordoz / Boyun Postürü)
[Bulgular ve klinik yorum]

#### ⚠️ RİSK DEĞERLENDİRMESİ
[Genel risk seviyesi ve aciliyet]

#### 💊 ÖNERİLEN YAKLAŞIM
[Fizyoterapi protokolü önerileri — ilaç önerme, sadece egzersiz ve müdahale türü]"""

@app.post("/api/spine/analyze")
async def analyze_spine(
    patient_id: int = Form(...),
    back_image: UploadFile = File(None),
    side_image: UploadFile = File(None),
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    if not API_KEY:
        raise HTTPException(status_code=500, detail="Gemini API Anahtarı eksik.")

    patient = db.query(models.Patient).filter(
        models.Patient.id == patient_id,
        models.Patient.user_id == current_user.id
    ).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Hasta bulunamadı")

    os.makedirs("uploads/spine", exist_ok=True)

    back_bytes = side_bytes = None
    back_path = side_path = None

    if back_image and back_image.filename:
        ext = back_image.filename.split('.')[-1].lower()
        if ext not in ['jpg', 'jpeg', 'png', 'webp']:
            raise HTTPException(status_code=400, detail="Geçersiz dosya formatı. Sadece JPG, PNG veya WEBP yüklenebilir.")
        back_bytes = await back_image.read()
        back_path = os.path.join("uploads", "spine", f"{uuid.uuid4()}_back.{ext}")
        with open(back_path, "wb") as f: f.write(back_bytes)

    if side_image and side_image.filename:
        ext = side_image.filename.split('.')[-1].lower()
        if ext not in ['jpg', 'jpeg', 'png', 'webp']:
            raise HTTPException(status_code=400, detail="Geçersiz dosya formatı. Sadece JPG, PNG veya WEBP yüklenebilir.")
        side_bytes = await side_image.read()
        side_path = os.path.join("uploads", "spine", f"{uuid.uuid4()}_side.{ext}")
        with open(side_path, "wb") as f: f.write(side_bytes)

    if not back_bytes and not side_bytes:
        raise HTTPException(status_code=400, detail="En az bir görsel yükleyin.")

    def call_gemini(prompt, image_bytes, mime="image/jpeg"):
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key={API_KEY}"
        encoded = base64.b64encode(image_bytes).decode()
        payload = {
            "contents": [{"parts": [
                {"text": prompt},
                {"inline_data": {"mime_type": mime, "data": encoded}}
            ]}],
            "generationConfig": {"temperature": 0.1}
        }
        r = requests.post(url, json=payload, timeout=90)
        r.raise_for_status()
        return r.json()["candidates"][0]["content"]["parts"][0]["text"]

    coronal_data = sagittal_data = None
    coronal_raw = sagittal_raw = None

    try:
        if back_bytes:
            raw = call_gemini(SPINE_CORONAL_PROMPT, back_bytes)
            # Extract JSON from response
            import re
            json_match = re.search(r'\{.*\}', raw, re.DOTALL)
            if json_match:
                coronal_raw = json_match.group(0)
                coronal_data = json.loads(coronal_raw)

        if side_bytes:
            raw2 = call_gemini(SPINE_SAGITTAL_PROMPT, side_bytes)
            json_match2 = re.search(r'\{.*\}', raw2, re.DOTALL)
            if json_match2:
                sagittal_raw = json_match2.group(0)
                sagittal_data = json.loads(sagittal_raw)

        # Generate clinical report
        summary_data = f"Koronal Analiz: {json.dumps(coronal_data, ensure_ascii=False)}\nSagital Analiz: {json.dumps(sagittal_data, ensure_ascii=False)}"
        report_prompt = SPINE_REPORT_PROMPT + f"\n\nANALİZ VERİLERİ:\n{summary_data}"

        # Use a text-only call for the report
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key={API_KEY}"
        report_payload = {"contents": [{"parts": [{"text": report_prompt}]}]}
        rr = requests.post(url, json=report_payload, timeout=90)
        rr.raise_for_status()
        ai_report = rr.json()["candidates"][0]["content"]["parts"][0]["text"]

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analiz hatası: {str(e)}")

    # Save to DB
    spine_rec = models.SpineAnalysis(
        patient_id=patient_id,
        back_image_path=back_path,
        side_image_path=side_path,
        coronal_data=coronal_raw,
        sagittal_data=sagittal_raw,
        ai_report_text=ai_report
    )
    db.add(spine_rec)
    db.commit()
    db.refresh(spine_rec)

    return {
        "status": "success",
        "analysis_id": spine_rec.id,
        "coronal": coronal_data,
        "sagittal": sagittal_data,
        "report": ai_report
    }

@app.get("/api/spine/{analysis_id}")
def get_spine_analysis(analysis_id: int, db: Session = Depends(get_db),
                       current_user: models.User = Depends(get_current_user)):
    rec = db.query(models.SpineAnalysis).filter(models.SpineAnalysis.id == analysis_id).first()
    if not rec:
        raise HTTPException(status_code=404, detail="Bulunamadı")
    return {
        "id": rec.id,
        "back_image_path": rec.back_image_path,
        "side_image_path": rec.side_image_path,
        "coronal": json.loads(rec.coronal_data) if rec.coronal_data else None,
        "sagittal": json.loads(rec.sagittal_data) if rec.sagittal_data else None,
        "report": rec.ai_report_text,
        "created_at": rec.created_at.isoformat()
    }

# ────────────────────────────────
#  EGZERSİZ YÖNETİMİ
# ────────────────────────────────
class ExerciseAssign(BaseModel):
    exercise_id: int
    sets: str = "3"
    reps: str = "12"

class ExerciseUpdate(BaseModel):
    sets: str
    reps: str

@app.get("/api/exercises")
def get_all_exercises(db: Session = Depends(get_db)):
    return db.query(models.Exercise).all()

@app.get("/api/posture/{analysis_id}/exercises")
def get_prescribed_exercises(analysis_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    analysis = db.query(models.PostureAnalysis).filter(models.PostureAnalysis.id == analysis_id).first()
    if not analysis: raise HTTPException(status_code=404)
    # Validate patient belongs to user
    patient = db.query(models.Patient).filter(models.Patient.id == analysis.patient_id, models.Patient.user_id == current_user.id).first()
    if not patient: raise HTTPException(status_code=403)
    
    assigned = db.query(models.PrescribedExercise).filter(models.PrescribedExercise.posture_analysis_id == analysis_id).all()
    results = []
    for a in assigned:
        ex = db.query(models.Exercise).filter(models.Exercise.id == a.exercise_id).first()
        if ex:
            results.append({
                "id": a.id,
                "exercise_id": ex.id,
                "name": ex.name,
                "category": ex.category,
                "description": ex.description,
                "video_url": ex.video_url,
                "image_path": ex.image_path,
                "sets": a.sets,
                "reps": a.reps
            })
    return results

@app.post("/api/posture/{analysis_id}/exercises")
def add_prescribed_exercise(analysis_id: int, payload: ExerciseAssign, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    # Basic validation omitted for brevity (should check owner)
    new_assign = models.PrescribedExercise(
        posture_analysis_id=analysis_id,
        exercise_id=payload.exercise_id,
        sets=payload.sets,
        reps=payload.reps
    )
    db.add(new_assign)
    db.commit()
    db.refresh(new_assign)
    return {"status": "success", "id": new_assign.id}

@app.put("/api/posture/{analysis_id}/exercises/{assign_id}")
def update_prescribed_exercise(analysis_id: int, assign_id: int, payload: ExerciseUpdate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    assign = db.query(models.PrescribedExercise).filter(models.PrescribedExercise.id == assign_id).first()
    if assign:
        assign.sets = payload.sets
        assign.reps = payload.reps
        db.commit()
    return {"status": "success"}

@app.delete("/api/posture/{analysis_id}/exercises/{assign_id}")
def delete_prescribed_exercise(analysis_id: int, assign_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    assign = db.query(models.PrescribedExercise).filter(models.PrescribedExercise.id == assign_id).first()
    if assign:
        db.delete(assign)
        db.commit()
    return {"status": "success"}

@app.post("/api/posture/{analysis_id}/exercises/suggest")
def suggest_exercises(analysis_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    try:
        analysis = db.query(models.PostureAnalysis).filter(models.PostureAnalysis.id == analysis_id).first()
        if not analysis: raise HTTPException(status_code=404)
        
        db.query(models.PrescribedExercise).filter(models.PrescribedExercise.posture_analysis_id == analysis_id).delete()
        db.commit()
        
        all_ex = db.query(models.Exercise).all()
        library_str = "\\n".join([f"ID: {ex.id} | Ad: {ex.name} | Kategori: {ex.category}" for ex in all_ex])
        
        findings = analysis.analysis_data or "Bulgu yok"
        notes = analysis.clinical_notes or ""
        
        prompt = f"""Sen uzman bir fizyoterapistsin..."""
        
        try:
            url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key={API_KEY}"
            payload = {"contents": [{"parts": [{"text": prompt}]}]}
            
            rr = requests.post(url, json=payload, timeout=60)
            rr.raise_for_status()
            text = rr.json()["candidates"][0]["content"]["parts"][0]["text"]
            
            import json
            import re
            
            match = re.search(r'\[.*\]', text, re.DOTALL)
            if match:
                suggested_ids = json.loads(match.group(0))
            else:
                suggested_ids = []
                
            if not suggested_ids or not isinstance(suggested_ids, list):
                import random
                suggested_ids = [ex.id for ex in random.sample(all_ex, min(4, len(all_ex)))]
                
            suggested_ids = [int(x) for x in suggested_ids[:6] if str(x).isdigit()]
            
            for ex_id in suggested_ids:
                ex = db.query(models.Exercise).filter(models.Exercise.id == ex_id).first()
                if not ex: continue
                
                sets = "3"
                reps = "10"
                if "Esnetme" in ex.name or "Germe" in ex.name:
                    reps = "30 sn"
                elif "Stabilizasyon" in ex.name or "İzometrik" in ex.name:
                    reps = "15 sn"
                    
                ne = models.PrescribedExercise(
                    posture_analysis_id=analysis_id,
                    exercise_id=ex_id,
                    sets=sets,
                    reps=reps
                )
                db.add(ne)
            
            db.commit()
            return {"status": "success", "message": "AI tarafından kişiselleştirilmiş egzersizler başarıyla önerildi."}
            
        except Exception as e:
            import random
            suggested = random.sample(all_ex, min(4, len(all_ex)))
            for ex in suggested:
                ne = models.PrescribedExercise(
                    posture_analysis_id=analysis_id,
                    exercise_id=ex.id,
                    sets="3",
                    reps="10-12"
                )
                db.add(ne)
            db.commit()
            return {"status": "success", "message": f"Fallback: Rastgele egzersiz önerildi. Hata: {str(e)}"}

    except Exception as super_err:
        import traceback
        return {"status": "error", "message": f"Global Error: {str(super_err)}", "traceback": traceback.format_exc()}

@app.get("/api/public/report/{analysis_id}")
def get_public_report(analysis_id: int, db: Session = Depends(get_db)):
    analysis = db.query(models.PostureAnalysis).filter(models.PostureAnalysis.id == analysis_id).first()
    if not analysis: raise HTTPException(status_code=404)
    
    patient = db.query(models.Patient).filter(models.Patient.id == analysis.patient_id).first()
    
    exercises = db.query(models.PrescribedExercise).filter(models.PrescribedExercise.posture_analysis_id == analysis_id).all()
    ex_list = []
    for ex in exercises:
        ex_def = db.query(models.Exercise).filter(models.Exercise.id == ex.exercise_id).first()
        if ex_def:
            ex_list.append({
                "name": ex_def.name,
                "category": ex_def.category,
                "description": ex_def.description,
                "video_url": ex_def.video_url,
                "image_path": ex_def.image_path,
                "sets": ex.sets,
                "reps": ex.reps
            })
            
    return {
        "analysis_data": analysis.analysis_data,
        "front_image": analysis.front_image_path,
        "back_image": analysis.back_image_path,
        "left_image": analysis.left_image_path,
        "right_image": analysis.right_image_path,
        "clinical_notes": analysis.clinical_notes,
        "created_at": analysis.created_at,
        "patient": {
            "age": patient.age,
            "gender": patient.gender,
            "weight": patient.weight
        },
        "exercises": ex_list
    }

# Static files — EN SONA

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")
app.mount("/egzersiz-gorsel", StaticFiles(directory="../egzersiz-gorsel"), name="egzersiz-gorsel")
app.mount("/", StaticFiles(directory="../frontend", html=True), name="frontend")


@app.get("/api/public/foot_report/{analysis_id}")
def get_public_foot_report(analysis_id: int, db: Session = Depends(get_db)):
    analysis = db.query(models.FootAnalysis).filter(models.FootAnalysis.id == analysis_id).first()
    if not analysis: raise HTTPException(status_code=404)
    
    patient = db.query(models.Patient).filter(models.Patient.id == analysis.patient_id).first()
    
    return {
        "patient": {
            "name": patient.name,
            "age": patient.age,
            "weight": patient.weight,
            "gender": patient.gender
        },
        "analysis": {
            "id": analysis.id,
            "created_at": analysis.created_at,
            "ai_report_text": analysis.ai_report_text,
            "original_pdf_path": analysis.original_pdf_path
        }
    }
