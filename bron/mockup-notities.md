---
project: De Club van 100
document: Notities bij de mockup
bron: mockup Website - De Club van 100.pdf (5 pagina's), aangeleverd augustus 2026
status: waarnemingen aan de mockup die niet in restyle-brief-v2.md staan
---

# Notities bij de mockup

De restyle-brief vertaalt de mockup naar tokens en beslissingen. Dit document is
er voor wat er tijdens het bouwen alsnog in de mockup werd gezien en wat de
brief niet noemt. Het is een aanvulling en geen vervanging; waar de brief iets
zegt, wint de brief.

## De mockup zet twee letterrollen in één kop

**Waargenomen op de pagina "VOOR WIE IS DE CLUB?".** De kop daar loopt door van
de ene letter in de andere, midden in de zin, op de komma:

> Voor mensen die graag werken, *maar niet willen dat hun **hele agenda** wordt
> bepaald door hun bijbaan.*

- **"Voor mensen die graag werken,"** staat in de dragende letter (bij ons
  Montserrat), in gewone schrijfwijze.
- **"maar niet willen dat hun hele agenda wordt bepaald door hun bijbaan."**
  staat in de typemachine, in hoofdletters.
- **"hele agenda"** heeft daarbinnen de handgetrokken ovaal om zich heen.

De brief noemde alleen die tweede helft, met een beletselteken ervoor
("…maar niet willen dat…"), en gaf de eerste helft niet. Daardoor stond deze kop
tot nu toe halfaf op de site. De hele zin staat er nu.

### Wat daaruit volgt voor het systeem

De typografieregels in `design-system.md` gaven de typemachine drie plekken:
labels, knoppen, en maximaal één uitgelichte regel per sectie. Deze kop is dat
derde geval — maar hij laat zien dat zo'n uitgelichte regel niet naast de kop
hoeft te staan: hij kan er een deel ván zijn.

Twee dingen die daar wél aan vastzitten en die niet uit de mockup zijn af te
lezen:

1. **Eén uitgelicht stuk per kop, en dus per sectie.** Twee stukken typemachine
   in dezelfde kop maken van de wissel een patroon, en dan is er geen wissel
   meer. Dit wordt afgedwongen door `Koptekst`: een tweede sterretjespaar blijft
   staan zoals het getypt is.
2. **De ovaal zit binnen het typemachinestuk en niet andersom.** Zo staat het in
   de mockup, en het is ook de enige volgorde die betekenis heeft: de ovaal wijst
   een woordgroep aan, en die woordgroep staat toevallig in de andere letter.
   Een typemachinestuk binnen een ovaal kent de mockup niet.

De maat is niet gemeten. In de mockup lijkt het typemachinedeel optisch kleiner
dan de dragende letter ernaast, maar het is uit een pdf niet betrouwbaar af te
lezen of dat een kleinere puntgrootte is of het verschil in x-hoogte tussen de
twee families. Bij ons erft het de maat van de kop; zie de meting in
`design-system.md`.

### Bewuste afwijking: het typemachinedeel is korter dan in de mockup

**Wat de mockup toont.** De wissel valt op de komma: alles ná "Voor mensen die
graag werken," staat in de typemachine, dus "maar niet willen dat hun hele
agenda wordt bepaald door hun bijbaan." — 68 tekens hoofdletters.

**Wat er op de site staat.** De wissel valt later. Alleen de slotwoorden staan in
de typemachine: "hele agenda wordt bepaald door hun bijbaan." — 43 tekens. De
rest van de zin, inclusief "maar niet willen dat hun", blijft in de dragende
letter. De ovaal om "hele agenda" blijft waar hij was, binnen het
typemachinedeel.

**Waarom.** De typografieregel in `design-system.md` zegt over deze familie:
nooit voor lopende tekst langer dan twee regels. Special Elite is monospaced en
licht versleten; op regellengte leest hij traag, en in hoofdletters met 0,14em
spatiëring wordt elke regel bovendien breed.

De mockup is daar niet mee in tegenspraak — hij laat de zin gewoon niet op alle
breedtes zien. **In de mockup staat deze kop alleen op desktopbreedte, en daar
is het typemachinedeel vier regels.** Dat is al boven de twee, maar het valt niet
op omdat de regels lang zijn en de kop de breedte heeft.

Nagemeten in de gebouwde site, met de wissel zoals de mockup hem zet:

| Breedte | Regels typemachine | Kophoogte |
|---|---|---|
| 1440 | 5 | 516px, 57% van het venster |
| 375 | 8 | 428px, 53% van het venster |

Acht regels hoofdletters in monospace op een telefoon is geen kop meer maar een
alinea. Daarom wint de regel hier van de mockup: het merk heeft meer aan een
typografieregel die overal geldt dan aan één kop die op één breedte klopt.

Met de kortere wissel:

| Breedte | Regels typemachine | Kophoogte |
|---|---|---|
| 1440 | 3 | 416px, 46% van het venster |
| 375 | 5 | 410px, 50% van het venster |

**Het staat daarmee nog steeds boven de twee regels.** Drie op desktop, vijf op
een telefoon. Niet geschaald en niet verder ingekort — dat zou de zin veranderen
of een maat verzinnen die de mockup niet geeft. Wie dit helemaal binnen de regel
wil brengen, heeft twee wegen: het typemachinedeel een puntgrootte kleiner (en
dan is de vraag welke, en die staat nergens), of de zin korter (en dan is het een
tekstwijziging en dus een vraag aan de klant).

## Nog te vragen

- **Het typemachinedeel staat op drie regels op desktop en vijf op een
  telefoon**, terwijl de regel er twee toestaat. Wil de klant een kleinere maat
  voor de typemachine binnen een kop, of een kortere zin? Zie de afwijking
  hierboven.
- **De eerste helft van deze kop is overgenomen zoals de klant hem in de mockup
  zette.** Klopt de interpunctie — een komma en dan verder — of hoort er een punt
  en een nieuwe zin?
- **De echte namen van de typemachine en het handschrift.** De brief zet de
  zekerheid op matig en laag; wij bouwen op Special Elite en Caveat. Heeft de
  maker van de mockup de bestanden, dan winnen die.
