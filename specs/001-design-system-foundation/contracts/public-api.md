# Public API Contract: Reusable Design System Foundation

## Supported Consumer Entry Points

### Library Root Entry Point

- **Path**: package root via `index.ts`
- **Rule**: Consumers import supported assets from the root entry point only.
- **Non-goal**: Direct imports from internal files such as `components.tsx`, `tokens.mono.ts`, or `ThemeContext.tsx` are not supported compatibility commitments.

### Token Export CLI Entry Point

- **Path**: `export-css.ts`
- **Rule**: The CLI remains available for generating Hugo/static-site token CSS output.

## Supported Library Exports

The root entry point must export:

- Theme-related types from `types.ts`
- Theme records and theme definitions from `tokens.ts`
- `ThemeProvider` and `useTheme` from `ThemeContext.tsx`
- `Button`
- `Card`
- `Badge`
- `Input`
- `Section`
- `Divider`
- `ThemeSwitcher`

## Consumer Guarantees

- A consumer can render `ThemeProvider` plus at least three supported primitives using only the root entry point.
- A consumer can access supported themes without editing internal source files.
- The demo must serve as proof of supported usage and consume the library through that same root entry point.
- Validation must cover type checking, tests, demo build, and token export.

## CLI Contract

### Supported Commands

- `npm run export:css`
- `npm run export:css:kawaii`
- `npm run export:css:all`

### Expected Behavior

- Default output writes CSS custom properties to `dist/tokens.css`.
- `--all` generates selectors for all supported themes.
- Unknown theme names cause the command to fail clearly.

## Compatibility Notes

- Internal file paths may change during refactoring without preserving consumer compatibility.
- Expanding the public API surface requires explicit spec and contract updates.
