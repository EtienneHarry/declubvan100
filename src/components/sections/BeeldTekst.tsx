import {
  achtergrondKlasse,
  breedteKlasse,
  ruimteKlasse,
  type AchtergrondToken,
  type BreedteToken,
  type RuimteToken,
} from '../../lib/tokens';

export interface Beeld {
  bron: string;
  alt: string;
}

export interface BeeldTekstProps {
  achtergrond: AchtergrondToken;
  ruimte: RuimteToken;
  breedte: BreedteToken;
  kop: string;
  tekst?: string;
  beeld?: Beeld;
  beeldPositie?: 'links' | 'rechts';
}

/**
 * Beeld naast tekst.
 *
 * Onder de md-breekpunt staan beeld en tekst altijd onder elkaar. Ontbreekt
 * het beeld, dan valt de beeldkolom helemaal weg en loopt de tekst over de
 * volle breedte door — geen leeg vlak en geen gebroken afbeelding.
 */
export default function BeeldTekst({
  achtergrond,
  ruimte,
  breedte,
  kop,
  tekst,
  beeld,
  beeldPositie = 'links',
}: BeeldTekstProps) {
  const heeftTekst = Boolean(tekst?.trim());
  const heeftBeeld = Boolean(beeld?.bron.trim());
  const beeldOrde = beeldPositie === 'rechts' ? 'md:order-2' : 'md:order-1';
  const tekstOrde = beeldPositie === 'rechts' ? 'md:order-1' : 'md:order-2';
  const rasterKlasse = heeftBeeld ? 'md:grid-cols-2' : 'md:grid-cols-1';

  return (
    <section className={`${achtergrondKlasse[achtergrond]} ${ruimteKlasse[ruimte]}`}>
      <div
        className={`mx-auto grid grid-cols-1 items-center gap-8 px-6 ${rasterKlasse} ${breedteKlasse[breedte]}`}
      >
        {beeld && heeftBeeld ? (
          <div className={beeldOrde}>
            <img
              src={beeld.bron}
              alt={beeld.alt}
              className="aspect-video w-full rounded-zacht object-cover"
            />
          </div>
        ) : null}
        <div className={heeftBeeld ? tekstOrde : undefined}>
          <h2 className="font-kop text-kop-m text-balance break-words">{kop}</h2>
          {heeftTekst ? (
            <p className="mt-4 font-basis text-lopend text-tekst-zacht">{tekst}</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
