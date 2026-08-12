import type { ReactNode } from 'react';

export interface BovenkopProps {
  children: ReactNode;
  /**
   * Plek in de ploeg van de scrollonthulling, meestal 0: de bovenkop is het
   * eerste dat binnenkomt. Laat hem weg en de bovenkop doet niet zelf mee —
   * dat is wat een splitscreen-deur wil, waar de deur als geheel onthuld wordt.
   */
  stap?: number;
}

/**
 * Het labeltje boven een sectiekop. Hoofdletters, klein, ruime tracking — geeft
 * ritme zonder een tweede lettertype.
 *
 * Nooit boven 16px; dan wordt het zelf een kop. Daarom ligt de maat vast op
 * `text-bovenkop` en is er geen prop om hem te vergroten.
 */
export default function Bovenkop({ children, stap }: BovenkopProps) {
  return (
    <p
      data-onthul={stap === undefined ? undefined : 'blok'}
      data-onthul-stap={stap}
      className="flex items-center gap-3 text-bovenkop text-tekst-stil uppercase"
    >
      {children}
    </p>
  );
}
