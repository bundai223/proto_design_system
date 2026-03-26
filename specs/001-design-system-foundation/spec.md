# Feature Specification: Reusable Design System Foundation

**Feature Branch**: `001-design-system-foundation`  
**Created**: 2026-03-25  
**Status**: Draft  
**Input**: User description: "claudeで作った design system の断片があります。使える形にまとめたい"

## Clarifications

### Session 2026-03-26

- Q: Should legacy design-system fragments be deleted, retained as reference-only assets, or kept as part of the public API? → A: Delete all legacy fragments and keep only the reusable library and demo.
- Q: Should the demo remain in the same repository as a supported usage example, be removed, or be moved to a separate package/repository? → A: Keep the demo in the same repository as the supported usage example.
- Q: What validation workflow should be required before the reusable design system is considered ready for use? → A: typecheck, tests, demo build, and token export are all required.
- Q: Which UI primitives should be explicitly guaranteed as part of the initial public API surface? → A: Button, Card, Badge, Input, Section, Divider, and ThemeSwitcher.
- Q: Should consumers rely only on the public root entry point or be allowed to import internal files directly? → A: Consumers rely only on the public root entry point; direct internal imports are unsupported.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Reuse the design system in another screen or app (Priority: P1)

As the maintainer, I want the fragmented design system assets to be organized into a consistent, reusable package so that I can use the same tokens, theme behavior, and UI primitives across multiple interfaces without manually copying code.

**Why this priority**: Reusability is the core value of the feature. If the system cannot be consumed consistently outside the original fragment, it does not solve the user’s stated problem.

**Independent Test**: Can be fully tested by importing the design system into a separate sample screen, rendering the shared provider and primitives, and confirming they work together without copying internal implementation details.

**Acceptance Scenarios**:

1. **Given** fragmented design system files exist, **When** the maintainer consumes the organized package from a separate entry point, **Then** the shared themes, tokens, and primitives are available through a documented public API.
2. **Given** the design system is consumed in a new screen, **When** the maintainer renders core components under the shared theme provider, **Then** the components use the same visual language and theme behavior as the original fragment.
3. **Given** the maintainer consumes the organized package, **When** they follow the documented usage path, **Then** they import supported assets from the root public entry point rather than internal source files.

---

### User Story 2 - Understand what is stable to use (Priority: P2)

As the maintainer, I want clear structure and usage guidance so that I know which files and exports are intended for reuse and which files are only for demo or exploration.

**Why this priority**: Even if the code is technically reusable, it remains hard to use if its public surface and intended structure are unclear.

**Independent Test**: Can be tested by reviewing the repository structure and documentation, then identifying the package entry point, the reusable modules, and any demo-only files without reading the entire codebase.

**Acceptance Scenarios**:

1. **Given** a maintainer opens the repository, **When** they review the main entry points and documentation, **Then** they can identify the supported reusable exports and the intended usage path.
2. **Given** the repository includes non-library assets, **When** the maintainer reviews the repository, **Then** only the reusable library surface and the supported demo remain and no legacy fragment files are presented as supported assets.
3. **Given** a maintainer wants to verify intended usage quickly, **When** they open the repository, **Then** they can find a supported demo in the same repository that consumes the public library surface rather than duplicating internal implementation.

---

### User Story 3 - Evolve the system safely (Priority: P3)

As the maintainer, I want the organized design system to include validation for its reusable surface so that future changes are less likely to break consumers unexpectedly.

**Why this priority**: Once the fragments become shared assets, regressions become more expensive. Basic validation is needed to keep the package usable over time.

**Independent Test**: Can be tested by running the repository’s validation workflow and confirming that the reusable surface is checked before distribution or further refactoring.

**Acceptance Scenarios**:

1. **Given** the design system has a reusable entry point, **When** the maintainer runs the project validation workflow, **Then** the workflow confirms the reusable surface is internally consistent.
2. **Given** a future contributor changes tokens, themes, or exported components, **When** they run validation, **Then** they receive feedback before shipping a broken package shape.
3. **Given** a maintainer prepares the design system for reuse, **When** they run the validation workflow, **Then** type checking, automated tests, demo build, and token export all complete successfully.

### Edge Cases

- What happens when some existing files are only partial prototypes and should remain available for reference but not be treated as supported public API?
- How does the system handle missing or inconsistent imports, exports, or type definitions across the fragmented files?
- What happens when a consumer needs only tokens or theming utilities without adopting every UI primitive?
- How does the package behave when a consumer uses the default theme versus switching to another supported theme?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST provide a clearly defined public entry point for consuming the design system.
- **FR-001a**: Supported consumer usage MUST go through the root public entry point, and direct imports from internal implementation files are unsupported.
- **FR-002**: The system MUST expose the reusable theme provider, theme access utilities, design tokens, and core UI primitives through the supported public API.
- **FR-002a**: The initial supported UI primitive set MUST include `Button`, `Card`, `Badge`, `Input`, `Section`, `Divider`, and `ThemeSwitcher`.
- **FR-003**: The system MUST separate reusable library assets from demo, exploratory, or reference-only assets.
- **FR-003a**: The system MUST remove legacy fragment files instead of retaining them as reference-only assets once an equivalent reusable library surface and supported demo are established.
- **FR-003b**: The system MUST keep a supported demo in the same repository as a usage example, and that demo MUST consume the public library surface rather than private duplicated logic.
- **FR-004**: The system MUST organize fragmented source files so that imports, exports, and type references are internally consistent.
- **FR-005**: The system MUST allow consumers to use the design system’s supported themes without modifying internal source files.
- **FR-006**: The system MUST include usage guidance that shows how a consumer should adopt the reusable design system surface.
- **FR-007**: The system MUST include a validation workflow that checks the reusable design system surface for basic consistency before distribution or further reuse.
- **FR-007a**: The required validation workflow MUST include type checking, automated tests, supported demo build verification, and successful design token CSS export.
- **FR-008**: The system MUST preserve the existing design intent of the fragmented assets unless a change is required to make the system reusable and internally consistent.
- **FR-009**: Consumers MUST be able to access reusable assets without depending on demo-only files.

### Key Entities *(include if feature involves data)*

- **Theme**: A named visual mode that defines the token values used by the design system.
- **Design Token Set**: A reusable collection of values such as colors, typography, spacing, and radius scales that support a theme.
- **UI Primitive**: A reusable component intended to be consumed by other screens or applications.
- **Core UI Primitive Set**: The initial guaranteed reusable components: `Button`, `Card`, `Badge`, `Input`, `Section`, `Divider`, and `ThemeSwitcher`.
- **Public API Surface**: The supported set of exports and entry points that consumers rely on.
- **Demo Asset**: A non-essential file used for showcase, exploration, or visual reference rather than direct reuse.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A maintainer can identify the supported reusable entry point and core exports within 5 minutes of opening the repository.
- **SC-002**: A consumer can render the theme provider and at least three core UI primitives from the supported public API in a separate sample usage flow without copying internal source code.
- **SC-002a**: A consumer can complete the documented sample usage flow using only the root public entry point, without importing internal source files.
- **SC-003**: Validation completes successfully for the reusable surface before the package is considered ready for use, including type checking, automated tests, demo build, and token export.
- **SC-004**: Demo or exploratory assets are distinguishable from supported reusable assets in the repository structure and documentation.

## Assumptions

- The existing fragments already contain enough design intent to define an initial reusable version without requiring a full redesign.
- The first usable version focuses on organizing and exposing the current assets rather than expanding the component catalog.
- The first usable version guarantees the current component set of `Button`, `Card`, `Badge`, `Input`, `Section`, `Divider`, and `ThemeSwitcher` as the initial public primitive surface.
- Any retained non-library files are limited to the supported demo and documentation; obsolete fragment implementations are removed once replaced.
- The supported demo remains in the same repository so maintainers can validate intended usage without setting up a separate consumer repository.
- Consumers of this work are expected to use the documented entry point rather than importing arbitrary internal files.
- Consumers rely on the root public entry point only; internal file paths may change without preserving consumer compatibility.
