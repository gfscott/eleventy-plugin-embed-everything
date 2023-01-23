# eleventy-plugin-embed-soundcloud

[![NPM Version](https://img.shields.io/npm/v/eleventy-plugin-embed-soundcloud?style=for-the-badge)](https://www.npmjs.com/package/eleventy-plugin-embed-soundcloud)
[![Build test status](https://img.shields.io/github/actions/workflow/status/gfscott/eleventy-plugin-embed-soundcloud/test-and-codecov.yml?branch=main&style=for-the-badge)](https://github.com/gfscott/eleventy-plugin-embed-soundcloud/actions?query=workflow%3A%22Node.js+CI+and+Codecov%22)\
[![MIT License](https://img.shields.io/github/license/gfscott/eleventy-plugin-embed-soundcloud?style=for-the-badge)](https://github.com/gfscott/eleventy-plugin-embed-soundcloud/blob/master/LICENSE)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0-ff69b4.svg?style=for-the-badge)](CODE_OF_CONDUCT.md)

This [Eleventy](https://www.11ty.dev/) plugin automatically embeds responsive SoundCloud players from URLs in Markdown files.

- ⚡️ [Installation](#install-in-eleventy)
- 🛠 [Usage](#usage)
- ⚙️ [Settings](#settings)
- ⚠️ [Notes and caveats](#notes-and-caveats)

---

## ⚡️ Installation

In your Eleventy project, [install the plugin](https://www.11ty.dev/docs/plugins/#adding-a-plugin) through npm:

```sh
$ npm i eleventy-plugin-embed-soundcloud
```

Then add it to your [Eleventy config](https://www.11ty.dev/docs/config/) file:

```javascript
const embedSoundCloud = require("eleventy-plugin-embed-soundcloud");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(embedSoundCloud);
};
```

## 🛠 Usage

To embed a SoundCloud player into any Markdown page, paste its URL into a new line. The URL should be the only thing on that line.

### Markdown file example:

```markdown
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vehicula, elit vel condimentum porta, purus.

https://soundcloud.com/megan-thee-stallion/sets/suga

Maecenas non velit nibh. Aenean eu justo et odio commodo ornare. In scelerisque sapien at.
```

### Result:

![Screnshot of Megan Thee Stallion album “Suga” on SoundCloud](https://user-images.githubusercontent.com/547470/79051218-ff189e80-7bfc-11ea-9cf2-4fc802d8a2f2.png)


## ⚙️ Settings

You can configure the plugin to change its behavior by passing an options object to the `addPlugin` function:

```javascript
eleventyConfig.addPlugin(embedSoundCloud, {
  // edit options here
});
```

### Plugin default options

Edit any of the [default values](lib/pluginDefaults.js) to change the plugin’s behavior. These are the default settings, which will apply to all embed instances. Currently there’s no way to configure individual embeds.

```javascript
{
  auto_play: false, // @Boolean: be cool, don’t do this!
  color: '#ff7700', // @String: hex code to control the color scheme
  embedClass: 'eleventy-plugin-embed-soundcloud', // @String: class name of wrapper div
  height: 400, // @Int/@String: height of the embedded iframe.
  // ☝️ Use Integer for pixels; Use String for percent value
  sharing: true, // @Boolean: show sharing button
  show_artwork: true, // @Boolean: show the track/playlist cover art
  show_comments: true, // @Boolean: show listener comments
  show_playcount: true, // @Boolean: show total number of plays
  show_reposts: false, // @Boolean: show total number of reposts
  show_user: true, // @Boolean: show the uploading user’s name above the track/set name
  small: false, // @Boolean: Convenience setting: Use smaller waveform embed style
  // ☝️ small: true overrides `visual` to `false` and `height` to `166`.
  single_active: true, // @Boolean: only one player active on a page at a time. 
  // ☝️ single_active behavior seems buggy right now, your mileage may vary
  visual: true, // @Boolean: Default SoundCloud player style shows a huge cover image.
  width: '100%' // @Int/@String: width of the embedded iframe
  // ☝️ Use Integer for pixels; Use String for percent value
}
```

### Supported URL patterns

The plugin supports common SoundCloud URL types:

```markdown
<!-- User profile  URL embeds a playlist of the most recent uploaded tracks -->
https://soundcloud.com/megan-thee-stallion

<!-- Albums and Playlists are both “sets” on SoundCloud -->
https://soundcloud.com/megan-thee-stallion/sets/suga

<!-- Individual tracks -->
https://soundcloud.com/megan-thee-stallion/rich

<!-- URL variants also work  -->
https://www.soundcloud.com/...
http://www.soundcloud.com/...
http://soundcloud.com/...
//soundcloud.com/...
soundcloud.com/...
```

If you run across a URL pattern that you think should work, but doesn’t, please [file an issue](https://github.com/gfscott/eleventy-plugin-embed-soundcloud/issues/new)!

## ⚠️ Notes and caveats

- 📞 Unlike most plugins in the [Embed Everything](https://www.npmjs.com/package/eleventy-plugin-embed-everything) family, this one must make a network request to retrieve the relevant embed URLs. This is because SoundCloud widget `iframe src` URLs have no relationship to SoundCloud website URLs. I agree this is irritating, but it’s how the service works. Be aware that using this plugin **will** cause network requests during Eleventy’s build process. If the plugin experiences any network failure (such as if you're not connected to the internet), then it simply won’t complete the embed and the URL will be rendered as plain text.
- SoundCloud has a bunch of embed settings that are available only to its “Pro Unlimited” accounts, such as a [mini-player style](https://help.soundcloud.com/hc/en-us/articles/115003449027-The-Mini-embedded-player). It’s pretty unlikely that this plugin will ever support SoundCloud’s paid embedding features.
- This plugin is deliberately designed _only_ to embed players when the URL is on its own line, and not inline with other text.
- To do this, it uses [a regular expression](lib/spotPattern.js) to recognize SoundCloud URLs. Currently these are the limitations on what it can recognize in a Markdown parser’s HTML output:
  - The URL *must* be wrapped in a paragraph tag: `<p>`
  - It *may* also be wrapped in an anchor tag, (*inside* the paragraph): `<a>`
  - The URL string *may* have whitespace around it
- I’ve tried to accommodate common URL variants, but there are conceivably valid SoundCloud URLs that wouldn’t get recognized. Please [file an issue](https://github.com/gfscott/eleventy-plugin-embed-soundcloud/issues/new) if you run into an edge case!
- This plugin uses [transforms](https://www.11ty.dev/docs/config/#transforms), so it alters Eleventy’s HTML output as it’s generated. It doesn’t alter the source Markdown.
