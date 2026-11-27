# Tailwind CSS derlemesi

Panel artık `cdn.tailwindcss.com` yerine derlenmiş `frontend/assets/tailwind.css` dosyasını kullanır.
Ön yüzde **yeni bir Tailwind sınıfı** kullandığınızda CSS'i yeniden üretin:

```bash
cd tailwind
npx tailwindcss@3.4.17 -c tailwind.config.js -i input.css -o ../frontend/assets/tailwind.css --minify
```

Sonra sayfalardaki `tailwind.css?v=1` numarasını artırın (tarayıcı önbelleği için).
