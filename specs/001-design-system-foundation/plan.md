# Implementation Plan: Reusable Design System Foundation

**Branch**: `001-design-system-foundation` | **Date**: 2026-03-26 | **Spec**: [spec.md](/home/bundai223/repos/github.com/bundai223/proto_design_system/specs/001-design-system-foundation/spec.md)
**Input**: Feature specification from `/specs/001-design-system-foundation/spec.md`

## Summary

Reorganize the existing design-system fragments into a reusable TypeScript/React library with a single root entry point, keep a supported in-repo demo that consumes only that public surface, remove obsolete fragment implementations, and preserve Hugo token export support plus validation commands for typecheck, tests, demo build, and CSS token generation.

## Technical Context

**Language/Version**: TypeScript 5.x, JSX with React 19 development dependencies  
**Primary Dependencies**: React, React DOM, Vite, Vitest, TSX, TypeScript  
**Storage**: N/A  
**Testing**: `tsc --noEmit`, Vitest snapshot/unit tests, Vite demo production build, token export CLI verification  
**Target Platform**: Node.js-based package development, browser-rendered React demo, Hugo/static-site CSS consumers  
**Project Type**: Frontend component library with demo app and token export CLI  
**Performance Goals**: No explicit latency SLO; validation commands complete locally and demo remains responsive for manual inspection  
**Constraints**: Supported consumer usage goes through the root entry point only; legacy fragment files must be removed; supported demo stays in-repo and must consume the public library surface; Hugo token export must keep working  
**Scale/Scope**: 2 themes, 7 guaranteed UI primitives, 1 root library entry point, 1 demo app, 1 token export CLI, repository-local validation workflow

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

The constitution file is currently a placeholder template with no concrete enforceable principles, gates, or constraints. No explicit constitutional violations are present.

Pre-Phase 0 Gate Result: PASS  
Post-Phase 1 Gate Result: PASS

## Project Structure

### Documentation (this feature)

```text
specs/001-design-system-foundation/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── public-api.md
└── tasks.md
```

### Source Code (repository root)

```text
.
├── .npmignore
├── index.ts
├── types.ts
├── tokens.ts
├── tokens.mono.ts
├── tokens.kawaii.ts
├── ThemeContext.tsx
├── components.tsx
├── DesignSystem.tsx
├── export-css.ts
├── export-css.test.ts
├── public-api.test.ts
├── demo/
│   ├── App.tsx
│   ├── index.html
│   ├── main.tsx
│   └── styles.css
├── dist/
│   ├── demo/
│   └── tokens.css
├── README.md
├── AGENTS.md
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.ts
└── vitest.config.ts
```

**Structure Decision**: Keep a single-package repository with library source at the root, one in-repo `demo/` application for supported usage verification, and spec artifacts under `specs/001-design-system-foundation/`. No multi-package split is needed at this scope.

## Phase 0: Research Outcomes

- Root public entry point contract is the right stability boundary; consumers do not import internal files directly.
- The supported in-repo demo should be treated as a consumer of the library, not as duplicated implementation.
- Validation for this feature must cover type safety, library behavior, demo buildability, and Hugo token export continuity.
- Legacy fragment implementations should be removed after equivalent supported library/demo paths exist.

## Phase 1: Design Focus

- Define the reusable domain around `Theme`, `Design Token Set`, `UI Primitive`, `Core UI Primitive Set`, `Public API Surface`, and `Demo Asset`.
- Document the public contract in a consumer-facing contract file so future refactors preserve the supported exports and commands.
- Capture a quickstart flow that proves both library use and demo verification without relying on internal file imports.
- Keep implementation changes small and repository-local rather than introducing package splits or build-system expansion.

## Complexity Tracking

No constitutional violations or exceptional complexity require justification.
