import { config, fields, singleton } from '@keystatic/core';

import {
  ACHTERGROND_TOKENS,
  BREEDTE_TOKENS,
  RUIMTE_TOKENS,
  type AchtergrondToken,
  type BreedteToken,
  type RuimteToken,
} from './src/lib/tokens';

/*
 * Keystatic — het CMS achter de vijf pagina's.
 *
 * Lichte variant: vijf pagina's, één redacteur, een paar wijzigingen per jaar.
 * De inhoud is yaml en markdown in deze repo, geen database en geen dienst van
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

/* ---------------------------------------------------------------------------
   Tokens als keuzelijst

   De namen komen uit src/lib/tokens.ts en worden nergens hier herhaald. Een
   token toevoegen gebeurt daar: naam in de array, klasse erbij, en dan staat
   hij vanzelf in deze lijst.

   De omschrijving erachter is voor de redacteur. Staat een token er niet bij,
   dan valt hij terug op zijn eigen naam — een nieuw token verschijnt dus ook
   zonder dat iemand hier iets bijwerkt.
   --------------------------------------------------------------------------- */

const ACHTERGROND_UITLEG: Partial<Record<AchtergrondToken, string>> = {
  inkt: 'Inkt — zwart, de standaard',
  roet: 'Roet — iets lichter zwart',
  papier: 'Papier — licht, voor een leespagina',
  mist: 'Mist — rustig grijs op papier',
};

const RUIMTE_UITLEG: Partial<Record<RuimteToken, string>> = {
  'sectie-s': 'Krap',
  'sectie-m': 'Normaal',
  'sectie-l': 'Ruim',
};

const BREEDTE_UITLEG: Partial<Record<BreedteToken, string>> = {
  smal: 'Smal — leest het prettigst bij lange tekst',
  basis: 'Normaal',
  breed: 'Breed — voor rasters en beeld',
};

function keuzeUit<T extends string>(
  namen: readonly T[],
  uitleg: Partial<Record<T, string>>,
): { label: string; value: T }[] {
  return namen.map((naam) => ({ label: uitleg[naam] ?? naam, value: naam }));
}

/**
 * Achtergrond, ruimte en breedte. Elke sectie heeft ze alle drie, dus ze staan
 * hier één keer en worden overal ingevoegd.
 *
 * Bewust een keuzelijst en geen kleurenkiezer of vrij veld: de waardes achter
 * deze namen staan in de tokenlaag en zijn doorgerekend op contrast. Een vrije
 * kleur zou daar buitenom gaan.
 */
const weergave = {
  achtergrond: fields.select({
    label: 'Achtergrond',
    description:
      'De kleur van het vlak waarop deze sectie staat. Houd één donkere en één lichte kleur per pagina aan.',
    options: keuzeUit(ACHTERGROND_TOKENS, ACHTERGROND_UITLEG),
    defaultValue: 'inkt' satisfies AchtergrondToken,
  }),
  ruimte: fields.select({
    label: 'Ruimte boven en onder',
    description: 'Hoeveel lucht deze sectie krijgt ten opzichte van de secties eromheen.',
    options: keuzeUit(RUIMTE_TOKENS, RUIMTE_UITLEG),
    defaultValue: 'sectie-m' satisfies RuimteToken,
  }),
  breedte: fields.select({
    label: 'Breedte van de inhoud',
    description: 'Hoe ver de inhoud mag uitlopen binnen de sectie.',
    options: keuzeUit(BREEDTE_TOKENS, BREEDTE_UITLEG),
    defaultValue: 'basis' satisfies BreedteToken,
  }),
};

/* ---------------------------------------------------------------------------
   Kleine bouwstenen
   --------------------------------------------------------------------------- */

function bovenkopVeld() {
  return fields.text({
    label: 'Bovenkop — mag je overslaan',
    description: 'Het labeltje in hoofdletters boven de kop. Houd het bij een paar woorden.',
  });
}

function tekstVeld(beschrijving: string) {
  return fields.text({
    label: 'Tekst — mag je overslaan',
    description: beschrijving,
    multiline: true,
  });
}

function knopVeld(label: string, beschrijving: string) {
  return fields.object(
    {
      label: fields.text({
        label: 'Wat er op de knop staat',
        description: 'Schrijf het als iets wat de bezoeker zelf zou zeggen, zoals "Ik zoek personeel".',
      }),
      href: fields.text({
        label: 'Waar de knop heen gaat',
        description: 'Een pad op deze site, zoals /contact, of een volledig adres.',
      }),
    },
    { label, description: beschrijving },
  );
}

/*
 * Beeld dat de redacteur zelf kiest.
 *
 * De foto's staan in public/beeld en worden als gewoon bestand geserveerd, niet
 * door Astro geoptimaliseerd. Dat is de prijs voor een kiesbare foto: Astro's
 * beeldpijplijn werkt op imports die tijdens het bouwen bekend moeten zijn, en
 * een pad uit een yaml-bestand is dat niet.
 *
 * De alt-tekst is verplicht. Zonder validatie is dat een belofte; met
 * validatie een regel.
 */
function beeldVeld() {
  return fields.object(
    {
      bron: fields.image({
        label: 'Foto',
        description: 'Kies een foto uit de map, of sleep er een nieuwe naartoe.',
        directory: 'public/beeld',
        publicPath: '/beeld/',
        validation: { isRequired: true },
      }),
      alt: fields.text({
        label: 'Wat staat er op de foto',
        description:
          'Eén zin voor wie de foto niet ziet. Beschrijf wat er gebeurt, niet dat het een foto is.',
        validation: { length: { min: 1 } },
      }),
    },
    {
      label: 'Beeld — mag je overslaan',
      description: 'Laat je dit leeg, dan loopt de tekst over de volle breedte door.',
    },
  );
}

/* ---------------------------------------------------------------------------
   De secties

   Elk type dat in src/lib/SectionRenderer.tsx staat, krijgt hier precies één
   blok met dezelfde naam. Zit een type daar niet in, dan zit het hier niet:
   het CMS kan niets aanbieden wat de site niet kan renderen.
   --------------------------------------------------------------------------- */

const sectieBlokken = fields.blocks(
  {
    hero: {
      label: 'Openingssectie',
      itemLabel: (props) => `Opening — ${props.fields.kop.value || 'zonder kop'}`,
      schema: fields.object(
        {
          ...weergave,
          bovenkop: bovenkopVeld(),
          kop: fields.text({
            label: 'Kop',
            description:
              'De grootste kop van de pagina. Er hoort er één per pagina te zijn, dus gebruik deze sectie ook één keer.',
            validation: { length: { min: 1 } },
          }),
          tekst: tekstVeld('Een korte zin onder de kop. Zeg het in de helft van de woorden.'),
          knop: knopVeld('Knop — mag je overslaan', 'De belangrijkste actie op deze pagina.'),
          tweedeKnop: knopVeld(
            'Tweede knop — mag je overslaan',
            'Een tweede actie, minder opvallend dan de eerste.',
          ),
          schicht: fields.checkbox({
            label: 'Bliksemschicht op de achtergrond',
            description:
              'De grote schicht achter de tekst. Zet hem op één sectie per pagina, niet op meer.',
            defaultValue: false,
          }),
        },
        { label: 'Openingssectie' },
      ),
    },

    splitscreen: {
      label: 'Twee deuren',
      itemLabel: (props) => `Twee deuren — ${props.fields.deuren.elements.length} stuks`,
      schema: fields.object(
        {
          ...weergave,
          deuren: fields.array(
            fields.object({
              bovenkop: bovenkopVeld(),
              kop: fields.text({
                label: 'Kop',
                validation: { length: { min: 1 } },
              }),
              tekst: tekstVeld('Eén of twee zinnen die uitleggen waar deze deur heen gaat.'),
              knop: knopVeld('Knop — mag je overslaan', 'Waar deze deur op uitkomt.'),
            }),
            {
              label: 'Deuren',
              description:
                'Twee is de bedoeling: een deur voor opdrachtgevers en een voor professionals. De foto ligt in de code vast.',
              itemLabel: (props) => props.fields.kop.value || 'Deur zonder kop',
            },
          ),
        },
        { label: 'Twee deuren' },
      ),
    },

    'kop-tekst': {
      label: 'Kop met tekst',
      itemLabel: (props) => `Kop met tekst — ${props.fields.kop.value || 'zonder kop'}`,
      schema: fields.object(
        {
          ...weergave,
          bovenkop: bovenkopVeld(),
          kop: fields.text({ label: 'Kop', validation: { length: { min: 1 } } }),
          tekst: tekstVeld('De lopende tekst onder de kop.'),
        },
        { label: 'Kop met tekst' },
      ),
    },

    'beeld-tekst': {
      label: 'Beeld naast tekst',
      itemLabel: (props) => `Beeld naast tekst — ${props.fields.kop.value || 'zonder kop'}`,
      schema: fields.object(
        {
          ...weergave,
          bovenkop: bovenkopVeld(),
          kop: fields.text({ label: 'Kop', validation: { length: { min: 1 } } }),
          tekst: tekstVeld('De tekst die naast het beeld komt te staan.'),
          beeld: beeldVeld(),
          beeldPositie: fields.select({
            label: 'Waar het beeld staat',
            description: 'Op een telefoon staat het beeld altijd boven de tekst.',
            options: [
              { label: 'Links van de tekst', value: 'links' },
              { label: 'Rechts van de tekst', value: 'rechts' },
            ],
            defaultValue: 'links',
          }),
        },
        { label: 'Beeld naast tekst' },
      ),
    },

    'drie-kolommen': {
      label: 'Kaarten naast elkaar',
      itemLabel: (props) => `Kaarten — ${props.fields.items.elements.length} stuks`,
      schema: fields.object(
        {
          ...weergave,
          bovenkop: bovenkopVeld(),
          kop: fields.text({
            label: 'Kop — mag je overslaan',
            description: 'De kop boven de kaarten.',
          }),
          items: fields.array(
            fields.object({
              nummer: fields.text({
                label: 'Nummer — mag je overslaan',
                description: 'Een volgnummer boven de kop, bijvoorbeeld 01.',
              }),
              kop: fields.text({ label: 'Kop', validation: { length: { min: 1 } } }),
              tekst: tekstVeld('De tekst op de kaart.'),
              href: fields.text({
                label: 'Waar de kaart heen gaat — mag je overslaan',
                description: 'Vul je dit in, dan wordt de hele kaart klikbaar.',
              }),
            }),
            {
              label: 'Kaarten',
              description: 'Drie is het uitgangspunt, maar het raster groeit mee met wat je erin zet.',
              itemLabel: (props) => props.fields.kop.value || 'Kaart zonder kop',
            },
          ),
        },
        { label: 'Kaarten naast elkaar' },
      ),
    },

    citaten: {
      label: 'Citaten',
      itemLabel: (props) => `Citaten — ${props.fields.items.elements.length} stuks`,
      schema: fields.object(
        {
          ...weergave,
          bovenkop: bovenkopVeld(),
          items: fields.array(
            fields.object({
              citaat: fields.text({
                label: 'Het citaat',
                description: 'Neem het over zoals het gezegd is. Niet mooier maken.',
                multiline: true,
                validation: { length: { min: 1 } },
              }),
              naam: fields.text({
                label: 'Van wie — mag je overslaan',
                description: 'De naam van het bedrijf. Geen persoonsnamen.',
              }),
              rol: fields.text({
                label: 'Wat ze doen — mag je overslaan',
                description: 'Bijvoorbeeld: festivalorganisatie.',
              }),
            }),
            {
              label: 'Citaten',
              itemLabel: (props) => props.fields.naam.value || 'Citaat zonder naam',
            },
          ),
        },
        { label: 'Citaten' },
      ),
    },

    oproep: {
      label: 'Oproep',
      itemLabel: (props) => `Oproep — ${props.fields.kop.value || 'zonder kop'}`,
      schema: fields.object(
        {
          ...weergave,
          bovenkop: bovenkopVeld(),
          kop: fields.text({ label: 'Kop', validation: { length: { min: 1 } } }),
          tekst: tekstVeld('Eén zin die zegt wat je van de bezoeker wilt.'),
          knop: knopVeld('Knop — mag je overslaan', 'De actie waar het om gaat.'),
          tweedeKnop: knopVeld(
            'Tweede knop — mag je overslaan',
            'Een tweede actie, minder opvallend dan de eerste.',
          ),
        },
        { label: 'Oproep' },
      ),
    },

    'rijke-tekst': {
      label: 'Lopende tekst',
      itemLabel: (props) => `Lopende tekst — ${props.fields.kop.value || 'zonder kop'}`,
      schema: fields.object(
        {
          ...weergave,
          kop: fields.text({
            label: 'Kop — mag je overslaan',
            description:
              'Laat je dit leeg, dan worden de koppen in de tekst zelf het bovenste niveau.',
          }),
          /*
           * Alles staat hier expliciet, ook wat uit staat. Keystatic vult
           * ontbrekende opties zelf in, en dan sluipt er stilletjes een
           * doorhaling of een tabel in de werkbalk.
           *
           * Geen H1: die hoort bij de openingssectie en er is er één per
           * pagina. Geen kleuren — die bestaan hier niet als optie, en het merk
           * heeft geen accentkleur om uit te kiezen.
           */
          inhoud: fields.markdoc.inline({
            label: 'Tekst',
            description:
              'Koppen, vet, cursief, links en lijsten. Meer is er niet, en meer is er ook niet nodig.',
            options: {
              heading: [2, 3],
              bold: true,
              italic: true,
              link: true,
              orderedList: true,
              unorderedList: true,
              strikethrough: false,
              code: false,
              codeBlock: false,
              blockquote: false,
              table: false,
              image: false,
              divider: false,
            },
          }),
          schichtLijst: fields.checkbox({
            label: 'Bliksemschicht als opsommingsteken',
            description:
              'Alleen voor lijsten die over de honderd of over de selectie gaan. Een lijst met artikelen krijgt hem niet.',
            defaultValue: false,
          }),
        },
        { label: 'Lopende tekst' },
      ),
    },
  },
  {
    label: 'Secties',
    description:
      'De pagina van boven naar beneden. Sleep om de volgorde te veranderen; wat hier bovenaan staat, staat op de pagina bovenaan.',
  },
);

/* ---------------------------------------------------------------------------
   De vijf pagina's

   Eén singleton per pagina, want er is er precies één van elk. Geen collectie:
   de redacteur hoort geen zesde pagina te kunnen aanmaken die nergens in de
   navigatie staat.
   --------------------------------------------------------------------------- */

function pagina(label: string, map: string) {
  return singleton({
    label,
    path: `src/content/paginas/${map}`,
    format: { data: 'yaml' },
    schema: {
      titel: fields.text({
        label: 'Titel van de pagina',
        description: 'Wat er in het tabblad van de browser staat en wat zoekmachines tonen.',
        validation: { length: { min: 1 } },
      }),
      beschrijving: fields.text({
        label: 'Omschrijving voor zoekmachines',
        description: 'Eén of twee zinnen. Dit staat onder de titel in Google.',
        multiline: true,
        validation: { length: { min: 1 } },
      }),
      secties: sectieBlokken,
    },
  });
}

export default config({
  storage: opslag,
  ui: {
    brand: { name: 'De Club van 100' },
    navigation: {
      "Pagina's": ['home', 'opdrachtgevers', 'de100', 'contact', 'voorwaarden'],
    },
  },
  collections: {},
  singletons: {
    home: pagina('Home', 'home'),
    opdrachtgevers: pagina('Opdrachtgevers', 'opdrachtgevers'),
    de100: pagina('De 100', 'de-100'),
    contact: pagina('Contact', 'contact'),
    voorwaarden: pagina('Voorwaarden', 'voorwaarden'),
  },
});
