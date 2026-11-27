// data.js — satu-satunya sumber angka situs "Statistik Indonesia".
// Setiap angka di bawah ini terverifikasi dari sumber yang tertulis;
// tidak ada angka karangan. Satuan dicatat di tiap struktur data.
// Nilai penduduk provinsi dalam jiwa (BPS, SUPAS 2025); nilai lain
// dalam juta jiwa / persen / Rp triliun / US$ miliar sesuai label.

export const SITE = {
  title: 'Statistik Indonesia',
  tagline: 'Angka resmi Indonesia, dalam satu tempat.',
  updated: 'November 2026',
};

// 10 angka utama Beranda: nilai, label, satuan, sumber + tahun.
export const KPIS = [
  { value: '284,44 jt', label: 'Penduduk', source: 'BPS, proyeksi pertengahan 2025' },
  { value: 'Rp22.138,96 T', label: 'PDB 2024', source: 'BPS, 2024' },
  { value: 'Rp78,62 jt', label: 'PDB per kapita 2024', sub: 'US$4.960', source: 'BPS, 2024' },
  { value: '5,11%', label: 'Pertumbuhan ekonomi 2025', source: 'BPS, 2025' },
  { value: '2,92%', label: 'Inflasi 2025', source: 'BPS, Desember 2025' },
  { value: '4,85%', label: 'Pengangguran', source: 'BPS, Agustus 2025' },
  { value: '8,07%', label: 'Kemiskinan', source: 'BPS, Maret 2026' },
  { value: '75,90', label: 'IPM', source: 'BPS, 2025' },
  { value: 'US$264,70 M', label: 'Ekspor 2024', source: 'BPS, 2024' },
  { value: '45,05', label: 'Rasio ketergantungan', source: 'BPS, SUPAS 2025' },
];

export const GDP_NOTE = {
  text: 'Pembaruan: PDB 2025 mencapai Rp23.821,1 triliun dan PDB per kapita Rp83,7 juta (US$5.083,4).',
  source: 'BPS, rilis 5 Februari 2026',
};

// Pertumbuhan PDB tahunan (%, BPS).
export const GROWTH = {
  years: [2020, 2021, 2022, 2023, 2024, 2025],
  values: [-2.07, 3.7, 5.31, 5.05, 5.03, 5.11],
  source: 'BPS',
};

// Inflasi Desember-ke-Desember (%, BPS).
export const INFLATION = {
  years: [2020, 2021, 2022, 2023, 2024, 2025],
  values: [1.68, 1.87, 5.51, 2.61, 1.57, 2.92],
  source: 'BPS',
};

// Kemiskinan Maret (%, BPS).
export const POVERTY = {
  years: [2021, 2022, 2023, 2024, 2025, 2026],
  values: [10.14, 9.54, 9.36, 9.03, 8.47, 8.07],
  source: 'BPS, Maret tiap tahun',
};

// PDB menurut lapangan usaha 2024 (% terhadap PDB, BPS).
export const SECTORS = [
  { name: 'Industri pengolahan', share: 19.07 },
  { name: 'Perdagangan', share: 13.17 },
  { name: 'Pertanian, kehutanan & perikanan', share: 13.1 },
  { name: 'Konstruksi', share: 9.83 },
  { name: 'Pertambangan & penggalian', share: 8.75 },
  { name: 'Transportasi & pergudangan', share: 6.16 },
  { name: 'Lainnya', share: 29.92 },
];

// Perdagangan luar negeri (US$ miliar, BPS).
export const TRADE = {
  years: [2021, 2022, 2023, 2024],
  exports: [231.61, 291.9, 258.82, 264.7],
  imports: [196.27, 237.44, 221.93, 233.66],
  surplus2024: 31.04,
  source: 'BPS',
};

// Penduduk per pulau (juta jiwa, BPS SUPAS 2025 — dijumlah dari provinsi).
export const ISLANDS = [
  { name: 'Jawa', pop: 158.41 },
  { name: 'Sumatera', pop: 62.32 },
  { name: 'Sulawesi', pop: 21.06 },
  { name: 'Kalimantan', pop: 17.75 },
  { name: 'Bali & Nusa Tenggara', pop: 15.95 },
  { name: 'Maluku & Papua', pop: 9.18 },
];

// Tren penduduk (juta jiwa; sensus 1961–2020, proyeksi 2023–2025, BPS).
export const POP_TREND = {
  years: [1961, 1971, 1980, 1990, 2000, 2010, 2020, 2023, 2024, 2025],
  values: [97.09, 119.21, 147.49, 179.38, 206.26, 237.64, 270.2, 278.7, 281.6, 284.44],
  source: 'BPS, sensus dan proyeksi',
};

// Piramida penduduk 2025 (juta jiwa, BPS Proyeksi Penduduk).
export const PYRAMID = [
  { group: '0–4', male: 11.61, female: 11.15 },
  { group: '5–9', male: 11.23, female: 10.73 },
  { group: '10–14', male: 11.25, female: 10.77 },
  { group: '15–19', male: 11.39, female: 10.71 },
  { group: '20–24', male: 11.4, female: 10.76 },
  { group: '25–29', male: 11.53, female: 10.98 },
  { group: '30–34', male: 11.32, female: 10.87 },
  { group: '35–39', male: 11.01, female: 10.71 },
  { group: '40–44', male: 10.44, female: 10.25 },
  { group: '45–49', male: 9.84, female: 9.79 },
  { group: '50–54', male: 8.78, female: 8.83 },
  { group: '55–59', male: 7.52, female: 7.65 },
  { group: '60–64', male: 6.07, female: 6.29 },
  { group: '65–69', male: 4.52, female: 4.75 },
  { group: '70–74', male: 3.04, female: 3.31 },
  { group: '75+', male: 2.61, female: 3.36 },
];

// Struktur umur luas 2025 (juta jiwa dan pangsa, BPS proyeksi).
export const AGE_STRUCTURE = [
  { name: '0–14 tahun', pop: 66.72, share: 23.5 },
  { name: '15–64 tahun', pop: 196.13, share: 69.0 },
  { name: '65+ tahun', pop: 21.58, share: 7.6 },
];

// Indikator demografi lain.
export const DEMO = [
  { value: '2,13', label: 'Angka kelahiran total (anak per perempuan)', source: 'BPS, SUPAS 2025' },
  { value: '30,7 thn', label: 'Usia median', source: 'UN WPP 2024' },
  { value: '101,9', label: 'Rasio jenis kelamin (laki-laki per 100 perempuan)', source: 'BPS, 2025' },
  { value: '1,08%/thn', label: 'Laju pertumbuhan penduduk 2020–2025', source: 'BPS, SUPAS 2025' },
  { value: '59,2%', label: 'Penduduk perkotaan', source: 'Bank Dunia, 2024' },
  { value: '45,05', label: 'Rasio ketergantungan', source: 'BPS, SUPAS 2025' },
];

// 38 provinsi (jiwa, BPS SUPAS 2025). Pulau dipakai filter tabel.
export const PROVINCES = [
  { name: 'Jawa Barat', island: 'Jawa', pop: 50942801 },
  { name: 'Jawa Timur', island: 'Jawa', pop: 42111119 },
  { name: 'Jawa Tengah', island: 'Jawa', pop: 38261423 },
  { name: 'Sumatera Utara', island: 'Sumatera', pop: 15801821 },
  { name: 'Banten', island: 'Jawa', pop: 12582516 },
  { name: 'DKI Jakarta', island: 'Jawa', pop: 10724334 },
  { name: 'Sulawesi Selatan', island: 'Sulawesi', pop: 9571273 },
  { name: 'Lampung', island: 'Sumatera', pop: 9531282 },
  { name: 'Sumatera Selatan', island: 'Sumatera', pop: 8935870 },
  { name: 'Riau', island: 'Sumatera', pop: 6817892 },
  { name: 'Sumatera Barat', island: 'Sumatera', pop: 5920701 },
  { name: 'Kalimantan Barat', island: 'Kalimantan', pop: 5771745 },
  { name: 'Nusa Tenggara Timur', island: 'Bali & Nusa Tenggara', pop: 5749684 },
  { name: 'Nusa Tenggara Barat', island: 'Bali & Nusa Tenggara', pop: 5738081 },
  { name: 'Aceh', island: 'Sumatera', pop: 5631760 },
  { name: 'Bali', island: 'Bali & Nusa Tenggara', pop: 4463510 },
  { name: 'Kalimantan Selatan', island: 'Kalimantan', pop: 4327375 },
  { name: 'Kalimantan Timur', island: 'Kalimantan', pop: 4050637 },
  { name: 'DI Yogyakarta', island: 'Jawa', pop: 3783309 },
  { name: 'Jambi', island: 'Sumatera', pop: 3772062 },
  { name: 'Sulawesi Tengah', island: 'Sulawesi', pop: 3158895 },
  { name: 'Kalimantan Tengah', island: 'Kalimantan', pop: 2847856 },
  { name: 'Sulawesi Tenggara', island: 'Sulawesi', pop: 2840318 },
  { name: 'Sulawesi Utara', island: 'Sulawesi', pop: 2723020 },
  { name: 'Kepulauan Riau', island: 'Sumatera', pop: 2215913 },
  { name: 'Bengkulu', island: 'Sumatera', pop: 2140142 },
  { name: 'Maluku', island: 'Maluku & Papua', pop: 1972606 },
  { name: 'Kepulauan Bangka Belitung', island: 'Sumatera', pop: 1552391 },
  { name: 'Sulawesi Barat', island: 'Sulawesi', pop: 1527159 },
  { name: 'Papua Tengah', island: 'Maluku & Papua', pop: 1493906 },
  { name: 'Papua Pegunungan', island: 'Maluku & Papua', pop: 1486352 },
  { name: 'Maluku Utara', island: 'Maluku & Papua', pop: 1375306 },
  { name: 'Gorontalo', island: 'Sulawesi', pop: 1243416 },
  { name: 'Papua', island: 'Maluku & Papua', pop: 1074761 },
  { name: 'Kalimantan Utara', island: 'Kalimantan', pop: 750146 },
  { name: 'Papua Barat Daya', island: 'Maluku & Papua', pop: 637189 },
  { name: 'Papua Barat', island: 'Maluku & Papua', pop: 588374 },
  { name: 'Papua Selatan', island: 'Maluku & Papua', pop: 550308 },
];
export const PROVINCES_TOTAL = 284667253;
export const PROVINCES_SOURCE = 'BPS, SUPAS 2025';

// Tren IPM (BPS).
export const IPM_TREND = {
  years: [2020, 2021, 2022, 2023, 2024, 2025],
  values: [72.81, 73.16, 73.77, 74.39, 75.02, 75.9],
  source: 'BPS',
};

// Komponen IPM per tahun (BPS).
export const IPM_COMPONENTS = {
  2024: {
    ipm: 75.02,
    life: 74.15,
    schoolExpected: 13.21,
    schoolMean: 8.85,
    spending: 12.34,
  },
  2025: {
    ipm: 75.9,
    life: 74.47,
    schoolExpected: 13.3,
    schoolMean: 9.07,
    spending: 12.8,
  },
};

// Melek huruf penduduk 15+ (%, BPS).
export const LITERACY = {
  national2025: 97.1,
  male2025: 98.2,
  female2025: 96.0,
  top: [
    { name: 'Sulawesi Utara', value: 99.8 },
    { name: 'DKI Jakarta', value: 99.71 },
    { name: 'Kepulauan Riau', value: 99.46 },
    { name: 'Maluku', value: 99.35 },
    { name: 'Kalimantan Tengah', value: 99.18 },
  ],
  trend: {
    years: [2015, 2021, 2022, 2023, 2024, 2025],
    values: [95.22, 96.04, 96.35, 96.53, 96.67, 97.1],
  },
  source: 'BPS',
};

// Detail per tahun untuk pemilih tahun di halaman Ekonomi.
// Kemiskinan memakai angka Maret; ekspor/impor tersedia 2021–2024.
export const YEAR_DETAIL = {
  2021: { growth: 3.7, inflation: 1.87, poverty: 10.14, exports: 231.61, imports: 196.27 },
  2022: { growth: 5.31, inflation: 5.51, poverty: 9.54, exports: 291.9, imports: 237.44 },
  2023: { growth: 5.05, inflation: 2.61, poverty: 9.36, exports: 258.82, imports: 221.93 },
  2024: { growth: 5.03, inflation: 1.57, poverty: 9.03, exports: 264.7, imports: 233.66 },
  2025: { growth: 5.11, inflation: 2.92, poverty: 8.47, exports: null, imports: null },
};
