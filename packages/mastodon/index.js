const merge = require('deepmerge');
const patternGenerator = require("./lib/pattern.js");
const replace = require('./lib/replace.js');
const defaults = require("./lib/defaults.js");

module.exports = function(eleventyConfig, options = {}) {

  const config = merge(defaults, options);

  if (!config.server) {
    throw new Error("[eleventy-plugin-embed-mastodon] You need to configure a Mastodon server URL");
  }

  const pattern = patternGenerator(config.server);

  eleventyConfig.addTransform("embedMastodon", async function(content, outputPath) {

		// Return content untouched if there's no output path or it's not HTML
    if ( !outputPath || !outputPath.endsWith(".html")) {
      return content;
    }

		const {default: asyncReplace} = await import('string-replace-async');

		try {
			/**
			 * 1. Use the spread operator for the replace function parameter
			 *    to get an array with an arbitrary number of capturing groups
			 * 2. Use an anonymous function to immediately pass the full
			 *    matches array to a function that can also accept the embed
			 *    config object. The value returned by this function will
			 *    replace the matched string.
			 */
			return await asyncReplace(content, pattern, (...match) => replace(match, config));
		} catch (error) {
			console.error("[eleventy-plugin-embed-mastodon] Error processing Mastodon embed:", error);
			return content;
		}
  });
};
