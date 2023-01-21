// Needs to be in global context to be accessed by module
global.instagram = require("eleventy-plugin-embed-instagram");
global.soundcloud = require("eleventy-plugin-embed-soundcloud");
global.spotify = require("eleventy-plugin-embed-spotify");
global.tiktok = require("eleventy-plugin-embed-tiktok");
global.twitch = require("eleventy-plugin-embed-twitch");
global.twitter = require("eleventy-plugin-embed-twitter");
global.vimeo = require("eleventy-plugin-vimeo-embed");
global.youtube = require("eleventy-plugin-youtube-embed");

const configOptions = require("./lib/configOptions.js");

module.exports = function(eleventyConfig, options = {}) {
	let config = configOptions(options);
	for (const pluginHandle of config.activePlugins) {
		eleventyConfig.addPlugin(
			global[pluginHandle],
			config.activePluginOptions[pluginHandle].options,
		);
	}
};
