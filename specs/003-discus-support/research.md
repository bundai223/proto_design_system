# Phase 0 Research: Hugo Theme Discus Support

## Decision 1: Scope discussion support to published post detail pages only

- **Decision**: Add Discus support only to published individual blog post pages in the initial release.
- **Rationale**: The clarified spec explicitly limits the surface to published posts. This keeps the implementation narrow and avoids exposing discussion UI on drafts, lists, taxonomies, and generic pages.
- **Alternatives considered**:
  - Show discussion on all content types: rejected because it adds noise to unsupported surfaces and exceeds the clarified scope.
  - Support draft previews from the start: rejected because the current feature is defined around published-post behavior.

## Decision 2: Use Hugo-native configuration with a site default plus per-post override

- **Decision**: Model visibility through a site-level default and optional post-level override using Hugo configuration surfaces.
- **Rationale**: The clarified spec requires both a default policy and post-specific control. Hugo site parameters and front matter are the existing configuration mechanisms in this theme, so reusing them avoids introducing a separate configuration system.
- **Alternatives considered**:
  - Hardcode discussion on every supported post: rejected because it cannot satisfy the required visibility controls.
  - Require post-level configuration on every article: rejected because it creates unnecessary migration work for existing published posts.

## Decision 3: Place the discussion area after the article body

- **Decision**: Render the discussion region after the main article body within the post layout.
- **Rationale**: This was clarified directly in the spec and matches expected reading flow. It keeps title, metadata, taxonomy links, and optional TOC unobstructed while still making comments easy to find.
- **Alternatives considered**:
  - Place discussion above the article: rejected because it disrupts reading flow.
  - Place discussion in a sidebar: rejected because the current theme already uses side layout space for structural content rather than conversation UI.

## Decision 4: Treat discussion availability as a derived render state with explicit fallback messaging

- **Decision**: Resolve discussion state per page into rendered, disabled, unavailable, or unsupported, and when unavailable hide the embed and show a short unavailable message.
- **Rationale**: The feature has to distinguish between pages that should not show discussion and pages where the service cannot load successfully. The clarified fallback behavior makes graceful degradation explicit and testable.
- **Alternatives considered**:
  - Treat all absence cases the same: rejected because disabled scope and service failure are different operational states.
  - Show an empty discussion shell when unavailable: rejected because the spec forbids broken or misleading placeholders.

## Decision 5: Keep the implementation boundary within the Hugo theme

- **Decision**: Implement the feature through the existing Hugo theme templates, partials, and CSS rather than through the React demo application or a separate integration layer.
- **Rationale**: The runtime surface for the feature is the Hugo blog theme. Extending the existing theme keeps the design aligned with feature `002-hugo-theme` and avoids duplicating view logic elsewhere in the repository.
- **Alternatives considered**:
  - Prototype discussion support in the React demo first: rejected because it does not validate the real Hugo rendering surface.
  - Create a separate theme package: rejected because the repository already treats `hugo_themes/proto_design_system/` as the deliverable theme boundary.

## Decision 6: Validate with pragmatic render checks instead of new browser automation

- **Decision**: Validate the feature with representative Hugo render checks and repository lint/test commands rather than introducing browser automation in this phase.
- **Rationale**: The dominant risks are incorrect placement, wrong scoping, and broken graceful-degradation behavior. Those are best addressed by template-level verification and representative content checks.
- **Alternatives considered**:
  - Add end-to-end UI automation immediately: rejected as disproportionate to the size of the feature and current repo conventions.
  - Rely only on static inspection of templates: rejected because render verification is still needed for confidence.
