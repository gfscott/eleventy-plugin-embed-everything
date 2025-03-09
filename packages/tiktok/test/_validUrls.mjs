import permute from 'permute-arrays';

/**
 * Core URL structures accepted by the plugin
 * Domain and path only
 */
const validUrls = [
  'tiktok.com/@guiltyaesthetic/video/6806676200652655877',
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
