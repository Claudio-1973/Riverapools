---
name: Initial JavaScript performance
description: Keep the marketing site's first-load bundle focused on above-the-fold rendering.
---

For this static marketing site, interactive form controls should prefer native browser primitives when they provide the needed accessible behavior, and telemetry should load after the initial render.

**Why:** The first-load audit identified a large UI select dependency and analytics code as JavaScript that was not needed to paint or crawl the landing page.

**How to apply:** Avoid reintroducing heavyweight component dependencies for simple controls; defer non-critical analytics and performance scripts until after the page is interactive.