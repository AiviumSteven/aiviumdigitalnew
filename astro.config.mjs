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
  adapter: node({ mode: "standalone" }),
  redirects: astroRedirects(),
});
