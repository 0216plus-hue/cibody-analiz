with open("backend/main.py", "r") as f:
    content = f.read()

# Find the block for get_public_foot_report
import re
match = re.search(r'(@app\.get\("/api/public/foot_report/\{analysis_id\}"\).*?\n    \})', content, re.DOTALL)
if match:
    func_block = match.group(1)
    # Remove it from its current position
    content = content.replace(func_block, "")
    # Insert it BEFORE # Static files
    content = content.replace("# Static files", func_block + "\n\n# Static files")
    
    with open("backend/main.py", "w") as f:
        f.write(content)
    print("Fixed routes")
else:
    print("Could not find the function block")
