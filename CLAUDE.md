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
oxlint  →  check-tokens  →  astro check  →  astro build  →  check-csp
```

`check-csp` staat achteraan omdat hij de gebouwde HTML leest.

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

## Twee kopieën van hetzelfde pakket

**Dit is in dit project drie keer misgegaan, en drie keer kostte het een half
uur voordat iemand doorhad wat het was.** Markdoc, vite en Keystatic, alle drie
dezelfde oorzaak: twee versies van hetzelfde pakket naast elkaar in de boom.

Twee symptomen, en ze lijken allebei niet op een versieprobleem:

1. **`astro check` valt op "not assignable to type"**, waarbij het type links en
   rechts identiek lijkt en zelfs hetzelfde heet. Het pad in de foutmelding
   verraadt het: twee keer hetzelfde type uit twee verschillende mappen.
   Bijvoorbeeld `node_modules/@keystatic/core/node_modules/@markdoc/markdoc/...`
   tegenover `node_modules/@markdoc/markdoc/...`. Structureel gelijk, nominaal
   verschillend, en TypeScript rekent op naam.
2. **Iets doet stil niets.** Geen foutmelding, geen consolefout, geen kapotte
   pagina — een klik doet gewoon niets, of een component rendert zonder de helft
   van zijn gedrag. Dat gebeurt als twee kopieën ieder hun eigen state of
   context hebben en er dus twee werelden naast elkaar draaien.

Diagnose kost één commando:

```bash
npm ls <pakket>
```

Staat het er meer dan één keer, of zegt het `deduped` niet waar je dat verwacht,
dan is dat het. Let ook op een geneste `node_modules` binnen een pakket — dat is
altijd een tweede kopie.

De oplossing is een `overrides`-blok in `package.json`, dat de hele boom op één
versie dwingt:

```json
"overrides": {
  "@keystatic/core": "0.6.4",
  "vite": "^7"
}
```

Kies de versie die het strengste pakket nodig heeft, niet de nieuwste. Bij vite
was dat de 7 die `astro` gebruikt, terwijl `@tailwindcss/vite` er 8 bij haalde.

Wat hier níet werkt: een caret. `^0.6.4` haalt bij een verse installatie gewoon
weer 0.6.5 binnen. Een pin die iets moet tegenhouden is exact of hij is niets.

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
4. **Basis** — reset, links, focus, de breedte-as, gereduceerde beweging.

Laag 2 en 4 staan bewust buiten `@theme`: een alias die per thema iets anders
betekent en een CSS-reset zijn geen themetokens. Let op dat `@theme inline` de
`--color-*`- en `--spacing-*`-variabelen niet als CSS-variabele uitstuurt; die
worden in de utility ingebakken. Handgeschreven CSS leunt daarom op de
primitieven uit laag 1.

Laag 4 staat in `@layer base`. Ongelaagde CSS wint van Tailwinds
`@layer utilities`, en dan kan een utility als `no-underline` de linkstijl niet
meer overschrijven.

## Koppelbestanden

Er zijn er twee. Alles wat een sectie aan iets anders vastknoopt, staat in één
van deze twee bestanden en nergens anders:

- **`src/lib/tokens.ts`** — tokennaam naar Tailwind-klasse, voor achtergrond,
  verticale ruimte, containerbreedte en leesbreedte. Elke groep heeft een
  union-type, dus een tokennaam die niet bestaat is een compileerfout. Alleen
  klassenamen in dit bestand; een rauwe waarde laat `check-tokens.mjs` de build
  breken.
- **`src/lib/SectionRenderer.tsx`** — sectietype naar component. Een onbekend
  type toont in ontwikkeling een melding met het type erin en rendert in
  productie niets. De `default`-tak bevat een exhaustiviteitscontrole: een type
  dat wel in de union staat maar geen `case` heeft, is een compileerfout.

## Componenten

React, want `SectionRenderer.tsx` en de secties zijn dat ook. Ze worden statisch
voorgerenderd, dus er gaat geen JavaScript naar de browser.

| Component | Map | Waarvoor |
|---|---|---|
| `Knop` | `components/basis/` | Elke actie. Varianten `vol`, `lijn`, `kaal`; maten `s`, `m`, `l` |
| `Kaart` | `components/basis/` | Alles wat in een raster staat |
| `Bovenkop` | `components/basis/` | Het labeltje boven een sectiekop |
| `Scheiding` | `components/basis/` | Vervangt de `<hr>`, eventueel met schicht |
| `Beeldvlak` | `components/beeld/` | Elke foto met tekst erop |
| `Bliksem` | `components/merk/` | De schicht, in drie rollen |

De logo's staan apart in `src/components/logo/` en zijn Astro-componenten, geen
React: ze worden door de layout gebruikt, niet door secties. Alle vier houden
`fill="currentColor"` en nemen geen props aan.

**Beeldvlak dwingt de sluier af.** Er is geen prop die hem weglaat en geen tak
die hem overslaat. Zonder behandeling haalt witte tekst op deze fotografie nooit
betrouwbaar AA, en een foto is geen token: hij wordt vervangen en dan klopt het
contrast niet meer.

## Sectietypes

Acht, allemaal in `src/components/sections/` en gekoppeld in
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

**`hero` is de enige sectie met een `<h1>`.** Alle andere openen op `<h2>`.
Zolang een pagina precies één hero heeft, kloppen de koppenvolgorde en de regel
"één `display-xl` per pagina" vanzelf; twee heroes op één pagina breken allebei.

Met beeld loopt de kop door `Beeldvlak` en vervalt de schicht. De grote schicht
is een uitgesneden vlak op een egale achtergrond — over een foto is dat geen
van de drie toegestane rollen, en de sluier zou hem toch opeten.

### Een nieuwe sectie toevoegen

Een nieuwe sectie landt altijd op drie plekken. Sla er één over en je merkt het
pas laat:

1. `src/components/sections/<Naam>.tsx` — de sectie zelf, volgens regel 3 en 4.
2. `src/lib/SectionRenderer.tsx` — het type in de union én een `case` in de
   switch.
3. `src/pages/secties.astro` — vier keer renderen, onder de omstandigheden waar
   een sjabloon op stukloopt.

Nieuwe kleuren of maten horen eerst in `tokens.css` en dan in `tokens.ts`, niet
rechtstreeks in de sectie.

### Het sectieoverzicht

`src/pages/secties.astro` is de beheerbaarheidstest: elk type onder een te lange
kop, een lege tekst, weinig items en veel items, plus een regressievariant voor
de overflow-bug in `Beeldvlak`. De pagina routeert zodat je hem kunt bekijken en
is afgeschermd met een `noindex`-meta plus `Disallow: /secties` in
`public/robots.txt`.

Meet responsieve fouten, kijk er niet naar. De vier gebreken die in B2 boven
kwamen waren geen van alle zichtbaar op een screenshot; ze kwamen uit
`getBoundingClientRect()` in de browser. Let op dat het `md:`-breekpunt op de
viewport slaat: met een klassieke scrollbar is een venster van 768 een viewport
van 753, en dan vuurt `md:` niet.

## De zes pagina's

`index.astro`, `opdrachtgevers.astro`, `de-100.astro`, `contact.astro`,
`voorwaarden.astro` en `privacy.astro`. Elk paginabestand is nog maar een paar
regels: het leest zijn inhoud met `leesPagina()` uit `src/lib/pagina.ts` en laat
`SectionRenderer` de secties tekenen.

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

Achtergronden per pagina: de vier donkere pagina's staan overal op `inkt`,
voorwaarden overal op `papier`. Meer dan één lichte en één donkere achtergrond
per pagina is volgens het design system een fout; `roet` en `mist` zijn
verhoogde vlakken bínnen een sectie (`Kaart`), geen tweede sectieachtergrond.

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

**De mobiele navigatie landt in B4.** Het design system wil onder 900px een
hamburger met uitklappaneel — `.c100-nav__knop` en `.c100-nav__paneel`, oftewel
de `Navigatie`-component. Tot die tijd breken de vier links in de header af op
smalle schermen. Dat haalt de horizontale scroll weg maar is niet de bedoelde
oplossing. In B4 verhuist de navigatie tegelijk naar het CMS.

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
