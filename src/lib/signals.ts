/**
 * Signals source: markdown authored in src/content/signals/ — the only
 * post channel. Thin Astro adapter over signalsCore.mjs (the pure logic
 * lives there so node --test can cover it without an Astro build).
 * Mirrors aivium-nexus's src/lib/insights.ts.
 */
import { getCollection, type CollectionEntry } from 'astro:content';
import { publishable, toRefs } from './signalsCore.mjs';

export type SignalEntry = CollectionEntry<'signals'>;

/** Common listing shape for the index page. */
export interface SignalRef {
  slug: string;
  title: string;
  excerpt: string | null;
  publishedAt: string | null;
  updatedAt: string | null;
}

export async function getSignals(): Promise<SignalEntry[]> {
  return publishable(await getCollection('signals')) as SignalEntry[];
}

/** Newest-first refs for the /signals/ index, sitemap, and llms.txt. */
export async function getSignalRefs(): Promise<SignalRef[]> {
  return toRefs(await getSignals()) as SignalRef[];
}
