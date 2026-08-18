import { Fragment, type ReactNode } from 'react';

import Ovaal from '../merk/Ovaal';
import Streep from '../merk/Streep';
import Teller from './Teller';

export interface KoptekstProps {
  /** De kop zoals de redacteur hem heeft ingetypt, inclusief eventuele haakjes. */
  tekst: string;
  /**
   * Laat het eerste getal in de kop naar boven tellen. Alleen de openingssectie
   * doet dat; zie Teller.
   */
  teller?: boolean;
}

/*
 * De kop van een sectie, met de haal erin.
 *
 * DE CONVENTIE. De redacteur zet haakjes om de woordgroep die een haal krijgt:
 *
 *   [1 van de 100]   →  de ovaal eromheen
 *   {beter is.}      →  het onderstreepje eronder
 *
 * Dit is de uitkomst van de vraag die B8 sessie 1 open liet: `Ovaal` en `Streep`
 * bestonden wel, maar er was geen manier om ze vanuit het CMS te plaatsen. Een
 * sectiekop is daar één tekstveld, en een tweede veld ernaast ("welk deel van de
 * kop krijgt de ovaal") zou per sectietype terug moeten komen en alleen werken
 * zolang die woordgroep letterlijk in de kop staat. Een markering ín de tekst
 * blijft kloppen als de kop verandert, want ze verhuist mee.
 *
 * VIER REGELS, EN ZE KOMEN ALLE VIER OP HETZELFDE NEER: WAT NIET OMGEZET WORDT,
 * BLIJFT STAAN ZOALS JE HET TYPTE.
 *
 * 1. Een haakje zonder sluiting is gewone tekst. `Kosten [vanaf 2026` levert
 *    precies die letters op, haakje incluis.
 * 2. Een leeg paar is gewone tekst. `[]` is geen ovaal om niets.
 * 3. Een tweede paar van dezelfde soort is gewone tekst. Het design system
 *    staat één ovaal en één streep per sectie toe, en een sectie heeft één kop.
 * 4. Wat er wél omheen mag, mag er allebei omheen: één ovaal én één streep in
 *    dezelfde kop is toegestaan.
 *
 * Die derde regel is met opzet zichtbaar en niet stil. Een tweede ovaal die
 * gewoon verdwijnt, laat de redacteur denken dat het gelukt is; een tweede
 * ovaal die als `[woorden]` op de pagina staat, is meteen te zien en te
 * repareren. Het is bovendien dezelfde uitkomst als bij een vergeten sluiting,
 * dus er is maar één regel te onthouden.
 *
 * WAAR HIJ WEL EN NIET STAAT. Alleen op de kop van een sectie — hero, kop-tekst,
 * beeld-tekst, drie-kolommen, oproep, rijke-tekst en accordeon. Niet op de
 * koppen van de twee deuren in een splitscreen en niet op een kaartkop: die
 * komen per sectie meerdere keren voor, en dan zouden er twee ovalen in één
 * blikveld kunnen staan. De regel "maximaal één per sectie" volgt zo uit waar
 * dit component staat, en hoeft nergens geteld te worden.
 *
 * DE TELLER LOOPT ALLEEN OVER GEWONE TEKST. Een getal binnen een haal telt niet
 * mee — die woordgroep is aangewezen, niet opgeteld, en twee effecten op
 * dezelfde vier tekens vechten om de aandacht. In de praktijk is dat geen
 * beperking: de tellende kop is "De Club van 100" en die heeft geen haal.
 */

type Vorm = 'ovaal' | 'streep';

/**
 * Het tekenpaar per motief. Vierkante haken zijn de ovaal — ze staan óm iets
 * heen, net als de ovaal zelf. Accolades zijn de streep.
 *
 * Beide paren komen in gewone Nederlandse koppen zo goed als nooit voor, en dat
 * is de reden dat het deze twee zijn en niet bijvoorbeeld ronde haakjes.
 */
const TEKENPAREN: Record<string, { sluit: string; vorm: Vorm }> = {
  '[': { sluit: ']', vorm: 'ovaal' },
  '{': { sluit: '}', vorm: 'streep' },
};

interface Deel {
  vorm: Vorm | 'tekst';
  tekst: string;
}

/**
 * Knipt de kop in stukken. Losse functie zodat de regels hierboven op één plek
 * staan en niet verspreid over de JSX.
 *
 * Loopt één keer van links naar rechts. Bij een openingsteken wordt gekeken of
 * er verderop een sluitteken staat; zo niet, of is die soort al gebruikt, dan
 * is het teken gewoon een teken en gaat de lus verder.
 */
export function knipKop(tekst: string): Deel[] {
  const delen: Deel[] = [];
  const gebruikt = new Set<Vorm>();
  let buffer = '';
  let i = 0;

  const legBufferWeg = () => {
    if (buffer) delen.push({ vorm: 'tekst', tekst: buffer });
    buffer = '';
  };

  while (i < tekst.length) {
    const teken = tekst[i] as string;
    const paar = TEKENPAREN[teken];

    if (paar && !gebruikt.has(paar.vorm)) {
      const eind = tekst.indexOf(paar.sluit, i + 1);
      const inhoud = eind === -1 ? '' : tekst.slice(i + 1, eind);

      if (eind !== -1 && inhoud.trim()) {
        legBufferWeg();
        delen.push({ vorm: paar.vorm, tekst: inhoud });
        gebruikt.add(paar.vorm);
        i = eind + 1;
        continue;
      }
    }

    buffer += teken;
    i += 1;
  }

  legBufferWeg();

  return delen;
}

export default function Koptekst({ tekst, teller = false }: KoptekstProps) {
  const delen = knipKop(tekst);
  let tellerGezet = false;

  /*
   * Geen enkele haal en geen teller: dan is dit letterlijk de string die
   * binnenkwam. Geen extra element, geen fragment per deel — een kop zonder
   * markering hoort in de HTML niet te zien te zijn aan de uitvoer.
   */
  if (!teller && delen.length === 1 && delen[0]?.vorm === 'tekst') return <>{tekst}</>;

  return (
    <>
      {delen.map((deel, index): ReactNode => {
        const sleutel = `${deel.vorm}-${index}`;

        if (deel.vorm === 'ovaal') return <Ovaal key={sleutel}>{deel.tekst}</Ovaal>;
        if (deel.vorm === 'streep') return <Streep key={sleutel}>{deel.tekst}</Streep>;

        if (teller && !tellerGezet && /\d/.test(deel.tekst)) {
          tellerGezet = true;
          return <Teller key={sleutel} tekst={deel.tekst} />;
        }

        return <Fragment key={sleutel}>{deel.tekst}</Fragment>;
      })}
    </>
  );
}
