// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Alles wordt standaard vooraf gerenderd. Een losse route kan on demand
  // draaien door `export const prerender = false;` te zetten.
  output: 'static',
  adapter: vercel(),
  security: {
    csp: true,
  },
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
