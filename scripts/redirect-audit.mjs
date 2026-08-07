#!/usr/bin/env node
/**
 * redirect-audit — audits the live redirect contract for every legacy URL
 * in the SEO brief, BOTH slash forms of each, and prints a markdown table:
 * source, initial status, first destination, final status, hop count, and
 * the canonical URL of the final 200 page.
 *
 *   node scripts/redirect-audit.mjs                     # audits production
 *   node scripts/redirect-audit.mjs http://127.0.0.1:4873  # audits a local server
 *
 * Exits non-zero if any legacy URL breaks the contract:
 *   - a mapped legacy URL must 301/308 in exactly one hop,
 *   - its destination must return 200 with a matching self-canonical,
 *   - retired routes must return 410 directly,
 *   - no legacy URL with an intended replacement may 404.
 */

const BASE = (process.argv[2] ?? 'https://aiviumdigital.com').replace(/\/$/, '');
const MAX_HOPS = 5;

/** Legacy bases from the brief's map — audited in BOTH slash forms. */
const LEGACY_BOTH_FORMS = [
  ['/services/search-visibility', '/ai-seo/'],
  ['/services/google-business-profile', '/industries/home-services/'],
  ['/services/paid-ads', '/services/'],
  ['/services/websites', '/services/'],
  ['/services/tracking-reporting', '/ai-seo/'],
  ['/services/lead-generation', '/services/'],
  ['/local-seo', '/ai-seo/'],
  ['/ai-visibility', '/ai-seo/'],
  ['/home-services', '/industries/home-services/'],
  ['/roofing', '/industries/home-services/'],
  ['/hvac', '/industries/home-services/'],
  ['/plumbing', '/industries/home-services/'],
  ['/electrical', '/industries/home-services/'],
  ['/landscaping', '/industries/home-services/'],
  ['/fencing', '/industries/home-services/'],
  ['/field-notes', '/signals/'],
  // Discovered legacy Field Notes posts (slugs unchanged in the Signals rename).
  ['/field-notes/ai-search-decision-making-2026', '/signals/ai-search-decision-making-2026/'],
  ['/field-notes/best-ai-visibility-tools', '/signals/best-ai-visibility-tools/'],
  // Legacy Field Notes taxonomy archives — no taxonomy on /signals/, so the hub.
  ['/field-notes/tag/ai-seo', '/signals/'],
  ['/field-notes/category/strategy', '/signals/'],
  ['/field-notes/page/2', '/signals/'],
  // Shorthand audit route from old campaigns.
  ['/audit', '/ai-visibility-audit/'],
];

/** Bare-path canonicalization the brief also requires (one hop). */
const CANONICALIZED = [['/services', '/services/']];

/** Retired routes: a real 410 in both forms, no redirect. */
const GONE_BOTH_FORMS = ['/industries/restaurants', '/beyond-the-algorithm'];

const rows = [];
const failures = [];

async function follow(sourcePath) {
  const chain = [];
  let url = `${BASE}${sourcePath}`;
  let res;
  for (let hop = 0; hop <= MAX_HOPS; hop++) {
    res = await fetch(url, { redirect: 'manual', headers: { 'User-Agent': 'aivium-redirect-audit' } });
    if (res.status < 300 || res.status >= 400) break;
    const loc = res.headers.get('location');
    if (!loc) break;
    chain.push({ status: res.status, location: loc });
    url = new URL(loc, url).href;
  }
  let canonical = '—';
  if (res.status === 200 && (res.headers.get('content-type') ?? '').includes('text/html')) {
    const html = await res.text();
    canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1] ?? 'MISSING';
  }
  return {
    source: sourcePath,
    initialStatus: chain[0]?.status ?? res.status,
    destination: chain[0]?.location ?? '—',
    finalStatus: res.status,
    finalUrl: url,
    hops: chain.length,
    canonical,
  };
}

function audit(r, { expectDest = null, expectGone = false } = {}) {
  rows.push(r);
  const tag = `${r.source}`;
  if (expectGone) {
    if (r.finalStatus !== 410 || r.hops !== 0) failures.push(`${tag}: expected direct 410, got ${r.initialStatus} → ${r.finalStatus} in ${r.hops} hop(s)`);
    return;
  }
  if (![301, 308].includes(r.initialStatus)) failures.push(`${tag}: expected 301/308, got ${r.initialStatus}`);
  if (r.hops !== 1) failures.push(`${tag}: expected exactly one hop, got ${r.hops}`);
  if (expectDest && new URL(r.destination, BASE).pathname !== expectDest) failures.push(`${tag}: expected destination ${expectDest}, got ${r.destination}`);
  if (r.finalStatus !== 200) failures.push(`${tag}: final destination returned ${r.finalStatus}`);
  if (expectDest && r.canonical !== `https://aiviumdigital.com${expectDest}`) failures.push(`${tag}: canonical is ${r.canonical}, expected https://aiviumdigital.com${expectDest}`);
}

console.log(`Auditing ${BASE} …\n`);

for (const [base, dest] of LEGACY_BOTH_FORMS) {
  for (const form of [base, `${base}/`]) audit(await follow(form), { expectDest: dest });
}
for (const [from, dest] of CANONICALIZED) audit(await follow(from), { expectDest: dest });
for (const base of GONE_BOTH_FORMS) {
  for (const form of [base, `${base}/`]) audit(await follow(form), { expectGone: true });
}

console.log('| Source URL | Initial status | Destination | Final status | Hops | Canonical of final page |');
console.log('|---|---|---|---|---|---|');
for (const r of rows) {
  console.log(`| \`${r.source}\` | ${r.initialStatus} | \`${r.destination}\` | ${r.finalStatus} | ${r.hops} | \`${r.canonical}\` |`);
}

if (failures.length) {
  console.error(`\nredirect-audit FAILED — ${failures.length} problem(s):`);
  for (const f of failures) console.error(`  ✗ ${f}`);
  process.exit(1);
}
console.log(`\nredirect-audit PASSED — ${rows.length} URL forms, every legacy URL lands on its canonical in one hop.`);
