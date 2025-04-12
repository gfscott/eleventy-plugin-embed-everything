# eleventy-plugin-embed-everything

## 1.21.0

### Minor Changes

- [YouTube] Make inline CSS configurable ([#329](https://github.com/gfscott/eleventy-plugin-embed-everything/pull/329))

- [Bluesky] Add support for Bluesky embeds (🏅 Special thanks to @shellen!) ([#326](https://github.com/gfscott/eleventy-plugin-embed-everything/pull/326))

### Patch Changes

- [YouTube] Add option to display a video title in Lite mode ([#319](https://github.com/gfscott/eleventy-plugin-embed-everything/pull/319))

- [Mastodon] Correctly handle trailing `</a>` in urls ([#321](https://github.com/gfscott/eleventy-plugin-embed-everything/pull/321))

- [YouTube] Drop “modestbranding” config since YouTube no longer supports it ([#330](https://github.com/gfscott/eleventy-plugin-embed-everything/pull/330))

- [YouTube] Update default value of Youtube `allow` attribute ([#328](https://github.com/gfscott/eleventy-plugin-embed-everything/pull/328))

- [OpenStreetMap] Add `includeMarker` option in OpenStreetMap ([#318](https://github.com/gfscott/eleventy-plugin-embed-everything/pull/318))

- Dependency bumps ([#322](https://github.com/gfscott/eleventy-plugin-embed-everything/pull/322))

- Updated dependencies [[`fa2ce90`](https://github.com/gfscott/eleventy-plugin-embed-everything/commit/fa2ce90f703dbe7e906c34ed06a38af8c479db95), [`38ed8e2`](https://github.com/gfscott/eleventy-plugin-embed-everything/commit/38ed8e223b9ae6a26eb9b7abc98b144a1e460429), [`d39ac5e`](https://github.com/gfscott/eleventy-plugin-embed-everything/commit/d39ac5e6717ed9a4f70f3394f08657b3f203635c), [`e8200a1`](https://github.com/gfscott/eleventy-plugin-embed-everything/commit/e8200a141c5845775011c016a3d51ae0818dd97b), [`4127e23`](https://github.com/gfscott/eleventy-plugin-embed-everything/commit/4127e23ffc95cf3fcb643406a04d48a5f27e2621), [`e59aac3`](https://github.com/gfscott/eleventy-plugin-embed-everything/commit/e59aac3706d33da51f4c1ae1ae371a8d493711ab), [`ca5f8a5`](https://github.com/gfscott/eleventy-plugin-embed-everything/commit/ca5f8a50765fcb1a527731fc045e1b5a8e71cce2), [`ab190f3`](https://github.com/gfscott/eleventy-plugin-embed-everything/commit/ab190f36ef92b75f5747d29e74c7a72c265f0152), [`468e04d`](https://github.com/gfscott/eleventy-plugin-embed-everything/commit/468e04d831081f5f30a050241fed41a74884978e)]:
  - eleventy-plugin-youtube-embed@1.13.0
  - eleventy-plugin-embed-tiktok@1.1.8
  - eleventy-plugin-embed-mastodon@1.0.1
  - eleventy-plugin-embed-bluesky@1.0.0
  - eleventy-plugin-embed-openstreetmap@1.1.0
  - eleventy-plugin-embed-soundcloud@1.2.9
  - eleventy-plugin-embed-twitter@1.4.2

## 1.20.0

### Minor Changes

- Add support for embedding Instagram Reels and TV embeds. (🏅 Special thanks to [@shellen](https://github.com/shellen)!) ([#303](https://github.com/gfscott/eleventy-plugin-embed-everything/pull/303))

- Add support for embedding playlists ([#296](https://github.com/gfscott/eleventy-plugin-embed-everything/pull/296))

- Add support for embedding Mastodon posts ([#307](https://github.com/gfscott/eleventy-plugin-embed-everything/pull/307))

### Patch Changes

- Deduplicate list of active plugins when using the 'add' option ([#298](https://github.com/gfscott/eleventy-plugin-embed-everything/pull/298))

- Updated dependencies [[`a38735a`](https://github.com/gfscott/eleventy-plugin-embed-everything/commit/a38735abd4096b1887653cd186e1fbffcb6adc62), [`139618f`](https://github.com/gfscott/eleventy-plugin-embed-everything/commit/139618f5f52fa8583d56535351652d4b3644bb39), [`43880b6`](https://github.com/gfscott/eleventy-plugin-embed-everything/commit/43880b67aaad724b1437b66d0c5f04a440d99289)]:
  - eleventy-plugin-embed-instagram@1.3.0
  - eleventy-plugin-youtube-embed@1.12.0
  - eleventy-plugin-embed-mastodon@1.0.0

## 1.19.0

### Minor Changes

- Add OpenStreetMap support ([#250](https://github.com/gfscott/eleventy-plugin-embed-everything/pull/250))

### Patch Changes

- Updated dependencies [[`629863458e440dc8672cb2892ad9085469a749ee`](https://github.com/gfscott/eleventy-plugin-embed-everything/commit/629863458e440dc8672cb2892ad9085469a749ee), [`8f69a481bd74df7cc382ef146a1e957bd09e32d5`](https://github.com/gfscott/eleventy-plugin-embed-everything/commit/8f69a481bd74df7cc382ef146a1e957bd09e32d5), [`b79b105990e4c286883b1c5e6e552a6b33785124`](https://github.com/gfscott/eleventy-plugin-embed-everything/commit/b79b105990e4c286883b1c5e6e552a6b33785124), [`c0389e47befc11ffc87a4fc09f7ec1a59bdbd552`](https://github.com/gfscott/eleventy-plugin-embed-everything/commit/c0389e47befc11ffc87a4fc09f7ec1a59bdbd552)]:
  - eleventy-plugin-embed-soundcloud@1.2.8
  - eleventy-plugin-embed-twitter@1.4.1
  - eleventy-plugin-youtube-embed@1.11.0
  - eleventy-plugin-embed-openstreetmap@1.0.0

## 1.18.2

### Patch Changes

- Restore option to download and cache video title from YouTube ([#233](https://github.com/gfscott/eleventy-plugin-embed-everything/pull/233))

- Updated dependencies [[`cb5cc3aeaf03f29392a34714b5365798d8c31174`](https://github.com/gfscott/eleventy-plugin-embed-everything/commit/cb5cc3aeaf03f29392a34714b5365798d8c31174)]:
  - eleventy-plugin-youtube-embed@1.10.2

## 1.18.1

### Patch Changes

- Bugfix for an issue that caused embeds to be duplicated. ([#231](https://github.com/gfscott/eleventy-plugin-embed-everything/pull/231))

- Updated dependencies [[`5fb9ec007c74505d48f57f7ef732b71c658dec5d`](https://github.com/gfscott/eleventy-plugin-embed-everything/commit/5fb9ec007c74505d48f57f7ef732b71c658dec5d)]:
  - eleventy-plugin-youtube-embed@1.10.1

## 1.18.0

### Minor Changes

- Add option to download and cache video title from YouTube ([#224](https://github.com/gfscott/eleventy-plugin-embed-everything/pull/224))

- [YouTube] Update Lite YouTube and add responsive option for lite embeds ([#203](https://github.com/gfscott/eleventy-plugin-embed-everything/pull/203))

### Patch Changes

- [YouTube] Code refactor, with no change to public APIs ([#222](https://github.com/gfscott/eleventy-plugin-embed-everything/pull/222))

- Updated dependencies [[`6d158a76f8fa4d5b1c379627a1099e9001db9916`](https://github.com/gfscott/eleventy-plugin-embed-everything/commit/6d158a76f8fa4d5b1c379627a1099e9001db9916), [`888ef947f94354cbee118b2a3ad3350272e04867`](https://github.com/gfscott/eleventy-plugin-embed-everything/commit/888ef947f94354cbee118b2a3ad3350272e04867), [`128b0ceab85918325d11dcef6a9e5002af3a48bf`](https://github.com/gfscott/eleventy-plugin-embed-everything/commit/128b0ceab85918325d11dcef6a9e5002af3a48bf)]:
  - eleventy-plugin-youtube-embed@1.10.0

## 1.17.0

### Minor Changes

- Support X.com URLs ([#195](https://github.com/gfscott/eleventy-plugin-embed-everything/pull/195))

- Bring Spotify embed defaults up to date ([#185](https://github.com/gfscott/eleventy-plugin-embed-everything/pull/185))

- Add support for embedding Podcast profiles. These embeds always display the latest episode of the Podcast. ([#183](https://github.com/gfscott/eleventy-plugin-embed-everything/pull/183))

### Patch Changes

- Dependency bumps ([#187](https://github.com/gfscott/eleventy-plugin-embed-everything/pull/187))

- Updated dependencies [[`16d9f86`](https://github.com/gfscott/eleventy-plugin-embed-everything/commit/16d9f86e3dd60e2f8b7f48555e52428e7bfe443d), [`0c6a184`](https://github.com/gfscott/eleventy-plugin-embed-everything/commit/0c6a184a9a51b5fdd2f360d5c94b13560d61ef76), [`0381802`](https://github.com/gfscott/eleventy-plugin-embed-everything/commit/0381802a21ce756301975abf726a4d88dd8875c1), [`5e62025`](https://github.com/gfscott/eleventy-plugin-embed-everything/commit/5e62025ac48e5c06a7a7accb64b68543fb4f3f48), [`5c9b849`](https://github.com/gfscott/eleventy-plugin-embed-everything/commit/5c9b849397ef8296cba3341d6bd9b9c665efee16), [`e4ea0bb`](https://github.com/gfscott/eleventy-plugin-embed-everything/commit/e4ea0bbac806a4b27b8c723f9335bf4bc3b6be1f), [`da38457`](https://github.com/gfscott/eleventy-plugin-embed-everything/commit/da38457d087b64014daba12b9de864155b361a73), [`1b65638`](https://github.com/gfscott/eleventy-plugin-embed-everything/commit/1b6563809e559d70bd1d5d0a36185fbb5ed16408)]:
  - eleventy-plugin-vimeo-embed@1.3.8
  - eleventy-plugin-embed-spotify@1.3.0
  - eleventy-plugin-embed-twitter@1.4.0
  - eleventy-plugin-youtube-embed@1.9.1
  - eleventy-plugin-embed-ted@1.0.1

## 1.16.0

### Minor Changes

- Allow control over YouTube video start time via URL parameter ([#167](https://github.com/gfscott/eleventy-plugin-embed-everything/pull/167))

- Adds support for embedding video from TED.com ([#178](https://github.com/gfscott/eleventy-plugin-embed-everything/pull/178))

### Patch Changes

- Update copyright year ([#170](https://github.com/gfscott/eleventy-plugin-embed-everything/pull/170))

- Updated dependencies [[`1d54fb3`](https://github.com/gfscott/eleventy-plugin-embed-everything/commit/1d54fb3d7a9b76c17b6efb3520833712629ba157), [`c2b94fd`](https://github.com/gfscott/eleventy-plugin-embed-everything/commit/c2b94fd70bad4373f5b611c52fd4b18276c71b47), [`5ea7f13`](https://github.com/gfscott/eleventy-plugin-embed-everything/commit/5ea7f1391696b044f30534425f45ac574c4b4ef9), [`877b3b2`](https://github.com/gfscott/eleventy-plugin-embed-everything/commit/877b3b2a755182003adf70854df8afdd01ed1186), [`3c032f9`](https://github.com/gfscott/eleventy-plugin-embed-everything/commit/3c032f954bfe0cd92be0c7cf9e0a650da3e35823), [`96dbc5b`](https://github.com/gfscott/eleventy-plugin-embed-everything/commit/96dbc5bc6990806beadb66ba526080f4165c758e), [`94b9d33`](https://github.com/gfscott/eleventy-plugin-embed-everything/commit/94b9d332a7c5b2fff1d5029baafb89f06e7910ec), [`4cef38b`](https://github.com/gfscott/eleventy-plugin-embed-everything/commit/4cef38bce88f9b00d5f670fe0eb2165874868bd3), [`a3466fc`](https://github.com/gfscott/eleventy-plugin-embed-everything/commit/a3466fceeabc7b75c2a7b664989a20edcd158f0e), [`a619ba6`](https://github.com/gfscott/eleventy-plugin-embed-everything/commit/a619ba61d551b4f06a211f825e9d3b81991d0e72), [`e66523e`](https://github.com/gfscott/eleventy-plugin-embed-everything/commit/e66523eb7aee45ea61d23487930c08edc2f42ded)]:
  - eleventy-plugin-youtube-embed@1.9.0
  - eleventy-plugin-embed-instagram@1.2.7
  - eleventy-plugin-embed-soundcloud@1.2.7
  - eleventy-plugin-embed-spotify@1.2.7
  - eleventy-plugin-embed-tiktok@1.1.7
  - eleventy-plugin-embed-twitch@1.2.7
  - eleventy-plugin-embed-twitter@1.3.7
  - eleventy-plugin-vimeo-embed@1.3.7
  - eleventy-plugin-embed-ted@1.0.0

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
