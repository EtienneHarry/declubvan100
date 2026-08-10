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
import Kaart from '../basis/Kaart';

export interface Kolom {
  nummer?: string;
  kop: string;
  tekst?: string;
  href?: string;
}

export interface DrieKolommenProps {
  achtergrond: AchtergrondToken;
  ruimte: RuimteToken;
  breedte: BreedteToken;
  bovenkop?: string;
  kop?: string;
  items: Kolom[];
}

/**
 * Raster van kaarten. Drie kolommen is het uitgangspunt, maar het raster groeit
 * mee: één, twee, acht of nul kaarten leveren allemaal iets nets op. Bij nul
 * blijft het raster helemaal weg, zodat een lege sectie geen gat trekt.
 */
export default function DrieKolommen({
  achtergrond,
  ruimte,
  breedte,
  bovenkop,
  kop,
  items,
}: DrieKolommenProps) {
  const heeftKop = Boolean(kop?.trim());
  const heeftBovenkop = Boolean(bovenkop?.trim());

  return (
    <section
      className={`${achtergrondKlasse[achtergrond]} ${ruimteKlasse[ruimte]}`}
      data-thema={isLichteAchtergrond[achtergrond] ? 'licht' : undefined}
    >
      <div className={breedteKlasse[breedte]}>
        {heeftBovenkop ? <Bovenkop>{bovenkop}</Bovenkop> : null}
        {heeftKop ? (
          <h2 className="mt-4 text-kop-l text-balance break-words first:mt-0">{kop}</h2>
        ) : null}
        {items.length > 0 ? (
          <ul
            className={`grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3 ${
              heeftKop || heeftBovenkop ? 'mt-10' : ''
            }`}
          >
            {items.map((item, index) => (
              <li key={`${item.kop}-${index}`} className="flex">
                <div className="flex w-full flex-col">
                  <Kaart
                    nummer={item.nummer}
                    kop={item.kop}
                    tekst={item.tekst}
                    href={item.href}
                  />
                </div>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
