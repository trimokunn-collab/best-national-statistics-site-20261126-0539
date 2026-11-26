# Statistik Indonesia

[![Statistik Indonesia](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![Rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/trimokunn-collab/best-national-statistics-site-20261126-0539/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![Reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/trimokunn-collab/best-national-statistics-site-20261126-0539/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

Situs statistik nasional untuk **Indonesia**: penduduk, ekonomi, provinsi,
pendidikan, dan kesehatan — angka resmi terbaru dari BPS, Bank Dunia, dan
PBB, lengkap dengan sumber dan tahun setiap angka.

Entri untuk kompetisi make.fun
[best-national-statistics-site-20261126-0539](https://make.fun/bounty/best-national-statistics-site-20261126-0539).

## Isi situs

- **Beranda** — 8 angka utama (penduduk 284,44 juta, PDB Rp22.138,96 triliun,
  pertumbuhan 5,11%, kemiskinan 8,07%, IPM 75,02, …), grafik pertumbuhan PDB
  2020–2025, dan sebaran penduduk per pulau.
- **Penduduk** — struktur umur, usia median 31,4 tahun, fertilitas 2,12,
  penduduk per pulau.
- **Ekonomi** — pangsa PDB per lapangan usaha, inflasi 2021–2025, kemiskinan
  Maret 2021–2026, perdagangan luar negeri 2024.
- **Provinsi** — 10 provinsi terpadat (BPS, pertengahan 2025) dengan grafik
  batang dan tabel yang bisa dicari, difilter per pulau, dan diurutkan.
- **Sosial** — IPM 75,02 dan komponennya, harapan hidup, melek huruf.

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
