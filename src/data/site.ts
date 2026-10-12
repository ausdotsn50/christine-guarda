import type { FooterItem, MenuItem } from '../components/types';
import { emails, phone, socials } from './profile';
import { workGroups } from './categories';
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
  // Works has no page of its own: the link opens its first section, and its drop-down lists all three.
  { section: 'works', label: 'Works', href: workGroups.academic.href },
  { section: 'contact', label: 'Contact', href: '/contact' },
];

/** The Works sections, each with its own front page: the Works link's drop-down and the menu's Works group. */
export const worksSections = Object.values(workGroups).map(({ title, href }) => ({ label: title, href }));

/** Whether a path is on or under a page. */
const within = (path: string, href: string) => path === href || path.startsWith(href + '/');

/** Pages that belong under Works in the Masthead. */
const worksPages = ['/works'];

/** The Masthead section a path belongs to, or undefined (e.g. /styleguide). */
export function navSection(pathname: string): Section | undefined {
  const path = pathname.replace(/\/+$/, '') || '/';
  if (path === '/') return 'home';
  if (path === '/about' || path.startsWith('/about/')) return 'about';
  if (path === '/contact' || path.startsWith('/contact/')) return 'contact';
  if (worksPages.some((p) => within(path, p))) return 'works';
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

/** The small-screen menu: the main pages, with the Works sections grouped under Works. */
export function menuLinks(pathname: string): MenuItem[] {
  const path = pathname.replace(/\/+$/, '') || '/';
  const [home, about, works, contact] = nav;
  const page = ({ label, href }: { label: string; href: string }): MenuItem => ({ label, href, current: href === path ? 'page' : undefined });
  return [
    page(home),
    page(about),
    { label: works.label, children: worksSections.map((s) => ({ ...s, current: s.href === path ? 'page' : within(path, s.href) ? 'true' : undefined })) },
    page(contact),
  ];
}
