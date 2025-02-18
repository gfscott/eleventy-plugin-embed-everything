/**
 * Default options for the Mastodon embed plugin.
 * @param {string} [cacheDuration='60m'] - How long to cache the embed HTML.
 * @param {string} [embedClass='eleventy-plugin-embed-mastodon'] - The class name to use for the embed wrapper.
 * @param {string} server - The Mastodon server URL to use for the embed. Required.
 * @see https://docs.joinmastodon.org/methods/oembed/
 */
module.exports = {
	cacheDuration: "60m",
	embedClass: "eleventy-plugin-embed-mastodon",
	/**
	 * Not implementing width/height right now because Mastodon's
	 * oEmbed endpoint doesn't actually update the returned HTML values.
	 * These parameters are specified in the Mastodon oEmbed API reference,
	 * but have no effect in practice (as far as I can tell).
	 */
	// maxHeight: null,
	// maxWidth: 400,
	server: undefined,
};
