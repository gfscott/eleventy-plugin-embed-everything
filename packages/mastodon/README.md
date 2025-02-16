# eleventy-plugin-embed-mastodon

[![NPM Version](https://img.shields.io/npm/v/eleventy-plugin-embed-mastodon?style=for-the-badge)](https://www.npmjs.com/package/eleventy-plugin-embed-mastodon)
[![Build test status](https://img.shields.io/github/actions/workflow/status/gfscott/eleventy-plugin-embed-everything/test.yml?branch=main&style=for-the-badge)](https://github.com/gfscott/eleventy-plugin-embed-everything/actions/workflows/test.yml?query=branch%3Amain)\
[![MIT License](https://img.shields.io/github/license/gfscott/eleventy-plugin-embed-everything?style=for-the-badge)](https://github.com/gfscott/eleventy-plugin-embed-everything/blob/main/LICENSE)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0-ff69b4.svg?style=for-the-badge)](https://github.com/gfscott/eleventy-plugin-embed-everything/blob/main/CODE_OF_CONDUCT.md)

This [Eleventy](https://www.11ty.dev/) plugin automatically embeds Mastodon posts from URLs in markdown files. It’s part of the [`eleventy-plugin-embed-everything`](https://gfscott.com/embed-everything/) project.

## Install in Eleventy

In your Eleventy project, [install the plugin](https://www.11ty.dev/docs/plugins/#adding-a-plugin) through npm:

```sh
$ npm i eleventy-plugin-embed-mastodon
```

Then add it to your [Eleventy config](https://www.11ty.dev/docs/config/) file (usually `.eleventy.js`):

```javascript
const embedMastodon = require("eleventy-plugin-embed-mastodon");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(embedMastodon, {
		// Required setting:
		server: "your-mastodon-instance-hostname.net",
	});
};
```

Due to Mastodon’s decentralized nature, the plugin requires you to configure a `server` in order to work. This value should be the *hostname* of **the Mastodon instance you log into**. Some common examples are `mastodon.social`, `pixelfed.social`, or `social.vivaldi.net`, but there are thousands of Mastodon servers online.

For the value of `server`, only include the domain's hostname. Don't include the protocol (`https://` or `http://`), a trailing slash, or any other part of your Mastodon instance's URL.

## Usage

To embed a Mastodon post into any markdown page, paste its URL into a new line. The URL should be the only thing on that line.

The plugin will recognize statuses posted on your home Mastodon instance, as well as posts federated to your instance from other Mastodon servers.

### Markdown file example:

```markdown
...

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vehicula, elit vel condimentum porta, purus.

https://social.vivaldi.net/@eleventy@fosstodon.org/113198584572922516

Maecenas non velit nibh. Aenean eu justo et odio commodo ornare. In scelerisque sapien at.

...
```

### Result:

![Screenshot of 11ty Mastodon post about not being WordPress](https://github.com/user-attachments/assets/6ab7fcb4-ab55-4992-990d-05eb025c8388)

## Settings

You can configure the plugin to change its behavior by passing an options object to the `addPlugin` function:

```javascript
eleventyConfig.addPlugin(embedMastodon, {
  // just an example, see default values below:
  embedClass: 'custom-classname'
});
```

### Plugin default options

The plugin’s default settings reside in [lib/defaults.js](lib/defaults.js). All of these values can be customized with an options object passed to the plugin.

Option | Type | Default | Notes
---|---|---|---
`server` <br><span style="background-color: crimson; color: white">Required</span> | String | `undefined` | Hostname of the Mastodon server you log into to view your timeline. The plugin will recognize Mastodon URLs based on this value, and query this server for required information about federated posts from other Mastodon instances.
`embedClass` | String | `"eleventy-plugin-embed-mastodon"` | CSS class applied to the container `<div>` that wraps the embedded video.

## Notes and caveats

- 📞 Due to Mastodon's distributed architecture, this plugin must make up to two network requests to retrieve the relevant embed data. Be aware that using this plugin **will** cause network requests during Eleventy’s build process. If the plugin experiences any network failure (such as if you're not connected to the internet), then it simply won’t complete the embed and the URL will be rendered as plain text.
- This plugin is deliberately designed _only_ to embed when the URL is on its own line, and not inline with other text.
- To do this, it uses a regular expression to recognize URLs for your selected Mastodon instance, wrapped in an HTML `<p>` tag. If your Markdown parser produces any other output, it won’t be recognized.
- I’ve tried to accommodate common URL variants, but there are conceivably valid URLs that wouldn’t get recognized. Please [file an issue](https://github.com/gfscott/eleventy-plugin-embed-everything/issues/new) if you run into an edge case!
- This plugin uses [transforms](https://www.11ty.dev/docs/config/#transforms), so it alters Eleventy’s HTML output as it’s generated. It doesn’t alter the source markdown.
