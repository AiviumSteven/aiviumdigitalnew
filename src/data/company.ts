/**
 * Company identity — the single source of truth for Aivium Digital's
 * public facts. Header, footer, pages, and JSON-LD all read from here;
 * never hardcode the phone number, email, or brand facts on a page.
 *
 * Facts mirror the canonical listing kit in AUTHORITY-PLAYBOOK.md §0
 * (fact-checked 2026-08-01); legalName confirmed by Steven 2026-08-05.
 * Deliberately absent until the owner confirms them: street address,
 * geo coordinates, opening hours. Do not add them here without
 * confirmation.
 */
export const COMPANY = {
  brandName: "Aivium Digital",
  legalName: "Aivium Digital LLC",
  url: "https://aiviumdigital.com",
  phoneDisplay: "240-730-4333",
  phoneE164: "+12407304333",
  email: "hello@aiviumdigital.com",
  /** Public base: the Hagerstown, Maryland area. No street address. */
  locationLabel: "Maryland",
  regionLabel: "Hagerstown, Maryland",
  foundingYear: "2026",
  tagline: "Be the answer AI gives.",
  logoPath: "/assets/aivium-digital-lockup-horizontal-dark.svg",
  /** Verified company profiles only (playbook kit). */
  sameAs: [
    "https://aivium.com/",
    "https://www.linkedin.com/company/aiviumdigital/",
    "https://www.facebook.com/61578202922047/",
    "https://www.google.com/maps?cid=18225373925096010945",
  ],
  parent: {
    name: "Aivium",
    url: "https://aivium.com/",
    id: "https://aivium.com/#organization",
  },
} as const;
