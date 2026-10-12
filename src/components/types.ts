// Shared prop shapes, as in design-system/components/index.d.ts. Labels that were ReactNode are strings here.

export interface NavLink {
  label: string;
  href?: string;
  active?: boolean;
  /** Sub-pages shown in a drop-down under the link (the Works sections). */
  items?: NavLink[];
}

/** An entry of the small-screen menu: a page, or a group heading over its pages. */
export interface MenuItem {
  label: string;
  href?: string;
  /** "page" on the page itself, "true" on a section the page is in. */
  current?: 'page' | 'true';
  children?: MenuItem[];
}

export interface BylineItem { label?: string; value: string }

export interface IndexItem { label: string; href?: string; current?: boolean }
export interface IndexGroup { label: string; items: IndexItem[] }

/** `icon` is optional SVG markup shown beside a contact or in place of a social label (which stays as screen-reader text). */
export interface FooterItem { label: string; href?: string; note?: string; icon?: string }
