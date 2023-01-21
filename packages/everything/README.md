# eleventy-plugin-embed-everything

[![NPM Version](https://img.shields.io/npm/v/eleventy-plugin-embed-everything?style=for-the-badge)](https://www.npmjs.com/package/eleventy-plugin-embed-everything)
[![Build test status](https://img.shields.io/github/actions/workflow/status/gfscott/eleventy-plugin-embed-everything/test-and-codecov.yml?branch=main&style=for-the-badge)](https://github.com/gfscott/eleventy-plugin-embed-everything/actions?query=workflow%3A%22Node.js+CI+and+Codecov%22)
[![codecov](https://img.shields.io/codecov/c/github/gfscott/eleventy-plugin-embed-everything?style=for-the-badge)](https://codecov.io/gh/gfscott/eleventy-plugin-embed-everything)\
[![MIT License](https://img.shields.io/github/license/gfscott/eleventy-plugin-embed-everything?style=for-the-badge)](https://github.com/gfscott/eleventy-plugin-embed-everything/blob/master/LICENSE)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0-ff69b4.svg?style=for-the-badge)](CODE_OF_CONDUCT.md)

This [Eleventy](https://11ty.dev) plugin will automatically embed common media formats in your pages, requiring only a URL in your markdown files.

It currently supports **Instagram**, **SoundCloud**, **Spotify**, **TikTok**, **Twitch**, **Twitter**, **Vimeo**, and **YouTube**, with more planned.

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

The same principle applies to the other supported services.

### Result:

![Rick Astley performing “Never gonna give you up”](https://user-images.githubusercontent.com/547470/73130266-2b8c2980-3fc3-11ea-8a8c-7994175a8490.jpg)

<span id="supported-services"></span>
## 🌈 Supported services

Currently, the plugin supports the following embed services (listed alphabetically):

**On by default:**
- Instagram
- Spotify
- TikTok
- Twitch
- Twitter
- Vimeo
- YouTube

**Off by default** ([How to activate](#configure-which-embed-services-are-active))
- SoundCloud

_More are planned!_

<span id="settings"></span>
## ⚙️ Settings

The plugin supports a number of frequently used services by default, and they have default settings of their own. 

### Configure which embed services are active

 You can configure which services you want active by passing an options object to the `addPlugin` function:

**Example (✨ New in 1.11.0):** configure the plugin to embed all default services _plus_ SoundCloud

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

Each service comes with some useful defaults, but you can also configure each one individually. Override each plugin’s defaults by passing an options object that includes its fully-lowercase name as the key:

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
Substitute `vimeo`, `instagram`, and so on in place of `youtube`. Consult the [individual plugin packages](#aggregated-plugins) for their relevant defaults and options.

<span id="notes-and-caveats"></span>
## ⚠️ Notes and caveats

- This plugin does very little on its own. Instead, it _aggregates_ other embed plugins in a single place.
- Each service is itself a standalone Eleventy plugin, each of which you can install individually.
- This plugin is in its early stages, with only a few supported embed patterns right now. If there’s a specific service you want added, please [open an issue](https://github.com/gfscott/eleventy-plugin-embed-everything/issues).
- This plugin is not tested against Node.js 8 (since [ava](https://github.com/avajs/ava) doesn’t support it). I believe the plugin still works, but Node.js < 10 compatibility is best-effort only at this point, and will be explicitly dropped in future.

### Aggregated plugins

For more about each [supported service](#supported-services), consult this table of relevant links.

| Service | Package | Repository | Options |
| ------- | ------- | ---------- | ------- |
| Instagram | [npm](https://www.npmjs.com/package/eleventy-plugin-embed-instagram) | [GitHub](https://github.com/gfscott/eleventy-plugin-embed-instagram) | [Options](https://github.com/gfscott/eleventy-plugin-embed-instagram/blob/main/lib/pluginDefaults.js) |
| SoundCloud | [npm](https://www.npmjs.com/package/eleventy-plugin-embed-soundcloud) | [GitHub](https://github.com/gfscott/eleventy-plugin-embed-soundcloud) | [Options](https://github.com/gfscott/eleventy-plugin-embed-soundcloud/blob/main/lib/pluginDefaults.js) |
| Spotify | [npm](https://www.npmjs.com/package/eleventy-plugin-embed-spotify) | [GitHub](https://github.com/gfscott/eleventy-plugin-embed-spotify) | [Options](https://github.com/gfscott/eleventy-plugin-embed-spotify/blob/main/lib/pluginDefaults.js) |
| TikTok | [npm](https://www.npmjs.com/package/eleventy-plugin-embed-tiktok) | [GitHub](https://github.com/gfscott/eleventy-plugin-embed-tiktok) | [Options](https://github.com/gfscott/eleventy-plugin-embed-tiktok/blob/main/lib/pluginDefaults.js) |
| Twitch | [npm](https://www.npmjs.com/package/eleventy-plugin-embed-twitch) | [GitHub](https://github.com/gfscott/eleventy-plugin-embed-twitch) | [Options](https://github.com/gfscott/eleventy-plugin-embed-twitch/blob/main/lib/pluginDefaults.js) |
| Twitter | [npm](https://www.npmjs.com/package/eleventy-plugin-embed-twitter) | [GitHub](https://github.com/gfscott/eleventy-plugin-embed-twitter) | [Options](https://github.com/gfscott/eleventy-plugin-embed-twitter/blob/main/lib/pluginDefaults.js) |
| Vimeo | [npm](https://www.npmjs.com/package/eleventy-plugin-vimeo-embed) | [GitHub](https://github.com/gfscott/eleventy-plugin-vimeo-embed) | [Options](https://github.com/gfscott/eleventy-plugin-vimeo-embed/blob/main/lib/pluginDefaults.js) |
| YouTube | [npm](https://www.npmjs.com/package/eleventy-plugin-youtube-embed) | [GitHub](https://github.com/gfscott/eleventy-plugin-youtube-embed) | [Options](https://github.com/gfscott/eleventy-plugin-youtube-embed/blob/main/lib/pluginDefaults.js) |
