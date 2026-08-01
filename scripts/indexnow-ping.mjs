#!/usr/bin/env node
/**
 * indexnow-ping — notify Bing/Yandex/etc. of the current URL set after a
 * deploy. Fetches the LIVE sitemap (live URLs are the only ones safe to
 * submit), then POSTs every URL to the IndexNow endpoint. Bing's index
 * feeds ChatGPT/Copilot retrieval, so fast indexing is part of the GEO
 * strategy. Run after a deploy; non-fatal.
 *
 * The key is not a secret — the protocol requires it to be publicly
 * hosted at ${SITE}/${KEY}.txt (shipped from public/).
 */

const SITE = 'https://aiviumdigital.com';
const KEY = 'ade646ea5ee6b72670d3689323571d3e';
const KEY_LOCATION = `${SITE}/${KEY}.txt`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';

// The container may still be restarting right after a deploy — wait for
// the freshly deployed key file to come up before submitting anything.
const RETRIES = 12;
const RETRY_DELAY_MS = 10_000;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function waitForLiveKeyFile() {
  for (let attempt = 1; attempt <= RETRIES; attempt++) {
    try {
      const res = await fetch(KEY_LOCATION);
      if (res.ok && (await res.text()).trim() === KEY) return;
    } catch {
      // site not reachable yet
    }
    if (attempt < RETRIES) {
      console.log(`  … key file not live yet (attempt ${attempt}/${RETRIES}), retrying in ${RETRY_DELAY_MS / 1000}s`);
      await sleep(RETRY_DELAY_MS);
    }
  }
  throw new Error(`key file never came up at ${KEY_LOCATION}`);
}

const locs = (xml) => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`);
  return res.text();
}

await waitForLiveKeyFile();

const urlList = locs(await fetchText(`${SITE}/sitemap.xml`));
if (urlList.length === 0) throw new Error('sitemap yielded no URLs — nothing to submit');

const res = await fetch(ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: 'aiviumdigital.com', key: KEY, keyLocation: KEY_LOCATION, urlList }),
});

// 200 = submitted, 202 = accepted (key validation pending) — both are success.
if (res.status !== 200 && res.status !== 202) {
  throw new Error(`IndexNow rejected the submission: HTTP ${res.status} ${await res.text()}`);
}
console.log(`  ✓ IndexNow: submitted ${urlList.length} URLs (HTTP ${res.status})`);
