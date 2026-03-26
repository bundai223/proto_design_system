# Tasks: Reusable Design System Foundation

**Input**: Design documents from `/specs/001-design-system-foundation/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are required for this feature because the specification explicitly requires a validation workflow covering type checking, automated tests, demo build, and token export.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- Library source lives at the repository root (`index.ts`, `types.ts`, `tokens*.ts`, `ThemeContext.tsx`, `components.tsx`, `export-css.ts`)
- Demo app lives in `demo/`
- Feature documents live in `specs/001-design-system-foundation/`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Align repository metadata, ignore rules, and build configuration with the planned reusable library shape

- [X] T001 Verify and finalize ignore coverage in `.gitignore` for Node/Vite/TypeScript/generated artifact patterns
- [X] T002 Update package metadata and root scripts in `package.json` to reflect the supported library entry point, demo commands, and token export commands
- [X] T003 [P] Align TypeScript and Vite configuration in `tsconfig.json` and `vite.config.ts` with the root-library-plus-demo structure

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish the stable public surface and core architectural boundaries required by all user stories

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T004 Define the supported export boundary in `index.ts`, `tokens.ts`, and `types.ts`
- [X] T005 [P] Normalize theme and provider architecture in `tokens.mono.ts`, `tokens.kawaii.ts`, and `ThemeContext.tsx`
- [X] T006 [P] Make the component primitives consistent with the supported type contracts in `components.tsx` and `types.ts`
- [X] T007 Remove obsolete fragment implementations and ensure only the supported library/demo assets remain by updating `DesignSystem.tsx`, deleting legacy files, and reviewing repository root structure

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Reuse the design system in another screen or app (Priority: P1) 🎯 MVP

**Goal**: Expose a reusable root entry point that lets consumers render the theme provider, tokens, and core primitives without importing internal implementation files

**Independent Test**: Import the library into a separate sample usage flow, render `ThemeProvider` plus at least three core primitives, and confirm only the root public entry point is used

### Tests for User Story 1 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [X] T008 [P] [US1] Add public API surface assertions in `export-css.test.ts` or a new root-level test file covering supported exports and root-entry usage
- [X] T009 [P] [US1] Add consumer usage verification through the supported sample flow in `DesignSystem.tsx` and `demo/main.tsx`

### Implementation for User Story 1

- [X] T010 [P] [US1] Refine the supported root consumer example in `DesignSystem.tsx` to consume the library only through `./index`
- [X] T011 [P] [US1] Update the in-repo consumer wiring in `demo/main.tsx` and `demo/index.html` so the demo exercises the supported library surface
- [X] T012 [US1] Complete reusable export and import cleanup in `index.ts`, `ThemeContext.tsx`, `components.tsx`, `tokens.ts`, and `types.ts`
- [X] T013 [US1] Verify reusable theme switching behavior for `mono` and `kawaii` in `ThemeContext.tsx`, `tokens.mono.ts`, `tokens.kawaii.ts`, and `components.tsx`

**Checkpoint**: User Story 1 should now provide a reusable, consumer-safe entry point and working demo consumer

---

## Phase 4: User Story 2 - Understand what is stable to use (Priority: P2)

**Goal**: Make the supported library surface, supported demo, and unsupported internal paths obvious from the repository structure and documentation

**Independent Test**: Review the repository and docs and identify the supported entry point, guaranteed exports, demo role, and absence of legacy fragment files without reading the whole codebase

### Tests for User Story 2 ⚠️

- [X] T014 [P] [US2] Add a documentation-oriented validation task description in `specs/001-design-system-foundation/quickstart.md` and `specs/001-design-system-foundation/contracts/public-api.md` covering supported usage expectations

### Implementation for User Story 2

- [X] T015 [US2] Update consumer-facing guidance in `README.md` to document the root entry point, supported demo, validation commands, and Hugo token export usage
- [X] T016 [US2] Align implementation and spec-facing documentation in `specs/001-design-system-foundation/quickstart.md`, `specs/001-design-system-foundation/contracts/public-api.md`, and `specs/001-design-system-foundation/plan.md`
- [X] T017 [US2] Review and remove any remaining ambiguous or legacy naming/path references in `README.md`, `package.json`, `export-css.ts`, and repository root files

**Checkpoint**: User Story 2 should now make the supported surface and intended usage path obvious

---

## Phase 5: User Story 3 - Evolve the system safely (Priority: P3)

**Goal**: Provide a repeatable validation workflow that guards the reusable surface against regressions

**Independent Test**: Run the full validation workflow and confirm typecheck, automated tests, demo build, and token export all succeed and match the documented process

### Tests for User Story 3 ⚠️

- [X] T018 [P] [US3] Expand `export-css.test.ts` to cover token export expectations and theme key consistency for the supported themes
- [X] T019 [P] [US3] Add or refine validation command coverage in `package.json` and `README.md` so the required workflow is executable end-to-end

### Implementation for User Story 3

- [X] T020 [US3] Finalize the token export CLI behavior in `export-css.ts` and related scripts in `package.json`
- [X] T021 [US3] Ensure validation tooling is aligned in `vitest.config.ts`, `tsconfig.json`, and `vite.config.ts`
- [X] T022 [US3] Run and verify the required workflow using `package.json` commands and record the supported sequence in `README.md`

**Checkpoint**: User Story 3 should now provide a reliable validation workflow for future changes

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final cleanup and cross-story verification

- [X] T023 [P] Reconcile generated feature docs with the shipped implementation in `specs/001-design-system-foundation/spec.md`, `specs/001-design-system-foundation/plan.md`, and `specs/001-design-system-foundation/quickstart.md`
- [X] T024 Run the full quickstart validation flow and sanity-check generated outputs in `dist/tokens.css` and `dist/demo/`
- [X] T025 [P] Review the repository root for unsupported leftovers and finalize deletions/renames across `README.md`, `DesignSystem.tsx`, `demo/`, and removed legacy fragment files

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phases 3-5)**: Depend on Foundational phase completion
- **Polish (Phase 6)**: Depends on all selected user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Starts after Phase 2 and establishes the MVP reusable surface
- **User Story 2 (P2)**: Starts after Phase 2 and depends conceptually on the public surface defined in US1
- **User Story 3 (P3)**: Starts after Phase 2 and validates the reusable surface plus demo/CLI behavior

### Within Each User Story

- Validation/test tasks are written before implementation updates
- Root export boundary and provider/theme consistency must exist before consumer demo polishing
- Documentation alignment follows the supported implementation shape
- Full workflow verification happens after the commands and configs are finalized

### Parallel Opportunities

- T003 can run alongside T001-T002 once setup review begins
- T005 and T006 can run in parallel after T004 because they touch different core areas
- T008 and T009 can run in parallel for US1
- T010 and T011 can run in parallel for US1
- T018 and T019 can run in parallel for US3
- T023 and T025 can run in parallel during polish

---

## Parallel Example: User Story 1

```bash
# Write the US1 verification work in parallel:
Task: "Add public API surface assertions in export-css.test.ts or a new root-level test file covering supported exports and root-entry usage"
Task: "Add consumer usage verification through the supported sample flow in DesignSystem.tsx and demo/main.tsx"

# Then implement the consumer-facing updates in parallel:
Task: "Refine the supported root consumer example in DesignSystem.tsx to consume the library only through ./index"
Task: "Update the in-repo consumer wiring in demo/main.tsx and demo/index.html so the demo exercises the supported library surface"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. Validate the reusable root entry point and demo consumer

### Incremental Delivery

1. Finish Setup + Foundational work
2. Deliver User Story 1 as the MVP reusable package surface
3. Add User Story 2 documentation and repository clarity
4. Add User Story 3 validation workflow hardening
5. Finish with Polish verification

### Parallel Team Strategy

With multiple developers:

1. One developer handles Phase 1/2 structural work
2. After Phase 2:
   - Developer A: User Story 1 consumer-surface tasks
   - Developer B: User Story 2 documentation and repository clarity tasks
   - Developer C: User Story 3 validation workflow tasks

---

## Notes

- [P] tasks touch different files and can proceed together
- Every user story remains independently testable
- The supported consumer boundary is the root entry point only
- Legacy fragment implementations must not survive the final feature state
- The validation workflow for feature completion is `npm run typecheck`, `npm test`, `npm run demo:build`, and `npm run export:css:all`
