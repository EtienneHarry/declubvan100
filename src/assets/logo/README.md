# De Club van 100 — logoset (SVG)

Vectorversies, nagetrokken uit het aangeleverde pdf-bestand `Logo's De 100`.

## Bestanden

| Bestand | Gebruik |
|---|---|
| `declubvan100-logo-horizontaal.svg` | Hoofdlogo. Schicht plus woordmerk, verhoudingen identiek aan het origineel. Header, footer, briefpapier. |
| `declubvan100-bliksem.svg` | Alleen de schicht. Social avatar, watermerk, groot decoratief element. |
| `declubvan100-woordmerk.svg` | Alleen het woordmerk. Voor plekken waar de schicht al elders staat. |
| `declubvan100-merkteken-vierkant.svg` | Schicht gecentreerd in een vierkant met 12% marge. Favicon, app-icoon, profielfoto. |

## Gebruik

Alle bestanden staan op `fill="currentColor"`. Dat betekent: geen kleur ingebakken, het
logo neemt de tekstkleur van zijn omgeving over.

```html
<span class="text-white"><!-- svg hier --></span>   <!-- wit op zwart -->
<span class="text-black"><!-- svg hier --></span>   <!-- zwart op licht -->
```

Zo heb je één bestand in plaats van een licht- en een donkervariant, en werkt een
dark-mode-omschakeling vanzelf. Elke SVG heeft een `<title>` en `aria-label` voor
schermlezers.

## Herkomst en kwaliteit

Het aangeleverde pdf-bestand bevat geen vectoren. Het zijn vier bitmaps van 667 en
1001 pixels in een pdf-omslag. Deze set is nagetrokken uit de grootste variant
(1001 px) en is daarna schaalbaar zonder kwaliteitsverlies.

Nagetrokken is niet hetzelfde als origineel. De randen volgen de pixels van de bron,
dus op zeer groot formaat, bijvoorbeeld een spandoek of een geborduurd shirt, kunnen
minieme afwijkingen zichtbaar worden. Voor web, drukwerk op A-formaat en textiel is
dit ruim voldoende.

## Lettertype van het woordmerk

**Montserrat, SemiBold en Bold.** Bevestigd door de klant; dit is geen schatting meer.

Voor deze set maakt het niets uit: het woordmerk zit als contour in de SVG en heeft
geen lettertype nodig om te renderen. Het telt wel zodra er tekst bij het merk gezet
moet worden die op het woordmerk moet lijken — drukwerk, een gestapelde variant, een
socialtemplate.

Dit staat los van de letter van de site. Die is Archivo Variable, en dat blijft zo:
zie het typografiehoofdstuk in `design-system.md`. Dat de site een andere letter voert
dan het logo is de normale verhouding tussen merkteken en tekst, geen inconsistentie.

## Openstaande punten

1. **Vraag het origineel op bij de ontwerper.** Een `.ai`, `.eps` of `.svg` is altijd
   beter dan een trace. Deze set overbrugt de tijd tot dat er is, of vervangt het
   permanent als het er niet meer is.
2. **Er is geen gestapelde variant.** Die bestaat niet in het bronmateriaal, dus die
   is hier niet verzonnen. Blijkt hij nodig voor smalle schermen, dan is dat een
   ontwerpbeslissing die je even met de klant afstemt.
