/*
 * Tokennaam naar Tailwind-klasse — De Club van 100.
 *
 * Dit is het koppelbestand: hier ligt vast welke tokennamen er bestaan en welke
 * klasse daarbij hoort. De waardes achter die klassen staan in
 * src/styles/tokens.css.
 *
 * Bewust geen rauwe waardes hier, alleen klassenamen. Een kleur of maat die
 * hier letterlijk zou staan, omzeilt de tokenlaag; scripts/check-tokens.mjs
 * laat de build daar dan ook op vallen.
 *
 * Elke groep heeft een union-type. Een tokennaam die hier niet in staat, geeft
 * een compileerfout in plaats van een stille lege klasse.
 */

/**
 * De vier achtergronden uit het contrasthoofdstuk, en niet meer. Twee donkere
 * en twee lichte. Meer dan één lichte en één donkere achtergrond op dezelfde
 * pagina is volgens het design system een fout.
 */
export type AchtergrondToken = 'inkt' | 'roet' | 'papier' | 'mist';

/** Het sectieritme: de verticale lucht boven en onder een sectie. */
export type RuimteToken = 'sectie-s' | 'sectie-m' | 'sectie-l';

/** Hoe ver de inhoud binnen een sectie mag uitlopen. */
export type BreedteToken = 'smal' | 'basis' | 'breed';

/**
 * Achtergrond levert vlak- én tekstkleur. Die twee horen bij elkaar: op inkt en
 * roet haalt `krijt` 19,8:1 en 17,6:1, op papier en mist haalt `inkt` 19,0:1 en
 * 15,6:1. Losgekoppeld is de kans op een verboden combinatie te groot.
 *
 * Let op: dit levert alleen de klassen. Een sectie op `papier` of `mist` hoort
 * daarnaast `data-thema="licht"` te dragen, zodat de semantische aliassen
 * (`--tekst-zacht`, `--lijn`, `--focus-ring`) meekantelen voor alles wat
 * erbinnen staat.
 */
export const achtergrondKlasse: Record<AchtergrondToken, string> = {
  inkt: 'bg-inkt text-krijt',
  roet: 'bg-roet text-krijt',
  papier: 'bg-papier text-inkt',
  mist: 'bg-mist text-inkt',
};

/** Welke achtergronden licht zijn. Bepaalt of `data-thema="licht"` meegaat. */
export const isLichteAchtergrond: Record<AchtergrondToken, boolean> = {
  inkt: false,
  roet: false,
  papier: true,
  mist: true,
};

/**
 * Leesbreedte van lopende tekst. Het design system houdt die op zwart korter —
 * 60ch tegen 66ch — omdat licht op donker optisch zwaarder leest.
 */
export const maatRegelKlasse: Record<AchtergrondToken, string> = {
  inkt: 'max-w-[var(--maat-regel-donker)]',
  roet: 'max-w-[var(--maat-regel-donker)]',
  papier: 'max-w-[var(--maat-regel)]',
  mist: 'max-w-[var(--maat-regel)]',
};

/** Verticale ruimte van een sectie: padding boven en onder, vloeiend. */
export const ruimteKlasse: Record<RuimteToken, string> = {
  'sectie-s': 'py-sectie-s',
  'sectie-m': 'py-sectie-m',
  'sectie-l': 'py-sectie-l',
};

/**
 * Containerbreedte, inclusief de horizontale marge. Samen is dit de
 * `.container` uit het design system: gecentreerd, met `--marge` links en
 * rechts.
 */
export const breedteKlasse: Record<BreedteToken, string> = {
  smal: 'mx-auto px-marge max-w-smal',
  basis: 'mx-auto px-marge max-w-basis',
  breed: 'mx-auto px-marge max-w-breed',
};
