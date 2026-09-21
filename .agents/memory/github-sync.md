---
name: GitHub sync through Replit connection
description: How to update a GitHub repository when the local HTTPS remote cannot authenticate.
---

When the local GitHub HTTPS remote rejects `git push`, use the authorized Replit GitHub connection and Git Data API instead of requesting or exposing a personal access token. Compare the local tree with the remote branch, upload changed blobs, create one tree and commit, then advance the branch without force.

**Why:** The workspace remote can be readable but not writable through local Git credentials, while the connected GitHub integration can perform authenticated writes without exposing credentials.

**How to apply:** Bind an existing GitHub connection, verify the target owner/repository and branch, preserve the remote ref as the commit parent, and verify the resulting commit SHA through both the API and public remote.