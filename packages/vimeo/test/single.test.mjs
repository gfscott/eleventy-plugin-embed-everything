/**
 * Simplified test file for quickly trying out changes in development
 * without running the whole test suite.
 */

import test from 'ava';
import defaults from '../lib/defaults.js';
import pattern from '../lib/pattern.js';
import replace from '../lib/replace.js';

const str = "<p>https://vimeo.com/123456/c0ffee</p>";

test(`Embed string, default options`, async t => {
	const config = Object.assign({}, defaults, {});
	let embed = str.replace(pattern, (...match) => replace(match, config));
	t.is(embed, '<div id="vimeo-123456" class="eleventy-plugin-vimeo-embed" style="position:relative;width:100%;padding-top:56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" frameborder="0" src="https://player.vimeo.com/video/123456?dnt=1" allowfullscreen></iframe></div>')
});
