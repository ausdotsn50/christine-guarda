# Christine Guarda — Portfolio

The portfolio of Christine Guarda, AB Communication student at UST–Legazpi: writing, film, radio, editorial, stage and design work, set as a newspaper front page.

Live at https://christine-guarda.vercel.app. Built with [Astro](https://astro.build) as a static site.

## Structure

```text
public/                  favicon, touch icon, resume PDF
src/
  assets/                portraits, logos, category drawings, works media (by section and work)
  components/            design-system components (Masthead, WorkCard, Article…)
    site/                site compositions (Lightbox, Band, WorkEntry, PlateShelf…)
  content/               works, essays, galleries (Markdown)
  data/                  profile, categories and sections, site navigation
  layouts/Base.astro     page shell: menu, masthead, main, footer
  lib/                   collection helpers, icons, video embeds
  pages/                 routes
  styles/                tokens, design-system bundle, overrides, site styles
```

Content rules, routes and conventions are in [AGENTS.md](AGENTS.md).

## Commands

| Command           | Action                                      |
| :---------------- | :------------------------------------------ |
| `npm install`     | Install dependencies                        |
| `npm run dev`     | Start the dev server at `localhost:4321`    |
| `npm run build`   | Build the site to `./dist/`                 |
| `npm run preview` | Preview the build locally                   |
| `npm run check`   | Type-check the project                      |
