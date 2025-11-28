const test = require('ava');
const merge = require('deepmerge');
const pattern = require('../lib/pattern.js');
const embed = require('../lib/embed.js');
const {defaults} = require('../lib/defaults.js');

const multipleEmbedsWithStartTimeTestString = `<p>https://www.youtube.com/watch?v=hIs5StN8J-0&t=5s</p><p>https://www.youtube.com/watch?v=4JS70KB9GS0</p>`;

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
 * Lite mode, testing scenarios with multiple videos
 */
test(`Build embed lite mode, two videos, start time should not bleed into the second video`, async t => {
  const {default: asyncReplace} = await import('string-replace-async');
  const content = multipleEmbedsWithStartTimeTestString;
  const config = override({lite: true});
  let index = 0;
  const result = await asyncReplace(content, pattern, async (...match) => {
    return await embed(match, config, index++)
  });

  t.is(result, `<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@0.3.3/src/lite-yt-embed.min.css">\n<script defer="defer" src="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@0.3.3/src/lite-yt-embed.min.js"></script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');" params="start=5"><div class="lty-playbtn"></div></lite-youtube></div><div id="4JS70KB9GS0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="4JS70KB9GS0" style="background-image: url('https://i.ytimg.com/vi/4JS70KB9GS0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`);
});

