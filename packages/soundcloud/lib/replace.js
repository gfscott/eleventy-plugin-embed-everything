const Fetch = require("@11ty/eleventy-fetch");
const { env } = require('node:process');

async function _replace(match, config) {
	try {
		if (!match || !match[0]) {
			return "";
		}

		// Used only for testing
		if (config.__forceError) throw new Error("Forced error for testing");

		// URL path
		const path = match[3];

		if (!path) {
			return match[0];
		}

		const fullUrl = new URL(`https://soundcloud.com${path}`);
		const html = await _getPostOembed(`https://soundcloud.com${fullUrl.pathname}`, config.cacheDuration)

		// If no HTML is returned, return the original match
		if (!html) return match[0];

		// TODO update to extract iframe src to match existing API
		// instead of just returning the raw HTML from SC oembed
		// const srcMatch = html.match(/src="(.+?)"/);
		// const iframeSrc = srcMatch ? srcMatch[1] : null;

		// Return the oEmbed HTML
		return `<div class="${config.embedClass}">${html}</div>`;

	} catch (error) {
		console.error("Error creating SoundCloud embed:", error);
		return match[0] || "";
	}
};

/**
 * Query SoundCloud for oembed data.
 * @param {string} url - SoundCloud URL.
 * @param {string} [cacheDuration="60m"] - Cache duration for the fetch.
 * @returns {Promise<string|null>} - HTML to embed the status.
 * @see https://developers.soundcloud.com/docs/oembed
 */
async function _getPostOembed(url, cacheDuration = "60m", __forceError = false) {
	if(!url) {
		console.error("Missing URL.");
		return null;
	}

	let oembedUrl = `https://soundcloud.com/oembed?url=${url}`;

	try {
		const {html} = await Fetch(oembedUrl, {
			duration: cacheDuration,
			type: "json",
			verbose: env.DEBUG,
		});
		return html;
	} catch (error) {
		console.error("Error fetching post data from SoundCloud", error);
		return null;
	}
}

function _getParamsFromOptions(config) {

	let params = new URLSearchParams();
	for ( let option in config ){
		// stuff not set with URL params
		const exclude = ['height', 'width', 'small', 'embedClass', 'iframeTitle', 'cacheDuration', '__forceError'];
		if ( exclude.indexOf(option) < 0 ) {
			params.append(option, config[option]);
		}
	}

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
