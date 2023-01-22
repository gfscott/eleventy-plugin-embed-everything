# eleventy-plugin-embed-spotify

[![NPM Version](https://img.shields.io/npm/v/eleventy-plugin-embed-spotify?style=for-the-badge)](https://www.npmjs.com/package/eleventy-plugin-embed-spotify)
[![Build test status](https://img.shields.io/github/actions/workflow/status/gfscott/eleventy-plugin-embed-spotify/test-and-codecov.yml?branch=main&style=for-the-badge)](https://github.com/gfscott/eleventy-plugin-embed-spotify/actions?query=workflow%3A%22Node.js+CI+and+Codecov%22)
[![Code coverage](https://img.shields.io/codecov/c/gh/gfscott/eleventy-plugin-embed-spotify/main?style=for-the-badge)](https://codecov.io/gh/gfscott/eleventy-plugin-embed-spotify)\
[![MIT License](https://img.shields.io/github/license/gfscott/eleventy-plugin-embed-spotify?style=for-the-badge)](https://github.com/gfscott/eleventy-plugin-embed-spotify/blob/master/LICENSE)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0-ff69b4.svg?style=for-the-badge)](code_of_conduct.md)

This [Eleventy](https://www.11ty.dev/) plugin automatically embeds responsive Spotify tracks from URLs in Markdown files.

- ⚡️ [Installation](#install-in-eleventy)
- 🛠 [Usage](#usage)
- ⚙️ [Settings](#settings)
- ⚠️ [Notes and caveats](#notes-and-caveats)

---
<span id="install-in-eleventy"></span>
## ⚡️ Installation

In your Eleventy project, [install the plugin](https://www.11ty.dev/docs/plugins/#adding-a-plugin) through npm:

```sh
$ npm i eleventy-plugin-embed-spotify
```

Then add it to your [Eleventy config](https://www.11ty.dev/docs/config/) file:

```javascript
const embedSpotify = require("eleventy-plugin-embed-spotify");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(embedSpotify);
};
```

<span id="usage"></span>
## 🛠 Usage

To embed a Spotify widget into any Markdown page, paste its URL into a new line. The URL should be the only thing on that line.

### Markdown file example:

```markdown
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vehicula, elit vel condimentum porta, purus.

https://open.spotify.com/track/7nJZ9LplJ3ZAyhQyJCJk0K

Maecenas non velit nibh. Aenean eu justo et odio commodo ornare. In scelerisque sapien at.
```

### Result:

![Janelle Monae’s “Dirty Computer”](https://user-images.githubusercontent.com/547470/78504267-f70eb980-7739-11ea-8206-9862782b1f80.png)

<span id="settings"></span>
## ⚙️ Settings

You can configure the plugin to change its behavior by passing an options object to the `addPlugin` function:

```javascript
eleventyConfig.addPlugin(embedSpotify, {
  // edit options here
});
```

### Plugin default options

Edit any of the [default values](lib/pluginDefaults.js) in this options object to override the plugin behavior. These are the default settings, which will apply to all embed instances. Currently there’s no way to configure individual embeds.

```javascript
{
  // Spotify’s iframe embed requires the `allow` attribute to include `encrypted-media`
  // in order to enable full-track playback.
  // Substitute your preferred string to allow other iframe behaviors
  allowAttrs: 'encrypted-media',
  // The Spotify player iframe is always wrapped in a div with this class.
  // Substitute your preferred string to rename the wrapper class
  embedClass: 'eleventy-plugin-embed-spotify',
  // Default iframe height, in pixels
  height: '380',
  // default iframe width, in pixels
  width: '300'
  // width: '100%' // Use 100% width value to make the player responsive!
};
```

### Supported URL patterns

The plugin supports common Spotify URL variants as well. These should also work in your Markdown files.:

```markdown
<!-- Works with individual tracks, albums, artists, podcast episodes, and playlists: -->

https://open.spotify.com/track/7nJZ9LplJ3ZAyhQyJCJk0K
https://open.spotify.com/album/2PjlaxlMunGOUvcRzlTbtE
https://open.spotify.com/artist/6ueGR6SWhUJfvEhqkvMsVs
https://open.spotify.com/episode/7G5O2wWmch1ciYDPZS4a4O

<!-- Playlists work with or without usernames: -->

https://open.spotify.com/user/janellemonae/playlist/5yEkeuBVoXWuGuzpcmzUZ5
https://open.spotify.com/playlist/5yEkeuBVoXWuGuzpcmzUZ5

<!-- No protocol: -->

open.spotify.com/track/7nJZ9LplJ3ZAyhQyJCJk0K
spotify.com/track/7nJZ9LplJ3ZAyhQyJCJk0K

<!-- With or without HTTPS: -->

https://open.spotify.com/track/7nJZ9LplJ3ZAyhQyJCJk0K
http://open.spotify.com/track/7nJZ9LplJ3ZAyhQyJCJk0K

<!-- With or without 'www' or 'open' subdomains: -->

https://open.spotify.com/track/7nJZ9LplJ3ZAyhQyJCJk0K
https://www.spotify.com/track/7nJZ9LplJ3ZAyhQyJCJk0K
https://spotify.com/track/7nJZ9LplJ3ZAyhQyJCJk0K

<!-- URLs with extra parameters: -->

https://open.spotify.com/track/7nJZ9LplJ3ZAyhQyJCJk0K?si=3qc9p-sGR3es3e8kkP9VFA
```

If you run across a URL pattern that you think should work, but doesn’t, please [file an issue](https://github.com/gfscott/eleventy-plugin-embed-spotify/issues/new)!

<span id="notes-and-caveats"></span>
## ⚠️ Notes and caveats

- This plugin is deliberately designed _only_ to embed tracks when the URL is on its own line, and not inline with other text.
- To do this, it uses [a regular expression](lib/spotPattern.js) to recognize relevant Spotify URLs. Currently these are the limitations on what it can recognize in a Markdown parser’s HTML output:
  - The URL *must* be wrapped in a paragraph tag: `<p>`
  - It *may* also be wrapped in an anchor tag, (*inside* the paragraph): `<a>`
  - The URL string *may* have whitespace around it
- I’ve tried to accommodate common variants, but there are conceivably valid Spotify URLs that wouldn’t get recognized. Please [file an issue](https://github.com/gfscott/eleventy-plugin-embed-spotify/issues/new) if you run into an edge case!
- This plugin uses [transforms](https://www.11ty.dev/docs/config/#transforms), so it alters Eleventy’s HTML output as it’s generated. It doesn’t alter the source Markdown.
- The embedded player is not responsive by default. Spotify’s default player is 300 pixels wide by 380 pixels tall.
- **New in 1.1.0:** The embedded podcast player _is_ responsive, in keeping with Spotify’s defaults. Currently, all podcast episode players will be 232 pixels tall, with 100% width.
