const test = require('ava');
const merge = require('deepmerge');
const pattern = require('../lib/pattern.js');
const embed = require('../lib/embed.js');
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

const testString = '<p>https://www.youtube.com/playlist?list=PLCbA9r6ecYWU6SVyvb32a0YHIzpr9jxnW</p>';

test(`Playlist embed default mode, default settings`, async t => {
  t.is(await embed(extract(testString), defaults),
    '<div id="PLCbA9r6ecYWU6SVyvb32a0YHIzpr9jxnW" class="eleventy-plugin-youtube-embed" style="position:relative;width:100%;padding-top: 56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" title="Embedded YouTube video" src="https://www.youtube-nocookie.com/embed/videoseries?list=PLCbA9r6ecYWU6SVyvb32a0YHIzpr9jxnW" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>'
  );
});

test(`Playlist embed default mode, override allowAttrs`, async t => {
  t.is(await embed(extract(testString), override({allowAttrs: 'foo'})),
    '<div id="PLCbA9r6ecYWU6SVyvb32a0YHIzpr9jxnW" class="eleventy-plugin-youtube-embed" style="position:relative;width:100%;padding-top: 56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" title="Embedded YouTube video" src="https://www.youtube-nocookie.com/embed/videoseries?list=PLCbA9r6ecYWU6SVyvb32a0YHIzpr9jxnW" allow="foo" allowfullscreen></iframe></div>'
  );
});

test(`Playlist embed default mode, override allowFullscreen`, async t => {
  t.is(await embed(extract(testString), override({allowFullscreen: false})),
    '<div id="PLCbA9r6ecYWU6SVyvb32a0YHIzpr9jxnW" class="eleventy-plugin-youtube-embed" style="position:relative;width:100%;padding-top: 56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" title="Embedded YouTube video" src="https://www.youtube-nocookie.com/embed/videoseries?list=PLCbA9r6ecYWU6SVyvb32a0YHIzpr9jxnW" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe></div>'
  );
});

test(`Playlist embed default mode, override allowAutoplay`, async t => {
  t.is(await embed(extract(testString), override({allowAutoplay: true})),
    '<div id="PLCbA9r6ecYWU6SVyvb32a0YHIzpr9jxnW" class="eleventy-plugin-youtube-embed" style="position:relative;width:100%;padding-top: 56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" title="Embedded YouTube video" src="https://www.youtube-nocookie.com/embed/videoseries?list=PLCbA9r6ecYWU6SVyvb32a0YHIzpr9jxnW&autoplay=1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>'
  );
});

test(`Playlist embed default mode, override embed class`, async t => {
  t.is(await embed(extract(testString), override({embedClass: 'foo'})),
    '<div id="PLCbA9r6ecYWU6SVyvb32a0YHIzpr9jxnW" class="foo" style="position:relative;width:100%;padding-top: 56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" title="Embedded YouTube video" src="https://www.youtube-nocookie.com/embed/videoseries?list=PLCbA9r6ecYWU6SVyvb32a0YHIzpr9jxnW" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>'
  );
});

test(`Playlist embed default mode, override lazy loading`, async t => {
  t.is(await embed(extract(testString), override({lazy: true})),
    '<div id="PLCbA9r6ecYWU6SVyvb32a0YHIzpr9jxnW" class="eleventy-plugin-youtube-embed" style="position:relative;width:100%;padding-top: 56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" title="Embedded YouTube video" src="https://www.youtube-nocookie.com/embed/videoseries?list=PLCbA9r6ecYWU6SVyvb32a0YHIzpr9jxnW" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen loading="lazy"></iframe></div>'
  );
});

test(`Playlist embed default mode, override noCookie`, async t => {
  t.is(await embed(extract(testString), override({noCookie: false})),
    '<div id="PLCbA9r6ecYWU6SVyvb32a0YHIzpr9jxnW" class="eleventy-plugin-youtube-embed" style="position:relative;width:100%;padding-top: 56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" title="Embedded YouTube video" src="https://www.youtube.com/embed/videoseries?list=PLCbA9r6ecYWU6SVyvb32a0YHIzpr9jxnW" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>'
  );
});

test(`Playlist embed default mode, override recommendSelfOnly`, async t => {
  t.is(await embed(extract(testString), override({recommendSelfOnly: true})),
    '<div id="PLCbA9r6ecYWU6SVyvb32a0YHIzpr9jxnW" class="eleventy-plugin-youtube-embed" style="position:relative;width:100%;padding-top: 56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" title="Embedded YouTube video" src="https://www.youtube-nocookie.com/embed/videoseries?list=PLCbA9r6ecYWU6SVyvb32a0YHIzpr9jxnW&rel=1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>'
  );
});
