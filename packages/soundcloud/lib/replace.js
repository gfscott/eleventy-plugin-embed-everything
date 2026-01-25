const Fetch = require("@11ty/eleventy-fetch");
const { env } = require('node:process');

async function _replace(match, config) {
	try {
		if (!match || !match[0]) {
			return "";
		}

		if (config.small) {
			config.visual = false;
			config.height = 166;
		}

		// Used only for testing
		if (config.__forceError) throw new Error("Forced error for testing");

		// URL path + query string, captured by the regex pattern, return if absent
		const regexPathMatch = match[3];
		if (!regexPathMatch) return match[0];

		// Regex excludes protocol and domain, so we can ensure a valid URL here
		const u = new URL(`https://soundcloud.com${regexPathMatch}`);

		// Get oEmbed HTML from SoundCloud, return original match if absent
		const {html, title} = await _getPostOembed(u.origin + u.pathname, config)
		if (!html) return match[0];

		// Extract iframe src from oEmbed HTML, return original match if absent
		const iframeSrc = html.match(/src="(.+?)"/)[1] || null;
		if (!iframeSrc) return match[0];

		const scApiUrl = new URLSearchParams(iframeSrc);

		// Return the oEmbed HTML
		let out = `<div class="${config.embedClass}">`;
		out += `<iframe title="${config.iframeTitle || title || 'SoundCloud Embed'}" width="${config.width}" height="${config.height}" scrolling="no" frameborder="no" allow="autoplay"`;
		out += ` src="https://w.soundcloud.com/player/?url=${encodeURIComponent(scApiUrl.get('url'))}&${_getParamsFromOptions(config)}"></iframe>`;
		out += `</div>`;
		return out;

	} catch (error) {
		console.error("Error creating SoundCloud embed:", error);
		return match[0] || "";
	}
};

/**
 * Query SoundCloud for oembed data.
 * @param {string} url - SoundCloud URL.
 * @param {object} opt - Options object.
 * @returns {Promise<string|null>} - HTML to embed the status.
 * @see https://developers.soundcloud.com/docs/oembed
 */
async function _getPostOembed(url, opt) {
	if(!url) {
		console.error("Missing URL.");
		return null;
	}

	const params = _getParamsFromOptions(opt);
	const oembedUrl = `https://soundcloud.com/oembed?url=${url}&${params}&format=json`;

	try {
		const {html, title} = await Fetch(oembedUrl, {
			duration: opt.cacheDuration,
			type: "json",
			verbose: env.DEBUG,
		});
		return {html, title};
	} catch (error) {
		console.error("Error fetching post data from SoundCloud", error);
		return null;
	}
}

function _getParamsFromOptions(config) {
	// Excluded because they aren't handled by URL params
	const excludedOpts = ['height', 'width', 'small', 'embedClass', 'iframeTitle', 'cacheDuration', '__forceError'];
	const paramOpts = Object.fromEntries(
		Object.entries(config).filter(([key]) => !excludedOpts.includes(key))
	);
	return new URLSearchParams(paramOpts).toString();
}




module.exports = _replace;  // Default export
module.exports._replace = _replace;
module.exports._getPostOembed = _getPostOembed;


// module.exports = function(str, options) {

//   // convenience setting to use the smaller player, overrides visual and height
//   if ( options.small ) {
//     options.visual = false
//     options.height = 166
//   }

//   // get the iframe src as provided by SoundCloud
//   let [, src] = str.match(/src="(.+?)"/);

//   // parse the "url" param to get the track URL
//   let embedUrl = new URL(src).searchParams.get('url');

//   // compile the player params
//   let params = '';
//   for ( let option in options ){
//     // stuff not set with URL params
//     const exclude = ['height', 'width', 'small', 'embedClass'];
//     if ( exclude.indexOf(option) < 0 ) {
//       params += `${option}=${encodeURIComponent(options[option])}&`;
//     } else {
//       params += '';
//     }
//   }

//   // build the embed HTML
//   let out = `<div class="${options.embedClass}">`;
//       out += `<iframe title="${options.iframeTitle}" width="${options.width}" height="${options.height}" scrolling="no" frameborder="no" allow="autoplay" `;
//       out += `src="https://w.soundcloud.com/player/?url=${encodeURIComponent(embedUrl)}&${params}"></iframe>`;
//       out += `</div>`;

//   return out;
// }
