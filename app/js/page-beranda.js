// page-beranda.js — halaman Beranda: 10 angka utama + 3 grafik.
import { KPIS, GDP_NOTE, GROWTH, ISLANDS, POP_TREND } from './data.js';
import { drawLine, drawHBars } from './charts.js';

export function renderPage() {
  const kpis = KPIS.map((k) => `
    <div class="kpi">
      <div class="v">${k.value}${k.sub ? ` <small>${k.sub}</small>` : ''}</div>
      <div class="l">${k.label}</div>
      <div class="s">${k.source}</div>
    </div>`).join('');
  return `
  <div class="page-head">
    <h1>Indonesia dalam Angka</h1>
    <p class="lede">Sepuluh angka utama, tiga grafik, dan lima halaman data resmi —
    penduduk, ekonomi, provinsi, dan pembangunan manusia — semuanya
    dengan sumber dan tahun yang tertulis jelas.</p>
  </div>
  <div class="kpi-grid">${kpis}</div>
  <div class="callout">${GDP_NOTE.text} <span class="s">${GDP_NOTE.source}</span></div>
  <div class="section chart-grid">
    <div class="card">
      <div class="chart-title">Pertumbuhan ekonomi, 2020–2025</div>
      <div class="chart-sub">PDB atas dasar harga konstan, % per tahun — BPS</div>
      <canvas id="c-growth" class="chart" height="260"></canvas>
    </div>
    <div class="card">
      <div class="chart-title">Penduduk per pulau, 2025</div>
      <div class="chart-sub">Juta jiwa — BPS, SUPAS 2025</div>
      <canvas id="c-islands" class="chart" height="210"></canvas>
    </div>
  </div>
  <div class="section">
    <div class="card">
      <div class="chart-title">Penduduk Indonesia, 1961–2025</div>
      <div class="chart-sub">Juta jiwa — BPS, sensus (1961–2020) dan proyeksi pertengahan tahun (2023–2025)</div>
      <canvas id="c-poptrend" class="chart" height="260"></canvas>
    </div>
  </div>`;
}

export function drawPage() {
  drawLine(document.getElementById('c-growth'), {
    labels: GROWTH.years, values: GROWTH.values, min: -3, max: 6,
  });
  drawHBars(document.getElementById('c-islands'), {
    labels: ISLANDS.map((i) => i.name),
    values: ISLANDS.map((i) => i.pop),
    unit: ' jt',
  });
  drawLine(document.getElementById('c-poptrend'), {
    labels: POP_TREND.years, values: POP_TREND.values, min: 0, max: 300,
  });
}
