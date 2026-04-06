# Implementation Plan: Publish Design System on GitHub Pages

**Branch**: `004-github-pages-publish` | **Date**: 2026-04-07 | **Spec**: [spec.md](/home/bundai223/repos/github.com/bundai223/proto_design_system/specs/004-github-pages-publish/spec.md)
**Input**: Feature specification from `/specs/004-github-pages-publish/spec.md`

## Summary

Publish the existing Vite-powered design system showcase to GitHub Pages using GitHub Actions so visitors can browse the interactive demo at the repository Pages URL. The implementation should keep `demo/` as the source surface, make the Vite build base-path aware for `https://bundai223.github.io/proto_design_system/`, and deploy the generated `dist/demo` output through the official Pages artifact workflow instead of a manually maintained publish branch.

## Technical Context

**Language/Version**: TypeScript 5.x, JSX with React 19 development dependencies, Vite 7.x, YAML for GitHub Actions workflow configuration  
**Primary Dependencies**: Vite build pipeline, existing `demo/` showcase entry, GitHub Actions Pages workflow, npm package scripts in `package.json`  
**Storage**: File-based repository assets and generated static output in `dist/demo`; no application database  
**Testing**: `npm run demo:build`, static output inspection for repository-path asset URLs, and GitHub Actions deployment status checks  
**Target Platform**: Browser-rendered static site hosted on GitHub Pages project URL  
**Project Type**: Frontend/design-system repository with a publishable static demo surface  
**Performance Goals**: Keep first published page load equivalent to the current demo build and avoid introducing extra runtime dependencies beyond the existing bundle output  
**Constraints**: GitHub Pages project sites are served from a repository-specific base path, deployment should use repository-native automation, no custom domain is required in scope, and publish output must come from `dist/demo` rather than ad hoc copied files  
**Scale/Scope**: One repository feature affecting Vite configuration, build/deploy automation, and maintainer documentation for a single static showcase surface

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

The constitution file at `.specify/memory/constitution.md` remains a placeholder template and does not define enforceable project-specific gates. No explicit constitutional conflicts were identified for this feature.

Pre-Phase 0 Gate Result: PASS  
Post-Phase 1 Gate Result: PASS

## Project Structure

### Documentation (this feature)

```text
specs/004-github-pages-publish/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── pages-deployment.md
└── tasks.md
```

### Source Code (repository root)

```text
.
├── README.md
├── package.json
├── vite.config.ts
├── demo/
│   ├── index.html
│   ├── main.tsx
│   ├── App.tsx
│   └── DesignSystem.tsx
├── dist/
│   └── demo/
│       └── index.html
├── .github/
│   └── workflows/
│       └── deploy-pages.yml
├── specs/
│   ├── 001-design-system-foundation/
│   ├── 002-hugo-theme/
│   ├── 003-discus-support/
│   └── 004-github-pages-publish/
└── AGENTS.md
```

**Structure Decision**: Keep the repository as a single project and publish the existing Vite showcase under `demo/`. The implementation boundary is the existing frontend demo build plus a GitHub Actions workflow, not a separate Pages-only application or external deployment branch.

## Phase 0: Research Outcomes

- GitHub Pages should be deployed with the official GitHub Actions artifact flow rather than a hand-maintained `gh-pages` branch.
- The existing `dist/demo/index.html` currently emits root-relative asset URLs like `/assets/...`, which will break for a project Pages URL and therefore requires an explicit Vite `base` strategy.
- The repository already has a clear publishable surface in `demo/`, so the feature should reuse that surface instead of creating a second static site.
- The publish contract should be a deterministic `npm run demo:build` output directory of `dist/demo`.
- Maintainer documentation must cover both GitHub repository settings and local build verification so the hosted result remains reproducible.

## Phase 1: Design Focus

- Introduce a single source of truth for the Pages base path so local builds, CI builds, and future repository-name changes can be handled predictably.
- Add a GitHub Actions workflow that installs dependencies, builds the Vite showcase, uploads the Pages artifact, and deploys it through the Pages environment.
- Preserve the existing `demo/` application entry and keep deployment-specific logic out of component code where possible.
- Document the local commands and repository settings needed to verify the exact output that GitHub Pages publishes.

## Complexity Tracking

No constitutional violations or exceptional complexity require justification.
