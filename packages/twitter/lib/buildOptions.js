const pluginDefaults = require("./pluginDefaults.js");

/**
 * Compose Twitter embed options and return
 * @param {Object} obj — object with available Twitter embed options.
 * @param {String} format — format to return. 'html' (default) or 'url'.
 * @see https://developer.twitter.com/en/docs/twitter-for-websites/embedded-tweets/guides/embedded-tweet-parameter-reference
 */

module.exports = function(obj, format = "html") {
	let opts = parseOptions(obj);
	return format === "url" ? buildUrlParamString(opts) : buildCustomDataStr(opts);
};

/**
 * Transform Twitter options object into an array of objects.
 * This is useful because each individual setting can later be 
 * parsed in multiple ways, depending on required output.
 * 
 * @param {Object} o — an object containing Twitter embed options 
 * @returns {Array} — array of objects for each specific Twitter embed setting
 * @see https://developer.twitter.com/en/docs/twitter-for-websites/embedded-tweets/guides/embedded-tweet-parameter-reference
 * @see https://developer.twitter.com/en/docs/twitter-api/v1/tweets/post-and-engage/api-reference/get-statuses-oembed
 */
function parseOptions(o) {
	let out = [];

	if (o.theme === "dark") {
		out.push({attr: "theme", value: "dark"});
	}

	if (o.doNotTrack) {
		out.push({attr: "dnt", value: "true"});
	}

	// Only set this option if it's one of the three valid values: 'left', 'center', or 'right'
	if (o.align && ["left", "center", "right"].includes(o.align)) {
		out.push({attr: "align", value: o.align});
	}

	if (o.cards === "hidden") {
		out.push({
			attr: "cards",
			oEmbedAttr: "hide_media",
			value: "hidden",
			oEmbedValue: "true",
		});
	}

	if (o.conversation === "none") {
		out.push({
			attr: "conversation",
			oEmbedAttr: "hide_thread",
			value: "none",
			oEmbedValue: "true",
		});
	}

	if (o.lang) {
		out.push({attr: "lang", value: o.lang});
	}

	if (o.width && typeof o.width === "number") {
		out.push({attr: "width", oEmbedAttr: "maxwidth", value: o.width});
	}

	// These last two are only used in the oEmbed context (`oEmbedOnly = true`)
	if (o.omit_script) {
		out.push({attr: "omit_script", value: "true", oEmbedOnly: true});
	}

	if (o.tweetUrl) {
		out.push({attr: "url", value: o.tweetUrl, oEmbedOnly: true});
	}

	return out;
}

/**
 * From the available Twitter options, return a string of custom HTML data attributes.
 * @param {Array} arr — Array of Twitter embed options
 * @returns {String}
 */
function buildCustomDataStr(arr) {
	let out = "";
	arr.forEach((el) => {
		if (!el.oEmbedOnly) {
			out += ` data-${el.attr}="${el.value}"`;
		}
	});
	return `${out.trim()}`;
}

/**
 * From the availble Twitter options, return a URL param string.
 * @param {Array} arr — Array of Twitter embed options
 * @returns 
 */
function buildUrlParamString(arr) {
	// Node URL class requires a valid URL to operate. BUT only the `search` string is actually returned.
	const oEmbedUrl = new URL(pluginDefaults.oEmbedUrl);

	arr.forEach((el) => {
		let attr = el.oEmbedAttr ? el.oEmbedAttr : el.attr;
		let val = el.oEmbedValue ? el.oEmbedValue : el.value;
		oEmbedUrl.searchParams.set(attr, val);
	});
	return oEmbedUrl.search;
}
