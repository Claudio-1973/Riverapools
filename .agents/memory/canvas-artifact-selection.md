---
name: Canvas artifact selection
description: Non-persistent Canvas selection behavior when multiple artifacts exist in one workspace
---

Canvas can restore a registered artifact iframe after a temporary shape update or presentation. Treat the selected Canvas shape as a view selection, not proof that the site's code, domain, or project mapping changed.

**Why:** Replacing or presenting a Canvas iframe can appear to work briefly and then return to the previously registered artifact, while the underlying website files and deployments remain unchanged.

**How to apply:** Before changing code, domains, artifact manifests, or deployments, verify the actual artifact files and published domains. Do not repeatedly edit or delete a Canvas shape when the request is only about which project is open.