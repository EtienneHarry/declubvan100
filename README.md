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

### Bij elke nieuwe afhankelijkheid: verse installatie

Zodra je iets toevoegt met `npm install <pakket>`, controleer je de boom
opnieuw vanaf nul:

```bash
rm -rf node_modules package-lock.json && npm install && npm ls <pakket>
```

**Een bestaande lockfile verbergt dubbele majors.** Hij houdt vast wat er ooit
is opgelost, dus alles blijft werken tot iemand anders — of de CI — voor het
eerst zonder lockfile installeert. Dan pas komen er twee versies van hetzelfde
pakket naast elkaar te staan, en dat kost een half uur zoeken omdat het
nergens op een versieprobleem lijkt.

In dit project gebeurde dat drie keer: bij markdoc, bij vite en bij Keystatic.
Zie *Twee kopieën van hetzelfde pakket* in `CLAUDE.md` voor de symptomen en de
oplossing.

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
| `npm run check` | oxlint → check-tokens → `astro check` → build → check-csp → check-nesting. Dit draait ook in CI |

Het Content-Security-Policy staat per pad in `vercel.json` en niet in
`astro.config.mjs`. Die headers komen van Vercel, dus je ziet ze lokaal nooit —
niet in `dev` en niet in `preview`. `check-csp` is daar de vervanging voor. Zie
`CLAUDE.md` voor waarom het beleid daar staat.

`npm run check` is de poort: hij moet groen zijn voor je commit. GitHub Actions
draait hem bij elke push en pull request.

## Regels

Kleuren en maten komen uit een token, nooit rauw in de code —
`scripts/check-tokens.mjs` laat de build erop vallen. `src/styles/tokens.css` is
de enige uitzondering. Zie `CLAUDE.md` voor de rest van de werkafspraken.
