/**
 * INVALID URLS
 * 
 * Starting with the list of valid URLs, return a list of
 * invalid strings with text prepended or appended.
 */

const validUrls = require('./validUrls.js');

const prependedText = validUrls.map(url => {
  return `Foo ${url}`;
});
const appendedText = validUrls.map(url => {
  return `${url} Foo`;
});

const invalidUrls = prependedText.concat(appendedText);

module.exports = invalidUrls;