/**
 * VALID URLS
 *
 * Starting with a short list of valid URL fragments, return
 * all possible valid URL permutations.
 */

import permute from 'permute-arrays';

/**
 * Core URL structures accepted by the plugin
 * Domain and path only
 */
const validUrls = [
 'social.vivaldi.net/@username@example.com/123456789123456789',
 'social.vivaldi.net/@foo/987654321987654321',
]


/**
 * Non-core URL structures accepted by the plugin
 * Various protocol variants and URL parameters
 */
const validPrefixes = ['', '//', 'http://', 'https://', 'www.', 'http://www.', 'https://www.']
const validSuffixes = ['/', '/foo', '?', '%3F', '?foo', '%3Ffoo', '?foo=bar', '%3Ffoo%3Dbar']

/**
 * Cumulative lists of all URL permutations.
 */
export default permute(validUrls, validPrefixes, validSuffixes);
