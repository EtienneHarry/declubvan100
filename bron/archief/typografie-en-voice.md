---
project: De Club van 100
onderdeel: Design system, fase 1
hoofdstukken: typografie, tone of voice
status: concept ter beoordeling
datum: augustus 2026
---

# De Club van 100 — typografie en tone of voice

Twee hoofdstukken uit het design system. De rest (kleur, ruimte, grid, componenten,
motion, beeld) komt daar los bij.

---

## 1. Typografie

### 1.1 De keuze

**Archivo Variable** voor alles. Eén familie, twee assen: gewicht 100–900 en breedte
62–125.

Waarom deze en niet de letter van het woordmerk. Het woordmerk staat in een
geometrische schreefloze, dichtste match Poppins Bold. Poppins is rond, vriendelijk en
overal. Dit merk is dat niet: het is een selectie, geen open inschrijving. Archivo is
een grotesk met rechte terminals en strakke binnenvormen. Op groot formaat in zwaar
gewicht wordt het hard en trots, precies de toon van "een van de 100".

Dat het woordmerk een andere letter is dan de site, is geen probleem maar bedoeling.
Een logo is een merkteken, geen tekst. Bovendien zit het woordmerk als contour in de
SVG, dus er is geen technische afhankelijkheid.

**Wat de breedte-as je geeft.** Koppen zetten we op `wdth 112–118`, lopende tekst op
`wdth 100`. Daardoor worden grote koppen breder en monumentaler zonder dat je een
tweede lettertype nodig hebt, en blijft de leestekst normaal van maat. Dat is het
grafische verschil dat de site draagt, en het kost nul extra bytes.

> Onze keuze, niet die van het merk. Er ligt geen huisstijlgids met een lettertype.
> Dit is een onderbouwd voorstel; wijkt de klant af, dan verandert alleen dit
> hoofdstuk en niet de rest van het systeem.

**Alternatief als je het losser wilt.** Anton voor koppen plus Archivo voor tekst.
Anton is één gewicht, extreem smal en luid, festivalposter-energie. Sterker qua
karakter, maar je verliest de breedte-as, je hebt twee families nodig en Anton is
onbruikbaar onder ongeveer 28 pixels. Ik zou het niet doen bij een site van vijf
pagina's.

### 1.2 Installatie

```bash
npm i @fontsource-variable/archivo
```

```ts
import '@fontsource-variable/archivo/wdth.css';  // bevat wght én wdth
```

Belangrijk: importeer `wdth.css`, niet de standaardimport. Fontsource laadt bij de
standaardimport alleen de gewicht-as, en dan doet de breedte-as niets. Eén import per
familie, meerdere assen stapelen werkt niet.

Fallback: `system-ui, -apple-system, "Segoe UI", sans-serif`. Archivo staat qua breedte
dicht genoeg bij die stack om verspringen bij het laden beperkt te houden.

### 1.3 De schaal

Vloeiend met `clamp()`. Waardes gaan van mobiel (375px) naar desktop (1440px).

| Token | Grootte | Gewicht | Breedte | Regelhoogte | Tracking | Waarvoor |
|---|---|---|---|---|---|---|
| `display-xl` | `clamp(3.5rem, 9vw, 8rem)` | 800 | 118 | 0.92 | -0.03em | Eén per pagina. De klap boven de vouw. |
| `display-l` | `clamp(2.5rem, 6vw, 5rem)` | 800 | 112 | 0.95 | -0.02em | Openingskop van een sectie. |
| `kop-l` | `clamp(1.75rem, 3.2vw, 2.75rem)` | 700 | 100 | 1.10 | -0.01em | Kop binnen een sectie. |
| `kop-m` | `clamp(1.25rem, 2vw, 1.625rem)` | 700 | 100 | 1.25 | 0 | Kaartkop, subkop. |
| `kop-s` | `1.125rem` | 600 | 100 | 1.35 | 0 | Kleine kop, labelkop in een formulier. |
| `bovenkop` | `0.875rem` | 600 | 100 | 1.2 | 0.14em | Hoofdletters. Sectie-aanduiding boven een kop. |
| `lopend-l` | `clamp(1.0625rem, 1.4vw, 1.1875rem)` | 400 | 100 | 1.6 | 0 | Introtekst, standaard leestekst. |
| `lopend-m` | `1rem` | 400 | 100 | 1.65 | 0 | Lopende tekst in kaarten en kolommen. |
| `lopend-s` | `0.875rem` | 400 | 100 | 1.55 | 0 | Bijschrift, voetnoot, metagegevens. |
| `knop` | `1.0625rem` | 700 | 100 | 1 | 0.02em | Knoptekst. Hoofdletters. |

### 1.4 Regels

**Koppen.** Geen hoofdletters op `display-xl` en `display-l` behalve als de kop uit
maximaal drie woorden bestaat. "EEN VAN DE 100" in hoofdletters werkt; een hele zin in
hoofdletters leest niet en verliest de vorm.

**Gewicht en formaat horen bij elkaar.** Gewicht 800 alleen boven 40 pixels. Daaronder
loopt Archivo dicht en gaat het smoezelig ogen. Onder 16 pixels nooit lichter dan 400,
en op zwarte achtergrond nooit lichter dan 400 in welk formaat dan ook: lichte letters
op donker vallen optisch dunner uit dan ze zijn.

**Breedte volgt hiërarchie.** Alleen `display`-niveaus krijgen `wdth` boven 100. Zodra
je de breedte-as in lopende tekst gebruikt, verliest de site zijn ritme.

**Regellengte.** Lopende tekst tussen 60 en 75 tekens. Op een zwarte achtergrond
liever richting 60, want licht op donker vermoeit sneller.

**Eén display per pagina.** Twee monumentale koppen boven elkaar heffen elkaar op.

**Cijfers.** Zet `font-variant-numeric: tabular-nums` op alles waar cijfers onder
elkaar staan, bijvoorbeeld tarieven en aantallen. Het getal 100 komt in dit merk vaak
voor en moet er overal identiek uitzien.

### 1.5 Tokens

```css
@theme inline {
  --font-sans: "Archivo Variable", system-ui, -apple-system, "Segoe UI", sans-serif;

  /* schaal */
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
}

/* breedte-as: alleen op displayniveaus */
.text-display-xl { font-variation-settings: "wdth" 118; }
.text-display-l  { font-variation-settings: "wdth" 112; }
```

---

## 2. Tone of voice

### 2.1 De houding

De Club van 100 zegt niet dat ze goed zijn, ze laten merken dat niet iedereen mee mag
doen. Dat is het hele verschil met een uitzendbureau, en het is ook het hele verschil
in de taal. Een uitzendbureau werft. Deze club selecteert.

Praktisch: schrijf alsof je aan de bar staat en iets uitlegt aan iemand die je aardig
vindt. Kort, direct, geen verkooppraat. Trots mag je horen, opschepperij niet.

### 2.2 Vijf regels

**Zeg het in de helft van de woorden.** "Wij regelen ervaren horecapersoneel voor jouw
evenement" wordt "Wij regelen de mensen." De rest staat er onder.

**Jij en wij, altijd.** Nooit "de opdrachtgever" of "onze medewerkers". Het is een
club, geen bemiddelingsbureau.

**Toon in plaats van beweren.** Niet "onze mensen zijn ervaren", wel "iedereen die hier
staat, heeft honderd avonden achter een bar gestaan". Concreet verslaat een
bijvoeglijk naamwoord.

**Het getal is het argument.** Honderd is geen willekeurig getal, het is de grens. Laat
dat het werk doen: "één van de honderd", "de honderd zit vol", "we nemen er twee bij".

**Nooit vaag over geld, tijd of wat je krijgt.** Dit is een branche waar mensen
belazerd worden met onduidelijke tarieven. Concreet zijn is hier geen stijlkeuze maar
een merkbelofte.

### 2.3 Twee doelgroepen, één stem

De stem blijft gelijk, de invalshoek verschuift.

**Tegen opdrachtgevers.** Rustig en zeker. Jij hebt een avond te draaien en wij zorgen
dat er niets misgaat. Nadruk op betrouwbaarheid en op wat ze niet hoeven te regelen.
Geen enthousiasme dat om een gunst vraagt.

> *"Je krijgt geen willekeurige invalkracht. Je krijgt iemand die weet hoe een tap
> onder druk werkt."*

**Tegen professionals.** Directer en uitdagender. Nadruk op erbij horen, op de betere
klussen, op wie er niet doorkomt.

> *"Honderd plekken. Niet iedereen komt erdoor. Denk je dat jij een van de betere
> barmannen van de stad bent, laat het weten."*

### 2.4 Woorden

**Wel:** klus, avond, draaien, tap, vloer, ploeg, selectie, een van de honderd, trots,
scherp, regelen, staan.

**Niet:** uitzendkracht, flexkracht, flexpool, inzetbaar, ontzorgen, partner in
personeel, personeelsoplossing, kwalitatief hoogstaand, gedreven professionals, unieke
beleving, wij denken graag met u mee.

De hele branche gebruikt de rechterkolom. Dat is precies de reden om hem niet te
gebruiken.

### 2.5 Microcopy

Schrijf knoppen als iets wat de bezoeker zelf zou zeggen, niet als een systeemactie.

| Situatie | Wel | Niet |
|---|---|---|
| Hoofdknop opdrachtgevers | Ik zoek personeel | Meer informatie |
| Hoofdknop professionals | Ik wil bij jullie werken | Solliciteer nu |
| Formulier versturen | Stuur maar | Verzenden |
| Na versturen | Binnen. Je hoort binnen een dag van ons. | Uw aanvraag is succesvol verzonden |
| Verplicht veld leeg | We hebben je nummer nodig, anders kunnen we niets regelen | Dit veld is verplicht |
| Lege lijst | Nog niks te zien hier | Geen resultaten gevonden |
| Fout aan onze kant | Er ging iets mis bij ons. Probeer het zo nog een keer, of bel gewoon even. | Er is een onverwachte fout opgetreden |

Foutmeldingen zeggen wat er nu moet gebeuren, niet wat er stuk is. In dit merk mag je
in een foutmelding gerust naar de telefoon verwijzen: het is een club, je kunt ze
bellen.

### 2.6 Wat er nu op papier staat

Hun eigen materiaal zit dicht bij de goede toon, maar niet overal.

Het sterkst is de missie: *wij misten een plek waar écht goede horeca en evenementen
mensen samen komen*. Dat is de stem, die kan zo de site op.

Twee dingen om op te lossen voor ze live gaan:

1. **Er staan taalfouten in.** In het deck staat "een groep vaan 100" en "ervaring is
   bij ons beloofd", waar waarschijnlijk "verlangd" of "vereist" bedoeld wordt. Op een
   site die kwaliteit claimt is dat duur.
2. **De huisregels klinken als een personeelshandboek.** "Handel te allen tijde
   professioneel" en "meld onregelmatigheden onmiddellijk aan het management" passen
   bij een uitzendbureau, niet bij een club. Die tekst hoeft niet op de site, maar als
   hij erop komt moet hij herschreven.

---

## Openstaande punten

1. Archivo of het alternatief met Anton. Ik ga uit van Archivo.
2. Of de klant een eigen lettertype heeft dat niemand heeft benoemd. Eén vraag aan hun
   ontwerper, samen met de vraag om het originele logobestand.
3. Of de site "je" of "jullie" gebruikt richting opdrachtgevers. Ik houd "je" aan, ook
   zakelijk. Past bij de branche en bij het merk.
