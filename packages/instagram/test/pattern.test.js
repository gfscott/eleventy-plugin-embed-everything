const test = require('ava');
const pattern = require('../lib/pattern.js');
const validUrls = require('./_validUrls.js');

for (let [index, url] of validUrls.entries()) {
  
  test(`Regex test ${index}-a: ${url}`, async t => {
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

}


