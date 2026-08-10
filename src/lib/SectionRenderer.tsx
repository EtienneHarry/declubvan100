import BeeldTekst, { type BeeldTekstProps } from '../components/sections/BeeldTekst';
import KaartenRij, { type KaartenRijProps } from '../components/sections/KaartenRij';
import KopTekst, { type KopTekstProps } from '../components/sections/KopTekst';

/*
 * Sectietype naar component.
 *
 * Dit is samen met tokens.ts het enige koppelbestand van het sjabloon, en de
 * enige plek waar een sectietype aan een component vastzit. Een nieuwe sectie
 * landt hier in de union én in de switch; vergeet je de switch, dan valt de
 * exhaustiviteitscontrole in de default-tak om en krijg je een compileerfout.
 */

export type Sectie =
  | ({ type: 'kop-tekst' } & KopTekstProps)
  | ({ type: 'kaarten-rij' } & KaartenRijProps)
  | ({ type: 'beeld-tekst' } & BeeldTekstProps);

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
      className="mx-auto my-6 max-w-basis rounded-zacht border-2 border-dashed border-lijn bg-vlak-diep px-6 py-compact font-basis text-lopend text-tekst"
    >
      Onbekend sectietype: <code className="font-kop">{type}</code>. Voeg het toe aan de union en
      de switch in src/lib/SectionRenderer.tsx.
    </div>
  );
}

export default function SectionRenderer({ sectie }: { sectie: Sectie }) {
  switch (sectie.type) {
    case 'kop-tekst': {
      const { type: _type, ...props } = sectie;
      return <KopTekst {...props} />;
    }
    case 'kaarten-rij': {
      const { type: _type, ...props } = sectie;
      return <KaartenRij {...props} />;
    }
    case 'beeld-tekst': {
      const { type: _type, ...props } = sectie;
      return <BeeldTekst {...props} />;
    }
    default: {
      // Compileerfout zodra de union een type kent dat hierboven geen case
      // heeft. De cast erna is voor data die pas tijdens runtime binnenkomt.
      const uitputtend: never = sectie;
      return <OnbekendType type={String((uitputtend as { type: unknown }).type)} />;
    }
  }
}
