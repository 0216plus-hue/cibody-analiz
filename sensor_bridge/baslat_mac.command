#!/bin/bash
cd "$(dirname "$0")"
echo "============================================================"
echo "      CIBODY - AYAK BASINÇ PLATFORMU BAĞLANTISI (MAC)"
echo "============================================================"
echo ""

if ! command -v python3 &> /dev/null
then
    echo "[HATA] Python3 bulunamadı!"
    exit 1
fi

echo "[*] Kütüphaneler kontrol ediliyor..."
pip3 install pyserial websockets > /dev/null 2>&1

echo "[*] Sensör köprüsü başlatılıyor..."
python3 cibody_bridge.py
