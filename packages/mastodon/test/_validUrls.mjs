/**
 * VALID URLS
 *
 * Starting with a few valid URL fragments, return
 * all possible valid URL permutations.
 */

import permute from 'permute-arrays';



/**
 * Non-core URL structures accepted by the plugin
 * Various protocol variants and URL parameters
 */
const validPrefixes = ['', '//', 'http://', 'https://', 'www.', 'http://www.', 'https://www.']
const validSuffixes = ['/', '/foo', '?', '%3F', '?foo', '%3Ffoo', '?foo=bar', '%3Ffoo%3Dbar']

/**
 * Cumulative lists of all URL permutations.
 */
export const federatedUrls = permute('social.vivaldi.net/@username@example.com/123456789123456789', validPrefixes, validSuffixes);
export const originUrls = permute('social.vivaldi.net/@foo/987654321987654321', validPrefixes, validSuffixes);

