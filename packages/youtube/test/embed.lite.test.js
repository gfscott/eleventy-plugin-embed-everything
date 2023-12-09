const test = require('ava');
const merge = require('deepmerge');
const pattern = require('../lib/pattern.js');
const embed = require('../lib/embed.js');
const {pluginDefaults} = require('../lib/pluginDefaults.js');
const { validateThumbnailSize } = require('../lib/buildEmbed.js');

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
const override = (obj) => merge(pluginDefaults, obj);

/**
 * Lite mode, zero index (first instance on page includes script and CSS)
 */
test(`Build embed lite mode, zero index, lite defaults`, t => {
  t.is(embed(extract(testString), override({lite: true}), 0),
  `<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@0.3.0/src/lite-yt-embed.min.css">\n<script defer="defer" src="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@0.3.0/src/lite-yt-embed.min.js"></script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
  );
});
test(`Build embed lite mode, zero index, valid thumbnail quality override`, t => {
  t.is(embed(extract(testString), override({lite: { thumbnailQuality: 'maxresdefault'}}), 0),
  `<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@0.3.0/src/lite-yt-embed.min.css">\n<script defer="defer" src="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@0.3.0/src/lite-yt-embed.min.js"></script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/maxresdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
  );
});
test(`Build embed lite mode, zero index, invalid thumbnail quality override`, t => {
  t.is(embed(extract(testString), override({lite: { thumbnailQuality: 'nope'}}), 0),
  `<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@0.3.0/src/lite-yt-embed.min.css">\n<script defer="defer" src="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@0.3.0/src/lite-yt-embed.min.js"></script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
  );
});
test(`Build embed lite mode, zero index, lite defaults with URL start time param`, t => {
  t.is(embed(extract('<p>https://www.youtube.com/watch?v=hIs5StN8J-0&t=30s</p>'), override({lite: true}), 0),
  `<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@0.3.0/src/lite-yt-embed.min.css">\n<script defer="defer" src="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@0.3.0/src/lite-yt-embed.min.js"></script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');" params="start=30"><div class="lty-playbtn"></div></lite-youtube></div>`
  );
});
test(`Build embed lite mode, zero index, css disabled`, t => {
  t.is(embed(extract(testString), override({lite:{css:{enabled: false}}}), 0),
  `<script defer="defer" src="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@0.3.0/src/lite-yt-embed.min.js"></script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
  );
});
test(`Build embed lite mode, zero index, css inline`, t => {
  t.is(embed(extract(testString), override({lite:{css:{inline: true}}}), 0),
  `<style>${inlineCss}</style>\n<script defer="defer" src="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@0.3.0/src/lite-yt-embed.min.js"></script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
  );
});
test(`Build embed lite mode, zero index, css path override`, t => {
  t.is(embed(extract(testString), override({lite:{css:{path: 'foo'}}}), 0),
  `<link rel="stylesheet" href="foo">\n<script defer="defer" src="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@0.3.0/src/lite-yt-embed.min.js"></script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
  );
});
test(`Build embed lite mode, zero index, js disabled`, t => {
  t.is(embed(extract(testString), override({lite:{js:{enabled: false}}}), 0),
  `<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@0.3.0/src/lite-yt-embed.min.css">\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
  );
});
test(`Build embed lite mode, zero index, js inline`, t => {
  t.is(embed(extract(testString), override({lite:{js:{inline: true}}}), 0),
  `<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@0.3.0/src/lite-yt-embed.min.css">\n<script>${inlineJs}</script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
  );
});
test(`Build embed lite mode, zero index, css AND js disabled`, t => {
  t.is(embed(extract(testString), override({lite:{css:{enabled:false},js:{enabled:false}}}), 0),
  `<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
  );
});
test(`Build embed lite mode, zero index, css AND js path override`, t => {
  t.is(embed(extract(testString), override({lite:{css:{path: 'foo'},js:{path: 'foo'}}}), 0),
  `<link rel="stylesheet" href="foo">\n<script defer="defer" src="foo"></script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
  );
});
test(`Build embed lite mode, zero index, css AND js inline`, t => {
  t.is(embed(extract(testString), override({lite:{css:{inline: true},js:{inline: true}}}), 0),
  `<style>${inlineCss}</style>\n<script>${inlineJs}</script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
  );
});
test(`Build embed lite mode, zero index, responsive true`, t => {
  t.is(embed(extract(testString), override({lite: { responsive: true }}), 0),
  `<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@0.3.0/src/lite-yt-embed.min.css">\n<script defer="defer" src="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@0.3.0/src/lite-yt-embed.min.js"></script>\n<style>.eleventy-plugin-youtube-embed lite-youtube {max-width:100%}</style>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
  );
});


/**
 * Lite mode, 1+ index (no style or script on subsequent outputs)
 */
test(`Build embed lite mode, 1+ index, lite defaults`, t => {
  t.is(embed(extract(testString), override({lite: true}), 1),
  `<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
  );
});
test(`Build embed lite mode, 1+ index, lite defaults with URL start time param`, t => {
  t.is(embed(extract('<p>https://www.youtube.com/watch?v=hIs5StN8J-0&t=30s</p>'), override({lite: true}), 1),
  `<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');" params="start=30"><div class="lty-playbtn"></div></lite-youtube></div>`
  );
});
test(`Build embed lite mode, 1+ index, css disabled`, t => {
  t.is(embed(extract(testString), override({lite:{css:{enabled: false}}}), 1),
  `<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
  );
});
test(`Build embed lite mode, 1+ index, css inline`, t => {
  t.is(embed(extract(testString), override({lite:{css:{inline: true}}}), 1),
  `<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
  );
});
test(`Build embed lite mode, 1+ index, css path override`, t => {
  t.is(embed(extract(testString), override({lite:{css:{path: 'foo'}}}), 1),
  `<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
  );
});
test(`Build embed lite mode, 1+ index, js disabled`, t => {
  t.is(embed(extract(testString), override({lite:{js:{enabled: false}}}), 1),
  `<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
  );
});
test(`Build embed lite mode, 1+ index, js inline`, t => {
  t.is(embed(extract(testString), override({lite:{js:{inline: true}}}), 1),
  `<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
  );
});
test(`Build embed lite mode, 1+ index, responsive true`, t => {
  t.is(embed(extract(testString), override({lite: { responive: true }}), 1),
  `<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
  );
});

/**
 * In lite mode, test that the thumbnail size validator returns the expected values.
*/
test(`Thumbnail validator returns default value in response to empty parameter`, t => {
  t.is(validateThumbnailSize(), 'hqdefault');
});
test(`Thumbnail validator returns default value in response to incorrect parameter types`, t => {
  t.is(validateThumbnailSize(1), 'hqdefault');
  t.is(validateThumbnailSize(true), 'hqdefault');
});
test(`Thumbnail validator returns default value in response to invalid string`, t => {
  t.is(validateThumbnailSize('foo'), 'hqdefault');
});
test(`Thumbnail validator returns expected strings when passed expected strings`, t => {
  t.is(validateThumbnailSize('default'), 'default');
  t.is(validateThumbnailSize('hqdefault'), 'hqdefault');
  t.is(validateThumbnailSize('mqdefault'), 'mqdefault');
  t.is(validateThumbnailSize('sddefault'), 'sddefault');
  t.is(validateThumbnailSize('maxresdefault'), 'maxresdefault');
});