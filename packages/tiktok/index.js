const merge = require("deepmerge");
const defaults = require("./lib/defaults.js");
const pattern = require("./lib/pattern.js");
const _replace = require("./lib/replace.js");

module.exports = function (eleventyConfig, options) {

	const config = merge(defaults, options);

	eleventyConfig.addTransform("embedTiktok", function(content, outputPath) {
		if ( !outputPath || !outputPath.endsWith(".html") ) {	return content }
		try {
			let index = 0;
			return content.replace(pattern, (...match) => _replace(match, config, index++));
		} catch (error) {
			console.error("[eleventy-plugin-embed-tiktok] Error processing Tiktok embed:", error);
			return content;
		}
	});
};
