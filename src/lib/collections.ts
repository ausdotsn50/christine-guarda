import { getCollection, type CollectionEntry } from 'astro:content';
import type { ImageMetadata } from 'astro';
import cameraArt from '../assets/thumbnail/camera.png';
import flameArt from '../assets/thumbnail/flame.png';
import microphoneArt from '../assets/thumbnail/microphone.png';
import { categories, categoryLabel, documentationSections, type CategorySlug } from '../data/categories';
import type { IndexGroup } from '../components/types';

export type Work = CollectionEntry<'works'>;
export type Essay = CollectionEntry<'essays'>;
export type Gallery = CollectionEntry<'galleries'>;

/** By `order` (their place on the category page), then newest first. */
export function sortWorks(works: Work[]): Work[] {
  return [...works].sort((a, b) => a.data.order - b.data.order || (b.data.year ?? 0) - (a.data.year ?? 0));
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

/** One gallery piece as a plate (see platesOf), and its kind: a Digital Art piece or a Documentation photo. */
export type PlateItem = ReturnType<typeof platesOf>[number];
export type PlateKind = 'art' | 'photo';

/** Plates in the order they sit on a shelf, each with its neighbours and place, for the preview's previous /
 *  next and its "3 of 7". */
export function inSequence<T extends { id: string }>(items: T[]) {
  return items.map((item, i) => ({ ...item, prev: items[i - 1]?.id, next: items[i + 1]?.id, position: i + 1, total: items.length }));
}

/** The id of an essay's preview (its Lightbox). */
export const essayPreviewId = (essay: Essay) => `essay-${essay.id}`;

/** Each category's generic card art (white linework on press-blue), for a work with no image of its own: three
 *  drawings, two categories each. */
const categoryArt: Record<CategorySlug, ImageMetadata> = {
  'film-video': flameArt,
  'radio-broadcast': microphoneArt,
  'editorial-publishing': cameraArt,
  'scripts-stage': microphoneArt, // voice and performance
  'campaigns-advertising-pr': flameArt, // the spark that gets a campaign noticed
  'visual-brand-design': cameraArt, // the visual one
};

/** A work's category drawing as its card image (decorative: the card's link is named by the title). The front page's
 *  Featured works always show theirs, so the three cards keep their drawings together, as on Canva. */
export function illustration(w: Work): { src: ImageMetadata; alt: string; photo: boolean } {
  return { src: categoryArt[w.data.category], alt: '', photo: false };
}

/** A work's card image: its video's still (a photo, for the photo wash), else its own image or the first of its
 *  pictures, else its category's drawing. */
export function cardImage(w: Work): { src: ImageMetadata; alt: string; photo: boolean } {
  if (w.data.video) return { src: w.data.video.still, alt: w.data.video.alt, photo: true };
  if (w.data.image) return { ...w.data.image, photo: false };
  const first = w.data.gallery[0];
  if (first) return { src: first.src, alt: first.alt, photo: false };
  return illustration(w);
}

export const workHref = (w: Work) => `/works/academic/${w.data.category}#${w.id}`;

/** A Documentation heading's events, in order. */
export async function documentationEvents(section: string): Promise<Gallery[]> {
  return (await getGalleries('documentation')).filter((e) => e.data.section === section);
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
  const item = (label: string, href: string) => ({ label, href, current: href === currentHref });
  return [
    { label: 'Academic & University', items: categories.map((c) => item(c.label, `/works/academic/${c.slug}`)) },
    { label: 'Personal', items: [item('Digital Art', '/works/personal/digital-art'), item('Essays', '/works/personal/essays')] },
    { label: 'Documentation', items: documentationSections.map((s) => item(s.title, `/works/documentation/${s.slug}`)) },
  ];
}

export { categoryLabel };
