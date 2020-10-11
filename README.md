# eleventy-plugin-embed-tiktok

[![NPM Version](https://img.shields.io/npm/v/eleventy-plugin-embed-tiktok?style=for-the-badge)](https://www.npmjs.com/package/eleventy-plugin-embed-tiktok)
[![Travis CI](https://img.shields.io/travis/com/gfscott/eleventy-plugin-embed-tiktok/main?style=for-the-badge)](https://travis-ci.com/github/gfscott/eleventy-plugin-embed-tiktok)\
[![MIT License](https://img.shields.io/github/license/gfscott/eleventy-plugin-embed-tiktok?style=for-the-badge)](https://github.com/gfscott/eleventy-plugin-embed-tiktok/blob/master/LICENSE)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0-ff69b4.svg?style=for-the-badge)](CODE_OF_CONDUCT.md)

This [Eleventy](https://www.11ty.dev/) plugin automatically embeds TikTok videos from URLs in markdown files.

## Install in Eleventy

In your Eleventy project, [install the plugin](https://www.11ty.dev/docs/plugins/#adding-a-plugin) through npm:

```sh
$ npm i eleventy-plugin-embed-tiktok
```

Then add it to your [Eleventy config](https://www.11ty.dev/docs/config/) file (usually `.eleventy.js`):

```javascript
const embedTikTok = require("eleventy-plugin-embed-tiktok");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(embedTikTok);
};
```

## Usage

To embed a TikTok video into any markdown page, paste its URL into a new line. The URL should be the only thing on that line.

### Markdown file example:

```markdown
...

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vehicula, elit vel condimentum porta, purus.

https://www.tiktok.com/@guiltyaesthetic/video/6806676200652655877

Maecenas non velit nibh. Aenean eu justo et odio commodo ornare. In scelerisque sapien at.

...
```

### Result:

![Screenshot of a TikTok video of the last day of high school, 1998](https://user-images.githubusercontent.com/547470/82851157-e6bec380-9ecc-11ea-9a6c-f14b19b33e60.png)

The plugin supports common URL variants as well. These will also work:

```markdown
<!-- No protocol: -->

tiktok.com/@guiltyaesthetic/video/6806676200652655877
www.tiktok.com/@guiltyaesthetic/video/6806676200652655877

<!-- With or without HTTPS: -->

https://www.tiktok.com/@guiltyaesthetic/video/6806676200652655877
http://www.tiktok.com/@guiltyaesthetic/video/6806676200652655877

<!-- With or without 'www': -->

https://www.tiktok.com/@guiltyaesthetic/video/6806676200652655877
https://tiktok.com/@guiltyaesthetic/video/6806676200652655877

<!-- URLs with extra parameters: -->
https://www.tiktok.com/@guiltyaesthetic/video/6806676200652655877?lang=en

```

## Notes and caveats

- This plugin is deliberately designed _only_ to embed when the URL is on its own line, and not inline with other text.
- To do this, it uses a regular expression to recognize TikTok URLs, wrapped in an HTML `<p>` tag. If your Markdown parser produces any other output, it won’t be recognized.
- I’ve tried to accommodate common URL variants, but there are conceivably valid TikTok URLs that wouldn’t get recognized. Please [file an issue](https://github.com/gfscott/eleventy-plugin-embed-tiktok/issues/new) if you run into an edge case!
- This plugin uses [transforms](https://www.11ty.dev/docs/config/#transforms), so it alters Eleventy’s HTML output as it’s generated. It doesn’t alter the source markdown.
- By necessity, this plugin will add a call to TikTok’s third-party JavaScript file. It does this once per page, if that page contains one or more TikTok embeds.
- TikTok’s embed script applies a bunch of styles. For now this plugin uses TikTok’s default styling, which has has max-width of 605 pixels and a min-width of 325 pixels. 

