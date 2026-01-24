const pattern = require("./lib/pattern.js");
const _replace = require("./lib/replace.js");
const defaults = require("./lib/defaults.js");

module.exports = function (eleventyConfig, options = {}) {
	const config = Object.assign({}, defaults, options);

	eleventyConfig.addTransform(
		"embedSoundCloud",
		async function (content, outputPath) {
			// Return content untouched if there's no output path or it's not HTML
			if (!outputPath || !outputPath.endsWith(".html")) {
				return content;
			}

			const {default: asyncReplace} = await import('string-replace-async');

			try {
				return await asyncReplace(content, pattern, (...match) => _replace(match, config));
			} catch (error) {
				console.warn("Error processing SoundCloud embeds:", error);
				return content;
			}
		},
	);
};
