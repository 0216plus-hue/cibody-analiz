with open("frontend/scoliosis.js", "r") as f:
    js = f.read()

# Current string: 
# const dateStr = new Date(item.created_at + 'Z').toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' });
# Change to:
# const dateStr = new Date(item.created_at + 'Z').toLocaleString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

js = js.replace(
    "const dateStr = new Date(item.created_at + 'Z').toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' });",
    "const dateStr = new Date(item.created_at + 'Z').toLocaleString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });"
)

with open("frontend/scoliosis.js", "w") as f:
    f.write(js)
print("Date format updated")
