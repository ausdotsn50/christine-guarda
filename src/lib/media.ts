// Videos and audio stay on Google Drive or YouTube; the site embeds their players.

/** The player address for a Google Drive or YouTube share link. */
export function embedUrl(href: string): string {
  const url = new URL(href);
  if (url.hostname.endsWith('drive.google.com')) {
    const id = url.pathname.match(/\/file\/d\/([^/]+)/)?.[1] ?? url.searchParams.get('id');
    if (id) return `https://drive.google.com/file/d/${id}/preview`;
  }
  if (url.hostname === 'youtu.be') return `https://www.youtube-nocookie.com/embed/${url.pathname.slice(1)}`;
  if (url.hostname.endsWith('youtube.com')) {
    const id = url.searchParams.get('v') ?? url.pathname.match(/\/(?:embed|shorts|live)\/([^/]+)/)?.[1];
    if (id) return `https://www.youtube-nocookie.com/embed/${id}`;
  }
  throw new Error(`Can't embed ${href}: use a Google Drive or YouTube link.`);
}

/** Where a link opens, for its label: "Google Drive" or "YouTube". */
export const hostName = (href: string) => (/youtu/.test(new URL(href).hostname) ? 'YouTube' : 'Google Drive');
