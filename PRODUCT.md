# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Established-business owners and marketing leaders evaluating Aivium
Digital's AI SEO (GEO/AEO) and AI solutions services. For `/impact/`
specifically: Mid-Atlantic nonprofit leaders, often non-technical,
resource-strapped and time-poor, deciding whether to apply for a
six-month pro bono engagement; plus community members (volunteers,
donors, board members) nominating an organization.

## Product Purpose

aiviumdigital.com is Aivium Digital's site: an AI SEO agency that gets
brands cited by AI answer engines and builds custom AI systems. The
Impact Partner program (decision 2026-08-07: it lives on THIS site under
Aivium Digital branding, not on parent aivium.com) selects one nonprofit
for a six-month pro bono engagement. Success for /impact/ is qualified
applications and nominations, and credibility as a serious community
commitment, never a giveaway or lead-gen promotion.

## Positioning

"Be the answer AI gives." Human-first AI: technology should expand what
people are capable of. The Impact Partner program is that belief in
practice: one organization, real implementation, honestly documented,
including what didn't work.

## Operating Context

Applicants arrive from LinkedIn/community shares and the announcement,
mostly unfamiliar with AI tooling. Applying is an 18-field application
delivered as a multi-step flow (approved 2026-08-07), following the
site's existing discovery-quiz pattern. Nominating is a short form.
Submissions write to Attio via the site's own SSR API-route pattern
(`src/pages/api/lead.ts` is the reference; ATTIO_TOKEN server env).
Impact submissions are never sales leads. Program lifecycle:
announced → open → closed → selected, driven by `src/data/impact.ts`.

## Capabilities and Constraints

- Program facts (status, dates, service value, selected partner) live
  only in `src/data/impact.ts`; never hard-coded, never rendered "TBD".
- No fake dates, testimonials, partner organizations, results, counters,
  or social proof. No sweepstakes energy. Dollar value stays visually
  quieter than the mission.
- Applicants are never pushed into sales sequences or sales CTAs after
  submitting.
- Astro + Node adapter (SSR for /api/*); route control in server.mjs.
- Motion budget (user, 2026-08-07): any amount of animation, but
  concentrated above the fold as one signature moment; calmer below.
- Site copy rules: no em dashes anywhere; section kickers are editorial
  sentences (mono designations belong to cards/telemetry only); page
  titles start "Aivium Digital | "; the six answer engines are ChatGPT,
  Claude, Gemini, Perplexity, Copilot, Google AI Overviews.

## Brand Commitments

Aivium Digital. Tagline "Be the answer AI gives." Design system
"Frontier Observatory" (cold void, warm signal): void near-blacks
(#090c10/#0d1117), cream #f6f2ea, vermillion accent #e5391b, telemetry
green #3ecf8e, Archivo variable (display expanded), IBM Plex Mono
labels, sharp surfaces / pill interactive, starfield + grain atmosphere.
Tokens in public/styles/tokens.css; identity facts in src/data/company.ts.
Founder: Steven W. Mills (Person entity home: stevenwmills.com).

## Evidence on Hand

- Real founder portrait in-repo: src/assets/authors/steven-mills-portrait.jpg
  (may be used; never AI-generate his likeness).
- Real Mid-Atlantic community photography is coming later; the page may
  reserve for it but must ship complete without it.
- No partner organizations, results, or testimonials for the program
  exist yet. Nothing may be fabricated.
- No transactional email infrastructure on this site (no confirmation
  emails; Attio note + team follow-up is the loop).

## Product Principles

1. The nonprofit is the hero; Aivium Digital is the instrument.
2. Prove seriousness through specificity and transparency, not volume
   of copy.
3. Every AI mention connects to a human outcome.
4. Honest documentation, including failures, is the program's product.
5. The page is permanent infrastructure: it must evolve through the
   program lifecycle without rebuilds.

## Surface Direction (user-pinned, 2026-08-07)

/impact/ builds THE SIGNAL: out of many faint signals, one is found,
locked, and amplified. Chosen by the user on the decision page (seed key
5238da87, assigned roll). Re-fused for Aivium Digital's Frontier
Observatory world, where "signal" is already native vocabulary (the
blog is Signals; tokens name "cold void, warm signal").
