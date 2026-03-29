# Tasks: Hugo Theme Discus Support

**Input**: Design documents from `/specs/003-discus-support/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: No separate test-first tasks were generated because the feature spec did not explicitly request TDD or contract-test creation. Validation tasks are included where they make each story independently verifiable.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g. US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- Hugo theme runtime files live under `hugo_themes/proto_design_system/`
- Feature documentation for this work lives under `specs/003-discus-support/`
- Repository-level theme documentation lives in `./README.md`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm the current post-layout integration points and the documentation surface for the clarified discussion feature

- [X] T001 Review the current post detail rendering path in `hugo_themes/proto_design_system/layouts/posts/single.html` and `hugo_themes/proto_design_system/layouts/_default/baseof.html`
- [X] T002 [P] Review current theme styling entry points in `hugo_themes/proto_design_system/assets/css/theme.css` and `hugo_themes/proto_design_system/assets/css/prose.css`
- [X] T003 [P] Review current theme usage and setup notes in `./README.md`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish the shared discussion rendering boundary, visibility inputs, and baseline documentation that all stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T004 Add documented site-level discussion default and post-level override configuration notes to `./README.md`
- [X] T005 Create the shared discussion rendering partial in `hugo_themes/proto_design_system/layouts/partials/discussion.html`
- [X] T006 Wire the discussion partial into the post layout after the article body in `hugo_themes/proto_design_system/layouts/posts/single.html`
- [X] T007 Add baseline discussion section styling hooks in `hugo_themes/proto_design_system/assets/css/theme.css`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Read and Participate in Post Discussions (Priority: P1) 🎯 MVP

**Goal**: Show a post-specific Discus discussion area after the article body on supported published posts

**Independent Test**: Open a published post with discussion enabled and confirm the discussion area appears after the article body, is clearly tied to the current post, and does not reuse another article’s discussion context

### Implementation for User Story 1

- [X] T008 [US1] Implement published-post eligibility and post-specific discussion context resolution in `hugo_themes/proto_design_system/layouts/partials/discussion.html`
- [X] T009 [US1] Render the discussion section after the article body without disrupting existing post content in `hugo_themes/proto_design_system/layouts/posts/single.html`
- [X] T010 [P] [US1] Refine discussion section layout and spacing for the post detail view in `hugo_themes/proto_design_system/assets/css/theme.css`
- [X] T011 [US1] Document the supported published-post discussion setup flow in `./README.md`
- [X] T012 [US1] Validate the published-post discussion MVP against `specs/003-discus-support/quickstart.md`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Site Owner Controls Where Discussions Appear (Priority: P2)

**Goal**: Allow maintainers to control discussion with a site-level default plus per-post override while keeping unsupported pages discussion-free

**Independent Test**: Configure one published post to inherit discussion from the site default, one published post to override discussion to disabled, and one non-post page, then confirm only the intended published post renders the discussion area

### Implementation for User Story 2

- [X] T013 [US2] Implement site-level discussion default handling in `hugo_themes/proto_design_system/layouts/partials/discussion.html`
- [X] T014 [US2] Implement per-post discussion override handling in `hugo_themes/proto_design_system/layouts/partials/discussion.html`
- [X] T015 [US2] Ensure unsupported pages and non-published content remain discussion-free by constraining the render path in `hugo_themes/proto_design_system/layouts/partials/discussion.html` and `hugo_themes/proto_design_system/layouts/posts/single.html`
- [X] T016 [US2] Document site-default and per-post override behavior in `./README.md`
- [X] T017 [US2] Validate visibility-control scenarios against `specs/003-discus-support/quickstart.md`

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Fail Gracefully When Discussion Is Unavailable (Priority: P3)

**Goal**: Preserve a clean, readable article experience by hiding the embed and showing a short unavailable message when discussion cannot be loaded

**Independent Test**: Render a supported published post with unavailable discussion and confirm the article remains readable, the embed is hidden, a short unavailable message appears after the article body, and unsupported pages still show no discussion UI

### Implementation for User Story 3

- [X] T018 [US3] Implement unavailable-discussion fallback behavior with embed suppression and short-message rendering in `hugo_themes/proto_design_system/layouts/partials/discussion.html`
- [X] T019 [P] [US3] Adjust discussion styling for disabled and unavailable states in `hugo_themes/proto_design_system/assets/css/theme.css`
- [X] T020 [US3] Document disabled and unavailable discussion behavior in `./README.md`
- [X] T021 [US3] Validate graceful-degradation scenarios against `specs/003-discus-support/quickstart.md`

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final consistency, documentation alignment, and repository-wide validation across all stories

- [X] T022 [P] Align `specs/003-discus-support/quickstart.md` with the final implementation details
- [X] T023 [P] Review `specs/003-discus-support/contracts/discussion-surface.md` against the implemented theme behavior
- [X] T024 Run repository validation commands documented in `./README.md`
- [X] T025 Run end-to-end feature validation from `specs/003-discus-support/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational completion
- **User Story 2 (Phase 4)**: Depends on Foundational completion and extends the shared render path established for US1
- **User Story 3 (Phase 5)**: Depends on Foundational completion and extends the shared render path established for US1
- **Polish (Phase 6)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - MVP slice
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) but is safest after US1 establishes the published-post render path
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) but is safest after US1 establishes the published-post render path

### Within Each User Story

- Implement shared rendering behavior before adding documentation for that story
- Keep visibility logic and fallback logic inside the dedicated discussion partial where possible
- Run the story-specific validation task before moving on

### Parallel Opportunities

- T002 and T003 can run in parallel during Setup
- T010 and T011 can run in parallel after T008 and T009
- T019 and T020 can run in parallel after T018
- T022 and T023 can run in parallel during Polish

---

## Parallel Example: User Story 1

```bash
# After the published-post discussion render path is working, finish the story in parallel:
Task: "Refine discussion section layout and spacing in hugo_themes/proto_design_system/assets/css/theme.css"
Task: "Document the supported published-post discussion setup flow in ./README.md"
```

---

## Parallel Example: User Story 3

```bash
# After unavailable fallback behavior is implemented, finish the story in parallel:
Task: "Adjust discussion styling for disabled and unavailable states in hugo_themes/proto_design_system/assets/css/theme.css"
Task: "Document disabled and unavailable discussion behavior in ./README.md"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. Stop and validate the MVP with `specs/003-discus-support/quickstart.md`

### Incremental Delivery

1. Finish Setup + Foundational to establish the shared discussion boundary
2. Deliver User Story 1 for visible published-post discussion
3. Add User Story 2 for site-default and per-post visibility control
4. Add User Story 3 for unavailable-service fallback behavior
5. Finish with cross-cutting validation and documentation polish

### Parallel Team Strategy

1. One developer can establish the shared discussion partial and post layout integration in Phase 2
2. After that, one developer can focus on visibility controls while another handles unavailable-state styling and documentation
3. Rejoin for final validation and quickstart verification

---

## Notes

- Total tasks: 25
- User story task counts: US1 = 5, US2 = 5, US3 = 4
- Suggested MVP scope: Phase 3 only (User Story 1)
- All tasks use the required checklist format with task IDs, story labels where required, and explicit file paths
