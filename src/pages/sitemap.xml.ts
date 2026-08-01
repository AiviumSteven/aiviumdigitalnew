/**
 * /sitemap.xml — generated at build time so Signals posts are always
 * included (replaces the hand-maintained public/sitemap.xml).
 */
import type { APIRoute } from 'astro';
import { getSignalRefs } from '../lib/signals';

const SITE = 'https://aiviumdigital.com';

// Static routes with their last substantive-edit dates; bump by hand on
// meaningful page changes, exactly as the old static sitemap was.
const STATIC_PAGES: { loc: string; lastmod: string }[] = [
  { loc: '/', lastmod: '2026-07-27' },
  { loc: '/ai-seo/', lastmod: '2026-07-27' },
  { loc: '/ai-automation/', lastmod: '2026-07-27' },
  { loc: '/signals/', lastmod: '2026-08-01' },
];

const day = (iso: string) => iso.slice(0, 10);

export const GET: APIRoute = async () => {
  const posts = await getSignalRefs();
  const urls = [
    ...STATIC_PAGES,
    ...posts.map((p) => ({
      loc: `/signals/${p.slug}/`,
      lastmod: day(p.updatedAt ?? p.publishedAt ?? new Date(0).toISOString()),
    })),
  ];
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map(
      (u) => `  <url>\n    <loc>${SITE}${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n  </url>`,
    ),
    '</urlset>',
    '',
  ].join('\n');
  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
