import { defineConfig } from "astro/config";
import node from "@astrojs/node";

export default defineConfig({
  site: "https://aiviumdigital.com",
  trailingSlash: "ignore",
  adapter: node({ mode: "standalone" }),
  // The blog launched as /field-notes/ for a day (and was submitted to
  // IndexNow) before the Signals rename — keep the old URL answering.
  redirects: { "/field-notes/": "/signals/" },
});
