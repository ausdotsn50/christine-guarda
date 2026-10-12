// Icons from Ionicons (MIT, https://ionic.io/ionicons), inlined as SVG at build time: no icon font and no
// script reach the browser. Their SVGs carry Ionicons' own classes (`ionicon`, `ionicon-fill-none`,
// `ionicon-stroke-width`), styled in src/styles/site.css, and draw in currentColor.
import {
  arrowForwardOutline,
  bookOutline,
  call,
  cameraOutline,
  chevronBackOutline,
  chevronDownOutline,
  chevronForwardOutline,
  closeOutline,
  createOutline,
  logoFacebook,
  logoInstagram,
  logoLinkedin,
  mail,
  menuOutline,
  peopleOutline,
  play,
} from 'ionicons/icons';

const icons = {
  arrowForwardOutline,
  bookOutline,
  call,
  cameraOutline,
  chevronBackOutline,
  chevronDownOutline,
  chevronForwardOutline,
  closeOutline,
  createOutline,
  logoFacebook,
  logoInstagram,
  logoLinkedin,
  mail,
  menuOutline,
  peopleOutline,
  play,
};

export type IconName = keyof typeof icons;

/**
 * The icon's SVG markup, decorative (aria-hidden): give the control around it its own accessible name.
 * `size` sets width and height in px; without it, size the SVG with CSS. `className` adds classes.
 */
export function icon(name: IconName, { size, className }: { size?: number; className?: string } = {}): string {
  const svg = icons[name].replace(/^data:image\/svg\+xml;utf8,/, '');
  const classes = ['ionicon', className].filter(Boolean).join(' ');
  const dims = size ? ` width='${size}' height='${size}'` : '';
  return svg.replace("class='ionicon'", `class='${classes}'${dims} aria-hidden='true' focusable='false'`);
}
