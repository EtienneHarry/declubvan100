import { Fragment } from 'react';

import Naad from '../components/basis/Naad';
import Accordeon, { type AccordeonProps } from '../components/sections/Accordeon';
import BeeldTekst, { type BeeldTekstProps } from '../components/sections/BeeldTekst';
import Citaten, { type CitatenProps } from '../components/sections/Citaten';
import DrieKolommen, { type DrieKolommenProps } from '../components/sections/DrieKolommen';
import Hero, { type HeroProps } from '../components/sections/Hero';
import KopTekst, { type KopTekstProps } from '../components/sections/KopTekst';
import Oproep, { type OproepProps } from '../components/sections/Oproep';
import RijkeTekst, { type RijkeTekstProps } from '../components/sections/RijkeTekst';
import Splitscreen, { type SplitscreenProps } from '../components/sections/Splitscreen';

/*
 * Sectietype naar component.
 *
 * Dit is samen met tokens.ts het enige koppelbestand, en de enige plek waar een
 * sectietype aan een component vastzit. Een nieuwe sectie landt hier in de
 * union én in de switch; vergeet je de switch, dan valt de
 * exhaustiviteitscontrole in de default-tak om en krijg je een compileerfout.
 */

export type Sectie =
  | ({ type: 'hero' } & HeroProps)
  | ({ type: 'splitscreen' } & SplitscreenProps)
  | ({ type: 'kop-tekst' } & KopTekstProps)
  | ({ type: 'beeld-tekst' } & BeeldTekstProps)
  | ({ type: 'drie-kolommen' } & DrieKolommenProps)
  | ({ type: 'citaten' } & CitatenProps)
  | ({ type: 'oproep' } & OproepProps)
  | ({ type: 'rijke-tekst' } & RijkeTekstProps)
  | ({ type: 'accordeon' } & AccordeonProps);

export type SectieType = Sectie['type'];

/**
 * Op welk niveau een sectie haar kop zet. 1 voor de kop die de pagina opent, 2
 * voor alle andere. Wat een sectie binnenin heeft — kaartkoppen, koppen in
 * lopende tekst — zakt daaronder mee.
 */
export type KopNiveau = 1 | 2;

/**
 * Kan deze sectie de kop van de pagina dragen?
 *
 * Alleen een sectie met één kop erboven kan dat. Een splitscreen heeft er twee
 * die naast elkaar staan en geen van beide is de kop van de pagina; citaten
 * hebben er geen. Die twee slaan hun beurt over, en de eerstvolgende sectie die
 * het wel kan, opent de pagina.
 */
function draagtPaginakop(sectie: Sectie): boolean {
  switch (sectie.type) {
    case 'hero':
    case 'kop-tekst':
    case 'beeld-tekst':
    case 'oproep':
      return true;
    case 'drie-kolommen':
    case 'rijke-tekst':
    case 'accordeon':
      return Boolean(sectie.kop?.trim());
    case 'splitscreen':
    case 'citaten':
      return false;
  }
}

/**
 * Een sectietype dat we niet kennen. Tijdens ontwikkeling zichtbaar in beeld,
 * met het type erbij zodat je meteen weet wat er misging. In productie niets:
 * een bezoeker heeft niets aan een foutmelding en een halve pagina is beter
 * dan een kapotte.
 */
function OnbekendType({ type }: { type: string }) {
  if (!import.meta.env.DEV) return null;

  return (
    <div
      role="alert"
      className="mx-auto my-6 max-w-basis border-2 border-dashed border-lijn-sterk bg-vlak-verhoogd px-marge py-sectie-s text-lopend-m text-tekst"
    >
      Onbekend sectietype: <code className="text-tekst-zacht">{type}</code>. Voeg het toe aan de
      union en de switch in src/lib/SectionRenderer.tsx.
    </div>
  );
}

/*
 * De hele pagina in één keer.
 *
 * Alleen hier is te zien wat er vóór een sectie staat, en dat is precies wat
 * het kopniveau bepaalt. Een sectie los renderen kan dat niet weten, dus die
 * weg loopt altijd op meerdere <h1> of op geen enkele uit.
 *
 * Drie regels die het design system stelt en die hier worden afgedwongen:
 *
 *   - één <h1> per pagina, van de eerste sectie die er een kan dragen
 *   - een tweede openingssectie levert géén tweede <h1>, en ook geen tweede
 *     display-xl: die zakt naar een gewone sectiekop
 *   - koppen gaan nooit omhoog halverwege de pagina, want alles na de eerste
 *     staat op niveau 2
 *
 * Staat er geen enkele sectie die een kop kan dragen, dan heeft de pagina geen
 * <h1>. Dat wordt hier niet stilletjes gerepareerd — er valt niets te kiezen —
 * maar scripts/check-koppen.mjs laat de build erop vallen.
 */
export function SectieLijst({ secties }: { secties: Sectie[] }) {
  let kopGebruikt = false;

  return (
    <>
      {secties.map((sectie, index) => {
        const opentPagina = !kopGebruikt && draagtPaginakop(sectie);
        if (opentPagina) kopGebruikt = true;

        return (
          <Fragment key={`${sectie.type}-${index}`}>
            {/*
              De naad hoort bij de sectie eronder en krijgt daarom haar
              achtergrond en haar breedte: hij is de bovenrand van wat er komt,
              niet de voet van wat er was. Dit is de enige plek die weet dat er
              iets boven staat — dezelfde reden waarom het kopniveau hier wordt
              uitgerekend.
            */}
            {index > 0 ? <Naad achtergrond={sectie.achtergrond} breedte={sectie.breedte} /> : null}
            <SectionRenderer sectie={sectie} kopNiveau={opentPagina ? 1 : 2} />
          </Fragment>
        );
      })}
    </>
  );
}

export default function SectionRenderer({
  sectie,
  kopNiveau = 2,
}: {
  sectie: Sectie;
  kopNiveau?: KopNiveau;
}) {
  switch (sectie.type) {
    case 'hero': {
      const { type: _type, ...props } = sectie;
      return <Hero {...props} kopNiveau={kopNiveau} />;
    }
    case 'splitscreen': {
      const { type: _type, ...props } = sectie;
      return <Splitscreen {...props} />;
    }
    case 'kop-tekst': {
      const { type: _type, ...props } = sectie;
      return <KopTekst {...props} kopNiveau={kopNiveau} />;
    }
    case 'beeld-tekst': {
      const { type: _type, ...props } = sectie;
      return <BeeldTekst {...props} kopNiveau={kopNiveau} />;
    }
    case 'drie-kolommen': {
      const { type: _type, ...props } = sectie;
      return <DrieKolommen {...props} kopNiveau={kopNiveau} />;
    }
    case 'citaten': {
      const { type: _type, ...props } = sectie;
      return <Citaten {...props} />;
    }
    case 'oproep': {
      const { type: _type, ...props } = sectie;
      return <Oproep {...props} kopNiveau={kopNiveau} />;
    }
    case 'rijke-tekst': {
      const { type: _type, ...props } = sectie;
      return <RijkeTekst {...props} kopNiveau={kopNiveau} />;
    }
    case 'accordeon': {
      const { type: _type, ...props } = sectie;
      return <Accordeon {...props} kopNiveau={kopNiveau} />;
    }
    default: {
      // Compileerfout zodra de union een type kent dat hierboven geen case
      // heeft. De cast erna is voor data die pas tijdens runtime binnenkomt.
      const uitputtend: never = sectie;
      return <OnbekendType type={String((uitputtend as { type: unknown }).type)} />;
    }
  }
}
