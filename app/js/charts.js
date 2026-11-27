// charts.js — helper grafik <canvas> untuk Statistik Indonesia.
// Semua grafik digambar tangan, tanpa library. Setiap fungsi menerima
// elemen canvas dan data, lalu menyesuaikan resolusi dengan layar.

const INK = '#1c2b26';
const MUTED = '#6b7a72';
const GRID = '#e3ddd0';
const TEAL = '#0f5d50';
const AMBER = '#e39a1b';
const STEEL = '#3e6b8c';
const BRICK = '#b4432f';

function setup(canvas, cssHeight) {
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.clientWidth || canvas.parentElement.clientWidth || 600;
  const h = cssHeight;
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  canvas.style.height = h + 'px';
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);
  return { ctx, w, h };
}

function niceNum(v) {
  if (v === 0) return '0';
  const abs = Math.abs(v);
  if (abs >= 100) return String(Math.round(v));
  if (abs >= 10) return v.toFixed(1).replace(/\.0$/, '');
  return v.toFixed(2).replace(/\.00$/, '');
}

function axes(ctx, x0, y0, x1, y1) {
  ctx.strokeStyle = GRID;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x0, y1);
  ctx.lineTo(x1, y1);
  ctx.stroke();
}

// Grafik garis dengan titik dan label nilai.
export function drawLine(canvas, opts) {
  const { ctx, w, h } = setup(canvas, opts.height || 260);
  const labels = opts.labels;
  const values = opts.values;
  const padL = 44;
  const padR = 14;
  const padT = 26;
  const padB = 26;
  const iw = w - padL - padR;
  const ih = h - padT - padB;
  let min = Math.min.apply(null, values);
  let max = Math.max.apply(null, values);
  if (opts.min !== undefined) min = opts.min;
  if (opts.max !== undefined) max = opts.max;
  if (min > 0 && opts.fromZero !== true) min = Math.min(min, min - (max - min) * 0.25);
  if (min === max) { min -= 1; max += 1; }
  const x = (i) => padL + (iw * i) / (labels.length - 1 || 1);
  const y = (v) => padT + ih - ((v - min) / (max - min)) * ih;
  ctx.font = '11px system-ui, sans-serif';
  ctx.fillStyle = MUTED;
  ctx.textAlign = 'right';
  for (let g = 0; g <= 4; g++) {
    const gv = min + ((max - min) * g) / 4;
    const gy = y(gv);
    ctx.strokeStyle = GRID;
    ctx.beginPath();
    ctx.moveTo(padL, gy);
    ctx.lineTo(w - padR, gy);
    ctx.stroke();
    ctx.fillText(niceNum(gv), padL - 6, gy + 4);
  }
  ctx.strokeStyle = opts.color || TEAL;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  values.forEach((v, i) => {
    if (i === 0) ctx.moveTo(x(i), y(v));
    else ctx.lineTo(x(i), y(v));
  });
  ctx.stroke();
  values.forEach((v, i) => {
    ctx.fillStyle = opts.highlightIndex === i ? BRICK : opts.color || TEAL;
    ctx.beginPath();
    ctx.arc(x(i), y(v), opts.highlightIndex === i ? 5.5 : 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = INK;
    ctx.textAlign = 'center';
    ctx.fillText(niceNum(v), x(i), y(v) - 9);
  });
  ctx.fillStyle = MUTED;
  ctx.textAlign = 'center';
  labels.forEach((lb, i) => ctx.fillText(String(lb), x(i), h - 8));
  axes(ctx, padL, padT - 6, w - padR, padT + ih);
}

// Grafik batang vertikal.
export function drawBars(canvas, opts) {
  const { ctx, w, h } = setup(canvas, opts.height || 260);
  const labels = opts.labels;
  const values = opts.values;
  const padL = 44;
  const padR = 10;
  const padT = 26;
  const padB = 26;
  const iw = w - padL - padR;
  const ih = h - padT - padB;
  const max = Math.max.apply(null, values) * 1.12;
  const slot = iw / labels.length;
  const bw = Math.min(46, slot * 0.62);
  ctx.font = '11px system-ui, sans-serif';
  ctx.fillStyle = MUTED;
  ctx.textAlign = 'right';
  for (let g = 0; g <= 4; g++) {
    const gv = (max * g) / 4;
    const gy = padT + ih - (ih * g) / 4;
    ctx.strokeStyle = GRID;
    ctx.beginPath();
    ctx.moveTo(padL, gy);
    ctx.lineTo(w - padR, gy);
    ctx.stroke();
    ctx.fillText(niceNum(gv), padL - 6, gy + 4);
  }
  values.forEach((v, i) => {
    const bh = (v / max) * ih;
    const bx = padL + slot * i + (slot - bw) / 2;
    ctx.fillStyle = (opts.colors && opts.colors[i]) || opts.color || TEAL;
    ctx.fillRect(bx, padT + ih - bh, bw, bh);
    ctx.fillStyle = INK;
    ctx.textAlign = 'center';
    ctx.fillText(niceNum(v), bx + bw / 2, padT + ih - bh - 7);
    ctx.fillStyle = MUTED;
    ctx.fillText(String(labels[i]), bx + bw / 2, h - 8);
  });
  axes(ctx, padL, padT - 6, w - padR, padT + ih);
}

// Grafik batang horizontal (label kiri, nilai di ujung batang).
export function drawHBars(canvas, opts) {
  const rows = opts.labels.length;
  const rowH = opts.rowHeight || 30;
  const { ctx, w, h } = setup(canvas, opts.height || rows * rowH + 30);
  const values = opts.values;
  const max = Math.max.apply(null, values) * 1.15;
  const labelW = opts.labelWidth || 150;
  const padR = 58;
  const padT = 8;
  const iw = w - labelW - padR;
  ctx.font = '12px system-ui, sans-serif';
  values.forEach((v, i) => {
    const y = padT + i * rowH;
    const bw = (v / max) * iw;
    ctx.fillStyle = (opts.colors && opts.colors[i]) || opts.color || TEAL;
    ctx.fillRect(labelW, y + 4, Math.max(bw, 2), rowH - 12);
    ctx.fillStyle = INK;
    ctx.textAlign = 'right';
    ctx.fillText(String(opts.labels[i]), labelW - 10, y + rowH / 2 + 1);
    ctx.textAlign = 'left';
    ctx.fillText(niceNum(v) + (opts.unit || ''), labelW + Math.max(bw, 2) + 6, y + rowH / 2 + 1);
  });
}

// Piramida penduduk: laki-laki ke kiri, perempuan ke kanan (juta jiwa).
export function drawPyramid(canvas, opts) {
  const rows = opts.rows;
  const rowH = 24;
  const { ctx, w, h } = setup(canvas, opts.height || rows.length * rowH + 44);
  const max = Math.max.apply(null, rows.map((r) => Math.max(r.male, r.female))) * 1.08;
  const mid = w / 2;
  const half = (w - 90) / 2;
  ctx.font = '11px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillStyle = TEAL;
  ctx.fillText('Laki-laki', mid - half / 2, 14);
  ctx.fillStyle = AMBER;
  ctx.fillText('Perempuan', mid + half / 2, 14);
  rows.forEach((r, i) => {
    const y = 24 + i * rowH;
    const mw = (r.male / max) * half;
    const fw = (r.female / max) * half;
    ctx.fillStyle = TEAL;
    ctx.fillRect(mid - mw, y + 2, mw, rowH - 7);
    ctx.fillStyle = AMBER;
    ctx.fillRect(mid, y + 2, fw, rowH - 7);
    ctx.fillStyle = INK;
    ctx.textAlign = 'center';
    const gw = ctx.measureText(r.group).width + 12;
    ctx.fillStyle = '#faf6ef';
    ctx.fillRect(mid - gw / 2, y + 3, gw, rowH - 10);
    ctx.fillStyle = INK;
    ctx.fillText(r.group, mid, y + rowH - 8);
    ctx.fillStyle = MUTED;
    ctx.textAlign = 'right';
    ctx.fillText(niceNum(r.male), mid - mw - 5, y + rowH - 8);
    ctx.textAlign = 'left';
    ctx.fillText(niceNum(r.female), mid + fw + 5, y + rowH - 8);
  });
  ctx.fillStyle = MUTED;
  ctx.textAlign = 'center';
  ctx.fillText('Juta jiwa — BPS, Proyeksi Penduduk 2025', mid, h - 6);
}

// Dua seri batang berdampingan (mis. ekspor vs impor).
export function drawGroupedBars(canvas, opts) {
  const { ctx, w, h } = setup(canvas, opts.height || 260);
  const labels = opts.labels;
  const s0 = opts.series[0];
  const s1 = opts.series[1];
  const padL = 44;
  const padR = 10;
  const padT = 34;
  const padB = 26;
  const iw = w - padL - padR;
  const ih = h - padT - padB;
  const max = Math.max.apply(null, s0.values.concat(s1.values)) * 1.12;
  const slot = iw / labels.length;
  const bw = Math.min(34, slot * 0.3);
  ctx.font = '11px system-ui, sans-serif';
  ctx.fillStyle = MUTED;
  ctx.textAlign = 'right';
  for (let g = 0; g <= 4; g++) {
    const gv = (max * g) / 4;
    const gy = padT + ih - (ih * g) / 4;
    ctx.strokeStyle = GRID;
    ctx.beginPath();
    ctx.moveTo(padL, gy);
    ctx.lineTo(w - padR, gy);
    ctx.stroke();
    ctx.fillText(niceNum(gv), padL - 6, gy + 4);
  }
  labels.forEach((lb, i) => {
    const cx = padL + slot * i + slot / 2;
    [s0, s1].forEach((s, k) => {
      const v = s.values[i];
      const bh = (v / max) * ih;
      const bx = cx + (k === 0 ? -bw - 2 : 2);
      ctx.fillStyle = s.color;
      ctx.fillRect(bx, padT + ih - bh, bw, bh);
    });
    ctx.fillStyle = INK;
    ctx.textAlign = 'center';
    ctx.fillText(niceNum(s0.values[i]), cx - bw / 2 - 2, padT + ih - (s0.values[i] / max) * ih - 6);
    ctx.fillText(niceNum(s1.values[i]), cx + bw / 2 + 2, padT + ih - (s1.values[i] / max) * ih - 6);
    ctx.fillStyle = MUTED;
    ctx.fillText(String(lb), cx, h - 8);
  });
  ctx.textAlign = 'left';
  ctx.fillStyle = s0.color;
  ctx.fillRect(padL, 8, 12, 12);
  ctx.fillStyle = INK;
  ctx.fillText(s0.name, padL + 17, 18);
  ctx.fillStyle = s1.color;
  const lx = padL + 17 + ctx.measureText(s0.name).width + 26;
  ctx.fillRect(lx, 8, 12, 12);
  ctx.fillStyle = INK;
  ctx.fillText(s1.name, lx + 17, 18);
  axes(ctx, padL, padT - 6, w - padR, padT + ih);
}

export const COLORS = { teal: TEAL, amber: AMBER, steel: STEEL, brick: BRICK, ink: INK };
