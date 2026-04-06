# proto_design_system Development Guidelines

Auto-generated from all feature plans. Last updated: 2026-04-07

## Active Technologies
- Hugo Go template syntax, HTML, CSS, Markdown-rendered content, existing TypeScript 5.x token export tooling + Hugo theme layout system, existing generated token CSS from `export-css.ts`, repository CSS assets, optional Hugo Pipes for asset delivery if available (002-hugo-theme)
- File-based Hugo content and templates; no application database (002-hugo-theme)
- Hugo Go template syntax, HTML, CSS, Markdown-rendered content, existing TypeScript 5.x token export tooling + Hugo theme layout system, existing `layouts/posts/single.html` and shared partials, Hugo site/page parameters, existing theme CSS assets and generated token CSS (003-discus-support)
- File-based Hugo content and theme templates; no application database (003-discus-support)
- TypeScript 5.x, JSX with React 19 development dependencies, Vite 7.x, YAML for GitHub Actions workflow configuration + Vite build pipeline, existing `demo/` showcase entry, GitHub Actions Pages workflow, npm package scripts in `package.json` (004-github-pages-publish)
- File-based repository assets and generated static output in `dist/demo`; no application database (004-github-pages-publish)

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
- 004-github-pages-publish: Added TypeScript 5.x, JSX with React 19 development dependencies, Vite 7.x, YAML for GitHub Actions workflow configuration + Vite build pipeline, existing `demo/` showcase entry, GitHub Actions Pages workflow, npm package scripts in `package.json`
- 003-discus-support: Added Hugo Go template syntax, HTML, CSS, Markdown-rendered content, existing TypeScript 5.x token export tooling + Hugo theme layout system, existing `layouts/posts/single.html` and shared partials, Hugo site/page parameters, existing theme CSS assets and generated token CSS
- 003-discus-support: Added Hugo Go template syntax, HTML, CSS, Markdown-rendered content, existing TypeScript 5.x token export tooling + Hugo theme layout system, existing `layouts/posts/single.html` and shared partials, Hugo site/page parameters, existing theme CSS assets and generated token CSS


<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
