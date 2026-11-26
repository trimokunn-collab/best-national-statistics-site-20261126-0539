// views.js — HTML tiap halaman, dibangun dari data.js.
//
// Semua angka datang dari data.js; file ini hanya menyusunnya. Setiap
// angka ditemani label "Sumber: … , tahun" supaya pengunjung bisa
// memeriksa dan mengutipnya.

import {
  AGE_GROUPS,
  ECONOMY_CARDS,
  GDP_GROWTH,
  HEADLINE,
  INFLATION,
  ISLANDS,
  POPULATION_CARDS,
  POVERTY,
  PROVINCES,
  QUICK_FACTS,
  SECTORS,
  SOCIAL,
  TOTAL_POP,
  TRADE,
  fmtID,
  fmtInt,
} from './data.js';

const escape = (s) =>
  String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

function srcTag(source, year) {
  return `<p class="src">Sumber: ${escape(source)}, ${escape(year)}</p>`;
}

function statCard(c) {
  return `<article class="stat-card">
  <p class="stat-label">${escape(c.label)}</p>
  <p class="stat-value">${escape(c.value)} <span class="stat-unit">${escape(c.unit)}</span></p>
  <p class="stat-note">${escape(c.note)}</p>
  ${srcTag(c.source, c.year)}
</article>`;
}

function pageHead(kicker, title, intro, source, year) {
  return `<p class="kicker">${escape(kicker)}</p>
<h1>${escape(title)}</h1>
<p class="intro">${escape(intro)}</p>
${srcTag(source, year)}`;
}

function chartCard(id, title, desc, src, year, extra = '') {
  return `<section class="chart-card">
  <h2>${escape(title)}</h2>
  <p class="chart-desc">${escape(desc)}</p>
  ${extra}
  <canvas id="${id}" role="img" aria-label="${escape(title)}"></canvas>
  ${srcTag(src, year)}
</section>`;
}

// ---------------------------------------------------------------------------
// Beranda
// ---------------------------------------------------------------------------
export function beranda() {
  const cards = HEADLINE.map(statCard).join('');
  const facts = QUICK_FACTS.map(
    (f) =>
      `<li><strong>${escape(f.value)}</strong> ${escape(f.label)} <span class="fact-src">(${escape(f.source)}, ${escape(f.year)})</span></li>`,
  ).join('');
  return `<section class="hero">
  <p class="kicker">Situs statistik nasional &middot; Indonesia</p>
  <h1>Indonesia dalam angka</h1>
  <p class="intro">Penduduk, ekonomi, provinsi, dan kesejahteraan Indonesia —
  angka resmi terbaru, lengkap dengan sumbernya, dalam satu tempat.</p>
</section>
<section class="stat-grid" aria-label="Angka utama">${cards}</section>
<section class="charts-2col">
${chartCard(
  'gdp-chart',
  'Pertumbuhan ekonomi, 2020–2025',
  'PDB tumbuh di atas 5% sejak 2022, setelah kontraksi pandemi pada 2020. ' +
    'Grafik menunjukkan perubahan PDB riil terhadap tahun sebelumnya, dalam persen.',
  'BPS',
  '2020–2025',
  `<div class="toggle" role="group" aria-label="Jenis grafik">
    <button type="button" data-gdp-type="line" class="toggle-btn active">Garis</button>
    <button type="button" data-gdp-type="bar" class="toggle-btn">Batang</button>
  </div>`,
)}
${`<section class="chart-card">
  <h2>Penduduk menurut pulau</h2>
  <p class="chart-desc">Lebih dari separuh penduduk tinggal di Jawa. Enam pulau
  besar ini menampung seluruh penduduk Indonesia.</p>
  <div class="donut-wrap">
    <canvas id="island-donut" role="img" aria-label="Sebaran penduduk menurut pulau"></canvas>
    <ul class="legend">${ISLANDS.map(
      (p, i) =>
        `<li><span class="swatch" style="background:${['#166534', '#0f766e', '#b45309', '#b91c1c', '#475569', '#6d28d9'][i]}"></span>${escape(p.name)} — <strong>${fmtID(p.share, 1)}%</strong> (${fmtID(p.pop, 2)} jt)</li>`,
    ).join('')}</ul>
  </div>
  ${srcTag('BPS', 'pertengahan 2025')}
</section>`}
</section>
<section class="facts">
  <h2>Fakta sekilas</h2>
  <ul class="fact-list">${facts}</ul>
</section>`;
}

// ---------------------------------------------------------------------------
// Penduduk
// ---------------------------------------------------------------------------
export function penduduk() {
  const cards = POPULATION_CARDS.map(statCard).join('');
  const islandRows = ISLANDS.map(
    (p) =>
      `<tr><td>${escape(p.name)}</td><td class="num">${fmtID(p.pop, 2)}</td><td class="num">${fmtID(p.share, 1)}%</td></tr>`,
  ).join('');
  return `${pageHead(
    'Penduduk',
    'Siapa penduduk Indonesia?',
    '284,44 juta jiwa pada pertengahan 2025 — negara berpenduduk terbanyak ' +
      'keempat di dunia, dengan penduduk yang muda dan terkonsentrasi di Jawa.',
    'BPS',
    'pertengahan 2025',
  )}
<section class="stat-grid" aria-label="Angka penduduk">${cards}</section>
<section class="charts-2col">
${chartCard(
  'age-chart',
  'Struktur umur penduduk',
  'Hampir tujuh dari sepuluh penduduk berada di usia produktif (15–64 tahun). ' +
    'Inilah yang disebut bonus demografi — jendela yang terbuka sampai sekitar 2030-an.',
  'Bank Dunia',
  2025,
)}
${chartCard(
  'island-bar-chart',
  'Penduduk per pulau (juta jiwa)',
  'Jawa menampung 158,08 juta jiwa di lahan yang hanya sekitar 7% dari ' +
    'luas daratan Indonesia; Papua dan Maluku yang luas justru paling sedikit penduduknya.',
  'BPS',
  'pertengahan 2025',
)}
</section>
<section class="table-card">
  <h2>Penduduk menurut pulau</h2>
  <table>
    <thead><tr><th>Pulau</th><th class="num">Penduduk (juta)</th><th class="num">Pangsa</th></tr></thead>
    <tbody>${islandRows}</tbody>
  </table>
  ${srcTag('BPS', 'pertengahan 2025')}
</section>
<aside class="note-box">
  <h2>Catatan: dua angka penduduk yang berbeda</h2>
  <p>BPS menghitung <strong>284,44 juta</strong> (pertengahan 2025) dari proyeksi
  Sensus Penduduk 2020. Dukcapil mencatat <strong>288,3 juta</strong> (Desember 2025)
  dari data administrasi kependudukan. Keduanya benar menurut metodenya —
  situs ini memakai angka BPS sebagai angka resmi statistik, dan menulis
  angka Dukcapil bila relevan.</p>
  ${srcTag('BPS & Dukcapil', 2025)}
</aside>`;
}

// ---------------------------------------------------------------------------
// Ekonomi
// ---------------------------------------------------------------------------
export function ekonomi() {
  const cards = ECONOMY_CARDS.map(statCard).join('');
  return `${pageHead(
    'Ekonomi',
    'Ekonomi Indonesia',
    'PDB Rp22.138,96 triliun pada 2024 dengan pertumbuhan 5,11% pada 2025. ' +
      'Industri pengolahan adalah lapangan usaha terbesar, dan perdagangan luar ' +
      'negeri surplus 67 bulan berturut-turut.',
    'BPS',
    '2024–2025',
  )}
<section class="stat-grid" aria-label="Angka ekonomi">${cards}</section>
<section class="charts-2col">
${chartCard(
  'sector-chart',
  'Pangsa PDB menurut lapangan usaha',
  'Lima lapangan usaha terbesar menyumbang hampir dua pertiga PDB. ' +
    'Industri pengolahan memimpin dengan 19,07%.',
  'BPS',
  '2024',
)}
${chartCard(
  'inflation-chart',
  'Inflasi tahunan, 2021–2025',
  'Inflasi melonjak ke 5,51% pada 2022 saat harga energi naik, lalu kembali ' +
    'ke kisaran 1–3%. Angka 2025 sebesar 2,92%.',
  'BPS',
  '2021–2025',
)}
</section>
<section class="charts-2col">
${chartCard(
  'poverty-chart',
  'Tingkat kemiskinan, Maret 2021–2026',
  'Kemiskinan turun dari 10,14% (Mar 2021) menjadi 8,07% (Mar 2026) — ' +
    'terendah sepanjang sejarah pencatatan BPS.',
  'BPS',
  'Mar 2021 – Mar 2026',
)}
<section class="chart-card">
  <h2>Perdagangan luar negeri 2024</h2>
  <p class="chart-desc">Indonesia menjual lebih banyak daripada membeli:
  surplus perdagangan US$31,0 miliar pada 2024.</p>
  <dl class="trade-list">
    <div><dt>Ekspor</dt><dd>US$${fmtID(TRADE.exports, 1)} miliar</dd></div>
    <div><dt>Impor</dt><dd>US$${fmtID(TRADE.imports, 1)} miliar</dd></div>
    <div><dt>Surplus</dt><dd>US$${fmtID(TRADE.surplus, 1)} miliar</dd></div>
  </dl>
  <p class="chart-desc">${escape(TRADE.note)}</p>
  ${srcTag(TRADE.source, TRADE.year)}
</section>
</section>`;
}

// ---------------------------------------------------------------------------
// Provinsi — tabel + filter. main.js memanggil provinceRows() dan
// provinceChartData() setiap kali pencarian, filter pulau, atau urutan berubah.
// ---------------------------------------------------------------------------
export function provinceShare(pop) {
  return (pop / TOTAL_POP) * 100;
}

export function filterProvinces({ q = '', island = 'semua', sort = 'desc' }) {
  const query = q.trim().toLowerCase();
  let list = PROVINCES.filter((p) => {
    const hitQ =
      !query ||
      p.name.toLowerCase().includes(query) ||
      p.capital.toLowerCase().includes(query);
    const hitIsland = island === 'semua' || p.island === island;
    return hitQ && hitIsland;
  });
  list = [...list].sort((a, b) => {
    if (sort === 'asc') return a.pop - b.pop;
    if (sort === 'nama') return a.name.localeCompare(b.name, 'id');
    return b.pop - a.pop;
  });
  return list;
}

export function provinceRows(list) {
  if (list.length === 0) {
    return `<tr><td colspan="5" class="empty">Tidak ada provinsi yang cocok. Coba kata kunci atau filter lain.</td></tr>`;
  }
  return list
    .map(
      (p) =>
        `<tr><td>${escape(p.name)}</td><td>${escape(p.capital)}</td><td>${escape(p.island)}</td><td class="num">${fmtInt(p.pop)}</td><td class="num">${fmtID(provinceShare(p.pop), 1)}%</td></tr>`,
    )
    .join('');
}

export function provinsi() {
  const islands = ['semua', 'Jawa', 'Sumatra', 'Sulawesi'];
  return `${pageHead(
    'Provinsi',
    '10 provinsi terpadat',
    'Jawa Barat sendiri berpenduduk 50,76 juta jiwa — lebih banyak daripada ' +
      'penduduk Spanyol. Lima dari sepuluh provinsi terpadat ada di Jawa. ' +
      'Cari, filter, dan urutkan tabel di bawah ini.',
    'BPS',
    'pertengahan 2025',
  )}
<section class="chart-card">
  <h2>Provinsi terpadat (juta jiwa)</h2>
  <p class="chart-desc">Grafik mengikuti tabel: bila Anda mencari atau
  memfilter, grafik ikut berubah.</p>
  <canvas id="province-chart" role="img" aria-label="Provinsi terpadat"></canvas>
  ${srcTag('BPS', 'pertengahan 2025')}
</section>
<section class="table-card">
  <h2>Tabel provinsi</h2>
  <div class="controls">
    <label class="control">Cari provinsi / ibu kota
      <input type="search" id="prov-search" placeholder="cth: Jawa, Medan, Makassar…" autocomplete="off">
    </label>
    <fieldset class="control chips" id="prov-islands">
      <legend>Pulau</legend>
      ${islands
        .map(
          (isl) =>
            `<button type="button" data-island="${escape(isl)}" class="chip${isl === 'semua' ? ' active' : ''}">${isl === 'semua' ? 'Semua' : escape(isl)}</button>`,
        )
        .join('')}
    </fieldset>
    <label class="control">Urutkan
      <select id="prov-sort">
        <option value="desc">Terbanyak dulu</option>
        <option value="asc">Tersedikit dulu</option>
        <option value="nama">Nama A–Z</option>
      </select>
    </label>
  </div>
  <p class="result-count" id="prov-count" aria-live="polite"></p>
  <div class="table-scroll">
  <table>
    <thead><tr><th>Provinsi</th><th>Ibu kota</th><th>Pulau</th><th class="num">Penduduk</th><th class="num">Pangsa nasional</th></tr></thead>
    <tbody id="prov-rows"></tbody>
  </table>
  </div>
  ${srcTag('BPS', 'pertengahan 2025')}
</section>`;
}

// ---------------------------------------------------------------------------
// Sosial — pendidikan & kesehatan
// ---------------------------------------------------------------------------
export function sosial() {
  const comps = SOCIAL.hdiComponents.map(statCard).join('');
  const cards = SOCIAL.cards.map(statCard).join('');
  return `${pageHead(
    'Pendidikan & Kesehatan',
    'Sejahtera menurut angka',
    'Indeks Pembangunan Manusia Indonesia 75,02 pada 2024 — kategori "tinggi". ' +
      'Di balik satu angka itu ada umur yang makin panjang, sekolah yang makin ' +
      'lama, dan daya beli yang membaik.',
    'BPS',
    2024,
  )}
<section class="chart-card">
  <h2>Indeks Pembangunan Manusia (IPM) 2024: ${fmtID(SOCIAL.hdi.value, 2)}</h2>
  <p class="chart-desc">${escape(SOCIAL.hdi.note)}</p>
  <canvas id="hdi-gauge" role="img" aria-label="Pengukur IPM 75,02 dari 100"></canvas>
  ${srcTag(SOCIAL.hdi.source, SOCIAL.hdi.year)}
</section>
<section class="stat-grid" aria-label="Komponen IPM">${comps}</section>
<section class="charts-2col">
${chartCard(
  'life-chart',
  'Harapan hidup saat lahir',
  'Perempuan Indonesia rata-rata hidup 4,2 tahun lebih lama daripada ' +
    'laki-laki. Total 71,3 tahun.',
  'Bank Dunia',
  2024,
)}
<section class="chart-card">
  <h2>Pendidikan & digital</h2>
  <p class="chart-desc">Dua angka penanda akses pengetahuan dan teknologi.</p>
  <div class="stat-grid one-col">${cards}</div>
  ${srcTag('Bank Dunia', '2020 & 2024')}
</section>
</section>`;
}

export function missing() {
  return `<p><a href="#/">&larr; Kembali ke Beranda</a></p>
<h1>Halaman tidak ditemukan</h1>
<p>Tidak ada halaman statistik di alamat ini. Coba salah satu halaman di
navigasi atas: Beranda, Penduduk, Ekonomi, Provinsi, atau Sosial.</p>`;
}
