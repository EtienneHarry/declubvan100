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
import Bovenkop from '../basis/Bovenkop';
import Knop from '../basis/Knop';
import Beeldvlak from '../beeld/Beeldvlak';
import Bliksem from '../merk/Bliksem';

export interface HeroProps {
  achtergrond: AchtergrondToken;
  ruimte: RuimteToken;
  breedte: BreedteToken;
  bovenkop?: string;
  kop: string;
  tekst?: string;
  knop?: { label: string; href: string };
  tweedeKnop?: { label: string; href: string };
  beeld?: { bron: string; alt: string };
  /**
   * De grote uitgesneden schicht achter de tekst. Maximaal één per pagina, en
   * bij voorkeur in de hero of in de laatste sectie — niet allebei.
   */
  schicht?: boolean;
}

/*
 * De openingssectie: de klap boven de vouw.
 *
 * Dit is het enige sectietype dat een <h1> zet en het enige dat display-xl
 * gebruikt. Allebei mag er precies één per pagina zijn, en die twee regels
 * vallen zo samen: één hero per pagina en het klopt vanzelf.
 *
 * Met beeld loopt de kop door Beeldvlak, want dan staat tekst op de foto en is
 * de sluier verplicht. `onder` is daar de juiste: de beeldrichtlijn wijst die
 * toe aan "hero, tekst onderaan".
 *
 * De schicht en het beeld sluiten elkaar uit. De richtlijn kent de grote
 * schicht als uitgesneden vlak op een egale achtergrond; over een foto heen is
 * geen van de drie toegestane rollen, en de sluier zou hem toch opeten.
 */
export default function Hero({
  achtergrond,
  ruimte,
  breedte,
  bovenkop,
  kop,
  tekst,
  knop,
  tweedeKnop,
  beeld,
  schicht = false,
}: HeroProps) {
  const heeftBeeld = Boolean(beeld?.bron.trim());
  const toontSchicht = schicht && !heeftBeeld;

  const inhoud = (
    <>
      {bovenkop?.trim() ? <Bovenkop>{bovenkop}</Bovenkop> : null}
      <h1 className="mt-4 text-display-xl text-balance break-words first:mt-0">{kop}</h1>
      {tekst?.trim() ? (
        <p className={`mt-6 text-lopend-l text-tekst-zacht ${maatRegelKlasse[achtergrond]}`}>
          {tekst}
        </p>
      ) : null}
      {knop || tweedeKnop ? (
        <div className="mt-10 flex flex-wrap items-center gap-4">
          {knop ? (
            <Knop variant="vol" maat="l" href={knop.href}>
              {knop.label}
            </Knop>
          ) : null}
          {tweedeKnop ? (
            <Knop variant="lijn" maat="l" href={tweedeKnop.href}>
              {tweedeKnop.label}
            </Knop>
          ) : null}
        </div>
      ) : null}
    </>
  );

  if (beeld && heeftBeeld) {
    return (
      <section
        className={`${achtergrondKlasse[achtergrond]} ${ruimteKlasse[ruimte]}`}
        data-thema={isLichteAchtergrond[achtergrond] ? 'licht' : undefined}
      >
        <div className={breedteKlasse[breedte]}>
          <Beeldvlak bron={beeld.bron} alt={beeld.alt} sluier="onder" verhouding="breed">
            {inhoud}
          </Beeldvlak>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`relative overflow-hidden ${achtergrondKlasse[achtergrond]} ${ruimteKlasse[ruimte]}`}
      data-thema={isLichteAchtergrond[achtergrond] ? 'licht' : undefined}
    >
      {/*
        De schicht hangt buiten het raster en mag aflopen over de rand; de
        overflow-hidden hierboven vangt dat op zodat er geen horizontale
        schuifbalk ontstaat.

        Pas vanaf md. Daaronder is de sectie zo breed als de tekstkolom, en dan
        staat de schicht niet achter de tekst maar erdoorheen — precies wat de
        richtlijn verbiedt.
      */}
      {toontSchicht ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 justify-end text-tekst md:flex"
        >
          <Bliksem rol="groot" />
        </span>
      ) : null}
      <div className={`relative ${breedteKlasse[breedte]}`}>{inhoud}</div>
    </section>
  );
}
