import re

with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/backend/main.py', 'r') as f:
    main_code = f.read()

# Let's replace the process_img function inside analyze_posture
old_process_img = """    async def process_img(img_file, view_name):
        if img_file and img_file.filename:
            bytes_data = await img_file.read()
            analysis_result = analyze_image(bytes_data)
            results[view_name] = analysis_result"""

new_process_img = """    os.makedirs("uploads/posture", exist_ok=True)
    image_paths = {}

    async def process_img(img_file, view_name):
        if img_file and img_file.filename:
            bytes_data = await img_file.read()
            
            # Resmi diske kaydet
            ext = img_file.filename.split('.')[-1]
            img_filename = f"{uuid.uuid4()}_{view_name}.{ext}"
            img_path = os.path.join("uploads", "posture", img_filename)
            with open(img_path, "wb") as out_file:
                out_file.write(bytes_data)
                
            image_paths[view_name] = img_path
            
            analysis_result = analyze_image(bytes_data)
            results[view_name] = analysis_result"""

if old_process_img in main_code:
    main_code = main_code.replace(old_process_img, new_process_img)
    
    # Also update the db record creation
    old_db_record = """    analysis_record = models.PostureAnalysis(
        patient_id=patient_id,
        analysis_data=json.dumps(results)
    )"""
    new_db_record = """    analysis_record = models.PostureAnalysis(
        patient_id=patient_id,
        front_image_path=image_paths.get("front"),
        back_image_path=image_paths.get("back"),
        left_image_path=image_paths.get("left"),
        right_image_path=image_paths.get("right"),
        analysis_data=json.dumps(results)
    )"""
    main_code = main_code.replace(old_db_record, new_db_record)
    
    with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/backend/main.py', 'w') as f:
        f.write(main_code)
    print("Backend patched to save images.")
else:
    print("Backend already patched or not found.")
