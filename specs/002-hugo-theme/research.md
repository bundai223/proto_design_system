# Phase 0 Research: Hugo Blog Theme Implementation

## Decision 1: Implement the theme with Hugo templates, not a React runtime

- **Decision**: Build the feature as a Hugo theme using `layouts/`, `partials/`, and CSS assets instead of trying to render the blog through the existing React demo stack.
- **Rationale**: The target runtime is a statically generated Hugo blog. Hugo-native templates align with the real deployment environment, preserve existing content conventions, and avoid introducing a client-side dependency for basic reading flows.
- **Alternatives considered**:
  - Reuse React components directly in the blog runtime: rejected because the existing blog is Hugo-based and does not need a frontend app shell for normal navigation.
  - Build a separate exported HTML generator: rejected because Hugo already provides the rendering model and content abstractions the site needs.

## Decision 2: Reuse design-system direction through exported CSS tokens and shared styling, not through component embedding

- **Decision**: Treat the existing design system as a source of tokens and visual language, then express the blog UI in Hugo templates plus CSS.
- **Rationale**: The spec requires consistent visual language, but Hugo pages are assembled from templates rather than React component trees. CSS token reuse is the lowest-friction bridge between the existing repository and the Hugo theme.
- **Alternatives considered**:
  - Copy React component markup verbatim into templates: rejected because it creates duplicated structure without solving the runtime mismatch.
  - Ignore the existing design system entirely: rejected because it would abandon the repo's current visual baseline and token export tooling.

## Decision 3: Lean on Hugo's native content APIs for summaries, TOC, permalinks, and taxonomies

- **Decision**: Use Hugo's `.Summary`, `.Content`, `.TableOfContents`, `.Permalink`, taxonomy templates, and metadata accessors as the core rendering primitives.
- **Rationale**: The content archive already fits Hugo's model. Using native template features keeps the theme simple, resilient to metadata variation, and aligned with the clarified requirements.
- **Alternatives considered**:
  - Parse Markdown or front matter manually in custom scripts: rejected as unnecessary complexity and higher maintenance risk.
  - Define a theme-specific excerpt algorithm: rejected because the user explicitly chose Hugo's existing summary behavior.

## Decision 4: Make `baseof.html` and shared partials the main composition boundary

- **Decision**: Centralize shared structure in `layouts/_default/baseof.html` and compose page-specific views from partials like header, footer, post metadata, taxonomy links, and TOC sections.
- **Rationale**: The feature scope includes both posts and non-post views. A shared composition boundary is the simplest way to keep navigation and visual language coherent across page types.
- **Alternatives considered**:
  - Duplicate markup separately for each view: rejected because it would drift quickly and make the whole-theme requirement harder to satisfy.
  - Put all layout logic in a single monolithic template: rejected because post, taxonomy, and general page layouts need distinct content blocks.

## Decision 5: Preserve normal shortcode compatibility and explicitly defer AMP

- **Decision**: Verify that existing shortcode output renders in standard HTML pages and leave AMP-specific templates out of the initial implementation.
- **Rationale**: The clarified scope requires shortcode compatibility in normal rendering, but not AMP parity. This keeps implementation targeted while protecting the existing content archive.
- **Alternatives considered**:
  - Require full AMP parity from the start: rejected because it expands scope substantially without being part of the initial acceptance target.
  - Ignore shortcode compatibility: rejected because at least one existing post depends on shortcode rendering.

## Decision 6: Treat post metadata variability as a first-class design constraint

- **Decision**: Design templates so that optional `tags`, `categories`, and `toc` fields can be missing without creating broken UI or placeholder artifacts.
- **Rationale**: The archive contains older and newer posts with inconsistent metadata density and formatting. Robust conditional rendering is therefore part of the feature, not an edge concern.
- **Alternatives considered**:
  - Normalize all content first: rejected because the task is to implement the theme against the current archive, not migrate the archive.
  - Require strict front matter across all posts: rejected because it would block adoption on the existing content set.

## Decision 7: Keep validation pragmatic and content-oriented

- **Decision**: Validate the feature by combining token generation with Hugo render checks against representative pages rather than introducing a heavy automated browser stack in this phase.
- **Rationale**: The most important risks are broken templates, missing metadata handling, and layout inconsistencies. Those can be checked effectively through build/render verification and representative content review.
- **Alternatives considered**:
  - Add full end-to-end browser automation now: rejected as premature for an initial theme feature.
  - Rely only on visual intuition without builds: rejected because template regressions need explicit verification.
