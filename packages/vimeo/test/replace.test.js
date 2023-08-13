const test = require('ava');
const defaults = require('../lib/defaults.js');
const pattern = require('../lib/pattern.js');
const replace = require('../lib/replace.js');
const validUrls = require('./_validUrls.js');

const allStrings = validUrls.map(url => {
  let out = [];
  out.push(`<p>${url}</p>`); // no whitespace
  out.push(`<p>
    ${url}
  </p>`); // whitespace
  out.push(`<p><a href="${url}">${url}</a></p>`); // link
  out.push(`<p>
    <a href="${url}">
      ${url}
    </a>
  </p>`); // link with whitespace
  return out;
});

for (let [index, str] of allStrings.flat().entries()) {

  test(`${index}: Embed string, default options`, async t => {
    const config = Object.assign({}, defaults, {});
    let embed = str.replace(pattern, (...match) => replace(match, config));
    t.is(embed, '<div id="vimeo-123456" class="eleventy-plugin-vimeo-embed" style="position:relative;width:100%;padding-top:56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" frameborder="0" src="https://player.vimeo.com/video/123456?dnt=1" allowfullscreen></iframe></div>')
  });

  test(`${index}: Embed string, no fullscreen`, async t => {
    const config = Object.assign({}, defaults, { allowFullscreen: false });
    let embed = str.replace(pattern, (...match) => replace(match, config));
    t.is(embed, '<div id="vimeo-123456" class="eleventy-plugin-vimeo-embed" style="position:relative;width:100%;padding-top:56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" frameborder="0" src="https://player.vimeo.com/video/123456?dnt=1" ></iframe></div>')
  });

  test(`${index}: Embed string, custom dnt`, async t => {
    const config = Object.assign({}, defaults, { dnt: false });
    let embed = str.replace(pattern, (...match) => replace(match, config));
    t.is(embed, '<div id="vimeo-123456" class="eleventy-plugin-vimeo-embed" style="position:relative;width:100%;padding-top:56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" frameborder="0" src="https://player.vimeo.com/video/123456?dnt=0" allowfullscreen></iframe></div>')
  });

  test(`${index}: Embed string, custom class`, async t => {
    const config = Object.assign({}, defaults, { embedClass: 'foo' });
    let embed = str.replace(pattern, (...match) => replace(match, config));
    t.is(embed, '<div id="vimeo-123456" class="foo" style="position:relative;width:100%;padding-top:56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" frameborder="0" src="https://player.vimeo.com/video/123456?dnt=1" allowfullscreen></iframe></div>')
  });

  test(`${index}: Embed string, custom iframe style`, async t => {
    const config = Object.assign({}, defaults, { iframeStyle: 'foo'});
    let embed = str.replace(pattern, (...match) => replace(match, config));
    t.is(embed, '<div id="vimeo-123456" class="eleventy-plugin-vimeo-embed" style="position:relative;width:100%;padding-top:56.25%;"><iframe style="foo" frameborder="0" src="https://player.vimeo.com/video/123456?dnt=1" allowfullscreen></iframe></div>')
  });

  test(`${index}: Embed string, custom wrapper style`, async t => {
    const config = Object.assign({}, defaults, { wrapperStyle: 'foo' });
    let embed = str.replace(pattern, (...match) => replace(match, config));
    t.is(embed, '<div id="vimeo-123456" class="eleventy-plugin-vimeo-embed" style="foo"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" frameborder="0" src="https://player.vimeo.com/video/123456?dnt=1" allowfullscreen></iframe></div>')
  });

}


