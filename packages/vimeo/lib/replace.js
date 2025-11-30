module.exports = function(match, config) {
	const id = match[4];
	let hash = getHashIfExists(match);
	let params = '?' + addEmbedUrlParams({...config, hash});

  let embed = `<div id="vimeo-${id}" class="${config.embedClass}" style="${config.wrapperStyle}">`;
  embed += `<iframe style="${config.iframeStyle}" frameborder="0"`;
  embed += ` src="https://player.vimeo.com/video/${id + params}"`;
  embed += `${config.allowFullscreen ? ' allowfullscreen' : ''}></iframe></div>`;

	return embed;
}

/**
 * Get the Vimeo privacy hash, if it's present in the URL
 * @param {RegExpMatchArray} match - Match data
 * @returns { string | undefined } - Privacy hash
 */
function getHashIfExists(match) {

	// Return value from the RegEx
	if ( match && match[5] ) {
		return match[5]
	}

	// Return value if it's a param
	const p = new URL(`https://${match[3]}`);
	if (p.searchParams.get("h")) {
		return p.searchParams.get("h");
	}

	// Otherwise it doesn't exist
	return undefined;

}

/**
 * From input values, return a URL parameter string
 * @param {Object} obj - Object containing input values
 * @returns {string} — URL param string, without leading "?"
 */
function addEmbedUrlParams(obj) {

	let params = new URLSearchParams();

	// dnt=1 by default, unless *explicitly* set to false
	params.set("dnt", obj?.dnt == false ? 0 : 1)

	// Privacy hash if present
	if (obj?.hash) params.set("h", obj.hash);

	// URLSearchParams.toString() method doesn't add leading `?`.
	// Stick with that behavior and handle elsewhere.
	return params.toString();

}


module.exports.getHashIfExists = getHashIfExists;
module.exports.addEmbedUrlParams = addEmbedUrlParams;
