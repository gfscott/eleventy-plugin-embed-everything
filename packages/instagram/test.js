const test = require('ava');
const patternPresent = require('./lib/spotPattern.js');
const extractId = require('./lib/extractMatches.js');
const buildEmbed = require('./lib/buildEmbed.js');
const pluginDefaults = require('./lib/pluginDefaults.js');


const validStrings = [
  {type: 'Standard', str: 'https://www.instagram.com/p/B-rRt1MjKZD/'},
  {type: 'With http', str: 'http://www.instagram.com/p/B-rRt1MjKZD/'},
  {type: 'Without protocol', str: 'www.instagram.com/p/B-rRt1MjKZD/'},
  {type: 'Without trailing slash', str: 'https://www.instagram.com/p/B-rRt1MjKZD'},
  {type: 'With https, without www', str: 'https://instagram.com/p/B-rRt1MjKZD/'},
  {type: 'With http, without www', str: 'https://www.instagram.com/p/B-rRt1MjKZD/'},
  {type: 'Without https, without www', str: 'instagram.com/p/B-rRt1MjKZD/'},
]

const invalidStrings = [
  {type: 'Incomplete photo ID', str: 'https://www.instagram.com/p/abcde/'},
  {type: 'With prepended text', str: 'foo https://www.instagram.com/p/B-rRt1MjKZD/'},
  {type: 'With malformed protocol', str: 'https//www.instagram.com/p/B-rRt1MjKZD/'},
  {type: 'With prepended text, with link', str: 'foo <a href="">https://www.instagram.com/p/B-rRt1MjKZD/</a>'},
  {type: 'With appended text', str: 'https://www.instagram.com/p/B-rRt1MjKZD/ bar'},
  {type: 'With appended text, with link', str: '<a href="">https://www.instagram.com/p/B-rRt1MjKZD/</a> bar'},
]

/**
 * Ensure that valid strings pass
 */
validStrings.forEach(function(obj){
  test(`String is valid: ${obj.type} ideal case`, t => {
    let idealCase = `<p>${obj.str}</p>`;
    t.truthy(patternPresent(idealCase));
  });
  test(`String is valid: ${obj.type} with links`, t => {
    let withLinks = `<p><a href="">${obj.str}</a></p>`;
    t.truthy(patternPresent(withLinks));
    });
  test(`String is valid: ${obj.type} with whitespace`, t => {
    let withWhitespace = `<p>
      ${obj.str}
    </p>`;
    t.truthy(patternPresent(withWhitespace));
  });
  test(`String is valid: ${obj.type} with links and whitespace`, t => {
    let withLinksAndWhitespace = `<p>
      <a href="">
        ${obj.str}
      </a>
    </p>`;
    t.truthy(patternPresent(withLinksAndWhitespace));
  });
  test(`String is valid: ${obj.type} with links and whitespace surrounding wrapping paragraph`, t => {
    let withLinksAndWhitespace = `   <p>
      <a href="">
        ${obj.str}
      </a>
    </p>   `;
    t.truthy(patternPresent(withLinksAndWhitespace));
  });
});
/**
 * Ensure that valid strings produce the expected media ID as output
 */
validStrings.forEach(function(obj){
  test(`Proper ID returned: ${obj.type} ideal case`, t => {
    let idealCase = `<p>${obj.str}</p>`;
    t.is(extractId(idealCase), 'B-rRt1MjKZD');
  });
  test(`Proper ID returned: ${obj.type} with links`, t => {
    let withLinks = `<p><a href="">${obj.str}</a></p>`;
    t.is(extractId(withLinks), 'B-rRt1MjKZD');
  });
  test(`Proper ID returned: ${obj.type} with whitespace`, t => {
    let withWhitespace = `<p>
      ${obj.str}
    </p>`;
    t.is(extractId(withWhitespace), 'B-rRt1MjKZD');
  });
  test(`Proper ID returned: ${obj.type} with links and whitespace`, t => {
    let withLinksAndWhitespace = `<p>
      <a href="">
        ${obj.str}
      </a>
    </p>`;
    t.is(extractId(withLinksAndWhitespace), 'B-rRt1MjKZD');
  });
});

/**
 * Ensure that build script produces expected HTML output on first instance
 */
validStrings.forEach(function(obj){
  test(`Proper HTML output, zero-index: ${obj.type} ideal case`, t => {
    let idealCase = `<p>${obj.str}</p>`;
    t.is(buildEmbed(extractId(idealCase), pluginDefaults, 0),
      `<blockquote class="eleventy-plugin-embed-instagram instagram-media" data-instgrm-permalink="https://www.instagram.com/p/B-rRt1MjKZD"></blockquote><script async defer src="https://www.instagram.com/embed.js"></script>`
    );
  });
  test(`Proper HTML output, zero-index: ${obj.type} with links`, t => {
    let withLinks = `<p><a href="">${obj.str}</a></p>`;
    t.is(buildEmbed(extractId(withLinks), pluginDefaults, 0),
      `<blockquote class="eleventy-plugin-embed-instagram instagram-media" data-instgrm-permalink="https://www.instagram.com/p/B-rRt1MjKZD"></blockquote><script async defer src="https://www.instagram.com/embed.js"></script>`
    );
  });
  test(`Proper HTML output, zero-index: ${obj.type} with whitespace`, t => {
    let withWhitespace = `<p>
      ${obj.str}
    </p>`;
    t.is(buildEmbed(extractId(withWhitespace), pluginDefaults, 0),
      `<blockquote class="eleventy-plugin-embed-instagram instagram-media" data-instgrm-permalink="https://www.instagram.com/p/B-rRt1MjKZD"></blockquote><script async defer src="https://www.instagram.com/embed.js"></script>`
    );
  });
  test(`Proper HTML output, zero-index: ${obj.type} with links and whitespace`, t => {
    let withLinksAndWhitespace = `<p>
      <a href="">
        ${obj.str}
      </a>
    </p>`;
    t.is(buildEmbed(extractId(withLinksAndWhitespace), pluginDefaults, 0),
      `<blockquote class="eleventy-plugin-embed-instagram instagram-media" data-instgrm-permalink="https://www.instagram.com/p/B-rRt1MjKZD"></blockquote><script async defer src="https://www.instagram.com/embed.js"></script>`
    );
  });
});
/**
 * Ensure that valid strings pass
 */
validStrings.forEach(function(obj){
  test(`Proper HTML output, >0 index: ${obj.type} ideal case`, t => {
    let idealCase = `<p>${obj.str}</p>`;
    t.is(buildEmbed(extractId(idealCase), pluginDefaults, 1),
      `<blockquote class="eleventy-plugin-embed-instagram instagram-media" data-instgrm-permalink="https://www.instagram.com/p/B-rRt1MjKZD"></blockquote>`
    );
  });
  test(`Proper HTML output, >0 index: ${obj.type} with links`, t => {
    let withLinks = `<p><a href="">${obj.str}</a></p>`;
    t.is(buildEmbed(extractId(withLinks), pluginDefaults, 1),
      `<blockquote class="eleventy-plugin-embed-instagram instagram-media" data-instgrm-permalink="https://www.instagram.com/p/B-rRt1MjKZD"></blockquote>`
    );
  });
  test(`Proper HTML output, >0 index: ${obj.type} with whitespace`, t => {
    let withWhitespace = `<p>
      ${obj.str}
    </p>`;
    t.is(buildEmbed(extractId(withWhitespace), pluginDefaults, 1),
      `<blockquote class="eleventy-plugin-embed-instagram instagram-media" data-instgrm-permalink="https://www.instagram.com/p/B-rRt1MjKZD"></blockquote>`
    );
  });
  test(`Proper HTML output, >0 index: ${obj.type} with links and whitespace`, t => {
    let withLinksAndWhitespace = `<p>
      <a href="">
        ${obj.str}
      </a>
    </p>`;
    t.is(buildEmbed(extractId(withLinksAndWhitespace), pluginDefaults, 1),
      `<blockquote class="eleventy-plugin-embed-instagram instagram-media" data-instgrm-permalink="https://www.instagram.com/p/B-rRt1MjKZD"></blockquote>`
    );
  });
});

/**
 * Ensure that invalid strings fail
 */

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