const test = require('ava');
const merge = require('deepmerge');
const pattern = require('../lib/pattern.js');
const embed = require('../lib/embed.js');
const {defaults} = require('../lib/defaults.js');


const multipleEmbeds = `<p>https://www.youtube.com/watch?v=hIs5StN8J-0</p><p>https://www.youtube.com/watch?v=4JS70KB9GS0</p>`;
const expected = '<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed" style="position:relative;width:100%;padding-top: 56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" title="Embedded YouTube video" src="https://www.youtube-nocookie.com/embed/hIs5StN8J-0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div><div id="4JS70KB9GS0" class="eleventy-plugin-youtube-embed" style="position:relative;width:100%;padding-top: 56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" title="Embedded YouTube video" src="https://www.youtube-nocookie.com/embed/4JS70KB9GS0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>'

test(`Check that output doesn't produce duplicated embeds`, async t => {
  const {default: asyncReplace} = await import('string-replace-async');
  const content = multipleEmbeds;
  const config = defaults;
  let index = 0;
  const result = await asyncReplace(content, pattern, async (...match) => {
    return await embed(match, config, index++)
  });
  t.is(result, expected);

});

