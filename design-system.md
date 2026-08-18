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

Warm bruin dominant, met vuur als enige accent. Gemeten uit de mockup die de
klant in augustus 2026 aanleverde; `bron/restyle-brief-v2.md` legt de meting
vast, dit hoofdstuk de uitwerking.

**De regel "geen accentkleur" is vervallen.** Ze stond hier tot de restyle, en
haar onderbouwing was dat alle logo's monochroom op `currentColor` staan. Dat
klopt nog steeds — de logo's zijn niet veranderd — maar het was een gevolgtrekking
uit het logo en geen uitspraak over de site. De mockup zet er een rode
INHUREN-knop in, en daarmee is de vraag beantwoord door degene die hem stelde.
Wat blijft staan is de reden achter de oude regel: één accent, en het draagt
nooit tekst. Zie `vuur` hieronder.

Vijf achtergronden, uitspreekbaar zodat ze in een CMS-keuzelijst passen. Drie
donker en twee licht:

| Token | Waarde | Waarvoor |
|---|---|---|
| `bruin` | `#201410` | dominant; het vlak waar de site op staat |
| `inkt` | `#0b0b0b` | het zwarte vlak óp bruin, en de zwarte knop |
| `roet` | `#2c1f1a` | verhoogd vlak op bruin: kaart, invoerveld, sticky balk |
| `papier` | `#fafaf8` | lichte pagina: voorwaarden, privacy, print |
| `mist` | `#e4e4e1` | rustig vlak op papier |

**Meer dan één lichte en één donkere achtergrond per pagina blijft een fout.**
De donkere familie telt er drie, maar een pagina kiest er één. `roet` is dan het
verhoogde vlak binnen die pagina en geen tweede sectieachtergrond.

Tekst: `krijt` / `krijt-zacht` / `krijt-stil` op donker, `inkt` / `grafiet` op
licht, met `cream` als accent op donker. Functionele kleur bestaat alleen in
paren (`fout` + `fout-donker`) en is gedempt.

De semantische aliassen — `--vlak`, `--tekst`, `--lijn`, `--focus-ring` —
kantelen onder `[data-thema="licht"]`. Een sectie op `papier` of `mist` zet dat
attribuut zelf, zodat alles erbinnen meekantelt.

### Contrast, herrekend op de definitieve waardes

Alle verhoudingen hieronder zijn WCAG 2.1, berekend op de waardes zoals ze nu in
`tokens.css` staan — niet op de afgeronde meting uit de brief. AA vraagt 4,5:1
voor gewone tekst en 3:1 voor groot (24px, of 19px vet) en voor UI-randen.

Op de drie donkere vlakken:

| Tekst | op `bruin` | op `inkt` | op `roet` |
|---|---|---|---|
| `krijt` | 17,96 | 19,68 | 15,93 |
| `papier` | 17,19 | 18,83 | 15,25 |
| `mist` | 14,10 | 15,45 | 12,51 |
| `cream` | 11,71 | 12,83 | 10,39 |
| `krijt-zacht` | 10,82 | 11,86 | 9,60 |
| `krijt-stil` | 5,19 | 5,69 | 4,60 |
| `vuur` | **3,18** | **3,48** | **2,82** |
| `grafiet` | **2,68** | **2,93** | **2,37** |

Op de twee lichte vlakken, en op `cream` als vlak:

| Tekst | op `papier` | op `mist` | op `cream` |
|---|---|---|---|
| `inkt` | 18,83 | 15,45 | 12,83 |
| `bruin` | 17,19 | 14,10 | 11,71 |
| `grafiet` | 6,42 | 5,27 | **4,37** |
| `vuur` | 5,41 | **4,44** | **3,69** |
| `krijt-stil` | **3,31** | **2,72** | **2,26** |

Tekst óp `vuur`: `krijt` 5,65 · `papier` 5,41 · `cream` 3,69 · `inkt` 3,48 ·
`bruin` 3,18.

Daaruit volgen zes regels, en die zijn niet onderhandelbaar:

- **`vuur` is nooit tekstkleur op `bruin`.** 3,18:1 haalt AA niet, ook niet voor
  groot. Het is een vlak: een knop, een klein blok. Nooit een woord.
- **Knoptekst op `vuur` is wit.** 5,65:1, en dat geldt voor elke maat. De mockup
  zet er cream-typemachinetekst op; die haalt 3,69:1 en dus alleen de
  groot-tekstdrempel, en alleen zolang die knop groot en gespatieerd blijft.
  Dat is een voorwaarde die een redacteur kan breken zonder het te zien, dus de
  `vuur`-knop staat op wit.
- **`grafiet` mag niet op `cream`** (4,37:1) en `vuur` ook niet (3,69:1). Op een
  creamvlak schrijf je met `inkt` of `bruin`.
- **`krijt-stil` mag nooit op `papier`, `mist` of `cream`.** Gebruik daar
  `grafiet`. Op de drie donkere vlakken mag hij wel, tot en met `roet` (4,60:1).
- **`vuur` op `mist`** haalt 4,44:1 en is dus geen gewone tekst; op `papier`
  haalt het 5,41:1 en mag het wel. Praktisch: houd `vuur` ook op licht een vlak.
- **De randen doen het werk tussen twee donkere vlakken.** `inkt` op `bruin` is
  1,10:1 en `roet` op `bruin` 1,13:1. Dat is met opzet zo klein — het design
  system zegt dat diepte op donker een verhoogd vlak plus een lijn is, en die
  lijn (`--lijn`, 0,16 wit) is hier het enige dat de rand echt zichtbaar maakt.
  Haal je hem weg, dan verdwijnt de kaart in de sectie.

**Afwijking — `roet` is afgeleid en niet gemeten.** De mockup toont geen
verhoogd vlak, en het oude `roet` (`#191919`) is een koud grijs dat naast bruin
uit de toon valt. `#2c1f1a` is 94% `bruin` met 6% `cream`: dezelfde stap omhoog
die `roet` op `inkt` had (1,13 tegen 1,12), zodat de verhouding tussen vlak en
verhoogd vlak niet verandert. `krijt-stil` houdt er 4,60:1 en dat is precies de
ondergrens waarop deze waarde is uitgekozen. Levert de klant alsnog een gemeten
verhoogd vlak, dan wint dat.

### Sluiers

Twee tonen, allebei verplicht onder tekst op foto en allebei niet uit te zetten:

| Token | Waarde | Waarvoor |
|---|---|---|
| `--sluier-donker` | `bruin` op 62% | witte tekst op beeld |
| `--sluier-licht` | `cream` op 72% | donkere tekst op beeld, de hero van de mockup |

De donkere is bruin geworden en niet meer inkt: dezelfde dekking, maar op de
nieuwe achtergrond, anders ligt er een koude vlek op een warm vlak. De
verloopvarianten `--sluier-onder` en `--sluier-zij` zijn mee overgezet.

Doorgerekend op de uitersten van een foto — een plek die volledig wit is en een
plek die volledig zwart is, want de foto zelf is geen token:

- **`--sluier-donker`**: wit haalt in het slechtste geval 5,05:1 en in het beste
  19,32:1. Cream haalt in het slechtste geval 3,29:1 en is dus **geen tekstkleur
  op beeld**.
- **`--sluier-licht`**: `inkt` haalt in het slechtste geval 6,69:1 en in het
  beste 14,57:1; `bruin` 6,11:1 en 13,30:1. Allebei ruim boven AA.

## Typografie

Drie families sinds de restyle, alle drie zelf gehost via `@fontsource` en alle
drie via een token. `scripts/check-tokens.mjs` leest de tokennamen uit
`tokens.css` en laat de build vallen op elke letterlijke familienaam daarbuiten,
dus deze drie zijn ook de enige drie die er kunnen zijn.

| Token | Familie | Rol |
|---|---|---|
| `--font-sans` | Montserrat Variable | dragend: koppen én lopende tekst |
| `--font-machine` | Special Elite | labels, knoppen, één uitgelichte regel |
| `--font-hand` | Caveat | één decoratieve regel per pagina |

**De dragende letter is Montserrat, Route A uit de brief.** Woordmerk en site
vallen daarmee samen: Montserrat was al bevestigd als woordmerkletter, en de
sans in de mockup zit er dicht op. Route B — Archivo laten staan — zou het
systeem niet hoeven omzetten, maar de site hoekiger laten ogen dan wat de klant
heeft goedgekeurd.

**De prijs van die keuze is de breedte-as.** Archivo had er twee (gewicht
100–900, breedte 62–125) en de displayniveaus stonden op `wdth 118` en `112`;
dat was het grafische verschil dat de site droeg. Montserrat heeft alleen een
gewichtsas. De twee `font-variation-settings`-regels in laag 4 van `tokens.css`
zijn daarom weg, en de displayniveaus dragen het verschil nu op gewicht (800) en
grootte — `display-xl` loopt tot 8rem, `display-l` tot 5rem.

De brief noemt de dragende letter `--font-basis`. Hier heet hij `--font-sans`,
en dat is geen slordigheid: Tailwind hangt aan die naam zowel de
`font-sans`-utility als de standaardfamilie van de `body`. Onder een andere naam
zou `font-sans` stilletjes Tailwinds eigen stack blijven — precies de val die
`check-tokens` moet vangen.

Leesbreedte is 66ch op licht en 60ch op donker; `maatRegelKlasse` in `tokens.ts`
kiest de juiste per achtergrond.

**Afwijking — knopmaten.** Het design system zet voor `maat="s"` en `maat="l"`
een eigen lettergrootte (`.9375rem` en `1.125rem`). Daar bestaat geen token
voor, dus alle drie de maten staan op `--text-knop` en verschillen alleen in
hoogte en padding.

### De typemachine

Special Elite: een gestempelde slab met de onregelmatigheid van een echte
typemachine. Vier regels, en ze zijn er alle vier om te voorkomen dat hij
lopende tekst wordt:

- **Altijd hoofdletters.**
- **Altijd op `--machine-tracking` (0,14em).** Die spatiëring hoort bij de
  familie en niet bij één maat, dus hij staat als primitief in laag 1 en wordt
  door `--text-bovenkop`, `--text-knop` en de utility `tracking-machine`
  gelezen. In `@theme inline` kon hij niet staan: dat blok bakt zijn waardes in
  de utility en stuurt ze niet als variabele uit, dus een token dat door andere
  tokens gelezen wordt moet een primitief zijn.
- **Alleen labels, knoppen en maximaal één uitgelichte regel per sectie.**
- **Nooit voor lopende tekst langer dan twee regels.** Special Elite is
  monospaced en licht versleten; op regellengte leest hij traag en op een
  telefoon breekt hij lelijk.

In de praktijk raakt dat vandaag twee componenten — `Bovenkop` en `Knop` — plus
het nummer op een `Kaart`. De uitgelichte regel bestaat nog niet als component;
komt hij er, dan is `font-machine tracking-machine uppercase` de hele vorm.

### Het handschrift

Caveat, en het is het enige element op deze site dat puur decoratief is. Twee
regels:

- **Maximaal één regel per pagina.** Niet per sectie — per pagina. Twee
  handgeschreven regels op één pagina maken er een sfeerbeeld van in plaats van
  een accent.
- **`aria-hidden` zodra dezelfde boodschap al in gewone tekst op de pagina
  staat.** De mockup doet precies dat: drie bijschriften onder een drieluik, en
  eronder dezelfde tekst nog eens in handschrift. Dat tweede exemplaar is een
  plaatje van een zin, geen zin — een schermlezer hoort hem niet te herhalen.
  Staat de boodschap er níet al, dan is hij wél betekenisdragend, en dan hoort
  hij niet in het handschrift maar in de dragende letter.

Caveat is een gok. De brief zet de zekerheid van deze familie op laag en van
Special Elite op matig; heeft de maker van de mockup de echte namen, dan winnen
die. Omzetten is één regel in `global.css` en één token in `tokens.css`.

**Het dubbellaagse hero-effect** — de witte kop met de donkere offsetlaag
eronder — hoort ook bij dit hoofdstuk maar staat bij `Hero` onder *Componenten*,
want het is een variant van dat sectietype en nergens anders toepasbaar.

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

Gebouwd: `Knop`, `Kaart`, `Bovenkop`, `Naad`, `Teller` (`components/basis/`),
`Beeldvlak` (`components/beeld/`) en `Bliksem` (`components/merk/`). De
propscontracten staan in de bron; hieronder alleen waar de uitwerking afwijkt.

### Wat de restyle aan de bestaande componenten veranderde

**`Knop` heeft er twee varianten bij: `vuur` en `inkt`.** Allebei gevuld, dus
allebei onder dezelfde regel als `vol` — maximaal één per blikveld. `vuur` is de
primaire actie en de enige plek waar die kleur op de site landt; de tekst erop
is wit en niet cream, want cream haalt er 3,69:1. `inkt` is de zwarte knop uit
de mockup, met cream als tekst (12,83:1). `vol` — de witte knop van vóór de
restyle — blijft bestaan omdat het design system hem als primair kent, maar de
mockup gebruikt hem nergens.

De hover van die twee loopt via dekking en niet via een tweede kleur. Een
hovertoken erbij zou een waarde zijn die de mockup niet meet; met dekking laat
de knop een tikje van de sectie erdoor en dat werkt op elke achtergrond dezelfde
kant op. De lijnvariant deed dat al.

**De knoptekst staat in de typemachine**, net als `Bovenkop`, het nummer op een
`Kaart`, de menuknop van de navigatie en de kolomkoppen in de voettekst. Dat
zijn alle labels en knoppen die er zijn; verder komt die familie nergens.

**`Beeldvlak` heeft een `toon`.** `donker` is de bestaande sluier, `licht` de
bijna-sepia laag uit de hero van de mockup. De lichte zet ook
`data-thema="licht"` op het vlak, zodat alles erbinnen meekantelt — een
bovenkop, een knop, een lijn — en niet alleen de tekstkleur klopt.

De lichte toon zet naast `data-thema="licht"` ook `data-vlak="cream"`. Dat
tweede attribuut haalt `--tekst-zacht` en `--tekst-stil` weg en bindt ze aan de
hoofdtekstkleur: **op cream bestaat geen gedempte tekst**, want grafiet haalt er
4,37:1. De hiërarchie komt daar uit maat en gewicht. Dit was bij de meting op
`/secties` de enige tekst op de hele pagina die onder de drempel viel, en hij
viel er pas in nadat de lichte sluier erbij kwam.

*Afwijking:* de donkere toon heeft drie vormen (`onder`, `zij`, `vlak`), de
lichte één. Dat is geen omissie maar de meting: de mockup zet de lichte sluier
één keer neer, als vlakke laag over de hele hero, en er is geen licht verloop
gemeten. De drie plekken van de lichte toon wijzen daarom alle drie naar
dezelfde vlakke laag.

**Welke knop welke kleur krijgt, is nog niet uitgevochten.** `Hero` en `Oproep`
zetten hun primaire actie nu op `vuur` en hun tweede op `lijn`. De mockup zet er
twee gevulde naast elkaar — AANMELDEN zwart, INHUREN rood — maar welke van de
twee acties op een gegeven pagina welke kleur verdient, hangt aan de nieuwe
koppen. Die komen in sessie 2, en dan verschuift deze toewijzing mee.

**Afwijking — `Scheiding` heet hier `Naad`, en heeft nog geen schicht.** De bron
kent hem als vervanger van de `<hr>`, met de schicht erin. Hij is in B2 gebouwd
en in B4 weggehaald omdat geen enkele sectie hem inzette; in B7 is hij
teruggekomen als `Naad` (`components/basis/`), en nu met een gebruiker: hij
staat op elke sectiegrens.

Wat er anders is dan in de bron:

- **Hij wordt niet door een sectie ingezet maar door `SectieLijst`.** Een
  scheiding is de enige plek die per definitie twee buren heeft, en dat is
  precies wat een sectie volgens regel 4 niet mag weten. `SectieLijst` weet het
  wel — daar wordt het kopniveau ook al over de hele lijst berekend.
- **Hij hoort bij de sectie eronder** en krijgt haar achtergrond en haar
  breedte. Hij is de bovenrand van wat er komt, niet de voet van wat er was.
- **De schicht zit er nog niet in.** De richtlijn staat er hoogstens twee per
  pagina toe; welke twee dat op een pagina zijn, is een redactionele keuze en
  geen instelling van het component. Zolang die keuze niet gemaakt is, is de
  naad alleen de lijn.
- **Geen `role="separator"`.** De koppen structureren de pagina al, en zestien
  separators erbij zijn ruis voor wie met een schermlezer door de elementen
  loopt. Hij staat op `aria-hidden`.

Van de drie rollen van de schicht zijn `groot` en `opsomming` in gebruik. Rol 2
heeft in de lijn zijn plek terug; de schicht erin wacht op die keuze.

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

### Inslag als karakter, Ploeg als ritme

Dat is het concept achter alles wat op deze site binnenkomt. Een element komt
hard binnen, remt scherp af en staat dan stil: geen naloop, geen veer, geen
overshoot. Maar nooit met z'n allen tegelijk — binnen een sectie volgen ze
elkaar op in een strak ritme.

Het is het gedrag van de bliksemschicht uit het logo, vertaald naar timing. De
schicht is één harde beweging met een scherpe knik erin; hij zwelt niet aan en
hij dijt niet uit. Dezelfde toon als de voice: kort en zeker, niet zacht en niet
traag.

| Token | Waarde | Waarvoor |
|---|---|---|
| `--inslag` | `cubic-bezier(0.12, 0.9, 0.1, 1)` | alles wat binnenkomt |
| `--duur-inslag-dekking` | 340ms | de dekking, en het masker onder een kop |
| `--duur-inslag-hef` | 420ms | de verplaatsing |
| `--ploeg` | 70ms | tussen twee opeenvolgende elementen in één sectie |
| `--inslag-hef` | 24px | de afstand, altijd van onder naar boven |
| `--inslag-masker` | 112% | hoe ver het masker onder een kop doorloopt |
| `--zoom-beeld` | 1.05 | hover op een beeld dat ergens heen gaat |
| `--duur-zoom` | 700ms | diezelfde zoom |

**De curve is de inslag.** Het eerste stuurpunt ligt op `0.12, 0.9`: bij een
achtste van de tijd is negen tiende van de weg al afgelegd. De rest van de duur
is afremmen. Geen van beide stuurpunten komt boven 1 uit, dus er is geen
doorschieten en geen terugveren.

**De verplaatsing gaat altijd omhoog en nooit verder dan 24px.** Naar boven,
want dat is de richting van binnenkomen; 24px, want alles daarboven wordt een
reis in plaats van een inslag. De verplaatsing duurt langer dan de dekking
(420 tegen 340ms), zodat een element eerst helemaal zichtbaar is en dan pas
stilvalt.

**Koppen faden niet, ze komen uit een masker omhoog.** Een kop is het zwaarste
element op een pagina; die hoort tevoorschijn te komen, niet langzaam waar te
worden. Het masker is een `clip-path` die met de kop mee opengaat terwijl hij
omhoog schuift. Hij loopt 12% onder de kop door, want een displaykop staat op
een regelhoogte onder 1 en op precies 100% knipt het masker de staarten van de
`p` en de `g` af.

**De ploeg is 70ms.** Elk aanwezig onderdeel van een sectie schuift één stap op:
bovenkop, kop, tekst, dan de items. Onderdelen die er niet zijn tellen niet mee,
dus een sectie zonder bovenkop begint gewoon op nul en heeft geen gat aan het
begin. Kaarten en citaten lopen in datzelfde ritme door.

**De naad tussen twee secties trekt zichzelf.** Een haarlijn in `--lijn`, van de
marge naar rechts, `scaleX` van 0 naar 1 in `--duur-inslag-hef`. Geen dekking en
geen verplaatsing: er beweegt niets dat gelezen moet worden, dus de regel dat
verplaatsing altijd omhoog gaat is hier niet in het geding.

Hij krijgt geen eigen stap in de ploeg. Hij staat hoger op de pagina dan de
bovenkop eronder en haalt de drempel dus vanzelf eerder — daarmee is hij de
nulde tel zonder dat iemand hem hoeft in te delen. Dat is ook de reden dat hij
bij herhaling blijft werken: hij is geen gebeurtenis náást de sectie maar de
eerste beweging ván de sectie. Er staan er zestien op de site.

### De haal — de ovaal en het onderstreepje

De mockup introduceert twee met de hand getekende vormen naast de
bliksemschicht: een ellips om een woordgroep ("1 van de 100", "hele agenda") en
een losse, licht scheve streep onder een kop ("NODIG HEBT.", "BETER IS."). Ze
horen bij dezelfde familie als de schicht — één beweging, geen constructie — en
zijn dus een verwantschap en geen stijlbreuk. De rollen van de schicht blijven
zoals ze waren.

**Dit is de enige beweging op de site die niet op `--inslag` loopt.** De inslag
is een klap die scherp afremt en stilvalt; een haal is een hand die doorstreept.
`--haal` is daarom precies andersom gebouwd:

| Token | Waarde | Waarvoor |
|---|---|---|
| `--haal` | `cubic-bezier(0.35, 0.08, 0.75, 0.6)` | de curve van een pennenstreek |
| `--haal-pauze` | 200ms | stilte tussen binnenkomst en haal |
| `--haal-wacht` | `--duur-inslag-hef` + `--haal-pauze` | 620ms, bovenop de plek in de ploeg |
| `--duur-haal-ovaal` | 450ms | de hele ronde, in één doorlopende haal |
| `--duur-haal-streep` | 350ms | korter, want de streep is korter |
| `--haal-dikte` | `max(1.5px, 0.06em)` | dikte, schaalt mee met de tekst |

Het tweede stuurpunt van `--haal` ligt op `0.75, 0.6`, dus de helling waarmee de
curve bij 1 aankomt is 1,6: **de lijn is nog in beweging op het moment dat hij
ophoudt.** `--inslag` doet het omgekeerde en dempt uit op `0.1, 1`.

**Eerst het element, dan de haal.** Het element komt binnen in het gewone ritme
van de ploeg; pas als het stilstaat, 200ms later, wordt de haal eromheen gezet.
Ze horen niet tegelijk te gebeuren — dan is het één effect in plaats van een
aanwijzing achteraf. De vertraging is dus de stap van het element plus
`--haal-wacht`, en die eerste helft komt via `--stap-vertraging` binnen: elke
stapregel in `beweging.css` zet die variabele, en een custom property erft. Een
haal binnen een kop op stap 2 leest daardoor vanzelf 2 × `--ploeg`, zonder dat
iemand die stap nog een keer doorgeeft.

**De ovaal begint linksboven, gaat met de klok mee en schiet over zijn eigen
begin heen.** Dat overschot is het verschil tussen een gebaar en een vorm: een
ellips die netjes aansluit is een figuur, een lijn die er voorbij loopt is een
hand geweest. Het pad kruist zijn eigen eerste segment; sluit je het netjes, dan
is het effect weg.

Drie dingen aan de uitwerking die gemeten zijn en niet bedacht:

- **`vector-effect="non-scaling-stroke"`.** De ovaal spant zich om een
  woordgroep van elke lengte, dus hij rekt in de breedte mee
  (`preserveAspectRatio="none"`). Zonder dit attribuut rekt de lijn mee: dikke
  zijkanten, dunne boven- en onderkant.
- **Breedte én hoogte staan uitgeschreven.** Een svg is een vervangen element
  met een eigen verhouding, en die verhouding wint van een insetpaar zodra de
  andere maat op `auto` staat. Met alleen insets werd het vlak om een kop van
  467×73 pixels 531×319 — de hoogte kwam uit het viewBox. Met alleen een hoogte
  erbij werd het 173×104: toen kwam de bréédte eruit.
- **`pathLength="100"`.** Het pad is genormaliseerd, dus de animatie loopt van
  100 naar 0 zonder de echte lengte te kennen — en ovaal en streep delen
  daardoor één keyframe terwijl hun paden niets met elkaar te maken hebben.

**Bij een woordgroep die over twee regels breekt komt er geen ovaal.** Een
uitgerekte ellips over twee regels heen is geen aanwijzing meer. Dat is niet uit
te rekenen tijdens het bouwen — het hangt aan de vensterbreedte, aan het
lettertype dat al dan niet geladen is en aan wat de redacteur invult — dus
`HaalScript.astro` meet het: een inline element dat over twee regels loopt,
levert twee rechthoeken op. Het meet opnieuw zodra het lettertype binnen is en
bij elke verandering van de vensterbreedte.

*Afwijking:* de lijn begint daardoor verborgen en wordt zichtbaar gemaakt, en
**zonder JavaScript staat er dus geen ovaal.** Dat is de andere kant op dan de
scrollonthulling, waar het uitgangspunt juist is dat er zonder script niets
verborgen blijft. De reden voor het verschil is dat de haal decoratief is en op
`aria-hidden` staat: er gaat geen betekenis verloren, en een ontbrekende
versiering is beter dan een uitgerekte. Bij gereduceerde beweging draait het
script gewoon — het meet alleen, het beweegt niets — dus daar staat de haal er
wél, volledig getekend en meteen.

**Maximaal één ovaal per sectie.** Dezelfde soort regel als bij de schicht en
net zomin af te dwingen in code: twee ovalen in één blikveld maken er een
stijlmiddel van in plaats van een aanwijzing.

**Op beeld dat ergens heen gaat staat een lichte zoom.** 1.05 in 700ms, en dus
ruim trager dan een binnenkomst — die is over voor de zoom halverwege is. Alleen
waar het beeld klikbaar is of naar iets verwijst; een foto die nergens heen
gaat, hoort niet te reageren op een muis.

*Afwijking:* de bron geeft voor deze zoom geen eigen curve. Hij loopt daarom op
`--soepel-uit`, de bestaande uitloopcurve van het design system; er is geen
nieuwe waarde bij verzonnen. Hoort hier een eigen curve, dan komt die uit de
bron.

Bij `prefers-reduced-motion: reduce` staat alles er meteen. Geen verplaatsing,
geen vertraging, geen masker, geen zoom en geen tellende kop. Dat is niet één
regel maar drie: `beweging.css` staat helemaal binnen
`(prefers-reduced-motion: no-preference)`, het script zet zijn vlagje niet, en
de tokens hierboven vallen in `tokens.css` terug op 1ms en 0px.

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

**De drie verhoudingen staan in `tokens.ts`, niet in een component.** Ze zijn
een tokennaam naar een klasse, net als achtergrond en ruimte, en ze gelden voor
elk vlak waar een foto in valt. `Beeldvlak` bood ze al aan; `BeeldTekst` had
16:9 hardgecodeerd en dat was de uitzondering, geen regel. Nu lezen beide
dezelfde tabel.

Dat is geen overbodige keuze. Het merendeel van de aangeleverde fotografie is
staand (1333×2000); in een liggend vlak van 16:9 verdwijnt daar gemeten **63%
van de hoogte**. Er komt geen vervorming bij kijken — `object-cover` snijdt
netjes weg — en juist daardoor valt het niet op: op portretten snijdt het
midden de hoofden eraf. De standaard blijft `breed`, zodat bestaande inhoud niet
verschuift.

`BeeldTekst` gaat bewust níet via `Beeldvlak`. Daar staat de tekst náást het
beeld en niet erop, dus de sluier heeft er geen functie en zou de foto alleen
verduisteren. Wat gedeeld wordt is de verhoudingstabel, niet het component.

**Afwijking — splitscreen gebruikt de vlakke sluier.** De beeldtabel wijst
splitscreen `--sluier-zij` toe, bedoeld voor tekst in de linkerhelft. Een deur
is op mobiel ongeveer 335px breed; daar heeft tekst de volle breedte nodig en
staat de rechterhelft op het doorzichtige deel van dat verloop. Gemeten op
375px besloeg de tekst 88% van het vlak. Daarom `--sluier-donker` (62% over
alles), de regel die de bron aan "kaart met tekst over beeld" hangt — en een
splitscreen-deur ís dat functioneel. Wit haalt daar in het slechtste geval
5,05:1; die 5,4 uit B2 was op de oude sluier, die op inkt stond.

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

**Die veldregel geldt voor de site, niet voor de admin.** In het CMS krijgen
verplichte velden wél een sterretje, want Keystatic zet dat er zelf bij zodra
een veld validatie heeft. Dat laten we staan.

De afweging is niet dat de regel daar minder waard is, maar dat validatie er
meer waard is. Het sterretje is de zichtbare kant van een controle die
tegenhoudt dat een sectie zonder kop of een foto zonder alt-tekst wordt
opgeslagen. Bij alt-tekst is dat het verschil tussen een afspraak en een regel:
laten we de validatie weg om het sterretje kwijt te raken, dan verdwijnt precies
de controle die de toegankelijkheid bewaakt.

De twee publieken verschillen ook. De bezoeker vult een formulier in en heeft
rust nodig; de redacteur beheert een site en heeft juist baat bij een duidelijk
onderscheid tussen wat moet en wat mag. Het "— mag je overslaan" bij optionele
velden staat er in de admin gewoon bij, dus de andere helft van de afspraak
loopt daar wel door.

De volledige woordenlijst en de microcopy-tabel staan in de bron.
