const test = require('ava');
const merge = require('deepmerge');
const pattern = require('../lib/pattern.js');
const embed = require('../lib/embed.js');
const {defaults} = require('../lib/defaults.js');
const { validateThumbnailSize, validateThumbnailFormat, stringifyUrlParams } = require('../lib/embed.js');

const fs = require('fs');
const path = require('path');
const liteCssFilePath = path.resolve(__dirname, '../node_modules/lite-youtube-embed/src/lite-yt-embed.css');
const liteJsFilePath = path.resolve(__dirname, '../node_modules/lite-youtube-embed/src/lite-yt-embed.js');
const inlineCss = fs.readFileSync(liteCssFilePath, 'utf-8');
const inlineJs = fs.readFileSync(liteJsFilePath, 'utf-8');

const testString = '<p>https://www.youtube.com/watch?v=hIs5StN8J-0</p>';

/**
 * Extract matches from the string
 * @param {string} str
 * @returns {Array} An array of matches
 */
const extract = (str) => {
  // You have to reset the lastIndex property of the regex
  // object before calling exec again, or it returns null
  pattern.lastIndex = 0;
  return pattern.exec(str)
};

/**
 * Override plugin default settings
 * @param {object} Object with user-configurable settings
 * @returns {object}
 */
const override = (obj) => merge(defaults, obj);

/**
 * Lite mode, zero index (first instance on page includes script and CSS)
 */
test(`Build embed lite mode, zero index, lite defaults`, async t => {
	t.is(await embed(extract(testString), override({lite: true}), 0),
	`<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@0.3.3/src/lite-yt-embed.min.css">\n<script defer="defer" src="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@0.3.3/src/lite-yt-embed.min.js"></script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
	);
});
test(`Build embed lite mode, zero index, JS API enabled`, async t => {
	t.is(await embed(extract(testString), override({lite: {jsApi: true}}), 0),
	`<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@0.3.3/src/lite-yt-embed.min.css">\n<script defer="defer" src="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@0.3.3/src/lite-yt-embed.min.js"></script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');" js-api><div class="lty-playbtn"></div></lite-youtube></div>`
	);
});
test(`Build embed lite mode, zero index, valid thumbnail format override`, async t => {
	t.is(await embed(extract(testString), override({lite: {thumbnailFormat: 'webp'}}), 0),
	`<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@0.3.3/src/lite-yt-embed.min.css">\n<script defer="defer" src="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@0.3.3/src/lite-yt-embed.min.js"></script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi_webp/hIs5StN8J-0/hqdefault.webp');"><div class="lty-playbtn"></div></lite-youtube></div>`
	);
});
test(`Build embed lite mode, zero index, invalid thumbnail format override`, async t => {
	t.is(await embed(extract(testString), override({lite: {thumbnailFormat: 'no'}}), 0),
	`<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@0.3.3/src/lite-yt-embed.min.css">\n<script defer="defer" src="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@0.3.3/src/lite-yt-embed.min.js"></script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
	);
});
test(`Build embed lite mode, zero index, valid thumbnail quality override`, async t => {
	t.is(await embed(extract(testString), override({lite: { thumbnailQuality: 'maxresdefault'}}), 0),
	`<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@0.3.3/src/lite-yt-embed.min.css">\n<script defer="defer" src="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@0.3.3/src/lite-yt-embed.min.js"></script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/maxresdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
	);
});
test(`Build embed lite mode, zero index, invalid thumbnail quality override`, async t => {
	t.is(await embed(extract(testString), override({lite: { thumbnailQuality: 'nope'}}), 0),
	`<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@0.3.3/src/lite-yt-embed.min.css">\n<script defer="defer" src="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@0.3.3/src/lite-yt-embed.min.js"></script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
	);
});
test(`Build embed lite mode, zero index, lite defaults with URL start time param`, async t => {
	t.is(await embed(extract('<p>https://www.youtube.com/watch?v=hIs5StN8J-0&t=30s</p>'), override({lite: true}), 0),
	`<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@0.3.3/src/lite-yt-embed.min.css">\n<script defer="defer" src="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@0.3.3/src/lite-yt-embed.min.js"></script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');" params="start=30"><div class="lty-playbtn"></div></lite-youtube></div>`
	);
});
test(`Build embed lite mode, zero index, css disabled`, async t => {
	t.is(await embed(extract(testString), override({lite:{css:{enabled: false}}}), 0),
	`<script defer="defer" src="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@0.3.3/src/lite-yt-embed.min.js"></script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
	);
});
test(`Build embed lite mode, zero index, css inline`, async t => {
	t.is(await embed(extract(testString), override({lite:{css:{inline: true}}}), 0),
	`<style>${inlineCss}</style>\n<script defer="defer" src="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@0.3.3/src/lite-yt-embed.min.js"></script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
	);
});
test(`Build embed lite mode, zero index, css path override`, async t => {
	t.is(await embed(extract(testString), override({lite:{css:{path: 'foo'}}}), 0),
	`<link rel="stylesheet" href="foo">\n<script defer="defer" src="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@0.3.3/src/lite-yt-embed.min.js"></script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
	);
});
test(`Build embed lite mode, zero index, js disabled`, async t => {
	t.is(await embed(extract(testString), override({lite:{js:{enabled: false}}}), 0),
	`<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@0.3.3/src/lite-yt-embed.min.css">\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
	);
});
test(`Build embed lite mode, zero index, js inline`, async t => {
	t.is(await embed(extract(testString), override({lite:{js:{inline: true}}}), 0),
	`<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@0.3.3/src/lite-yt-embed.min.css">\n<script>${inlineJs}</script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
	);
});
test(`Build embed lite mode, zero index, css AND js disabled`, async t => {
	t.is(await embed(extract(testString), override({lite:{css:{enabled:false},js:{enabled:false}}}), 0),
	`<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
	);
});
test(`Build embed lite mode, zero index, css AND js path override`, async t => {
	t.is(await embed(extract(testString), override({lite:{css:{path: 'foo'},js:{path: 'foo'}}}), 0),
	`<link rel="stylesheet" href="foo">\n<script defer="defer" src="foo"></script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
	);
});
test(`Build embed lite mode, zero index, css AND js inline`, async t => {
	t.is(await embed(extract(testString), override({lite:{css:{inline: true},js:{inline: true}}}), 0),
	`<style>${inlineCss}</style>\n<script>${inlineJs}</script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
	);
});
test(`Build embed lite mode, zero index, responsive true`, async t => {
	t.is(await embed(extract(testString), override({lite: { responsive: true }}), 0),
	`<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@0.3.3/src/lite-yt-embed.min.css">\n<script defer="defer" src="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@0.3.3/src/lite-yt-embed.min.js"></script>\n<style>.eleventy-plugin-youtube-embed lite-youtube {max-width:100%}</style>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
	);
});
test(`Build embed lite mode, zero index, fetch title via oembed`, async t => {
	t.is(await embed(extract(testString), override({lite: { responsive: true }, titleOptions: {download: true}}), 0),
	`<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@0.3.3/src/lite-yt-embed.min.css">\n<script defer="defer" src="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@0.3.3/src/lite-yt-embed.min.js"></script>\n<style>.eleventy-plugin-youtube-embed lite-youtube {max-width:100%}</style>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');" title="Animotion - Obsession"><div class="lty-playbtn"></div></lite-youtube></div>`
	);
});
test(`Build embed lite mode, zero index, default title set but should be ignored`, async t => {
	t.is(await embed(extract(testString), override({lite: { responsive: true }, title: "Foo"}), 0),
	`<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@0.3.3/src/lite-yt-embed.min.css">\n<script defer="defer" src="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@0.3.3/src/lite-yt-embed.min.js"></script>\n<style>.eleventy-plugin-youtube-embed lite-youtube {max-width:100%}</style>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
	);
});


/**
 * Lite mode, 1+ index (no style or script on subsequent outputs)
 */
test(`Build embed lite mode, 1+ index, lite defaults`, async t => {
	t.is(await embed(extract(testString), override({lite: true}), 1),
	`<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
	);
});
test(`Build embed lite mode, 1+ index, JS API enabled`, async t => {
	t.is(await embed(extract(testString), override({lite: {jsApi: true}}), 1),
	`<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');" js-api><div class="lty-playbtn"></div></lite-youtube></div>`
	);
});
test(`Build embed lite mode, 1+ index, valid thumbnail quality override`, async t => {
	t.is(await embed(extract(testString), override({lite: { thumbnailQuality: 'maxresdefault'}}), 1),
	`<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/maxresdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
	);
});
test(`Build embed lite mode, 1+ index, invalid thumbnail quality override`, async t => {
	t.is(await embed(extract(testString), override({lite: { thumbnailQuality: 'nope'}}), 1),
	`<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
	);
});
test(`Build embed lite mode, 1+ index, valid thumbnail format override`, async t => {
	t.is(await embed(extract(testString), override({lite: {thumbnailFormat: 'webp'}}), 1),
	`<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi_webp/hIs5StN8J-0/hqdefault.webp');"><div class="lty-playbtn"></div></lite-youtube></div>`
	);
});
test(`Build embed lite mode, 1+ index, invalid thumbnail format override`, async t => {
	t.is(await embed(extract(testString), override({lite: {thumbnailFormat: 'foo'}}), 1),
	`<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
	);
});
test(`Build embed lite mode, 1+ index, lite defaults with URL start time param`, async t => {
	t.is(await embed(extract('<p>https://www.youtube.com/watch?v=hIs5StN8J-0&t=30s</p>'), override({lite: true}), 1),
	`<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');" params="start=30"><div class="lty-playbtn"></div></lite-youtube></div>`
	);
});
test(`Build embed lite mode, 1+ index, css disabled`, async t => {
	t.is(await embed(extract(testString), override({lite:{css:{enabled: false}}}), 1),
	`<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
	);
});
test(`Build embed lite mode, 1+ index, css inline`, async t => {
	t.is(await embed(extract(testString), override({lite:{css:{inline: true}}}), 1),
	`<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
	);
});
test(`Build embed lite mode, 1+ index, css path override`, async t => {
	t.is(await embed(extract(testString), override({lite:{css:{path: 'foo'}}}), 1),
	`<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
	);
});
test(`Build embed lite mode, 1+ index, js disabled`, async t => {
	t.is(await embed(extract(testString), override({lite:{js:{enabled: false}}}), 1),
	`<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
	);
});
test(`Build embed lite mode, 1+ index, js inline`, async t => {
	t.is(await embed(extract(testString), override({lite:{js:{inline: true}}}), 1),
	`<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
	);
});
test(`Build embed lite mode, 1+ index, responsive true`, async t => {
	t.is(await embed(extract(testString), override({lite: { responsive: true }}), 1),
	`<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
	);
});
test(`Build embed lite mode, 1+ index, fetch title via oembed`, async t => {
	t.is(await embed(extract(testString), override({lite: { responsive: true }, titleOptions: {download: true}}), 1),
	`<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');" title="Animotion - Obsession"><div class="lty-playbtn"></div></lite-youtube></div>`
	);
});
test(`Build embed lite mode, 1+ index, default title set but should be ignored`, async t => {
	t.is(await embed(extract(testString), override({lite: { responsive: true }, title: "Foo"}), 1),
	`<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
	);
});

/**
 * In lite mode, test that the thumbnail validators return the expected values.
*/
test(`Thumbnail size validator returns default value in response to empty parameter`, t => {
  t.is(validateThumbnailSize(), 'hqdefault');
});
test(`Thumbnail size validator returns default value in response to incorrect parameter types`, t => {
  t.is(validateThumbnailSize(1), 'hqdefault');
  t.is(validateThumbnailSize(true), 'hqdefault');
});
test(`Thumbnail size validator returns default value in response to invalid string`, t => {
  t.is(validateThumbnailSize('foo'), 'hqdefault');
});
test(`Thumbnail size validator returns expected strings when passed expected strings`, t => {
  t.is(validateThumbnailSize('default'), 'default');
  t.is(validateThumbnailSize('hqdefault'), 'hqdefault');
  t.is(validateThumbnailSize('mqdefault'), 'mqdefault');
  t.is(validateThumbnailSize('sddefault'), 'sddefault');
  t.is(validateThumbnailSize('maxresdefault'), 'maxresdefault');
});

test(`Thumbnail format validator returns default value in response to empty parameter`, t => {
  t.is(validateThumbnailFormat(), 'jpg');
})
test(`Thumbnail format validator returns default value in response to incorrect parameter types`, t => {
  t.is(validateThumbnailFormat(1), 'jpg');
  t.is(validateThumbnailFormat(true), 'jpg');
});
test(`Thumbnail format validator returns default value in response to invalid string`, t => {
  t.is(validateThumbnailFormat('avif'), 'jpg');
});
test(`Thumbnail format validator returns expected strings when passed expected strings`, t => {
  t.is(validateThumbnailFormat('jpg'), 'jpg');
  t.is(validateThumbnailFormat('webp'), 'webp');
});

/**
 * Test that the URL parameters are correctly stringified
 */
test(`Stringify URL params returns empty string in response to empty object`, t => {
	t.is(stringifyUrlParams({}), '');
});
test(`Stringify URL params returns expected string in default mode, autoplay`, t => {
	t.is(stringifyUrlParams({allowAutoplay: true}), '?autoplay=1');
});
test(`Stringify URL params returns expected string in default mode, recommendations`, t => {
	t.is(stringifyUrlParams({recommendSelfOnly: true}), '?rel=0');
});
test(`Stringify URL params returns expected string in default mode, multiple values`, t => {
	const o = {
		allowAutoplay: true,
		recommendSelfOnly: true,
	}
	t.is(stringifyUrlParams(o), '?autoplay=1&amp;rel=0');
});

test(`Stringify URL params returns expected string in lite mode, autoplay`, t => {
	const o = {
		lite: true,
		allowAutoplay: true,
	}
	t.is(stringifyUrlParams(o), 'autoplay=1');
});
test(`Stringify URL params returns expected string in lite mode, recommendations`, t => {
	const o = {
		lite: true,
		recommendSelfOnly: true,
	}
	t.is(stringifyUrlParams(o), 'rel=0');
});
test(`Stringify URL params returns expected string in lite mode, multiple values`, t => {
	const o = {
		lite: true,
		allowAutoplay: true,
		recommendSelfOnly: true,
	}
	t.is(stringifyUrlParams(o), 'autoplay=1&amp;rel=0');
});

