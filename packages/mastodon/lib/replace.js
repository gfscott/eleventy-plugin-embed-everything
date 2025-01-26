const Fetch = require("@11ty/eleventy-fetch");

module.exports = async function(match, config) {
	const { hostname, id, server, url } = match.at(-1);
	// If there's a server, it's federated and requires a query for the original status URL.
	const originStatusUrl = server ? await _getFederatedStatus(hostname, id) : `https://${url}`;
	// Get the hostname of the originating server
	const {hostname: originHostname} = new URL(originStatusUrl);
	// Query the originating server for its oembed data
	return await _getOriginOembed(originHostname, originStatusUrl, config);
}


/**
 * Query the 11ty user's Mastodon instance about a status.
 * @param {string} hostname - Hostname of the Mastodon instance to query about the status.
 * @param {string} id - Status ID.
 * @returns {string|null} - URL of the status.
 * @see https://docs.joinmastodon.org/methods/statuses/#get
 * @todo Better error handling.
 */
async function _getFederatedStatus(hostname, id) {
	if (!hostname || !id) {
		console.error("Missing Mastodon instance or status ID.");
		return null;
	}
	const federatedStatusQuery = `https://${hostname}/api/v1/statuses/${id}`;
	try {
		const {url} = await Fetch(federatedStatusQuery, {
			duration: "1d",
			type: "json",
			// verbose: true,
		});
		return url ?? null;
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
 * @todo Better error handling.
 */
async function _getOriginOembed(hostname, url, config) {
	if(!hostname || !url) {
		console.error("Missing hostname or URL.");
		return null;
	}

	let oembedUrl = new URL(`https://${hostname}/api/oembed`);
			oembedUrl.searchParams.append("url", url);

	if (config?.maxWidth && config.maxWidth !== 400) {
		oembedUrl.searchParams.append("maxwidth", config.maxWidth);
	}
	if (config?.maxHeight) {
		oembedUrl.searchParams.append("maxheight", config.maxHeight);
	}

	try {
		const {html} = await Fetch(oembedUrl.toString(), {
			duration: "1d",
			type: "json",
			// verbose: true,
		});
		return html ?? null;
	} catch (error) {
		console.error(error);
		return null;
	}
}

module.exports._getFederatedStatus = _getFederatedStatus;
module.exports._getOriginOembed = _getOriginOembed;
