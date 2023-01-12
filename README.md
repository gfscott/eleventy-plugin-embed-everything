# eleventy-plugin-embed-twitch

[![NPM Version](https://img.shields.io/npm/v/eleventy-plugin-embed-twitch?style=for-the-badge)](https://www.npmjs.com/package/eleventy-plugin-embed-twitch)
[![Build test status](https://img.shields.io/github/actions/workflow/status/gfscott/eleventy-plugin-embed-twitch/test-and-codecov.yml?branch=main&style=for-the-badge)](https://github.com/gfscott/eleventy-plugin-embed-twitch/actions?query=workflow%3A%22Node.js+CI+and+Codecov%22)\
[![MIT License](https://img.shields.io/github/license/gfscott/eleventy-plugin-embed-twitch?style=for-the-badge)](https://github.com/gfscott/eleventy-plugin-embed-twitch/blob/master/LICENSE)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0-ff69b4.svg?style=for-the-badge)](CODE_OF_CONDUCT.md)

This [Eleventy](https://www.11ty.dev/) plugin automatically embeds responsive Twitch videos from URLs in Markdown files.

- ⚡️ [Installation](#installation)
- 🛠 [Usage](#usage)
- ⚙️ [Settings](#settings)
- ⚠️ [Notes and caveats](#notes-and-caveats)

---
<span id="installation"></span>

## ⚡️ Installation

In your Eleventy project, [install the plugin](https://www.11ty.dev/docs/plugins/#adding-a-plugin) through npm:

```sh
$ npm i eleventy-plugin-embed-twitch
```

Then add it to your [Eleventy config](https://www.11ty.dev/docs/config/) file:

```javascript
const embedTwitch = require("eleventy-plugin-embed-twitch");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(embedTwitch, {
    /**
     * `parent` is now a REQUIRED option. It MUST comply with these specs (set by Twitch):
     * - Must be a text string
     * - Must be the domain where the embed will be shown, without the protocol
     * - Reference: https://dev.twitch.tv/docs/embed/video-and-clips#non-interactive-inline-frames-for-live-streams-and-vods
     */
    parent: "example.com"
  });
};
```

<span id="usage"></span>

## 🛠 Usage

To embed a Twitch stream or video into any Markdown page, paste its URL into a new line. The URL should be the only thing on that line.

### Markdown file example:

```markdown
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vehicula, elit vel condimentum porta, purus.

https://www.twitch.tv/vixella

Maecenas non velit nibh. Aenean eu justo et odio commodo ornare. In scelerisque sapien at.
```

### Result:

![Twitch streamer Vixella playing Animal Crossing](https://user-images.githubusercontent.com/547470/80289103-77f21d00-870a-11ea-85d8-69fa67c449bd.png)

<span id="settings"></span>

## ⚙️ Settings

You can configure the plugin to change its behavior by passing an options object to the `addPlugin` function:

```javascript
eleventyConfig.addPlugin(embedTwitch, {
  // `parent` value is required!
  parent: "example.com",
  //...set additional options here
});
```

### Plugin default options

Edit any of the default values in this options object to override the plugin behavior. These are the default settings, which will apply to all embed instances. Currently there’s no way to configure individual embeds.

```javascript
{
  // Default “allow” attributes that get applied to the embed <iframe>.
  // Substitute your preferred string to allow other iframe behaviors.
  allowAttrs: 'autoplay, fullscreen',
  // By default, user channels will autoplay, while archived videos will not.
  // Currently, the only option is to turn off autoplaying channels.
  autoplayChannels: true,
  // Default class that gets applied to the wrapper <div>.
  // Substitute your preferred string to target embeds with CSS.
  embedClass: 'eleventy-plugin-embed-twitch',
  // REQUIRED
  // @since 2.0.0
  // Default value is empty, which will produce a console error when building your site.
  // Set this to your website’s domain, such as "example.com" or "subdomain.example.com".
  parent: ""
}
```

### Supported URL patterns

The plugin supports common Twitch URL variants as well. These should also work in your Markdown files.:

```markdown

<!-- With or without protocol or "www" -->
https://www.twitch.tv/vixella
http://www.twitch.tv/vixella
www.twitch.tv/vixella
twitch.tv/vixella

<!-- Works for channels and archived videos: -->

https://www.twitch.tv/datto
https://www.twitch.tv/videos/597008599

```

If you run across a URL pattern that you think should work, but doesn’t, please [file an issue](https://github.com/gfscott/eleventy-plugin-embed-twitch/issues/new)!

<span id="notes-and-caveats"></span>

## ⚠️ Notes and caveats

- This plugin is deliberately designed _only_ to embed videos when the URL is on its own line, and not inline with other text.
- To do this, it uses [a regular expression](lib/spotPattern.js) to recognize Twitch video URLs. Currently these are the limitations on what it can recognize in a Markdown parser’s HTML output:
  - The URL *must* be wrapped in a paragraph tag: `<p>`
  - It *may* also be wrapped in an anchor tag, (*inside* the paragraph): `<a>`
  - The URL string *may* have whitespace around it
- I’ve tried to accommodate common variants, but there are conceivably valid URLs that wouldn’t get recognized. Please [file an issue](https://github.com/gfscott/eleventy-plugin-embed-twitch/issues/new) if you run into an edge case!
- This plugin uses [transforms](https://www.11ty.dev/docs/config/#transforms), so it alters Eleventy’s HTML output as it’s generated. It doesn’t alter the source Markdown.
- The embedded video is responsive, using the [intrinsic aspect ratio](https://codepen.io/gfscott/pen/qpKqZR?editors=1100) method. It will expand to fill whatever horizontal space is available.
- The embed dimensions are currently hard-coded to a 16:9 aspect ratio.
