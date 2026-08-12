import {
  achtergrondKlasse,
  breedteKlasse,
  isLichteAchtergrond,
  ruimteKlasse,
  type AchtergrondToken,
  type BreedteToken,
  type RuimteToken,
} from '../../lib/tokens';
import type { KopNiveau } from '../../lib/SectionRenderer';
import { ploeg } from '../../lib/beweging';
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
  /** Gezet door SectieLijst; 1 als deze sectie de pagina opent. */
  kopNiveau?: KopNiveau;
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
  kopNiveau = 2,
}: DrieKolommenProps) {
  const heeftKop = Boolean(kop?.trim());
  const heeftBovenkop = Boolean(bovenkop?.trim());

  const Kop = kopNiveau === 1 ? 'h1' : 'h2';

  /*
   * De kaartkoppen zakken onder de sectiekop. Is er geen sectiekop, dan zijn de
   * kaarten zelf het bovenste niveau van deze sectie en blijven ze staan waar de
   * sectie staat — anders zou er een niveau overgeslagen worden.
   */
  const kaartNiveau: 2 | 3 = heeftKop ? (kopNiveau === 1 ? 2 : 3) : 2;

  /*
   * De ploeg loopt door de kaarten heen: bovenkop, kop, dan kaart na kaart in
   * hetzelfde ritme van 70ms. Vanaf de negende kaart deelt hij de laatste stap,
   * anders staat die te lang stil nadat hij in beeld is gekomen.
   */
  const volgende = ploeg();

  return (
    <section
      className={`${achtergrondKlasse[achtergrond]} ${ruimteKlasse[ruimte]}`}
      data-thema={isLichteAchtergrond[achtergrond] ? 'licht' : undefined}
    >
      <div className={breedteKlasse[breedte]}>
        {heeftBovenkop ? <Bovenkop stap={volgende()}>{bovenkop}</Bovenkop> : null}
        {heeftKop ? (
          <Kop
            data-onthul="kop"
            data-onthul-stap={volgende()}
            className="mt-4 text-kop-l text-balance break-words first:mt-0"
          >
            {kop}
          </Kop>
        ) : null}
        {items.length > 0 ? (
          <ul
            className={`grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3 ${
              heeftKop || heeftBovenkop ? 'mt-10' : ''
            }`}
          >
            {items.map((item, index) => (
              <li
                key={`${item.kop}-${index}`}
                data-onthul="blok"
                data-onthul-stap={volgende()}
                className="flex"
              >
                <div className="flex w-full flex-col">
                  <Kaart
                    nummer={item.nummer}
                    kop={item.kop}
                    tekst={item.tekst}
                    href={item.href}
                    kopNiveau={kaartNiveau}
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
