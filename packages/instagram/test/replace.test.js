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
    t.is(embed, '<div class="eleventy-plugin-embed-ted" style="position:relative;width:100%;padding-top: 56.25%;"><iframe src="https://embed.ted.com/talks/fake_talk" style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" scrolling="no" allowfullscreen></iframe></div>')
  });

  test(`${index}: Embed string, custom iframescrolling`, async t => {
    const config = Object.assign({}, defaults, { iframeScrolling: "yes"});
    let embed = str.replace(pattern, (...match) => replace(match, config));
    t.is(embed, '<div class="eleventy-plugin-embed-ted" style="position:relative;width:100%;padding-top: 56.25%;"><iframe src="https://embed.ted.com/talks/fake_talk" style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" scrolling="yes" allowfullscreen></iframe></div>')
  });

  test(`${index}: Embed string, custom iframe width`, async t => {
    const config = Object.assign({}, defaults, { iframeWidth: "80"});
    let embed = str.replace(pattern, (...match) => replace(match, config));
    t.is(embed, '<div class="eleventy-plugin-embed-ted" style="position:relative;width:100%;padding-top: 56.25%;"><iframe src="https://embed.ted.com/talks/fake_talk" style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="80" height="100%" frameborder="0" scrolling="no" allowfullscreen></iframe></div>')
  });

  test(`${index}: Embed string, custom iframe height`, async t => {
    const config = Object.assign({}, defaults, { iframeHeight: "80"});
    let embed = str.replace(pattern, (...match) => replace(match, config));
    t.is(embed, '<div class="eleventy-plugin-embed-ted" style="position:relative;width:100%;padding-top: 56.25%;"><iframe src="https://embed.ted.com/talks/fake_talk" style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="80" frameborder="0" scrolling="no" allowfullscreen></iframe></div>')
  });

  test(`${index}: Embed string, custom frameborder value`, async t => {
    const config = Object.assign({}, defaults, { iframeFrameborder: "1"});
    let embed = str.replace(pattern, (...match) => replace(match, config));
    t.is(embed, '<div class="eleventy-plugin-embed-ted" style="position:relative;width:100%;padding-top: 56.25%;"><iframe src="https://embed.ted.com/talks/fake_talk" style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="1" scrolling="no" allowfullscreen></iframe></div>')
  });

  test(`${index}: Embed string, custom iframe css`, async t => {
    const config = Object.assign({}, defaults, { iframeCss: "foo"});
    let embed = str.replace(pattern, (...match) => replace(match, config));
    t.is(embed, '<div class="eleventy-plugin-embed-ted" style="position:relative;width:100%;padding-top: 56.25%;"><iframe src="https://embed.ted.com/talks/fake_talk" style="foo" width="100%" height="100%" frameborder="0" scrolling="no" allowfullscreen></iframe></div>')
  });

  test(`${index}: Embed string, custom container class`, async t => {
    const config = Object.assign({}, defaults, {embedClass : "foo"});
    let embed = str.replace(pattern, (...match) => replace(match, config));
    t.is(embed, '<div class="foo" style="position:relative;width:100%;padding-top: 56.25%;"><iframe src="https://embed.ted.com/talks/fake_talk" style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" scrolling="no" allowfullscreen></iframe></div>')
  });

  test(`${index}: Embed string, custom container css`, async t => {
    const config = Object.assign({}, defaults, {containerCss: "foo"});
    let embed = str.replace(pattern, (...match) => replace(match, config));
    t.is(embed, '<div class="eleventy-plugin-embed-ted" style="foo"><iframe src="https://embed.ted.com/talks/fake_talk" style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" scrolling="no" allowfullscreen></iframe></div>')
  });

  test(`${index}: Embed string, no fullscreen`, async t => {
    const config = Object.assign({}, defaults, { allowFullscreen: false});
    let embed = str.replace(pattern, (...match) => replace(match, config));
    t.is(embed, '<div class="eleventy-plugin-embed-ted" style="position:relative;width:100%;padding-top: 56.25%;"><iframe src="https://embed.ted.com/talks/fake_talk" style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" scrolling="no" ></iframe></div>')
  });

}


