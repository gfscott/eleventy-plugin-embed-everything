# eleventy-plugin-youtube-embed

[![NPM Version](https://img.shields.io/npm/v/eleventy-plugin-youtube-embed?style=for-the-badge)](https://www.npmjs.com/package/eleventy-plugin-youtube-embed)
[![MIT License](https://img.shields.io/github/license/gfscott/eleventy-plugin-youtube-embed?style=for-the-badge)](https://github.com/gfscott/eleventy-plugin-youtube-embed/blob/master/LICENSE)

This [Eleventy](https://www.11ty.dev/) plugin automatically embeds responsive YouTube videos from URLs in markdown files.

## Install in Eleventy

In your Eleventy project, [install the plugin](https://www.11ty.dev/docs/plugins/#adding-a-plugin) through npm:

```sh
$ npm i eleventy-plugin-youtube-embed
```

Then add it to your [Eleventy config](https://www.11ty.dev/docs/config/) file (usually `.eleventy.js`):

```javascript
const embedYouTube = require("eleventy-plugin-youtube-embed");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(embedYouTube);
};
```

## Usage

To embed a YouTube video into any markdown page, paste its URL into a new line. The URL should be the only thing on that line.

### Markdown file example:

```markdown
...

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vehicula, elit vel condimentum porta, purus.

https://www.youtube.com/watch?v=dQw4w9WgXcQ

Maecenas non velit nibh. Aenean eu justo et odio commodo ornare. In scelerisque sapien at.

...
```

### Result:

![Rick Astley performing “Never gonna give you up”](https://user-images.githubusercontent.com/547470/73130266-2b8c2980-3fc3-11ea-8a8c-7994175a8490.jpg)

The plugin supports common YouTube URL variants as well. These will also work:

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

## Notes and caveats

- This plugin is deliberately designed _only_ to embed videos when the URL is on its own line, and not inline with other text.
- To do this, it uses [a regular expression](https://regex101.com/r/wSkwtj/13) to recognize YouTube video URLs. Currently these are the limitations on what it can recognize in a markdown parser’s HTML output:
  - The URL *must* be wrapped in a paragraph tag: `<p>`
  - It *may* also be wrapped in an anchor tag, (*inside* the paragraph): `<a>`
  - The URL string *may* have whitespace around it
- I’ve tried to accommodate common variants (like short **youtu.be** links, for example), but there are conceivably valid YouTube URLs that wouldn’t get recognized. Please [file an issue](https://github.com/gfscott/eleventy-plugin-youtube-embed/issues/new) if you run into an edge case!
- This plugin uses [transforms](https://www.11ty.dev/docs/config/#transforms), so it alters Eleventy’s HTML output as it’s generated. It doesn’t alter the source markdown.
- Right now it supports only single videos, not playlists.
- The embedded video is responsive, using the [intrinsic aspect ratio](https://codepen.io/gfscott/pen/qpKqZR?editors=1100) method. It will expand to fill whatever horizontal space is available.
- The embed dimensions are currently hard-coded to a 16:9 aspect ratio.
