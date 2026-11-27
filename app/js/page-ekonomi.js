// page-ekonomi.js — halaman Ekonomi: 5 grafik + pemilih tahun.
import { GROWTH, SECTORS, INFLATION, POVERTY, TRADE, YEAR_DETAIL } from './data.js';
import { drawLine, drawHBars, drawGroupedBars, COLORS } from './charts.js';

const YEARS = [2021, 2022, 2023, 2024, 2025];

function fmtTrade(v) {
  return v === null ? '—' : 'US$' + v.toFixed(2) + ' M';
}

function detailHtml(year) {
  const d = YEAR_DETAIL[year];
  const cells = [
    { v: d.growth.toFixed(2) + '%', l: 'Pertumbuhan PDB', s: 'BPS, ' + year },
    { v: d.inflation.toFixed(2) + '%', l: 'Inflasi (Des–Des)', s: 'BPS, ' + year },
    { v: d.poverty.toFixed(2) + '%', l: 'Kemiskinan (Maret)', s: 'BPS, Maret ' + year },
    { v: fmtTrade(d.exports), l: 'Ekspor', s: d.exports === null ? 'Tidak ditampilkan' : 'BPS, ' + year },
    { v: fmtTrade(d.imports), l: 'Impor', s: d.imports === null ? 'Tidak ditampilkan' : 'BPS, ' + year },
  ];
  return cells.map((c) => `
    <div class="d"><div class="v">${c.v}</div><div class="l">${c.l}</div><div class="s">${c.s}</div></div>`).join('');
}

export function renderPage() {
  const options = YEARS.map((y) => `<option value="${y}"${y === 2024 ? ' selected' : ''}>${y}</option>`).join('');
  return `
  <div class="page-head">
    <h1>Ekonomi</h1>
    <p class="lede">PDB 2024 Rp22.138,96 triliun (BPS) dengan PDB per kapita
    Rp78,62 juta (US$4.960). Ekonomi tumbuh 5,11% pada 2025 — lebih tinggi
    dari 5,03% pada 2024. Pilih tahun di bawah untuk melihat detailnya.</p>
  </div>
  <div class="controls">
    <label for="year-select">Lihat detail tahun</label>
    <select id="year-select">${options}</select>
  </div>
  <div class="detail-panel" id="year-detail">${detailHtml(2024)}</div>
  <div class="section chart-grid">
    <div class="card">
      <div class="chart-title">Pertumbuhan PDB, 2020–2025</div>
      <div class="chart-sub">% per tahun — BPS (tahun terpilih disorot merah)</div>
      <canvas id="c-growth" class="chart" height="260"></canvas>
    </div>
    <div class="card">
      <div class="chart-title">PDB menurut lapangan usaha, 2024</div>
      <div class="chart-sub">% terhadap PDB — BPS</div>
      <canvas id="c-sectors" class="chart" height="240"></canvas>
    </div>
    <div class="card">
      <div class="chart-title">Inflasi, 2020–2025</div>
      <div class="chart-sub">% Desember-ke-Desember — BPS</div>
      <canvas id="c-inflation" class="chart" height="260"></canvas>
    </div>
    <div class="card">
      <div class="chart-title">Kemiskinan, Maret 2021–2026</div>
      <div class="chart-sub">% penduduk miskin — BPS</div>
      <canvas id="c-poverty" class="chart" height="260"></canvas>
    </div>
  </div>
  <div class="section">
    <div class="card">
      <div class="chart-title">Ekspor vs impor, 2021–2024</div>
      <div class="chart-sub">US$ miliar — BPS. Surplus 2024: US$31,04 miliar.</div>
      <canvas id="c-trade" class="chart" height="260"></canvas>
    </div>
  </div>`;
}

function drawGrowth(highlightYear) {
  const idx = GROWTH.years.indexOf(highlightYear);
  drawLine(document.getElementById('c-growth'), {
    labels: GROWTH.years, values: GROWTH.values,
    min: -3, max: 6, highlightIndex: idx,
  });
}

export function wirePage() {
  const select = document.getElementById('year-select');
  select.addEventListener('change', () => {
    const current = Number(select.value);
    document.getElementById('year-detail').innerHTML = detailHtml(current);
    drawGrowth(current);
  });
}

export function drawPage() {
  drawGrowth(2024);
  drawHBars(document.getElementById('c-sectors'), {
    labels: SECTORS.map((s) => s.name),
    values: SECTORS.map((s) => s.share),
    unit: '%',
    labelWidth: 215,
  });
  drawLine(document.getElementById('c-inflation'), {
    labels: INFLATION.years, values: INFLATION.values, color: COLORS.steel,
  });
  drawLine(document.getElementById('c-poverty'), {
    labels: POVERTY.years, values: POVERTY.values, color: COLORS.brick,
  });
  drawGroupedBars(document.getElementById('c-trade'), {
    labels: TRADE.years,
    series: [
      { name: 'Ekspor', values: TRADE.exports, color: COLORS.teal },
      { name: 'Impor', values: TRADE.imports, color: COLORS.amber },
    ],
  });
}
