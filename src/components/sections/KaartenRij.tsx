import {
  achtergrondKlasse,
  breedteKlasse,
  ruimteKlasse,
  type AchtergrondToken,
  type BreedteToken,
  type RuimteToken,
} from '../../lib/tokens';

export interface Kaart {
  kop: string;
  tekst?: string;
}

export interface KaartenRijProps {
  achtergrond: AchtergrondToken;
  ruimte: RuimteToken;
  breedte: BreedteToken;
  kop?: string;
  items: Kaart[];
}

/**
 * Rij kaarten.
 *
 * Het raster groeit mee met het aantal kaarten; twee en acht leveren allebei
 * een nette rij op. Bij nul kaarten blijft het raster helemaal weg, zodat een
 * lege sectie geen gat trekt.
 */
export default function KaartenRij({
  achtergrond,
  ruimte,
  breedte,
  kop,
  items,
}: KaartenRijProps) {
  const heeftKop = Boolean(kop?.trim());

  return (
    <section className={`${achtergrondKlasse[achtergrond]} ${ruimteKlasse[ruimte]}`}>
      <div className={`mx-auto px-6 ${breedteKlasse[breedte]}`}>
        {heeftKop ? (
          <h2 className="mb-8 font-kop text-kop-m text-balance break-words">{kop}</h2>
        ) : null}
        {items.length > 0 ? (
          <ul className="grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, index) => (
              <li
                key={`${item.kop}-${index}`}
                className="rounded-zacht border border-lijn bg-vlak p-6 text-tekst shadow-diepte-1"
              >
                <h3 className="font-kop text-kop-s text-balance break-words">{item.kop}</h3>
                {item.tekst?.trim() ? (
                  <p className="mt-3 font-basis text-klein text-tekst-zacht">{item.tekst}</p>
                ) : null}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
