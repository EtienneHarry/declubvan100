// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import keystatic from '@keystatic/astro';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Nodig voor absolute URL's: canonical, og:url en og:image. Dit is het
  // productiedomein; een preview-deploy zet hier dus ook naar.
  site: 'https://declubvan.nl',
  // Alles wordt standaard vooraf gerenderd. Een losse route kan on demand
  // draaien door `export const prerender = false;` te zetten.
  output: 'static',
  adapter: vercel(),
  // security.csp staat bewust uit. Astro's CSP is manifest-breed: één beleid
  // voor elke route, inclusief de Keystatic-admin, en die heeft inline stijl
  // nodig. Het beleid staat daarom per pad in vercel.json. Zie CLAUDE.md.
  //
  // Wat we hier opgeven zijn de sha256-hashes per inline script. Die kosten
  // niets: de vijf pagina's hebben nul inline scripts en nul inline stijl,
  // dus 'self' dekt alles. scripts/check-csp.mjs bewaakt dat het zo blijft.
  markdown: {
    // Shiki bakt inline stijlen in. Die zouden nu op de header-CSP stuklopen
    // in plaats van op de meta, dus dit blijft uit.
    syntaxHighlight: false,
  },
  // Keystatic injecteert zelf twee routes: /keystatic voor de admin en
  // /api/keystatic voor het lezen en schrijven. Allebei met prerender false,
  // dus die draaien op verzoek. De vijf pagina's blijven vooraf gerenderd.
  integrations: [react(), keystatic()],
  vite: {
    plugins: [tailwindcss()],
    build: {
      // Niets inline zetten. Astro bakt een gebundeld script standaard in de
      // HTML zodra het onder deze grens blijft — het navigatiescript is 891
      // bytes en verdween er zo in. Onder `script-src 'self'` wordt zo'n inline
      // script geblokkeerd, en de fout zie je alleen op de deploy.
      //
      // Dit geldt ook voor kleine stylesheets en voor assets als data-URI, en
      // dat is precies de bedoeling: alles komt uit een bestand, dus 'self'
      // dekt alles. scripts/check-csp.mjs bewaakt het.
      assetsInlineLimit: 0,
    },
  },
});
