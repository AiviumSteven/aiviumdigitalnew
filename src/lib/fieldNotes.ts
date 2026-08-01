/**
 * Field Notes source: markdown authored in src/content/field-notes/ —
 * the only post channel. Mirrors aivium-nexus's src/lib/insights.ts.
 */
import { getCollection, type CollectionEntry } from 'astro:content';

export type FieldNoteEntry = CollectionEntry<'fieldNotes'>;

/** Common listing shape for the index page. */
export interface FieldNoteRef {
  slug: string;
  title: string;
  excerpt: string | null;
  publishedAt: string | null;
  updatedAt: string | null;
}

export async function getFieldNotes(): Promise<FieldNoteEntry[]> {
  return (await getCollection('fieldNotes', ({ data }) => !data.draft)).sort((a, b) =>
    b.data.publishedAt.toISOString().localeCompare(a.data.publishedAt.toISOString())
  );
}

/** Newest-first refs for the /field-notes/ index, sitemap, and llms.txt. */
export async function getFieldNoteRefs(): Promise<FieldNoteRef[]> {
  return (await getFieldNotes()).map((e) => ({
    slug: e.id,
    title: e.data.title,
    excerpt: e.data.excerpt,
    publishedAt: e.data.publishedAt.toISOString(),
    updatedAt: e.data.updatedAt?.toISOString() ?? null,
  }));
}
