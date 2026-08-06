/**
 * /llms.txt — a plain-text site guide for AI crawlers and agents,
 * generated at build time so Signals posts are always listed
 * (replaces the hand-maintained public/llms.txt). Spec: https://llmstxt.org/
 */
import type { APIRoute } from 'astro';
import { getSignalRefs } from '../lib/signals';

const SITE = 'https://aiviumdigital.com';

export const GET: APIRoute = async () => {
  const posts = await getSignalRefs();
  const lines: string[] = [
    '# Aivium Digital',
    '',
    '> Aivium Digital is an AI SEO agency. We get brands cited and recommended in',
    '> AI-generated answers across ChatGPT, Claude, Gemini, Perplexity, Copilot, and',
    '> Google AI Overviews (generative engine optimization, GEO), and we build custom',
    '> AI agents, assistants, and workflow automations for established businesses,',
    '> from local operators to enterprise.',
    '',
    '## Services',
    '',
    `- [All Services](${SITE}/services/): The full catalog: AI visibility (GEO, AEO, AI Overviews optimization, share-of-answer tracking) and AI solutions (agents, assistants, automations, integrations), and how the two systems compound.`,
    `- [Generative Engine Optimization Services](${SITE}/ai-seo/): GEO and AEO services. Answer audits, entity and source engineering, answer-shaped content, and monthly share-of-answer tracking across the six major answer engines.`,
    `- [AI Automation & Custom AI Solutions](${SITE}/ai-automation/): Custom AI agents, assistants, and workflow automations built on the client's own data, wired into the tools the business already runs.`,
    `- [AI Visibility Audit](${SITE}/ai-visibility-audit/): The audit that opens every engagement: brand mentions, competitor share, and source citations across six answer engines. Starts with a free 30-minute discovery call.`,
    `- [Home Services](${SITE}/industries/home-services/): AI visibility and automation for roofing, HVAC, plumbing, electrical, landscaping, and fencing companies.`,
    '',
    '## Locations',
    '',
    `- [Maryland](${SITE}/locations/maryland/): Maryland-based, nationally serving; AI visibility and automation for Maryland businesses.`,
    `- [Hagerstown, MD](${SITE}/locations/hagerstown-md/): Western Maryland home base; AI strategy and implementation for regional businesses.`,
    '',
    ...(posts.length > 0
      ? [
          '## Signals',
          '',
          ...posts.map(
            (p) => `- [${p.title}](${SITE}/signals/${p.slug}/): ${p.excerpt ?? ''}`.trimEnd(),
          ),
          '',
        ]
      : []),
    '## Company',
    '',
    `- [Homepage](${SITE}/): Overview of both service systems, process, and FAQ.`,
    `- [About Aivium Digital](${SITE}/about/): The AI visibility and AI solutions division of Aivium: what it does, who it serves, and the three operating pillars.`,
    `- [Process](${SITE}/process/): The seven phases every engagement runs, from discovery and baseline to measurement and iteration.`,
    `- [Case Studies](${SITE}/case-studies/): The publication standard for client results; studies appear as clients approve them.`,
    `- [Signals](${SITE}/signals/): Working notes from the team on GEO, AI search visibility, and AI automation.`,
    `- [About Steven Mills](${SITE}/about-steven/): Founder & CEO of Aivium and Aivium Digital; a decade-plus in digital marketing, specialized in AI since 2022; writes or reviews every Signals post.`,
    '- Contact: hello@aiviumdigital.com · 240-730-4333',
    '',
  ];
  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
