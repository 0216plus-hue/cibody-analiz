@echo off
title CIBODY Ayak Analiz Sensör Köprüsü
echo ============================================================
echo       CIBODY - AYAK BASINÇ PLATFORMU BAĞLANTISI
echo ============================================================
echo.
python --version >nul 2>&1
if errorlevel 1 (
    echo [HATA] Python bilgisayarinizda yuklu degil veya PATH'e eklenmemis!
    echo Lutfen python.org adresinden Python indirip kurun (Add to PATH secenegini isaretleyin).
    pause
    exit /b
)

echo [*] Gerekli kutuphaneler kontrol ediliyor...
pip install pyserial websockets >nul 2>&1

echo [*] Sensor koprusu baslatiliyor...
echo.
python cibody_bridge.py
pause
