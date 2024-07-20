/**
 * INVALID URLS
 * 
 * Starting with the list of valid URLs, return a list of
 * invalid strings with text prepended or appended.
 */

import validUrls from './_validUrls.mjs';

const prependedText = validUrls.map(url => {
  return `Foo ${url}`;
});
const appendedText = validUrls.map(url => {
  return `${url} Foo`;
});

const bad = prependedText.concat(appendedText);

export default bad;