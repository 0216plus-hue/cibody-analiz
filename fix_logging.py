with open("backend/main.py", "r") as f:
    js = f.read()

old_except = """    except Exception as e:
        print("Gemini Scoliosis Error:", e)
        raise HTTPException(status_code=500, detail="Yapay zeka servisi yanıt vermedi.")"""

new_except = """    except Exception as e:
        import traceback
        print("Gemini Scoliosis Error:", e)
        if hasattr(e, 'response') and e.response is not None:
            print("Response Body:", e.response.text)
        traceback.print_exc()
        raise HTTPException(status_code=500, detail="Yapay zeka servisi yanıt vermedi.")"""

js = js.replace(old_except, new_except)

with open("backend/main.py", "w") as f:
    f.write(js)
