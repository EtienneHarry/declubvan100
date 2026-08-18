# declubvan100

De site van De Club van 100. Astro 6 met React 19, Tailwind 4 en TypeScript in
strict-modus. Deployt naar Vercel: alles wordt vooraf gerenderd, een losse route
draait op verzoek met `export const prerender = false;`.

## Het beveiligingsbeleid

**`security.csp` in `astro.config.mjs` staat uit. Het beleid staat per pad in
`vercel.json`.** Dat is een bewuste verhuizing, geen versoepeling.

De reden is de Keystatic-admin. Astro's CSP is manifest-breed —
`shouldInjectCspMetaTags` komt uit het manifest en geldt dus voor élke route,
ook voor de adminroutes die op verzoek draaien. Er is geen manier om er één
route buiten te houden. En de admin heeft inline stijl nodig: de UI zit in
`@keystar/ui`, die stijlt met Emotion en levert geen CSS-bestand mee. Gemeten op
`/keystatic`: **414 `<style>`-elementen met `data-emotion`**, samen het hele
paneel. Onder `style-src 'self'` blijft daar niets van over.

Eén beleid voor alles betekende dus kiezen tussen een kale admin of
`'unsafe-inline'` voor de hele site. Per pad hoeft dat niet:

| Pad | `Content-Security-Policy` |
|---|---|
| `/keystatic/:path*` | `script-src 'self'; style-src 'self' 'unsafe-inline'` |
| `/api/keystatic/:path*` | `script-src 'self'; style-src 'self' 'unsafe-inline'` |
| al het andere | `script-src 'self'; style-src 'self'` |

**Dit werkt; het is op een preview-deploy nagemeten.** De adapter schrijft zijn
eigen routes in `.vercel/output/config.json` en leest `vercel.json` alleen om te
waarschuwen over `trailingSlash` — hij merget er geen headers uit. De vraag was
dus of het platform `vercel.json` nog wel oppakt naast de Build Output API. Dat
doet het: op de preview gaf `/` precies `script-src 'self'; style-src 'self'` en
`/keystatic` dezelfde policy plus `'unsafe-inline'` op `style-src`, één header
per pad.

De site verliest hiermee niets. Astro's meta zette `'self'` plus sha256-hashes
per inline script; de gebouwde pagina's hebben nul inline scripts, nul inline
stijlblokken en nul `style`-attributen, dus `'self'` dekt precies hetzelfde af.

Twee dingen om te onthouden:

- **De site-regel moet de adminpaden uitsluiten.** Vercel stopt niet bij de
  eerste treffer maar past élke matchende header-regel toe. Een site-regel op
  `/(.*)` zou de admin een tweede CSP-header geven en dan handhaaft de browser
  de doorsnede — precies het probleem dat deze splitsing oplost. Vandaar de
  negatieve lookahead in het derde patroon.
- **`source` is path-to-regexp, geen rauwe regex.** `/keystatic(/(.*))?` wordt
  geweigerd; `/keystatic/:path*` is de goede vorm.

`scripts/check-csp.mjs` bewaakt dit na elke build: elk pad precies één
CSP-header, `'unsafe-inline'` alleen op de admin, en geen inline script, stijlblok
of `style`-attribuut in de gebouwde HTML.

### Waar je de headers wel en niet ziet

De headers komen van Vercel, niet uit de HTML. Dat betekent:

- **Lokaal zie je ze nooit.** Niet in `npm run dev` en niet in `npm run preview`
  — dat laatste is `astro preview` en heeft niets met een preview-deploy te
  maken. Een inline stijl gaat daar dus gewoon werken en pas op de deploy stuk.
  `check-csp` is precies daarvoor de vervanging.
- **Op een preview-deploy meten werkt alleen met Deployment Protection uit.**
  Staat die aan, dan krijg je een 302 naar `vercel.com/sso-api` en meet je de
  headers van de inlogpagina in plaats van die van de site. Dat leest als een
  genegeerde `vercel.json` terwijl er niets mis is.

Verder over CSP:

- **Inline stijl wordt geblokkeerd.** De regel "geen `style`-attribuut" wordt
  afgedwongen, niet alleen afgesproken.
- Geen `<ClientRouter />`-viewtransities en geen Shiki-syntaxkleuring;
  `markdown.syntaxHighlight` staat daarom uit.

`design-system.md` beschrijft hoe het design system van de klant hier is
uitgewerkt, inclusief de afwijkingen. De bron zelf is het design system van De
Club van 100 en staat buiten deze repo.

## Vaste regels

1. Kleuren en maten komen uit een token, nooit rauw in de code.
   `src/styles/tokens.css` is de enige plek waar letterlijke waardes mogen
   staan.
2. Tokennamen zijn de afspraak tussen `tokens.css`, `tokens.ts` en de secties.
   Verander waardes, geen namen.
3. Secties krijgen achtergrond, verticale ruimte en breedte als tokennaam en
   halen de klasse uit `tokens.ts`. Geen `className`-prop van buitenaf, geen
   `style`-attribuut, geen spread-attributen.
4. Een sectie werkt met wisselende hoeveelheden inhoud en in elke volgorde. Ze
   schildert haar eigen achtergrond en ruimte en gaat niet uit van buren.
5. `npm run check` moet groen zijn voor je commit.
6. Verzin geen huisstijl. Staat iets niet in het design system, vraag het.

## Werkwijze

Eén commit per stap, met een beschrijvende boodschap in het Nederlands. Elke
commit staat op zichzelf: `npm run check` slaagt erop. Loopt de volgorde van een
opdracht daarmee in de knoop — een bestand dat een ander bestand importeert dat
er nog niet is — dan wissel je de stappen om en zeg je erbij dat je dat gedaan
hebt.

## Controles

`npm run check` draait de hele poort en stopt bij de eerste stap die faalt:

```
oxlint  →  check-tokens  →  astro check  →  astro build
        →  check-csp  →  check-nesting  →  check-koppen
```

De laatste drie staan achter de build omdat ze de gebouwde HTML lezen. Ze
bewaken alle drie iets dat stil misgaat: geen foutmelding, geen kapotte pagina,
en lokaal zie je er niets van.

Dezelfde `check` draait in GitHub Actions bij elke push en pull request.

Wie bewaakt wat:

| Onderwerp | Bewaker |
|---|---|
| Hexkleuren en px-waarden | `scripts/check-tokens.mjs` |
| Letterlijke lettertypenamen | `scripts/check-tokens.mjs` |
| Propnamen en propwaarden van componenten | TypeScript, via `astro check` |
| Geen `className` of `style` van buitenaf | TypeScript |
| Import via `index.js` | oxlint, `no-restricted-imports` |
| Onbekende tokennaam | TypeScript, via de union-types in `tokens.ts` |
| CSP per pad, en inline script of stijl in de uitvoer | `scripts/check-csp.mjs` |
| Vertraging per element zonder `style`-attribuut | `scripts/check-csp.mjs` |
| Blokelement binnen een inline-element | `scripts/check-nesting.mjs` |
| Eén `<h1>` vooraan, geen overgeslagen kopniveau | `scripts/check-koppen.mjs` |

`_adherence.oxlintrc.json` is samengevoegd uit de adherence-config van De Club
van 100 en die van het Kick&Work-sjabloon. Twee blokken uit die bronnen konden
niet mee, en dat is geen keuze: oxlint 1.77 weigert de hele config zodra ze
erin staan.

- `no-restricted-syntax` — 19 selectors voor kleur, maat, font-family en de
  propscontracten per component. Levert
  `Rule 'no-restricted-syntax' not found in plugin 'eslint'`.
- `x-omelette` — metadata voor de design-system-tooling. Levert
  `unknown field`.

Kleur, maat én font-family worden opgevangen door `check-tokens`, de
propscontracten door TypeScript. Er blijft van die 19 selectors dus niets
onbewaakt.

## De tokenregel

`scripts/check-tokens.mjs` scant `src/` op `.astro`, `.tsx`, `.ts` en `.css` en
faalt met exit 1 op:

- hexkleuren in de vorm `#abc`, `#aabbcc` of `#aabbccdd`
- losse px-waarden, bijvoorbeeld `16px`
- letterlijke lettertypenamen

Niet gemeld: commentaar (`//`, `/* */`, `<!-- -->`), `0px`, HTML-entities als
`&#123;` en andere hexlengtes dan 3, 6 of 8. `//` telt niet als commentaar in
CSS en ook niet direct na een dubbele punt, zodat `https://…` intact blijft.

De fontcontrole kijkt op drie plekken: een `font-family`-declaratie, een
Tailwind-utility met een vrije waarde (`font-[Arial]`), en Tailwinds ingebouwde
familieklassen `font-sans`, `font-serif` en `font-mono`. Toegestaan zijn alleen
`var(--font-…)`, de CSS-brede sleutelwoorden (`inherit` en verwanten), en een
familieklasse waarvoor een `--font-*`-token in `tokens.css` bestaat. Die lijst
wordt uit `tokens.css` gelezen, dus een nieuw fonttoken werkt meteen.

`font-` is in Tailwind dubbel bezet. `font-semibold`, `font-bold` en `font-[600]`
zijn gewichten en worden niet gemeld; alleen vrije waardes die geen `var()` en
geen getal zijn tellen als familienaam.

Enige uitzondering is `src/styles/tokens.css` — daar mogen de waardes letterlijk
staan, want daar worden de tokens gedefinieerd.

## Tokens

`src/styles/tokens.css` is de tokenlaag, in vier lagen in één bestand:

1. **Primitieven** — de rauwe waardes, één keer, in `:root`.
2. **Semantische laag** — aliassen die onder `[data-thema="licht"]` kantelen.
3. **`@theme inline`** — wat Tailwind tot utilities maakt.
4. **Basis** — reset, links, focus, gereduceerde beweging.

Laag 2 en 4 staan bewust buiten `@theme`: een alias die per thema iets anders
betekent en een CSS-reset zijn geen themetokens. Let op dat `@theme inline` de
`--color-*`- en `--spacing-*`-variabelen niet als CSS-variabele uitstuurt; die
worden in de utility ingebakken. Handgeschreven CSS leunt daarom op de
primitieven uit laag 1.

Laag 4 staat in `@layer base`. Ongelaagde CSS wint van Tailwinds
`@layer utilities`, en dan kan een utility als `no-underline` de linkstijl niet
meer overschrijven.

## Koppelbestanden

Er zijn er drie. Alles wat een sectie aan iets anders vastknoopt, staat in één
van deze drie bestanden en nergens anders:

- **`src/lib/tokens.ts`** — tokennaam naar Tailwind-klasse, voor achtergrond,
  verticale ruimte, containerbreedte en leesbreedte. Elke groep heeft een
  union-type, dus een tokennaam die niet bestaat is een compileerfout. Alleen
  klassenamen in dit bestand; een rauwe waarde laat `check-tokens.mjs` de build
  breken.
- **`src/lib/SectionRenderer.tsx`** — sectietype naar component, plus het
  kopniveau over de hele lijst. Een onbekend type toont in ontwikkeling een
  melding met het type erin en rendert in productie niets. De `default`-tak
  bevat een exhaustiviteitscontrole: een type dat wel in de union staat maar
  geen `case` heeft, is een compileerfout.
- **`src/lib/pagina.ts`** — CMS-data naar sectieprops. Zie *De zes pagina's*.

`src/lib/` heeft er nog twee die geen koppelbestand zijn: `site.ts` voor de
basis-URL en `beweging.ts` voor de ploegteller van de scrollonthulling.

## Componenten

React, want `SectionRenderer.tsx` en de secties zijn dat ook.

| Component | Map | Waarvoor |
|---|---|---|
| `Knop` | `components/basis/` | Elke actie. Varianten `vol`, `lijn`, `kaal`; maten `s`, `m`, `l` |
| `Kaart` | `components/basis/` | Alles wat in een raster staat |
| `Bovenkop` | `components/basis/` | Het labeltje boven een sectiekop |
| `Teller` | `components/basis/` | Kop waarin een getal naar boven telt |
| `Beeldvlak` | `components/beeld/` | Elke foto met tekst erop |
| `Bliksem` | `components/merk/` | De schicht, in drie rollen |
| `Koptekst` | `components/basis/` | Vertaalt `[...]` en `{...}` in een sectiekop naar een haal |
| `RijkeInhoud` | `components/basis/` | De kale markdoc-set, gedeeld door rijke tekst en accordeon |
| `Ovaal` | `components/merk/` | De haal om een woordgroep. Max 1 per sectie |
| `Streep` | `components/merk/` | De haal onder een kop. Ook max 1 per sectie |
| `Handschrift` | `components/merk/` | De decoratieve regel. Altijd `aria-hidden`, max 1 per pagina |

De logo's staan apart in `src/components/logo/` en zijn Astro-componenten, geen
React: ze worden door de layout gebruikt, niet door secties. Alle vier houden
`fill="currentColor"` en nemen geen props aan.

**Elk bestand in `components/` wordt gebruikt — behalve de logoset.**
`Scheiding` en `KaartenRij` stonden er ongebruikt bij en zijn weggehaald; staat
er weer iets dat nergens geïmporteerd wordt, dan is dat een fout en geen
voorraad. De git-geschiedenis heeft ze nog als je ze terug wilt.

**`src/components/logo/` is de benoemde uitzondering**, en dat is niet
hetzelfde als vergeten opruimen. Van de vier is alleen `LogoHorizontaal`
geïmporteerd, door de layout. De andere drie staan er compleet omdat een logoset
een set is: de bron levert vier merktekens met elk een eigen toepassing —
`Bliksem` als social avatar en watermerk, `Woordmerk` voor waar de schicht al
elders staat, `MerktekenVierkant` als favicon en app-icoon. Drie kwart van de
merktekens van een klant weggooien omdat de site ze deze maand niet toont, is
geen opruimen maar de set slopen; ze horen bij het merk en niet bij de pagina's.

Wat níet onder deze uitzondering valt: het uitbreiden ervan. Komt er een vijfde
bestand in die map dat niet uit de aangeleverde logoset komt, dan geldt de
gewone regel weer.

Eén ding om te weten en niet stilzwijgend te laten: `components/logo/Bliksem.astro`
en `components/merk/Bliksem.tsx` tekenen dezelfde SVG. Ze zijn niet elkaars
dubbele — de eerste is het merkteken uit de set, de tweede is het vormelement
met de drie rollen die de richtlijn eraan hangt, en alleen die tweede wordt
gebruikt. Ze delen `src/assets/logo/bliksem.svg`, dus er is één bron; wie ze ooit
samenvoegt, moet de rollen meenemen en niet andersom.

### Er gaat wél JavaScript naar de browser

Vijf bestanden, samen ongeveer 5 kB, alle vijf uit een Astro-component:

| Bestand | Waarvoor |
|---|---|
| `components/navigatie/Navigatie.astro` | De menuknop onder 900px, met focusval |
| `components/basis/TellerScript.astro` | De teller in de openingskop |
| `components/beweging/OnthulScript.astro` | De scrollonthulling |
| `components/merk/HaalScript.astro` | Past de haal op één regel? |
| `components/sections/AccordeonScript.astro` | Klapt de antwoorden dicht en weer open |

**Een `<script>` hoort in een `.astro`-bestand, nooit in een `.tsx`.** Astro
bundelt een script uit een Astro-component tot een gewoon bestand; een `<script>`
in een React-component belandt inline in de HTML en loopt op `script-src 'self'`
stuk. `Teller` is daarom gesplitst: markup in `Teller.tsx`, script in
`TellerScript.astro`.

**En `vite.build.assetsInlineLimit` staat op 0.** Astro bakt een gebundeld script
anders alsnog in de HTML zodra het onder de grens van 4 kB blijft — het
navigatiescript is 891 bytes en verdween er zo in. Dat is precies het geval dat
`check-csp` ving.

**Beeldvlak dwingt de sluier af.** Er is geen prop die hem weglaat en geen tak
die hem overslaat. Zonder behandeling haalt witte tekst op deze fotografie nooit
betrouwbaar AA, en een foto is geen token: hij wordt vervangen en dan klopt het
contrast niet meer.

## Sectietypes

Negen, allemaal in `src/components/sections/` en gekoppeld in
`SectionRenderer.tsx`:

| Type | Component | Waarvoor |
|---|---|---|
| `hero` | `Hero` | De openingssectie. Enige `<h1>`, enige `display-xl` |
| `splitscreen` | `Splitscreen` | Twee deuren: opdrachtgevers en professionals |
| `kop-tekst` | `KopTekst` | Kop met optionele bovenkop en lopende tekst |
| `beeld-tekst` | `BeeldTekst` | Beeld naast tekst |
| `drie-kolommen` | `DrieKolommen` | Raster van kaarten |
| `citaten` | `Citaten` | Klantquotes |
| `oproep` | `Oproep` | Afsluitend blok met een actie |
| `rijke-tekst` | `RijkeTekst` | Lopende tekst met koppen en lijsten |
| `accordeon` | `Accordeon` | Vragen met een antwoord dat openklapt |

Met beeld loopt de kop door `Beeldvlak` en vervalt de schicht. De grote schicht
is een uitgesneden vlak op een egale achtergrond — over een foto is dat geen
van de drie toegestane rollen, en de sluier zou hem toch opeten.

`hero` heeft sinds B8 één variant erbij: `dubbellaags`, de witte kop met de
harde donkere laag eronder uit de mockup. Die hangt aan `kopNiveau === 1` en
niet aan de prop alleen, dus een tweede hero op dezelfde pagina zakt naar
`display-l` en raakt hem ook kwijt. Op een lichte sectie vervalt hij helemaal.
Zie het componentenhoofdstuk van `design-system.md` voor waarom hij geen
contrastmiddel is.

### Het kopniveau komt uit de lijst, niet uit de sectie

**Render een sectie nooit los.** `SectieLijst` in `SectionRenderer.tsx` is de
enige juiste ingang: alleen daar is te zien wat er vóór een sectie staat, en dat
bepaalt het kopniveau. Een losse `SectionRenderer` valt terug op niveau 2 en
levert dus een pagina zonder `<h1>` op.

De eerste sectie die een kop kán dragen krijgt niveau 1, de rest niveau 2. Wat
een sectie binnenin heeft zakt mee: kaartkoppen hangen onder de sectiekop, en in
rijke tekst landt een `##` op het niveau eronder.

`draagtPaginakop()` bepaalt wie in aanmerking komt. `splitscreen` en `citaten`
slaan hun beurt over — twee koppen naast elkaar is geen paginakop en citaten
hebben er geen. `drie-kolommen`, `rijke-tekst` en `accordeon` doen alleen mee
als ze een sectiekop hebben.

Daarmee gelden deze drie vanzelf, en `check-koppen` houdt ze vast:

- elke pagina heeft precies één `<h1>`, en die staat vooraan
- een tweede hero levert geen tweede `<h1>` en geen tweede `display-xl`; die
  zakt naar een gewone sectiekop op `display-l`
- het niveau gaat nooit omhoog halverwege de pagina

Staat er geen enkele sectie die een kop kan dragen, dan heeft de pagina geen
`<h1>`. Dat wordt niet stilletjes gerepareerd — er valt niets te kiezen — maar
`check-koppen` laat de build erop vallen.

### Het accordeon

Staat er sinds B8 en is het negende type. Vier dingen die je niet moet weghalen:

- **Open is de begintoestand.** In de HTML staat elk antwoord uitgeklapt, met
  `aria-expanded="true"`; `AccordeonScript` klapt ze bij het laden dicht. Zonder
  JavaScript is de sectie dus een gewone lijst met vragen en antwoorden. Draai
  je het om, dan levert een uitgevallen script twaalf vragen op die niet
  opengaan — dezelfde fout die de scrollonthulling met zijn vlagje vermijdt.
  Nagemeten in de gebouwde HTML: nul keer `data-accordeon-dicht`.
- **`inert` op een dichtgeklapt paneel.** Het paneel staat op
  `grid-template-rows: 0fr` met `overflow: hidden`, en dat haalt de links erin
  niet uit de tab-volgorde. Zonder `inert` tabt de bezoeker door antwoorden die
  hij niet ziet.
- **Het paneel animeert op `grid-template-rows`, van `0fr` naar `1fr`.** Dat is
  de enige manier om naar de eigen hoogte van de inhoud te lopen zonder die
  hoogte te kennen — en kennen kan niet, want een hoogte in een
  `style`-attribuut wordt door de CSP geblokkeerd.
- **Het vlagje `data-accordeon-stil` op `<html>`.** Zonder dat klapt elk
  antwoord bij het laden zichtbaar omhoog, want het dichtzetten gebeurt op een
  element dat een transitie heeft. Het script haalt het vlagje weg na twee
  beeldjes.

Geen `aria-controls` en geen pijltoetsen, allebei met opzet: zie het
componentenhoofdstuk van `design-system.md`.

### Een nieuwe sectie toevoegen

Een nieuwe sectie landt op vijf plekken. Sla er één over en je merkt het pas
laat:

1. `src/components/sections/<Naam>.tsx` — de sectie zelf, volgens regel 3 en 4,
   met haar onderdelen in de ploeg. Zie *De beweging*.
2. `src/lib/SectionRenderer.tsx` — het type in de union, een `case` in de
   switch, én een tak in `draagtPaginakop()`.
3. `src/lib/pagina.ts` — een `case` die het CMS-blok naar sectieprops vertaalt.
4. `keystatic.config.ts` — een blok met dezelfde naam, met labels en
   beschrijvingen in het Nederlands.
5. `src/pages/secties.astro` — vier keer renderen, onder de omstandigheden waar
   een sjabloon op stukloopt.

Nummer 2 en 3 hebben allebei een exhaustiviteitscontrole, dus die vergeet je
niet: dat is meteen een compileerfout. Nummer 4 en 5 niet — een sectietype
zonder blok in het CMS is onzichtbaar voor de redacteur, en zonder variant in
het overzicht ongetest.

Nieuwe kleuren of maten horen eerst in `tokens.css` en dan in `tokens.ts`, niet
rechtstreeks in de sectie.

### Het sectieoverzicht

`src/pages/secties.astro` is de beheerbaarheidstest: elk type onder een te lange
kop, een lege tekst, weinig items en veel items. Daarnaast staan er vaste
regressiegevallen, elk voor een fout die een keer stil is misgegaan: de
overflow in `Beeldvlak`, een staande foto op 4:5 tegenover 16:9, de drie
manieren waarop de koppenvolgorde sneuvelde, en de teller. Haal die niet weg —
ze staan er omdat het een keer fout ging, niet ter illustratie.

De pagina routeert zodat je hem kunt bekijken en is afgeschermd met een
`noindex`-meta plus `Disallow: /secties` in `public/robots.txt`.

Elk geval gaat als eigen `SectieLijst` door de renderer en heeft dus zijn eigen
`<h1>`. Op een echte pagina zou dat fout zijn; hier is het de bedoeling, en
`check-koppen` slaat deze pagina daarom over.

Meet responsieve fouten, kijk er niet naar. De vier gebreken die in B2 boven
kwamen waren geen van alle zichtbaar op een screenshot; ze kwamen uit
`getBoundingClientRect()` in de browser. Let op dat het `md:`-breekpunt op de
viewport slaat: met een klassieke scrollbar is een venster van 768 een viewport
van 753, en dan vuurt `md:` niet.

## De beweging

Staat er sinds B7. Het concept is **Inslag als karakter, Ploeg als ritme**:
elementen komen hard binnen met een scherpe afremming en zonder naloop, maar
nooit tegelijk. Het motion-hoofdstuk van `design-system.md` legt uit waarom elke
waarde is wat hij is; hier staat hoe het in elkaar zit.

Drie bestanden, en dat zijn ze alle drie:

| Bestand | Wat erin staat |
|---|---|
| `src/styles/tokens.css` | de waardes: curve, twee duren, de stap, de afstand, het masker, de zoom |
| `src/styles/beweging.css` | het mechanisme: de animaties en de vertraging per stap |
| `src/components/beweging/OnthulScript.astro` | de waarnemer die zegt wanneer |

De haal — de ovaal en het onderstreepje uit B8 — hangt eraan maar staat er
naast; zie *De haal* hieronder.

Een sectie doet mee door twee attributen op een element te zetten:
`data-onthul="blok"` of `="kop"`, en `data-onthul-stap="0"` tot en met `8`. Het
nummer komt uit `ploeg()` in `src/lib/beweging.ts`, een teller per sectie: elk
aanwezig onderdeel schuift één stap op, en wat ontbreekt telt niet mee. Roep hem
aan in de volgorde waarin de onderdelen in het ritme horen — bij `beeld-tekst`
staat het beeld soms vooraan in de DOM en telt het toch als laatste mee, want
daar is het het item.

Vijf dingen die je niet moet weghalen:

- **Alles hangt aan `data-beweging="aan"` op `<html>`.** Dat attribuut zet het
  script, en alleen als de bezoeker geen gereduceerde beweging vraagt. Zonder
  JavaScript blijft het weg en staat er dus niets verborgen. Een begintoestand
  die niet aan dat vlagje hangt, maakt van een uitgevallen script een lege
  pagina.
- **Het script meet eerst alles en zet daarna pas het vlagje.** In die volgorde
  krijgt wat al in beeld staat de verborgen toestand nooit te zien: op het
  moment dat `beweging.css` gaat gelden, staat er al `klaar` op. Andersom
  flikkert de hele bovenkant van de pagina.
- **Het is een animatie en geen transitie.** Met `animation-fill-mode: backwards`
  valt een element na afloop terug op zijn eigen stijl. Een transitie zou het
  masker van een kop permanent moeten aanhouden, en dat knipt de staarten van
  een `p` en een `g` af.
- **De vertraging staat als attribuutselector**, één regel per stap. Een
  `style`-attribuut per element zou de CSP breken; `beweging.css` en
  `beweging.ts` klemmen daarom allebei op acht.
- **De waarnemer kent twee drempels, `0` en `0.2`.** Die eerste is er voor een
  element dat zelf hoger is dan het venster — een splitscreen-deur met een lange
  kop op een telefoon. Dat haalt die 0.2 nooit en zou zonder de tweede drempel
  helemaal geen melding meer krijgen, en dus voorgoed onzichtbaar blijven.

### De naad is weg

Van B7 tot B9 stond op elke sectiegrens een haarlijn die zichzelf trok (`Naad`).
De mockup heeft geen scheidingslijnen, dus hij is verwijderd: het component, de
aanroep in `SectieLijst`, het beeldje `inslag-naad` in `beweging.css` en het
geval op `/secties`. De git-geschiedenis heeft hem nog, mét de vier
ontwerpbeslissingen die erin zaten — wie hem terughaalt, leest eerst dat
commentaar.

Daarmee is rol 2 van de bliksemschicht (`scheiding`) opnieuw zonder gebruiker.
`Bliksem` ondersteunt de rol nog; er is alleen geen plek meer die hem inzet.

### De haal — de ovaal en het onderstreepje

Staat er sinds B8, en het is de enige beweging op de site die **niet** op
`--inslag` loopt. De inslag is een klap die scherp afremt en stilvalt; een haal
is een hand die doorstreept, dus `--haal` is nog in beweging op het moment dat
hij ophoudt. Het motion-hoofdstuk van `design-system.md` legt de waardes uit.

Drie bestanden en twee componenten:

| Bestand | Wat erin staat |
|---|---|
| `src/styles/tokens.css` | de waardes: de curve, de pauze, twee duren, de dikte |
| `src/styles/haal.css` | het mechanisme: de pasvorm, de kleur, het tekenen |
| `src/components/merk/HaalScript.astro` | de meting: past de tekst op één regel? |
| `src/components/merk/Ovaal.tsx` | het pad van de ellips |
| `src/components/merk/Streep.tsx` | het pad van de streep |

Vijf dingen die je niet moet weghalen:

- **`haal.css` staat apart van `beweging.css`** omdat maar één van de drie
  dingen die hij doet beweging is. De pasvorm en de kleur staan buiten het
  `no-preference`-blok, want een ovaal om een woordgroep die over twee regels
  breekt is voor iedereen verkeerd.
- **De vertraging komt via `--stap-vertraging`.** Elke stapregel in
  `beweging.css` zet die variabele en leest hem daarna zelf; een custom property
  erft, dus een haal binnen een kop op stap 2 telt er vanzelf zijn eigen
  wachttijd bij op. Haal die variabele weg en elke haal heeft een eigen
  stap-prop nodig door alle acht sectietypes heen.
- **De lijn begint verborgen en wordt zichtbaar gemaakt.** Dat is de andere kant
  op dan de scrollonthulling, en het is bewust: de haal is decoratief en staat
  op `aria-hidden`, dus zonder JavaScript is een ontbrekende versiering beter
  dan een uitgerekte. Bij gereduceerde beweging draait `HaalScript` gewoon — dat
  meet alleen — dus daar staat de haal er wél, volledig getekend en meteen.
- **De dash komt uit een gemeten attribuut, niet uit `pathLength`.** Dat stond
  er wel en het was fout: Chrome negeert `pathLength` zodra
  `vector-effect="non-scaling-stroke"` op het pad staat en rekent de dash in
  schérmruimte — gemeten met `isPointInStroke` gaf dat een gat van 45 tot 80% in
  de lijn, en een tekening die onzichtbaar bleef. `HaalScript` meet daarom de
  schermlengte en zet die als presentatie-attribuut (geen `style`, dus geen
  CSP-conflict); het tekenen is een transitie naar de 0 die `haal.css` zet.
  Non-scaling-stroke zelf blijft: die houdt de lijn overal even dik terwijl het
  vlak in de breedte uitrekt.
- **Breedte én hoogte staan uitgeschreven op de svg.** Een svg is een vervangen
  element met een eigen verhouding, en die wint van een insetpaar zodra de
  andere maat op `auto` staat. Gemeten om een kop van 467×73: met alleen insets
  werd het vlak 531×319, met alleen een hoogte erbij 173×104.

De zoom bij hover zit in `Beeldvlak` achter `zoom`, en staat alleen aan waar het
beeld ergens heen gaat: in de praktijk een splitscreen-deur mét knop. Let op dat
Tailwind 4 `scale-[…]` op de losse `scale`-property zet — een transitie op
`transform` raakt die niet en dan springt de zoom in één beeldje. Dat is niet te
zien aan de klassenaam.

### Beweging meet je niet in een pane die niet composit

De Browser-pane rendert alleen als hij in beeld staat. Staat hij dicht, dan is
`document.visibilityState` `hidden`, vuurt `requestAnimationFrame` niet, gaat
geen enkele `IntersectionObserver` af en levert een `layout-shift`-waarnemer nul
regels op. Een CLS van 0 betekent daar dus niets, en een onthulling die niet
afgaat is geen bewijs dat ze stuk is.

Wat je daar wél kunt meten, en dat is meer dan het klinkt:

- **Layout tegenover verf.** `offsetTop`, `offsetLeft`, `offsetWidth` en
  `offsetHeight` negeren transforms; `getBoundingClientRect()` niet. Verschillen
  die alleen in de tweede zitten, zijn per definitie geen layout-verschuiving.
- **De eindtoestand.** Zet `data-onthul-staat="klaar"` op alles en vergelijk.
- **De gereduceerde-bewegingstak.** Haal `data-beweging` van `<html>` af: dat is
  precies wat het script bij `reduce` doet, dus wat je dan ziet, is wat die
  bezoeker krijgt.
- **Welke eigenschappen bewegen.** Loop `document.styleSheets` langs en lees uit
  de keyframes welke properties er in staan. Let op dat je in `@layer`-blokken
  moet afdalen, anders mis je alles wat Tailwind genereert.

## De zes pagina's

`index.astro`, `opdrachtgevers.astro`, `de-100.astro`, `contact.astro`,
`voorwaarden.astro` en `privacy.astro`. Elk paginabestand is nog maar een paar
regels: het leest zijn inhoud met `leesPagina()` uit `src/lib/pagina.ts` en laat
`SectieLijst` de secties tekenen.

De inhoud staat als yaml in `src/content/paginas/`, één bestand per pagina, en
wordt beheerd via Keystatic. Een singleton zonder contentveld schrijft naar
`<pad>.yaml` — niet naar `<pad>/index.yaml`, dat is een makkelijke misser.

`src/lib/pagina.ts` vertaalt CMS-data naar sectieprops. Drie dingen lopen daar
uit elkaar: `Weergave` wordt afgevlakt tot losse props, een leeg knopobject
verdwijnt in plaats van een knop zonder tekst op te leveren, en de deurfoto's
van het splitscreen komen uit de code omdat ze geen redactionele keuze zijn.

Alle tekst komt uit `bron/`. Wat daar niet staat, staat hier ook niet; er is
niets bijverzonnen. Deze plek wacht daardoor op de klant:

| Plek | Wat ontbreekt |
|---|---|
| `contact.astro` | Het aanmeldformulier. Bouwen we zelf; zie hieronder. De knop wijst zolang naar mailto. |
| `de-100.astro` | Een zin bij Enthousiast, Ervaren en Trots. Bron levert alleen de drie woorden. |

De voorwaardentekst staat er sinds `bron/voorwaarden.md` binnenkwam, letterlijk
overgenomen. Punt 6 linkt naar `/privacy`; die pagina staat er sinds
`bron/privacyverklaring.md` binnenkwam en is daarmee geen blokkade meer.

Achtergronden per pagina: de vier donkere pagina's staan sinds B8 overal op
`bruin`, voorwaarden en privacy overal op `papier`. Meer dan één lichte en één
donkere achtergrond per pagina is volgens het design system een fout; `roet` en
`mist` zijn verhoogde vlakken bínnen een sectie (`Kaart`), geen tweede
sectieachtergrond, en `inkt` is sinds B8 het zwarte vlak óp bruin — een knop of
een blok, geen paginakleur.

## Wat er nog niet staat

**Het aanmeldformulier bouwen we zelf.** Dat is veranderd: eerder liep aanmelden
via een extern formulier waarvan het adres nog moest komen. Dat vervalt. Het
formulier komt in deze repo en verstuurt naar `contact@declubvan.nl`.

Dit is werk voor een eigen sessie, niet iets om er in B4 bij te doen. Het raakt
drie dingen die geen van alle in het huidige fundament zitten:

1. **Een route die op verzoek draait.** Alles is nu vooraf gerenderd. De route
   die de inzending afhandelt krijgt `export const prerender = false;` en is
   daarmee de eerste in dit project. Let op dat `output: 'static'` blijft staan;
   losse routes mogen on demand.
2. **Honeypot plus tijdsdrempel, geen captcha.** Een verborgen veld dat een mens
   niet invult, en een ondergrens op de tijd tussen laden en versturen. Een
   captcha komt er niet in: die legt de last bij de bezoeker en werpt een drempel
   op voor precies de mensen die zich willen melden. Let op dat het honeypotveld
   niet met een `style`-attribuut verstopt kan worden — de CSP blokkeert dat —
   dus dat gaat via een klasse.
3. **De privacyverklaring staat er al**, op `/privacy`. Ze beschrijft het
   formulier dat nog gebouwd moet worden: welke velden het verzamelt, hoe lang
   die bewaard worden, en dat Resend de berichten verstuurt. Wijkt het formulier
   daarvan af, dan gaat die tekst mee — die verklaring is geen formaliteit maar
   de belofte waar het formulier zich aan moet houden.

Eén adres, overal: **`contact@declubvan.nl`**. Dat is het adres dat de klant
heeft opgegeven, en het is ook waar de inzending van het formulier heen gaat.
`info@declubvan.nl` kwam uit de UI kit van het design system en was daar een
plaatshouder; dat adres staat nergens meer in `src/`.

## De navigatie

Staat er sinds B4, in `src/components/navigatie/Navigatie.astro`. Boven 900px
een rij links, daaronder een menuknop met uitklappaneel. De links komen uit de
site-instellingen in het CMS.

Astro-component en geen React, net als de logo's: het hoort bij de layout, en zo
gaat er geen React naar de browser voor één menu.

Drie dingen die je niet moet weghalen:

- **900px is een token**, `--breakpoint-nav` in `tokens.css`, met de variant
  `nav:`. Het valt tussen `md` en `lg` en heeft daarom een eigen naam.
- **Het script kent dat getal niet.** Het kijkt of de menuknop nog zichtbaar is
  (`offsetParent === null`); die staat op `nav:hidden`, dus zodra hij weg is
  zijn we boven het breekpunt. Het getal op twee plekken zetten zou de
  tokencontrole terecht laten vallen.
- **De knop zit in de focusval.** Hij is ook de sluitknop; laat je hem eruit,
  dan loop je met shift+tab het menu uit zonder het te sluiten. Escape sluit én
  geeft de focus terug aan de knop — zonder dat laatste valt de focus terug op
  `<body>` en begint de volgende tab weer bovenaan.

Gemeten met echte toetsaanslagen, niet met synthetische events: die laatste
verplaatsen de focus niet, dus daar meet je niets mee.

## Niet upgraden: Keystatic staat vast op 0.6.4

**`@keystatic/core` en `@keystatic/astro` staan exact gepind, zonder caret en
zonder tilde, met een `overrides`-blok erbij.** Draai hier geen `npm update`
overheen zonder eerst te meten.

Op **0.6.5 opent een rij in een `fields.blocks`-lijst niet meer**. Klikken,
dubbelklikken en Enter doen niets, er komt geen dialoog en er staat niets in de
console. Daarmee is elke bestaande sectie op elke pagina onbewerkbaar: je kunt
alleen nog toevoegen, verwijderen en verslepen. Het CMS is dan stil kapot — de
admin laadt, de lijst staat er, en pas als je iets wilt wijzigen merk je het.

Reproductie (gemeten 11 augustus 2026):

- een singleton met één `fields.blocks` met twee triviale varianten, elk een
  object met één tekstveld, zonder `itemLabel`
- op **0.6.4**: klikken op een rij opent "Edit &lt;variantnaam&gt;" met de velden erin
- op **0.6.5**: er gebeurt niets

Het ligt niet aan ons schema. Een gewone `fields.array` — van een tekstveld óf
van een object, met of zonder `itemLabel` — opent op beide versies gewoon. Het
verschil zit in `fields.blocks`. In die stap gaat `@keystar/ui` van 0.9.2 naar
0.9.3; `react-aria` is in beide 3.50.0, dus dat is het niet.

Gemeld als [Thinkmill/keystatic#1593](https://github.com/Thinkmill/keystatic/issues/1593).
**Zodra dat issue dicht is, kan de pin eraf** — meet dan opnieuw of een
blocks-rij opengaat voordat je hem weghaalt.

### Een oud lokaal concept overschaduwt het bestand

Los van de pin, en niet opgelost. Keystatic bewaart een niet-opgeslagen
bewerking in IndexedDB. Kom je later terug op die pagina, dan toont de admin dat
concept in plaats van het bestand op schijf, met `Unsaved` erboven. Was het
concept van vóór de inhoud, dan zie je een lege lijst — en `Save` schrijft die
leegte dan over de echte secties heen.

We zagen het op opdrachtgevers: vijf secties in de yaml, "Empty list" in het
paneel. `Reset` bracht ze meteen terug.

**Er is geen instelling om dit uit te zetten.** `CommonConfig` kent alleen
`locale`, `cloud` en `ui`, en er zit geen vervaltermijn op een concept — in de
bundel is geen verloop- of `maxAge`-logica te vinden die eraan hangt.
`showDraftRestore` klinkt als een optie maar is een interne functie voor de
melding. Bouw er dus niets omheen: een eigen laag zou de opslag van het pakket
moeten opruimen en gaat bij de eerste update stuk.

De redacteur is er wel voor gewaarschuwd — het staat als eerste blok in
`overdracht.md`, als handeling. Gemeld als
[Thinkmill/keystatic#1594](https://github.com/Thinkmill/keystatic/issues/1594).

### Waarom `vite` ook in overrides staat

Niet hetzelfde probleem, wel dezelfde soort. `astro` wil vite 7,
`@tailwindcss/vite` en `@vitejs/plugin-react` trekken vite 8 naar boven. Met
allebei in de boom komen de types uit twee majors en valt `astro check` om op
`Type 'Plugin<any>[]' is not assignable to type 'PluginOption'` in
`astro.config.mjs`. De override dwingt vite 7 af, wat elke peer-range toelaat.

Dit kwam pas boven bij een verse installatie zonder lockfile. Met de lockfile
erbij merk je het niet, en dat is precies waarom het hier staat.

## Bekende beperking — beeld gaat langs Astro's pijplijn heen

De secties tonen een foto met een gewone `<img>` en niet met Astro's
`<Image>`-component. Dat is geen slordigheid maar een gevolg: de beeldpijplijn
werkt op imports die tijdens het bouwen bekend moeten zijn, en een pad dat uit
een yaml-bestand komt is dat niet. Zodra de redacteur een foto kiest, kan die
niet meer door die pijplijn.

Twee dingen die je daarmee misloopt:

1. **Geen moderne formaten en geen responsieve varianten.** Er wordt geen webp
   of avif gemaakt en geen `srcset` met meerdere breedtes. Iedereen krijgt het
   originele bestand, ook een telefoon. De foto's in `public/beeld` zijn
   1333×2000 of 2000×1333 en 75 tot 910 kB per stuk.
2. **Geen immutable-cacheheader.** `/_astro/*` krijgt van de adapter
   `cache-control: max-age=31536000, immutable`, want de hash in de
   bestandsnaam maakt dat veilig. `/beeld/*` heeft geen hash en krijgt die
   header dus niet; een terugkerende bezoeker haalt die foto's vaker op.

**Beide afwegen in B5, niet nu oplossen.** De oplossing zit waarschijnlijk in
Vercels eigen beeldoptimalisatie of in een hash bij het uploaden, en allebei
raken ze de manier waarop de redacteur een foto kiest.

## Bekende beperking — de admin is half Nederlands

`keystatic.config.ts` staat op `locale: 'nl-NL'`. Dat helpt, maar niet overal.

Keystatic heeft een eigen woordenboek van 27 strings en die zijn voor `nl-NL`
allemaal ingevuld — datumnotatie en relatieve tijd komen er goed uit
("4 seconden geleden"). Wat je daarnaast in het paneel ziet staat niet in dat
woordenboek maar hard in de componentbibliotheek eromheen, en daar is geen
taalinstelling voor. Engels blijven dus onder meer: `Add`, `Empty list`,
`Add the first item to see it here.`, `Unsaved`, `Create` en
`Restored draft from`.

**Ook de foutmeldingen bij verplichte velden.** Die werken wél — het veld krijgt
`aria-invalid`, `aria-required` en de melding hangt er via `aria-describedby`
aan, dus een schermlezer krijgt hem netjes mee. Maar de tekst is Engels en plakt
aan ons Nederlandse label vast: "Wat staat er op de foto must not be empty",
"Foto is required". Ze zijn wel te begrijpen, en ze staan onder het veld waar
het misgaat.

Dit is dezelfde beperking als hierboven, geen aparte. Bouw er geen eigen
validatielaag omheen: die zou de bestaande koppeling met `aria-describedby`
moeten nabouwen, en dat is precies het deel dat nu goed zit.

Alles wat wij zelf schrijven — veldlabels, beschrijvingen, de namen van de
sectietypes, de tekst in de keuzelijsten — is wel Nederlands.

**Bouw hier geen eigen vertaallaag omheen.** Die zou tegen de UI van een pakket
aan gaan zitten dat we niet beheren, en bij elke update opnieuw stuk kunnen. Een
redacteur die een paar keer per jaar inlogt, komt hier langs.

## Bekende beperking

`npm audit --omit=dev` meldt zes kwetsbare pakketten (5 high, 1 low). Van de
acht advisories op `astro` zelf zijn er vijf verholpen door de upgrade naar
Astro 6; drie blijven staan en die vragen allemaal Astro 7:

| Advisory | Gepatcht vanaf |
|---|---|
| XSS via unescaped spread attribute names | 7.0.6 |
| XSS via `transition:*` op gehydrateerde eilanden | 7.0.4 |
| Reflected XSS via View Transition-animatieproperties | 7.1.0 |

Daarnaast `esbuild` (low, alleen de dev-server op Windows), `sharp`,
`path-to-regexp` en `@vercel/routing-utils`.

De drie resterende astro-advisories gaan over View Transitions, `transition:*`
en spread-attributen. Dit project gebruikt geen van drieën — spread-attributen
zijn zelfs bij afspraak verboden — dus de blootstelling is nu nul. Dat verandert
zodra je ze wel inzet.

Niet oplossen met `npm audit fix --force`: dat tilt de repo naar Astro 7 en
`@astrojs/vercel` 11. Overleg eerst.
