# proto_design_system Development Guidelines

Auto-generated from all feature plans. Last updated: 2026-03-30

## Active Technologies
- Hugo Go template syntax, HTML, CSS, Markdown-rendered content, existing TypeScript 5.x token export tooling + Hugo theme layout system, existing generated token CSS from `export-css.ts`, repository CSS assets, optional Hugo Pipes for asset delivery if available (002-hugo-theme)
- File-based Hugo content and templates; no application database (002-hugo-theme)
- Hugo Go template syntax, HTML, CSS, Markdown-rendered content, existing TypeScript 5.x token export tooling + Hugo theme layout system, existing `layouts/posts/single.html` and shared partials, Hugo site/page parameters, existing theme CSS assets and generated token CSS (003-discus-support)
- File-based Hugo content and theme templates; no application database (003-discus-support)

- TypeScript 5.x, JSX with React 19 development dependencies + React, React DOM, Vite, Vitest, TSX, TypeScript (001-design-system-foundation)

## Project Structure

```text
src/
tests/
```

## Commands

npm test && npm run lint

## Code Style

TypeScript 5.x, JSX with React 19 development dependencies: Follow standard conventions

## Recent Changes
- 003-discus-support: Added Hugo Go template syntax, HTML, CSS, Markdown-rendered content, existing TypeScript 5.x token export tooling + Hugo theme layout system, existing `layouts/posts/single.html` and shared partials, Hugo site/page parameters, existing theme CSS assets and generated token CSS
- 003-discus-support: Added Hugo Go template syntax, HTML, CSS, Markdown-rendered content, existing TypeScript 5.x token export tooling + Hugo theme layout system, existing `layouts/posts/single.html` and shared partials, Hugo site/page parameters, existing theme CSS assets and generated token CSS
- 002-hugo-theme: Added Hugo Go template syntax, HTML, CSS, Markdown-rendered content, existing TypeScript 5.x token export tooling + Hugo theme layout system, existing generated token CSS from `export-css.ts`, repository CSS assets, optional Hugo Pipes for asset delivery if available


<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
