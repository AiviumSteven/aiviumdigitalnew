---
title: 'Robots.txt and AI visibility: is your website quietly blocking ChatGPT, Claude, and Google?'
excerpt: 'Your robots.txt file may be quietly blocking ChatGPT, Claude, and Google AI. How the 2026 AI crawler landscape actually works, the misconfigurations we keep finding in audits, and the five-layer check that decides whether AI engines can reach your business.'
publishedAt: 2026-08-11
draft: false
image: ../../assets/signals/robots-txt-ai-visibility/hero.png
imageAlt: 'A thin vermillion beam of light passing through a narrow slit in a dark monolith floating in space.'
faq:
  - q: 'Does blocking GPTBot remove my website from ChatGPT Search?'
    a: 'Not necessarily. OpenAI uses GPTBot for potential model training and a separate crawler, OAI-SearchBot, for ChatGPT search discovery. OpenAI tells publishers to allow OAI-SearchBot if they want content included in ChatGPT summaries and snippets. You can decline AI training and still participate in AI search.'
  - q: 'Does blocking Google-Extended stop my site from appearing in AI Overviews?'
    a: 'No. Google-Extended governs certain Gemini training and grounding uses, not Google Search. AI Overviews and AI Mode are Search products whose eligibility flows through Googlebot and the normal index. Google is rolling out a separate Search Console control specifically for its Search generative AI features.'
  - q: 'Should I block a page in robots.txt if it already has noindex?'
    a: 'Usually not. A crawler must access the page to read its noindex directive, so blocking the crawl can prevent the instruction from ever being seen. Both Google and OpenAI document this interaction. If the goal is keeping a page out of results, allow the crawl and let noindex do the work.'
  - q: 'Do I need an llms.txt file for AI visibility?'
    a: 'Not for Google. Google states that it does not use llms.txt and that publishing one has neither a positive nor negative effect on Search visibility, including its generative AI features. Fix crawler access, entity data, and liftable content first; llms.txt is optional at best in 2026.'
---

Blocking GPTBot does not remove you from ChatGPT Search. Blocking
Google-Extended does not remove you from AI Overviews. And a robots.txt file
nobody has audited since 2023 may be quietly deciding which AI engines can
see your business at all. Before any conversation about content, schema, or
citations, AI visibility starts with one unglamorous question: can the
systems answering your customers' questions actually reach your website?

We run [AI visibility audits](/ai-seo/) for a living, and misconfigured
crawler access is one of the most common problems we find, usually inherited
from an old SEO plugin, a copied template, or a bot rule someone added
during a scrape scare and forgot. In 2026, the web is crawled by search
crawlers, AI training crawlers, AI retrieval crawlers, user-triggered
agents, and now advertising-validation crawlers, side by side. They use
different user agents, they serve different functions, and blocking one has
a completely different business consequence from blocking another.

## Robots.txt is not a visibility switch

The Robots Exclusion Protocol dates to 1994 and was formally standardized as
[RFC 9309](https://www.rfc-editor.org/rfc/rfc9309.html) in 2022. Its job is
narrow: tell automated crawlers which URLs they may request. It is not a
security system, and despite a persistent SEO misconception, it is not
really an indexing control either.
[Google's own documentation](https://developers.google.com/search/docs/crawling-indexing/robots/intro)
warns that a URL blocked by robots.txt can still appear in Google Search if
Google discovers it through links elsewhere; it just shows up without a
useful description.

So a robots.txt rule never means "AI on" or "AI off." It means one specific
automated system may or may not request one specific part of your website.
What happens next depends entirely on which system you blocked.

## One AI company is not one crawler

The biggest mistake in most AI crawler discussions is treating each AI
company as if it operates a single bot. The better mental model splits AI
access into three functions, each with its own business consequence.

![Three thin beams of light approaching three apertures in a dark panel: two pass through, the third is stopped at a sealed gate.](../../assets/signals/robots-txt-ai-visibility/crawler-gates.png)

### Training crawlers

These collect content that may contribute to future model training:
[GPTBot](https://platform.openai.com/docs/bots) for OpenAI,
[ClaudeBot](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler)
for Anthropic. If you do not want your future content in model-development
datasets, these are the crawlers to restrict. But blocking a training
crawler does not automatically remove you from that company's search
product. OpenAI explicitly separates GPTBot from OAI-SearchBot, which means
a business can decline AI training while still participating in AI search.
Those are two different decisions.

### Search and retrieval crawlers

These discover and index the content used in current AI answers:
OAI-SearchBot for ChatGPT Search, Claude-SearchBot for Claude. Anthropic's
[crawler documentation](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler)
is unusually direct: disabling Claude-SearchBot prevents Anthropic from
indexing your content for search and "may reduce your site's visibility and
accuracy in user search results." Blocking a training bot is a
data-governance decision. Blocking a retrieval bot is a customer-acquisition
decision, and for anyone pursuing generative engine optimization, this is
the crawler family that deserves the most attention.

### User-triggered fetchers and agents

The third category fires when a real user asks an AI system to fetch a page
or complete a task: Anthropic's Claude-User, OpenAI's ChatGPT-User. As AI
moves from answering questions to performing tasks, an optimization layer
most GEO checklists still miss is emerging here. OpenAI's
[publisher guidance](https://help.openai.com/en/articles/12627856-publishers-and-developers-faq)
says ChatGPT's agent in Atlas reads ARIA labels and roles, the same
accessibility markup that supports screen readers, to understand buttons,
menus, and forms. Accessibility, UX, and AI-agent legibility are
converging.

## The fourth crawler: advertising validation

OpenAI now documents OAI-AdsBot, used to validate and review ChatGPT Ads
landing pages. Its
[advertiser guidance](https://help.openai.com/en/articles/20001243-advertiser-guidance-for-allowing-openai-web-crawlers)
tells businesses that if a landing page fails validation, they should check
not only robots.txt but WAF rules, CDN rules, bot mitigation, JavaScript
challenges, CAPTCHAs, authentication, geographic restrictions, and rate
limiting.

Read that list again. Crawler accessibility is no longer just an SEO
concern; it is becoming advertising infrastructure. A team can build the
right campaign with the right landing page and still fail because an edge
rule blocks the platform's validation bot. That is where this entire
category is heading: automated systems consuming your website across the
whole customer journey.

## Google-Extended does not control AI Overviews

Google runs the most misunderstood crawler setup in AI visibility. There is
a token called
[Google-Extended](https://developers.google.com/search/docs/crawling-indexing/overview-google-crawlers),
and the name makes it sound like the switch for Google's AI search
experiences. It is not. Google-Extended controls whether crawled content may
be used to train future Gemini models and for certain Gemini grounding
uses. It does not control Google Search inclusion.

AI Overviews and AI Mode are Google Search products. Their eligibility flows
through Googlebot and the normal Search index:
[Google's documentation](https://developers.google.com/search/docs/appearance/ai-features)
says pages appearing as supporting links must be indexed, eligible for
Search, and able to appear with a snippet. So blocking Google-Extended does
not keep you out of AI Overviews, and allowing it does not get you in.

## The 2026 change: a dedicated Search generative AI control

Until recently, there was no way to separate "appear in Google Search" from
"appear in Google's AI answers." That changed this summer. Google is rolling
out a
[Search generative AI control](https://support.google.com/webmasters/answer/16908024)
in Search Console that lets eligible site owners exclude their links and
content from AI Overviews, AI Mode, and generative AI features in Discover,
while leaving the rest of their Search presence unaffected. It launched
UK-first in June 2026 under a CMA mandate and is expanding in waves, so if
you do not see it yet, that is the rollout, not a missing setting.

Sophisticated brands should now treat Google access as three separate
policy decisions:

1. **Traditional Search** is governed by indexing controls like `noindex`.
2. **Search AI experiences** (AI Overviews, AI Mode, generative Discover)
   are governed by the Search generative AI control.
3. **Gemini training and certain grounding uses** are governed by
   Google-Extended.

## Google now measures AI visibility too

Measurement has always been GEO's hardest problem: companies tracked Google
rankings with mature analytics while AI visibility ran on manual prompting
and log analysis. In June 2026, Google launched
[Search generative AI performance reports](https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports)
in Search Console, showing impressions, pages, countries, and devices for
AI Overviews, AI Mode, and generative features in Discover. The
[report](https://support.google.com/webmasters/answer/16984139) is rolling
out to a subset of sites first and does not yet break out clicks or
queries, but the direction is clear: AI visibility is moving onto the same
dashboard as organic search.

## Three robots.txt traps we keep finding in audits

### The noindex paradox

Suppose you have a page you do not want in search results. You add
`noindex`, then block the page in robots.txt to be extra safe. Those two
layers undermine each other, because a crawler must access a page to read
the `noindex` instruction on it. Google
[documents this directly](https://developers.google.com/search/docs/crawling-indexing/robots/intro),
and OpenAI's
[publisher FAQ](https://help.openai.com/en/articles/12627856-publishers-and-developers-faq)
now gives the same warning: OAI-SearchBot must be able to crawl a page to
read its meta tag. Blocking crawling can prevent the crawler from ever
seeing your instruction not to index. Sites with years of inherited SEO
rules should audit for exactly this pattern.

### A specific bot group replaces the wildcard

Say your file has a `User-agent: *` group blocking utility directories, and
someone runs an AI audit and adds `User-agent: GPTBot` with `Allow: /`. It
looks like GPTBot was added to the existing rules. It was not. Under
[Google's documented group-matching behavior](https://developers.google.com/search/docs/crawling-indexing/robots/robots_txt),
a crawler follows the single most specific user-agent group that applies to
it; specific groups and the wildcard group are not combined. Creating a
dedicated AI crawler group silently removes every restriction that crawler
used to inherit from `*`. This is why pasting an "AI-friendly robots.txt
template" from a blog post is more dangerous than it looks. Robots.txt is
not a checklist; it is logic.

### Path matching is literal, and failures are asymmetric

Per
[Google's spec](https://developers.google.com/search/docs/crawling-indexing/robots/robots_txt),
`Disallow: /fish` matches `/fish.html`, `/fish/salmon.html`, and even
`/fishheads`, while `Disallow: /fish/` only matches inside the directory,
and `/Admin/` and `/admin/` are different paths. On a large site, one
trailing slash or capitalization mismatch quietly changes access to
thousands of URLs. The file's own availability matters just as much: if
`/robots.txt` returns a `4xx`, Google generally crawls as if no
restrictions exist, but if a server error prevents fetching it, Google
initially stops crawling the site while it retries, working from a cached
copy that normally lasts up to 24 hours. A deployment that breaks
robots.txt can throttle crawling while every actual page works perfectly.
Monitor the file like infrastructure, not like copy.

## Robots.txt is one layer of five

A perfect robots.txt file does not mean an AI crawler can reach your
website, because the request can fail before robots.txt ever matters. In
our audits we test crawlability as a five-layer chain:

![A single vermillion beam of light passing through five successive dark gates receding into space.](../../assets/signals/robots-txt-ai-visibility/five-layers.png)

1. **Network and edge access.** Can the crawler get through your CDN,
   firewall, WAF, or bot-management platform?
2. **Robots.txt permission.** If it reaches the site, does your published
   policy allow the request?
3. **HTTP behavior.** Does the crawler receive a healthy `200`, or 403s,
   429s, redirect chains, and server errors?
4. **Content delivery and rendering.** Is the important information present
   in a form the system can actually retrieve?
5. **Parseability.** Once retrieved, is the page structured clearly enough
   for machines to understand the business, services, and relationships on
   it?

The failure points are documented by the platforms themselves: Google
recommends confirming that crawling is permitted through both robots.txt
and your CDN or hosting infrastructure, and OpenAI tells advertisers to
inspect WAFs, bot mitigation, CAPTCHAs, and rate limiting when automated
access fails. Opening `example.com/robots.txt` and seeing `Allow: /` proves
almost nothing. The only real test is whether the intended crawler actually
receives the intended content, and that takes logs, request testing, and
infrastructure inspection.

## Preference is not protection

One boundary matters in the other direction too: crawler directives are not
security. [RFC 9309](https://www.rfc-editor.org/rfc/rfc9309.html) states
outright that the protocol is not a substitute for access controls, and
2025 provided the case study. Cloudflare
[published test results](https://blog.cloudflare.com/perplexity-is-using-stealth-undeclared-crawlers-to-evade-website-no-crawl-directives/)
claiming Perplexity continued retrieving content after its declared
crawlers were blocked, using undeclared user agents, IPs, and networks, and
removed Perplexity from its verified-bot program. Perplexity disputed the
characterization. The business lesson is simpler than the controversy:
robots.txt expresses preference, authentication controls access. If content
genuinely must stay private, do not put it on the public web and expect a
text file to guard it.

## What about llms.txt?

Robots.txt is an access protocol; `llms.txt` is a proposed machine-readable
content guide for language models, and the two keep getting conflated.
Google's guidance is blunt:
[Google Search does not use llms.txt](https://www.searchenginejournal.com/googles-says-its-fine-to-use-llms-txt-for-ai-seo/579608/),
and creating one has neither a positive nor negative effect on visibility,
including Google's generative AI features. There is also a wide gap between
the number of sites publishing llms.txt files and evidence of major
citation-driving crawlers requesting them at meaningful scale. It may earn
a role someday. But do not spend a week perfecting an optional AI
navigation file while your actual search crawler is getting a 403 from
your WAF.

## What a 2026 AI crawler audit should answer

The practical question is not "are AI bots allowed?" It is "which systems
are we intentionally allowing to do what?" Five steps:

1. **Identify** which crawlers are reaching your site and why each exists:
   training, search retrieval, user-directed access, or ads validation.
2. **Decide** your policy per function. Wanting AI-search visibility while
   declining model training is a coherent, achievable position.
3. **Validate** that robots.txt actually implements that policy, including
   group precedence, path matching, and inherited legacy rules.
4. **Test** the full delivery chain: CDN, WAF, response codes, redirects,
   bot protection, and the content actually returned to each crawler.
5. **Measure** the result: Search Console's generative AI report where
   available, ChatGPT referrals via the `utm_source=chatgpt.com` parameter,
   and server logs confirming crawler access.

## Access is eligibility, not ranking

Opening your site to OAI-SearchBot does not guarantee ChatGPT citations,
allowing Claude-SearchBot does not guarantee Claude recommendations, and
Google [says plainly](https://developers.google.com/search/docs/appearance/ai-features)
that meeting its technical requirements guarantees nothing. Crawler access
is not a ranking factor. It is eligibility. Your content still has to be
liftable, your entity still has to be understandable, and your authority
still has to be corroborated across the sources engines trust. But none of
those investments pay off if the systems you want to influence cannot
reliably fetch the pages that prove them.

## The web has a new machine audience

For thirty years, websites were built for two audiences: people and search
engines. There is now a third, made of AI search crawlers, retrieval
systems, and agents that read, cite, and increasingly act on your pages,
each with its own identity, purpose, access rules, and commercial
consequences.

![A dark planet horizon with a vermillion rim light and dozens of faint signal lines descending from space toward points on the surface.](../../assets/signals/robots-txt-ai-visibility/machine-audience.png)

Robots.txt is a tiny text file that now sits at the intersection of SEO, AI
search, data governance, web infrastructure, and advertising. Our position
at Aivium Digital is simple: before asking whether AI understands your
business, make sure AI can reach it. Crawlability is where
[our GEO engagements](/ai-seo/) start, because being authoritative is
worthless if the engines answering your customers cannot see the authority
you built. If you want to know what ChatGPT, Claude, Gemini, Perplexity,
Copilot, and Google AI Overviews can actually see of your site today,
[book a discovery call](/discovery/) and we will run the checks live.
