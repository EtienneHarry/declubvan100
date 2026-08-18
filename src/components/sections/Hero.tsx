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
import Koptekst from '../basis/Koptekst';
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
   * De foto vult het eerste scherm, van rand tot rand — de landingshero uit de
   * mockup. Doet alleen iets mét een foto, en hangt net als de dubbellaagse
   * laag aan `kopNiveau === 1`: een tweede hero is geen opening en krijgt de
   * gewone beeldbehandeling.
   */
  vullend?: boolean;
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
 * de sluier verplicht.
 *
 * DE VLAKKE SLUIER EN NIET HET VERLOOP, EN DAT IS GEMETEN. De beeldrichtlijn
 * wijst "onder" toe aan een hero met tekst onderaan, en dat klopt zolang die
 * tekst één regel is. Deze hero is dat niet: bovenkop, displaykop, een zin en
 * twee knoppen samen beslaan meer dan de helft van het vlak. Gemeten op 1137 bij
 * 640: de bovenkop begint op 54% van onderaf, en daar is het verloop nog maar
 * 0,53 dekkend — witte tekst haalt op een foto die daar wit is 3,75:1 en zakt
 * dus onder AA. De vlakke sluier is overal 0,62 en haalt in datzelfde geval
 * 5,04:1.
 *
 * Dat is dezelfde afweging die de splitscreen-deur al maakte, om precies
 * dezelfde reden: zodra de tekst het vlak vult, staat de bovenste helft ervan op
 * het doorzichtige deel van het verloop.
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
  vullend = false,
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
        De kop loopt door Koptekst. Die doet twee dingen die Hero niet hoeft te
        weten: hij zet de haal neer waar de redacteur haakjes heeft getypt, en
        hij geeft het eerste getal aan Teller door zodat het bij het in beeld
        komen naar boven telt. Staat er geen haakje en geen getal in, dan
        verandert er niets aan de uitvoer.
      */}
      {/* De kop komt uit een masker omhoog en fadet dus niet in. */}
      <Kop
        data-onthul="kop"
        data-onthul-stap={volgende()}
        className={`mt-4 ${kopKlasse}${laagKlasse} text-balance hyphens-auto break-words first:mt-0`}
      >
        <Koptekst tekst={kop} teller />
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
            TWEE GEVULDE KNOPPEN, EN DAT IS HIER GEEN FOUT.

            De regel "één gevulde knop per blikveld" gaat over rangorde: van twee
            acties is er één de belangrijkste. In de hero staan geen twee acties
            van verschillend gewicht maar de twee deuren van de site — inhuren en
            aanmelden — en die zijn even zwaar. De kleur is daar geen nadruk maar
            een code: zwart voor wie zich aanmeldt, rood voor wie inhuurt, precies
            zoals de mockup ze zet.

            Overal anders geldt de regel gewoon. Oproep zet zijn tweede actie nog
            steeds als lijnknop neer, want daar ís er wél een eerste.
          */}
          {knop ? (
            <Knop variant="inkt" maat="l" href={knop.href}>
              {knop.label}
            </Knop>
          ) : null}
          {tweedeKnop ? (
            <Knop variant="vuur" maat="l" href={tweedeKnop.href}>
              {tweedeKnop.label}
            </Knop>
          ) : null}
        </div>
      ) : null}
    </>
  );

  if (beeld && heeftBeeld && vullend && kopNiveau === 1) {
    /*
     * De landingshero: het beeld van rand tot rand, het eerste scherm hoog, de
     * inhoud onderin op de containerbreedte van de rest van de pagina. Geen
     * ruimte-token: een vlak dat het scherm vult heeft geen lucht eromheen
     * nodig, en de sectie eronder schildert zijn eigen ruimte.
     */
    return (
      <section
        className={achtergrondKlasse[achtergrond]}
        data-thema={isLichteAchtergrond[achtergrond] ? 'licht' : undefined}
      >
        <Beeldvlak bron={beeld.bron} alt={beeld.alt} sluier="vlak" vullend>
          <div className={`w-full ${breedteKlasse[breedte]}`}>{inhoud}</div>
        </Beeldvlak>
      </section>
    );
  }

  if (beeld && heeftBeeld) {
    return (
      <section
        className={`${achtergrondKlasse[achtergrond]} ${ruimteKlasse[ruimte]}`}
        data-thema={isLichteAchtergrond[achtergrond] ? 'licht' : undefined}
      >
        <div className={breedteKlasse[breedte]}>
          <Beeldvlak bron={beeld.bron} alt={beeld.alt} sluier="vlak" verhouding="breed">
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
