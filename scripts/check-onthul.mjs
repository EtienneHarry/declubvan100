/*
 * Bewaakt dat verborgen onthul-inhoud altijd een uitweg heeft.
 *
 * Aanleiding: de koppen stonden sitebreed onzichtbaar terwijl ze ruimte
 * innamen. De wachttoestand was een gepauzeerde animatie op een nulhoog
 * masker, Chrome knipt de intersection-rect op de clip-path van het element
 * zelf, en dus haalde geen enkele kop de losllaatdrempel — de verborgen
 * begintoestand verhinderde precies de melding die hem moest opheffen. Dat is
 * de ergste soort fout: geen foutmelding, geen kapotte build, en lokaal in een
 * pane die niet composit zie je er niets van.
 *
 * WAT HIER WEL EN NIET TE BEWIJZEN VALT — en dat verschil is de kern:
 *
 * Statisch bewijsbaar, en dat doet dit script:
 *   1. Elke CSS-regel die onthul-inhoud verbergt (dekking 0, visibility
 *      hidden, een clip-path, of een gepauzeerde animatie op een
 *      onthul-selector) hangt aan [data-beweging='aan'] — het vlagje dat
 *      alleen een draaiend script zet. Zonder JavaScript is er dus niets
 *      verborgen.
 *   2. Er bestaat geen wachttoestand meer die de meting zelf raakt: op een
 *      selector zónder [data-onthul-staat] mag geen clip-path en geen
 *      animation-play-state staan. De wachtstand mag alleen met dekking of
 *      visibility werken, want die raken de intersection-rect niet.
 *   3. Het loslaatmechanisme en het vangnet zitten in de gebundelde scripts:
 *      het vlagje wordt gezet, de staten 'loopt' en 'klaar' worden geschreven,
 *      en de entree-terugval bestaat.
 *   4. In de gebouwde HTML staat geen enkele voorgebakken toestand: nul keer
 *      data-onthul-staat en nul keer data-accordeon-dicht. De HTML is de
 *      zonder-JavaScript-uitvoer en die hoort compleet zichtbaar te zijn.
 *
 * NIET statisch bewijsbaar: dat de waarnemer in een echte browser ook echt
 * vuurt. Dat hangt aan browser-gedrag (precies wat hier misging) en is alleen
 * in een composittende browser te zien. Daarvoor is het vangnet in
 * OnthulScript de runtime-garantie — en dít script bewijst dat dat vangnet
 * meegebundeld is, zodat het er niet stilletjes uit kan vallen.
 *
 * Eén benoemde uitzondering: [data-haal-lijn] mag ongeclausuleerd verborgen
 * beginnen. Dat is de decoratieve lijn van de ovaal en de streep, binnen een
 * svg die op aria-hidden staat — er kan geen tekst in schuilgaan, en de
 * afweging (zonder script liever geen versiering dan een uitgerekte) staat in
 * src/styles/haal.css.
 */

import { readFileSync, existsSync } from 'node:fs';
import { readdir } from 'node:fs/promises';
import { join, relative } from 'node:path';

const WORTEL = process.cwd();
const STATIC = join(WORTEL, '.vercel', 'output', 'static');
const ASSETS = join(STATIC, '_astro');

if (!existsSync(STATIC)) {
  console.error('check-onthul: .vercel/output/static ontbreekt. Draai eerst de build.');
  process.exit(1);
}

const fouten = [];

/* -------------------------------------------------------------------------
   1 + 2. De gebouwde CSS: verbergen mag alleen achter het vlagje, en de
   wachtstand mag de meting niet raken.
   ------------------------------------------------------------------------- */

const VERBERGT = /(?:opacity\s*:\s*0(?![.\d])|visibility\s*:\s*hidden|clip-path\s*:|animation-play-state\s*:\s*paused)/;
const RAAKT_METING = /(?:clip-path\s*:|animation-play-state\s*:\s*paused)/;

async function bestandenMet(map, extensie) {
  const uit = [];
  for (const item of await readdir(map, { withFileTypes: true })) {
    const pad = join(map, item.name);
    if (item.isDirectory()) uit.push(...(await bestandenMet(pad, extensie)));
    else if (item.name.endsWith(extensie)) uit.push(pad);
  }
  return uit;
}

/**
 * Loopt de regels van een stylesheet langs als platte selector/declaratie-
 * paren. Geen echte parser, maar genoeg: @media-koppen hebben geen
 * declaratieblok met puntkomma-eigenschappen en vallen er vanzelf uit.
 */
function regelsVan(css) {
  const uit = [];
  const regel = /([^{}]+)\{([^{}]*)\}/g;
  let m;
  while ((m = regel.exec(css))) {
    const selector = m[1].trim();
    if (selector.startsWith('@')) continue;
    uit.push({ selector, declaraties: m[2] });
  }
  return uit;
}

const cssBestanden = existsSync(ASSETS) ? await bestandenMet(ASSETS, '.css') : [];

if (cssBestanden.length === 0) {
  fouten.push('geen gebouwde CSS gevonden in _astro/ — dan valt er ook niets te bewaken.');
}

for (const bestand of cssBestanden) {
  const css = readFileSync(bestand, 'utf8');
  const naam = relative(WORTEL, bestand);

  for (const { selector, declaraties } of regelsVan(css)) {
    // Alleen selectors die over de onthulling gaan.
    if (!selector.includes('data-onthul')) continue;
    if (!VERBERGT.test(declaraties)) continue;

    // De benoemde uitzondering: de decoratieve lijn zelf.
    if (selector.includes('data-haal-lijn') && !RAAKT_METING.test(declaraties)) continue;

    if (!selector.includes('data-beweging')) {
      fouten.push(
        `${naam}: "${selector.slice(0, 80)}" verbergt onthul-inhoud zonder [data-beweging]-vlagje. ` +
          'Zonder JavaScript zou dit permanent onzichtbaar zijn.',
      );
    }

    // De wachtstand: verbergen zonder dat er al een staat op het element
    // staat. Die mag de intersection-meting niet raken.
    const isWachtstand = !/data-onthul-staat=/.test(selector);
    if (isWachtstand && RAAKT_METING.test(declaraties)) {
      fouten.push(
        `${naam}: "${selector.slice(0, 80)}" gebruikt clip-path of een gepauzeerde animatie als wachtstand. ` +
          'Chrome knipt de intersection-rect daarop en dan komt de waarnemer nooit; verberg met dekking.',
      );
    }
  }
}

/* -------------------------------------------------------------------------
   3. De gebundelde scripts: het vlagje, de staten en het vangnet.
   ------------------------------------------------------------------------- */

const jsBestanden = existsSync(ASSETS) ? await bestandenMet(ASSETS, '.js') : [];
const bundel = jsBestanden.map((b) => readFileSync(b, 'utf8')).join('\n');

/**
 * Waar dit op zoekt, bestaat in OnthulScript onder deze letterlijke namen.
 * Hernoemt iemand ze, dan valt deze poort — en dat is de bedoeling: dan hoort
 * hier bewust bijgewerkt te worden, niet stilzwijgend.
 */
const VEREIST_IN_SCRIPT = [
  ['beweging="aan"', /beweging\s*=\s*["']aan["']/],
  ["onthulStaat='loopt'", /onthulStaat\s*=\s*["']loopt["']/],
  ["onthulStaat='klaar'", /onthulStaat\s*=\s*["']klaar["']/],
  ['het entree-vangnet', /data-onthul-entree/],
];

for (const [naam, patroon] of VEREIST_IN_SCRIPT) {
  if (!patroon.test(bundel)) {
    fouten.push(
      `de gebundelde scripts missen ${naam}. Zonder dat blijft verborgen onthul-inhoud verborgen.`,
    );
  }
}

/* -------------------------------------------------------------------------
   4. De gebouwde HTML: geen voorgebakken toestand.
   ------------------------------------------------------------------------- */

let paginas = 0;

/**
 * Als attribuut, niet als tekenreeks. Dezelfde namen staan ook in
 * Tailwind-klassen — `[[data-accordeon-dicht]_&]:rotate-0` — en daar zijn ze
 * juist goed: dat is de stijl die op het attribuut wácht. Een echt attribuut
 * begint na witruimte; in een klassenaam staat er altijd een blokhaak voor.
 */
// Opgebouwd met String.raw: een gewone template-literal kookte de backslash
// hier eerder weg en dan matchte de klasse [s"'] in plaats van witruimte —
// een poort die nergens op valt. De functionele toets hieronder in de
// git-geschiedenis (injectie moet hem laten omvallen) ving dat.
const alsAttribuut = (naam) => new RegExp(String.raw`[\s"']` + naam + String.raw`(?=[\s=>])`);
const ONTHUL_STAAT = alsAttribuut('data-onthul-staat');
const ACCORDEON_DICHT = alsAttribuut('data-accordeon-dicht');

for (const bestand of await bestandenMet(STATIC, '.html')) {
  const html = readFileSync(bestand, 'utf8');
  const naam = relative(WORTEL, bestand);
  paginas++;

  if (ONTHUL_STAAT.test(html)) {
    fouten.push(`${naam}: bevat een voorgebakken data-onthul-staat. De HTML hoort de zonder-JavaScript-uitvoer te zijn.`);
  }

  if (ACCORDEON_DICHT.test(html)) {
    fouten.push(`${naam}: bevat data-accordeon-dicht als attribuut. Zonder JavaScript horen alle antwoorden open te staan.`);
  }
}

/* ------------------------------------------------------------------------- */

if (fouten.length > 0) {
  console.error('check-onthul: verborgen inhoud zonder uitweg.\n');
  for (const fout of fouten) console.error(`  - ${fout}`);
  console.error('');
  process.exit(1);
}

console.log(
  `check-onthul: ${paginas} pagina's — verbergen hangt aan het scriptvlagje, de wachtstand raakt de meting niet, en loslaten plus vangnet zitten in de bundel.`,
);
