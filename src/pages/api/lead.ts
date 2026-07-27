/* Lead capture: receives discovery-quiz submissions and writes them to
   Attio. Assert person by email, assert company by domain, link the two,
   attach the full quiz as a note on the person.
   ATTIO_TOKEN comes from .env on the server; it never reaches the client. */

import type { APIRoute } from "astro";

export const prerender = false;

const ATTIO = "https://api.attio.com/v2";

/* Quiz revenue answer → Attio's built-in estimated_arr_usd buckets.
   "Prefer not to say." intentionally has no mapping. */
const ARR_MAP: Record<string, string> = {
  "Under $1 million.": "$0-$1M",
  "$1 million–$2 million.": "$1M-$10M",
  "$2 million–$5 million.": "$1M-$10M",
  "$5 million–$10 million.": "$1M-$10M",
  "$10 million–$25 million.": "$10M-$50M",
  "More than $25 million.": "$10M-$50M",
};

/* Free-mail domains never become "companies" in the CRM */
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

const normalizePhone = (phone: string | undefined) => {
  if (!phone) return null;
  const digits = phone.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) return digits;
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return null; /* unparseable numbers go in the note instead */
};

export const POST: APIRoute = async ({ request }) => {
  const token = import.meta.env.ATTIO_TOKEN ?? process.env.ATTIO_TOKEN;
  if (!token) {
    console.error("lead: ATTIO_TOKEN is not set");
    return json(500, { ok: false, error: "not configured" });
  }

  let payload: any;
  try {
    payload = await request.json();
  } catch {
    return json(400, { ok: false, error: "invalid JSON" });
  }

  const contact = payload?.contact ?? {};
  const answers: Record<string, string> = payload?.answers ?? {};
  const email = String(contact.email ?? "").trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return json(400, { ok: false, error: "valid email required" });
  }

  try {
    /* 1. Person, matched on email so repeat submissions update not duplicate */
    const personValues: Record<string, unknown> = {
      email_addresses: [email],
    };
    if (contact.name) personValues.name = String(contact.name).slice(0, 200);
    const role = answers["What is your role?"];
    if (role && role !== "(skipped)") personValues.job_title = role.replace(/\.$/, "");
    const phone = normalizePhone(contact.phone);
    if (phone) personValues.phone_numbers = [{ original_phone_number: phone }];

    const person = await attio(
      token,
      "PUT",
      "/objects/people/records?matching_attribute=email_addresses",
      { data: { values: personValues } }
    );
    const personId = person.data.id.record_id;

    /* 2. Company, matched on domain */
    const domain = extractDomain(contact.website) ?? email.split("@")[1];
    if (domain && !FREE_MAIL.has(domain)) {
      const companyValues: Record<string, unknown> = { domains: [{ domain }] };
      if (contact.company) companyValues.name = String(contact.company).slice(0, 200);
      const arr = ARR_MAP[answers["What is your approximate annual revenue?"]];
      if (arr) companyValues.estimated_arr_usd = arr;
      const company = await attio(
        token,
        "PUT",
        "/objects/companies/records?matching_attribute=domains",
        { data: { values: companyValues } }
      );

      /* 3. Link person → company */
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

    /* 4. Full submission as a note on the person */
    const lines = [
      `Submitted: ${payload.submitted_at || new Date().toISOString()}`,
      `Company: ${contact.company || "-"}`,
      `Website: ${contact.website || "-"}`,
      `Phone: ${contact.phone || "-"}`,
      "",
      ...Object.entries(answers).map(([q, a]) => `${q}\n→ ${a}`),
    ];
    if (contact.notes) {
      lines.push("", `Anything important we should know?\n→ ${contact.notes}`);
    }

    await attio(token, "POST", "/notes", {
      data: {
        parent_object: "people",
        parent_record_id: personId,
        title: "Discovery quiz submission",
        format: "plaintext",
        content: lines.join("\n"),
      },
    });

    return json(200, { ok: true });
  } catch (err) {
    console.error(err);
    return json(502, { ok: false, error: "capture failed" });
  }
};
