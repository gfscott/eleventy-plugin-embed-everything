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
 'social.vivaldi.net/@foo@example.org/123456789',
]


/**
 * Non-core URL structures accepted by the plugin
 * Various protocol variants and URL parameters
 * 
 * Note: With TED, we test for a trailing "/c" because they use it
 * for tracking internal site navigation (such as from the home page
 * or recommendations in the sidebar). But embed.ted.com URLs that
 * include this fake path directory fail to load.
 */
const validPrefixes = ['', '//', 'http://', 'https://', 'www.', 'http://www.', 'https://www.']
const validSuffixes = ['/', '/c', '?', '%3F', '?foo', '%3Ffoo', '?foo=bar', '%3Ffoo%3Dbar']

/**
 * Cumulative lists of all URL permutations.
 */
export default permute(validUrls, validPrefixes, validSuffixes);