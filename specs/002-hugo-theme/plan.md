# Implementation Plan: Hugo Blog Theme Implementation

**Branch**: `002-hugo-theme` | **Date**: 2026-03-27 | **Spec**: [spec.md](/home/bundai223/repos/github.com/bundai223/proto_design_system/specs/002-hugo-theme/spec.md)
**Input**: Feature specification from `/specs/002-hugo-theme/spec.md`

## Summary

Implement a Hugo theme layer that reuses the repository's design-token direction for a real blog, covering site entry pages, post lists, post detail pages, taxonomy views, and shared non-post layouts. The implementation should rely on Hugo templates and CSS assets rather than React runtime components, preserve normal shortcode and `/images/...` compatibility, and use Hugo's existing `.Summary` plus opt-in `toc: true` behavior.

## Technical Context

**Language/Version**: Hugo Go template syntax, HTML, CSS, Markdown-rendered content, existing TypeScript 5.x token export tooling  
**Primary Dependencies**: Hugo theme layout system, existing generated token CSS from `export-css.ts`, repository CSS assets, optional Hugo Pipes for asset delivery if available  
**Storage**: File-based Hugo content and templates; no application database  
**Testing**: Hugo local build/render verification, representative content rendering checks against existing post structures, existing `npm run export:css:all` for token CSS generation  
**Target Platform**: Static Hugo site generation for a personal blog, browser-rendered HTML/CSS output  
**Project Type**: Hugo theme implementation inside an existing frontend/design-system repository  
**Performance Goals**: Generated pages remain lightweight and readable; no client-side app shell required for normal navigation  
**Constraints**: Theme must work with existing `content/posts/*.md` structure, tolerate sparse metadata, preserve normal shortcode output, treat AMP as out of scope, and keep filenames out of reader-facing presentation  
**Scale/Scope**: One Hugo theme, shared site chrome, post list/detail/taxonomy coverage, representative non-post layouts, and compatibility with the current post archive conventions

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

The constitution file is still a placeholder template and does not define enforceable project gates. No explicit constitutional conflicts were identified for this feature.

Pre-Phase 0 Gate Result: PASS  
Post-Phase 1 Gate Result: PASS

## Project Structure

### Documentation (this feature)

```text
specs/002-hugo-theme/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── theme-surface.md
└── tasks.md
```

### Source Code (repository root)

```text
.
├── hugo_blog_posts_structure.md
├── dist/
│   └── tokens.css
├── export-css.ts
├── package.json
├── hugo_themes/
│   └── proto_design_system/
│       ├── layouts/
│       │   ├── _default/
│       │   │   ├── baseof.html
│       │   │   ├── list.html
│       │   │   ├── single.html
│       │   │   └── taxonomy.html
│       │   ├── index.html
│       │   ├── posts/
│       │   │   ├── list.html
│       │   │   └── single.html
│       │   ├── tags/
│       │   │   ├── list.html
│       │   │   └── term.html
│       │   ├── categories/
│       │   │   ├── list.html
│       │   │   └── term.html
│       │   ├── page/
│       │   │   └── single.html
│       │   └── partials/
│       │       ├── head.html
│       │       ├── header.html
│       │       ├── footer.html
│       │       ├── post-card.html
│       │       ├── post-meta.html
│       │       ├── taxonomy-links.html
│       │       └── toc.html
│       ├── assets/
│       │   └── css/
│       │       ├── theme.css
│       │       └── prose.css
│       ├── static/
│       │   └── theme/
│       │       └── tokens.css
│       └── theme.toml
└── README.md
```

**Structure Decision**: Keep the repository as a single project, but place the Hugo theme under `hugo_themes/proto_design_system/` so the whole theme can be copied or vendored into another blog repository as one unit. The implementation still relies on Hugo-native layouts, shared partials, CSS assets, and exported token CSS.

## Phase 0: Research Outcomes

- Hugo-native templates should be the primary rendering mechanism; React components are not the delivery surface for the blog theme.
- Shared layout and post-specific layout should be separated through `baseof.html` plus reusable partials to keep non-post and post views visually consistent.
- Token CSS should be treated as a build artifact consumed by Hugo templates, not regenerated at request time.
- Post rendering should lean on Hugo defaults such as `.Content`, `.Summary`, `.TableOfContents`, `.Permalink`, and taxonomy pages rather than custom parsing logic.
- Initial implementation should cover normal HTML rendering only and explicitly avoid AMP-specific template work.

## Phase 1: Design Focus

- Define the core content entities and page-view relationships that the theme must support across posts, taxonomies, and non-post pages.
- Document the theme surface contract in terms of required template coverage, metadata handling, and preserved compatibility behaviors.
- Capture a quickstart that lets a maintainer generate tokens, place the theme into a Hugo site, and verify representative pages quickly.
- Keep the implementation lightweight: mostly template files and CSS, with no new application server or client-side rendering layer.

## Complexity Tracking

No constitutional violations or exceptional complexity require justification.
