import Markdoc, { type Node, type RenderableTreeNode } from '@markdoc/markdoc';
import { Fragment, type ReactNode } from 'react';

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
import Bliksem from '../merk/Bliksem';

export interface RijkeTekstProps {
  achtergrond: AchtergrondToken;
  ruimte: RuimteToken;
  breedte: BreedteToken;
  kop?: string;
  /** De tekst als markdoc-boom. In het CMS is dit een markdoc.inline-veld. */
  inhoud: Node;
  /**
   * Zet de bliksemschicht als opsommingsteken. Alleen voor lijsten die over de
   * 100 of de selectie gaan — een lijst met openingstijden krijgt hem niet.
   */
  schichtLijst?: boolean;
}

/*
 * Lopende tekst met koppen en lijsten, voor de voorwaardenpagina.
 *
 * De inhoud komt als markdoc binnen en blijft daarmee leesbare markdown in de
 * repo, ook als je het CMS nooit opent. Er gaat geen ongecontroleerde HTML de
 * pagina in: hieronder staat precies welke elementen er kunnen ontstaan, en
 * alles wat markdoc verder kent valt terug op enkel zijn tekst.
 *
 * Het kopniveau hangt af van de sectiekop erboven. Heeft de sectie een eigen
 * kop, dan is dat de <h2> en zakken de koppen in de tekst een niveau. Heeft ze
 * er geen, dan zijn de koppen in de tekst zelf het bovenste niveau — anders
 * springt de pagina van de <h1> van de hero rechtstreeks naar <h3>.
 */

/** De koppen die de redacteur kan zetten, en waar ze op uitkomen. */
const KOP_KLASSE: Record<2 | 3 | 4, string> = {
  2: 'mt-10 text-kop-m',
  3: 'mt-8 text-kop-s',
  4: 'mt-6 text-kop-s',
};

export default function RijkeTekst({
  achtergrond,
  ruimte,
  breedte,
  kop,
  inhoud,
  schichtLijst = false,
}: RijkeTekstProps) {
  const maat = maatRegelKlasse[achtergrond];
  const heeftSectieKop = Boolean(kop?.trim());
  const verschuiving = heeftSectieKop ? 1 : 0;

  const boom = Markdoc.transform(inhoud);

  function render(knoop: RenderableTreeNode, sleutel: string): ReactNode {
    if (knoop === null || knoop === undefined || typeof knoop === 'boolean') return null;
    if (typeof knoop === 'string' || typeof knoop === 'number') return knoop;

    if (Array.isArray(knoop)) {
      return knoop.map((kind, index) => render(kind, `${sleutel}-${index}`));
    }

    // isTag is de enige betrouwbare test. Een gewoon object met een `name` kan
    // ook een attributenbundel zijn, en dan bestaat `children` niet.
    if (!Markdoc.Tag.isTag(knoop)) return null;

    const naam = String(knoop.name);
    const attributen = (knoop.attributes ?? {}) as Record<string, unknown>;
    const kinderen = (knoop.children ?? []).map((kind, index) =>
      render(kind, `${sleutel}-${index}`),
    );

    /*
     * De wortel van elke markdoc-boom heet `article`. Die hoort geen element op
     * te leveren: de sectie zet er zelf al een <div> omheen, en een tweede
     * omhulsel zou de koppen en lijsten een niveau dieper zetten dan bedoeld.
     */
    if (naam === 'article') return <Fragment key={sleutel}>{kinderen}</Fragment>;

    // Koppen. h1 kan hier niet ontstaan: het schema laat alleen 2 en 3 toe, en
    // h1 hoort bij de openingssectie.
    const kopTreffer = /^h([1-6])$/.exec(naam);
    if (kopTreffer) {
      const bron = Number(kopTreffer[1]);
      const niveau = Math.min(Math.max(bron + verschuiving, 2), 4) as 2 | 3 | 4;
      const Tag = `h${niveau}` as 'h2' | 'h3' | 'h4';

      return (
        <Tag key={sleutel} className={`${KOP_KLASSE[niveau]} text-balance break-words ${maat}`}>
          {kinderen}
        </Tag>
      );
    }

    if (naam === 'p') {
      return (
        <p key={sleutel} className={`mt-4 text-lopend-m text-tekst-zacht ${maat}`}>
          {kinderen}
        </p>
      );
    }

    if (naam === 'ul' || naam === 'ol') {
      const Tag = naam;
      return (
        <Tag key={sleutel} className={`mt-4 flex list-none flex-col gap-3 p-0 ${maat}`}>
          {kinderen}
        </Tag>
      );
    }

    if (naam === 'li') {
      return (
        <li key={sleutel} className="flex items-start gap-3">
          {schichtLijst ? (
            <span className="mt-1 flex text-tekst-zacht">
              <Bliksem rol="opsomming" />
            </span>
          ) : (
            <span aria-hidden="true" className="mt-2 block size-1 shrink-0 bg-tekst-stil" />
          )}
          <span className="text-lopend-m text-tekst-zacht">{kinderen}</span>
        </li>
      );
    }

    if (naam === 'strong') return <strong key={sleutel}>{kinderen}</strong>;
    if (naam === 'em') return <em key={sleutel}>{kinderen}</em>;

    // Een harde regelafbreking binnen een alinea. Nodig voor blokjes die op
    // aparte regels horen maar één alinea zijn, zoals een adres.
    if (naam === 'br') return <br key={sleutel} />;

    if (naam === 'a') {
      const href = typeof attributen['href'] === 'string' ? attributen['href'] : undefined;
      return (
        <a key={sleutel} href={href}>
          {kinderen}
        </a>
      );
    }

    /*
     * Alles wat we niet kennen levert alleen zijn tekst op, zonder omhulsel.
     *
     * Dit stond op <span> en dat was fout: de wortel viel er ook in, dus alle
     * koppen en lijsten zaten in een span. Een span mag geen blokelementen
     * bevatten — de pagina rendert wel, maar de HTML is ongeldig en je ziet het
     * nergens aan. Een fragment kan die fout niet maken.
     */
    return <Fragment key={sleutel}>{kinderen}</Fragment>;
  }

  return (
    <section
      className={`${achtergrondKlasse[achtergrond]} ${ruimteKlasse[ruimte]}`}
      data-thema={isLichteAchtergrond[achtergrond] ? 'licht' : undefined}
    >
      <div className={breedteKlasse[breedte]}>
        {heeftSectieKop ? <h2 className="text-kop-l text-balance break-words">{kop}</h2> : null}
        {render(boom, 'r')}
      </div>
    </section>
  );
}
