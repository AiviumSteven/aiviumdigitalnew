# SEO/GEO Implementation Report — aiviumdigital.com

**Date:** August 5, 2026
**Executed from:** `AIVIUM_DIGITAL_SEO_GEO_IMPLEMENTATION_BRIEF.md` (P0 complete; P1 complete)

> **2026-08-05 owner Q&A (same day, after the first pass):** Steven answered
> the open questions; the resolved items below are marked **[RESOLVED]** in
> §10 and the changes are already applied. Highlights: legal name is
> **Aivium Digital LLC** (now in schema); the free AI audit is operationally
> a **discovery call** today, so every CTA became "Book a discovery call"
> and /ai-visibility-audit/ was reframed (call free, baseline = first
> engagement deliverable); legacy channels (paid ads, websites, reputation,
> lead gen) **are still offered inside broader scopes** and /services/ now
> says so; `/beyond-the-algorithm` was a never-launched placeholder → now
> **410** instead of a redirect; home services is targeted as **one
> category** (no per-trade child pages planned); **GA4 implemented** with
> ID G-F4KTW1YDCM (see §8); GSC is verified and the post-deploy steps live
> in `docs/post-deploy-search-runbook.md`.

---

## 0. Phase 0 audit findings (repository and production)

- **Framework:** Astro 7.1.3, `@astrojs/node` v11 adapter, `mode: "standalone"`.
- **Rendering:** every page prerendered at build time (full HTML in `dist/client/`); one on-demand endpoint, `POST /api/lead` (Attio lead relay, `prerender = false`).
- **Hosting:** Docker container on a VPS behind Caddy (`/opt/caddy`). Caddy already canonicalizes hostname/scheme: `http→https` 308, `www→apex` 301. (`http://www.` is a two-hop edge chain; see Owner actions §10.)
- **Metadata:** centralized in `src/layouts/BaseLayout.astro` (title, description, canonical, OG, Twitter, robots). Already enforced per-page by `scripts/verify-dist.mjs` at build time.
- **Sitemap:** built at `src/pages/sitemap.xml.ts`. **Robots:** `public/robots.txt`. **llms.txt:** `src/pages/llms.txt.ts`.
- **Schema:** JSON-LD per page; Person entity home is `https://stevenwmills.com/#person` (2026-08-01 author-graph decision, enforced by `src/test/entity.test.mjs`) — this deliberately supersedes the brief's example `#steven-mills` local `@id`.
- **Analytics:** none present (no GA4/GTM/pixels). Nothing was added; see §8.
- **Forms:** discovery quiz (`/discovery/`, noindex) → `POST /api/lead` → Attio; Calendly embed on the final step.
- **Legacy content:** the repository is a clean rebuild. **Zero** occurrences of the old phone number `240-310-9772`, restaurant content, home-services copy, or legacy service pages exist in source. All legacy URLs live only in search indexes and the retired Next.js deployment (`/opt/aivium-site`, stopped/disconnected from the proxy).
- **Pre-change production baseline (captured 2026-08-05, before this deploy):**
  - `/` 200 · `/ai-seo` **and** `/ai-seo/` both 200 (duplicate-200 slash issue confirmed)
  - `/services`, `/services/`, `/ai-visibility/`, `/local-seo/`, `/landscaping/`, `/roofing/`, `/home-services/`, `/industries/restaurants` → all 404 (no redirects)
  - `/field-notes/` → 301 `/signals/` (only existing redirect)
  - `robots.txt`, `sitemap.xml` → 200

## 1. Files changed

**New infrastructure**
- `src/seo/redirects.mjs` — single source of truth: legacy redirect map, 410 list, trailing-slash policy (`resolveSeoRoute()`).
- `server.mjs` — production entrypoint: one-hop 301s, real 410s, trailing-slash canonicalization in front of the Astro handler.
- `src/data/company.ts` — company identity single source of truth (phone, email, brand facts). Deliberately excludes legal name/address/hours pending owner confirmation.
- `src/lib/schema.ts` — shared JSON-LD graph builders (`orgNode`, `webSiteNode`, `webPageNode`, `serviceNode`, `breadcrumbNode`).
- `src/components/Breadcrumbs.astro` — visible breadcrumb trail (pages emit matching `BreadcrumbList`).
- `scripts/verify-http.mjs` — HTTP contract gate (runs in `npm run verify`, so in the Docker build).
- `src/test/redirects.test.mjs` — 28 redirect/410/slash contract tests.

**Modified**
- `astro.config.mjs` (config redirects generated from the shared map), `Dockerfile` (+`server.mjs` entrypoint), `package.json` (`start`, `verify`), `DEPLOY.md`, `public/robots.txt`, `public/styles/main.css` (in-copy link styles, disclosure/reviewed-by/list styles, nav breakpoints for six links), `scripts/verify-dist.mjs` (all 15 routes gated), `src/pages/sitemap.xml.ts`, `src/pages/llms.txt.ts`, `src/pages/404.astro`, `src/components/SiteNav.astro`, `src/components/SiteFooter.astro`, `src/pages/index.astro`, `src/pages/ai-seo.astro`, `src/pages/ai-automation.astro`.
- (Pre-existing uncommitted work preserved: `src/data/authors.ts`, `src/pages/about-steven.astro`, `src/pages/signals/[slug].astro`, `src/test/entity.test.mjs` — the stevenwmills.com entity-home change.)

## 2. Routes added (all prerendered, slash-canonical, self-canonical, in sitemap)

| Route | Purpose |
|---|---|
| `/services/` | Services hub (launch-critical; legacy `/services` history) |
| `/industries/home-services/` | Home-services vertical hub; destination for six legacy trade URLs |
| `/ai-visibility-audit/` | Audit conversion landing page (CTA into existing `/discovery/` funnel) |
| `/process/` | Standalone process page (nav "Process" no longer points at a homepage anchor) |
| `/about/` | Company entity page (separate from founder profile) |
| `/case-studies/` | Case-study hub with honest empty state + visible publication standard |
| `/locations/maryland/` | Primary regional page |
| `/locations/hagerstown-md/` | Hagerstown/Western Maryland page |
| `/privacy/` | Privacy policy written from the actual data flows (quiz→Attio, Calendly, no analytics) — flag for owner/legal review |

## 3. Redirects implemented (one hop, 301, both slash variants)

Served by `server.mjs` in production; mirrored in `astro.config.mjs` for dev/preview.

| Legacy | Destination |
|---|---|
| `/services` | `/services/` (slash normalization) |
| `/services/search-visibility(/)` | `/ai-seo/` |
| `/services/google-business-profile(/)` | `/industries/home-services/` |
| `/services/paid-ads(/)`, `/services/websites(/)`, `/services/lead-generation(/)` | `/services/` |
| `/services/tracking-reporting(/)` | `/ai-seo/` |
| `/local-seo(/)`, `/ai-visibility(/)` | `/ai-seo/` |
| `/home-services(/)`, `/roofing(/)`, `/hvac(/)`, `/plumbing(/)`, `/electrical(/)`, `/landscaping(/)`, `/fencing(/)` | `/industries/home-services/` |
| `/field-notes(/)` | `/signals/` |
| `/field-notes/<slug>` | `/signals/<slug>/` (one-to-one, slug preserved) |
| any bare extension-less path | its slashed canonical, one hop (`/ai-seo` → `/ai-seo/`) |

Query strings are preserved on all redirects. `/api/*` is exempt from slash normalization (the quiz `POST /api/lead` is never bounced).

**Trade child pages** (roofing/HVAC/etc.) were deliberately **not** created: per the brief, redirecting to a robust hub beats publishing six thin city/trade-swapped pages. Substantive trade pages are P2.

## 4. Routes retired

- `/industries/restaurants(/)` → **410 Gone** (restaurant marketing confirmed fully retired, owner 2026-08-05).
- `/beyond-the-algorithm(/)` → **410 Gone** (owner confirmed it was a placeholder for a community that never launched; no relevant replacement, so the earlier redirect-to-/about-steven/ guess was replaced with a 410).
- Both serve a small branded noindex 410 body via `server.mjs`, are absent from nav and sitemap; in `astro dev` they fall through to 404 (acceptable dev-only behavior).
- Unknown routes return the branded 404 page with a real 404 status.

## 5. Technical SEO changes

- **Canonical policy:** one hostname (`https://aiviumdigital.com`), HTTPS only, trailing-slash canonical, enforced with one-hop 301s at the app server. Every indexable page emits an absolute self-canonical (build-gated).
- **robots.txt:** added explicit `OAI-SearchBot` allowance (distinct from GPTBot; per OpenAI bot docs); still references the sitemap; only `/styleguide.html` disallowed.
- **Sitemap:** now 16 URLs — all canonical slash-terminated 200 pages (9 new routes added, `lastmod` 2026-08-05). Excludes `/discovery/` (noindex), redirects, and the 410 route. Build gate verifies every sitemap URL exists in dist and returns 200.
- **404 page:** now links Services, AI Visibility, AI Solutions, Signals, Discovery; still returns 404.
- **Navigation:** primary nav is now AI Visibility / AI Solutions / Services / Process / Signals / About + one CTA. CTA language unified sitewide to **"Book a discovery call"** (owner confirmed the audit deliverable is not yet operational, so per the brief the discovery-call wording is the honest variant; switch back to "Book a free AI audit" sitewide once the audit is a real defined free deliverable). Nav breakpoints reworked for six links (overlay menu below 1100px; compact bar 1100–1279px) with no overflow at 768/900/1024/1100/1150/1280/1440 (measured).
- **Footer:** crawlable `<a>` links to all 14 brief-required destinations + phone + email (`hello@aiviumdigital.com`, from the canonical listing kit) + Privacy.
- **Breadcrumbs:** visible trails + matching `BreadcrumbList` on services, audit, process, about, case-studies, industry, and location pages.
- **Company data:** all phone/`tel:` references now come from `src/data/company.ts`. The legacy number `240-310-9772` does not exist anywhere in the codebase (verified by grep).

## 6. Schema changes

- One shared **Organization** node (`https://aiviumdigital.com/#org`) on every page that emits JSON-LD: name, **legalName "Aivium Digital LLC"** (owner-confirmed 2026-08-05), url, logo, `telephone` (+12407304333, visible in header/footer), `email` (visible in footer), `foundingDate` 2026 (visible on /about/), founder → Person stub, `sameAs` (aivium.com + company LinkedIn; owner confirmed no other verified profiles yet), `parentOrganization` → Aivium (owner confirmed parent-company relationship). **No** address, geo, hours, or aggregateRating (owner chose no public address / Service-Area Business).
- **WebSite** node on the homepage (`#website`, publisher → org, `inLanguage`).
- **WebPage** nodes (`#webpage`, `isPartOf` → website) on all new pages.
- **Service** nodes with stable `@id`s (`/ai-seo/#service`, `/ai-automation/#service`, `/ai-visibility-audit/#service`, `/industries/home-services/#service`), `provider` → org, `areaServed` United States (true and stated visibly).
- **Person policy preserved:** author/founder references are embedded stubs pointing at `https://stevenwmills.com/#person`; no local full Person node (enforced by `entity.test.mjs`).
- **FAQPage** only where a visible FAQ exists (verified by crawl script).
- **Validation:** every JSON-LD block on all 18 built pages parses as valid JSON; no duplicate/conflicting org entities; no full-Person violations (crawl-check, §9 below). Rich Results Test should be run against production post-deploy (owner action).

## 7. Content changes

- **Homepage:** kept national positioning and hero. Added: search-foundations note inside the AI Visibility card (brief copy, linked); restrained Maryland trust block ("Based in Maryland. Built for businesses everywhere.") with links to `/locations/maryland/` and `/about-steven/`; honesty disclosure under the brand marquee ("Experience includes work by members of the Aivium team across prior roles and direct engagements…"); "two proven systems" → "two connected systems"; contextual links to `/services/`, `/process/`, `/case-studies/`.
- **Homepage statistics re-verified against primary sources** (all three retained):
  - 900M+ weekly ChatGPT users — OpenAI announcement Feb 27, 2026 (now cited to TechCrunch's report of the announcement, replacing an aggregator link).
  - −58% CTR under AI Overviews — now cited to Ahrefs' own study (Dec 2025 data), replacing a secondhand news link.
  - 4.4× AI-search visitor conversion — now cited to Semrush's own study page (verified the 4.4 figure appears in Semrush's material), replacing ppc.land.
  - All source links: `rel="noopener noreferrer"`, month/year labels.
- **/ai-seo/:** added "GEO does not replace SEO" section, "first 30 days" deliverables (framed as *typically*, no hard promises), industry examples (home services, B2B, regional) with contextual links to both Signals articles, reviewed-by line (Steven Mills), sourced the AI Overviews click-loss claim (Ahrefs), removed the "60 to 90 days" timeline promise from FAQ + FAQ schema.
- **/ai-automation/:** added eight concrete use-case categories, "What we will not automate" human-first guardrails section with ownership/access/monitoring language (no unsupported security claims), build-vs-buy section, links to process/services/case-studies/audit.
- **New pages** (§2) all follow the direct-answer → mechanism → constraints → CTA pattern, brand-first titles, no em dashes, editorial kickers, unique metadata, and carry FAQs only where visible. Maryland and Hagerstown pages are distinct (state-level market framing vs. Western Maryland/tri-state regional accountability); no invented addresses, testimonials, office claims, maps, or LocalBusiness properties.
- **No fabricated proof anywhere:** the case-studies hub states plainly that nothing is published yet and shows the publication standard.

## 8. Analytics changes

**GA4 implemented** (measurement ID `G-F4KTW1YDCM`, provided by owner 2026-08-05):

- `public/js/analytics.js`, loaded from BaseLayout on every page: gtag bootstrap + `page_type` config parameter (home / service / location / industry / signal_article / lead_funnel / …).
- Events, all PII-free (only `page_type`, `cta_location`, `cta_label`, `link_domain`): `click_phone`, `click_email`, `click_book_discovery`, `outbound_source_click` (homepage stat sources), `start_lead_form` (first quiz interaction), `submit_lead_form` (fired from `quiz.js` only on a validated submission; no form values sent).
- `/privacy/` updated to disclose GA4 honestly (measurement cookies, no form values in analytics).
- Remaining GA4 Admin-UI setup (key events, custom dimensions, AI-referral channel group for chatgpt.com/perplexity.ai/claude.ai/gemini.google.com/copilot.microsoft.com, enhanced measurement) is step 4 of `docs/post-deploy-search-runbook.md`.
- No consent banner was added: current stated audience is US; revisit if EU/UK targeting begins.
- UTM parameters are preserved through all redirects (query strings pass through).

## 9. Verification commands and results (all run 2026-08-05, final state)

| Check | Command | Result |
|---|---|---|
| Unit + contract tests | `npm test` | **37/37 pass** (signals, entity contract, 28 redirect contract tests) |
| Production build | `npm run build` | **Pass** (18 pages + sitemap/llms/robots) |
| Machine layer | `node scripts/verify-dist.mjs` | **Pass** — 17 routes: unique titles, descriptions, canonicals, OG, single H1, nav; sitemap 16 URLs all present in dist |
| HTTP matrix | `node scripts/verify-http.mjs` | **Pass** — 46 routes: all priority pages 200 w/ matching canonical; all legacy URLs one-hop 301 to a 200 destination; restaurants 410 (both variants); unknown routes 404 (branded body); robots/sitemap/OAI-SearchBot assertions |
| Crawl | scratchpad crawl script over dist | **Pass** — 18 pages, 0 broken internal links, 0 internal links hitting redirects, 0 orphans, max click depth 1, no duplicate titles/descriptions, single H1 each, no missing alt, JSON-LD valid on every page, no entity violations, FAQPage only with visible FAQs |
| Copy conventions | grep over dist | **Pass** — no em dashes in any built page; legacy phone absent |
| Visual QA | headless browser screenshots | Homepage, /services/, /industries/home-services/, /locations/hagerstown-md/ at 375/768/800/900/1024/1100/1120/1150/1280/1440 px; no console errors; nav overflow at 800–1024 found and fixed (overlay < 1100px, `flex-shrink: 0` logo, nowrap labels) |

Not run (require production deploy or external tools): Lighthouse/CWV on production, Google Rich Results Test, Search Console/Bing tasks. Listed in §10.

## 10. Owner actions required

**Deploy (this release):**
1. `cd /opt/aiviumdigital && git pull && docker compose up -d --build` — the new entrypoint (`server.mjs`) ships in the image; no compose/Caddy changes required.
2. `npm run indexnow` after the container swaps.
3. Optional Caddy nicety: redirect `http://www.` → apex in one hop (currently two hops via Caddy defaults). Not blocking.

**Search Console / Bing (GSC verified; follow `docs/post-deploy-search-runbook.md`):**
4. Submit the sitemap and request indexing on the nine priority pages (runbook §2).
5. **[Still open]** Export the last 16 months of GSC Pages/Queries; any legacy URL with impressions/links not in the §3 map should be added to `src/seo/redirects.mjs` (runbook §2.4).
6. Bing: one-click import from GSC + sitemap submit (runbook §3).
7. **[Still open]** Record the pre-change GSC baseline before judging results (runbook §2.5).
8. GA4 Admin setup: key events, custom dimensions, AI-referral channel group (runbook §4).

**Business facts (owner Q&A, 2026-08-05):**
9. **[RESOLVED]** Legal name: Aivium Digital LLC — now in schema.
10. **[RESOLVED]** Aivium is the parent company of Aivium Digital LLC — schema/copy unchanged (already correct).
11. **[RESOLVED]** Phone 240-730-4333 and hello@aiviumdigital.com confirmed.
12. **[RESOLVED]** No public street address; GBP as Service-Area Business.
13. **[RESOLVED]** Base described precisely as Hagerstown, Maryland (copy updated on /, /about/, both location pages).
14. **[RESOLVED]** Paid ads / websites / reputation / lead gen still offered inside broader digital marketing scopes — /services/ gained "The classic channels, inside the scope."
15. **[RESOLVED]** The free audit is operationally a discovery call today — CTAs now "Book a discovery call"; /ai-visibility-audit/ reframed (free call, baseline = engagement's first deliverable). Revisit when the audit becomes a defined free deliverable.
16. **[RESOLVED]** Restaurant marketing fully retired — 410 stands.
17. **[RESOLVED]** Home services targeted as one category; no per-trade child pages planned ("trade guides in the works" line removed).
18. **[RESOLVED]** Pricing stays private.
19. **[RESOLVED]** Logo wall + disclosure wording approved as accurate.
20. **[RESOLVED]** `sameAs` set is complete for now (stevenwmills.com, both LinkedIns, aivium.com); add directory profiles as they go live.
21. **[RESOLVED]** `/beyond-the-algorithm` was a never-launched placeholder → 410.
22. **[RESOLVED]** GA4 ID G-F4KTW1YDCM implemented (§8).
23. **[Still open]** First case study: one engagement in progress, not ready; hub's empty state remains accurate until numbers + approval exist.
24. **[Still open]** Legal review of `/privacy/` (updated for GA4; wording accurate to actual data flows).
25. **[Still open]** About Steven expansion material: career timeline, publications/media appearances.

## 11. Assumptions made

- Trailing slash is the canonical convention (matches every pre-existing canonical tag and live route behavior).
- The Person entity home remains stevenwmills.com (in-repo decision + regression test, newer than the brief's example schema).
- All other originally-assumed facts were confirmed or corrected in the 2026-08-05 owner Q&A (§10).

## 12. Deferred (P2, per brief + owner Q&A)

First approved case study (one engagement in progress) · Priority 1–3 Signal articles (topics + slugs in brief §38) · `/research/ai-recommendation-study-2026/` template (playbook §3 has the methodology) · AEO standalone page · external profile/citation work (AUTHORITY-PLAYBOOK). Per-trade child pages are **off the roadmap** — owner targets home services as one category, so all trade URLs permanently resolve to the hub.

## 13. Production redirect audit + engine-roster standardization (2026-08-06)

### Production redirect audit, both slash forms of every mapped legacy URL

Run with the new permanent tool `scripts/redirect-audit.mjs` (`node scripts/redirect-audit.mjs [base]`; audits production by default, exits non-zero on any contract break). 41 URL forms audited against `https://aiviumdigital.com` on 2026-08-06: every legacy URL with an intended replacement returns a one-hop 301 to a 200 destination whose self-canonical matches; both retired routes return a direct 410 in both forms; zero 404s, zero redirect chains.

A reported bug (trailing-slash forms of legacy URLs returning 404 while bare forms redirect) **did not reproduce** in production or against the local build. Both-form support is already explicit: `src/seo/redirects.mjs` expands every legacy path into slashed and unslashed exact-match variants before the canonical trailing-slash normalization runs, and production (`server.mjs`) serves that table.

| Source URL | Initial status | Destination | Final status | Hops | Canonical of final page |
|---|---|---|---|---|---|
| `/services/search-visibility` | 301 | `/ai-seo/` | 200 | 1 | `https://aiviumdigital.com/ai-seo/` |
| `/services/search-visibility/` | 301 | `/ai-seo/` | 200 | 1 | `https://aiviumdigital.com/ai-seo/` |
| `/services/google-business-profile` | 301 | `/industries/home-services/` | 200 | 1 | `https://aiviumdigital.com/industries/home-services/` |
| `/services/google-business-profile/` | 301 | `/industries/home-services/` | 200 | 1 | `https://aiviumdigital.com/industries/home-services/` |
| `/services/paid-ads` | 301 | `/services/` | 200 | 1 | `https://aiviumdigital.com/services/` |
| `/services/paid-ads/` | 301 | `/services/` | 200 | 1 | `https://aiviumdigital.com/services/` |
| `/services/websites` | 301 | `/services/` | 200 | 1 | `https://aiviumdigital.com/services/` |
| `/services/websites/` | 301 | `/services/` | 200 | 1 | `https://aiviumdigital.com/services/` |
| `/services/tracking-reporting` | 301 | `/ai-seo/` | 200 | 1 | `https://aiviumdigital.com/ai-seo/` |
| `/services/tracking-reporting/` | 301 | `/ai-seo/` | 200 | 1 | `https://aiviumdigital.com/ai-seo/` |
| `/services/lead-generation` | 301 | `/services/` | 200 | 1 | `https://aiviumdigital.com/services/` |
| `/services/lead-generation/` | 301 | `/services/` | 200 | 1 | `https://aiviumdigital.com/services/` |
| `/local-seo` | 301 | `/ai-seo/` | 200 | 1 | `https://aiviumdigital.com/ai-seo/` |
| `/local-seo/` | 301 | `/ai-seo/` | 200 | 1 | `https://aiviumdigital.com/ai-seo/` |
| `/ai-visibility` | 301 | `/ai-seo/` | 200 | 1 | `https://aiviumdigital.com/ai-seo/` |
| `/ai-visibility/` | 301 | `/ai-seo/` | 200 | 1 | `https://aiviumdigital.com/ai-seo/` |
| `/home-services` | 301 | `/industries/home-services/` | 200 | 1 | `https://aiviumdigital.com/industries/home-services/` |
| `/home-services/` | 301 | `/industries/home-services/` | 200 | 1 | `https://aiviumdigital.com/industries/home-services/` |
| `/roofing` | 301 | `/industries/home-services/` | 200 | 1 | `https://aiviumdigital.com/industries/home-services/` |
| `/roofing/` | 301 | `/industries/home-services/` | 200 | 1 | `https://aiviumdigital.com/industries/home-services/` |
| `/hvac` | 301 | `/industries/home-services/` | 200 | 1 | `https://aiviumdigital.com/industries/home-services/` |
| `/hvac/` | 301 | `/industries/home-services/` | 200 | 1 | `https://aiviumdigital.com/industries/home-services/` |
| `/plumbing` | 301 | `/industries/home-services/` | 200 | 1 | `https://aiviumdigital.com/industries/home-services/` |
| `/plumbing/` | 301 | `/industries/home-services/` | 200 | 1 | `https://aiviumdigital.com/industries/home-services/` |
| `/electrical` | 301 | `/industries/home-services/` | 200 | 1 | `https://aiviumdigital.com/industries/home-services/` |
| `/electrical/` | 301 | `/industries/home-services/` | 200 | 1 | `https://aiviumdigital.com/industries/home-services/` |
| `/landscaping` | 301 | `/industries/home-services/` | 200 | 1 | `https://aiviumdigital.com/industries/home-services/` |
| `/landscaping/` | 301 | `/industries/home-services/` | 200 | 1 | `https://aiviumdigital.com/industries/home-services/` |
| `/fencing` | 301 | `/industries/home-services/` | 200 | 1 | `https://aiviumdigital.com/industries/home-services/` |
| `/fencing/` | 301 | `/industries/home-services/` | 200 | 1 | `https://aiviumdigital.com/industries/home-services/` |
| `/field-notes` | 301 | `/signals/` | 200 | 1 | `https://aiviumdigital.com/signals/` |
| `/field-notes/` | 301 | `/signals/` | 200 | 1 | `https://aiviumdigital.com/signals/` |
| `/field-notes/ai-search-decision-making-2026` | 301 | `/signals/ai-search-decision-making-2026/` | 200 | 1 | `https://aiviumdigital.com/signals/ai-search-decision-making-2026/` |
| `/field-notes/ai-search-decision-making-2026/` | 301 | `/signals/ai-search-decision-making-2026/` | 200 | 1 | `https://aiviumdigital.com/signals/ai-search-decision-making-2026/` |
| `/field-notes/best-ai-visibility-tools` | 301 | `/signals/best-ai-visibility-tools/` | 200 | 1 | `https://aiviumdigital.com/signals/best-ai-visibility-tools/` |
| `/field-notes/best-ai-visibility-tools/` | 301 | `/signals/best-ai-visibility-tools/` | 200 | 1 | `https://aiviumdigital.com/signals/best-ai-visibility-tools/` |
| `/services` | 301 | `/services/` | 200 | 1 | `https://aiviumdigital.com/services/` |
| `/industries/restaurants` | 410 | — | 410 | 0 | — |
| `/industries/restaurants/` | 410 | — | 410 | 0 | — |
| `/beyond-the-algorithm` | 410 | — | 410 | 0 | — |
| `/beyond-the-algorithm/` | 410 | — | 410 | 0 | — |

The discovered legacy Field Notes routes are the two published posts above; slugs were preserved in the Signals rename, and the `/field-notes/<slug>` prefix rule maps any other historical slug one-to-one onto `/signals/<slug>/` in one hop. Host and protocol canonicalization is a separate single Caddy hop (`http://` → 308 `https://`, `www.` → 301 apex, path preserved) before these path rules apply. The same 41-form audit passes against the local build (`node scripts/redirect-audit.mjs http://127.0.0.1:<port>`), so repo and production agree.

### Engine-roster standardization

The site alternated between two "six engine" rosters: the logo rows on `/` and `/ai-visibility-audit/` showed **Grok** as the sixth engine, while every prose enumeration, FAQ answer, FAQ schema, meta description, `llms.txt`, and the Share of Answer study methodology (`research/share-of-answer/queries-v1.md`) used **Google AI Overviews**. Standardized on the roster the study and all reporting copy already define:

**ChatGPT, Claude, Gemini, Perplexity, Copilot, and Google AI Overviews** ("six engines").

- Both logo rows now end with Google AI Overviews (new `public/assets/engines/google.svg`, label "AI Overviews"); `grok.svg` deleted. Grok no longer appears anywhere in site copy.
- Shortlist enumerations normalized to roster order: homepage hero lede and `/ai-seo/` meta + OG descriptions now read "ChatGPT, Claude, Perplexity, and Google AI Overviews".
- `/services/` GEO cell reworded from "Google's AI surfaces" to "Google AI Overviews", removing the one competing "surfaces" framing.
- Every "six engines" count (share-of-answer cells on `/ai-seo/` and `/services/`, the audit-page "Six engines, one baseline" caption, both mentions in the best-ai-visibility-tools post) now resolves to this single roster.

Verified after the change: `npm test` 38/38 pass, `npm run build` pass, `npm run verify` pass (verify-dist + verify-http, 47-route matrix, canonicals and sitemap intact).
