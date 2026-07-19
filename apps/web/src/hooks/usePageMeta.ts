import { useEffect } from "react";
import { absoluteUrl } from "@/game/site";
import type { PageMeta } from "@/seo/pageMeta";

function ensureMetaDescription(): HTMLMetaElement {
  let el = document.querySelector('meta[name="description"]');
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", "description");
    document.head.appendChild(el);
  }
  return el as HTMLMetaElement;
}

function ensureCanonicalLink(): HTMLLinkElement {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  return el as HTMLLinkElement;
}

/** Keep document title, description, and canonical in sync with the active route. */
export function usePageMeta(meta: PageMeta): void {
  useEffect(() => {
    document.title = meta.title;
    ensureMetaDescription().setAttribute("content", meta.description);
    ensureCanonicalLink().setAttribute("href", absoluteUrl(meta.path));
  }, [meta.title, meta.description, meta.path]);
}
