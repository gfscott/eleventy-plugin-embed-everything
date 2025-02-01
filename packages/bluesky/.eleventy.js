const merge = require("deepmerge");
const spotPattern = require("./lib/spotPattern.js");
const extractMatch = require("./lib/extractMatch.js");
const buildEmbed = require("./lib/buildEmbed.js");
const pluginDefaults = require("./lib/pluginDefaults.js");

module.exports = function (eleventyConfig, options) {
	const pluginConfig = options ? merge(pluginDefaults, options) : pluginDefaults;

	eleventyConfig.addTransform("blueskyEmbed", async function (content, outputPath) {
		if (!outputPath?.endsWith(".html")) return content;

		try {
			// First split by code blocks
			const parts = content.split(/```[^`]*```/);

			// Process each non-code-block part
			for (let i = 0; i < parts.length; i += 2) {
				// Find all matches in this part
				const matches = spotPattern(parts[i]);
				if (!matches) continue;

				// Track number of embeds if maxEmbeds is set
				let embedCount = 0;

				// Process each match
				for (const match of matches) {
					// Skip if we've hit the max embeds limit
					if (pluginConfig.maxEmbeds > 0 && embedCount >= pluginConfig.maxEmbeds) break;

					// Extract post details
					const post = extractMatch(match);
					if (!post) continue;

					// Build embed HTML
					const embedHtml = await buildEmbed(post, pluginConfig);
					if (embedHtml) {
						parts[i] = parts[i].replace(match, embedHtml);
						embedCount++;
					}
				}
			}

			return parts.join("");
		} catch (error) {
			console.warn("Error processing Bluesky embeds:", error);
			return content;
		}
	});
};
