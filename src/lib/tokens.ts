/*
 * Tokennaam naar Tailwind-klasse.
 *
 * Dit bestand is samen met SectionRenderer.tsx het enige koppelbestand van het
 * sjabloon: hier ligt vast welke tokennamen een sectie mag krijgen en welke
 * klasse daarbij hoort. De waardes achter die klassen staan in
 * src/styles/tokens.css.
 *
 * Bewust geen rauwe waardes hier — alleen klassenamen. Een kleur of maat die
 * hier letterlijk zou staan, omzeilt de tokenlaag; scripts/check-tokens.mjs
 * laat de build daar dan ook op vallen.
 *
 * Elke groep heeft een union-type. Een sectie die een tokennaam meekrijgt die
 * hier niet in staat, geeft een compileerfout in plaats van een stille lege
 * klasse.
 */

export type AchtergrondToken = 'vlak' | 'zacht' | 'diep' | 'omgekeerd';
export type RuimteToken = 'compact' | 'normaal' | 'ruim';
export type BreedteToken = 'smal' | 'basis' | 'breed';

/**
 * Achtergrond levert vlak- én tekstkleur. Die twee horen bij elkaar: een
 * omgekeerde achtergrond zonder omgekeerde tekst is onleesbaar, dus het token
 * bepaalt beide.
 */
export const achtergrondKlasse: Record<AchtergrondToken, string> = {
  vlak: 'bg-vlak text-tekst',
  zacht: 'bg-vlak-zacht text-tekst',
  diep: 'bg-vlak-diep text-tekst',
  omgekeerd: 'bg-omgekeerd text-tekst-omgekeerd',
};

/** Verticale ruimte van een sectie: de padding boven en onder. */
export const ruimteKlasse: Record<RuimteToken, string> = {
  compact: 'py-compact',
  normaal: 'py-normaal',
  ruim: 'py-ruim',
};

/** Containerbreedte: hoe ver de inhoud binnen een sectie mag uitlopen. */
export const breedteKlasse: Record<BreedteToken, string> = {
  smal: 'max-w-smal',
  basis: 'max-w-basis',
  breed: 'max-w-breed',
};
