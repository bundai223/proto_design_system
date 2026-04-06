# Feature Specification: Publish Design System on GitHub Pages

**Feature Branch**: `004-github-pages-publish`  
**Created**: 2026-04-07  
**Status**: Draft  
**Input**: User description: "design_systemをgithub pagesで公開できるようにする"

## Clarifications

### Session 2026-04-07

- Q: How should the GitHub Pages base path be managed? → A: Build-time configurable base path with `/proto_design_system/` as the default
- Q: How should the deployment workflow be triggered? → A: Automatic deploys on pushes to the default branch, plus manual dispatch support

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Browse the Published Showcase (Priority: P1)

As a visitor, I want to open the repository's GitHub Pages URL and see the design system showcase load correctly so that I can inspect the components and themes without running the project locally.

**Why this priority**: Public access to the showcase is the main value of the feature. If the published site does not load reliably from the GitHub Pages URL, the feature does not succeed.

**Independent Test**: Can be fully tested by deploying the static site to the repository's GitHub Pages URL and confirming that the main showcase renders without broken asset paths or blank screens.

**Acceptance Scenarios**:

1. **Given** the default branch contains a deployable version of the design system showcase, **When** GitHub Pages publishes the site, **Then** a visitor can open the repository Pages URL and see the showcase load successfully.
2. **Given** the repository is published under a project Pages path, **When** a visitor loads or reloads the site, **Then** the built CSS and JavaScript assets resolve from the repository-specific base path instead of the domain root.

---

### User Story 2 - Deploy Changes Automatically from the Repository (Priority: P2)

As the repository maintainer, I want GitHub to build and publish the showcase from the repository so that updates to the default branch can be released to GitHub Pages without a separate manual deployment workflow.

**Why this priority**: After the published surface exists, maintainability depends on repeatable deployment. A manual copy step would make the showcase drift from the repository too easily.

**Independent Test**: Can be tested by pushing a change to the configured publishing branch, observing the GitHub Actions workflow complete successfully, and confirming that the published site reflects the update.

**Acceptance Scenarios**:

1. **Given** a maintainer pushes a change that affects the showcase, **When** the configured deployment workflow runs, **Then** GitHub builds the site and publishes the updated static output to GitHub Pages.
2. **Given** the build or publish step fails, **When** the maintainer checks the repository automation status, **Then** the failure is visible through the normal GitHub Actions reporting surface.

---

### User Story 3 - Keep Local and Hosted Behavior Aligned (Priority: P3)

As the repository maintainer, I want the Pages deployment to use the same buildable showcase surface as local validation so that the hosted result stays predictable and easy to debug.

**Why this priority**: A Pages deployment is only useful if local verification can reproduce it. Divergence between local and hosted builds would increase maintenance cost and hide regressions until after publish.

**Independent Test**: Can be tested by building the same static output locally, comparing the expected output directory and entry point with the deployment workflow, and confirming that the hosted site matches the local build.

**Acceptance Scenarios**:

1. **Given** a maintainer runs the documented local build command, **When** the build completes, **Then** it produces the same publishable static directory shape that the GitHub Pages workflow deploys.
2. **Given** the repository name or publish path changes, **When** the maintainer updates the deployment configuration, **Then** the site continues to resolve assets correctly without requiring code changes throughout the showcase.

### Edge Cases

- What happens when the site is deployed to a project Pages URL such as `/proto_design_system/` instead of the domain root?
- What happens when a visitor opens a stale Pages deployment while a new workflow is still running?
- How does the workflow behave when the showcase build succeeds locally but GitHub Pages is not enabled for the repository yet?
- What happens if future repository settings change the publishing source from a branch-based Pages setup to the Actions-based Pages flow?
- How does the deployment avoid accidentally publishing unrelated build artifacts that are not part of the showcase?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST publish a browser-accessible static showcase for the design system to the repository's GitHub Pages URL.
- **FR-002**: The published showcase MUST be generated from repository source rather than maintained as a separate manually edited Pages branch.
- **FR-003**: The published showcase MUST load correctly when hosted under the repository-specific GitHub Pages base path.
- **FR-004**: The system MUST provide a repository-native deployment workflow that builds and publishes the showcase through GitHub.
- **FR-005**: The deployment workflow MUST surface build or publish failures through standard repository automation status.
- **FR-006**: The publishable output MUST come from an existing supported showcase surface in the repository rather than a separate ad hoc demo implementation.
- **FR-007**: The local documentation MUST describe how to build the same static output that GitHub Pages deploys.
- **FR-008**: The deployment configuration MUST make it clear which output directory is published to GitHub Pages.
- **FR-009**: The deployment flow MUST avoid requiring maintainers to hand-edit generated files as part of a normal publish.
- **FR-010**: The system MUST keep the published site usable even when the repository is hosted at `https://<owner>.github.io/<repo>/` rather than at the domain root.
- **FR-011**: The system MUST resolve the GitHub Pages base path at build time, default to `/proto_design_system/`, and allow maintainers to override that path without changing showcase component code.
- **FR-012**: The deployment workflow MUST run automatically for changes pushed to the default branch and also support manual re-runs through GitHub Actions.

### Key Entities *(include if feature involves data)*

- **Showcase Site**: The static visitor-facing design system experience generated from the repository and published to GitHub Pages.
- **Publish Build**: The deterministic static output directory produced from repository source and deployed to GitHub Pages.
- **Pages Base Path**: The repository-specific URL prefix under which the showcase is hosted on GitHub Pages.
  - Defaults to `/proto_design_system/` and can be overridden through build configuration.
- **Deployment Workflow**: The GitHub-native automation that installs dependencies, builds the showcase, and publishes the static output.
  - Runs on pushes to the default branch and supports manual dispatch.
- **Deployment Artifact**: The packaged static output handed from the build workflow to the GitHub Pages publish step.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A visitor can load the GitHub Pages URL for the repository and reach a rendered showcase page without broken JavaScript or stylesheet asset paths.
- **SC-002**: In validation runs, 100% of repository-path asset URLs used by the published showcase resolve under the configured GitHub Pages base path.
- **SC-003**: A maintainer can publish a showcase update by pushing to the configured branch and observing a successful GitHub Actions deployment without manually updating a Pages branch.
- **SC-004**: Local build instructions produce the same publish directory and entry HTML file shape that the deployment workflow uses.
- **SC-005**: Maintainers can change the configured publish path and rebuild successfully without editing files under `demo/`.
- **SC-006**: Maintainers can trigger a deployment either by merging to the default branch or by manually starting the workflow from GitHub Actions.

## Assumptions

- The intended published surface is the existing Vite-powered showcase under `demo/`, because it is already the repository's interactive browser-facing design system surface.
- The repository will use project GitHub Pages at a URL shaped like `https://bundai223.github.io/proto_design_system/`, based on the current remote repository name `proto_design_system`.
- The initial implementation should treat `/proto_design_system/` as the default project Pages base path while allowing build-time override for future hosting changes.
- GitHub Pages deployment will use GitHub Actions rather than a legacy manually managed `gh-pages` branch, unless repository constraints explicitly require otherwise.
- The default branch remains the source of truth for the showcase source code and deployment workflow configuration.
- The deployment workflow should automatically publish from the default branch and allow manual dispatch for recovery or republish scenarios.
- The initial release does not require a custom domain.
