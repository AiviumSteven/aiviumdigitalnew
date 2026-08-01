/**
 * Pure Signals logic — no Astro imports, so it runs under any test
 * runner and any runtime. src/lib/signals.ts is the Astro adapter.
 */

/** Drop drafts, newest publishedAt first. */
export function publishable(entries) {
  return entries
    .filter((e) => !e.data.draft)
    .sort((a, b) =>
      b.data.publishedAt.toISOString().localeCompare(a.data.publishedAt.toISOString()),
    );
}

/** Listing shape for the index page, sitemap, and llms.txt. */
export function toRefs(entries) {
  return entries.map((e) => ({
    slug: e.id,
    title: e.data.title,
    excerpt: e.data.excerpt,
    publishedAt: e.data.publishedAt.toISOString(),
    updatedAt: e.data.updatedAt?.toISOString() ?? null,
  }));
}
