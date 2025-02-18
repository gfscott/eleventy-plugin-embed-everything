const Fetch = require("@11ty/eleventy-fetch");
const { env } = require('node:process');

module.exports = async function(match, config) {
	const { hostname, id, server, url } = match.at(-1);

	/**
	 * If there's a server value in the matched URL...
	 * ...Then this is a Federated status, and we have to query the
	 * 		federated server for the original status URL.
	 * ...Otherwise, this is *not* a Federated status, and we can query
	 * 		the oEmbed directly.
	 */
	const originStatusUrl = server
		? await _getFederatedStatus(hostname, id, config.cacheDuration)
		: `https://${url}`;

	/** If _getFederatedStatus returned null due to 404, bail out and return the match unchanged */
	if (!originStatusUrl) {
		return match[0];
	}

	/** Get the hostname of the origin server */
	const {hostname: originHostname} = new URL(originStatusUrl);

	/** Query the originating server for its oEmbed data */
	const oembedHtml = await _getOriginOembed(originHostname, originStatusUrl, config.cacheDuration);

	/** If getting the oEmbed failed, just return the original match unchanged */
	if (!oembedHtml) {
		return match[0];
	}

	return `<div class="${config.embedClass}">${oembedHtml}</div>`;
}


/**
 * Query the 11ty user's Mastodon instance about a status.
 * @param {string} hostname - Hostname of the Mastodon instance to query about the status.
 * @param {string} id - Status ID.
 * @returns {string|null} - URL of the status.
 * @see https://docs.joinmastodon.org/methods/statuses/#get
 */
async function _getFederatedStatus(hostname, id, cacheDuration) {
	if (!hostname || !id) {
		console.error("Missing Mastodon instance or status ID.");
		return null;
	}
	const federatedStatusQuery = `https://${hostname}/api/v1/statuses/${id}`;
	try {
		const {url} = await Fetch(federatedStatusQuery, {
			duration: cacheDuration,
			type: "json",
			verbose: env.DEBUG,
		});
		return url;
	} catch (error) {
		console.error(error);
		return null;
	}
}

/**
 * Query the originating Mastodon server for oembed data.
 * @param {string} hostname - Hostname of the originating Mastodon server.
 * @param {string} url - URL of the status on the originating Mastodon server.
 * @param {object} config - Configuration object for the Mastodon embed.
 * @returns {string|null} - HTML to embed the status.
 * @see https://docs.joinmastodon.org/methods/oembed/
 */
async function _getOriginOembed(hostname, url, cacheDuration) {
	if(!hostname || !url) {
		console.error("Missing hostname or URL.");
		return null;
	}

	let oembedUrl = `https://${hostname}/api/oembed?url=${url}`;

	try {
		const {html} = await Fetch(oembedUrl, {
			duration: cacheDuration,
			type: "json",
			verbose: env.DEBUG,
		});
		return html;
	} catch (error) {
		console.error(error);
		return null;
	}
}

module.exports._getFederatedStatus = _getFederatedStatus;
module.exports._getOriginOembed = _getOriginOembed;
