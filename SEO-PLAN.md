# SEO Plan — Aivium Digital

Working plan built from `keyword-map-site-copy.md` (Ahrefs, July 2026, USA/EN).
Sequencing follows the map's "window is closing" warning: the KD 5–20 / $12–20
CPC agency terms (GEO, AEO) harden as competitors ship dedicated pages, so
service pages and blog topics 1–4 ship before everything else.

---

## Phase 0 — Homepage on-page (DONE, this commit)

- Title tag → `Aivium Digital | AI SEO Agency, GEO & Custom AI Solutions`
  (brand-first per Steven's call; keeps the exact `ai seo agency` phrase and
  stays under the ~60-char truncation limit). WebSite/Organization JSON-LD
  added — **confirm production domain in the schema before launch**,
  currently assumes `aiviumdigital.com`.
- Convention going forward: every page title starts with `Aivium Digital |`.
  Budget the remaining ~40 chars for keywords accordingly.
- Meta description rewritten as a direct, quotable answer ("Aivium Digital
  is an AI SEO agency: …") per the AIO-citation guidance.
- Hero mirrors the live aiviumdigital.com pattern: a small eyebrow-styled
  H1 carrying the keyword ("AI SEO Agency"), a display-size hook line below
  it ("Be the answer in AI search."), and a definition-style lede that opens
  "Aivium Digital is the AI SEO agency that…" (the AIO-quotable opener).
  Keyword lands exact-match in both the H1 and the lede's first sentence.
- `ai seo company` variant placed in the systems lede (map: the two
  variants share a SERP — one in title, one in body).
- Visibility card now names "generative engine optimization (GEO)";
  Solutions card now says "custom AI solutions" / "AI agents and
  automations" (bridge to the `ai automation agency` cluster).

- Hero kicker is editorial copy, not a label: the H1 reads "The AI SEO
  agency for getting cited, not just ranked." in sentence case at body-
  adjacent size (mirrors the live site's kicker pattern). No mono/uppercase
  chips, brackets, dots, or hairlines anywhere new (Steven's rule).

Done in the July 26 pass:
- All five "[ Label ]" section chips removed (mission, systems, flow, loop
  caption, CTA); headlines now stand alone.
- Mission stats replaced with market-shift proof for the ICP: 800M+ weekly
  ChatGPT users, 60% zero-click searches, 4.4x AI-search conversion.
  **TODO: verify all three figures and cite sources on-page before launch**
  (sources noted in an HTML comment by the stats block).
- Client marquee reframed honestly: "Brands our team has worked with"
  (credits team experience, not Aivium client history).
- Systems cards rewritten benefit-first: Visibility leads with the buyer
  moment ("When buyers ask ChatGPT what to buy or who to hire...") and
  carries exact GEO + AEO terms; Solutions leads with "custom AI solutions"
  and busywork relief. CTAs are now "See how AI Visibility/AI Solutions
  works".
- Flight-path diagram rebuilt as an orthogonal system schematic (input
  port, junction split, two lanes, output block, dashed feedback return);
  planet/launch imagery removed. Mobile rail unchanged.

Added July 26, second pass:
- Diagram: chart header and growth tick-up removed (too on-the-nose for
  the ICP); node labels are now bordered chips, output is an accent block.
- Case study section (`#work`), Mixpanel-style featured panel.
  **TODO: placeholder client, stats, and quote must be replaced with a
  real case study before launch.**
- FAQ section (`#faq`) with FAQPage JSON-LD; questions target `what is
  generative engine optimization`, `geo vs seo`, `get mentioned by
  chatgpt`, and AI-visibility tracking clusters.
- CTA heading now "Ready to be the answer in ChatGPT?" / "We'll get you
  there."
- Footer added (services/company/contact columns).
  **TODO: confirm hello@aiviumdigital.com is real.**
- Nav anchors fixed: sections renamed to `#services` and `#process`;
  header nav is now Services / Process / Work / FAQ (Insights and About
  return when those pages exist).

Still open on the homepage:
- [ ] OG/social image (see `assets/PROMPTS.md` §2) + `og:` / `twitter:` tags.
- [ ] Real booking link for the CTA (currently `#contact` loop).
- [ ] Swap placeholder telemetry stats before launch.

## Phase 1 — Service pages (BUILT July 26; launch blockers listed below)

Both pages are live in the repo (`/ai-seo/index.html`,
`/ai-automation/index.html`) with Service + BreadcrumbList + FAQPage
schema, anchor jump-navs, cross-links, and homepage/footer links pointed
at them. Design: Mobbin-referenced (Trawelt numbered steps, basement
.studio deliverables grid, V7 transparent-pricing cards).

Launch blockers:
- Pricing section removed from /ai-automation/ per Steven (July 26);
  replaced with a no-figures "Know the cost before we build" block. The
  cost FAQ now answers qualitatively (fixed-price audit, exact quote).
  Note: the keyword map found cost-transparent pages win the SMB
  consulting SERPs, so revisit publishing real numbers when ready.
- [ ] /ai-seo/ cost FAQ still cites a "$2,500 per month" placeholder.
      Confirm the figure or strip it like the automation page.
- [x] Band images generated via Higgsfield (GPT Image 2, prompts in
      assets/PROMPTS.md §5) and shipped as WebP: assets/pages/
      geo-hero.webp (22KB) and automation-hero.webp (44KB).
- [ ] Root-relative links (/ai-seo/ etc.) require serving over HTTP;
      file:// clicking between pages won't resolve. Use a local server
      for full-site preview.
- Video: intentionally skipped on these pages; hero video would hurt LCP
  on exactly the pages that need to rank. Revisit for the case study.

### 1a. AI Visibility page — slug: `/ai-seo/`
Slug rationale: the page targets the whole cluster (`ai seo services` 4,200 ·
KD 11 is the biggest P1 term) and the map cites The AdFirm's single `/ai-seo/`
page ranking for three P1 terms. Nav label stays "AI Visibility".

- Title: `Aivium Digital | Generative Engine Optimization Services`
  (57 chars; the GEO/AEO agency variants move to H2s and meta description)
- H1 concept: "AI Visibility" framing (KD 38 term used as language, not target)
- Primary: `generative engine optimization services` (1,700 · KD 19)
- Secondary: `ai seo services`, `aeo services`, `geo agency`,
  `ai seo consultant`, `geo seo agency`, `aeo agency`
- Structure (mirrors the pages beating DR 80 sites):
  - Definition-style opener (1–2 sentences answering "what is GEO") for AIO
  - Anchor-linked sections: "What is GEO?" / "What a GEO agency does" /
    "Our GEO system" (earns sitelinks)
  - Dedicated **AEO section** — Marcel Digital pulls ~619 visits/mo from
    `aeo services` (KD 5) alone; spin out a standalone AEO page once this
    page ranks
  - FAQ block: What is GEO? · GEO vs SEO? · How do you get a brand cited by
    ChatGPT? · How do you rank in AI Overviews? (+ FAQPage schema)
- Beatable: Percepture (DR 36) holds #1–2, GreenBanana (DR 44) #3.

### 1b. AI Solutions page — slug: `/ai-automation/`
- Title: `Aivium Digital | AI Automation Agency & Custom AI Solutions` (59 chars)
- Primary: `ai automation agency` (3,300 · KD 7 — DR 9 site sits at #2)
- Secondary: `ai automation services`, `custom ai solutions`,
  `generative ai consulting` ($18 CPC — strongest buyer signal in the map),
  `ai automation consultant`, `ai integration services`
- Structure:
  - Buyer-intent copy only — part of this SERP serves people wanting to
    *start* an agency; lead with business outcomes ("automate your
    operations"), never the agency model
  - **SMB section** targeting `ai consulting for small businesses` (KD 2)
  - **Pricing / engagement-model section** — cost-transparent pages win the
    SMB consulting SERPs
  - Long-term H1 upgrade path: `ai consulting services` (8,500 · KD 45)
    once DR supports it
- FAQ: What does an AI automation agency do? · What does it cost? ·
  What can be automated in a small business?

### When both pages exist
- [ ] Point the two `system-card__link`s at them (TODOs already in
  `index.html`), replacing `#contact`.
- [ ] Add both to nav under Services (dropdown or direct links).
- [ ] Cross-link the pages to each other and back to the homepage.

## Phase 2 — Blog, first wave (topics 1–4 from the map)

1. **Best AI visibility tools** (KD 12, TP 6,900 — best ratio in dataset)
2. **Best AI consulting firms** — listicle, include Aivium
3. **How to rank in ChatGPT** — fold in cited/mentioned/recommended variants
4. **GEO vs SEO** (4,700 combined) — link hard into `/ai-seo/`

Every post: definition-style opener, internal link to its money page
(column "target page" in the map).

## Phase 3 — Blog, second wave

Topics 5–10 (best AI agents for business, GEO tools, AI Overviews ranking +
tracking, AEO vs SEO, track your brand in AI search, AI automation for SMB
costs) plus P2 secondaries: `llm seo` pillar (fold in `llm optimization`),
`chatgpt seo`, `perplexity seo`, AI automation companies listicle.

## Phase 4 — P3 pillars (don't lead with these)

`generative engine optimization`, `answer engine optimization`,
`ai consulting`, `ai search optimization`, etc. — DR 70–90+ SERPs. Build as
pillars that internally link to the money pages; no page-1 expectation in
year one.

## Conventions (apply to every page)

- No em dashes in site copy. Use commas, colons, or split the sentence.
- Hero/display headlines: the hero column is 640px at ~70px type, so keep
  headlines under ~35 characters or control the break explicitly.

- Open with a 1–2 sentence direct answer to the target query — every SERP
  in this niche shows an AI Overview; quotable openers earn citations.
- One page holds one keyword cluster; don't split `agency`/`services`/
  `company` variants across pages.
- Track in GSC + share-of-answer tooling once live; revisit the keyword map
  quarterly (the niche is young and volumes move fast).
