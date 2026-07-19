/** Production origin for canonical URLs and absolute links. */
export const SITE_ORIGIN = (
  import.meta.env.VITE_SITE_ORIGIN?.trim() || "https://spotoddone.com"
).replace(/\/$/, "");

/** Build an absolute URL for a site path (e.g. `/emoji` → `https://…/emoji`). */
export function absoluteUrl(pathname: string): string {
  if (!pathname || pathname === "/") return `${SITE_ORIGIN}/`;
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${SITE_ORIGIN}${path}`;
}
