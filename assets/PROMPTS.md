# Aivium Digital, asset generation prompts

Shared palette for every prompt: void black #090C10, brand ink #0D1117,
cream #F6F2EA, vermillion #E5391B. Warm light against cold dark. No blue,
no purple, no cyan, ever.

Consistency tip: generate the planet horizon first, then feed it back as a
style reference for the section renders so the whole set shares one look.

---

## 1. Planet horizon render (hero background)

Size: 3200x1600 (2:1). Slot: replaces the CSS horizon in the hero.

> Cinematic view from low orbit of a dark planet's curved horizon rising
> from the bottom of the frame. The planet surface is near-black charcoal
> (#0D1117) with extremely subtle rocky texture, barely visible. Along the
> curved rim, a thin intense line of warm vermillion-orange light (#E5391B)
> like the last moment of a sunrise from space, glow fading upward into
> deep atmospheric haze of burnt orange and dark red. Above: pure cold
> near-black space (#090C10) with sparse tiny cream-white stars. No sun
> visible, no lens flare, no text, no spacecraft. Photorealistic with fine
> film grain, inspired by NASA photography and the film Interstellar.
> Composition: horizon arc spans the full width, peaking at 40 percent
> from the bottom; upper 60 percent is almost empty dark space for text
> overlay. Moody, premium, restrained.

Variant to also generate: same scene but the rim light only, no visible
surface texture (safer fallback if the texture reads noisy behind text).

## 2. OG / social share image

Size: 1200x630. Slot: og:image site-wide.

> Wide social banner, deep space scene. Bottom third: curved dark planet
> horizon with a thin vermillion (#E5391B) rim light glowing against
> near-black space (#090C10), sparse tiny cream stars above. Left side and
> center intentionally empty and dark for a logo overlay. Photorealistic,
> subtle film grain, warm light against cold dark, no blue tones, no text,
> no lens flare. Inspired by NASA orbital photography.

Then overlay the horizontal dark lockup (assets/) top-left at roughly
40px margin. Keep text out of generation, type always gets composited.

## 3. Section renders, services and features

Size: 1600x1200 (4:3) each. Slots: services cards, feature sections.
Style clause to append to all four:

> ...Rendered in a consistent style: near-black background (#090C10),
> single warm vermillion (#E5391B) light source, thin cream (#F6F2EA)
> accents, fine film grain, photoreal lighting on minimal geometry, vast
> negative space, no blue or purple, no text, no lens flare. Premium,
> restrained, cinematic.

a. **Signal / GEO (being the cited answer):**
> A single thin beam of warm vermillion light cutting diagonally through
> dark space, illuminating faint drifting dust particles along its path,
> originating from beyond the top-left corner...

b. **Orbital paths / strategy:**
> Three thin elliptical orbit lines in faint cream, seen at a shallow
> angle in dark space, one small matte sphere on the outermost orbit
> catching vermillion rim light on one edge...

c. **Constellation network / entity building:**
> A sparse constellation of small cream points connected by hair-thin
> lines forming an irregular network in dark space, one node glowing
> vermillion and slightly larger than the rest...

d. **Deep space telescope / visibility measurement:**
> The silhouette of a minimal geometric satellite dish or telescope form
> in the lower-right, edge-lit in vermillion against near-black space, a
> faint cream signal wave arc emanating toward the upper-left...

## 4. Icon-only mark

Recommendation: derive this in vector directly from the wordmark's "AI"
glyphs (the vermillion part of the lockup) rather than generating it;
generation is for concept exploration only.

Exploration prompt (concepts, not final art):
> Minimal geometric logo mark for a space-frontier AI agency named Aivium.
> A sharp triangular A form suggesting both a mountain apex and a rocket,
> intersected by a thin horizon line, flat vector style, single color
> vermillion #E5391B on off-black #0D1117, centered in a square, heavy
> negative space, no gradients, no text, no glow. Swiss logo design,
> timeless, 1970s NASA-era modernism.

Deliverables once a direction is picked: square SVG, cream variant,
vermillion variant, 32px-legible favicon cut.

## 5. Service page banner renders (Higgsfield, GPT Image 2)

Size: 21:9 wide (2k). Slots: the .band cover images on /ai-seo/ and
/ai-automation/ (currently placeholder planets). Generate with:
`higgsfield generate create gpt_image_2 --prompt "..." --aspect_ratio 21:9 --resolution 2k --wait`
Append the §3 style clause to both prompts.

a. **/ai-seo/ — citation constellation (assets/pages/geo-hero.png):**
> A sparse constellation of small cream points connected by hair-thin
> lines forming an irregular network across dark space, one central node
> glowing warm vermillion and slightly larger than the rest, a thin
> vermillion signal beam entering from the left edge and terminating at
> the glowing node, extremely wide cinematic composition, mostly empty
> void...

b. **/ai-automation/ — orbital machinery (assets/pages/automation-hero.png):**
> A minimal geometric assembly of small matte satellites and thin
> connecting armatures arranged in a precise horizontal line across dark
> space, like an orbital production line, each unit catching warm
> vermillion rim light on one edge, faint cream guide lines linking unit
> to unit, extremely wide cinematic composition, vast negative space...
