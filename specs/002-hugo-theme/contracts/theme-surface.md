# Theme Surface Contract: Hugo Blog Theme Implementation

## Supported Theme Coverage

The initial implementation must provide template coverage for these reader-facing surfaces:

- site entry view such as home or primary landing page
- post listing views for the blog section
- individual post pages
- taxonomy index and term pages for `tags` and `categories`
- representative non-post pages that share the global layout

## Required Rendering Behaviors

### Shared Layout Contract

- All supported views render within a shared site frame that includes recognizable navigation and consistent visual language.
- Shared layout primitives are implemented through Hugo layout inheritance and partials, not duplicated page-specific markup.

### Post Listing Contract

- Listings show reader-facing post titles and dates.
- Listings use Hugo's existing summary behavior for excerpt text.
- Listings do not expose raw source filenames as the primary reader-facing label.
- Draft posts do not appear in published-facing output.

### Post Detail Contract

- Post pages render title, publication date, and full body content.
- Optional tags and categories render only when present.
- A TOC region renders only when the post metadata explicitly sets `toc: true`.
- Existing normal shortcode output remains compatible in rendered HTML pages.
- Existing `/images/...` references remain readable in article bodies.

### Taxonomy Contract

- `tags` and `categories` taxonomy surfaces are supported.
- Taxonomy term pages show the associated posts with navigable links.
- Missing taxonomy metadata on some posts does not create broken placeholders or dead navigation.

### Non-Post View Contract

- Generic pages and shared site sections use the same navigation and style direction as post-related pages.
- Non-post views are not required to expose post-specific metadata regions.

## Implementation Boundary

- The supported runtime surface is the Hugo theme structure under `hugo_themes/proto_design_system/`.
- The shared base layout is anchored at `hugo_themes/proto_design_system/layouts/_default/baseof.html`, with non-post fallback in `hugo_themes/proto_design_system/layouts/_default/single.html`, post detail in `hugo_themes/proto_design_system/layouts/posts/single.html`, and taxonomy fallback in `hugo_themes/proto_design_system/layouts/_default/taxonomy.html` plus `hugo_themes/proto_design_system/layouts/_default/term.html`.
- The existing TypeScript design-system package remains a supporting asset source, primarily for token generation and design reference.
- AMP-specific templates are explicitly outside the initial contract.

## Validation Contract

The feature is considered valid when a maintainer can:

1. generate or confirm theme token CSS
2. attach the theme to a Hugo site with representative content
3. render the site locally
4. verify home/listing/post/taxonomy/non-post views without broken metadata handling

## Compatibility Notes

- Theme templates must assume mixed-age content with inconsistent optional front matter.
- Filename style, including Japanese filenames, is not part of the reader-facing contract.
- Expanding support for AMP or additional specialized shortcodes requires a future contract update.
