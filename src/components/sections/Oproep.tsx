import {
  achtergrondKlasse,
  breedteKlasse,
  isLichteAchtergrond,
  maatRegelKlasse,
  ruimteKlasse,
  type AchtergrondToken,
  type BreedteToken,
  type RuimteToken,
} from '../../lib/tokens';
import type { KopNiveau } from '../../lib/SectionRenderer';
import Bovenkop from '../basis/Bovenkop';
import Knop from '../basis/Knop';

export interface OproepProps {
  achtergrond: AchtergrondToken;
  ruimte: RuimteToken;
  breedte: BreedteToken;
  bovenkop?: string;
  kop: string;
  tekst?: string;
  knop?: { label: string; href: string };
  tweedeKnop?: { label: string; href: string };
  /** Gezet door SectieLijst; 1 als deze sectie de pagina opent. */
  kopNiveau?: KopNiveau;
}

/**
 * Afsluitend blok met een actie.
 *
 * Eén gevulde knop per blikveld, dus een tweede actie komt er als lijnknop bij.
 * Ontbreekt de knop, dan blijft het een kop met tekst — de sectie valt niet om.
 */
export default function Oproep({
  achtergrond,
  ruimte,
  breedte,
  bovenkop,
  kop,
  tekst,
  knop,
  tweedeKnop,
  kopNiveau = 2,
}: OproepProps) {
  const Kop = kopNiveau === 1 ? 'h1' : 'h2';

  return (
    <section
      className={`${achtergrondKlasse[achtergrond]} ${ruimteKlasse[ruimte]}`}
      data-thema={isLichteAchtergrond[achtergrond] ? 'licht' : undefined}
    >
      <div className={breedteKlasse[breedte]}>
        {bovenkop?.trim() ? <Bovenkop>{bovenkop}</Bovenkop> : null}
        <Kop className="mt-4 text-display-l text-balance break-words first:mt-0">{kop}</Kop>
        {tekst?.trim() ? (
          <p className={`mt-6 text-lopend-l text-tekst-zacht ${maatRegelKlasse[achtergrond]}`}>
            {tekst}
          </p>
        ) : null}
        {knop || tweedeKnop ? (
          <div className="mt-10 flex flex-wrap items-center gap-4">
            {knop ? (
              <Knop variant="vol" maat="l" href={knop.href}>
                {knop.label}
              </Knop>
            ) : null}
            {tweedeKnop ? (
              <Knop variant="lijn" maat="l" href={tweedeKnop.href}>
                {tweedeKnop.label}
              </Knop>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
