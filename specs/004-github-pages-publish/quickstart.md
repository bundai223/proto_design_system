# Quickstart: Publish Design System on GitHub Pages

## Local Verification

1. Install dependencies if needed.

```bash
npm install
```

2. Build the publishable showcase output.

```bash
npm run demo:build
```

3. Confirm the publish directory exists and contains the expected entry point.

```bash
ls dist/demo
```

4. Inspect the generated HTML and verify asset URLs point at the configured Pages base path for project-site deploys.

```bash
sed -n '1,40p' dist/demo/index.html
```

5. Optionally verify that a different publish path can be used without editing files under `demo/`.

```bash
PAGES_BASE_PATH=/custom-path/ npm run demo:build
```

## Repository Configuration

1. Add or update `.github/workflows/deploy-pages.yml` so it builds the showcase and deploys `dist/demo` to GitHub Pages.
2. In the repository settings, configure Pages to use GitHub Actions as the build and deployment source.
3. Keep `/proto_design_system/` as the default `PAGES_BASE_PATH` unless the hosting target changes.
4. Merge the feature to the default branch so the deployment workflow can publish from the repository source of truth.

## Hosted Verification

1. Push or merge a change that should update the showcase.
2. Wait for the Pages workflow to finish successfully in GitHub Actions.
3. If needed, use manual dispatch in GitHub Actions to republish without creating another code change.
4. Open the repository Pages URL and confirm the showcase loads without broken asset requests.
5. Reload the page directly at the published URL and verify the site still resolves its static assets correctly.
