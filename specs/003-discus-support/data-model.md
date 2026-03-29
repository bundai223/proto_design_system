# Data Model: Hugo Theme Discus Support

## Overview

This feature does not introduce new persisted application storage. The relevant model is the set of Hugo content inputs, discussion-visibility settings, and render states that determine whether a published post page shows a discussion area.

## Entities

### Post

- **Purpose**: Represents a published or draft blog article rendered by the Hugo theme.
- **Fields**:
  - `title`
  - `date`
  - `draft`
  - `content`
  - `permalink`
  - `discussionSetting`
- **Validation rules**:
  - only published posts are eligible for discussion in the initial release
  - article title, metadata, body, and navigation must remain readable whether discussion is shown or not
  - draft posts are outside the supported discussion surface
- **Relationships**:
  - may resolve to one `Discussion Render State`
  - may inherit a `Site Discussion Default`

### Site Discussion Default

- **Purpose**: Represents the site-wide default that determines whether supported published posts should show discussion.
- **Fields**:
  - `enabledByDefault`
  - `placementPolicy`
- **Validation rules**:
  - applies consistently across supported post pages unless explicitly overridden
  - must not force discussion UI onto unsupported page types
- **Relationships**:
  - influences many `Post` records
  - contributes to one `Discussion Render State` per rendered post

### Post Discussion Setting

- **Purpose**: Represents an optional post-level override for whether a specific article should show discussion.
- **Fields**:
  - `mode`: inherit, enabled, or disabled
- **Validation rules**:
  - when absent, the site-wide default applies
  - when explicitly disabled, no discussion UI should be shown for that post
  - when explicitly enabled, the post may show discussion even if the site default is disabled
- **Relationships**:
  - belongs to one `Post`
  - overrides the `Site Discussion Default` for that post when present

### Discussion Render State

- **Purpose**: Represents the effective outcome of discussion resolution for the current rendered page.
- **Variants**:
  - `Rendered`
  - `Disabled`
  - `Unavailable`
  - `Unsupported`
- **Fields**:
  - `state`
  - `placementArea`
  - `reason`
  - `fallbackMessage`
- **Validation rules**:
  - only the `Rendered` variant may show the discussion embed
  - `Disabled` and `Unsupported` must preserve a clean article layout without discussion-specific UI
  - `Unavailable` must hide the embed and show a short unavailable message after the article body
- **Relationships**:
  - derived from one `Post`, one `Site Discussion Default`, and optional runtime availability conditions

### Discussion Placement Area

- **Purpose**: Represents the location in the post layout where the conversation or fallback message is shown when discussion applies.
- **Fields**:
  - `regionName`
  - `relativeOrder`
- **Validation rules**:
  - must appear after the article body on supported post pages
  - must not interrupt the main article title, metadata, taxonomy links, or optional TOC regions
- **Relationships**:
  - used by the `Rendered` and `Unavailable` forms of `Discussion Render State`

## Relationships Summary

- A `Post` inherits from the `Site Discussion Default` and may override it with a `Post Discussion Setting`.
- The theme resolves those inputs into a `Discussion Render State` for the current page.
- When the state is `Rendered`, the discussion embed appears after the article body.
- When the state is `Unavailable`, a short unavailable message appears after the article body instead of the embed.
- When the state is `Disabled` or `Unsupported`, the post remains a normal readable article page with no discussion UI.

## Lifecycle Notes

- The site owner configures a default discussion policy at the theme/site level.
- Individual posts may inherit that policy or override it.
- At render time, the theme resolves the effective discussion state for the current page.
- The final output is either a post with a discussion section after the article body, a post with a short unavailable message in that location, or a clean article page with no discussion UI.
