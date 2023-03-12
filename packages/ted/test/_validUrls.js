/**
 * VALID URLS
 * 
 * Starting with a short list of valid URL fragments, return
 * all possible valid URL permutations.
 */

const permute = require('./_permuteArrays.js');

/**
 * Core URL structures accepted by the plugin
 * Domain and path only 
 */
const validUrls = [
 'ted.com/talks/fake_talk',
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
const validSuffixes = ['?', '%3F', '?foo', '%3Ffoo', '?foo=bar', '%3Ffoo%3Dbar']

/**
 * Cumulative lists of all URL permutations.
 */
const goodUrls = permute(validUrls, validPrefixes, validSuffixes);

module.exports = goodUrls;