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

## Nog te vragen

- **De eerste helft van deze kop is nu overgenomen zoals de klant hem in de
  mockup zette.** Klopt de interpunctie — een komma en dan verder — of hoort er
  een punt en een nieuwe zin?
- **De echte namen van de typemachine en het handschrift.** De brief zet de
  zekerheid op matig en laag; wij bouwen op Special Elite en Caveat. Heeft de
  maker van de mockup de bestanden, dan winnen die.
