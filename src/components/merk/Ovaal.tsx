import type { ReactNode } from 'react';

export interface OvaalProps {
  /** De woordgroep waar de ovaal omheen komt. Kort houden: één of twee woorden. */
  children: ReactNode;
}

/*
 * De ovaal: een met de hand getrokken ellips om een woordgroep heen.
 *
 * Het tweede grafische motief uit de mockup, naast de bliksemschicht — "1 van
 * de 100", "hele agenda". Hij hoort bij dezelfde familie: één beweging, geen
 * constructie, en dus geen nette ellips maar een haal die scheef loopt en aan
 * het eind over zijn eigen begin heen schiet.
 *
 * MAXIMAAL ÉÉN PER SECTIE. Dat is dezelfde soort regel als bij de schicht en
 * hij is net zomin af te dwingen in code: twee ovalen in één blikveld maken er
 * een stijlmiddel van in plaats van een aanwijzing. Zet er een tweede neer en
 * hij wijst nergens meer naar.
 *
 * DRIE DINGEN DIE HIER MET OPZET STAAN ZOALS ZE STAAN:
 *
 * 1. `preserveAspectRatio="none"` plus `vector-effect="non-scaling-stroke"`.
 *    De ovaal moet zich om een woordgroep van elke lengte spannen, dus hij rekt
 *    in de breedte mee. Zonder het tweede attribuut rekt de lijn dan mee: de
 *    zijkanten worden dik en de boven- en onderkant dun. Met non-scaling-stroke
 *    blijft de dikte overal gelijk en is alleen de vórm uitgerekt — precies wat
 *    een hand doet die een lang woord omcirkelt.
 *
 * 2. GEEN `pathLength` en geen vaste `stroke-dasharray`. Die stonden er en ze
 *    waren fout: Chrome negeert pathLength zodra non-scaling-stroke op het pad
 *    staat en rekent de dash in schérmruimte — gemeten gaf dat een gat van 45
 *    tot 80% in de lijn. HaalScript meet daarom de echte schermlengte en zet
 *    die als presentatie-attribuut; zie src/styles/haal.css.
 *
 * 3. `max-w-none` en een uitgerekende hoogte. De reset in tokens.css zet
 *    `max-width: 100%` op elke svg, en deze svg is met opzet breder dan zijn
 *    ouder — hij staat op negatieve insets, want de lijn hoort ruim om de tekst
 *    heen en niet ertegenaan. Zonder `max-w-none` knijpt de reset hem terug tot
 *    de tekstbreedte en raakt de lijn de letters.
 *
 *    Breedte én hoogte staan er uitgeschreven, en dat is geen dubbelop maar
 *    gemeten. Een svg is een vervangen element met een eigen verhouding, en die
 *    verhouding wint van een insetpaar zodra de andere maat op `auto` staat.
 *    Met alleen insets werd het vlak om een kop van 467 bij 73 pixels 531 bij
 *    319 — de hoogte kwam uit het viewBox. Met alleen een hoogte erbij werd het
 *    173 bij 104: nu kwam de bréédte eruit. Allebei uitschrijven is de enige
 *    vorm die op geen van beide assen terugvalt.
 *
 * De pasvorm en het tekenen staan niet hier maar in src/styles/haal.css, samen
 * met de streep. Wat hier staat is het pad.
 */

/*
 * Eén doorlopende haal, linksboven begonnen en met de klok mee.
 *
 * De vijf segmenten zijn de vier kwarten plus het overschot. Dat laatste
 * segment loopt van linksonder omhoog, kruist het eerste segment ergens tussen
 * x 24 en x 37, en houdt pas op als het er voorbij is. Zonder dat overschot
 * sluit de ovaal netjes aan op zijn beginpunt en is het een vorm; mét is het
 * een gebaar dat toevallig ophield.
 *
 * Het viewBox is 100 bij 60 en het pad blijft daar met een marge binnen, want
 * een svg knipt af op zijn viewBox en de lijn heeft ook nog dikte.
 */
const PAD =
  'M 22 11 C 40 3, 68 3, 86 10 C 97 15, 99 30, 90 41 ' +
  'C 78 55, 45 59, 24 54 C 9 49, 1 36, 5 24 C 6 18, 14 14, 46 3';

export default function Ovaal({ children }: OvaalProps) {
  return (
    <span data-haal="ovaal" data-onthul="haal" className="relative inline-block">
      {/*
        De tekst zelf staat in een eigen span, en die is inline gebleven. Dat is
        wat HaalScript meet: een inline element breekt in twee rechthoeken zodra
        het over twee regels loopt, en dan hoort de ovaal er niet te staan.
      */}
      <span data-haal-tekst="" className="relative">
        {children}
      </span>
      <svg
        aria-hidden="true"
        viewBox="0 0 100 60"
        preserveAspectRatio="none"
        className="pointer-events-none absolute -top-[0.2em] -left-[0.42em] h-[calc(100%_+_0.4em)] w-[calc(100%_+_0.84em)] max-w-none"
      >
        <path
          data-haal-lijn=""
          d={PAD}
          fill="none"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </span>
  );
}
