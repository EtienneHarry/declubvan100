import type { ReactNode } from 'react';

export interface BovenkopProps {
  children: ReactNode;
}

/**
 * Het labeltje boven een sectiekop. Hoofdletters, klein, ruime tracking — geeft
 * ritme zonder een tweede lettertype.
 *
 * Nooit boven 16px; dan wordt het zelf een kop. Daarom ligt de maat vast op
 * `text-bovenkop` en is er geen prop om hem te vergroten.
 */
export default function Bovenkop({ children }: BovenkopProps) {
  return (
    <p className="flex items-center gap-3 text-bovenkop text-tekst-stil uppercase">{children}</p>
  );
}
