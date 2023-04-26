# eleventy-plugin-embed-ted

[![NPM Version](https://img.shields.io/npm/v/eleventy-plugin-embed-ted?style=for-the-badge)](https://www.npmjs.com/package/eleventy-plugin-embed-ted)
[![Build test status](https://img.shields.io/github/actions/workflow/status/gfscott/eleventy-plugin-embed-everything/test.yml?branch=main&style=for-the-badge)](https://github.com/gfscott/eleventy-plugin-embed-everything/actions/workflows/test.yml?query=branch%3Amain)\
[![MIT License](https://img.shields.io/github/license/gfscott/eleventy-plugin-embed-everything?style=for-the-badge)](https://github.com/gfscott/eleventy-plugin-embed-everything/blob/main/LICENSE)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0-ff69b4.svg?style=for-the-badge)](https://github.com/gfscott/eleventy-plugin-embed-everything/blob/main/CODE_OF_CONDUCT.md)

This [Eleventy](https://www.11ty.dev/) plugin automatically embeds TED.com videos from URLs in markdown files. It’s part of the [`eleventy-plugin-embed-everything`](https://gfscott.com/embed-everything/) project.

## Install in Eleventy

In your Eleventy project, [install the plugin](https://www.11ty.dev/docs/plugins/#adding-a-plugin) through npm:

```sh
$ npm i eleventy-plugin-embed-ted
```

Then add it to your [Eleventy config](https://www.11ty.dev/docs/config/) file (usually `.eleventy.js`):

```javascript
const embedTed = require("eleventy-plugin-embed-ted");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(embedTed);
};
```

## Usage

To embed a TED.com video into any markdown page, paste its URL into a new line. The URL should be the only thing on that line.

### Markdown file example:

```markdown
...

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vehicula, elit vel condimentum porta, purus.

https://www.ted.com/talks/mena_trott_meet_the_founder_of_the_blog_revolution

Maecenas non velit nibh. Aenean eu justo et odio commodo ornare. In scelerisque sapien at.

...
```

### Result:

![Screenshot of Mena Trott's 2006 TED talk about the blogosphere ](https://user-images.githubusercontent.com/547470/234719393-3be862fd-6d79-4f16-ba1d-f2a66e447093.png)

## Settings

You can configure the plugin to change its behavior by passing an options object to the `addPlugin` function:

```javascript
eleventyConfig.addPlugin(embedTed, {
  // just an example, see default values below:
  embedClass: 'custom-classname'
});
```

### Plugin default options

The plugin’s default settings reside in [lib/defaults.js](lib/defaults.js). All of these values can be customized with an options object passed to the plugin.

Option | Type | Default | Notes
---|---|---|---
`allowFullscreen` | Boolean | `true` | Set to false to prevent the embedded video from being viewed in fullscreen mode.
`containerCss` | String | `"position:relative;width:100%;padding-top: 56.25%;"` | CSS applied to the container `<div>` that wraps the embedded video.
`embedClass` | String | `"eleventy-plugin-embed-ted"` | CSS class applied to the container `<div>` that wraps the embedded video.
`iframeCss` | String | `"position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;"` | CSS applied to the `<iframe>` that contains the embedded video.
`iframeFrameborder` | String | `"0"` | Width of the `iframe`’s border in pixels.
`iframeHeight` | String | `"100%"` | Height of the `iframe`.
`iframeScrolling` | String | `"no"` | Whether the `iframe` should have scrollbars.
`iframeWidth` | String | `"100%"` | Width of the `iframe`.

### Supported URL patterns

The plugin supports common URL variants as well. These will also work:

```markdown
<!-- No protocol: -->

ted.com/talks/mena_trott_meet_the_founder_of_the_blog_revolution
www.ted.com/talks/mena_trott_meet_the_founder_of_the_blog_revolution

<!-- With or without HTTPS: -->

https://www.ted.com/talks/mena_trott_meet_the_founder_of_the_blog_revolution
http://www.ted.com/talks/mena_trott_meet_the_founder_of_the_blog_revolution

<!-- With or without 'www': -->

https://www.ted.com/talks/mena_trott_meet_the_founder_of_the_blog_revolution
https://ted.com/talks/mena_trott_meet_the_founder_of_the_blog_revolution

<!-- URLs with extra parameters: -->
https://www.ted.com/talks/mena_trott_meet_the_founder_of_the_blog_revolution?lang=en

```

## Notes and caveats

- This plugin is deliberately designed _only_ to embed when the URL is on its own line, and not inline with other text.
- To do this, it uses a regular expression to recognize TED URLs, wrapped in an HTML `<p>` tag. If your Markdown parser produces any other output, it won’t be recognized.
- I’ve tried to accommodate common URL variants, but there are conceivably valid TED URLs that wouldn’t get recognized. Please [file an issue](https://github.com/gfscott/eleventy-plugin-embed-everything/issues/new) if you run into an edge case!
- This plugin uses [transforms](https://www.11ty.dev/docs/config/#transforms), so it alters Eleventy’s HTML output as it’s generated. It doesn’t alter the source markdown.
