import type { ReactNode } from 'react';

import { verhoudingKlasse, type VerhoudingToken } from '../../lib/tokens';

export type Sluier = 'onder' | 'zij' | 'vlak';

/**
 * De drie verhoudingen staan in tokens.ts, want ze zijn niet van dit component
 * alleen: BeeldTekst zet dezelfde drie op een foto zonder tekst erop.
 */
export type Verhouding = VerhoudingToken;

export interface BeeldvlakProps {
  bron: string;
  alt?: string;
  /** onder = verloop van onderaf; zij = verloop van links; vlak = 62% zwart over alles. */
  sluier?: Sluier;
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
const sluierKlasse: Record<Sluier, string> = {
  onder: 'bg-[image:var(--sluier-onder)]',
  zij: 'bg-[image:var(--sluier-zij)]',
  vlak: 'bg-[color:var(--sluier)]',
};

export default function Beeldvlak({
  bron,
  alt = '',
  sluier = 'onder',
  verhouding = 'breed',
  positie = 'onder',
  zoom = false,
  children,
}: BeeldvlakProps) {
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
    <div className={`relative block overflow-hidden bg-inkt ${zoom ? 'group' : ''}`}>
      <img
        src={bron}
        alt={alt}
        className={`absolute inset-0 size-full object-cover ${zoomKlassen}`}
      />
      <span aria-hidden="true" className={`absolute inset-0 ${sluierKlasse[sluier]}`} />
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
                ? 'col-start-1 row-start-1 flex flex-col items-start justify-center p-8 text-krijt md:max-w-[62%]'
                : 'col-start-1 row-start-1 flex flex-col justify-end p-8 text-krijt'
            }
          >
            {children}
          </div>
        ) : null}
      </div>
    </div>
  );
}
