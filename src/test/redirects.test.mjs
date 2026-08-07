import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  resolveSeoRoute,
  REDIRECT_MAP,
  GONE_PATHS,
  astroRedirects,
} from '../seo/redirects.mjs';

/*
 * Migration-recovery contract (AIVIUM_DIGITAL_SEO_GEO_IMPLEMENTATION_BRIEF):
 * every known legacy URL resolves in ONE hop to a canonical slashed
 * destination; retired content is a real 410; unknown bare paths
 * normalize to their slashed canonical; /api/* is never redirected.
 */

const redirect = (path) => {
  const v = resolveSeoRoute(path);
  assert.equal(v?.kind, 'redirect', `${path} should redirect`);
  return v;
};

describe('legacy one-hop redirect map', () => {
  const cases = {
    '/services/search-visibility/': '/ai-seo/',
    '/services/google-business-profile/': '/industries/home-services/',
    '/services/paid-ads/': '/services/',
    '/services/websites/': '/services/',
    '/services/tracking-reporting/': '/ai-seo/',
    '/services/lead-generation/': '/services/',
    '/local-seo': '/ai-seo/',
    '/local-seo/': '/ai-seo/',
    '/ai-visibility': '/ai-seo/',
    '/ai-visibility/': '/ai-seo/',
    '/home-services/': '/industries/home-services/',
    '/roofing/': '/industries/home-services/',
    '/hvac/': '/industries/home-services/',
    '/plumbing/': '/industries/home-services/',
    '/electrical/': '/industries/home-services/',
    '/landscaping/': '/industries/home-services/',
    '/fencing/': '/industries/home-services/',
    '/field-notes/': '/signals/',
    '/audit': '/ai-visibility-audit/',
    '/audit/': '/ai-visibility-audit/',
  };
  for (const [from, to] of Object.entries(cases)) {
    it(`${from} → 301 ${to}`, () => {
      const v = redirect(from);
      assert.equal(v.to, to);
      assert.equal(v.status, 301);
    });
  }

  it('every mapped destination is slash-canonical (one hop, no chain)', () => {
    for (const to of REDIRECT_MAP.values()) {
      assert.ok(to.endsWith('/'), `${to} must end in a slash`);
      assert.equal(resolveSeoRoute(to), null, `${to} must not itself redirect`);
    }
  });

  it('field-notes posts map one-to-one onto signals slugs', () => {
    assert.deepEqual(redirect('/field-notes/ai-search-decision-making-2026/'), {
      kind: 'redirect',
      to: '/signals/ai-search-decision-making-2026/',
      status: 301,
    });
    // Unslashed variant still lands on the canonical URL in one hop.
    assert.equal(redirect('/field-notes/some-post').to, '/signals/some-post/');
  });

  it('field-notes taxonomy archives land on the signals hub in one hop', () => {
    for (const path of [
      '/field-notes/tag/ai-seo',
      '/field-notes/tag/ai-seo/',
      '/field-notes/category/strategy',
      '/field-notes/category/strategy/',
      '/field-notes/page/2',
      '/field-notes/page/2/',
      // Bare taxonomy roots and nested paginated archives too.
      '/field-notes/tag',
      '/field-notes/category/',
      '/field-notes/tag/ai-seo/page/3/',
    ]) {
      assert.deepEqual(
        resolveSeoRoute(path),
        { kind: 'redirect', to: '/signals/', status: 301 },
        path,
      );
    }
  });

  it('taxonomy interception never swallows real post slugs', () => {
    assert.equal(redirect('/field-notes/tagging-strategies').to, '/signals/tagging-strategies/');
    assert.equal(redirect('/field-notes/page-speed-basics/').to, '/signals/page-speed-basics/');
  });
});

describe('retired content returns 410', () => {
  for (const path of [
    '/industries/restaurants',
    '/industries/restaurants/',
    '/beyond-the-algorithm',
    '/beyond-the-algorithm/',
  ]) {
    it(`${path} → gone`, () => {
      assert.deepEqual(resolveSeoRoute(path), { kind: 'gone' });
    });
  }
  it('gone paths never appear in the redirect map', () => {
    for (const p of GONE_PATHS) assert.ok(!REDIRECT_MAP.has(p));
  });
});

describe('trailing-slash canonicalization', () => {
  it('bare page paths 301 to their slashed canonical', () => {
    assert.deepEqual(resolveSeoRoute('/services'), {
      kind: 'redirect',
      to: '/services/',
      status: 301,
    });
    assert.equal(redirect('/ai-seo').to, '/ai-seo/');
    assert.equal(redirect('/about-steven').to, '/about-steven/');
    assert.equal(redirect('/signals/some-post').to, '/signals/some-post/');
  });

  it('canonical and file-like paths pass through untouched', () => {
    for (const p of [
      '/',
      '/services/',
      '/ai-seo/',
      '/robots.txt',
      '/sitemap.xml',
      '/llms.txt',
      '/assets/og-image.jpg',
      '/styles/main.css',
    ]) {
      assert.equal(resolveSeoRoute(p), null, `${p} must pass through`);
    }
  });

  it('API routes are exempt (POST /api/lead must never bounce)', () => {
    assert.equal(resolveSeoRoute('/api/lead'), null);
    assert.equal(resolveSeoRoute('/api/lead/'), null);
  });
});

describe('astro config parity', () => {
  it('config redirects mirror the legacy map with 301s', () => {
    const config = astroRedirects();
    for (const [from, entry] of Object.entries(config)) {
      assert.equal(entry.status, 301);
      assert.equal(REDIRECT_MAP.get(from), entry.destination, from);
    }
  });
});
