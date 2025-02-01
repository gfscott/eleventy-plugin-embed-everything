# eleventy-plugin-embed-bluesky

Embed [Bluesky](https://bsky.app) posts in your Eleventy site.

Part of [eleventy-plugin-embed-everything](https://github.com/gfscott/eleventy-plugin-embed-everything), a suite of plugins for rich media embeds in Eleventy.

## Install

```sh
npm install @11ty/eleventy @gfscott/eleventy-plugin-embed-bluesky
```

## Usage

In your Eleventy config file:

```js
const embedBluesky = require("@gfscott/eleventy-plugin-embed-bluesky");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(embedBluesky);
};
```

Then use it in your templates:

```html
This is my first Bluesky post!

https://bsky.app/profile/shellen.com/post/3ldmp5qd6es2p

More content...
```

The plugin will automatically transform any valid Bluesky post URL into an embedded post.

## Supported URL formats

The plugin supports various Bluesky URL formats:

- Standard URLs: `https://bsky.app/profile/bsky.app/post/3lgu4lg6j2k2v`
- Custom domain handles: `https://bsky.app/profile/shellen.com/post/3ldmp5qd6es2p`
- DID handles: `https://bsky.app/profile/did:plc:yc6gmb3bo56qotdsywnsxrxp/post/3lgvpv7k5sc26`
- bsky.social handles: `https://bsky.app/profile/user.bsky.social/post/3lgzl25gr2c2k`

URLs can be with or without protocol and with or without trailing slashes.

## Options

You can pass an options object to customize the plugin's behavior:

```js
eleventyConfig.addPlugin(embedBluesky, {
  // Set a custom embed height (default: 300)
  height: 500,
});
```

## Credits

- Created by [@shellen](https://github.com/shellen)
- Part of [eleventy-plugin-embed-everything](https://github.com/gfscott/eleventy-plugin-embed-everything) by [@gfscott](https://github.com/gfscott)

## License

MIT
