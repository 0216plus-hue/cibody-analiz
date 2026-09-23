with open("backend/main.py", "r") as f:
    lines = f.readlines()

mount_idx = -1
for i, line in enumerate(lines):
    if line.startswith('app.mount("/", StaticFiles'):
        mount_idx = i
        break

if mount_idx != -1:
    mount_line = lines[mount_idx]
    
    # Everything before mount line
    before = lines[:mount_idx]
    
    # Everything after mount line
    after = lines[mount_idx+1:]
    
    # New file content: before + after + mount_line
    new_content = "".join(before) + "".join(after) + mount_line
    
    with open("backend/main.py", "w") as f:
        f.write(new_content)
    print("Fixed routes order")
else:
    print("Could not find app.mount")
