# eleventy-plugin-embed-everything

[![NPM Version](https://img.shields.io/npm/v/eleventy-plugin-embed-everything?style=for-the-badge)](https://www.npmjs.com/package/eleventy-plugin-embed-everything)
[![MIT License](https://img.shields.io/github/license/gfscott/eleventy-plugin-embed-everything?style=for-the-badge)](https://github.com/gfscott/eleventy-plugin-embed-everything/blob/master/LICENSE)

This [Eleventy](https://11ty.dev) plugin will automatically embed common media formats in your pages, requiring only a URL in your markdown files.

It currently supports **Instagram**, **SoundCloud**, **Spotify**, **TikTok**, **Twitch**, **Twitter**, **Vimeo**, and **YouTube**, with more planned.

- ⚡️ [Installation](#%EF%B8%8F-installation)
- 🛠 [Usage](#-usage)
- 🌈 [Supported services](#-supported-services)
- ⚙️ [Settings](#%EF%B8%8F-settings)
- ⚠️ [Notes and caveats](#%EF%B8%8F-notes-and-caveats)

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

## ⚙️ Settings

### Configure which embed services are active

The plugin supports a number of frequently used services by default, but you can configure it for only the specific ones you want by passing an options object to the `addPlugin` function:

```javascript
// configure the plugin to ~only~ embed Vimeo videos and Instagram photos/videos
eleventyConfig.addPlugin(embedEverything, {
  use: ['vimeo', 'instagram']
});
```

### Configure embed services individually

Each service comes with some useful defaults, but you can also configure each one individually using the same method:

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

Currently, you’ll need to consult the [individual plugin packages](#aggregated-plugins) for the relevant defaults and options.

## ⚠️ Notes and caveats

- This plugin does very little on its own. Instead, it _aggregates_ other embed plugins in a single place.
- Each service is itself a standalone Eleventy plugin, each of which you can install individually.
- This plugin is in its early stages, with only a few supported embed patterns right now. If there’s a specific service you want added, please [open an issue](https://github.com/gfscott/eleventy-plugin-embed-everything/issues).

### Aggregated plugins

For more about each [supported service](#supported-services), consult this table of relevant links.

| Service | Package | Repository |
| ------- | ------- | ---------- |
| Instagram | [npm](https://www.npmjs.com/package/eleventy-plugin-embed-instagram) | [GitHub](https://github.com/gfscott/eleventy-plugin-embed-instagram) |
| SoundCloud | [npm](https://www.npmjs.com/package/eleventy-plugin-embed-soundcloud) | [GitHub](https://github.com/gfscott/eleventy-plugin-embed-soundcloud) |
| Spotify | [npm](https://www.npmjs.com/package/eleventy-plugin-embed-spotify) | [GitHub](https://github.com/gfscott/eleventy-plugin-embed-spotify) |
| TikTok | [npm](https://www.npmjs.com/package/eleventy-plugin-embed-tiktok) | [GitHub](https://github.com/gfscott/eleventy-plugin-embed-tiktok) |
| Twitch | [npm](https://www.npmjs.com/package/eleventy-plugin-embed-twitch) | [GitHub](https://github.com/gfscott/eleventy-plugin-embed-twitch) |
| Twitter | [npm](https://www.npmjs.com/package/eleventy-plugin-embed-twitter) | [GitHub](https://github.com/gfscott/eleventy-plugin-embed-twitter) |
| Vimeo | [npm](https://www.npmjs.com/package/eleventy-plugin-vimeo-embed) | [GitHub](https://github.com/gfscott/eleventy-plugin-vimeo-embed) |
| YouTube | [npm](https://www.npmjs.com/package/eleventy-plugin-youtube-embed) | [GitHub](https://github.com/gfscott/eleventy-plugin-youtube-embed) |
