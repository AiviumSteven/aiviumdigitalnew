/**
 * /llms.txt — a plain-text site guide for AI crawlers and agents,
 * generated at build time so Field Notes posts are always listed
 * (replaces the hand-maintained public/llms.txt). Spec: https://llmstxt.org/
 */
import type { APIRoute } from 'astro';
import { getFieldNoteRefs } from '../lib/fieldNotes';

const SITE = 'https://aiviumdigital.com';

export const GET: APIRoute = async () => {
  const posts = await getFieldNoteRefs();
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
          '## Field Notes',
          '',
          ...posts.map(
            (p) => `- [${p.title}](${SITE}/field-notes/${p.slug}/): ${p.excerpt ?? ''}`.trimEnd(),
          ),
          '',
        ]
      : []),
    '## Company',
    '',
    `- [Homepage](${SITE}/): Overview of both service systems, process, and FAQ.`,
    `- [Field Notes](${SITE}/field-notes/): Working notes from the team on GEO, AI search visibility, and AI automation.`,
    '- Contact: hello@aiviumdigital.com',
    '',
  ];
  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
