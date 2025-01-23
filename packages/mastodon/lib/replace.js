const Fetch = require("@11ty/eleventy-fetch");

module.exports = async function(match, config) {
	const { hostname, id, server, url } = match.at(-1);
	// If there's a server, it's federated and requires a query for the original status URL.
	const originStatusUrl = server ? await _getFederatedStatus(hostname, id) : `https://${url}`;
	// Get the hostname of the originating server
	const {hostname: originHostname} = new URL(originStatusUrl);
	// Query the originating server for its oembed data
	return await _getOriginOembed(originHostname, originStatusUrl);
}


/**
 * Query the 11ty user's Mastodon instance about a status.
 * @param {string} hostname - Hostname of the Mastodon instance to query about the status.
 * @param {string} id - Status ID.
 * @returns {string} - URL of the status.
 * @see https://docs.joinmastodon.org/methods/statuses/#get
 * @todo Better error handling.
 */
async function _getFederatedStatus(hostname, id) {
	const federatedStatusQuery = `https://${hostname}/api/v1/statuses/${id}`;
	const {url} = await Fetch(federatedStatusQuery, {
		duration: "1d",
		type: "json",
		// verbose: true,
	});
	return url;
}

/**
 * Query the originating Mastodon server for oembed data.
 * @param {string} hostname - Hostname of the originating Mastodon server.
 * @param {string} url - URL of the status on the originating Mastodon server.
 * @returns {string} - HTML to embed the status.
 * @see https://docs.joinmastodon.org/methods/oembed/
 * @todo Better error handling.
 */
async function _getOriginOembed(hostname, url) {
	const oembedQuery = `https://${hostname}/api/oembed?url=${url}`;
	const {html} = await Fetch(oembedQuery, {
		duration: "1d",
		type: "json",
		// verbose: true,
	});
	return html;
}

module.exports._getFederatedStatus = _getFederatedStatus;
module.exports._getOriginOembed = _getOriginOembed;
