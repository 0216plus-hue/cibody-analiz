import cv2
import numpy as np
from ultralytics import YOLO
import os

# YOLO modelini global olarak yüklüyoruz (her istekte baştan yüklememek için).
# İlk çalışmada 'yolov8n-pose.pt' dosyasını internetten otomatik indirecektir.
MODEL_PATH = 'yolov8n-pose.pt'
model = YOLO(MODEL_PATH)

# Ultralytics Pose modelindeki 17 standart nokta (COCO formatı)
KEYPOINT_NAMES = [
    "nose", "left_eye", "right_eye", "left_ear", "right_ear",
    "left_shoulder", "right_shoulder", "left_elbow", "right_elbow",
    "left_wrist", "right_wrist", "left_hip", "right_hip",
    "left_knee", "right_knee", "left_ankle", "right_ankle"
]

def analyze_image(image_bytes):
    """
    Görseli alır, YOLO ile işler ve piksel x,y koordinatlarını döner.
    """
    try:
        # Byte verisini OpenCV formatına (numpy array) çevir
        nparr = np.frombuffer(image_bytes, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        if img is None:
            return {"error": "Görsel okunamadı."}

        # YOLO ile analiz et
        results = model(img)

        # İnsan bulunamadıysa veya keypoint yoksa
        if not results or not hasattr(results[0], 'keypoints') or results[0].keypoints is None:
            return {"error": "İnsan iskeleti tespit edilemedi."}
            
        keypoints = results[0].keypoints

        # Eğer kimse bulunamadıysa tensör boştur
        if len(keypoints.xy) == 0:
            return {"error": "İnsan tespit edilemedi."}

        # Sadece ilk bulunan kişiyi (index 0) alıyoruz.
        kpts = keypoints.xy[0].cpu().numpy().tolist()
        conf = keypoints.conf[0].cpu().numpy().tolist() if keypoints.conf is not None else [1.0] * 17

        data = {}
        for i, name in enumerate(KEYPOINT_NAMES):
            if i < len(kpts):
                data[name] = {
                    "x": float(kpts[i][0]),
                    "y": float(kpts[i][1]),
                    "confidence": float(conf[i])
                }

        return {
            "keypoints": data,
            "width": img.shape[1],
            "height": img.shape[0]
        }

    except Exception as e:
        return {"error": str(e)}
