---
name: Gemini API model availability
description: The chatbot must tolerate model availability changes across Gemini API accounts and regions.
---

Use a configurable Gemini model with ordered Flash fallbacks instead of assuming one model name is permanently available. Keep the API key server-side and return a generic upstream error to visitors.

**Why:** A valid Gemini API key can list a model yet return a retirement 404 when generating content, while a newer Flash model succeeds. Stopping on that 404 prevents working fallbacks from running.

**How to apply:** Verify generation, not only model-list presence. Continue to the next fallback after any non-success response; only stop after a model returns a successful generation response.