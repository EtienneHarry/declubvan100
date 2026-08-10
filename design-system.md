# Design system — De Club van 100

Dit document beschrijft hoe het design system van De Club van 100 in deze repo
is uitgewerkt, en waar de uitwerking bewust afwijkt van de bron.

**De bron staat buiten deze repo**: het design system van De Club van 100, met
de guidelines voor typografie, contrast, beeld en de bliksemschicht. Dit
document vervangt dat niet. Staat iets hier niet in, dan is de bron leidend;
staat er hier een afwijking genoteerd, dan is die bewust.

`src/styles/tokens.css` is de uitwerking van de tokens. Dat is de enige plek in
`src/` waar letterlijke waardes mogen staan.

---

## Kleur

Monochroom, zwart dominant. **Geen accentkleur** — dat is een merkregel, geen
smaak: alle logo's zijn monochroom op `currentColor`.

Vier achtergronden en niet meer, uitspreekbaar zodat ze in een CMS-keuzelijst
passen: `inkt` (dominant), `roet` (verhoogd vlak op inkt), `papier` (lichte
pagina), `mist` (rustig vlak op papier). Meer dan één lichte en één donkere
achtergrond per pagina is een fout.

Tekst: `krijt` / `krijt-zacht` / `krijt-stil` op donker, `inkt` / `grafiet` op
licht. Functionele kleur bestaat alleen in paren (`fout` + `fout-donker`) en is
gedempt.

De semantische aliassen — `--vlak`, `--tekst`, `--lijn`, `--focus-ring` —
kantelen onder `[data-thema="licht"]`. Een sectie op `papier` of `mist` zet dat
attribuut zelf, zodat alles erbinnen meekantelt.

**`krijt-stil` mag nooit op `papier` of `mist`**: dat haalt 2,9:1. Gebruik daar
`grafiet`.

## Typografie

**Archivo Variable**, één familie, twee assen: gewicht 100–900, breedte 62–125.
Zelf gehost via `@fontsource-variable/archivo/wdth.css` — bewust die import en
niet de standaard, want die laat de breedte-as weg.

Displaykoppen op `wdth 118` (`display-xl`) en `112` (`display-l`), lopende tekst
op `100`. Dat is het grafische verschil dat de site draagt en het kost nul extra
bytes. Gemeten: dezelfde tekst is op 118 ruim 19% breder dan op 100.

Tailwind kent geen namespace voor `font-variation-settings`, dus de breedte-as
staat als twee losse regels in laag 4 van `tokens.css`.

Leesbreedte is 66ch op licht en 60ch op donker; `maatRegelKlasse` in `tokens.ts`
kiest de juiste per achtergrond.

**Afwijking — knopmaten.** Het design system zet voor `maat="s"` en `maat="l"`
een eigen lettergrootte (`.9375rem` en `1.125rem`). Daar bestaat geen token
voor, dus alle drie de maten staan op `--text-knop` en verschillen alleen in
hoogte en padding.

## Ruimte

Basiseenheid 4px; alles is een veelvoud. Tailwinds `--spacing` staat daarop, dus
`p-6` is 24px.

Sectieritme in drie vloeiende stappen: `sectie-s`, `sectie-m`, `sectie-l`. De
marge is `clamp(20px, 5vw, 64px)`.

## Grid en layout

Container 1280px, smal 768px, breed 1600px. De breedtetoken levert meteen de
hele container: gecentreerd, met de marge links en rechts.

Hitzone minimaal 44px — `min-h-11` op elke knop en navigatielink.

## Radius en diepte

Hoeken zijn hard: `radius-none` is de standaard. `radius-veld` (2px) alleen voor
invoervelden, `radius-overlay` (4px) alleen voor overlays, `radius-vol` alleen
voor een ronde iconknop of telbadge.

**Op zwart bestaat schaduw niet**: diepte is een verhoogd vlak (`roet`) plus een
lijn. Op `papier` en `mist` mag wél een korte, lichte schaduw — een klikbare
kaart krijgt daar bij hover `shadow-licht-2`.

## Componenten

Zes gebouwd: `Knop`, `Kaart`, `Bovenkop`, `Scheiding` (`components/basis/`),
`Beeldvlak` (`components/beeld/`) en `Bliksem` (`components/merk/`). De
propscontracten staan in de bron; hieronder alleen waar de uitwerking afwijkt.

Alle drie de afwijkingen hebben dezelfde oorzaak: **`security.csp` blokkeert
inline stijl**, en dit project staat geen spread-attributen, `className` of
`style` van buitenaf toe. Een prop die een vrije CSS-waarde doorgeeft kan dus
niet bestaan.

| Component | Weggelaten uit het contract | In plaats daarvan |
|---|---|---|
| `Knop` | `as`, `onClick`, losse DOM-attributen | Alles is statisch voorgerenderd; een handler zou zonder hydratatie toch niet lopen |
| `Beeldvlak` | `hoogte`; `verhouding` als vrije CSS-waarde | `verhouding` is een keuze uit de drie die de beeldrichtlijn noemt: `breed`, `portret`, `vierkant` |
| `Bliksem` | `hoogte`, `dekking` | De rol bepaalt maat en dekking, precies zoals de richtlijn ze beschrijft |

## Motion

Kort en zakelijk. Kleur en lijn op `--duur-1` (120ms), de indruk op `--duur-2`
(180ms), curve `--soepel-uit`. Bij `:active` gaat een knop of klikbare kaart naar
`scale(var(--indruk))`. Geen bounce, geen veer, geen parallax, geen carrousel.

Twee verschillende duren op één element passen niet in een losse
`duration`-klasse, dus dat gaat via de `transition`-shorthand.

Bij `prefers-reduced-motion: reduce` zet `tokens.css` globaal elke duur op 1ms
en laat elke verschuiving vervallen.

**Afwijking — spinner en skelet staan op `motion-safe`.** De bron laat de
spinner bij gereduceerde beweging op 2,4s draaien en zet de skelet-animatie uit.
Die 2,4s haalt het niet: de globale regel eromheen zet `animation-duration` met
`!important` op 1ms, en dat wint. Het gevolg zou zijn dat de spinner juist
razendsnel gaat tollen bij precies de bezoeker die om minder beweging vraagt.

Daarom draaien spinner en skelet nu binnen
`@media (prefers-reduced-motion: no-preference)`. Wie gereduceerde beweging
vraagt krijgt een stilstaande ring en een stilstaand skelet — geen beweging in
plaats van te snelle beweging. De laadstatus blijft zichtbaar via `aria-busy` en
de vorm zelf.

## Beeld

Eigen fotografie, geen stock. Full-bleed of tot de containerrand. Verhoudingen
16:9 (`breed`), 4:5 (`portret`), 1:1 (`vierkant`).

**Tekst op beeld loopt altijd via `Beeldvlak`**, dat de sluier afdwingt. Zonder
behandeling haalt witte tekst op deze fotografie nooit betrouwbaar AA, en een
foto is geen token: hij wordt vervangen en dan klopt het contrast niet meer.

**Afwijking — splitscreen gebruikt de vlakke sluier.** De beeldtabel wijst
splitscreen `--sluier-zij` toe, bedoeld voor tekst in de linkerhelft. Een deur
is op mobiel ongeveer 335px breed; daar heeft tekst de volle breedte nodig en
staat de rechterhelft op het doorzichtige deel van dat verloop. Gemeten op
375px besloeg de tekst 88% van het vlak. Daarom `--sluier` (62% over alles), de
regel die de bron aan "kaart met tekst over beeld" hangt — en een splitscreen-
deur ís dat functioneel. Wit haalt daar 5,4:1.

In de repo staat één foto, `src/assets/photo/proost-tap.png`, gebruikt als
og:image en in het sectieoverzicht. De overige zeven zitten in de bron. Let op:
deze beelden komen uit een pdf en zijn niet de originelen.

## Voice

Jij en wij, altijd. Zeg het in de helft van de woorden. Toon in plaats van
beweren: niet "onze mensen zijn ervaren", wel "iedereen die hier staat, heeft
honderd avonden achter een bar gestaan".

Het getal is het argument. Nooit vaag over geld, tijd of wat je krijgt — in deze
branche is concreet zijn geen stijlkeuze maar een merkbelofte.

Hoofdletters alleen op `bovenkop`, knoptekst en displaykoppen van maximaal drie
woorden. Geen emoji, geen uitroeptekens.

Knoppen schrijf je als wat de bezoeker zelf zou zeggen: "Stuur maar", niet
"Verzenden". Foutmeldingen zeggen wat er nú moet gebeuren, niet wat stuk is.
Optionele velden krijgen "— mag je overslaan"; verplichte velden krijgen geen
sterretje.

De volledige woordenlijst en de microcopy-tabel staan in de bron.
