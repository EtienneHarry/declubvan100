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
  security: {
    csp: true,
  },
  markdown: {
    // Shiki bakt inline stijlen in en botst daarmee op de CSP-meta die
    // security.csp uitzet. Uit, zodat die waarschuwing bij elke build verdwijnt.
    syntaxHighlight: false,
  },
  // Keystatic injecteert zelf twee routes: /keystatic voor de admin en
  // /api/keystatic voor het lezen en schrijven. Allebei met prerender false,
  // dus die draaien op verzoek. De vijf pagina's blijven vooraf gerenderd.
  integrations: [react(), keystatic()],
  vite: {
    plugins: [tailwindcss()],
  },
});
