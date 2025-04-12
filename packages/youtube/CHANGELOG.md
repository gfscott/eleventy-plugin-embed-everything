# eleventy-plugin-youtube-embed

## 1.13.0

### Minor Changes

- [YouTube] Add option to display a video title in Lite mode ([#319](https://github.com/gfscott/eleventy-plugin-embed-everything/pull/319))

- [YouTube] Make inline CSS configurable ([#329](https://github.com/gfscott/eleventy-plugin-embed-everything/pull/329))

### Patch Changes

- [YouTube] Drop “modestbranding” config since YouTube no longer supports it ([#330](https://github.com/gfscott/eleventy-plugin-embed-everything/pull/330))

- [YouTube] Update default value of Youtube `allow` attribute ([#328](https://github.com/gfscott/eleventy-plugin-embed-everything/pull/328))

- Dependency bumps ([#322](https://github.com/gfscott/eleventy-plugin-embed-everything/pull/322))

## 1.12.0

### Minor Changes

- Add support for embedding playlists ([#296](https://github.com/gfscott/eleventy-plugin-embed-everything/pull/296))

## 1.11.0

### Minor Changes

- Add lite-mode options for thumbnail format and YouTube JS API access ([#248](https://github.com/gfscott/eleventy-plugin-embed-everything/pull/248))

### Patch Changes

- Bump @11ty/eleventy-fetch to v4.0.1 ([#245](https://github.com/gfscott/eleventy-plugin-embed-everything/pull/245))

- Bump lite-youtube-embed dependency ([#283](https://github.com/gfscott/eleventy-plugin-embed-everything/pull/283))

## 1.10.2

### Patch Changes

- Restore option to download and cache video title from YouTube ([#233](https://github.com/gfscott/eleventy-plugin-embed-everything/pull/233))

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
