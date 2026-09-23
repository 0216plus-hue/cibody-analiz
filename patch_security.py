import re

with open("backend/main.py", "r") as f:
    content = f.read()

# 1. Fix CORS to not use allow_credentials=True with allow_origins=["*"]
# We will use allow_origins=["*"] but remove allow_credentials or specify specific origins.
# Wait, let's keep allow_credentials=False for wildcard, or allow specific origins if needed.
# Since this is a local app or deployed to a specific domain, replacing "*" with actual origins is best, but we don't know the exact domain layout.
# Actually, changing allow_credentials=True to False if origins is ["*"].
content = content.replace('allow_origins=["*"], allow_credentials=True,', 'allow_origins=["*"], allow_credentials=False,')

# 2. Fix file upload validation in process_img (Posture)
find_posture = """    async def process_img(img_file, view_name):
        if img_file and img_file.filename:
            bytes_data = await img_file.read()
            ext = img_file.filename.split('.')[-1]"""

repl_posture = """    async def process_img(img_file, view_name):
        if img_file and img_file.filename:
            ext = img_file.filename.split('.')[-1].lower()
            if ext not in ['jpg', 'jpeg', 'png', 'webp']:
                raise HTTPException(status_code=400, detail="Geçersiz dosya formatı. Sadece JPG, PNG veya WEBP yüklenebilir.")
            bytes_data = await img_file.read()"""

content = content.replace(find_posture, repl_posture)

# 3. Fix file upload validation in analyze_spine
find_spine_back = """    if back_image and back_image.filename:
        back_bytes = await back_image.read()
        ext = back_image.filename.split('.')[-1]"""

repl_spine_back = """    if back_image and back_image.filename:
        ext = back_image.filename.split('.')[-1].lower()
        if ext not in ['jpg', 'jpeg', 'png', 'webp']:
            raise HTTPException(status_code=400, detail="Geçersiz dosya formatı. Sadece JPG, PNG veya WEBP yüklenebilir.")
        back_bytes = await back_image.read()"""

content = content.replace(find_spine_back, repl_spine_back)

find_spine_side = """    if side_image and side_image.filename:
        side_bytes = await side_image.read()
        ext = side_image.filename.split('.')[-1]"""

repl_spine_side = """    if side_image and side_image.filename:
        ext = side_image.filename.split('.')[-1].lower()
        if ext not in ['jpg', 'jpeg', 'png', 'webp']:
            raise HTTPException(status_code=400, detail="Geçersiz dosya formatı. Sadece JPG, PNG veya WEBP yüklenebilir.")
        side_bytes = await side_image.read()"""

content = content.replace(find_spine_side, repl_spine_side)


# 4. Fix file upload validation in analyze_pdf (Foot Analysis)
find_pdf = """    if pdf_file and pdf_file.filename:
        pdf_bytes = await pdf_file.read()
        pdf_filename = f"{uuid.uuid4()}.pdf\""""

repl_pdf = """    if pdf_file and pdf_file.filename:
        ext = pdf_file.filename.split('.')[-1].lower()
        if ext != 'pdf':
            raise HTTPException(status_code=400, detail="Geçersiz dosya formatı. Sadece PDF yüklenebilir.")
        pdf_bytes = await pdf_file.read()
        pdf_filename = f"{uuid.uuid4()}.pdf\""""
        
content = content.replace(find_pdf, repl_pdf)


with open("backend/main.py", "w") as f:
    f.write(content)

