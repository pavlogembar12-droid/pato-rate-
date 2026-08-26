/**
 * Single source of truth for the site's <title>, meta description, and
 * Open Graph defaults.
 *
 * Per-page overrides go through the `<Seo />` component or the `seo` prop on
 * `<Page />`. The static fallback in `src/client/index.html` should mirror
 * `siteName` so non-JS crawlers and the first paint show the right title.
 *
 * IMPORTANT: update `siteName` and `description` here as soon as the real
 * product name and pitch are known. The defaults below are intentionally
 * generic placeholders — leaving them shipped will hurt SEO and social
 * previews.
 */

export interface SeoConfig {
  siteName: string;
  /**
   * Production domain, no trailing slash. Used to build absolute
   * canonical/og:url/og:image URLs.
   *
   * IMPORTANT: this must be a hardcoded constant, not derived from
   * `window.location.origin`. `scripts/prerender.mjs` renders every page
   * against a local server (http://localhost:4173) at build time — if this
   * value came from `window.location`, every canonical/og:url/og:image tag
   * in the prerendered HTML would point at localhost instead of the real
   * site, which is silently wrong (Google mostly recovers; Telegram/
   * Facebook link previews just break, since they can't reach localhost).
   *
   * Update this the moment a custom domain is connected — until then it
   * intentionally points at the vercel.app URL currently in production.
   */
  siteUrl: string;
  /**
   * Site-wide default meta description used when a page does not provide one.
   * Aim for 70–160 characters of plain prose (no marketing fluff, no emojis).
   */
  description: string;
  /** Renders the final <title>. Receives the per-page title (if any). */
  formatTitle: (title?: string) => string;
}

const siteName = 'PatoRate';

// TODO: replace with the custom domain once one is connected (e.g.
// 'https://patorate.com.ua'), then also update the `rewrites`/prerender
// routes if the domain change affects paths.
const siteUrl = 'https://pato-rate.vercel.app';

const description =
  'PatoRate — послуги для зростання бізнесу: підвищення відгуків, ведення бізнесу, супровід Google Карт та створення лендінгів.';

export const seoConfig: SeoConfig = {
  siteName,
  siteUrl,
  description,
  formatTitle: (title) => (title ? `${title} · ${siteName}` : siteName),
};
