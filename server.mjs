#!/usr/bin/env node
/**
 * Production server for aiviumdigital.com.
 *
 * A thin route-control layer in front of the Astro Node adapter:
 *   1. one-hop 301s for every known legacy URL (src/seo/redirects.mjs),
 *   2. real 410s for retired content,
 *   3. trailing-slash canonicalization (/ai-seo → /ai-seo/),
 * then hands everything else to the adapter's standalone handler
 * (static files from dist/client, SSR for /api/*, Astro's 404).
 *
 * Docker runs this instead of dist/server/entry.mjs (see Dockerfile).
 * Hostname + HTTPS canonicalization stays at the Caddy layer.
 */
process.env.ASTRO_NODE_AUTOSTART = "disabled";

import http from "node:http";
import { resolveSeoRoute } from "./src/seo/redirects.mjs";

const { handler } = await import("./dist/server/entry.mjs");

const HOST = process.env.HOST ?? "0.0.0.0";
const PORT = Number(process.env.PORT ?? 3000);

const GONE_BODY = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>410 Gone | Aivium Digital</title>
<meta name="robots" content="noindex">
<style>
  body{margin:0;min-height:100vh;display:grid;place-items:center;background:#0d0e12;
       color:#f2ede3;font:16px/1.6 system-ui,sans-serif;text-align:center;padding:2rem}
  .code{font-family:ui-monospace,monospace;color:#e5391b;margin:0}
  h1{margin:.5rem 0 1rem}
  a{color:#f2ede3}
</style>
</head>
<body>
<div>
  <p class="code">410</p>
  <h1>This page has been retired.</h1>
  <p>It was removed on purpose and has no replacement.</p>
  <p><a href="/">Homepage</a> · <a href="/services/">Services</a> · <a href="/signals/">Signals</a></p>
</div>
</body>
</html>
`;

const server = http.createServer((req, res) => {
  let pathname = "";
  let search = "";
  try {
    const url = new URL(req.url ?? "/", "http://internal");
    pathname = decodeURIComponent(url.pathname);
    search = url.search;
  } catch {
    res.writeHead(400, { "Content-Type": "text/plain" });
    res.end("Bad request.");
    return;
  }

  const verdict = resolveSeoRoute(pathname);
  if (verdict?.kind === "redirect") {
    res.writeHead(verdict.status, { Location: verdict.to + search });
    res.end();
    return;
  }
  if (verdict?.kind === "gone") {
    res.writeHead(410, {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    });
    res.end(GONE_BODY);
    return;
  }

  handler(req, res);
});

server.listen(PORT, HOST, () => {
  console.log(`aiviumdigital.com serving on http://${HOST}:${PORT} (route control + Astro)`);
});
