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

## Openstaande punten

1. **Vraag het origineel op bij de ontwerper.** Een `.ai`, `.eps` of `.svg` is altijd
   beter dan een trace. Deze set overbrugt de tijd tot dat er is, of vervangt het
   permanent als het er niet meer is.
2. **Lettertype van het woordmerk.** Het is een geometrische schreefloze. Dichtste
   match op vorm en verhouding is **Poppins Bold**; Montserrat ExtraBold komt qua
   gewicht in de buurt maar is merkbaar breder. Matig zeker. Zekerheid komt uit de
   bronbestanden of uit één vraag aan de ontwerper. Voor de site maakt het niet uit,
   het woordmerk zit hier als contour in de SVG.
3. **Er is geen gestapelde variant.** Die bestaat niet in het bronmateriaal, dus die
   is hier niet verzonnen. Blijkt hij nodig voor smalle schermen, dan is dat een
   ontwerpbeslissing die je even met de klant afstemt.
