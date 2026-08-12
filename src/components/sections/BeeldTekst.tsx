import {
  achtergrondKlasse,
  breedteKlasse,
  isLichteAchtergrond,
  maatRegelKlasse,
  ruimteKlasse,
  verhoudingKlasse,
  type AchtergrondToken,
  type BreedteToken,
  type RuimteToken,
  type VerhoudingToken,
} from '../../lib/tokens';
import type { KopNiveau } from '../../lib/SectionRenderer';
import Bovenkop from '../basis/Bovenkop';

export interface BeeldTekstProps {
  achtergrond: AchtergrondToken;
  ruimte: RuimteToken;
  breedte: BreedteToken;
  bovenkop?: string;
  kop: string;
  tekst?: string;
  beeld?: { bron: string; alt: string };
  beeldPositie?: 'links' | 'rechts';
  /** De drie uit de beeldrichtlijn. Standaard 16:9, zoals het hiervoor vastlag. */
  verhouding?: VerhoudingToken;
  /** Gezet door SectieLijst; 1 als deze sectie de pagina opent. */
  kopNiveau?: KopNiveau;
}

/*
 * Beeld naast tekst.
 *
 * Hier staat de tekst náást het beeld, niet erop, dus dit gaat bewust niet via
 * Beeldvlak: dat component bestaat om de sluier onder tekst-op-beeld af te
 * dwingen en zou de foto hier zonder reden verduisteren.
 *
 * Ontbreekt het beeld, dan valt de beeldkolom helemaal weg en loopt de tekst
 * over de volle breedte door — geen leeg vlak en geen gebroken afbeelding.
 *
 * De verhouding stond hier eerst hard op 16:9. Dat was de uitzondering: de
 * beeldrichtlijn kent er drie en Beeldvlak bood ze al aan. Nu leest dit
 * component dezelfde tabel uit tokens.ts. Dat is geen overbodige keuze — het
 * merendeel van de aangeleverde fotografie is staand, en 16:9 sneed daar
 * gemeten 63% van de hoogte af.
 */
export default function BeeldTekst({
  achtergrond,
  ruimte,
  breedte,
  bovenkop,
  kop,
  tekst,
  beeld,
  beeldPositie = 'links',
  verhouding = 'breed',
  kopNiveau = 2,
}: BeeldTekstProps) {
  const Kop = kopNiveau === 1 ? 'h1' : 'h2';
  const heeftBeeld = Boolean(beeld?.bron.trim());
  const beeldOrde = beeldPositie === 'rechts' ? 'md:order-2' : 'md:order-1';
  const tekstOrde = beeldPositie === 'rechts' ? 'md:order-1' : 'md:order-2';

  return (
    <section
      className={`${achtergrondKlasse[achtergrond]} ${ruimteKlasse[ruimte]}`}
      data-thema={isLichteAchtergrond[achtergrond] ? 'licht' : undefined}
    >
      <div className={breedteKlasse[breedte]}>
        <div
          className={`grid grid-cols-1 items-center gap-8 ${heeftBeeld ? 'md:grid-cols-2' : 'md:grid-cols-1'}`}
        >
          {beeld && heeftBeeld ? (
            <div className={beeldOrde}>
              <img
                src={beeld.bron}
                alt={beeld.alt}
                className={`${verhoudingKlasse[verhouding]} w-full rounded-none object-cover`}
              />
            </div>
          ) : null}
          <div className={heeftBeeld ? tekstOrde : undefined}>
            {bovenkop?.trim() ? <Bovenkop>{bovenkop}</Bovenkop> : null}
            <Kop className="mt-4 text-kop-l text-balance break-words first:mt-0">{kop}</Kop>
            {tekst?.trim() ? (
              <p className={`mt-4 text-lopend-m text-tekst-zacht ${maatRegelKlasse[achtergrond]}`}>
                {tekst}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
