# eleventy-plugin-embed-openstreetmap

[![NPM Version](https://img.shields.io/npm/v/eleventy-plugin-embed-openstreetmap?style=for-the-badge)](https://www.npmjs.com/package/eleventy-plugin-embed-openstreetmap)
[![Build test status](https://img.shields.io/github/actions/workflow/status/gfscott/eleventy-plugin-embed-everything/test.yml?branch=main&style=for-the-badge)](https://github.com/gfscott/eleventy-plugin-embed-everything/actions/workflows/test.yml?query=branch%3Amain)\
[![MIT License](https://img.shields.io/github/license/gfscott/eleventy-plugin-embed-everything?style=for-the-badge)](https://github.com/gfscott/eleventy-plugin-embed-everything/blob/main/LICENSE)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0-ff69b4.svg?style=for-the-badge)](https://github.com/gfscott/eleventy-plugin-embed-everything/blob/main/CODE_OF_CONDUCT.md)

This [Eleventy](https://www.11ty.dev/) plugin automatically embeds OpenStreetMap maps from URLs in markdown files. It’s part of the [`eleventy-plugin-embed-everything`](https://gfscott.com/embed-everything/) project.

## Install in Eleventy

In your Eleventy project, [install the plugin](https://www.11ty.dev/docs/plugins/#adding-a-plugin) through npm:

```sh
$ npm i eleventy-plugin-embed-openstreetmap
```

Then add it to your [Eleventy config](https://www.11ty.dev/docs/config/) file (usually `.eleventy.js`):

```javascript
const embedOSM = require("eleventy-plugin-embed-openstreetmap");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(embedOSM);
};
```

## Usage

To place an OpenStreetMap embed into any markdown page, paste its URL into a new line. The URL should be the only thing on that line.

### Markdown file example:

```markdown
...

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vehicula, elit vel condimentum porta, purus.

https://www.openstreetmap.org/#map=13/-27.1386/-109.3388

Maecenas non velit nibh. Aenean eu justo et odio commodo ornare. In scelerisque sapien at.

...
```

### Result:

![Screenshot of OpenStreetMap view of Easter Island](https://github.com/gfscott/eleventy-plugin-embed-everything/assets/547470/0d88730a-78bf-4652-9a74-6822420d6459)


## Settings

You can configure the plugin to change its behavior by passing an options object to the `addPlugin` function:

```javascript
eleventyConfig.addPlugin(embedOSM, {
  // just an example, see default values below:
  embedClass: 'custom-classname'
});
```

### Plugin default options

The plugin’s default settings reside in [lib/defaults.js](lib/defaults.js). All of these values can be customized with an options object passed to the plugin.

Option | Type | Default | Notes
---|---|---|---
`embedClass` | String | `"eleventy-plugin-embed-openstreetmap"` | CSS class applied to the container `<div>` that wraps the embedded map.
`layer` | String | `mapnik` | Selected [tile layer](https://wiki.openstreetmap.org/wiki/Featured_tile_layers) style applied to the map.
`wrapperStyle` | String | `aspect-ratio: 16/9` | Inline CSS `style` parameter applied to the container `div`.

## Notes and caveats

- This plugin is deliberately designed _only_ to embed when the URL is on its own line, and not inline with other text.
- To do this, it uses a regular expression to recognize OpenStreetMap URLs, wrapped in an HTML `<p>` tag. If your Markdown parser produces any other output, it won’t be recognized.
- I’ve tried to accommodate common URL variants, but there are conceivably valid OSM URLs that wouldn’t get recognized. Please [file an issue](https://github.com/gfscott/eleventy-plugin-embed-everything/issues/new) if you run into an edge case!
- This plugin uses [transforms](https://www.11ty.dev/docs/config/#transforms), so it alters Eleventy’s HTML output as it’s generated. It doesn’t alter the source markdown.
