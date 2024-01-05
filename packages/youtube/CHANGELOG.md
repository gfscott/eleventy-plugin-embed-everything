# eleventy-plugin-youtube-embed

## 1.10.1

### Patch Changes

- Bugfix for an issue that caused embeds to be duplicated. ([#231](https://github.com/gfscott/eleventy-plugin-embed-everything/pull/231))

## 1.10.0

### Minor Changes

- Add option to download and cache video title from YouTube ([#224](https://github.com/gfscott/eleventy-plugin-embed-everything/pull/224))

- [YouTube] Update Lite YouTube and add responsive option for lite embeds ([#203](https://github.com/gfscott/eleventy-plugin-embed-everything/pull/203))

### Patch Changes

- [YouTube] Code refactor, with no change to public APIs ([#222](https://github.com/gfscott/eleventy-plugin-embed-everything/pull/222))

## 1.9.1

### Patch Changes

- Dependency bumps ([#187](https://github.com/gfscott/eleventy-plugin-embed-everything/pull/187))

- Remove misbehaving e2e test ([#191](https://github.com/gfscott/eleventy-plugin-embed-everything/pull/191))

## 1.9.0

### Minor Changes

- Add option to use different image thumbnail sizes in lite mode ([#175](https://github.com/gfscott/eleventy-plugin-embed-everything/pull/175))

- Allow control over YouTube video start time via URL parameter ([#167](https://github.com/gfscott/eleventy-plugin-embed-everything/pull/167))

### Patch Changes

- Embed builder now accepts an object with video data, instead of just a video ID string. The object includes an `id` value that can be destructured. ([#164](https://github.com/gfscott/eleventy-plugin-embed-everything/pull/164))

- Update copyright year ([#170](https://github.com/gfscott/eleventy-plugin-embed-everything/pull/170))

- Update internal workings of YouTube regex to enable future functionality ([#160](https://github.com/gfscott/eleventy-plugin-embed-everything/pull/160))

- Make implicit defaults explicit ([#169](https://github.com/gfscott/eleventy-plugin-embed-everything/pull/169))

- More error-resistant handling of URL edge cases ([#180](https://github.com/gfscott/eleventy-plugin-embed-everything/pull/180))

- Decode HTML-encoded ampersands before parsing URL params ([#168](https://github.com/gfscott/eleventy-plugin-embed-everything/pull/168))

## 1.8.1

### Patch Changes

- Minor updates to package READMEs. Mostly URL changes related to migrating to the new monorepo. ([#153](https://github.com/gfscott/eleventy-plugin-embed-everything/pull/153))

- Bump deepmerge from v4.2.2 to v4.3.0 ([#155](https://github.com/gfscott/eleventy-plugin-embed-everything/pull/155))
