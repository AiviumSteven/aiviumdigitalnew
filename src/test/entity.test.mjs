import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/*
 * Regression guard for the 2026-08-01 author-graph change: the canonical
 * home of the Steven W. Mills Person entity is stevenwmills.com — this
 * site must only ever embed STUBS pointing at that @id. A second full
 * Person node (jobTitle/description/knowsAbout on a local #steven-mills
 * @id) reintroduces the dual-entity ambiguity the personal site exists
 * to kill, without breaking any page render — hence source-level checks.
 */
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const read = (p) => readFileSync(path.join(ROOT, p), 'utf8');

const CANONICAL_ID = 'https://stevenwmills.com/#person';

describe('authors.ts entity contract', () => {
  const src = read('src/data/authors.ts');

  it('anchors Steven on the canonical cross-site @id', () => {
    assert.ok(src.includes(`personId: '${CANONICAL_ID}'`));
    assert.ok(src.includes("personUrl: 'https://stevenwmills.com/'"));
  });

  it('uses the disambiguation handle with the middle initial', () => {
    assert.ok(src.includes("name: 'Steven W. Mills'"));
    assert.ok(!/name: 'Steven Mills'/.test(src));
  });

  it('corroborates the entity home in sameAs', () => {
    assert.ok(src.includes("'https://stevenwmills.com/'"));
  });
});

describe('exactly one full Person network-wide', () => {
  for (const page of ['src/pages/about-steven.astro', 'src/pages/signals/[slug].astro']) {
    it(`${page} embeds stubs, not a local full Person node`, () => {
      const src = read(page);
      assert.ok(src.includes('personStub('), `${page} must use personStub()`);
      assert.ok(
        !src.includes('`${site}/#${author.id}`'),
        `${page} still declares or references a LOCAL person @id`,
      );
      // A full Person is one carrying identity prose; stubs never do.
      assert.ok(
        !src.includes('description: author.bio'),
        `${page} re-grew a full Person node (bio in JSON-LD)`,
      );
      assert.ok(!src.includes('knowsAbout'), `${page} re-grew a full Person node (knowsAbout)`);
    });
  }
});
