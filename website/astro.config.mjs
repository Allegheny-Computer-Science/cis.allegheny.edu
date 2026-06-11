// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://allegheny-computer-science.github.io',
  base: '/cis.allegheny.edu',
  integrations: [react()],
});
