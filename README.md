# eleventy-plugin-embed-twitter

[![NPM Version](https://img.shields.io/npm/v/eleventy-plugin-embed-twitter?style=for-the-badge)](https://www.npmjs.com/package/eleventy-plugin-embed-twitter)
[![Build Status](https://img.shields.io/travis/gfscott/eleventy-plugin-embed-twitter?style=for-the-badge)](https://travis-ci.org/github/gfscott/eleventy-plugin-embed-twitter)
[![codecov](https://img.shields.io/codecov/c/github/gfscott/eleventy-plugin-embed-twitter?style=for-the-badge)](https://codecov.io/gh/gfscott/eleventy-plugin-embed-twitter)\
[![MIT License](https://img.shields.io/github/license/gfscott/eleventy-plugin-embed-twitter?style=for-the-badge)](https://github.com/gfscott/eleventy-plugin-embed-twitter/blob/master/LICENSE)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0-ff69b4.svg?style=for-the-badge)](CODE_OF_CONDUCT.md)

This [Eleventy](https://www.11ty.dev/) plugin automatically embeds Tweets from URLs in markdown files.

## Install in Eleventy

In your Eleventy project, [install the plugin](https://www.11ty.dev/docs/plugins/#adding-a-plugin) through npm:

```sh
$ npm i eleventy-plugin-embed-twitter
```

Then add it to your [Eleventy config](https://www.11ty.dev/docs/config/) file (usually `.eleventy.js`):

```javascript
const embedTwitter = require("eleventy-plugin-embed-twitter");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(embedTwitter);
};
```

## Usage

To embed a Tweet into any markdown page, paste its URL into a new line. The URL should be the only thing on that line.

### Markdown file example:

```markdown
...

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vehicula, elit vel condimentum porta, purus.

https://twitter.com/SaraSoueidan/status/1289865845053652994s

Maecenas non velit nibh. Aenean eu justo et odio commodo ornare. In scelerisque sapien at.

...
```

### Result:

![Tweet by Sara Soueidan: “I've been increasingly feeling like Grid or Flex has become the new Tabs or Spaces.”](https://user-images.githubusercontent.com/547470/91612120-bb73c680-e94a-11ea-9f56-cb7a1ee50e90.png)

## Configure

See [lib/pluginDefaults.js](lib/pluginDefaults.js) to see the plugin’s configurable settings. Pass an options object to the plugin to override any of its default settings.

By default, the plugin does _not_ save the text of the Tweet as plain HTML. That’s because doing so requires making a network request to Twitter. In general we minimize such calls unless you decide to enable them. To save the complete Tweet text when processing files in Eleventy, turn on the `cacheText` option:

```js
eleventyConfig.addPlugin(embedTwitter, {
	cacheText: true,
});
```

Be aware, activating `cacheText` will cause a network request to Twitter on every save. If the plugin experiences any network failure (such as if you're not connected to the internet), then it simply won’t complete the embed and the URL will be rendered as plain text.

## Notes and caveats

- This plugin is deliberately designed _only_ to embed when the URL is on its own line, and not inline with other text.
- To do this, it uses a regular expression to recognize Twitter URLs, wrapped in an HTML `<p>` tag or, optionally, additionally wrapped in an anchor tag. If your Markdown parser produces any other output, it won’t be recognized.
- The plugin supports common URL variants as well. Check the [supported URL variants](test/inc/validStrings.js) to see the complete list, but there are conceivably valid Twitter URLs that wouldn’t be recognized. Please [file an issue](https://github.com/gfscott/eleventy-plugin-embed-twitter/issues/new) if you run into an edge case!
- This plugin uses [transforms](https://www.11ty.dev/docs/config/#transforms), so it alters Eleventy’s HTML output as it’s generated. It doesn’t alter the source markdown.
- By necessity, this plugin will add a call to Twitter’s third-party JavaScript file. It does this once per page, if that page contains a Twitter embed.
- Currently the plugin supports only individual Tweets. Embedding timelines, lists, or Twitter Moments isn’t possible right now.
