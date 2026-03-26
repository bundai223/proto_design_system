# Quickstart: Hugo Blog Theme Implementation

## Prerequisites

- Hugo site with content compatible with the documented structure in `hugo_blog_posts_structure.md`
- Node.js and npm available for token generation
- Hugo installed locally

## Generate Theme Tokens

If the theme consumes the repository's exported tokens, generate them first:

```bash
npm install
npm run export:css:all
cp dist/tokens.css hugo_themes/proto_design_system/static/theme/tokens.css
```

Expected outcome:

- `dist/tokens.css` is generated successfully
- `hugo_themes/proto_design_system/static/theme/tokens.css` is refreshed with the exported token set

## Wire the Theme into a Hugo Site

Copy or map `hugo_themes/proto_design_system/` into the Hugo site as `themes/proto_design_system/`.

The carried theme contains:

- `layouts/`
- `assets/css/`
- `static/theme/tokens.css`
- `theme.toml`

If the theme uses the generated token file directly, place the generated CSS where Hugo can publish it as a static asset and ensure `themes/proto_design_system/layouts/partials/head.html` links to `theme/tokens.css`.

## Run Local Hugo Verification

From the Hugo site root:

```bash
hugo server
```

Verify these surfaces:

- the main entry page provides a clear path into blog content
- post listings show title, date, and summary without exposing filenames
- draft posts are absent from normal published-facing views
- post detail pages render full article content, images, and existing shortcode output
- `toc: true` posts show a TOC region and posts without that flag do not
- tag and category pages list related posts
- representative non-post pages use the same shared layout language

## Representative Content Checks

Use at least one post from each of these content shapes:

- minimal front matter: `title`, `date`, `draft`
- richer front matter with `tags`, `categories`, and `toc`
- a post containing shortcode output
- a post referencing `/images/...`
- a generic non-post page if the site includes one

## Validation Workflow

Recommended repository-side checks for this feature:

```bash
npm run export:css:all
cp dist/tokens.css hugo_themes/proto_design_system/static/theme/tokens.css
```

Recommended Hugo-side checks:

```bash
hugo
hugo server
```

The feature is ready for implementation once these steps are sufficient to verify the supported theme surfaces end to end.
