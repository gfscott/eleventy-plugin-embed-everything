# eleventy-plugin-youtube-embed

This [Eleventy](https://www.11ty.dev/) plugin automatically embeds YouTube videos from URLs in markdown files.

## Install in Eleventy

In your Eleventy project, install the plugin through npm:

```sh
$ npm i eleventy-plugin-youtube-embed
```

Then add it to your Eleventy config file (usually `.eleventy.js`):

```javascript
const embedYouTube = require("eleventy-plugin-youtube-embed");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(embedYouTube);
};
```

## Usage

To embed a YouTube video into any markdown page, paste its URL into a new line. The URL should be the only thing on the line.

```markdown
...

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vehicula, elit vel condimentum porta, purus.

https://www.youtube.com/watch?v=dQw4w9WgXcQ

Maecenas non velit nibh. Aenean eu justo et odio commodo ornare. In scelerisque sapien at.

...
```

The plugin supports common variants as well. These will also work:

```markdown
<!-- No protocol: -->

youtube.com/watch?v=dQw4w9WgXcQ

<!-- With or without HTTPS: -->

http://www.youtube.com/watch?v=dQw4w9WgXcQ
https://www.youtube.com/watch?v=dQw4w9WgXcQ

<!-- With or without 'www': -->

https://www.youtube.com/watch?v=dQw4w9WgXcQ
https://youtube.com/watch?v=dQw4w9WgXcQ

<!-- YouTu.be short-links: -->

https://youtu.be/LQaehcfXvK0

<!-- URLs with extra parameters: -->

https://www.youtube.com/watch?v=LQaehcfXvK0&feature=youtu.be
```

## Notes and caveats

- It’s deliberately designed only to embed videos when the URL is on its own line, and not inline with other text.
- To do this, it uses a regular expression to recognize YouTube video URLs, wrapped in an HTML `<p>` tag. If your Markdown parser produces any other output, it won’t be recognized.
- I’ve tried to [accommodate common variants](https://regex101.com/r/wSkwtj/2) (like short youtu.be links, for example), but there are conceivably valid YouTube URLs that wouldn’t get recognized. Please file an issue if you run into an edge case!
- This plugin uses [transforms](https://www.11ty.dev/docs/config/#transforms), so it alters Eleventy’s HTML output as it’s generated. It doesn’t alter the source markdown.
- Right now it supports only single videos, not playlists.
- Dimensions are currently hard-coded to a 16:9 aspect ratio.
