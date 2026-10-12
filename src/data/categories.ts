// The six Academic & University categories, in Works index order. The single source for the
// works `category` enum, the Works index, the SectionIndex and the Return / Next reading order.
export const categories = [
  { slug: 'film-video', label: 'Film & Video' },
  { slug: 'radio-broadcast', label: 'Radio & Broadcast' },
  { slug: 'editorial-publishing', label: 'Editorial & Publishing' },
  { slug: 'scripts-stage', label: 'Scripts & Stage' },
  { slug: 'campaigns-advertising-pr', label: 'Campaigns, Advertising & PR' },
  { slug: 'visual-brand-design', label: 'Visual & Brand Design' },
] as const;

export type CategorySlug = (typeof categories)[number]['slug'];

export const categorySlugs = categories.map((c) => c.slug) as [CategorySlug, ...CategorySlug[]];

export function categoryLabel(slug: CategorySlug): string {
  return categories.find((c) => c.slug === slug)!.label;
}

/** The three groups of the Works index, each a lettered section with its own front page; deks from the Canva Works page. */
export const workGroups = {
  academic: {
    letter: 'A',
    title: 'Academic & University Works',
    href: '/works/academic',
    dek: 'Writing, production, and design work from my BA Communication coursework and university involvements.',
  },
  personal: {
    letter: 'B',
    title: 'Personal Works',
    href: '/works/personal',
    dek: 'Creative projects, personal experiments, and ideas developed beyond academic requirements.',
  },
  documentation: {
    letter: 'C',
    title: 'Documentations',
    href: '/works/documentation',
    dek: 'Photographs, behind-the-scenes moments, and visual records of my projects and experiences.',
  },
};

/** The Academic section's pages, in its sub-navigation's order: its front, then the six categories. */
export const academicPages = [
  { label: 'All', href: '/works/academic' },
  ...categories.map((c) => ({ label: c.label, href: `/works/academic/${c.slug}` })),
];

/** The Essays page's groups, in order (headings from the essay list Christine gave). */
export const essayGroups = [
  { key: 'long', title: 'Longer Essays', kicker: 'Essay' },
  {
    key: 'short',
    title: 'Short Essays',
    kicker: 'Short essay',
    dek: 'Short essays based on the tracks of the album “The Gods That We Met” by AURORA.',
  },
] as const;

/** The Personal section's pages, in its sub-navigation's order. */
export const personalPages = [
  { label: 'All', href: '/works/personal' },
  { label: 'Digital Art', href: '/works/personal/digital-art' },
  { label: 'Essays', href: '/works/personal/essays' },
];
