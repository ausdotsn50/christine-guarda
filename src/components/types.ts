// Shared prop shapes, as in design-system/components/index.d.ts. Labels that were ReactNode are strings here.

export interface NavLink { label: string; href?: string; active?: boolean }

/** `icon` is optional SVG markup shown beside a contact or in place of a social label (which stays as screen-reader text). */
export interface FooterItem { label: string; href?: string; note?: string; icon?: string }
