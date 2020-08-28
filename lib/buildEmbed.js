const bent = require("bent");
const get = bent("json", 200);

module.exports = function(tweet, options, index) {
	let output;
	if (options.cacheText) {
		// cached oembed version
		output = cachedEmbed(tweet, options, index);
	} else {
		// default version
		output = defaultEmbed(tweet, options, index);
	}
	return output;

	/**
   * Default embed, which does NOT make a network oEmbed call to save the Tweet text as static HTML.
   * @param {Object} tweet
   * @param {Object} options
   * @param {Int} index
   *
   */
	function defaultEmbed(tweet, options, index) {
		let out = `<div class="${options.embedClass}">`;
		out += `<blockquote id="tweet-${tweet.tweetId}" class="twitter-tweet">`;
		out += `<a href="https://twitter.com/${tweet.userHandle}/status/${tweet.tweetId}"></a>`;
		out += "</blockquote>";
		out += "</div>";

		let twitterScript = `<script src="${options.twitterScript.src}"`;
		twitterScript += ` charset="${options.twitterScript.charset}"`;
		twitterScript += options.twitterScript.async ? " async" : "";
		twitterScript += options.twitterScript.defer ? " defer" : "";
		twitterScript += ">";
		twitterScript += "</script>";

		if (index === 0) {
			out += twitterScript;
		}

		return out;
	}
	/**
   * Optional embed, which requires a network call to save the Tweet text as static HTML
   * @param {Object} tweet
   * @param {Object} options
   * @param {Int} index
   */
	async function cachedEmbed(tweet, options) {
		const tweetUrl = `https://twitter.com/${tweet.userHandle}/status/${tweet.tweetId}`;
		const oEmbedUrl = `https://publish.twitter.com/oembed?url=${encodeURIComponent(
			tweetUrl,
		)}`;
		try {
			const json = await get(oEmbedUrl);
			let out = `<div class="${options.embedClass}">`;
			out += json.html;
			out += "</div>";
			return out;
		} catch (err) {
			console.error("Error communicating with Twitter\u2019s servers: ", err);
			return tweetUrl;
		}
	}
};
