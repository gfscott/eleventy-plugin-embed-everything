# eleventy-plugin-embed-everything

## 1.15.1

### Patch Changes

- Minor updates to package READMEs. Mostly URL changes related to migrating to the new monorepo. ([#153](https://github.com/gfscott/eleventy-plugin-embed-everything/pull/153))

- Bump deepmerge from v4.2.2 to v4.3.0 ([#155](https://github.com/gfscott/eleventy-plugin-embed-everything/pull/155))

- Updated dependencies [[`fc044b3`](https://github.com/gfscott/eleventy-plugin-embed-everything/commit/fc044b3e5bb23036d7a7a169dc3152af07f75c6f), [`ffbe0fb`](https://github.com/gfscott/eleventy-plugin-embed-everything/commit/ffbe0fbed725ed227a64ba2d9962441af629f3e9), [`0adc8d7`](https://github.com/gfscott/eleventy-plugin-embed-everything/commit/0adc8d730e5ae29e9a82285d02c80c5639507951)]:
  - eleventy-plugin-embed-instagram@1.2.6
  - eleventy-plugin-embed-soundcloud@1.2.6
  - eleventy-plugin-embed-spotify@1.2.6
  - eleventy-plugin-embed-tiktok@1.1.6
  - eleventy-plugin-embed-twitch@1.2.6
  - eleventy-plugin-embed-twitter@1.3.6
  - eleventy-plugin-vimeo-embed@1.3.6
  - eleventy-plugin-youtube-embed@1.8.1

## 1.15.0

### Minor Changes

- 808f95d: Two changes of note in this release:

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
