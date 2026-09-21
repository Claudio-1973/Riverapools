---
name: Vercel prebuilt host redirects
description: Host-based redirects need to exist in the Build Output manifest when deploying with --prebuilt.
---

When publishing a static Vercel artifact with `--prebuilt`, the generated Build Output routing manifest can take precedence over `vercel.json`; host redirects must be present in the manifest used for that deployment as well as the source configuration.

**Why:** The source redirect configuration was valid, but the apex domain continued returning 200 until the prebuilt route manifest received the host-based 301 rule.

**How to apply:** After changing host redirects, inspect the prebuilt output manifest, deploy, and verify both the status code and preserved path/query with `curl -D -`.