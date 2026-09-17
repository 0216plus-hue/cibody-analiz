FROM python:3.11-slim

WORKDIR /app

# Ultralytics ve OpenCV için gerekli olabilecek sistem paketleri
RUN apt-get update && apt-get install -y \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Gereksinimleri kopyala ve yükle
COPY backend/requirements.txt ./backend/
RUN pip install --no-cache-dir -r backend/requirements.txt

# Proje dosyalarını kopyala
COPY backend /app/backend
COPY frontend /app/frontend
COPY egzersiz-gorsel /app/egzersiz-gorsel

# Veritabanı ve resim kayıtlarının tutulacağı alanlar
# (Bunları Coolify panelinden volume olarak bağlayacağız)
VOLUME ["/app/backend/uploads", "/app/backend/ai_clinic.db"]

EXPOSE 8000

# Backend dizinine geçip uygulamayı başlat
WORKDIR /app/backend
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
