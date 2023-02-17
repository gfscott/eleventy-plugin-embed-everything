const test = require('ava');
const extractMatches = require('../lib/extractMatches.js');
const validUrls = require('./_inc/validUrls.js');

/**
 * =====================================================
 * For all possible valid URLs, test that the video ID
 * is extracted correctly.
 */
for (let [index, url] of validUrls.entries()) {

  test(`Valid-${index}: (${url}) without link, without whitespace`, t => {
    const {id: videoId, url: videoUrl } = extractMatches(`<p>${url}</p>`)
    t.is(videoId, 'hIs5StN8J-0');
    t.is(videoUrl, url)
  });

  test(`Valid-${index}: (${url}) without link, with whitespace`, t => {
    const {id: videoId, url: videoUrl } = extractMatches(`<p>
    ${url}
  </p>`)
    t.is(videoId, 'hIs5StN8J-0');
    t.is(videoUrl, url)
  });

  test(`Valid-${index}: (${url}) with link, without whitespace`, t => {
    const {id: videoId, url: videoUrl } = extractMatches(`<p><a href="${url}">${url}</a></p>`)
    t.is(videoId, 'hIs5StN8J-0');
    t.is(videoUrl, url)
  });

  test(`Valid-${index}: (${url}) with link, with whitespace`, t => {
    const {id: videoId, url: videoUrl } = extractMatches(`<p>
    <a href="${url}">
      ${url}
    </a>
  </p>`)
    t.is(videoId, 'hIs5StN8J-0');
    t.is(videoUrl, url)
  });
}
