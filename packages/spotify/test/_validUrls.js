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
 'spotify.com/album/75qojmHz1id8sL2LDR5qVz',
 'spotify.com/artist/066X20Nz7iquqkkCW6Jxy6',
 'spotify.com/playlist/7zv2xFPTH1MBynYafuvtCj',
 'spotify.com/user/gfscott/playlist/7zv2xFPTH1MBynYafuvtCj',
 'spotify.com/track/3gsCAGsWr6pUm1Vy7CPPob',
 'spotify.com/episode/7G5O2wWmch1ciYDPZS4a4O',
 'spotify.com/show/3rDR8CfpIEMpITG2UC3w5W',
]

/**
 * Non-core URL structures accepted by the plugin
 * Various protocol variants and URL parameters.
 * 
 * Note that some of these variants are not actually
 * valid Spotify URLS, but they are accepted by the
 * plugin for compatibility and ease of use.
 */
const validPrefixes = ['', '//', 'http://', 'https://', 'www.', 'http://www.', 'https://www.', 'open.', 'http://open.', 'https://open.']
const validSuffixes = ['/', '?', '%3F', '?foo', '%3Ffoo', '?foo=bar', '%3Ffoo%3Dbar']

/**
 * Cumulative lists of all URL permutations.
 */
module.exports.album = permute(validUrls[0], validPrefixes, validSuffixes);
module.exports.artist = permute(validUrls[1], validPrefixes, validSuffixes);
module.exports.playlist = permute(validUrls[2], validPrefixes, validSuffixes);
module.exports.userPlaylist = permute(validUrls[3], validPrefixes, validSuffixes);
module.exports.track = permute(validUrls[4], validPrefixes, validSuffixes);
module.exports.episode = permute(validUrls[5], validPrefixes, validSuffixes);
module.exports.show = permute(validUrls[6], validPrefixes, validSuffixes);
module.exports.all = permute(validUrls, validPrefixes, validSuffixes);

