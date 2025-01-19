const Fetch = require("@11ty/eleventy-fetch");

module.exports = async function(match, config) {
	const { hostname, id } = match[match.length - 1];
	const {url: originStatusUrl} = await _getFederatedStatus(hostname, id);
	const {hostname: originHostname} = new URL(originStatusUrl);
	const {html} = await _getOriginOembed(originHostname, originStatusUrl);
	return html;
}


/**
 * Query the 11ty user's Mastodon instance about a status.
 * @param {string} hostname - Hostname of the Mastodon instance to query about the status.
 * @param {string} id - Status ID.
 * @returns JSON object with data about the status.
 * @see https://docs.joinmastodon.org/methods/statuses/#get
 * @todo Better error handling.
 */
async function _getFederatedStatus(hostname, id) {
	const federatedStatusQuery = `https://${hostname}/api/v1/statuses/${id}`;
	console.log(federatedStatusQuery);
	return await Fetch(federatedStatusQuery, {
		duration: "1d",
		type: "json",
		verbose: true,
	});
}

/**
 * Query the originating Mastodon server for oembed data.
 * @param {string} hostname - Hostname of the originating Mastodon server.
 * @param {string} url - URL of the status on the originating Mastodon server.
 * @returns JSON data containing embeddable HTML.
 * @see https://docs.joinmastodon.org/methods/oembed/
 * @todo Better error handling.
 */
async function _getOriginOembed(hostname, url) {
	const oembedQuery = `https://${hostname}/api/oembed?url=${url}`;
	console.log(oembedQuery);
	return await Fetch(oembedQuery, {
		duration: "1d",
		type: "json",
		verbose: true,
	});
}

module.exports._getFederatedStatus = _getFederatedStatus;
module.exports._getOriginOembed = _getOriginOembed;
