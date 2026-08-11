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

  /*
   * Het niveau van een kopblok hangt af van de sectiekop erboven.
   *
   * Heeft de sectie een eigen kop, dan is dat de <h2> en hangen de kopblokken
   * daaronder als <h3>. Heeft ze er geen, dan zijn de kopblokken zelf het
   * bovenste niveau binnen de sectie en horen ze <h2> te zijn — anders springt
   * de pagina van de <h1> van de hero rechtstreeks naar <h3>.
   *
   * Afgeleid en niet als prop: zo kan het niet verkeerd gezet worden. Een prop
   * die op 2 staat terwijl er een sectiekop is, levert twee keer <h2> op en
   * breekt precies de volgorde die dit moet bewaken.
   */
  const heeftSectieKop = Boolean(kop?.trim());
  const KopBlok = heeftSectieKop ? 'h3' : 'h2';
  const kopBlokKlasse = heeftSectieKop ? 'text-kop-s' : 'text-kop-m';

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
              <KopBlok
                key={`kop-${index}`}
                className={`mt-10 ${kopBlokKlasse} text-balance break-words ${maat}`}
              >
                {blok.tekst}
              </KopBlok>
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
