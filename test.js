const test = require('ava');
const patternPresent = require('./lib/spotPattern.js');
const extractVideoId = require('./lib/extractMatches.js');
const buildEmbedCodeString = require('./lib/buildEmbed.js');
const { pluginDefaults } = require('./lib/pluginDefaults.js');
const fs = require('fs');
const path = require('path');

const liteCssFilePath = path.join(__dirname, 'node_modules/lite-youtube-embed/src/lite-yt-embed.css');
const liteJsFilePath = path.join(__dirname, 'node_modules/lite-youtube-embed/src/lite-yt-embed.js');
const inlineCss = fs.readFileSync(liteCssFilePath, 'utf-8');
const inlineJs = fs.readFileSync(liteJsFilePath, 'utf-8');

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

const urlParamAllowAutoplay = Object.assign({}, pluginDefaults, {
  allowAutoplay: true
});
const urlParamRecommendChannel = Object.assign({}, pluginDefaults, {
  recommendChannel: true
});
const urlParamModestBranding = Object.assign({}, pluginDefaults, {
  modestBranding: true
});
const urlParamAllowAutoplayAndRecommendChannel = Object.assign({}, pluginDefaults, {
  allowAutoplay: true,
  recommendChannel: true
});
const urlParamAllowAutoplayAndRecommendChannelAndModestBranding = Object.assign({}, pluginDefaults, {
  allowAutoplay: true,
  recommendChannel: true,
  modestBranding: true
});

validStrings.forEach(function(obj){
  test(`${obj.type} ideal case`, t => {
    let idealCase = `<p>${obj.str}</p>`;
    t.truthy(patternPresent(idealCase));
    t.is(extractVideoId(idealCase), 'hIs5StN8J-0', 'foo');
    t.is(buildEmbedCodeString(extractVideoId(idealCase), pluginDefaults),
      '<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed" style="position:relative;width:100%;padding-top: 56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" title="Embedded YouTube video" src="https://www.youtube-nocookie.com/embed/hIs5StN8J-0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>'
    );
  });
  test(`${obj.type} with links`, t => {
    let withLinks = `<p><a href="">${obj.str}</a></p>`;
    t.truthy(patternPresent(withLinks));
    t.is(extractVideoId(withLinks), 'hIs5StN8J-0');
    t.is(buildEmbedCodeString(extractVideoId(withLinks), pluginDefaults),
      '<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed" style="position:relative;width:100%;padding-top: 56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" title="Embedded YouTube video" src="https://www.youtube-nocookie.com/embed/hIs5StN8J-0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>'
    );
  });
  test(`${obj.type} with whitespace`, t => {
    let withWhitespace = `<p>
      ${obj.str}
    </p>`;
    t.truthy(patternPresent(withWhitespace));
    t.is(extractVideoId(withWhitespace), 'hIs5StN8J-0');
    t.is(buildEmbedCodeString(extractVideoId(withWhitespace), pluginDefaults),
      '<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed" style="position:relative;width:100%;padding-top: 56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" title="Embedded YouTube video" src="https://www.youtube-nocookie.com/embed/hIs5StN8J-0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>'
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
      '<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed" style="position:relative;width:100%;padding-top: 56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" title="Embedded YouTube video" src="https://www.youtube-nocookie.com/embed/hIs5StN8J-0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>'
    );
  });
  test(`${obj.type} url param: autoplay=true`, t => {
    let withLinksAndWhitespace = `<p>
      <a href="">
        ${obj.str}
      </a>
    </p>`;
    t.truthy(patternPresent(withLinksAndWhitespace));
    t.is(extractVideoId(withLinksAndWhitespace), 'hIs5StN8J-0');
    t.is(buildEmbedCodeString(extractVideoId(withLinksAndWhitespace), urlParamAllowAutoplay),
      '<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed" style="position:relative;width:100%;padding-top: 56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" title="Embedded YouTube video" src="https://www.youtube-nocookie.com/embed/hIs5StN8J-0?autoplay=1" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>'
    );
  });
  test(`${obj.type} url param: recommendChannel=true`, t => {
    let withLinksAndWhitespace = `<p>
      <a href="">
        ${obj.str}
      </a>
    </p>`;
    t.truthy(patternPresent(withLinksAndWhitespace));
    t.is(extractVideoId(withLinksAndWhitespace), 'hIs5StN8J-0');
    t.is(buildEmbedCodeString(extractVideoId(withLinksAndWhitespace), urlParamRecommendChannel),
      '<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed" style="position:relative;width:100%;padding-top: 56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" title="Embedded YouTube video" src="https://www.youtube-nocookie.com/embed/hIs5StN8J-0?rel=0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>'
    );
  });
  test(`${obj.type} url param: modestBranding=true`, t => {
    let withLinksAndWhitespace = `<p>
      <a href="">
        ${obj.str}
      </a>
    </p>`;
    t.truthy(patternPresent(withLinksAndWhitespace));
    t.is(extractVideoId(withLinksAndWhitespace), 'hIs5StN8J-0');
    t.is(buildEmbedCodeString(extractVideoId(withLinksAndWhitespace), urlParamModestBranding),
      '<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed" style="position:relative;width:100%;padding-top: 56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" title="Embedded YouTube video" src="https://www.youtube-nocookie.com/embed/hIs5StN8J-0?modestbranding=1" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>'
    );
  });
  test(`${obj.type} url param: allowAutoplay=true and recommendChannel=true`, t => {
    let withLinksAndWhitespace = `<p>
      <a href="">
        ${obj.str}
      </a>
    </p>`;
    t.truthy(patternPresent(withLinksAndWhitespace));
    t.is(extractVideoId(withLinksAndWhitespace), 'hIs5StN8J-0');
    t.is(buildEmbedCodeString(extractVideoId(withLinksAndWhitespace), urlParamAllowAutoplayAndRecommendChannel),
      '<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed" style="position:relative;width:100%;padding-top: 56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" title="Embedded YouTube video" src="https://www.youtube-nocookie.com/embed/hIs5StN8J-0?autoplay=1&rel=0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>'
    );
  });
  test(`${obj.type} url param: allowAutoplay=true and recommendChannel=true and modestBranding=true`, t => {
    let withLinksAndWhitespace = `<p>
      <a href="">
        ${obj.str}
      </a>
    </p>`;
    t.truthy(patternPresent(withLinksAndWhitespace));
    t.is(extractVideoId(withLinksAndWhitespace), 'hIs5StN8J-0');
    t.is(buildEmbedCodeString(extractVideoId(withLinksAndWhitespace), urlParamAllowAutoplayAndRecommendChannelAndModestBranding),
      '<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed" style="position:relative;width:100%;padding-top: 56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" title="Embedded YouTube video" src="https://www.youtube-nocookie.com/embed/hIs5StN8J-0?autoplay=1&rel=0&modestbranding=1" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>'
    );
  });
});

/**
 * Test that regex isn't greedily consuming subsequent paragraphs in minified HTML
 */
 validStrings.forEach(function(obj){
  test(`${obj.type} minified HTML with multiple paragraph tags on a single line`, t => {
    let paragraph = "<p>https://www.youtube.com/watch?v=hIs5StN8J-0</p><p>Foo</p>";
    let paragraphWithLinks = '<p><a href="foo">https://www.youtube.com/watch?v=hIs5StN8J-0</a></p><p>Foo</p>';
    t.deepEqual(patternPresent(paragraph), ['<p>https://www.youtube.com/watch?v=hIs5StN8J-0</p>']);
    t.deepEqual(patternPresent(paragraphWithLinks), ['<p><a href="foo">https://www.youtube.com/watch?v=hIs5StN8J-0</a></p>']);
  });
});

// Test output of lite version of embed code
const pluginLiteModeOptions = Object.assign({}, pluginDefaults, { lite: true });
const pluginLiteModeOptionsUrlParamAllowAutoplay = Object.assign({}, pluginDefaults, {
  lite: true,
  allowAutoplay: true
});
const pluginLiteModeOptionsUrlParamRecommendChannel = Object.assign({}, pluginDefaults, {
  lite: true,
  recommendChannel: true
});
const pluginLiteModeOptionsUrlParamModestBranding = Object.assign({}, pluginDefaults, {
  lite: true,
  modestBranding: true
});
const pluginLiteModeOptionsUrlParamAllowAutoplayAndRecommendChannel = Object.assign({}, pluginDefaults, {
  lite: true,
  allowAutoplay: true,
  recommendChannel: true
});
const pluginLiteModeOptionsUrlParamAllowAutoplayAndRecommendChannelAndModestBranding = Object.assign({}, pluginDefaults, {
  lite: true,
  allowAutoplay: true,
  recommendChannel: true,
  modestBranding: true
});
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
const pluginLiteModeOptionsInlineCss = Object.assign({}, pluginDefaults, { 
  lite: { 
    css: { 
      inline: true
    }
  } 
});
const pluginLiteModeOptionsDisableCss = Object.assign({}, pluginDefaults, { 
  lite: { 
    css: { 
      enabled: false
    }
  } 
});
const pluginLiteModeOptionsInlineJsDisableCss = Object.assign({}, pluginDefaults, { 
  lite: { 
    css: { 
      enabled: false
    },
    js: {
      inline: true
    }
  } 
});
const pluginLiteModeOptionsDisableJs = Object.assign({}, pluginDefaults, { 
  lite: { 
    js: { 
      enabled: false
    }
  } 
});
const pluginLiteModeOptionsInlineJs = Object.assign({}, pluginDefaults, { 
  lite: { 
    js: { 
      inline: true
    }
  } 
});
const pluginLiteModeOptionsInlineCssDisableJs = Object.assign({}, pluginDefaults, { 
  lite: { 
    css: { 
      inline: true
    },
    js: {
      enabled: false
    }
  } 
});
const pluginLiteModeOptionsInlineBoth = Object.assign({}, pluginDefaults, { 
  lite: { 
    js: { 
      inline: true
    },
    css: {
      inline: true
    }
  } 
});
const pluginLiteModeOptionsDisableBoth = Object.assign({}, pluginDefaults, { 
  lite: { 
    js: { 
      enabled: false
    },
    css: {
      enabled: false
    }
  } 
});

validStrings.forEach(function(obj){
  test(`${obj.type} ideal case, lite embed, zero-index`, t => {
    let idealCase = `<p>${obj.str}</p>`;
    t.is(buildEmbedCodeString(extractVideoId(idealCase), pluginLiteModeOptions, 0),
      `<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.css">\n<script defer="defer" src="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.js"></script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
    );


  });
  test(`${obj.type} ideal case, lite embed, zero-index, autoplay`, t => {
    let idealCase = `<p>${obj.str}</p>`;
    t.is(buildEmbedCodeString(extractVideoId(idealCase), pluginLiteModeOptionsUrlParamAllowAutoplay, 0),
      `<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.css">\n<script defer="defer" src="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.js"></script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');" params="autoplay=1"><div class="lty-playbtn"></div></lite-youtube></div>`
    );
  });
  test(`${obj.type} ideal case, lite embed, zero-index, recommendChannel`, t => {
    let idealCase = `<p>${obj.str}</p>`;
    t.is(buildEmbedCodeString(extractVideoId(idealCase), pluginLiteModeOptionsUrlParamRecommendChannel, 0),
      `<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.css">\n<script defer="defer" src="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.js"></script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');" params="rel=0"><div class="lty-playbtn"></div></lite-youtube></div>`
    );
  });
  test(`${obj.type} ideal case, lite embed, zero-index, modestBranding`, t => {
    let idealCase = `<p>${obj.str}</p>`;
    t.is(buildEmbedCodeString(extractVideoId(idealCase), pluginLiteModeOptionsUrlParamModestBranding, 0),
      `<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.css">\n<script defer="defer" src="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.js"></script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');" params="modestbranding=1"><div class="lty-playbtn"></div></lite-youtube></div>`
    );
  });
  test(`${obj.type} ideal case, lite embed, zero-index, autoplay, recommendChannel`, t => {
    let idealCase = `<p>${obj.str}</p>`;
    t.is(buildEmbedCodeString(extractVideoId(idealCase), pluginLiteModeOptionsUrlParamAllowAutoplayAndRecommendChannel, 0),
      `<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.css">\n<script defer="defer" src="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.js"></script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');" params="autoplay=1&rel=0"><div class="lty-playbtn"></div></lite-youtube></div>`
    );
  });
  test(`${obj.type} ideal case, lite embed, zero-index, autoplay, recommendChannel, modestBranding`, t => {
    let idealCase = `<p>${obj.str}</p>`;
    t.is(buildEmbedCodeString(extractVideoId(idealCase), pluginLiteModeOptionsUrlParamAllowAutoplayAndRecommendChannelAndModestBranding, 0),
      `<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.css">\n<script defer="defer" src="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.js"></script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');" params="autoplay=1&rel=0&modestbranding=1"><div class="lty-playbtn"></div></lite-youtube></div>`
    );
  });



  test(`${obj.type} with links, lite embed, zero-index`, t => {
    let withLinks = `<p><a href="">${obj.str}</a></p>`;
    t.is(buildEmbedCodeString(extractVideoId(withLinks), pluginLiteModeOptions, 0),
      `<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.css">\n<script defer="defer" src="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.js"></script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
    );
  });
  test(`${obj.type} with whitespace, lite embed, zero-index`, t => {
    let withWhitespace = `<p>
      ${obj.str}
    </p>`;
    t.is(buildEmbedCodeString(extractVideoId(withWhitespace), pluginLiteModeOptions, 0),
      `<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.css">\n<script defer="defer" src="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.js"></script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
    );
  });
  test(`${obj.type} with links and whitespace, lite embed, zero-index`, t => {
    let withLinksAndWhitespace = `<p>
      <a href="">
        ${obj.str}
      </a>
    </p>`;
    t.is(buildEmbedCodeString(extractVideoId(withLinksAndWhitespace), pluginLiteModeOptions, 0),
      `<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.css">\n<script defer="defer" src="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.js"></script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
    );
  });
  test(`${obj.type} ideal case, lite embed with alt script path, zero-index`, t => {
    let idealCase = `<p>${obj.str}</p>`;
    t.is(buildEmbedCodeString(extractVideoId(idealCase), pluginLiteModeOptionsAltJs, 0),
      `<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.css">\n<script defer="defer" src="https://unpkg.com/lite-youtube-embed@0.0.0/src/lite-yt-embed.js"></script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
    );
  });
  test(`${obj.type} with links, lite embed with alt script path, zero-index`, t => {
    let withLinks = `<p><a href="">${obj.str}</a></p>`;
    t.is(buildEmbedCodeString(extractVideoId(withLinks), pluginLiteModeOptionsAltJs, 0),
      `<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.css">\n<script defer="defer" src="https://unpkg.com/lite-youtube-embed@0.0.0/src/lite-yt-embed.js"></script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
    );
  });
  test(`${obj.type} with whitespace, lite embed with alt script path, zero-index`, t => {
    let withWhitespace = `<p>
      ${obj.str}
    </p>`;
    t.is(buildEmbedCodeString(extractVideoId(withWhitespace), pluginLiteModeOptionsAltJs, 0),
      `<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.css">\n<script defer="defer" src="https://unpkg.com/lite-youtube-embed@0.0.0/src/lite-yt-embed.js"></script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
    );
  });
  test(`${obj.type} with links and whitespace, lite embed with alt script path, zero-index`, t => {
    let withLinksAndWhitespace = `<p>
      <a href="">
        ${obj.str}
      </a>
    </p>`;
    t.is(buildEmbedCodeString(extractVideoId(withLinksAndWhitespace), pluginLiteModeOptionsAltJs, 0),
      `<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.css">\n<script defer="defer" src="https://unpkg.com/lite-youtube-embed@0.0.0/src/lite-yt-embed.js"></script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
    );
  });

  test(`${obj.type} ideal case, lite embed with alt style path, zero-index`, t => {
    let idealCase = `<p>${obj.str}</p>`;
    t.is(buildEmbedCodeString(extractVideoId(idealCase), pluginLiteModeOptionsAltCss, 0),
      `<link rel="stylesheet" href="https://unpkg.com/lite-youtube-embed@0.0.0/src/lite-yt-embed.css">\n<script defer="defer" src="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.js"></script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
    );
  });
  test(`${obj.type} with links, lite embed with alt style path, zero-index`, t => {
    let withLinks = `<p><a href="">${obj.str}</a></p>`;
    t.is(buildEmbedCodeString(extractVideoId(withLinks), pluginLiteModeOptionsAltCss, 0),
      `<link rel="stylesheet" href="https://unpkg.com/lite-youtube-embed@0.0.0/src/lite-yt-embed.css">\n<script defer="defer" src="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.js"></script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
    );
  });
  test(`${obj.type} with whitespace, lite embed with alt style path, zero-index`, t => {
    let withWhitespace = `<p>
      ${obj.str}
    </p>`;
    t.is(buildEmbedCodeString(extractVideoId(withWhitespace), pluginLiteModeOptionsAltCss, 0),
      `<link rel="stylesheet" href="https://unpkg.com/lite-youtube-embed@0.0.0/src/lite-yt-embed.css">\n<script defer="defer" src="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.js"></script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
    );
  });
  test(`${obj.type} with links and whitespace, lite embed with alt style path, zero-index`, t => {
    let withLinksAndWhitespace = `<p>
      <a href="">
        ${obj.str}
      </a>
    </p>`;
    t.is(buildEmbedCodeString(extractVideoId(withLinksAndWhitespace), pluginLiteModeOptionsAltCss, 0),
      `<link rel="stylesheet" href="https://unpkg.com/lite-youtube-embed@0.0.0/src/lite-yt-embed.css">\n<script defer="defer" src="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.js"></script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
    );
  });

  test(`${obj.type} ideal case, lite embed with alt style AND script path, zero-index`, t => {
    let idealCase = `<p>${obj.str}</p>`;
    t.is(buildEmbedCodeString(extractVideoId(idealCase), pluginLiteModeOptionsAltBoth, 0),
      `<link rel="stylesheet" href="https://unpkg.com/lite-youtube-embed@0.0.0/src/lite-yt-embed.css">\n<script defer="defer" src="https://unpkg.com/lite-youtube-embed@0.0.0/src/lite-yt-embed.js"></script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
    );
  });
  test(`${obj.type} with links, lite embed with alt style AND script path, zero-index`, t => {
    let withLinks = `<p><a href="">${obj.str}</a></p>`;
    t.is(buildEmbedCodeString(extractVideoId(withLinks), pluginLiteModeOptionsAltBoth, 0),
      `<link rel="stylesheet" href="https://unpkg.com/lite-youtube-embed@0.0.0/src/lite-yt-embed.css">\n<script defer="defer" src="https://unpkg.com/lite-youtube-embed@0.0.0/src/lite-yt-embed.js"></script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
    );
  });
  test(`${obj.type} with whitespace, lite embed with alt style AND script path, zero-index`, t => {
    let withWhitespace = `<p>
      ${obj.str}
    </p>`;
    t.is(buildEmbedCodeString(extractVideoId(withWhitespace), pluginLiteModeOptionsAltBoth, 0),
      `<link rel="stylesheet" href="https://unpkg.com/lite-youtube-embed@0.0.0/src/lite-yt-embed.css">\n<script defer="defer" src="https://unpkg.com/lite-youtube-embed@0.0.0/src/lite-yt-embed.js"></script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
    );
  });
  test(`${obj.type} with links and whitespace, lite embed with alt style AND script path, zero-index`, t => {
    let withLinksAndWhitespace = `<p>
      <a href="">
        ${obj.str}
      </a>
    </p>`;
    t.is(buildEmbedCodeString(extractVideoId(withLinksAndWhitespace), pluginLiteModeOptionsAltBoth, 0),
      `<link rel="stylesheet" href="https://unpkg.com/lite-youtube-embed@0.0.0/src/lite-yt-embed.css">\n<script defer="defer" src="https://unpkg.com/lite-youtube-embed@0.0.0/src/lite-yt-embed.js"></script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
    );
  });

  test(`${obj.type} ideal case, lite embed with inline style, zero-index`, t => {
    let idealCase = `<p>${obj.str}</p>`;
    t.is(buildEmbedCodeString(extractVideoId(idealCase), pluginLiteModeOptionsInlineCss, 0),
      `<style>${inlineCss}</style>\n<script defer="defer" src="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.js"></script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
    );
  });
  test(`${obj.type} with links, lite embed with inline style, zero-index`, t => {
    let withLinks = `<p><a href="">${obj.str}</a></p>`;
    t.is(buildEmbedCodeString(extractVideoId(withLinks), pluginLiteModeOptionsInlineCss, 0),
      `<style>${inlineCss}</style>\n<script defer="defer" src="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.js"></script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
    );
  });
  test(`${obj.type} with whitespace, lite embed with inline style, zero-index`, t => {
    let withWhitespace = `<p>
      ${obj.str}
    </p>`;
    t.is(buildEmbedCodeString(extractVideoId(withWhitespace), pluginLiteModeOptionsInlineCss, 0),
      `<style>${inlineCss}</style>\n<script defer="defer" src="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.js"></script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
    );
  });
  test(`${obj.type} with links and whitespace, lite embed with inline style, zero-index`, t => {
    let withLinksAndWhitespace = `<p>
      <a href="">
        ${obj.str}
      </a>
    </p>`;
    t.is(buildEmbedCodeString(extractVideoId(withLinksAndWhitespace), pluginLiteModeOptionsInlineCss, 0),
      `<style>${inlineCss}</style>\n<script defer="defer" src="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.js"></script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
    );
  });

  test(`${obj.type} ideal case, lite embed with inline JS, zero-index`, t => {
    let idealCase = `<p>${obj.str}</p>`;
    t.is(buildEmbedCodeString(extractVideoId(idealCase), pluginLiteModeOptionsInlineJs, 0),
      `<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.css">\n<script>${inlineJs}</script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
    );
  });
  test(`${obj.type} with links, lite embed with inline JS, zero-index`, t => {
    let withLinks = `<p><a href="">${obj.str}</a></p>`;
    t.is(buildEmbedCodeString(extractVideoId(withLinks), pluginLiteModeOptionsInlineJs, 0),
      `<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.css">\n<script>${inlineJs}</script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
    );
  });
  test(`${obj.type} with whitespace, lite embed with inline JS, zero-index`, t => {
    let withWhitespace = `<p>
      ${obj.str}
    </p>`;
    t.is(buildEmbedCodeString(extractVideoId(withWhitespace), pluginLiteModeOptionsInlineJs, 0),
      `<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.css">\n<script>${inlineJs}</script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
    );
  });
  test(`${obj.type} with links and whitespace, lite embed with inline JS, zero-index`, t => {
    let withLinksAndWhitespace = `<p>
      <a href="">
        ${obj.str}
      </a>
    </p>`;
    t.is(buildEmbedCodeString(extractVideoId(withLinksAndWhitespace), pluginLiteModeOptionsInlineJs, 0),
      `<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.css">\n<script>${inlineJs}</script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
    );
  });

  test(`${obj.type} ideal case, lite embed with inline CSS and JS, zero-index`, t => {
    let idealCase = `<p>${obj.str}</p>`;
    t.is(buildEmbedCodeString(extractVideoId(idealCase), pluginLiteModeOptionsInlineBoth, 0),
      `<style>${inlineCss}</style>\n<script>${inlineJs}</script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
    );
  });
  test(`${obj.type} with links, lite embed with inline CSS and JS, zero-index`, t => {
    let withLinks = `<p><a href="">${obj.str}</a></p>`;
    t.is(buildEmbedCodeString(extractVideoId(withLinks), pluginLiteModeOptionsInlineBoth, 0),
      `<style>${inlineCss}</style>\n<script>${inlineJs}</script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
    );
  });
  test(`${obj.type} with whitespace, lite embed with inline CSS and JS, zero-index`, t => {
    let withWhitespace = `<p>
      ${obj.str}
    </p>`;
    t.is(buildEmbedCodeString(extractVideoId(withWhitespace), pluginLiteModeOptionsInlineBoth, 0),
      `<style>${inlineCss}</style>\n<script>${inlineJs}</script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
    );
  });
  test(`${obj.type} with links and whitespace, lite embed with inline CSS and JS, zero-index`, t => {
    let withLinksAndWhitespace = `<p>
      <a href="">
        ${obj.str}
      </a>
    </p>`;
    t.is(buildEmbedCodeString(extractVideoId(withLinksAndWhitespace), pluginLiteModeOptionsInlineBoth, 0),
      `<style>${inlineCss}</style>\n<script>${inlineJs}</script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
    );
  });

  test(`${obj.type} ideal case, lite embed with CSS disabled, zero-index`, t => {
    let idealCase = `<p>${obj.str}</p>`;
    t.is(buildEmbedCodeString(extractVideoId(idealCase), pluginLiteModeOptionsDisableCss, 0),
      `<script defer="defer" src="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.js"></script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
    );
  });
  test(`${obj.type} with links, lite embed with CSS disabled, zero-index`, t => {
    let withLinks = `<p><a href="">${obj.str}</a></p>`;
    t.is(buildEmbedCodeString(extractVideoId(withLinks), pluginLiteModeOptionsDisableCss, 0),
      `<script defer="defer" src="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.js"></script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
    );
  });
  test(`${obj.type} with whitespace, lite embed with CSS disabled, zero-index`, t => {
    let withWhitespace = `<p>
      ${obj.str}
    </p>`;
    t.is(buildEmbedCodeString(extractVideoId(withWhitespace), pluginLiteModeOptionsDisableCss, 0),
      `<script defer="defer" src="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.js"></script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
    );
  });
  test(`${obj.type} with links and whitespace, lite embed with CSS disabled, zero-index`, t => {
    let withLinksAndWhitespace = `<p>
      <a href="">
        ${obj.str}
      </a>
    </p>`;
    t.is(buildEmbedCodeString(extractVideoId(withLinksAndWhitespace), pluginLiteModeOptionsDisableCss, 0),
      `<script defer="defer" src="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.js"></script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
    );
  });

  test(`${obj.type} ideal case, lite embed with JS disabled, zero-index`, t => {
    let idealCase = `<p>${obj.str}</p>`;
    t.is(buildEmbedCodeString(extractVideoId(idealCase), pluginLiteModeOptionsDisableJs, 0),
      `<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.css">\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
    );
  });
  test(`${obj.type} with links, lite embed with JS disabled, zero-index`, t => {
    let withLinks = `<p><a href="">${obj.str}</a></p>`;
    t.is(buildEmbedCodeString(extractVideoId(withLinks), pluginLiteModeOptionsDisableJs, 0),
      `<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.css">\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
    );
  });
  test(`${obj.type} with whitespace, lite embed with JS disabled, zero-index`, t => {
    let withWhitespace = `<p>
      ${obj.str}
    </p>`;
    t.is(buildEmbedCodeString(extractVideoId(withWhitespace), pluginLiteModeOptionsDisableJs, 0),
      `<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.css">\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
    );
  });
  test(`${obj.type} with links and whitespace, lite embed with JS disabled, zero-index`, t => {
    let withLinksAndWhitespace = `<p>
      <a href="">
        ${obj.str}
      </a>
    </p>`;
    t.is(buildEmbedCodeString(extractVideoId(withLinksAndWhitespace), pluginLiteModeOptionsDisableJs, 0),
      `<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.css">\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
    );
  });

  test(`${obj.type} ideal case, lite embed with CSS Inlined, JS disabled, zero-index`, t => {
    let idealCase = `<p>${obj.str}</p>`;
    t.is(buildEmbedCodeString(extractVideoId(idealCase), pluginLiteModeOptionsInlineCssDisableJs, 0),
      `<style>${inlineCss}</style>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
    );
  });
  test(`${obj.type} with links, lite embed with CSS Inlined, JS disabled, zero-index`, t => {
    let withLinks = `<p><a href="">${obj.str}</a></p>`;
    t.is(buildEmbedCodeString(extractVideoId(withLinks), pluginLiteModeOptionsInlineCssDisableJs, 0),
      `<style>${inlineCss}</style>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
    );
  });
  test(`${obj.type} with whitespace, lite embed with CSS Inlined, JS disabled, zero-index`, t => {
    let withWhitespace = `<p>
      ${obj.str}
    </p>`;
    t.is(buildEmbedCodeString(extractVideoId(withWhitespace), pluginLiteModeOptionsInlineCssDisableJs, 0),
      `<style>${inlineCss}</style>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
    );
  });
  test(`${obj.type} with links and whitespace, lite embed with CSS Inlined, JS disabled, zero-index`, t => {
    let withLinksAndWhitespace = `<p>
      <a href="">
        ${obj.str}
      </a>
    </p>`;
    t.is(buildEmbedCodeString(extractVideoId(withLinksAndWhitespace), pluginLiteModeOptionsInlineCssDisableJs, 0),
      `<style>${inlineCss}</style>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
    );
  });

  test(`${obj.type} ideal case, lite embed with JS Inlined, CSS disabled, zero-index`, t => {
    let idealCase = `<p>${obj.str}</p>`;
    t.is(buildEmbedCodeString(extractVideoId(idealCase), pluginLiteModeOptionsInlineJsDisableCss, 0),
      `<script>${inlineJs}</script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
    );
  });
  test(`${obj.type} with links, lite embed with JS Inlined, CSS disabled, zero-index`, t => {
    let withLinks = `<p><a href="">${obj.str}</a></p>`;
    t.is(buildEmbedCodeString(extractVideoId(withLinks), pluginLiteModeOptionsInlineJsDisableCss, 0),
      `<script>${inlineJs}</script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
    );
  });
  test(`${obj.type} with whitespace, lite embed with JS Inlined, CSS disabled, zero-index`, t => {
    let withWhitespace = `<p>
      ${obj.str}
    </p>`;
    t.is(buildEmbedCodeString(extractVideoId(withWhitespace), pluginLiteModeOptionsInlineJsDisableCss, 0),
      `<script>${inlineJs}</script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
    );
  });
  test(`${obj.type} with links and whitespace, lite embed with JS Inlined, CSS disabled, zero-index`, t => {
    let withLinksAndWhitespace = `<p>
      <a href="">
        ${obj.str}
      </a>
    </p>`;
    t.is(buildEmbedCodeString(extractVideoId(withLinksAndWhitespace), pluginLiteModeOptionsInlineJsDisableCss, 0),
      `<script>${inlineJs}</script>\n<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
    );
  });

  test(`${obj.type} ideal case, lite embed with CSS and JS both disabled, zero-index`, t => {
    let idealCase = `<p>${obj.str}</p>`;
    t.is(buildEmbedCodeString(extractVideoId(idealCase), pluginLiteModeOptionsDisableBoth, 0),
      `<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
    );
  });
  test(`${obj.type} with links, lite embed with CSS and JS both disabled, zero-index`, t => {
    let withLinks = `<p><a href="">${obj.str}</a></p>`;
    t.is(buildEmbedCodeString(extractVideoId(withLinks), pluginLiteModeOptionsDisableBoth, 0),
      `<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
    );
  });
  test(`${obj.type} with whitespace, lite embed with CSS and JS both disabled, zero-index`, t => {
    let withWhitespace = `<p>
      ${obj.str}
    </p>`;
    t.is(buildEmbedCodeString(extractVideoId(withWhitespace), pluginLiteModeOptionsDisableBoth, 0),
      `<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
    );
  });
  test(`${obj.type} with links and whitespace, lite embed with CSS and JS both disabled, zero-index`, t => {
    let withLinksAndWhitespace = `<p>
      <a href="">
        ${obj.str}
      </a>
    </p>`;
    t.is(buildEmbedCodeString(extractVideoId(withLinksAndWhitespace), pluginLiteModeOptionsDisableBoth, 0),
      `<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`
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
