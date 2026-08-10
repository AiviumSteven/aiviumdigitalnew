# Aivium Impact Partner Landing Page — Claude Code Build Brief

## Purpose

Build a new landing page on the existing **Aivium.com** project for the **Aivium Impact Partner** program.

The program will select **one local / Mid-Atlantic nonprofit organization** for a **six-month pro bono Aivium engagement** focused on digital visibility, AI visibility, technology, automation, conversion, and organizational enablement.

This should feel like a serious community-impact initiative and flagship engagement — **not a giveaway, contest, or cheap lead-generation promotion**.

Primary route:

```text
/impact
```

Preferred canonical URL:

```text
https://www.aivium.com/impact
```

---

# 1. Core Goals

The landing page should:

1. Clearly explain the Aivium Impact Partner program.
2. Establish why Aivium is doing it.
3. Make the opportunity feel substantial and credible.
4. Encourage qualified nonprofits to apply.
5. Allow community members to nominate a nonprofit.
6. Explain expectations and case-study participation transparently.
7. Reinforce Aivium's human-first philosophy and community commitment.
8. Create a page that can remain permanently on the Aivium website and later archive prior Impact Partners.
9. Be easy to update with application dates, selected partners, results, and future program cycles.

---

# 2. Brand / Design Direction

## Use the existing Aivium design system

Do **not** redesign the site or create a disconnected microsite.

Use the same:

- Header
- Navigation
- Footer
- Typography
- Buttons
- Grid system
- Spacing conventions
- Responsive behavior
- Animation language
- Existing reusable components where possible

The new page should feel native to the current Aivium.com site.

### Parent Aivium colors

Use existing project tokens if they already exist.

Reference values:

```css
--aivium-black: #0A0908;
--aivium-orange: #F97316;
--aivium-cream: #F6F2EA;
```

Do not create duplicate hard-coded colors if the project already contains variables/tokens.

## Visual tone

The existing Aivium space / exploration aesthetic may be used, but reduce the "NASA-punk" intensity compared with a normal commercial page.

The emotional emphasis should be:

- Mission
- People
- Community
- Progress
- Possibility
- Stewardship
- Human capability

The nonprofit should feel like the hero.

Good subtle visual metaphors:

- Mission
- Trajectory
- Signal
- Reach
- Connection
- Navigation
- Launch
- Amplification

Avoid:

- Cartoon charity imagery
- Giant "$25,000 FREE!" giveaway graphics
- Sweepstakes aesthetics
- Confetti
- Overly salesy urgency
- Fake counters
- Fake testimonials
- Fake nonprofit logos
- Stock-style "handshake" imagery

---

# 3. Page Status / Configuration

Create a small configuration object or content file for values that will likely change.

Example:

```ts
const impactProgram = {
  year: "2026",
  serviceValue: "Up to $25,000+",
  applicationOpen: "TBD",
  applicationClose: "TBD",
  finalistDate: "TBD",
  announcementDate: "TBD",
  region: "Mid-Atlantic",
  applicationStatus: "open", // open | closed | selected
};
```

Do not scatter dates or program values throughout components.

If the project already has a preferred content/config architecture, follow it.

Until final dates are supplied, render clean copy such as:

> Applications for our first Impact Partner will open soon.

Do **not** visibly render "TBD" to users.

---

# 4. SEO / Metadata

## Title

```text
Aivium Impact Partner | Pro Bono AI & Digital Services for Nonprofits
```

## Meta description

```text
Aivium is selecting one nonprofit organization for a six-month pro bono engagement focused on digital visibility, AI, automation, technology and measurable community impact.
```

## Suggested Open Graph title

```text
Aivium Impact Partner
```

## Suggested Open Graph description

```text
Six months. One organization. Real measurable impact. Apply or nominate a nonprofit for the Aivium Impact Partner program.
```

Use the existing social-card / OG image conventions.

If an OG image does not exist yet, do not generate an unrelated placeholder. Use the site's standard fallback.

## Schema

Where consistent with the existing project, add appropriate `WebPage` / `Organization` structured data.

Do not add unsupported claims, reviews, ratings, or awards.

---

# 5. Page Structure

Recommended order:

1. Header
2. Hero
3. Program proof/value strip
4. Why Aivium is doing this
5. What the partnership can address
6. Six-month journey
7. Who should apply
8. Case-study / storytelling transparency
9. Selection process
10. Apply vs Nominate
11. A note from Steven
12. FAQ
13. Final CTA
14. Footer

---

# 6. HERO

## Eyebrow

```text
AIVIUM IMPACT PARTNER
```

## Headline

```text
Six months. One organization. Real measurable impact.
```

## Supporting copy

```text
We're selecting one nonprofit organization for a six-month pro bono Aivium engagement designed to help it get discovered, reach more people, work smarter and build for what's next.
```

## Primary CTA

```text
Apply for the Impact Partner Program
```

Primary action:

- Smooth-scroll to application section OR open the application flow.
- If the application is not yet open, change the CTA to:

```text
Get Notified When Applications Open
```

Do not show a dead button.

## Secondary CTA

```text
Nominate an Organization
```

## Hero supporting label

Use a small, tasteful proof/value line:

```text
Six-month pro bono engagement • Mid-Atlantic nonprofit focus • No obligation to become a paying client
```

If the approved service-value figure has been configured, optionally show:

```text
Up to $25,000+ in donated Aivium professional services
```

Do not make the dollar value visually louder than the mission.

---

# 7. VALUE / PROGRAM STRIP

Use 3 or 4 concise cells/cards.

Suggested content:

### 6 Months
A structured strategy, implementation and optimization engagement.

### $0 Professional Fees
Aivium's defined professional services are provided pro bono.

### One Impact Partner
One organization receives focused attention rather than a diluted giveaway.

### Measurable Outcomes
We establish a baseline, implement deliberately and document what changes.

Keep this section compact.

---

# 8. WHY THIS EXISTS

## Section label

```text
WHY WE'RE DOING THIS
```

## Headline

```text
Technology should amplify more than profits.
```

## Copy

```text
Some of the organizations doing the most important work in our communities are also working with the fewest resources.

They are trying to reach donors, volunteers, supporters and the people they serve — while small teams handle fundraising, operations, communications and everything in between.

At the same time, AI and modern digital technology are changing how organizations get discovered, communicate and operate.

We believe nonprofits should have access to that opportunity too.

Aivium Impact Partner is our way of putting that belief into practice: choosing one organization, understanding where technology can make the greatest difference, and doing the work alongside them.
```

Optional pull quote:

```text
The goal isn't to give a nonprofit more technology. It's to give its people more leverage to accomplish the mission.
```

---

# 9. WHAT WE MAY WORK ON

## Section label

```text
WHERE WE CAN HELP
```

## Headline

```text
We won't force your organization into a predetermined package.
```

## Intro

```text
We'll begin by understanding your mission, audience, current systems and biggest constraints. From there, we'll identify the highest-impact initiatives Aivium can realistically improve during the engagement.
```

Use four feature cards.

---

### Card 1 — Be Found

```text
Improve how the organization appears across traditional search, local search, AI-powered search and digital discovery.
```

Possible supporting items:

- Search visibility
- AI visibility
- Brand/entity presence
- Local visibility
- Website structure
- Content strategy

---

### Card 2 — Reach More People

```text
Reduce friction between discovery and action so more visitors become donors, volunteers, supporters, subscribers or program participants.
```

Possible supporting items:

- Conversion paths
- Calls to action
- Forms
- Donor journeys
- Volunteer journeys
- Email capture

---

### Card 3 — Work Smarter

```text
Identify repetitive or manual work that better systems, automation or AI can simplify without removing the human judgment that matters.
```

Possible supporting items:

- Internal workflows
- Intake
- Follow-up
- CRM improvements
- Administrative automation
- Knowledge access

---

### Card 4 — Build for the Future

```text
Document what we build, train the team and leave the organization more capable than when the engagement began.
```

Possible supporting items:

- Training
- SOPs
- Documentation
- Measurement
- Roadmap
- Enablement

---

# 10. THE SIX-MONTH JOURNEY

## Section label

```text
THE ENGAGEMENT
```

## Headline

```text
Built to create change — and enough runway to measure it.
```

Create a horizontal timeline on desktop and stacked timeline on mobile.

### 01 — Discover

```text
Weeks 1–2
```

```text
We establish a baseline, learn the organization, understand its mission and identify the highest-leverage opportunities.
```

Typical activities:

- Current-state assessment
- Visibility baseline
- Analytics review
- Technology/workflow review
- Audience and conversion review
- Opportunity prioritization

---

### 02 — Build

```text
Months 1–3
```

```text
We implement the agreed high-impact initiatives rather than spreading effort across an unlimited list of services.
```

---

### 03 — Optimize

```text
Months 4–6
```

```text
We monitor performance, refine what has been implemented, improve weak points and allow enough time for meaningful signals to emerge.
```

---

### 04 — Enable

```text
Throughout + Final Handoff
```

```text
We train the team, document systems and finish with a practical roadmap so the organization can continue building after the pro bono engagement ends.
```

Optional final deliverable card:

### Aivium Impact Playbook

```text
At the end of the engagement, the organization receives documentation covering what we found, what changed, how the new systems work, key results and recommended next steps.
```

---

# 11. WHO SHOULD APPLY

## Section label

```text
WHO WE'RE LOOKING FOR
```

## Headline

```text
A mission we believe in — and an organization ready to build.
```

## Intro

```text
Need matters, but readiness matters too. The strongest Impact Partner will be an organization where Aivium can realistically create and measure meaningful improvement in six months.
```

## Qualification checklist

The ideal applicant:

- Is a legitimate nonprofit / charitable organization.
- Primarily serves communities in the Mid-Atlantic region.
- Has active operations and an established mission.
- Has leadership willing to participate.
- Can designate one primary project contact.
- Can provide timely access to relevant digital systems and analytics.
- Has a clear visibility, technology, operational or digital challenge.
- Is willing to establish measurable goals.
- Is comfortable allowing Aivium to document the engagement and results.
- Can participate in periodic meetings, interviews or project documentation.

## Important note

```text
You do not need to know what technology or AI solution you need. Identifying the right opportunities is part of the engagement.
```

---

# 12. HOW THE PARTNER IS SELECTED

## Section label

```text
SELECTION
```

## Headline

```text
Not a popularity contest.
```

## Copy

```text
The Impact Partner will be selected by Aivium based on where we believe our team can create the greatest responsible, measurable impact.
```

Use four selection criteria cards:

### Community Impact
How meaningful and clearly defined is the organization's mission and community contribution?

### Opportunity
Are there specific areas where Aivium's capabilities can materially improve outcomes?

### Readiness
Can the organization provide the collaboration, access and internal ownership needed to make the engagement successful?

### Measurability
Can we establish a baseline and reasonably evaluate what changed during the six-month engagement?

Optional internal-only scoring system can be implemented in documentation/admin tooling but should not necessarily be shown numerically on the public page.

Recommended internal score:

```text
Community impact: 25%
Opportunity for measurable improvement: 25%
Organizational readiness: 20%
Fit with Aivium capabilities: 20%
Story / educational value: 10%
```

---

# 13. CASE STUDY TRANSPARENCY

This section is important and should not be buried in legal copy.

## Section label

```text
DOCUMENTING THE JOURNEY
```

## Headline

```text
We'll tell the story honestly.
```

## Copy

```text
Part of the purpose of Aivium Impact Partner is to show what thoughtful use of modern digital technology and AI can actually accomplish for a mission-driven organization.

The selected organization will allow Aivium to document the engagement — where we started, what we chose to change, what we implemented, what worked, what didn't and what measurable results followed.
```

Potentially documented:

- Baseline performance
- Before-and-after metrics
- Strategy
- Implementation
- Screenshots
- Interviews
- Photos or video
- Lessons learned
- Final outcomes

Include this trust statement prominently:

```text
The selected organization will never be required to provide a positive testimonial. We want to document the work authentically.
```

And:

```text
Any public case study will clearly disclose that Aivium provided the defined professional services pro bono through the Impact Partner program.
```

---

# 14. PROGRAM BOUNDARIES

Keep this visually lighter, but make it explicit.

## Headline

```text
A partnership — not unlimited agency services.
```

## Copy

```text
The selected engagement will have a clearly defined scope based on where Aivium believes it can create the greatest impact within the six-month period.
```

Not automatically included:

- Unlimited website development
- Unlimited content creation
- Unlimited social media management
- Paid advertising spend
- Third-party software fees
- Hosting costs
- Printing
- Photography / video production
- Hardware
- Unrelated IT support
- Unlimited revisions
- Work outside the agreed scope

Use this note:

```text
If a recommended initiative requires a third-party cost, we will discuss it before any commitment is made. The organization is never required to purchase additional services from Aivium.
```

---

# 15. APPLICATION / NOMINATION SECTION

This should be one of the most visually important parts of the page.

## Section label

```text
GET INVOLVED
```

## Headline

```text
Apply for your organization — or nominate one doing work you believe in.
```

Create two selectable cards/tabs:

---

## A. Apply

Label:

```text
I represent a nonprofit
```

Button:

```text
Start Application
```

### Application form fields

Keep the application intentionally concise.

Required:

1. Organization name
2. Website
3. Primary contact name
4. Primary contact role/title
5. Email
6. Phone
7. City
8. State
9. Organization mission / what you do
10. Who does the organization primarily serve?
11. Approximately how many people does the organization serve or engage each year?
12. What is the biggest challenge currently limiting your reach or impact?
13. What work do you wish technology could make easier?
14. What would a successful six months look like?
15. Who would serve as the primary project contact?
16. Are you willing and able to provide access to relevant website, analytics, CRM, search, advertising or operational systems as needed?
17. Are you comfortable allowing Aivium to publicly document the engagement and results?
18. Confirm that the information submitted is accurate.

### Optional

- Annual operating budget range
- Number of employees
- Number of volunteers
- Current CRM / donor platform
- How did you hear about the program?

Do not make budget a disqualifying visual focal point.

### Consent checkbox

```text
I understand that applying does not guarantee selection and that the selected engagement will be governed by a mutually agreed scope of work.
```

### Case-study checkbox

```text
I understand that participation as the selected Aivium Impact Partner requires reasonable participation in documenting the engagement and its results.
```

### Submit button

```text
Submit Application
```

Success state:

```text
Application received.

Thank you for the work your organization does and for taking the time to tell us about it. The Aivium team will review applications after the submission period closes. If we need additional information, we'll reach out using the contact details you provided.
```

Do not immediately push Calendly or a sales call after submission.

This is not a normal commercial lead funnel.

---

## B. Nominate

Label:

```text
I want to nominate an organization
```

Button:

```text
Nominate a Nonprofit
```

Fields:

1. Nonprofit name
2. Website, if known
3. City / State
4. Why are you nominating this organization?
5. Your name
6. Your email
7. Relationship to the organization
8. Optional nonprofit contact name/email if known

Consent:

```text
I understand that Aivium may contact the organization to invite it to apply.
```

Success:

```text
Nomination received.

Thanks for helping us discover organizations doing meaningful work. If the organization appears to be a fit, we'll invite its team to learn more and complete the formal application.
```

---

# 16. FORM IMPLEMENTATION

Follow the site's existing form architecture if one already exists.

Requirements:

- Server-side validation
- Client-side validation
- Spam protection
- Rate limiting where appropriate
- Accessible labels
- Proper autocomplete fields
- Clear error handling
- No silent submission failures
- Honeypot and/or existing anti-spam implementation
- Store timestamp and source URL
- Store application type: `application` or `nomination`
- Preserve UTM parameters where available

## CRM

If Aivium.com already has an Attio integration or shared lead-capture service, reuse that architecture rather than building a separate disconnected integration.

Do **not** treat these as ordinary sales leads.

Recommended metadata / tags:

```text
Source: Aivium Impact Partner
Submission Type: Application | Nomination
Program Year: 2026
Status: New
```

If the CRM schema supports a dedicated list / object / pipeline, prefer keeping Impact Partner submissions separate from normal sales opportunities.

Do not automatically enroll applicants into commercial sales sequences.

## Notifications

After a successful submission:

- Notify the designated Aivium internal recipient through the existing notification system.
- Include the organization name, submission type and a link / identifier to the submission.
- Do not send sensitive form content into insecure channels.

## Confirmation email

If the site already has transactional email infrastructure, send a simple confirmation.

Application subject:

```text
We received your Aivium Impact Partner application
```

Nomination subject:

```text
We received your Aivium Impact Partner nomination
```

Avoid marketing language.

---

# 17. A NOTE FROM STEVEN

Use a human photo or existing founder asset if one is already available in the project.

Do not use an AI-generated likeness.

## Section label

```text
A NOTE FROM STEVEN
```

## Copy

```text
I started Aivium around a simple belief: AI and technology should expand what people are capable of, not remove people from the equation.

I've also seen how many incredible organizations are doing meaningful work with limited resources. They shouldn't have to become technology companies just to benefit from where technology is going.

So rather than only talking about responsible, human-first technology, we want to put that belief into practice.

Our goal with Impact Partner is simple: find an organization already doing work that matters, give its people better tools and systems, and see how much further their mission can reach.

— Steven Mills
Founder & CEO, Aivium
```

Use the site's normal founder/title styling.

---

# 18. FAQ

Use an accessible accordion component if one exists in the project.

## Is the program really free?

```text
Yes. Aivium's professional services within the agreed six-month scope are provided pro bono.
```

## Are there any costs?

```text
Potential third-party software, hosting, advertising, printing or other outside expenses are not automatically included. If we recommend something that carries an external cost, it will be discussed with the organization before any commitment is made.
```

## Do we need to know what AI or technology we need?

```text
No. In fact, we would rather start with the organization's goals and challenges than a predetermined technology request. Identifying the right opportunities is part of the engagement.
```

## What kinds of nonprofits should apply?

```text
We are primarily looking for established charitable or nonprofit organizations serving communities in the Mid-Atlantic region that have a meaningful mission, active operations and leadership willing to participate in the project.
```

## Do we have to be a large nonprofit?

```text
No. Selection is not based on size alone. We care more about mission, readiness, fit and whether Aivium can create measurable impact during the engagement.
```

## How will the Impact Partner be selected?

```text
Aivium will evaluate applicants based on community impact, organizational readiness, fit with our capabilities and the opportunity to create measurable improvement. This is not a public vote or popularity contest.
```

## Why does Aivium want to document the project?

```text
We want the work to create value beyond a single organization. By documenting the process and results honestly, other nonprofits and organizations can learn from what worked, what didn't and where modern technology can make a meaningful difference.
```

## Are we required to give Aivium a testimonial?

```text
No. The selected organization is expected to participate reasonably in documenting the engagement, but it will never be required to provide a positive testimonial.
```

## What happens after six months?

```text
The pro bono engagement concludes with documentation, training and a recommended roadmap for what comes next. There is no obligation to become a paying Aivium client.
```

## Can someone nominate us?

```text
Yes. Community members, volunteers, donors, board members, employees and supporters may nominate an organization. A nomination is not the same as an application; Aivium will invite promising nominated organizations to complete the formal application.
```

## Can I nominate more than one organization?

```text
Yes, as long as each nomination is submitted separately and in good faith.
```

---

# 19. FINAL CTA

Use a visually strong but restrained closing panel.

## Headline

```text
Your organization already has a mission.
Let's help more people experience its impact.
```

## Supporting copy

```text
Tell us about the work you're doing, where you're trying to go, and what's getting in the way.
```

Primary CTA:

```text
Apply for Impact Partner
```

Secondary CTA:

```text
Nominate an Organization
```

If applications are closed, dynamically replace CTA text with the appropriate state.

---

# 20. APPLICATION STATUS STATES

The page should be reusable.

Support:

## `open`

- Show applications
- Show nomination form
- Display deadline
- CTA = Apply / Nominate

## `closed`

Hero message:

```text
Applications for the current Impact Partner cycle are now closed.
```

CTA:

```text
Follow the Impact Partner Journey
```

Forms should be disabled or hidden.

Optionally collect interest for the next cycle.

## `selected`

Hero can evolve to:

```text
Meet the 2026 Aivium Impact Partner
```

Provide room for:

- Organization logo
- Organization name
- Mission
- Intro video
- Baseline / goals
- Project updates
- Case-study content

Build this page so the eventual selected-partner story can be added without rebuilding the route from scratch.

---

# 21. PROGRAM TIMELINE COMPONENT

If dates are configured, show them.

Example format:

```text
Applications Open      August XX, 2026
Applications Close     September XX, 2026
Finalist Review        September 2026
Partner Announced      October 2026
Engagement Begins      October 2026
```

Never render unfinished placeholder dates.

If dates are not configured, use:

```text
Applications opening soon.
```

---

# 22. ANALYTICS

Reuse existing analytics / event tracking.

Track at minimum:

```text
impact_page_view
impact_apply_click
impact_nominate_click
impact_application_start
impact_application_submit
impact_nomination_start
impact_nomination_submit
impact_faq_open
```

If UTM capture exists, preserve:

- utm_source
- utm_medium
- utm_campaign
- utm_content
- utm_term

Recommended campaign:

```text
utm_campaign=impact_partner_2026
```

Do not include personal application information in analytics event payloads.

---

# 23. ACCESSIBILITY

Meet the project's existing accessibility standards.

At minimum:

- Semantic heading hierarchy
- Keyboard-accessible forms
- Visible focus states
- Labels rather than placeholder-only fields
- Error messages associated with inputs
- Proper accordion semantics
- Sufficient color contrast
- Reduced-motion support
- Meaningful alt text
- No autoplay audio
- Do not put essential copy inside images

---

# 24. PERFORMANCE

Keep the page fast.

- Reuse existing optimized image pipeline.
- Lazy-load below-the-fold media.
- Avoid heavy page-specific JavaScript.
- Avoid unnecessary animation libraries.
- Do not add a large video background to the hero.
- Respect existing Astro / framework rendering conventions.
- Prefer static / server-rendered content where possible.

If a launch video is later embedded, use a lightweight poster / click-to-load approach where practical.

---

# 25. RESPONSIVE BEHAVIOR

The page must be intentionally designed for mobile.

Mobile requirements:

- Hero CTA buttons stack cleanly.
- No text smaller than existing site minimums.
- Timeline stacks vertically.
- Application / nomination selection remains obvious.
- Forms use full-width fields as appropriate.
- Avoid horizontal card overflow unless the existing site has an accessible carousel pattern.
- Ensure long nonprofit names and URLs wrap gracefully.
- Do not rely on hover interactions.

---

# 26. COPY / LANGUAGE RULES

## Tone

Use:

- Clear
- Human
- Confident
- Warm
- Grounded
- Mission-driven
- Non-technical

Avoid:

- "Revolutionize"
- "Disrupt"
- "10x"
- "Game-changing"
- "AI-powered transformation" as empty buzzword language
- "Win"
- "Contest"
- "Giveaway"
- Fake urgency
- Excessive exclamation points

This program should sound like Aivium making a commitment to the community.

## AI language

Whenever AI is discussed, connect it to a human outcome.

Good:

```text
Use AI and automation to reduce repetitive work and give the team more time for its mission.
```

Less desirable:

```text
Implement cutting-edge AI solutions.
```

---

# 27. TRUST / LEGAL NOTES

Add a short disclaimer near the application form or footer:

```text
Submission of an application or nomination does not create a client relationship or guarantee selection. The selected organization and Aivium will enter into a separate written agreement defining the scope, responsibilities, permissions and terms of the pro bono engagement.
```

Also include:

```text
Aivium reserves the right to modify, postpone or cancel a program cycle where necessary.
```

Do not over-lawyer the public page. The detailed rights and scope belong in the final agreement / SOW.

Privacy:

- Link to the existing Aivium privacy policy.
- Use the existing data-processing conventions.
- Do not expose applicant information publicly without permission.

---

# 28. FUTURE CASE-STUDY SUPPORT

Architect the page so it can later include:

```text
/impact
/impact/2026-[organization-slug]
```

or the project's equivalent routing convention.

Possible future page sections:

- Meet the Partner
- The Mission
- Starting Point
- What We Found
- What We Built
- 30-Day Update
- 90-Day Update
- Six-Month Results
- Lessons Learned
- Final Documentary / Interview
- Impact Metrics

Do not implement fake case-study data now.

---

# 29. OPTIONAL PROGRAM ARCHIVE

Leave room in the `/impact` page architecture for a future section:

## Previous Impact Partners

Cards might eventually include:

- Year
- Organization
- Location
- Mission
- Key outcome
- Case-study link

Do not show an empty archive section on launch.

---

# 30. COMPONENT REUSE / ENGINEERING REQUIREMENTS

Before creating new components:

1. Inspect the existing codebase.
2. Identify current:
   - Hero patterns
   - Section wrappers
   - CTA components
   - Cards
   - Buttons
   - Forms
   - Accordions
   - Typography
   - Animation utilities
   - Layout primitives
3. Reuse them wherever appropriate.
4. Extend components only when doing so does not create awkward coupling.
5. Do not regress existing pages.

Avoid unnecessary dependencies.

Do not install a new UI framework for this page.

---

# 31. ACCEPTANCE CRITERIA

The build is complete when:

- `/impact` loads successfully in production.
- The page visually belongs to the existing Aivium.com site.
- The page explains the program without requiring the announcement video.
- The primary CTA is obvious above the fold.
- Both Apply and Nominate flows work.
- Submissions validate correctly.
- Submission success/failure states are clear.
- Spam prevention exists.
- Submissions reach the intended backend / CRM workflow.
- No applicant is automatically added to normal sales sequences.
- Program status can be changed from a single configuration source.
- Mobile layout is polished.
- Accessibility basics pass.
- SEO metadata is present.
- Analytics events fire without containing PII.
- No fake dates, numbers, testimonials or partner organizations are rendered.
- Existing site navigation/footer/components remain intact.
- The page is designed so a selected partner and case study can be added later.

---

# 32. IMPLEMENTATION PROCESS FOR CLAUDE CODE

Please follow this order:

1. Inspect the existing Aivium.com architecture and design system.
2. Identify reusable components and tokens.
3. Identify the existing form / CRM / notification architecture.
4. Build the `/impact` route using the existing conventions.
5. Add centralized program configuration.
6. Implement all public page sections.
7. Implement application and nomination flows.
8. Add validation, spam protection and success/error states.
9. Integrate with existing backend / Attio workflow where appropriate.
10. Add metadata and analytics.
11. Test desktop + mobile.
12. Test keyboard navigation and form accessibility.
13. Test submissions end-to-end.
14. Run the existing project's build, lint and test commands.
15. Fix any regressions introduced by this work.
16. Provide a final implementation summary including:
    - Files created
    - Files modified
    - New routes
    - Form destination / CRM behavior
    - Analytics events
    - Any configuration values still requiring final dates or service-value approval

---

# 33. IMPORTANT GUARDRAILS

Do not:

- Redesign the entire Aivium website.
- Change global branding without need.
- Invent application dates.
- Invent nonprofit partners.
- Invent testimonials.
- Invent results or statistics.
- Create fake social proof.
- Add a Calendly sales CTA after the nonprofit application.
- Automatically enroll nonprofit applicants in outbound sales campaigns.
- Make a positive testimonial a condition of participation.
- Promise unlimited services.
- Promise specific results.
- Create an unrelated new backend if existing infrastructure already handles forms.
- Duplicate CRM integrations if an existing shared service exists.
- Hard-code values that should live in program configuration.
- Make the program look like a sweepstakes.

---

# 34. CORE MESSAGE TO PRESERVE

The page should ultimately communicate this:

> There are organizations doing meaningful work with limited resources. Aivium believes modern technology and AI should expand what people are capable of, not simply benefit companies with large technology budgets. Through Aivium Impact Partner, we will choose one nonprofit, understand where better visibility, systems and technology can make the greatest difference, implement that work alongside them for six months, document what changes, and leave the organization more capable than when we arrived.

That idea is more important than any specific layout choice.
