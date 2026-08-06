/**
 * Shared JSON-LD nodes — one entity graph, assembled per page.
 *
 * Rules this module enforces:
 * - One Organization @id sitewide: https://aiviumdigital.com/#org
 *   (the id the first crawled pages shipped with; never mint a second).
 * - One WebSite @id: https://aiviumdigital.com/#website.
 * - The Person entity home is stevenwmills.com; pages embed stubs via
 *   personStub() from data/authors.ts, never a full local Person node.
 * - No legalName, address, geo, openingHours, or aggregateRating until
 *   the owner confirms them (see docs/seo-implementation-report.md).
 */
import { COMPANY } from "../data/company";
import { getAuthor, personStub } from "../data/authors";

const site = COMPANY.url;

export const ORG_ID = `${site}/#org`;
export const WEBSITE_ID = `${site}/#website`;

/** Full Organization node — include once per page that emits JSON-LD. */
export function orgNode() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: COMPANY.brandName,
    legalName: COMPANY.legalName,
    url: `${site}/`,
    logo: `${site}${COMPANY.logoPath}`,
    telephone: COMPANY.phoneE164,
    email: COMPANY.email,
    foundingDate: COMPANY.foundingYear,
    founder: personStub(getAuthor("steven-mills")),
    sameAs: [...COMPANY.sameAs],
    description:
      "Aivium Digital is an AI SEO agency for established businesses: " +
      "generative engine optimization (GEO) and answer engine optimization " +
      "(AEO) that get brands cited across ChatGPT, Claude, Gemini, " +
      "Perplexity, Copilot, and Google AI Overviews, plus custom AI " +
      "agents, assistants, and workflow automations.",
    parentOrganization: {
      "@type": "Organization",
      "@id": COMPANY.parent.id,
      name: COMPANY.parent.name,
      url: COMPANY.parent.url,
    },
  };
}

/** WebSite node for the homepage graph. */
export function webSiteNode() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${site}/`,
    name: COMPANY.brandName,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-US",
  };
}

/** WebPage node tying a route into the graph. */
export function webPageNode(path: string, name: string, description: string) {
  return {
    "@type": "WebPage",
    "@id": `${site}${path}#webpage`,
    url: `${site}${path}`,
    name,
    description,
    isPartOf: { "@id": WEBSITE_ID },
    inLanguage: "en-US",
  };
}

/** Service node bound to the Organization. */
export function serviceNode(opts: {
  path: string;
  name: string;
  serviceType: string;
  description: string;
}) {
  return {
    "@type": "Service",
    "@id": `${site}${opts.path}#service`,
    name: opts.name,
    serviceType: opts.serviceType,
    url: `${site}${opts.path}`,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "United States" },
    description: opts.description,
  };
}

/** BreadcrumbList from [name, path] pairs, Home first. */
export function breadcrumbNode(trail: [string, string][]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map(([name, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: `${site}${path}`,
    })),
  };
}

/** Wrap graph nodes in a @context envelope, ready for JSON.stringify. */
export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
