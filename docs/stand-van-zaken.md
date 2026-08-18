# Stand van zaken

> **Voor wie aan deze site bouwt.** Dit gaat over de code en wat er nog moet
> gebeuren, niet over het beheren van de inhoud. Dat staat in `overdracht.md`,
> en dat is voor de redacteur. Voeg die twee niet samen: ze zijn voor andere
> mensen en veranderen op andere momenten.

Bijgewerkt na B8, sessie 1. Wat er af is, wat er open ligt, en waar je verder
gaat.

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

De site is compleet en `npm run check` is groen. Wat hieronder staat is wat er
tussen nu en livegang moet gebeuren.

## Eerstvolgende stap: B8 sessie 2 — content en FAQ

De restyle is in twee sessies geknipt. Sessie 1 heeft het systeem omgezet:
tokens, typografie en de twee nieuwe motieven. **De teksten zijn met opzet niet
aangeraakt.** Wat er nog moet:

- **De nieuwe koppen uit de mockup**, per pagina. `bron/restyle-brief-v2.md`
  hoofdstuk 4 heeft ze op een rij. Let op de typefout "EEEN UITZENBUREAU" in de
  mockup: die nemen we niet over.
- **Het accordeon-sectietype voor de FAQ.** Twaalf vragen in twee groepen, klaar
  in hoofdstuk 5 van de brief. Dat is een negende sectietype en landt dus op de
  vijf plekken uit *Een nieuwe sectie toevoegen* in `CLAUDE.md`, plus in
  `draagtPaginakop()` en in de koppenbewaking.
- **Het telefoonnummer.** `+31 6 19004878` vervangt `06 25 33 15 97` overal:
  `bron/contactgegevens.md`, de site-instellingen in het CMS, en de
  privacyverklaring als die het nummer noemt.

**En één ding dat sessie 1 niet kon beslissen: hoe een redacteur een ovaal of
een streep zet.** `Ovaal` en `Streep` bestaan en werken, maar ze zijn nu alleen
vanuit code te plaatsen — op `/secties` staan ze in markup. Een sectiekop is in
het CMS één tekstveld, en er is geen manier om daarin te zeggen "deze drie
woorden krijgen een ovaal".

Dat is een schemabeslissing en geen bouwklus. Twee routes, allebei met een
prijs: een afspraak ín de tekst (bijvoorbeeld `Geen nummertjes, maar {1 van de
100}`) leest slecht in het CMS en lekt in de yaml als iemand het vergeet; een
apart veld ("welk deel van de kop krijgt de ovaal") is expliciet maar moet dan
per sectietype terugkomen en werkt alleen als die woordgroep letterlijk in de
kop voorkomt. Kies dit met de nieuwe koppen in de hand — dan weet je hoe vaak
het echt nodig is.

**Ook open uit sessie 1:**

- **`roet` is afgeleid en niet gemeten.** De mockup toont geen verhoogd vlak.
  `#2c1f1a` is 94% bruin met 6% cream, gekozen zodat de stap omhoog dezelfde is
  als die `roet` op `inkt` had en `krijt-stil` er nog 4,60:1 haalt. Levert de
  klant alsnog een gemeten waarde, dan wint die.
- **De typemachine en het handschrift zijn een gok.** De brief zet de zekerheid
  op matig en laag. Heeft de maker van de mockup de echte namen, dan is omzetten
  één regel in `global.css` en één token in `tokens.css`.
- **Welke knop `vuur` krijgt en welke `inkt`.** `Hero` en `Oproep` zetten hun
  primaire actie nu op `vuur` en hun tweede op `lijn`, want één gevulde knop per
  blikveld. De mockup zet er twee gevulde naast elkaar — AANMELDEN zwart,
  INHUREN rood — en of dat een tweede primaire actie is of een kleurcode per
  publiek, hangt aan de nieuwe koppen.
- **De hero uit de mockup zet witte tekst op de lichte sepia-sluier, en dat
  haalt 1,53:1.** Die combinatie kan niet zo gebouwd worden, ook niet met de
  dubbellaagse kop eronder — een offset telt in WCAG niet mee. Bij het plaatsen
  van de nieuwe hero is dit de eerste keuze die op tafel ligt: donkere tekst op
  de lichte sluier, of witte tekst op de donkere.

## Daarna: het aanmeldformulier

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

### Welke twee naden krijgen de schicht

Uit B7, en het is een redactionele keuze en geen technische. Op elke sectiegrens
staat sinds B7 een haarlijn (`Naad`), maar dat is alleen de lijnhelft van rol 2
van de bliksemschicht. De richtlijn staat de schicht in die lijn **hoogstens
twee keer per pagina** toe.

**Wat er moet gebeuren.** Per pagina aanwijzen welke twee grenzen dat verdienen
— de plekken waar de pagina echt van onderwerp wisselt — en pas dan bouwen. De
schicht komt in `Naad` binnen, niet in een tweede component; `Bliksem`
ondersteunt `rol="scheiding"` al.

**De valkuil.** De naad staat vlak boven de bovenkop van de volgende sectie, dus
allebei de waarnemers gaan binnen ongeveer honderd milliseconde af. Wordt de
schicht een eigen gebeurtenis met een eigen duur, dan krijg je bij elke
overgang een keten van vier of vijf tellen. Bij twee per pagina is dat te
verdedigen; het is precies de reden dat het er niet zestien mogen zijn.

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
