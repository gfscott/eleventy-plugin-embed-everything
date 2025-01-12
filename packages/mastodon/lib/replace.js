const Fetch = require("@11ty/eleventy-fetch");

module.exports = async function(match, config) {
	const { hostname, id } = match[match.length - 1];
	const {url: originStatusUrl} = await _getFederatedStatus(hostname, id);
	const {hostname: originHostname} = new URL(originStatusUrl);
	const {html} = await _getOriginOembed(originHostname, originStatusUrl);
	return html;
}


async function _getFederatedStatus(hostname, id) {
	const federatedStatusQuery = `https://${hostname}/api/v1/statuses/${id}`;
	return await Fetch(federatedStatusQuery, {
		duration: "1d",
		type: "json",
		verbose: true,
	});
}

async function _getOriginOembed(hostname, url) {
	const oembedQuery = `https://${hostname}/api/oembed?url=${url}`;
	return await Fetch(oembedQuery, {
		duration: "1d",
		type: "json",
		verbose: true,
	});
}

module.exports._getFederatedStatus = _getFederatedStatus;
module.exports._getOriginOembed = _getOriginOembed;
