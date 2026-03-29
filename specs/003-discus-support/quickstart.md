# Quickstart: Hugo Theme Discus Support

## Goal

Validate that the Hugo theme can show Discus on supported published post pages after the article body while preserving a clean reading experience elsewhere.

## Prerequisites

- Repository dependencies are installed.
- The Hugo theme under `hugo_themes/proto_design_system/` is available to a Hugo site.
- Token CSS has been generated if theme styling assets need to be refreshed.
- The Hugo site has at least:
  - one published post that should inherit discussion from the site default
  - one published post that should override discussion to disabled
  - one published post that can be used to simulate unavailable discussion
  - one non-post page for regression checking

## Steps

1. Generate and sync token CSS if needed.

```bash
npm install
npm run export:css:all
cp dist/tokens.css hugo_themes/proto_design_system/static/theme/tokens.css
```

2. Ensure the Hugo site uses the theme and has a site-level discussion default plus any post-level overrides needed for validation.

3. Run repository validation that should remain green for the feature work.

```bash
npm run typecheck
npm test
npm run export:css:all
```

4. Build or serve the Hugo site with representative content.

```bash
hugo
hugo server
```

5. Verify the primary scenarios.

- Open a supported published post and confirm the discussion area appears after the article body.
- Open a second supported published post and confirm it resolves to a distinct post-specific discussion context.
- Open a published post with a per-post override disabling discussion and confirm no empty discussion placeholder appears.
- Open a non-post page and confirm no discussion UI appears.
- Simulate unavailable discussion and confirm the embed is hidden, a short unavailable message is shown after the article body, and the post remains readable.

## Expected Outcome

- Supported published posts show a consistent discussion section after the article body.
- Unsupported or disabled pages remain discussion-free.
- An unavailable discussion service shows a short fallback message without breaking the article experience.
