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
    let embed = str.replace(pattern, (...match) => replace(match, config, 0));
    t.is(embed, '<blockquote class="eleventy-plugin-embed-instagram instagram-media" data-instgrm-permalink="https://www.instagram.com/p/0123456789a"></blockquote><script async defer src="https://www.instagram.com/embed.js"></script>')
  });

  test(`${index}: Embed string, custom embed class`, async t => {
    const config = Object.assign({}, defaults, { embedClass: 'foo'});
    let embed = str.replace(pattern, (...match) => replace(match, config, 0));
    t.is(embed, '<blockquote class="foo instagram-media" data-instgrm-permalink="https://www.instagram.com/p/0123456789a"></blockquote><script async defer src="https://www.instagram.com/embed.js"></script>')
  });

  test(`${index}: Embed string, no embed class`, async t => {
    const config = Object.assign({}, defaults, { embedClass: ''});
    let embed = str.replace(pattern, (...match) => replace(match, config, 0));
    t.is(embed, '<blockquote class=" instagram-media" data-instgrm-permalink="https://www.instagram.com/p/0123456789a"></blockquote><script async defer src="https://www.instagram.com/embed.js"></script>')
  });

  test(`${index}: Embed string, subsequent embeds don’t get script tags`, async t => {
    const config = Object.assign({}, defaults, {});
    let embed = str.replace(pattern, (...match) => replace(match, config, 1));
    t.is(embed, '<blockquote class="eleventy-plugin-embed-instagram instagram-media" data-instgrm-permalink="https://www.instagram.com/p/0123456789a"></blockquote>')
  });

}

test('Script tag added only to first embed instance on the page', t => {
	const str = "<p>https://www.instagram.com/p/0123456789a</p><p>https://www.instagram.com/p/0123456789a</p>";
  const config = Object.assign({}, defaults, {});
  let index = 0;
  const embed = str.replace(pattern, (...match) => {
    const replacer = replace(match, config, index)
    index++
    return replacer
  })
  t.is(embed, '<blockquote class="eleventy-plugin-embed-instagram instagram-media" data-instgrm-permalink="https://www.instagram.com/p/0123456789a"></blockquote><script async defer src="https://www.instagram.com/embed.js"></script><blockquote class="eleventy-plugin-embed-instagram instagram-media" data-instgrm-permalink="https://www.instagram.com/p/0123456789a"></blockquote>')
})