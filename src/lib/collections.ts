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

/** "1 work", "3 works". */
export function countLabel(n: number, noun: string, plural = `${noun}s`): string {
  return `${n} ${n === 1 ? noun : plural}`;
}

export const workHref = (w: Work) => `/works/${w.data.category}#${w.id}`;
