import {
  achtergrondKlasse,
  breedteKlasse,
  ruimteKlasse,
  type AchtergrondToken,
  type BreedteToken,
  type RuimteToken,
} from '../../lib/tokens';

export interface KopTekstProps {
  achtergrond: AchtergrondToken;
  ruimte: RuimteToken;
  breedte: BreedteToken;
  kop: string;
  tekst?: string;
}

/**
 * Kop met optionele lopende tekst.
 *
 * Verdraagt een kop van elke lengte en laat de alinea weg als er geen tekst
 * is, zodat er geen lege ruimte overblijft.
 */
export default function KopTekst({
  achtergrond,
  ruimte,
  breedte,
  kop,
  tekst,
}: KopTekstProps) {
  const heeftTekst = Boolean(tekst?.trim());

  return (
    <section className={`${achtergrondKlasse[achtergrond]} ${ruimteKlasse[ruimte]}`}>
      <div className={`mx-auto px-6 ${breedteKlasse[breedte]}`}>
        <h2 className="font-kop text-kop-l text-balance break-words">{kop}</h2>
        {heeftTekst ? (
          <p className="mt-6 max-w-smal font-basis text-lopend text-tekst-zacht">{tekst}</p>
        ) : null}
      </div>
    </section>
  );
}
