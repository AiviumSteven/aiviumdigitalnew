import { describe, it, expect, vi } from 'vitest';

/*
 * astro:content is a virtual module that only exists inside an Astro
 * build, so the mock stands in for it: getCollection applies the caller's
 * filter over a fixture list, exactly like the real loader would.
 */
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

vi.mock('astro:content', () => ({
  getCollection: vi.fn(async (_name: string, filter?: (e: unknown) => boolean) =>
    filter ? FIXTURES.filter(filter) : FIXTURES,
  ),
}));

const { getFieldNotes, getFieldNoteRefs } = await import('../lib/fieldNotes');

describe('getFieldNotes', () => {
  it('excludes drafts', async () => {
    const notes = await getFieldNotes();
    expect(notes.map((n) => n.id)).not.toContain('draft-note');
    expect(notes).toHaveLength(2);
  });

  it('sorts newest first', async () => {
    const notes = await getFieldNotes();
    expect(notes.map((n) => n.id)).toEqual(['newer-note', 'older-note']);
  });
});

describe('getFieldNoteRefs', () => {
  it('maps entries to refs with ISO dates and updatedAt passthrough', async () => {
    const refs = await getFieldNoteRefs();
    expect(refs[0]).toEqual({
      slug: 'newer-note',
      title: 'Newer note',
      excerpt: 'Fresh telemetry.',
      publishedAt: '2026-07-15T00:00:00.000Z',
      updatedAt: '2026-07-20T00:00:00.000Z',
    });
    expect(refs[1].updatedAt).toBeNull();
  });
});
