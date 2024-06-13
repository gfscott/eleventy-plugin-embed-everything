# Contributing to Embed Everything

Thanks for your interest in contributing to Embed Everything!

## Getting started

### Requirements

- Use [pnpm](https://pnpm.io/) when working with this repo.

### Installation

1. Clone this repo.
1. Install the project dependencies: `pnpm install`.

### Running the demo

The demo is helpful to test the plugin output during the development process.

1. From the project root, run `pnpm dev`.
1. Open http://localhost:8080/ to view the demo.

### Running the tests

1. From the project root, run `pnpm test`.

## Monorepo structure

Embed Everything is a [monorepo](https://monorepo.tools/). Each individual embed provider (like YouTube or Vimeo) gets released as a standalone npm package. Those packages are then bundled together in the `everything` package.

## Anatomy of a plugin

This is the typical structure of each plugin:

```
plugin/
├── README.md
├── index.js
├── lib/
│   ├── defaults.js
│   ├── pattern.js
│   └── replace.js
├── package.json
└── test/
```

File | Description
---|---
`README.md` | The plugin readme. Check out some of the existing plugins to see the basic structure. Should include instructions for installation, usage, available configuration options, and any caveats or gotchas to be aware of.
[`index.js`](#indexjs) | The main package file. This is the file that interacts directly with Eleventy to make the plugin functionality available in someone’s project.
[`lib/defaults.js`](#libdefaultsjs) | Exports a static object containing the plugin's default configuration.
[`lib/pattern.js`](#libpatternjs) | Exports a regular expression used to find and replace the relevant snippets when processing Eleventy templates.
[`lib/replace.js`](#libreplacejs) | Exports a function that procedurally builds the markup required to render an embed.
`package.json` | The usual.
`test/` | Folder to contain test files. Tests are kept in a standalone folder so they can be excluded from the published package, mitigating bloat.

Let's run through the index and library files in detail and explain how they work together.

### `index.js`

The index file's job is to add an [Eleventy transform](https://www.11ty.dev/docs/config/#transforms) that handles the find-replace operation. Transforms operate on Eleventy's output _after_ it's been converted to HTML.

```js
const pattern = require("./lib/pattern.js");
const replace = require('./lib/replace.js');

module.exports = function(eleventyConfig, options = {}) {
	eleventyConfig.addTransform("embedExample", async function(content, outputPath) {
    // If the output file isn't HTML, return the content unaltered
		if ( !outputPath || !outputPath.endsWith(".html")) {
      return content;
    }
		// Run a replace() function on the HTML content. Because the RegEx
		// can return an arbitrary number of match groups, capture them all
		// with the ...spread operator, and pass that array of matches
		// to lib/replace.js.
		return content.replace(pattern, (...match) => replace(match, options));
  });
};
```

### `lib/defaults.js`

The defaults file contains the plugin's unmodified configuration. It's a simple exported object. Users can override these values when initializing the plugin, so pick sensible defaults. My philosophy is: the default behavior should be basically equivalent to what you'd get by manually copy-pasting an embed code from the service's website. Still, judgement calls are often necessary!

```js
module.exports = {
  allowFullscreen: true,
  embedClass: 'arbitrary string-of-css classes',
	isNestingAllowed: {
		yes: true,
		butIsItNeeded: "keep it simple"
	}
};
```

### `lib/pattern.js`

The pattern file exports a regular expression that matches the target HTML produced by Eleventy. The basic pattern is `<p>https://example.com/media-id</p>`, but the [regex golf](https://alf.nu/RegexGolf?world=regex&level=r00) required is usually the most involved part of building these plugins.

```js
module.exports = /<p>(?=(\s*))\1(?:<a [^>]*?>)??(?=(\s*))\2(?:https?:)??(?:\/\/)??(?:w{3}\.)??(?:example\.com\/)(\d{1,20})(?:[^\s<>]*)(?=(\s*))\4(?:<\/a>)??(?=(\s*))\5<\/p>/g
```

That's obviously a bit hard to parse, so below is a detailed breakdown of the pattern's parts, and what they do. The RegEx runs in global mode (`g`) so the `replace()` callback function will run for each match in the HTML file as it's transformed.

RegEx fragment | Details
---|---
`<p>` | Literal opening paragraph tag. All plugins require that URLs be wrapped in a paragraph tag to avoid converting HTML strings that shouldn't be altered.
`(?=(\s*))\1` | A positive-lookahead (`?=`) capturing group of zero or more (`*`) whitespace characters (`\s`). This is Steven Levithan’s technique for [mimicking atomic groups](https://blog.stevenlevithan.com/archives/mimic-atomic-groups), which aren't available in JavaScript regular expression syntax. The pattern accepts arbitrary whitespace at this point, and others, so that it works with non-minified HTML markup.
`(?:<a [^>]*?>)??` | An optional (`??`) non-capturing (`?:`) group to accommodate URLs that get wrapped in anchor tags. Some Markdown parsers automatically convert URLs to clickable anchor tags, while others offer it as a configurable option. Either way, the pattern needs to be resilient to the presence or absence of an anchor tag as part of the HTML output. The anchor tag itself accepts just about anything, except a closing HTML tag (`[^>]`), so it shouldn't care if there are other anchor tag parameters in the markup.
`(?=(\s*))\2` | A second “atomic group” to accommodate arbitrary whitespace characters.
`(?:https?:)??` | A non-capturing optional group for the URL protocol. The `s` is optional so it can be secure `https` or not. The whole fragment is optional so people can leave the protocol off entirely.
`(?:\/\/)??` | A non-capturing optional group for the `//` separator.
`(?:w{3}\.)??` | A non-capturing optional group for `www.` I leave this in place even for services that don't use a `www` subdomain.
`(?:example\.com\/)` | Required non-capturing group for the service's domain name, followed by a slash.
`(\d{1,20})` | In this example a capturing group for a string of digits (`\d`) that can be between 1 and 20 digits long (`{1,20}`). (I think maxing out at 20 makes sense because that would correspond to the length of the maximum 64-bit unsigned integer. But it's always dependent on the URL pattern of the individual service.) Identifying the part of the URL that corresponds to some unique identifier for the embedded media is the trick here. Sometimes this is easy, sometimes not.
`(?:[^\s<>]*)` | A non-capturing group of zero or more characters, excluding whitespace or bracket characters (which shouldn't be counted as part of a valid URL). In this case, this would correspond to additional path values, a set of URL parameters, URL fragments, etc. Note that in some cases there might be good reason to capture additional values from within this string!
`(?=(\s*))\4` | A fourth “atomic group” to accommodate arbitrary whitespace characters. Note that the number here skips however many capturing groups were added following group `\2` above. In this example, that third capturing group was the ID value (`(\d{1,20})`).
`(?:<\/a>)??` | Optional closing anchor tag.
`(?=(\s*))\5` | Fifth and final “atomic group” to accommodate arbitrary whitespace.
`<\/p>` | Literal closing paragraph tag.

> [!NOTE]
> I'm _very much aware_ that parsing HTML with RegEx is a [Bad Idea](https://blog.codinghorror.com/parsing-html-the-cthulhu-way/)™ but honestly, it's too late now, this is what I built back in the day and it's worked for a great many end users for years now. But I would _gladly_ discuss proposals on how to refactor the plugins in a way that preserves their existing functionality and user experience.

### `lib/replace.js`

The `replace.js` file accepts the pattern matches passed through by `index.js` and uses the relevant data to return the embed markup. It also accepts any configuration options passed by the user and uses them while constructing the output.

```js
// The deepmerge library is basically Object.assign, but works with nested objects.
const merge = require('deepmerge');
const defaults = require('./defaults.js');

module.exports = function(match, options) {
  // Recall that the unique ID in pattern.js was the third RegEx capturing group!
	const id = match[3]
	// If there are any user-configured options, override the defaults.
	const config = merge(defaults, options)

	// Build up an embed HTML string using extracted values, defaults, and user options.
  let embed = `<div id="${id}" class="${config.embedClass}">`;
  embed += `<iframe src="https://embed.example.com/${id}" frameborder="0">`;
  embed += '</iframe></div>';

	// The string returned from this function is what replaces the
	// matched strings found in Eleventy's HTML output.
	return embed;
}
```

The devil’s in the details, but those are the basics. The hardest part is almost always defining the regular expression. I’ve learned a ton about RegEx by working on this project, and I bet you can too.

## Supported versions

### Node.js

The intent is to support [**Active LTS** Node.js releases](https://github.com/nodejs/release). In other words: we test against even-numbered releases, either in “Active” or “Maintenance” phase. In general, we should try to stay in sync with what Eleventy itself supports.

In practice, what these plugins do isn't that complicated, and most of them *probably* still work on pretty old Node.js versions. But no guarantees, sorry.

### Web platform

Currently, those plugins that need it use the [padding-top hack](https://alistapart.com/article/creating-intrinsic-ratios-for-video/) to handle responsive aspect ratios. We *could* switch to CSS `aspect-ratio`, but since in most cases the user can override the CSS, I’m fine sticking with an old-fashioned but thoroughly battle-tested solution.

In general I think it’s just better for static site generators to be pretty conservative with their HTML output, because those static files may hang around unchanged for quite a long time. Swift technology adoption is simply not a goal of this project.
