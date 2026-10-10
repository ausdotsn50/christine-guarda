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
