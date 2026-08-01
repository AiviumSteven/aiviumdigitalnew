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
}

export const AUTHORS: Record<string, Author> = {
  'steven-mills': {
    name: 'Steven Mills',
    role: 'Founder, Aivium Digital',
    bio:
      'Steven Mills is the founder of Aivium and Aivium Digital, where he ' +
      'helps small and mid-size businesses get found and cited by AI ' +
      'search. He works hands-on across every engagement: answer audits, ' +
      'entity engineering, and the content that earns citations from ' +
      'ChatGPT, Claude, Gemini, Perplexity, Copilot, and Google AI Overviews.',
    initials: 'SM',
    image: stevenMills,
    portrait: stevenMillsPortrait,
    sameAs: ['https://www.linkedin.com/in/stevenwmills/'],
    page: '/about-steven/',
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
