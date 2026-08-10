# De Club van 100 — Design System

Fase 1: het systeem, nog geen website. Zwart, hard en trots.

> **Wat hier merkregel is en wat onze keuze is.** Het merk heeft geen huisstijlgids,
> geen vastgelegde kleurcodes en geen benoemd lettertype. Wat uit hun eigen materiaal
> komt is als zodanig gemarkeerd. Alles wat we hebben aangevuld staat expliciet als
> **onze keuze** genoteerd, hier en in de guidelines. Er zijn geen merkregels verzonnen.

---

## 1. Het merk

De Club van 100 (declubvan.nl) bemiddelt horeca- en eventpersoneel in en rond
Groningen. Geen uitzendbureau maar een selectie van honderd professionals. Schaarste
en trots zijn de kern: je hoort erbij of je hoort er niet bij.

Uit hun eigen missiedocument: *"Wij misten een plek waar mensen die veel ervaring
hebben in de horeca en events samen komen. Geen standaard uitzendkrachten, maar mensen
die er uitspringen."* De eigen claim uit het deck: **"Revolutie in de uitzendbranche."**

Merkwaarden zoals ze die zelf opschrijven: **enthousiast, ervaren, trots** — en verder
kwaliteit, samenwerking, integriteit, veiligheid en zorg.

**Twee doelgroepen, één stem.**
1. **Opdrachtgevers** die personeel inhuren voor een event of een horecazaak. Toon:
   rustig en zeker.
2. **Horecaprofessionals** die bij de 100 willen horen. Toon: directer en uitdagender.

**Scope fase 1.** Kleine site van vijf pagina's: home, opdrachtgevers, de 100, contact,
voorwaarden. Geen webshop, geen meertaligheid, geen filters. Aanmelden loopt via een
extern formulier. Referentie die de klant zelf noemt: jongensvandebar.nl — een
splitscreen-home met twee deuren. Die eenvoud is het uitgangspunt; visueel gaan we
erover heen.

### Bronnen die we hebben gekregen

| Bron | Wat erin zit | Waar het nu staat |
|---|---|---|
| `uploads/De Club van 100.pdf` | Elf slides: missie, drie waarden, twee claims, twee klantquotes, veertien foto's | Tekst verwerkt in dit readme; acht foto's in `assets/photo/` |
| `uploads/Club 100 missie.pdf` | Twee pagina's, alleen beeld — geen leesbare tekstlaag | Niet verder verwerkt |
| `uploads/Algemene Voorwaarden – De Club van 100 (declubvan.nl).pdf` | De echte voorwaarden | **Niet gelezen** — de bestandsnaam bevat tekens die onze leestool weigert. Zie Caveats. |
| `uploads/declubvan100-*.svg` (4×) | Logoset: horizontale lockup, woordmerk, bliksem, vierkant merkteken | `assets/` |
| `uploads/declubvan100-typografie-en-voice.md` | Eerder opgeleverd hoofdstuk typografie + tone of voice | Volledig overgenomen en uitgebreid |
| `uploads/typografie-specimen.png` | Visueel specimen van diezelfde schaal | Als referentie gebruikt |
| `uploads/README.md` | Herkomst en kwaliteit van de logoset | Overgenomen in Iconografie hieronder |

Er is **geen codebase, geen Figma-bestand en geen bestaande website**. Alles hier is
opgebouwd uit bovenstaande bestanden.

---

## 2. Content fundamentals — hoe schrijf je hier

De Club van 100 zegt niet dat ze goed zijn, ze laten merken dat niet iedereen mee mag
doen. Een uitzendbureau werft; deze club selecteert. Schrijf alsof je aan de bar staat
en iets uitlegt aan iemand die je aardig vindt.

**Aanspreekvorm.** Jij en wij, altijd — ook zakelijk tegen opdrachtgevers. Nooit "de
opdrachtgever", nooit "onze medewerkers", nooit "u". Het is een club.

**Lengte.** Zeg het in de helft van de woorden. "Wij regelen ervaren horecapersoneel
voor jouw evenement" wordt **"Wij regelen de mensen."** De rest staat eronder.

**Toon in plaats van beweren.** Niet "onze mensen zijn ervaren", wel *"iedereen die
hier staat, heeft honderd avonden achter een bar gestaan."* Concreet verslaat een
bijvoeglijk naamwoord.

**Het getal is het argument.** Honderd is de grens, geen willekeurig getal. "Één van de
honderd", "de honderd zit vol", "we nemen er twee bij."

**Nooit vaag over geld, tijd of wat je krijgt.** In deze branche worden mensen
belazerd met onduidelijke tarieven. Concreet zijn is hier geen stijlkeuze maar een
merkbelofte.

**Casing.** Zinnen normaal. Hoofdletters alleen op `bovenkop`, op knoptekst, en op
displaykoppen van maximaal drie woorden ("EEN VAN DE 100" werkt; een hele zin niet).

**Emoji: nee.** Nergens, ook niet in microcopy of foutmeldingen. Dit merk lacht niet
naar je, het knikt.

**Leestekens.** Punten aan het eind van zinnen, ook in korte koppen. Geen uitroeptekens.
Geen drie puntjes. Een gedachtestreepje mag, spaarzaam.

**Woorden — wel:** klus, avond, draaien, tap, vloer, ploeg, selectie, een van de
honderd, trots, scherp, regelen, staan.
**Woorden — niet:** uitzendkracht, flexkracht, flexpool, inzetbaar, ontzorgen, partner
in personeel, personeelsoplossing, kwalitatief hoogstaand, gedreven professionals,
unieke beleving, wij denken graag met u mee. *De hele branche gebruikt die tweede lijst.
Dat is precies de reden om hem niet te gebruiken.*

**Microcopy.** Schrijf knoppen als iets wat de bezoeker zelf zou zeggen:

| Situatie | Wel | Niet |
|---|---|---|
| Hoofdknop opdrachtgevers | Ik zoek personeel | Meer informatie |
| Hoofdknop professionals | Ik wil bij jullie werken | Solliciteer nu |
| Formulier versturen | Stuur maar | Verzenden |
| Na versturen | Binnen. Je hoort binnen een dag van ons. | Uw aanvraag is succesvol verzonden |
| Verplicht veld leeg | We hebben je nummer nodig, anders kunnen we niets regelen | Dit veld is verplicht |
| Lege lijst | Nog niks te zien hier | Geen resultaten gevonden |
| Fout aan onze kant | Er ging iets mis bij ons. Probeer het zo nog een keer, of bel gewoon even. | Er is een onverwachte fout opgetreden |

Foutmeldingen zeggen wat er nú moet gebeuren, niet wat er stuk is. Verwijzen naar de
telefoon mag: het is een club, je kunt ze bellen.

**Verplicht vs. optioneel.** Dit systeem markeert niet het verplichte veld met een
sterretje maar het optionele met "— mag je overslaan". Onze keuze; scheelt ruis en past
bij de toon.

**Twee taalfouten in hun eigen deck** moeten voor livegang weg: "een groep vaan 100"
en "ervaring is bij ons beloofd" (bedoeld is waarschijnlijk *vereist*). Op een site die
kwaliteit claimt is dat duur.

---

## 3. Visual foundations

### Kleur
Monochroom. Zwart en wit, zwart dominant. **Geen accentkleur** — dat is een merkregel
die uit het materiaal komt (alle logo's zijn monochroom op `currentColor`).

Vier achtergronden, uitspreekbaar zodat ze in een CMS-keuzelijst passen:
`inkt` (#0B0B0B, dominant), `roet` (#191919, verhoogd vlak), `papier` (#FAFAF8, lichte
pagina), `mist` (#E4E4E1, rustig vlak op papier). Meer dan één lichte en één donkere
achtergrond per pagina is een fout.

Tekst: `krijt` / `krijt-zacht` / `krijt-stil` op donker, `inkt` / `grafiet` op licht.
Functionele kleur bestaat alleen in paren (`fout` + `fout-donker` enzovoort) en is
gedempt. Elke combinatie is doorgerekend in **`guidelines/contrast.md`**, inclusief een
expliciete lijst van wat níet mag.

### Typografie
**Archivo Variable**, één familie, twee assen (gewicht 100–900, breedte 62–125).
Displaykoppen op `wdth 112–118`, lopende tekst op `wdth 100`. Dat is het grafische
verschil dat de site draagt en het kost nul extra bytes.
Twee varianten en de onderbouwing staan in **`guidelines/typografie.md`**;
**aanbeveling: variant A, alleen de schreefloze.** Onze keuze — het woordmerk is
Poppins-achtig, de deckcover gebruikt een display serif, en dat moest één keuze worden.

### Ruimte, container, grid
Basiseenheid 4px. Sectieritme met drie vloeiende tokens (`sectie-s/m/l`). Container
1280px (smal 768px, breed 1600px), marge `clamp(20px, 5vw, 64px)`. Grid 12 / 6 / 4
kolommen bij breekpunten 1024 en 600. Hitzone minimaal 44px.

### Achtergronden en beeld
Zwart vlak of full-bleed foto — geen tussenweg, geen patronen, geen texturen, geen
gradients als decoratie. Verlopen bestaan alleen als **sluier over een foto**, nooit als
merkkleur. Fotografie: eigen materiaal, mensen aan het werk, avond, warm tegenlicht,
zwarte shirts. Stock is uitgesloten. Zie **`guidelines/beeld.md`**.

### Het grafisch motief
De handgetekende bliksemschicht is het enige eigen vormelement. Drie rollen (groot
uitgesneden vlak, sectiescheiding, opsommingsteken), maximaal drie per pagina, en een
lange lijst met wanneer níet. Zie **`guidelines/bliksem.md`**.

### Randen, hoeken, diepte
Hoeken zijn hard: `radius 0` is de standaard, 2px alleen voor invoervelden, 4px alleen
voor overlays, rond alleen voor een iconknop of telbadge. **Op zwart bestaat schaduw
niet**: diepte is een verhoogd vlak (`roet`) plus een 1px lijn. Op `papier` mag wél een
korte, lichte schaduw (`--schaduw-1/2/3`). Kaarten: rechthoekig, `roet`-vlak, 1px lijn,
geen ronding, geen gloed.

### Transparantie en blur
Eén plek: de sticky navigatie (`color-mix` 88% + `backdrop-filter: blur(14px)`). Verder
nergens — glasmorfisme past niet bij een merk dat hard wil zijn.

### Beweging
Kort en zakelijk. 120ms voor kleur, 180ms voor een indruk, 280ms voor een paneel, 520ms
voor beeld dat in beeld komt. Standaardcurve `cubic-bezier(.2,0,0,1)`.
**Geen bounce, geen veer, geen parallax, geen carrousel.** Bij
`prefers-reduced-motion: reduce` gaat alles naar 1ms en verdwijnt elke verschuiving —
dat staat in `tokens/motion.css` en geldt globaal.

### Hover, focus, press
- **Hover, gevulde knop:** wit → `krijt-zacht`. **Lijnknop:** rand wordt wit, vulling 8%.
  **Link:** onderstreping wordt `currentColor`. **Kaart:** lijn wordt sterker en de
  kaart schuift 2px omhoog. Nooit een kleurverandering — er is geen kleur.
- **Focus:** altijd `2px solid var(--focus-ring)` met offset 2–3px. Nooit weghalen.
- **Press:** `scale(0.985)` plus een stap donkerder. Geen kleurflits.

---

## 4. Iconografie

**Het merk heeft geen eigen iconenset.** Wat er ligt is de logoset en de bliksemschicht,
verder niets.

- **De bliksem is geen icoon.** Hij staat niet in navigatie, knoppen of formulieren.
  Zie `guidelines/bliksem.md`.
- **Onze keuze voor UI-iconen: Lucide**, 2px lijn, nooit gevuld, `currentColor`, 20–24px.
  Rechte lijnen en open vormen sluiten aan bij de rechte terminals van Archivo.
  Geladen van CDN: `https://unpkg.com/lucide@0.544.0/dist/umd/lucide.js`, gebruikt via
  het `Icoon`-component. **Dit is een substitutie, geen merkregel** — er was geen
  iconenset om over te nemen.
- **Emoji: nooit.** Ook niet als opsommingsteken.
- **Unicode als icoon:** alleen `→` in lopende tekst, verder niet.
- **Geen png-iconen.** Alles is SVG of een lettertypeglyph.

**Logobestanden** (`assets/`): `logo-horizontaal.svg` (hoofdlogo — header, footer,
briefpapier), `woordmerk.svg` (waar de schicht al elders staat), `bliksem.svg` (social
avatar, watermerk, groot decoratief element), `merkteken-vierkant.svg` (favicon,
app-icoon, profielfoto). Alle vier staan op `fill="currentColor"`: één bestand voor
licht en donker.

**Herkomst en kwaliteit** (uit `uploads/README.md`): het aangeleverde pdf-bestand bevat
geen vectoren maar bitmaps. Deze set is nagetrokken uit de 1001px-variant. Voldoende
voor web, A-formaat drukwerk en textiel; op spandoekformaat kunnen minieme afwijkingen
zichtbaar worden. **Vraag het origineel (.ai/.eps/.svg) op bij de ontwerper.** Er is
geen gestapelde variant en die is hier niet verzonnen.

---

## 5. Index

### Root
| Bestand | Wat |
|---|---|
| `styles.css` | Enige entry point. Alleen `@import`-regels. |
| `tailwind-theme.css` | Los deliverable: het hele systeem als één `@theme`-blok voor Tailwind 4. |
| `thumbnail.html` | Tegel van dit design system. |
| `SKILL.md` | Agent Skill-wrapper voor gebruik in Claude Code. |

### `tokens/`
`fonts.css` · `colors.css` · `typography.css` · `spacing.css` · `radius-depth.css` ·
`motion.css` · `base.css`

### `guidelines/`
`typografie.md` (twee varianten + aanbeveling) · `contrast.md` (elke combinatie
doorgerekend) · `bliksem.md` (het motief) · `beeld.md` (fotografie en sluiers) ·
`cards/` (23 specimenkaarten voor de Design System-tab)

### `assets/`
`logo-horizontaal.svg` · `woordmerk.svg` · `bliksem.svg` · `merkteken-vierkant.svg` ·
`photo/` (8 eigen foto's uit het deck)

### Componenten

**`components/merk/`** — `Logo`, `Bliksem`, `Icoon`
**`components/basis/`** — `Knop`, `Spinner`, `Kaart`, `Skelet`, `Badge`, `Bovenkop`, `Scheiding`
**`components/formulier/`** — `Veld`, `Invoer`, `Tekstvak`, `Keuzelijst`, `Aankruis`, `Keuzerondje`
**`components/navigatie/`** — `Navigatie`, `Voettekst`
**`components/feedback/`** — `Melding`, `Leeg`
**`components/beeld/`** — `Beeldvlak`

Elk component heeft een `.d.ts` met de propscontract en een `.prompt.md` met een
voorbeeld. Alle states — default, hover, focus, active, disabled, leeg, laden, fout —
staan op de kaarten in de Design System-tab.

**Bewuste toevoegingen** (er was geen bestaande componentbibliotheek om over te nemen;
deze set is van nul opgebouwd voor een site van vijf pagina's):
- `Icoon` — wrapper om Lucide, zodat de substitutie op één plek zit.
- `Beeldvlak` — dwingt de verplichte sluier af; zonder dit component wordt tekst op foto
  gegarandeerd een keer vergeten.
- `Bliksem` — codificeert de drie toegestane rollen van het motief.
- **Niet gebouwd, bewust:** Toast (verdwijnt; dit merk belooft duidelijkheid — we
  gebruiken inline `Melding`), Tabs, Tooltip, Dialog, Avatar, Accordion. Vijf pagina's
  zonder filters hebben ze niet nodig. Vraag het als ze alsnog nodig zijn.

### `ui_kits/website/`
Klikbare recreatie van de vijf pagina's. Zie `ui_kits/website/README.md`.
**Let op:** de site bestaat nog niet — dit is een referentie-implementatie, geen
recreatie van bestaand werk.

---

## 6. Caveats

1. **Lettertype is een voorstel.** Archivo Variable is onze keuze; er ligt geen
   huisstijlgids. Wijkt de klant af, dan verandert alleen `tokens/typography.css` en
   `guidelines/typografie.md`.
2. **Fontbestanden zitten er niet bij.** Archivo wordt van Google Fonts geladen. In
   productie zelf hosten via `@fontsource-variable/archivo/wdth.css` — let op: de
   standaardimport laat de breedte-as weg.
3. **Poppins Bold als match voor het woordmerk is "matig zeker"** (bron:
   `uploads/README.md`). Eén vraag aan de ontwerper lost dat op.
4. **De algemene voorwaarden zijn niet gelezen** — de bestandsnaam bevat een en-dash die
   onze leestool weigert. De voorwaardenpagina in de UI kit gebruikt een samengevatte
   placeholder. Lever het bestand opnieuw aan onder een simpele naam
   (`algemene-voorwaarden.pdf`) en we vullen het aan.
5. **Foto's komen uit een pdf**, niet van de camera. Voor productie de originelen bij de
   fotograaf opvragen. `bediening-buiten.png` is te licht voor witte tekst zonder een
   sluier van 72%.
6. **Lucide is een substitutie**, geen merkiconenset.


---

# Typografie

## De situatie in het bronmateriaal

Het woordmerk staat in een geometrische schreefloze; dichtste match is **Poppins Bold**
(zie `uploads/README.md`, punt 2 — matig zeker, af te stemmen met de ontwerper). De
cover van het eigen deck gebruikt daarnaast een hoog-contrast display serif. Dat zijn
twee onverenigbare signalen. Er is geen huisstijlgids en geen benoemd lettertype.
**Wat hieronder staat is onze keuze, niet een merkregel.**

---

## Variant A — alleen de geometrische schreefloze

Eén familie, **Archivo Variable**, voor alles. Hiërarchie komt uit grootte, gewicht en
de breedte-as (`wdth` 62–125). Displaykoppen op `wdth 112–118`, lopende tekst op
`wdth 100`.

**Voor.** Eén ladingsverzoek, nul stijlbotsingen, en de breedte-as geeft grote koppen
een monumentaliteit die een tweede lettertype niet nodig maakt. Rechte terminals en
strakke binnenvormen: hard en zakelijk, precies de toon van "een van de 100".
Op een site van vijf pagina's is dit ook simpelweg genoeg.

**Tegen.** Weinig ceremonie. De exclusiviteit moet volledig uit ruimte, zwart en
fotografie komen.

## Variant B — schreefloze plus display serif op de grootste koppen

Archivo voor alles, en **één** hoog-contrast display serif uitsluitend op
`display-xl`, dus maximaal één keer per pagina. Dichtste bruikbare match bij een
hoog-contrast didone-achtige serif op Google Fonts: **Bodoni Moda** (of **Playfair
Display** als je iets minder scherpe haarlijnen wilt).

**Voor.** Sluit aan bij de eigen deckcover. De serif draagt letterlijk het idee van
"selectie": een didone is een letter van uitnodigingen en van menukaarten, niet van
vacaturebanken.

**Tegen.** Haarlijnen van een didone vallen op zwart optisch weg; je moet compenseren
met extra gewicht of grootte, en dan verlies je juist het contrast dat de letter mooi
maakt. Twee families betekent twee ladingen, twee fallbackstacks en een extra regel bij
elke kop-beslissing. En: de serif verzacht. Dit merk mag niet verzachten.

---

## Aanbeveling: **variant A**

Neem Archivo Variable, alleen. Redenen, in volgorde:

1. Het merk is hard en trots. Een didone is elegant. Elegantie is niet dezelfde
   emotie als trots, en de tweede duwt de eerste weg.
2. De breedte-as levert het display-effect dat variant B met een tweede familie koopt,
   voor nul bytes.
3. Vijf pagina's dragen geen tweede systeem. Elke extra regel is een regel die iemand
   over een half jaar vergeet.
4. Het woordmerk zit als contour in de SVG. Dat de site een andere letter voert dan het
   logo is geen inconsistentie maar de normale verhouding tussen merkteken en tekst.

**Wanneer je alsnog B kiest:** als er drukwerk bij komt — menukaart, uitnodiging,
jaarlijkse ledenavond. Daar werkt de serif wél, omdat papier de haarlijnen aankan.
Houd hem dan bij drukwerk en laat de site A.

---

## De schaal (variant A)

| Token | Grootte | Gewicht | `wdth` | Regelhoogte | Tracking | Waarvoor |
|---|---|---|---|---|---|---|
| `display-xl` | `clamp(3.5rem, 9vw, 8rem)` | 800 | 118 | 0.92 | -0.03em | Eén per pagina. De klap boven de vouw. |
| `display-l` | `clamp(2.5rem, 6vw, 5rem)` | 800 | 112 | 0.95 | -0.02em | Openingskop van een sectie. |
| `kop-l` | `clamp(1.75rem, 3.2vw, 2.75rem)` | 700 | 100 | 1.10 | -0.01em | Kop binnen een sectie. |
| `kop-m` | `clamp(1.25rem, 2vw, 1.625rem)` | 700 | 100 | 1.25 | 0 | Kaartkop, subkop. |
| `kop-s` | `1.125rem` | 600 | 100 | 1.35 | 0 | Kleine kop, labelkop. |
| `bovenkop` | `0.875rem` | 600 | 100 | 1.20 | 0.14em | Hoofdletters. Sectie-aanduiding. |
| `lopend-l` | `clamp(1.0625rem, 1.4vw, 1.1875rem)` | 400 | 100 | 1.60 | 0 | Introtekst, standaard leestekst. |
| `lopend-m` | `1rem` | 400 | 100 | 1.65 | 0 | Tekst in kaarten en kolommen. |
| `lopend-s` | `0.875rem` | 400 | 100 | 1.55 | 0 | Bijschrift, voetnoot, meta. |
| `knop` | `1.0625rem` | 700 | 100 | 1 | 0.02em | Knoptekst. Hoofdletters. |

## Ondergrenzen — waaronder een gewicht niet meer werkt

- **Gewicht 800 alleen boven 40px.** Daaronder loopt Archivo dicht en oogt smoezelig.
- **Gewicht 700 alleen boven 18px.**
- **Nooit lichter dan 400.** Gewicht 100–300 bestaat in de variabele font maar wordt in
  dit systeem niet gebruikt.
- **Op zwart nooit onder 400, in geen enkel formaat.** Licht op donker valt optisch
  dunner uit dan het is.
- **Onder 14px geen tracking onder 0.** Kleine tekst heeft lucht nodig.
- **`bovenkop` nooit boven 16px.** Dan wordt het een kop en geen aanduiding meer.
- **De breedte-as blijft op 100 buiten displayniveaus.** Zodra `wdth` in lopende tekst
  verschijnt, verliest de pagina zijn ritme.

## Verdere regels

- Geen hoofdletters op `display-xl`/`display-l` behalve bij maximaal drie woorden.
  "EEN VAN DE 100" werkt; een hele zin niet.
- Eén displayniveau per pagina.
- Regellengte 60–75 tekens; op zwart richting 60 (`--maat-regel-donker: 60ch`).
- `font-variant-numeric: tabular-nums` overal waar cijfers onder elkaar staan. Het
  getal 100 komt overal terug en moet identiek ogen (`.t-cijfers`).


---

# Contrast

Berekend volgens WCAG 2.1 relatieve luminantie. AA = 4,5:1 voor lopende tekst,
3:1 voor tekst vanaf 24px normaal of 18,66px bold, en 3:1 voor UI-randen en iconen.

## De vier achtergronden

| Token | Hex | Luminantie |
|---|---|---|
| `inkt` | `#0B0B0B` | 0,0030 |
| `roet` | `#191919` | 0,0097 |
| `mist` | `#E4E4E1` | 0,7742 |
| `papier` | `#FAFAF8` | 0,9547 |

## Tekst op donker

| Tekst | op `inkt` | op `roet` | Oordeel |
|---|---|---|---|
| `krijt` #FFFFFF | **19,8:1** | **17,6:1** | AAA. Standaard voor alles. |
| `krijt-zacht` #C9C9C6 | **12,0:1** | **10,6:1** | AAA. Secundaire tekst, introtekst. |
| `krijt-stil` #8A8A87 | **5,7:1** | **5,1:1** | AA. Alleen meta, bijschrift, labeltekst. Niet onder 14px. |
| `fout` #E4665C | **6,0:1** | **5,3:1** | AA. Foutmelding en foutrand. |
| `letop` #D9A441 | **9,3:1** | **8,2:1** | AAA. |
| `goed` #7FB08A | **7,9:1** | **7,0:1** | AAA. |

## Tekst op licht

| Tekst | op `papier` | op `mist` | Oordeel |
|---|---|---|---|
| `inkt` #0B0B0B | **19,0:1** | **15,6:1** | AAA. Standaard. |
| `grafiet` #5C5C59 | **6,4:1** | **5,3:1** | AA. Secundaire tekst. |
| `fout-donker` #A3231A | **7,1:1** | **5,8:1** | AA. |
| `letop-donker` #8A6412 | **5,9:1** | **4,8:1** | AA. Krap op mist; niet onder 14px. |
| `goed-donker` #2F6B41 | **6,9:1** | **5,6:1** | AA. |

## Wat NIET mag — expliciet

- **`krijt-stil` (#8A8A87) op `papier`: 2,9:1.** Verboden voor tekst. Gebruik
  `grafiet` (#5C5C59).
- **`krijt-stil` op `mist`: 2,4:1.** Verboden voor tekst.
- **`grafiet` (#5C5C59) op `inkt`: 3,0:1.** Verboden voor lopende tekst. Alleen
  toegestaan als niet-informatieve lijn of als uitgeschakelde-status-rand.
- **`fout` (#E4665C) op `papier`: 3,2:1** en op `mist`: 2,6:1. Verboden voor tekst
  op licht. Gebruik `fout-donker`.
- **`letop` (#D9A441) op `papier`: 2,0:1.** Verboden. Gebruik `letop-donker`.
- **`goed` (#7FB08A) op `papier`: 2,4:1.** Verboden. Gebruik `goed-donker`.
- **`roet` op `inkt`: 1,2:1.** Nooit als enige scheiding tussen twee vlakken. Zet er
  een lijn (`--lijn`) bij, anders is de kaartrand onzichtbaar.
- **`mist` op `papier`: 1,2:1.** Zelfde regel.

De vuistregel die hieruit volgt: **zakt een tint onder 4,5:1, dan komt er een donkere
variant bij; we maken de tint zelf niet lichter of donkerder.** Daarom bestaan alle
functionele kleuren in een paar (`fout` / `fout-donker`) en heeft de secundaire tekst
twee tokens (`krijt-stil` voor donker, `grafiet` voor licht).

## Randen, iconen en focus

| Element | Waarde | Ratio | Oordeel |
|---|---|---|---|
| `--lijn-donker` rgba(255,255,255,.16) op inkt | ≈ #2C2C2C effectief | 1,6:1 | Decoratief. Nooit de enige drager van betekenis. |
| `--lijn-donker-sterk` rgba(255,255,255,.34) op inkt | ≈ #545454 effectief | 3,3:1 | AA voor UI-rand. Gebruik dit voor invoervelden. |
| `--lijn-licht-sterk` rgba(11,11,11,.38) op papier | ≈ #9E9E9C effectief | 3,1:1 | AA voor UI-rand. |
| Focusring `krijt` op inkt | | 19,8:1 | Ruim. |
| Focusring `inkt` op papier | | 19,0:1 | Ruim. |

Een invoerveld in rust krijgt dus `--lijn-sterk`, niet `--lijn`. Een decoratieve
scheidingslijn tussen secties krijgt `--lijn`.

## Tekst op foto

Eigen fotografie is warm en druk. Zonder behandeling haalt geen enkele witte tekst
betrouwbaar AA. Verplicht:

- **Volledige sluier:** `--sluier` (zwart 62%). Meet de lichtste plek van de foto.
  Wit op een sluier van 62% over een foto met piekhelderheid #F2F2F2 geeft een
  effectieve achtergrond van ≈ #5C5C5C → **5,4:1**. Haalbaar.
- **Verloop van onderaf:** `--sluier-onder`. Tekst mag alleen in de onderste 45%
  staan, waar de dekking minstens 72% is.
- **Verloop van opzij:** `--sluier-zij`. Tekst in de linkerhelft, dekking minstens 70%.
- **Nooit** witte tekst rechtstreeks op een onbehandelde foto, ook niet in het donkere
  deel: een foto is geen token en verandert bij vervanging.


---

# De bliksemschicht

De handgetekende schicht is het enige grafische motief dat het merk bezit
(`assets/bliksem.svg`, monochroom, `fill="currentColor"`). Alles wat we ermee doen moet
uit die ene vorm komen. Er komt geen tweede motief bij.

Karakter: met de hand getrokken, open contour, drie korte binnenlijnen. Hij is niet
perfect en dat is het punt — hij hoort bij mensen die werken, niet bij een merkboek.

## Drie toegestane rollen

### 1. Groot uitgesneden vlak
De schicht op minstens 40% van de sectiehoogte, als contour in `--lijn-donker-sterk`
of massief in `--krijt` op 6–10% dekking. Hij hangt buiten het raster, mag half
aflopen over de rand, en staat **achter** de tekst — nooit erdoorheen op een manier die
leesbaarheid kost.
**Maximaal één per pagina.** Bij voorkeur in de hero of in de laatste sectie, niet
allebei.

### 2. Scheiding tussen secties
Een 1px lijn in `--lijn` over de volle breedte met de schicht op 24px hoog gecentreerd
of links op de marge, in `--tekst-stil`. Vervangt de gewone `<hr>`.
**Maximaal twee per pagina** — daarna is het een patroon en geen accent.

### 3. Opsommingsteken
16px hoog, in `--krijt-zacht`, op de baseline van de eerste regel. Alleen in lijsten
die over de 100 of over de selectie gaan: waar je hoort en wat je krijgt. Een gewone
inhoudsopgave of een lijst met openingstijden krijgt geen schicht.

## Wanneer niet

- **Nooit als achtergrondpatroon**, tegel, herhaling of textuur. Eén schicht per rol,
  niet vijf.
- **Nooit in de tekstkolom.** Hij onderbreekt de leesrichting.
- **Nooit gedraaid, gespiegeld of geanimeerd** anders dan één keer statisch in beeld
  fade. Geen flitsen, geen flikkeren — dat leest als een banner uit 2009.
- **Nooit gevuld met een foto of een verloop.** Monochroom, punt.
- **Nooit kleiner dan 16px.** De binnenlijnen lopen dan dicht.
- **Nooit naast het logo.** In de lockup zit hij al; twee schichten in één blikveld
  maakt het merk goedkoop.
- **Nooit als iconvervanger** in navigatie, knoppen of formulieren. Daar gebruiken we
  Lucide (zie ICONOGRAFIE in `readme.md`).
- **Maximaal drie schichten op een hele pagina**, alle rollen bij elkaar opgeteld.

## Vuistregel

Als een bezoeker de schicht op één pagina twee keer moet zien om hem te onthouden,
staat hij er te vaak. Eén keer groot is meer waard dan zes keer klein.


---

# Beeld

Eigen fotografie is leidend. Die fotografie bepaalt hoe donker het systeem mag zijn —
niet andersom. **Stockfotografie is uitgesloten.** Geen uitzondering, ook niet
tijdelijk, ook niet "even als placeholder": een gekochte foto van lachende mensen met
een headset is exact het merk waar deze club tegen bestaat. Ontbreekt een foto, dan
staat er een zwart vlak met tekst.

## De richting

Wat er op de foto staat:
- **Mensen aan het werk.** Handen aan de tap, een dienblad, opbouwen, afruimen.
  Niemand kijkt in de lens tenzij het een portret van een ploeg is.
- **Echte events.** Festivalterrein, buitenbar, tent, vuurkorf. Het zijn hun eigen
  avonden, geen decor.
- **Avond en warm tegenlicht.** Zonsondergang, lampen, vuur. Het licht komt van achter
  of van opzij, nooit frontaal geflitst.
- **Zwart als kleding en als achtergrond.** De ploeg draagt zwarte shirts. Dat is de
  reden dat de site zwart is: de foto's lopen door in de pagina in plaats van er als
  postzegel op te liggen.
- **Weinig gezichten per beeld.** Eén tot drie mensen. Een menigte is publiek, geen club.

Wat er niet op staat: gestileerde productshots, lege interieurs, drone-overzichten,
handen-schuddend-zakelijk, iemand met een laptop.

## Bewerking

- Warm laten. Niet naar koel of neutraal trekken; het tegenlicht ís het merk.
- Contrast licht optrekken, zwarten laten dichtlopen — een foto mag in `inkt` verdwijnen.
- Geen filter, geen duotoon, geen zwart-wit-omzetting. Het merk is monochroom in de
  interface; de fotografie mag kleur hebben.
- Geen korrelfilter toevoegen. Wat er van de camera af komt is genoeg.

## Bijsnijden

- Full-bleed of tot de containerrand, nooit met marge in een kader.
- Beeldverhoudingen: 16:9 (breed), 4:5 (portret in een kolom), 1:1 (raster van de 100).
- Kop en schouders nooit strak; laat lucht boven het hoofd zodat de sluier ergens
  op kan landen.

## Tekst op foto — verplicht

Zonder behandeling haalt witte tekst nooit betrouwbaar AA op deze foto's.

| Situatie | Behandeling | Regel |
|---|---|---|
| Hero, tekst onderaan | `--sluier-onder` | Tekst alleen in de onderste 45% van het beeld, waar de dekking ≥72% is. |
| Splitscreen / tekst opzij | `--sluier-zij` | Tekst in de helft waar de dekking ≥70% is. |
| Kaart met tekst over beeld | `--sluier` (vlak 62%) | Over het hele beeld. Geen halve sluier op een kaart. |
| Bijschrift | Geen sluier | Bijschrift staat **onder** de foto op `inkt`, niet erop. |

Reken de sluier na op de **lichtste plek** van de foto, niet op het gemiddelde. Bij een
piekhelderheid van ongeveer #F2F2F2 geeft 62% zwart een effectieve achtergrond van
≈ #5C5C5C: wit haalt daar 5,4:1. Is de foto lichter (buitenopname overdag), verhoog de
sluier naar 72% of kies een andere foto.

Verder:
- Nooit tekst op een onbehandelde foto. Een foto is geen token; hij wordt vervangen en
  dan klopt het contrast niet meer.
- Nooit tekst over gezichten.
- Logo op foto altijd in `--krijt`, altijd binnen de sluier.

## Wat er nu ligt

In `assets/photo/` staan acht beelden uit het eigen deck (`uploads/De Club van 100.pdf`),
op de resolutie waarop ze in dat bestand zaten:

| Bestand | Wat |
|---|---|
| `bar-pouring.png` | Bartender schenkt, warm binnenlicht. Hero-materiaal. |
| `cocktail-bar.png` | Cocktail maken, portret, buitenbar. Kolomformaat. |
| `vuur-zonsondergang.png` | Vuurkorf op festivalterrein, tegenlicht. Sterkste sfeerbeeld. |
| `ploeg-drie.png` | Drie man achter de tap, portret van een ploeg. |
| `proost-tap.png` | Twee mensen proosten, buitenbar. |
| `dienblad.png` | Dienblad met bekers, ondiepe scherptediepte. Detail. |
| `bediening-buiten.png` | Bediening aan tafel, daglicht onder bomen. Het lichtste beeld. |
| `rook-textuur.png` | Rook/mist, bijna abstract. Alleen als achtergrondtextuur. |

**Kwaliteitsvoorbehoud:** deze zijn uit een pdf gehaald en zijn niet de originelen.
Voor productie moeten de camerabestanden bij de fotograaf vandaan komen.
`bediening-buiten.png` is te licht voor witte tekst zonder sluier van 72%.


---

# Tokens (CSS)

De volledige inhoud van `styles.css` en alles wat het importeert.

## `tokens/fonts.css`

```css
@import url("https://fonts.googleapis.com/css2?family=Archivo:ital,wdth,wght@0,62..125,100..900;1,62..125,100..900&display=swap");
/* Archivo Variable — gewicht 100-900, breedte 62-125.
   Zelf hosten in productie: npm i @fontsource-variable/archivo en importeer
   '@fontsource-variable/archivo/wdth.css' (NIET de standaardimport; die laat de breedte-as weg). */
:root{--font-sans:"Archivo","Archivo Variable",system-ui,-apple-system,"Segoe UI",sans-serif;--font-mono:ui-monospace,"SFMono-Regular",Menlo,monospace}
```

## `tokens/colors.css`

```css
/* De Club van 100 — kleur. Monochroom. Geen accentkleur.
   Vier achtergronden, uitspreekbare namen voor een CMS-keuzelijst: inkt, roet, papier, mist.
   Contrastwaardes staan in guidelines/contrast.md en op de kleurkaarten. */
:root{
  /* --- achtergronden (de vier, en niet meer) --- */
  --inkt:#0B0B0B;      /* dominant. standaard achtergrond van het merk */
  --roet:#191919;      /* verhoogd vlak op inkt: kaart, invoerveld, sticky balk */
  --papier:#FAFAF8;    /* lichte pagina. voorwaarden, formulieren, print */
  --mist:#E4E4E1;      /* rustig vlak op papier: kaart, tabelrij, disabled veld */

  /* --- inkt/tekst --- */
  --krijt:#FFFFFF;         /* tekst op inkt en roet */
  --krijt-zacht:#C9C9C6;   /* secundaire tekst op donker */
  --krijt-stil:#8A8A87;    /* meta, bijschrift op donker. NIET op papier/mist */
  --grafiet:#5C5C59;       /* secundaire tekst op papier en mist */

  /* --- lijnen --- */
  --lijn-donker:rgba(255,255,255,.16);
  --lijn-donker-sterk:rgba(255,255,255,.34);
  --lijn-licht:rgba(11,11,11,.16);
  --lijn-licht-sterk:rgba(11,11,11,.38);

  /* --- overlays (tekst op foto) --- */
  --sluier:rgba(11,11,11,.62);                                     /* vlakke sluier over foto */
  --sluier-onder:linear-gradient(to top,rgba(11,11,11,.92) 0%,rgba(11,11,11,.72) 38%,rgba(11,11,11,0) 100%);/* @kind other */
  --sluier-zij:linear-gradient(to right,rgba(11,11,11,.94) 0%,rgba(11,11,11,.70) 46%,rgba(11,11,11,0) 100%);/* @kind other */

  /* --- functioneel, gedempt. geen tweede merkkleur --- */
  --fout:#E4665C;        /* op inkt/roet */
  --fout-donker:#A3231A; /* op papier/mist */
  --letop:#D9A441;
  --letop-donker:#8A6412;
  --goed:#7FB08A;
  --goed-donker:#2F6B41;

  /* --- semantische aliassen: donker thema (standaard) --- */
  --vlak:var(--inkt);
  --vlak-verhoogd:var(--roet);
  --tekst:var(--krijt);
  --tekst-zacht:var(--krijt-zacht);
  --tekst-stil:var(--krijt-stil);
  --lijn:var(--lijn-donker);
  --lijn-sterk:var(--lijn-donker-sterk);
  --tekst-fout:var(--fout);
  --focus-ring:var(--krijt);
}
/* Lichte omgeving. Zet [data-thema="licht"] op een sectie of op <html>. */
[data-thema="licht"]{
  --vlak:var(--papier);
  --vlak-verhoogd:var(--mist);
  --tekst:var(--inkt);
  --tekst-zacht:var(--grafiet);
  --tekst-stil:var(--grafiet);
  --lijn:var(--lijn-licht);
  --lijn-sterk:var(--lijn-licht-sterk);
  --tekst-fout:var(--fout-donker);
  --focus-ring:var(--inkt);
}
```

## `tokens/typography.css`

```css
/* Variant B (aanbevolen): één familie, Archivo Variable. De breedte-as draagt het display-niveau.
   Zie guidelines/typografie.md voor variant A en de onderbouwing. */
:root{
  --text-display-xl:clamp(3.5rem,9vw,8rem);      --lh-display-xl:.92;/* @kind font */  --ls-display-xl:-.03em;/* @kind font */ --wg-display-xl:800;/* @kind font */ --wdth-display-xl:118;/* @kind font */
  --text-display-l:clamp(2.5rem,6vw,5rem);       --lh-display-l:.95;/* @kind font */   --ls-display-l:-.02em;/* @kind font */  --wg-display-l:800;/* @kind font */  --wdth-display-l:112;/* @kind font */
  --text-kop-l:clamp(1.75rem,3.2vw,2.75rem);     --lh-kop-l:1.1;/* @kind font */       --ls-kop-l:-.01em;/* @kind font */      --wg-kop-l:700;/* @kind font */
  --text-kop-m:clamp(1.25rem,2vw,1.625rem);      --lh-kop-m:1.25;/* @kind font */      --ls-kop-m:0;/* @kind font */           --wg-kop-m:700;/* @kind font */
  --text-kop-s:1.125rem;                         --lh-kop-s:1.35;/* @kind font */      --ls-kop-s:0;/* @kind font */           --wg-kop-s:600;/* @kind font */
  --text-bovenkop:.875rem;                       --lh-bovenkop:1.2;/* @kind font */    --ls-bovenkop:.14em;/* @kind font */    --wg-bovenkop:600;/* @kind font */
  --text-lopend-l:clamp(1.0625rem,1.4vw,1.1875rem); --lh-lopend-l:1.6;/* @kind font */ --ls-lopend-l:0;/* @kind font */        --wg-lopend-l:400;/* @kind font */
  --text-lopend-m:1rem;                          --lh-lopend-m:1.65;/* @kind font */   --ls-lopend-m:0;/* @kind font */        --wg-lopend-m:400;/* @kind font */
  --text-lopend-s:.875rem;                       --lh-lopend-s:1.55;/* @kind font */   --ls-lopend-s:0;/* @kind font */        --wg-lopend-s:400;/* @kind font */
  --text-knop:1.0625rem;                         --lh-knop:1;/* @kind font */          --ls-knop:.02em;/* @kind font */        --wg-knop:700;/* @kind font */
  --maat-regel:66ch;/* @kind other */   /* lopende tekst op licht */
  --maat-regel-donker:60ch;/* @kind other */ /* op zwart korter houden */
}
.t-display-xl{font-size:var(--text-display-xl);line-height:var(--lh-display-xl);letter-spacing:var(--ls-display-xl);font-weight:var(--wg-display-xl);font-variation-settings:"wdth" 118}
.t-display-l{font-size:var(--text-display-l);line-height:var(--lh-display-l);letter-spacing:var(--ls-display-l);font-weight:var(--wg-display-l);font-variation-settings:"wdth" 112}
.t-kop-l{font-size:var(--text-kop-l);line-height:var(--lh-kop-l);letter-spacing:var(--ls-kop-l);font-weight:var(--wg-kop-l)}
.t-kop-m{font-size:var(--text-kop-m);line-height:var(--lh-kop-m);font-weight:var(--wg-kop-m)}
.t-kop-s{font-size:var(--text-kop-s);line-height:var(--lh-kop-s);font-weight:var(--wg-kop-s)}
.t-bovenkop{font-size:var(--text-bovenkop);line-height:var(--lh-bovenkop);letter-spacing:var(--ls-bovenkop);font-weight:var(--wg-bovenkop);text-transform:uppercase}
.t-lopend-l{font-size:var(--text-lopend-l);line-height:var(--lh-lopend-l);font-weight:400}
.t-lopend-m{font-size:var(--text-lopend-m);line-height:var(--lh-lopend-m);font-weight:400}
.t-lopend-s{font-size:var(--text-lopend-s);line-height:var(--lh-lopend-s);font-weight:400}
.t-cijfers{font-variant-numeric:tabular-nums}
```

## `tokens/spacing.css`

```css
/* Basiseenheid 4px. Alles is een veelvoud. */
:root{
  --ruimte-0:0;/* @kind spacing */--ruimte-1:4px;--ruimte-2:8px;--ruimte-3:12px;--ruimte-4:16px;--ruimte-5:20px;
  --ruimte-6:24px;--ruimte-8:32px;--ruimte-10:40px;--ruimte-12:48px;--ruimte-16:64px;
  --ruimte-20:80px;--ruimte-24:96px;--ruimte-32:128px;--ruimte-40:160px;

  /* sectieritme: verticale lucht tussen secties, vloeiend */
  --sectie-s:clamp(40px,6vw,64px);/* @kind spacing */
  --sectie-m:clamp(64px,9vw,112px);/* @kind spacing */
  --sectie-l:clamp(96px,14vw,176px);/* @kind spacing */

  /* container en marge */
  --marge:clamp(20px,5vw,64px);/* @kind spacing */
  --container:1280px;/* @kind spacing */
  --container-smal:768px;/* @kind spacing */  /* lopende tekst, voorwaarden */
  --container-breed:1600px;/* @kind spacing *//* full-bleed beeldsecties met marge */

  /* grid */
  --kolommen:12;/* @kind spacing */
  --kolomgat:24px;/* @kind spacing */
  --raakvlak:44px;/* @kind spacing */ /* minimale hitzone */
}
@media (max-width:1023px){:root{--kolommen:6;/* @kind spacing */--kolomgat:20px;/* @kind spacing */}}
@media (max-width:599px){:root{--kolommen:4;/* @kind spacing */--kolomgat:16px;/* @kind spacing */}}
.container{width:100%;max-width:calc(var(--container) + var(--marge)*2);margin-inline:auto;padding-inline:var(--marge)}
.container-smal{width:100%;max-width:calc(var(--container-smal) + var(--marge)*2);margin-inline:auto;padding-inline:var(--marge)}
.raster{display:grid;grid-template-columns:repeat(var(--kolommen),minmax(0,1fr));gap:var(--kolomgat)}
```

## `tokens/radius-depth.css`

```css
/* Het merk is hard. Radius is bijna altijd 0; ronding is functioneel, nooit decoratief. */
:root{
  --radius-0:0;      /* secties, kaarten, beeldvlakken, knoppen. standaard */
  --radius-1:2px;    /* invoervelden, selects, kleine controls. optisch rustiger bij 1px lijn */
  --radius-2:4px;    /* alleen overlays: dialoog, tooltip, melding */
  --radius-vol:999px;/* alleen ronde iconknop en telbadge */

  /* Diepte op zwart bestaat niet als schaduw. Diepte = vlak + lijn. */
  --diepte-0:none;/* @kind shadow */
  --diepte-1:inset 0 0 0 1px var(--lijn);/* @kind shadow */            /* kaart op inkt */
  --diepte-2:inset 0 0 0 1px var(--lijn-sterk);/* @kind shadow */      /* hover / actief vlak op inkt */
  --diepte-3:0 24px 64px rgba(0,0,0,.72),inset 0 0 0 1px var(--lijn-sterk);/* @kind shadow */ /* dialoog boven de pagina */

  /* Op papier/mist mag wél een echte schaduw, licht en kort. */
  --schaduw-1:0 1px 2px rgba(11,11,11,.10);
  --schaduw-2:0 8px 24px rgba(11,11,11,.12);
  --schaduw-3:0 24px 56px rgba(11,11,11,.18);

  --lijn-dikte:1px;/* @kind other */
  --lijn-dikte-sterk:2px;/* @kind other */
}
```

## `tokens/motion.css`

```css
/* Beweging is kort en zakelijk. Geen bounce, geen veer, geen parallax-carrousel. */
:root{
  --duur-1:120ms;/* @kind other */ /* kleur- en lijnwissel: hover, focus */
  --duur-2:180ms;/* @kind other */ /* knopindruk, kleine verschuiving */
  --duur-3:280ms;/* @kind other */ /* paneel, accordeon, dialoog */
  --duur-4:520ms;/* @kind other */ /* beeldonthulling, sectie in beeld */
  --soepel-uit:cubic-bezier(.2,0,0,1);/* @kind other */   /* standaard: alles wat verschijnt */
  --soepel-in:cubic-bezier(.4,0,1,1);/* @kind other */    /* alles wat verdwijnt */
  --soepel-inuit:cubic-bezier(.65,0,.35,1);/* @kind other */
  --verschuif:8px;/* @kind spacing */   /* standaard intree-afstand */
  --indruk:.985;/* @kind other */     /* scale bij :active */
}
@media (prefers-reduced-motion:reduce){
  :root{--duur-1:1ms;/* @kind other */--duur-2:1ms;/* @kind other */--duur-3:1ms;/* @kind other */--duur-4:1ms;/* @kind other */--verschuif:0px;/* @kind spacing */--indruk:1;/* @kind other */}
  *,*::before,*::after{animation-duration:1ms!important;animation-iteration-count:1!important;transition-duration:1ms!important;scroll-behavior:auto!important}
}
```

## `tokens/base.css`

```css
*,*::before,*::after{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--vlak);color:var(--tekst);font-family:var(--font-sans);font-size:var(--text-lopend-m);line-height:var(--lh-lopend-m);font-weight:400;-webkit-font-smoothing:antialiased;text-wrap:pretty}
h1,h2,h3,h4,p,figure{margin:0}
img,svg{display:block;max-width:100%}
a{color:var(--tekst);text-decoration:underline;text-underline-offset:.18em;text-decoration-thickness:1px;text-decoration-color:var(--lijn-sterk);transition:text-decoration-color var(--duur-1) var(--soepel-uit),color var(--duur-1) var(--soepel-uit)}
a:hover{text-decoration-color:currentColor}
a:active{opacity:.7}
:focus-visible{outline:2px solid var(--focus-ring);outline-offset:2px;border-radius:0}
::selection{background:var(--krijt);color:var(--inkt)}
[data-thema="licht"] ::selection{background:var(--inkt);color:var(--papier)}
```

## `components/componenten.css`

```css
/* De Club van 100 — componentstijlen. Alles op tokens, niets hardcoded. */

/* ---------- KNOP ---------- */
.c100-knop{display:inline-flex;align-items:center;justify-content:center;gap:var(--ruimte-2);min-height:var(--raakvlak);padding:0 var(--ruimte-6);border:var(--lijn-dikte-sterk) solid transparent;border-radius:var(--radius-0);font-family:var(--font-sans);font-size:var(--text-knop);line-height:var(--lh-knop);letter-spacing:var(--ls-knop);font-weight:var(--wg-knop);text-transform:uppercase;text-decoration:none;cursor:pointer;position:relative;transition:background-color var(--duur-1) var(--soepel-uit),color var(--duur-1) var(--soepel-uit),border-color var(--duur-1) var(--soepel-uit),transform var(--duur-2) var(--soepel-uit),opacity var(--duur-1) var(--soepel-uit)}
.c100-knop:active{transform:scale(var(--indruk))}
.c100-knop:focus-visible{outline:2px solid var(--focus-ring);outline-offset:3px}
.c100-knop--vol{background:var(--tekst);color:var(--vlak);border-color:var(--tekst)}
.c100-knop--vol:hover{background:var(--tekst-zacht);border-color:var(--tekst-zacht)}
.c100-knop--vol:active{background:var(--tekst-stil);border-color:var(--tekst-stil)}
.c100-knop--lijn{background:transparent;color:var(--tekst);border-color:var(--lijn-sterk)}
.c100-knop--lijn:hover{border-color:var(--tekst);background:color-mix(in srgb,var(--tekst) 8%,transparent)}
.c100-knop--lijn:active{background:color-mix(in srgb,var(--tekst) 16%,transparent)}
.c100-knop--kaal{background:transparent;color:var(--tekst);border-color:transparent;padding-inline:var(--ruimte-2)}
.c100-knop--kaal:hover{color:var(--tekst-zacht);text-decoration:underline;text-underline-offset:.22em}
.c100-knop--kaal:active{color:var(--tekst-stil)}
.c100-knop--s{min-height:36px;padding:0 var(--ruimte-4);font-size:.9375rem}
.c100-knop--l{min-height:56px;padding:0 var(--ruimte-8);font-size:1.125rem}
.c100-knop--breed{width:100%}
.c100-knop[disabled],.c100-knop[aria-disabled="true"]{cursor:not-allowed;opacity:.38;transform:none}
.c100-knop[disabled]:hover,.c100-knop[aria-disabled="true"]:hover{background:inherit}
.c100-knop--vol[disabled]:hover{background:var(--tekst);border-color:var(--tekst)}
.c100-knop--lijn[disabled]:hover{background:transparent;border-color:var(--lijn-sterk)}
.c100-knop--laadt{cursor:progress;color:transparent!important}
.c100-knop--laadt .c100-knop__tekst{opacity:0}
.c100-knop__spin{position:absolute;inset:0;display:grid;place-items:center}

/* ---------- SPINNER ---------- */
.c100-spin{display:block;border:2px solid color-mix(in srgb,currentColor 28%,transparent);border-top-color:currentColor;border-radius:var(--radius-vol);animation:c100-draai .7s linear infinite}
@keyframes c100-draai{to{transform:rotate(360deg)}}
@media (prefers-reduced-motion:reduce){.c100-spin{animation-duration:2.4s}}

/* ---------- KAART ---------- */
.c100-kaart{display:flex;flex-direction:column;background:var(--vlak-verhoogd);border:var(--lijn-dikte) solid var(--lijn);border-radius:var(--radius-0);padding:var(--ruimte-6);position:relative;transition:border-color var(--duur-1) var(--soepel-uit),background-color var(--duur-1) var(--soepel-uit),transform var(--duur-2) var(--soepel-uit)}
.c100-kaart--vlak{background:transparent}
.c100-kaart--klik{cursor:pointer;text-decoration:none;color:inherit}
.c100-kaart--klik:hover{border-color:var(--lijn-sterk);transform:translateY(-2px)}
.c100-kaart--klik:active{transform:translateY(0) scale(var(--indruk))}
.c100-kaart--klik:focus-visible{outline:2px solid var(--focus-ring);outline-offset:3px}
.c100-kaart[aria-disabled="true"]{opacity:.38;pointer-events:none}
[data-thema="licht"] .c100-kaart--klik:hover{box-shadow:var(--schaduw-2)}
.c100-kaart__kop{font-size:var(--text-kop-m);line-height:var(--lh-kop-m);font-weight:var(--wg-kop-m);margin-bottom:var(--ruimte-2)}
.c100-kaart__tekst{color:var(--tekst-zacht);font-size:var(--text-lopend-m);line-height:var(--lh-lopend-m)}
.c100-kaart__voet{margin-top:auto;padding-top:var(--ruimte-6)}
.c100-kaart__nummer{font-size:var(--text-bovenkop);letter-spacing:var(--ls-bovenkop);font-weight:600;color:var(--tekst-stil);font-variant-numeric:tabular-nums;margin-bottom:var(--ruimte-4)}

/* ---------- SKELET (laden) ---------- */
.c100-skelet{background:color-mix(in srgb,var(--tekst) 10%,transparent);position:relative;overflow:hidden;border-radius:var(--radius-0)}
.c100-skelet::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,transparent,color-mix(in srgb,var(--tekst) 8%,transparent),transparent);animation:c100-veeg 1.4s var(--soepel-inuit) infinite}
@keyframes c100-veeg{from{transform:translateX(-100%)}to{transform:translateX(100%)}}
@media (prefers-reduced-motion:reduce){.c100-skelet::after{animation:none}}

/* ---------- FORMULIER ---------- */
.c100-veld{display:flex;flex-direction:column;gap:var(--ruimte-2)}
.c100-veld__label{font-size:var(--text-kop-s);line-height:var(--lh-kop-s);font-weight:var(--wg-kop-s)}
.c100-veld__hint{font-size:var(--text-lopend-s);line-height:var(--lh-lopend-s);color:var(--tekst-stil)}
.c100-veld__fout{display:flex;align-items:flex-start;gap:var(--ruimte-2);font-size:var(--text-lopend-s);line-height:var(--lh-lopend-s);color:var(--tekst-fout);font-weight:600}
.c100-invoer{width:100%;min-height:var(--raakvlak);background:var(--vlak-verhoogd);color:var(--tekst);border:var(--lijn-dikte) solid var(--lijn-sterk);border-radius:var(--radius-1);padding:var(--ruimte-3) var(--ruimte-4);font-family:var(--font-sans);font-size:var(--text-lopend-m);line-height:1.4;transition:border-color var(--duur-1) var(--soepel-uit),background-color var(--duur-1) var(--soepel-uit)}
.c100-invoer::placeholder{color:var(--tekst-stil)}
.c100-invoer:hover{border-color:var(--tekst-zacht)}
.c100-invoer:focus{outline:2px solid var(--focus-ring);outline-offset:1px;border-color:var(--tekst)}
.c100-invoer:disabled{opacity:.38;cursor:not-allowed;background:transparent}
.c100-invoer[aria-invalid="true"]{border-color:var(--tekst-fout);border-width:var(--lijn-dikte-sterk)}
.c100-invoer[aria-busy="true"]{cursor:progress}
textarea.c100-invoer{min-height:132px;resize:vertical;line-height:var(--lh-lopend-m)}
select.c100-invoer{appearance:none;background-image:linear-gradient(45deg,transparent 50%,currentColor 50%),linear-gradient(135deg,currentColor 50%,transparent 50%);background-position:calc(100% - 20px) calc(50% + 1px),calc(100% - 14px) calc(50% + 1px);background-size:6px 6px,6px 6px;background-repeat:no-repeat;padding-right:var(--ruimte-10)}
.c100-aanvink{display:flex;align-items:flex-start;gap:var(--ruimte-3);min-height:var(--raakvlak);cursor:pointer;font-size:var(--text-lopend-m);line-height:1.45;padding-block:var(--ruimte-2)}
.c100-aanvink input{appearance:none;flex:0 0 auto;width:22px;height:22px;margin:0;background:transparent;border:var(--lijn-dikte-sterk) solid var(--lijn-sterk);border-radius:var(--radius-1);cursor:pointer;display:grid;place-content:center;transition:border-color var(--duur-1) var(--soepel-uit),background-color var(--duur-1) var(--soepel-uit)}
.c100-aanvink input[type="radio"]{border-radius:var(--radius-vol)}
.c100-aanvink:hover input{border-color:var(--tekst)}
.c100-aanvink input:checked{background:var(--tekst);border-color:var(--tekst)}
.c100-aanvink input:checked::after{content:"";width:10px;height:6px;border-left:2px solid var(--vlak);border-bottom:2px solid var(--vlak);transform:translateY(-1px) rotate(-45deg)}
.c100-aanvink input[type="radio"]:checked::after{content:"";width:8px;height:8px;border:0;border-radius:var(--radius-vol);background:var(--vlak);transform:none}
.c100-aanvink input:focus-visible{outline:2px solid var(--focus-ring);outline-offset:3px}
.c100-aanvink input:disabled{opacity:.38;cursor:not-allowed}
.c100-aanvink:has(input:disabled){opacity:.5;cursor:not-allowed}
.c100-aanvink input[aria-invalid="true"]{border-color:var(--tekst-fout)}

/* ---------- NAVIGATIE ---------- */
.c100-nav{position:sticky;top:0;z-index:50;background:color-mix(in srgb,var(--vlak) 88%,transparent);backdrop-filter:blur(14px);border-bottom:var(--lijn-dikte) solid var(--lijn)}
.c100-nav__binnen{display:flex;align-items:center;justify-content:space-between;gap:var(--ruimte-6);min-height:72px}
.c100-nav__links{display:flex;align-items:center;gap:var(--ruimte-1)}
.c100-nav__link{display:inline-flex;align-items:center;min-height:var(--raakvlak);padding:0 var(--ruimte-4);color:var(--tekst-zacht);text-decoration:none;font-size:var(--text-lopend-m);font-weight:600;position:relative;transition:color var(--duur-1) var(--soepel-uit)}
.c100-nav__link:hover{color:var(--tekst)}
.c100-nav__link::after{content:"";position:absolute;left:var(--ruimte-4);right:var(--ruimte-4);bottom:14px;height:2px;background:var(--tekst);transform:scaleX(0);transform-origin:left;transition:transform var(--duur-2) var(--soepel-uit)}
.c100-nav__link:hover::after{transform:scaleX(1)}
.c100-nav__link[aria-current="page"]{color:var(--tekst)}
.c100-nav__link[aria-current="page"]::after{transform:scaleX(1)}
.c100-nav__link:active{opacity:.7}
.c100-nav__link[aria-disabled="true"]{opacity:.38;pointer-events:none}
.c100-nav__link:focus-visible{outline:2px solid var(--focus-ring);outline-offset:-2px}
.c100-nav__knop{display:none}
@media (max-width:899px){.c100-nav__links,.c100-nav__acties{display:none}.c100-nav__knop{display:inline-flex}}
.c100-nav__paneel{border-top:var(--lijn-dikte) solid var(--lijn);padding:var(--ruimte-4) 0 var(--ruimte-8);display:flex;flex-direction:column;gap:var(--ruimte-1)}

/* ---------- BADGE ---------- */
.c100-badge{display:inline-flex;align-items:center;gap:var(--ruimte-2);padding:5px var(--ruimte-3);border:var(--lijn-dikte) solid var(--lijn-sterk);border-radius:var(--radius-0);font-size:var(--text-lopend-s);font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--tekst-zacht);font-variant-numeric:tabular-nums}
.c100-badge--vol{background:var(--tekst);color:var(--vlak);border-color:var(--tekst)}
.c100-badge--fout{color:var(--tekst-fout);border-color:currentColor}

/* ---------- MELDING ---------- */
.c100-melding{display:flex;gap:var(--ruimte-4);padding:var(--ruimte-4) var(--ruimte-5);border:var(--lijn-dikte-sterk) solid var(--lijn-sterk);border-radius:var(--radius-0);font-size:var(--text-lopend-m);line-height:1.5;align-items:flex-start}
.c100-melding--fout{border-color:var(--tekst-fout);color:var(--tekst-fout)}
.c100-melding__tekst{color:var(--tekst)}
.c100-melding--fout .c100-melding__tekst{color:var(--tekst)}

/* ---------- LEEG ---------- */
.c100-leeg{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:var(--ruimte-4);text-align:center;padding:var(--ruimte-16) var(--ruimte-6);border:var(--lijn-dikte) dashed var(--lijn-sterk)}
.c100-leeg__kop{font-size:var(--text-kop-m);font-weight:var(--wg-kop-m)}
.c100-leeg__tekst{color:var(--tekst-stil);max-width:44ch}

/* ---------- SCHEIDING ---------- */
.c100-scheiding{display:flex;align-items:center;gap:var(--ruimte-4);border:0;margin:0;color:var(--tekst-stil)}
.c100-scheiding::before,.c100-scheiding::after{content:"";flex:1;height:1px;background:var(--lijn)}
.c100-scheiding--links::before{display:none}

/* ---------- BEELDVLAK ---------- */
.c100-beeld{position:relative;overflow:hidden;background:var(--inkt);display:block}
.c100-beeld img{width:100%;height:100%;object-fit:cover;display:block}
.c100-beeld__sluier{position:absolute;inset:0;pointer-events:none}
.c100-beeld__sluier--vlak{background:var(--sluier)}
.c100-beeld__sluier--onder{background:var(--sluier-onder)}
.c100-beeld__sluier--zij{background:var(--sluier-zij)}
.c100-beeld__inhoud{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:flex-end;padding:var(--ruimte-8);color:var(--krijt)}
.c100-beeld__inhoud--zij{justify-content:center;align-items:flex-start;max-width:62%}

/* ---------- BOVENKOP ---------- */
.c100-bovenkop{display:flex;align-items:center;gap:var(--ruimte-3);font-size:var(--text-bovenkop);line-height:var(--lh-bovenkop);letter-spacing:var(--ls-bovenkop);font-weight:var(--wg-bovenkop);text-transform:uppercase;color:var(--tekst-stil)}

/* ---------- VOETTEKST ---------- */
.c100-voet{border-top:var(--lijn-dikte) solid var(--lijn);padding-block:var(--ruimte-16) var(--ruimte-10)}
.c100-voet__raster{display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:var(--ruimte-12)}
@media (max-width:767px){.c100-voet__raster{grid-template-columns:1fr;gap:var(--ruimte-8)}}
.c100-voet__kolomkop{font-size:var(--text-bovenkop);letter-spacing:var(--ls-bovenkop);text-transform:uppercase;font-weight:600;color:var(--tekst-stil);margin-bottom:var(--ruimte-4)}
.c100-voet__lijst{display:flex;flex-direction:column;gap:var(--ruimte-3);list-style:none;padding:0;margin:0}
.c100-voet__lijst a{color:var(--tekst-zacht);text-decoration:none}
.c100-voet__lijst a:hover{color:var(--tekst);text-decoration:underline;text-underline-offset:.2em}
.c100-voet__onder{display:flex;justify-content:space-between;gap:var(--ruimte-6);flex-wrap:wrap;margin-top:var(--ruimte-16);padding-top:var(--ruimte-6);border-top:var(--lijn-dikte) solid var(--lijn);color:var(--tekst-stil);font-size:var(--text-lopend-s)}
```

## `tailwind-theme.css` — één @theme-blok voor Tailwind 4

```css
/* De Club van 100 — één @theme-blok voor Tailwind 4.
   Los deliverable: NIET geïmporteerd door styles.css (die levert het platte CSS-systeem).
   Gebruik in een Tailwind 4-project:
     @import "tailwindcss";
     @import "./tailwind-theme.css";
   Fonts: npm i @fontsource-variable/archivo  →  import '@fontsource-variable/archivo/wdth.css'; */

@theme {
  /* ---- lettertype ---- */
  --font-sans: "Archivo Variable", system-ui, -apple-system, "Segoe UI", sans-serif;

  /* ---- kleur: achtergronden (de vier) ---- */
  --color-inkt: #0B0B0B;
  --color-roet: #191919;
  --color-papier: #FAFAF8;
  --color-mist: #E4E4E1;
  /* ---- kleur: tekst ---- */
  --color-krijt: #FFFFFF;
  --color-krijt-zacht: #C9C9C6;
  --color-krijt-stil: #8A8A87;
  --color-grafiet: #5C5C59;
  /* ---- kleur: functioneel, gedempt ---- */
  --color-fout: #E4665C;
  --color-fout-donker: #A3231A;
  --color-letop: #D9A441;
  --color-letop-donker: #8A6412;
  --color-goed: #7FB08A;
  --color-goed-donker: #2F6B41;

  /* ---- typografische schaal ---- */
  --text-display-xl: clamp(3.5rem, 9vw, 8rem);
  --text-display-xl--line-height: 0.92;
  --text-display-xl--letter-spacing: -0.03em;
  --text-display-xl--font-weight: 800;
  --text-display-l: clamp(2.5rem, 6vw, 5rem);
  --text-display-l--line-height: 0.95;
  --text-display-l--letter-spacing: -0.02em;
  --text-display-l--font-weight: 800;
  --text-kop-l: clamp(1.75rem, 3.2vw, 2.75rem);
  --text-kop-l--line-height: 1.1;
  --text-kop-l--letter-spacing: -0.01em;
  --text-kop-l--font-weight: 700;
  --text-kop-m: clamp(1.25rem, 2vw, 1.625rem);
  --text-kop-m--line-height: 1.25;
  --text-kop-m--font-weight: 700;
  --text-kop-s: 1.125rem;
  --text-kop-s--line-height: 1.35;
  --text-kop-s--font-weight: 600;
  --text-bovenkop: 0.875rem;
  --text-bovenkop--line-height: 1.2;
  --text-bovenkop--letter-spacing: 0.14em;
  --text-bovenkop--font-weight: 600;
  --text-lopend-l: clamp(1.0625rem, 1.4vw, 1.1875rem);
  --text-lopend-l--line-height: 1.6;
  --text-lopend-l--font-weight: 400;
  --text-lopend-m: 1rem;
  --text-lopend-m--line-height: 1.65;
  --text-lopend-m--font-weight: 400;
  --text-lopend-s: 0.875rem;
  --text-lopend-s--line-height: 1.55;
  --text-lopend-s--font-weight: 400;
  --text-knop: 1.0625rem;
  --text-knop--line-height: 1;
  --text-knop--letter-spacing: 0.02em;
  --text-knop--font-weight: 700;

  /* ---- ruimte: basiseenheid 4px ---- */
  --spacing: 4px;
  --spacing-sectie-s: clamp(40px, 6vw, 64px);
  --spacing-sectie-m: clamp(64px, 9vw, 112px);
  --spacing-sectie-l: clamp(96px, 14vw, 176px);
  --spacing-marge: clamp(20px, 5vw, 64px);

  /* ---- container en breekpunten ---- */
  --container-smal: 768px;
  --container-basis: 1280px;
  --container-breed: 1600px;
  --breakpoint-sm: 600px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1600px;

  /* ---- radius ---- */
  --radius-none: 0;
  --radius-veld: 2px;
  --radius-overlay: 4px;
  --radius-vol: 999px;

  /* ---- diepte ---- */
  --shadow-licht-1: 0 1px 2px rgba(11,11,11,.10);
  --shadow-licht-2: 0 8px 24px rgba(11,11,11,.12);
  --shadow-licht-3: 0 24px 56px rgba(11,11,11,.18);
  --shadow-dialoog: 0 24px 64px rgba(0,0,0,.72);

  /* ---- motion ---- */
  --ease-uit: cubic-bezier(.2,0,0,1);
  --ease-in: cubic-bezier(.4,0,1,1);
  --ease-inuit: cubic-bezier(.65,0,.35,1);
  --animate-duur-1: 120ms;
  --animate-duur-2: 180ms;
  --animate-duur-3: 280ms;
  --animate-duur-4: 520ms;
}

/* breedte-as: alleen op displayniveaus */
.text-display-xl { font-variation-settings: "wdth" 118; }
.text-display-l  { font-variation-settings: "wdth" 112; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 1ms !important; transition-duration: 1ms !important; animation-iteration-count: 1 !important; }
}
```


---

# Componenten

## `components/merk/`

### Logo

Het merklogo — gebruik dit overal waar het merk zichtbaar moet zijn; nooit de naam natypen.

```jsx
<Logo variant="horizontaal" hoogte={32} />
```

Varianten: `horizontaal` (header, footer, briefpapier), `woordmerk` (als de schicht
al elders in beeld staat), `bliksem` (social avatar, decoratief — gebruik liever
`<Bliksem>`), `vierkant` (favicon, app-icoon).

Het bestand wordt inline gezet zodat `fill="currentColor"` werkt: zet gewoon
`color` op de ouder. Staat je pagina niet op de projectroot, zet dan
`window.__C100_ASSETS__ = "../../assets"` vóór het renderen.

<details><summary>Propscontract</summary>

```ts
import * as React from "react";
export declare function assetBasis(): string;
/**
 * Het logo van De Club van 100 in één van vier varianten. Monochroom; neemt de
 * tekstkleur van zijn omgeving over.
 */
export interface LogoProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Welke lockup. @default "horizontaal" */
  variant?: "horizontaal" | "woordmerk" | "bliksem" | "vierkant";
  /** Hoogte in px. @default 32 */
  hoogte?: number;
  /** Basis-URL van de assets-map. Standaard window.__C100_ASSETS__ of "assets". */
  basis?: string;
  /** aria-label. @default "De Club van 100" */
  label?: string;
}
export declare function Logo(props: LogoProps): React.ReactElement;
```

</details>

### Bliksem

Het enige eigen vormelement van het merk — gebruik spaarzaam, maximaal drie per pagina.

```jsx
<Bliksem rol="groot" />
<Bliksem rol="opsomming" />
```

Rollen: `groot` (achter de hero, 8% dekking, mag aflopen), `scheiding` (24px in een
sectielijn), `opsomming` (16px bullet, alleen in lijsten over de 100 of de selectie).
Nooit als patroon, nooit gedraaid, nooit in de tekstkolom, nooit naast het logo.
Zie `guidelines/bliksem.md`.

<details><summary>Propscontract</summary>

```ts
import * as React from "react";
/** De handgetekende bliksemschicht in één van de drie toegestane rollen. */
export interface BliksemProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** groot = uitgesneden achtergrondvlak (max 1/pagina); scheiding = tussen secties (max 2/pagina); opsomming = bullet. @default "opsomming" */
  rol?: "groot" | "scheiding" | "opsomming";
  /** Overschrijft de standaardhoogte van de rol. */
  hoogte?: number;
  /** Overschrijft de dekking (groot = 0.08, rest = 1). */
  dekking?: number;
}
export declare function Bliksem(props: BliksemProps): React.ReactElement;
```

</details>

### Icoon

Iconen — Lucide, 2px lijn, nooit gevuld. Onze keuze, geen merkregel (zie ICONOGRAFIE in readme.md).

```jsx
<Icoon naam="arrow-right" maat={20} />
<Icoon naam="phone" label="Bellen" />
```

Laad eerst `https://unpkg.com/lucide@0.544.0/dist/umd/lucide.js`. De bliksemschicht
is géén icoon en hoort niet in deze set.

<details><summary>Propscontract</summary>

```ts
import * as React from "react";
/** Lucide-icoon. Vereist het Lucide UMD-script op de pagina. */
export interface IcoonProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Lucide-naam, bijv. "arrow-right", "phone", "menu". */
  naam: string;
  /** Px. @default 20 */
  maat?: number;
  /** Lijndikte. @default 2 */
  dikte?: number;
  /** Zet een aria-label; zonder label is het icoon decoratief. */
  label?: string;
}
export declare function Icoon(props: IcoonProps): React.ReactElement;
```

</details>

## `components/basis/`

### Knop

De knop — elke actie op de site. Eén `vol` per blikveld, de rest `lijn` of `kaal`.

```jsx
<Knop variant="vol" maat="l" icoonRechts={<Icoon naam="arrow-right" />}>Ik zoek personeel</Knop>
<Knop variant="lijn">Ik wil bij jullie werken</Knop>
<Knop variant="kaal" laadt>Stuur maar</Knop>
```

States: default, hover (vult naar `krijt-zacht` / lijn wordt wit), focus-visible
(2px witte ring, offset 3px), active (scale 0.985), disabled (38% dekking,
`not-allowed`), laadt (spinner, `aria-busy`).
Microcopy: schrijf wat de bezoeker zelf zou zeggen — "Stuur maar", niet "Verzenden".

<details><summary>Propscontract</summary>

```ts
import * as React from "react";
export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> { maat?: number }
export declare function Spinner(props: SpinnerProps): React.ReactElement;
/**
 * De knop. Rechthoekig, hoofdletters, tekst in de stem van de bezoeker.
 */
export interface KnopProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** vol = primaire actie (max 1 per blikveld); lijn = secundair; kaal = tertiair. @default "vol" */
  variant?: "vol" | "lijn" | "kaal";
  /** @default "m" */
  maat?: "s" | "m" | "l";
  /** Volle breedte, alleen in formulieren en op mobiel. */
  breed?: boolean;
  /** Laadstatus: tekst verdwijnt, spinner verschijnt, knop blijft even breed. */
  laadt?: boolean;
  disabled?: boolean;
  href?: string;
  as?: React.ElementType;
  icoonLinks?: React.ReactNode;
  icoonRechts?: React.ReactNode;
}
export declare function Knop(props: KnopProps): React.ReactElement;
```

</details>

### Kaart

De kaart — voor alles wat in een raster staat: diensten, profielen, cijfers.

```jsx
<Kaart nummer="01" kop="Bar" tekst="Tappen onder druk, cocktails, opbouw en afbouw." />
<Kaart href="/de-100" kop="De 100" tekst="Wie er staan." voet={<Knop variant="kaal">Bekijk de ploeg</Knop>} />
<Kaart laadt />
```

States: default, hover (lijn wordt sterker, 2px omhoog; op licht komt er een schaduw
bij), focus-visible, active, disabled (38%), laadt (skelet). Klikbaar wordt hij zodra
`href` of `onClick` meegaat — dan rendert hij als `<a>` of `<button>`.

<details><summary>Propscontract</summary>

```ts
import * as React from "react";
export interface SkeletProps extends React.HTMLAttributes<HTMLSpanElement> { hoogte?: number; breedte?: number | string }
export declare function Skelet(props: SkeletProps): React.ReactElement;
/**
 * De kaart. Hoekig, lijn in plaats van schaduw op zwart.
 */
export interface KaartProps extends React.HTMLAttributes<HTMLElement> {
  /** verhoogd = roet/mist vlak; vlak = alleen een lijn. @default "verhoogd" */
  variant?: "verhoogd" | "vlak";
  /** Volgnummer of telwaarde, in hoofdletters boven de kop. */
  nummer?: React.ReactNode;
  kop?: React.ReactNode;
  tekst?: React.ReactNode;
  /** Blok onderaan, blijft op de bodem staan. */
  voet?: React.ReactNode;
  href?: string;
  disabled?: boolean;
  /** Toont een skelet in plaats van de inhoud. */
  laadt?: boolean;
}
export declare function Kaart(props: KaartProps): React.ReactElement;
```

</details>

### Badge

Klein label voor een aantal of een status — het getal 100 komt hier vaak in terug.

```jsx
<Badge>97 van de 100</Badge>
<Badge variant="vol">Vol</Badge>
<Badge variant="fout">Verlopen</Badge>
```

Cijfers staan op `tabular-nums`. Geen ronde hoeken, geen kleurcodering buiten
`fout` — dit merk heeft geen accentkleur.

<details><summary>Propscontract</summary>

```ts
import * as React from "react";
/** Klein label: aantal, status, categorie. */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** @default "lijn" */
  variant?: "lijn" | "vol" | "fout";
}
export declare function Badge(props: BadgeProps): React.ReactElement;
```

</details>

### Bovenkop

Het labeltje boven een sectiekop — geeft ritme zonder een tweede lettertype.

```jsx
<Bovenkop>Opdrachtgevers</Bovenkop>
<h2 className="t-display-l">Wij regelen de mensen</h2>
```

Nooit boven 16px; dan wordt het zelf een kop.

<details><summary>Propscontract</summary>

```ts
import * as React from "react";
/** Sectie-aanduiding boven een kop. Hoofdletters, 14px, 0.14em tracking. */
export interface BovenkopProps extends React.HTMLAttributes<HTMLParagraphElement> {}
export declare function Bovenkop(props: BovenkopProps): React.ReactElement;
```

</details>

### Scheiding

Vervangt de gewone `<hr>` tussen secties.

```jsx
<Scheiding schicht />
```

Zonder `schicht` is het een gewone 1px lijn in `--lijn`. Met schicht maximaal twee
per pagina (`guidelines/bliksem.md`).

<details><summary>Propscontract</summary>

```ts
import * as React from "react";
/** Scheidingslijn tussen secties, eventueel met de bliksemschicht erin. */
export interface ScheidingProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Zet de schicht in de lijn. Maximaal twee per pagina. @default false */
  schicht?: boolean;
  /** @default "midden" */
  uitlijning?: "midden" | "links";
}
export declare function Scheiding(props: ScheidingProps): React.ReactElement;
```

</details>

## `components/formulier/`

### Veld

Wikkel elk invoerelement hierin; nooit een los `<input>` zonder label.

```jsx
<Veld label="Je nummer" verplicht fout="We hebben je nummer nodig, anders kunnen we niets regelen">
  <Invoer type="tel" placeholder="06 " />
</Veld>
```

Merk op: dit systeem markeert niet de verplichte velden maar de optionele — achter een
optioneel label komt "— mag je overslaan". Dat scheelt sterretjes en past bij de toon.
Foutmeldingen in de stem van het merk, en verwijzen naar de telefoon mag.

<details><summary>Propscontract</summary>

```ts
import * as React from "react";
/**
 * Labelwikkel om elk invoerelement: label, hint, foutmelding en de aria-koppeling.
 */
export interface VeldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode;
  /** Hulptekst onder het veld. Vervalt zodra er een fout staat. */
  hint?: React.ReactNode;
  /** Foutmelding. Zeg wat er nu moet gebeuren, niet wat stuk is. */
  fout?: React.ReactNode;
  /** @default false — optionele velden krijgen "— mag je overslaan" achter het label. */
  verplicht?: boolean;
  id?: string;
  children: React.ReactElement;
}
export declare function Veld(props: VeldProps): React.ReactElement;
```

</details>

### Invoer

Eenregelig veld. Altijd binnen een `<Veld>`.

```jsx
<Veld label="Naam"><Invoer placeholder="Hoe heet je?" /></Veld>
```

States: default (1px `--lijn-sterk`, 3:1), hover (rand wordt `--tekst-zacht`), focus
(2px ring), disabled (38%), fout (`aria-invalid`, 2px `--tekst-fout`), laadt.
Minimale hoogte 44px — dat is de hitzone van het systeem.

<details><summary>Propscontract</summary>

```ts
import * as React from "react";
/** Eenregelig invoerveld. */
export interface InvoerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Laadstatus: aria-busy en readOnly. */
  laadt?: boolean;
}
export declare function Invoer(props: InvoerProps): React.ReactElement;
```

</details>

### Tekstvak

Meerregelig veld, zelfde states als `Invoer`.

```jsx
<Veld label="Wat heb je nodig?" hint="Datum, hoeveel mensen, wat voor werk.">
  <Tekstvak rows={5} placeholder="Zaterdag 12 sept, festival, 8 man bar." />
</Veld>
```

<details><summary>Propscontract</summary>

```ts
import * as React from "react";
/** Meerregelig invoerveld, minimaal 132px hoog, alleen verticaal te slepen. */
export interface TekstvakProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}
export declare function Tekstvak(props: TekstvakProps): React.ReactElement;
```

</details>

### Keuzelijst

Native select in merkstijl — bewust geen custom dropdown.

```jsx
<Veld label="Wat voor werk?">
  <Keuzelijst plaatshouder="Kies er een" opties={["Bar", "Bediening", "Gastheer of gastvrouw", "Alles gecombineerd"]} />
</Veld>
```

<details><summary>Propscontract</summary>

```ts
import * as React from "react";
export interface KeuzelijstOptie { waarde: string; label: string; disabled?: boolean }
/** Native select met de merkstijl. Geen custom dropdown; vijf pagina's dragen dat niet. */
export interface KeuzelijstProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  opties?: Array<string | KeuzelijstOptie>;
  /** Uitgeschakelde eerste optie als plaatshouder. */
  plaatshouder?: string;
}
export declare function Keuzelijst(props: KeuzelijstProps): React.ReactElement;
```

</details>

### Aankruis

Vinkje met label; het hele label is klikbaar.

```jsx
<Aankruis label="Ik heb de voorwaarden gelezen" />
<Aankruis label="Bel me liever" disabled />
```

<details><summary>Propscontract</summary>

```ts
import * as React from "react";
/** Vinkje. 22px vakje, 44px hitzone via het label. */
export interface AankruisProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
  fout?: boolean;
}
export declare function Aankruis(props: AankruisProps): React.ReactElement;
```

</details>

### Keuzerondje

Eén keuze uit een korte lijst. Boven vijf opties: `Keuzelijst`.

```jsx
<Keuzerondje name="rol" label="Ik zoek personeel" defaultChecked />
<Keuzerondje name="rol" label="Ik wil bij jullie werken" />
```

<details><summary>Propscontract</summary>

```ts
import * as React from "react";
/** Keuzerondje. Zelfde maatvoering als Aankruis, ronde vorm. */
export interface KeuzerondjeProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
  fout?: boolean;
}
export declare function Keuzerondje(props: KeuzerondjeProps): React.ReactElement;
```

</details>

## `components/navigatie/`

### Navigatie

De hoofdnavigatie — één per pagina, bovenaan, sticky.

```jsx
<Navigatie
  actief="/opdrachtgevers"
  items={[{href:"/",label:"Home"},{href:"/opdrachtgevers",label:"Opdrachtgevers"},{href:"/de-100",label:"De 100"},{href:"/contact",label:"Contact"}]}
  actie={<Knop maat="s">Ik zoek personeel</Knop>}
/>
```

States per link: default (`--tekst-zacht`), hover (wit, 2px onderstreping schuift in
vanaf links), actief (`aria-current="page"`, onderstreping blijft staan), active (70%),
disabled. Geen dropdowns — vijf pagina's hebben geen menuboom nodig.

<details><summary>Propscontract</summary>

```ts
import * as React from "react";
export interface NavItem { href: string; label: string; disabled?: boolean }
/**
 * Sticky hoofdnavigatie met logo, vijf links en één actie. Onder 900px klapt hij in.
 */
export interface NavigatieProps extends React.HTMLAttributes<HTMLElement> {
  items?: NavItem[];
  /** href van de huidige pagina; zet aria-current en de onderstreping. */
  actief?: string;
  /** Rechterblok, meestal één Knop. */
  actie?: React.ReactNode;
}
export declare function Navigatie(props: NavigatieProps): React.ReactElement;
```

</details>

### Voettekst

De voettekst. Eén per pagina, onderaan.

```jsx
<Voettekst
  contact="info@declubvan.nl"
  kolommen={[{kop:"Site",items:[{label:"Home",href:"/"},{label:"De 100",href:"/de-100"}]},{kop:"Zakelijk",items:[{label:"Voorwaarden",href:"/voorwaarden"}]}]}
/>
```

<details><summary>Propscontract</summary>

```ts
import * as React from "react";
export interface VoetKolom { kop: string; items: Array<{ label: string; href?: string }> }
/** Voettekst met logo, drie kolommen en een onderregel. */
export interface VoettekstProps extends React.HTMLAttributes<HTMLElement> {
  kolommen?: VoetKolom[];
  /** Rechtsonder, meestal telefoonnummer of e-mail. */
  contact?: React.ReactNode;
}
export declare function Voettekst(props: VoettekstProps): React.ReactElement;
```

</details>

## `components/feedback/`

### Melding

Inline bevestiging of foutmelding — bewust geen toast: die verdwijnt en dit merk belooft duidelijkheid.

```jsx
<Melding toon="goed">Binnen. Je hoort binnen een dag van ons.</Melding>
<Melding toon="fout">Er ging iets mis bij ons. Probeer het zo nog een keer, of bel gewoon even: 06 12 34 56 78.</Melding>
```

`fout` krijgt `role="alert"`, de rest `role="status"`.

<details><summary>Propscontract</summary>

```ts
import * as React from "react";
/** Inline melding boven of onder een formulier. Geen toast, geen zwevend paneel. */
export interface MeldingProps extends React.HTMLAttributes<HTMLDivElement> {
  /** @default "neutraal" */
  toon?: "neutraal" | "fout" | "goed";
  /** Lucide-naam; null verbergt het icoon. */
  icoon?: string | null;
}
export declare function Melding(props: MeldingProps): React.ReactElement;
```

</details>

### Leeg

De lege staat — bijvoorbeeld een ploegoverzicht zonder resultaten.

```jsx
<Leeg tekst="De honderd zit vol. Laat je nummer achter, dan bellen we als er een plek vrijkomt."
      actie={<Knop variant="lijn">Laat je nummer achter</Knop>} />
```

Nooit "Geen resultaten gevonden".

<details><summary>Propscontract</summary>

```ts
import * as React from "react";
/** Lege staat: een gestippeld kader met één zin en hoogstens één actie. */
export interface LeegProps extends React.HTMLAttributes<HTMLDivElement> {
  /** @default "Nog niks te zien hier" */
  kop?: React.ReactNode;
  tekst?: React.ReactNode;
  actie?: React.ReactNode;
}
export declare function Leeg(props: LeegProps): React.ReactElement;
```

</details>

## `components/beeld/`

### Beeldvlak

Elke foto met tekst erop. Nooit een kale `<img>` met een absolute `<h1>` erover.

```jsx
<Beeldvlak bron="assets/photo/vuur-zonsondergang.png" alt="Vuurkorf op het festivalterrein" sluier="onder">
  <h2 className="t-display-l">Een van de 100</h2>
</Beeldvlak>
```

Sluiers: `onder` (tekst in de onderste 45%), `zij` (tekst in de linkerhelft),
`vlak` (62% over alles, voor kaarten). Reken na op de lichtste plek van de foto;
bij een lichte buitenopname naar 72%. Zie `guidelines/beeld.md`.

<details><summary>Propscontract</summary>

```ts
import * as React from "react";
/**
 * Foto met verplichte sluier. Tekst op beeld loopt altijd via dit component.
 */
export interface BeeldvlakProps extends React.HTMLAttributes<HTMLDivElement> {
  bron: string;
  alt?: string;
  /** onder = verloop van onderaf; zij = verloop van links; vlak = 62% zwart over alles. @default "onder" */
  sluier?: "onder" | "zij" | "vlak";
  /** CSS aspect-ratio. @default "16 / 9" */
  verhouding?: string;
  /** onder = tekst onderin; zij = tekst links gecentreerd. @default "onder" */
  positie?: "onder" | "zij";
  /** Vaste hoogte in plaats van een verhouding. */
  hoogte?: number | string;
}
export declare function Beeldvlak(props: BeeldvlakProps): React.ReactElement;
```

</details>


---

# UI kit — website

Vijf pagina's, klikbaar: **home, opdrachtgevers, de 100, contact, voorwaarden**.
Open `index.html`; de navigatie en de knoppen wisselen van scherm zonder herladen.

> **Let op: dit is geen recreatie.** Er bestaat nog geen site (fase 1 is alleen het
> systeem). Deze kit laat zien hoe het systeem zich gedraagt op echte pagina's en
> dient als referentie-implementatie — de layout is onze keuze, niet een merkregel.
> De referentie die de klant zelf noemt, jongensvandebar.nl, zit in de home als
> splitscreen met twee deuren; de rest gaat er visueel overheen.

## Bestanden

| Bestand | Scherm |
|---|---|
| `index.html` | Shell: navigatie, router, voettekst |
| `Home.jsx` | Hero met display-xl en grote schicht, splitscreen met twee deuren, drie waardenkaarten, twee quotes, afsluitend beeldvlak |
| `Opdrachtgevers.jsx` | Vier dienstkaarten, "zo gaat het" met schicht-opsomming, tarief- en werkgebiedkaart, beeldvlak met vlakke sluier |
| `DeHonderd.jsx` | Beeldvlak met zijsluier, filterbalk met laad- en lege staat, ploegraster, aanmeldblok naar het externe formulier |
| `Contact.jsx` | Formulier dat van vorm verandert per doelgroep, met fout-, laad- en successtaat; contactkaarten ernaast |
| `Voorwaarden.jsx` | Het enige lichte scherm (`data-thema="licht"`), lopende tekst in `container-smal` |

## Wat je kunt uitproberen

- Op **de 100**: klik op "Sommelier" — je ziet eerst de laadstaat (skeletkaarten) en
  daarna de lege staat met de merkeigen microcopy.
- Op **contact**: verstuur zonder telefoonnummer voor de foutstaat; vink de
  voorwaarden aan om de knop vrij te geven; typ `0` als nummer om de foutmelding
  aan onze kant te zien.
- Wissel tussen "Ik zoek personeel" en "Ik wil bij jullie werken" — het formulier
  verandert van velden, de stem blijft gelijk.

## Placeholderinhoud

Namen in het ploegraster, tarieven, KvK-nummer, telefoonnummer en de samengevatte
voorwaarden zijn ingevuld om de opmaak te tonen. De echte voorwaarden staan in
`uploads/Algemene Voorwaarden – De Club van 100 (declubvan.nl).pdf`.
