import type { ReactNode } from 'react';

export interface KaartProps {
  /** verhoogd = vlak in roet of mist; vlak = alleen een lijn. */
  variant?: 'verhoogd' | 'vlak';
  /** Volgnummer of telwaarde, boven de kop. Staat op tabular-nums. */
  nummer?: ReactNode;
  kop?: ReactNode;
  tekst?: ReactNode;
  /** Blok onderaan; blijft op de bodem staan, ook als kaarten verschillen in hoogte. */
  voet?: ReactNode;
  href?: string;
  disabled?: boolean;
  /** Toont een skelet in plaats van de inhoud. */
  laadt?: boolean;
  /**
   * Het kopniveau van de kaartkop. Gezet door de sectie eromheen, zodat de
   * kaarten netjes onder de sectiekop hangen en er geen niveau wordt
   * overgeslagen.
   */
  kopNiveau?: 2 | 3 | 4;
}

/*
 * De kaart, voor alles wat in een raster staat.
 *
 * Hoekig en met een lijn in plaats van een schaduw: op zwart bestaat schaduw
 * niet, diepte is een verhoogd vlak plus een lijn. Op een lichte achtergrond
 * komt er via [data-thema="licht"] wel een schaduw bij op hover.
 *
 * Klikbaar wordt hij zodra er een href meegaat; dan rendert hij als <a>.
 * onClick zit er niet in — alles is statisch voorgerenderd.
 */
function Skelet({ klasse }: { klasse: string }) {
  // Zie de spinner in Knop: motion-safe in plaats van de globale 1ms-regel.
  return <span className={`block rounded-none bg-tekst/10 motion-safe:animate-pulse ${klasse}`} />;
}

export default function Kaart({
  variant = 'verhoogd',
  nummer,
  kop,
  tekst,
  voet,
  href,
  disabled = false,
  laadt = false,
  kopNiveau = 3,
}: KaartProps) {
  const Kop = `h${kopNiveau}` as 'h2' | 'h3' | 'h4';
  const klikbaar = Boolean(href) && !disabled && !laadt;

  const klassen = [
    // Lijn en vlak op --duur-1, de verschuiving op --duur-2, curve --soepel-uit.
    'relative flex flex-col rounded-none border border-lijn p-6 ' +
      '[transition:background-color_var(--duur-1)_var(--soepel-uit),border-color_var(--duur-1)_var(--soepel-uit),box-shadow_var(--duur-1)_var(--soepel-uit),transform_var(--duur-2)_var(--soepel-uit)]',
    variant === 'verhoogd' ? 'bg-vlak-verhoogd' : 'bg-transparent',
    klikbaar
      ? 'no-underline hover:border-lijn-sterk hover:-translate-y-0.5 active:translate-y-0 active:scale-[var(--indruk)] ' +
        // Op zwart bestaat schaduw niet; op papier en mist mag er wel een korte
        // bij. Vandaar de voorouder-selector op data-thema.
        '[[data-thema=licht]_&]:hover:shadow-licht-2'
      : '',
    disabled ? 'pointer-events-none opacity-38' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const inhoud = laadt ? (
    <>
      <Skelet klasse="mb-4 h-4 w-16" />
      <Skelet klasse="mb-3 h-6 w-3/4" />
      <Skelet klasse="h-4 w-full" />
    </>
  ) : (
    <>
      {nummer ? (
        <span className="mb-4 text-bovenkop text-tekst-stil tabular-nums uppercase">{nummer}</span>
      ) : null}
      {kop ? <Kop className="mb-2 text-kop-m text-balance break-words">{kop}</Kop> : null}
      {tekst ? <p className="text-lopend-m text-tekst-zacht">{tekst}</p> : null}
      {voet ? <div className="mt-auto pt-6">{voet}</div> : null}
    </>
  );

  if (klikbaar && href) {
    return (
      <a href={href} className={klassen}>
        {inhoud}
      </a>
    );
  }

  return (
    <div className={klassen} aria-busy={laadt || undefined}>
      {inhoud}
    </div>
  );
}
