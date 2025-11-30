# eleventy-plugin-embed-everything

[![NPM Version](https://img.shields.io/npm/v/eleventy-plugin-embed-everything?style=for-the-badge)](https://www.npmjs.com/package/eleventy-plugin-embed-everything)
[![Build test status](https://img.shields.io/github/actions/workflow/status/gfscott/eleventy-plugin-embed-everything/test.yml?branch=main&style=for-the-badge)](https://github.com/gfscott/eleventy-plugin-embed-everything/actions/workflows/test.yml?query=branch%3Amain)
[![codecov](https://img.shields.io/codecov/c/github/gfscott/eleventy-plugin-embed-everything?style=for-the-badge)](https://codecov.io/gh/gfscott/eleventy-plugin-embed-everything)\
[![MIT License](https://img.shields.io/github/license/gfscott/eleventy-plugin-embed-everything?style=for-the-badge)](https://github.com/gfscott/eleventy-plugin-embed-everything/blob/main/LICENSE)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0-ff69b4.svg?style=for-the-badge)](https://github.com/gfscott/eleventy-plugin-embed-everything/blob/main/CODE_OF_CONDUCT.md)

This [Eleventy](https://11ty.dev) plugin will automatically embed common media formats in your pages, requiring only a URL in your markdown files.

It currently supports a [range of services](#supported-services).

- ⚡️ [Installation](#installation)
- 🛠 [Usage](#usage)
- 🌈 [Supported services](#supported-services)
- ⚙️ [Settings](#settings)
- ⚠️ [Notes and caveats](#notes-and-caveats)

<span id="installation"></span>
## ⚡️ Installation

In your Eleventy project, [install the plugin](https://www.11ty.dev/docs/plugins/#adding-a-plugin) through npm:

```sh
$ npm i eleventy-plugin-embed-everything
```

Then add it to your [Eleventy config](https://www.11ty.dev/docs/config/) file:

```javascript
const embedEverything = require("eleventy-plugin-embed-everything");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(embedEverything);
};
```
<span id="usage"></span>
## 🛠 Usage

To embed a YouTube video into any Markdown page, paste its URL into a new line. The URL should be the only thing on that line.

### Markdown file example:

```markdown
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vehicula, elit vel condimentum porta, purus.

https://www.youtube.com/watch?v=dQw4w9WgXcQ

Maecenas non velit nibh. Aenean eu justo et odio commodo ornare. In scelerisque sapien at.
```

The same principle applies to all [supported services](#supported-services).

### Result:

![Rick Astley performing “Never gonna give you up”](https://user-images.githubusercontent.com/547470/73130266-2b8c2980-3fc3-11ea-8a8c-7994175a8490.jpg)

<span id="supported-services"></span>
## 🌈 Supported services

Currently, the plugin supports the following embed services (listed alphabetically). You can also install them individually, check their npm pages for details.

Service | Handle | Active by default?<br>([How to activate](#activate)) | 🔗 npm | 🔗 GitHub | Options
---|---|---|---|---|---
Bluesky | `bluesky` | ❌ No | [npm](https://www.npmjs.com/package/eleventy-plugin-embed-bluesky) | [GitHub](/packages/bluesky) | [Options](/packages/instagram/lib/defaults.js)
Instagram | `instagram` | ✅ Yes | [npm](https://www.npmjs.com/package/eleventy-plugin-embed-instagram) | [GitHub](/packages/instagram) | [Options](/packages/instagram/lib/pluginDefaults.js)
Mastodon | `mastodon` | ❌ No | [npm](https://www.npmjs.com/package/eleventy-plugin-embed-mastodon) | [GitHub](/packages/mastodon) | [Options](/packages/mastodon/lib/defaults.js)
OpenStreetMap | `openstreetmap` | ✅ Yes | [npm](https://www.npmjs.com/package/eleventy-plugin-embed-openstreetmap) | [GitHub](/packages/openstreetmap) | [Options](/packages/openstreetmap/lib/defaults.js)
SoundCloud | `soundcloud` | ❌ No | [npm](https://www.npmjs.com/package/eleventy-plugin-embed-soundcloud) | [GitHub](/packages/soundcloud) | [Options](/packages/soundcloud/lib/pluginDefaults.js)
Spotify | `spotify` | ✅ Yes | [npm](https://www.npmjs.com/package/eleventy-plugin-embed-spotify) | [GitHub](/packages/spotify) | [Options](/packages/spotify/lib/defaults.js)
TED | `ted` | ✅ Yes | [npm](https://www.npmjs.com/package/eleventy-plugin-embed-ted) | [GitHub](/packages/ted) | [Options](/packages/ted/lib/defaults.js)
TikTok | `tiktok` | ✅ Yes | [npm](https://www.npmjs.com/package/eleventy-plugin-embed-tiktok) | [GitHub](/packages/tiktok) | [Options](/packages/tiktok/lib/pluginDefaults.js)
Twitch | `twitch` | ✅ Yes | [npm](https://www.npmjs.com/package/eleventy-plugin-embed-twitch) | [GitHub](/packages/twitch) | [Options](/packages/twitch/lib/pluginDefaults.js)
Twitter | `twitter` | ✅ Yes | [npm](https://www.npmjs.com/package/eleventy-plugin-embed-twitter) | [GitHub](/packages/twitter) | [Options](/packages/twitter/lib/pluginDefaults.js)
Vimeo | `vimeo` | ✅ Yes | [npm](https://www.npmjs.com/package/eleventy-plugin-vimeo-embed) | [GitHub](/packages/vimeo) | [Options](/packages/vimeo/lib/defaults.js)
YouTube | `youtube` | ✅ Yes | [npm](https://www.npmjs.com/package/eleventy-plugin-youtube-embed) | [GitHub](/packages/youtube) | [Options](/packages/youtube/lib/defaults.js)

> [!NOTE]
> **Why are some plugins not active by default?**
> Some services require API calls to fetch the relevant embed data. Because these network calls can affect build times, you'll have to [opt-in to using them](#activate).

Got a suggestion? [File an issue](https://github.com/gfscott/eleventy-plugin-embed-everything/issues/new?title=Feature%20Request:%20&labels=enhancement)!

<span id="settings"></span>
## ⚙️ Settings

The plugin supports a number of frequently used services by default, and they have default settings of their own.

<span id="activate"></span>
### Configure which embed services are active

 You can configure which services you want active by passing an options object to the `addPlugin` function:

**Example:** configure the plugin to embed all default services _plus_ SoundCloud

```javascript
eleventyConfig.addPlugin(embedEverything, {
  add: ['soundcloud']
});
```

**Example:** configure the plugin to embed _only_ Vimeo and Instagram:
```javascript
eleventyConfig.addPlugin(embedEverything, {
  use: ['vimeo', 'instagram']
});
```

### Configure embed services individually

Each service comes with some useful defaults, but you can also configure each one individually. Override each plugin’s defaults by passing an options object that includes its [handle](#supported-services) as the key:

```javascript
// configure YouTube videos to prohibit fullscreen
eleventyConfig.addPlugin(embedEverything, {
  youtube: {
    options: {
      allowFullscreen: false
    }
  }
});
```
Substitute the plugin **Handle** (`vimeo`, `instagram`, and so on) in place of `youtube`. Consult the [individual plugin packages](#supported-services) for their relevant defaults and options.

<span id="notes-and-caveats"></span>
## ⚠️ Notes and caveats

- This plugin does very little on its own. Instead, it _aggregates_ other embed plugins in a single place.
- Each service is itself a standalone Eleventy plugin, each of which you can install individually.
- If there’s a specific service you’d want added, please [open an issue](https://github.com/gfscott/eleventy-plugin-embed-everything/issues).
- We aim to match 11ty's supported Node.js versions. It may work on older versions but this isn't tested or guaranteed.
