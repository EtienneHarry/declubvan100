---
project: De Club van 100
document: Restyle-brief v2 — van zwart-wit naar warm bruin met accent
bron: mockup Website - De Club van 100.pdf (5 pagina's), aangeleverd augustus 2026
status: kleuren gemeten uit de mockup, lettertypes op zicht bepaald (gok, zie
  zekerheidsniveau per familie)
---

# Restyle-brief — De Club van 100 v2

De klant heeft een nieuwe visuele richting aangeleverd. Dit document vertaalt de
mockup naar tokens en beslissingen. Kleuren zijn gemeten uit de pdf; lettertypes
zijn op zicht bepaald en per familie van een zekerheidsniveau voorzien.

## 1. Kleur — gemeten uit de mockup

| Token | Waarde | Herkomst | Gebruik |
|---|---|---|---|
| `bruin` | `#201410` | gemeten, leeg achtergrondvlak p2 | primaire achtergrond, vervangt inkt als dominant |
| `inkt` | `#0A0A0A` | bestaand | zwarte knoppen, tekst op licht |
| `cream` | `#E4CDB4` | gemeten, knoptekst en highlights | tekst-accent op donker, knoptekst op zwart |
| `papier` | `#FCFCFC` | gemeten, hoofdtekst op donker | primaire tekst op bruin, lichte vlakken |
| `vuur` | `#C13111` | gemeten, INHUREN-knop | accent. Alleen knoppen en kleine vlakken, nooit tekstkleur op bruin |
| `mist` | `#9C9C9C` | bestaand | gedempte tekst, labels |

### Contrast, gemeten op `#201410` (afgerond op de meting op #1a100e; herbereken op de definitieve waarde)

- papier: ruim boven AA voor alle tekst
- cream 12,2:1 — alle tekst toegestaan
- mist 6,8:1 — toegestaan voor gewone tekst, ruim voor groot
- **vuur 3,3:1 — NIET toegestaan als tekstkleur op bruin.** Alleen als vlak.
- Tekst óp vuur: wit haalt 5,5:1 en mag; cream haalt 3,7:1 en mag alleen groot
  (24px+ of 19px vet); zwart haalt 3,5:1 en mag alleen groot. In de mockup staat
  cream-typemachinetekst op de rode knop — dat haalt AA alleen doordat knoptekst
  gespatieerd en verhoudingsgewijs groot staat. Regel: knoptekst op vuur is wit
  of voldoet aantoonbaar aan de groot-tekst-drempel.

### Wat dit betekent voor het systeem

- `bruin` vervangt `inkt` als dominante achtergrond; `inkt` blijft bestaan voor
  knoppen en de zwarte vlakken uit de mockup.
- `vuur` is nieuw en is een breuk met de eerdere regel "geen accentkleur". Die
  regel verdwijnt uit design-system.md met een aantekening waarom.
- De sluier op foto's wordt warm: zelfde dekking, maar op bruin in plaats van op
  zwart, anders vloekt hij met de nieuwe achtergrond. Hero p1 toont een lichte,
  bijna sepia overlay — dat is een tweede sluiervariant (licht) voor foto's met
  donkere tekst erop. Twee sluiertokens dus: `sluier-donker`, `sluier-licht`.

## 2. Typografie — drie families, op zicht bepaald

| Rol | Mockup toont | Beste gok | Zekerheid | Fallback-besluit |
|---|---|---|---|---|
| Dragend (koppen + lopend) | geometrische sans, dubbellaags: DE CLUB VAN 100, VOOR ONDERNEMERS | **Poppins** (huidige Archivo blijft verdedigbaar) | matig | zie afweging hieronder |
| Typemachine (labels, knoppen, uitgelichte regels) | monospaced slab met duidelijke serifs: MEER DAN EEN UITZENDBUREAU, INHUREN, "Geen nummertjes, maar 1 van de 100" | **Special Elite** (Google Fonts); alternatief Courier Prime | matig | Special Elite heeft het "gestempelde" karakter van de mockup; Courier Prime is strakker |
| Handschrift (accentregels) | doorlopend schrijfschrift: "Work when you want…" | **Caveat** of **Dancing Script** (Google Fonts) | laag | alleen decoratief, nooit voor betekenisdragende tekst zonder gewone-tekst-alternatief |

### De afweging bij de dragende letter

De mockup-sans is ronder dan Archivo: de R, de C en de O wijzen richting Poppins
of Montserrat — en Montserrat is al bevestigd als woordmerk-letter. Twee routes:

- **Route A (aanbevolen): Montserrat als dragende letter.** Woordmerk en site
  vallen samen, één familie minder te verantwoorden, en de mockup zit er dicht
  op. Verlies: de breedte-as van Archivo (wdth 112–118 op displaykoppen)
  bestaat niet in Montserrat; monumentale koppen moeten het dan van gewicht en
  grootte hebben.
- **Route B: Archivo blijft.** Systeem hoeft niet om, maar de site blijft
  hoekiger ogen dan de mockup.

De keuze is aan Etienne; de brief gaat uit van Route A tenzij anders gezegd.

### Installatie (Fontsource, zoals de standaard)

```
@fontsource-variable/montserrat        (of behoud archivo)
@fontsource/special-elite              (één gewicht, 400)
@fontsource/caveat                     (variable)
```

Alle families via tokens: `--font-basis`, `--font-machine`, `--font-hand`.
check-tokens bewaakt al dat er geen letterlijke familienamen buiten tokens.css
staan; deze drie gaan door dezelfde poort.

### Regels

- Typemachine: hoofdletters, ruime tracking (0.14em), alleen voor labels,
  knoppen en maximaal één uitgelichte regel per sectie. Nooit voor lopende
  tekst langer dan twee regels.
- Handschrift: maximaal één regel per pagina, altijd decoratief. aria-hidden
  als dezelfde boodschap al in gewone tekst op de pagina staat (mockup p3
  doet precies dat: drie bijschriften plus dezelfde tekst in handschrift).
- De dubbellaagse witte kop met bruine "schaduw" op p1 (DE CLUB VAN 100) is
  een hero-exclusief effect: text-shadow of een tweede laag, alleen op
  display-xl, nooit elders.

## 3. Twee nieuwe grafische motieven

Naast de bliksemschicht introduceert de mockup:

- **De ovaal**: een met de hand getekende ellips om een woordgroep ("1 van de
  100", "hele agenda"). Bouw als SVG-omtrek die om een `<span>` heen schaalt,
  strokekleur uit tokens (papier op donker). Maximaal één per sectie. Tekent
  zichzelf bij onthulling (stroke-dashoffset), past bij Inslag; bij
  gereduceerde beweging staat hij er meteen.
- **Het onderstreepje**: een losse, licht scheve haal onder een kop ("NODIG
  HEBT.", "BETER IS."). Zelfde aanpak, zelfde regels.

Beide zijn de "handgetekende" familie waar de schicht al toe behoort — dit is
een verwantschap, geen stijlbreuk. De schicht-rollen blijven zoals vastgelegd.

## 4. Content — nieuwe teksten uit de mockup

De mockupteksten vervangen de huidige waar ze overlappen. Ze zijn scherper dan
de samengestelde koppen die er nu staan. Kernpunten:

- Hero: labels "MEER DAN EEN UITZENDBUREAU" / "ECHTE MENSEN" (typefout
  "EEEN UITZENBUREAU" uit de mockup NIET overnemen), kop "DE CLUB VAN 100",
  knoppen AANMELDEN (inkt) en INHUREN (vuur).
- Opdrachtgevers heet in de mockup "VOOR ONDERNEMERS" met de kernzin "Geen
  nummertjes, maar 1 van de 100" (ovaal om "1 van de 100") en de afsluiter
  "GOEDE MENSEN OP HET MOMENT DAT JE ZE NODIG HEBT." (onderstreepje).
- De 100 heet "VOOR WIE IS DE CLUB?" met "…maar niet willen dat hun hele
  agenda wordt bepaald door hun bijbaan" (ovaal om "hele agenda") en
  "OMDAT GROTER NIET ALTIJD BETER IS." (onderstreepje).
- Drieluik met bijschriften "Work when you want. / Where you want. / With
  people you like." — Engels is akkoord bevonden door de klant. De
  handschriftregel eronder herhaalt dezelfde tekst en wordt aria-hidden.
- Contact/footer: e-mail contact@declubvan.nl, Instagram @declubvanhonderd,
  telefoon +31 6 19004878.

**Telefoonnummer: +31 6 19004878 vervangt 06 25 33 15 97 overal** — dit is de
nieuwe opgave van de klant en wint van de eerdere bevestiging. Bijwerken in
bron/contactgegevens.md, de site-instellingen (CMS) en de privacyverklaring als
die het nummer noemt.

## 5. FAQ — door de klant aangeleverd, klaar voor het accordeon-sectietype

Twaalf vragen, twee groepen. De antwoorden hieronder zijn uitgeschreven in de
merkstem op basis van de steekwoorden van de klant; inhoudelijk niets toegevoegd.

### Voor opdrachtgevers

**Wat kost het?**
Het factuurtarief hangt af van het soort opdracht en de werkzaamheden. Neem
contact op en je hoort direct het actuele tarief.

**Hoe snel kunnen jullie iemand regelen?**
Vraag bij voorkeur zo vroeg mogelijk aan, maar last-minute kan ook — als er
iemand beschikbaar is soms dezelfde dag nog. Een inzet is definitief zodra wij
hem bevestigd hebben.

**Wat als er iemand niet komt opdagen?**
Neem direct contact op met De Club. Wij benaderen meteen beschikbare Clubleden
en regelen zo snel mogelijk vervanging. Je betaalt nooit voor niet-gewerkte
uren.

**Hoe zit het met de factuur?**
Je krijgt achteraf een factuur op basis van de daadwerkelijk gewerkte uren.
Betaaltermijn: 30 dagen.

**Werken jullie ook buiten Groningen?**
We zitten in Groningen, maar inzet kan door heel Nederland — afhankelijk van de
opdracht en de beschikbaarheid van Clubleden.

**Wat voor werk pakken jullie aan?**
Bediening, bar, barista's, gastheren en gastvrouwen, festivals, evenementen,
garderobe en afwas. Breed inzetbaar binnen horeca en events.

**Wat is de minimale afname?**
Vanaf één medewerker. Er is geen minimum per opdracht.

### Voor mensen die bij de Club willen

**Wat verdien ik?**
Je wordt verloond via 365Werk. Je loon hangt af van je leeftijd en de functie,
en je ziet vooraf wat een dienst je oplevert. De week na je gewerkte dienst
staat het op je rekening — uitbetaling is altijd op donderdag.

**Wat zijn de eisen?**
Je bent minimaal 18, sociaal en representatief, en je komt afspraken na.
Horeca-ervaring vermeld je bij je aanmelding; een horecadiploma is niet nodig.
Vertel vooral waar je enthousiast van wordt.

**Hoe werkt aanmelden en hoe lang duurt het?**
Je meldt je online aan, vult je horeca-ervaring in en vertelt waar je
enthousiast van wordt. Daarna volgt een korte kennismaking en beoordelen we of
je bij De Club past. Past het? Dan kun je aan de slag.

**Zit ik ergens aan vast?**
Nee. Geen vast rooster, geen minimum aantal diensten, geen verplicht aantal
uren. Je kiest zelf welke diensten je aanneemt — maar een aangenomen dienst is
wel een afspraak.

**Hoe word ik uitbetaald en wanneer?**
Via 365Werk, geen zzp-constructie. Je gewerkte uren worden doorgegeven en de
week na je dienst uitbetaald, altijd op donderdag.

### Gevolgen elders

- 365Werk is een nieuwe verwerker van persoonsgegevens van Clubleden. De
  privacyverklaring dekt nu alleen de website; dat blijft kloppen zolang de
  site zelf niets naar 365Werk stuurt. Geen actie, wel weten.
- "Online aanmelden" bevestigt dat het aanmeldformulier het startpunt is —
  het formulier (nog te bouwen) krijgt een veld voor horeca-ervaring en één
  voor "waar word je enthousiast van". Dat zijn twee velden meer dan de
  privacyverklaring nu noemt; die tekst gaat dus mee bij de formuliersessie.

## 6. Wat er NIET verandert

- De sectiemotor, alle acht sectietypes, SectionRenderer, de tokenlaag als
  mechanisme, de zeven poorten, Keystatic op 0.6.4, de naad, de
  bewegingslaag (Inslag/Ploeg) en de zes pagina's als structuur.
- De elf foto's van deze shoot staan al in public/beeld.
- De privacyverklaring is bevestigd door de klant.

## 7. Openstaand

1. Keuze Route A (Montserrat) of Route B (Archivo) voor de dragende letter.
2. De typemachine- en handschriftfamilie zijn een gok; als de maker van de
   mockup de echte namen heeft, wint dat.
3. Het accordeon-sectietype voor de FAQ moet nog gebouwd (negende type):
   raakt SectionRenderer, het schema, secties.astro en de koppenbewaking.
4. Het formulier: nu met twee extra velden (horeca-ervaring, enthousiasme) —
   privacyverklaring gaat mee.
