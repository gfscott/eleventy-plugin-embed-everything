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
 * TEST: Build script returns expected HTML string, dark mode
 */
validStrings.forEach(function(obj) {
	test(
		`${obj.type} default embed, dark mode`,
		(t) => {
			const darkMode = {
				theme: 'dark',
			};
			const customOpt = merge(pluginDefaults, darkMode);
			const idealCase = `<p>${obj.str}</p>`;
			const tweetObj = extractMatch(idealCase);
			const output = buildEmbed(tweetObj, customOpt, 0);
			const expected = '<div class="eleventy-plugin-embed-twitter"><blockquote id="tweet-1289865845053652994" class="twitter-tweet" data-theme="dark"><a href="https://twitter.com/SaraSoueidan/status/1289865845053652994"></a></blockquote></div><script src="https://platform.twitter.com/widgets.js" charset="utf-8" async></script>';
			t.is(output, expected);
		},
	);
});

/**
 * TEST: Build script returns expected HTML string, custom alignment
 */
validStrings.forEach(function(obj) {
	test(
		`${obj.type} default embed, custom alignment`,
		(t) => {
			const align = {
				align: 'right',
			};
			const customOpt = merge(pluginDefaults, align);
			const idealCase = `<p>${obj.str}</p>`;
			const tweetObj = extractMatch(idealCase);
			const output = buildEmbed(tweetObj, customOpt, 0);
			const expected = '<div class="eleventy-plugin-embed-twitter"><blockquote id="tweet-1289865845053652994" class="twitter-tweet" data-align="right"><a href="https://twitter.com/SaraSoueidan/status/1289865845053652994"></a></blockquote></div><script src="https://platform.twitter.com/widgets.js" charset="utf-8" async></script>';
			t.is(output, expected);
		},
	);
});

/**
 * TEST: Build script returns expected HTML string, disable cards/media
 */
validStrings.forEach(function(obj) {
	test(
		`${obj.type} default embed, disable cards/media`,
		(t) => {
			const cards = {
				cards: 'hidden',
			};
			const customOpt = merge(pluginDefaults, cards);
			const idealCase = `<p>${obj.str}</p>`;
			const tweetObj = extractMatch(idealCase);
			const output = buildEmbed(tweetObj, customOpt, 0);
			const expected = '<div class="eleventy-plugin-embed-twitter"><blockquote id="tweet-1289865845053652994" class="twitter-tweet" data-cards="hidden"><a href="https://twitter.com/SaraSoueidan/status/1289865845053652994"></a></blockquote></div><script src="https://platform.twitter.com/widgets.js" charset="utf-8" async></script>';
			t.is(output, expected);
		},
	);
});

/**
 * TEST: Build script returns expected HTML string, disable cards/media
 */
validStrings.forEach(function(obj) {
	test(
		`${obj.type} default embed, disable conversation/threading`,
		(t) => {
			const conversation = {
				conversation: 'none',
			};
			const customOpt = merge(pluginDefaults, conversation);
			const idealCase = `<p>${obj.str}</p>`;
			const tweetObj = extractMatch(idealCase);
			const output = buildEmbed(tweetObj, customOpt, 0);
			const expected = '<div class="eleventy-plugin-embed-twitter"><blockquote id="tweet-1289865845053652994" class="twitter-tweet" data-conversation="none"><a href="https://twitter.com/SaraSoueidan/status/1289865845053652994"></a></blockquote></div><script src="https://platform.twitter.com/widgets.js" charset="utf-8" async></script>';
			t.is(output, expected);
		},
	);
});

/**
 * TEST: Build script returns expected HTML string, custom language
 */
validStrings.forEach(function(obj) {
	test(
		`${obj.type} default embed, custom language`,
		(t) => {
			const lang = {
				lang: 'es',
			};
			const customOpt = merge(pluginDefaults, lang);
			const idealCase = `<p>${obj.str}</p>`;
			const tweetObj = extractMatch(idealCase);
			const output = buildEmbed(tweetObj, customOpt, 0);
			const expected = '<div class="eleventy-plugin-embed-twitter"><blockquote id="tweet-1289865845053652994" class="twitter-tweet" data-lang="es"><a href="https://twitter.com/SaraSoueidan/status/1289865845053652994"></a></blockquote></div><script src="https://platform.twitter.com/widgets.js" charset="utf-8" async></script>';
			t.is(output, expected);
		},
	);
});

/**
 * TEST: Build script returns expected HTML string, custom width
 */
validStrings.forEach(function(obj) {
	test(
		`${obj.type} default embed, custom width`,
		(t) => {
			const width = {
				width: 329,
			};
			const customOpt = merge(pluginDefaults, width);
			const idealCase = `<p>${obj.str}</p>`;
			const tweetObj = extractMatch(idealCase);
			const output = buildEmbed(tweetObj, customOpt, 0);
			const expected = '<div class="eleventy-plugin-embed-twitter"><blockquote id="tweet-1289865845053652994" class="twitter-tweet" data-width="329"><a href="https://twitter.com/SaraSoueidan/status/1289865845053652994"></a></blockquote></div><script src="https://platform.twitter.com/widgets.js" charset="utf-8" async></script>';
			t.is(output, expected);
		},
	);
});

/**
 * oEMBED BEHAVIORS
 * ================
 */

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
 * TEST: Build script returns expected oEmbed HTML string with custom alignment.
 */
validStrings.forEach(function(obj) {
	test(
		`${obj.type} cached oembed behavior, custom alignment`,
		async (t) => {
			const oEmbedOption = merge(pluginDefaults, {
				cacheText: true,
				align: 'center',
			});
			const idealCase = `<p>${obj.str}</p>`;
			const tweetObj = extractMatch(idealCase);
			const output = await buildEmbed(tweetObj, oEmbedOption, 0);
			const expected = '<div class="eleventy-plugin-embed-twitter"><blockquote class="twitter-tweet" align="center"><p lang="en" dir="ltr">I&#39;ve been increasingly feeling like Grid or Flex has become the new Tabs or Spaces.</p>&mdash; Sara Soueidan (@SaraSoueidan) <a href="https://twitter.com/SaraSoueidan/status/1289865845053652994?ref_src=twsrc%5Etfw">August 2, 2020</a></blockquote>\n<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>\n</div>';
			t.is(output, expected);
		},
	);
});

/**
 * TEST: Build script returns expected oEmbed HTML string with cards deactivated.
 */
validStrings.forEach(function(obj) {
	test(
		`${obj.type} cached oembed behavior, cards deactivated`,
		async (t) => {
			const oEmbedOption = merge(pluginDefaults, {
				cacheText: true,
				cards: 'hidden',
			});
			const idealCase = `<p>${obj.str}</p>`;
			const tweetObj = extractMatch(idealCase);
			const output = await buildEmbed(tweetObj, oEmbedOption, 0);
			const expected = '<div class="eleventy-plugin-embed-twitter"><blockquote class="twitter-tweet" data-cards="hidden"><p lang="en" dir="ltr">I&#39;ve been increasingly feeling like Grid or Flex has become the new Tabs or Spaces.</p>&mdash; Sara Soueidan (@SaraSoueidan) <a href="https://twitter.com/SaraSoueidan/status/1289865845053652994?ref_src=twsrc%5Etfw">August 2, 2020</a></blockquote>\n<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>\n</div>';
			t.is(output, expected);
		},
	);
});

/**
 * TEST: Build script returns expected oEmbed HTML string with conversations deactivated.
 * NOTE: If the tweet is NOT a response to another tweet, the oEmbed simply omits 
 * the data-conversation="none" custom data-attribute in the returned HTML value.
 * In this case the returned HTML has no custom data attribute. See following test!
 */
validStrings.forEach(function(obj) {
	test(
		`${obj.type} cached oembed behavior, conversations deactivated`,
		async (t) => {
			const oEmbedOption = merge(pluginDefaults, {
				cacheText: true,
				conversation: 'none',
			});
			const idealCase = `<p>${obj.str}</p>`;
			const tweetObj = extractMatch(idealCase);
			const output = await buildEmbed(tweetObj, oEmbedOption, 0);
			const expected = '<div class="eleventy-plugin-embed-twitter"><blockquote class="twitter-tweet"><p lang="en" dir="ltr">I&#39;ve been increasingly feeling like Grid or Flex has become the new Tabs or Spaces.</p>&mdash; Sara Soueidan (@SaraSoueidan) <a href="https://twitter.com/SaraSoueidan/status/1289865845053652994?ref_src=twsrc%5Etfw">August 2, 2020</a></blockquote>\n<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>\n</div>';
			t.is(output, expected);
		},
	);
});

/**
 * TEST: Build script returns expected oEmbed HTML string with conversations deactivated.
 * NOTE: If the tweet is NOT a response to another tweet, the oEmbed simply omits 
 * the data-conversation="none" custom data-attribute in the returned HTML value.
 * In this case the single response tweet DOES have a custom data attribute.
 */

test(
	`Response tweet, cached oembed behavior, conversation deactivated for a response`,
	async (t) => {
		const oEmbedOption = merge(pluginDefaults, {
			cacheText: true,
			conversation: 'none',
		});
		const idealCase = `<p>https://twitter.com/juanstoppa/status/1289865999425167360</p>`;
		const tweetObj = extractMatch(idealCase);
		const output = await buildEmbed(tweetObj, oEmbedOption, 0);
		const expected = '<div class="eleventy-plugin-embed-twitter"><blockquote class="twitter-tweet" data-conversation="none"><p lang="en" dir="ltr">what is your preference?</p>&mdash; Juan Stoppa (@juanstoppa) <a href="https://twitter.com/juanstoppa/status/1289865999425167360?ref_src=twsrc%5Etfw">August 2, 2020</a></blockquote>\n<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>\n</div>';
		t.is(output, expected);
	},
);

/**
 * TEST: Build script returns expected oEmbed HTML string with custom language.
 * NOTE: The `data-lang` value is independent of the language the Tweet 
 * is written in. This test demonstrates that the `data-lang` value can
 * be totally different from the `lang` value on the <p> tag that contains
 * the Tweet text, and defaults to "en" for English. See next test for a
 * variation on this.
 */
 validStrings.forEach(function(obj) {
	test(
		`${obj.type} cached oembed behavior, custom language`,
		async (t) => {
			const oEmbedOption = merge(pluginDefaults, {
				cacheText: true,
				lang: 'es',
			});
			const idealCase = `<p>${obj.str}</p>`;
			const tweetObj = extractMatch(idealCase);
			const output = await buildEmbed(tweetObj, oEmbedOption, 0);
			const expected = '<div class="eleventy-plugin-embed-twitter"><blockquote class="twitter-tweet" data-lang="es"><p lang="en" dir="ltr">I&#39;ve been increasingly feeling like Grid or Flex has become the new Tabs or Spaces.</p>&mdash; Sara Soueidan (@SaraSoueidan) <a href="https://twitter.com/SaraSoueidan/status/1289865845053652994?ref_src=twsrc%5Etfw">2 de agosto de 2020</a></blockquote>\n<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>\n</div>';
			t.is(output, expected);
		},
	);
});

/**
 * TEST: Build script returns expected oEmbed HTML string with custom language.
 * NOTE: The `data-lang` value is independent of the language the Tweet 
 * is written in. This test demonstrates a case where the user is setting
 * the embed `data-lang` value to match the language they typically
 * write Tweets in. See previous test for a variation on this.
 */
test(
	`Non-English tweet, cached oembed behavior, custom language`,
	async (t) => {
		const oEmbedOption = merge(pluginDefaults, {
			cacheText: true,
			lang: 'es',
		});
		const idealCase = `<p>https://twitter.com/ant_laguna/status/1250020567538905088</p>`;
		const tweetObj = extractMatch(idealCase);
		const output = await buildEmbed(tweetObj, oEmbedOption, 0);
		const expected = '<div class="eleventy-plugin-embed-twitter"><blockquote class="twitter-tweet" data-lang="es"><p lang="es" dir="ltr">¡Eso me pareció a mi!</p>&mdash; Antonio Laguna ツ (@ant_laguna) <a href="https://twitter.com/ant_laguna/status/1250020567538905088?ref_src=twsrc%5Etfw">14 de abril de 2020</a></blockquote>\n<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>\n</div>';
		t.is(output, expected);
	},
);


/**
 * TEST: Build script returns expected oEmbed HTML string with custom width.
 */
 validStrings.forEach(function(obj) {
	test(
		`${obj.type} cached oembed behavior, custom width`,
		async (t) => {
			const oEmbedOption = merge(pluginDefaults, {
				cacheText: true,
				width: 325,
			});
			const idealCase = `<p>${obj.str}</p>`;
			const tweetObj = extractMatch(idealCase);
			const output = await buildEmbed(tweetObj, oEmbedOption, 0);
			const expected = '<div class="eleventy-plugin-embed-twitter"><blockquote class="twitter-tweet" data-width="325"><p lang="en" dir="ltr">I&#39;ve been increasingly feeling like Grid or Flex has become the new Tabs or Spaces.</p>&mdash; Sara Soueidan (@SaraSoueidan) <a href="https://twitter.com/SaraSoueidan/status/1289865845053652994?ref_src=twsrc%5Etfw">August 2, 2020</a></blockquote>\n<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>\n</div>';
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
