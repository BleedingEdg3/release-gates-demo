# Release Gates: Staging to Production

A small static-site project for demonstrating a GitHub Actions release pipeline. Every push to `main` runs automated tests, publishes the validated artifact to a staging path, and then pauses at the `production` GitHub Environment until an authorized reviewer approves the deployment.

## Prerequisites

- A GitHub repository where Actions are enabled.
- Git installed locally.
- A GitHub repository plan/visibility that supports required reviewers for environments.
- A second repository collaborator who can approve the production deployment (recommended).

## Local validation

From this project directory:

```bash
npm test
```

No third-party npm packages are required. The tests use Node.js built-in modules.

## GitHub setup

1. Create a repository with the default branch named `main` and push this project.
2. In **Settings → Environments**, create `staging` and `production`.
3. Add at least one required reviewer to `production`. Restrict deployments to `main` if the repository settings offer that option.
4. Push to `main`. The workflow validates the site and deploys `staging` to the `gh-pages` branch. The production job pauses for approval.
5. While production is waiting, open **Settings → Pages** and set **Deploy from a branch**, branch `gh-pages`, folder `/ (root)`. Save.
6. Return to **Actions**, open the waiting production job, review the deployment, and approve it.
7. After the workflow completes and Pages finishes publishing, inspect `/staging/` and `/production/` on the repository's GitHub Pages URL.

For the live walkthrough, make a small visible edit to `site/index.html`, commit and push to `main`. Confirm that staging updates first, then approve production and confirm that production updates.

## Notes

- The workflow publishes the same validated artifact to both environments; only the environment label is changed during each deployment job.
- `GITHUB_TOKEN` is provided by GitHub Actions. No personal access token or cloud credential is needed.
- If required reviewers are unavailable for the repository's plan/visibility, use a repository configuration that supports GitHub Environment protection rules. Do not remove the production gate and still describe the run as approval-gated.
