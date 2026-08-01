---
# Copy this file to a new name (the filename becomes the URL slug,
# e.g. share-of-answer-explained.md →
# aiviumdigital.com/signals/share-of-answer-explained/),
# fill in the frontmatter, delete these comments, and set draft: false
# when it's ready. Underscore-prefixed files are never published.
title: 'Post title, also the H1 and browser-tab title'
excerpt: 'One or two sentences shown on the index and as the meta description. 280 characters max. This is what makes people click.'
publishedAt: 2026-08-01
draft: true
# Optional hero image, processed by Astro (responsive sizes, compression,
# no layout shift) and reused as this post's og:image. Store it in
# src/assets/signals/<slug>/ and reference it RELATIVE to this file:
#   image: ../../assets/signals/my-post/hero.png
#   imageAlt: 'What the image shows (required whenever image is set)'
# public/ is reserved for the sitewide OG image and favicons — post
# images never go there (they'd skip Astro's optimization pipeline).
---

Open with the direct, liftable answer to the question this post exists for,
in the first paragraph. AI engines quote openings.

## Use h2 for sections

Normal markdown works: **bold**, *italic*, [links](https://aiviumdigital.com),
lists, quotes, and code blocks. Body images also live in
`src/assets/signals/<slug>/` and are referenced relative to this file so
Astro optimizes them: `![alt text](../../assets/signals/my-post/chart.png)`.
