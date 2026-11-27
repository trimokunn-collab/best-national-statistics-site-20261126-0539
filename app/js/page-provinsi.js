// page-provinsi.js — halaman Provinsi: tabel 38 provinsi + kontrol + 2 grafik.
import { PROVINCES, PROVINCES_TOTAL, PROVINCES_SOURCE, ISLANDS } from './data.js';
import { drawHBars } from './charts.js';

const ISLAND_OPTIONS = ['Semua', 'Sumatera', 'Jawa', 'Bali & Nusa Tenggara', 'Kalimantan', 'Sulawesi', 'Maluku & Papua'];

function fmtNum(n) {
  return n.toLocaleString('id-ID');
}

function renderRows(list) {
  return list.map((p, i) => `
    <tr>
      <td>${i + 1}</td>
      <td>${p.name}</td>
      <td>${p.island}</td>
      <td class="num">${fmtNum(p.pop)}</td>
      <td class="num">${((p.pop / PROVINCES_TOTAL) * 100).toFixed(2)}%</td>
    </tr>`).join('');
}

export function renderPage() {
  const islandOpts = ISLAND_OPTIONS.map((o) => `<option value="${o}">${o === 'Semua' ? 'Semua pulau' : o}</option>`).join('');
  const jawaShare = ((ISLANDS[0].pop / (PROVINCES_TOTAL / 1e6)) * 100).toFixed(1);
  return `
  <div class="page-head">
    <h1>Provinsi</h1>
    <p class="lede">Seluruh 38 provinsi Indonesia, dari Jawa Barat (50,94 juta jiwa)
    sampai Papua Selatan (550 ribu jiwa). Cari, saring per pulau, dan
    urutkan tabelnya — semua data dari ${PROVINCES_SOURCE}.</p>
  </div>
  <div class="kpi-grid three">
    <div class="kpi"><div class="v">284,67 jt</div><div class="l">Total penduduk (SUPAS 2025)</div><div class="s">${PROVINCES_SOURCE}</div></div>
    <div class="kpi warm"><div class="v">Jawa Barat</div><div class="l">Provinsi terpadat — 50,94 jt jiwa</div><div class="s">${PROVINCES_SOURCE}</div></div>
    <div class="kpi steel"><div class="v">${jawaShare}%</div><div class="l">Penduduk tinggal di Pulau Jawa</div><div class="s">BPS, SUPAS 2025</div></div>
  </div>
  <div class="section chart-grid">
    <div class="card">
      <div class="chart-title">12 provinsi terpadat, 2025</div>
      <div class="chart-sub">Juta jiwa — ${PROVINCES_SOURCE}</div>
      <canvas id="c-top12" class="chart" height="390"></canvas>
    </div>
    <div class="card">
      <div class="chart-title">Penduduk per pulau, 2025</div>
      <div class="chart-sub">Juta jiwa — BPS, SUPAS 2025</div>
      <canvas id="c-islands" class="chart" height="210"></canvas>
    </div>
  </div>
  <div class="section">
    <h2>Semua provinsi</h2>
    <div class="controls">
      <label for="prov-search">Cari provinsi</label>
      <input type="search" id="prov-search" placeholder="cth: Jawa Barat" autocomplete="off">
      <label for="prov-island">Pulau</label>
      <select id="prov-island">${islandOpts}</select>
      <label for="prov-sort">Urutkan</label>
      <select id="prov-sort">
        <option value="pop-desc">Terbanyak dulu</option>
        <option value="pop-asc">Tersedikit dulu</option>
        <option value="name">Nama A–Z</option>
      </select>
    </div>
    <p class="count-line" id="prov-count"></p>
    <div class="table-wrap">
      <table class="data">
        <thead><tr><th>#</th><th>Provinsi</th><th>Pulau</th><th class="num">Penduduk (jiwa)</th><th class="num">Pangsa</th></tr></thead>
        <tbody id="prov-body"></tbody>
      </table>
    </div>
    <p class="source">Sumber: ${PROVINCES_SOURCE}. Total 284.667.253 jiwa.</p>
  </div>`;
}

export function drawPage() {
  const top12 = PROVINCES.slice(0, 12);
  drawHBars(document.getElementById('c-top12'), {
    labels: top12.map((p) => p.name),
    values: top12.map((p) => p.pop / 1e6),
    unit: ' jt',
    labelWidth: 170,
    rowHeight: 30,
  });
  drawHBars(document.getElementById('c-islands'), {
    labels: ISLANDS.map((i) => i.name),
    values: ISLANDS.map((i) => i.pop),
    unit: ' jt',
  });
}

export function wirePage() {
  const search = document.getElementById('prov-search');
  const island = document.getElementById('prov-island');
  const sort = document.getElementById('prov-sort');
  const body = document.getElementById('prov-body');
  const count = document.getElementById('prov-count');
  const apply = () => {
    const q = search.value.trim().toLowerCase();
    const isl = island.value;
    let list = PROVINCES.filter((p) => {
      if (isl !== 'Semua' && p.island !== isl) return false;
      if (q && !p.name.toLowerCase().includes(q)) return false;
      return true;
    });
    if (sort.value === 'pop-desc') list = list.slice().sort((a, b) => b.pop - a.pop);
    else if (sort.value === 'pop-asc') list = list.slice().sort((a, b) => a.pop - b.pop);
    else list = list.slice().sort((a, b) => a.name.localeCompare(b.name, 'id'));
    body.innerHTML = renderRows(list);
    count.textContent = `Menampilkan ${list.length} dari 38 provinsi.`;
  };
  search.addEventListener('input', apply);
  island.addEventListener('change', apply);
  sort.addEventListener('change', apply);
  apply();
}
