# Tasks: Publish Design System on GitHub Pages

**Input**: Design documents from `/specs/004-github-pages-publish/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The feature spec does not request TDD or separate contract-test creation. This task list therefore uses build verification, artifact inspection, and hosted deployment validation tasks.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g. US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- Vite showcase source files live under `demo/`
- Build configuration lives in `vite.config.ts` and `package.json`
- GitHub Pages automation lives under `.github/workflows/`
- Repository usage and deployment documentation lives in `README.md`
- Feature planning artifacts live under `specs/004-github-pages-publish/`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm the current showcase build surface and the deployment/documentation touchpoints for GitHub Pages

- [X] T001 Review the current Vite showcase build contract in `vite.config.ts` and `package.json`
- [X] T002 [P] Review the current demo entry surface in `demo/index.html`, `demo/main.tsx`, and `demo/App.tsx`
- [X] T003 [P] Review current repository usage and build guidance in `README.md`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish the shared Pages base-path contract and deployment scaffolding that all user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T004 Add a single source of truth for GitHub Pages base-path resolution in `vite.config.ts`
- [X] T005 Update the showcase build configuration to keep publishing `dist/demo` with the Pages-aware base path in `vite.config.ts`
- [X] T006 Create the GitHub Pages deployment workflow scaffold in `.github/workflows/deploy-pages.yml`
- [X] T007 Add baseline maintainer guidance for GitHub Pages deployment prerequisites in `README.md`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Browse the Published Showcase (Priority: P1) 🎯 MVP

**Goal**: Publish a visitor-facing showcase that loads correctly from the repository GitHub Pages URL

**Independent Test**: Build the site, inspect `dist/demo/index.html` for repository-path asset URLs, deploy to GitHub Pages, and confirm the published showcase loads without broken assets or a blank screen.

### Implementation for User Story 1

- [X] T008 [US1] Configure production asset URLs for the repository Pages path in `vite.config.ts`
- [X] T009 [US1] Adjust the demo HTML entry if needed so the published app remains rooted correctly in `demo/index.html`
- [X] T010 [US1] Verify the generated publish artifact shape and asset references from `dist/demo/index.html`
- [X] T011 [US1] Document the visitor-facing GitHub Pages URL and expected published behavior in `README.md`
- [X] T012 [US1] Validate the MVP publish flow against `specs/004-github-pages-publish/quickstart.md`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Deploy Changes Automatically from the Repository (Priority: P2)

**Goal**: Let maintainers push repository changes and have GitHub build and deploy the showcase automatically

**Independent Test**: Push a change to the configured publishing branch, observe the GitHub Actions workflow complete, and confirm the published site updates without any manual `gh-pages` branch management.

### Implementation for User Story 2

- [X] T013 [US2] Configure GitHub Actions permissions, concurrency, and Pages environment in `.github/workflows/deploy-pages.yml`
- [X] T014 [US2] Implement dependency install and showcase build steps targeting `dist/demo` in `.github/workflows/deploy-pages.yml`
- [X] T015 [US2] Implement Pages artifact upload and deploy steps in `.github/workflows/deploy-pages.yml`
- [X] T016 [US2] Document repository settings needed to use GitHub Actions as the Pages source in `README.md`
- [ ] T017 [US2] Validate automatic deployment behavior against `specs/004-github-pages-publish/quickstart.md`

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Keep Local and Hosted Behavior Aligned (Priority: P3)

**Goal**: Make local verification reproduce the same static output and deployment assumptions used by GitHub Pages

**Independent Test**: Run the documented local build, confirm it produces the same `dist/demo` directory and Pages-aware asset paths expected by the workflow, and verify maintainers can update the publish path without touching demo component code.

### Implementation for User Story 3

- [X] T018 [US3] Centralize the relationship between repository name, Pages base path, and build output in `vite.config.ts`
- [X] T019 [P] [US3] Document the local build-verification flow and publish-directory contract in `README.md`
- [X] T020 [P] [US3] Align local and hosted verification steps with the final implementation in `specs/004-github-pages-publish/quickstart.md`
- [X] T021 [US3] Review the deployment contract against the implemented workflow and build behavior in `specs/004-github-pages-publish/contracts/pages-deployment.md`
- [X] T022 [US3] Validate local-versus-hosted parity with `npm run demo:build` and `specs/004-github-pages-publish/quickstart.md`

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final consistency, cleanup, and repository-wide validation across all stories

- [X] T023 [P] Reconcile final deployment notes across `README.md`, `specs/004-github-pages-publish/quickstart.md`, and `specs/004-github-pages-publish/contracts/pages-deployment.md`
- [X] T024 Run repository validation commands from `package.json` and reconcile any Pages-related build issues in `vite.config.ts`
- [ ] T025 Run end-to-end feature validation from `specs/004-github-pages-publish/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational completion
- **User Story 2 (Phase 4)**: Depends on Foundational completion and is safest after US1 confirms the Pages base-path behavior
- **User Story 3 (Phase 5)**: Depends on Foundational completion and is safest after US1 and US2 establish the final build and workflow contract
- **Polish (Phase 6)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational - MVP slice
- **User Story 2 (P2)**: Can start after Foundational but should build on the working Pages-aware artifact from US1
- **User Story 3 (P3)**: Can start after Foundational but should finalize documentation and parity after US1 and US2 stabilize the real deployment path

### Within Each User Story

- Establish or update build/workflow behavior before documenting it
- Verify the generated artifact shape before treating a story as complete
- Run the story-specific validation task before moving on

### Parallel Opportunities

- T002 and T003 can run in parallel during Setup
- T019 and T020 can run in parallel during US3
- T023 can run in parallel with validation prep once the implementation is stable

---

## Parallel Example: User Story 3

```bash
# After the final Pages contract is implemented, finish the parity work in parallel:
Task: "Document the local build-verification flow and publish-directory contract in README.md"
Task: "Align local and hosted verification steps in specs/004-github-pages-publish/quickstart.md"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. Stop and validate that the published showcase can load from the repository GitHub Pages path

### Incremental Delivery

1. Finish Setup + Foundational to lock the Pages base-path and workflow scaffold
2. Deliver User Story 1 for a working public showcase
3. Add User Story 2 for repository-native automatic deployment
4. Add User Story 3 for local/hosted parity and durable maintainer guidance
5. Finish with cross-cutting validation and documentation reconciliation

### Parallel Team Strategy

1. One contributor can establish the Vite base-path contract while another drafts the README deployment prerequisites
2. After the foundation exists, one contributor can finish the Pages workflow while another validates and documents the visitor-facing URL behavior
3. Rejoin for local-versus-hosted parity checks and final validation

---

## Notes

- Total tasks: 25
- User story task counts: US1 = 5, US2 = 5, US3 = 5
- Suggested MVP scope: Phase 3 only (User Story 1)
- All tasks use the required checklist format with task IDs, story labels where required, and explicit file paths
