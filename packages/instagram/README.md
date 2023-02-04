# eleventy-plugin-embed-instagram

[![NPM Version](https://img.shields.io/npm/v/eleventy-plugin-embed-instagram?style=for-the-badge)](https://www.npmjs.com/package/eleventy-plugin-embed-instagram)
[![Build test status](https://img.shields.io/github/actions/workflow/status/gfscott/eleventy-plugin-embed-instagram/test-and-codecov.yml?branc=main&style=for-the-badge)](https://github.com/gfscott/eleventy-plugin-embed-instagram/actions?query=workflow%3A%22Node.js+CI+and+Codecov%22)
[![codecov](https://img.shields.io/codecov/c/github/gfscott/eleventy-plugin-embed-instagram?style=for-the-badge)](https://codecov.io/gh/gfscott/eleventy-plugin-embed-instagram)\
[![MIT License](https://img.shields.io/github/license/gfscott/eleventy-plugin-embed-instagram?style=for-the-badge)](https://github.com/gfscott/eleventy-plugin-embed-instagram/blob/master/LICENSE)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0-ff69b4.svg?style=for-the-badge)](CODE_OF_CONDUCT.md)

This [Eleventy](https://www.11ty.dev/) plugin automatically embeds Instagram photos and videos from URLs in markdown files.

## Install in Eleventy

In your Eleventy project, [install the plugin](https://www.11ty.dev/docs/plugins/#adding-a-plugin) through npm:

```sh
$ npm i eleventy-plugin-embed-instagram
```

Then add it to your [Eleventy config](https://www.11ty.dev/docs/config/) file (usually `.eleventy.js`):

```javascript
const embedInstagram = require("eleventy-plugin-embed-instagram");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(embedInstagram);
};
```

## Usage

To embed an Instagram photo or video into any markdown page, paste its URL into a new line. The URL should be the only thing on that line.

### Markdown file example:

```markdown
...

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vehicula, elit vel condimentum porta, purus.

https://www.instagram.com/p/B9XK4J3jVui/

Maecenas non velit nibh. Aenean eu justo et odio commodo ornare. In scelerisque sapien at.

...
```

### Result:

![Screenshot of an Instagram photo of pine trees in fog](https://user-images.githubusercontent.com/547470/76152810-1b6f6b80-6092-11ea-832e-e231f0942c8b.png)

The plugin supports common URL variants as well. These will also work:

```markdown
<!-- No protocol: -->

instagram.com/p/B9XK4J3jVui/
www.instagram.com/p/B9XK4J3jVui/

<!-- With or without HTTPS: -->

http://www.instagram.com/p/B9XK4J3jVui/
https://www.instagram.com/p/B9XK4J3jVui/

<!-- With or without 'www': -->

https://www.instagram.com/p/B9XK4J3jVui/
https://instagram.com/p/B9XK4J3jVui/

<!-- URLs with extra parameters: -->
https://www.instagram.com/p/B9XK4J3jVui/?foo=bar

```

## Notes and caveats

- This plugin is deliberately designed _only_ to embed when the URL is on its own line, and not inline with other text.
- To do this, it uses a regular expression to recognize Instagram URLs, wrapped in an HTML `<p>` tag. If your Markdown parser produces any other output, it won’t be recognized.
- I’ve tried to [accommodate common variants](https://regex101.com/r/cwLcjL/5), but there are conceivably valid Instagram URLs that wouldn’t get recognized. Please [file an issue](https://github.com/gfscott/eleventy-plugin-embed-instagram/issues/new) if you run into an edge case!
- This plugin uses [transforms](https://www.11ty.dev/docs/config/#transforms), so it alters Eleventy’s HTML output as it’s generated. It doesn’t alter the source markdown.
- By necessity, this plugin will add a call to Instagram’s third-party javascript file. It does this once per page, if that page contains an Instagram embed.
- Because the aspect ratio of Instagram media can vary widely, the embed is not currently responsive. By default, Instagram’s script injects an iframe with a hard-coded width of 326 pixels. I’ve opted to lead this default behavior intact.
- To make your Instagram embeds responsive, you can change their widths with CSS. Give them a standard pixel size, or set them to fill their full available horizontal width. Instagram’s embed script will automatically upscale them to fill the available space.

```css
.eleventy-plugin-embed-instagram {
  width: 100%;
}
```

- You can change the class name to whatever you prefer by passing an options object when you configure the plugin in your `.eleventy.js` file:
```javascript
module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(embedInstagram, {
    embedClass: 'alternate-class-string'
});
};
```

