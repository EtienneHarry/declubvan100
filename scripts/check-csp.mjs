/*
 * Bewaakt het beveiligingsbeleid dat over twee bestanden verdeeld ligt.
 *
 * Astro's security.csp staat uit. Die vlag is manifest-breed en zet één beleid
 * op elke route, ook op de Keystatic-admin, en die heeft inline stijl nodig.
 * Het beleid staat daarom per pad in vercel.json.
 *
 * Dat splitst een veiligheidsregel over twee bestanden die niets van elkaar
 * weten, en dat gaat stilletjes mis. Twee manieren waarop:
 *
 *   1. Iemand zet een inline <style>, <script> of style-attribuut op een
 *      pagina. Onder de meta-CSP van vroeger rekende Astro daar een hash voor
 *      uit; nu staat er een vaste header met alleen 'self' en breekt het —
 *      alleen in productie, want in dev en preview merk je er niets van.
 *   2. Iemand verbreedt de site-regel in vercel.json, of laat hem overlappen
 *      met de keystatic-regels. Vercel past álle matchende header-regels toe,
 *      dus dan krijgt de site er 'unsafe-inline' bij of krijgt de admin twee
 *      headers en handhaaft de browser de doorsnede.
 *
 * Dit script controleert allebei, na de build.
 *
 * De pad-matching gaat via @vercel/routing-utils, Vercels eigen omzetting van
 * `headers` naar de v3-routes. Zelf een regex bouwen zou hier precies de fout
 * introduceren die we willen uitsluiten.
 */

import { readFileSync, existsSync } from 'node:fs';
import { readdir } from 'node:fs/promises';
import { join, relative } from 'node:path';

import { getTransformedRoutes } from '@vercel/routing-utils';

const WORTEL = process.cwd();
const STATIC = join(WORTEL, '.vercel', 'output', 'static');

/** Paden van de site zelf. Die horen het strakke beleid te krijgen. */
const SITE_PADEN = [
  '/',
  '/contact',
  '/de-100',
  '/opdrachtgevers',
  '/voorwaarden',
  '/secties',
  '/_astro/iets.css',
];

/** De admin. Die hoort het ruimere beleid te krijgen. */
const ADMIN_PADEN = [
  '/keystatic',
  '/keystatic/singleton/home',
  '/api/keystatic',
  '/api/keystatic/github/oauth',
];

const fouten = [];

/* -------------------------------------------------------------------------
   1. Welke CSP krijgt welk pad?
   ------------------------------------------------------------------------- */

const vercelConfig = JSON.parse(readFileSync(join(WORTEL, 'vercel.json'), 'utf8'));
const { routes, error } = getTransformedRoutes({ headers: vercelConfig.headers });

if (error) {
  console.error(`check-csp: vercel.json levert geen geldige routes op — ${error.message}`);
  process.exit(1);
}

/**
 * Vercel stopt niet bij de eerste treffer maar past elke matchende
 * header-regel toe. Daarom verzamelen we ze allemaal in plaats van er één te
 * pakken: twee treffers is precies de fout die we zoeken.
 */
function cspVoor(pad) {
  const gevonden = [];

  for (const route of routes ?? []) {
    if (!route.src || !route.headers) continue;

    const csp = route.headers['Content-Security-Policy'] ?? route.headers['content-security-policy'];
    if (!csp) continue;

    if (new RegExp(route.src).test(pad)) gevonden.push(csp);
  }

  return gevonden;
}

for (const pad of SITE_PADEN) {
  const treffers = cspVoor(pad);

  if (treffers.length === 0) {
    fouten.push(`${pad} krijgt helemaal geen CSP-header.`);
  } else if (treffers.length > 1) {
    fouten.push(`${pad} krijgt ${treffers.length} CSP-headers; de browser handhaaft dan de doorsnede.`);
  } else if (treffers[0].includes('unsafe-inline')) {
    fouten.push(`${pad} krijgt 'unsafe-inline'. Dat hoort alleen op de adminroutes te staan.`);
  }
}

for (const pad of ADMIN_PADEN) {
  const treffers = cspVoor(pad);

  if (treffers.length === 0) {
    fouten.push(`${pad} krijgt helemaal geen CSP-header.`);
  } else if (treffers.length > 1) {
    fouten.push(`${pad} krijgt ${treffers.length} CSP-headers; de admin heeft er precies één nodig.`);
  } else if (!treffers[0].includes("style-src 'self' 'unsafe-inline'")) {
    fouten.push(
      `${pad} krijgt geen ruimere style-src. De admin stijlt met Emotion en blijft anders kaal.`,
    );
  }
}

/* -------------------------------------------------------------------------
   2. Blijft de gebouwde site binnen 'self'?
   ------------------------------------------------------------------------- */

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
  console.error('check-csp: .vercel/output/static ontbreekt. Draai eerst de build.');
  process.exit(1);
}

for (const bestand of await htmlBestanden(STATIC)) {
  const html = readFileSync(bestand, 'utf8');
  const naam = relative(WORTEL, bestand);

  // Astro's meta hoort weg te zijn; anders staan er twee beleiden naast elkaar.
  if (/http-equiv=["']?content-security-policy/i.test(html)) {
    fouten.push(`${naam} bevat nog een CSP-meta. security.csp hoort uit te staan.`);
  }

  // Alles hieronder zou onder 'self' geblokkeerd worden.
  if (/<script(?![^>]*\ssrc=)[^>]*>[\s\S]*?\S[\s\S]*?<\/script>/i.test(html)) {
    fouten.push(`${naam} bevat een inline script. Dat wordt geblokkeerd; zet het in een bestand.`);
  }

  if (/<style[^>]*>[\s\S]*?\S[\s\S]*?<\/style>/i.test(html)) {
    fouten.push(`${naam} bevat een inline stijlblok. Dat wordt geblokkeerd.`);
  }

  if (/\sstyle=["'][^"']*\S/i.test(html)) {
    fouten.push(`${naam} bevat een style-attribuut. Dat wordt geblokkeerd.`);
  }
}

/* ------------------------------------------------------------------------- */

if (fouten.length > 0) {
  console.error('check-csp: het beleid klopt niet.\n');
  for (const fout of fouten) console.error(`  - ${fout}`);
  console.error('');
  process.exit(1);
}

console.log(
  'check-csp: site strak op \'self\', admin ruimer, geen pad met twee headers, geen inline script of stijl.',
);
