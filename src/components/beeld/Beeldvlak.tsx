import type { ReactNode } from 'react';

import { verhoudingKlasse, type VerhoudingToken } from '../../lib/tokens';

export type Sluier = 'onder' | 'zij' | 'vlak';

/**
 * De toon van de sluier. donker = bruin op 62%, voor witte tekst op beeld.
 * licht = de bijna-sepia laag uit de hero van de mockup, cream op 72%, voor
 * donkere tekst op beeld.
 */
export type SluierToon = 'donker' | 'licht';

/**
 * De drie verhoudingen staan in tokens.ts, want ze zijn niet van dit component
 * alleen: BeeldTekst zet dezelfde drie op een foto zonder tekst erop.
 */
export type Verhouding = VerhoudingToken;

export interface BeeldvlakProps {
  bron: string;
  alt?: string;
  /** onder = verloop van onderaf; zij = verloop van links; vlak = dekkend over alles. */
  sluier?: Sluier;
  /**
   * donker = witte tekst op de foto, licht = donkere tekst.
   *
   * De lichte toon zet `data-thema="licht"` én `data-vlak="cream"`. Het eerste
   * laat alles binnen het vlak meekantelen — een bovenkop, een knop, een lijn.
   * Het tweede haalt de gedempte tekstkleuren weg: grafiet haalt op cream
   * 4,37:1 en zakt daarmee onder AA, dus op een creamvlak bestaat alleen de
   * hoofdtekstkleur.
   */
  toon?: SluierToon;
  /** breed = 16/9, portret = 4/5, vierkant = 1/1. */
  verhouding?: Verhouding;
  /** onder = tekst onderin; zij = tekst links gecentreerd. */
  positie?: 'onder' | 'zij';
  /**
   * Lichte zoom bij hover over het hele vlak. Alleen aanzetten waar het beeld
   * klikbaar is of ergens naar verwijst — een foto die nergens heen gaat, hoort
   * niet te reageren op een muis die er langs komt.
   */
  zoom?: boolean;
  children?: ReactNode;
}

/*
 * Foto met verplichte sluier. Tekst op beeld loopt altijd via dit component.
 *
 * OP EEN FOTO BESTAAT GEEN GEDEMPTE TEKSTKLEUR. Het vlak zet daarom altijd een
 * data-vlak, en die regel in tokens.css bindt --tekst-zacht en --tekst-stil aan
 * de hoofdtekstkleur. De sluier garandeert één verhouding, en die geldt voor de
 * kleur waar hij op doorgerekend is — niet voor een grijstint eronder.
 *
 * Gemeten op de vlakke sluier, op een foto die op die plek wit is: krijt haalt
 * 5,04:1, cream 3,29:1 en krijt-stil 1,46:1. Een bovenkop in krijt-stil op een
 * foto was dus al die tijd onleesbaar in het slechtste geval — het viel niet op
 * omdat de meting de sluier als een dekkend vlak behandelde in plaats van als
 * een laag over onbekend beeld.
 *
 * De sluier is niet uit te zetten: er is geen prop die hem weglaat en geen tak
 * die hem overslaat. Eigen fotografie is warm en druk, en zonder behandeling
 * haalt witte tekst er nooit betrouwbaar AA op. Een foto is bovendien geen
 * token — hij wordt vervangen en dan klopt het contrast niet meer.
 *
 * Afwijking van het propscontract: `verhouding` is een keuze uit de drie
 * verhoudingen die de beeldrichtlijn noemt in plaats van een vrije
 * CSS-waarde, en `hoogte` is weggelaten. Allebei omdat een vrije maat een
 * style-attribuut vraagt en de CSP dat blokkeert.
 */
/*
 * De donkere toon heeft drie vormen, de lichte één.
 *
 * Dat is geen omissie maar de meting: de mockup zet de lichte sluier één keer
 * neer, als vlakke laag over de hele hero. Er is geen licht verloop gemeten, en
 * er staat hier niets bij verzonnen — de drie plekken van de lichte toon wijzen
 * daarom alle drie naar dezelfde vlakke laag. Levert de klant alsnog een licht
 * verloop, dan is dat één token erbij en twee regels hier.
 */
const sluierKlasse: Record<SluierToon, Record<Sluier, string>> = {
  donker: {
    onder: 'bg-[image:var(--sluier-onder)]',
    zij: 'bg-[image:var(--sluier-zij)]',
    vlak: 'bg-[color:var(--sluier-donker)]',
  },
  licht: {
    onder: 'bg-[color:var(--sluier-licht)]',
    zij: 'bg-[color:var(--sluier-licht)]',
    vlak: 'bg-[color:var(--sluier-licht)]',
  },
};

export default function Beeldvlak({
  bron,
  alt = '',
  sluier = 'onder',
  toon = 'donker',
  verhouding = 'breed',
  positie = 'onder',
  zoom = false,
  children,
}: BeeldvlakProps) {
  const licht = toon === 'licht';
  /*
   * De zoom hangt aan de hover van het hele vlak en niet aan die van de foto:
   * de bezoeker ziet één deur, niet een foto met tekst erover.
   *
   * Op motion-safe, net als de spinner en het skelet. De globale regel voor
   * gereduceerde beweging zet elke duur op 1ms, en dat zou van deze zoom een
   * sprong maken in plaats van hem weg te laten.
   *
   * 700ms tegen de 340 en 420 van een binnenkomst: de zoom loopt trager uit dan
   * iets dat binnenkomt. De curve is --soepel-uit, de bestaande uitloop van het
   * design system; de bron geeft er voor deze zoom geen eigen curve bij.
   *
   * De transitie staat op `scale` en niet op `transform`. Tailwind 4 zet
   * `scale-[…]` op de losse scale-property, en die valt niet onder een
   * transitie op transform — dan springt de zoom in één beeldje in plaats van
   * er 700ms over te doen. Dat is niet te zien aan de klassenaam.
   */
  const zoomKlassen = zoom
    ? 'motion-safe:[transition:scale_var(--duur-zoom)_var(--soepel-uit)] ' +
      'motion-safe:group-hover:scale-[var(--zoom-beeld)]'
    : '';

  return (
    /*
      De grondkleur onder de foto hoort bij de toon: bruin onder een donkere
      sluier, cream onder een lichte. Hij is te zien zolang de foto nog niet
      binnen is en langs de randen van een beeld dat het vlak niet helemaal
      vult.
    */
    <div
      data-thema={licht ? 'licht' : undefined}
      data-vlak={licht ? 'cream' : 'beeld'}
      className={`relative block overflow-hidden ${licht ? 'bg-cream' : 'bg-bruin'} ${zoom ? 'group' : ''}`}
    >
      <img
        src={bron}
        alt={alt}
        className={`absolute inset-0 size-full object-cover ${zoomKlassen}`}
      />
      <span aria-hidden="true" className={`absolute inset-0 ${sluierKlasse[toon][sluier]}`} />
      {/*
        Beeld en inhoud liggen op dezelfde rastercel, zodat de verhouding een
        ondergrens is en geen keurslijf: past de tekst er niet in, dan groeit het
        vlak mee in plaats van hem af te snijden.

        grid-cols-1 en w-full zien er weglaatbaar uit maar zijn het niet. Zonder
        w-full rekt de spacer mee met de rijhoogte en rekent hij zijn breedte
        terug uit de verhouding; zonder grid-cols-1 sizet de auto-kolom zich
        vervolgens naar die spacer. Samen leverde dat een vlak van 941px in een
        ouder van 335px.

        secties.astro bewaakt dit met een regressievariant.
      */}
      <div className="relative grid grid-cols-1">
        <div
          aria-hidden="true"
          className={`col-start-1 row-start-1 w-full ${verhoudingKlasse[verhouding]}`}
        />
        {children ? (
          <div
            className={
              positie === 'zij'
                ? `col-start-1 row-start-1 flex flex-col items-start justify-center p-8 md:max-w-[62%] ${licht ? 'text-inkt' : 'text-krijt'}`
                : `col-start-1 row-start-1 flex flex-col justify-end p-8 ${licht ? 'text-inkt' : 'text-krijt'}`
            }
          >
            {children}
          </div>
        ) : null}
      </div>
    </div>
  );
}
