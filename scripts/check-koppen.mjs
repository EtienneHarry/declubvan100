/*
 * Bewaakt de koppenstructuur van elke gebouwde pagina.
 *
 * Drie regels uit het design system die alle drie stil sneuvelden zolang het
 * kopniveau in de sectie zelf vastlag:
 *
 *   1. elke pagina heeft precies één <h1>
 *   2. de eerste kop op de pagina ís die <h1>
 *   3. het niveau daalt met hoogstens één stap tegelijk, en gaat nooit omhoog
 *      naar een niveau dat al gepasseerd was
 *
 * Geen van die drie levert een foutmelding op als je hem breekt. De pagina
 * rendert, de tekst staat er, en alleen een schermlezer of een audit merkt het.
 *
 * SectieLijst in src/lib/SectionRenderer.tsx rekent het niveau uit over de hele
 * sectielijst. Dit script controleert het resultaat, want die berekening kan
 * ook stukgaan — bijvoorbeeld als iemand een sectie los rendert in plaats van
 * via de lijst.
 *
 * Alleen de <main> telt. De koppen in de voettekst horen bij het frame en niet
 * bij de pagina-inhoud.
 */

import { readFileSync, existsSync } from 'node:fs';
import { readdir } from 'node:fs/promises';
import { join, relative } from 'node:path';

const WORTEL = process.cwd();
const STATIC = join(WORTEL, '.vercel', 'output', 'static');

/**
 * Pagina's die bewust buiten de regels vallen. Het sectieoverzicht toont elk
 * geval als een pagina-in-het-klein en heeft er dus meerdere; het staat op
 * noindex en is geen echte pagina.
 */
const OVERSLAAN = ['secties'];

const fouten = [];

function koppenVan(html) {
  const start = html.indexOf('<main');
  const eind = html.indexOf('</main>');
  if (start === -1 || eind === -1) return [];

  const main = html.slice(start, eind);

  return [...main.matchAll(/<(h[1-6])\b[^>]*>([\s\S]*?)<\/\1>/gi)].map((m) => ({
    niveau: Number(m[1][1]),
    tekst: m[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim().slice(0, 50),
  }));
}

function controleer(html, naam) {
  const koppen = koppenVan(html);

  if (koppen.length === 0) {
    fouten.push(`${naam}: geen enkele kop in <main>.`);
    return;
  }

  const aantalH1 = koppen.filter((k) => k.niveau === 1).length;

  if (aantalH1 === 0) {
    fouten.push(
      `${naam}: geen <h1>. De pagina begint op h${koppen[0].niveau} ("${koppen[0].tekst}").` +
        ' Zet er een sectie boven die een kop kan dragen.',
    );
  } else if (aantalH1 > 1) {
    const welke = koppen.filter((k) => k.niveau === 1).map((k) => `"${k.tekst}"`);
    fouten.push(`${naam}: ${aantalH1} keer <h1> — ${welke.join(', ')}. Er hoort er één te zijn.`);
  } else if (koppen[0].niveau !== 1) {
    fouten.push(
      `${naam}: de eerste kop is h${koppen[0].niveau} ("${koppen[0].tekst}") terwijl de <h1>` +
        ' verderop staat. Het niveau gaat daarmee halverwege omhoog.',
    );
  }

  // Sprong naar beneden van meer dan één stap.
  for (let i = 1; i < koppen.length; i++) {
    const verschil = koppen[i].niveau - koppen[i - 1].niveau;
    if (verschil > 1) {
      fouten.push(
        `${naam}: van h${koppen[i - 1].niveau} naar h${koppen[i].niveau} bij "${koppen[i].tekst}".` +
          ' Er wordt een niveau overgeslagen.',
      );
      break;
    }
  }
}

async function htmlBestanden(map) {
  const uit = [];

  for (const item of await readdir(map, { withFileTypes: true })) {
    const pad = join(map, item.name);
    if (item.isDirectory()) uit.push(...(await htmlBestanden(pad)));
    else if (item.name.endsWith('.html')) uit.push(pad);
  }

  return uit;
}

if (!existsSync(STATIC)) {
  console.error('check-koppen: .vercel/output/static ontbreekt. Draai eerst de build.');
  process.exit(1);
}

let nagekeken = 0;

for (const bestand of await htmlBestanden(STATIC)) {
  const naam = relative(WORTEL, bestand);
  if (OVERSLAAN.some((pad) => naam.includes(pad))) continue;

  controleer(readFileSync(bestand, 'utf8'), naam);
  nagekeken++;
}

if (fouten.length > 0) {
  console.error('check-koppen: de koppenstructuur klopt niet.\n');
  for (const fout of fouten) console.error(`  - ${fout}`);
  console.error('');
  process.exit(1);
}

console.log(
  `check-koppen: ${nagekeken} pagina's, elk één <h1> vooraan en geen overgeslagen niveau.`,
);
