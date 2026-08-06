# Post-deploy search runbook — aiviumdigital.com

Run top to bottom after each major deploy; the one-time items are marked.
This release: the 2026-08-05 migration-recovery deploy (redirect map, 9 new
pages, GA4). GSC property is already verified.

## 1. Ship and smoke-test (every deploy)

```bash
cd /opt/aiviumdigital && git pull && docker compose up -d --build
curl -s -o /dev/null -w '%{http_code}\n' https://aiviumdigital.com/                       # 200
curl -s -o /dev/null -w '%{http_code} %{redirect_url}\n' https://aiviumdigital.com/roofing/   # 301 → /industries/home-services/
curl -s -o /dev/null -w '%{http_code}\n' https://aiviumdigital.com/industries/restaurants     # 410
npm run indexnow    # pings Bing/Yandex with the live sitemap (feeds ChatGPT/Copilot retrieval)
```

## 2. Google Search Console (this release)

1. **Submit the sitemap:** Indexing → Sitemaps → add `https://aiviumdigital.com/sitemap.xml` (resubmit even if it's already listed).
2. **Request indexing** (URL Inspection → Request indexing), one by one:
   - `https://aiviumdigital.com/`
   - `https://aiviumdigital.com/services/`
   - `https://aiviumdigital.com/ai-seo/`
   - `https://aiviumdigital.com/ai-automation/`
   - `https://aiviumdigital.com/ai-visibility-audit/`
   - `https://aiviumdigital.com/industries/home-services/`
   - `https://aiviumdigital.com/locations/maryland/`
   - `https://aiviumdigital.com/locations/hagerstown-md/`
   - `https://aiviumdigital.com/about/`
3. **Inspect two legacy URLs** (`/local-seo/`, `/roofing/`) and confirm GSC sees the 301.
4. **Export the legacy baseline (one-time):** Performance → last **16 months** → export Pages and Queries (CSV). Save both exports to `docs/baselines/` in this repo. Any legacy URL in that export with impressions or backlinks that is **not** in `src/seo/redirects.mjs` gets added to the map (one-to-one, closest current page).
5. **Record the baseline numbers (one-time, before judging results):** total clicks, impressions, top non-brand queries, and any Maryland/Hagerstown queries. Paste into `docs/baselines/gsc-baseline-2026-08.md`.
6. Over the next 2–4 weeks: Indexing → Pages — watch that "Not found (404)" legacy URLs convert to "Page with redirect" and `/industries/restaurants` shows as intentionally removed.

## 3. Bing Webmaster Tools (one-time)

1. bing.com/webmasters → **Import from Google Search Console** (one click, uses the verified GSC property).
2. Submit `https://aiviumdigital.com/sitemap.xml`.
3. IndexNow is already wired (`npm run indexnow`); no separate Bing key needed.
4. Check Bing's "Search Performance" monthly — Bing feeds ChatGPT and Copilot answers, so this disproportionately matters for GEO.

## 4. GA4 (one-time setup in the Admin UI)

Code side is live (G-F4KTW1YDCM): page views with `page_type`, plus
`click_phone`, `click_email`, `click_book_discovery`, `outbound_source_click`,
`start_lead_form`, `submit_lead_form`. Finish in GA4 Admin:

1. **Mark conversions:** Admin → Events → toggle `submit_lead_form` and `click_book_discovery` as key events.
2. **Custom dimensions:** Admin → Custom definitions → add event-scoped dimensions for `page_type`, `cta_location`, `cta_label`, `link_domain`.
3. **AI referral channel group:** Admin → Data settings → Channel groups → create "AI Search" matching source containing any of: `chatgpt.com`, `perplexity.ai`, `claude.ai`, `gemini.google.com`, `copilot.microsoft.com`. Label reports as *referral-detectable* AI traffic (not total AI influence — most AI-assisted visits expose no referral).
4. **Enhanced measurement:** confirm scroll tracking is on (covers the 90%-scroll signal without custom code).
5. **Calendly note:** the booking widget is an embed on /discovery/; if booking-completion tracking is ever needed, Calendly fires a `calendly.event_scheduled` postMessage that can be wired later.

## 5. Recurring (weekly, per AUTHORITY-PLAYBOOK cadence)

- GSC: new query impressions for `/services/`, `/ai-visibility-audit/`, location and industry pages.
- GA4: `submit_lead_form` count by `page_type`; AI Search channel sessions.
- After publishing any Signal: `npm run indexnow`.
