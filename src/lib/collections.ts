import { getCollection, type CollectionEntry } from 'astro:content';
import { categories, categoryLabel, type CategorySlug } from '../data/categories';
import type { IndexGroup } from '../components/types';

export type Work = CollectionEntry<'works'>;
export type Essay = CollectionEntry<'essays'>;
export type Gallery = CollectionEntry<'galleries'>;

/** Newest first, then by `order`. */
export function sortWorks(works: Work[]): Work[] {
  return [...works].sort((a, b) => b.data.year - a.data.year || a.data.order - b.data.order);
}

/** By `order`, then newest first (a gallery without a year after those with one). */
function byOrder<T extends Essay | Gallery>(entries: T[]): T[] {
  return [...entries].sort((a, b) => a.data.order - b.data.order || (b.data.year ?? 0) - (a.data.year ?? 0));
}

export async function getWorks(category?: CategorySlug): Promise<Work[]> {
  return sortWorks(await getCollection('works', (w) => !category || w.data.category === category));
}

/** Longer essays first, then short ones; each group by `order`. */
export async function getEssays(): Promise<Essay[]> {
  const rank = { long: 0, short: 1 } as const;
  return byOrder(await getCollection('essays')).sort((a, b) => rank[a.data.group] - rank[b.data.group]);
}

export async function getGalleries(group: Gallery['data']['group']): Promise<Gallery[]> {
  return byOrder(await getCollection('galleries', (g) => g.data.group === group));
}

/** "1 work", "3 works". */
export function countLabel(n: number, noun: string, plural = `${noun}s`): string {
  return `${n} ${n === 1 ? noun : plural}`;
}

/** A gallery's pieces as plates (a Digital Art series' artworks, a Documentation event's photos), numbered within
 *  the gallery, with ids unique on the page. */
export function platesOf(series: Gallery) {
  const { title, year, images } = series.data;
  return images.map((img, i) => ({ ...img, id: `plate-${series.id}-${i + 1}`, number: i + 1, series: title, year }));
}

/** Plates in the order they sit on a shelf, each with its neighbours and place, for the preview's previous /
 *  next and its "3 of 7". */
export function inSequence<T extends { id: string }>(items: T[]) {
  return items.map((item, i) => ({ ...item, prev: items[i - 1]?.id, next: items[i + 1]?.id, position: i + 1, total: items.length }));
}

/** The id of an essay's preview (its Lightbox). */
export const essayPreviewId = (essay: Essay) => `essay-${essay.id}`;

export const workHref = (w: Work) => `/works/academic/${w.data.category}#${w.id}`;

/** The Documentation section's pages, in its sub-navigation's order: its front, then an event page each. */
export async function documentationPages(): Promise<{ label: string; href: string }[]> {
  const events = await getGalleries('documentation');
  return [{ label: 'All', href: '/works/documentation' }, ...events.map((e) => ({ label: e.data.title, href: `/works/documentation/${e.id}` }))];
}

/** The pages of the Works section in Works index order, for Return / Next. */
export function readingOrder(): { label: string; href: string }[] {
  return [
    ...categories.map((c) => ({ label: c.label, href: `/works/academic/${c.slug}` })),
    { label: 'Digital Art', href: '/works/personal/digital-art' },
    { label: 'Essays', href: '/works/personal/essays' },
    { label: 'Documentation', href: '/works/documentation' },
  ];
}

/** The SectionIndex groups, with the item at `currentHref` marked current. */
export async function sectionIndexGroups(currentHref?: string): Promise<IndexGroup[]> {
  const docs = await getGalleries('documentation');
  const item = (label: string, href: string) => ({ label, href, current: href === currentHref });
  return [
    { label: 'Academic & University', items: categories.map((c) => item(c.label, `/works/academic/${c.slug}`)) },
    { label: 'Personal', items: [item('Digital Art', '/works/personal/digital-art'), item('Essays', '/works/personal/essays')] },
    { label: 'Documentation', items: docs.map((d) => item(d.data.title, `/works/documentation/${d.id}`)) },
  ];
}

export { categoryLabel };
