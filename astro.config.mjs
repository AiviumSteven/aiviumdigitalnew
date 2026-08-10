import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import { astroRedirects } from "./src/seo/redirects.mjs";

export default defineConfig({
  site: "https://aiviumdigital.com",
  // Canonical URLs are slash-terminated. Production normalization (one-hop
  // 301s, 410s, /path → /path/) happens in server.mjs; these redirects give
  // dev/preview the same legacy mappings. trailingSlash stays "ignore" so
  // the unslashed redirect keys below match both variants and POST /api/lead
  // is never bounced.
  trailingSlash: "ignore",
  // compressHTML swallows the whitespace between a text node ending in a
  // newline and a following inline element ("based in\n<a>" renders as
  // "based inHagerstown"), mangling copy wherever a link starts a source
  // line. The bytes it saves are not worth broken prose.
  compressHTML: false,
  adapter: node({ mode: "standalone" }),
  redirects: astroRedirects(),
});
