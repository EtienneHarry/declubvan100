import type { ReactNode } from 'react';

export interface StreepProps {
  /** De woordgroep waar de streep onder komt. Meestal het slot van een kop. */
  children: ReactNode;
}

/*
 * Het onderstreepje: een losse, licht scheve haal onder een kop.
 *
 * Het derde grafische motief uit de mockup — "NODIG HEBT.", "BETER IS." — en de
 * kleine broer van de ovaal. Zelfde familie, zelfde tekenlogica, zelfde curve,
 * alleen korter: 350ms tegen 450, want de streep is korter.
 *
 * MAG VAKER DAN DE OVAAL, MAAR NOG STEEDS MAXIMAAL ÉÉN PER SECTIE. Een ovaal
 * wijst iets aan en verdient daarom schaarste over de hele pagina; een streep
 * bevestigt een slotzin en mag dus in meer secties staan. Twee in dezelfde
 * sectie is in allebei de gevallen te veel.
 *
 * Alles wat hij met de ovaal deelt — de pasvorm, de kleur, de dikte, het
 * tekenen — staat in src/styles/haal.css. Wat hier staat is het pad en waar
 * het hangt. Zie Ovaal.tsx voor waarom er drie attributen op de svg staan die
 * eruitzien alsof ze weg kunnen: `preserveAspectRatio="none"`,
 * `vector-effect="non-scaling-stroke"` en `pathLength="100"`, plus een breedte
 * én een hoogte die allebei uitgeschreven staan.
 *
 * DE STREEP HANGT ONDER DE STAARTEN EN NIET ERDOOR. De inset van 0,42em is
 * gemeten en niet gekozen: het regelvak van een displaykop staat op een
 * regelhoogte onder 1, dus de letters steken er onderuit. Met de eerste waarde
 * (0,22em) begon de lijn 13,9px bóven de onderkant van de letters op een kop van
 * 76,8px, en liep hij dwars door de staart van een p en een g. Op 0,42em begint
 * hij er 4,5px onder, en op een kop van 41px 5,2px. Dat is dezelfde afweging als
 * het masker van een kop, dat om dezelfde reden 12% doorloopt.
 */

/*
 * Eén haal van links naar rechts, iets omhoog en met een knikje halverwege.
 *
 * Het scheve is er met opzet: een streep die precies waterpas loopt, leest als
 * een rand of een onderstreping van de browser. Deze loopt van 10 naar 2 in een
 * viewBox van 12 hoog, dus hij eindigt merkbaar hoger dan hij begint.
 *
 * Twee segmenten en niet één. Een enkele boog is te regelmatig; de knik op 68
 * is waar de hand van richting verandert, en dat is precies wat een boog niet
 * heeft.
 */
const PAD = 'M 2 10 C 26 5.5, 48 4.6, 68 4.2 C 82 3.9, 92 3.4, 99 2';

export default function Streep({ children }: StreepProps) {
  return (
    <span data-haal="streep" data-onthul="haal" className="relative inline-block">
      {/*
        Zelfde als bij de ovaal: de tekst blijft inline, want dat is wat
        HaalScript meet. Breekt hij over twee regels, dan zou de streep er
        schuin doorheen lopen en hoort hij er niet te staan.
      */}
      <span data-haal-tekst="" className="relative">
        {children}
      </span>
      <svg
        aria-hidden="true"
        viewBox="0 0 100 12"
        preserveAspectRatio="none"
        className="pointer-events-none absolute -bottom-[0.42em] -left-[0.04em] h-[0.3em] w-[calc(100%_+_0.08em)] max-w-none"
      >
        <path
          data-haal-lijn=""
          d={PAD}
          fill="none"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          pathLength="100"
          strokeDasharray="100"
        />
      </svg>
    </span>
  );
}
