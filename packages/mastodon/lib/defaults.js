/**
 * Default options for the Mastodon embed plugin.
 * @param {string} [embedClass='eleventy-plugin-embed-mastodon'] - The class name to use for the embed wrapper.
 * @param {number|null} [maxHeight=null] - The maximum height of the embed iframe. Default is null. (Matches the Mastodon oembed default.)
 * @param {number} [maxWidth=400] - The maximum width of the embed iframe. Default is 400. (Matches the Mastodon oembed default.)
 * @param {string} server - The Mastodon server URL to use for the embed. Required.
 * @see https://docs.joinmastodon.org/methods/oembed/
 */
module.exports = {
	embedClass: "eleventy-plugin-embed-mastodon",
	maxHeight: null,
	maxWidth: 400,
	server: undefined,
};
