const Fetch = require("@11ty/eleventy-fetch");
const { env } = require('node:process');

module.exports = async function(match, config) {
	try {
		if (!match || !match[0]) {
			return "";
		}

		// Extract handle and post ID from the match array
		// match[1] is the handle
		// match[2] is the post ID
		const handle = match[1];
		const postId = match[2];

		if (!handle || !postId) {
			return match[0];
		}

		const postUrl = `https://bsky.app/profile/${handle}/post/${postId}`;
		const html = await _getPostOembed(postUrl, config.cacheDuration);

		// Return the oEmbed HTML
		return `<div class="${config.embedClass}">${html}</div>`;

	} catch (error) {
		console.warn("Error creating Bluesky embed:", error);
		return match[0] || "";
	}
};

/**
 * Query Bluesky for oembed data.
 * @param {string} url - Bluesky post URL.
 * @param {string} [cacheDuration="60m"] - Cache duration for the fetch.
 * @returns {Promise<string|null>} - HTML to embed the status.
 * @see https://embed.bsky.app/oembed
 */
async function _getPostOembed(url, cacheDuration = "60m") {
	if(!url) {
		console.error("Missing URL.");
		return null;
	}

	let oembedUrl = `https://embed.bsky.app/oembed?url=${url}`;

	try {
		const {html} = await Fetch(oembedUrl, {
			duration: cacheDuration,
			type: "json",
			verbose: env.DEBUG,
		});
		return html;
	} catch (error) {
		console.error("Error fetching post data from Bluesky", error);
		return null;
	}
}

module.exports._getPostOembed = _getPostOembed;
