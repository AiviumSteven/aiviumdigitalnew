# AiviumDigital.com SEO, GEO, Migration Recovery, and Content Implementation Brief

**Prepared for:** Claude Code  
**Site:** `https://aiviumdigital.com`  
**Prepared:** August 5, 2026  
**Primary objective:** Recover lost organic relevance, establish a clean technical foundation, generate qualified search traffic, and build Aivium Digital into a credible national authority for AI visibility, generative engine optimization, answer engine optimization, AI automation, and custom AI solutions—without repositioning the entire company as a local-only agency.

---

## 1. Your Role

Act as a senior technical SEO engineer, full-stack web developer, information architect, conversion copywriter, and schema implementation specialist.

Work directly in the existing repository. First inspect the stack, routing model, content architecture, components, metadata system, analytics implementation, deployment configuration, and existing redirect behavior. Then make the changes in this brief in priority order.

Do not replace the existing visual identity. Preserve the current Aivium Digital NASA-punk/frontier design system, typography, motion language, spacing, iconography, dark/cream palette, and red Aivium Digital accent unless a change is required for accessibility, crawlability, performance, or conversion.

### Non-negotiable rules

1. **Keep the primary positioning national.** Do not turn the homepage into “Hagerstown’s digital marketing agency.”
2. **Reintroduce local relevance through dedicated location pages and a restrained homepage trust section.**
3. **Preserve relevant historical authority through one-to-one permanent redirects whenever a relevant replacement exists.**
4. **Never redirect every retired URL to the homepage.**
5. **Never invent clients, outcomes, testimonials, statistics, awards, certifications, locations, employee counts, or years of experience.**
6. **Do not reuse unsupported legacy claims.** Any legacy claim such as percentage improvements, savings, “proven results,” or guarantees must be removed unless substantiated in the repository or supplied by the owner.
7. **Do not create thin city-swapped or keyword-swapped doorway pages.** Every new page must provide distinct buyer value.
8. **All indexable pages must render meaningful HTML server-side or at build time.** Core copy, headings, links, metadata, canonical tags, and structured data must not depend on client-side interaction.
9. **Use one canonical URL convention throughout the site.** Prefer trailing slashes if that matches the framework and current live routes; otherwise use no trailing slashes. Do not allow both versions to return independent `200` responses.
10. **Do not block legitimate search crawlers.** Explicitly allow `OAI-SearchBot` unless there is a documented business decision not to appear in ChatGPT search.
11. **Do not add `FAQPage`, review, rating, or other structured data unless the visible page content and Google’s eligibility guidelines support it.**
12. **Do not publish placeholder text.** Clearly mark any owner-supplied content dependencies in a final implementation report instead.

---

## 2. Strategic Decision

The correct strategy is a hybrid model:

- **Homepage and core service pages:** National positioning.
- **Maryland and Hagerstown pages:** Local/regional relevance and trust.
- **Home-services vertical:** Preserve relevant prior topical authority and support active contractor clients.
- **Signals/editorial:** Build topical authority and citation-worthy research.
- **Case studies:** Add verifiable evidence and commercial trust.
- **Founder/company pages:** Strengthen entity disambiguation.

### Positioning statement to preserve

Aivium Digital is an AI visibility and AI solutions company. It helps established businesses get found, cited, and recommended in AI-generated answers and builds practical AI systems that improve how those businesses operate.

### Geographic framing

Aivium Digital is based in Maryland and serves businesses nationally. Maryland is an authority wedge and trust signal, not the limitation of the business.

---

## 3. Confirmed Public-Site Issues to Treat as High Priority

The live public site currently presents the new national AI SEO and AI automation positioning at the homepage and primary service routes. However, search engines still surface legacy home-services content, old service URLs, an old restaurant-industry page, and the previous phone number.

Known public inconsistencies include:

- Current homepage phone: `240-730-4333`
- Legacy indexed phone: `240-310-9772`
- Current AI visibility route: `/ai-seo/`
- Current AI automation route: `/ai-automation/`
- `/services/` currently returns `404`, while `/services` has been indexed with legacy copy.
- `/ai-visibility/` currently returns `404`, despite having been indexed previously.
- `/landscaping/` currently returns `404`, despite having been indexed previously.
- `/industries/restaurants` has surfaced an older, contradictory restaurant-marketing site version.
- Search results still surface old home-services, roofing, landscaping, local SEO, field-notes, and legacy service URLs.
- The current navigation’s “Process” and “FAQ” links appear to point to homepage sections rather than substantive standalone resources.
- The homepage has recognizable brand logos under “Brands our team has worked with,” but the site lacks sufficient context, case studies, roles, or outcomes to convert those logos into strong evidence.

Treat the migration cleanup as a prerequisite to content growth.

---

# PHASE 0 — REPOSITORY AND DEPLOYMENT AUDIT

## 4. Inspect Before Editing

Determine and document:

- Framework and version.
- Router type and route directory.
- Rendering model for each route: SSR, SSG, ISR, or CSR.
- Hosting provider and redirect capabilities.
- Existing metadata utilities.
- Existing sitemap generation.
- Existing robots configuration.
- Existing schema/JSON-LD implementation.
- Existing analytics: GA4, GTM, Search Console verification, Bing verification, or other scripts.
- Existing form provider and discovery-booking implementation.
- Existing CMS/content source.
- Existing image component and optimization rules.
- Existing canonical URL behavior.
- Existing 404 behavior and HTTP status handling.
- Whether legacy pages still exist in the repository, deployment output, alternate branches, static assets, or middleware.
- Whether any route can return different content depending on trailing slash, query string, hostname, or stale build artifact.

### Required repository search

Search for all occurrences of:

```text
240-310-9772
240-730-4333
Home Services Marketing
Your Local AI Digital Marketing Team
restaurant
restaurants
field-notes
local-seo
ai-visibility
search-visibility
tracking-reporting
paid-ads
home-services
roofing
hvac
plumbing
electrical
landscaping
fencing
Hagerstown
Maryland
FAQ
Process
canonical
robots
sitemap
application/ld+json
schema.org
```

### Required output before finishing

Create a short implementation report in the repository, for example:

```text
/docs/seo-implementation-report.md
```

It must list:

- Files changed.
- Routes added.
- Routes redirected.
- Routes intentionally retired with `410` or `404`.
- Metadata added or changed.
- Schema added or changed.
- Analytics changes.
- Items requiring owner input.
- Verification commands and their results.

---

# PHASE 1 — MIGRATION RECOVERY AND ROUTE CONTROL

## 5. Canonical URL Policy

Choose one URL policy based on the existing framework and apply it consistently.

Preferred behavior:

- HTTPS only.
- One hostname only: `https://aiviumdigital.com` unless the production architecture requires `www`.
- One trailing-slash convention.
- Query parameters do not create canonical duplicates.
- Every indexable page has a self-referencing canonical URL.
- Redirects occur at the server, edge, framework config, or middleware level—not with JavaScript or meta refresh.
- Permanent moves use `301` or `308`.
- Removed content with no replacement uses a real `410` where practical, otherwise a clean `404`.
- Error pages must return the correct non-`200` status.

Do not create redirect chains. Every known legacy URL should resolve in one hop to its final canonical destination.

## 6. Create a Central Redirect Map

Implement the following known mappings. Adapt syntax to the deployed framework.

### Core legacy service mappings

| Legacy path | Final destination | Action |
|---|---|---|
| `/services` | `/services/` | Permanent redirect if slash is canonical; otherwise make `/services` canonical |
| `/services/search-visibility/` | `/ai-seo/` | `301`/`308` |
| `/services/google-business-profile/` | `/industries/home-services/` | `301`/`308` unless a dedicated local search page is created |
| `/services/paid-ads/` | `/services/` | `301`/`308`; the new services page must explain whether paid acquisition is still offered |
| `/services/websites/` | `/services/` | `301`/`308` unless Smart Websites belong exclusively to Aivium Spark; if so, redirect to the correct Aivium-owned page |
| `/services/tracking-reporting/` | `/ai-seo/` | `301`/`308`, because share-of-answer and search measurement are part of AI visibility |
| `/services/lead-generation/` | `/services/` | `301`/`308` |
| `/local-seo` | `/ai-seo/` | `301`/`308` |
| `/local-seo/` | `/ai-seo/` | `301`/`308` |
| `/ai-visibility` | `/ai-seo/` | `301`/`308` |
| `/ai-visibility/` | `/ai-seo/` | `301`/`308` |

### Home-services mappings

Create the new home-services vertical before activating these redirects.

| Legacy path | Final destination | Action |
|---|---|---|
| `/home-services/` | `/industries/home-services/` | `301`/`308` |
| `/roofing/` | `/industries/home-services/roofing/` | `301`/`308` |
| `/hvac/` | `/industries/home-services/hvac/` | `301`/`308` |
| `/plumbing/` | `/industries/home-services/plumbing/` | `301`/`308` |
| `/electrical/` | `/industries/home-services/electrical/` | `301`/`308` |
| `/landscaping/` | `/industries/home-services/landscaping/` | `301`/`308` |
| `/fencing/` | `/industries/home-services/fencing/` | `301`/`308` |

If creating all six child vertical pages immediately would produce shallow or unsupported content, create high-quality pages for roofing and HVAC first, redirect the remaining trade URLs to `/industries/home-services/`, and leave clear TODO notes. Do not publish six near-duplicate pages solely to receive redirects.

### Legacy industry/content cleanup

| Legacy path or pattern | Final destination | Action |
|---|---|---|
| `/industries/restaurants` | None unless restaurant services remain active | Return `410 Gone` and remove from all navigation/sitemaps |
| `/industries/restaurants/` | Same as above | Return `410 Gone` |
| `/field-notes/` | `/signals/` | `301`/`308` |
| `/field-notes/*` | Closest relevant Signal article, category page, or `/signals/` | One-to-one where possible; do not blanket redirect unrelated content |
| `/beyond-the-algorithm` | `/about/` or `/about-steven/` depending on content | Inspect legacy content and choose the closest match |

### Additional redirects discovered in repository or Search Console export

The owner must eventually supply Search Console and backlink exports. In the meantime:

1. Search the codebase for legacy route files and internal references.
2. Add every known route to a documented redirect map.
3. Do not remove a route until its replacement or intentional retirement is defined.
4. Preserve URL query strings only when they have functional value.
5. Add automated redirect tests.

## 7. Eliminate Legacy Deployments and Contradictory Content

Ensure the old site cannot be served through:

- Alternate route groups.
- Old static HTML files.
- Hidden CMS routes.
- Stale framework output.
- Old serverless functions.
- Alternate trailing-slash behavior.
- Rewrites that mask old content.
- Cached deployment aliases.
- An old subdirectory, build artifact, or branch still connected to production.

Delete or isolate legacy page components only after the redirects are implemented.

## 8. Standardize Company Identity

Create a single source of truth for company data, such as:

```ts
export const company = {
  legalName: "Aivium Digital LLC", // Confirm legal structure before publishing
  brandName: "Aivium Digital",
  url: "https://aiviumdigital.com",
  phoneDisplay: "240-730-4333",
  phoneE164: "+12407304333",
  email: "...", // Use only verified public email
  locationLabel: "Maryland",
  founder: "Steven Mills",
  parentOrganization: "Aivium LLC", // Confirm exact legal relationship
};
```

Use this centralized data in:

- Header.
- Mobile navigation.
- Footer.
- Contact/discovery page.
- Location pages.
- Structured data.
- Open Graph metadata where relevant.
- JSON-LD.
- `tel:` links.
- Any visible CTA components.

Remove `240-310-9772` from all production code and content unless the owner confirms that number should remain active.

---

# PHASE 2 — INFORMATION ARCHITECTURE

## 9. Target Site Architecture

Implement or plan the following architecture:

```text
/
├── services/
├── ai-seo/
├── ai-automation/
├── ai-visibility-audit/
├── process/
├── case-studies/
│   └── [case-study-slug]/
├── industries/
│   └── home-services/
│       ├── roofing/
│       ├── hvac/
│       ├── plumbing/          [only when substantive]
│       ├── electrical/        [only when substantive]
│       ├── landscaping/       [only when substantive]
│       └── fencing/           [only when substantive]
├── locations/
│   ├── maryland/
│   └── hagerstown-md/
├── signals/
│   └── [article-slug]/
├── about/
├── about-steven/
├── discovery/
├── privacy/
└── terms/                     [if needed]
```

Potential future pages—not required for the initial launch unless enough distinct content exists:

```text
/answer-engine-optimization/
/ai-overviews-optimization/
/ai-agents/
/ai-consulting/
/methodology/
/resources/
```

## 10. Navigation Changes

Recommended primary navigation:

```text
AI Visibility
AI Solutions
Services
Process
Signals
About
```

Primary CTA:

```text
Book a free AI audit
```

or, if the offer is not yet operational:

```text
Book a discovery call
```

Use one naming convention consistently. Do not alternate between “free discovery,” “free AI audit,” and “discovery call” unless they are genuinely different conversion paths.

### Footer navigation

Add crawlable HTML links to:

- AI Visibility.
- AI Solutions.
- Services.
- AI Visibility Audit.
- Process.
- Case Studies.
- Home Services.
- Maryland.
- Hagerstown, MD.
- Signals.
- About Aivium Digital.
- About Steven.
- Discovery.
- Privacy.

All navigation links must use real `<a href="...">` elements or the framework’s link component that renders anchors.

---

# PHASE 3 — PAGE-BY-PAGE IMPLEMENTATION

## 11. Homepage

### Keep

Preserve the current core headline and national positioning unless a technical or accessibility issue requires restructuring:

```text
The AI SEO agency for getting cited, not just ranked.
Be the answer in AI search.
```

Keep the two-system concept:

- AI Visibility.
- AI Solutions.

### Add: search-foundation clarification

Near the AI Visibility section, add concise copy explaining that Aivium does not treat GEO as separate from search fundamentals:

> AI visibility is built on search foundations. We strengthen the technical SEO, entity signals, content, and third-party authority that help a brand rank in Google and become trusted enough to be cited by AI answer engines.

Link “technical SEO” or “search foundations” to `/ai-seo/` or `/services/`.

### Add: Maryland trust block

Place after the client/logo proof section, after the two-engine section, or shortly before the final CTA. It should be visible but not dominate the page.

Suggested eyebrow:

```text
MARYLAND ROOTS · NATIONAL REACH
```

Suggested heading:

```text
Based in Maryland. Built for businesses everywhere.
```

Suggested body:

> From our home in Western Maryland, Aivium Digital helps established businesses across the United States become visible in AI search and put practical AI systems to work. Local accountability, national ambition, and a human expert involved at every stage.

Suggested links:

- `AI services in Maryland` → `/locations/maryland/`
- `Meet Steven Mills` → `/about-steven/`

Do not stuff the block with nearby city names.

### Improve the logo proof section

Current wording can remain:

```text
Brands our team has worked with
```

Add a brief disclosure or context line so visitors do not assume every logo represents a direct Aivium Digital engagement. Example:

> Experience includes work performed by members of the Aivium team across prior roles and direct engagements. Case-study details are shared where permissions allow.

Do not imply direct client relationships that cannot be substantiated.

Link to `/case-studies/` once at least one real case study exists.

### Review current statistics

Audit every numeric claim and source on the homepage. Replace third-party summaries with original/primary sources where possible. If a claim cannot be verified from a credible source or its methodology is unclear, remove it rather than weakening trust.

For each retained statistic:

- Link to the actual source.
- Include month/year.
- Avoid overstating causation.
- Use `rel="noopener noreferrer"` for external links.
- Do not make the visual design depend on a statistic that may require frequent updating.

### Add internal links

The homepage should link contextually to:

- `/services/`
- `/ai-seo/`
- `/ai-automation/`
- `/ai-visibility-audit/`
- `/process/`
- `/case-studies/`
- `/industries/home-services/`
- `/locations/maryland/`
- `/signals/`
- `/about/`
- `/about-steven/`

### Homepage metadata

Suggested title:

```text
AI SEO Agency, GEO & Custom AI Solutions | Aivium Digital
```

Suggested description:

```text
Aivium Digital helps established businesses get cited in ChatGPT, Claude, Gemini, Perplexity and Google AI Overviews, then builds custom AI systems that turn visibility into growth.
```

Canonical:

```text
https://aiviumdigital.com/
```

---

## 12. Services Hub — `/services/`

This is a launch-critical page because the route has legacy search history and currently lacks a proper current destination.

### Search intent

- AI services company.
- AI SEO and automation services.
- AI visibility services.
- AI solutions for business.
- Generative AI consulting services.

### Metadata

Title:

```text
AI Visibility & AI Automation Services | Aivium Digital
```

Description:

```text
Explore Aivium Digital’s AI visibility, GEO, AEO, AI automation, agent, integration and enablement services for established businesses.
```

H1:

```text
AI visibility and AI solutions, built as one growth system.
```

### Required sections

1. **Direct-answer introduction**
   - Define what Aivium Digital does in 40–70 words.
   - Include national reach and Maryland base naturally.

2. **AI Visibility service group**
   - Answer audit.
   - Technical SEO foundation.
   - Entity and source engineering.
   - Generative engine optimization.
   - Answer engine optimization.
   - AI Overviews optimization.
   - Citable content strategy and production.
   - Digital PR/citation strategy where genuinely offered.
   - Share-of-answer tracking.
   - Traditional organic performance tracking.
   - CTA to `/ai-seo/`.

3. **AI Solutions service group**
   - Opportunity mapping.
   - AI agents.
   - AI assistants/RAG where relevant.
   - Workflow automation.
   - Integrations.
   - Data and process design.
   - Human-in-the-loop safeguards.
   - Training and enablement.
   - Monitoring and optimization.
   - CTA to `/ai-automation/`.

4. **Who it is for**
   - Established SMB and mid-market businesses.
   - Teams with fragmented processes.
   - Brands losing visibility in AI answers.
   - Businesses that need practical implementation rather than generic strategy.
   - Home-services specialization as one vertical, not the entire ICP.

5. **How the systems compound**
   - Explain how AI visibility creates demand and AI solutions improve delivery, proof, customer experience, and operational leverage.

6. **Engagement model**
   - Audit/discovery.
   - Roadmap.
   - Build/engineer.
   - Publish/deploy.
   - Measure/iterate.
   - Avoid publishing prices unless approved.

7. **Proof module**
   - Case studies or founder/team experience.
   - No unsupported results.

8. **FAQ**
   - What does an AI agency do?
   - Do you also handle traditional SEO?
   - What is the difference between AI visibility and AI automation?
   - Can you work with our existing marketing or IT team?
   - Do we own the systems you build?
   - How do engagements begin?

9. **CTA**
   - AI visibility audit or discovery call.

### Internal links

Link to:

- `/ai-seo/`
- `/ai-automation/`
- `/ai-visibility-audit/`
- `/process/`
- `/case-studies/`
- `/industries/home-services/`
- `/locations/maryland/`

---

## 13. AI Visibility — `/ai-seo/`

The current page is directionally strong. Improve rather than replace it.

### Primary intent

- Generative engine optimization services.
- GEO agency.
- AI SEO agency.
- Answer engine optimization services.
- AI search optimization company.

### Required improvements

1. Add a section titled:

```text
GEO does not replace SEO
```

Suggested copy:

> AI answer engines still rely on many of the same trust signals that support organic search: crawlable pages, clear information architecture, authoritative content, consistent entity data, links, and credible third-party references. Aivium’s GEO work strengthens those foundations, then adds prompt research, answer audits, source analysis, citable content, and share-of-answer measurement.

2. Add a deliverables section containing only services actually provided.

3. Add a “What you receive in the first 30 days” section, but avoid hard promises if the operational process is not finalized.

Possible structure:

- Baseline prompt set.
- Competitor answer analysis.
- Source/citation map.
- Technical and entity audit.
- Prioritized roadmap.
- Measurement dashboard specification.

4. Add a sample output or anonymized screenshot when available.

5. Add industry examples, including home services, without narrowing the entire page.

6. Add contextual links to relevant Signal articles.

7. Add clear attribution for every factual/statistical claim.

8. Add an author/reviewer line if the page contains substantial educational content:

```text
Reviewed by Steven Mills, Founder & CEO
```

9. Add `Service` schema connected to the main `Organization` entity.

### Metadata

Title:

```text
Generative Engine Optimization (GEO) Services | Aivium Digital
```

Description:

```text
Get your brand cited and recommended in ChatGPT, Claude, Gemini, Perplexity, Copilot and Google AI Overviews with Aivium Digital’s GEO and AEO services.
```

---

## 14. AI Automation — `/ai-automation/`

The current page is directionally strong. Improve rather than replace it.

### Primary intent

- AI automation agency.
- Custom AI solutions.
- AI agent development company.
- Generative AI consulting.
- Business process automation with AI.

### Required improvements

1. Add a “What we will not automate” or “Human-first guardrails” section.
2. Explain ownership, hosting, access, monitoring, and data handling without making unsupported security claims.
3. Add concrete use-case categories:
   - Lead intake and qualification.
   - Follow-up and nurture.
   - Knowledge assistants.
   - Reporting and synthesis.
   - Proposal/quote assistance.
   - Customer support triage.
   - Content operations.
   - Internal workflow orchestration.
4. Add a build-vs-buy decision section.
5. Add a sample project lifecycle.
6. Add one or more case studies as they become available.
7. Add `Service` schema connected to the `Organization` node.
8. Link to `/process/`, `/case-studies/`, `/services/`, and `/discovery/`.

### Metadata

Title:

```text
AI Automation Agency & Custom AI Solutions | Aivium Digital
```

Description:

```text
Aivium Digital designs and builds custom AI agents, assistants, automations and integrations around the way your business actually operates.
```

---

## 15. AI Visibility Audit — `/ai-visibility-audit/`

This should be a dedicated conversion landing page and useful commercial resource.

### Primary intent

- AI visibility audit.
- ChatGPT visibility audit.
- AI search audit.
- GEO audit.

### Metadata

Title:

```text
AI Visibility Audit for ChatGPT & AI Search | Aivium Digital
```

Description:

```text
See where your brand appears in ChatGPT, Claude, Gemini, Perplexity, Copilot and Google AI Overviews—and what is keeping competitors ahead.
```

H1:

```text
See exactly where your brand appears in AI search—and where it disappears.
```

### Required sections

1. What the audit is.
2. Engines covered.
3. What is measured.
4. Example categories of buyer questions.
5. What the buyer receives.
6. What the audit does not promise.
7. Who the audit is for.
8. The next step after the audit.
9. Form or discovery CTA.
10. Privacy/communication language.

### Lead form fields

Keep the form short enough to convert but sufficient to qualify:

- First and last name.
- Work email.
- Company.
- Website.
- Role.
- Approximate annual revenue range.
- Primary market or customer type.
- Main goal:
  - Become visible in AI search.
  - Improve organic search.
  - Explore AI automation.
  - Both visibility and automation.
- Optional context.

Do not require phone unless needed operationally. If phone is required, explain why.

### Analytics events

Track:

```text
view_ai_audit_page
start_ai_audit_form
submit_ai_audit_form
click_book_discovery
click_phone
```

Avoid sending personally identifiable form values into GA4.

---

## 16. Process — `/process/`

Turn the homepage process concept into a substantive standalone page.

### Metadata

Title:

```text
How Aivium Digital Builds AI Visibility & AI Systems
```

Description:

```text
See Aivium Digital’s process for auditing AI visibility, engineering authority, publishing citable content, building AI systems and measuring results.
```

H1:

```text
From discovery to orbit: how Aivium turns AI into a working growth system.
```

### Required sections

1. Discovery.
2. Baseline and audit.
3. Roadmap and prioritization.
4. Engineering and implementation.
5. Publishing or deployment.
6. Measurement.
7. Iteration.
8. Human review and quality control.
9. Ownership and documentation.
10. What clients need to provide.
11. Expected communication cadence.
12. CTA.

Connect the process to Aivium’s three pillars:

- Safety.
- Education and Enablement.
- Human-first strategy and quality control.

Do not promise a fixed ranking timeline.

---

## 17. About Aivium Digital — `/about/`

Create a company entity page separate from the founder profile.

### Metadata

Title:

```text
About Aivium Digital | AI Visibility & AI Solutions
```

Description:

```text
Aivium Digital is the AI visibility and AI solutions division of Aivium, helping established businesses get found in AI search and put AI to work responsibly.
```

H1:

```text
An AI company built for the frontier—and accountable to the people using it.
```

### Required sections

1. What Aivium Digital is.
2. What it does.
3. Who it serves.
4. Maryland base and national reach.
5. Relationship to Aivium parent company.
6. Founder leadership.
7. Three operating pillars.
8. Relevant experience.
9. Why the brand exists.
10. CTA.

Ensure relationship language is factually accurate:

- Aivium.
- Aivium Digital.
- Aivium Scale.
- Aivium Partners.
- Aivium Spark.

Link to the parent site where appropriate. Use `parentOrganization` schema only if the legal/organizational relationship is confirmed.

---

## 18. About Steven — `/about-steven/`

Expand the current page without turning it into a self-promotional keyword page.

### Required additions

- Professional headshot.
- Concise expertise summary.
- Career timeline.
- Relevant prior roles and engagements, phrased accurately.
- AI specialization timeline.
- Publications or authored Signal articles.
- Podcast, speaking, or media appearances when available.
- Links to credible profiles and owned publications.
- Relationship to Aivium and Aivium Digital.
- Areas of expertise.
- Contact or booking CTA.

### Structured data

Use:

- `ProfilePage` as the page type.
- `Person` as `mainEntity`.
- Stable `@id`, for example `https://aiviumdigital.com/#steven-mills`.
- `sameAs` only for verified profiles.
- `worksFor` linked to the organization entity.
- `knowsAbout` values that accurately match visible biography content.

### Metadata

Title:

```text
Steven Mills | Founder & CEO of Aivium Digital
```

Description:

```text
Steven Mills is the founder and CEO of Aivium and Aivium Digital, specializing in AI visibility, generative engine optimization and practical AI systems.
```

---

## 19. Case Studies — `/case-studies/`

Create the hub and reusable template now, even if only one study can be published immediately.

### Critical rule

Do not publish fabricated, estimated, reconstructed, or unattributed results. Drafts can remain unpublished until owner approval.

### Case-study hub metadata

Title:

```text
AI Visibility, SEO & Automation Case Studies | Aivium Digital
```

Description:

```text
See how Aivium Digital approaches AI visibility, organic search, automation and digital growth through real client work and measurable outcomes.
```

### Case-study template

Each study should include:

1. Client name or approved anonymized descriptor.
2. Industry.
3. Company stage or size when approved.
4. Initial situation.
5. Problem.
6. Baseline metrics.
7. Constraints.
8. Strategy.
9. Work completed.
10. Timeline.
11. Results.
12. What changed and why.
13. Screenshots or artifacts.
14. Client quote if approved.
15. Limitations or confounding factors.
16. Related services.
17. CTA.

### Potential initial study categories

- AI visibility/SEO engagement.
- AI automation or operational workflow.
- Local/regional business growth engagement.

Do not use major brand logos as a substitute for case studies.

---

# PHASE 4 — LOCAL AND INDUSTRY AUTHORITY

## 20. Maryland Page — `/locations/maryland/`

This is the primary regional landing page.

### Primary search intent

- AI SEO agency Maryland.
- AI visibility agency Maryland.
- AI automation agency Maryland.
- Generative AI consulting Maryland.
- GEO agency Maryland.

### Metadata

Title:

```text
AI SEO & AI Automation Agency in Maryland | Aivium Digital
```

Description:

```text
Maryland-based Aivium Digital helps established businesses get cited in AI search and build custom AI agents, automations and business systems.
```

H1:

```text
AI visibility and AI automation for Maryland businesses.
```

### Required content

1. Direct answer describing Aivium as Maryland-based and nationally serving.
2. Maryland business context, using genuine knowledge rather than generic geography prose.
3. AI visibility services.
4. AI automation services.
5. Types of Maryland companies served or best suited.
6. Western Maryland, Central Maryland, and broader state reach only where accurate.
7. Home-services expertise as one vertical.
8. Founder/local accountability.
9. Relevant Maryland proof, clients, memberships, or community ties when approved.
10. FAQs specific to Maryland businesses.
11. CTA.

### Quality rules

- Do not list every Maryland city for keyword coverage.
- Do not claim an office address unless it is a legitimate customer-facing or registered location appropriate for publication.
- Do not create fake local testimonials.
- Do not embed a map unless the location is legitimate and publicly intended.
- Do not use `LocalBusiness` schema with invented opening hours or coordinates.

### Suggested opening copy

> Aivium Digital is a Maryland-based AI visibility and AI automation company helping established businesses become easier to find, understand, and recommend across Google, ChatGPT, Claude, Gemini, Perplexity, Copilot, and Google AI Overviews. We combine technical search foundations, entity authority, citable content, and practical AI implementation—serving Maryland organizations and clients across the United States.

---

## 21. Hagerstown Page — `/locations/hagerstown-md/`

### Primary search intent

- AI consultant Hagerstown MD.
- AI SEO agency Hagerstown.
- AI automation Hagerstown.
- AI company Hagerstown Maryland.
- Digital marketing AI Hagerstown.

### Metadata

Title:

```text
AI Consulting, AI SEO & Automation in Hagerstown, MD
```

Description:

```text
Hagerstown-based Aivium Digital helps businesses improve Google and AI-search visibility and implement custom AI agents, automations and workflows.
```

H1:

```text
AI strategy and implementation for businesses in Hagerstown, Maryland.
```

### Required content

1. A real description of Aivium’s Hagerstown/Western Maryland roots.
2. Problems regional businesses face:
   - Limited internal AI expertise.
   - Fragmented marketing and operations.
   - Need to compete beyond the immediate market.
   - Need for accountable, accessible implementation support.
3. AI visibility services.
4. AI solutions and automation.
5. Home-services and regional-service-company relevance.
6. How local and national search work together.
7. Founder/local proof.
8. Local case studies when approved.
9. FAQ.
10. CTA.

### Suggested positioning block

> Aivium Digital is based in the Hagerstown area but is not limited to local marketing. We help regional companies strengthen the search visibility they need today while building the AI visibility and systems they will need next. For businesses that want a nearby strategic partner with national capability, that combination matters.

### Local schema

Only add `LocalBusiness` or `ProfessionalService` properties that are true, visible, and owner-approved. Otherwise rely on `Organization` plus visible Maryland/Hagerstown content.

---

## 22. Home Services Hub — `/industries/home-services/`

This page preserves relevant historical authority without making Aivium exclusively a contractor-marketing agency.

### Primary intent

- AI SEO for home services.
- AI search visibility for contractors.
- AI automation for home-services companies.
- Home-services GEO agency.
- AI marketing systems for contractors.

### Metadata

Title:

```text
AI Visibility & Automation for Home Services | Aivium Digital
```

Description:

```text
Help homeowners find and choose your company in Google and AI search, then use AI to improve lead response, follow-up, quoting and operations.
```

H1:

```text
Get recommended. Respond faster. Win more home-service work.
```

### Required sections

1. Direct answer.
2. How homeowners use Google and AI answers to choose contractors.
3. Search and AI visibility foundation.
4. Local entity and reputation consistency.
5. Service-area content and location relevance.
6. Lead intake and response automation.
7. Estimate follow-up and nurture.
8. Review/reputation workflows, only where actually offered.
9. Attribution and reporting.
10. Trade links.
11. Case studies.
12. FAQ.
13. CTA.

### Trade child-page differentiation

Each trade child page must contain genuinely distinct industry knowledge. Avoid swapping only the trade name.

#### Roofing

Cover:

- Storm and insurance-driven demand.
- High-value estimate follow-up.
- Local trust and proof.
- Service-area visibility.
- AI recommendation queries.
- Review velocity and project evidence.

#### HVAC

Cover:

- Emergency vs planned replacement intent.
- Seasonal demand.
- Maintenance agreements.
- Fast lead response.
- Location/service-area relevance.
- AI recommendations for emergency and replacement decisions.

#### Plumbing

Cover:

- Emergency intent.
- Service categories.
- Dispatch and intake.
- Repeat household value.
- Local trust.

#### Electrical

Cover:

- Emergency and project intent.
- EV charger, panel upgrade, generator, and specialty-service demand where relevant.
- Licensing and trust signals.

#### Landscaping

Cover:

- Seasonality.
- Design/build vs maintenance intent.
- Visual proof.
- Quote follow-up.
- Recurring services.

#### Fencing

Cover:

- Material/service differentiation.
- Quote-stage comparison.
- Project galleries.
- Service-area demand.
- Financing or lead nurture only if supported.

### Legacy copy policy

Legacy pages may be used as research material, but do not republish unsupported claims such as:

- Exact percentages of lost estimates.
- Exact revenue calculations presented as universal truth.
- Industry benchmarks without credible sources.
- Claims that a profile is performing at a specific percentage.
- Guarantees.
- “Proven results” without a documented case study.

---

# PHASE 5 — TECHNICAL SEO

## 23. Metadata System

Create a centralized metadata utility or typed configuration.

Every indexable page must include:

- Unique title.
- Unique meta description.
- Canonical.
- Open Graph title.
- Open Graph description.
- Open Graph URL.
- Open Graph image.
- Twitter card metadata.
- Robots directive.

Avoid title boilerplate that duplicates the brand twice.

### Title rules

- Prefer roughly 45–65 characters where natural.
- Put primary intent before the brand.
- Avoid multiple synonymous keywords in one title.
- Do not use “best,” “top,” “leading,” or “#1” without evidence.

### Description rules

- Describe buyer value.
- Avoid unsupported outcome promises.
- Use engine names only where relevant.
- Keep each page distinct.

## 24. Heading and Semantic HTML

For every page:

- Exactly one primary H1 unless the framework has a defensible accessible pattern.
- Use H2/H3 hierarchy logically.
- Do not use headings solely for visual styling.
- Use lists for actual lists.
- Use tables only for comparative/tabular information.
- Use `<main>`, `<nav>`, `<header>`, `<footer>`, `<article>`, `<section>`, `<aside>` appropriately.
- Ensure accordion content exists in rendered HTML and is accessible to crawlers and keyboard users.
- Ensure hidden mobile/desktop duplicate content does not create bloated repeated DOM where avoidable.

## 25. Robots.txt

Create or verify a production `robots.txt` at:

```text
https://aiviumdigital.com/robots.txt
```

Minimum intended behavior:

```text
User-agent: *
Allow: /

User-agent: OAI-SearchBot
Allow: /

Sitemap: https://aiviumdigital.com/sitemap.xml
```

Add disallow rules only for genuine non-public or low-value routes such as framework internals, authenticated dashboards, internal search results, or staging paths.

Do not block:

- CSS.
- JavaScript needed for rendering.
- Public images.
- Public API data required to render indexable pages.
- `OAI-SearchBot` when the business wants ChatGPT search visibility.

Do not assume that `GPTBot` and `OAI-SearchBot` serve the same purpose. Treat training and search crawlers separately.

Before adding rules for Anthropic, Perplexity, Google, or Microsoft AI crawlers, verify their current official user-agent documentation. Do not copy crawler names from random blog posts.

## 26. XML Sitemap

Create or verify:

```text
https://aiviumdigital.com/sitemap.xml
```

Requirements:

- Include only canonical `200` URLs.
- Exclude redirects.
- Exclude `404` and `410` URLs.
- Exclude `noindex` pages.
- Exclude query-string duplicates.
- Include accurate `lastmod` only when the content materially changes.
- Include new services, location, case-study, and Signal pages.
- Ensure the sitemap host matches canonical URLs.
- Reference the sitemap in `robots.txt`.

A separate Signal/article sitemap is optional. Do not create a Google News sitemap unless Aivium meets the publication use case and intends to participate.

## 27. HTTP Status and Error Handling

Validate:

- Existing pages: `200`.
- Permanent redirects: `301` or `308`.
- Removed restaurant page: `410` if intentionally retired.
- Unknown URLs: `404`.
- No soft 404s returning `200`.
- No redirect loops.
- No multi-hop redirect chains.
- Correct behavior with and without trailing slash.
- Correct behavior on HTTP, HTTPS, `www`, and non-`www`.

Create a useful branded 404 page with links to:

- Homepage.
- Services.
- AI Visibility.
- AI Solutions.
- Signals.
- Discovery.

The custom page must still return `404`.

## 28. Canonicals

Every indexable route must output an absolute self-referencing canonical.

For pagination, filters, or article categories:

- Do not canonicalize distinct useful pages to an unrelated parent.
- Do not canonicalize all Signal articles to `/signals/`.
- Avoid canonical tags on redirects and error pages.

## 29. Performance and Core Web Vitals

Run Lighthouse or equivalent on mobile and desktop for:

- Homepage.
- `/ai-seo/`.
- `/ai-automation/`.
- `/services/`.
- `/locations/maryland/`.
- A Signal article.

Prioritize:

- Largest Contentful Paint.
- Interaction to Next Paint.
- Cumulative Layout Shift.
- Total JavaScript.
- Main-thread blocking.
- Image payload.
- Font loading.
- Motion performance.

### Design-specific performance rules

- Keep the NASA-punk visual language.
- Avoid autoplay background video unless it is highly optimized and non-blocking.
- Use responsive images with explicit dimensions.
- Lazy-load below-the-fold imagery.
- Do not lazy-load the LCP image.
- Preload only truly critical fonts/assets.
- Respect `prefers-reduced-motion`.
- Avoid rendering duplicate animated elements for desktop and mobile.
- Ensure canvas/WebGL effects are progressively enhanced and do not hide or delay content.

## 30. Accessibility

At minimum:

- Keyboard-accessible navigation and accordions.
- Visible focus states.
- Correct accessible names for icon links.
- Descriptive alt text for meaningful images.
- Empty alt text for decorative images.
- Adequate contrast.
- No critical copy embedded only in images.
- Form labels and errors associated correctly.
- Reduced-motion support.
- Logical reading order.
- Descriptive link text instead of repeated “learn more.”

Accessibility improvements also strengthen semantic clarity for search and AI retrieval.

---

# PHASE 6 — STRUCTURED DATA AND ENTITY GRAPH

## 31. General Schema Approach

Create a connected JSON-LD `@graph` with stable `@id` values.

Suggested identifiers:

```text
https://aiviumdigital.com/#organization
https://aiviumdigital.com/#website
https://aiviumdigital.com/#steven-mills
https://aiviumdigital.com/[page-path]/#webpage
https://aiviumdigital.com/[page-path]/#service
```

Use JSON-LD generated server-side.

### Required entity relationships

- `WebSite.publisher` → `Organization`.
- `WebPage.isPartOf` → `WebSite`.
- `WebPage.about` → appropriate entity or service.
- `Article.publisher` → `Organization`.
- `Article.author` → `Person`.
- `Person.worksFor` → `Organization`.
- `Service.provider` → `Organization`.
- `BreadcrumbList` → current page hierarchy.

## 32. Homepage Organization Schema

Implement a visible-content-aligned `Organization` node.

Template—replace placeholders only with confirmed values:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://aiviumdigital.com/#organization",
      "name": "Aivium Digital",
      "legalName": "Aivium Digital LLC",
      "url": "https://aiviumdigital.com/",
      "logo": {
        "@type": "ImageObject",
        "@id": "https://aiviumdigital.com/#logo",
        "url": "https://aiviumdigital.com/[CONFIRMED-LOGO-PATH]",
        "contentUrl": "https://aiviumdigital.com/[CONFIRMED-LOGO-PATH]",
        "caption": "Aivium Digital"
      },
      "telephone": "+12407304333",
      "founder": {
        "@id": "https://aiviumdigital.com/#steven-mills"
      },
      "sameAs": [
        "[VERIFIED LINKEDIN OR OTHER PROFILE URLS ONLY]"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://aiviumdigital.com/#website",
      "url": "https://aiviumdigital.com/",
      "name": "Aivium Digital",
      "publisher": {
        "@id": "https://aiviumdigital.com/#organization"
      },
      "inLanguage": "en-US"
    },
    {
      "@type": "Person",
      "@id": "https://aiviumdigital.com/#steven-mills",
      "name": "Steven Mills",
      "url": "https://aiviumdigital.com/about-steven/",
      "jobTitle": "Founder & CEO",
      "worksFor": {
        "@id": "https://aiviumdigital.com/#organization"
      }
    }
  ]
}
```

### Important schema cautions

- Confirm legal name before publishing.
- Do not add an address solely for ranking.
- Do not add geographic coordinates unless verified.
- Do not add opening hours unless real and public.
- Do not add `aggregateRating` or `review` from self-serving testimonials.
- Do not add unverified `sameAs` links.
- Do not mark the company as serving every country or state.
- Ensure all schema facts also appear visibly where appropriate.

## 33. Service Schema

For `/ai-seo/` and `/ai-automation/`, create `Service` entities.

Example:

```json
{
  "@type": "Service",
  "@id": "https://aiviumdigital.com/ai-seo/#service",
  "name": "Generative Engine Optimization Services",
  "serviceType": "Generative engine optimization and AI search visibility",
  "url": "https://aiviumdigital.com/ai-seo/",
  "provider": {
    "@id": "https://aiviumdigital.com/#organization"
  },
  "areaServed": {
    "@type": "Country",
    "name": "United States"
  },
  "description": "[MATCH VISIBLE PAGE DESCRIPTION]"
}
```

Only use `areaServed: United States` if national service is true and visible on the page.

## 34. Article Schema

Every Signal article should include:

- `Article` or `BlogPosting`.
- Headline.
- Description.
- Main image.
- `datePublished`.
- `dateModified`.
- Author linked to Steven’s stable `@id`.
- Publisher linked to Aivium Digital.
- Canonical URL.
- `mainEntityOfPage`.
- Breadcrumbs.

The visible publication and update dates must match the JSON-LD.

## 35. Breadcrumb Schema

Add visible breadcrumbs and `BreadcrumbList` to:

- Service pages.
- Location pages.
- Industry pages.
- Trade pages.
- Signal articles.
- Case studies.

Example visible hierarchy:

```text
Home > Industries > Home Services > Roofing
```

---

# PHASE 7 — CONTENT AND AI-SEARCH READINESS

## 36. Content Standards for All Educational and Commercial Pages

Each substantive page should use the following pattern where natural:

1. **Direct answer near the top.**
2. **Clear definition or framing.**
3. **Specific buyer problem.**
4. **Mechanism: how the work actually functions.**
5. **Evidence, examples, or methodology.**
6. **Constraints and limitations.**
7. **Clear next action.**

### Writing standards

- Write for informed business owners, marketing leaders, and operators.
- Keep technical terms defined in plain language.
- Avoid generic AI hype.
- Avoid saying “revolutionize,” “unlock,” “game-changing,” or “leverage AI” without specifics.
- Avoid claims that an AI engine “rewards” a particular format unless backed by evidence.
- Use concise standalone statements where they improve readability.
- Make Aivium’s human-first operating principles visible.
- Differentiate between observed practice, industry research, and Aivium’s own interpretation.

### Citation standards

For every factual claim:

- Prefer the original research, official documentation, company filing, or primary dataset.
- Link to the source.
- Include publication date when time-sensitive.
- Do not cite one agency blog quoting another agency blog.
- Do not use an AI-generated summary as evidence.
- Avoid excessive outbound links that distract from the page’s purpose.

### Author and update standards

Signal articles should visibly display:

- Author.
- Author profile link.
- Publication date.
- Updated date when materially changed.
- Sources or methodology where applicable.

## 37. Signals Hub Improvements

Keep `/signals/` as the editorial brand.

Add:

- Topic filters or categories only when enough articles exist.
- Intro copy explaining the editorial standard.
- Author information.
- Newsletter CTA only if a real newsletter workflow exists.
- Featured research area.
- Crawlable pagination when article count grows.
- Unique metadata for category pages.

Do not generate empty tag/category pages. Legacy empty taxonomy pages should redirect or return `404/410` and remain out of the sitemap.

## 38. Initial Content Program

Create briefs or draft-ready route stubs for the following priority topics. Do not publish all at once unless each article is genuinely complete, reviewed, sourced, and useful.

### Priority 1: High-intent problem content

1. `/signals/why-chatgpt-does-not-mention-your-company/`
   - Title: `Why ChatGPT Does Not Mention Your Company—and What to Fix`
2. `/signals/how-to-run-an-ai-visibility-audit/`
   - Title: `How to Run an AI Visibility Audit Across ChatGPT and AI Search`
3. `/signals/how-to-get-cited-by-chatgpt/`
   - Title: `How Businesses Get Cited by ChatGPT: Sources, Entities and Evidence`
4. `/signals/measure-ai-referral-traffic/`
   - Title: `How to Measure Traffic and Leads From AI Search`
5. `/signals/geo-services-cost/`
   - Title: `How Much Do GEO and AI Visibility Services Cost?`

### Priority 2: Decision content

6. `/signals/geo-vs-seo/`
   - Title: `GEO vs. SEO: What Changed, What Did Not, and What Businesses Need`
7. `/signals/geo-agency-vs-seo-agency/`
   - Title: `GEO Agency vs. Traditional SEO Agency: What You Are Actually Buying`
8. `/signals/ai-visibility-tools-vs-managed-service/`
   - Title: `AI Visibility Software vs. a Managed GEO Service`
9. `/signals/build-ai-agents-in-house-vs-agency/`
   - Title: `Build AI Agents In-House or Hire an Agency?`

### Priority 3: Vertical content

10. `/signals/how-chatgpt-recommends-local-contractors/`
11. `/signals/ai-automation-home-service-lead-follow-up/`
12. `/signals/ai-search-roofing-companies/`

### Article requirements

Each article must have:

- Unique thesis.
- Search intent statement in frontmatter or brief.
- Primary and secondary entities.
- Original examples.
- At least one practical framework, checklist, dataset, screenshot, or table.
- Sources.
- Internal links.
- Author/reviewer.
- Metadata.
- Article schema.
- CTA appropriate to intent.

## 39. Original Research Flagship

Create the architecture and content template for a flagship research asset:

```text
/research/ai-recommendation-study-2026/
```

Working title:

```text
The 2026 AI Recommendation Study: Which Sources ChatGPT, Claude, Gemini, Perplexity and Copilot Trust
```

Do not publish until real data exists.

### Required methodology fields

- Research question.
- Prompt set.
- Industries represented.
- Models and interfaces tested.
- Exact test dates.
- Geographic settings.
- Whether accounts/personalization were used.
- Number of repeated runs.
- How brand mentions were counted.
- How citations were counted.
- How source domains were classified.
- How disagreements were handled.
- Limitations.
- Raw dataset download.
- Changelog.

### Required result modules

- Mention share by engine.
- Citation share by domain type.
- Overlap between traditional rankings and AI citations.
- Brand/source concentration.
- Engine-to-engine differences.
- Industry differences.
- Repeatability/variance.

Create reusable chart and data-table components that remain readable without JavaScript.

---

# PHASE 8 — INTERNAL LINKING

## 40. Internal Linking Map

Implement contextual links, not just navigation links.

### Homepage links to

- Services.
- AI SEO.
- AI Automation.
- AI Audit.
- Process.
- Case Studies.
- Maryland.
- Signals.

### AI SEO links to

- Services.
- AI Audit.
- Process.
- Relevant Signals.
- Case Studies.
- Maryland.
- Home Services.

### AI Automation links to

- Services.
- Process.
- Case Studies.
- AI Audit/discovery where appropriate.
- Relevant Signals.

### Maryland links to

- Hagerstown.
- AI SEO.
- AI Automation.
- Home Services.
- Case Studies.
- About Steven.

### Hagerstown links to

- Maryland.
- Home Services.
- AI SEO.
- AI Automation.
- About Steven.
- Discovery.

### Home Services hub links to

- Each published trade page.
- AI SEO.
- AI Automation.
- Maryland/Hagerstown where natural.
- Contractor-focused Signals.
- Relevant case studies.

### Signal articles link to

- One primary commercial service.
- One related supporting article.
- One relevant entity/about page where natural.
- One case study or research asset when relevant.

### Anchor-text rules

- Use descriptive natural language.
- Vary anchors based on context.
- Do not repeatedly use exact-match anchors sitewide.
- Do not hide links in non-link UI elements.
- Avoid linking every mention of the same term.

---

# PHASE 9 — ANALYTICS, MEASUREMENT, AND LEAD TRACKING

## 41. GA4/GTM Audit

Confirm or implement:

- One GA4 property.
- One production GTM container if GTM is used.
- No duplicate page-view firing.
- Consent behavior where required.
- Cross-domain tracking if booking occurs on Calendly or another domain.
- Referral exclusions only where appropriate.
- UTM preservation into lead forms/CRM where possible.

### Recommended events

```text
click_primary_cta
click_book_discovery
click_ai_audit
click_phone
click_email
start_lead_form
submit_lead_form
view_case_study
view_signal_article
scroll_50
scroll_90
outbound_source_click
```

Define event parameters without personal information:

```text
page_type
cta_location
cta_label
service_interest
content_category
```

## 42. AI Referral Channel Grouping

Create reporting logic for referral sources where data appears, including examples such as:

```text
chatgpt.com
perplexity.ai
claude.ai
gemini.google.com
copilot.microsoft.com
```

Do not assume all AI-assisted visits expose a referral. Label reporting honestly as observed/referral-detectable AI traffic, not total AI influence.

## 43. Search Console and Bing Manual Tasks

These cannot be completed solely through code unless credentials and APIs are available. Add them to the implementation report as owner actions:

1. Verify the production domain property in Google Search Console.
2. Submit the canonical sitemap.
3. Inspect homepage and new priority routes.
4. Request indexing after deployment.
5. Export the previous 16 months of Pages and Queries data.
6. Identify legacy URLs with impressions, clicks, links, and coverage.
7. Import/verify the site in Bing Webmaster Tools.
8. Submit the sitemap to Bing.
9. Enable IndexNow if supported by the framework or hosting platform.
10. Review Bing AI/Copilot visibility reporting when available in the account.

## 44. Baseline Reporting

Create a baseline worksheet or documentation table with:

- Indexed canonical URLs.
- Organic clicks.
- Organic impressions.
- Non-brand clicks.
- Maryland/local clicks.
- AI-related query impressions.
- Rankings for target terms.
- Referring domains.
- AI referral sessions.
- Leads by source.
- Share of answer for a fixed prompt set.

Do not claim progress without preserving the pre-change baseline.

---

# PHASE 10 — QUALITY ASSURANCE

## 45. Automated Checks

Run the repository’s appropriate commands. Typical examples:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

Do not suppress errors to make the build pass.

Add route tests for:

- Canonical pages.
- Redirects.
- Removed pages.
- Metadata.
- Sitemap membership.
- Robots output.
- JSON-LD serialization.

## 46. HTTP Verification Matrix

Verify with `curl -I` or equivalent after deployment:

```text
/
/services/
/ai-seo/
/ai-automation/
/ai-visibility-audit/
/process/
/about/
/about-steven/
/case-studies/
/locations/maryland/
/locations/hagerstown-md/
/industries/home-services/
/signals/
/robots.txt
/sitemap.xml
```

Verify legacy routes:

```text
/services
/services/search-visibility/
/services/google-business-profile/
/services/paid-ads/
/services/websites/
/services/tracking-reporting/
/services/lead-generation/
/local-seo
/ai-visibility
/ai-visibility/
/home-services/
/roofing/
/hvac/
/plumbing/
/electrical/
/landscaping/
/fencing/
/field-notes/
/industries/restaurants
```

Acceptance criteria:

- One-hop redirect.
- Correct final destination.
- No loop.
- Final canonical returns `200`.
- Restaurant route returns intended `410` or documented alternative.

## 47. Crawl Verification

Run a full crawl using an available crawler or a custom script.

Check:

- Broken internal links.
- Redirecting internal links.
- Orphan pages.
- Duplicate titles.
- Duplicate descriptions.
- Missing H1s.
- Multiple H1s where inappropriate.
- Missing canonicals.
- Canonical mismatches.
- `noindex` conflicts.
- Sitemap conflicts.
- 4xx/5xx resources.
- Oversized images.
- Missing alt text.
- Schema errors.
- Pages more than three clicks deep.

## 48. Structured Data Validation

Validate representative pages with:

- Google Rich Results Test where applicable.
- Schema.org validator.
- Manual JSON parsing.

Fix:

- Invalid JSON.
- Duplicate conflicting entities.
- Different URLs for the same organization entity.
- Missing required properties.
- Invisible or misleading schema facts.

## 49. Visual Regression and Responsive QA

Test at minimum:

- 320px.
- 375px.
- 768px.
- 1024px.
- 1440px.
- Large desktop.

Check:

- Header/menu.
- Logo proportions.
- CTA clipping.
- Long headings.
- Tables.
- Accordions.
- Breadcrumbs.
- Forms.
- Footer.
- Motion.
- Focus states.
- Text contrast.

Preserve the Aivium visual system across new templates.

---

# PHASE 11 — IMPLEMENTATION ORDER

## 50. P0: Must Complete Before Content Expansion

1. Inspect repository and identify legacy deployment paths.
2. Standardize phone/company data.
3. Create redirect map.
4. Restore `/services/` as a current services hub.
5. Create `/industries/home-services/` or at least a robust destination for legacy home-service URLs.
6. Remove or retire `/industries/restaurants` and other contradictory pages.
7. Fix canonical/trailing-slash behavior.
8. Create/verify `robots.txt`.
9. Create/verify sitemap.
10. Verify 404/410 status handling.
11. Add centralized metadata.
12. Add baseline Organization/WebSite/Person schema.
13. Run build, crawl, HTTP, and schema checks.

## 51. P1: Complete Immediately After P0

1. Maryland page.
2. Hagerstown page.
3. Process page.
4. About company page.
5. AI audit page.
6. Homepage Maryland trust section.
7. Homepage source/stat review.
8. Expanded About Steven page.
9. Case-study hub and template.
10. Improve AI SEO and AI Automation pages.
11. Add breadcrumbs and internal-link modules.

## 52. P2: Build Authority

1. Roofing and HVAC vertical pages.
2. First approved case study.
3. High-intent Signal articles.
4. Research template.
5. Additional trade pages only when substantive.
6. External profile/entity consistency work.
7. Digital PR and citation development outside the codebase.

---

# PHASE 12 — ACCEPTANCE CRITERIA

The implementation is not complete until all of the following are true:

## Technical

- [ ] Production build passes.
- [ ] No new lint/type errors.
- [ ] All priority pages return `200`.
- [ ] All mapped legacy URLs redirect in one hop.
- [ ] Contradictory old pages no longer return indexable `200` content.
- [ ] Unknown routes return real `404`.
- [ ] Intentionally retired routes return `410` where configured.
- [ ] One canonical hostname and slash convention.
- [ ] Every indexable page has a self-canonical.
- [ ] Sitemap contains only canonical `200` pages.
- [ ] Robots references the sitemap.
- [ ] OAI-SearchBot is not blocked.
- [ ] Core content is present in rendered HTML.
- [ ] Internal links are crawlable anchors.
- [ ] Structured data validates.
- [ ] No unsupported schema claims.

## Content

- [ ] Homepage remains nationally positioned.
- [ ] Homepage includes a restrained Maryland trust section.
- [ ] `/services/` accurately reflects current offers.
- [ ] Maryland and Hagerstown pages contain distinct useful content.
- [ ] Home services exists as a vertical, not the entire company identity.
- [ ] Old phone number is removed from public content.
- [ ] No fabricated proof, statistics, guarantees, or case studies.
- [ ] Every commercial page has a clear intent and CTA.
- [ ] Every Signal article has author, dates, sources, and internal links.
- [ ] Company and founder relationships are described consistently.

## Measurement

- [ ] Lead CTA/form events are tracked.
- [ ] Phone and booking clicks are tracked.
- [ ] UTM data is preserved where practical.
- [ ] AI referral sources can be segmented.
- [ ] Baseline metrics are documented before judging results.
- [ ] Search Console/Bing owner tasks are listed clearly.

---

# 53. Owner Input Required

Do not block the code implementation where a safe placeholder-free alternative exists, but flag the following for owner confirmation:

1. Exact legal name of the Digital entity.
2. Confirmed relationship between Aivium LLC, Aivium, and Aivium Digital.
3. Confirmed public phone number.
4. Confirmed public email address.
5. Whether a street address should be public.
6. Whether Hagerstown should be described as the precise base or broader Western Maryland.
7. Which brand logos represent direct Aivium work versus Steven/team experience in prior roles.
8. Approved disclosure wording beneath logos.
9. Approved client names and case studies.
10. Approved results and source data.
11. Verified founder profiles for `sameAs`.
12. Whether paid ads, websites, reputation systems, and general lead generation remain current Aivium Digital services.
13. Whether the free AI visibility audit is a real defined deliverable or primarily a discovery call.
14. Whether restaurant marketing is fully retired.
15. Which home-service trades remain active targets.
16. Whether pricing should remain private.
17. Search Console, Bing, GA4, and GTM access.

---

# 54. Final Deliverable Format

After implementing, provide a final response with:

1. **Summary of what changed.**
2. **Routes created.**
3. **Redirects implemented.**
4. **Pages removed or retired.**
5. **Technical SEO changes.**
6. **Schema changes.**
7. **Content changes.**
8. **Analytics changes.**
9. **Tests run and results.**
10. **Items not completed and why.**
11. **Owner actions required in Search Console, Bing, analytics, and external profiles.**
12. **Any assumptions made.**

Do not say a task is complete unless it was implemented and verified.

---

# 55. Reference Documentation

Use these primary references while implementing:

- Google: Redirects and Google Search  
  `https://developers.google.com/search/docs/crawling-indexing/301-redirects`

- Google: Site moves with URL changes  
  `https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes`

- Google: Canonical URLs  
  `https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls`

- Google: Sitemaps overview  
  `https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview`

- Google: Organization structured data  
  `https://developers.google.com/search/docs/appearance/structured-data/organization`

- Google: LocalBusiness structured data  
  `https://developers.google.com/search/docs/appearance/structured-data/local-business`

- Google: Article structured data  
  `https://developers.google.com/search/docs/appearance/structured-data/article`

- Google: ProfilePage structured data  
  `https://developers.google.com/search/docs/appearance/structured-data/profile-page`

- Google: Structured data general guidelines  
  `https://developers.google.com/search/docs/appearance/structured-data/sd-policies`

- Google: Crawlable links  
  `https://developers.google.com/search/docs/crawling-indexing/links-crawlable`

- Google: JavaScript SEO  
  `https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics`

- Google: Request recrawling  
  `https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl`

- OpenAI: OAI-SearchBot and crawler documentation  
  `https://developers.openai.com/api/docs/bots`

- Bing Webmaster Tools  
  `https://www.bing.com/webmasters`

---

# 56. Final Strategic Reminder

Do not solve the current traffic problem by undoing the rebrand.

The goal is not:

```text
Turn Aivium Digital back into a Hagerstown home-services marketing agency.
```

The goal is:

```text
Build a national AI visibility and AI solutions authority that uses Maryland roots, local proof, and home-services expertise as credible wedges into search demand.
```

The first ranking win is likely to come from a combination of:

- Recovered legacy authority.
- Maryland and Hagerstown relevance.
- Home-services topical depth.
- High-intent AI visibility content.
- Verifiable case studies.
- Original research.
- Consistent company/founder entities.
- Clean technical execution.

Execute the migration recovery first. Then build authority on top of a stable foundation.
