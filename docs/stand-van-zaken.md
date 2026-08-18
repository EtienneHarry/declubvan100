# Stand van zaken

> **Voor wie aan deze site bouwt.** Dit gaat over de code en wat er nog moet
> gebeuren, niet over het beheren van de inhoud. Dat staat in `overdracht.md`,
> en dat is voor de redacteur. Voeg die twee niet samen: ze zijn voor andere
> mensen en veranderen op andere momenten.

Bijgewerkt na B9. Wat er af is, wat er open ligt, en waar je verder gaat.

De git-geschiedenis vertelt wat er gebeurd is; dit document vertelt wat er nog
moet. Werk het bij aan het eind van elke sessie.

## Af

| Fase | Wat |
|---|---|
| B1–B2 | Fundament: tokens, componenten, sectietypes, sectieoverzicht |
| B3 | De vijf pagina's, tekst uit `bron/` |
| B4 | Keystatic, zes pagina's uit het CMS, navigatie, privacyverklaring |
| B7 | Beweging: scrollonthulling op alle acht sectietypes, masker op koppen, zoom op klikbaar beeld, de naad tussen twee secties |
| B8-1 | Restyle, deel 1: kleurtokens (bruin, cream, vuur, twee sluiers), typografie (Montserrat, Special Elite, Caveat), de ovaal, het onderstreepje en de dubbellaagse hero-kop |
| B8-2 | Restyle, deel 2: de haal als markering in de kop, de teksten uit de mockup, de hero met foto, het accordeon als negende sectietype en de twaalf vragen |
| B9 | Landingspagina: de beeldvullende hero, de naad eruit, de teller per bezoek, de haal-tekening gerepareerd (Chrome negeert pathLength naast non-scaling-stroke), fotokaarten op het drieluik |

De site is compleet en `npm run check` is groen. Wat hieronder staat is wat er
tussen nu en livegang moet gebeuren.

## Eerstvolgende stap: het aanmeldformulier

De restyle is af. Wat hieronder staat is wat er tussen nu en livegang moet
gebeuren, en het formulier is het enige dat de site nog mist.

### Wat de restyle heeft opgeleverd, en wat er van openbleef

Drie vragen die sessie 1 openliet zijn beantwoord:

- **Hoe een redacteur een ovaal zet.** Met haakjes in de koptekst: `[…]` voor de
  ovaal, `{…}` voor de streep. De regels staan in `overdracht.md` en in
  `Koptekst.tsx`.
- **Welke knop welke kleur krijgt.** In de hero staan de twee deuren van de site
  naast elkaar — inkt voor aanmelden, vuur voor inhuren — en dat is een code en
  geen rangorde. Overal anders blijft het één gevulde knop per blikveld.
- **Enthousiast, Ervaren en Trots.** Die drie stonden er zonder zin erbij. Het
  drieluik uit de mockup vervangt ze, met drie hele zinnen.

Wat nog openstaat:

- **De typemachine in de kop op Voor wie is de club? telt te veel regels.** De
  zin is compleet — de eerste helft kwam alsnog uit de mockup — maar het deel in
  de typemachine staat op drie regels op 1440 en vijf op 375, terwijl de regel er
  twee toestaat. Het is al ingekort ten opzichte van de mockup, die de wissel op
  de komma zet; verder inkorten verandert de zin en schalen vraagt een maat die
  nergens gemeten is. De meting en de twee uitwegen staan in
  `bron/mockup-notities.md`.
- **`roet` is afgeleid en niet gemeten.** De mockup toont geen verhoogd vlak.
  `#2c1f1a` is 94% bruin met 6% cream, gekozen zodat de stap omhoog dezelfde is
  als die `roet` op `inkt` had en `krijt-stil` er nog 4,60:1 haalt. Levert de
  klant alsnog een gemeten waarde, dan wint die.
- **De typemachine en het handschrift zijn een gok.** De brief zet de zekerheid
  op matig en laag. Heeft de maker van de mockup de echte namen, dan is omzetten
  één regel in `global.css` en één token in `tokens.css`.
- **De foto "lachende man met kopje" ontbreekt in public/beeld.** De mockup
  noemt hem voor het drieluik; alle kandidaten zijn bekeken en lach-deur.jpg
  (de lachende man, zonder kopje) staat er nu. Heeft de klant het origineel,
  dan is het één upload en één keuze in het CMS.
- **365Werk verwerkt persoonsgegevens van Clubleden.** Dat staat nu als antwoord
  op de site. De privacyverklaring dekt de website en dat blijft kloppen zolang
  de site zelf niets naar 365Werk stuurt — maar bij het formulier is dit de
  eerste vraag die op tafel ligt.

### Het formulier zelf

Eigen sessie. Het raakt drie dingen die nergens anders in dit project zitten.

Let op dat de FAQ er inmiddels twee velden bij heeft gezet: het formulier vraagt
naar horeca-ervaring en naar waar iemand enthousiast van wordt. Dat zijn twee
velden meer dan de privacyverklaring nu noemt, dus die tekst gaat mee.

**Wat er moet gebeuren.** Een formulier op `/contact` dat naar
`contact@declubvan.nl` verstuurt via Resend, met een route die op verzoek
draait.

**De valkuilen, op volgorde van hoe hard ze bijten:**

- **Het honeypotveld kan niet met een `style`-attribuut verstopt worden.** De
  CSP blokkeert inline stijl. Doe het met een klasse.
- **De privacyverklaring op `/privacy` beschrijft dit formulier al** — welke
  velden het verzamelt, hoe lang die bewaard worden, en dat Resend verstuurt.
  Wijkt het formulier daarvan af, dan gaat die tekst mee. Die verklaring is de
  belofte, niet een formaliteit.
- **`output: 'static'` blijft staan.** Alleen die ene route krijgt
  `export const prerender = false;`.
- Geen captcha. Die legt de last bij precies de mensen die zich willen melden.

## Openstaand

### De GitHub-modus van het CMS

Nu draait Keystatic in local mode, dus alleen op een machine waar de site
lokaal draait. Voor de klant moet dat de GitHub-modus worden.

**Wat er moet gebeuren.** Een GitHub App, drie omgevingsvariabelen op de server
(`KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`,
`KEYSTATIC_SECRET`) en `PUBLIC_KEYSTATIC_OPSLAG=github`. De schakelaar staat
klaar in `keystatic.config.ts`.

**De valkuil.** Dan staat de admin op de deploy, en dáár geldt de CSP wel. De
adminpaden hebben in `vercel.json` al een ruimere `style-src`; controleer op de
preview of het paneel gestyled binnenkomt voordat je dit aan de klant geeft. En
meet met Deployment Protection uit, anders meet je de inlogpagina.

### Twee Keystatic-bugs, allebei gemeld

De pin op `@keystatic/core` 0.6.4 blijft staan tot
[#1593](https://github.com/Thinkmill/keystatic/issues/1593) dicht is. Meet dan
opnieuw of een `fields.blocks`-rij opengaat vóór je de pin weghaalt.

[#1594](https://github.com/Thinkmill/keystatic/issues/1594) over het lokale
concept dat het bestand overschaduwt, staat open. Zolang die er is, is de
waarschuwing bovenaan `overdracht.md` de enige bescherming die de redacteur
heeft.

### Beeld, af te wegen in B5

De secties tonen een gewone `<img>`, geen Astro `<Image>`. Gevolg: geen webp of
avif, geen `srcset`, en `/beeld/*` krijgt geen immutable-cacheheader omdat de
bestandsnamen geen hash hebben. De foto's zijn 75 tot 910 kB per stuk.

**De valkuil.** De voor de hand liggende oplossingen — Vercels
beeldoptimalisatie, of een hash bij het uploaden — raken allebei de manier
waarop de redacteur een foto kiest. Los dit niet op zonder dat mee te wegen.

### De CLS van de home is nog niet in een echte browser gemeten

Uit B7. De scrollonthulling is nagerekend maar niet nagemeten: de Browser-pane
van de agent-tooling composit geen beeldjes zolang hij niet in beeld staat, en
dan levert een `layout-shift`-waarnemer nul regels op — voor én na. Die nul is
geen meting.

**Wat er wel is nagemeten**, op `/secties` met alle acht sectietypes, 144
onthulde elementen:

- de layoutgeometrie van elk element is identiek in verborgen en onthulde
  toestand: `offsetTop`, `offsetLeft`, `offsetWidth` en `offsetHeight`
  verschillen op geen enkel element (0 van 144)
- de paginahoogte is in beide toestanden 28815px, en ook in de
  gereduceerde-bewegingstak
- het enige verschil zit in `getBoundingClientRect()`, en dat is exact
  `matrix(1, 0, 0, 1, 0, 24)` — de verplaatsing van 24px, dus verf en geen
  layout
- de vier keyframes raken samen precies drie eigenschappen aan: `opacity`,
  `transform` en `clip-path`. Geen `top`, geen `margin`, geen `height`

**Meet je breder, dan zie je 161 verschillen. Schrik daar niet van.** De meting
hierboven kijkt naar de onthulde elementen zelf. Neem je álle 829 elementen in
`<main>` mee, dan verschilt van 161 daarvan `offsetTop` of `offsetLeft` tussen
de twee toestanden — en van precies diezelfde 161 verschilt ook de
`offsetParent`. Dat is de verklaring en niet het probleem: een element met een
`transform` wordt het bevattende blok van zijn nakomelingen, dus die gaan hun
positie ten opzichte van hém rapporteren in plaats van ten opzichte van de
pagina. Het aantal elementen waarvan de máát verschilt is nul, en het aantal
waarvan de positie verschilt zonder dat de `offsetParent` wisselt is ook nul.

Een verschuiving die alleen in transform en opacity zit, telt per definitie niet
mee in CLS. De verwachting is dus dat het cijfer nul blijft — maar dat is een
redenering, geen meting.

**Wat er nog moet gebeuren.** Zet de home naast elkaar met en zonder
`data-beweging` op `<html>` in een browser die echt tekent, scroll de pagina
langs en lees een `PerformanceObserver` op `layout-shift` uit. Zie *Beweging
meet je niet in een pane die niet composit* in `CLAUDE.md` voor waar je in loopt.

### Kleine dingen

- **Enthousiast, Ervaren en Trots** op `/de-100` dragen alleen het woord. Bron
  levert geen zin erbij. Wacht op de klant; verzin er niets bij.
- **Het mailadres staat op twee plekken in het CMS**: in de site-instellingen en
  als tekst op de contactkaart. Bewust zo gelaten; het staat als handeling in
  `overdracht.md`.
- **`overdracht.md` is een aanzet.** Vul hem aan zodra het formulier en de
  GitHub-modus er zijn.
- **De teller telt in elke hero-kop met een getal erin.** Nu alleen de home. Een
  toekomstige kop als "Top 10 klussen" zou meedoen; wil je dat niet, dan moet
  het expliciet worden.
- **De scrollonthulling raakt alleen secties.** De navigatie, de voettekst en
  het aanmeldformulier dat er nog niet is, staan er gewoon. Dat is een keuze:
  een frame dat binnenkomt is geen inslag maar een aarzeling. Komt het formulier
  er, weeg dan af of de velden meedoen.
- **De zoom bij hover heeft geen eigen curve uit de bron.** Hij loopt op
  `--soepel-uit`, de bestaande uitloop. Levert de klant er alsnog een, dan is
  dat één token in `tokens.css` en één regel in `Beeldvlak`.

## Voor livegang

- Privacyverklaring staat er en punt 6 van de voorwaarden linkt ernaartoe. Was
  de blokkade; is opgelost.
- Het formulier mag niet live zonder dat de privacyverklaring klopt met wat het
  doet.
- `npm audit --omit=dev` meldt zes kwetsbare pakketten. Zie *Bekende beperking*
  in `CLAUDE.md`: de blootstelling is nu nul, maar dat verandert zodra je
  spread-attributen of view transitions gaat gebruiken.
