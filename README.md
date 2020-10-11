# eleventy-plugin-youtube-embed

[![NPM Version](https://img.shields.io/npm/v/eleventy-plugin-youtube-embed?style=for-the-badge)](https://www.npmjs.com/package/eleventy-plugin-youtube-embed) 
[![Travis CI](https://img.shields.io/travis/com/gfscott/eleventy-plugin-youtube-embed/main?style=for-the-badge)](https://travis-ci.com/github/gfscott/eleventy-plugin-youtube-embed)
[![codecov](https://img.shields.io/codecov/c/github/gfscott/eleventy-plugin-youtube-embed?style=for-the-badge)](https://codecov.io/gh/gfscott/eleventy-plugin-youtube-embed)\
[![MIT License](https://img.shields.io/github/license/gfscott/eleventy-plugin-youtube-embed?style=for-the-badge)](https://github.com/gfscott/eleventy-plugin-youtube-embed/blob/master/LICENSE)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0-ff69b4.svg?style=for-the-badge)](code_of_conduct.md)

This [Eleventy](https://www.11ty.dev/) plugin automatically embeds responsive YouTube videos from URLs in Markdown files. It’s part of the [`eleventy-plugin-embed-everything`](https://gfscott.com/embed-everything/) project.

- ⚡️ [Installation](#install-in-eleventy)
- 🛠 [Usage](#usage)
- ⚙️ [Settings](#settings)
- ⚠️ [Notes and caveats](#notes-and-caveats)

---
<span id="install-in-eleventy"></span>

## ⚡️ Installation

In your Eleventy project, [install the plugin](https://www.11ty.dev/docs/plugins/#adding-a-plugin) through npm:

```sh
$ npm i eleventy-plugin-youtube-embed
```

Then add it to your [Eleventy config](https://www.11ty.dev/docs/config/) file:

```javascript
// `require` the package at the top of the file with all the others
const embedYouTube = require("eleventy-plugin-youtube-embed");

module.exports = function(eleventyConfig) {
  
  // There could be quite a lot of surrounding code here...
  
  eleventyConfig.addPlugin(embedYouTube);

  // There could be quite a lot of surrounding code here...

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

### Result:

![Rick Astley performing “Never gonna give you up”](https://user-images.githubusercontent.com/547470/73130266-2b8c2980-3fc3-11ea-8a8c-7994175a8490.jpg)

<span id="settings"></span>

## ⚙️ Settings

You can configure the plugin to change its behavior by passing an options object to the `addPlugin` function:

```javascript
eleventyConfig.addPlugin(embedYouTube, {
  // just an example, see default values below:
  embedClass: 'my-alternate-classname'
});
```

### Plugin default options

The plugin’s default settings reside in [lib/pluginDefaults.js](lib/pluginDefaults.js). All of these values can be changed with an options object passed to the plugin.

<table style="width: 100%;">
  <thead>
    <tr>
      <td style="width:15%">Option</td>
      <td style="width:15%">Type</td>
      <td style="width:15%">Default <br>value</td>
      <td style="width:40%">Notes</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>allowAttrs</code></td>
      <td>String</td>
      <td><code>accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture</code></td>
      <td>Default <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attr-allow"><code>allow</code> attributes</a> that get applied to the embed <code>iframe</code>. Substitute your preferred string to allow other iframe behaviors and <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Feature_Policy">feature policies</a>.</td>
    </tr>
    <tr>
      <td><code>allowAutoplay</code></td>
      <td>Boolean</td>
      <td><code>false</code></td>
      <td>Setting this to <code>true</code> will cause <b>all</b> embedded videos to autoplay. Be cool: don’t do it! <br>⚠️ This setting will be removed in v2.0.</td>
    </tr>
    <tr>
      <td><code>allowFullscreen</code></td>
      <td>Boolean</td>
      <td><code>true</code></td>
      <td>Default <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attr-allowfullscreen">allowfullscreen</a> attribute that gets applied to the embed <code>iframe</code>. Changing this to <code>false</code> will disable the fullscreen button on your embeds.</td>
    </tr>
    <tr>
      <td><code>embedClass</code></td>
      <td>String</td>
      <td><code>eleventy-plugin-youtube-embed</code></td>
      <td>Class name applied to the <code>div</code> element that wraps the embedded YouTube <code>iframe</code>. Use the default string to target the embeds with CSS, or substitute your preferred string.</td>
    </tr>
    <tr>
      <td>✨ <b>New in v1.4.0!</b><br> <code>lazy</code></td>
      <td>Boolean</td>
      <td><code>false</code></td>
      <td>Setting this to <code>true</code> will add a <code>loading="lazy"</code> attribute to the standard iframe embed. <a href="https://www.caniuse.com/#feat=loading-lazy-attr">Some browsers</a> will use this to optimize resource loading.</td>
    </tr>
    <tr>
      <td>✨ <b>New in v1.4.0!</b><br> <code>lite</code></td>
      <td>Boolean <b>or</b> Object</td>
      <td><code>false</code></td>
      <td>Setting this to <code>true</code> will use Paul Irish’s <a href="https://github.com/paulirish/lite-youtube-embed">Lite YouTube Embed</a> method. See the section on the <a href="#lite">Lite version</a> below for more details.</td>
    </tr>
    <tr>
      <td><code>noCookie</code></td>
      <td>Boolean</td>
      <td><code>true</code></td>
      <td>Defaults to the “privacy-enhanced” www.youtube-nocookie.com domain. Change this to <code>false</code> to use www.youtube.com.</td>
    </tr>
  </tbody>
</table>

<span id="lite"></span>

### Lite YouTube Embed

✨ **New in v1.4.0:** Use the [Lite YouTube Embed](https://github.com/paulirish/lite-youtube-embed) instead of the standard YouTube iframe. In many circumstances this is a performance win because it delays loading the iframe element until the user clicks play. 

Be aware that the Lite version defaults to [loading two files from the jsDelivr CDN](https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/). It loads these files once on any HTML page that includes an embed. You can override both resource URIs if you want to load from a different source, such as [unpkg](https://unpkg.com/browse/lite-youtube-embed@0.0.0/src/) or your own server.

In addition, using the Lite version will cause several of the plugin’s settings to become un-configurable. The `embedClass` option will still work, but the following options will be ignored if you set `lite: true`:

- `allowAttrs`
- `allowAutoplay`
- `allowFullscreen`
- `lazy`
- `noCookie`

#### Lite embed options

To use the default Lite version, simply pass `lite: true` to the options object when you add the plugin to your Eleventy config:

```javascript
eleventyConfig.addPlugin(embedYouTube, {
  lite: true
});
```

To load the necessary CSS and JavaScript from a different source, pass in an object instead of the boolean, passing the URIs to `lite.css.path` and `lite.js.path`:

```javascript
eleventyConfig.addPlugin(embedYouTube, {
  lite: {
    css: {
      path: "some_other_url"
    },
    js: {
      path: "some_other_url"
    }
  }
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

If you really want to get into the weeds, check the `validStrings` and `invalidStrings` that get checked in [`test.js`](test.js). And if you run across a URL pattern that you think should work, but doesn’t, please [file an issue](https://github.com/gfscott/eleventy-plugin-youtube-embed/issues/new)!

<span id="notes-and-caveats"></span>

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
