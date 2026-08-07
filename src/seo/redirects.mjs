/**
 * Migration-recovery route control (plain .mjs so node --test and
 * server.mjs can import it without a TS/Astro build).
 *
 * One table drives three consumers:
 * - server.mjs (production): one-hop 301s, real 410s, and trailing-slash
 *   normalization in front of the Astro handler.
 * - astro.config.mjs (dev/preview parity): the same map as Astro
 *   `redirects`, deduped to one key per route.
 * - src/test/redirects.test.mjs: the contract tests.
 *
 * Policy (docs/seo-implementation-report.md has the full rationale):
 * - Canonical URLs end in a trailing slash on one hostname,
 *   https://aiviumdigital.com.
 * - Every known legacy URL resolves in ONE hop, so both slash variants
 *   of each legacy path are listed explicitly.
 * - Retired-with-no-replacement content returns a real 410.
 * - Unknown routes fall through to Astro's 404.
 */

/** Legacy path (exact match, either slash variant) → canonical destination. */
const LEGACY = {
  // Core legacy service routes (old Next.js site)
  "/services/search-visibility": "/ai-seo/",
  "/services/google-business-profile": "/industries/home-services/",
  "/services/paid-ads": "/services/",
  "/services/websites": "/services/",
  "/services/tracking-reporting": "/ai-seo/",
  "/services/lead-generation": "/services/",
  "/local-seo": "/ai-seo/",
  "/ai-visibility": "/ai-seo/",
  // Home-services vertical
  "/home-services": "/industries/home-services/",
  "/roofing": "/industries/home-services/",
  "/hvac": "/industries/home-services/",
  "/plumbing": "/industries/home-services/",
  "/electrical": "/industries/home-services/",
  "/landscaping": "/industries/home-services/",
  "/fencing": "/industries/home-services/",
  // Editorial history
  "/field-notes": "/signals/",
  // Shorthand audit route used in old campaigns and print collateral
  "/audit": "/ai-visibility-audit/",
};

/** Retired with no replacement → 410 Gone. Keep out of nav and sitemap.
 *  - /industries/restaurants: restaurant marketing fully retired (owner, 2026-08-05).
 *  - /beyond-the-algorithm: placeholder for a community that never launched
 *    (owner, 2026-08-05) — no relevant replacement exists. */
const GONE = ["/industries/restaurants", "/beyond-the-algorithm"];

/** Expand a path into its exact-match slash variants. */
const variants = (p) => [p, `${p}/`];

export const REDIRECT_MAP = new Map(
  Object.entries(LEGACY).flatMap(([from, to]) => variants(from).map((v) => [v, to])),
);

export const GONE_PATHS = new Set(GONE.flatMap(variants));

/** Last path segment carries a file extension (robots.txt, *.xml, …). */
const hasFileExtension = (pathname) => /\.[a-zA-Z0-9]+$/.test(pathname.split("/").pop() ?? "");

/**
 * Route-control decision for a request path.
 * Returns one of:
 *   { kind: "redirect", to, status }  — issue a permanent redirect
 *   { kind: "gone" }                  — respond 410
 *   null                              — hand the request to Astro
 */
export function resolveSeoRoute(pathname) {
  // Legacy Field Notes taxonomy archives (/field-notes/tag/<slug>,
  // /field-notes/category/<slug>, /field-notes/page/<n>, any depth,
  // either slash form) → the Signals hub. Signals has no taxonomy or
  // pagination routes, so the hub is the closest live destination.
  // Must run before the post-slug rule below, which would otherwise
  // mint a dead /signals/tag/<slug>/ URL.
  if (/^\/field-notes\/(tag|category|page)(\/|$)/.test(pathname)) {
    return { kind: "redirect", to: "/signals/", status: 301 };
  }

  // /field-notes/<slug>/ → /signals/<slug>/ (one-to-one; the blog moved
  // wholesale in the Signals rename, slugs unchanged).
  if (pathname.startsWith("/field-notes/") && pathname.length > "/field-notes/".length) {
    let to = "/signals/" + pathname.slice("/field-notes/".length);
    // Land on the canonical slashed URL in one hop.
    if (!to.endsWith("/") && !hasFileExtension(to)) to += "/";
    return { kind: "redirect", to, status: 301 };
  }

  const mapped = REDIRECT_MAP.get(pathname);
  if (mapped) return { kind: "redirect", to: mapped, status: 301 };

  if (GONE_PATHS.has(pathname)) return { kind: "gone" };

  // Canonical trailing-slash normalization: /ai-seo → /ai-seo/ in one
  // hop. API endpoints and file-like paths are exempt.
  if (
    pathname !== "/" &&
    !pathname.endsWith("/") &&
    !pathname.startsWith("/api/") &&
    !hasFileExtension(pathname)
  ) {
    return { kind: "redirect", to: `${pathname}/`, status: 301 };
  }

  return null;
}

/**
 * The map shaped for Astro's `redirects` config (dev/preview parity;
 * production is served by server.mjs). One key per route: with
 * trailingSlash "ignore" an unslashed redirect route matches both
 * variants. The /field-notes/* prefix and the 410s have no config
 * equivalent and live only in resolveSeoRoute().
 */
export function astroRedirects() {
  return Object.fromEntries(
    Object.entries(LEGACY).map(([from, to]) => [from, { status: 301, destination: to }]),
  );
}
