# eleventy-plugin-vimeo-embed

[![NPM Version](https://img.shields.io/npm/v/eleventy-plugin-vimeo-embed?style=for-the-badge)](https://www.npmjs.com/package/eleventy-plugin-vimeo-embed)
[![Build test status](https://img.shields.io/github/actions/workflow/status/gfscott/eleventy-plugin-vimeo-embed/test-and-codecov.yml?branch=main&style=for-the-badge)](https://github.com/gfscott/eleventy-plugin-vimeo-embed/actions?query=workflow%3A%22Node.js+CI+and+Codecov%22)
[![codecov](https://img.shields.io/codecov/c/github/gfscott/eleventy-plugin-vimeo-embed?style=for-the-badge)](https://codecov.io/gh/gfscott/eleventy-plugin-vimeo-embed)\
[![MIT License](https://img.shields.io/github/license/gfscott/eleventy-plugin-vimeo-embed?style=for-the-badge)](https://github.com/gfscott/eleventy-plugin-vimeo-embed/blob/master/LICENSE)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0-ff69b4.svg?style=for-the-badge)](CODE_OF_CONDUCT.md)

This [Eleventy](https://www.11ty.dev/) plugin automatically embeds responsive Vimeo videos from URLs in Markdown files.

- ⚡️ [Installation](#install-in-eleventy)
- 🛠 [Usage](#usage)
- ⚙️ [Settings](#settings)
- ⚠️ [Notes and caveats](#notes-and-caveats)

---

## ⚡️ Installation

In your Eleventy project, [install the plugin](https://www.11ty.dev/docs/plugins/#adding-a-plugin) through npm:

```sh
$ npm i eleventy-plugin-vimeo-embed
```

Then add it to your [Eleventy config](https://www.11ty.dev/docs/config/) file:

```javascript
const embedVimeo = require("eleventy-plugin-vimeo-embed");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(embedVimeo);
};
```

## 🛠 Usage

To embed a Vimeo video into any Markdown page, paste its URL into a new line. The URL should be the only thing on that line.

### Markdown file example:

```markdown
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vehicula, elit vel condimentum porta, purus.

https://vimeo.com/347565673

Maecenas non velit nibh. Aenean eu justo et odio commodo ornare. In scelerisque sapien at.
```

### Result:

![Screenshot of a Vimeo embed of Christian Stangl’s “The Comet”](https://user-images.githubusercontent.com/547470/75613532-cd3ff280-5afc-11ea-865a-1e02d41b2957.png)

## ⚙️ Settings

You can configure the plugin to change its behavior by passing an options object to the `addPlugin` function:

```javascript
eleventyConfig.addPlugin(embedVimeo, {
  // edit options here
});
```

### Plugin default options

Edit any of the default values in this options object to override the plugin behavior. These are the default settings, which will apply to all embed instances. Currently there’s no way to configure individual embeds.

```javascript
{
  // Default “allowfullscreen” boolean attribute that gets applied to the embed <iframe>.
  // Change to false to disable fullscreen.
  allowFullscreen: true,
  // Default “dnt” (“do-not-track”) boolean attribute that gets applied to the embed URL.
  // Change to false to allow cookies and other tracking technology.
  dnt: true,
  // Default class that gets applied to the wrapper <div>.
  // Substitute your preferred string to target embeds with CSS.
  embedClass: 'eleventy-plugin-vimeo-embed'
});
```

### Supported URL patterns

The plugin supports common Vimeo URL variants as well. These should also work in your Markdown files.:

```markdown
<!-- No protocol: -->

vimeo.com/347565673
www.vimeo.com/347565673

<!-- With or without HTTPS: -->

http://vimeo.com/347565673
https://vimeo.com/347565673

<!-- With or without 'www': -->

https://www.vimeo.com/347565673
https://vimeo.com/347565673

<!-- URLs with extra parameters or fragments: -->

https://vimeo.com/347565673?autoplay=1
https://vimeo.com/347565673#t30s
```

If you run across a URL pattern that you think should work, but doesn’t, please [file an issue](https://github.com/gfscott/eleventy-plugin-vimeo-embed/issues/new)!

## ⚠️ Notes and caveats

- This plugin is deliberately designed _only_ to embed videos when the URL is on its own line, and not inline with other text.
- To do this, it uses [a regular expression](https://regex101.com/r/wSkwtj/13) to recognize Vimeo video URLs. Currently these are the limitations on what it can recognize in a Markdown parser’s HTML output:
  - The URL *must* be wrapped in a paragraph tag: `<p>`
  - It *may* also be wrapped in an anchor tag, (*inside* the paragraph): `<a>`
  - The URL string *may* have whitespace around it
- I’ve tried to accommodate common variants, but there are conceivably valid Vimeo URLs that wouldn’t get recognized. Please [file an issue](https://github.com/gfscott/eleventy-plugin-vimeo-embed/issues/new) if you run into an edge case!
- This plugin uses [transforms](https://www.11ty.dev/docs/config/#transforms), so it alters Eleventy’s HTML output as it’s generated. It doesn’t alter the source Markdown.
- The embedded video is responsive, using the [intrinsic aspect ratio](https://codepen.io/gfscott/pen/qpKqZR?editors=1100) method. It will expand to fill whatever horizontal space is available.
- The embed dimensions are currently hard-coded to a 16:9 aspect ratio.
