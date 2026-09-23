from ultralytics import YOLO
import cv2
import numpy as np

print("Loading model...")
model = YOLO('yolov8n-pose.pt')
print("Model loaded!")
img = np.zeros((640, 640, 3), dtype=np.uint8)
print("Running inference...")
results = model(img)
print("Inference success!")
