# Werkinstructie — De Club van 100

Deze repo bevat één klantsite: declubvan.nl, bemiddeling van horeca- en
eventpersoneel. Vijf pagina's, Keystatic als CMS, Vercel als hosting.

`design-system.md` in de root is bindend. Staat een waarde daar niet in, verzin hem
dan niet: meld het en wacht op antwoord.

## Het merk in drie regels

De Club van 100 is geen uitzendbureau maar een selectie van honderd professionals.
Een uitzendbureau werft, deze club selecteert. Alles in de site — toon, ruimte,
zwart — moet dat verschil dragen.

## Vaste regels

**Tokens zijn de enige bron.** Elke visuele waarde komt uit `src/styles/tokens.css`.
Geen losse hexcodes, geen losse pixelwaardes, nergens anders. `npm run check` breekt
hierop en dat is de bedoeling.

**Secties zijn componenten.** Een pagina is een reeks secties, geen eigen opmaak per
pagina. Elke sectie haalt achtergrond, verticale ruimte en breedte als tokennaam op
en werkt met wisselende hoeveelheden inhoud, in elke volgorde.

**Geen `className` van buitenaf, geen `style`-attribuut, geen spread-attributen op
componenten.** Zodra een sectie opmaak van buiten accepteert, is de tokenregel een
suggestie geworden. Spread-attributen zijn bovendien onderwerp van een openstaande
Astro-advisory; los daarvan wil je ze hier niet.

**Rijke tekst is kaal.** Alleen H2, H3, vet, cursief, link en lijsten. Geen kleuren,
geen inline opmaak, geen H1 — die hoort bij de paginatitel.

**Alt-tekst is verplicht**, met validatie in het schema. Label: "Wat staat er op de
foto".

**Tekst op foto krijgt altijd een sluier.** Gebruik het `Beeldvlak`-component, dat
dwingt het af. Zonder sluier haal je de contrasteis niet.

**Beweging respecteert `prefers-reduced-motion`.** Zonder uitzondering.

## Koppelbestanden

Er zijn er precies twee, en er komen er geen bij:

- `src/lib/tokens.ts` — tokennaam naar Tailwind-klasse
- `src/lib/SectionRenderer.tsx` — sectietype naar component

Een nieuwe sectie landt altijd op drie plekken: het component zelf,
`SectionRenderer.tsx`, en `src/pages/secties.astro` met de vier randgevallen.

## Kwaliteitsbewaking

- `scripts/check-tokens.mjs` bewaakt de tokenregel: hexcodes en losse px-waardes
  buiten `tokens.css`. Dit vervangt het `no-restricted-syntax`-blok dat oxlint niet
  kan draaien.
- oxlint bewaakt de codekwaliteit.
- `npm run check` draait beide plus `astro check` en de build. Draai hem vóór elke
  commit.
- `src/pages/secties.astro` is de beheerbaarheidstest: elke sectie met een te lange
  kop, een lege tekst, weinig items, veel items, en bij beeldsecties een ontbrekende
  afbeelding.

## Taal en tekst

Alle zichtbare tekst en alle CMS-labels in het Nederlands, geschreven vanuit de
redacteur. "Wat staat er op de foto", niet "Alt attribute". "Weergave", niet
"Section settings".

Jij en wij, nooit u. Geen emoji, nergens. Geen uitroeptekens. Verplichte velden
krijgen geen sterretje; optionele velden krijgen "— mag je overslaan".

Hoofdstuk 2 van `design-system.md` bevat de volledige microcopy. Gebruik die
formuleringen letterlijk, verzin geen eigen knopteksten.

## Typografie

Archivo Variable, één familie. Import is `@fontsource-variable/archivo/wdth.css` en
niet de standaardimport: die laat de breedte-as weg en dan doen de displaykoppen
niets. De breedte-as blijft op 100 buiten `display-xl` en `display-l`.

## Deze site

Pagina's: home (splitscreen met twee deuren), opdrachtgevers, de 100, contact,
voorwaarden.

Niet bouwen: filters, meertaligheid, webshop, reserverings- of betaalfunctionaliteit,
inschrijfformulier met eigen backend. Aanmelden loopt via een extern formulier.

## Werkwijze

- Eén commit per stap, boodschap in het Nederlands.
- Per sessie een eigen branch, aan het eind een pull request.
- Bouw niets wat niet gevraagd is. Geen extra pagina's, geen extra componenten, geen
  bibliotheken erbij zonder overleg.
- Loopt het contextvenster vol of wissel je van onderwerp: sluit af met een korte
  overdracht, wat staat er en wat is de volgende stap.

## Stack

Astro 6, React-eilanden, Tailwind 4 met `@theme inline`, TypeScript strict, oxlint,
Keystatic, Vercel. `security.csp` staat aan.
