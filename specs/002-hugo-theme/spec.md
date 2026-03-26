# Feature Specification: Hugo Blog Theme Implementation

**Feature Branch**: `002-hugo-theme`  
**Created**: 2026-03-27  
**Status**: Draft  
**Input**: User description: "hugoのテーマとして実装していきたい。実際のブログのファイル構成はhugo_blog_posts_structure.mdにまとめたのでそれを参考にして欲しい"

## Clarifications

### Session 2026-03-27

- Q: Should the initial theme scope cover only `posts` views or the blog theme as a whole? → A: The initial scope should cover the blog theme as a whole, not only `posts`.
- Q: Should existing shortcode compatibility and AMP compatibility both be required in the initial scope? → A: Existing shortcode compatibility is required for normal rendering, but AMP compatibility is out of scope for the initial implementation.
- Q: How should post listing summaries be handled in the initial theme? → A: Post listings should follow Hugo’s existing summary behavior.
- Q: How should table-of-contents display behave in the initial theme? → A: Table-of-contents display appears only for posts with `toc: true`.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Browse the Blog Entry Points (Priority: P1)

As a blog reader, I want to open the blog and immediately understand the main entry points of the site, including recent posts and primary navigation, so that I can choose where to go without scanning raw file names or inconsistent metadata.

**Why this priority**: A usable site-level entry experience is the minimum value of a Hugo theme. If the theme only works once a reader already knows a post URL, it does not function as a complete blog experience.

**Independent Test**: Can be fully tested by opening the site’s main entry pages and confirming that readers can navigate into the blog through a coherent home or landing experience, readable post listings, and visible site navigation.

**Acceptance Scenarios**:

1. **Given** a reader opens the main site entry point, **When** the page is rendered, **Then** the theme provides a clear path into the latest or primary blog content.
2. **Given** published posts exist in the blog content, **When** a reader opens a post listing or archive view, **Then** visible posts are presented with human-readable titles, publication dates, and summaries following the site’s existing Hugo summary behavior.
3. **Given** draft posts exist in the content set, **When** the blog is viewed in normal published mode, **Then** draft posts are not shown in public-facing site views.

---

### User Story 2 - Read an Individual Post Comfortably (Priority: P2)

As a blog reader, I want each article page to present the post title, metadata, body, and optional navigation elements clearly so that I can read long-form content comfortably.

**Why this priority**: Once readers can enter the site, the next core value is a readable article experience that respects the structure and metadata of the existing content archive.

**Independent Test**: Can be tested by opening a single post and confirming that the title, date, body content, and optional metadata render correctly for both minimal front matter and richer front matter posts.

**Acceptance Scenarios**:

1. **Given** a post has title, date, and Markdown body content, **When** a reader opens the post page, **Then** the page shows the title, publication date, and full rendered article content.
2. **Given** a post includes tags, categories, or a table-of-contents preference, **When** the post page is rendered, **Then** those optional elements are accommodated without degrading the page when they are absent, and table-of-contents display appears only when `toc: true`.
3. **Given** a post body contains embedded content or referenced images already used by the blog, **When** the page is rendered, **Then** the body remains readable and those content elements continue to appear in a theme-compatible way.
4. **Given** a post body contains existing shortcode-based embedded content, **When** the normal post page is rendered, **Then** that embedded content remains compatible in the initial theme scope.

---

### User Story 3 - Explore Content by Taxonomy (Priority: P3)

As a blog reader, I want to browse posts by tags and categories so that I can discover related writing across the archive.

**Why this priority**: Taxonomy browsing is secondary to listing and reading, but it materially improves exploration for an existing post archive with mixed topics.

**Independent Test**: Can be tested by opening tag and category listing pages and confirming that related posts can be discovered through those taxonomy views.

**Acceptance Scenarios**:

1. **Given** posts have tags or categories assigned, **When** a reader opens a taxonomy listing page, **Then** the page shows the taxonomy name and the posts associated with it.
2. **Given** some posts omit tags or categories, **When** taxonomy pages are generated, **Then** the theme handles missing taxonomy data without broken navigation or empty placeholder content.

---

### User Story 4 - Navigate the Rest of the Blog Theme (Priority: P3)

As a blog reader, I want non-post pages and shared layout areas to follow the same theme so that the site feels coherent beyond individual articles and post indexes.

**Why this priority**: The clarified scope covers the blog theme as a whole, so shared layout and non-post views must also be considered even if posts remain the most important content type.

**Independent Test**: Can be tested by opening representative non-post and shared-layout pages and confirming that header, footer, and general page presentation are thematically consistent with the post experience.

**Acceptance Scenarios**:

1. **Given** the blog includes non-post pages or shared site sections, **When** a reader opens them, **Then** the theme presents those pages with consistent navigation and visual language.
2. **Given** a reader moves between post and non-post views, **When** the navigation or shared layout is rendered, **Then** the experience remains coherent and recognizably part of the same theme.

### Edge Cases

- What happens when a post has only minimal front matter with title, date, and draft status?
- How does the theme behave when tags, categories, or toc preferences are omitted from older posts?
- What happens when post file names contain Japanese text or mixed naming styles that should not be shown directly to readers?
- How does the theme handle content that references existing images or embedded shortcode output?
- What happens when taxonomy terms exist for some posts but not others?
- What happens when some site pages outside `posts` have less metadata or different content structure than blog posts?
- What happens when legacy content depends on shortcode rendering but AMP-specific output is not included in the first version?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST provide a coherent theme for the blog as a whole, not only for individual post pages.
- **FR-001a**: The system MUST provide a clear site entry experience with navigation into primary blog content.
- **FR-002**: The system MUST present post titles and publication dates using content metadata rather than raw source file names.
- **FR-002a**: Post listings MUST use Hugo’s existing summary behavior for excerpted text in the initial implementation.
- **FR-003**: The system MUST omit draft posts from normal published-facing listings and navigation.
- **FR-004**: The system MUST support posts that contain only minimal required metadata as well as posts with richer optional metadata.
- **FR-005**: The system MUST provide an individual post page that displays the post title, publication date, and full rendered body content.
- **FR-006**: The system MUST accommodate optional post metadata including tags, categories, and a table-of-contents preference without failing when those values are absent.
- **FR-006a**: Table-of-contents display MUST appear only for posts where the content metadata explicitly enables it.
- **FR-007**: The system MUST preserve compatibility with the blog’s existing rendered content patterns, including embedded content and referenced images already used by posts.
- **FR-007a**: The initial implementation MUST preserve compatibility with existing shortcode-based content in normal rendered pages.
- **FR-007b**: AMP-specific compatibility is out of scope for the initial implementation.
- **FR-008**: The system MUST provide taxonomy browsing for tags and categories.
- **FR-009**: The system MUST keep navigation and presentation understandable for readers even when post metadata varies across older and newer content.
- **FR-010**: The system MUST apply the design system’s visual language consistently across listing, article, and taxonomy views.
- **FR-011**: The system MUST apply consistent navigation and shared layout treatment across post and non-post blog views.

### Key Entities *(include if feature involves data)*

- **Post**: A blog article with title, publication date, draft status, Markdown body, and optional metadata such as tags, categories, and table-of-contents preference.
- **Table-of-Contents Preference**: An optional post-level setting that enables a visible table-of-contents area only when explicitly present and enabled.
- **Post Listing Item**: The summarized representation of a post shown in home, archive, or taxonomy listings.
- **Post Summary**: The excerpted listing text derived from Hugo’s existing summary behavior for a post.
- **Taxonomy Term**: A tag or category label used to group related posts.
- **Theme View**: A reader-facing page type such as a post listing, individual post page, or taxonomy listing page.
- **Shared Site View**: A non-post or cross-site page that still participates in the same Hugo theme experience.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Readers can identify where to begin navigating the site within 30 seconds of opening the main blog entry point.
- **SC-001a**: Readers can distinguish posts in listing views using title, date, and summary information without relying on raw file names.
- **SC-002**: 100% of sampled published posts render with readable title, date, and body content on the individual post page.
- **SC-003**: Draft posts do not appear in published-facing post listings during normal site generation.
- **SC-004**: Readers can reach related posts through tag or category navigation in no more than 2 page transitions.
- **SC-005**: Representative non-post views use the same recognizable navigation and visual language as post-related views.

## Assumptions

- The existing Hugo blog continues to store posts as individual Markdown files under `content/posts`.
- Post-related views remain the highest-priority part of the first version, but the initial scope still includes the broader blog theme and shared site-level presentation.
- Existing content metadata varies across older and newer posts, so the theme must tolerate missing optional fields.
- The theme treats `toc` as an opt-in display preference and does not infer table-of-contents display for posts where that preference is absent.
- Human-readable post presentation should rely on content title and permalink behavior rather than direct display of source file names.
- Post listing excerpts will follow Hugo’s existing summary behavior rather than a newly defined theme-specific summary rule.
- Existing post content may include embedded content and images already referenced by the blog archive.
- Existing shortcode-driven embedded content remains in use for normal page rendering, while AMP-specific handling can be deferred beyond the initial release.
