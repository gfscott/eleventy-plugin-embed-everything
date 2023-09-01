const test = require('ava');
const defaults = require('../lib/defaults.js');
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
    let embed = replace(str, config);
    t.is(embed, '<blockquote class="eleventy-plugin-embed-instagram instagram-media" data-instgrm-permalink="https://www.instagram.com/p/0123456789a"></blockquote><script async defer src="https://www.instagram.com/embed.js"></script>')
  });

  test(`${index}: Embed string, custom embed class`, async t => {
    const config = Object.assign({}, defaults, { embedClass: 'foo'});
    let embed = replace(str, config);
    t.is(embed, '<blockquote class="foo instagram-media" data-instgrm-permalink="https://www.instagram.com/p/0123456789a"></blockquote><script async defer src="https://www.instagram.com/embed.js"></script>')
  });

  test(`${index}: Embed string, no embed class`, async t => {
    const config = Object.assign({}, defaults, { embedClass: ''});
    let embed = replace(str, config);
    t.is(embed, '<blockquote class=" instagram-media" data-instgrm-permalink="https://www.instagram.com/p/0123456789a"></blockquote><script async defer src="https://www.instagram.com/embed.js"></script>')
  });

  test(`${index}: Multiple embeds, only first adds script tag`, async t => {
    const config = Object.assign({}, defaults, {});
    const twice = str + str;
    let embed = replace(twice, config);
    t.is(embed, '<blockquote class="eleventy-plugin-embed-instagram instagram-media" data-instgrm-permalink="https://www.instagram.com/p/0123456789a"></blockquote><script async defer src="https://www.instagram.com/embed.js"></script><blockquote class="eleventy-plugin-embed-instagram instagram-media" data-instgrm-permalink="https://www.instagram.com/p/0123456789a"></blockquote>')
  });
}
