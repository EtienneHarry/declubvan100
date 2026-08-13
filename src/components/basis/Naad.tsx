import {
  achtergrondKlasse,
  breedteKlasse,
  isLichteAchtergrond,
  type AchtergrondToken,
  type BreedteToken,
} from '../../lib/tokens';

export interface NaadProps {
  /** Van de sectie eronder: de naad is haar bovenrand, niet de voet van de vorige. */
  achtergrond: AchtergrondToken;
  /** Ook van de sectie eronder, zodat de lijn uitlijnt met wat hij aankondigt. */
  breedte: BreedteToken;
}

/*
 * De naad tussen twee secties: een haarlijn die zichzelf trekt zodra hij in
 * beeld komt.
 *
 * Dit is de lijnhelft van rol 2 van de bliksemschicht. De schicht zelf zit er
 * nog niet in: de richtlijn staat er hoogstens twee per pagina toe, en welke
 * twee dat zijn is een redactionele keuze per pagina. Komt hij er, dan komt hij
 * hier binnen — niet in een tweede component.
 *
 * VIER DINGEN DIE HIER MET OPZET NIET STAAN:
 *
 * 1. Geen eigen stap in de ploeg. De naad staat hoger op de pagina dan de
 *    bovenkop eronder en haalt de drempel dus vanzelf eerder; hij wordt de
 *    nulde tel zonder dat iemand hem hoeft in te delen. Een eigen stap zou
 *    betekenen dat elke sectie op 1 moet beginnen, en dat is een prop door alle
 *    acht sectietypes voor 70ms winst.
 *
 * 2. Geen eigen gereduceerde-bewegingstak. Hij leunt op data-onthul, dus hij
 *    erft de enige tak die er is: geen vlagje op <html>, geen verborgen
 *    begintoestand, lijn staat er gewoon. Zie src/styles/beweging.css.
 *
 * 3. Geen nieuwe tokens. Kleur en dikte zijn --lijn en --lijn-dikte, de curve
 *    en de duur zijn die van de binnenkomst.
 *
 * 4. Niet in de toegankelijkheidsboom. De koppen structureren de pagina al; een
 *    zestiende separator erbij is ruis voor wie met een schermlezer door de
 *    elementen loopt. De oude Scheiding stond op role="separator" — dat was
 *    verdedigbaar als vervanger van een <hr>, maar tussen twee <section>-
 *    elementen die allebei een kop dragen, voegt hij niets toe.
 *
 * Hij schildert zijn eigen achtergrond, net als een sectie. Zonder die
 * achtergrond zou de strook van één pixel op de bodykleur staan, en dat is op
 * een lichte pagina een donkere streep tussen twee lichte vlakken.
 *
 * De klasse aan het eind vangt de sectie die niets rendert. Een rijke-tekst
 * zonder kop en zonder inhoud levert geen <section> op, en dan blijft zijn naad
 * achter als losse streep. Gemeten op /secties: precies één geval.
 *
 * Dat wordt met een selector opgelost en niet met een uitzondering in
 * SectieLijst, want die zou moeten weten wat RijkeTekst gaat renderen — dus
 * dezelfde voorwaarde op twee plekken, en dat loopt uit elkaar. `:has()` kan
 * het rechtstreeks vragen: staat er geen sectie achter me, dan hoor ik er niet.
 */
export default function Naad({ achtergrond, breedte }: NaadProps) {
  return (
    <div
      data-naad=""
      aria-hidden="true"
      data-thema={isLichteAchtergrond[achtergrond] ? 'licht' : undefined}
      className={`${achtergrondKlasse[achtergrond]} [&:not(:has(+_section))]:hidden`}
    >
      <div className={breedteKlasse[breedte]}>
        <span
          data-onthul="naad"
          className="block h-[var(--lijn-dikte)] origin-left bg-lijn"
        />
      </div>
    </div>
  );
}
