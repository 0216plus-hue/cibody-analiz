import asyncio
import sys
import time
import os

try:
    import websockets
except ImportError:
    print("\n[!] 'websockets' kütüphanesi eksik! Kurulmaya çalışılıyor...")
    try:
        import subprocess
        subprocess.check_call([sys.executable, "-m", "pip", "install", "websockets"])
        import websockets
    except Exception:
        print("\n[HATA] 'websockets' kütüphanesi yüklenemedi!")
        print("Lütfen terminalden şu komutu çalıştırın: pip install websockets\n")
        sys.exit(1)

try:
    import serial
    import serial.tools.list_ports
except ImportError:
    print("\n[!] 'pyserial' kütüphanesi eksik! Kurulmaya çalışılıyor...")
    try:
        import subprocess
        subprocess.check_call([sys.executable, "-m", "pip", "install", "pyserial"])
        import serial
        import serial.tools.list_ports
    except Exception:
        print("\n[HATA] 'pyserial' kütüphanesi yüklenemedi!")
        print("Lütfen terminalden şu komutu çalıştırın: pip install pyserial\n")
        sys.exit(1)

FRAME_SIZE = 2304  # 48 x 48 sensör
PORT_WS = 8765
BAUD_RATE = 115200  # Standart baudrate (gerekirse 921600 yapılabilir)

CONNECTED_CLIENTS = set()
SERIAL_CONN = None


def find_usb_device():
    """Bağlı USB seri portlarını listeler ve otomatik tespit etmeye çalışır."""
    ports = list(serial.tools.list_ports.comports())
    if not ports:
        return None
    
    print("\n[*] Bulunan Portlar:")
    for idx, p in enumerate(ports):
        print(f"    [{idx + 1}] {p.device} - {p.description}")
    
    # Öncelikli olarak USB cihazlarını seç
    for p in ports:
        desc = (p.description or "").lower()
        dev = (p.device or "").lower()
        if "usb" in desc or "ch340" in desc or "ftdi" in desc or "cp210" in desc or "usb" in dev:
            return p.device
    
    return ports[0].device


async def serial_reader_task():
    """USB portundan 2304 baytlık verileri okur ve WebSocket istemcilerine basar."""
    global SERIAL_CONN
    while True:
        if SERIAL_CONN and SERIAL_CONN.is_open:
            try:
                waiting = SERIAL_CONN.in_waiting
                if waiting > 0:
                    data = SERIAL_CONN.read(waiting)
                    if CONNECTED_CLIENTS and data:
                        await asyncio.gather(
                            *[client.send(data) for client in list(CONNECTED_CLIENTS)],
                            return_exceptions=True
                        )
                else:
                    await asyncio.sleep(0.005)
            except Exception as e:
                print(f"[!] Seri port okuma hatası: {e}")
                await asyncio.sleep(1)
        else:
            await asyncio.sleep(0.5)


async def simulation_task():
    """Eğer USB cihazı bağlı değilse, test amaçlı simülasyon ayak basınç verisi üretir."""
    import math
    t = 0
    while True:
        if not (SERIAL_CONN and SERIAL_CONN.is_open) and CONNECTED_CLIENTS:
            mat = bytearray(FRAME_SIZE)
            t += 0.1
            
            left_weight = 0.5 + 0.3 * math.sin(t)
            right_weight = 1.0 - left_weight

            # İki ayak formu simülasyonu
            for y in range(8, 40):
                for x in range(6, 20):  # Sol ayak
                    dx = (x - 13) / 4.0
                    dy = (y - 24) / 12.0
                    dist = dx*dx + dy*dy
                    if dist < 1.0:
                        val = int(max(0, (1.0 - dist) * 200 * left_weight))
                        mat[y * 48 + x] = min(255, val)

                for x in range(28, 42):  # Sağ ayak
                    dx = (x - 35) / 4.0
                    dy = (y - 24) / 12.0
                    dist = dx*dx + dy*dy
                    if dist < 1.0:
                        val = int(max(0, (1.0 - dist) * 200 * right_weight))
                        mat[y * 48 + x] = min(255, val)

            await asyncio.gather(
                *[client.send(bytes(mat)) for client in list(CONNECTED_CLIENTS)],
                return_exceptions=True
            )
            await asyncio.sleep(0.04)  # ~25 FPS
        else:
            await asyncio.sleep(0.1)


async def ws_handler(websocket):
    """Tarayıcı WebSocket bağlantısı."""
    CONNECTED_CLIENTS.add(websocket)
    client_ip = websocket.remote_address
    print(f"[+] Tarayıcı bağlandı (İstemci: {client_ip}) - Canlı veri aktarılıyor...")
    try:
        async for message in websocket:
            if SERIAL_CONN and SERIAL_CONN.is_open and isinstance(message, (bytes, bytearray)):
                SERIAL_CONN.write(message)
    except Exception:
        pass
    finally:
        CONNECTED_CLIENTS.remove(websocket)
        print(f"[-] Tarayıcı ayrıldı ({client_ip})")


async def main():
    global SERIAL_CONN
    print("=" * 60)
    print("      CIBODY - AYAK BASINÇ PLATFORMU USB KÖPRÜSÜ (v2.0)     ")
    print("=" * 60)
    print(f"[*] WebSocket Sunucusu: ws://localhost:{PORT_WS}")
    
    port_name = find_usb_device()
    if port_name:
        try:
            print(f"[*] USB Cihazına bağlanılıyor: {port_name} (Baudrate: {BAUD_RATE})...")
            SERIAL_CONN = serial.Serial(port_name, BAUD_RATE, timeout=0.1)
            print(f"[✓] CİHAZ BAĞLANDI: {port_name}")
        except Exception as e:
            print(f"[!] Port açılamadı ({e}). Simülasyon modunda devam edilecek.")
    else:
        print("\n[!] Fiziksel USB cihazı bulunamadı. Simülasyon modunda çalışacak.")
        print("    (Cihazı taktığınızda scripti yeniden başlatabilirsiniz.)\n")

    asyncio.create_task(serial_reader_task())
    asyncio.create_task(simulation_task())

    async with websockets.serve(ws_handler, "0.0.0.0", PORT_WS):
        print(f"[✓] KÖPRÜ ÇALIŞIYOR! Şimdi tarayıcıdan 'Analizi Başlat' diyebilirsiniz.")
        print("    (Durdurmak için pencereyi kapatabilir veya CTRL+C yapabilirsiniz)\n")
        await asyncio.Future()


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("\n[*] Köprü durduruldu.")
