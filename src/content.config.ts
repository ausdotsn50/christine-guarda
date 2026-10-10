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

export const collections = { works };
