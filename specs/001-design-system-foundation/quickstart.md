# Quickstart: Reusable Design System Foundation

## Prerequisites

- Node.js environment capable of running the existing npm scripts
- npm installed

## Install

```bash
npm install
```

## Validate the Supported Surface

Run the required validation workflow:

```bash
npm run typecheck
npm test
npm run demo:build
npm run export:css:all
```

Expected outcomes:

- type checking passes
- tests pass
- the in-repo demo builds successfully
- `dist/tokens.css` is generated successfully

## Run the Supported Demo

```bash
npm run demo
```

Use the demo to verify:

- theme switching between `mono` and `kawaii`
- rendering of the core primitives
- the demo imports from the supported public surface rather than private implementation files

## Consume the Library Surface

Example usage:

```tsx
import { ThemeProvider, Button, Card } from "design-system";

export function App() {
  return (
    <ThemeProvider defaultTheme="mono">
      <Card title="Hello" meta="Demo">
        <Button variant="accent">Click</Button>
      </Card>
    </ThemeProvider>
  );
}
```

Consumer rule:

- import from the package root entry point
- do not import internal implementation files directly

## Generate Hugo Token CSS

```bash
npm run export:css:all
```

The generated file is written to `dist/tokens.css` and can be linked from Hugo templates.
