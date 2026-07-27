import { defineConfig } from "astro/config";
import node from "@astrojs/node";

export default defineConfig({
  site: "https://aiviumdigital.com",
  trailingSlash: "ignore",
  adapter: node({ mode: "standalone" }),
});
