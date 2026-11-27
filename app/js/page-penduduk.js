// page-penduduk.js — halaman Penduduk: piramida, struktur umur, tren.
import { PYRAMID, AGE_STRUCTURE, DEMO, POP_TREND } from './data.js';
import { drawPyramid, drawHBars, drawLine } from './charts.js';

export function renderPage() {
  const demos = DEMO.map((d) => `
    <div class="kpi steel">
      <div class="v">${d.value}</div>
      <div class="l">${d.label}</div>
      <div class="s">${d.source}</div>
    </div>`).join('');
  return `
  <div class="page-head">
    <h1>Penduduk</h1>
    <p class="lede">284,44 juta jiwa pada pertengahan 2025 (BPS) — 69,0% berada
    di usia produktif 15–64 tahun. Piramida di bawah ini menunjukkan
    bentuk penduduk Indonesia: lebar di usia muda, menyempit ke atas.</p>
  </div>
  <div class="kpi-grid three">${demos}</div>
  <div class="section">
    <div class="card">
      <div class="chart-title">Piramida penduduk 2025</div>
      <div class="chart-sub">Juta jiwa per kelompok umur — BPS, Proyeksi Penduduk 2025</div>
      <canvas id="c-pyramid" class="chart" height="428"></canvas>
    </div>
  </div>
  <div class="section chart-grid">
    <div class="card">
      <div class="chart-title">Struktur umur, 2025</div>
      <div class="chart-sub">Juta jiwa dan pangsa — BPS, proyeksi 2025</div>
      <canvas id="c-age" class="chart" height="150"></canvas>
      <p class="source">0–14 tahun: 66,72 jt (23,5%) · 15–64 tahun: 196,13 jt
      (69,0%) · 65+ tahun: 21,58 jt (7,6%).</p>
    </div>
    <div class="card">
      <div class="chart-title">Tren penduduk, 1961–2025</div>
      <div class="chart-sub">Juta jiwa — BPS, sensus dan proyeksi</div>
      <canvas id="c-poptrend" class="chart" height="260"></canvas>
    </div>
  </div>
  <div class="callout">Rasio ketergantungan 45,05 (BPS, SUPAS 2025): setiap 100 penduduk
  usia produktif menanggung 45 penduduk usia nonproduktif.
  <span class="s">Sumber: BPS, SUPAS 2025.</span></div>`;
}

export function drawPage() {
  drawPyramid(document.getElementById('c-pyramid'), { rows: PYRAMID });
  drawHBars(document.getElementById('c-age'), {
    labels: AGE_STRUCTURE.map((a) => a.name),
    values: AGE_STRUCTURE.map((a) => a.pop),
    unit: ' jt',
    colors: ['#0f5d50', '#3e6b8c', '#e39a1b'],
  });
  drawLine(document.getElementById('c-poptrend'), {
    labels: POP_TREND.years, values: POP_TREND.values, min: 0, max: 300,
  });
}
