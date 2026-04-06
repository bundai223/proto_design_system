# Data Model: Publish Design System on GitHub Pages

## Showcase Site

- **Description**: The public static website that exposes the design system showcase to visitors.
- **Fields**:
  - `source_root`: repository directory used as the Vite app root, expected to be `demo/`
  - `entry_html`: generated entry document, expected to be `dist/demo/index.html`
  - `hosting_url`: GitHub Pages URL for the repository project site
  - `status`: one of `local-only`, `published`, `deployment-failed`
- **Relationships**:
  - Produced by one `Publish Build`
  - Deployed by one `Deployment Workflow`

## Publish Build

- **Description**: The deterministic static output generated from repository source for deployment.
- **Fields**:
  - `command`: local and CI build command, expected to be `npm run demo:build`
  - `output_dir`: expected publish directory, `dist/demo`
  - `base_path`: URL prefix used for generated asset references
  - `artifact_shape`: expected contents such as `index.html` and `assets/*`
  - `build_status`: one of `pending`, `succeeded`, `failed`
- **Relationships**:
  - Feeds one `Deployment Artifact`
  - Materializes one `Showcase Site`

## Pages Base Path

- **Description**: The repository-scoped URL prefix used by the hosted static site.
- **Fields**:
  - `repo_name`: repository slug, currently `proto_design_system`
  - `base_path`: repository Pages prefix, currently `/proto_design_system/`
  - `mode`: one of `project-site`, `user-site`
  - `config_source`: where the build resolves the path, such as Vite config or workflow environment
- **Validation Rules**:
  - Must end with `/`
  - Must match the published repository path for project Pages
  - Must be `/` only when deploying as a user or org root site
- **Relationships**:
  - Applied by one `Publish Build`
  - Referenced by one `Deployment Workflow`

## Deployment Workflow

- **Description**: The GitHub-native automation that builds and publishes the showcase.
- **Fields**:
  - `trigger_branch`: branch that starts deployment, expected to be the default branch after merge
  - `node_version`: Node runtime used in CI
  - `permissions`: Pages-related workflow permissions required by GitHub
  - `artifact_source`: directory uploaded for deployment, expected to be `dist/demo`
  - `deploy_status`: one of `idle`, `running`, `succeeded`, `failed`
- **Relationships**:
  - Consumes one `Publish Build`
  - Publishes one `Deployment Artifact`
  - Produces one `Showcase Site`

## Deployment Artifact

- **Description**: The packaged static output transferred from the build job to the Pages deployment job.
- **Fields**:
  - `source_dir`: local CI directory uploaded to Pages
  - `contents`: generated static files for the showcase
  - `created_at`: workflow execution timestamp
  - `artifact_status`: one of `created`, `uploaded`, `deployed`, `rejected`
- **Relationships**:
  - Derived from one `Publish Build`
  - Delivered by one `Deployment Workflow`
