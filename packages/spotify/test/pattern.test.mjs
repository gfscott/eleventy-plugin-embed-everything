import test from 'ava';
import pattern from '../lib/pattern.js';
import { all } from './_validUrls.mjs';

for (let [index, url] of all.entries()) {
  
  test(`Regex test ${index}-a: ${url}`, async t => {
    // The whole deal with `lastIndex`:
    // https://github.com/gfscott/eleventy-plugin-embed-everything/blob/2bbe639177606deead2f9583d9c34f5557727f6d/packages/ted/test/pattern.test.js#L8-L30
    pattern.lastIndex = 0;
    let str = `<p>${url}</p>`
    t.regex(str, pattern);
  });

  test(`Regex test ${index}-b: ${url}, with whitespace`, async t => {
    pattern.lastIndex = 0;
    let str = `<p>
                ${url}
              </p>`
    t.regex(str, pattern);
  });

  test(`Regex test ${index}-c: ${url}, with link`, async t => {
    pattern.lastIndex = 0;
    let str = `<p><a href="${url}">${url}</a></p>`
    t.regex(str, pattern);
  });

  test(`Regex test ${index}-d: ${url}, with link and whitespace`, async t => {
    pattern.lastIndex = 0;
    let str = `<p>
                <a href="${url}">
                  ${url}
                </a>
              </p>`
    t.regex(str, pattern);
  });

  /**
   * Invalid variations
   * These should be ignored by the regular expression pattern.
   * @see https://github.com/avajs/ava/blob/main/docs/03-assertions.md#notregexcontents-regex-message
   */

  test(`Regex test ${index}-e: ${url}, with invalid prepended text`, async t => {
    pattern.lastIndex = 0;
    let str = `<p>foo ${url}</p>`
    t.notRegex(str, pattern);
  })

  test(`Regex test ${index}-e: ${url}, with invalid appended text`, async t => {
    pattern.lastIndex = 0;
    let str = `<p>${url} foo</p>`
    t.notRegex(str, pattern);
  })

  test(`Regex test ${index}-e: ${url}, with invalid ID length`, async t => {
    pattern.lastIndex = 0;
    // Remove the last 14 characters from the URL. This accounts for the
    // variants that have URL parameters, which max out at 12 characters.
    let str = `<p>${url.slice(0, -14)}</p>`
    t.notRegex(str, pattern);
  })
}