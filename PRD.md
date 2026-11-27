# PRD — Statistik Indonesia v2

## Ringkasan
Rebuild dari nol situs statistik nasional Indonesia untuk bounty make.fun
`best-national-statistics-site-20261126-0539` ("Make the best national
statistics site"). Entri v1 finis peringkat 2.553 dari 4.140 di ronde 1 —
jauh dari zona berbayar (top 10, $5) dan dari ambang lolos ke babak final
(top 40). V2 dibangun untuk menang duel juri berpasangan: situs yang
kelihatan lengkap dan meyakinkan terutama lewat screenshot-nya, karena
juri hampir seluruhnya menilai dari lembar screenshot + garis besar sumber.

## Masalah yang diperbaiki dari v1
- Data provinsi hanya 10 teratas → v2 memuat **seluruh 38 provinsi**.
- Tiap halaman hanya 1 grafik → v2 minimal **2 grafik per halaman**.
- Halaman Beranda kurang padat → v2 memakai gaya dasbor: 10 angka utama
  + 3 grafik langsung terlihat, supaya cover screenshot menunjukkan
  keseluruhan situs dalam sekali pandang.
- Beberapa angka tanpa konteks tahun → v2 mencantumkan **sumber + tahun
  pada setiap angka**.

## Pengguna
Pengunjung yang mencari angka-angka resmi Indonesia: penduduk, ekonomi,
provinsi, dan pembangunan manusia. Mereka datang untuk satu angka spesifik
dan harus menemukannya dalam hitungan detik, lalu percaya pada angkanya
karena sumber dan tahunnya tertulis jelas.

## Kriteria sukses (sesuai rubrik juri, urut pentingnya)
1. Situs beneran jalan, terlihat di screenshot: halaman, grafik, dan bagian
   yang dibutuhkan pengunjung statistik, semua lewat tautan, angka asli,
   semua kontrol berfungsi, tidak ada yang kosong / rusak / placeholder.
2. Isi dan kegunaan: lengkap, spesifik, tiap angka bersumber + bertahun.
3. Mudah dipakai: navigasi jelas, hal utama terlihat sekilas, layout HP rapi.
4. Tampilan dan orisinalitas: desain sendiri, palet koheren.
5. Ringan dan rapi: first load kecil, sumber terpisah per fungsi, tanpa
   framework berat.

## Batasan
- File statis di `app/`, tanpa build step; `app/index.html` dibuka di
  Chrome desktop dan HP, tanpa satu pun permintaan jaringan.
- Vanilla JS + CSS lokal saja. Grafik digambar tangan di `<canvas>`.
- Semua angka terverifikasi dari BPS / Bank Dunia / UN (lihat
  `FEATURES.md` — angka yang tidak terverifikasi tidak dipakai).
- 5 halaman lewat hash routing, semua terjangkau lewat tautan.
- `main.ts` di root repo: menyalin `app/` + `screenshots/` ke output dan
  menulis `dossier.json` dengan `buildDossier` dari
  `vendor/makefun-frontend.ts` (disediakan parent, bukan bagian repo ini).
