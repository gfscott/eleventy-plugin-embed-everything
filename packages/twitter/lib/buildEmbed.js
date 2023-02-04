const {URL} = require("url");
const Cache = require("@11ty/eleventy-cache-assets");
const buildOptions = require("./buildOptions.js");
const merge = require("deepmerge");

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
		let embedAttrs = buildOptions(options);
		const isScriptEnabled = index === 0 && options.twitterScript.enabled;

		let out = `<div class="${options.embedClass}">`;
		out += `<blockquote id="tweet-${tweet.tweetId}" class="twitter-tweet"${embedAttrs
			? ` ${embedAttrs}`
			: ""}>`;
		out += `<a href="https://twitter.com/${tweet.userHandle}/status/${tweet.tweetId}"></a>`;
		out += "</blockquote>";
		out += "</div>";

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
		const oEmbedUrl = new URL(options.oEmbedUrl);
		const tweetUrl = `https://twitter.com/${tweet.userHandle}/status/${tweet.tweetId}`;
		const isScriptEnabled = index === 0 && options.twitterScript.enabled;

		let optionsAmendedForOembed = merge(
			options,
			{
				tweetUrl,
				omit_script: !isScriptEnabled,
			},
		);
		let oEmbedParamString = buildOptions(optionsAmendedForOembed, "url");

		let oEmbedRequestUrl = oEmbedUrl + oEmbedParamString;

		try {
			const json = await Cache(
				oEmbedRequestUrl,
				{
					duration: options.cacheDuration,
					type: "json",
				},
			);
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
