import {
  achtergrondKlasse,
  breedteKlasse,
  isLichteAchtergrond,
  maatRegelKlasse,
  ruimteKlasse,
  type AchtergrondToken,
  type KnopkleurToken,
  type BreedteToken,
  type RuimteToken,
} from '../../lib/tokens';
import type { KopNiveau } from '../../lib/SectionRenderer';
import { ploeg } from '../../lib/beweging';
import Bovenkop from '../basis/Bovenkop';
import Koptekst from '../basis/Koptekst';
import Knop from '../basis/Knop';

export interface OproepProps {
  achtergrond: AchtergrondToken;
  ruimte: RuimteToken;
  breedte: BreedteToken;
  bovenkop?: string;
  kop: string;
  tekst?: string;
  knop?: { label: string; href: string };
  /**
   * De kleur van de gevulde knop, als doelgroepcode: `vuur` voor inhuren,
   * `inkt` voor aanmelden. Zie KNOPKLEUR_TOKENS in lib/tokens.
   */
  knopKleur?: KnopkleurToken;
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
  knopKleur = 'vuur',
  tweedeKnop,
  kopNiveau = 2,
}: OproepProps) {
  const Kop = kopNiveau === 1 ? 'h1' : 'h2';

  // Bovenkop, kop, tekst, dan de knoppen: de actie komt als laatste binnen.
  const volgende = ploeg();

  return (
    <section
      className={`${achtergrondKlasse[achtergrond]} ${ruimteKlasse[ruimte]}`}
      data-thema={isLichteAchtergrond[achtergrond] ? 'licht' : undefined}
    >
      <div className={breedteKlasse[breedte]}>
        {bovenkop?.trim() ? <Bovenkop stap={volgende()}>{bovenkop}</Bovenkop> : null}
        <Kop
          data-onthul="kop"
          data-onthul-stap={volgende()}
          className="mt-4 text-display-l text-balance break-words first:mt-0"
        >
          <Koptekst tekst={kop} />
        </Kop>
        {tekst?.trim() ? (
          <p
            data-onthul="blok"
            data-onthul-stap={volgende()}
            className={`mt-6 text-lopend-l text-tekst-zacht ${maatRegelKlasse[achtergrond]}`}
          >
            {tekst}
          </p>
        ) : null}
        {knop || tweedeKnop ? (
          <div
            data-onthul="blok"
            data-onthul-stap={volgende()}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            {/*
              De primaire actie staat sinds de restyle op vuur. Dat is de knop uit de
              mockup, en het is de enige plek waar die kleur op de site terechtkomt: als
              vlak, met witte tekst, nooit als woord op bruin.

              De tweede actie blijft een lijnknop. De mockup zet er twee gevulde naast
              elkaar — zwart en rood — maar welke van de twee acties op deze pagina
              welke kleur verdient, hangt aan de nieuwe koppen en die komen pas in
              sessie 2. Tot die tijd blijft de regel staan die er al was: één gevulde
              knop per blikveld.
            */}
            {knop ? (
              <Knop variant={knopKleur} maat="l" href={knop.href}>
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
