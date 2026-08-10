#!/usr/bin/env node
// Bewaakt de tokenregel: in src/ horen geen rauwe hexkleuren en geen losse
// px-waarden. Kleuren en maten komen uit het design system, via var(--token).
// Enige uitzondering is het bestand waar de tokens zelf gedefinieerd staan.

import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';

const SRC = 'src';
const UITZONDERING = 'src/styles/tokens.css';
const EXTENSIES = new Set(['.astro', '.tsx', '.ts', '.css']);

// #abc, #aabbcc en #aabbccdd. Andere lengtes zijn geen kleurcode.
// De lookbehind houdt HTML-entities als &#123; erbuiten.
const HEX = /(?<!&)#([0-9a-fA-F]{3,8})(?![0-9a-fA-F])/g;
const GELDIGE_HEX_LENGTES = new Set([3, 6, 8]);

// 12px, 1.5px. Niet 0px, en niet middenin een woord.
const PX = /(?<![\w.])(\d+(?:\.\d+)?)px(?![\w-])/g;

/**
 * Vervangt commentaar door spaties, zodat regelnummers en kolommen kloppen.
 *
 * `//` telt niet als commentaar in CSS, en ook niet direct na een dubbele punt
 * — anders zou de `//` in `https://…` de rest van de regel wegvagen.
 */
function maskeerCommentaar(bron, { regelCommentaar, htmlCommentaar }) {
  const uit = [];
  let inBlok = false;
  let inHtml = false;

  for (const regel of bron.split('\n')) {
    let gemaskeerd = '';
    let i = 0;

    while (i < regel.length) {
      if (inBlok) {
        const eind = regel.indexOf('*/', i);
        if (eind === -1) {
          gemaskeerd += ' '.repeat(regel.length - i);
          i = regel.length;
        } else {
          gemaskeerd += ' '.repeat(eind + 2 - i);
          i = eind + 2;
          inBlok = false;
        }
        continue;
      }

      if (inHtml) {
        const eind = regel.indexOf('-->', i);
        if (eind === -1) {
          gemaskeerd += ' '.repeat(regel.length - i);
          i = regel.length;
        } else {
          gemaskeerd += ' '.repeat(eind + 3 - i);
          i = eind + 3;
          inHtml = false;
        }
        continue;
      }

      const blok = regel.indexOf('/*', i);
      const html = htmlCommentaar ? regel.indexOf('<!--', i) : -1;

      let lijn = -1;
      if (regelCommentaar) {
        let zoek = i;
        for (;;) {
          const p = regel.indexOf('//', zoek);
          if (p === -1) break;
          if (p > 0 && regel[p - 1] === ':') {
            zoek = p + 2;
            continue;
          }
          lijn = p;
          break;
        }
      }

      const kandidaten = [blok, html, lijn].filter((p) => p !== -1);
      if (kandidaten.length === 0) {
        gemaskeerd += regel.slice(i);
        break;
      }

      const eerste = Math.min(...kandidaten);
      gemaskeerd += regel.slice(i, eerste);

      if (eerste === lijn) {
        gemaskeerd += ' '.repeat(regel.length - eerste);
        break;
      }

      i = eerste;
      if (eerste === blok) inBlok = true;
      else inHtml = true;
    }

    uit.push(gemaskeerd);
  }

  return uit;
}

function verzamelBestanden(map) {
  return readdirSync(map, { recursive: true, withFileTypes: true })
    .filter((item) => item.isFile() && EXTENSIES.has(extname(item.name)))
    .map((item) => join(item.parentPath ?? item.path, item.name).split('\\').join('/'));
}

function controleer(pad) {
  const ext = extname(pad);
  const regels = maskeerCommentaar(readFileSync(pad, 'utf8'), {
    regelCommentaar: ext !== '.css',
    htmlCommentaar: ext === '.astro',
  });

  const gevonden = [];

  regels.forEach((regel, index) => {
    for (const match of regel.matchAll(HEX)) {
      if (!GELDIGE_HEX_LENGTES.has(match[1].length)) continue;
      gevonden.push({ pad, regel: index + 1, kolom: match.index + 1, waarde: match[0] });
    }

    for (const match of regel.matchAll(PX)) {
      if (Number.parseFloat(match[1]) === 0) continue;
      gevonden.push({ pad, regel: index + 1, kolom: match.index + 1, waarde: match[0] });
    }
  });

  return gevonden;
}

if (!existsSync(SRC)) {
  process.exit(0);
}

const overtredingen = verzamelBestanden(SRC)
  .filter((pad) => pad !== UITZONDERING)
  .flatMap(controleer)
  .sort((a, b) => a.pad.localeCompare(b.pad) || a.regel - b.regel || a.kolom - b.kolom);

if (overtredingen.length > 0) {
  for (const { pad, regel, kolom, waarde } of overtredingen) {
    console.error(`${pad}:${regel}:${kolom}  ${waarde}`);
  }
  console.error(
    `\n${overtredingen.length} rauwe waarde(n) gevonden. Gebruik een design-system-token via var(--token); alleen ${UITZONDERING} mag ze letterlijk bevatten.`,
  );
  process.exit(1);
}

console.log('check-tokens: geen rauwe hexkleuren of px-waarden in src/.');
