# kickwork-starter

Sjabloon voor klantsites op Astro 6, React 19 en Tailwind 4. Alle tokenwaardes
zijn neutrale plaatshouders; er zit geen huisstijl in.

Node 22.12 of nieuwer is vereist (Astro 6). `.nvmrc` staat op 24.

## Nieuw klantproject starten

```bash
git clone <deze-repo> klant-naam && cd klant-naam && rm -rf .git && git init && npm install
```

Vul daarna `design-system.md` in — dat document is de bron, `tokens.css` de
uitwerking ervan. Werk pas daarna de tokens bij, en bouw dan de pagina's.

## Wat je per klant vervangt

| Bestand | Wat je verandert |
|---|---|
| `design-system.md` | Invullen: kleur, typografie, ruimte, grid, radius, diepte, componenten, motion, beeld, voice |
| `src/styles/tokens.css` | De waardes. **Niet de tokennamen** — die zijn de afspraak met de rest van de code |
| `src/pages/index.astro` | De eigenlijke site |
| `package.json` | De `name` |

## Commando's

| Commando | Doet |
|---|---|
| `npm run dev` | Dev-server |
| `npm run build` | Productiebuild naar `dist/` en `.vercel/output/` |
| `npm run preview` | Build lokaal bekijken |
| `npm run lint` | oxlint |
| `npm run check` | oxlint → check-tokens → `astro check` → build. Dit draait ook in CI |

`security.csp` staat aan: de build zet een Content-Security-Policy-meta uit met
een hash per script. Dat werkt in `build` en `preview`, niet in `dev`.

`npm run check` is de poort: hij moet groen zijn voor je commit. GitHub Actions
draait hem bij elke push en pull request.

## Regels

Kleuren en maten komen uit een token, nooit rauw in de code —
`scripts/check-tokens.mjs` laat de build erop vallen. `src/styles/tokens.css` is
de enige uitzondering. Zie `CLAUDE.md` voor de rest van de werkafspraken.
