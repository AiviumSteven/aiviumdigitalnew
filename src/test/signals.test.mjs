import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { publishable, toRefs } from '../lib/signalsCore.mjs';

const FIXTURES = [
  {
    id: 'older-note',
    data: {
      title: 'Older note',
      excerpt: 'The first field note.',
      publishedAt: new Date('2026-06-01T00:00:00.000Z'),
      updatedAt: undefined,
      draft: false,
    },
  },
  {
    id: 'draft-note',
    data: {
      title: 'Unfinished note',
      excerpt: 'Never ships.',
      publishedAt: new Date('2026-08-01T00:00:00.000Z'),
      updatedAt: undefined,
      draft: true,
    },
  },
  {
    id: 'newer-note',
    data: {
      title: 'Newer note',
      excerpt: 'Fresh telemetry.',
      publishedAt: new Date('2026-07-15T00:00:00.000Z'),
      updatedAt: new Date('2026-07-20T00:00:00.000Z'),
      draft: false,
    },
  },
];

describe('publishable', () => {
  it('excludes drafts', () => {
    const notes = publishable(FIXTURES);
    assert.ok(!notes.some((n) => n.id === 'draft-note'));
    assert.equal(notes.length, 2);
  });

  it('sorts newest first', () => {
    assert.deepEqual(
      publishable(FIXTURES).map((n) => n.id),
      ['newer-note', 'older-note'],
    );
  });

  it('does not mutate its input', () => {
    const before = FIXTURES.map((f) => f.id);
    publishable(FIXTURES);
    assert.deepEqual(FIXTURES.map((f) => f.id), before);
  });
});

describe('toRefs', () => {
  it('maps entries to refs with ISO dates and updatedAt passthrough', () => {
    const refs = toRefs(publishable(FIXTURES));
    assert.deepEqual(refs[0], {
      slug: 'newer-note',
      title: 'Newer note',
      excerpt: 'Fresh telemetry.',
      publishedAt: '2026-07-15T00:00:00.000Z',
      updatedAt: '2026-07-20T00:00:00.000Z',
    });
    assert.equal(refs[1].updatedAt, null);
  });
});
