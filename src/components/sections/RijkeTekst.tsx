import {
  achtergrondKlasse,
  breedteKlasse,
  isLichteAchtergrond,
  maatRegelKlasse,
  ruimteKlasse,
  type AchtergrondToken,
  type BreedteToken,
  type RuimteToken,
} from '../../lib/tokens';
import Bliksem from '../merk/Bliksem';

export type RijkBlok =
  | { soort: 'kop'; tekst: string }
  | { soort: 'alinea'; tekst: string }
  | { soort: 'lijst'; items: string[] };

export interface RijkeTekstProps {
  achtergrond: AchtergrondToken;
  ruimte: RuimteToken;
  breedte: BreedteToken;
  kop?: string;
  blokken: RijkBlok[];
  /**
   * Zet de bliksemschicht als opsommingsteken. Alleen voor lijsten die over de
   * 100 of de selectie gaan — een lijst met openingstijden krijgt hem niet.
   */
  schichtLijst?: boolean;
}

/*
 * Lopende tekst met koppen en lijsten, voor de voorwaardenpagina.
 *
 * Bewust een lijst van getypeerde blokken en geen losse HTML-string: zo staat
 * vast welke elementen er kunnen ontstaan, en er hoeft geen ongecontroleerde
 * HTML de pagina in. Wanneer dit in B4 uit een CMS komt, mapt de bron op deze
 * drie soorten.
 */
export default function RijkeTekst({
  achtergrond,
  ruimte,
  breedte,
  kop,
  blokken,
  schichtLijst = false,
}: RijkeTekstProps) {
  const maat = maatRegelKlasse[achtergrond];

  return (
    <section
      className={`${achtergrondKlasse[achtergrond]} ${ruimteKlasse[ruimte]}`}
      data-thema={isLichteAchtergrond[achtergrond] ? 'licht' : undefined}
    >
      <div className={breedteKlasse[breedte]}>
        {kop?.trim() ? (
          <h2 className="text-kop-l text-balance break-words">{kop}</h2>
        ) : null}
        {blokken.map((blok, index) => {
          // Een leeg blok levert geen leeg element op. Uit een CMS komt zoiets
          // vaker dan je denkt: een aangemaakte maar nooit ingevulde alinea.
          if (blok.soort === 'lijst' ? blok.items.length === 0 : !blok.tekst.trim()) {
            return null;
          }

          if (blok.soort === 'kop') {
            return (
              <h3
                key={`kop-${index}`}
                className={`mt-10 text-kop-s text-balance break-words ${maat}`}
              >
                {blok.tekst}
              </h3>
            );
          }

          if (blok.soort === 'alinea') {
            return (
              <p key={`alinea-${index}`} className={`mt-4 text-lopend-m text-tekst-zacht ${maat}`}>
                {blok.tekst}
              </p>
            );
          }

          return (
            <ul key={`lijst-${index}`} className={`mt-4 flex list-none flex-col gap-3 p-0 ${maat}`}>
              {blok.items.map((item, itemIndex) => (
                <li key={`${index}-${itemIndex}`} className="flex items-start gap-3">
                  {schichtLijst ? (
                    <span className="mt-1 flex text-tekst-zacht">
                      <Bliksem rol="opsomming" />
                    </span>
                  ) : (
                    <span aria-hidden="true" className="mt-2 block size-1 shrink-0 bg-tekst-stil" />
                  )}
                  <span className="text-lopend-m text-tekst-zacht">{item}</span>
                </li>
              ))}
            </ul>
          );
        })}
      </div>
    </section>
  );
}
