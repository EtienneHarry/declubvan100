import type { ReactNode } from 'react';

export type Sluier = 'onder' | 'zij' | 'vlak';
export type Verhouding = 'breed' | 'portret' | 'vierkant';

export interface BeeldvlakProps {
  bron: string;
  alt?: string;
  /** onder = verloop van onderaf; zij = verloop van links; vlak = 62% zwart over alles. */
  sluier?: Sluier;
  /** breed = 16/9, portret = 4/5, vierkant = 1/1. */
  verhouding?: Verhouding;
  /** onder = tekst onderin; zij = tekst links gecentreerd. */
  positie?: 'onder' | 'zij';
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

const verhoudingKlasse: Record<Verhouding, string> = {
  breed: 'aspect-video',
  portret: 'aspect-4/5',
  vierkant: 'aspect-square',
};

export default function Beeldvlak({
  bron,
  alt = '',
  sluier = 'onder',
  verhouding = 'breed',
  positie = 'onder',
  children,
}: BeeldvlakProps) {
  return (
    <div className="relative block overflow-hidden bg-inkt">
      <img src={bron} alt={alt} className="absolute inset-0 size-full object-cover" />
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
