import { test } from 'node:test';
import assert from 'node:assert/strict';
import pattern from '../lib/pattern.js';
import { all } from './_validUrls.mjs';

for (let [index, url] of all.entries()) {

  test(`Regex test ${index}-a: ${url}`, async () => {
    // The whole deal with `lastIndex`:
    // https://github.com/gfscott/eleventy-plugin-embed-everything/blob/2bbe639177606deead2f9583d9c34f5557727f6d/packages/ted/test/pattern.test.js#L8-L30
    pattern.lastIndex = 0;
    let str = `<p>${url}</p>`
    assert.match(str, pattern);
  });

  test(`Regex test ${index}-b: ${url}, with whitespace`, async () => {
    pattern.lastIndex = 0;
    let str = `<p>
                ${url}
              </p>`
    assert.match(str, pattern);
  });

  test(`Regex test ${index}-c: ${url}, with link`, async () => {
    pattern.lastIndex = 0;
    let str = `<p><a href="${url}">${url}</a></p>`
    assert.match(str, pattern);
  });

  test(`Regex test ${index}-d: ${url}, with link and whitespace`, async () => {
    pattern.lastIndex = 0;
    let str = `<p>
                <a href="${url}">
                  ${url}
                </a>
              </p>`
    assert.match(str, pattern);
  });

  /**
   * Invalid variations
   * These should be ignored by the regular expression pattern.
   * @see https://github.com/avajs/ava/blob/main/docs/03-assertions.md#notregexcontents-regex-message
   */

  test(`Regex test ${index}-e: ${url}, with invalid prepended text`, async () => {
    pattern.lastIndex = 0;
    let str = `<p>foo ${url}</p>`
    assert.doesNotMatch(str, pattern);
  })

  test(`Regex test ${index}-e: ${url}, with invalid appended text`, async () => {
    pattern.lastIndex = 0;
    let str = `<p>${url} foo</p>`
    assert.doesNotMatch(str, pattern);
  })

  test(`Regex test ${index}-e: ${url}, with invalid ID length`, async () => {
    pattern.lastIndex = 0;
    // Remove the last 14 characters from the URL. This accounts for the
    // variants that have URL parameters, which max out at 12 characters.
    let str = `<p>${url.slice(0, -14)}</p>`
    assert.doesNotMatch(str, pattern);
  })
}
