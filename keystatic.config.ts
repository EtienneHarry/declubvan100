import { config } from '@keystatic/core';

/*
 * Keystatic — het CMS achter de vijf pagina's.
 *
 * Lichte variant: vijf pagina's, één redacteur, een paar wijzigingen per jaar.
 * De inhoud is markdown en yaml in deze repo, geen database en geen dienst van
 * derden.
 *
 * OPSLAG. Nu local mode: de admin schrijft rechtstreeks naar de bestanden op
 * schijf. De GitHub-modus gaat later aan en staat hieronder al klaar — hij
 * hangt aan een omgevingsvariabele en niet aan DEV of PROD, zodat omzetten een
 * bewuste handeling is en niet een bijwerking van waar de build toevallig
 * draait.
 *
 * Let op de PUBLIC_-prefix. Dit bestand wordt niet alleen op de server gelezen
 * maar ook naar de browser gebundeld — de admin-UI draait erop. `process`
 * bestaat daar niet, dus dit moet via import.meta.env, en alleen variabelen met
 * PUBLIC_ ervoor halen de client. Zonder die prefix valt de admin om met
 * "process is not defined" en zie je een witte pagina.
 *
 * Voor GitHub-modus zijn straks nodig: een GitHub App, KEYSTATIC_GITHUB_CLIENT_ID,
 * KEYSTATIC_GITHUB_CLIENT_SECRET en KEYSTATIC_SECRET als omgevingsvariabelen op
 * de server, plus PUBLIC_KEYSTATIC_OPSLAG=github. Zolang die laatste er niet
 * staat, verandert er niets.
 */

const opslag =
  import.meta.env['PUBLIC_KEYSTATIC_OPSLAG'] === 'github'
    ? ({ kind: 'github', repo: 'EtienneHarry/declubvan100' } as const)
    : ({ kind: 'local' } as const);

export default config({
  storage: opslag,
  ui: {
    brand: { name: 'De Club van 100' },
  },
  collections: {},
  singletons: {},
});
