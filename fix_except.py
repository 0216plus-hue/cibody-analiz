with open("backend/main.py", "r") as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if "except Exception as e:" in line and "STARTUP EVENT ERROR" in lines[i+1]:
        lines[i] = "    except Exception as e:\n"
        lines[i+1] = "        print('STARTUP EVENT ERROR:', e)\n"
        break

with open("backend/main.py", "w") as f:
    f.writelines(lines)
