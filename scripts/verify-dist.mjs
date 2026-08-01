#!/usr/bin/env node
/**
 * verify-dist — the build gate for aiviumdigital.com.
 *
 * Asserts the SEO/GEO machine layer against the built output and exits
 * non-zero on any failure, so a regression fails the Docker build instead
 * of shipping silently. The Node adapter puts prerendered pages under
 * dist/client/.
 */
import { readFile, readdir, access } from 'node:fs/promises';
import path from 'node:path';
import { parse } from 'node-html-parser';

const DIST = path.resolve(process.cwd(), 'dist/client');
const SITE = 'https://aiviumdigital.com';

// Signals launched empty (fresh blog); flip to 1 when the first post
// merges so a content-pipeline regression can never ship a postless site.
const MIN_POSTS = 0;

const ROUTES = ['/', '/ai-seo/', '/ai-automation/', '/discovery/', '/signals/'];

// The discovery funnel deliberately ships without site chrome.
const NAV_EXEMPT = new Set(['/discovery/']);

const failures = [];
const fail = (msg) => failures.push(msg);
const ok = (msg) => console.log(`  ✓ ${msg}`);

const distPath = (route) =>
  path.join(DIST, route === '/' ? 'index.html' : `${route.replace(/^\/|\/$/g, '')}/index.html`);

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

// ── discover generated post pages ─────────────────────────────────────
let postRoutes = [];
try {
  const entries = await readdir(path.join(DIST, 'signals'), { withFileTypes: true });
  postRoutes = entries.filter((e) => e.isDirectory()).map((e) => `/signals/${e.name}/`);
} catch {
  // /signals/index.html missing entirely is caught by the ROUTES check.
}
if (postRoutes.length < MIN_POSTS)
  fail(`signals: ${postRoutes.length} post page(s) in dist, expected at least ${MIN_POSTS}`);

// ── per-route checks ──────────────────────────────────────────────────
const seenTitles = new Map();

for (const route of [...ROUTES, ...postRoutes]) {
  const file = distPath(route);
  if (!(await exists(file))) {
    fail(`${route}: missing ${file}`);
    continue;
  }
  const html = await readFile(file, 'utf8');
  const doc = parse(html);

  const title = doc.querySelector('title')?.text?.trim();
  if (!title) fail(`${route}: no <title>`);
  else if (seenTitles.has(title)) fail(`${route}: duplicate title with ${seenTitles.get(title)}`);
  else seenTitles.set(title, route);

  if (!doc.querySelector('meta[name="description"]')) fail(`${route}: no meta description`);

  const canonical = doc.querySelector('link[rel="canonical"]')?.getAttribute('href');
  if (canonical !== `${SITE}${route}`) fail(`${route}: canonical is ${canonical}, expected ${SITE}${route}`);

  if (!doc.querySelector('meta[property="og:title"]')) fail(`${route}: no og:title`);
  if (!doc.querySelector('meta[property="og:image"]')) fail(`${route}: no og:image`);
  if (!doc.querySelector('h1')) fail(`${route}: no <h1>`);
  if (!NAV_EXEMPT.has(route) && !doc.querySelector('nav')) fail(`${route}: no <nav>`);

  ok(`${route} — title/meta/canonical/OG/h1${NAV_EXEMPT.has(route) ? '' : '/nav'}`);
}

// ── signals specifics ─────────────────────────────────────────────────
{
  const idxHtml = await readFile(distPath('/signals/'), 'utf8').catch(() => '');
  if (idxHtml) {
    if (!idxHtml.includes('data-posts-state="loaded"') && !idxHtml.includes('data-posts-state="empty"'))
      fail('/signals/: neither posts nor the explicit empty-state marker rendered');
    else ok(`signals index state: ${idxHtml.includes('data-posts-state="loaded"') ? 'loaded' : 'empty (marker present)'}`);
    if (MIN_POSTS > 0 && !idxHtml.includes('data-posts-state="loaded"'))
      fail('/signals/: index is not rendered with posts');
  }

  for (const route of postRoutes) {
    const postHtml = await readFile(distPath(route), 'utf8');
    if (!postHtml.includes('"BlogPosting"')) fail(`${route}: no BlogPosting JSON-LD`);
    if (!postHtml.includes('article:published_time')) fail(`${route}: no article:published_time meta`);
  }
  if (postRoutes.length)
    ok(`signals: ${postRoutes.length} post page(s), all with BlogPosting JSON-LD`);
}

// ── site files ────────────────────────────────────────────────────────
{
  if (!(await exists(path.join(DIST, '404.html')))) fail('404.html missing');
  else ok('404.html present');

  const robotsPath = path.join(DIST, 'robots.txt');
  if (!(await exists(robotsPath))) fail('robots.txt missing');
  else {
    const robots = await readFile(robotsPath, 'utf8');
    if (!robots.includes(`Sitemap: ${SITE}/sitemap.xml`)) fail('robots.txt: sitemap reference missing or wrong');
    else ok('robots.txt references the sitemap');
  }

  if (!(await exists(path.join(DIST, 'llms.txt')))) fail('llms.txt missing');
  else ok('llms.txt present');

  const sitemapPath = path.join(DIST, 'sitemap.xml');
  if (!(await exists(sitemapPath))) fail('sitemap.xml missing');
  else {
    const xml = await readFile(sitemapPath, 'utf8');
    const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    for (const u of urls) {
      const p = new URL(u).pathname;
      if (!p.endsWith('/')) fail(`sitemap: ${u} missing trailing slash`);
      if (!(await exists(distPath(p)))) fail(`sitemap: ${u} has no corresponding file in dist`);
    }
    for (const route of postRoutes) {
      if (!urls.includes(`${SITE}${route}`)) fail(`sitemap: built post ${route} is not listed`);
    }
    ok(`sitemap covers ${urls.length} URLs, all present in dist`);
  }
}

// ── verdict ───────────────────────────────────────────────────────────
if (failures.length) {
  console.error(`\nverify-dist FAILED — ${failures.length} problem(s):`);
  for (const f of failures) console.error(`  ✗ ${f}`);
  process.exit(1);
}
console.log('\nverify-dist PASSED — machine layer intact.');
