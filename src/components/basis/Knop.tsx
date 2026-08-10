import type { ReactNode } from 'react';

export type KnopVariant = 'vol' | 'lijn' | 'kaal';
export type KnopMaat = 's' | 'm' | 'l';

export interface KnopProps {
  /** vol = primaire actie, max 1 per blikveld; lijn = secundair; kaal = tertiair. */
  variant?: KnopVariant;
  maat?: KnopMaat;
  /** Volle breedte. Alleen in formulieren en op mobiel. */
  breed?: boolean;
  /** Laadstatus: de tekst verdwijnt, de spinner verschijnt, de knop blijft even breed. */
  laadt?: boolean;
  disabled?: boolean;
  /** Met href rendert de knop als link. */
  href?: string;
  icoonLinks?: ReactNode;
  icoonRechts?: ReactNode;
  children: ReactNode;
}

/*
 * De knop. Rechthoekig, hoofdletters, tekst in de stem van de bezoeker —
 * "Stuur maar", niet "Verzenden".
 *
 * Afwijking van het propscontract: `as` en losse DOM-attributen ontbreken. Het
 * contract erft van ButtonHTMLAttributes, maar dit project staat geen
 * spread-attributen, className of style van buitenaf toe. `onClick` ontbreekt
 * om dezelfde reden plus een tweede: alles is nu statisch voorgerenderd, dus
 * een handler zou toch niet meelopen zonder hydratatie.
 *
 * De maten verschillen alleen in hoogte en padding, niet in lettergrootte. Het
 * design system zet daar .9375rem en 1.125rem neer, maar daar bestaat geen
 * token voor; `--text-knop` geldt dus voor alle drie.
 */
/*
 * Motion: kleur en lijn wisselen op --duur-1, de indruk op --duur-2. Dat zijn
 * twee verschillende duren op één element, dus dit gaat via de
 * transition-shorthand; een losse duration-klasse zou beide over één kam
 * scheren. De curve is --soepel-uit, de standaard voor alles wat verschijnt.
 *
 * Bij prefers-reduced-motion zet de regel in tokens.css elke transitie op 1ms.
 */
const basis =
  'relative inline-flex items-center justify-center gap-2 rounded-none border-2 border-transparent text-knop uppercase no-underline ' +
  '[transition:background-color_var(--duur-1)_var(--soepel-uit),border-color_var(--duur-1)_var(--soepel-uit),color_var(--duur-1)_var(--soepel-uit),opacity_var(--duur-1)_var(--soepel-uit),transform_var(--duur-2)_var(--soepel-uit)]';

const variantKlasse: Record<KnopVariant, string> = {
  vol: 'bg-tekst text-vlak border-tekst hover:bg-tekst-zacht hover:border-tekst-zacht active:bg-tekst-stil active:border-tekst-stil',
  lijn: 'bg-transparent text-tekst border-lijn-sterk hover:border-tekst hover:bg-tekst/8 active:bg-tekst/16',
  kaal: 'bg-transparent text-tekst border-transparent hover:text-tekst-zacht hover:underline active:text-tekst-stil',
};

const maatKlasse: Record<KnopMaat, string> = {
  s: 'min-h-9 px-4',
  m: 'min-h-11 px-6',
  l: 'min-h-14 px-8',
};

/** Kaal heeft een smallere binnenmarge dan de andere varianten. */
const kaalMaatKlasse: Record<KnopMaat, string> = {
  s: 'min-h-9 px-2',
  m: 'min-h-11 px-2',
  l: 'min-h-14 px-2',
};

function Spinner() {
  return (
    <span className="absolute inset-0 grid place-items-center">
      {/* motion-safe, niet de globale 1ms-regel: die zou de spinner juist
          razendsnel laten tollen in plaats van tot rust te brengen. Wie
          gereduceerde beweging vraagt, krijgt een stilstaande ring. */}
      <span className="block size-5 rounded-vol border-2 border-current/30 border-t-current motion-safe:animate-spin" />
    </span>
  );
}

export default function Knop({
  variant = 'vol',
  maat = 'm',
  breed = false,
  laadt = false,
  disabled = false,
  href,
  icoonLinks,
  icoonRechts,
  children,
}: KnopProps) {
  const uitgeschakeld = disabled || laadt;

  const klassen = [
    basis,
    variantKlasse[variant],
    variant === 'kaal' ? kaalMaatKlasse[maat] : maatKlasse[maat],
    breed ? 'w-full' : '',
    laadt ? 'cursor-progress text-transparent' : 'cursor-pointer',
    // De indruk bij :active. Geen veer, geen bounce — één stap kleiner.
    uitgeschakeld ? '' : 'active:scale-[var(--indruk)]',
    disabled ? 'cursor-not-allowed opacity-38' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const inhoud = (
    <>
      {icoonLinks}
      <span className={laadt ? 'invisible' : undefined}>{children}</span>
      {icoonRechts}
      {laadt ? <Spinner /> : null}
    </>
  );

  if (href && !uitgeschakeld) {
    return (
      <a href={href} className={klassen}>
        {inhoud}
      </a>
    );
  }

  // Een uitgeschakelde link bestaat niet; die wordt een knop die niets doet.
  return (
    <button type="button" className={klassen} disabled={uitgeschakeld} aria-busy={laadt}>
      {inhoud}
    </button>
  );
}
