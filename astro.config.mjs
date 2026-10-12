// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // The deployed address: link previews and the canonical URL need it to be absolute.
  site: 'https://christine-guarda.vercel.app',
  // Works has no page of its own; old links to it land on its first section.
  redirects: { '/works': '/works/academic' },
});
