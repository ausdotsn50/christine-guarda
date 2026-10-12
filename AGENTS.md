# Christine Guarda Portfolio — Astro site

A static Astro site for the portfolio of Christine Guarda (AB Communication, UST–Legazpi), styled as a newspaper front page, after her Canva portfolio and the "Christine Guarda Portfolio" design system made from it in Claude Design.

## Source of truth

- Tokens: `src/styles/tokens.css`. Never hard-code a colour, space, radius or stroke width; use the CSS custom properties (`var(--press-blue)`, `var(--space-6)`, `var(--stroke-heavy)`…).
- Component styles: `src/styles/components.css` is the design system's bundle, unchanged: keep every `cg-*` class name and don't edit it. Site-wide overrides go in `src/styles/canva.css` (to match the Canva pages) and `src/styles/site.css` (layout and site additions).
- Design-system components: `src/components/<Name>.astro` (Masthead, ContactFooter, SectionHead, WorkCard, Article, PullQuote, Byline, ResumeSection, ResumeEntry, AwardStamp, CategoryBox, SectionIndex, ArrowLink, ArchFrame, Button, ProjectEntry). `/styleguide` renders each one; check it after changing one.
- Site components (compositions of those): `src/components/site/`.

## Stack

- Astro, static output. No UI framework. Client JavaScript only where a feature needs it: the Lightbox's previous / next, the picture strips' chevrons, and loading a video player in place.
- Fonts self-hosted with Fontsource: Playfair Display (variable, roman and italic), Old Standard TT (400, 400 italic, 700) and Rochester (the script on About and Contact).
- Layout: `src/layouts/Base.astro` = SiteMenu (under 900px) or Masthead (with the Works drop-down) + `<main>` + ContactFooter, with `<title>` ("Page | Christine Guarda"), meta description and Open Graph tags per page.
- Images through `astro:assets` from `src/assets/`, at most 2400px on the long side (JPEG quality 90; PNG only where transparency is needed). Videos are embedded from Google Drive or YouTube (`src/lib/media.ts`); audio, scripts, magazines and presentations stay as links. The resume is `public/christine-guarda-resume.pdf`.

## Content

Content collections in `src/content/`, typed in `src/content.config.ts`:

- `works/<category>/<slug>.md`: one per Academic work. `category` is film-video, radio-broadcast, editorial-publishing, scripts-stage, campaigns-advertising-pr or visual-brand-design. Optional: `kicker`, `medium`, `roles`, `course`, `format`, `year` (only what Christine's text states), `award`, `featured` (1–3, its place on the front page), `order`, `video`, `audio`, `scripts`, `poster`, `gallery`, `image`, `links`. The body is her description, word for word.
- `essays`: `title`, `group` (long or short), `kicker`, `pullQuote`, `order`; optional `year`, `context`. The body is the essay.
- `galleries`: Digital Art series (`group: digital-art`) and Documentation events (`group: documentation`, with `section`), each with `images` (`src`, `alt`, optional `title`, `caption`).

Section lists, counts, card images (a work's video still, its own picture or its category's drawing) and tab strips are computed from the collections and `src/data/`, never hand-written.

## Routes

`/` front page · `/about` · `/works/academic` and `/works/academic/[category]` · `/works/personal`, `/works/personal/digital-art`, `/works/personal/essays` · `/works/documentation` and `/works/documentation/[section]` · `/contact`. `/works` redirects to `/works/academic`; `/styleguide` stays in the build but out of the nav and the sitemap.

## Rules that are easy to break

- `press-blue` is only for text 24px and up; smaller blue text (labels, kickers, links, active nav) is `press-blue-deep`.
- At most one solid Button per view.
- Body copy ragged right and no wider than `var(--measure)`. Deliberate exceptions: the About statement is justified, and band notes and work descriptions run the column's width.
- Square corners everywhere except Button pills and the ArchFrame.
- No emoji, no icon fonts (icons are Ionicons, inlined as SVG by `src/lib/icons.ts`); social links in the page body are text.
- One `h1` per page; `aria-current` on the active nav item and tab; `alt` on every image; the `focus-ring` on every interactive element; motion off under `prefers-reduced-motion`.

## Workflow

1. Plan before writing code, and show the plan.
2. Run `npm run build` (and `npx astro check`) after each change and fix every error before moving on; check layouts at 375px, 768px and 1280px.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`. Restart it after changing `src/content.config.ts`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
