with open("backend/main.py", "r") as f:
    content = f.read()

old_code = """    import uuid
    import os
    
    # Save Image
    ext = image.filename.split(".")[-1]
    filename = f"{uuid.uuid4().hex}.{ext}"
    img_path = os.path.join(UPLOAD_DIR, filename)
    with open(img_path, "wb") as f:
        f.write(await image.read())
        
    db_path = f"uploads/{filename}" """

new_code = """    import uuid
    import os
    
    # Save Image
    os.makedirs("uploads/scoliosis", exist_ok=True)
    ext = image.filename.split(".")[-1]
    filename = f"{uuid.uuid4().hex}.{ext}"
    img_path = f"uploads/scoliosis/{filename}"
    with open(img_path, "wb") as f:
        f.write(await image.read())
        
    db_path = f"uploads/scoliosis/{filename}" """

content = content.replace(old_code, new_code)

with open("backend/main.py", "w") as f:
    f.write(content)
