/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Optional override for canonical / absolute site origin (no trailing slash). */
  readonly VITE_SITE_ORIGIN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
