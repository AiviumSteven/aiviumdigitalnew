/* Impact Partner capture: applications, nominations, and notify-me
   interest from /impact/. Same Attio conventions as api/lead.ts (assert
   person by email, company by domain, note with everything), with two
   deliberate differences: submissions are tagged as Impact Partner
   records and added to the ATTIO_IMPACT_LIST list (default
   "impact-partner"), and they are NEVER sales leads: no sales list, no
   sequences. ATTIO_TOKEN stays server-side. */

import type { APIRoute } from "astro";

export const prerender = false;

const ATTIO = "https://api.attio.com/v2";
const IMPACT_LIST =
  (import.meta.env.ATTIO_IMPACT_LIST ?? process.env.ATTIO_IMPACT_LIST) || "impact-partner";

const FREE_MAIL = new Set([
  "gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "aol.com",
  "icloud.com", "me.com", "live.com", "msn.com", "proton.me", "protonmail.com",
]);

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

const attio = async (token: string, method: string, path: string, body?: unknown) => {
  const res = await fetch(`${ATTIO}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    throw new Error(`Attio ${method} ${path} → ${res.status}: ${await res.text()}`);
  }
  return res.json();
};

const extractDomain = (website: string | undefined) => {
  if (!website) return null;
  try {
    const url = new URL(website.includes("://") ? website : `https://${website}`);
    return url.hostname.replace(/^www\./, "").toLowerCase() || null;
  } catch {
    return null;
  }
};

const clean = (v: unknown, max = 2000) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/* Application answers rendered into the note, in reading order. */
const APPLICATION_FIELDS: [string, string][] = [
  ["org_name", "Organization"],
  ["website", "Website"],
  ["city", "City"],
  ["state", "State"],
  ["contact_name", "Contact"],
  ["contact_role", "Role"],
  ["phone", "Phone"],
  ["mission", "Mission"],
  ["audience", "Primarily serves"],
  ["annual_reach", "People reached yearly"],
  ["challenge", "Biggest challenge"],
  ["tech_wish", "Technology wish"],
  ["success_vision", "Successful six months"],
  ["project_contact", "Primary project contact"],
  ["systems_access", "Systems access"],
  ["documentation_ok", "Public documentation"],
  ["budget", "Budget range"],
  ["employees", "Employees"],
  ["volunteers", "Volunteers"],
  ["crm", "CRM / donor platform"],
  ["referral", "Heard via"],
];

const NOMINATION_FIELDS: [string, string][] = [
  ["org_name", "Nominated organization"],
  ["website", "Website"],
  ["city_state", "Location"],
  ["reason", "Why nominated"],
  ["relationship", "Nominator's relationship"],
  ["org_contact", "Org contact (if known)"],
];

export const POST: APIRoute = async ({ request }) => {
  const token = import.meta.env.ATTIO_TOKEN ?? process.env.ATTIO_TOKEN;
  if (!token) {
    console.error("impact: ATTIO_TOKEN is not set");
    return json(500, { ok: false, error: "not configured" });
  }

  let payload: any;
  try {
    const raw = await request.text();
    if (raw.length > 64_000) return json(413, { ok: false, error: "payload too large" });
    payload = JSON.parse(raw);
  } catch {
    return json(400, { ok: false, error: "invalid JSON" });
  }

  /* Honeypot: a filled hidden field is a bot. Fake success, do nothing. */
  if (clean(payload?.website_confirm, 100)) {
    console.warn("impact: honeypot tripped, dropped");
    return json(200, { ok: true });
  }

  const type = clean(payload?.type, 30); /* application | nomination | interest */
  if (!["application", "nomination", "interest"].includes(type)) {
    return json(400, { ok: false, error: "unknown type" });
  }

  const email = clean(payload?.email, 320).toLowerCase();
  const name = clean(payload?.contact_name, 150) || clean(payload?.name, 150);
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return json(400, { ok: false, error: "valid email required" });
  }
  if (!name) return json(400, { ok: false, error: "name required" });

  const orgName = clean(payload?.org_name, 200);

  try {
    /* 1. Person, matched on email */
    const personValues: Record<string, unknown> = {
      email_addresses: [email],
      name,
    };
    const role = clean(payload?.contact_role, 150);
    if (role) personValues.job_title = role;
    const person = await attio(
      token,
      "PUT",
      "/objects/people/records?matching_attribute=email_addresses",
      { data: { values: personValues } }
    );
    const personId = person.data.id.record_id;

    /* 2. Applications only: assert the nonprofit as a company and link.
       Nominators aren't linked to the nominated org; that would wire the
       wrong person to the wrong entity. */
    if (type === "application") {
      const domain = extractDomain(clean(payload?.website, 300)) ?? email.split("@")[1];
      if (domain && !FREE_MAIL.has(domain)) {
        const companyValues: Record<string, unknown> = { domains: [{ domain }] };
        if (orgName) companyValues.name = orgName;
        const company = await attio(
          token,
          "PUT",
          "/objects/companies/records?matching_attribute=domains",
          { data: { values: companyValues } }
        );
        await attio(token, "PATCH", `/objects/people/records/${personId}`, {
          data: {
            values: {
              company: [
                { target_object: "companies", target_record_id: company.data.id.record_id },
              ],
            },
          },
        });
      }
    }

    /* 3. Everything as a labeled note on the person */
    const fields =
      type === "application" ? APPLICATION_FIELDS : type === "nomination" ? NOMINATION_FIELDS : [];
    const utmLine = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]
      .map((k) => {
        const v = clean(payload?.[k], 200);
        return v ? `${k.slice(4)}=${v}` : "";
      })
      .filter(Boolean)
      .join(" ");

    const lines = [
      "Source: Impact Partner program (aiviumdigital.com/impact)",
      `Submission type: ${type}`,
      `Submitted: ${clean(payload?.submitted_at, 40) || new Date().toISOString()}`,
      "",
      ...(type === "interest"
        ? [
            "Asked to be notified when Impact Partner applications open.",
            orgName ? `Organization: ${orgName}` : "",
          ]
        : fields.map(([key, label]) => {
            const v = clean(payload?.[key]);
            return v ? `${label}: ${v}` : "";
          })),
      "",
      payload?.confirm_accurate ? "Confirmed: information accurate" : "",
      payload?.confirm_scope ? "Confirmed: selection not guaranteed, mutually agreed scope" : "",
      payload?.confirm_casestudy ? "Confirmed: case-study participation understood" : "",
      payload?.consent_contact ? "Confirmed: we may contact the organization" : "",
      clean(payload?.page, 300) ? `Page: ${clean(payload?.page, 300)}` : "",
      utmLine ? `UTM: ${utmLine}` : "",
    ].filter((l, i, arr) => l !== "" || arr[i - 1] !== ""); /* collapse blank runs */

    const title =
      type === "application"
        ? `Impact Partner application: ${orgName || name}`
        : type === "nomination"
          ? `Impact Partner nomination: ${orgName || "unnamed organization"}`
          : "Impact Partner interest";

    await attio(token, "POST", "/notes", {
      data: {
        parent_object: "people",
        parent_record_id: personId,
        title,
        format: "plaintext",
        content: lines.join("\n"),
      },
    });

    /* 4. The impact list, never the sales pipeline. Non-fatal: the
       person + note already landed. */
    try {
      await attio(token, "POST", `/lists/${IMPACT_LIST}/entries`, {
        data: { parent_object: "people", parent_record_id: personId, entry_values: {} },
      });
    } catch (err) {
      console.warn(`impact: list add failed (list "${IMPACT_LIST}")`, err);
    }

    return json(200, { ok: true });
  } catch (err) {
    console.error(err);
    return json(502, { ok: false, error: "capture failed" });
  }
};
