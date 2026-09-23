with open("backend/main.py", "r") as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if line == '        except Exception as e:\n' and 'raise HTTPException(status_code=500' in lines[i+1]:
        lines[i] = "    except Exception as e:\n"
        lines[i+1] = "        raise HTTPException(status_code=500, detail=str(e))\n"
        break

with open("backend/main.py", "w") as f:
    f.writelines(lines)
