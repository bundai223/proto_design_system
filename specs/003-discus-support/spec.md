# Feature Specification: Hugo Theme Discus Support

**Feature Branch**: `003-discus-support`  
**Created**: 2026-03-30  
**Status**: Draft  
**Input**: User description: "hugoのテーマにdiscusの対応を追加したい"

## Clarifications

### Session 2026-03-30

- Q: How should site owners control whether discussion appears? → A: Site-level default plus per-post override
- Q: What should readers see when discussion is unavailable? → A: Hide the discussion embed and show a short unavailable message
- Q: Which content should support discussion in the initial release? → A: Published posts only
- Q: Where should the discussion area appear on supported posts? → A: After the article body

## User Scenarios & Testing *(mandatory)*

<!--
  IMPORTANT: User stories should be PRIORITIZED as user journeys ordered by importance.
  Each user story/journey must be INDEPENDENTLY TESTABLE - meaning if you implement just ONE of them,
  you should still have a viable MVP (Minimum Viable Product) that delivers value.
  
  Assign priorities (P1, P2, P3, etc.) to each story, where P1 is the most critical.
  Think of each story as a standalone slice of functionality that can be:
  - Developed independently
  - Tested independently
  - Deployed independently
  - Demonstrated to users independently
-->

### User Story 1 - Read and Participate in Post Discussions (Priority: P1)

As a blog reader, I want published article pages to present the associated Discus discussion area in a clear and reliable way so that I can continue the conversation around a post without leaving the reading experience.

**Why this priority**: The main value of adding Discus support is enabling post-level discussion. If readers cannot discover and use the discussion area from the article page, the feature does not deliver its primary outcome.

**Independent Test**: Can be fully tested by opening a published post with discussion enabled and confirming that the discussion area is visible, associated with that post, and understandable to readers as the place for comments.

**Acceptance Scenarios**:

1. **Given** a published post has discussion enabled, **When** a reader opens the post page, **Then** the page shows a recognizable Discus discussion area associated with that post after the article body.
2. **Given** a reader finishes reading a post with discussion enabled, **When** they reach the discussion section, **Then** they can understand that comments and replies belong to the current post rather than the site in general.
3. **Given** a reader opens multiple published posts with discussion enabled, **When** each page is viewed, **Then** each post shows its own distinct discussion context rather than reusing another post’s conversation.

---

### User Story 2 - Site Owner Controls Where Discussions Appear (Priority: P2)

As a site owner, I want the theme to show Discus only where it is intended so that discussion appears on the right content without cluttering pages that should remain discussion-free.

**Why this priority**: Once the discussion experience exists, the next most important concern is controlling its scope. Owners need predictable placement so the theme stays usable across different content types and publishing workflows.

**Independent Test**: Can be tested by viewing posts and non-post pages under enabled and disabled discussion conditions and confirming that the discussion area appears only on the intended content.

**Acceptance Scenarios**:

1. **Given** discussion is enabled for supported blog posts, **When** a site owner opens a published post page, **Then** the discussion area appears in the post layout.
2. **Given** a page type is outside the supported discussion scope, **When** that page is rendered, **Then** no empty discussion placeholder is shown.
3. **Given** discussion is disabled for a post or for the site, **When** the post page is rendered, **Then** the reading experience remains complete without the discussion area.

---

### User Story 3 - Fail Gracefully When Discussion Is Unavailable (Priority: P3)

As a blog reader, I want article pages to remain readable even when Discus is unavailable or not configured so that the post content still feels complete and trustworthy.

**Why this priority**: Discussion is secondary to the article itself. A missing or unavailable discussion service must not break the core reading experience.

**Independent Test**: Can be tested by opening published posts when discussion is unavailable or not configured, plus unsupported content types, and confirming that the article still renders cleanly without broken layout or confusing placeholders.

**Acceptance Scenarios**:

1. **Given** the discussion service is not configured for the site, **When** a reader opens a post page, **Then** the article content remains readable and no broken discussion container is shown.
2. **Given** the discussion service is temporarily unavailable, **When** a reader opens a supported post page, **Then** the page continues to present the article content without blocking or obscuring the rest of the post and shows a short unavailable message instead of the discussion embed.
3. **Given** older posts or special content types do not support discussion, **When** those pages are rendered, **Then** the theme handles them without visual regression or reader confusion.

### Edge Cases

- What happens when a post is published before discussion support is configured for the site?
- What happens when discussion is enabled for some posts but intentionally disabled for others?
- How does the theme behave when the discussion service is unreachable or slow to load?
- What short unavailable message is shown when the discussion service cannot be displayed?
- What happens when a page uses the post layout but should not display a discussion area?
- How does the theme avoid showing duplicate or misplaced discussion sections when content is previewed, paginated, or rendered in alternate contexts?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST support displaying a Discus discussion experience on individual blog posts.
- **FR-001a**: The initial release MUST limit discussion support to published posts only.
- **FR-002**: The system MUST associate each displayed discussion area with the specific post being viewed so that conversations remain post-specific.
- **FR-003**: The system MUST present the discussion area in a recognizable position after the article body within the post-reading experience.
- **FR-004**: The system MUST allow site owners to keep the discussion area out of pages that are outside the supported discussion scope.
- **FR-005**: The system MUST allow the discussion area to be absent without breaking article readability or layout integrity.
- **FR-006**: The system MUST avoid rendering empty, duplicate, or misleading discussion placeholders when discussion is disabled, unavailable, or unsupported.
- **FR-007**: The system MUST preserve the existing ability to read post title, metadata, body content, and navigation whether or not discussion is shown.
- **FR-008**: The system MUST behave consistently across published posts so readers can predict where discussion will appear.
- **FR-009**: The system MUST support a site-level default for whether discussion is enabled on supported posts.
- **FR-009a**: The system MUST support a per-post override that can explicitly enable or disable discussion for an individual post.
- **FR-010**: The system MUST ensure that unsupported page types remain free of discussion-specific UI unless explicitly included in scope later.
- **FR-011**: The system MUST make discussion support compatible with both newly published posts and existing published posts that fall within the supported scope.
- **FR-012**: The system MUST keep the article experience usable when the external discussion service cannot be loaded successfully.
- **FR-012a**: When the discussion service cannot be loaded successfully, the system MUST hide the discussion embed and show a short unavailable message instead.

### Key Entities *(include if feature involves data)*

- **Site Discussion Default**: A site-wide setting that determines whether discussion is enabled by default for supported posts.
- **Post Discussion Setting**: A post-level override that can inherit the site default or explicitly enable or disable discussion for a given article.
- **Discussion Thread**: The reader-visible conversation associated with one published post.
- **Supported Discussion Page**: A published post page whose content type and publication state allow the discussion area to appear in the initial release.
- **Unsupported Discussion Page**: A page that should remain discussion-free, such as non-post content or any post explicitly excluded from discussion.
- **Discussion Placement Area**: The section after the article body where readers expect to find the conversation for the current post.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In validation of representative published posts within the supported scope, 100% display either the intended discussion area or a clean discussion-free article view with no broken placeholder.
- **SC-002**: Readers can locate the discussion area for a supported post in under 10 seconds after reaching the end of the article.
- **SC-003**: 100% of sampled supported posts show a discussion context that matches the current post rather than another article’s conversation.
- **SC-004**: Unsupported or discussion-disabled pages show no discussion UI in 100% of validation samples.
- **SC-005**: When the discussion service is unavailable, the article content remains readable and primary post navigation remains usable in 100% of validation samples.

## Assumptions

- The requested `discus` support refers to adding a reader-facing post discussion service to the Hugo theme.
- The initial scope is limited to individual blog post pages and does not automatically extend discussion support to list pages, taxonomy pages, or standalone site pages.
- In the initial release, only published posts are eligible to display discussion.
- Discussion visibility is controlled by a site-wide default plus a per-post override.
- The discussion area appears after the article body on supported posts.
- Existing published posts should be eligible for discussion support without requiring changes to their visible article content.
- If the external discussion service is unavailable, preserving a stable reading experience is more important than surfacing a detailed technical error to readers.
