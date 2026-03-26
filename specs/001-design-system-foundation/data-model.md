# Data Model: Reusable Design System Foundation

## Overview

This feature does not introduce persisted application data. Its design model consists of reusable library concepts and the relationships that define the supported consumer surface.

## Entities

### Theme

- **Purpose**: Represents a named visual mode available to consumers.
- **Fields**:
  - `name`: stable theme identifier such as `mono` or `kawaii`
  - `label`: human-readable theme name
  - `colors`: color token collection
  - `typography`: typography token collection
  - `scale`: spacing token collection
  - `radius`: border-radius token collection
  - `fontImport`: font import source used by the theme
- **Validation rules**:
  - `name` must be unique across supported themes
  - all supported themes must provide the same token key set
  - `fontImport` must resolve to a valid import URL string
- **Relationships**:
  - one `Theme` owns one `Design Token Set`
  - one `Theme` can be selected by `ThemeProvider`

### Design Token Set

- **Purpose**: Encapsulates the reusable values that control presentation.
- **Fields**:
  - `colors`
  - `typography`
  - `scale`
  - `radius`
- **Validation rules**:
  - token keys are stable across themes
  - values must be serializable to CSS custom properties
- **Relationships**:
  - belongs to exactly one `Theme`
  - exported by the token export CLI into CSS custom properties

### UI Primitive

- **Purpose**: A reusable React component intended for library consumers.
- **Supported initial instances**:
  - `Button`
  - `Card`
  - `Badge`
  - `Input`
  - `Section`
  - `Divider`
  - `ThemeSwitcher`
- **Validation rules**:
  - each primitive is reachable from the root public entry point
  - each primitive renders correctly under `ThemeProvider`
- **Relationships**:
  - consumes `Theme` context through `ThemeProvider` and `useTheme`
  - may be exercised by the supported demo

### Public API Surface

- **Purpose**: Defines the stable exports and entry points supported for external consumption.
- **Fields**:
  - `rootEntryPoint`: package root export
  - `libraryExports`: supported theme utilities, tokens, types, and primitives
  - `cliExports`: supported token export entry point
- **Validation rules**:
  - supported consumer usage goes through the root entry point only
  - internal implementation file imports are unsupported
  - documentation and demo must match this supported surface
- **Relationships**:
  - exposes `Theme`, token utilities, and `UI Primitive` instances
  - consumed by demo and downstream apps

### Demo Asset

- **Purpose**: A supported in-repo usage example that proves the library is consumable.
- **Fields**:
  - `entryHtml`
  - `entryModule`
  - `styles`
  - `showcaseComponent`
- **Validation rules**:
  - must import from the supported public surface rather than duplicating internal logic
  - must build successfully as part of required validation
- **Relationships**:
  - consumes the `Public API Surface`
  - demonstrates `Theme` switching and `UI Primitive` rendering

## Relationships Summary

- A `Theme` owns one `Design Token Set`.
- `ThemeProvider` activates one `Theme` at runtime.
- Each `UI Primitive` depends on the active `Theme` or its tokens.
- The `Public API Surface` exposes supported `Theme` utilities and `UI Primitive` exports.
- The `Demo Asset` consumes only the `Public API Surface`.

## Lifecycle Notes

- Theme selection starts with a default theme and may switch to another supported theme without changing internal source files.
- Token export converts the in-memory `Theme` representation into CSS custom properties for Hugo/static-site consumption.
- Validation must confirm the public surface remains internally consistent after changes.
