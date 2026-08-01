/**
 * Field Notes source: markdown authored in src/content/field-notes/ —
 * the only post channel. Thin Astro adapter over fieldNotesCore.mjs
 * (the pure logic lives there so node --test can cover it without an
 * Astro build). Mirrors aivium-nexus's src/lib/insights.ts.
 */
import { getCollection, type CollectionEntry } from 'astro:content';
import { publishable, toRefs } from './fieldNotesCore.mjs';

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
  return publishable(await getCollection('fieldNotes')) as FieldNoteEntry[];
}

/** Newest-first refs for the /field-notes/ index, sitemap, and llms.txt. */
export async function getFieldNoteRefs(): Promise<FieldNoteRef[]> {
  return toRefs(await getFieldNotes()) as FieldNoteRef[];
}
