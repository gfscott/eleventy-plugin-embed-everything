const test = require('ava');
const extractMatches = require('../lib/extractMatches.js');
const buildEmbed = require('../lib/buildEmbed.js');
const { validateThumbnailSize } = require('../lib/buildEmbed.js');
const { pluginDefaults } = require('../lib/pluginDefaults.js');

const videoData = extractMatches('<p>https://www.youtube.com/watch?v=hIs5StN8J-0</p>');

const fs = require('fs');
const path = require('path');
const liteCssFilePath = path.resolve(__dirname, '../node_modules/lite-youtube-embed/src/lite-yt-embed.css');
const liteJsFilePath = path.resolve(__dirname, '../node_modules/lite-youtube-embed/src/lite-yt-embed.js');
const inlineCss = fs.readFileSync(liteCssFilePath, 'utf-8');
const inlineJs = fs.readFileSync(liteJsFilePath, 'utf-8');

/**
 * Override plugin default settings
 * @param {object} obj
 * @returns {object}
 */
 const override = (obj) => Object.assign({}, pluginDefaults, obj)

 test(`Build embed default mode, default settings`, t => {
   t.is(buildEmbed(videoData, pluginDefaults),
     '<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed" style="position:relative;width:100%;padding-top: 56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" title="Embedded YouTube video" src="https://www.youtube-nocookie.com/embed/hIs5StN8J-0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>'
   );
 });
 test(`Build embed default mode, override nothing`, t => {
   t.is(buildEmbed(videoData, override({})),
     '<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed" style="position:relative;width:100%;padding-top: 56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" title="Embedded YouTube video" src="https://www.youtube-nocookie.com/embed/hIs5StN8J-0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>'
   );
 });
 test(`Build embed default mode, override allowAttrs`, t => {
   t.is(buildEmbed(videoData, override({allowAttrs: 'foo'})),
     '<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed" style="position:relative;width:100%;padding-top: 56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" title="Embedded YouTube video" src="https://www.youtube-nocookie.com/embed/hIs5StN8J-0" allow="foo" allowfullscreen></iframe></div>'
   );
 });
 test(`Build embed default mode, override allowFullscreen`, t => {
   t.is(buildEmbed(videoData, override({allowFullscreen: false})),
     '<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed" style="position:relative;width:100%;padding-top: 56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" title="Embedded YouTube video" src="https://www.youtube-nocookie.com/embed/hIs5StN8J-0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe></div>'
   );
 });
 test(`Build embed default mode, override allowAutoplay`, t => {
   t.is(buildEmbed(videoData, override({allowAutoplay: true})),
     '<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed" style="position:relative;width:100%;padding-top: 56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" title="Embedded YouTube video" src="https://www.youtube-nocookie.com/embed/hIs5StN8J-0?autoplay=1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>'
   );
 });
 test(`Build embed default mode, override embedClass`, t => {
   t.is(buildEmbed(videoData, override({embedClass: 'foo'})),
     '<div id="hIs5StN8J-0" class="foo" style="position:relative;width:100%;padding-top: 56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" title="Embedded YouTube video" src="https://www.youtube-nocookie.com/embed/hIs5StN8J-0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>'
   );
 });
 test(`Build embed default mode, override lazy`, t => {
   t.is(buildEmbed(videoData, override({lazy: true})),
     '<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed" style="position:relative;width:100%;padding-top: 56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" title="Embedded YouTube video" src="https://www.youtube-nocookie.com/embed/hIs5StN8J-0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>'
   );
 });
 test(`Build embed default mode, override noCookie`, t => {
   t.is(buildEmbed(videoData, override({noCookie: false})),
     '<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed" style="position:relative;width:100%;padding-top: 56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" title="Embedded YouTube video" src="https://www.youtube.com/embed/hIs5StN8J-0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>'
   );
 });
 test(`Build embed default mode, override modestBranding`, t => {
   t.is(buildEmbed(videoData, override({modestBranding: true})),
     '<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed" style="position:relative;width:100%;padding-top: 56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" title="Embedded YouTube video" src="https://www.youtube-nocookie.com/embed/hIs5StN8J-0?modestbranding=1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>'
   );
 });
 test(`Build embed default mode, override recommendSelfOnly`, t => {
   t.is(buildEmbed(videoData, override({recommendSelfOnly: true})),
     '<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed" style="position:relative;width:100%;padding-top: 56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" title="Embedded YouTube video" src="https://www.youtube-nocookie.com/embed/hIs5StN8J-0?rel=0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>'
   );
 });
 test(`Build embed default mode, override start time`, t => {
   t.is(buildEmbed(videoData, override({startTime: 30})),
     '<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed" style="position:relative;width:100%;padding-top: 56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" title="Embedded YouTube video" src="https://www.youtube-nocookie.com/embed/hIs5StN8J-0?start=30" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>'
   );
 });
 test(`Build embed default mode, override start time via URL`, t => {
   t.is(buildEmbed(extractMatches('<p>https://www.youtube.com/watch?v=hIs5StN8J-0&t=30s</p>'), override({})),
     '<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed" style="position:relative;width:100%;padding-top: 56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" title="Embedded YouTube video" src="https://www.youtube-nocookie.com/embed/hIs5StN8J-0?start=30" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>'
   );
 });
 test(`Build embed default mode, short link with override start time via URL`, t => {
   t.is(buildEmbed(extractMatches('<p>https://youtu.be/hIs5StN8J-0?t=30</p>'), override({})),
     '<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed" style="position:relative;width:100%;padding-top: 56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" title="Embedded YouTube video" src="https://www.youtube-nocookie.com/embed/hIs5StN8J-0?start=30" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>'
   );
 });

/**
 * Lite mode, zero index (first instance on page includes script and CSS)
 */
test(`Build embed lite mode, zero index, lite defaults`, t => {
  t.is(buildEmbed(videoData, override({lite: true}), 0),
  `<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.css">\n<script defer="defer" src="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.js"></script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
  );
});
test(`Build embed lite mode, zero index, valid thumbnail quality override`, t => {
  t.is(buildEmbed(videoData, override({lite: { thumbnailQuality: 'maxresdefault'}}), 0),
  `<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.css">\n<script defer="defer" src="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.js"></script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/maxresdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
  );
});
test(`Build embed lite mode, zero index, invalid thumbnail quality override`, t => {
  t.is(buildEmbed(videoData, override({lite: { thumbnailQuality: 'nope'}}), 0),
  `<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.css">\n<script defer="defer" src="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.js"></script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
  );
});
test(`Build embed lite mode, zero index, lite defaults with URL start time param`, t => {
  t.is(buildEmbed(extractMatches('<p>https://www.youtube.com/watch?v=hIs5StN8J-0&t=30s</p>'), override({lite: true}), 0),
  `<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.css">\n<script defer="defer" src="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.js"></script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');" params="start=30"><div class="lty-playbtn"></div></lite-youtube></div>`
  );
});
test(`Build embed lite mode, zero index, css disabled`, t => {
  t.is(buildEmbed(videoData, override({lite:{css:{enabled: false}}}), 0),
  `<script defer="defer" src="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.js"></script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
  );
});
test(`Build embed lite mode, zero index, css inline`, t => {
  t.is(buildEmbed(videoData, override({lite:{css:{inline: true}}}), 0),
  `<style>${inlineCss}</style>\n<script defer="defer" src="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.js"></script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
  );
});
test(`Build embed lite mode, zero index, css path override`, t => {
  t.is(buildEmbed(videoData, override({lite:{css:{path: 'foo'}}}), 0),
  `<link rel="stylesheet" href="foo">\n<script defer="defer" src="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.js"></script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
  );
});
test(`Build embed lite mode, zero index, js disabled`, t => {
  t.is(buildEmbed(videoData, override({lite:{js:{enabled: false}}}), 0),
  `<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.css">\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
  );
});
test(`Build embed lite mode, zero index, js inline`, t => {
  t.is(buildEmbed(videoData, override({lite:{js:{inline: true}}}), 0),
  `<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.css">\n<script>${inlineJs}</script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
  );
});
test(`Build embed lite mode, zero index, css AND js disabled`, t => {
  t.is(buildEmbed(videoData, override({lite:{css:{enabled:false},js:{enabled:false}}}), 0),
  `<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
  );
});
test(`Build embed lite mode, zero index, css AND js path override`, t => {
  t.is(buildEmbed(videoData, override({lite:{css:{path: 'foo'},js:{path: 'foo'}}}), 0),
  `<link rel="stylesheet" href="foo">\n<script defer="defer" src="foo"></script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
  );
});
test(`Build embed lite mode, zero index, css AND js inline`, t => {
  t.is(buildEmbed(videoData, override({lite:{css:{inline: true},js:{inline: true}}}), 0),
  `<style>${inlineCss}</style>\n<script>${inlineJs}</script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
  );
});

/**
 * Lite mode, 1+ index (no style or script on subsequent outputs)
 */
test(`Build embed lite mode, 1+ index, lite defaults`, t => {
  t.is(buildEmbed(videoData, override({lite: true}), 1),
  `<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
  );
});
test(`Build embed lite mode, 1+ index, lite defaults with URL start time param`, t => {
  t.is(buildEmbed(extractMatches('<p>https://www.youtube.com/watch?v=hIs5StN8J-0&t=30s</p>'), override({lite: true}), 1),
  `<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');" params="start=30"><div class="lty-playbtn"></div></lite-youtube></div>`
  );
});
test(`Build embed lite mode, 1+ index, css disabled`, t => {
  t.is(buildEmbed(videoData, override({lite:{css:{enabled: false}}}), 1),
  `<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
  );
});
test(`Build embed lite mode, 1+ index, css inline`, t => {
  t.is(buildEmbed(videoData, override({lite:{css:{inline: true}}}), 1),
  `<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
  );
});
test(`Build embed lite mode, 1+ index, css path override`, t => {
  t.is(buildEmbed(videoData, override({lite:{css:{path: 'foo'}}}), 1),
  `<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
  );
});
test(`Build embed lite mode, 1+ index, js disabled`, t => {
  t.is(buildEmbed(videoData, override({lite:{js:{enabled: false}}}), 1),
  `<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
  );
});
test(`Build embed lite mode, 1+ index, js inline`, t => {
  t.is(buildEmbed(videoData, override({lite:{js:{inline: true}}}), 1),
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