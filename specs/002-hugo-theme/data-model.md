# Data Model: Hugo Blog Theme Implementation

## Overview

This feature does not add persisted application state. Its design model is the set of Hugo content entities, metadata conventions, and rendered theme views that must cooperate to produce a coherent blog experience.

## Entities

### Site View

- **Purpose**: Represents a top-level rendered page in the Hugo theme.
- **Variants**:
  - `Home`
  - `SectionList`
  - `PostDetail`
  - `TaxonomyList`
  - `TaxonomyTerm`
  - `GenericPage`
- **Fields**:
  - `kind`: Hugo page kind or effective theme view type
  - `title`: reader-facing heading
  - `permalink`: canonical page URL
  - `contentBlock`: main rendered body area
  - `navigationContext`: shared header/footer and local navigation affordances
- **Validation rules**:
  - every supported view must render within the shared base layout
  - all variants must preserve consistent theme navigation and visual language
- **Relationships**:
  - may contain zero or more `Post Listing Item`
  - may render one `Post`
  - may reference one `Taxonomy Term`

### Post

- **Purpose**: Represents an article sourced from `content/posts/*.md`.
- **Fields**:
  - `title`
  - `date`
  - `draft`
  - `content`
  - `summary`
  - `permalink`
  - `tags[]`
  - `categories[]`
  - `toc`
- **Validation rules**:
  - `title`, `date`, and `draft` are treated as near-required content fields
  - `tags`, `categories`, and `toc` may be absent
  - reader-facing output must use `title` and `permalink` rather than raw filename text
  - `draft: true` content must not appear in published-facing listings
- **Relationships**:
  - one `Post` is rendered by one `PostDetail` `Site View`
  - one `Post` may appear in multiple `Post Listing Item` instances
  - one `Post` may belong to many `Taxonomy Term` instances

### Post Listing Item

- **Purpose**: Summarized representation of a post in home, section, and taxonomy listings.
- **Fields**:
  - `title`
  - `date`
  - `summary`
  - `permalink`
  - `taxonomyHints`
- **Validation rules**:
  - summary comes from Hugo's existing summary behavior
  - listing output must remain readable when taxonomy metadata is missing
- **Relationships**:
  - derived from one `Post`
  - rendered inside `Home`, `SectionList`, or `TaxonomyTerm` views

### Taxonomy Term

- **Purpose**: Groups related posts by tag or category.
- **Fields**:
  - `taxonomyType`: `tags` or `categories`
  - `label`
  - `permalink`
  - `postCount`
- **Validation rules**:
  - term pages show only associated posts
  - absence of taxonomy on some posts must not create broken navigation
- **Relationships**:
  - one `Taxonomy Term` is associated with many `Post` records
  - one `Taxonomy Term` may be rendered in `TaxonomyList` and `TaxonomyTerm` views

### Table of Contents Preference

- **Purpose**: Controls whether a visible TOC region is rendered for a post.
- **Fields**:
  - `enabled`
- **Validation rules**:
  - TOC UI appears only when the metadata explicitly enables it
  - no placeholder TOC container appears for posts without `toc: true`
- **Relationships**:
  - belongs to at most one `Post`
  - influences one `PostDetail` `Site View`

### Embedded Content Asset

- **Purpose**: Represents rendered content dependencies already referenced by posts, such as shortcodes and `/images/...` paths.
- **Fields**:
  - `kind`: shortcode output or referenced image
  - `sourcePathOrId`
  - `renderContext`
- **Validation rules**:
  - normal HTML rendering must remain compatible with existing shortcode output
  - referenced `/images/...` assets must remain readable in post content
- **Relationships**:
  - appears inside one or more `Post` bodies
  - rendered within `PostDetail` views

## Relationships Summary

- A `Site View` provides the page frame for posts, listings, taxonomies, and general pages.
- A `Post` can appear once as a detail view and many times as `Post Listing Item` summaries.
- A `Taxonomy Term` groups multiple posts and can surface both as navigation metadata and as a standalone listing page.
- A `Table of Contents Preference` modifies only post-detail rendering.
- An `Embedded Content Asset` is part of post body rendering and must remain compatible with the new theme.

## Lifecycle Notes

- Content originates as Hugo Markdown files and front matter, then is rendered by Hugo templates into static HTML.
- Listing pages derive summaries and metadata at render time rather than storing separate summary objects.
- Token CSS is generated ahead of theme usage and then consumed as a static styling dependency by the theme.
