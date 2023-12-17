const test = require('ava');
const merge = require('deepmerge');
const pattern = require('../lib/pattern.js');
const {defaultEmbed: embed} = require('../lib/embed.js');
const {defaults} = require('../lib/defaults.js');

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

const id = 'hIs5StN8J-0';
const url = 'https://www.youtube.com/watch?v=hIs5StN8J-0';

test(`Build embed default mode, default settings`, async t => {
  t.is(await embed({id, url}, defaults),
    '<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed" style="position:relative;width:100%;padding-top: 56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" title="Embedded YouTube video" src="https://www.youtube-nocookie.com/embed/hIs5StN8J-0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>'
  );
});

test(`Build embed default mode, override nothing`, async t => {
  t.is(
    (await embed({id, url}, defaults)),
    '<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed" style="position:relative;width:100%;padding-top: 56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" title="Embedded YouTube video" src="https://www.youtube-nocookie.com/embed/hIs5StN8J-0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>'
  );
});

test(`Build embed default mode, override allowAttrs`, async t => {
  t.is(await embed({id, url}, override({allowAttrs: 'foo'})),
    '<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed" style="position:relative;width:100%;padding-top: 56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" title="Embedded YouTube video" src="https://www.youtube-nocookie.com/embed/hIs5StN8J-0" allow="foo" allowfullscreen></iframe></div>'
  );
});

test(`Build embed default mode, override allowFullscreen`, async t => {
  t.is(await embed({id, url}, override({allowFullscreen: false})),
    '<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed" style="position:relative;width:100%;padding-top: 56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" title="Embedded YouTube video" src="https://www.youtube-nocookie.com/embed/hIs5StN8J-0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe></div>'
  );
});

test(`Build embed default mode, override allowAutoplay`, async t => {
  t.is(await embed({id, url}, override({allowAutoplay: true})),
    '<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed" style="position:relative;width:100%;padding-top: 56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" title="Embedded YouTube video" src="https://www.youtube-nocookie.com/embed/hIs5StN8J-0?autoplay=1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>'
  );
});

test(`Build embed default mode, override embedClass`, async t => {
  t.is(await embed({id, url}, override({embedClass: 'foo'})),
    '<div id="hIs5StN8J-0" class="foo" style="position:relative;width:100%;padding-top: 56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" title="Embedded YouTube video" src="https://www.youtube-nocookie.com/embed/hIs5StN8J-0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>'
  );
});

test(`Build embed default mode, override lazy`, async t => {
  t.is(await embed({id, url}, override({lazy: true})),
    '<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed" style="position:relative;width:100%;padding-top: 56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" title="Embedded YouTube video" src="https://www.youtube-nocookie.com/embed/hIs5StN8J-0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>'
  );
});

test(`Build embed default mode, override noCookie`, async t => {
  t.is(await embed({id, url}, override({noCookie: false})),
    '<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed" style="position:relative;width:100%;padding-top: 56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" title="Embedded YouTube video" src="https://www.youtube.com/embed/hIs5StN8J-0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>'
  );
});

test(`Build embed default mode, override modestBranding`, async t => {
  t.is(await embed({id, url}, override({modestBranding: true})),
    '<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed" style="position:relative;width:100%;padding-top: 56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" title="Embedded YouTube video" src="https://www.youtube-nocookie.com/embed/hIs5StN8J-0?modestbranding=1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>'
  );
});

test(`Build embed default mode, override recommendSelfOnly`, async t => {
  t.is(await embed({id, url}, override({recommendSelfOnly: true})),
    '<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed" style="position:relative;width:100%;padding-top: 56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" title="Embedded YouTube video" src="https://www.youtube-nocookie.com/embed/hIs5StN8J-0?rel=0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>'
  );
});

test(`Build embed default mode, override start time`, async t => {
  t.is(await embed({id, url}, override({startTime: 30})),
    '<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed" style="position:relative;width:100%;padding-top: 56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" title="Embedded YouTube video" src="https://www.youtube-nocookie.com/embed/hIs5StN8J-0?start=30" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>'
  );
});

test(`Build embed default mode, override start time via URL`, async t => {
  t.is(await embed({id: 'hIs5StN8J-0', url: 'https://www.youtube.com/watch?v=hIs5StN8J-0&t=30s'}, override({})),
    '<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed" style="position:relative;width:100%;padding-top: 56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" title="Embedded YouTube video" src="https://www.youtube-nocookie.com/embed/hIs5StN8J-0?start=30" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>'
  );
});

test(`Build embed default mode, short link with override start time via URL`, async t => {
  t.is(await embed({id: 'hIs5StN8J-0', url: 'https://youtu.be/hIs5StN8J-0?t=30'}, override({})),
    '<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed" style="position:relative;width:100%;padding-top: 56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" title="Embedded YouTube video" src="https://www.youtube-nocookie.com/embed/hIs5StN8J-0?start=30" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>'
  );
});

test(`Build embed default mode, downloading video title`, async t => {
  t.is(await embed({id, url}, override({titleOptions: {download: true}})),
    '<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed" style="position:relative;width:100%;padding-top: 56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" title="Animotion - Obsession (Official Music Video)" src="https://www.youtube-nocookie.com/embed/hIs5StN8J-0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>'
  );
});

// Video id doesn't exist, so oEmbed fetch will fail, returning the default title instead
test(`Build embed default mode, downloading video title with error state`, async t => {
  t.is(await embed({id: '00000000000', url: 'https://www.youtube.com/watch?v=00000000000'}, override({titleOptions: {download: true}})),
    '<div id="00000000000" class="eleventy-plugin-youtube-embed" style="position:relative;width:100%;padding-top: 56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" title="Embedded YouTube video" src="https://www.youtube-nocookie.com/embed/00000000000" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>'
  );
});