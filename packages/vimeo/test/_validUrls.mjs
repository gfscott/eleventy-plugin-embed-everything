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
const coreUrlsPublic = [
 'vimeo.com/123456',
]

const coreUrlsPrivate = [
	'vimeo.com/123456/abc123xyz789',
]

/**
 * Non-core URL structures accepted by the plugin
 * Various protocol variants and URL parameters
 */
const validPrefixes = ['', '//', 'http://', 'https://', 'www.', 'http://www.', 'https://www.']
const validSuffixes = ['/', '?', '%3F', '?foo', '%3Ffoo', '?foo=bar', '%3Ffoo%3Dbar']

/**
 * Cumulative lists of all URL permutations.
 */
export const publicUrls =  permute(coreUrlsPublic, validPrefixes, validSuffixes);
export const privateUrls =  permute('vimeo.com/123456/asdf1234', validPrefixes, validSuffixes);
