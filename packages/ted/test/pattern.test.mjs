import { describe, it, expect } from 'vitest';
import pattern from '../lib/pattern.js';
import validUrls from './_validUrls.mjs';

describe('TED URL Pattern Tests', () => {
  for (let [index, url] of validUrls.entries()) {

    it(`Regex test ${index}-a: ${url}`, () => {
      /**
       * In testing, you have to reset the RegExp object's lastIndex
       * property. This is because when you use the /g flag for
       * global matches, the regular expression instance keeps track
       * of where the previous match was found, then continues searching
       * from that point. It resets to zero if the index value is more
       * than the length of the input.
       *
       * In this testing case, where we loop through a set of examples,
       * the index is set to the length of the test string on its first
       * match, but the second match fails because the search starts
       * either partway through the string or the index is greater than
       * the string length. In that case, the index is reset to zero
       * and the third match succeeds.
       *
       * This took a *long* time to debug. The solution is to reset
       * the RegExp object's lastIndex value to zero before the
       * test runs on the next loop.
       *
       * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/lastIndex
       * @see https://stackoverflow.com/a/1520853
       *
       */
      pattern.lastIndex = 0;
      let str = `<p>${url}</p>`
      expect(str).toMatch(pattern);
    });

    it(`Regex test ${index}-b: ${url}, with whitespace`, () => {
      pattern.lastIndex = 0;
      let str = `<p>
                  ${url}
                </p>`
      expect(str).toMatch(pattern);
    });

    it(`Regex test ${index}-c: ${url}, with link`, () => {
      pattern.lastIndex = 0;
      let str = `<p><a href="${url}">${url}</a></p>`
      expect(str).toMatch(pattern);
    });

    it(`Regex test ${index}-d: ${url}, with link and whitespace`, () => {
      pattern.lastIndex = 0;
      let str = `<p>
                  <a href="${url}">
                    ${url}
                  </a>
                </p>`
      expect(str).toMatch(pattern);
    });
  }
});


