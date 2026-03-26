# Phase 0 Research: Reusable Design System Foundation

## Decision 1: Use a root entry point as the only supported consumer boundary

- **Decision**: Treat `index.ts` as the sole supported import surface for consumers.
- **Rationale**: This gives the maintainer freedom to reorganize internal files without breaking consumers and aligns with the clarified requirement that direct internal imports are unsupported.
- **Alternatives considered**:
  - Allow subpath imports: rejected because it expands the compatibility surface without clear benefit at this scale.
  - Allow direct internal imports: rejected because it makes future refactors risky and undermines the goal of a reusable package shape.

## Decision 2: Keep the demo in-repo as a supported usage example

- **Decision**: Maintain a single in-repo demo application under `demo/` that imports from the library boundary instead of duplicating internals.
- **Rationale**: This provides a fast verification path for intended usage and directly supports the spec requirement that maintainers can identify and verify supported usage quickly.
- **Alternatives considered**:
  - Remove the demo: rejected because it weakens the proof that the package is actually consumable.
  - Move the demo to a separate repository/package: rejected because it adds coordination overhead without improving the current feature outcome.

## Decision 3: Validation must cover four distinct failure modes

- **Decision**: Require `typecheck`, `test`, `demo:build`, and `export:css:all` as the validation workflow.
- **Rationale**: Each command protects a different contract: types and imports, token-export behavior, supported demo consumption, and Hugo-facing CSS generation.
- **Alternatives considered**:
  - Typecheck plus tests only: rejected because demo consumption and CSS export are key feature promises.
  - Typecheck only: rejected because it would miss runtime/demo integration and generated artifact regressions.

## Decision 4: Legacy fragment implementations should be deleted once replaced

- **Decision**: Remove obsolete fragment implementations rather than keeping them as reference-only artifacts.
- **Rationale**: Keeping parallel legacy implementations increases ambiguity around what is safe to use and conflicts with the requirement to leave only supported library and demo assets.
- **Alternatives considered**:
  - Keep legacy files as reference-only: rejected because they still create confusion around supported surfaces.
  - Keep legacy files in the public API temporarily: rejected because it broadens the support burden during refactoring.

## Decision 5: Scope remains a single lightweight library package

- **Decision**: Keep the repository as a single TypeScript package with colocated library code, demo code, and CLI tooling.
- **Rationale**: The current scope is limited to two themes, seven core primitives, and one export script; a package split would add ceremony without solving a demonstrated problem.
- **Alternatives considered**:
  - Separate packages for tokens, components, and demo: rejected as premature complexity.
  - Introduce a dedicated app workspace: rejected because the current Vite demo is sufficient for feature validation.

## Decision 6: Performance and scale goals stay pragmatic rather than SLA-driven

- **Decision**: Use local developer productivity and consumer clarity as the main quality target rather than hard runtime SLAs.
- **Rationale**: This feature is about package organization and reuse, not high-throughput runtime behavior. The practical success signals are a responsive demo, working token export, and reliable validation commands.
- **Alternatives considered**:
  - Add strict rendering or build-time budgets now: rejected because the spec does not require them and the current scope is small.
