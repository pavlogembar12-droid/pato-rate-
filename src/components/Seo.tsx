/**
 * Renders document `<head>` tags using React 19's native support for hoisting
 * `<title>` / `<meta>` elements out of components — React moves them into the
 * document `<head>` automatically, so no provider or portal is needed.
 *
 * Defaults come from `seoConfig` (see `src/client/seo.config.ts`). Render
 * `<Seo />` once at the app root so every page inherits the site-wide
 * title/description/OG tags; pass the `seo` prop to `<Page />` (or render
 * `<Seo />` again inside a page) to override per route.
 */

import { seoConfig } from '@/client/seo.config';

/** Site-wide default OG/Twitter preview image. 1200×630, absolute path from /public. */
const DEFAULT_OG_IMAGE = '/og-image.png';

export interface SeoProps {
  /** Page-specific title; combined with `seoConfig.formatTitle`. */
  title?: string;
  /** Page-specific meta description; falls back to `seoConfig.description`. */
  description?: string;
  /** Page-specific OG/Twitter image path; falls back to the site-wide banner. */
  image?: string;
  /** When true, asks crawlers not to index/follow this page. */
  noindex?: boolean;
}

export function Seo({ title, description, image, noindex }: SeoProps) {
  const finalTitle = seoConfig.formatTitle(title);
  const finalDescription = description ?? seoConfig.description;
  const finalImage = image ?? DEFAULT_OG_IMAGE;

  // Canonical/og:url/og:image must always resolve against the real
  // production domain (seoConfig.siteUrl), never window.location.origin —
  // during prerendering that origin is a local build-time server, not the
  // public site. Only the *path* (not the host) comes from window.location.
  const path = typeof window === 'undefined' ? '' : window.location.pathname;
  const canonicalUrl = `${seoConfig.siteUrl}${path}`;
  const absoluteImageUrl = finalImage.startsWith('http')
    ? finalImage
    : `${seoConfig.siteUrl}${finalImage}`;

  return (
    <>
      <title>{finalTitle}</title>
      {finalDescription && (
        <meta name="description" content={finalDescription} />
      )}
      {!noindex && <link rel="canonical" href={canonicalUrl} />}
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={seoConfig.siteName} />
      <meta property="og:locale" content="uk_UA" />
      <meta property="og:title" content={finalTitle} />
      {finalDescription && (
        <meta property="og:description" content={finalDescription} />
      )}
      <meta property="og:image" content={absoluteImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      {finalDescription && (
        <meta name="twitter:description" content={finalDescription} />
      )}
      <meta name="twitter:image" content={absoluteImageUrl} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
    </>
  );
}
