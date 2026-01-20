const test = require('ava');
const pattern = require('./lib/pattern.js');
const defaults = require('./lib/defaults.js')
const replace = require('./lib/replace.js')

/**
 * Valid strings to test
 */
const validStrings = [
  {type: 'Standard', str: 'https://www.instagram.com/p/B-rRt1MjKZD/', expectedType: 'p'},
  {type: 'With http', str: 'http://www.instagram.com/p/B-rRt1MjKZD/', expectedType: 'p'},
  {type: 'Without protocol', str: 'www.instagram.com/p/B-rRt1MjKZD/', expectedType: 'p'},
  {type: 'Without trailing slash', str: 'https://www.instagram.com/p/B-rRt1MjKZD', expectedType: 'p'},
  {type: 'With https, without www', str: 'https://instagram.com/p/B-rRt1MjKZD/', expectedType: 'p'},
  {type: 'With http, without www', str: 'https://www.instagram.com/p/B-rRt1MjKZD/', expectedType: 'p'},
  {type: 'Without https, without www', str: 'instagram.com/p/B-rRt1MjKZD/', expectedType: 'p'},
  {type: 'Standard Reel', str: 'https://www.instagram.com/reel/DE0T298yYMj/', expectedType: 'reel'},
  {type: 'Without protocol Reel', str: 'www.instagram.com/reel/DE0T298yYMj/', expectedType: 'reel'},
  {type: 'Without www Reel', str: 'instagram.com/reel/DE0T298yYMj/', expectedType: 'reel'},
  {type: 'Standard TV', str: 'https://www.instagram.com/tv/BkQjCfsBIzi/', expectedType: 'tv'},
  {type: 'Without protocol TV', str: 'www.instagram.com/tv/BkQjCfsBIzi/', expectedType: 'tv'},
  {type: 'Without www TV', str: 'instagram.com/tv/BkQjCfsBIzi/', expectedType: 'tv'}
]

/**
 * Invalid strings to test
 */
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
    let extracted = extractId(idealCase);
    t.is(extracted.type, obj.expectedType);
    t.truthy(extracted.id);
  });
  test(`Proper ID returned: ${obj.type} with links`, t => {
    let withLinks = `<p><a href="">${obj.str}</a></p>`;
    let extracted = extractId(withLinks);
    t.is(extracted.type, obj.expectedType);
    t.truthy(extracted.id);
  });
  test(`Proper ID returned: ${obj.type} with whitespace`, t => {
    let withWhitespace = `<p>
      ${obj.str}
    </p>`;
    let extracted = extractId(withWhitespace);
    t.is(extracted.type, obj.expectedType);
    t.truthy(extracted.id);
  });
  test(`Proper ID returned: ${obj.type} with links and whitespace`, t => {
    let withLinksAndWhitespace = `<p>
      <a href="">
        ${obj.str}
      </a>
    </p>`;
    let extracted = extractId(withLinksAndWhitespace);
    t.is(extracted.type, obj.expectedType);
    t.truthy(extracted.id);
  });
});

/**
 * Ensure that build script produces expected HTML output on first instance
 */
validStrings.forEach(function(obj){
  test(`Proper HTML output, zero-index: ${obj.type} ideal case`, t => {
    let idealCase = `<p>${obj.str}</p>`;
    let extracted = extractId(idealCase);
    t.is(buildEmbed(extracted, pluginDefaults, 0),
      `<blockquote class="eleventy-plugin-embed-instagram instagram-media" data-instgrm-permalink="https://www.instagram.com/${extracted.type}/${extracted.id}"></blockquote><script async defer src="https://www.instagram.com/embed.js"></script>`
    );
  });
  test(`Proper HTML output, zero-index: ${obj.type} with links`, t => {
    let withLinks = `<p><a href="">${obj.str}</a></p>`;
    let extracted = extractId(withLinks);
    t.is(buildEmbed(extracted, pluginDefaults, 0),
      `<blockquote class="eleventy-plugin-embed-instagram instagram-media" data-instgrm-permalink="https://www.instagram.com/${extracted.type}/${extracted.id}"></blockquote><script async defer src="https://www.instagram.com/embed.js"></script>`
    );
  });
  test(`Proper HTML output, zero-index: ${obj.type} with whitespace`, t => {
    let withWhitespace = `<p>
      ${obj.str}
    </p>`;
    let extracted = extractId(withWhitespace);
    t.is(buildEmbed(extracted, pluginDefaults, 0),
      `<blockquote class="eleventy-plugin-embed-instagram instagram-media" data-instgrm-permalink="https://www.instagram.com/${extracted.type}/${extracted.id}"></blockquote><script async defer src="https://www.instagram.com/embed.js"></script>`
    );
  });
  test(`Proper HTML output, zero-index: ${obj.type} with links and whitespace`, t => {
    let withLinksAndWhitespace = `<p>
      <a href="">
        ${obj.str}
      </a>
    </p>`;
    let extracted = extractId(withLinksAndWhitespace);
    t.is(buildEmbed(extracted, pluginDefaults, 0),
      `<blockquote class="eleventy-plugin-embed-instagram instagram-media" data-instgrm-permalink="https://www.instagram.com/${extracted.type}/${extracted.id}"></blockquote><script async defer src="https://www.instagram.com/embed.js"></script>`
    );
  });
});

/**
 * Ensure that valid strings pass
 */
validStrings.forEach(function(obj){
  test(`Proper HTML output, >0 index: ${obj.type} ideal case`, t => {
    let idealCase = `<p>${obj.str}</p>`;
    let extracted = extractId(idealCase);
    t.is(buildEmbed(extracted, pluginDefaults, 1),
      `<blockquote class="eleventy-plugin-embed-instagram instagram-media" data-instgrm-permalink="https://www.instagram.com/${extracted.type}/${extracted.id}"></blockquote>`
    );
  });
  test(`Proper HTML output, >0 index: ${obj.type} with links`, t => {
    let withLinks = `<p><a href="">${obj.str}</a></p>`;
    let extracted = extractId(withLinks);
    t.is(buildEmbed(extracted, pluginDefaults, 1),
      `<blockquote class="eleventy-plugin-embed-instagram instagram-media" data-instgrm-permalink="https://www.instagram.com/${extracted.type}/${extracted.id}"></blockquote>`
    );
  });
  test(`Proper HTML output, >0 index: ${obj.type} with whitespace`, t => {
    let withWhitespace = `<p>
      ${obj.str}
    </p>`;
    let extracted = extractId(withWhitespace);
    t.is(buildEmbed(extracted, pluginDefaults, 1),
      `<blockquote class="eleventy-plugin-embed-instagram instagram-media" data-instgrm-permalink="https://www.instagram.com/${extracted.type}/${extracted.id}"></blockquote>`
    );
  });
  test(`Proper HTML output, >0 index: ${obj.type} with links and whitespace`, t => {
    let withLinksAndWhitespace = `<p>
      <a href="">
        ${obj.str}
      </a>
    </p>`;
    let extracted = extractId(withLinksAndWhitespace);
    t.is(buildEmbed(extracted, pluginDefaults, 1),
      `<blockquote class="eleventy-plugin-embed-instagram instagram-media" data-instgrm-permalink="https://www.instagram.com/${extracted.type}/${extracted.id}"></blockquote>`
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
