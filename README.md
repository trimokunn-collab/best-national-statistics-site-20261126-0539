# Statistik Indonesia

[![Statistik Indonesia](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![Rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/trimokunn-collab/best-national-statistics-site-20261126-0539/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![Reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/trimokunn-collab/best-national-statistics-site-20261126-0539/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

Situs statistik nasional untuk **Indonesia**: penduduk, ekonomi, 38 provinsi,
dan pembangunan manusia — angka resmi terbaru dari BPS, Bank Dunia, dan UN,
lengkap dengan sumber dan tahun setiap angka.

Entri untuk kompetisi make.fun
[best-national-statistics-site-20261126-0539](https://make.fun/bounty/best-national-statistics-site-20261126-0539).
Versi 2 — dibangun ulang dari nol setelah entri pertama finis di luar zona
berbayar pada ronde 1.

## Isi situs

- **Beranda** — 10 angka utama (penduduk 284,44 juta, PDB 2024
  Rp22.138,96 triliun, pertumbuhan 2025 5,11%, inflasi 2,92%, kemiskinan
  8,07%, IPM 75,02, …), grafik pertumbuhan PDB 2020–2025, penduduk per
  pulau, dan tren penduduk 1961–2025.
- **Penduduk** — piramida penduduk 2025, struktur umur, TFR 2,13, usia
  median 30,7 tahun, tren penduduk.
- **Ekonomi** — PDB per lapangan usaha 2024, inflasi 2020–2025, kemiskinan
  Maret 2021–2026, ekspor vs impor 2021–2024, plus pemilih tahun.
- **Provinsi** — seluruh 38 provinsi (BPS, SUPAS 2025) dengan tabel yang
  bisa dicari, difilter per pulau, dan diurutkan; grafik 12 provinsi
  terpadat dan penduduk per pulau.
- **Sosial** — IPM 75,02 (2024) dan komponennya, tren IPM 2020–2025,
  melek huruf 97,1% (2025) dengan 5 provinsi tertinggi.

## Menjalankan

```sh
node serve.ts        # http://localhost:8080
```

Situs statis di bawah `app/`, tanpa build step, tanpa permintaan jaringan:
semua CSS/JS lokal, grafik digambar tangan di `<canvas>`, tanpa pustaka luar.

## Menyerahkan

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` menyalin `app/` + `screenshots/` ke `/output` dan menulis
`/output/dossier.json` dengan `buildDossier` dari
`vendor/makefun-frontend.ts` (salinan byte-identical dari kit).

## Lisensi

MIT — lihat [LICENSE](LICENSE).
