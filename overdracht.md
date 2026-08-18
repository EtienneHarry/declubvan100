# Overdracht — de site beheren

> **Voor de redacteur van De Club van 100.** Dit gaat over het beheren van de
> site, niet over het bouwen ervan. Wie eraan werkt, kijkt in
> `docs/stand-van-zaken.md`. Voeg die twee niet samen: ze zijn voor andere
> mensen en veranderen op andere momenten.

Wat je zelf kunt aanpassen, en waar dat zit. Eén A4, bedoeld om naast het scherm
te leggen.

> **Dit document is een aanzet.** Het staat er sinds B4 en bevat alleen wat op
> dat moment vaststond. Vul het aan zodra er meer bij komt — het formulier, de
> GitHub-modus van het CMS, en de vragenlijst die met de nieuwe teksten meekomt.

## Lees dit eerst: zie je "Unsaved" of een lege lijst?

Open je een pagina en staat er **"Unsaved"** bovenaan, of is de lijst met
secties leeg terwijl er inhoud hoort te staan — doe dan dit:

1. **Sla niets op.** Niet op Save drukken.
2. Klik op **Reset**, het pijltje linksboven naast de opslaanknop.
3. De inhoud verschijnt. Nu kun je gewoon verder.

Wat je ziet is een oude, half afgemaakte bewerking die je browser heeft
onthouden — van jou, op deze computer, misschien weken geleden. Die versie legt
zich over wat er werkelijk op de site staat. Reset gooit dat weg en haalt de
echte inhoud terug.

**Druk je in die toestand op Save, dan overschrijf je de pagina met wat je ziet.**
Bij een lege lijst betekent dat: alle secties weg.

Dit is niet iets wat wij hebben ingebouwd en het is niet uit te zetten; het zit
in het CMS zelf. Twijfel je of wat je ziet klopt, klik Reset — je verliest er
nooit iets echts mee, alleen een niet-opgeslagen bewerking.

## Waar je inlogt

Het CMS zit op `/keystatic`. Zolang het in local mode staat, werkt dat alleen op
een computer waar de site lokaal draait. De GitHub-modus, waarmee je vanaf elke
computer kunt inloggen, staat klaar maar is nog niet aangezet.

## Wat waar staat

| Wat je wilt wijzigen | Waar |
|---|---|
| De tekst van een pagina | Pagina's → de pagina die je zoekt |
| De volgorde van secties | Dezelfde pagina, sleep de secties |
| Menu bovenaan | Hele site → Site-instellingen → Menu bovenaan |
| Kolommen onderaan | Hele site → Site-instellingen → Kolommen onderaan |
| Adres, KvK, telefoon | Hele site → Site-instellingen → Contactgegevens |

## Handelingen om op te letten

**Het mailadres wijzigen staat op twee plekken.** Het adres staat in
Site-instellingen bij de contactgegevens, en nog een keer als tekst op de
contactkaart op de pagina Contact. Wijzig je er één, dan lopen ze uit elkaar.
Loop ze allebei na:

1. Hele site → Site-instellingen → Contactgegevens → E-mailadres
2. Pagina's → Contact → de sectie met de kaarten → de kaart "Mail", zowel de
   tekst als het adres waar de kaart heen gaat

Dat is bewust zo gelaten. Het adres uit één bron halen zou van die ene kaart een
uitzondering maken in het systeem, en dat is een slechtere ruil dan twee velden
bijwerken bij een adreswijziging die eens in de zoveel jaar voorkomt.

**Een leeg veld verdwijnt, het laat geen gat achter.** Haal je bijvoorbeeld het
telefoonnummer weg, dan noemt de site nergens meer een nummer — er blijft geen
lege regel of streepje staan.

**Vergeet je iets verplichts, dan gaat het venster niet dicht.** Onder het veld
dat mist verschijnt een melding, en die is Engels. `must not be empty` betekent
dat het veld leeg is, `is required` dat er nog niets gekozen is. Een sterretje
achter het label betekent dat je het veld niet kunt overslaan.

**De foto's van de twee deuren op de home liggen vast.** Die staan niet in het
CMS. De tekst eromheen kun je wel wijzigen.

**"Kop met een donkere laag eronder" werkt maar op één plek.** Dat vinkje staat
bij elke openingssectie, maar je ziet het alleen op de openingssectie die
bovenaan de pagina staat, en alleen op een donkere achtergrond. Zet je het aan
op een openingssectie halverwege de pagina of op een lichte pagina, dan gebeurt
er niets. Dat is geen storing: die kop is dan kleiner en de laag hoort daar niet
bij.

## Wat je niet zelf kunt

- Een zesde pagina aanmaken. De pagina's liggen vast; een nieuwe erbij is werk
  voor de bouwer.
- Kleuren kiezen. Achtergronden zijn een keuzelijst met vijf namen, en die zijn
  doorgerekend op leesbaarheid. "Bruin" is de gewone; "Inkt" is het zwarte vlak
  daarop en "Roet" het iets lichtere bruin. Houd één donkere en één lichte kleur
  per pagina aan.
- De koppen groter of kleiner maken. Dat volgt de plek van de sectie.
