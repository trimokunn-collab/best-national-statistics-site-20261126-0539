# STRUCTURE — Statistik Indonesia v2

```
best-national-statistics-site-v2/
├── PRD.md                  # dokumen ini + PRD
├── FEATURES.md             # daftar fitur + semua angka terverifikasi
├── STRUCTURE.md            # struktur berkas
├── README.md               # lencana make.fun + cara menjalankan
├── LICENSE                 # MIT
├── main.ts                 # program penyerahan (Node 22, stdlib saja)
├── serve.ts                # server statis lokal untuk pengujian (opsional)
├── app/                    # situs statis, tanpa build step
│   ├── index.html          # kerangka: header/nav, <main id="page">, footer
│   ├── css/
│   │   └── style.css       # seluruh gaya situs (lokal, tanpa font jaringan)
│   └── js/
│       ├── data.js         # SATU sumber kebenaran: semua angka + sumber
│       ├── charts.js       # helper canvas: line, bars, hbars, pyramid,
│       │                   # grouped bars (gambar ulang saat resize)
│       ├── router.js       # hash routing #/beranda … #/sosial + nav aktif
│       ├── app.js          # boot: memuat router saat DOM siap
│       ├── page-beranda.js # render Beranda (10 KPI + 3 grafik)
│       ├── page-penduduk.js# render Penduduk (piramida + struktur + tren)
│       ├── page-ekonomi.js # render Ekonomi (5 grafik + pemilih tahun)
│       ├── page-provinsi.js# render Provinsi (2 grafik + tabel 38 + kontrol)
│       └── page-sosial.js  # render Sosial (tren IPM + melek huruf + pemilih)
├── screenshots/            # KOSONG — parent yang merender tangkapan layar
└── vendor/                 # DISEDIAKAN PARENT (makefun-frontend.ts),
                            # bukan dibuat di sini
```

## Aliran
1. `index.html` memuat `css/style.css` dan `js/app.js` (type=module).
2. `app.js` memanggil router; router membaca `location.hash`,
   memanggil render halaman yang cocok ke `#page`, lalu memanggil
   `charts.drawAll()` untuk menggambar semua `<canvas>` di halaman itu.
3. Setiap modul halaman hanya mengembalikan HTML (string) + memasang
   event listener kontrolnya sendiri; data selalu dari `data.js`.
4. Grafik digambar ulang saat `resize` (debounce 150 ms).
5. `main.ts` (dijalankan grader): menyalin `app/` + `screenshots/` ke
   direktori output (`MAKEFUN_OUTPUT_DIR` atau `/output`), lalu menulis
   `dossier.json` dari `buildDossier(out, caps)` — caps scorer:
   teks maks 163.840 byte, maks 4 screenshot @ 256 KiB, app maks
   993 berkas / 16 MiB.

## Aturan berkas
- Tidak ada permintaan jaringan: semua yang dimuat berasal dari `app/`.
- Tidak ada library/framework; tidak ada `*.min.js` kecuali yang
  divendor (tidak ada di v2).
- `data.js` tidak berisi logika tampilan; `charts.js` tidak berisi angka;
  tiap modul halaman hanya mengurus satu halaman.
- `screenshots/` dibiarkan kosong sampai parent mengisinya (3–4 PNG/JPEG).
