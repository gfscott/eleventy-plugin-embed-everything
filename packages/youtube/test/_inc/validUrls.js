/**
 * VALID URLS
 * 
 * Starting with a short list of valid URL fragments, return
 * all possible valid URL permutations.
 */

 const permute = require('./permuteArrays.js');

 /**
  * Core URL structures accepted by the plugin
  * Domain and path only 
  */
const validUrls_params = [
  'youtube.com/watch?v=hIs5StN8J-0',
  // This isn't actually a valid YouTube url, but accepted by the plugin regex
  'youtu.be/watch?v=hIs5StN8J-0',
]
const validUrls_noparams = [
  'youtu.be/hIs5StN8J-0',
  // This isn't actually a valid YouTube url, but accepted by the plugin regex
  'youtube.com/hIs5StN8J-0',
]



 
 /**
  * Non-core URL structures accepted by the plugin
  * Various protocol variants and URL parameters
  * NOTE: We currently don't test for strings starting with `//`,
  * since spotPattern.js does not actually detect that case.
  * We probably should, since other plugins in the family do.
  * Should be a non-breaking change.
  */
 const validPrefixes = ['', 'http://', 'https://', 'www.', 'http://www.', 'https://www.']
 const validSuffixes_params = ['', '&', '&amp;', '%26', '&foo', '&amp;foo', '%26foo', '&foo=bar', '&amp;foo=bar', '%26foo%3Dbar']
 const validSuffixes_noparams = ['?', '%3F', '?foo', '%3Ffoo', '?foo=bar', '%3Ffoo%3Dbar']
 
 /**
  * Cumulative lists of all URL permutations.
  */
 const goodUrls_params = permute(validUrls_params, validPrefixes, validSuffixes_params);
 const goodUrls_noparams = permute(validUrls_noparams, validPrefixes, validSuffixes_noparams);
 
const goodUrls = [].concat(goodUrls_params, goodUrls_noparams)

 module.exports = goodUrls;