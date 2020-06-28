const test = require('ava');
const patternPresent = require('./lib/spotPattern.js');
const extractVideoId = require('./lib/extractMatches.js');
const buildEmbedCodeString = require('./lib/buildEmbed.js');
const { pluginDefaults } = require('./lib/pluginDefaults.js');

const validStrings = [
  {type: 'Standard', str: 'https://www.youtube.com/watch?v=hIs5StN8J-0'},
  {type: 'With http', str: 'http://www.youtube.com/watch?v=hIs5StN8J-0'},
  {type: 'Without protocol', str: 'www.youtube.com/watch?v=hIs5StN8J-0'},
  {type: 'With https, without www', str: 'https://youtube.com/watch?v=hIs5StN8J-0'},
  {type: 'With http, without www', str: 'http://youtube.com/watch?v=hIs5StN8J-0'},
  // note this isn’t actually a valid YouTube URL, but works with the plugin
  {type: 'Without “v” param', str: 'youtube.com/hIs5StN8J-0'},
  {type: 'With youtu.be', str: 'youtu.be/hIs5StN8J-0'},
  {type: 'With youtu.be, with “v” param', str: 'youtu.be/watch?v=hIs5StN8J-0'},
  {type: 'With arbitrary params', str: 'https://www.youtube.com/watch?v=hIs5StN8J-0&foo=bar&baz'},
]

const invalidStrings = [
  {type: 'With prepended text', str: 'foo https://www.youtube.com/watch?v=hIs5StN8J-0'},
  {type: 'With prepended text, with link', str: 'foo <a href="">https://www.youtube.com/watch?v=hIs5StN8J-0</a>'},
  {type: 'With appended text', str: 'https://www.youtube.com/watch?v=hIs5StN8J-0 bar'},
  {type: 'With appended text, with link', str: '<a href="">https://www.youtube.com/watch?v=hIs5StN8J-0</a> bar'},
  {type: 'Playlist URL', str: 'https://www.youtube.com/playlist?list=PLv0jwu7G_DFVP0SGNlBiBtFVkV5LZ7SOU'},
]

validStrings.forEach(function(obj){
  test(`${obj.type} ideal case`, t => {
    let idealCase = `<p>${obj.str}</p>`;
    t.truthy(patternPresent(idealCase));
    t.is(extractVideoId(idealCase), 'hIs5StN8J-0', 'foo');
    t.is(buildEmbedCodeString(extractVideoId(idealCase), pluginDefaults),
      '<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"style="position:relative;width:100%;padding-top: 56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" src="https://www.youtube-nocookie.com/embed/hIs5StN8J-0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>'
    );
  });
  test(`${obj.type} with links`, t => {
    let withLinks = `<p><a href="">${obj.str}</a></p>`;
    t.truthy(patternPresent(withLinks));
    t.is(extractVideoId(withLinks), 'hIs5StN8J-0');
    t.is(buildEmbedCodeString(extractVideoId(withLinks), pluginDefaults),
      '<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"style="position:relative;width:100%;padding-top: 56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" src="https://www.youtube-nocookie.com/embed/hIs5StN8J-0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>'
    );
  });
  test(`${obj.type} with whitespace`, t => {
    let withWhitespace = `<p>
      ${obj.str}
    </p>`;
    t.truthy(patternPresent(withWhitespace));
    t.is(extractVideoId(withWhitespace), 'hIs5StN8J-0');
    t.is(buildEmbedCodeString(extractVideoId(withWhitespace), pluginDefaults),
      '<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"style="position:relative;width:100%;padding-top: 56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" src="https://www.youtube-nocookie.com/embed/hIs5StN8J-0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>'
    );
  });
  test(`${obj.type} with links and whitespace`, t => {
    let withLinksAndWhitespace = `<p>
      <a href="">
        ${obj.str}
      </a>
    </p>`;
    t.truthy(patternPresent(withLinksAndWhitespace));
    t.is(extractVideoId(withLinksAndWhitespace), 'hIs5StN8J-0');
    t.is(buildEmbedCodeString(extractVideoId(withLinksAndWhitespace), pluginDefaults),
      '<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"style="position:relative;width:100%;padding-top: 56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" src="https://www.youtube-nocookie.com/embed/hIs5StN8J-0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>'
    );
  });
});

// Test output of lite version of embed code
const pluginLiteModeOptions = Object.assign({}, pluginDefaults, { lite: true });
const pluginLiteModeOptionsAltCss = Object.assign({}, pluginDefaults, { 
  lite: { 
    css: { 
      path: "https://unpkg.com/lite-youtube-embed@0.0.0/src/lite-yt-embed.css"
    }
  } 
});
const pluginLiteModeOptionsAltJs = Object.assign({}, pluginDefaults, { 
  lite: { 
    js: { 
      path: "https://unpkg.com/lite-youtube-embed@0.0.0/src/lite-yt-embed.js"
    }
  } 
});
const pluginLiteModeOptionsAltBoth = Object.assign({}, pluginDefaults, { 
  lite: { 
    css: { 
      path: "https://unpkg.com/lite-youtube-embed@0.0.0/src/lite-yt-embed.css"
    },
    js: { 
      path: "https://unpkg.com/lite-youtube-embed@0.0.0/src/lite-yt-embed.js"
    }
  } 
});
validStrings.forEach(function(obj){
  test(`${obj.type} ideal case, lite embed, zero-index`, t => {
    let idealCase = `<p>${obj.str}</p>`;
    t.is(buildEmbedCodeString(extractVideoId(idealCase), pluginLiteModeOptions, 0),
      `<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.css"><script defer="defer" src="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.js"></script><div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
    );
  });
  test(`${obj.type} with links, lite embed, zero-index`, t => {
    let withLinks = `<p><a href="">${obj.str}</a></p>`;
    t.is(buildEmbedCodeString(extractVideoId(withLinks), pluginLiteModeOptions, 0),
      `<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.css"><script defer="defer" src="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.js"></script><div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
    );
  });
  test(`${obj.type} with whitespace, lite embed, zero-index`, t => {
    let withWhitespace = `<p>
      ${obj.str}
    </p>`;
    t.is(buildEmbedCodeString(extractVideoId(withWhitespace), pluginLiteModeOptions, 0),
      `<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.css"><script defer="defer" src="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.js"></script><div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
    );
  });
  test(`${obj.type} with links and whitespace, lite embed, zero-index`, t => {
    let withLinksAndWhitespace = `<p>
      <a href="">
        ${obj.str}
      </a>
    </p>`;
    t.is(buildEmbedCodeString(extractVideoId(withLinksAndWhitespace), pluginLiteModeOptions, 0),
      `<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.css"><script defer="defer" src="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.js"></script><div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
    );
  });
  test(`${obj.type} ideal case, lite embed with alt script path, zero-index`, t => {
    let idealCase = `<p>${obj.str}</p>`;
    t.is(buildEmbedCodeString(extractVideoId(idealCase), pluginLiteModeOptionsAltJs, 0),
      `<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.css"><script defer="defer" src="https://unpkg.com/lite-youtube-embed@0.0.0/src/lite-yt-embed.js"></script><div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
    );
  });
  test(`${obj.type} with links, lite embed with alt script path, zero-index`, t => {
    let withLinks = `<p><a href="">${obj.str}</a></p>`;
    t.is(buildEmbedCodeString(extractVideoId(withLinks), pluginLiteModeOptionsAltJs, 0),
      `<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.css"><script defer="defer" src="https://unpkg.com/lite-youtube-embed@0.0.0/src/lite-yt-embed.js"></script><div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
    );
  });
  test(`${obj.type} with whitespace, lite embed with alt script path, zero-index`, t => {
    let withWhitespace = `<p>
      ${obj.str}
    </p>`;
    t.is(buildEmbedCodeString(extractVideoId(withWhitespace), pluginLiteModeOptionsAltJs, 0),
      `<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.css"><script defer="defer" src="https://unpkg.com/lite-youtube-embed@0.0.0/src/lite-yt-embed.js"></script><div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
    );
  });
  test(`${obj.type} with links and whitespace, lite embed with alt script path, zero-index`, t => {
    let withLinksAndWhitespace = `<p>
      <a href="">
        ${obj.str}
      </a>
    </p>`;
    t.is(buildEmbedCodeString(extractVideoId(withLinksAndWhitespace), pluginLiteModeOptionsAltJs, 0),
      `<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.css"><script defer="defer" src="https://unpkg.com/lite-youtube-embed@0.0.0/src/lite-yt-embed.js"></script><div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
    );
  });

  test(`${obj.type} ideal case, lite embed with alt style path, zero-index`, t => {
    let idealCase = `<p>${obj.str}</p>`;
    t.is(buildEmbedCodeString(extractVideoId(idealCase), pluginLiteModeOptionsAltCss, 0),
      `<link rel="stylesheet" href="https://unpkg.com/lite-youtube-embed@0.0.0/src/lite-yt-embed.css"><script defer="defer" src="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.js"></script><div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
    );
  });
  test(`${obj.type} with links, lite embed with alt style path, zero-index`, t => {
    let withLinks = `<p><a href="">${obj.str}</a></p>`;
    t.is(buildEmbedCodeString(extractVideoId(withLinks), pluginLiteModeOptionsAltCss, 0),
      `<link rel="stylesheet" href="https://unpkg.com/lite-youtube-embed@0.0.0/src/lite-yt-embed.css"><script defer="defer" src="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.js"></script><div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
    );
  });
  test(`${obj.type} with whitespace, lite embed with alt style path, zero-index`, t => {
    let withWhitespace = `<p>
      ${obj.str}
    </p>`;
    t.is(buildEmbedCodeString(extractVideoId(withWhitespace), pluginLiteModeOptionsAltCss, 0),
      `<link rel="stylesheet" href="https://unpkg.com/lite-youtube-embed@0.0.0/src/lite-yt-embed.css"><script defer="defer" src="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.js"></script><div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
    );
  });
  test(`${obj.type} with links and whitespace, lite embed with alt style path, zero-index`, t => {
    let withLinksAndWhitespace = `<p>
      <a href="">
        ${obj.str}
      </a>
    </p>`;
    t.is(buildEmbedCodeString(extractVideoId(withLinksAndWhitespace), pluginLiteModeOptionsAltCss, 0),
      `<link rel="stylesheet" href="https://unpkg.com/lite-youtube-embed@0.0.0/src/lite-yt-embed.css"><script defer="defer" src="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.js"></script><div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
    );
  });

  test(`${obj.type} ideal case, lite embed with alt style AND script path, zero-index`, t => {
    let idealCase = `<p>${obj.str}</p>`;
    t.is(buildEmbedCodeString(extractVideoId(idealCase), pluginLiteModeOptionsAltBoth, 0),
      `<link rel="stylesheet" href="https://unpkg.com/lite-youtube-embed@0.0.0/src/lite-yt-embed.css"><script defer="defer" src="https://unpkg.com/lite-youtube-embed@0.0.0/src/lite-yt-embed.js"></script><div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
    );
  });
  test(`${obj.type} with links, lite embed with alt style AND script path, zero-index`, t => {
    let withLinks = `<p><a href="">${obj.str}</a></p>`;
    t.is(buildEmbedCodeString(extractVideoId(withLinks), pluginLiteModeOptionsAltBoth, 0),
      `<link rel="stylesheet" href="https://unpkg.com/lite-youtube-embed@0.0.0/src/lite-yt-embed.css"><script defer="defer" src="https://unpkg.com/lite-youtube-embed@0.0.0/src/lite-yt-embed.js"></script><div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
    );
  });
  test(`${obj.type} with whitespace, lite embed with alt style AND script path, zero-index`, t => {
    let withWhitespace = `<p>
      ${obj.str}
    </p>`;
    t.is(buildEmbedCodeString(extractVideoId(withWhitespace), pluginLiteModeOptionsAltBoth, 0),
      `<link rel="stylesheet" href="https://unpkg.com/lite-youtube-embed@0.0.0/src/lite-yt-embed.css"><script defer="defer" src="https://unpkg.com/lite-youtube-embed@0.0.0/src/lite-yt-embed.js"></script><div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
    );
  });
  test(`${obj.type} with links and whitespace, lite embed with alt style AND script path, zero-index`, t => {
    let withLinksAndWhitespace = `<p>
      <a href="">
        ${obj.str}
      </a>
    </p>`;
    t.is(buildEmbedCodeString(extractVideoId(withLinksAndWhitespace), pluginLiteModeOptionsAltBoth, 0),
      `<link rel="stylesheet" href="https://unpkg.com/lite-youtube-embed@0.0.0/src/lite-yt-embed.css"><script defer="defer" src="https://unpkg.com/lite-youtube-embed@0.0.0/src/lite-yt-embed.js"></script><div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
    );
  });
  test(`${obj.type} ideal case, lite embed, one-index`, t => {
    let idealCase = `<p>${obj.str}</p>`;
    t.is(buildEmbedCodeString(extractVideoId(idealCase), pluginLiteModeOptions, 1),
      `<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
    );
  });
  test(`${obj.type} with links, lite embed, one-index`, t => {
    let withLinks = `<p><a href="">${obj.str}</a></p>`;
    t.is(buildEmbedCodeString(extractVideoId(withLinks), pluginLiteModeOptions, 1),
      `<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
    );
  });
  test(`${obj.type} with whitespace, lite embed, one-index`, t => {
    let withWhitespace = `<p>
      ${obj.str}
    </p>`;
    t.is(buildEmbedCodeString(extractVideoId(withWhitespace), pluginLiteModeOptions, 1),
      `<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
    );
  });
  test(`${obj.type} with links and whitespace, lite embed, one-index`, t => {
    let withLinksAndWhitespace = `<p>
      <a href="">
        ${obj.str}
      </a>
    </p>`;
    t.is(buildEmbedCodeString(extractVideoId(withLinksAndWhitespace), pluginLiteModeOptions, 1),
      `<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
    );
  });
});

invalidStrings.forEach(function(obj){
  test(`${obj.type} ideal case`, t => {
    let idealCase = `<p>${obj.str}</p>`;
    t.falsy(patternPresent(idealCase));
  });
  test(`${obj.type} with whitespace`, t => {
    let withWhitespace = `<p>
      ${obj.str}
    </p>`;
    t.falsy(patternPresent(withWhitespace));
  });
});