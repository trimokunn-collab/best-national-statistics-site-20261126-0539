// main.js — router hash, render halaman, kontrol, dan grafik.
//
//   #/            Beranda
//   #/penduduk    Penduduk
//   #/ekonomi     Ekonomi
//   #/provinsi    Provinsi (tabel + filter)
//   #/sosial      Pendidikan & Kesehatan
//
// window.__shotReady bernilai false selama halaman dirender dan true setelah
// semua grafik tergambar, supaya skrip screenshot tahu kapan menangkap layar.

import {
  AGE_GROUPS,
  GDP_GROWTH,
  INFLATION,
  ISLANDS,
  POVERTY,
  SECTORS,
  SOCIAL,
  fmtID,
} from './data.js';
import {
  drawBarChart,
  drawDonut,
  drawGauge,
  drawHBarChart,
  drawLineChart,
} from './charts.js';
import {
  beranda,
  ekonomi,
  filterProvinces,
  missing,
  penduduk,
  provinceRows,
  provinsi,
  sosial,
} from './views.js';

const app = document.getElementById('app');
const TITLES = {
  beranda: 'Statistik Indonesia — Indonesia dalam angka',
  penduduk: 'Penduduk | Statistik Indonesia',
  ekonomi: 'Ekonomi | Statistik Indonesia',
  provinsi: 'Provinsi | Statistik Indonesia',
  sosial: 'Pendidikan & Kesehatan | Statistik Indonesia',
  missing: 'Tidak ditemukan | Statistik Indonesia',
};

// Jenis grafik PDB yang sedang dipilih di Beranda (toggle Garis/Batang).
let gdpType = 'line';
// Keadaan filter tabel provinsi.
const provState = { q: '', island: 'semua', sort: 'desc' };
// Fungsi gambar grafik halaman yang sedang tampil (dipanggil ulang saat
// jendela diubah ukurannya).
let currentDraws = [];

function route() {
  const hash = location.hash.replace(/^#\/?/, '').split('/')[0];
  if (hash === '') return 'beranda';
  return ['penduduk', 'ekonomi', 'provinsi', 'sosial'].includes(hash)
    ? hash
    : 'missing';
}

function drawGdpChart() {
  const canvas = document.getElementById('gdp-chart');
  if (!canvas) return;
  const series = GDP_GROWTH.map((d) => ({ label: d.year, value: d.value }));
  if (gdpType === 'bar') drawBarChart(canvas, series);
  else drawLineChart(canvas, series);
}

function drawBeranda() {
  drawGdpChart();
  const donut = document.getElementById('island-donut');
  if (donut) {
    drawDonut(donut, ISLANDS.map((p) => ({ label: p.name, value: p.share })), {
      size: 240,
      centerTop: '284,44 jt',
      centerBottom: 'penduduk',
    });
  }
}

function drawPenduduk() {
  const age = document.getElementById('age-chart');
  if (age) {
    drawHBarChart(
      age,
      AGE_GROUPS.map((g, i) => ({
        label: g.label,
        value: g.share,
        display: `${fmtID(g.share, 1)}%`,
        color: ['#0f766e', '#166534', '#b45309'][i],
      })),
      { labelWidth: 130 },
    );
  }
  const islands = document.getElementById('island-bar-chart');
  if (islands) {
    drawHBarChart(
      islands,
      ISLANDS.map((p, i) => ({
        label: p.name,
        value: p.pop,
        display: `${fmtID(p.pop, 2)} jt`,
        color: ['#166534', '#0f766e', '#b45309', '#65a30d', '#475569', '#6d28d9'][i],
      })),
      { labelWidth: 150 },
    );
  }
}

function drawEkonomi() {
  const sector = document.getElementById('sector-chart');
  if (sector) {
    drawHBarChart(
      sector,
      SECTORS.map((s) => ({
        label: s.name,
        value: s.share,
        display: `${fmtID(s.share, 2)}%`,
      })),
      { labelWidth: 190 },
    );
  }
  const inflation = document.getElementById('inflation-chart');
  if (inflation) {
    drawLineChart(
      inflation,
      INFLATION.map((d) => ({ label: d.year, value: d.value })),
      { color: '#b91c1c' },
    );
  }
  const poverty = document.getElementById('poverty-chart');
  if (poverty) {
    drawLineChart(
      poverty,
      POVERTY.map((d) => ({ label: d.year, value: d.value })),
      { color: '#0f766e' },
    );
  }
}

const ISLAND_COLORS = { Jawa: '#166534', Sumatra: '#0f766e', Sulawesi: '#b45309' };

function refreshProvinces() {
  const list = filterProvinces(provState);
  const rows = document.getElementById('prov-rows');
  if (rows) rows.innerHTML = provinceRows(list);
  const count = document.getElementById('prov-count');
  if (count) {
    count.textContent =
      list.length === 0
        ? 'Tidak ada provinsi yang cocok.'
        : `Menampilkan ${list.length} dari 10 provinsi terpadat.`;
  }
  const canvas = document.getElementById('province-chart');
  if (canvas) {
    drawHBarChart(
      canvas,
      list.map((p) => ({
        label: p.name,
        value: p.pop / 1e6,
        display: `${fmtID(p.pop / 1e6, 2)} jt`,
        color: ISLAND_COLORS[p.island] || '#475569',
      })),
      { labelWidth: 150 },
    );
  }
}

function drawSosial() {
  const gauge = document.getElementById('hdi-gauge');
  if (gauge) drawGauge(gauge, SOCIAL.hdi.value);
  const life = document.getElementById('life-chart');
  if (life) {
    drawBarChart(
      life,
      SOCIAL.lifeExpectancy.map((d) => ({ label: d.label, value: d.value })),
      { color: '#0f766e' },
    );
  }
}

function wireBeranda() {
  document.querySelectorAll('[data-gdp-type]').forEach((btn) => {
    btn.addEventListener('click', () => {
      gdpType = btn.dataset.gdpType;
      document
        .querySelectorAll('[data-gdp-type]')
        .forEach((b) => b.classList.toggle('active', b === btn));
      drawGdpChart();
    });
  });
}

function wireProvinsi() {
  const search = document.getElementById('prov-search');
  if (search) {
    search.addEventListener('input', () => {
      provState.q = search.value;
      refreshProvinces();
    });
  }
  document.querySelectorAll('[data-island]').forEach((btn) => {
    btn.addEventListener('click', () => {
      provState.island = btn.dataset.island;
      document
        .querySelectorAll('[data-island]')
        .forEach((b) => b.classList.toggle('active', b === btn));
      refreshProvinces();
    });
  });
  const sort = document.getElementById('prov-sort');
  if (sort) {
    sort.addEventListener('change', () => {
      provState.sort = sort.value;
      refreshProvinces();
    });
  }
  refreshProvinces();
}

function render() {
  window.__shotReady = false;
  const page = route();
  const views = { beranda, penduduk, ekonomi, provinsi, sosial };
  const view = views[page] || missing;
  document.title = TITLES[page] || TITLES.beranda;
  app.innerHTML = view();
  document
    .querySelectorAll('nav a')
    .forEach((a) =>
      a.classList.toggle('active', a.dataset.page === page),
    );
  const draws = {
    beranda: drawBeranda,
    penduduk: drawPenduduk,
    ekonomi: drawEkonomi,
    provinsi: refreshProvinces,
    sosial: drawSosial,
  };
  currentDraws = [draws[page]].filter(Boolean);
  if (page === 'beranda') wireBeranda();
  if (page === 'provinsi') wireProvinsi();
  currentDraws.forEach((fn) => fn());
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

// Gambar ulang grafik saat jendela diubah ukurannya (ponsel diputar, dsb).
let resizeTimer = null;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => currentDraws.forEach((fn) => fn()), 150);
});

window.addEventListener('hashchange', render);
render();
