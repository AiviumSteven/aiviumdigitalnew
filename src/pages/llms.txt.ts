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
    '> AI agents, assistants, and workflow automations for small and mid-size',
    '> businesses.',
    '',
    '## Services',
    '',
    `- [Generative Engine Optimization Services](${SITE}/ai-seo/): GEO and AEO services. Answer audits, entity and source engineering, answer-shaped content, and monthly share-of-answer tracking across the six major answer engines.`,
    `- [AI Automation & Custom AI Solutions](${SITE}/ai-automation/): Custom AI agents, assistants, and workflow automations built on the client's own data, wired into the tools the business already runs.`,
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
    `- [Signals](${SITE}/signals/): Working notes from the team on GEO, AI search visibility, and AI automation.`,
    `- [About Steven Mills](${SITE}/about-steven/): Founder & CEO of Aivium and Aivium Digital; a decade-plus in digital marketing, specialized in AI since 2022; writes or reviews every Signals post.`,
    '- Contact: hello@aiviumdigital.com',
    '',
  ];
  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
