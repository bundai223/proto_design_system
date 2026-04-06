# Phase 0 Research: Publish Design System on GitHub Pages

## Decision 1: Publish the existing Vite showcase instead of introducing a new site surface

- **Decision**: Use the existing `demo/` Vite showcase as the GitHub Pages site.
- **Rationale**: The repository already exposes an interactive browser-facing demo with `vite.config.ts` configured for `root: "demo"` and build output in `dist/demo`. Reusing it keeps the public site aligned with the maintained design-system surface.
- **Alternatives considered**:
  - Build a separate Hugo or static marketing site: rejected because it adds a second presentation surface with no evidence it is needed for the initial requirement.
  - Publish library files directly without a showcase: rejected because the user-facing value is the ability to browse the design system visually.

## Decision 2: Use the GitHub Actions Pages artifact workflow

- **Decision**: Deploy through the official GitHub Pages GitHub Actions flow that builds the site, uploads the static artifact, and deploys it to Pages.
- **Rationale**: Current GitHub Pages guidance supports repository-native deployment through Actions, which keeps build logs, publish status, and deployment state inside normal GitHub automation. This avoids the maintenance burden of force-pushing a generated branch.
- **Alternatives considered**:
  - Maintain a `gh-pages` branch manually: rejected because it duplicates generated output in version control and makes releases harder to audit.
  - Rely on the legacy branch source flow: rejected because Actions-based deployment is the more explicit and maintainable path for this repository.

## Decision 3: Make the Vite build base-path aware for project Pages

- **Decision**: Configure Vite so production asset URLs resolve under the repository path, currently expected to be `/proto_design_system/`.
- **Rationale**: The current built `dist/demo/index.html` uses root-relative paths such as `/assets/index-*.js`. On a project Pages site these would incorrectly point to `https://bundai223.github.io/assets/...` instead of `https://bundai223.github.io/proto_design_system/assets/...`, causing a broken page.
- **Alternatives considered**:
  - Leave `base` unset: rejected because current output confirms it generates root-relative asset URLs.
  - Hardcode asset URLs in HTML by hand: rejected because Vite should remain the source of truth for built asset paths.

## Decision 4: Keep the publish output contract fixed to `dist/demo`

- **Decision**: Treat `dist/demo` as the only deployable output directory for GitHub Pages.
- **Rationale**: The repository already writes the showcase build there, and a single known publish directory simplifies CI, documentation, and failure diagnosis.
- **Alternatives considered**:
  - Publish the entire `dist/` directory: rejected because it is broader than the actual site surface and could include unrelated generated artifacts over time.
  - Introduce a new output directory just for Pages: rejected because it would duplicate an existing build contract.

## Decision 5: Expose base-path selection through configuration, not component code

- **Decision**: Keep Pages-awareness in build and workflow configuration rather than spreading repository-path logic through React components.
- **Rationale**: The showcase UI should remain ignorant of where it is hosted. The build system is the correct layer to rewrite asset URLs and deployment-specific metadata.
- **Alternatives considered**:
  - Inject repository path handling into `demo/App.tsx` or `demo/DesignSystem.tsx`: rejected because component behavior is unrelated to static hosting path mechanics.
  - Require maintainers to edit the config for every deploy: rejected because repository metadata can be derived or centralized once.

## Decision 6: Validate with local build output plus hosted deployment status

- **Decision**: Use `npm run demo:build` and output inspection locally, then rely on GitHub Actions and Pages deployment status for hosted validation.
- **Rationale**: The main risks are incorrect asset paths, wrong publish directory, and broken automation. These are best caught through deterministic build output and CI deployment results.
- **Alternatives considered**:
  - Add browser automation before any deployment exists: rejected as unnecessary for the initial infrastructure change.
  - Skip local verification and trust CI only: rejected because the existing output already reveals a base-path problem that is easy to catch locally.
