#!/usr/bin/env node
/**
 * verify-http — boots the production server (server.mjs, the route-control
 * wrapper + Astro handler) against the built dist/ and asserts the full
 * HTTP contract from the SEO brief:
 *
 *   - every priority page returns 200 with a matching self-canonical,
 *   - every mapped legacy URL 301s in ONE hop to its final destination,
 *   - the final destination of every redirect returns 200,
 *   - retired routes return a real 410,
 *   - unknown routes return a real 404,
 *   - robots.txt references the sitemap and never blocks OAI-SearchBot,
 *   - every sitemap URL returns 200 and is slash-canonical.
 *
 * Runs as part of `npm run verify` (after verify-dist), so a regression
 * fails the Docker build before the container swaps.
 */
import { spawn } from 'node:child_process';
import { setTimeout as sleep } from 'node:timers/promises';

const PORT = 4873;
const BASE = `http://127.0.0.1:${PORT}`;

const failures = [];
const fail = (msg) => failures.push(msg);
const ok = (msg) => console.log(`  ✓ ${msg}`);

// [path, expected status, expected one-hop Location (path only) or null]
const MATRIX = [
  // Priority pages
  ['/', 200, null],
  ['/services/', 200, null],
  ['/ai-seo/', 200, null],
  ['/ai-automation/', 200, null],
  ['/ai-visibility-audit/', 200, null],
  ['/process/', 200, null],
  ['/about/', 200, null],
  ['/about-steven/', 200, null],
  ['/case-studies/', 200, null],
  ['/locations/maryland/', 200, null],
  ['/locations/hagerstown-md/', 200, null],
  ['/industries/home-services/', 200, null],
  ['/signals/', 200, null],
  ['/discovery/', 200, null],
  ['/privacy/', 200, null],
  ['/robots.txt', 200, null],
  ['/sitemap.xml', 200, null],
  ['/llms.txt', 200, null],
  // Trailing-slash canonicalization (one hop)
  ['/services', 301, '/services/'],
  ['/ai-seo', 301, '/ai-seo/'],
  ['/about-steven', 301, '/about-steven/'],
  // Legacy map (one hop each)
  ['/services/search-visibility/', 301, '/ai-seo/'],
  ['/services/search-visibility', 301, '/ai-seo/'],
  ['/services/google-business-profile/', 301, '/industries/home-services/'],
  ['/services/paid-ads/', 301, '/services/'],
  ['/services/websites/', 301, '/services/'],
  ['/services/tracking-reporting/', 301, '/ai-seo/'],
  ['/services/lead-generation/', 301, '/services/'],
  ['/local-seo', 301, '/ai-seo/'],
  ['/local-seo/', 301, '/ai-seo/'],
  ['/ai-visibility', 301, '/ai-seo/'],
  ['/ai-visibility/', 301, '/ai-seo/'],
  ['/home-services/', 301, '/industries/home-services/'],
  ['/roofing/', 301, '/industries/home-services/'],
  ['/hvac/', 301, '/industries/home-services/'],
  ['/plumbing/', 301, '/industries/home-services/'],
  ['/electrical/', 301, '/industries/home-services/'],
  ['/landscaping/', 301, '/industries/home-services/'],
  ['/fencing/', 301, '/industries/home-services/'],
  ['/field-notes/', 301, '/signals/'],
  ['/field-notes/ai-search-decision-making-2026/', 301, '/signals/ai-search-decision-making-2026/'],
  ['/field-notes/tag/ai-seo/', 301, '/signals/'],
  ['/field-notes/tag/ai-seo', 301, '/signals/'],
  ['/field-notes/category/strategy/', 301, '/signals/'],
  ['/field-notes/page/2/', 301, '/signals/'],
  ['/audit', 301, '/ai-visibility-audit/'],
  ['/audit/', 301, '/ai-visibility-audit/'],
  // Retired
  ['/industries/restaurants', 410, null],
  ['/industries/restaurants/', 410, null],
  ['/beyond-the-algorithm', 410, null],
  ['/beyond-the-algorithm/', 410, null],
  // Unknown routes stay hard 404s
  ['/definitely-not-a-page/', 404, null],
  ['/services/definitely-not-a-service/', 404, null],
];

const get = (path) => fetch(`${BASE}${path}`, { redirect: 'manual' });

// ── boot the production server against dist ──────────────────────────
const server = spawn('node', ['server.mjs'], {
  env: { ...process.env, PORT: String(PORT), HOST: '127.0.0.1' },
  stdio: ['ignore', 'pipe', 'pipe'],
});
let serverErr = '';
server.stderr.on('data', (d) => (serverErr += d));

let up = false;
for (let i = 0; i < 50; i++) {
  await sleep(200);
  try {
    await get('/robots.txt');
    up = true;
    break;
  } catch {
    if (server.exitCode !== null) break;
  }
}
if (!up) {
  console.error(`verify-http FAILED — server did not start.\n${serverErr}`);
  process.exit(1);
}

try {
  // ── status matrix ───────────────────────────────────────────────────
  for (const [path, status, location] of MATRIX) {
    const res = await get(path);
    if (res.status !== status) {
      fail(`${path}: expected ${status}, got ${res.status}`);
      continue;
    }
    if (location) {
      const got = res.headers.get('location');
      if (got !== location) {
        fail(`${path}: expected Location ${location}, got ${got}`);
        continue;
      }
      const final = await get(location);
      if (final.status !== 200) fail(`${path}: destination ${location} returned ${final.status} (chain or broken target)`);
    }
  }
  ok(`status matrix: ${MATRIX.length} routes checked`);

  // ── canonicals on 200 pages ─────────────────────────────────────────
  for (const [path, status] of MATRIX) {
    if (status !== 200 || path.includes('.')) continue;
    const html = await (await get(path)).text();
    const m = html.match(/<link rel="canonical" href="([^"]+)"/);
    if (!m) fail(`${path}: no canonical tag`);
    else if (m[1] !== `https://aiviumdigital.com${path}`) fail(`${path}: canonical is ${m[1]}`);
  }
  ok('every 200 page carries a matching self-canonical');

  // ── robots ──────────────────────────────────────────────────────────
  const robots = await (await get('/robots.txt')).text();
  if (!robots.includes('Sitemap: https://aiviumdigital.com/sitemap.xml')) fail('robots.txt: sitemap reference missing');
  if (/User-agent: OAI-SearchBot[\s\S]*?Disallow: \/\s/m.test(robots)) fail('robots.txt: OAI-SearchBot is blocked');
  if (!robots.includes('User-agent: OAI-SearchBot')) fail('robots.txt: OAI-SearchBot allowance missing');
  ok('robots.txt references sitemap and allows OAI-SearchBot');

  // ── sitemap URLs all live and slash-canonical ───────────────────────
  const xml = await (await get('/sitemap.xml')).text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
  for (const p of urls) {
    if (!p.endsWith('/')) fail(`sitemap: ${p} missing trailing slash`);
    const res = await get(p);
    if (res.status !== 200) fail(`sitemap: ${p} returns ${res.status}`);
  }
  if (urls.includes('/discovery/')) fail('sitemap: /discovery/ is noindex and must stay out');
  ok(`sitemap: ${urls.length} URLs, all 200 and slash-canonical`);

  // ── 404 body is the branded page with a real 404 status ────────────
  const nf = await get('/definitely-not-a-page/');
  const nfBody = await nf.text();
  if (!nfBody.includes('Lost in space')) fail('404 body is not the branded 404 page');
  else ok('unknown routes serve the branded 404 with status 404');
} finally {
  server.kill();
}

if (failures.length) {
  console.error(`\nverify-http FAILED — ${failures.length} problem(s):`);
  for (const f of failures) console.error(`  ✗ ${f}`);
  process.exit(1);
}
console.log('\nverify-http PASSED — route control intact.');
