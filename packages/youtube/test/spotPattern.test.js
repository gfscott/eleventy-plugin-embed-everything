const test = require('ava');
const spotPattern = require('../lib/spotPattern.js');
const validUrls = require('./_inc/validUrls.js');

/**
 * =====================================================
 * For all possible valid URLs, test that the pattern is
 * spotted correctly.
 *
 * Getting indexes with a for...of loop:
 * https://reactgo.com/javascript-get-index-for-of-loop/
 */
for (let [index, url] of validUrls.entries()) {

  test(`Valid-${index}: (${url}) without link, without whitespace`, t => {
    t.truthy(spotPattern(`<p>${url}</p>`));
  });
  test(`Valid-${index}: (${url}) without link, with whitespace`, t => {
    t.truthy(spotPattern(`<p>
      ${url}
    </p>`));
  });
  test(`Valid-${index}: (${url}) with link, without whitespace`, t => {
    t.truthy(spotPattern(`<p><a href="${url}">${url}</a></p>`));
  });
  test(`Valid-${index}: (${url}) with link, with whitespace`, t => {
    t.truthy(spotPattern(`<p>
      <a href="${url}">
        ${url}
      </a>
    </p>`));
  });

  /**
   * Test that regex rejects paragraphs with prepended text
   */
  test(`Invalid-${index}: (${url}) without link, without whitespace, prepend text`, t => {
    t.falsy(spotPattern(`<p>Foo ${url}</p>`));
  });
  test(`Invalid-${index}: (${url}) without link, with whitespace, prepend text`, t => {
    t.falsy(spotPattern(`<p>Foo
      ${url}
    </p>`));
  });
  test(`Invalid-${index}: (${url}) with link, without whitespace, prepend text`, t => {
    t.falsy(spotPattern(`<p>Foo <a href="${url}">${url}</a></p>`));
  });
  test(`Invalid-${index}: (${url}) with link, with whitespace, prepend text`, t => {
    t.falsy(spotPattern(`<p>Foo
      <a href="${url}">
        ${url}
      </a>
    </p>`));
  });
  test(`Invalid-${index}: (${url}) with link, without whitespace, prepend text inside link`, t => {
    t.falsy(spotPattern(`<p><a href="${url}">Foo ${url}</a></p>`));
  });
  test(`Invalid-${index}: (${url}) with link, with whitespace, prepend text inside link`, t => {
    t.falsy(spotPattern(`<p>
      <a href="${url}">
        Foo ${url}
      </a>
    </p>`));
  });

  /**
   * Test that regex rejects paragraphs with appended text
   */
  test(`Invalid-${index}: (${url}) without link, without whitespace, append text`, t => {
    t.falsy(spotPattern(`<p>${url} Foo</p>`));
  });
  test(`Invalid-${index}: (${url}) without link, with whitespace, append text`, t => {
    t.falsy(spotPattern(`<p>
      ${url}
    Foo</p>`));
  });
  test(`Invalid-${index}: (${url}) with link, without whitespace, append text`, t => {
    t.falsy(spotPattern(`<p><a href="${url}">${url}</a> Foo</p>`));
  });
  test(`Invalid-${index}: (${url}) with link, with whitespace, append text`, t => {
    t.falsy(spotPattern(`<p>
      <a href="${url}">
        ${url}
      </a>
    Foo </p>`));
  });
  test(`Invalid-${index}: (${url}) with link, without whitespace, append text inside link`, t => {
    t.falsy(spotPattern(`<p><a href="${url}">${url} Foo</a></p>`));
  });
  test(`Invalid-${index}: (${url}) with link, with whitespace, append text inside link`, t => {
    t.falsy(spotPattern(`<p>
      <a href="${url}">
        ${url} Foo
      </a>
    </p>`));
  });

  /**
   * Test that regex isn't greedily consuming subsequent paragraphs
   * in minified HTML.
   */
  test(`Valid-${index}: (${url}) without link, non-greedy for minified HTML`, t => {
    let p = `<p>${url}</p><p>Foo</p>`
    let expected = `<p>${url}</p>`
    t.deepEqual(spotPattern(p), [expected]);
  });
  test(`Valid-${index}: (${url}) with link, non-greedy for minified HTML`, t => {
    let p = `<p><a href="${url}">${url}</a></p><p>Foo</p>`
    let expected = `<p><a href="${url}">${url}</a></p>`
    t.deepEqual(spotPattern(p), [expected]);
  });
}

/**
 * Test that regex rejects YouTube playlist URLs
 */
let playlistUrl = "https://www.youtube.com/playlist?list=PLv0jwu7G_DFVP0SGNlBiBtFVkV5LZ7SOU"
test(`Invalid playlist URL: (${playlistUrl}) without link, without whitespace`, t => {
  t.falsy(spotPattern(`<p>${playlistUrl}</p>`));
});
test(`Invalid playlist URL: (${playlistUrl}) without link, with whitespace`, t => {
  t.falsy(spotPattern(`<p>
    ${playlistUrl}
  </p>`));
});
test(`Invalid playlist URL: (${playlistUrl}) with link, without whitespace`, t => {
  t.falsy(spotPattern(`<p><a href="${playlistUrl}">${playlistUrl}</a></p>`));
});
test(`Invalid playlist URL: (${playlistUrl}) with link, with whitespace`, t => {
  t.falsy(spotPattern(`<p>
    <a href="${playlistUrl}">
      ${playlistUrl}
    </a>
  </p>`));
});
