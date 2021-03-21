const { URL } = require("url");
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
   * @param {Number} index
   */
	function defaultEmbed(tweet, options, index) {
		let quoteOptions = '';

		if (options.theme === 'dark') {
			quoteOptions += ' data-theme="dark"'
		}

		if (options.doNotTrack) {
			quoteOptions += ' data-dnt="true"'
		}

		if (quoteOptions) {
			quoteOptions = ` ${quoteOptions.trim()}`;
		}

		let out = `<div class="${options.embedClass}">`;
		out += `<blockquote id="tweet-${tweet.tweetId}" class="twitter-tweet"${quoteOptions}>`;
		out += `<a href="https://twitter.com/${tweet.userHandle}/status/${tweet.tweetId}"></a>`;
		out += "</blockquote>";
		out += "</div>";

		const isScriptEnabled = index === 0 && options.twitterScript.enabled;

		let twitterScript = `<script src="${options.twitterScript.src}"`;
		twitterScript += ` charset="${options.twitterScript.charset}"`;
		twitterScript += options.twitterScript.async ? " async" : "";
		twitterScript += options.twitterScript.defer ? " defer" : "";
		twitterScript += ">";
		twitterScript += "</script>";

		if (isScriptEnabled) {
			out += twitterScript;
		}

		return out;
	}
	/**
   * Optional embed, which requires a network call to save the Tweet text as static HTML
   * @param {Object} tweet
   * @param {Object} options
   * @param {Number} index
   */
	async function cachedEmbed(tweet, options, index) {
		const tweetUrl = `https://twitter.com/${tweet.userHandle}/status/${tweet.tweetId}`;
		const isScriptEnabled = index === 0 && options.twitterScript.enabled;
		const oEmbedUrl = new URL('https://publish.twitter.com/oembed');

		oEmbedUrl.searchParams.set('url', tweetUrl);

		if (!isScriptEnabled) {
			oEmbedUrl.searchParams.set('omit_script', '1');
		}

		if (options.theme === 'dark') {
			oEmbedUrl.searchParams.set('theme', 'dark');
		}

		if (options.doNotTrack) {
			oEmbedUrl.searchParams.set('dnt', 'true');
		}

		try {
			const json = await get(oEmbedUrl.href);
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
