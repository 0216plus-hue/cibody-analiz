import os
from dotenv import load_dotenv
import requests

load_dotenv("backend/.env")
api_key = os.getenv("GEMINI_API_KEY")
print("Key starts with:", api_key[:5] if api_key else "None")

res1 = requests.post(f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}", json={"contents": [{"parts": [{"text": "Hello"}]}]})
print("1.5-flash:", res1.status_code, res1.text[:200])

res2 = requests.post(f"https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key={api_key}", json={"contents": [{"parts": [{"text": "Hello"}]}]})
print("3.6-flash:", res2.status_code, res2.text[:200])

res3 = requests.post(f"https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={api_key}", json={"contents": [{"parts": [{"text": "Hello"}]}]})
print("gemini-pro:", res3.status_code, res3.text[:200])

