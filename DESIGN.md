---
name: Aivium Digital
description: Frontier Observatory, cold void, warm signal. Single locked dark theme for aiviumdigital.com.
colors:
  void-950: "#090c10"
  void-900: "#0d1117"
  void-850: "#111722"
  cream: "#f6f2ea"
  cream-72: "rgba(246, 242, 234, 0.72)"
  cream-55: "rgba(246, 242, 234, 0.55)"
  cream-32: "rgba(246, 242, 234, 0.32)"
  line: "rgba(246, 242, 234, 0.10)"
  line-strong: "rgba(246, 242, 234, 0.22)"
  accent: "#e5391b"
  accent-bright: "#f03e1f"
  accent-deep: "#7e1e0c"
  on-accent: "#0b0806"
  ok: "#3ecf8e"
typography:
  display:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.5rem, 1.1rem + 4.7vw, 4.375rem)"
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 121"
  headline:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.875rem, 1.2rem + 2.2vw, 3rem)"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 121"
  title:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.375rem, 1.1rem + 0.9vw, 1.75rem)"
    fontWeight: 500
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 108"
  body:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "IBM Plex Mono, SFMono-Regular, Consolas, monospace"
    fontSize: "0.8125rem"
    fontWeight: 500
    letterSpacing: "0.16em"
rounded:
  surface: "0"
  interactive: "999px"
spacing:
  "1": "0.25rem"
  "2": "0.5rem"
  "3": "0.75rem"
  "4": "1rem"
  "6": "1.5rem"
  "8": "2rem"
  "12": "3rem"
  "16": "4rem"
  "24": "6rem"
  section: "clamp(6rem, 4rem + 8vw, 10rem)"
components:
  button-primary:
    backgroundColor: "{colors.accent-bright}"
    textColor: "{colors.on-accent}"
    rounded: "{rounded.interactive}"
    height: "3rem"
    padding: "0 2rem"
  button-primary-hover:
    backgroundColor: "{colors.accent}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.cream}"
    rounded: "{rounded.interactive}"
    height: "3rem"
    padding: "0 2rem"
  input:
    backgroundColor: "{colors.void-900}"
    textColor: "{colors.cream}"
    rounded: "{rounded.surface}"
    padding: "0.75rem 1rem"
  card:
    backgroundColor: "{colors.void-900}"
    rounded: "{rounded.surface}"
    padding: "2rem"
  label:
    textColor: "{colors.cream-55}"
    typography: "{typography.label}"
---

# Design System: Aivium Digital

Implementation source of truth: `public/styles/tokens.css` (every value above is a CSS custom property there; when this file and tokens.css disagree, tokens.css wins and this file is stale). Sitewide components live in `public/styles/main.css`, the funnel grammar in `public/styles/quiz.css`, the /impact/ surface in `public/styles/impact.css`. Fonts are self-hosted via `public/styles/fonts.css`. Pages load styles through `src/layouts/BaseLayout.astro` in fixed order: fonts.css, tokens.css, main.css, then per-surface sheets via the `styles` prop. BaseLayout also injects the sitewide `.grain` overlay on every page.

## Overview

**Creative North Star: "The Frontier Observatory"**

Cold void, warm signal. The site is an instrument watching deep space: pages are near-black voids partitioned by cream hairlines, and everything warm on screen is a signal worth attention, the vermillion of a rim-lit horizon, the green of a telemetry lock-in. It is a single dark theme locked at page level (`color-scheme: dark`); there is no light mode and no theme toggle.

Density is editorial, not dashboard: wide sections, one idea per band, long measure capped in `ch` units, generous `--space-section` rhythm. Ornament is earned by the metaphor: orbit rings, starfields, signal traces, registration corner marks, pixelated "transmission" imagery. Motion is concentrated into one authored moment above the fold per page; everything below stays calm, and every animation is wrapped in `prefers-reduced-motion: no-preference`.

**Key Characteristics:**
- Single locked dark theme; the void is the ground, cream is the voice, vermillion is the signal.
- Text hierarchy is one cream at four opacities, never a gray ramp.
- Hairlines partition everything; surfaces are sharp, interactive elements are pills.
- Mono type appears only as measurement or designation, never as editorial voice.
- One signature motion moment per page, above the fold; ambient loops are slow and linear.

## Colors

Two-family palette: a cool near-black void ladder for ground, and a warm signal set (cream, vermillion, telemetry green) for everything that speaks.

### Primary
- **Vermillion** (`--accent`, #e5391b): the brand signal. Text accents, card designations, active underlines, diagram pulses, glows, selection background. Used sparingly; its rarity is the point.
- **Vermillion Bright** (`--accent-bright`, #f03e1f): button fills and focus outlines only; passes AA with ink text (`--on-accent`, #0b0806).
- **Vermillion Deep** (`--accent-deep`, #7e1e0c): horizon-glow gradient depths only. Never text.

### Tertiary
- **Telemetry Green** (`--ok`, #3ecf8e): status only. Lock-ins, checkmarks, "signal locked" chips, commitment tags. Never decoration, never a CTA.

### Neutral
- **Void 950** (#090c10): page background.
- **Void 900** (#0d1117): brand ink; elevated surfaces, cards, panels, glass nav fill, footer.
- **Void 850** (#111722): raised chips and hover fills.
- **Cream** (#f6f2ea): headings and primary text; also the forced tint for marquee logos.
- **Cream 72 / 55 / 32** (rgba cream at 0.72 / 0.55 / 0.32): body copy / secondary text and captions / disabled and faint metadata, in that order.
- **Line / Line Strong** (rgba cream at 0.10 / 0.22): hairline borders everywhere / interactive borders, corner marks, diagram base strokes.

### Named Rules
**The Opacity Ladder Rule.** All text and border hierarchy is cream at a fixed alpha (1 / 0.72 / 0.55 / 0.32 / 0.22 / 0.10). Never introduce a gray hex for text or hairlines.

**The Warm Signal Rule.** Warmth means signal. Vermillion and green carry meaning (attention, status); they never fill large areas except the one accent block a diagram or pricing grid earns (`.flow__wp--growth`, `.price-card--accent`).

## Typography

**Display + Body Font:** Archivo variable (width axis 62 to 125), fallback Helvetica Neue / Arial
**Label/Mono Font:** IBM Plex Mono 500, fallback SFMono-Regular / Consolas

**Character:** One grotesk does all editorial work by stretching, not by changing family or weight: headings run expanded (121% width), subheads slightly expanded (108%), body at normal width. The mono voice is an instrument readout, always small, uppercase, and widely tracked. Heading weight is a single 500 sitewide; emphasis comes from width, size, and color, not boldness. Premium upgrade path noted in tokens.css: swap the family, keep the stretch tokens.

### Hierarchy
- **Display** (500, `--text-display` clamp 2.5 to 4.375rem, 1.02, -0.02em, wdth 121): hero headlines. On heroes the visually big line is often not the H1 (see The Eyebrow Sentence Rule).
- **Headline** (500, `--text-h2` clamp 1.875 to 3rem, ~1.08, wdth 121): section H2s, stat numerals.
- **Title** (500, `--text-h3` clamp 1.375 to 1.75rem, -0.01em, wdth 108): card and channel H3s, pull-quote lines.
- **Body** (400, 1.0625rem, 1.65): copy. Measure capped around 44 to 62ch (`.lede` 44ch, body blocks 58 to 62ch).
- **Label** (mono 500, 0.8125rem, +0.16em, UPPERCASE): `.label`, telemetry readouts, mono designations, form labels, nav links (nav runs 0.75rem, +0.14em).

### Named Rules
**The Mono Is Measurement Rule.** IBM Plex Mono appears only as data: card designations, telemetry readouts, channel and waypoint IDs, progress counts, field labels, nav links, checklists. It is never a section kicker and never editorial voice. On /impact/ the phase window is set after its heading, never as a kicker above it.

**The Eyebrow Sentence Rule.** Hero eyebrows are editorial sentences: sentence case, body-adjacent size (1.125rem, 500, wdth 108, cream-72), no mono, no uppercase, no ornament. The hero pattern is an `<hgroup>` where the keyword-carrying H1 is the quiet eyebrow line and the display-size hook below it is a `<p>` (`.hero__eyebrow` + `.hero__headline`; /impact/ repeats the grammar).

## Layout

- **Container:** `--container` 1320px max, `padding-inline: clamp(1.25rem, 4vw, 3rem)`, centered (`.container`).
- **Section rhythm:** bands padded `--space-section` (clamp 6 to 10rem) and separated by a 1px `--line` border-top. Adjacent subsections (`.pagesec + .pagesec`) repeat the hairline.
- **Spacing scale:** 4px base (`--space-1` through `--space-24`); component gaps use the scale, never ad-hoc values.
- **Partition by hairline, not by gap:** stat rows, `.dgrid`, `.case__card`, pricing grids, channel strips, and timelines share 1px `--line` internal borders with zero gap. Cards inside a grid keep `--space-6` gaps.
- **Asymmetric two-column heads:** section intros sit in a `max-width: 40rem` grid; content splits like 1fr/1.5fr (FAQ, sticky left head), 1.05fr/1fr (CTA), 5fr/7fr (/impact/ why).
- **Nav:** fixed 72px (`--nav-height`), transparent over the hero; past the fold it compresses to 60px glass (rgba void at 0.72 + 14px blur + hairline). Below 1100px the link row yields to a full-void overlay menu with staggered display-size links.
- **Breakpoints in use:** 1280 and 1100 (nav density), 900 (primary restack), 767/760 (mobile), 640 (form columns). Diagrams restack into vertical rails on mobile (`.flow` chips become a connected column; wires hide).
- **Heroes:** full-viewport flex (`min-height: calc(100dvh - band)`), content left in a 40 to 44rem column, atmosphere absolute behind at `--z-atmosphere`.

## Elevation & Depth

Flat by tone, lit by signal. There is no elevation shadow vocabulary: depth comes from the three void steps (void-950 page, void-900 panels, void-850 raised chips) plus hairline borders. The only box-shadows and drop-shadows in the system are colored glows that read as light emission from signal elements, never as lifted surfaces.

### Shadow Vocabulary
- **Accent bloom** (`box-shadow: 0 0 48px rgba(229, 57, 27, 0.35)`): the one accent-filled chip a diagram earns (growth output).
- **Planet glow** (`box-shadow: 0 0 56px rgba(229, 57, 27, 0.3)`): pixel-planet destinations.
- **Pulse glow** (`filter: drop-shadow(0 0 4px rgba(229, 57, 27, 0.7))`): moving signal dashes on wires.
- **Lock-in glow** (`drop-shadow(0 0 6px rgba(62, 207, 142, 0.6))`, large form `0 0 72px rgba(62, 207, 142, 0.45)`): green telemetry lock states.

### Atmosphere layers (fixed z scale in tokens.css)
- `--z-atmosphere` (0): starfield canvas + rendered planet horizon on the homepage hero; the signal-field canvas on /impact/ (with a void vignette so traces never fight the copy); horizon-glow radial gradients (`--accent-deep`) at page close and page-hero floors.
- `--z-content` (10): everything readable.
- `--z-nav` (40): the fixed nav.
- `--z-grain` (60): `.grain`, a fixed, non-interactive SVG fractal-noise film overlay at 0.05 opacity, injected by BaseLayout on every page.

### Named Rules
**The Glow Not Shadow Rule.** A shadow may only exist as colored light from a signal element (vermillion or green). Surfaces never cast shadows; separation is tonal steps and hairlines.

## Shapes

One rule, stated in tokens.css: **surfaces are sharp, interactive is pill. Nothing else.** `--radius-surface: 0` on every card, panel, input, image, and diagram; `--radius-interactive: 999px` on buttons, the nav toggle, and mobile diagram chips. Circles appear only as instrument geometry: orbit rings, waypoints, lock rings, radio-style selection rings on quiz options, round pixel planets. Borders are 1px hairlines (`--line`, `--line-strong`). Diagram and stage panels are framed by registration corner marks: 14px L-shaped strokes in `--line-strong` at opposing corners (flow SVG corners, `.quiz-stage::before/::after`, /impact/ arc corners). Signature texture: `image-rendering: pixelated` on "transmission" imagery (system-card crowns fading into the card's own void via gradient, pixel planets).

## Components

Motion grammar shared by all components: easing `--ease-out` cubic-bezier(0.16, 1, 0.3, 1); durations 180ms (state), 320ms (structure), 700ms (entrances). Entrances are the "rise" pattern (fade + 14 to 20px translate up, staggered 60 to 90ms per sibling). Ambient loops are slow and linear (orbits 130 to 210s, marquee 45s, dash drifts 1.4 to 3.2s). All motion sits inside `prefers-reduced-motion: no-preference`; reduced motion gets static states (marquee becomes a scroller).

### Buttons (`.btn`)
- **Shape:** pill (999px), 3rem height, `--space-8` inline padding; nav variant 2.5rem.
- **Primary** (`.btn--primary`): accent-bright fill, ink text; hover deepens to accent. One primary intent per page.
- **Ghost** (`.btn--ghost`): transparent, `--line-strong` border, cream text; hover brightens border to cream.
- **States:** `:active` scales to 0.98; `:focus-visible` gets a 2px accent-bright outline offset 3px (the sitewide focus treatment).

### Navigation (`.nav`)
- Links are telemetry labels: mono 0.75rem, 500, +0.14em, uppercase, cream-55; hover/current turns cream with a 1px accent underline that scales in from the left.
- Scrolled state: 60px glass bar (blur + hairline). Mobile/tablet (< 1100px): full-void overlay with a warm floor glow, display-size links with accent mono index numbers, staggered rise.
- Phone number is a quiet mono utility link with an accent icon.

### System Card (`.system-card`)
The service module. Void-900 sharp surface, hairline border (hover: line-strong). Crown visual: pixelated image at 0.5 opacity sinking into the card's void via a bottom gradient. Body: accent mono **designation** (`.label` in `--accent`), title, cream-72 pitch, then numbered capabilities: hairline-topped rows prefixed `(01)` `(02)` in accent mono via CSS counters. Footer link: mono uppercase, hairline underline, arrow glyph appended, hover to accent.

### Flow Diagram (`.flow`)
A bordered void-900 console with a star-chart dot grid. HTML node chips (`.flow__wp`: void-850, line-strong border, sharp) are absolutely positioned by `--x/--y` custom properties over an SVG wire layer; container-query font sizes keep labels proportional. Vermillion pulses travel the wires (JS-driven so green lock-ins land exactly on contact: stroke turns `--ok`, green glow); a dashed return path drifts backward for the feedback loop. The single accent-filled chip is the output. Registration corners mark the panel. Mobile: wires hide and chips restack as a pill rail joined by 1px connectors.

### Marquee (`.marquee`)
Edge-masked logo belt (transparent to 14%/86%). Logos are forced to dimmed cream via `filter: brightness(0) invert(96%)` at 0.5 opacity, full opacity on hover. Track slides one group-width in 45s, pauses on hover, becomes a plain scroller under reduced motion.

### FAQ (`.faq`)
Sticky intro left, `<details>` accordion right. Items are hairline-topped rows; the summary is a 1.125rem subhead-stretch line with a "+" that rotates 45 degrees when open. Answers are cream-72, 58ch max.

### Inputs / Fields
- **Style:** sharp (radius 0), void-900 fill on void pages (void-950 inside void-900 panels on /impact/), hairline border, cream text, cream-32 placeholder.
- **Focus:** `outline: none`, border turns `--accent`. Hover: border to line-strong.
- **Error:** border accent, small accent error line toggled by `.is-visible`; `aria-invalid` drives the style.
- **Labels:** mono uppercase tracked cream-55 (quiz); plain small cream-55 on /impact/ panels. Selects get an inline cream SVG chevron, `appearance: none`.

### Quiz Funnel (`quiz.css`)
The multi-step grammar: minimal sticky glass header (`.quiz-nav`, logo + phone only, no menu), hairline progress bar with accent fill and mono "step N" counter (accent numeral), one question per screen on a 780px stage framed by registration corner marks. Steps toggle `display` with a rise animation. Option rows (`.quiz-option`): sharp void-900 rows with an accent mono key letter, cream-72 text, and a circular radio ring; checked state turns border accent, fill void-850, ring becomes an accent-dotted radio via inset shadows. Back is a bare mono button; contact step is a two-column field grid; the finish step embeds Calendly in a hairline frame (max-width 648px to force its single-column layout).

### Impact Surface (`impact.css`, /impact/)
The Signal grammar over the same tokens: full-bleed canvas signal field behind the hero with a vignette; a green mono "Signal locked" chip positioned by JS-set `--lock-x/--lock-y` with a pulsing lock ring (the page's one motion moment). Hero content: hgroup eyebrow sentence + display headline, lede, two pill actions, then a mono **telemetry readout** row (facts as `label`-style spans with cream `<b>` values). Below: channel strips (hairline rows, faint mono channel IDs that turn accent on hover, title + line + scope), the arc diagram (line-strong base curve, accent signal curve, green end marker, corner marks, four phase columns whose mono measurement window sits under each heading), criteria and fit lists as hairline rows with green check SVGs, **commitment plaques** (`.impact-commit`: line-strong bordered void-900 blocks with a green mono tag), and form **panels** (`.impact-panel`: void-900, hairline; the primary panel's border warms to rgba accent 0.45).

### Page Scaffolding (service subpages)
`.page-hero` (nav-offset padding, warm floor glow echoing the homepage horizon), `.band` full-width 21/9 image strips between hairlines, `.jumpnav` hairline anchor row, `.defblock` (1fr/1.4fr definition splits with a large lead), `.dgrid` (shared-border 2-col cells), `.steps` (giant accent display numerals beside 62ch bodies), `.pricing__grid` (shared-border trio, one `--accent` filled card), `.xlink` cross-link bar. In-copy prose links are cream with a line-strong underline (3px offset), hover accent; mono utility links underline in accent.

## Do's and Don'ts

### Do:
- **Do** build heroes as an `<hgroup>`: sentence-case editorial eyebrow (may be the H1), display headline, 44ch lede, primary + ghost pill pair, and if facts appear, a mono telemetry row.
- **Do** partition with 1px `--line` hairlines and the void ladder (950 page, 900 panel, 850 raised); express hierarchy through cream opacities.
- **Do** keep one primary CTA intent per page and one authored motion moment above the fold; below it, only slow linear ambient loops and 180/320ms state transitions on `--ease-out`.
- **Do** wrap every animation in `prefers-reduced-motion: no-preference` and give every interactive element the 2px accent-bright `focus-visible` outline at 3px offset (fields instead turn their border accent).
- **Do** read identity facts (phone, email, tagline, logo path) from `src/data/company.ts` and load per-surface CSS via BaseLayout's `styles` prop, after main.css.
- **Do** start every page `<title>` with "Aivium Digital | ".

### Don't:
- **Don't** use em dashes anywhere in site copy.
- **Don't** set kickers or eyebrows in mono, uppercase, brackets, or chip styling; mono designations belong only to cards, telemetry, and measurements. Editorial sentences only.
- **Don't** round a surface or sharpen an interactive element; radius is 0 or 999px, nothing between.
- **Don't** use box-shadows for elevation, gray hex values for text, or a light theme; the world is one locked dark theme.
- **Don't** use `--accent-deep` as text, `--ok` green as decoration or CTA, or accent fills beyond buttons and the one earned block per diagram/grid.
- **Don't** fabricate stats, dates, testimonials, partners, or counters; numbers on screen are real and sourced (mono disclosure lines under stat rows).
- **Don't** expand the engine roster: the six engines are ChatGPT, Claude, Gemini, Perplexity, Copilot, Google AI Overviews, and they are "engines", not "surfaces".
