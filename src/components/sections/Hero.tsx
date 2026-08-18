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
import type { KopNiveau } from '../../lib/SectionRenderer';
import { ploeg } from '../../lib/beweging';
import Bovenkop from '../basis/Bovenkop';
import Teller from '../basis/Teller';
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
  /**
   * De dubbellaagse kop uit de mockup: de witte kop met een harde donkere laag
   * eronder. Werkt alleen op `display-xl`, dus alleen op de hero die de pagina
   * opent — een tweede hero zakt naar `display-l` en krijgt hem niet.
   */
  dubbellaags?: boolean;
  /**
   * Gezet door SectieLijst. 1 als deze hero de pagina opent, 2 als er al een
   * kop boven staat. Een tweede hero op dezelfde pagina zakt daarmee naar een
   * gewone sectiekop, zodat er één <h1> en één display-xl overblijft.
   */
  kopNiveau?: KopNiveau;
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
 *
 * HET DUBBELLAAGSE EFFECT IS HERO-EXCLUSIEF EN DISPLAY-XL-EXCLUSIEF. Het hangt
 * hier aan `kopNiveau === 1` en niet aan de prop alleen: een tweede hero op
 * dezelfde pagina zakt naar een gewone sectiekop op `display-l`, en dan hoort
 * hij het effect ook kwijt te raken. Zo blijft er precies één dubbellaagse kop
 * per pagina, om dezelfde reden waarom er precies één <h1> is.
 *
 * Het is een tweede laag en geen contrastmiddel. De kop moet op zichzelf al
 * genoeg contrast halen tegen zijn achtergrond; een offset telt niet mee in
 * WCAG. Zie het typografiehoofdstuk van design-system.md.
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
  dubbellaags = false,
  kopNiveau = 1,
}: HeroProps) {
  const heeftBeeld = Boolean(beeld?.bron.trim());
  const toontSchicht = schicht && !heeftBeeld;

  // Opent deze hero de pagina, dan is hij de <h1> en de enige display-xl.
  // Staat er al een kop boven, dan is dit gewoon een sectie.
  const Kop = kopNiveau === 1 ? 'h1' : 'h2';
  const kopKlasse = kopNiveau === 1 ? 'text-display-xl' : 'text-display-l';
  // Alleen op display-xl. Op een lichte sectie valt de laag vanzelf weg: daar
  // staat --kop-dubbellaags op none.
  const laagKlasse =
    dubbellaags && kopNiveau === 1 ? ' [text-shadow:var(--kop-dubbellaags)]' : '';

  /*
   * De ploeg: bovenkop, kop, tekst, dan de knoppen. Elk aanwezig onderdeel
   * schuift 70ms op; wat ontbreekt telt niet mee. Zie src/lib/beweging.ts.
   *
   * Boven de vouw gebeurt er meestal niets mee — wat bij het laden al in beeld
   * staat, staat er meteen. Dit ritme is er voor de hero die tweede staat.
   */
  const volgende = ploeg();

  const inhoud = (
    <>
      {bovenkop?.trim() ? <Bovenkop stap={volgende()}>{bovenkop}</Bovenkop> : null}
      {/*
        hyphens-auto vóór break-words. display-xl loopt tot 128px en de smalste
        kolom is 335px op een telefoon; een woord als "voorwaarden" past daar in
        geen enkele container. break-words alleen hakt dat woord dan op een
        willekeurig punt af — gemeten: vier regelvakken voor twee woorden. Met
        afbreken op lettergreep (de pagina staat op lang="nl") wordt dat een
        nette streep, en break-words blijft eronder liggen voor wat zelfs dan
        niet past.
      */}
      {/*
        De kop loopt door Teller. Zit er een getal in, dan telt dat bij het in
        beeld komen naar boven; zit er geen getal in, dan verandert er niets aan
        de uitvoer. Hero weet daar verder niets van.
      */}
      {/* De kop komt uit een masker omhoog en fadet dus niet in. */}
      <Kop
        data-onthul="kop"
        data-onthul-stap={volgende()}
        className={`mt-4 ${kopKlasse}${laagKlasse} text-balance hyphens-auto break-words first:mt-0`}
      >
        <Teller tekst={kop} />
      </Kop>
      {tekst?.trim() ? (
        <p
          data-onthul="blok"
          data-onthul-stap={volgende()}
          className={`mt-6 text-lopend-l text-tekst-zacht ${maatRegelKlasse[achtergrond]}`}
        >
          {tekst}
        </p>
      ) : null}
      {knop || tweedeKnop ? (
        <div
          data-onthul="blok"
          data-onthul-stap={volgende()}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          {/*
            De primaire actie staat sinds de restyle op vuur. Dat is de knop uit de
            mockup, en het is de enige plek waar die kleur op de site terechtkomt: als
            vlak, met witte tekst, nooit als woord op bruin.

            De tweede actie blijft een lijnknop. De mockup zet er twee gevulde naast
            elkaar — zwart en rood — maar welke van de twee acties op deze pagina
            welke kleur verdient, hangt aan de nieuwe koppen en die komen pas in
            sessie 2. Tot die tijd blijft de regel staan die er al was: één gevulde
            knop per blikveld.
          */}
          {knop ? (
            <Knop variant="vuur" maat="l" href={knop.href}>
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

        Pas vanaf lg. Op md bleek de schicht 26 tot 42px in de lopende tekst te
        happen — gemeten op 768. Vanaf 1024 raakt hij alleen nog de bovenkop en
        de displaykop, en dat is precies wat de richtlijn voor deze rol
        toestaat: achter de tekst, niet in de tekstkolom.
      */}
      {toontSchicht ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 justify-end text-tekst lg:flex"
        >
          <Bliksem rol="groot" />
        </span>
      ) : null}
      <div className={`relative ${breedteKlasse[breedte]}`}>{inhoud}</div>
    </section>
  );
}
