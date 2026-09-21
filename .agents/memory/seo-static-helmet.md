---
name: Static SEO metadata and Helmet
description: Avoid duplicate head metadata when prerendered HTML is hydrated by React.
---

When a route ships with prerendered SEO metadata in its HTML shell, React `Helmet` should not render a second copy of the same `<title>` during hydration.

**Why:** The homepage exposed duplicate `<title>` tags because static prerendering and the component both emitted the title.

**How to apply:** Keep the canonical title in the static route generator/shell for crawler visibility, and use client-side head management only for metadata that is not already emitted by the prerendered route.