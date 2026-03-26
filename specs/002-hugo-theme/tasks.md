# Tasks: Hugo Blog Theme Implementation

**Input**: Design documents from `/specs/002-hugo-theme/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Automated tests are not explicitly required by the spec. This task list therefore focuses on implementation plus build/render validation steps using `npm run export:css:all`, `hugo`, and `hugo server`.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each theme surface.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Establish the Hugo theme file layout and token asset destinations

- [X] T001 Create the Hugo theme directory skeleton in `layouts/`, `layouts/_default/`, `layouts/partials/`, `layouts/posts/`, `layouts/tags/`, `layouts/categories/`, `layouts/page/`, `assets/css/`, and `static/theme/`
- [X] T002 Create theme metadata and usage scaffolding in `theme.toml` and `README.md`
- [X] T003 [P] Add a Hugo token asset handoff step description to `README.md` and `specs/002-hugo-theme/quickstart.md`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared layout, styling, and metadata primitives that all page types depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T004 Implement the shared document shell and Hugo block structure in `layouts/_default/baseof.html`
- [X] T005 [P] Implement shared `<head>` asset loading and token CSS inclusion in `layouts/partials/head.html`
- [X] T006 [P] Implement shared site header navigation in `layouts/partials/header.html`
- [X] T007 [P] Implement shared site footer in `layouts/partials/footer.html`
- [X] T008 [P] Create the base theme stylesheet in `assets/css/theme.css`
- [X] T009 [P] Create the article/prose stylesheet in `assets/css/prose.css`
- [X] T010 Implement shared post metadata rendering in `layouts/partials/post-meta.html`
- [X] T011 [P] Implement reusable taxonomy link rendering in `layouts/partials/taxonomy-links.html`
- [X] T012 [P] Implement opt-in TOC partial logic in `layouts/partials/toc.html`
- [X] T013 Copy or wire exported token CSS into `static/theme/tokens.css`

**Checkpoint**: Foundation ready; all page-specific theme work can now build on a common shell

---

## Phase 3: User Story 1 - Browse the Blog Entry Points (Priority: P1) 🎯 MVP

**Goal**: Deliver a clear site entry and post-list browsing experience with human-readable metadata and no draft leakage

**Independent Test**: Run `hugo server` and verify that the home page and blog listing page expose primary navigation, show published posts with title/date/summary, and do not expose draft posts in normal published-facing views.

### Implementation for User Story 1

- [X] T014 [P] [US1] Implement the home or primary landing template in `layouts/index.html`
- [X] T015 [P] [US1] Implement the default list template for section-style listings in `layouts/_default/list.html`
- [X] T016 [P] [US1] Implement the posts section listing template in `layouts/posts/list.html`
- [X] T017 [P] [US1] Implement reusable post card markup using `.Title`, `.Date`, `.Summary`, and `.Permalink` in `layouts/partials/post-card.html`
- [X] T018 [US1] Integrate `layouts/index.html`, `layouts/_default/list.html`, and `layouts/posts/list.html` with `layouts/partials/post-card.html` and shared navigation
- [X] T019 [US1] Adjust `assets/css/theme.css` and `assets/css/prose.css` for landing/listing readability and summary presentation
- [X] T020 [US1] Document the listing and draft-visibility verification flow in `README.md`

**Checkpoint**: User Story 1 should now provide a coherent entry path into the blog and readable published post listings

---

## Phase 4: User Story 2 - Read an Individual Post Comfortably (Priority: P2)

**Goal**: Deliver a readable post page with metadata, optional TOC, taxonomy links, images, and shortcode-compatible body rendering

**Independent Test**: Open a representative post with minimal front matter and another with tags/categories/`toc: true`, then verify title/date/body rendering, optional metadata behavior, TOC gating, image rendering, and shortcode output under `hugo server`.

### Implementation for User Story 2

- [X] T021 [P] [US2] Implement the default single template in `layouts/_default/single.html`
- [X] T022 [P] [US2] Implement the posts single template in `layouts/posts/single.html`
- [X] T023 [US2] Compose post detail rendering in `layouts/posts/single.html` using `layouts/partials/post-meta.html`, `layouts/partials/taxonomy-links.html`, and `layouts/partials/toc.html`
- [X] T024 [US2] Add article-body and embedded-content styling for Markdown, shortcodes, and `/images/...` references in `assets/css/prose.css`
- [X] T025 [US2] Tune page-level spacing, article header, and reading layout styles in `assets/css/theme.css`
- [X] T026 [US2] Document representative post verification for minimal metadata, rich metadata, images, and shortcode content in `README.md`

**Checkpoint**: User Story 2 should render individual posts correctly across the known metadata and content variations

---

## Phase 5: User Story 3 - Explore Content by Taxonomy (Priority: P3)

**Goal**: Deliver tag and category browsing pages that expose related posts without breaking on missing taxonomy metadata

**Independent Test**: Open tag and category list/term pages under `hugo server` and verify taxonomy names, related post listings, and graceful handling when some posts have no taxonomy data.

### Implementation for User Story 3

- [X] T027 [P] [US3] Implement the default taxonomy template in `layouts/_default/taxonomy.html`
- [X] T028 [P] [US3] Implement the tags list and term templates in `layouts/tags/list.html` and `layouts/tags/term.html`
- [X] T029 [P] [US3] Implement the categories list and term templates in `layouts/categories/list.html` and `layouts/categories/term.html`
- [X] T030 [US3] Integrate taxonomy templates with `layouts/partials/post-card.html` and `layouts/partials/taxonomy-links.html`
- [X] T031 [US3] Add taxonomy index and term styling in `assets/css/theme.css`
- [X] T032 [US3] Document taxonomy verification expectations in `README.md`

**Checkpoint**: User Story 3 should provide working taxonomy discovery independent of non-post page work

---

## Phase 6: User Story 4 - Navigate the Rest of the Blog Theme (Priority: P3)

**Goal**: Extend the same theme language and shared layout to representative non-post pages and cross-site views

**Independent Test**: Open at least one representative non-post page and confirm that header, footer, spacing, and typography remain coherent with the post and listing experience.

### Implementation for User Story 4

- [X] T033 [P] [US4] Implement the generic page single template in `layouts/page/single.html`
- [X] T034 [P] [US4] Refine fallback non-post rendering in `layouts/_default/single.html`
- [X] T035 [US4] Extend shared navigation and layout states for non-post contexts in `layouts/partials/header.html` and `layouts/_default/baseof.html`
- [X] T036 [US4] Add non-post page styling rules in `assets/css/theme.css`
- [X] T037 [US4] Document representative non-post verification in `README.md`

**Checkpoint**: All major theme surfaces should now share one coherent site experience

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final cleanup, validation, and artifact alignment across all user stories

- [X] T038 [P] Run token generation and refresh `dist/tokens.css` and `static/theme/tokens.css` via `export-css.ts`
- [X] T039 Run Hugo build validation against the target site and reconcile any template issues in `layouts/` and `assets/css/`
- [X] T040 Reconcile final theme usage guidance in `README.md`, `specs/002-hugo-theme/quickstart.md`, and `specs/002-hugo-theme/contracts/theme-surface.md`
- [X] T041 Clean up redundant or unused theme files across `layouts/`, `assets/css/`, and `static/theme/`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies; can start immediately
- **Foundational (Phase 2)**: Depends on Setup; blocks all user stories
- **User Stories (Phases 3-6)**: Depend on Foundational completion
- **Polish (Phase 7)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Starts after Foundational; no dependency on later stories
- **User Story 2 (P2)**: Starts after Foundational and benefits from US1 post-card/list styling but remains independently testable on post detail pages
- **User Story 3 (P3)**: Starts after Foundational and can reuse shared listing partials without depending on US4
- **User Story 4 (P3)**: Starts after Foundational and should reuse shared layout primitives established earlier

### Within Each User Story

- Shared partials and layout primitives must exist before page-specific composition
- Page templates come before story-specific styling/documentation refinements
- Story-specific documentation follows working template output

### Parallel Opportunities

- `T005`, `T006`, `T007`, `T008`, `T009`, `T011`, `T012`, and `T013` can run in parallel after `T004`
- In US1, `T014`, `T015`, `T016`, and `T017` can run in parallel
- In US2, `T021` and `T022` can run in parallel before composition in `T023`
- In US3, `T027`, `T028`, and `T029` can run in parallel
- In US4, `T033` and `T034` can run in parallel

---

## Parallel Example: User Story 1

```bash
Task: "Implement the home or primary landing template in layouts/index.html"
Task: "Implement the default list template for section-style listings in layouts/_default/list.html"
Task: "Implement the posts section listing template in layouts/posts/list.html"
Task: "Implement reusable post card markup in layouts/partials/post-card.html"
```

---

## Parallel Example: User Story 3

```bash
Task: "Implement the default taxonomy template in layouts/_default/taxonomy.html"
Task: "Implement the tags list and term templates in layouts/tags/list.html and layouts/tags/term.html"
Task: "Implement the categories list and term templates in layouts/categories/list.html and layouts/categories/term.html"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. Stop and validate home plus listing behavior under Hugo

### Incremental Delivery

1. Setup + Foundational establish the reusable theme shell
2. Add User Story 1 for site entry and listings
3. Add User Story 2 for readable article pages
4. Add User Story 3 for taxonomy discovery
5. Add User Story 4 for non-post coherence
6. Finish with cross-cutting validation and cleanup

### Parallel Team Strategy

1. One contributor finishes Setup + Foundational
2. Then work can split by surface:
   - Contributor A: US1 listings and home
   - Contributor B: US2 post detail
   - Contributor C: US3 taxonomy
   - Contributor D: US4 non-post pages

---

## Notes

- [P] tasks touch different files and are safe to parallelize
- Each user story is framed so it can be verified independently with Hugo render checks
- Avoid introducing AMP-specific tasks in this feature; AMP is explicitly out of scope
- Prefer Hugo-native template logic over custom preprocessing scripts
