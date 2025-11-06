import { defineCloudflareConfig } from ".pnpm/@opennextjs+cloudflare@1.11.0_wrangler@4.45.4/node_modules/@opennextjs/cloudflare/dist/api";

export default defineCloudflareConfig({
  // Uncomment to enable R2 cache,
  // It should be imported as:
  // `import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";`
  // See https://opennext.js.org/cloudflare/caching for more details
  // incrementalCache: r2IncrementalCache,
});
