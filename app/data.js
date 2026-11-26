// data.js — semua angka situs Statistik Indonesia.
//
// Setiap angka di sini nyata dan sudah diverifikasi dari publikasi resmi
// (November 2026). Setiap kelompok angka membawa sumber + tahunnya, dan
// views.js menampilkannya di samping angka di halaman. Tidak ada angka
// karangan, tidak ada placeholder.
//
// Sumber utama: BPS (Badan Pusat Statistik). Bank Dunia dipakai bila BPS
// tidak menerbitkan angka itu; PBB untuk usia median.

// Format angka gaya Indonesia: 284,44 — koma desimal, titik ribuan.
export function fmtID(n, decimals = 2) {
  return Number(n).toLocaleString('id-ID', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}
export function fmtInt(n) {
  return Number(n).toLocaleString('id-ID', { maximumFractionDigits: 0 });
}

// Penduduk Indonesia, pertengahan 2025 (BPS). Dipakai untuk menghitung
// pangsa tiap provinsi.
export const TOTAL_POP = 284438782;

// ---------------------------------------------------------------------------
// Beranda: 8 kartu angka utama
// ---------------------------------------------------------------------------
export const HEADLINE = [
  {
    id: 'penduduk',
    label: 'Penduduk',
    value: '284,44',
    unit: 'juta jiwa',
    note: 'Pertengahan 2025, terbanyak ke-4 di dunia',
    source: 'BPS',
    year: 2025,
  },
  {
    id: 'pdb',
    label: 'PDB',
    value: 'Rp22.138,96',
    unit: 'triliun',
    note: 'Harga berlaku, ekonomi terbesar di Asia Tenggara',
    source: 'BPS',
    year: 2024,
  },
  {
    id: 'pdb-kapita',
    label: 'PDB per kapita',
    value: 'Rp78,62',
    unit: 'juta / tahun',
    note: 'Setara US$4.960,33',
    source: 'BPS',
    year: 2024,
  },
  {
    id: 'pertumbuhan',
    label: 'Pertumbuhan ekonomi',
    value: '5,11',
    unit: '% per tahun',
    note: 'Tumbuh di atas 5% empat tahun berturut-turut',
    source: 'BPS',
    year: 2025,
  },
  {
    id: 'inflasi',
    label: 'Inflasi',
    value: '2,92',
    unit: '% per tahun',
    note: 'Inflasi tahunan (IHK), dalam sasaran Bank Indonesia',
    source: 'BPS',
    year: 2025,
  },
  {
    id: 'pengangguran',
    label: 'Pengangguran terbuka',
    value: '4,85',
    unit: '% angkatan kerja',
    note: '7,46 juta orang menganggur',
    source: 'BPS / Sakernas',
    year: 'Agu 2025',
  },
  {
    id: 'kemiskinan',
    label: 'Penduduk miskin',
    value: '8,07',
    unit: '% penduduk',
    note: '22,93 juta orang di bawah garis kemiskinan',
    source: 'BPS',
    year: 'Mar 2026',
  },
  {
    id: 'ipm',
    label: 'Indeks Pembangunan Manusia',
    value: '75,02',
    unit: 'skala 0–100',
    note: 'Kategori "tinggi", naik 0,63 poin dari 2023',
    source: 'BPS',
    year: 2024,
  },
];

// Fakta sekilas di Beranda.
export const QUICK_FACTS = [
  { value: '38', label: 'provinsi', source: 'Kemendagri', year: 2025 },
  { value: '514', label: 'kabupaten / kota', source: 'Kemendagri', year: 2025 },
  { value: '17.508', label: 'pulau', source: 'BPS', year: 2024 },
  { value: '1,89 jt km²', label: 'luas daratan', source: 'BPS', year: 2025 },
  { value: '~150', label: 'jiwa per km²', source: 'Bank Dunia', year: 2024 },
  { value: '59,4%', label: 'penduduk perkotaan', source: 'Bank Dunia', year: 2025 },
];

// ---------------------------------------------------------------------------
// Pertumbuhan PDB 2020-2025 (BPS, % per tahun)
// ---------------------------------------------------------------------------
export const GDP_GROWTH = [
  { year: 2020, value: -2.07 },
  { year: 2021, value: 3.7 },
  { year: 2022, value: 5.31 },
  { year: 2023, value: 5.05 },
  { year: 2024, value: 5.03 },
  { year: 2025, value: 5.11 },
];

// ---------------------------------------------------------------------------
// Inflasi tahunan 2021-2025 (BPS, % per tahun)
// ---------------------------------------------------------------------------
export const INFLATION = [
  { year: 2021, value: 1.87 },
  { year: 2022, value: 5.51 },
  { year: 2023, value: 2.61 },
  { year: 2024, value: 1.57 },
  { year: 2025, value: 2.92 },
];

// ---------------------------------------------------------------------------
// Kemiskinan, Maret tiap tahun (BPS, % penduduk)
// ---------------------------------------------------------------------------
export const POVERTY = [
  { year: 2021, value: 10.14 },
  { year: 2022, value: 9.54 },
  { year: 2023, value: 9.36 },
  { year: 2024, value: 9.03 },
  { year: 2025, value: 8.47 },
  { year: 2026, value: 8.07 },
];

// ---------------------------------------------------------------------------
// Pangsa PDB 5 lapangan usaha terbesar (BPS, % PDB harga berlaku)
// ---------------------------------------------------------------------------
export const SECTORS = [
  { name: 'Industri pengolahan', share: 19.07 },
  { name: 'Perdagangan besar & eceran', share: 13.17 },
  { name: 'Pertanian, kehutanan & perikanan', share: 13.1 },
  { name: 'Konstruksi', share: 9.83 },
  { name: 'Pertambangan & penggalian', share: 8.75 },
];

// ---------------------------------------------------------------------------
// Penduduk: struktur umur (Bank Dunia, 2025, % penduduk)
// ---------------------------------------------------------------------------
export const AGE_GROUPS = [
  { label: '0–14 tahun', share: 24.2, note: 'Anak-anak' },
  { label: '15–64 tahun', share: 68.3, note: 'Usia produktif' },
  { label: '65 tahun ke atas', share: 7.5, note: 'Lansia' },
];

export const POPULATION_CARDS = [
  {
    value: '31,4',
    unit: 'tahun',
    label: 'Usia median',
    note: 'Separuh penduduk berusia di bawah 31,4 tahun — negara yang muda.',
    source: 'PBB',
    year: 2025,
  },
  {
    value: '2,12',
    unit: 'anak per perempuan',
    label: 'Angka kelahiran (TFR)',
    note: 'Mendekati angka pengganti 2,1 — laju kelahiran melambat.',
    source: 'Bank Dunia',
    year: 2024,
  },
  {
    value: '68,3%',
    unit: 'penduduk',
    label: 'Usia produktif (15–64)',
    note: 'Sekitar 194 juta orang berada di usia kerja — bonus demografi.',
    source: 'Bank Dunia',
    year: 2025,
  },
  {
    value: '145,5 jt',
    unit: 'laki-laki',
    label: 'Laki-laki vs perempuan',
    note: 'Perempuan 142,8 juta (data administrasi Dukcapil, Des 2025).',
    source: 'Dukcapil',
    year: 2025,
  },
];

// ---------------------------------------------------------------------------
// Penduduk per pulau, pertengahan 2025 (BPS; Sulawesi dari BPS via
// sulawesi.com; Maluku & Papua = sisa dari total nasional).
// pop dalam juta jiwa.
// ---------------------------------------------------------------------------
export const ISLANDS = [
  { name: 'Jawa', pop: 158.08, share: 55.6 },
  { name: 'Sumatra', pop: 62.26, share: 21.9 },
  { name: 'Sulawesi', pop: 21.0, share: 7.4 },
  { name: 'Kalimantan', pop: 17.95, share: 6.3 },
  { name: 'Bali & Nusa Tenggara', pop: 15.94, share: 5.6 },
  { name: 'Maluku & Papua', pop: 9.21, share: 3.2 },
];

// ---------------------------------------------------------------------------
// 10 provinsi terpadat, pertengahan 2025 (BPS). pop = jumlah jiwa.
// ---------------------------------------------------------------------------
export const PROVINCES = [
  { name: 'Jawa Barat', capital: 'Bandung', island: 'Jawa', pop: 50759000 },
  { name: 'Jawa Timur', capital: 'Surabaya', island: 'Jawa', pop: 42089300 },
  { name: 'Jawa Tengah', capital: 'Semarang', island: 'Jawa', pop: 38233900 },
  { name: 'Sumatera Utara', capital: 'Medan', island: 'Sumatra', pop: 15785800 },
  { name: 'Banten', capital: 'Serang', island: 'Jawa', pop: 12537400 },
  { name: 'Jakarta', capital: 'Jakarta', island: 'Jawa', pop: 10678000 },
  { name: 'Sulawesi Selatan', capital: 'Makassar', island: 'Sulawesi', pop: 9563100 },
  { name: 'Lampung', capital: 'Bandar Lampung', island: 'Sumatra', pop: 9522900 },
  { name: 'Sumatera Selatan', capital: 'Palembang', island: 'Sumatra', pop: 8928500 },
  { name: 'Riau', capital: 'Pekanbaru', island: 'Sumatra', pop: 6811200 },
];

// ---------------------------------------------------------------------------
// Perdagangan luar negeri 2024 (BPS, miliar US$)
// ---------------------------------------------------------------------------
export const TRADE = {
  exports: 264.7,
  imports: 233.7,
  surplus: 31.0,
  year: 2024,
  source: 'BPS',
  note: 'Neraca perdagangan surplus 67 bulan berturut-turut sejak Mei 2020.',
};

export const ECONOMY_CARDS = [
  {
    value: '0,363',
    unit: 'skala 0–1',
    label: 'Rasio Gini',
    note: 'Ketimpangan pengeluaran; 0 = semua sama, 1 = satu orang menguasai semua.',
    source: 'BPS',
    year: 'Sep 2025',
  },
  {
    value: 'Rp669.235',
    unit: 'per kapita / bulan',
    label: 'Garis kemiskinan',
    note: 'Di bawah garis ini seseorang dihitung miskin; 74,7% dari garis itu untuk makanan.',
    source: 'BPS',
    year: 'Mar 2026',
  },
  {
    value: '0,85%',
    unit: 'penduduk',
    label: 'Kemiskinan ekstrem',
    note: 'Sekitar 2,38 juta orang hidup di bawah US$2,15 per hari (PPP 2017).',
    source: 'BPS',
    year: 'Mar 2025',
  },
  {
    value: 'US$31,0',
    unit: 'miliar',
    label: 'Surplus perdagangan 2024',
    note: 'Ekspor US$264,7 miliar dikurangi impor US$233,7 miliar.',
    source: 'BPS',
    year: 2024,
  },
];

// ---------------------------------------------------------------------------
// Sosial: IPM, pendidikan, kesehatan
// ---------------------------------------------------------------------------
export const SOCIAL = {
  hdi: {
    value: 75.02,
    category: 'tinggi',
    source: 'BPS',
    year: 2024,
    note: 'Naik 0,63 poin dari 74,39 pada 2023. IPM mengukur kesehatan, pendidikan, dan standar hidup layak.',
  },
  // Komponen IPM 2023 (BPS); pengeluaran riil 2024 (BPS).
  hdiComponents: [
    {
      value: '72,13',
      unit: 'tahun',
      label: 'Harapan hidup saat lahir',
      note: 'Dimensi kesehatan dalam IPM.',
      source: 'BPS',
      year: 2023,
    },
    {
      value: '13,98',
      unit: 'tahun',
      label: 'Harapan lama sekolah',
      note: 'Lama sekolah yang diharapkan ditempuh anak usia 7 tahun.',
      source: 'BPS',
      year: 2023,
    },
    {
      value: '8,77',
      unit: 'tahun',
      label: 'Rata-rata lama sekolah',
      note: 'Lama sekolah penduduk usia 25 tahun ke atas.',
      source: 'BPS',
      year: 2023,
    },
    {
      value: 'Rp12,34 jt',
      unit: 'per tahun',
      label: 'Pengeluaran riil per kapita',
      note: 'Disesuaikan daya beli; dimensi standar hidup layak (2024).',
      source: 'BPS',
      year: 2024,
    },
  ],
  // Harapan hidup menurut jenis kelamin (Bank Dunia, 2024, tahun).
  lifeExpectancy: [
    { label: 'Perempuan', value: 73.4 },
    { label: 'Laki-laki', value: 69.2 },
    { label: 'Total', value: 71.3 },
  ],
  cards: [
    {
      value: '96,0%',
      unit: 'penduduk 15+',
      label: 'Melek huruf',
      note: 'Persentase penduduk dewasa yang bisa membaca dan menulis.',
      source: 'Bank Dunia',
      year: 2020,
    },
    {
      value: '72,8%',
      unit: 'penduduk',
      label: 'Pengguna internet',
      note: 'Tiga dari empat penduduk memakai internet.',
      source: 'Bank Dunia',
      year: 2024,
    },
  ],
};
