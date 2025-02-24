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

## Settings

You can configure the plugin to change its behavior by passing an options object to the `addPlugin` function:

```javascript
eleventyConfig.addPlugin(embedBluesky, {
	// just an example, see default values below:
	embedClass: "custom-classname",
	embedDomain: "staging.bsky.app",
});
```

### Plugin default options

The plugin's default settings reside in [lib/defaults.js](lib/defaults.js). All of these values can be customized with an options object passed to the plugin.

| Option              | Type    | Default                                                 | Notes                                                                                                                |
| ------------------- | ------- | ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `allowFullscreen`   | Boolean | `true`                                                  | Set to false to prevent the embedded post from being viewed in fullscreen mode.                                      |
| `containerCss`      | String  | `"position: relative; width: 100%; padding-bottom: 0;"` | CSS applied to the container `<div>` that wraps the embedded post.                                                   |
| `embedClass`        | String  | `"eleventy-plugin-embed-bluesky"`                       | CSS class applied to the container `<div>` that wraps the embedded post.                                             |
| `iframeCss`         | String  | `"border: 0; position: relative; width: 100%;"`         | CSS applied to the `<iframe>` that contains the embedded post.                                                       |
| `iframeFrameborder` | String  | `"0"`                                                   | Width of the `iframe`'s border in pixels.                                                                            |
| `iframeHeight`      | String  | `"300"`                                                 | Height of the `iframe`.                                                                                              |
| `iframeScrolling`   | String  | `"no"`                                                  | Whether the `iframe` should have scrollbars.                                                                         |
| `iframeWidth`       | String  | `"550"`                                                 | Width of the `iframe`.                                                                                               |
| `embedDomain`       | String  | `"bsky.app"`                                            | Domain to use for embeds. Can be set to `staging.bsky.app` for staging or a custom domain for self-hosted instances. |

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

- This plugin is deliberately designed _only_ to embed when the URL is on its own line, and not inline with other text.
- To do this, it uses a regular expression to recognize Bluesky URLs, wrapped in an HTML `<p>` tag. If your Markdown parser produces any other output, it won't be recognized.
- The plugin supports both standard handles (e.g., `bsky.app`) and DID-based handles (e.g., `did:plc:yc6gmb3bo56qotdsywnsxrxp`).
- Post IDs must be at least 10 characters long and can contain letters and numbers.
- You can use the `embedDomain` option to embed posts from a staging environment or a self-hosted Bluesky instance. The custom domain must implement the Bluesky embed endpoint at `/profile/:handle/post/:id/embed`.
- This plugin uses [transforms](https://www.11ty.dev/docs/config/#transforms), so it alters Eleventy's HTML output as it's generated. It doesn't alter the source markdown.

## Credits

- Bluesky package created by [@shellen](https://github.com/shellen)
- Part of [eleventy-plugin-embed-everything](https://github.com/gfscott/eleventy-plugin-embed-everything) by [@gfscott](https://github.com/gfscott)

## License

MIT
