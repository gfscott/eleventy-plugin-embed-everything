/**
 * VALID URLS
 *
 * Starting with a short list of valid URL fragments, return
 * all possible valid URL permutations.
 */

import permute from "permute-arrays";

/**
 * Core URL structures accepted by the plugin
 * Domain and path only
 */
const validUrls = [
  'soundcloud.com/earlxsweatshirtmusic',
  'soundcloud.com/earlxsweatshirtmusic/tisktisk-cookies',
  'soundcloud.com/earlxsweatshirtmusic/sets/earl-15'
]

/**
 * Non-core URL structures accepted by the plugin
 * Various protocol variants and URL parameters
 */
const validPrefixes = ['', '//', 'http://', 'https://', 'www.', '//www.', 'http://www.', 'https://www.']
const validSuffixes = ['?', '?foo', '?foo=bar']

/**
 * Cumulative lists of all URL permutations.
 */
export default permute(validUrls, validPrefixes, validSuffixes);