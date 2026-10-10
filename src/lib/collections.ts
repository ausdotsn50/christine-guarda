import { getCollection, type CollectionEntry } from 'astro:content';
import type { CategorySlug } from '../data/categories';

export type Work = CollectionEntry<'works'>;

/** Newest first, then by `order`. */
export function sortWorks(works: Work[]): Work[] {
  return [...works].sort((a, b) => b.data.year - a.data.year || a.data.order - b.data.order);
}

export async function getWorks(category?: CategorySlug): Promise<Work[]> {
  return sortWorks(await getCollection('works', (w) => !category || w.data.category === category));
}

export const workHref = (w: Work) => `/works/${w.data.category}#${w.id}`;
