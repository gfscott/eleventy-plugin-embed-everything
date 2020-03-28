# eleventy-plugin-youtube-embed

[![NPM Version](https://img.shields.io/npm/v/eleventy-plugin-youtube-embed?style=for-the-badge)](https://www.npmjs.com/package/eleventy-plugin-youtube-embed)\
[![MIT License](https://img.shields.io/github/license/gfscott/eleventy-plugin-youtube-embed?style=for-the-badge)](https://github.com/gfscott/eleventy-plugin-youtube-embed/blob/master/LICENSE)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0-ff69b4.svg?style=for-the-badge)](code_of_conduct.md)

This [Eleventy](https://www.11ty.dev/) plugin automatically embeds responsive YouTube videos from URLs in Markdown files.

- ⚡️ [Installation](#install-in-eleventy)
- 🛠 [Usage](#usage)
- ⚙️ [Settings](#settings)
- ⚠️ [Notes and caveats](#notes-and-caveats)

---

## ⚡️ Installation

In your Eleventy project, [install the plugin](https://www.11ty.dev/docs/plugins/#adding-a-plugin) through npm:

```sh
$ npm i eleventy-plugin-youtube-embed
```

Then add it to your [Eleventy config](https://www.11ty.dev/docs/config/) file:

```javascript
const embedYouTube = require("eleventy-plugin-youtube-embed");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(embedYouTube);
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

### Result:

![Rick Astley performing “Never gonna give you up”](https://user-images.githubusercontent.com/547470/73130266-2b8c2980-3fc3-11ea-8a8c-7994175a8490.jpg)

## ⚙️ Settings

You can configure the plugin to change its behavior by passing an options object to the `addPlugin` function:

```javascript
eleventyConfig.addPlugin(embedYouTube, {
  // edit options here
});
```

### Plugin default options

Edit any of the default values in this options object to override the plugin behavior. These are the default settings, which will apply to all embed instances. Currently there’s no way to configure individual embeds.

```javascript
{
  // By default, uses the “privacy-enhanced” www.youtube-nocookie.com domain.
  // Change to false to use www.youtube.com.
  noCookie: true,
  // Default class that gets applied to the wrapper <div>.
  // Substitute your preferred string to target embeds with CSS.
  embedClass: 'eleventy-plugin-youtube-embed',
  // Default “allow” attributes that get applied to the embed <iframe>.
  // Substitute your preferred string to allow other iframe behaviors.
  allowAttrs: 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture',
  // Default “allowfullscreen” boolean attribute that gets applied to the embed <iframe>.
  // Change to false to disable fullscreen.
  allowFullscreen: true,
  // Default "?autoplay=1" URL param that turns on autoplay.
  // BE ADVISED: Changing this to true will cause ALL embedded videos to autoplay.
  // BE COOL: Don’t do it.
  allowAutoplay: false
});
```

### Supported URL patterns

The plugin supports common YouTube URL variants as well. These should also work in your Markdown files.:

```markdown
<!-- No protocol: -->

youtube.com/watch?v=dQw4w9WgXcQ
www.youtube.com/watch?v=dQw4w9WgXcQ

<!-- With or without HTTPS: -->

http://www.youtube.com/watch?v=dQw4w9WgXcQ
https://www.youtube.com/watch?v=dQw4w9WgXcQ

<!-- With or without 'www': -->

https://www.youtube.com/watch?v=dQw4w9WgXcQ
https://youtube.com/watch?v=dQw4w9WgXcQ

<!-- YouTu.be short-links: -->

https://youtu.be/dQw4w9WgXcQ

<!-- URLs with extra parameters: -->

https://www.youtube.com/watch?v=LQaehcfXvK0&feature=youtu.be
https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1&t=1
```

If you run across a URL pattern that you think should work, but doesn’t, please [file an issue](https://github.com/gfscott/eleventy-plugin-youtube-embed/issues/new)!

## ⚠️ Notes and caveats

- This plugin is deliberately designed _only_ to embed videos when the URL is on its own line, and not inline with other text.
- To do this, it uses [a regular expression](https://regex101.com/r/wSkwtj/13) to recognize YouTube video URLs. Currently these are the limitations on what it can recognize in a Markdown parser’s HTML output:
  - The URL *must* be wrapped in a paragraph tag: `<p>`
  - It *may* also be wrapped in an anchor tag, (*inside* the paragraph): `<a>`
  - The URL string *may* have whitespace around it
- I’ve tried to accommodate common variants (like short **youtu.be** links, for example), but there are conceivably valid YouTube URLs that wouldn’t get recognized. Please [file an issue](https://github.com/gfscott/eleventy-plugin-youtube-embed/issues/new) if you run into an edge case!
- This plugin uses [transforms](https://www.11ty.dev/docs/config/#transforms), so it alters Eleventy’s HTML output as it’s generated. It doesn’t alter the source Markdown.
- Right now it supports only single videos, not playlists.
- The embedded video is responsive, using the [intrinsic aspect ratio](https://codepen.io/gfscott/pen/qpKqZR?editors=1100) method. It will expand to fill whatever horizontal space is available.
- The embed dimensions are currently hard-coded to a 16:9 aspect ratio.
