import BeeldTekst, { type BeeldTekstProps } from '../components/sections/BeeldTekst';
import Citaten, { type CitatenProps } from '../components/sections/Citaten';
import DrieKolommen, { type DrieKolommenProps } from '../components/sections/DrieKolommen';
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
  | ({ type: 'splitscreen' } & SplitscreenProps)
  | ({ type: 'kop-tekst' } & KopTekstProps)
  | ({ type: 'beeld-tekst' } & BeeldTekstProps)
  | ({ type: 'drie-kolommen' } & DrieKolommenProps)
  | ({ type: 'citaten' } & CitatenProps)
  | ({ type: 'oproep' } & OproepProps)
  | ({ type: 'rijke-tekst' } & RijkeTekstProps);

export type SectieType = Sectie['type'];

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

export default function SectionRenderer({ sectie }: { sectie: Sectie }) {
  switch (sectie.type) {
    case 'splitscreen': {
      const { type: _type, ...props } = sectie;
      return <Splitscreen {...props} />;
    }
    case 'kop-tekst': {
      const { type: _type, ...props } = sectie;
      return <KopTekst {...props} />;
    }
    case 'beeld-tekst': {
      const { type: _type, ...props } = sectie;
      return <BeeldTekst {...props} />;
    }
    case 'drie-kolommen': {
      const { type: _type, ...props } = sectie;
      return <DrieKolommen {...props} />;
    }
    case 'citaten': {
      const { type: _type, ...props } = sectie;
      return <Citaten {...props} />;
    }
    case 'oproep': {
      const { type: _type, ...props } = sectie;
      return <Oproep {...props} />;
    }
    case 'rijke-tekst': {
      const { type: _type, ...props } = sectie;
      return <RijkeTekst {...props} />;
    }
    default: {
      // Compileerfout zodra de union een type kent dat hierboven geen case
      // heeft. De cast erna is voor data die pas tijdens runtime binnenkomt.
      const uitputtend: never = sectie;
      return <OnbekendType type={String((uitputtend as { type: unknown }).type)} />;
    }
  }
}
