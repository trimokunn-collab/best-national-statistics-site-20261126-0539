// charts.js — grafik digambar tangan di <canvas>, tanpa pustaka luar.
//
// Setiap fungsi menerima elemen canvas + deret data, lalu menggambar dengan
// skala devicePixelRatio supaya tajam di layar retina maupun ponsel.
// Nilai selalu ditulis di samping titik/batang, jadi grafik terbaca tanpa
// hover (penting di ponsel dan di screenshot).

const INK = '#1c1917';
const MUTED = '#78716c';
const GRID = '#e7e5e4';
const GREEN = '#166534';
const GREEN_LIGHT = '#22c55e';
const RED = '#b91c1c';
const TEAL = '#0f766e';
const AMBER = '#b45309';
const SLATE = '#475569';
const PURPLE = '#6d28d9';

// Siapkan canvas: lebar mengikuti wadah, tinggi dari parameter, dan skala
// konteks dengan devicePixelRatio. Mengembalikan { ctx, w, h } dalam
// koordinat CSS.
export function setupCanvas(canvas, height) {
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.clientWidth || canvas.parentElement.clientWidth || 600;
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(height * dpr);
  canvas.style.height = `${height}px`;
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, height);
  return { ctx, w, h: height };
}

function niceMax(values, pad = 0.15) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const span = max - min || 1;
  return { lo: min - span * pad, hi: max + span * pad };
}

// Grafik garis dengan label nilai di atas tiap titik.
// series: [{ label: '2020', value: -2.07 }, ...]
export function drawLineChart(canvas, series, opts = {}) {
  const height = opts.height || 260;
  const { ctx, w, h } = setupCanvas(canvas, height);
  const padL = 44;
  const padR = 14;
  const padT = 26;
  const padB = 30;
  const plotW = w - padL - padR;
  const plotH = h - padT - padB;
  const values = series.map((s) => s.value);
  const { lo, hi } = niceMax(values);
  const x = (i) => padL + (plotW * i) / Math.max(series.length - 1, 1);
  const y = (v) => padT + plotH * (1 - (v - lo) / (hi - lo));

  // Garis grid + label sumbu Y.
  ctx.strokeStyle = GRID;
  ctx.fillStyle = MUTED;
  ctx.font = '12px system-ui, sans-serif';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  const ticks = 4;
  for (let t = 0; t <= ticks; t++) {
    const v = lo + ((hi - lo) * t) / ticks;
    const yy = y(v);
    ctx.beginPath();
    ctx.moveTo(padL, yy);
    ctx.lineTo(w - padR, yy);
    ctx.stroke();
    ctx.fillText(`${fmtAxis(v)}`, padL - 8, yy);
  }

  // Garis nol bila ada nilai negatif (mis. PDB 2020).
  if (lo < 0 && hi > 0) {
    ctx.strokeStyle = '#d6d3d1';
    ctx.beginPath();
    ctx.moveTo(padL, y(0));
    ctx.lineTo(w - padR, y(0));
    ctx.stroke();
  }

  // Garis + titik.
  ctx.strokeStyle = opts.color || GREEN;
  ctx.lineWidth = 2.5;
  ctx.lineJoin = 'round';
  ctx.beginPath();
  series.forEach((s, i) => {
    if (i === 0) ctx.moveTo(x(i), y(s.value));
    else ctx.lineTo(x(i), y(s.value));
  });
  ctx.stroke();
  ctx.fillStyle = opts.color || GREEN;
  series.forEach((s, i) => {
    ctx.beginPath();
    ctx.arc(x(i), y(s.value), 4.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(x(i), y(s.value), 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = opts.color || GREEN;
  });

  // Label nilai di atas titik + label tahun di bawah.
  ctx.font = '600 12px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'bottom';
  series.forEach((s, i) => {
    ctx.fillStyle = INK;
    ctx.fillText(fmtAxis(s.value), x(i), y(s.value) - 8);
  });
  ctx.font = '12px system-ui, sans-serif';
  ctx.fillStyle = MUTED;
  ctx.textBaseline = 'top';
  series.forEach((s, i) => {
    ctx.fillText(String(s.label), x(i), h - padB + 8);
  });
}

// Format angka sumbu: satu desimal, koma Indonesia, tanpa % (satuan ditulis
// di judul grafik).
function fmtAxis(v) {
  const rounded = Math.round(v * 10) / 10;
  return String(rounded).replace('.', ',').replace('-', '−');
}

// Grafik batang vertikal dengan label nilai di atas tiap batang.
export function drawBarChart(canvas, series, opts = {}) {
  const height = opts.height || 260;
  const { ctx, w, h } = setupCanvas(canvas, height);
  const padL = 44;
  const padR = 14;
  const padT = 26;
  const padB = 30;
  const plotW = w - padL - padR;
  const plotH = h - padT - padB;
  const values = series.map((s) => s.value);
  const max = Math.max(...values, 0);
  const min = Math.min(...values, 0);
  const hi = max * 1.12 || 1;
  const lo = min * 1.12 || 0;
  const y = (v) => padT + plotH * (1 - (v - lo) / (hi - lo));
  const slot = plotW / series.length;
  const barW = Math.min(56, slot * 0.6);

  ctx.strokeStyle = GRID;
  ctx.fillStyle = MUTED;
  ctx.font = '12px system-ui, sans-serif';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  for (let t = 0; t <= 4; t++) {
    const v = lo + ((hi - lo) * t) / 4;
    const yy = y(v);
    ctx.beginPath();
    ctx.moveTo(padL, yy);
    ctx.lineTo(w - padR, yy);
    ctx.stroke();
    ctx.fillText(fmtAxis(v), padL - 8, yy);
  }

  series.forEach((s, i) => {
    const cx = padL + slot * i + slot / 2;
    const top = y(Math.max(s.value, 0));
    const bottom = y(Math.min(s.value, 0));
    ctx.fillStyle = s.value < 0 ? RED : opts.color || GREEN;
    ctx.fillRect(cx - barW / 2, top, barW, Math.max(bottom - top, 2));
    ctx.fillStyle = INK;
    ctx.font = '600 12px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText(fmtAxis(s.value), cx, top - 6);
    ctx.font = '12px system-ui, sans-serif';
    ctx.fillStyle = MUTED;
    ctx.textBaseline = 'top';
    ctx.fillText(String(s.label), cx, h - padB + 8);
  });
}

// Grafik batang horizontal: label di kiri, nilai di ujung batang.
// Dipakai untuk 10 provinsi terpadat, pangsa sektor, dan struktur umur.
export function drawHBarChart(canvas, series, opts = {}) {
  const rowH = opts.rowHeight || 34;
  const height = series.length * rowH + 16;
  const { ctx, w, h } = setupCanvas(canvas, height);
  const labelW = opts.labelWidth || 150;
  const padR = 64;
  const max = Math.max(...series.map((s) => s.value), 1);
  const barX = labelW + 8;
  const barMaxW = w - barX - padR;

  ctx.font = '13px system-ui, sans-serif';
  series.forEach((s, i) => {
    const y = 8 + i * rowH;
    const barW = Math.max(2, (s.value / max) * barMaxW);
    // Label kiri.
    ctx.fillStyle = INK;
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillText(s.label, labelW, y + rowH / 2 - 4);
    // Batang.
    ctx.fillStyle = s.color || opts.color || GREEN;
    const bh = 16;
    const by = y + (rowH - bh) / 2 - 4;
    ctx.beginPath();
    ctx.roundRect(barX, by, barW, bh, 4);
    ctx.fill();
    // Nilai di ujung batang.
    ctx.fillStyle = INK;
    ctx.font = '600 12px system-ui, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(s.display ?? fmtAxis(s.value), barX + barW + 8, by + bh / 2);
    ctx.font = '13px system-ui, sans-serif';
  });
  return h;
}

// Donat: irisan + total di tengah. Legenda digambar sebagai HTML di views.js
// supaya terbaca mesin pencari dan pembaca layar.
export const DONUT_COLORS = [GREEN, TEAL, AMBER, RED, SLATE, PURPLE];

export function drawDonut(canvas, series, opts = {}) {
  const size = opts.size || 240;
  const { ctx, w, h } = setupCanvas(canvas, size);
  const cx = w / 2;
  const cy = size / 2;
  const outer = size / 2 - 8;
  const inner = outer * 0.62;
  const total = series.reduce((a, s) => a + s.value, 0) || 1;
  let angle = -Math.PI / 2;
  series.forEach((s, i) => {
    const sweep = (s.value / total) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, outer, angle, angle + sweep);
    ctx.closePath();
    ctx.fillStyle = DONUT_COLORS[i % DONUT_COLORS.length];
    ctx.fill();
    angle += sweep;
  });
  // Lubang tengah.
  ctx.beginPath();
  ctx.arc(cx, cy, inner, 0, Math.PI * 2);
  ctx.fillStyle = '#fff';
  ctx.fill();
  // Teks tengah.
  ctx.fillStyle = INK;
  ctx.font = '700 22px Georgia, serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(opts.centerTop || '100%', cx, cy - 10);
  ctx.fillStyle = MUTED;
  ctx.font = '12px system-ui, sans-serif';
  ctx.fillText(opts.centerBottom || 'penduduk', cx, cy + 12);
  return h;
}

// Pengukur (gauge) IPM: batang 0-100 dengan penanda nilai.
export function drawGauge(canvas, value, opts = {}) {
  const height = opts.height || 64;
  const { ctx, w, h } = setupCanvas(canvas, height);
  const padX = 8;
  const barY = 22;
  const barH = 14;
  const barW = w - padX * 2;
  // Skala latar: merah -> kuning -> hijau.
  const stops = [
    [0, '#dc2626'],
    [0.5, '#eab308'],
    [0.7, '#65a30d'],
    [1, '#166534'],
  ];
  const grad = ctx.createLinearGradient(padX, 0, padX + barW, 0);
  stops.forEach(([t, c]) => grad.addColorStop(t, c));
  ctx.beginPath();
  ctx.roundRect(padX, barY, barW, barH, 7);
  ctx.fillStyle = grad;
  ctx.fill();
  // Penanda nilai.
  const mx = padX + (value / 100) * barW;
  ctx.beginPath();
  ctx.moveTo(mx, barY - 6);
  ctx.lineTo(mx - 7, barY - 16);
  ctx.lineTo(mx + 7, barY - 16);
  ctx.closePath();
  ctx.fillStyle = INK;
  ctx.fill();
  ctx.beginPath();
  ctx.arc(mx, barY + barH / 2, 5, 0, Math.PI * 2);
  ctx.fillStyle = '#fff';
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = INK;
  ctx.stroke();
  // Label ujung skala.
  ctx.fillStyle = MUTED;
  ctx.font = '12px system-ui, sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText('0', padX, barY + barH + 8);
  ctx.textAlign = 'right';
  ctx.fillText('100', padX + barW, barY + barH + 8);
  ctx.textAlign = 'center';
  ctx.fillText('Rendah', padX + barW * 0.25, barY + barH + 8);
  ctx.fillText('Tinggi', padX + barW * 0.85, barY + barH + 8);
  return h;
}
