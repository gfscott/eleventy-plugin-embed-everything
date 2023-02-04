const merge = require("deepmerge");
const spotPattern = require("./lib/spotPattern.js");
const extractMatch = require("./lib/extractMatch.js");
const buildEmbed = require("./lib/buildEmbed.js");
const pluginDefaults = require("./lib/pluginDefaults.js");

module.exports = async function(eleventyConfig, options) {
	const pluginConfig = options ? merge(pluginDefaults, options) : pluginDefaults;
	eleventyConfig.addTransform(
		"embedTwitter",
		async (content, outputPath) => {
			if (outputPath && outputPath.endsWith(".html")) {
				let matches = spotPattern(content);
				if (!matches) {
					return content;
				}
				// 1. must use for...of to enable await
				// 2. must destructure and use entries() to get index in for...of
				// SOURCE: https://flaviocopes.com/how-to-get-index-in-for-of-loop/
				for (const [index, stringToReplace] of matches.entries()) {
					let media = extractMatch(stringToReplace);
					let embedCode = await buildEmbed(media, pluginConfig, index);
					content = content.replace(stringToReplace, embedCode);
				}
				return content;
			}
			return content;
		},
	);
};
