import Bliksem from '../merk/Bliksem';

export interface ScheidingProps {
  /** Zet de schicht in de lijn. Maximaal twee per pagina. */
  schicht?: boolean;
  uitlijning?: 'midden' | 'links';
}

/**
 * Scheidingslijn tussen secties, eventueel met de bliksemschicht erin.
 * Vervangt de gewone `<hr>`.
 *
 * Zonder `schicht` is het een enkele lijn in `--lijn`. Bij `uitlijning="links"`
 * vervalt het lijnstuk vóór de schicht, zodat hij op de marge staat.
 */
export default function Scheiding({ schicht = false, uitlijning = 'midden' }: ScheidingProps) {
  return (
    <div role="separator" className="flex items-center gap-4 text-tekst-stil">
      {uitlijning === 'midden' ? <span className="h-px flex-1 bg-lijn" /> : null}
      {schicht ? <Bliksem rol="scheiding" /> : null}
      <span className="h-px flex-1 bg-lijn" />
    </div>
  );
}
