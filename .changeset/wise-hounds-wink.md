---
"eleventy-plugin-embed-everything": minor
---

Two changes of note in this release:

- Removing CI tests for unsupported Node.js versions
- Migrating to a monorepo structure

## Removing CI tests for Node.js < 14
Our testing framework, Ava, no longer supports Node.js versions less than v14, which had prevented us from updating an important dev dependency for some time now. Security support for Node.js 12 ended nearly a year ago, so we’re removing unsupported Node versions from our CI tests. For more about this decision, see [this announcement](https://github.com/gfscott/eleventy-plugin-embed-everything/discussions/103).

**This doesn’t mean the plugins won’t continue to work on older Node versions**. Nothing about the plugins’ public APIs has changed in a way that would make them stop working. But it’s no longer practical to test them on those older Node versions thoroughly.

Because this change is only to dev dependencies and doesn’t affect the plugins’ public APIs, it’s not considered a breaking change. But we're releasing it as a minor update to try and minimize any surprises.

## Migrating to a monorepo

Again, this change has **no effect on any public API or plugin functionality**. It’s purely an operational change to how the plugins get developed and released. Again, it made sense to do this as part of a minor release since it’s a fairly major restructuring of the codebase.

## Other updates

Otherwise this update simply bumps plugin dependencies to their latest version. They’re all patch releases, with the exception of YouTube, which has been upgraded to v1.8.0.

### YouTube@1.8.0

[eleventy-plugin-youtube-embed@1.8.0](https://github.com/gfscott/eleventy-plugin-youtube-embed/releases/tag/v1.8.0) is a minor release that updates the embedded iframe `allow` value. View the [PR](https://github.com/gfscott/eleventy-plugin-youtube-embed/pull/84) for details.