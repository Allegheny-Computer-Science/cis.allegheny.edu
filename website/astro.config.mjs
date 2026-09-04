// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

const base = process.env.ASTRO_BASE ?? '';

// https://astro.build/config
export default defineConfig({
  site: 'https://cis.allegheny.edu',
  base,
  integrations: [react(), mdx(), sitemap()],
});