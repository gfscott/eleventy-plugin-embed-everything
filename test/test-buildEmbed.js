const test = require("ava");
const merge = require("deepmerge");
const extractMatch = require("../lib/extractMatch.js");
const buildEmbed = require("../lib/buildEmbed.js");
const pluginDefaults = require("../lib/pluginDefaults.js");
const validStrings = require("./inc/validStrings.js");

/**
 * TEST: Build script returns expected HTML string, given valid input and default options
 */
validStrings.forEach(function(obj) {
	test(
		`${obj.type} default embed behavior`,
		(t) => {
			const idealCase = `<p>${obj.str}</p>`;
			const tweetObj = extractMatch(idealCase);
			const output = buildEmbed(tweetObj, pluginDefaults, 0);
			const expected = '<div class="eleventy-plugin-embed-twitter"><blockquote id="tweet-1289865845053652994" class="twitter-tweet"><a href="https://twitter.com/SaraSoueidan/status/1289865845053652994"></a></blockquote></div><script src="https://platform.twitter.com/widgets.js" charset="utf-8" async></script>';
			t.is(output, expected);
		},
	);
});

/**
 * TEST: Build script returns expected HTML string for NONZERO-INDEX entries, given valid input and default options
 */
validStrings.forEach(function(obj) {
	test(
		`${obj.type} default embed behavior, nonzero array index`,
		(t) => {
			const idealCase = `<p>${obj.str}</p>`;
			const tweetObj = extractMatch(idealCase);
			const output = buildEmbed(tweetObj, pluginDefaults, 1);
			const expected = '<div class="eleventy-plugin-embed-twitter"><blockquote id="tweet-1289865845053652994" class="twitter-tweet"><a href="https://twitter.com/SaraSoueidan/status/1289865845053652994"></a></blockquote></div>';
			t.is(output, expected);
		},
	);
});

/**
 * TEST: Build script returns expected HTML string, given valid input and async script option disabled
 */
validStrings.forEach(function(obj) {
	test(
		`${obj.type} default embed, synchronous twitter script`,
		(t) => {
			const twitterAsyncFalse = {
				twitterScript: {
					async: false,
				},
			};
			const customOpt = merge(pluginDefaults, twitterAsyncFalse);
			const idealCase = `<p>${obj.str}</p>`;
			const tweetObj = extractMatch(idealCase);
			const output = buildEmbed(tweetObj, customOpt, 0);
			const expected = '<div class="eleventy-plugin-embed-twitter"><blockquote id="tweet-1289865845053652994" class="twitter-tweet"><a href="https://twitter.com/SaraSoueidan/status/1289865845053652994"></a></blockquote></div><script src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>';
			t.is(output, expected);
		},
	);
});

/**
 * TEST: Build script returns expected HTML string, given valid input AND twitter script defer = true
 */
validStrings.forEach(function(obj) {
	test(
		`${obj.type} default embed, deferred twitter script`,
		(t) => {
			const twitterDeferTrue = {
				twitterScript: {
					defer: true,
				},
			};
			const customOpt = merge(pluginDefaults, twitterDeferTrue);
			const idealCase = `<p>${obj.str}</p>`;
			const tweetObj = extractMatch(idealCase);
			const output = buildEmbed(tweetObj, customOpt, 0);
			const expected = '<div class="eleventy-plugin-embed-twitter"><blockquote id="tweet-1289865845053652994" class="twitter-tweet"><a href="https://twitter.com/SaraSoueidan/status/1289865845053652994"></a></blockquote></div><script src="https://platform.twitter.com/widgets.js" charset="utf-8" async defer></script>';
			t.is(output, expected);
		},
	);
});

/**
 * TEST: Build script returns expected HTML string, given valid input and default options
 */
validStrings.forEach(function(obj) {
	test(
		`${obj.type} default embed, disabled twitter script`,
		(t) => {
			const twitterScriptEnabledFalse = {
				twitterScript: {
					enabled: false,
				},
			};
			const customOpt = merge(pluginDefaults, twitterScriptEnabledFalse);
			const idealCase = `<p>${obj.str}</p>`;
			const tweetObj = extractMatch(idealCase);
			const output = buildEmbed(tweetObj, customOpt, 0);
			const expected = '<div class="eleventy-plugin-embed-twitter"><blockquote id="tweet-1289865845053652994" class="twitter-tweet"><a href="https://twitter.com/SaraSoueidan/status/1289865845053652994"></a></blockquote></div>';
			t.is(output, expected);
		},
	);
});

/**
 * TEST: Build script returns expected HTML string, theme dark
 */
validStrings.forEach(function(obj) {
	test(
		`${obj.type} default embed, dark theme`,
		(t) => {
			const darkTheme = {
				theme: 'dark',
			};
			const customOpt = merge(pluginDefaults, darkTheme);
			const idealCase = `<p>${obj.str}</p>`;
			const tweetObj = extractMatch(idealCase);
			const output = buildEmbed(tweetObj, customOpt, 0);
			const expected = '<div class="eleventy-plugin-embed-twitter"><blockquote id="tweet-1289865845053652994" class="twitter-tweet" data-theme="dark"><a href="https://twitter.com/SaraSoueidan/status/1289865845053652994"></a></blockquote></div><script src="https://platform.twitter.com/widgets.js" charset="utf-8" async></script>';
			t.is(output, expected);
		},
	);
});

/**
 * TEST: Build script returns expected HTML string, do not track
 */
validStrings.forEach(function(obj) {
	test(
		`${obj.type} default embed, do not track`,
		(t) => {
			const doNotTrack = {
				doNotTrack: true,
			};
			const customOpt = merge(pluginDefaults, doNotTrack);
			const idealCase = `<p>${obj.str}</p>`;
			const tweetObj = extractMatch(idealCase);
			const output = buildEmbed(tweetObj, customOpt, 0);
			const expected = '<div class="eleventy-plugin-embed-twitter"><blockquote id="tweet-1289865845053652994" class="twitter-tweet" data-dnt="true"><a href="https://twitter.com/SaraSoueidan/status/1289865845053652994"></a></blockquote></div><script src="https://platform.twitter.com/widgets.js" charset="utf-8" async></script>';
			t.is(output, expected);
		},
	);
});

/**
 * TEST: Build script returns expected oEmbed HTML string, given valid input with oembed option active
 */
validStrings.forEach(function(obj) {
	test(
		`${obj.type} cached oembed behavior`,
		async (t) => {
			const oEmbedOption = merge(pluginDefaults, {cacheText: true});
			const idealCase = `<p>${obj.str}</p>`;
			const tweetObj = extractMatch(idealCase);
			const output = await buildEmbed(tweetObj, oEmbedOption, 0);
			const expected = '<div class="eleventy-plugin-embed-twitter"><blockquote class="twitter-tweet"><p lang="en" dir="ltr">I&#39;ve been increasingly feeling like Grid or Flex has become the new Tabs or Spaces.</p>&mdash; Sara Soueidan (@SaraSoueidan) <a href="https://twitter.com/SaraSoueidan/status/1289865845053652994?ref_src=twsrc%5Etfw">August 2, 2020</a></blockquote>\n<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>\n</div>';
			t.is(output, expected);
		},
	);
});

/**
 * TEST: Build script returns expected oEmbed HTML string without scripts given index being NONZERO-INDEX
 */
validStrings.forEach(function(obj) {
	test(
		`${obj.type} cached oembed behavior, nonzero array index`,
		async (t) => {
			const oEmbedOption = merge(pluginDefaults, {cacheText: true});
			const idealCase = `<p>${obj.str}</p>`;
			const tweetObj = extractMatch(idealCase);
			const output = await buildEmbed(tweetObj, oEmbedOption, 1);
			const expected = '<div class="eleventy-plugin-embed-twitter"><blockquote class="twitter-tweet"><p lang="en" dir="ltr">I&#39;ve been increasingly feeling like Grid or Flex has become the new Tabs or Spaces.</p>&mdash; Sara Soueidan (@SaraSoueidan) <a href="https://twitter.com/SaraSoueidan/status/1289865845053652994?ref_src=twsrc%5Etfw">August 2, 2020</a></blockquote>\n</div>';
			t.is(output, expected);
		},
	);
});

/**
 * TEST: Build script returns expected oEmbed HTML string without scripts given twitterScript not being enabled.
 */
validStrings.forEach(function(obj) {
	test(
		`${obj.type} cached oembed behavior, disabled twitter script`,
		async (t) => {
			const oEmbedOption = merge(pluginDefaults, {
				cacheText: true,
				twitterScript: {
					enabled: false,
				},
			});
			const idealCase = `<p>${obj.str}</p>`;
			const tweetObj = extractMatch(idealCase);
			const output = await buildEmbed(tweetObj, oEmbedOption, 0);
			const expected = '<div class="eleventy-plugin-embed-twitter"><blockquote class="twitter-tweet"><p lang="en" dir="ltr">I&#39;ve been increasingly feeling like Grid or Flex has become the new Tabs or Spaces.</p>&mdash; Sara Soueidan (@SaraSoueidan) <a href="https://twitter.com/SaraSoueidan/status/1289865845053652994?ref_src=twsrc%5Etfw">August 2, 2020</a></blockquote>\n</div>';
			t.is(output, expected);
		},
	);
});

/**
 * TEST: Build script returns expected oEmbed HTML string with dark theme.
 */
validStrings.forEach(function(obj) {
	test(
		`${obj.type} cached oembed behavior, dark theme`,
		async (t) => {
			const oEmbedOption = merge(pluginDefaults, {
				cacheText: true,
				theme: 'dark',
			});
			const idealCase = `<p>${obj.str}</p>`;
			const tweetObj = extractMatch(idealCase);
			const output = await buildEmbed(tweetObj, oEmbedOption, 0);
			const expected = '<div class="eleventy-plugin-embed-twitter"><blockquote class="twitter-tweet" data-theme="dark"><p lang="en" dir="ltr">I&#39;ve been increasingly feeling like Grid or Flex has become the new Tabs or Spaces.</p>&mdash; Sara Soueidan (@SaraSoueidan) <a href="https://twitter.com/SaraSoueidan/status/1289865845053652994?ref_src=twsrc%5Etfw">August 2, 2020</a></blockquote>\n<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>\n</div>';
			t.is(output, expected);
		},
	);
});

/**
 * TEST: Build script returns expected oEmbed HTML string with do not track.
 */
validStrings.forEach(function(obj) {
	test(
		`${obj.type} cached oembed behavior, do not track`,
		async (t) => {
			const oEmbedOption = merge(pluginDefaults, {
				cacheText: true,
				doNotTrack: true,
			});
			const idealCase = `<p>${obj.str}</p>`;
			const tweetObj = extractMatch(idealCase);
			const output = await buildEmbed(tweetObj, oEmbedOption, 0);
			const expected = '<div class="eleventy-plugin-embed-twitter"><blockquote class="twitter-tweet" data-dnt="true"><p lang="en" dir="ltr">I&#39;ve been increasingly feeling like Grid or Flex has become the new Tabs or Spaces.</p>&mdash; Sara Soueidan (@SaraSoueidan) <a href="https://twitter.com/SaraSoueidan/status/1289865845053652994?ref_src=twsrc%5Etfw">August 2, 2020</a></blockquote>\n<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>\n</div>';
			t.is(output, expected);
		},
	);
});

/**
 * TEST: Build script returns unaltered URL if oEmbed network response ≠ 200
 * Note: the bent library is configured to throw an error on anything other
 * than 200, so the exact error code _should_ be irrelevant for this plugin.
 */
validStrings.forEach(function(obj) {
	test(
		`${obj.type} network failure case`,
		async (t) => {
			const oEmbedOption = merge(pluginDefaults, {cacheText: true});
			const idealCase = `<p>${obj.str}</p>`;
			const tweetObj = extractMatch(idealCase);
			// change the last two digits to zero to make the tweet URL invalid for oEmbed.
			tweetObj.tweetId = tweetObj.tweetId.slice(0, -2) + '00';
			const output = await buildEmbed(tweetObj, oEmbedOption, 0);
			// Remember, the expected returned value is still an invalid URL for the purposes of this test!
			const expected = 'https://twitter.com/SaraSoueidan/status/1289865845053652900';
			t.is(output, expected);
		},
	);
});
