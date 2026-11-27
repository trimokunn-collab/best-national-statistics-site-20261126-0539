// page-sosial.js — halaman Sosial: IPM + komponen + melek huruf.
import { IPM_TREND, IPM_COMPONENTS, LITERACY } from './data.js';
import { drawLine, drawHBars } from './charts.js';

function componentCards(year) {
  const c = IPM_COMPONENTS[year];
  const cells = [
    { v: c.life.toFixed(2) + ' thn', l: 'Umur harapan hidup saat lahir' },
    { v: c.schoolExpected.toFixed(2) + ' thn', l: 'Harapan lama sekolah' },
    { v: c.schoolMean.toFixed(2) + ' thn', l: 'Rata-rata lama sekolah' },
    { v: 'Rp' + c.spending.toFixed(2) + ' jt', l: 'Pengeluaran riil per kapita / tahun' },
  ];
  return cells.map((x) => `
    <div class="kpi steel">
      <div class="v">${x.v}</div>
      <div class="l">${x.l}</div>
      <div class="s">BPS, ${year}</div>
    </div>`).join('');
}

export function renderPage() {
  const c = IPM_COMPONENTS[2024];
  return `
  <div class="page-head">
    <h1>Sosial</h1>
    <p class="lede">Pembangunan manusia Indonesia terus membaik: IPM 75,02 pada
    2024 (BPS) naik menjadi 75,90 pada 2025. Di bawah ini komponen
    pembentuknya, tren IPM, dan angka melek huruf.</p>
  </div>
  <div class="controls">
    <label for="ipm-year">Komponen IPM tahun</label>
    <select id="ipm-year">
      <option value="2024" selected>2024</option>
      <option value="2025">2025</option>
    </select>
  </div>
  <div class="kpi-grid three" id="ipm-head">
    <div class="kpi warm"><div class="v" id="ipm-value">${c.ipm.toFixed(2)}</div><div class="l">Indeks Pembangunan Manusia</div><div class="s">BPS, <span class="ipm-year-label">2024</span> — kategori Tinggi</div></div>
    <div class="kpi"><div class="v">${LITERACY.national2025.toFixed(1)}%</div><div class="l">Melek huruf (15+)</div><div class="s">BPS, 2025</div></div>
    <div class="kpi steel"><div class="v">98,2% / 96,0%</div><div class="l">Melek huruf laki-laki / perempuan</div><div class="s">BPS, 2025</div></div>
  </div>
  <div class="kpi-grid four" id="ipm-components" style="margin-top:12px">${componentCards(2024)}</div>
  <div class="section">
    <div class="card">
      <div class="chart-title">Tren IPM, 2020–2025</div>
      <div class="chart-sub">Indeks Pembangunan Manusia — BPS</div>
      <canvas id="c-ipm" class="chart" height="260"></canvas>
    </div>
  </div>
  <div class="section chart-grid">
    <div class="card">
      <div class="chart-title">Melek huruf tertinggi per provinsi, 2025</div>
      <div class="chart-sub">% penduduk 15+ — BPS. Nasional: 97,1%.</div>
      <canvas id="c-lit-top" class="chart" height="180"></canvas>
    </div>
    <div class="card">
      <div class="chart-title">Tren melek huruf, 2015–2025</div>
      <div class="chart-sub">% penduduk 15+, tahun terpilih — BPS</div>
      <canvas id="c-lit-trend" class="chart" height="260"></canvas>
    </div>
  </div>`;
}

export function wirePage() {
  const select = document.getElementById('ipm-year');
  select.addEventListener('change', () => {
    const year = Number(select.value);
    const c = IPM_COMPONENTS[year];
    document.getElementById('ipm-value').textContent = c.ipm.toFixed(2);
    document.querySelectorAll('.ipm-year-label').forEach((el) => { el.textContent = String(year); });
    document.getElementById('ipm-components').innerHTML = componentCards(year);
  });
}

export function drawPage() {
  drawLine(document.getElementById('c-ipm'), {
    labels: IPM_TREND.years, values: IPM_TREND.values, min: 72, max: 76.5,
  });
  drawHBars(document.getElementById('c-lit-top'), {
    labels: LITERACY.top.map((t) => t.name),
    values: LITERACY.top.map((t) => t.value),
    unit: '%',
    labelWidth: 140,
  });
  drawLine(document.getElementById('c-lit-trend'), {
    labels: LITERACY.trend.years, values: LITERACY.trend.values, min: 94.5, max: 97.5,
  });
}
