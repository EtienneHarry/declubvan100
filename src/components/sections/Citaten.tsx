import {
  achtergrondKlasse,
  breedteKlasse,
  isLichteAchtergrond,
  ruimteKlasse,
  type AchtergrondToken,
  type BreedteToken,
  type RuimteToken,
} from '../../lib/tokens';
import Bovenkop from '../basis/Bovenkop';

export interface Citaat {
  citaat: string;
  naam?: string;
  rol?: string;
}

export interface CitatenProps {
  achtergrond: AchtergrondToken;
  ruimte: RuimteToken;
  breedte: BreedteToken;
  bovenkop?: string;
  items: Citaat[];
}

/**
 * Klantquotes. Eén citaat krijgt de volle breedte, meerdere komen naast elkaar
 * te staan. Bij nul citaten rendert de sectie niets binnen haar vlak.
 *
 * Naam en rol zijn allebei optioneel; ontbreken ze, dan blijft er geen lege
 * bronregel achter.
 */
export default function Citaten({
  achtergrond,
  ruimte,
  breedte,
  bovenkop,
  items,
}: CitatenProps) {
  const raster = items.length === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2';

  return (
    <section
      className={`${achtergrondKlasse[achtergrond]} ${ruimteKlasse[ruimte]}`}
      data-thema={isLichteAchtergrond[achtergrond] ? 'licht' : undefined}
    >
      <div className={breedteKlasse[breedte]}>
        {bovenkop?.trim() ? <Bovenkop>{bovenkop}</Bovenkop> : null}
        {items.length > 0 ? (
          <ul className={`mt-10 grid list-none gap-10 p-0 first:mt-0 ${raster}`}>
            {items.map((item, index) => (
              <li key={`${item.naam ?? 'citaat'}-${index}`}>
                <figure className="border-l border-lijn-sterk pl-6">
                  <blockquote className="text-kop-m text-balance break-words">
                    {item.citaat}
                  </blockquote>
                  {item.naam?.trim() || item.rol?.trim() ? (
                    <figcaption className="mt-4 text-lopend-s text-tekst-stil">
                      {[item.naam, item.rol].filter((deel) => deel?.trim()).join(' — ')}
                    </figcaption>
                  ) : null}
                </figure>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
