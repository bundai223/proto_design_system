# Theme Surface Contract: Hugo Theme Discus Support

## Supported Coverage

The initial implementation must provide discussion support for these reader-facing surfaces:

- individual published blog post pages rendered by the Hugo theme

The initial implementation must not introduce discussion UI on these surfaces by default:

- draft post views
- home and post list views
- taxonomy index and taxonomy term views
- standalone non-post pages

## Required Rendering Behaviors

### Post Detail Discussion Contract

- Supported published post pages can render a Discus discussion area associated with the current post.
- The discussion area appears after the main article body in a consistent location.
- The discussion area does not replace or obscure the post title, metadata, body, taxonomy links, or optional table of contents.
- Each post page resolves to its own discussion context rather than reusing another article’s conversation.

### Visibility Control Contract

- A site-level default controls whether supported published posts show discussion.
- A post may inherit the site-level default or override it to explicitly enable or disable discussion.
- Unsupported page types render without discussion UI.

### Graceful Degradation Contract

- If discussion is intentionally disabled, no empty discussion placeholder is shown.
- If the external discussion service is unavailable, the embed is hidden and a short unavailable message is shown after the article body.
- Service unavailability must not block or hide the rest of the post.

## Implementation Boundary

- The runtime surface remains the Hugo theme under `hugo_themes/proto_design_system/`.
- The existing post-detail template at `hugo_themes/proto_design_system/layouts/posts/single.html` is the primary integration point.
- Shared styling continues to live in the theme CSS assets and token CSS already consumed by the theme.
- The feature may add a dedicated partial or bounded template region for discussion rendering if that improves reuse and readability.

## Validation Contract

The feature is considered valid when a maintainer can:

1. configure the theme to enable discussion by default for supported posts
2. override discussion behavior for a specific published post
3. render representative posts locally
4. confirm that supported posts show a post-specific discussion area after the article body
5. confirm that disabled or unsupported pages show no misleading discussion UI
6. confirm that unavailable discussion shows a short fallback message while preserving article readability

## Compatibility Notes

- Existing post body rendering, metadata rendering, and shared site chrome remain part of the baseline contract.
- The contract assumes mixed-age content where some posts may need to opt out of discussion.
- Expanding discussion support to additional page types requires an explicit future contract update.
