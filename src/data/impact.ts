/**
 * Impact Partner program: the single source of truth for everything on
 * /impact/ that changes between program cycles. Pages read from here;
 * no dates, dollar figures, or status flags are hard-coded in markup.
 *
 * Lifecycle: flip `applicationStatus` as the program moves.
 *   "announced" → page live, applications not open yet (notify capture)
 *   "open"      → /impact/apply/ multi-step application live
 *   "closed"    → forms replaced by next-cycle interest capture
 *   "selected"  → hero introduces the partner (fill `selectedPartner`)
 */

export type ApplicationStatus = "announced" | "open" | "closed" | "selected";

export interface SelectedPartner {
  name: string;
  location: string;
  mission: string;
  /** Route of the future case-study page, e.g. "/impact/2026-org-slug/". */
  caseStudyPath?: string;
}

export interface ImpactProgram {
  year: string;
  region: string;
  applicationStatus: ApplicationStatus;
  /**
   * Approved donated-services figure, e.g. "Up to $25,000+". Stays null
   * until the owner signs off; the hero renders nothing in its place and
   * the mission carries the page.
   */
  serviceValue: string | null;
  /**
   * Display-ready dates ("August 15, 2026"). null = not announced;
   * unset dates never render. Never show "TBD" to a visitor.
   */
  dates: {
    applicationsOpen: string | null;
    applicationsClose: string | null;
    finalistReview: string | null;
    partnerAnnounced: string | null;
    engagementBegins: string | null;
  };
  selectedPartner: SelectedPartner | null;
  utmCampaign: string;
}

export const IMPACT_PROGRAM: ImpactProgram = {
  year: "2026",
  region: "Mid-Atlantic",
  applicationStatus: "announced",
  serviceValue: null,
  dates: {
    applicationsOpen: null,
    applicationsClose: null,
    finalistReview: null,
    partnerAnnounced: null,
    engagementBegins: null,
  },
  selectedPartner: null,
  utmCampaign: "impact_partner_2026",
};

/** The four capability channels the engagement can draw from. */
export const IMPACT_CHANNELS = [
  {
    designation: "CH‑01",
    name: "Be found",
    line: "Show up where people look now: traditional search, local search, and the answers AI engines give.",
    scope: ["Search visibility", "AI visibility", "Local presence", "Site structure", "Content strategy"],
  },
  {
    designation: "CH‑02",
    name: "Reach more people",
    line: "Turn attention into action so more visitors become donors, volunteers, and program participants.",
    scope: ["Conversion paths", "Donation journeys", "Volunteer journeys", "Forms", "Email capture"],
  },
  {
    designation: "CH‑03",
    name: "Work smarter",
    line: "Let systems and AI absorb the repetitive work while people keep the judgment calls.",
    scope: ["Internal workflows", "Intake", "Follow-up", "CRM improvements", "Knowledge access"],
  },
  {
    designation: "CH‑04",
    name: "Build for what's next",
    line: "Document everything, train the team, and leave the organization more capable than we found it.",
    scope: ["Training", "Documentation", "Measurement", "Roadmap", "Enablement"],
  },
];

/** The engagement arc: four phases along one rising signal. */
export const IMPACT_PHASES = [
  {
    n: "01",
    name: "Discover",
    window: "Weeks 1–2",
    line: "Baseline everything: visibility, systems, audiences, and the highest-leverage opportunities.",
  },
  {
    n: "02",
    name: "Build",
    window: "Months 1–3",
    line: "Implement the few initiatives that matter most instead of spreading effort thin.",
  },
  {
    n: "03",
    name: "Optimize",
    window: "Months 4–6",
    line: "Refine what shipped and give real signals enough runway to emerge.",
  },
  {
    n: "04",
    name: "Enable",
    window: "Throughout",
    line: "Train the team and hand off the Impact Playbook: what we found, what changed, what comes next.",
  },
];

/** Who we're listening for: the readiness checklist. */
export const IMPACT_CHECKLIST = [
  "A legitimate nonprofit or charitable organization",
  "Primarily serving Mid-Atlantic communities",
  "Active operations and an established mission",
  "Leadership willing to participate",
  "One primary project contact",
  "Timely access to relevant systems and analytics",
  "A clear visibility, technology, or operational challenge",
  "Willingness to set measurable goals",
  "Comfort with the engagement being documented",
  "Time for periodic meetings and interviews",
];

/** Selection criteria: how the partner is chosen. */
export const IMPACT_CRITERIA = [
  {
    name: "Community impact",
    line: "How meaningful and clearly defined is the mission?",
  },
  {
    name: "Opportunity",
    line: "Can our capabilities materially improve outcomes here?",
  },
  {
    name: "Readiness",
    line: "Can the organization give the collaboration and access the work needs?",
  },
  {
    name: "Measurability",
    line: "Can we baseline today and honestly evaluate what changed in six months?",
  },
];

/** Program boundaries: not automatically included. */
export const IMPACT_NOT_INCLUDED = [
  "Unlimited website development",
  "Unlimited content creation",
  "Unlimited social media management",
  "Paid advertising spend",
  "Third-party software fees",
  "Hosting costs",
  "Printing",
  "Photography and video production",
  "Hardware",
  "Unrelated IT support",
  "Unlimited revisions",
  "Work outside the agreed scope",
];

/** Page FAQ: rendered as accordion and FAQPage JSON-LD. No em dashes. */
export const IMPACT_FAQS = [
  {
    q: "Is the program really free?",
    a: "Yes. Aivium Digital's professional services within the agreed six-month scope are provided pro bono.",
  },
  {
    q: "Are there any costs at all?",
    a: "Potential third-party software, hosting, advertising, printing, or other outside expenses are not automatically included. If we recommend something that carries an external cost, we discuss it with the organization before any commitment is made.",
  },
  {
    q: "Do we need to know what AI or technology we need?",
    a: "No. We would rather start with your goals and constraints than a predetermined technology request. Identifying the right opportunities is part of the engagement.",
  },
  {
    q: "What kinds of nonprofits should apply?",
    a: "Established charitable or nonprofit organizations serving Mid-Atlantic communities, with a meaningful mission, active operations, and leadership willing to participate in the project.",
  },
  {
    q: "Do we have to be a large organization?",
    a: "No. Selection is not based on size. We care about mission, readiness, fit, and whether we can create measurable impact during the engagement.",
  },
  {
    q: "How is the Impact Partner selected?",
    a: "Aivium Digital evaluates applicants on community impact, organizational readiness, fit with our capabilities, and the opportunity for measurable improvement. It is not a public vote or a popularity contest.",
  },
  {
    q: "Why do you document the project?",
    a: "So the work creates value beyond one organization. By documenting the process and results honestly, other nonprofits can learn what worked, what didn't, and where modern technology makes a real difference.",
  },
  {
    q: "Are we required to give a testimonial?",
    a: "No. The selected organization participates reasonably in documenting the engagement, but it will never be required to provide a positive testimonial.",
  },
  {
    q: "What happens after six months?",
    a: "The engagement concludes with documentation, training, and a recommended roadmap. There is no obligation to become a paying Aivium Digital client.",
  },
  {
    q: "Can someone nominate us?",
    a: "Yes. Volunteers, donors, board members, employees, and community members can nominate an organization. If a nominated organization looks like a fit, we invite its team to complete the formal application.",
  },
  {
    q: "Can I nominate more than one organization?",
    a: "Yes, as long as each nomination is submitted separately and in good faith.",
  },
];
