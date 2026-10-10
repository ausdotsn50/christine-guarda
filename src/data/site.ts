import type { FooterItem } from '../components/types';
import { emails, phone, socials } from './profile';
import { categories } from './categories';
// Footer glyphs from Ionicons, drawn in currentColor and sized by the footer's CSS.
import { icon } from '../lib/icons';

const envelopeIcon = icon('mail');
const phoneIcon = icon('call');
const facebookIcon = icon('logoFacebook');
const instagramIcon = icon('logoInstagram');
const linkedinIcon = icon('logoLinkedin');

export const siteName = 'Christine Guarda';

export const dateline = 'UST–Legazpi · AB Communication · Class of 2027';

export type Section = 'home' | 'about' | 'works' | 'contact';

/** The four Masthead links, in the order Home, About, Works, Contact. */
export const nav: { section: Section; label: string; href: string }[] = [
  { section: 'home', label: 'Home', href: '/' },
  { section: 'about', label: 'About', href: '/about' },
  { section: 'works', label: 'Works', href: '/works' },
  { section: 'contact', label: 'Contact', href: '/contact' },
];

/** Pages that belong under Works in the Masthead without living at /works. */
const worksPages = ['/works', '/essays', '/digital-art', '/documentation'];

/** The Masthead section a path belongs to, or undefined (e.g. /styleguide). */
export function navSection(pathname: string): Section | undefined {
  const path = pathname.replace(/\/+$/, '') || '/';
  if (path === '/') return 'home';
  if (path === '/about' || path.startsWith('/about/')) return 'about';
  if (path === '/contact' || path.startsWith('/contact/')) return 'contact';
  if (worksPages.some((p) => path === p || path.startsWith(p + '/'))) return 'works';
  return undefined;
}

// Footer contacts as the Canva footer sets them: the addresses themselves, one envelope beside both,
// then the phone number.
export const contacts: FooterItem[] = [
  ...emails.map(({ address, note }, i) => ({ label: address, href: `mailto:${address}`, note, icon: i === 0 ? envelopeIcon : undefined })),
  { ...phone, icon: phoneIcon },
];

const socialIcons: Record<string, string> = { Facebook: facebookIcon, Instagram: instagramIcon, LinkedIn: linkedinIcon };

export const social: FooterItem[] = socials.map((s) => ({ ...s, icon: socialIcons[s.label] }));

export const footerNav: FooterItem[] = nav.map(({ label, href }) => ({ label, href }));

/** Every page, flat, for the small-screen menu: the main pages with the Works pages after Works, then Contact. */
export function menuLinks(pathname: string): { label: string; href: string; current: boolean }[] {
  const path = pathname.replace(/\/+$/, '') || '/';
  const [home, about, works, contact] = nav;
  return [
    home,
    about,
    works,
    ...categories.map((c) => ({ label: c.label, href: `/works/${c.slug}` })),
    { label: 'Digital Art', href: '/digital-art' },
    { label: 'Essays', href: '/essays' },
    { label: 'Documentation', href: '/documentation' },
    contact,
  ].map(({ label, href }) => ({ label, href, current: href === path }));
}
