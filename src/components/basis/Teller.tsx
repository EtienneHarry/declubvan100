export interface TellerProps {
  /** De koptekst. Het eerste getal erin wordt de teller. */
  tekst: string;
}

/*
 * Een kop waarin het getal van 0 naar zijn eindwaarde telt.
 *
 * Los component en geen optie op Hero. Hero geeft zijn kop hier doorheen en
 * weet verder van niets; wie het gedrag wil begrijpen, hoeft maar één bestand
 * te lezen.
 *
 * HET GETAL STAAT LETTERLIJK IN DE HTML. Dit component rendert 100, niet 0. De
 * animatie loopt de andere kant op: het script zet hem bij het starten op 0 en
 * telt terug naar wat er al stond. Zonder JavaScript, in de broncode en in een
 * zoekmachine staat er dus gewoon 100.
 *
 * Er zit geen script in dit bestand. Een <script> in een React-component belandt
 * inline in de HTML, en dat blokkeert `script-src 'self'`. Het script staat in
 * TellerScript.astro, waar Astro er een gewoon bestand van maakt.
 *
 * Toegankelijkheid: het tellende deel staat op aria-hidden, want anders leest
 * een schermlezer honderd keer een nieuw getal voor. Daarnaast staat het
 * eindgetal er nog een keer, alleen voor schermlezers.
 */
export default function Teller({ tekst }: TellerProps) {
  const treffer = /\d+/.exec(tekst);

  // Geen getal in de kop: niets te tellen, en dan ook geen extra elementen.
  if (!treffer) return <>{tekst}</>;

  const voor = tekst.slice(0, treffer.index);
  const getal = treffer[0];
  const na = tekst.slice(treffer.index + getal.length);

  return (
    <>
      {voor}
      <span
        data-teller
        aria-hidden="true"
        className="inline-block w-[var(--maat-teller)] text-right tabular-nums"
      >
        {getal}
      </span>
      <span className="sr-only">{getal}</span>
      {na}
    </>
  );
}
