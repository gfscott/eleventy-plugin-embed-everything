# eleventy-plugin-embed-bluesky

This [Eleventy](https://www.11ty.dev/) plugin automatically embeds Bluesky posts from URLs in markdown files. It's part of the [`eleventy-plugin-embed-everything`](https://gfscott.com/embed-everything/) project.

## Install in Eleventy

In your Eleventy project, [install the plugin](https://www.11ty.dev/docs/plugins/#adding-a-plugin) through npm:

```sh
$ npm i eleventy-plugin-embed-bluesky
```

Then add it to your [Eleventy config](https://www.11ty.dev/docs/config/) file (usually `.eleventy.js`):

```javascript
const embedBluesky = require("eleventy-plugin-embed-bluesky");

module.exports = function (eleventyConfig) {
	eleventyConfig.addPlugin(embedBluesky);
};
```

## Usage

To embed a Bluesky post into any markdown page, paste its URL into a new line. The URL should be the only thing on that line.

### Markdown file example:

```markdown
...

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vehicula, elit vel condimentum porta, purus.

https://bsky.app/profile/shellen.com/post/3ldmp5qd6es2p

Maecenas non velit nibh. Aenean eu justo et odio commodo ornare. In scelerisque sapien at.

...
```

### Result:

![Bluesky embed from @shellen.com reading “We never should have let that sink in”](https://github.com/user-attachments/assets/07ec869b-80dc-4e34-9b28-33b8d90cbef9)

## Settings

You can configure the plugin to change its behavior by passing an options object to the `addPlugin` function:

```javascript
eleventyConfig.addPlugin(embedBluesky, {
	// just an example, see default values below:
	embedClass: "custom-classname",
});
```

### Plugin default options

The plugin's default settings reside in [lib/defaults.js](lib/defaults.js). All of these values can be customized with an options object passed to the plugin.

Option | Type | Default | Notes
---|---|---|---
`cacheDuration` | String | `60m` | How long to cache Bluesky API data. Use the [Eleventy Fetch syntax](https://www.11ty.dev/docs/plugins/fetch/#change-the-cache-duration) to set the duration.
`embedClass` | String  | `eleventy-plugin-embed-bluesky` | CSS class applied to the container `<div>` that wraps the embedded post.

### Supported URL patterns

The plugin supports common URL variants as well. These will all work:

```markdown
<!-- No protocol: -->

bsky.app/profile/bsky.app/post/3lgu4lg6j2k2v

<!-- With custom domains: -->

https://bsky.app/profile/shellen.com/post/3ldmp5qd6es2p

<!-- With DID: -->

https://bsky.app/profile/did:plc:yc6gmb3bo56qotdsywnsxrxp/post/3lgvpv7k5sc26

<!-- With query parameters: -->

https://bsky.app/profile/bsky.app/post/3lgu4lg6j2k2v?foo=bar
```

## Notes and caveats

- 📞 Due to Bluesky's distributed architecture, this plugin must make network requests at build time to retrieve the relevant embed data, which is cached locally. If the plugin experiences any network failure (such as if you're not connected to the internet), then it simply won’t complete the embed and the URL will be rendered as plain text.
- This plugin is deliberately designed _only_ to embed when the URL is on its own line, and not inline with other text.
- To do this, it uses a regular expression to recognize Bluesky URLs, wrapped in an HTML `<p>` tag. If your Markdown parser produces any other output, it won't be recognized.
- The plugin supports both standard handles (e.g., `bsky.app`) and DID-based handles (e.g., `did:plc:yc6gmb3bo56qotdsywnsxrxp`).
- Post IDs must be at least 10 characters long and can contain letters and numbers.
- This plugin uses [transforms](https://www.11ty.dev/docs/config/#transforms), so it alters Eleventy's HTML output as it's generated. It doesn't alter the source markdown.

## Credits

- Bluesky package created by [@shellen](https://github.com/shellen)
- Part of [eleventy-plugin-embed-everything](https://github.com/gfscott/eleventy-plugin-embed-everything) by [@gfscott](https://github.com/gfscott)

## License

MIT
