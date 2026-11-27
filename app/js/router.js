// router.js — hash routing untuk 5 halaman Statistik Indonesia.
// Rute: #/beranda, #/penduduk, #/ekonomi, #/provinsi, #/sosial.
// Setelah halaman dirender, kontrolnya dipasang sekali (wirePage) lalu
// grafiknya digambar (drawPage); resize hanya menggambar ulang grafik.
import { renderPage as renderBeranda, drawPage as drawBeranda } from './page-beranda.js';
import { renderPage as renderPenduduk, drawPage as drawPenduduk } from './page-penduduk.js';
import { renderPage as renderEkonomi, drawPage as drawEkonomi, wirePage as wireEkonomi } from './page-ekonomi.js';
import { renderPage as renderProvinsi, drawPage as drawProvinsi, wirePage as wireProvinsi } from './page-provinsi.js';
import { renderPage as renderSosial, drawPage as drawSosial, wirePage as wireSosial } from './page-sosial.js';

const ROUTES = {
  beranda: { render: renderBeranda, draw: drawBeranda },
  penduduk: { render: renderPenduduk, draw: drawPenduduk },
  ekonomi: { render: renderEkonomi, draw: drawEkonomi, wire: wireEkonomi },
  provinsi: { render: renderProvinsi, draw: drawProvinsi, wire: wireProvinsi },
  sosial: { render: renderSosial, draw: drawSosial, wire: wireSosial },
};

let current = null;

function routeName() {
  const raw = window.location.hash.replace(/^#\/?/, '');
  return ROUTES[raw] ? raw : 'beranda';
}

function render() {
  const name = routeName();
  const page = ROUTES[name];
  document.getElementById('page').innerHTML = page.render();
  document.querySelectorAll('.main-nav a').forEach((a) => {
    a.classList.toggle('active', a.dataset.route === name);
  });
  if (page.wire) page.wire();
  page.draw();
  current = page;
  window.scrollTo(0, 0);
}

let resizeTimer = null;
window.addEventListener('resize', () => {
  if (!current) return;
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => current.draw(), 150);
});

window.addEventListener('hashchange', render);
render();
