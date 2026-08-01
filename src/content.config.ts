import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Signals posts authored as markdown in this repo. Publishing = merge
 * a .md file + deploy (see src/content/signals/_template.md for the
 * authoring contract). Underscore-prefixed files are never published.
 *
 * The frontmatter contract matches aivium-nexus's insights collection —
 * the /publish-post skill targets both sites with the same shape.
 */
const signals = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/signals' }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        excerpt: z.string().max(280),
        publishedAt: z.coerce.date(),
        updatedAt: z.coerce.date().optional(),
        draft: z.boolean().default(false),
        // Key into src/data/authors.ts — the page render fails the build
        // on an unknown id, so bylines can't silently break.
        author: z.string().default('steven-mills'),
        // Optional Q&A section: rendered after the body and emitted as
        // FAQPage JSON-LD. Add only questions the post genuinely answers.
        faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
        // Optional hero, processed by astro:assets: shown above the body,
        // reused as the post's og:image (sitewide og-image.jpg fallback).
        image: image().optional(),
        imageAlt: z.string().optional(),
      })
      .refine((d) => !d.image || (d.imageAlt && d.imageAlt.length > 0), {
        message: 'imageAlt is required when image is set (alt text is not optional)',
        path: ['imageAlt'],
      }),
});

export const collections = { signals };
