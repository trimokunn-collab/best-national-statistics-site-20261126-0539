// main.ts — program penyerahan entri "Statistik Indonesia" v2 (Node 22,
// pustaka standar saja).
//
// Situsnya adalah file statis di app/ (index.html + modul ES + CSS, tanpa
// build step) dan tangkapan layarnya di screenshots/. Program ini menyalin
// keduanya ke direktori output lalu menulis dossier.json — ringkasan yang
// dibaca juri (tangkapan layar, berkas + byte first load, dan sumber situs)
// — dengan pustaka make.fun yang divendor di vendor/makefun-frontend.ts.
// Pustaka itu salinan byte-identical dari kit; jangan diubah.
//
// Di luar container grader, MAKEFUN_OUTPUT_DIR menggantikan /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) {
  cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });
}

// Batas scorer: paling banyak 4 screenshot, masing-masing paling banyak
// 256 KiB; app/ paling banyak 993 berkas dan 16 MiB; teks dossier
// paling banyak 163.840 byte.
writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
  }),
);
