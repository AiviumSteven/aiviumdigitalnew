import type { ImageMetadata } from 'astro';
import stevenMills from '../assets/authors/steven-mills.jpg';
import stevenMillsPortrait from '../assets/authors/steven-mills-portrait.jpg';

/**
 * Post authors — the E-E-A-T layer. Every Signals post carries an
 * `author` frontmatter key that must exist here; the build fails on an
 * unknown id, so a byline can never silently break.
 *
 * Adding an author: add an entry, and (when there's a headshot) drop it
 * in src/assets/authors/ and import it — the byline and bio box use a
 * monogram fallback until `image` is set. `sameAs` (LinkedIn etc.)
 * feeds the Person JSON-LD; add profiles as they exist.
 */
export interface Author {
  name: string;
  role: string;
  /**
   * The canonical bio — this exact text appears verbatim in the byline
   * bio box, the author page, and Person JSON-LD. Entity consistency
   * is the point: edit it HERE only, never inline on a page.
   */
  bio: string;
  /** Initials for the monogram fallback avatar. */
  initials: string;
  /** Headshot (astro:assets). Optional until a photo exists. */
  image?: ImageMetadata;
  /** Larger portrait for the author page (falls back to image). */
  portrait?: ImageMetadata;
  /** PERSONAL profile URLs (LinkedIn, X, …) for Person JSON-LD sameAs. */
  sameAs: string[];
  /** Author page path on this site (Person JSON-LD url), if one exists. */
  page?: string;
  /**
   * Canonical cross-site Person @id — the entity home. Since 2026-08-01
   * the full Person node for Steven lives ONLY on stevenwmills.com; this
   * site embeds stubs pointing there (never a bare cross-domain @id, and
   * never a second full Person node — that reintroduces the dual-entity
   * ambiguity the personal site exists to kill).
   */
  personId: string;
  /** The entity-home URL the stub's url field carries. */
  personUrl: string;
}

/** Embedded Person stub for JSON-LD author/founder references. */
export function personStub(author: Author) {
  return {
    '@type': 'Person',
    '@id': author.personId,
    name: author.name,
    url: author.personUrl,
  } as const;
}

export const AUTHORS: Record<string, Author> = {
  'steven-mills': {
    name: 'Steven W. Mills',
    role: 'Founder & CEO, Aivium Digital',
    bio:
      'Steven W. Mills is the founder and CEO of Aivium and Aivium Digital. ' +
      'A digital marketer for over a decade, specialized in AI since 2022, ' +
      'he helps established businesses get found and cited by AI search: ' +
      'ChatGPT, Claude, Gemini, Perplexity, Copilot, and Google AI ' +
      'Overviews. He also builds the AI solutions that make those ' +
      'businesses run more efficiently, working hands-on from answer ' +
      'audits to entity engineering and custom automation.',
    initials: 'SM',
    image: stevenMills,
    portrait: stevenMillsPortrait,
    sameAs: ['https://stevenwmills.com/', 'https://www.linkedin.com/in/stevenwmills/'],
    page: '/about-steven/',
    personId: 'https://stevenwmills.com/#person',
    personUrl: 'https://stevenwmills.com/',
  },
};

export function getAuthor(id: string): Author & { id: string } {
  const author = AUTHORS[id];
  if (!author) {
    throw new Error(
      `Unknown author "${id}" — add an entry to src/data/authors.ts or fix the post frontmatter.`,
    );
  }
  return { id, ...author };
}
