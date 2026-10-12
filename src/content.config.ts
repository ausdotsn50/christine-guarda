import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { categorySlugs, documentationSections } from './data/categories';

// One Markdown file per project, in a folder per category (src/content/works/film-video/hearth.md); the body is the
// description, in Christine's words. Roles, course and year are filled in only where she states them.
const works = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/works',
    // The id is the file's name alone ("hearth"), the anchor its category page links to.
    generateId: ({ entry }) => entry.replace(/\.md$/, '').split('/').pop()!,
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      category: z.enum(categorySlugs),
      /** The short line above the title on a WorkCard, e.g. "Quill Awards - Excellence". */
      kicker: z.string().optional(),
      /** The format on a WorkCard, e.g. "Short film". */
      medium: z.string().optional(),
      /** Christine's roles, as her description states them. */
      roles: z.array(z.string()).default([]),
      course: z.string().optional(),
      /** The format in the Byline, e.g. "Radio magazine". */
      format: z.string().optional(),
      year: z.number().int().optional(),
      award: z
        .object({
          level: z.string().default('Excellence Award'),
          event: z.string(),
          category: z.string().optional(),
        })
        .optional(),
      /** Its place among the front page's Featured works (1-3); left out when it isn't featured. */
      featured: z.number().int().min(1).max(3).optional(),
      /** Its place on its category page. */
      order: z.number().default(0),
      /** Its own picture, where it has no video: shown on its card and on its page. (Without one, its card shows its
       *  category's generic art.) */
      image: z.object({ src: image(), alt: z.string() }).optional(),
      /** The full video (a Google Drive or YouTube link), played in place from its still. */
      video: z.object({ href: z.url(), still: image(), alt: z.string() }).optional(),
      /** The full audio (a Google Drive link), opened on Drive from a pill (Drive's player can't autoplay). */
      audio: z.object({ href: z.url() }).optional(),
      /** The full scripts (Google Drive links), as pills; a label tells several apart ("Season 2, Episode 8"). */
      scripts: z.array(z.object({ href: z.url(), label: z.string().optional() })).default([]),
      /** A set of pictures (pubmats, print ads, slides), in a strip that scrolls sideways; each opens in a Lightbox.
       *  `animation` (an animated WebP) plays in the Lightbox in place of the still `src`, unless motion is reduced. */
      gallery: z
        .array(z.object({ src: image(), alt: z.string(), caption: z.string().optional(), animation: image().optional() }))
        .default([]),
      /** The poster, opened in a Lightbox from a pill. */
      poster: z.object({ src: image(), alt: z.string(), credit: z.string().optional() }).optional(),
      /** Other links (the full magazine, an article, a presentation), as pills that open in a new tab. */
      links: z.array(z.object({ label: z.string(), href: z.string() })).default([]),
    }),
});

// One Markdown file per essay; the body is the paragraphs.
const essays = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/essays' }),
  schema: z.object({
    title: z.string(),
    /** The Essays page's two groups: longer essays and short ones. */
    group: z.enum(['long', 'short']),
    /** The line above the title, e.g. "Track 1 - AURORA"; the group's name stands in without one. */
    kicker: z.string().optional(),
    year: z.number().int().optional(),
    /** "Written for" in the Byline, for an essay written for a class. */
    context: z.string().optional(),
    /** One line from the essay, without quote marks; set after the second paragraph. */
    pullQuote: z.string().optional(),
    columns: z.union([z.literal(1), z.literal(2)]).default(1),
    order: z.number().default(0),
  }),
});

// Digital Art series and Documentation events; the body is an optional caption under the group.
const galleries = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/galleries' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      group: z.enum(['digital-art', 'documentation']),
      /** A Documentation event's heading (its tab and page). */
      section: z.enum(documentationSections.map((s) => s.slug) as [string, ...string[]]).optional(),
      /** Left out when unknown; it then drops from the captions and counts. */
      year: z.number().int().optional(),
      order: z.number().default(0),
      /** Empty until the photos are added; the gallery then shows its head and caption only. */
      /** `title` names a piece ("Asparagus"); `caption` adds a line about it, shown in the preview. */
      images: z.array(z.object({ src: image(), alt: z.string(), title: z.string().optional(), caption: z.string().optional() })).default([]),
    }),
});

export const collections = { works, essays, galleries };
