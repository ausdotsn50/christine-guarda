import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { categorySlugs } from './data/categories';

// One Markdown file per project; the body is the description.
const works = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/works' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      category: z.enum(categorySlugs),
      /** The short line above the title on a WorkCard, e.g. "Quill Awards · Excellence". */
      kicker: z.string().optional(),
      /** The format on a WorkCard, e.g. "Radio". */
      medium: z.string(),
      roles: z.array(z.string()).min(1),
      course: z.string().optional(),
      /** The format in the Byline, e.g. "Radio magazine". */
      format: z.string().optional(),
      year: z.number().int(),
      award: z
        .object({
          level: z.string().default('Excellence Award'),
          event: z.string(),
          category: z.string().optional(),
        })
        .optional(),
      /** At most three works are featured on the front page. */
      featured: z.boolean().default(false),
      order: z.number().default(0),
      image: z.object({ src: image(), alt: z.string() }).optional(),
      links: z
        .array(z.object({ label: z.string(), href: z.string(), primary: z.boolean().default(false) }))
        .default([])
        .refine((links) => links.filter((l) => l.primary).length <= 1, 'At most one primary link per work.'),
    }),
});

// One Markdown file per essay; the body is the paragraphs.
const essays = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/essays' }),
  schema: z.object({
    title: z.string(),
    /** The Essays page's two groups: longer essays and short ones. */
    group: z.enum(['long', 'short']),
    /** The line above the title, e.g. "Track 1 · AURORA"; the group's name stands in without one. */
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
      /** Left out when unknown; it then drops from the captions and counts. */
      year: z.number().int().optional(),
      order: z.number().default(0),
      /** Empty until the photos are added; the gallery then shows its head and caption only. */
      /** `title` names a piece ("Asparagus"); `caption` adds a line about it, shown in the preview. */
      images: z.array(z.object({ src: image(), alt: z.string(), title: z.string().optional(), caption: z.string().optional() })).default([]),
    }),
});

export const collections = { works, essays, galleries };
