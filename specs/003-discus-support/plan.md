# Implementation Plan: Hugo Theme Discus Support

**Branch**: `003-discus-support` | **Date**: 2026-03-30 | **Spec**: [spec.md](/home/bundai223/repos/github.com/bundai223/proto_design_system/specs/003-discus-support/spec.md)
**Input**: Feature specification from `/specs/003-discus-support/spec.md`

## Summary

Add post-level Discus support to the Hugo theme so published blog posts can show a post-specific discussion area after the article body without disrupting the reading experience. The implementation should extend the current Hugo post layout and shared theme configuration, use a site-level default plus per-post override for visibility control, and degrade gracefully by hiding the embed and showing a short unavailable message when the discussion service cannot be loaded.

## Technical Context

**Language/Version**: Hugo Go template syntax, HTML, CSS, Markdown-rendered content, existing TypeScript 5.x token export tooling  
**Primary Dependencies**: Hugo theme layout system, existing `layouts/posts/single.html` and shared partials, Hugo site/page parameters, existing theme CSS assets and generated token CSS  
**Storage**: File-based Hugo content and theme templates; no application database  
**Testing**: Hugo local build/render verification, representative post rendering checks, and repository validation through `npm test && npm run lint` plus token CSS export when theme assets change  
**Target Platform**: Static Hugo site generation for browser-rendered blog pages  
**Project Type**: Hugo theme feature inside an existing frontend/design-system repository  
**Performance Goals**: Preserve a lightweight article experience and avoid blocking the main post content when the external discussion service is missing or slow  
**Constraints**: Keep scope to published individual post pages in the initial release, preserve existing post metadata/body rendering, place discussion after the article body, avoid discussion UI on unsupported pages, rely on Hugo-native configuration patterns, and treat external discussion loading failure as non-fatal  
**Scale/Scope**: One theme feature affecting post detail rendering, shared theme configuration, documentation, and validation for current and future published posts

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

The constitution file at `.specify/memory/constitution.md` is still a placeholder template and does not define enforceable project-specific gates. No explicit constitutional conflicts were identified for this feature.

Pre-Phase 0 Gate Result: PASS  
Post-Phase 1 Gate Result: PASS

## Project Structure

### Documentation (this feature)

```text
specs/003-discus-support/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── discussion-surface.md
└── tasks.md
```

### Source Code (repository root)

```text
.
├── README.md
├── package.json
├── export-css.ts
├── hugo_themes/
│   └── proto_design_system/
│       ├── layouts/
│       │   ├── _default/
│       │   │   └── baseof.html
│       │   ├── posts/
│       │   │   └── single.html
│       │   └── partials/
│       │       ├── head.html
│       │       ├── post-meta.html
│       │       ├── taxonomy-links.html
│       │       └── discussion.html
│       ├── assets/
│       │   └── css/
│       │       ├── theme.css
│       │       └── prose.css
│       ├── static/
│       │   └── theme/
│       │       └── tokens.css
│       └── theme.toml
├── specs/
│   ├── 002-hugo-theme/
│   └── 003-discus-support/
└── AGENTS.md
```

**Structure Decision**: Keep the repository as a single project and implement the feature inside the existing Hugo theme under `hugo_themes/proto_design_system/`. The feature should be introduced as a bounded extension of the current post-detail template and a reusable discussion partial rather than a separate application surface.

## Phase 0: Research Outcomes

- Discus support should be introduced as a published-post detail concern, not as a global site-wide block rendered on every page type.
- The theme should derive discussion visibility from a site-level default plus an optional per-post override so maintainers can control scope without editing templates per article.
- The discussion container should appear after the article body in a consistent placement that does not compete with title, metadata, taxonomy links, or table-of-contents content.
- Missing configuration or external-service failure should degrade to a normal article page with the embed hidden and a short unavailable message in its place.
- The contract should stay runtime-agnostic at the spec level, but the implementation can rely on Hugo-native parameters, partials, and conditional rendering patterns already used in the theme.

## Phase 1: Design Focus

- Add a dedicated discussion rendering boundary for post pages as a reusable partial or clearly bounded post-layout section.
- Define the small set of configuration inputs that control discussion visibility through a site default plus per-post override.
- Preserve the existing post entity and reading flow while introducing a derived discussion state that can resolve to rendered, disabled, unavailable, or unsupported.
- Document how maintainers validate supported published posts, disabled posts, and unsupported page types without introducing unnecessary automation complexity.

## Complexity Tracking

No constitutional violations or exceptional complexity require justification.
