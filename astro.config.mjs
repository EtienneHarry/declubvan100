// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
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
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
